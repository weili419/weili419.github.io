(function () {
 'use strict';
 const trip=window.TRIP, $=id=>document.getElementById(id);
 const dateLabel=date=>Number(date)===1001?'10/1':'9/'+date;
 const hotels=window.TRIP_HOTELS||[];
 const foods=window.TRIP_FOOD||[];
 const foodColor='#c8582e';
 foods.forEach(f=>{trip.places[f.id]={name:f.name,en:f.en,ll:f.ll,source:f.source,foodId:f.id};});
 trip.categories.hotel={symbol:'H',name:'候选酒店',color:'#8056b9'};
 hotels.forEach(h=>{
  trip.places[h.id]={name:h.name,en:h.en,ll:h.ll,source:h.coordSource,hotelId:h.id};
  trip.catalog.push({id:h.id,city:h.city,kind:'hotel',when:h.quotes.map(q=>q.dates).join('；'),note:h.room+'；'+h.beds+'。'+h.tradeoff,number:h.number});
 });
 const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const searchURL=p=>p.foodId&&p.source?.startsWith('https://www.google.com/maps')?p.source:'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(p.en);
 const sourceURL=p=>p.source||'https://www.openstreetmap.org/'+p.osm;
 const state={plan:'A',mode:'comparison',comparisonRegion:'bangkok',branches:{A:true,B:true},index:0,region:'phuket',hotelRegion:'phuket',foodRegion:'phuket',foodDate:0,airports:{24:'bkk',29:'bkk',1001:'bkk'},markers:[],popup:null,lines:[],bounds:[]};
 const branchColors={A:'#1a6de3',B:'#e53935',common:'#6c829b'};
 const currentPlan=()=>trip.plans[state.plan];
 const quotesFor=h=>h.quotes.filter(q=>q.plan==='common'||q.plan===state.plan);
 const catalogEntries=()=>trip.catalog.filter(entry=>!entry.plan||entry.plan===state.plan);
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 let map=null,loaded=false,loadingTimer,fallback=false;
 const fallbackStyle={version:8,sources:{land:{type:'geojson',data:window.TRIP_LAND,attribution:'地理概览 © <a href="https://www.naturalearthdata.com/" target="_blank">Natural Earth</a> · 地点 © <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'}},layers:[{id:'ocean',type:'background',paint:{'background-color':'#d6eaf0'}},{id:'land',type:'fill',source:'land',paint:{'fill-color':'#efeee4'}},{id:'coast',type:'line',source:'land',paint:{'line-color':'#a8bec1','line-width':1}}]};
 function useFallback(){if(fallback||!map)return;fallback=true;clearTimeout(loadingTimer);$('map-message').textContent='街道图暂不可用，已切换内置地理概览（无道路，小岛轮廓可能简化）。日期与地点仍可查看；实际导航可打开 Google 地图。';map.setStyle(fallbackStyle,{diff:false});}
 function place(id){return trip.places[id==='airport'?state.airports[trip.days[state.index].date]:id==='arrivalbus'?'pattayabus':id];}
 function getStops(day){return day.stops.filter(s=>s.id!=='arrivalbus'||state.airports[24]==='bkk').map((s,i)=>({...s,number:i+1,p:place(s.id)}));}
 function line(points,color,optional=false){return {type:'Feature',properties:{color,optional},geometry:{type:'LineString',coordinates:points}};}
 function updateLines(){if(map&&map.getSource('trip-lines'))map.getSource('trip-lines').setData({type:'FeatureCollection',features:state.lines});}
 function fit(){
  if(!map||!state.bounds.length)return;
  const bounds=new maplibregl.LngLatBounds();state.bounds.forEach(p=>bounds.extend(p));
  map.fitBounds(bounds,{padding:{top:window.innerWidth<760?172:148,bottom:86,left:60,right:68},maxZoom:13.8,duration:reduce?0:650});
 }
 function resetMap(){state.markers.forEach(m=>m.remove());state.markers=[];state.lines=[];state.bounds=[];if(state.popup)state.popup.remove();}
 function focus(p,text='',kicker='行程地点'){
  if(!map)return;
  if(state.popup)state.popup.remove();
  map.easeTo({center:p.ll,zoom:Math.max(map.getZoom(),p===trip.places.racha||p===trip.places.kolan?12:14),padding:{top:85,bottom:0,left:0,right:0},duration:reduce?0:550});
  state.popup=new maplibregl.Popup({offset:22,maxWidth:'280px'}).setLngLat(p.ll).setHTML('<span class="popup-kicker">'+escape(kicker)+'</span><h3>'+escape(p.name)+'</h3><p>'+escape(text||'参考位置；实际入口、车站候车区和集合点请再次核对。')+'</p><a href="'+searchURL(p)+'" target="_blank" rel="noopener noreferrer">在 Google 地图查看 ↗</a><a class="coord-source" href="'+sourceURL(p)+'" target="_blank" rel="noopener noreferrer">坐标来源</a>').addTo(map);
 }
 function marker(p,label,color,options={}){
  if(!map)return;
  const el=document.createElement('button');el.type='button';el.className='place-marker'+(options.city?' city-marker':'')+(options.optional?' optional':'');el.style.setProperty('--pin',color);el.setAttribute('aria-label',p.name+(options.sub?'，'+options.sub:''));
  const entry=trip.catalog.find(item=>trip.places[item.id]===p);
  if(entry?.kind==='airport'){el.classList.add('airport-marker');color=trip.categories.airport.color;el.style.setProperty('--pin',color);label=options.number?String(options.number)+' ✈':'✈';}
  if(entry?.kind==='hotel'){el.classList.add('hotel-marker');el.style.setProperty('--pin',trip.categories.hotel.color);label='H'+entry.number;}
  if(p.foodId)el.classList.add('food-marker');
  if(options.catalog){el.classList.add('catalog-pin');el.dataset.priority=String(entry?.kind==='airport'?100:options.optional?0:10);}
  el.innerHTML='<span class="pin-head">'+escape(label)+'</span><span class="pin-label">'+escape(options.name||p.name)+(options.sub?'<small>'+escape(options.sub)+'</small>':'')+'</span>';
  el.title=p.name+(options.sub?' · '+options.sub:'');
  el.addEventListener('click',()=>options.onClick?options.onClick():focus(p,options.text,options.optional?'可选地点':'行程地点'));
  state.markers.push(new maplibregl.Marker({element:el,anchor:'top',offset:options.offset||[0,-16]}).setLngLat(p.ll).addTo(map));
 }
 function caption(title,sub){$('map-caption').innerHTML='<b>'+escape(title)+'</b><span>'+escape(sub)+'</span>';}
 function activeControls(){
  document.querySelectorAll('.date').forEach((b,i)=>{const selected=state.mode==='day'&&i===state.index;b.classList.toggle('active',selected);b.setAttribute('aria-pressed',String(selected));});
  ['comparison','places','hotels','foods','overview','international','snorkel'].forEach(id=>{const active=id===state.mode;$(id).classList.toggle('active',active);$(id).setAttribute('aria-pressed',String(active));});
  $('previous').disabled=state.mode!=='day'||state.index===0;$('next').disabled=state.mode!=='day'||state.index===trip.days.length-1;
 }
 function stopList(stops,color){
  $('stops').innerHTML=stops.map((s,i)=>'<article class="stop'+(s.optional?' optional':'')+'" style="--city:'+color+'"><span class="stop-number">'+(s.optional?'选':s.number||i+1)+'</span><div class="stop-copy"><small>'+escape(s.time)+'</small><button data-stop="'+i+'">'+escape(s.p.name)+'</button><p>'+escape(s.text)+'</p><a href="'+searchURL(s.p)+'" target="_blank" rel="noopener noreferrer">Google 地图 ↗</a></div></article>').join('');
  $('stops').querySelectorAll('[data-stop]').forEach(b=>b.addEventListener('click',()=>{const s=stops[Number(b.dataset.stop)];focus(s.p,s.text,s.time);}));
 }
 function airportChooser(day){
  if(!day.airport)return;
  const div=document.createElement('div');div.className='airport-choice';div.innerHTML='<span>'+dateLabel(day.date)+' 示例机场</span>'+['bkk','dmk'].map(id=>'<button data-airport="'+id+'" aria-pressed="'+(state.airports[day.date]===id)+'" class="'+(state.airports[day.date]===id?'selected':'')+'">'+id.toUpperCase()+'</button>').join('');
  $('stay').appendChild(div);div.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{state.airports[day.date]=b.dataset.airport;showDay(state.index);}));
 }
 function showDay(index){
  state.mode='day';state.index=index;resetMap();const day=trip.days[index],color=index>=trip.commonDays.length?branchColors[state.plan]:trip.colors[day.city],stops=getStops(day);
  $('day-kicker').textContent='PLAN '+state.plan+' / DAY '+String(index+1).padStart(2,'0')+' / '+dateLabel(day.date)+' '+day.week;$('day-title').textContent=day.title;$('day-intro').textContent=day.intro;$('day-note').textContent=day.note;
  $('stay').innerHTML=day.stay?'<div class="stay"><small>今晚住哪里 · '+escape(day.stayText)+'</small><button id="stay-focus">'+escape(trip.places[day.stay].name)+' ↗</button></div>':'<div class="stay"><small>今日住宿</small>返回上海 · 不安排泰国住宿</div>';
  if(day.stay)$('stay-focus').addEventListener('click',()=>focus(trip.places[day.stay],'建议住宿区域，尚未预订具体酒店。','今晚住哪里'));
  if(day.stay){const button=document.createElement('button');button.className='day-hotels';button.textContent='比较本城 3 家候选酒店 →';button.addEventListener('click',()=>showHotels(day.city));$('stay').appendChild(button);}
  airportChooser(day);stopList(stops,color);
  const dayFood=foodEntries('all',day.date);
  const foodButton=document.createElement('button');foodButton.className='day-foods';foodButton.textContent='比较今天 '+dayFood.length+' 处美食备选 →';foodButton.addEventListener('click',()=>showFoods('all',day.date));$('stay').appendChild(foodButton);
  stops.forEach(s=>marker(s.p,s.optional?'选':s.number,color,{optional:s.optional,text:s.text,number:s.number}));
  const main=stops.filter(s=>!s.optional).map(s=>s.p.ll);if(main.length>1)state.lines.push(line(main,color));
  const optional=stops.filter(s=>s.optional).map(s=>s.p.ll);if(optional.length>1)state.lines.push(line(optional,'#b28440',true));
  state.bounds=stops.filter(s=>s.id!=='pvg').map(s=>s.p.ll);
  if(day.stay){const p=trip.places[day.stay];state.bounds.push(p.ll);if(!stops.some(s=>Math.hypot(s.p.ll[0]-p.ll[0],s.p.ll[1]-p.ll[1])<.004))marker(p,'宿','#566982',{text:'建议住宿区域，不代表已预订酒店。'});}
  if(day.stay)addCatalogMarkers(catalogEntries().filter(item=>item.kind==='hotel'&&item.city===day.city));
  addFoodMarkers(dayFood,day.date,true);
  state.bounds.push(...dayFood.map(f=>f.ll));
  caption(dateLabel(day.date)+' · '+day.title,day.stay?'今晚：'+day.stayText+' · 数字对应左侧顺序':'返程日 · 按实际航班倒推时间');
  activeControls();updateLines();fit();requestAnimationFrame(layoutLabels);$('dates').querySelector('.active')?.scrollIntoView({behavior:reduce?'auto':'smooth',block:'nearest',inline:'nearest'});document.querySelector('.sidebar-scroll').scrollTop=0;
 }
 function overview(international=false){
  state.mode=international?'international':'overview';resetMap();
  $('day-kicker').textContent='PLAN '+state.plan+' · '+currentPlan().dayCount+' DAYS / '+currentPlan().nights+' NIGHTS';$('day-title').textContent=international?'上海出发，一路向南':'先看整趟路线';$('day-intro').textContent='普吉 4 晚 → 芭提雅 2 晚 → 曼谷 '+currentPlan().bangkokNights+' 晚。9/24 在曼谷机场换乘，9/26 才开始曼谷住宿。';
  $('stay').innerHTML='<div class="stay"><small>路线选择</small>上海 → 普吉 → 曼谷机场 → 芭提雅 → 曼谷 → 上海</div>';
  const phases=[{id:'patong',index:0,title:'普吉岛',dates:'9/20—9/24 · 4 晚',text:'海滩、老街与第一次浮潜',city:'phuket'},{id:'pattayastay',index:4,title:'芭提雅',dates:'9/24—9/26 · 2 晚',text:'机场直达，真理寺与中天海滩',city:'pattaya'},{id:'asok',index:6,title:'曼谷',dates:'9/26—'+dateLabel(currentPlan().returnDate)+' · '+currentPlan().bangkokNights+' 晚',text:'周日市场、宫殿与城市漫游',city:'bangkok'}];
  $('stops').innerHTML=phases.map(p=>'<button class="overview-card" data-day="'+p.index+'" style="--city:'+trip.colors[p.city]+'"><small>'+p.dates+'</small><b>'+p.title+' →</b><p>'+p.text+'</p></button>').join('');
  $('stops').querySelectorAll('[data-day]').forEach(b=>b.addEventListener('click',()=>showDay(Number(b.dataset.day))));
  addCatalogMarkers(catalogEntries().filter(item=>international||item.city!=='shanghai'));
  state.lines=[line([trip.places.hkt.ll,trip.places[state.airports[24]].ll],'#008c84'),line([trip.places[state.airports[24]].ll,trip.places.pattayastay.ll,trip.places.asok.ll],'#ab7134')];
  state.bounds=phases.map(p=>trip.places[p.id].ll);
  if(international){state.lines.push(line([trip.places.pvg.ll,trip.places.hkt.ll],'#6c829b'),line([trip.places[state.airports[currentPlan().returnDate]].ll,trip.places.pvg.ll],'#6c829b'));state.bounds.push(trip.places.pvg.ll);}
  $('day-note').textContent='9/24 飞普吉→曼谷机场，当天转车去芭提雅；9/26 回曼谷；'+dateLabel(currentPlan().returnDate)+' 曼谷飞上海。机票和酒店尚未预订。';
  caption(international?'上海往返 · 三段飞机':'泰国境内 · 普吉→芭提雅→曼谷','PLAN '+state.plan+' · '+dateLabel(currentPlan().returnDate)+' 返程 · 虚线不是实际道路／航线');
  activeControls();updateLines();fit();requestAnimationFrame(layoutLabels);document.querySelector('.sidebar-scroll').scrollTop=0;
 }
 function comparison(region='bangkok'){
  state.mode='comparison';state.comparisonRegion=region;resetMap();
  const regions={bangkok:'曼谷分岔',all:'泰国全程',international:'上海往返'};
  $('day-kicker').textContent='ONE MAP / TWO ENDINGS';$('day-title').textContent='蓝线回家，红线多玩两天';
  $('day-intro').textContent='共同行程只显示一次。蓝色 A：9/29 回上海；红色 B：9/29—30 曼谷游玩，10/1 回上海。这里同时比较两套方案。';
  $('stay').innerHTML='<nav class="place-regions" aria-label="对比地图范围">'+Object.entries(regions).map(([id,name])=>'<button data-compare-region="'+id+'" aria-pressed="'+(region===id)+'" class="'+(region===id?'selected':'')+'">'+name+'</button>').join('')+'</nav><div class="branch-toggles" aria-label="显示或隐藏返程分支">'+['A','B'].map(id=>'<button data-branch="'+id+'" aria-pressed="'+state.branches[id]+'" style="--branch:'+branchColors[id]+'">'+(state.branches[id]?'✓ ':'○ ')+id+' · '+(id==='A'?'蓝线 9/29 返程':'红线 延长至 10/1')+'</button>').join('')+'</div>';
  $('stay').querySelectorAll('[data-compare-region]').forEach(b=>b.addEventListener('click',()=>comparison(b.dataset.compareRegion)));
  $('stay').querySelectorAll('[data-branch]').forEach(b=>b.addEventListener('click',()=>{state.branches[b.dataset.branch]=!state.branches[b.dataset.branch];comparison(region);}));
  const cards=[{plan:'common',date:20,title:'9/20—28 · 共同行程',text:'普吉 4 晚 → 芭提雅 2 晚 → 曼谷。点开后按顶部日期查看每天。'},...Object.entries(trip.plans).flatMap(([plan,p])=>p.days.map(d=>({plan,date:d.date,title:plan+' · '+dateLabel(d.date)+' · '+d.title,text:d.intro})))];
  $('stops').innerHTML=cards.map(c=>'<button class="overview-card" data-compare-date="'+c.date+'" data-compare-plan="'+c.plan+'" style="--city:'+branchColors[c.plan]+'"><small>'+ (c.plan==='common'?'共同部分':c.plan==='A'?'蓝线 · 返程':'红线 · 延长方案')+'</small><b>'+escape(c.title)+'</b><p>'+escape(c.text)+'</p></button>').join('');
  $('stops').querySelectorAll('[data-compare-date]').forEach(b=>b.addEventListener('click',()=>{
   const plan=b.dataset.comparePlan==='common'?state.plan:b.dataset.comparePlan;setPlan(plan,false);
   showDay(trip.days.findIndex(d=>d.date===Number(b.dataset.compareDate)));
   if(window.parent!==window)window.parent.postMessage({type:'trip-plan-change',plan},'*');
  }));
  const branchPlaces=['asok','bkk','dmk','siam','terminal21','bacc','lumphini'];
  const inRegion=item=>region==='international'||(region==='all'?item.city!=='shanghai':branchPlaces.includes(item.id));
  const entries=trip.catalog.filter(item=>inRegion(item)&&(!item.plan||state.branches[item.plan])).map(item=>item.kind==='hotel'?{...item,when:hotels.find(h=>h.id===item.id).quotes.map(q=>(q.plan==='common'?'':q.plan+' ')+q.dates).join('；')}:item);
  addCatalogMarkers(entries);if(region!=='bangkok')addFoodMarkers(foods.filter(f=>inRegion(f)&&foodUses(f,0).length),0);
  const route=(day,branch)=>{
   if(region==='bangkok'&&day.city!=='bangkok')return;
   const points=day.stops.filter(s=>!s.optional&&(s.id!=='arrivalbus'||state.airports[24]==='bkk')).map(s=>trip.places[s.id==='airport'?state.airports[day.date]:s.id==='arrivalbus'?'pattayabus':s.id].ll);
   if(points.length<2)return;
   const feature=line(points,branchColors[branch]);feature.properties={...feature.properties,branch,date:day.date,width:branch==='A'?7:branch==='B'?3:2.5};state.lines.push(feature);
  };
  trip.commonDays.forEach(d=>route(d,'common'));
  ['A','B'].forEach(id=>{if(state.branches[id])trip.plans[id].days.forEach(d=>route(d,id));});
  state.bounds=entries.filter(item=>item.kind!=='hotel'&&(region!=='bangkok'||item.kind!=='airport')).map(item=>trip.places[item.id].ll);
  $('day-note').textContent='曼谷分岔视图放大市中心，机场与上海可缩小地图或点「上海往返」查看。餐厅、酒店在对应地图按钮中。蓝、红返程路径重合时，蓝色为外缘、红色为内线，可单独隐藏一条分支。连线只示意先后顺序，不是实际导航；BKK/DMK 按机票二选一。上方 A/B 按钮切换每日详情、餐单和住宿预算，不会拆成两张地图。';
  caption(regions[region]+' · 共用一张地图','灰蓝：共同路线 · 蓝：A 9/29 返程 · 红：B 延长至 10/1');
  activeControls();updateLines();fit();requestAnimationFrame(layoutLabels);document.querySelector('.sidebar-scroll').scrollTop=0;
 }
 function layoutLabels(){
  const occupied=[];
  const elements=Array.from(document.querySelectorAll('.catalog-pin')).sort((a,b)=>Number(b.dataset.priority)-Number(a.dataset.priority));
  for(const el of elements){const label=el.querySelector('.pin-label'),rect=label.getBoundingClientRect();const overlaps=occupied.some(r=>rect.left<r.right+5&&rect.right>r.left-5&&rect.top<r.bottom+5&&rect.bottom>r.top-5);el.classList.toggle('label-crowded',overlaps);if(!overlaps)occupied.push(rect);}
 }
 function addCatalogMarkers(entries){
  entries.forEach(item=>{const p=trip.places[item.id],category=trip.categories[item.kind];marker(p,category.symbol,category.color,{catalog:true,optional:item.optional,sub:item.when,text:item.note||'行程安排：'+item.when+'。参考位置，入口和开放安排请出发前确认。',onClick:()=>focus(p,item.note||'行程安排：'+item.when+'。点击下方链接查看地点详情和导航。',category.name+' · '+item.when)});});
 }
 function placesView(region='phuket'){
  state.mode='places';state.region=region;resetMap();
  const regions={all:'泰国全部地点',phuket:'普吉岛',bangkok:'曼谷',pattaya:'芭提雅',airports:'全部机场'};
  const entries=catalogEntries().filter(item=>region==='all'?item.city!=='shanghai':region==='airports'?item.kind==='airport':item.city===region);
  $('day-kicker').textContent='AIRPORTS & PLACES';$('day-title').textContent=regions[region]+' · '+entries.length+' 个标记';$('day-intro').textContent='机场、景点、接驳和候选酒店均已标出。「美食地图」可按城市和日期查看餐厅；点上方日期，可一起看当天景点与吃饭备选。';
  $('stay').innerHTML='<nav class="place-regions" aria-label="按城市或机场查看">'+Object.entries(regions).map(([key,name])=>'<button data-region="'+key+'" aria-pressed="'+(key===region)+'" class="'+(key===region?'selected':'')+'">'+name+'</button>').join('')+'</nav><div class="place-key">'+Object.values(trip.categories).map(c=>'<span style="color:'+c.color+'">'+c.symbol+' '+c.name+'</span>').join('')+'</div>';
  $('stay').querySelectorAll('[data-region]').forEach(b=>b.addEventListener('click',()=>placesView(b.dataset.region)));
  $('stops').innerHTML=entries.map(item=>{const p=trip.places[item.id],c=trip.categories[item.kind];return '<article class="catalog-item"><span class="catalog-icon'+(item.optional?' optional':'')+'" style="--pin:'+c.color+'">'+c.symbol+'</span><div><button data-place="'+item.id+'">'+escape(p.name)+'</button><small>'+escape(item.when)+'</small><a href="'+searchURL(p)+'" target="_blank" rel="noopener noreferrer">Google 地图 ↗</a></div></article>';}).join('');
  $('stops').querySelectorAll('[data-place]').forEach(b=>b.addEventListener('click',()=>{const item=trip.catalog.find(x=>x.id===b.dataset.place);focus(trip.places[item.id],item.note||'行程安排：'+item.when+'。参考位置，实际入口请核对。',trip.categories[item.kind].name+' · '+item.when);}));
  $('day-note').textContent=region==='airports'||region==='bangkok'?'BKK 与 DMK 均为曼谷候选机场，需按 9/24 和 '+dateLabel(currentPlan().returnDate)+' 各段机票分别确认。9/24 优先 BKK，方便当天直达芭提雅。':'虚线标记为备选项目。标记都位于原始参考坐标，密集处放大或悬停即可查看名称；列表始终保留全部地点。';
  addCatalogMarkers(entries);state.bounds=entries.map(item=>trip.places[item.id].ll);
  caption(regions[region]+' · 机场与计划景点',region==='all'?'上海机场在「全部机场」或「上海往返」中查看':'标记附有日期 · 放大查看密集地点名称');
  activeControls();updateLines();fit();requestAnimationFrame(layoutLabels);document.querySelector('.sidebar-scroll').scrollTop=0;
 }
 function showHotels(region='phuket',selectedId){
  const regions={phuket:'普吉岛',bangkok:'曼谷',pattaya:'芭提雅',all:'全部酒店'};
  if(!regions[region])region='phuket';
  state.mode='hotels';state.hotelRegion=region;resetMap();
  const entries=hotels.filter(h=>region==='all'||h.city===region);
  $('day-kicker').textContent='THREE PEOPLE / THREE BEDS';$('day-title').textContent=regions[region]+' · '+entries.length+' 家候选';
  $('day-intro').textContent='紫色 H 编号与网页酒店卡片对应。点击店名或地图标记查看房型、位置与日期；均未预订。';
  $('stay').innerHTML='<nav class="place-regions" aria-label="选择酒店城市">'+Object.entries(regions).map(([id,name])=>'<button data-hotel-region="'+id+'" class="'+(region===id?'selected':'')+'" aria-pressed="'+(region===id)+'">'+name+'</button>').join('')+'</nav>';
  $('stay').querySelectorAll('[data-hotel-region]').forEach(b=>b.addEventListener('click',()=>showHotels(b.dataset.hotelRegion)));
  $('stops').innerHTML=entries.map(h=>'<article class="map-hotel-card"><span class="map-hotel-badge">H'+h.number+' · '+escape(h.badge)+'</span><button data-hotel="'+h.id+'">'+escape(h.name)+'</button><small>'+escape(h.area)+'</small><p>'+escape(h.room)+'<br>'+escape(h.beds)+' · '+escape(h.size)+'</p><div class="map-hotel-quotes">'+quotesFor(h).map(q=>'<span>'+escape(q.dates)+'<b>'+(q.price===null?'待询价':'展示 ¥'+q.price+' · 含税')+'</b></span>').join('')+'</div><a href="'+quotesFor(h)[0].url+'" target="_blank" rel="noopener noreferrer">飞猪查看 ↗</a><a href="'+searchURL(trip.places[h.id])+'" target="_blank" rel="noopener noreferrer">Google 地图 ↗</a></article>').join('');
  function focusHotel(id){const h=hotels.find(h=>h.id===id);if(h)focus(trip.places[id],h.room+'；'+h.beds+'。'+h.tradeoff,'H'+h.number+' · 候选酒店，未预订');}
  $('stops').querySelectorAll('[data-hotel]').forEach(b=>b.addEventListener('click',()=>focusHotel(b.dataset.hotel)));
  addCatalogMarkers(catalogEntries().filter(item=>item.kind==='hotel'&&(region==='all'||item.city===region)));
  const contextIds=region==='phuket'?['patong']:region==='bangkok'?['asok','terminal21']:region==='pattaya'?['pattayastay','pattayabus']:[];
  addCatalogMarkers(catalogEntries().filter(item=>contextIds.includes(item.id)));
  state.bounds=entries.map(h=>h.ll);
  $('day-note').textContent=region==='bangkok'?'曼谷 9/26—'+dateLabel(currentPlan().returnDate)+' 连住 '+currentPlan().bangkokNights+' 晚，新日期三床房均待询价。H4 在是隆区；H5、H6 在 Asok。若选 H4，请调整附近早餐和交通起点。':'房型展示价不是已确认的订单总额。核对 3 位成人、三张床、税费、早餐和取消截止时间；酒店位置为参考，入口以订单为准。';
  caption(regions[region]+' · 每人一张床','H 编号对应网页候选 · 灰色「宿」为原建议住宿区域');
  activeControls();updateLines();fit();requestAnimationFrame(layoutLabels);document.querySelector('.sidebar-scroll').scrollTop=0;
  if(selectedId)focusHotel(selectedId);
 }
 function validFoodDate(value){const date=Number(value);return trip.days.some(d=>d.date===date)?date:0;}
 function foodUses(f,date){return f.uses.filter(u=>(u.plan==='common'||(state.mode==='comparison'?state.branches[u.plan]:u.plan===state.plan))&&(!date||u.date===date));}
 function foodEntries(region,date){return foods.filter(f=>(region==='all'||f.city===region)&&foodUses(f,date).length);}
 function foodDates(f,date){return [...new Set(foodUses(f,date).map(u=>dateLabel(u.date)))].join('、');}
 function foodUseText(u){return (state.mode==='comparison'&&u.plan!=='common'?u.plan+' ':'')+dateLabel(u.date)+' '+u.meal+' · 选项 '+u.option+'：'+u.dish+'（'+u.price+'/人，规划额）。'+u.tip+(u.mealNote?' '+u.mealNote:'');}
 function focusFood(f,date){
  focus(trip.places[f.id],f.area+'。'+f.locationNote+'\n\n'+foodUses(f,date).map(foodUseText).join('\n\n'),'F'+f.number+' · 美食备选，三选一');
 }
 function addFoodMarkers(entries,date,withRoute=false){
  const groups=new Map();
  entries.forEach(f=>{const key=f.ll.join(',');if(!groups.has(key))groups.set(key,[]);groups.get(key).push(f);});
  groups.forEach(group=>{
   const f=group[0],multiple=group.length>1;
   marker(trip.places[f.id],multiple?'食 '+group.length:'F'+f.number,foodColor,{catalog:true,optional:f.unverified,offset:withRoute?[0,19]:[0,-16],name:multiple?group.map(x=>'F'+x.number).join(' / ')+' · 同一商场':f.name,sub:f.unverified?'待核实门店':multiple?'点击查看各店与楼层':foodDates(f,date)+' · 用餐备选',onClick:()=>{
    if(!multiple){focusFood(f,date);return;}
    if(!map)return;if(state.popup)state.popup.remove();
    map.easeTo({center:f.ll,zoom:Math.max(map.getZoom(),14),duration:reduce?0:550});
    state.popup=new maplibregl.Popup({offset:22,maxWidth:'300px'}).setLngLat(f.ll).setHTML('<span class="popup-kicker">同一商场 · '+group.length+' 个吃饭备选</span><h3>点餐厅，查看日期与楼层</h3>'+group.map(x=>'<button class="popup-food-choice" data-food-choice="'+x.id+'">F'+x.number+' · '+escape(x.name)+'<small>'+escape(x.area)+'</small></button>').join('')).addTo(map);
    state.popup.getElement().querySelectorAll('[data-food-choice]').forEach(b=>b.addEventListener('click',()=>focusFood(group.find(x=>x.id===b.dataset.foodChoice),date)));
   }});
  });
 }
 function showFoods(region='phuket',date=0,selectedId){
  const regions={phuket:'普吉岛',bangkok:'曼谷',pattaya:'芭提雅',all:'全部城市'};
  if(!regions[region])region='phuket';date=validFoodDate(date);
  state.mode='foods';state.foodRegion=region;state.foodDate=date;resetMap();
  const entries=foodEntries(region,date);
  $('day-kicker').textContent='FOOD ON THE MAP';$('day-title').textContent=(date?dateLabel(date)+' · ':regions[region]+' · ')+entries.length+' 处美食备选';
  $('day-intro').textContent='橙色 F 编号对应网页餐厅卡片；点名称定位。同一商场的餐厅合在「食」标记内，点击后分别选店。';
  $('stay').innerHTML='<nav class="place-regions" aria-label="选择美食城市">'+Object.entries(regions).map(([id,name])=>'<button data-food-region="'+id+'" class="'+(region===id?'selected':'')+'" aria-pressed="'+(region===id)+'">'+name+'</button>').join('')+'</nav><label class="food-date-filter">用餐日期<select id="food-date-select"><option value="0">全部日期</option>'+trip.days.map(d=>'<option value="'+d.date+'"'+(date===d.date?' selected':'')+'>'+dateLabel(d.date)+' · '+escape(d.short)+'</option>').join('')+'</select></label>';
  $('stay').querySelectorAll('[data-food-region]').forEach(b=>b.addEventListener('click',()=>showFoods(b.dataset.foodRegion,date)));
  $('food-date-select').addEventListener('change',event=>showFoods('all',event.target.value));
  $('stops').innerHTML=entries.length?entries.map(f=>'<article class="map-food-card"><span class="map-food-badge">F'+f.number+' · '+escape(foodDates(f,date))+'</span><button data-food="'+f.id+'">'+escape(f.name)+'</button><small>'+escape(f.area)+'</small><p>'+escape(f.locationNote)+'</p><div class="map-food-uses">'+foodUses(f,date).map(u=>'<details'+(date?' open':'')+'><summary>'+dateLabel(u.date)+' '+escape(u.meal)+' · '+u.option+'</summary><p>'+escape(u.dish)+'<br><b>'+escape(u.price)+'／人 · 规划额</b><br>'+escape(u.tip)+(u.mealNote?'<br>'+escape(u.mealNote):'')+'</p></details>').join('')+'</div><a href="'+searchURL(trip.places[f.id])+'" target="_blank" rel="noopener noreferrer">Google 地图查店 ↗</a><a href="'+escape(f.source)+'" target="_blank" rel="noopener noreferrer">位置来源 ↗</a></article>').join(''):'<p class="food-map-empty">这组筛选没有具体店铺。可选择「全部日期」或其他城市；出门前吃好、酒店早餐、团餐等方案保留在网页三餐卡片中。</p>';
  $('stops').querySelectorAll('[data-food]').forEach(b=>b.addEventListener('click',()=>focusFood(foods.find(f=>f.id===b.dataset.food),date)));
  addFoodMarkers(entries,date);state.bounds=entries.map(f=>f.ll);
  if(!entries.length)state.bounds=[trip.places[region==='pattaya'?'pattayastay':region==='bangkok'?'asok':'patong'].ll];
  $('day-note').textContent='这些是每餐 A／B／C 备选，不是全部必去。市场定位到市场，商场餐厅定位到建筑；先看楼层、适用条件与当天营业。家附近早餐、酒店早餐和团餐不另设店铺标记。';
  caption((date?dateLabel(date)+' · ':'')+regions[region]+' · 美食地图','F 编号对应餐厅 · 「食」可展开同一商场多家店 · 备选之间不连线');
  activeControls();updateLines();fit();requestAnimationFrame(layoutLabels);document.querySelector('.sidebar-scroll').scrollTop=0;
  const selected=entries.find(f=>f.id===selectedId);if(selected)focusFood(selected,date);
 }
 function snorkel(){
  state.mode='snorkel';resetMap();$('day-kicker').textContent='PHUKET / FIRST SNORKEL';$('day-title').textContent='浮潜去哪里，看距离就懂';$('day-intro').textContent='主选皇帝岛，短船程备选珊瑚岛。两条路线分别比较，不默认一天跑两座岛。';
  $('stay').innerHTML='<div class="stay"><small>暂定出海日</small>9/22 · 可与 9/21 或 9/23 互换</div>';
  const stops=[{id:'chalongpier',number:'起',time:'出发区域参考',text:'查龙码头。集合地点和出发港以运营方通知为准。'},{id:'racha',number:'A',time:'主选 · 皇帝岛',text:'快艇约 40 分钟起的规划参考，实际由船型、路线与海况决定。岛屿标记不是入水点。'},{id:'coral',number:'B',time:'备选 · 珊瑚岛',text:'Banana Beach 区域，查龙出发通常约 15—20 分钟。短船程也不保证海况安全。',optional:true}].map(s=>({...s,p:trip.places[s.id]}));
  stopList(stops,trip.colors.phuket);stops.forEach(s=>marker(s.p,s.number,trip.colors.phuket,{optional:s.optional,text:s.text}));
  marker(trip.places.patong,'宿','#566982',{text:'芭东住宿区域参考。酒店往返码头接送另需时间。'});
  state.lines=[line([trip.places.chalongpier.ll,trip.places.racha.ll],'#008c84'),line([trip.places.chalongpier.ll,trip.places.coral.ll],'#b28440',true)];state.bounds=[...stops.map(s=>s.p.ll),trip.places.patong.ll];
  $('day-note').textContent='你们会游泳，但第一次浮潜：选有水中向导的团、穿救生衣、先练习。下水点由向导根据海况选定；不要拿地图岛屿坐标自行出海或下水。';
  caption('A 皇帝岛 / B 珊瑚岛','两个方案分别选择 · 虚线只是位置关系，船程以运营方为准');activeControls();updateLines();fit();document.querySelector('.sidebar-scroll').scrollTop=0;
 }
 function renderDates(){
  $('dates').innerHTML=trip.days.map((d,i)=>'<button class="date" style="--city:'+trip.colors[d.city]+'" data-index="'+i+'" aria-pressed="false" aria-label="'+dateLabel(d.date)+' '+d.week+' '+escape(d.title)+'"><span class="week">'+d.week+'</span><strong>'+dateLabel(d.date)+'</strong><span class="city">'+escape(d.short)+'</span></button>').join('');
  $('dates').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>showDay(Number(b.dataset.index))));
 }
 function setPlan(plan,render=true){
  if(plan!=='A'&&plan!=='B')plan='A';
  state.plan=plan;trip.days=[...trip.commonDays,...currentPlan().days];state.index=Math.min(state.index,trip.days.length-1);state.foodDate=validFoodDate(state.foodDate);
  trip.catalog.filter(c=>c.kind==='hotel').forEach(c=>{c.when=quotesFor(hotels.find(h=>h.id===c.id)).map(q=>q.dates).join('；');});
  renderDates();$('map-period').textContent='2026.9.20—'+dateLabel(currentPlan().returnDate)+' · '+currentPlan().dayCount+' 天 '+currentPlan().nights+' 晚 · 3 人';
  ['A','B'].forEach(id=>{$('plan-'+id).setAttribute('aria-pressed',String(id===plan));$('plan-'+id).classList.toggle('selected',id===plan);});
  if(!render)return;
  if(state.mode==='comparison')comparison(state.comparisonRegion);else if(state.mode==='day')showDay(state.index);else if(state.mode==='foods')showFoods(state.foodRegion,state.foodDate);else if(state.mode==='hotels')showHotels(state.hotelRegion);else if(state.mode==='snorkel')snorkel();else if(state.mode==='overview'||state.mode==='international')overview(state.mode==='international');else placesView(state.region);
 }
 ['A','B'].forEach(id=>$('plan-'+id).addEventListener('click',()=>{setPlan(id);const hash=new URLSearchParams();hash.set('plan',id);history.replaceState(null,'','#'+hash);if(window.parent!==window)window.parent.postMessage({type:'trip-plan-change',plan:id},'*');}));
 $('previous').addEventListener('click',()=>{if(state.index>0)showDay(state.index-1);});$('next').addEventListener('click',()=>{if(state.index<trip.days.length-1)showDay(state.index+1);});
 $('places').addEventListener('click',()=>placesView(state.region));$('overview').addEventListener('click',()=>overview());$('international').addEventListener('click',()=>overview(true));$('snorkel').addEventListener('click',snorkel);$('fit').addEventListener('click',fit);
 $('hotels').addEventListener('click',()=>showHotels(state.hotelRegion));
 $('comparison').addEventListener('click',()=>comparison(state.comparisonRegion));
 $('foods').addEventListener('click',()=>state.mode==='day'?showFoods('all',trip.days[state.index].date):showFoods(state.foodRegion,state.foodDate));
 window.addEventListener('message',event=>{
  if(event.source!==window.parent)return;
  if(event.data?.type==='trip-plan-set'){setPlan(event.data.plan);return;}
  if(event.data?.plan)setPlan(event.data.plan,false);
  if(event.data?.type==='trip-hotel-focus'){const h=hotels.find(h=>h.id===event.data.id);if(h)showHotels(h.city,h.id);else if(event.data.region)showHotels(event.data.region);}
  if(event.data?.type==='trip-food-focus'){const f=foods.find(f=>f.id===event.data.id);if(f)showFoods(f.city,event.data.date,f.id);else showFoods(event.data.region,event.data.date);}
 });
 try{
  map=new maplibregl.Map({container:'map',style:'https://tiles.openfreemap.org/styles/liberty',center:[100,11],zoom:5.4,attributionControl:false,renderWorldCopies:false,minZoom:2,maxZoom:18});
  map.addControl(new maplibregl.NavigationControl({showCompass:false}),'top-right');map.addControl(new maplibregl.ScaleControl({unit:'metric',maxWidth:85}),'bottom-left');
  map.addControl(new maplibregl.AttributionControl({compact:false}),'bottom-right');
  loadingTimer=setTimeout(()=>{if(!loaded)useFallback();},12000);
  map.on('style.load',()=>{map.addSource('trip-lines',{type:'geojson',data:{type:'FeatureCollection',features:state.lines}});map.addLayer({id:'trip-route-shadow',type:'line',source:'trip-lines',paint:{'line-color':'#ffffff','line-width':['+',2,['coalesce',['get','width'],2.5]],'line-opacity':.85}});map.addLayer({id:'trip-route',type:'line',source:'trip-lines',paint:{'line-color':['get','color'],'line-width':['coalesce',['get','width'],2.5],'line-dasharray':[2,2],'line-opacity':.9}});});
  map.on('load',()=>{loaded=true;clearTimeout(loadingTimer);if(!fallback)$('map-message').textContent='';});
  map.on('error',useFallback);
  map.on('moveend',layoutLabels);map.on('resize',layoutLabels);
  new ResizeObserver(()=>map.resize()).observe($('map'));
 }catch(error){$('map-message').textContent='当前浏览器未能启动互动底图。请用支持 WebGL 的浏览器打开；仍可点击日期看行程，或打开各地点的 Google 地图。';document.querySelector('.map-area').classList.add('map-unavailable');}
 function readLocation(){const hash=new URLSearchParams(location.hash.slice(1));setPlan(hash.get('plan')||new URLSearchParams(location.search).get('plan')||'A',false);const h=hotels.find(h=>h.id===hash.get('hotel')),f=foods.find(f=>f.id===hash.get('food'));if(f)showFoods(f.city,hash.get('date'),f.id);else if(hash.has('foods'))showFoods(hash.get('foods'),hash.get('date'));else if(h)showHotels(h.city,h.id);else if(hash.has('hotels'))showHotels(hash.get('hotels'));else comparison();}
 window.addEventListener('hashchange',readLocation);readLocation();
})();
