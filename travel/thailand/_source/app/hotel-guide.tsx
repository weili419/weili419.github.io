import { BedDouble, MapPin, ArrowUpRight } from 'lucide-react';
import hotels from '../public/hotels.json';

export default function HotelGuide(){
 const hotel=hotels[0];
 return <section id="hotels" className="section hotel-section">
  <div className="section-title"><div><p className="eyebrow">ACTUAL STAY</p><h2>普吉岛实际住宿</h2></div><span className="tag"><BedDouble size={16}/> 已入住</span></div>
  <p className="hotel-intro">页面只保留这次实际入住记录。</p>
  <div className="hotel-grid"><article className="hotel-card" id={hotel.id}>
   <div className="hotel-card-top"><span className="hotel-pin-id">住宿</span><span className="hotel-badge">{hotel.badge}</span></div>
   <h4>{hotel.name}</h4><p className="hotel-english">{hotel.en}</p><p className="hotel-area"><MapPin size={14}/>{hotel.area}</p>
   <div className="hotel-room"><strong>9/20 入住 · 9/24 退房</strong><span>9/20—9/23 晚，共 4 晚</span></div>
   <p className="hotel-why">{hotel.why}</p>
   <div className="hotel-actions"><a className="hotel-map-link" data-hotel-map={hotel.id} href={'/trip-map.html#hotel='+hotel.id} target="_blank" rel="noreferrer"><MapPin size={15}/> 在行程地图定位</a><a href={hotel.official} target="_blank" rel="noreferrer">酒店官网 <ArrowUpRight size={14}/></a></div>
  </article></div>
 </section>;
}
