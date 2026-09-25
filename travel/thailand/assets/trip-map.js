(function () {
 'use strict';
 const trip=window.TRIP, $=id=>document.getElementById(id);
 const dateLabel=date=>'9/'+date;
 const hotels=window.TRIP_HOTELS||[];
 trip.categories.hotel={symbol:'住',name:'实际住宿',color:'#8056b9'};
 hotels.forEach(h=>{
  trip.places[h.id]={name:h.name,en:h.en,ll:h.ll,source:h.coordSource,hotelId:h.id};
  trip.catalog.push({id:h.id,city:h.city,kind:'hotel',when:h.quotes.map(q=>q.dates).join('；'),note:h.why,number:h.number});
 });
 const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const searchURL=p=>p.source?.startsWith('https://www.google.com/maps')||p.source?.startsWith('https://www.waze.com')?p.source:'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(p.en);
 const sourceURL=p=>p.source||'https://www.openstreetmap.org/'+p.osm;
 const state={plan:'A',mode:'overview',index:0,region:'phuket',hotelRegion:'phuket',airports:{30:'bkk'},markers:[],popup:null,lines:[],bounds:[]};
 const branchColors={A:'#3268d8',common:'#6c829b'};
 const currentPlan=()=>trip.plans[state.plan];
 const quotesFor=h=>h.quotes.filter(q=>q.plan==='common'||q.plan===state.plan);
 const catalogEntries=()=>trip.catalog.filter(entry=>!entry.plan||entry.plan===state.plan);
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 let map=null,loaded=false,loadingTimer,fallback=false;
 const fallbackStyle={version:8,sources:{land:{type:'geojson',data:window.TRIP_LAND,attribution:'地理概览 © <a href="https://www.naturalearthdata.com/" target="_blank">Natural Earth</a> · 地点 © <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'}},layers:[{id:'ocean',type:'background',paint:{'background-color':'#d6eaf0'}},{id:'land',type:'fill',source:'land',paint:{'fill-color':'#efeee4'}},{id:'coast',type:'line',source:'land',paint:{'line-color':'#a8bec1','line-width':1}}]};
 function useFallback(){if(fallback||!map)return;fallback=true;clearTimeout(loadingTimer);$('map-message').textContent='街道图暂不可用，已切换内置地理概览（无道路，小岛轮廓可能简化）。日期与地点仍可查看；实际导航可打开 Google 地图。';map.setStyle(fallbackStyle,{diff:false});}
 function place(id){return trip.places[id==='airport'?state.airports[trip.days[state.index].date]:id];}
 function getStops(day){return day.stops.map((s,i)=>({...s,number:i+1,p:place(s.id)}));}
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
  state.popup=new maplibregl.Popup({offset:22,maxWidth:'280px'}).setLngLat(p.ll).setHTML('<span class="popup-kicker">'+escape(kicker)+'</span><h3>'+escape(p.name)+'</h3><p>'+escape(text||'参考位置；实际入口、车站候车区和集合点请再次核对。')+'</p><a href="'+searchURL(p)+'" target="_blank" rel="noopener noreferrer">打开地图导航 ↗</a><a class="coord-source" href="'+sourceURL(p)+'" target="_blank" rel="noopener noreferrer">坐标来源</a>').addTo(map);
 }
 function marker(p,label,color,options={}){
  if(!map)return;
  const el=document.createElement('button');el.type='button';el.className='place-marker'+(options.city?' city-marker':'')+(options.optional?' optional':'');el.style.setProperty('--pin',color);el.setAttribute('aria-label',p.name+(options.sub?'，'+options.sub:''));
  const entry=trip.catalog.find(item=>trip.places[item.id]===p);
  if(entry?.kind==='airport'){el.classList.add('airport-marker');color=trip.categories.airport.color;el.style.setProperty('--pin',color);label=options.number?String(options.number)+' ✈':'✈';}
  if(entry?.kind==='hotel'){el.classList.add('hotel-marker');el.style.setProperty('--pin',trip.categories.hotel.color);label='住';}
  if(entry?.kind==='show'){el.style.setProperty('--pin',trip.categories.show.color);label=options.number?String(options.number)+' 秀':'秀';}
  if(options.catalog){el.classList.add('catalog-pin');el.dataset.priority=String(entry?.kind==='airport'?100:options.optional?0:10);}
  el.innerHTML='<span class="pin-head">'+escape(label)+'</span><span class="pin-label">'+escape(options.name||p.name)+(options.sub?'<small>'+escape(options.sub)+'</small>':'')+'</span>';
  el.title=p.name+(options.sub?' · '+options.sub:'');
  el.addEventListener('click',()=>options.onClick?options.onClick():focus(p,options.text,options.optional?'可选地点':'行程地点'));
  state.markers.push(new maplibregl.Marker({element:el,anchor:'top',offset:options.offset||[0,-16]}).setLngLat(p.ll).addTo(map));
 }
 function caption(title,sub){$('map-caption').innerHTML='<b>'+escape(title)+'</b><span>'+escape(sub)+'</span>';}
 function activeControls(){
  document.querySelectorAll('.date').forEach((b,i)=>{const selected=state.mode==='day'&&i===state.index;b.classList.toggle('active',selected);b.setAttribute('aria-pressed',String(selected));});
  ['places','hotels','overview','international','snorkel'].forEach(id=>{const active=id===state.mode;$(id).classList.toggle('active',active);$(id).setAttribute('aria-pressed',String(active));});
  $('previous').disabled=state.mode!=='day'||state.index===0;$('next').disabled=state.mode!=='day'||state.index===trip.days.length-1;
 }
 function stopList(stops,color){
  $('stops').innerHTML=stops.map((s,i)=>'<article class="stop'+(s.optional?' optional':'')+'" style="--city:'+color+'"><span class="stop-number">'+(s.optional?'选':s.number||i+1)+'</span><div class="stop-copy"><small>'+escape(s.time)+'</small><button data-stop="'+i+'">'+escape(s.p.name)+'</button><p>'+escape(s.text)+'</p><a href="'+searchURL(s.p)+'" target="_blank" rel="noopener noreferrer">地图导航 ↗</a></div></article>').join('');
  $('stops').querySelectorAll('[data-stop]').forEach(b=>b.addEventListener('click',()=>{const s=stops[Number(b.dataset.stop)];focus(s.p,s.text,s.time);}));
 }
 function airportChooser(day){
  if(!day.airport)return;
  const div=document.createElement('div');div.className='airport-choice';div.innerHTML='<span>'+dateLabel(day.date)+' 示例机场</span>'+['bkk','dmk'].map(id=>'<button data-airport="'+id+'" aria-pressed="'+(state.airports[day.date]===id)+'" class="'+(state.airports[day.date]===id?'selected':'')+'">'+id.toUpperCase()+'</button>').join('');
  $('stay').appendChild(div);div.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{state.airports[day.date]=b.dataset.airport;showDay(state.index);}));
 }
 function showDay(index){
  state.mode='day';state.index=index;resetMap();const day=trip.days[index],color=index>=trip.commonDays.length?branchColors[state.plan]:trip.colors[day.city],stops=getStops(day);
  $('day-kicker').textContent='DAY '+String(index+1).padStart(2,'0')+' / '+dateLabel(day.date)+' '+day.week;$('day-title').textContent=day.title;$('day-intro').textContent=day.intro;$('day-note').textContent=day.note;
  $('stay').innerHTML=day.stay?'<div class="stay"><small>今晚住哪里 · '+escape(day.stayText)+'</small><button id="stay-focus">'+escape(trip.places[day.stay].name)+' ↗</button></div>':'<div class="stay"><small>今日住宿</small>返回杭州 · 不安排泰国住宿</div>';
  if(day.stay)$('stay-focus').addEventListener('click',()=>focus(trip.places[day.stay],day.stay==='hotel-phuket-orchid'?'9/20 入住，9/24 退房，共 4 晚。':'当晚住宿区域。','今晚住哪里'));
  if(day.stay==='hotel-phuket-orchid'){const button=document.createElement('button');button.className='day-hotels';button.textContent='查看实际入住酒店 →';button.addEventListener('click',()=>showHotels('phuket'));$('stay').appendChild(button);}
  airportChooser(day);stopList(stops,color);
  stops.forEach(s=>marker(s.p,s.optional?'选':s.number,color,{optional:s.optional,text:s.text,number:s.number}));
  const main=stops.filter(s=>!s.optional).map(s=>s.p.ll);if(main.length>1)state.lines.push(line(main,color));
  const optional=stops.filter(s=>s.optional).map(s=>s.p.ll);if(optional.length>1)state.lines.push(line(optional,'#b28440',true));
  state.bounds=stops.filter(s=>s.id!=='hgh').map(s=>s.p.ll);
  if(day.stay){const p=trip.places[day.stay];state.bounds.push(p.ll);if(!stops.some(s=>Math.hypot(s.p.ll[0]-p.ll[0],s.p.ll[1]-p.ll[1])<.004))marker(p,'宿','#566982',{text:day.stay==='hotel-phuket-orchid'?'9/20—23 实际入住，共 4 晚。':'当晚住宿区域。'});}
  if(day.stay)addCatalogMarkers(catalogEntries().filter(item=>item.kind==='hotel'&&item.city===day.city));
  caption(dateLabel(day.date)+' · '+day.title,day.stay?'今晚：'+day.stayText+' · 数字对应左侧顺序':'返程日 · 按实际航班倒推时间');
  activeControls();updateLines();fit();requestAnimationFrame(layoutLabels);$('dates').querySelector('.active')?.scrollIntoView({behavior:reduce?'auto':'smooth',block:'nearest',inline:'nearest'});document.querySelector('.sidebar-scroll').scrollTop=0;
 }
 function overview(international=false){
  state.mode=international?'international':'overview';resetMap();
  $('day-kicker').textContent=currentPlan().dayCount+' DAYS / '+currentPlan().nights+' NIGHTS';$('day-title').textContent=international?'上海出发，杭州返程':'先看整趟路线';$('day-intro').textContent='9C8521 到普吉住 4 晚；9/24 搭 DD525 到廊曼，再经 Mo Chit 转车去芭提雅。';
  $('stay').innerHTML='<div class="stay"><small>实际路线</small>上海 → 普吉 → 廊曼机场 → Mo Chit → 芭提雅 → 曼谷 → 杭州</div>';
  const phases=[{id:'hotel-phuket-orchid',index:0,title:'普吉岛',dates:'9/20—9/24 · 4 晚',text:'Phuket Orchid Resort and Spa',city:'phuket'},{id:'pattayastay',index:4,title:'芭提雅',dates:'9/24—9/26 · 2 晚',text:'A1 到 Mo Chit，再转车到芭提雅北站',city:'pattaya'},{id:'asok',index:6,title:'曼谷',dates:'9/26—'+dateLabel(currentPlan().returnDate)+' · '+currentPlan().bangkokNights+' 晚',text:'周日市场、宫殿与城市漫游',city:'bangkok'}];
  $('stops').innerHTML=phases.map(p=>'<button class="overview-card" data-day="'+p.index+'" style="--city:'+trip.colors[p.city]+'"><small>'+p.dates+'</small><b>'+p.title+' →</b><p>'+p.text+'</p></button>').join('');
  $('stops').querySelectorAll('[data-day]').forEach(b=>b.addEventListener('click',()=>showDay(Number(b.dataset.day))));
  addCatalogMarkers(catalogEntries().filter(item=>international||item.city!=='shanghai'));
  state.lines=[line([trip.places.hkt.ll,trip.places.dmk.ll],'#008c84'),line([trip.places.dmk.ll,trip.places.mochit.ll,trip.places.pattayabus.ll,trip.places.pattayastay.ll,trip.places.asok.ll],'#ab7134')];
  state.bounds=phases.map(p=>trip.places[p.id].ll);
  if(international){state.lines.push(line([trip.places.pvg.ll,trip.places.hkt.ll],'#6c829b'),line([trip.places[state.airports[currentPlan().returnDate]].ll,trip.places.hgh.ll],'#6c829b'));state.bounds.push(trip.places.pvg.ll,trip.places.hgh.ll);}
  $('day-note').textContent='已完成：9/20 搭 9C8521 到普吉；9/24 搭 DD525 到 DMK，坐 A1 到 Mo Chit，在 1 号窗口购票到芭提雅北站。';
  caption(international?'上海出发 · 杭州返程 · 三段飞机':'泰国境内 · 普吉→芭提雅→曼谷',dateLabel(currentPlan().returnDate)+' 返程 · 虚线不是实际道路／航线');
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
  const entries=catalogEntries().filter(item=>region==='all'?!['shanghai','hangzhou'].includes(item.city):region==='airports'?item.kind==='airport':item.city===region);
  $('day-kicker').textContent='ACTUAL PLACES';$('day-title').textContent=regions[region]+' · '+entries.length+' 个标记';$('day-intro').textContent='机场、景点、实际交通、实际用餐地点和实际入住酒店均标在同一张地图上。';
  $('stay').innerHTML='<nav class="place-regions" aria-label="按城市或机场查看">'+Object.entries(regions).map(([key,name])=>'<button data-region="'+key+'" aria-pressed="'+(key===region)+'" class="'+(key===region?'selected':'')+'">'+name+'</button>').join('')+'</nav><div class="place-key">'+Object.values(trip.categories).map(c=>'<span style="color:'+c.color+'">'+c.symbol+' '+c.name+'</span>').join('')+'</div>';
  $('stay').querySelectorAll('[data-region]').forEach(b=>b.addEventListener('click',()=>placesView(b.dataset.region)));
  $('stops').innerHTML=entries.map(item=>{const p=trip.places[item.id],c=trip.categories[item.kind];return '<article class="catalog-item"><span class="catalog-icon'+(item.optional?' optional':'')+'" style="--pin:'+c.color+'">'+c.symbol+'</span><div><button data-place="'+item.id+'">'+escape(p.name)+'</button><small>'+escape(item.when)+'</small><a href="'+searchURL(p)+'" target="_blank" rel="noopener noreferrer">地图导航 ↗</a></div></article>';}).join('');
  $('stops').querySelectorAll('[data-place]').forEach(b=>b.addEventListener('click',()=>{const item=trip.catalog.find(x=>x.id===b.dataset.place);focus(trip.places[item.id],item.note||'行程安排：'+item.when+'。参考位置，实际入口请核对。',trip.categories[item.kind].name+' · '+item.when);}));
  $('day-note').textContent=region==='airports'||region==='bangkok'?'9/24 已搭 DD525 抵达 DMK，并坐 A1 前往 Mo Chit；9/30 的返程机场仍按实际机票确认。':'标记位于参考坐标；密集处可放大或悬停查看名称。';
  addCatalogMarkers(entries);state.bounds=entries.map(item=>trip.places[item.id].ll);
  caption(regions[region]+' · 机场与计划景点',region==='all'?'上海与杭州机场在「全部机场」或国际行程中查看':'标记附有日期 · 放大查看密集地点名称');
  activeControls();updateLines();fit();requestAnimationFrame(layoutLabels);document.querySelector('.sidebar-scroll').scrollTop=0;
 }
 function showHotels(region='phuket',selectedId){
  region='phuket';state.mode='hotels';state.hotelRegion=region;resetMap();const entries=hotels;
  $('day-kicker').textContent='ACTUAL STAY';$('day-title').textContent='普吉岛 · 实际入住酒店';
  $('day-intro').textContent='只保留 Phuket Orchid Resort and Spa：9/20 入住，9/24 退房，共 4 晚。';
  $('stay').innerHTML='<div class="stay"><small>住宿记录</small>9/20—9/23 晚 · 卡伦海滩</div>';
  $('stops').innerHTML=entries.map(h=>'<article class="map-hotel-card"><span class="map-hotel-badge">'+escape(h.badge)+'</span><button data-hotel="'+h.id+'">'+escape(h.name)+'</button><small>'+escape(h.area)+'</small><p>9/20 入住 · 9/24 退房<br>共 4 晚</p><a href="'+h.official+'" target="_blank" rel="noopener noreferrer">酒店官网 ↗</a><a href="'+searchURL(trip.places[h.id])+'" target="_blank" rel="noopener noreferrer">Google 地图 ↗</a></article>').join('');
  function focusHotel(id){const h=hotels.find(h=>h.id===id);if(h)focus(trip.places[id],h.why,'实际入住酒店');}
  $('stops').querySelectorAll('[data-hotel]').forEach(b=>b.addEventListener('click',()=>focusHotel(b.dataset.hotel)));
  addCatalogMarkers(catalogEntries().filter(item=>item.kind==='hotel'&&(region==='all'||item.city===region)));
  addCatalogMarkers(catalogEntries().filter(item=>['karon','kata'].includes(item.id)));
  state.bounds=entries.map(h=>h.ll);
  $('day-note').textContent='这是已经完成的入住记录：9/20 入住，9/24 退房。';
  caption('Phuket Orchid Resort and Spa · 实际入住','9/20 入住 · 9/24 退房 · 4 晚');
  activeControls();updateLines();fit();requestAnimationFrame(layoutLabels);document.querySelector('.sidebar-scroll').scrollTop=0;
  if(selectedId)focusHotel(selectedId);
 }
 function snorkel(){
  state.mode='snorkel';resetMap();$('day-kicker').textContent='PHUKET / ACTUAL DIVING DAY';$('day-title').textContent='皇帝岛水肺＋珊瑚岛浮潜';$('day-intro').textContent='9/22 实际参加两岛行程：水肺很好玩，浮潜感觉比较一般。';
  $('stay').innerHTML='<div class="stay"><small>实际出海日</small>9/22 · 三人合计 ฿10,000</div>';
  const stops=[{id:'hotel-phuket-orchid',number:'起',time:'酒店对面旅行社',text:'在酒店对面的旅行社购买当天行程，三人共 10,000 泰铢。'},{id:'racha',number:'1',time:'皇帝岛 · 水肺潜水',text:'这次从岸边走到较深处进行水肺潜水，体验很好玩；下次更想尝试船潜找鱼。'},{id:'coral',number:'2',time:'珊瑚岛 · 浮潜',text:'当天参加了珊瑚岛浮潜，个人感受比较一般。'}].map(s=>({...s,p:trip.places[s.id]}));
  stopList(stops,trip.colors.phuket);stops.forEach(s=>marker(s.p,s.number,trip.colors.phuket,{optional:s.optional,text:s.text}));
  marker(trip.places['hotel-phuket-orchid'],'宿','#566982',{text:'9/20—23 实际入住 Phuket Orchid Resort and Spa。'});
  state.lines=[line([trip.places['hotel-phuket-orchid'].ll,trip.places.racha.ll,trip.places.coral.ll],'#008c84')];state.bounds=stops.map(s=>s.p.ll);
  $('day-note').textContent='实际体验：浮潜没什么意思，水肺很好玩；这次只是岸潜，下次更想尝试从船上出发寻找鱼群。';
  caption('9/22 · 皇帝岛水肺＋珊瑚岛浮潜','三人共 ฿10,000 · 连线仅表示当天地点顺序');activeControls();updateLines();fit();document.querySelector('.sidebar-scroll').scrollTop=0;
 }
 function renderDates(){
  $('dates').innerHTML=trip.days.map((d,i)=>'<button class="date" style="--city:'+trip.colors[d.city]+'" data-index="'+i+'" aria-pressed="false" aria-label="'+dateLabel(d.date)+' '+d.week+' '+escape(d.title)+'"><span class="week">'+d.week+'</span><strong>'+dateLabel(d.date)+'</strong><span class="city">'+escape(d.short)+'</span></button>').join('');
  $('dates').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>showDay(Number(b.dataset.index))));
 }
 function setPlan(plan,render=true){
  plan='A';
  state.plan=plan;trip.days=[...trip.commonDays,...currentPlan().days];state.index=Math.min(state.index,trip.days.length-1);
  trip.catalog.filter(c=>c.kind==='hotel').forEach(c=>{c.when=quotesFor(hotels.find(h=>h.id===c.id)).map(q=>q.dates).join('；');});
  renderDates();$('map-period').textContent='2026.9.20—'+dateLabel(currentPlan().returnDate)+' · '+currentPlan().dayCount+' 天 '+currentPlan().nights+' 晚 · 3 人';
  if(!render)return;
  if(state.mode==='day')showDay(state.index);else if(state.mode==='hotels')showHotels(state.hotelRegion);else if(state.mode==='snorkel')snorkel();else if(state.mode==='overview'||state.mode==='international')overview(state.mode==='international');else placesView(state.region);
 }
 $('previous').addEventListener('click',()=>{if(state.index>0)showDay(state.index-1);});$('next').addEventListener('click',()=>{if(state.index<trip.days.length-1)showDay(state.index+1);});
 $('places').addEventListener('click',()=>placesView(state.region));$('overview').addEventListener('click',()=>overview());$('international').addEventListener('click',()=>overview(true));$('snorkel').addEventListener('click',snorkel);$('fit').addEventListener('click',fit);
 $('hotels').addEventListener('click',()=>showHotels(state.hotelRegion));
 window.addEventListener('message',event=>{
  if(event.source!==window.parent)return;
  if(event.data?.type==='trip-hotel-focus'){const h=hotels.find(h=>h.id===event.data.id);if(h)showHotels(h.city,h.id);else if(event.data.region)showHotels(event.data.region);}
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
 function readLocation(){const hash=new URLSearchParams(location.hash.slice(1));setPlan('A',false);const h=hotels.find(h=>h.id===hash.get('hotel'));if(h)showHotels(h.city,h.id);else if(hash.has('hotels'))showHotels(hash.get('hotels'));else if(hash.has('date')&&trip.days.some(d=>d.date===Number(hash.get('date'))))showDay(trip.days.findIndex(d=>d.date===Number(hash.get('date'))));else overview();}
 window.addEventListener('hashchange',readLocation);readLocation();
})();
