import trip from '../public/trip.json';
import './trip-plan.css';

export const dateLabel=(date:number|string)=>Number(date)===1001?'10/1':`9/${date}`;
export default function TripPlan(){
 return <section className="trip-plan" id="plans" aria-label="选择返程方案">
  <div><p className="eyebrow">SAME JOURNEY, TWO ENDINGS</p><h2>9 月 29 日，回家还是再玩两天？</h2><p>9/20—28 行程相同：普吉 4 晚 → 芭提雅 2 晚 → 曼谷。切换后，地图、三餐、住宿日期与预算一起变化。</p></div>
  <div className="plan-options">{Object.entries(trip.plans).map(([id,p])=><button key={id} type="button" data-plan-switch={id} aria-pressed={id==='A'}><span>PLAN {id}</span><strong>{p.label}</strong><small>{p.dayCount} 天 {p.nights} 晚 · 曼谷连住 {p.bangkokNights} 晚</small><b>约 ¥{p.budget.toLocaleString()}／人</b></button>)}</div>
  <p className="plan-caveat">这是订票前的两套方案，需要提前选择返程机票和酒店，并非默认到 9/29 再免费改签。10/1 返程的机票差价另计，以实际含税含行李报价为准。</p>
 </section>;
}
