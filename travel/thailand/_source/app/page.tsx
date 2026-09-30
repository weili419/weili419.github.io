import { ArrowUpRight, Plane, Waves, MapPin, CalendarDays } from 'lucide-react';

import HotelGuide from './hotel-guide';
import TripPlan from './trip-plan';
import trip from '../public/trip.json';

const sources = [["weather","9 月季风与出海","https://www.tourismthailand.org/Articles/thailand-september"],["racha","皇帝岛官方介绍","https://www.thailandtravel.or.jp/mu-ko-racha/"],["coral","珊瑚岛官方介绍","https://www.thailandtravel.or.jp/coral-island-ko-hey/"],["safety","首次浮潜安全要点","https://oceansafety.hawaii.gov/snorkeling-safety/"],["banana","Banana Beach 浮潜套餐","https://bananabeachkohhey.com/packages/snorkeling"],["visa","2026 年 9 月免签调整","https://th.china-embassy.gov.cn/sgxw/202609/t20260902_12014753.html"],["entry","中国使馆入境准备提醒","https://th.china-embassy.gov.cn/zgqz/1w1/202606/t20260609_11940509.html"],["tdac","TDAC 官方填写与规则","https://tdac.immigration.go.th/manual/en/faq.html"],["bus","曼谷—芭提雅大巴官网","https://airportpattayabus.com/bangkok-terminal-pattaya/"],["grand","大皇宫票价与时间","https://www.royalgrandpalace.th/en/visit/faq"],["market","乍都乍周末市场","https://www.tourismthailand.org/Articles/get-unique-experience-with-5-wallet-friendly-shopping-hubs"],["similan","斯米兰开放季","https://thai.tourismthailand.org/Articles/similan-th"],["maya","2026 玛雅湾关闭通知（运营方）","https://www.asiantrails.travel/latest-news/annual-closure-of-iconic-island-bay/"],["travel","中国使馆旅游提醒","https://th.china-embassy.gov.cn/chn/sgxw/202407/t20240730_11463065.html"],["power","泰国民航局充电宝规定","https://www.caat.or.th/caat-media/203652/"],["dress","宫殿着装要求","https://www.tourismthailand.org/Articles/dressing-to-visit-royal-palaces-in-thailand"],["funds","泰国使馆免签资金说明","https://doha.thaiembassy.org/en/publicservice/tourist-visa-exemption-visa-on-arrival"]];
const days = trip.commonDays;
export default function Home() {
 return <div className="site-shell">
  <header className="topbar"><a href="#" className="brand"><Waves size={23}/><span>THAILAND <b>旅行手记</b></span></a><span className="edition">2026 / SEPTEMBER</span></header>
  <main>
   <TripPlan/>
   <section id="travel-map" className="travel-map-section"><p className="map-version-note">地图已更新完整实际行程：芭提雅到曼谷、RCA 海鲜自助、两家酒店、BTS／A1 与 FD496 返杭路线均已标注。</p><iframe title="泰国旅行每日行程地图" src="/trip-map.html" className="travel-map-frame" /></section>
   <nav className="section-nav" aria-label="攻略导航"><a href="#travel-map">旅行地图</a><a href="#hotels">实际住宿 <ArrowUpRight size={15}/></a><a href="#itinerary">每日行程</a><a href="#transport">实际交通</a></nav>
   <section className="trip-heading guide-heading"><div><p className="eyebrow">09.20 — 09.30 · 11 天 10 晚</p><h1>泰国旅行手记<span>先普吉，再芭提雅，最后曼谷</span></h1><p className="intro">3 人同行 · 各睡一张床 · 普吉进，曼谷出</p></div><div className="date-stamp"><CalendarDays/><span>START</span><strong>09.20</strong></div></section>
   <div className="route-strip"><span>上海 <Plane size={15}/><small>9C8521</small></span><span><b>普吉岛</b><small>Orchid · 4 晚</small></span><i>→</i><span><b>廊曼机场</b><small>DD525 · A1</small></span><i>→</i><span><b>Mo Chit</b><small>1 号窗口转车</small></span><i>→</i><span><b>芭提雅</b><small>9/24—27</small></span><i>→</i><span><b>曼谷</b><small>Teja · Don Muang</small></span><span><Plane size={15}/> FD496 · 杭州萧山</span></div>
   <section id="itinerary" className="section"><div className="section-title"><div><p className="eyebrow">THE ITINERARY</p><h2>11 天每日安排</h2></div><span className="subtle">泰国时间比北京时间慢 1 小时</span></div>
    <div className="itinerary-layout"><div className="days">{[...days,...trip.plans.A.days].map(d=><article className="day" key={d.date}><div className="day-date"><strong>{d.date}</strong><span>9 月 · {d.week}</span></div><div className="day-content"><h3>{d.title}</h3><p>{d.intro}</p><small><MapPin size={13}/>{d.stayText}</small></div></article>)}</div></div>
    <p className="footnote">9/28 从芭提雅北站抵达 Ekkamai，吃过 RCA 海鲜自助后入住 Teja Hotel；9/29 办电话卡并搭 BTS、A1 前往廊曼，入住 Don Muang Hotel。</p>
    <div className="quiet-note"><b>9/30 · FD496 返回杭州萧山机场</b><p>上午从 Don Muang Hotel 步行约 15 分钟到廊曼机场，搭乘泰国亚洲航空 FD496 返回杭州萧山国际机场。</p><a href="#plans">查看返程摘要 ↑</a></div>
   </section>

<HotelGuide/>
<section id="transport" className="section">
 <div className="section-title"><div><p className="eyebrow">ACTUAL TRANSFERS</p><h2>已经走过的航班与转车路线</h2></div><Plane size={25}/></div>
 <div className="transport-grid">
  <article><h3>9/20 · 9C8521</h3><p><b>上海 → 普吉 HKT：</b>搭乘 9C8521 抵达普吉岛，随后前往卡伦海滩的 Phuket Orchid Resort and Spa。</p><p><b>住宿：</b>9/20 入住，9/20—23 晚连续住宿，9/24 退房，共 4 晚。</p></article>
  <article><h3>9/24 · DD525、A1 与 Mo Chit</h3><p><b>HKT → DMK：</b>搭乘 DD525 从普吉飞抵廊曼机场。</p><p><b>DMK → Mo Chit：</b>从机场乘坐 A1 巴士到 Mo Chit Bus Terminal。</p><p><b>Mo Chit → 芭提雅：</b>在 1 号窗口购买前往 North Pattaya Bus Terminal 的车票，并抵达芭提雅北站。</p></article>
  <article><h3>9/28 · 芭提雅 → Ekkamai</h3><p><b>芭提雅北站 → 曼谷：</b>乘车抵达汽车东站 สถานีขนส่งผู้โดยสารเอกมัย，之后打车前往 RCA 吃海鲜自助，再入住 Teja Hotel。</p></article>
  <article><h3>9/29—30 · BTS、A1 与 FD496</h3><p><b>Nana → Mo Chit：</b>搭 BTS 到 Mo Chit，1 号口出站后乘 30 泰铢 A1 大巴直达廊曼机场。</p><p><b>DMK → HGH：</b>入住 Don Muang Hotel 一晚，次日上午步行约 15 分钟到机场，搭 FD496 返回杭州。</p></article>
 </div>
</section>
<section id="sources" className="sources-section"><h2>查询来源</h2><p>实际航班、住宿、转车和用餐经历根据本次亲历更新至 2026 年 9 月 30 日；地图地点坐标另按酒店官网、地图与地点资料核对。</p><div>{sources.map(([id,title,url])=><a href={url} key={id} target="_blank" rel="noreferrer">{title} ↗</a>)}</div></section>

  </main><footer>泰国旅行手记 · 实际行程更新 2026.09.30</footer>
  <script src="/trip-guide.js" defer />
 </div>;
}
