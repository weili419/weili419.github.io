import { Utensils, ChevronDown } from 'lucide-react';
import './food-map.css';
import { foodDays, type Option } from './food-data';

function FoodOption({option}:{option:Option}) {
 return <article className="food-option" data-meal-option>
  <div className="food-option-top"><span className="food-letter">实</span><h4>{option.name}</h4></div>
  <p className="food-dish">{option.dish}</p>
  <p className="food-price">{option.price}</p>
  <p className="food-tip">{option.tip}</p>
  <span className="food-condition">本次旅行实际记录</span>
 </article>;
}

export default function FoodGuide(){
 return <section id="food" className="section food-section">
  <div className="section-title"><div><p className="eyebrow">ACTUAL FOOD NOTES</p><h2>这次实际吃过的店</h2></div><span className="tag"><Utensils size={16}/> 只保留真实经历</span></div>
  <p className="food-intro">所有未吃过的餐厅和食物候选都已删除，只记录 9/21—9/23 实际吃过或明确提到的餐食。</p>
  <div className="food-days">
   {foodDays.map(day=><details className="food-day" key={day.date} name="meal-date" open={day.date==='21'} data-food-date={day.date}>
    <summary><span className="food-date">09.<b>{day.date}</b></span><span className="food-day-title"><strong>{day.city}</strong><small>{day.route}</small></span><span className="food-day-count">实际记录<small>{day.meals.length} 条</small></span><ChevronDown className="food-chevron" size={21}/></summary>
    <div className="food-day-body"><p className="food-day-note">{day.note}</p>
     {day.meals.map(m=><section className="food-meal" key={m.name} data-meal-name={m.name}><div className="food-meal-label"><h3>{m.name}</h3><span>已体验</span></div><div className="food-options">{m.options.map((option,i)=><FoodOption key={i} option={option}/>)}</div></section>)}
    </div>
   </details>)}
  </div>
 </section>;
}
