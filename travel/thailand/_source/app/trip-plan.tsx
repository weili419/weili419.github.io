import trip from '../public/trip.json';
import './trip-plan.css';

export const dateLabel=(date:number|string)=>`9/${date}`;
export default function TripPlan(){
 return <section className="trip-plan" id="plans" aria-label="实际行程与返程计划">
  <div><p className="eyebrow">TRIP IN PROGRESS</p><h2>实际行程已经更新到 9 月 24 日</h2><p>9/20 搭乘 9C8521 到普吉，在 Phuket Orchid Resort and Spa 住 4 晚；9/24 搭乘 DD525 到廊曼机场，再坐 A1 到 Mo Chit、从 1 号窗口买票前往芭提雅北站。</p></div>
  <div className="plan-options"><div><span>接下来</span><strong>{trip.plans.A.label}</strong><small>{trip.plans.A.dayCount} 天 {trip.plans.A.nights} 晚 · 9/30 返回杭州萧山机场</small><b>已完成路线与未来计划合并展示</b></div></div>
 </section>;
}
