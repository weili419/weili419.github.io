import { BedDouble, MapPin, ArrowUpRight } from 'lucide-react';
import hotels from '../public/hotels.json';

const cities = [
 {id:'phuket',name:'普吉岛',dates:'9/20—24 · 4 晚',text:'三家都在芭东，方便吃饭与出海接送；日期未变，历史报价仍需重新确认。'},
 {id:'pattaya',name:'芭提雅',dates:'9/24—26 · 2 晚',text:'曼谷机场落地后当天直达。优先比较 J 住宅三床房，市中心可看格兰德贝拉。新日期待询价。'},
 {id:'bangkok',name:'曼谷',dates:'9/26 入住',text:'连续住同一家。优先 Asok；素里翁可可在是隆区，需调整早餐和接驳。新日期的三床房价格均待重新查询。'}
];

export default function HotelGuide(){
 return <section id="hotels" className="section hotel-section">
  <div className="section-title"><div><p className="eyebrow">A PLACE FOR THE THREE OF US</p><h2>三个人，三张床，住哪里？</h2></div><span className="tag"><BedDouble size={16}/> 每城 3 家候选</span></div>
  <p className="hotel-intro">按 <strong>1 间房 · 3 位成人 · 各睡一张床</strong>筛选。原查询提供了房型线索；芭提雅、曼谷改期后均需重新询价。所有标记均为候选酒店，尚未预订。</p>
  <div className="hotel-timeline"><a href="#hotel-phuket"><small>01 / 9.20—24</small><b>普吉 · 4 晚</b><span>芭东连续入住</span></a><a href="#hotel-pattaya"><small>02 / 9.24—26</small><b>芭提雅 · 2 晚</b><span>曼谷机场直达</span></a><a href="#hotel-bangkok"><small data-plan-only="A">03 / 9.26—29</small><small data-plan-only="B">03 / 9.26—10.01</small><b data-plan-only="A">曼谷 · 3 晚</b><b data-plan-only="B">曼谷 · 5 晚</b><span>连住同一家，再飞回上海</span></a></div>
  <div className="hotel-price-note"><b>改期后重新查价，三张床仍是前提</b><p>普吉日期未变，保留 2026/09/06 的飞猪房型展示价作历史线索；尚未核定计价口径与订单总额。芭提雅与曼谷已改为新日期，旧价不再用于新行程，按钮会打开对应方案的查询日期。价格、早餐、取消期限及成人加床费，以重新查询后的订单为准。</p></div>
  <nav className="hotel-city-nav" aria-label="按城市查看酒店">{cities.map(c=><a key={c.id} href={'#hotel-'+c.id}>{c.name} · 3 家 <ArrowUpRight size={15}/></a>)}<a href="/trip-map.html#hotels=all" data-hotel-region="all" target="_blank" rel="noreferrer">在地图比较全部酒店 <MapPin size={15}/></a></nav>
  {cities.map(city=><div className={'hotel-city hotel-city-'+city.id} id={'hotel-'+city.id} key={city.id}>
   <div className="hotel-city-heading"><h3>{city.name}<span>{city.dates}{city.id==='bangkok'&&<><span data-plan-only="A"> → 9/29 离店 · 3 晚</span><span data-plan-only="B"> → 10/1 离店 · 5 晚</span></>}</span></h3><p>{city.text}</p></div>
   <div className="hotel-grid">{hotels.filter(h=>h.city===city.id).map(h=><article className="hotel-card" key={h.id} id={h.id}>
    <div className="hotel-card-top"><span className="hotel-pin-id">H{h.number}</span><span className={'hotel-badge'+(h.quotes.every(q=>q.price===null)?' pending':'')}>{h.badge}</span></div>
    <h4>{h.name}</h4><p className="hotel-english">{h.en}</p><p className="hotel-area"><MapPin size={14}/>{h.area}</p>
    <div className="hotel-room"><strong>{h.room}</strong><span>{h.beds} · {h.size}</span></div>
    <p className="hotel-why">{h.why}</p>
    <div className="hotel-quotes"><small>飞猪房型展示价 · 人民币 · 含税</small>{h.quotes.map(q=><div className="hotel-quote" key={q.dates} data-plan-only={q.plan==='common'?undefined:q.plan}><div><span>{q.dates}</span><small>{q.cancel}</small></div><strong>{q.price===null?'待询价':'¥'+q.price}</strong></div>)}</div>
    <details className="hotel-details"><summary>位置取舍与订房细节 <span>＋</span></summary><p>{h.tradeoff}</p><p><b>搭配吃饭：</b>{h.food}。具体店名和推荐菜见上方每日美食。</p><p>地图是酒店位置参考，实际入口与集合处以订单为准。</p><div className="hotel-source-links"><a href={h.official} target="_blank" rel="noreferrer">酒店／房型资料 ↗</a><a href={h.bedSource} target="_blank" rel="noreferrer">床型依据 ↗</a><a href={h.coordSource} target="_blank" rel="noreferrer">坐标来源 ↗</a></div></details>
    <div className="hotel-actions"><a className="hotel-map-link" data-hotel-map={h.id} href={'/trip-map.html#hotel='+h.id} target="_blank" rel="noreferrer"><MapPin size={15}/> 在行程地图定位</a><a href={'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(h.en)} target="_blank" rel="noreferrer">Google 地图 ↗</a></div>
    <div className="hotel-book-links">{h.quotes.map(q=><a key={q.dates} data-plan-only={q.plan==='common'?undefined:q.plan} href={q.url} target="_blank" rel="noreferrer">飞猪查看 {q.plan==='common'?'':q.plan+' · '}{q.dates} ↗</a>)}</div>
   </article>)}</div>
  </div>)}
  <div className="hotel-bottom-grid"><div className="quiet-note"><b>住宿规划：A ¥1,350／人，B ¥1,650／人</b><p>按三人分摊、平均 ¥450／间／晚作规划，A 9 晚，B 11 晚；这不是上面房源的订单合计。Asok 若只剩高价套房，先比较位置与实际交通成本，再决定是否换区。</p></div><div className="quiet-note"><b>订单里要明确写下</b><p>3 adults, 3 separate single beds；如选双床加床，写明 2 twin beds + 1 adult extra bed，并核对加床费已计入。仅写「可住 3 人」不能保证有第三张床。「限时取消」需看具体日期、当地时间与扣费规则。</p><p>曼谷连续下单：A 9/26—29，B 9/26—10/1。若凌晨或很早返程，先核航班，再决定最后一晚的住宿区域。</p></div></div>
 </section>;
}
