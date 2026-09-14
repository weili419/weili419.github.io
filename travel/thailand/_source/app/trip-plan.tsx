import trip from '../public/trip.json';
import './trip-plan.css';

export const dateLabel=(date:number|string)=>`9/${date}`;
export default function TripPlan(){
 return <section className="trip-plan" id="plans" aria-label="已确认返程计划">
  <div><p className="eyebrow">RETURN PLAN CONFIRMED</p><h2>9 月 30 日，从曼谷返回杭州</h2><p>9/20—30：普吉 4 晚 → 芭提雅 2 晚 → 曼谷 4 晚，最后飞往杭州萧山国际机场 HGH。9/29 保留 BACC 与 Siam 的曼谷行程。</p></div>
  <div className="plan-options"><div><span>返程</span><strong>{trip.plans.A.label}</strong><small>{trip.plans.A.dayCount} 天 {trip.plans.A.nights} 晚 · 曼谷连住 {trip.plans.A.bangkokNights} 晚</small><b>约 ¥{trip.plans.A.budget.toLocaleString()}／人</b></div></div>
  <p className="plan-caveat">机票和酒店尚未预订；请按 9/30 的起飞日期查询曼谷 BKK／DMK 至杭州 HGH 的航班。</p>
 </section>;
}
