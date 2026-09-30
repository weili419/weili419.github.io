import trip from '../public/trip.json';
import './trip-plan.css';

export const dateLabel=(date:number|string)=>`9/${date}`;
export default function TripPlan(){
 return <section className="trip-plan" id="plans" aria-label="实际行程与返程计划">
  <div><p className="eyebrow">TRIP COMPLETE</p><h2>实际行程已经更新到 9 月 30 日</h2><p>普吉、芭提雅、曼谷和 FD496 返回杭州的实际路线均已记录完成。</p></div>
  <div className="plan-options"><div><span>返程</span><strong>{trip.plans.A.label}</strong><small>{trip.plans.A.dayCount} 天 {trip.plans.A.nights} 晚 · 9/30 抵达杭州萧山机场</small><b>全程按实际经历展示</b></div></div>
 </section>;
}
