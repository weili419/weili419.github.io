import trip from '../public/trip.json';
import './trip-plan.css';

export const dateLabel=(date:number|string)=>`9/${date}`;
export default function TripPlan(){
 return <section className="trip-plan" id="plans" aria-label="实际行程与返程计划">
  <div><p className="eyebrow">TRIP IN PROGRESS</p><h2>实际行程已经更新到 9 月 24 日</h2><p>已记录班赞海鲜加工、芭东按摩与夜游、皇帝岛水肺和珊瑚岛浮潜、酒店休息与卡伦用餐；9/24 从 Kata Night Plaza 搭机场大巴，再乘 DD525、A1 和长途大巴前往芭提雅。</p></div>
  <div className="plan-options"><div><span>接下来</span><strong>{trip.plans.A.label}</strong><small>{trip.plans.A.dayCount} 天 {trip.plans.A.nights} 晚 · 9/30 返回杭州萧山机场</small><b>已完成路线与未来计划合并展示</b></div></div>
 </section>;
}
