import { Utensils, MapPin, ArrowUpRight, ChevronDown } from 'lucide-react';
import './food-map.css';
import { foodDays, foodSources, venues, type Option } from './food-data';
import foodLocations from '../public/food-locations.json';
import { dateLabel } from './trip-plan';

function FoodOption({option,index,date}:{option:Option;index:number;date:string}) {
 const venue=option.venue ? venues[option.venue] : undefined;
 const location=option.venue ? foodLocations[option.venue as keyof typeof foodLocations] : undefined;
 const number=option.venue ? Object.keys(venues).indexOf(option.venue)+1 : 0;
 const name=option.name??venue?.name;
 return <article className="food-option" data-meal-option>
  <div className="food-option-top"><span className="food-letter">{['A','B','C'][index]}</span><h4>{name}</h4></div>
  <p className="food-dish">{option.dish??venue?.dish}</p>
  <p className="food-price">{option.price??venue?.price}<span>／人 · 规划额</span></p>
  {venue && <p className="food-area"><MapPin size={14}/>{venue.area}</p>}
  <p className="food-tip">{option.tip??venue?.tip}</p>
  {venue ? <div className="food-links">{location&&<a className="food-pin-link" href={`/trip-map.html#food=food-${option.venue}&date=${date}`} data-food-map={`food-${option.venue}`} data-food-date={date}><MapPin size={15}/> F{number} · 在行程地图定位</a>}<a className="food-map-link" href={location?.source.startsWith('https://www.google.com/maps')?location.source:`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.query??venue.name)}`} target="_blank" rel="noreferrer">Google 地图查店 <ArrowUpRight size={14}/></a>{location&&<small className="food-location-note">{location.locationNote}</small>}<div>{venue.refs.map(id=><a key={id} href={foodSources[id].url} target="_blank" rel="noreferrer">{foodSources[id].label} ↗</a>)}</div></div> : <span className="food-condition">随航班／酒店／当日供应落实 · 无固定店铺</span>}
 </article>;
}

export default function FoodGuide(){
 return <section id="food" className="section food-section">
  <div className="section-title"><div><p className="eyebrow">EAT YOUR WAY THROUGH THAILAND</p><h2>每天三餐，顺着行程吃</h2></div><span className="tag"><Utensils size={16}/><span data-plan-only="A">A · 30 餐</span><span data-plan-only="B">B · 36 餐</span> · 每餐 3 选 1</span></div>
  <p className="food-intro">无忌口、能吃辣。先按芭东、曼谷 Asok、芭提雅北部住宿来挑；酒店确定后，优先选当天离你们最近的一项。</p>
  <div className="food-overview"><div><strong data-plan-only="A">¥1,000</strong><strong data-plan-only="B">¥1,200</strong><span>每人餐饮与饮水参考预算</span></div><div><strong>฿ = 泰铢</strong><span>卡片是每人规划额，非实时菜单报价</span></div><div><strong>3 人合点</strong><span>海鲜餐：一份主菜＋一份肉菜＋青菜＋饭</span></div></div>
  <p className="food-reading">点日期展开早、午、晚餐。A／B／C 是替代选择，不用三家都去。餐厅会合理复用；航班日、出海日包含按实际行程选择的条件方案。</p>
  <div className="food-map-entry"><div><strong><MapPin size={19}/> {Object.keys(foodLocations).length} 处美食，已经落在地图上</strong><p>橙色 F 编号对应具体店铺、市场或美食广场。点卡片直接定位，也可以按城市、日期筛选。</p></div><a href="/trip-map.html#foods=phuket" data-food-region="phuket">打开美食地图 →</a></div>
  <div className="food-days">
   {foodDays.map(day=><details className="food-day" key={day.date+(day.plan??'common')} name="meal-date" open={day.date==='21'} data-food-date={day.date} data-plan-only={day.plan}>
    <summary><span className="food-date">{day.date==='1001'?'10.':'09.'}<b>{day.date==='1001'?'01':day.date}</b></span><span className="food-day-title"><strong>{day.plan&&`PLAN ${day.plan} · `}{day.city}</strong><small>{day.route}</small></span><span className="food-day-count">早 · 午 · 晚<small>9 个选项</small></span><ChevronDown className="food-chevron" size={21}/></summary>
    <div className="food-day-body"><p className="food-day-note">{day.note}</p><a className="food-day-map" href={`/trip-map.html#foods=all&date=${day.date}`} data-food-region="all" data-food-date={day.date}><MapPin size={15}/> 在地图上比较 {dateLabel(day.date)} 的吃饭备选 →</a>
     {day.meals.map(m=><section className="food-meal" key={m.name} data-meal-name={m.name}><div className="food-meal-label"><h3>{m.name}</h3><span>三选一</span></div>{m.note&&<p className="food-meal-note">{m.note}</p>}<div className="food-options">{m.options.map((option,i)=><FoodOption key={i} option={option} index={i} date={day.date}/>)}</div></section>)}
    </div>
   </details>)}
  </div>
  <div className="food-practical">
   <article><h3>三个人这样点，吃得丰富也好控制花费</h3><p>饭面各一碗，再共享一份小菜；正餐先点 3—4 道菜和米饭，不够再加。普吉试泰南菜，曼谷试船面与伊桑菜，海鲜大餐挑 1—2 顿即可。</p><p>饮料可以要求少糖；辣椒可另放，先尝再加。想吃当地味道时，直接向店员询问招牌菜和推荐辣度。</p></article>
   <article><h3>出门前花一分钟核对</h3><p>用「在行程地图定位」比较行程距离，再用「Google 地图查店」确认分店、当天营业和路线。价格默认普通饭面或三人合点分摊，不含酒、打车、额外加菜；按重量海鲜先确认重量、加工费与总价。</p><p>高价海鲜、和牛船面每天都选会超出预算。餐饮可在 ¥1,000—1,300／人浮动；浮潜团已含的午餐不再重复计费。</p></article>
  </div>
  <details className="food-evidence"><summary>资料怎么选的 · 2026 年 9 月 6 日查阅</summary><div>
   <p>实际阅读了小红书关于普吉泰餐、曼谷 Ruathong、芭提雅 Dek Sen、兰坡海鲜市场和 One Chun 的笔记。用户体验有主观性，不能据此保证每个人都喜欢。</p>
   <p>大众点评站内搜索遇到验证限制；可读资料包括曼谷榜单中的 Ruathong 条目和 Briley 历史图片页。历史页仅作店名线索，未将旧价格、旧评分当作现状，也没有声称每家店都已获得两平台交叉验证。各店卡片分别链接实际使用的来源。</p>
   <p>位置、营业参考结合店家／商场官方资料、旅游局、米其林及可读店铺资料；不能确认的营业时间已注明。酒店、航班和团餐未订，相关选项是待落实方案。</p>
   <div className="food-evidence-links">{['xph','xboat','xdek','xsea','xone','dpboat','dpbriley','banana'].map(id=><a key={id} href={foodSources[id].url} target="_blank" rel="noreferrer">{foodSources[id].label} ↗</a>)}</div>
   <p className="footnote">小红书笔记可能需要登录。餐厅位置按 Google 店铺点核对；Kiss Food 北店采用 Wongnai 参考点并标为待核实。商场内餐厅共用商场参考位置，市场标记不代表具体摊位。每处标记附位置来源。攻略与地点标记离线可读，街道底图、外部地图与来源链接需要联网。</p>
  </div></details>
 </section>;
}
