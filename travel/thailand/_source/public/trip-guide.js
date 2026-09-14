(function(){
 'use strict';
 var frame=document.querySelector('.travel-map-frame');
 document.addEventListener('click',function(event){
  var link=event.target.closest('a[data-hotel-map],a[data-hotel-region],a[data-food-map],a[data-food-region]');
  if(!link||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||event.button>0)return;
  if(!frame||!frame.contentWindow)return;
  event.preventDefault();
  var food=link.hasAttribute('data-food-map')||link.hasAttribute('data-food-region');
  frame.contentWindow.postMessage(food?{type:'trip-food-focus',id:link.dataset.foodMap,region:link.dataset.foodRegion,date:link.dataset.foodDate}:{type:'trip-hotel-focus',id:link.dataset.hotelMap,region:link.dataset.hotelRegion},'*');
  document.getElementById('travel-map').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
 });
})();
