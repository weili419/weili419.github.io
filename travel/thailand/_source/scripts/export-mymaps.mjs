import fs from 'node:fs';
import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url),read=path=>fs.readFileSync(new URL(path,root),'utf8');
const trip=JSON.parse(read('public/trip.json')),hotels=JSON.parse(read('public/hotels.json'));
const foods=JSON.parse(read('public/food-data.js').replace(/^window.TRIP_FOOD = /,'').replace(/;\s*$/,''));
const output=new URL('mymaps/',root);fs.mkdirSync(output,{recursive:true});
const xml=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
const date=d=>Number(d)===1001?'10/1':'9/'+d;
const when=values=>[...new Set(values)].map(date).join('、');
const colors={airport:'ffc95d26',sight:'ff848c00',stay:'ff856957',pier:'ff967808',bus:'ff256199',food:'ff2e58c8',hotel:'ffb95680',show:'ffad448e',route:'ff9b826c',blue:'ffe36d1a',red:'ff3539e5'};
const styles=Object.entries(colors).map(([key,color])=>'<Style id="'+key+'"><IconStyle><color>'+color+'</color><scale>1.1</scale><Icon><href>https://maps.google.com/mapfiles/kml/paddle/wht-blank.png</href></Icon></IconStyle><LineStyle><color>'+color+'</color><width>'+(key==='blue'?7:3)+'</width></LineStyle></Style>').join('');
function feature(id,name,description,kind,ll,points){
 assert.ok((points??[ll]).every(p=>p.length===2&&p.every(Number.isFinite)));
 return '<Placemark id="'+xml(id)+'"><name>'+xml(name)+'</name><description>'+xml(description)+'</description><styleUrl>#'+kind+'</styleUrl>'+
 (points?'<LineString><tessellate>1</tessellate><coordinates>'+points.map(p=>p.join(',')+',0').join(' ')+'</coordinates></LineString>':'<Point><coordinates>'+ll.join(',')+',0</coordinates></Point>')+'</Placemark>';
}
const days=[...trip.commonDays.map(d=>({...d,plan:'common'})),...Object.entries(trip.plans).flatMap(([plan,p])=>p.days.map(d=>({...d,plan})))];
const layers={transport:[],phuket:[],pattaya:[],bangkok:[],A:[],B:[]};
const captions={transport:'01 共同行程｜机场与跨城交通',phuket:'02 普吉｜9/20—24',pattaya:'03 芭提雅｜9/24—26',bangkok:'04 曼谷｜共用地点',A:'05 蓝线 A｜9/29 返程',B:'06 红线 B｜9/29—10/1'};
const resolve=id=>id==='airport'?'bkk':id==='arrivalbus'?'pattayabus':id;
const tag=d=>(d.plan==='common'?'':d.plan+' ')+date(d.date);
for(const item of trip.catalog){
 const place=trip.places[item.id];
 const related=days.filter(d=>d.stay===item.id||d.stops.some(s=>resolve(s.id)===item.id)||(item.id==='dmk'&&d.airport));
 const dates=['asok','patong','pattayastay'].includes(item.id)?item.when:related.map(tag).join('、')||item.when;
 const details=related.flatMap(d=>d.stops.filter(s=>resolve(s.id)===item.id||(item.id==='dmk'&&s.id==='airport')).map(s=>tag(d)+' '+s.time+'：'+s.text));
 const description=[trip.categories[item.kind].name,item.note??'',...details,item.kind==='airport'&&['bkk','dmk'].includes(item.id)?'曼谷机场二选一，以机票为准。9/24 优先 BKK，当天乘车去芭提雅；DMK 需另核巴士候车及下客点。':'','参考位置，入口和营业安排出发前复核。','坐标来源：'+(place.source||'https://www.openstreetmap.org/'+place.osm)].filter(Boolean).join('\n');
 layers[item.plan|| (item.kind==='airport'?'transport':item.city)].push(feature(item.id,dates+'｜'+(item.optional?'备选 · ':'')+place.name,description,item.kind,place.ll));
}
for(const f of foods){
 const description=['F'+f.number+' · '+f.area,f.locationNote,'每餐三选一，不代表这些餐都必须来此店。',...f.uses.map(u=>tag(u)+' '+u.meal+' 选项'+u.option+'：'+u.dish+'；'+u.price+'／人（规划额）。'+u.tip+(u.mealNote?' '+u.mealNote:'')),'位置来源：'+f.source,...f.refs.map(r=>r.label+'：'+r.url)].join('\n');
 const layer=f.uses.every(u=>u.plan==='B')?'B':f.city;
 layers[layer].push(feature(f.id,when(f.uses.map(u=>u.date))+'｜F'+f.number+' '+f.name+(f.unverified?'（位置待核实）':''),description,'food',f.ll));
}
for(const h of hotels){
 const quotes=h.quotes.filter(q=>['common','A','B'].includes(q.plan));
 const dates=quotes.map(q=>(q.plan==='common'?'':q.plan+' ')+q.dates).join('／');
 const description=['H'+h.number+' · 候选酒店，未预订',h.en,h.area,h.room,h.beds+'；'+h.size,...quotes.map(q=>(q.plan==='common'?'共用':q.plan)+'：'+q.dates+'；'+(q.price===null?'新日期待询价':'9/6 历史展示价 ¥'+q.price+'，计价口径及新订单总额待核实。')+'\n飞猪查询：'+q.url),h.why,h.tradeoff,'酒店资料：'+h.official,'坐标来源：'+h.coordSource].join('\n');
 layers[h.city].push(feature(h.id,dates+'｜H'+h.number+' '+h.name,description,'hotel',h.ll));
}
for(const d of days){
 const points=d.stops.filter(s=>!s.optional).map(s=>trip.places[resolve(s.id)].ll);if(points.length<2)continue;
 const cross=points.some(ll=>ll===trip.places.pvg.ll)||d.date===24||d.date===26;
 const layer=d.plan==='common'?(cross?'transport':d.city):d.plan;
 layers[layer].push(feature('route-'+d.plan+'-'+d.date,tag(d)+'｜'+d.title+'（顺序示意）',d.intro+'\n'+d.note+'\n连线只表示行程先后，不是实际道路、航线或导航。曼谷机场按 BKK 举例。A/B 返程路径重合，可取消勾选另一分支查看。',d.plan==='A'?'blue':d.plan==='B'?'red':'route',null,points));
}
const report={mapId:'1m9-sFljOdplY_kBAH0FWX09AC2BiCms',mode:'single-map',pointCount:trip.catalog.length+foods.length+hotels.length,colors:{common:'#6c829b',A:'#1a6de3',B:'#e53935'},layers:[]};
for(const [key,features] of Object.entries(layers)){
 const filename=key+'.kml';
 const content='<?xml version="1.0" encoding="UTF-8"?><kml xmlns="http://www.opengis.net/kml/2.2"><Document><name>'+xml(captions[key])+'</name><description>共用一张地图；蓝线 A 9/29 返程，红线 B 延长至 10/1；F 餐厅，H 候选酒店。</description>'+styles+features.join('')+'</Document></kml>';
 fs.writeFileSync(new URL(filename,output),content);
 report.layers.push({key,name:captions[key],file:filename,features:features.length,bytes:Buffer.byteLength(content)});
}
for(const plan of ['A','B'])for(const city of ['transport','phuket','pattaya','bangkok']){const old=new URL('Plan-'+plan+'-'+city+'.kml',output);if(fs.existsSync(old))fs.unlinkSync(old);}
fs.writeFileSync(new URL('manifest.json',output),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
