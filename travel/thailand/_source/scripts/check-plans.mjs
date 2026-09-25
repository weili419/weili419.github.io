import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {foodDays,venues} from '../app/food-data.ts';

const read=name=>readFileSync(new URL('../'+name,import.meta.url),'utf8');
const trip=JSON.parse(read('public/trip.json'));
const hotels=JSON.parse(read('public/hotels.json'));
const plan=trip.plans.A;
const days=[...trip.commonDays,...plan.days];

assert.deepEqual(Object.keys(trip.plans),['A']);
assert.equal(plan.label,'9/30 曼谷 → 杭州');
assert.equal(plan.returnDate,30);
assert.equal(plan.dayCount,11);
assert.equal(plan.nights,10);
assert.equal(plan.bangkokNights,4);
assert.equal(plan.budget,7450);
assert.deepEqual(days.map(d=>d.date),[20,21,22,23,24,25,26,27,28,29,30]);
assert.equal(days.filter(d=>d.stay).length,10);
assert.equal(days.at(-1).stay,null);
assert.match(days.at(-1).title,/杭州萧山机场/);
assert.equal(days.at(-1).stops.at(-1).id,'hgh');
assert.ok(!JSON.stringify(trip).includes('1001'));
assert.ok(!JSON.stringify(trip).includes('返回上海'));

assert.deepEqual(foodDays.map(d=>Number(d.date)),[21,22,23]);
assert.equal(foodDays.flatMap(d=>d.meals).length,5);
for(const day of foodDays){
 assert.equal(day.plan,undefined);
 for(const meal of day.meals){
  assert.equal(meal.options.length,1);
  for(const option of meal.options)if(option.venue)assert.ok(venues[option.venue]);
 }
}

assert.equal(Object.keys(venues).length,0);
assert.equal(hotels.length,1);
const actualHotel=hotels[0];
assert.equal(actualHotel.id,'hotel-phuket-orchid');
assert.equal(actualHotel.status,'actual');
assert.equal(actualHotel.en,'Phuket Orchid Resort and Spa');
assert.equal(actualHotel.quotes.length,1);
assert.equal(actualHotel.quotes[0].dates,'9/20 入住 · 9/24 退房 · 4 晚');
assert.ok(actualHotel.ll.every(Number.isFinite));

assert.ok(trip.places.hgh.ll.every(Number.isFinite));
assert.equal(trip.places.hgh.name,'杭州萧山国际机场 HGH');
assert.equal(trip.catalog.find(item=>item.id==='hgh').kind,'airport');
assert.equal(trip.catalog.length,37);
assert.deepEqual(trip.places.chuanxiangju.ll,[98.299984375,7.8884875]);
assert.deepEqual(trip.places.padthaishop.ll,[98.300068,7.8315528]);
assert.deepEqual(trip.places.linskitchen.ll,[98.3014356,7.8291012]);
const arrivalDay=days.find(d=>d.date===20),marketDay=days.find(d=>d.date===21),diveDay=days.find(d=>d.date===22),restDay=days.find(d=>d.date===23),transferDay=days.find(d=>d.date===24);
assert.match(arrivalDay.title,/9C8521/);
assert.equal(arrivalDay.stay,'hotel-phuket-orchid');
assert.deepEqual(marketDay.stops.map(stop=>stop.id),['banzaan','chuanxiangju','letsrelax','patong']);
assert.match(marketDay.note,/200 泰铢/);
assert.deepEqual(diveDay.stops.map(stop=>stop.id),['hotel-phuket-orchid','racha','coral','hotel-phuket-orchid']);
assert.match(diveDay.note,/10,000 泰铢/);
assert.deepEqual(restDay.stops.map(stop=>stop.id),['hotel-phuket-orchid','padthaishop','linskitchen','karon']);
assert.match(restDay.note,/Karon Beach/);
assert.match(transferDay.title,/DD525/);
assert.deepEqual(transferDay.stops.map(stop=>stop.id),['katanight','hkt','dmk','mochit','pattayabus','pattayastay']);
assert.match(transferDay.note,/A1/);
assert.match(transferDay.note,/1 号窗口/);
const showDay=days.find(d=>d.date===25);
assert.ok(showDay.stops.some(stop=>stop.id==='show99'));
assert.ok(showDay.intro.includes('19:30'));

const mapHtml=read('public/trip-map.html');
const mapScript=read('public/trip-map.js');
const guideScript=read('public/trip-guide.js');
assert.ok(mapHtml.includes('id="map-period"'));
assert.ok(!mapHtml.includes('id="plan-A"'));
assert.ok(!mapHtml.includes('id="plan-B"'));
assert.ok(mapHtml.includes('上海出发·杭州返程'));
assert.ok(mapHtml.includes('地点与实际用餐'));
assert.ok(!mapHtml.includes('id="foods"'));
assert.ok(!mapHtml.includes('food-data.js'));
assert.ok(!mapHtml.includes('trip-food.css'));
assert.ok(mapScript.includes("airports:{30:'bkk'}"));
assert.ok(mapScript.includes('trip.places.mochit.ll'));
assert.ok(mapScript.includes("trip.places['hotel-phuket-orchid']"));
assert.ok(mapScript.includes('trip.places.hgh.ll'));
assert.ok(!mapScript.includes('comparison'));
assert.ok(!mapScript.includes('state.branches'));
assert.ok(!mapScript.includes('showFoods'));
assert.ok(!guideScript.includes('trip-plan-set'));
assert.ok(!guideScript.includes('trip-plan-change'));

const forbidden=['10/1','10 月 1','9/29 回上海','9 月 29 日返回上海','方案 A','方案 B','PLAN A','PLAN B'];
for(const file of ['public/trip.json','public/hotels.json','public/trip-map.html','public/trip-map.js','public/trip-guide.js']){
 const content=read(file);
 for(const text of forbidden)assert.ok(!content.includes(text),file+' still contains '+text);
}

console.log('PASS: actual 9/20—24 Phuket experiences and food notes, DD525 and A1/Mo Chit transfer, one Phuket hotel stay and the HGH return plan are consistent.');
