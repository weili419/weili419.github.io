(function(){
 'use strict';
 var frame=document.querySelector('.travel-map-frame');
 document.addEventListener('click',function(event){
  var link=event.target.closest('a[data-hotel-map],a[data-hotel-region]');
  if(!link||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||event.button>0)return;
  if(!frame||!frame.contentWindow)return;
  event.preventDefault();
  frame.contentWindow.postMessage({type:'trip-hotel-focus',id:link.dataset.hotelMap,region:link.dataset.hotelRegion},'*');
  document.getElementById('travel-map').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
 });
})();
