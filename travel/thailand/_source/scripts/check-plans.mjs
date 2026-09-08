import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {foodDays,venues} from '../app/food-data.ts';
const read=name=>readFileSync(new URL('../'+name,import.meta.url),'utf8');
const trip=JSON.parse(read('public/trip.json')),hotels=JSON.parse(read('public/hotels.json'));
for(const [id,p] of Object.entries(trip.plans)){
 const days=[...trip.commonDays,...p.days],meals=foodDays.filter(d=>!d.plan||d.plan===id);
 assert.equal(days.length,id==='A'?10:12);
 assert.equal(days.filter(d=>d.stay).length,id==='A'?9:11);
 assert.deepEqual(meals.map(d=>Number(d.date)),days.map(d=>d.date));
 assert.equal(meals.flatMap(d=>d.meals).length,id==='A'?30:36);
 for(const d of meals){assert.equal(d.meals.length,3);for(const m of d.meals){assert.equal(m.options.length,3);for(const o of m.options)if(o.venue)assert.ok(venues[o.venue]);}}
 assert.equal(days.at(-1).date,id==='A'?29:1001);assert.equal(days.at(-1).stay,null);
 assert.equal(days.find(d=>d.date===24).city,'pattaya');assert.equal(days.find(d=>d.date===26).city,'bangkok');
 for(const h of hotels){
  const quotes=h.quotes.filter(q=>q.plan==='common'||q.plan===id);assert.equal(quotes.length,1);
  const q=quotes[0],u=new URL(q.url);
  if(h.city!=='phuket')assert.equal(q.price,null);
  const encoded=decodeURIComponent(q.url);
  assert.ok(encoded.includes(h.city==='phuket'?'2026-09-20':h.city==='pattaya'?'2026-09-24':'2026-09-26'));
  assert.ok(encoded.includes(h.city==='phuket'?'2026-09-24':h.city==='pattaya'?'2026-09-26':id==='A'?'2026-09-29':'2026-10-01'));
 }
}
assert.equal(2600+1350+1000+450+550+300+150+400,trip.plans.A.budget);
assert.equal(2600+1650+1200+500+550+300+150+500,trip.plans.B.budget);
assert.equal(Object.keys(venues).length,40);assert.equal(hotels.length,9);

// Exercise the real map script with a minimal DOM/MapLibre adapter.
// This checks state, routes and rendered text without a browser or network.
function element(){
 return {innerHTML:'',textContent:'',dataset:{},style:{setProperty(){}},attrs:{},events:{},children:[],
 classList:{toggle(){},add(){}},setAttribute(k,v){this.attrs[k]=v;},
 addEventListener(k,fn){this.events[k]=fn;},appendChild(x){this.children.push(x);},
 querySelectorAll(){return [];},querySelector(){return null;},scrollIntoView(){}};
}
const nodes=new Map(),node=id=>{if(!nodes.has(id))nodes.set(id,element());return nodes.get(id);};
const listeners={},window={matchMedia:()=>({matches:true}),innerWidth:1000,addEventListener:(name,fn)=>listeners[name]=fn,parent:{postMessage(){}}};
const document={getElementById:node,createElement:element,querySelector:node,querySelectorAll:()=>[]};
class MapStub{addControl(){}on(){}getSource(){return {setData(){}};}fitBounds(){}easeTo(){}getZoom(){return 5;}}
class MarkerStub{setLngLat(p){this.ll=p;return this;}addTo(){return this;}remove(){}}
class BoundsStub{extend(){return this;}}
const context=vm.createContext({window,document,console,URLSearchParams,URL,history:{replaceState(){}},location:{hash:'',search:'?plan=B'},
 setTimeout:()=>0,clearTimeout(){},requestAnimationFrame:fn=>fn(),ResizeObserver:class{observe(){}},
 maplibregl:{Map:MapStub,Marker:MarkerStub,LngLatBounds:BoundsStub,NavigationControl:class{},ScaleControl:class{},AttributionControl:class{}}});
