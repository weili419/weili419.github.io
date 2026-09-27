import './show-guide.css';

export default function ShowGuide(){
 return <section id="shows" className="section show-guide">
  <div className="section-title"><div><p className="eyebrow">PATTAYA / ACTUAL NIGHTS</p><h2>9/25—26：酒吧闲逛与现场演出</h2></div><span className="subtle">只记录实际经历</span></div>
  <p className="show-intro">9/25 晚饭后去酒吧逛，还捡到了大哥撒的钱；9/26 晚上去酒吧听歌，意外听到古风中文歌，之后看了一场秀再回酒店。</p>
  <div className="show-schedule">
   <div><small>9/25 晚饭后</small><strong>酒吧闲逛</strong><p>Mae Wilai Market 吃完晚饭后去酒吧，最后回酒店。</p></div>
   <div><small>9/26 晚上</small><strong>酒吧听歌</strong><p>现场居然播放了古风中文歌，是当晚印象很深的一段。</p></div>
   <div><small>9/26 最后</small><strong>看了一场秀</strong><p>结束后返回酒店；未记录具体场馆名称，因此地图不虚构定位。</p></div>
  </div>
  <p className="footnote">酒吧和秀场的具体名称没有记录，所以这里只保留亲历内容，不添加未经确认的店名、场馆或地图坐标。</p>
 </section>;
}
