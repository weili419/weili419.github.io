import { ArrowUpRight, Plane, Waves, MapPin, CalendarDays, LifeBuoy, Fish, Clock3, CloudRain, Wallet, Backpack, ShieldCheck } from 'lucide-react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import FoodGuide from './food-guide';
import HotelGuide from './hotel-guide';
import TripPlan from './trip-plan';
import ShowGuide from './show-guide';
import trip from '../public/trip.json';

const sources = [["weather","9 月季风与出海","https://www.tourismthailand.org/Articles/thailand-september"],["racha","皇帝岛官方介绍","https://www.thailandtravel.or.jp/mu-ko-racha/"],["coral","珊瑚岛官方介绍","https://www.thailandtravel.or.jp/coral-island-ko-hey/"],["safety","首次浮潜安全要点","https://oceansafety.hawaii.gov/snorkeling-safety/"],["banana","Banana Beach 浮潜套餐","https://bananabeachkohhey.com/packages/snorkeling"],["visa","2026 年 9 月免签调整","https://th.china-embassy.gov.cn/sgxw/202609/t20260902_12014753.html"],["entry","中国使馆入境准备提醒","https://th.china-embassy.gov.cn/zgqz/1w1/202606/t20260609_11940509.html"],["tdac","TDAC 官方填写与规则","https://tdac.immigration.go.th/manual/en/faq.html"],["bus","曼谷—芭提雅大巴官网","https://airportpattayabus.com/bangkok-terminal-pattaya/"],["grand","大皇宫票价与时间","https://www.royalgrandpalace.th/en/visit/faq"],["truth","真理寺票价与时间","https://sanctuaryoftruthmuseum.com/visit-us/?lang=th"],["market","乍都乍周末市场","https://www.tourismthailand.org/Articles/get-unique-experience-with-5-wallet-friendly-shopping-hubs"],["similan","斯米兰开放季","https://thai.tourismthailand.org/Articles/similan-th"],["maya","2026 玛雅湾关闭通知（运营方）","https://www.asiantrails.travel/latest-news/annual-closure-of-iconic-island-bay/"],["travel","中国使馆旅游提醒","https://th.china-embassy.gov.cn/chn/sgxw/202407/t20240730_11463065.html"],["power","泰国民航局充电宝规定","https://www.caat.or.th/caat-media/203652/"],["dress","宫殿着装要求","https://www.tourismthailand.org/Articles/dressing-to-visit-royal-palaces-in-thailand"],["funds","泰国使馆免签资金说明","https://doha.thaiembassy.org/en/publicservice/tourist-visa-exemption-visa-on-arrival"]];
sources.push(['bacc','BACC 常规开放说明','https://www.bacc.or.th/wp-content/uploads/2025/03/15.CROSSING-THE-DATELINE.pdf']);
function Ref({id,children}:{id:string;children?:React.ReactNode}) { const s=sources.find(s=>s[0]===id)!; return <a className="source-ref" href={s[2]} target="_blank" rel="noreferrer">{children || s[1]} ↗</a>; }
const packing = [
 ['证件与支付',['护照原件、复印件与离线备份','TDAC 确认页、三段机票及全部酒店订单','旅行保险、救援电话、足额现金和银行卡']],
 ['衣物与防晒',['T 恤 4—5 件、短裤 2—3 条，内衣袜子 5—6 套','轻薄长裤、有袖上衣、薄外套各 1 件','运动鞋、防滑凉鞋、帽子、太阳镜']],
 ['浮潜当天',['泳裤、防晒泳衣、速干毛巾与一套干衣服','合适的面镜／呼吸管（可租），近视者确认度数面镜','防晒、驱蚊、手机防水袋和干湿分离袋']],
 ['电子与洗护',['手机、充电线、旅行转换插头','手机卡／漫游覆盖 11 天；先确认 eSIM 支持','合规充电宝随身携带，标识清晰且不超过 100Wh','牙刷、剃须用品、雨衣／伞、纸巾和洗衣片','个人常备药及必要处方、创可贴']]
];
const budget = {
 A:[['三段机票（含税与所需行李）',2600],['10 晚住宿分摊',1500],['吃饭与饮水',1100],['机场、市内交通与大巴',450],['一次有向导的浮潜',550],['宫殿、寺庙等门票',300],['一场99秀＋新增晚间接驳',350],['手机卡与旅行保险等',150],['机动金',450]],
} as const;
const days = trip.commonDays;
export default function Home() {
 return <div className="site-shell">
  <header className="topbar"><a href="#" className="brand"><Waves size={23}/><span>THAILAND <b>旅行手记</b></span></a><span className="edition">2026 / SEPTEMBER</span></header>
  <main>
   <TripPlan/>
   <section id="travel-map" className="travel-map-section"><p className="map-version-note">地图已加入实际乘坐的 9C8521、DD525、DMK A1 巴士、Mo Chit 转车路线和普吉实际入住酒店。</p><iframe title="泰国旅行每日行程地图" src="/trip-map.html" className="travel-map-frame" /></section>
   <nav className="section-nav" aria-label="攻略导航"><a href="#travel-map">旅行地图</a><a href="#food">每天吃什么 <ArrowUpRight size={15}/></a><a href="#shows">99秀</a><a href="#hotels">实际住宿 <ArrowUpRight size={15}/></a><a href="#itinerary">每日行程</a><a href="#snorkeling">普吉浮潜 <ArrowUpRight size={15}/></a><a href="#transport">实际交通</a><a href="#budget">旅行预算</a><a href="#packing">出发准备</a></nav>
   <section className="trip-heading guide-heading"><div><p className="eyebrow">09.20 — 09.30 · 11 天 10 晚</p><h1>泰国旅行手记<span>先普吉，再芭提雅，最后曼谷</span></h1><p className="intro">3 人同行 · 各睡一张床 · 普吉进，曼谷出</p></div><div className="date-stamp"><CalendarDays/><span>START</span><strong>09.20</strong></div></section>
   <div className="route-strip"><span>上海 <Plane size={15}/><small>9C8521</small></span><span><b>普吉岛</b><small>Orchid · 4 晚</small></span><i>→</i><span><b>廊曼机场</b><small>DD525 · A1</small></span><i>→</i><span><b>Mo Chit</b><small>1 号窗口转车</small></span><i>→</i><span><b>芭提雅</b><small>北站抵达</small></span><i>→</i><span><b>曼谷</b><small>9/26 起</small></span><span><Plane size={15}/> 杭州萧山</span></div>
   <section id="itinerary" className="section"><div className="section-title"><div><p className="eyebrow">THE ITINERARY</p><h2>11 天每日安排</h2></div><span className="subtle">泰国时间比北京时间慢 1 小时</span></div>
    <div className="itinerary-layout"><div className="days">{[...days,...trip.plans.A.days].map(d=><article className="day" key={d.date}><div className="day-date"><strong>{d.date}</strong><span>9 月 · {d.week}</span></div><div className="day-content"><h3>{d.title}</h3><p>{d.intro}</p><small><MapPin size={13}/>{d.stayText}</small></div></article>)}</div><aside className="trip-note"><Waves size={32}/><p className="eyebrow">这次旅行的重点</p><h3>第一次浮潜，<br/>留给普吉。</h3><p>9 月 22 日暂定出海。21—23 日按海况互换，把最合适的一天留给海里。</p><a href="#snorkeling">看浮潜安排 <ArrowUpRight size={17}/></a><hr/><p>9 月仍是雨季。停航、红旗或向导判定不宜下水时，改为陆地活动。</p></aside></div>
    <p className="footnote">乍都乍安排在 9/27 周日；宫殿与郑王庙安排在 9/28。BACC 放在 9/29 周二，避开常规周一闭馆；展览及临时开放安排出发前复核。<Ref id="market"/> <Ref id="grand"/> <Ref id="truth"/> <Ref id="bacc"/></p>
    <div className="quiet-note"><b>9/30 返回杭州萧山机场</b><p>9/29 保留曼谷看展与 Siam 行程，晚上整理行李。9/30 按国际航班起飞前约 3 小时抵达 BKK 或 DMK，落地杭州 HGH。凌晨航班需从 9/29 晚倒推。</p><a href="#plans">查看返程摘要 ↑</a></div>
   </section>

<ShowGuide/>
<FoodGuide/>
<HotelGuide/>
<section id="snorkeling" className="section snorkel-section">
 <div className="section-title"><div><p className="eyebrow">PHUKET / FIRST SNORKEL</p><h2>普吉岛：把一天留给浮潜</h2></div><span className="tag"><Fish size={16}/> 会游泳 · 第一次浮潜</span></div>
 <div className="snorkel-lead"><div className="snorkel-copy"><p className="number-label">01 / 先选路线</p><h3>海况合适选皇帝岛，<br/>想缩短船程选珊瑚岛。</h3><p>你们适合的是<strong>有水中向导带队、先练习再出发</strong>的浮潜行程。暂定 9/22，9/21 和 9/23 都可互换。只安排一次完整浮潜，不把三天都绑在船票上。</p><p>原计划的攀牙湾以观景、皮划艇为主，这次改成以水下体验为重点的行程。</p><div className="mini-facts"><span><Clock3 size={17}/> 预留一整天</span><span><Wallet size={17}/> ¥400—650／人规划额</span></div></div>
 <figure><img src="/phi-phi-lay.jpg" width="5144" height="3252" alt="泰国小皮皮岛海湾，碧绿海水中的长尾船与植被覆盖的石灰岩峭壁。" loading="lazy"/><figcaption>小皮皮岛海湾资料照片，非皇帝岛或实时海况。<a href="https://commons.wikimedia.org/wiki/File:Isla_Phi_Phi_Lay,_Tailandia,_2013-08-19,_DD_04.JPG" target="_blank" rel="noreferrer">Diego Delso</a> · <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noreferrer">CC BY-SA 3.0</a></figcaption></figure></div>
 <div className="island-options">
  <article className="island recommended"><span className="island-index">A</span><div><span className="tag">海况允许时优先</span><h3>皇帝岛 · Racha Yai</h3><p className="english">也写作 Raya Yai／大皇帝岛</p><p>优先询问以皇帝岛为主的浮潜团，选适合当天风向与水流的点位。需要确认向导是否陪同下水，不能只看宣传图的水色。</p><dl><div><dt>适合</dt><dd>想把重点放在浮潜、能接受海上转场</dd></div><div><dt>船程参考</dt><dd>快艇约 40 分钟起，取决于码头、船型与海况</dd></div><div><dt>选团取舍</dt><dd>“皇帝岛＋珊瑚岛”可考虑，但先问实际浮潜时间；不为增加岛数压缩练习。</dd></div></dl><Ref id="racha"/></div></article>
  <article className="island"><span className="island-index">B</span><div><span className="tag neutral">短船程备选</span><h3>珊瑚岛 · Koh Hey</h3><p className="english">Banana Beach 是岛上一处海滩</p><p>想少坐船，或比较担心晕船时可优先询问。它和芭提雅的格兰岛不是同一个岛；查龙码头至岛上快艇通常约 15—20 分钟。</p><dl><div><dt>适合</dt><dd>首次尝试，希望兼顾沙滩和浮潜</dd></div><div><dt>询价参考</dt><dd>Banana Beach 官网页面浮潜套餐 2,500 泰铢／人起，列含接送、午餐、装备和向导。</dd></div><div><dt>需要确认</dt><dd>水中带队方式、你们酒店是否在接送范围、天气退款条款；短船程也可能遇到风浪。</dd></div></dl><Ref id="coral"/> <Ref id="banana"/></div></article>
  <article className="island"><span className="island-index">C</span><div><span className="tag neutral">更偏综合观景</span><h3>皮皮岛 · Phi Phi</h3><p className="english">看海湾风景，也可安排浮潜点</p><p>如果你们很想看石灰岩海湾，可选择皮皮岛路线。多停靠点的行程要确认真正的下水时长、往返船程和首次浮潜支持。</p><dl><div><dt>这次的限制</dt><dd>9 月玛雅湾按季节性关闭安排，不能把登陆玛雅湾作为购买理由；不等于整个皮皮岛关闭。</dd></div><div><dt>不默认加上</dt><dd>斯米兰在你们日期内不处于开放季；也不默认加小皇帝岛或岸边自行游向离岸礁石。</dd></div></dl><Ref id="maya"/> <Ref id="similan"/></div></article>
 </div>
 <div className="weather-note"><CloudRain size={26}/><div><h3>9 月：日期可换，安全条件不能打折</h3><p>提前 24—48 小时看天气预警并联系运营方，当天由船长与水中向导再次评估。停航、雷暴、红旗、明显浪涌或水流不合适时取消；不要因一个团停航就改找另一艘小船。晴天不等于海况安全，也不保证能见度。</p><p>陆地备选：老街有顶区域、咖啡店、商场、正规按摩或酒店休息。<Ref id="weather"/> <Ref id="travel"/></p></div></div>
 <div className="guide-grid">
 <article><p className="number-label">02 / 一天怎么过</p><h3>9/22 浮潜日参考节奏</h3><ol className="steps"><li><strong>07:00—09:00｜接送与装备</strong><span>轻早餐、确认海况，酒店接送至码头。试面镜、救生衣，告知三人均首次浮潜。</span></li><li><strong>抵达后｜先适应，再下水</strong><span>在受保护、向导认可的区域练习面镜佩戴、呼吸管使用、排水和求助手势，能舒服呼吸再继续。</span></li><li><strong>上午／午后｜分段体验</strong><span>与向导商定短时下水、中间上船休息。可按每次约 20—30 分钟考虑，感觉疲劳就提前结束，不追求凑满时长。</span></li><li><strong>午饭后｜沙滩与返程</strong><span>天气和体力允许才进行第二次；按团方时间返回。晚上简单吃饭，不再安排跨岛活动。</span></li></ol><p className="footnote">时间为行程设计，不是已订团时刻表；不承诺点位、下水次数或能见度。</p></article>
 <article><p className="number-label">03 / 订团前问清楚</p><h3>花钱买到真正的浮潜体验</h3><ul className="plain-list"><li><b>带队：</b>向导是否全程下水？一位水中向导照顾几人？是否能照顾三位初次浮潜者？</li><li><b>时间：</b>几个下水点、实际水中时间多少？不是仅有“提供面镜，自行玩水”。</li><li><b>装备：</b>面镜、呼吸管、脚蹼、合身救生衣是否包含？近视面镜有无额外收费？</li><li><b>总价：</b>酒店往返接送、午餐、码头／上岛／公园费、保险是否包含？</li><li><b>天气：</b>停航怎样退款？改路线、取消浮潜但照常上岛时怎样处理？</li><li><b>资质与救援：</b>核实旅行社资质、船上救生设施、人员清点与应急联络方式。</li></ul><p className="footnote">“有导游”不一定等于“有水中向导”。上面列出的商家页面是询价参考，具体日期余位和服务安排仍需确认。</p></article>
 </div>
 <div className="safety-panel"><div><LifeBuoy size={28}/><h3>第一次下水，记住这六件事</h3></div><ol><li>先练习、再入海。优先用合适的传统面镜与独立呼吸管，先在水外试呼吸。</li><li>穿合身救生衣，三人保持可相互观察的距离，并始终跟随水中向导。</li><li>只做水面浮潜。不憋气比远、不自行下潜、不追鱼离队，不靠近船尾和螺旋桨。</li><li>不舒服就停止。面镜漏水、呛水、紧张、疲劳或呼吸异常时，立即示意向导协助返回。</li><li>不踩珊瑚、不喂鱼、不捡海洋生物。穿防晒泳衣，按当地要求使用防晒产品。</li><li>不在酒后或明显不适时下水。购买覆盖浮潜与紧急医疗救援的保险；团方保险不能代替自行核对保障。</li></ol><p className="footnote"><Ref id="safety"/> <Ref id="travel"/> 本页为水面浮潜攻略；若临时改成水肺潜水，需要另做健康评估、培训与飞行间隔安排。</p></div>
 <div className="quiet-note"><b>普吉实际住宿</b><p>9/20—23 晚入住卡伦海滩的 Phuket Orchid Resort and Spa，9/24 退房后前往普吉机场。</p></div>
</section>
<section id="transport" className="section">
 <div className="section-title"><div><p className="eyebrow">ACTUAL TRANSFERS</p><h2>已经走过的航班与转车路线</h2></div><Plane size={25}/></div>
 <div className="transport-grid">
  <article><h3>9/20 · 9C8521</h3><p><b>上海 → 普吉 HKT：</b>搭乘 9C8521 抵达普吉岛，随后前往卡伦海滩的 Phuket Orchid Resort and Spa。</p><p><b>住宿：</b>9/20 入住，9/20—23 晚连续住宿，9/24 退房，共 4 晚。</p></article>
  <article><h3>9/24 · DD525、A1 与 Mo Chit</h3><p><b>HKT → DMK：</b>搭乘 DD525 从普吉飞抵廊曼机场。</p><p><b>DMK → Mo Chit：</b>从机场乘坐 A1 巴士到 Mo Chit Bus Terminal。</p><p><b>Mo Chit → 芭提雅：</b>在 1 号窗口购买前往 North Pattaya Bus Terminal 的车票，并抵达芭提雅北站。</p></article>
 </div>
</section>
<section id="budget" className="section">
 <div className="section-title"><div><p className="eyebrow">THE BUDGET</p><h2>为浮潜多留一点预算</h2></div><span className="tag neutral">全部为人民币规划额</span></div>
 <div className="budget-layout"><div className="budget-total"><Wallet size={26}/><p>每人参考总额</p><strong>¥{trip.plans.A.budget.toLocaleString()}</strong><span>三人合计 ¥{(trip.plans.A.budget*3).toLocaleString()}</span><hr/><p>住宿按 {trip.plans.A.nights} 晚、平均 ¥450／间／晚、三人分摊。一次浮潜和一场99秀（含新增晚间接驳 ¥350／人）已计入；机票是规划基准，以 9/30 飞往杭州的实际报价为准。</p></div><Table className="trip-table budget-table"><TableHeader><TableRow><TableHead>项目</TableHead><TableHead className="text-right">每人</TableHead></TableRow></TableHeader><TableBody>{budget.A.map(([name,amount])=><TableRow key={name}><TableCell>{name}</TableCell><TableCell className="text-right">¥{amount.toLocaleString()}</TableCell></TableRow>)}</TableBody></Table></div>
 <p className="footnote">购物、酒精和额外体验不包含。返程机票和酒店仍需按 9/30 的实际价格重新核算。</p>
</section>
<section id="packing" className="section">
 <div className="section-title"><div><p className="eyebrow">BEFORE YOU GO</p><h2>出发准备与行李清单</h2></div><Backpack size={26}/></div>
 <div className="entry-grid"><article><ShieldCheck size={23}/><h3>护照与免签</h3><p>按三人均持中国大陆普通护照赴泰旅游安排。9/15 起双边免签仍有效，单次不超过 30 天、每 180 天累计不超过 90 天。检查护照至少 6 个月有效期，带好订单与资金证明。</p><Ref id="visa"/> <Ref id="entry"/></article><article><CalendarDays size={23}/><h3>9/18—19 填 TDAC</h3><p>以 9/20 泰国当地落地为前提，在官方 3 天申报窗口内免费填写。每人填写真实航班、护照及首晚酒店，离线保存确认页；普吉飞曼谷不用再填。</p><a className="source-ref" href="https://tdac.immigration.go.th/" target="_blank" rel="noreferrer">官方填写入口 ↗</a> <Ref id="tdac">填写规则</Ref></article></div>
 <p className="footnote">现金：官方页面存在个人 1 万／2 万泰铢不同口径，建议出发前复核。资金允许时可按每人等值 2 万泰铢现金备查，这是保守准备建议；三位朋友分别准备，备查现金不等于额外收费或必须花完。<Ref id="entry"/> <Ref id="funds"/></p>
 <div className="packing-grid">{packing.map(([title,items],group)=><article key={title as string}><h3>{title}</h3>{(items as string[]).map((item,index)=><label className="pack-item" key={item}><Checkbox id={'pack-'+group+'-'+index} aria-label={item}/><span>{item}</span></label>)}</article>)}</div>
 <p className="footnote">清单勾选用于本次页面核对，刷新后重置。三人可共用部分洗护、转换插头与急救用品；证件、现金、通信和个人药物各自准备。</p>
 <div className="practical-grid"><article><h3>充电宝与行李</h3><p>充电宝随身携带、不得托运。泰国规定最多两个，机上不得使用／充电或放头顶行李架；建议每人只带一个标识清晰且不超过 100Wh 的型号。逐段核对航司行李和液体要求。</p><Ref id="power"/></article><article><h3>着装与当地出行</h3><p>宫殿当天穿长裤、有袖上衣。不要带电子烟、肉制品或新鲜果蔬跨境。不抵押护照，不在当地临时学骑摩托；三人分摊合规车辆，点海鲜先问计价方式。</p><Ref id="dress"/> <Ref id="travel"/></article></div>
 <div className="departure-order"><h3>订票与出发顺序</h3><ol><li><b>现在</b>按 9/30 返回杭州比三段机票 → 订三人房 → 保险与手机卡覆盖全程。</li><li><b>9/18—19</b>填 TDAC、保存订单，确认接机与入住。</li><li><b>9/21—23</b>按海况安排浮潜，确认天气退款规则。</li><li><b>9/23、9/25</b>分别确认次日机场去芭提雅、芭提雅回曼谷的车。</li><li><b>9/29</b>核对返程机场、起飞时刻与杭州抵达日期。</li></ol></div>
 <div className="emergency"><div><LifeBuoy size={24}/><h3>存好这几个电话</h3></div><div className="phone-grid"><a href="tel:1155"><b>1155</b><span>旅游警察 · 中文服务</span></a><a href="tel:191"><b>191</b><span>泰国报警</span></a><a href="tel:1669"><b>1669</b><span>泰国急救</span></a><a href="tel:+6622457010"><b>+66 2 245 7010</b><span>中国驻泰使馆领保</span></a><a href="tel:+66945956158"><b>+66 94 595 6158</b><span>驻普吉领事办公室</span></a></div><Ref id="visa">使馆联系信息</Ref> <Ref id="travel">急救电话来源</Ref></div>
</section>
<section id="sources" className="sources-section"><h2>查询来源</h2><p>实际航班、住宿和 9/24 转车路线根据本次亲历更新于 2026 年 9 月 25 日；其余未来安排仍以当天开放情况和最终订单为准。</p><div>{sources.map(([id,title,url])=><a href={url} key={id} target="_blank" rel="noreferrer">{title} ↗</a>)}</div></section>

  </main><footer>泰国旅行手记 · 实际行程更新 2026.09.25</footer>
  <script src="/trip-guide.js" defer />
 </div>;
}