for(const file of ['trip-data.js','hotel-data.js','food-data.js'])vm.runInContext(read('public/'+file),context);
let script=read('public/trip-map.js');
for(const id of ['plan-A','plan-B','map-period'])assert.ok(read('public/trip-map.html').includes('id="'+id+'"'));
script=script.replace(/\}\)\(\);\s*$/,'window.test={state,setPlan,showDay,showHotels,showFoods,getStops,foodUses,catalogEntries,quotesFor,dateLabel,comparison};})();');
vm.runInContext(script,context);
const t=window.test;assert.equal(t.state.plan,'B');assert.ok(node('dates').innerHTML.includes('10/1'));
assert.equal(t.state.mode,'comparison');
for(const plan of ['A','B']){
 t.setPlan(plan);t.comparison('international');
 assert.equal(t.state.lines.length,13);
 assert.equal(t.state.lines.filter(l=>l.properties.branch==='common').length,9);
 assert.deepEqual(Array.from(t.state.lines.filter(l=>l.properties.branch==='A'),l=>l.properties.date),[29]);
 assert.deepEqual(Array.from(t.state.lines.filter(l=>l.properties.branch==='B'),l=>l.properties.date),[29,30,1001]);
 assert.ok(t.state.lines.filter(l=>l.properties.branch==='A').every(l=>l.properties.color==='#1a6de3'&&l.properties.width===7));
 assert.ok(t.state.lines.filter(l=>l.properties.branch==='B').every(l=>l.properties.color==='#e53935'&&l.properties.width===3));
 assert.ok(t.state.bounds.every(ll=>ll.length===2&&ll.every(Number.isFinite)));
 assert.ok(!node('stops').innerHTML.includes('undefined'));
}
t.state.branches.B=false;t.comparison();assert.ok(t.state.lines.every(l=>l.properties.branch!=='B'));
t.state.branches.B=true;t.state.branches.A=false;t.comparison();assert.ok(t.state.lines.every(l=>l.properties.branch!=='A'));
t.state.branches.A=true;t.comparison();

for(const plan of ['A','B']){
 t.setPlan(plan);
 assert.equal(window.TRIP.days.length,plan==='A'?10:12);
 for(let i=0;i<window.TRIP.days.length;i++){t.showDay(i);assert.ok(!node('stops').innerHTML.includes('undefined'));assert.ok(t.state.bounds.every(ll=>ll.length===2&&ll.every(Number.isFinite)));}
 assert.equal(node('next').disabled,true);
 t.showDay(9);assert.ok(node('day-title').textContent.includes(plan==='A'?'上海':'Siam'));
 t.showHotels('bangkok');assert.ok(node('stops').innerHTML.includes(plan==='A'?'9/26—29':'9/26—10/1'));assert.ok(!node('stops').innerHTML.includes('9/24—27'));
 t.showFoods('all',29);assert.ok(!node('stops').innerHTML.includes('undefined'));
 for(const f of window.TRIP_FOOD)assert.ok(t.foodUses(f,0).every(u=>u.plan==='common'||u.plan===plan));
 assert.equal(t.catalogEntries().some(p=>p.id==='bacc'),plan==='B');
}
t.setPlan('B');t.showDay(11);assert.ok(node('day-kicker').textContent.includes('10/1'));
t.setPlan('A');assert.equal(t.state.index,9);assert.ok(!node('dates').innerHTML.includes('10/1'));
t.showDay(4);t.state.airports[24]='dmk';let stops=t.getStops(window.TRIP.days[4]);assert.ok(!stops.some(s=>s.id==='arrivalbus'));assert.equal(stops.find(s=>s.id==='airport').p,window.TRIP.places.dmk);
t.state.airports[24]='bkk';assert.ok(t.getStops(window.TRIP.days[4]).some(s=>s.id==='arrivalbus'));
listeners.message({source:window.parent,data:{type:'trip-plan-set',plan:'B'}});assert.equal(t.state.plan,'B');
assert.equal(t.dateLabel(1001),'10/1');

// Main-page URL, iframe-load race and two-way plan synchronisation.
const root=element(),buttons=['A','B'].map(id=>({...element(),dataset:{planSwitch:id}})),messages=[],frame=element();
frame.contentWindow={postMessage:data=>messages.push(data)};
const links=[{href:'https://example.test/travel/thailand/map.html#food=food-no6&date=29'}],events={},winEvents={};
const doc={documentElement:root,querySelector:()=>frame,querySelectorAll:selector=>selector==='[data-plan-switch]'?buttons:links,addEventListener:(key,fn)=>events[key]=fn,getElementById:()=>element()};
const loc={href:'https://example.test/travel/thailand/?plan=B#food',search:'?plan=B'};
vm.runInNewContext(read('public/trip-guide.js'),{document:doc,window:{addEventListener:(k,fn)=>winEvents[k]=fn,matchMedia:()=>({matches:true})},location:loc,history:{replaceState(a,b,url){loc.href=String(url);}},URL,URLSearchParams});
assert.equal(root.dataset.tripPlan,'B');assert.equal(messages.at(-1).plan,'B');
frame.events.load();assert.equal(messages.at(-1).plan,'B');
winEvents.message({source:frame.contentWindow,data:{type:'trip-plan-change',plan:'A'}});
assert.equal(root.dataset.tripPlan,'A');assert.ok(links[0].href.includes('plan=A'));assert.ok(loc.href.endsWith('#food'));
events.click({target:{closest:()=>buttons[1]}});assert.equal(root.dataset.tripPlan,'B');assert.equal(messages.at(-1).plan,'B');
console.log('PASS: single-map comparison, blue/red branch toggles, A/B dates, 90/108 meal options, hotel dates, route pins, return-day boundaries, airport choices and two-way iframe synchronisation.');
