import trip from '../public/trip.json';
import './trip-plan.css';

export const dateLabel=(date:number|string)=>`9/${date}`;
export default function TripPlan(){
 return <section className="trip-plan" id="plans" aria-label="实际行程与返程计划">
  <div><p className="eyebrow">TRIP IN PROGRESS</p><h2>实际行程已经更新到 9 月 26 日</h2><p>已记录普吉的用餐、潜水和转车，以及芭提雅的雨天闲逛、海边咖啡、夜市、Dongtan Beach、酒吧与演出经历。</p></div>
  <div className="plan-options"><div><span>接下来</span><strong>{trip.plans.A.label}</strong><small>{trip.plans.A.dayCount} 天 {trip.plans.A.nights} 晚 · 9/30 返回杭州萧山机场</small><b>已完成路线与未来计划合并展示</b></div></div>
 </section>;
}
