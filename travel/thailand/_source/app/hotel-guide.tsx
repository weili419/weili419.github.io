import { BedDouble, MapPin, ArrowUpRight } from 'lucide-react';
import hotels from '../public/hotels.json';

export default function HotelGuide(){
 return <section id="hotels" className="section hotel-section">
  <div className="section-title"><div><p className="eyebrow">ACTUAL STAYS</p><h2>这次实际入住的酒店</h2></div><span className="tag"><BedDouble size={16}/> 已入住</span></div>
  <p className="hotel-intro">只保留普吉岛和芭提雅这次实际入住的两家酒店。</p>
  <div className="hotel-grid">{hotels.map(hotel=><article className="hotel-card" id={hotel.id} key={hotel.id}>
   <div className="hotel-card-top"><span className="hotel-pin-id">住宿</span><span className="hotel-badge">{hotel.badge}</span></div>
   <h4>{hotel.name}</h4><p className="hotel-english">{hotel.en}</p><p className="hotel-area"><MapPin size={14}/>{hotel.area}</p>
   <div className="hotel-room"><strong>{hotel.beds} · {hotel.size}</strong><span>{hotel.quotes[0].dates}</span></div>
   <p className="hotel-why">{hotel.why}</p>
   <div className="hotel-actions"><a className="hotel-map-link" data-hotel-map={hotel.id} href={'/trip-map.html#hotel='+hotel.id} target="_blank" rel="noreferrer"><MapPin size={15}/> 在行程地图定位</a><a href={hotel.official} target="_blank" rel="noreferrer">酒店官网 <ArrowUpRight size={14}/></a></div>
  </article>)}</div>
 </section>;
}
