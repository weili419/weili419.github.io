import { Utensils, MapPin, ArrowUpRight, ChevronDown } from 'lucide-react';
import './food-map.css';
import { foodDays, foodSources, venues, type Option } from './food-data';
import foodLocations from '../public/food-locations.json';
import { dateLabel } from './trip-plan';

function FoodOption({option,index,date}:{option:Option;index:number;date:string}) {
 const venue=option.venue ? venues[option.venue] : undefined;
 const location=option.venue ? foodLocations[option.venue as keyof typeof foodLocations] : undefined;
 const number=option.venue ? Object.keys(venues).indexOf(option.venue)+1 : 0;
 const name=option.name??venue?.name;
 return <article className="food-option" data-meal-option>
  <div className="food-option-top"><span className="food-letter">{['A','B','C'][index]}</span><h4>{name}</h4></div>
  <p className="food-dish">{option.dish??venue?.dish}</p>
  <p className="food-price">{option.price??venue?.price}<span>／人 · 规划额</span></p>
  {venue && <p className="food-area"><MapPin size={14}/>{venue.area}</p>}
  <p className="food-tip">{option.tip??venue?.tip}</p>
  {venue ? <div className="food-links">{location&&<a className="food-pin-link" href={`/trip-map.html#food=food-${option.venue}&date=${date}`} data-food-map={`food-${option.venue}`} data-food-date={date}><MapPin size={15}/> F{number} · 在行程地图定位</a>}<a className="food-map-link" href={location?.source.startsWith('https://www.google.com/maps')?location.source:`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.query??venue.name)}`} target="_blank" rel="noreferrer">Google 地图查店 <ArrowUpRight size={14}/></a>{location&&<small className="food-location-note">{location.locationNote}</small>}<div>{venue.refs.map(id=><a key={id} href={foodSources[id].url} target="_blank" rel="noreferrer">{foodSources[id].label} ↗</a>)}</div></div> : <span className="food-condition">本次旅行实际记录</span>}
 </article>;
}

export default function FoodGuide(){
 return <section id="food" className="section food-section">
  <div className="section-title"><div><p className="eyebrow">ACTUAL FOOD NOTES</p><h2>这次实际吃过的店</h2></div><span className="tag"><Utensils size={16}/> 只保留真实经历</span></div>
  <p className="food-intro">原来的餐厅候选和三餐规划已经移除，只记录 9/21—9/23 实际吃过或明确提到的餐食。</p>
  <div className="food-days">
   {foodDays.map(day=><details className="food-day" key={day.date} name="meal-date" open={day.date==='21'} data-food-date={day.date}>
    <summary><span className="food-date">09.<b>{day.date}</b></span><span className="food-day-title"><strong>{day.city}</strong><small>{day.route}</small></span><span className="food-day-count">实际记录<small>{day.meals.length} 条</small></span><ChevronDown className="food-chevron" size={21}/></summary>
    <div className="food-day-body"><p className="food-day-note">{day.note}</p>
     {day.meals.map(m=><section className="food-meal" key={m.name} data-meal-name={m.name}><div className="food-meal-label"><h3>{m.name}</h3><span>已体验</span></div>{m.note&&<p className="food-meal-note">{m.note}</p>}<div className="food-options">{m.options.map((option,i)=><FoodOption key={i} option={option} index={i} date={day.date}/>)}</div></section>)}
    </div>
   </details>)}
  </div>
 </section>;
}
