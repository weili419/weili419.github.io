(function(){
 'use strict';
 var frame=document.querySelector('.travel-map-frame');
 var plan=new URLSearchParams(location.search).get('plan')==='B'?'B':'A';
 function setPlan(next,notify){
  plan=next==='B'?'B':'A';
  document.documentElement.dataset.tripPlan=plan;
  document.querySelectorAll('[data-plan-switch]').forEach(function(button){button.setAttribute('aria-pressed',String(button.dataset.planSwitch===plan));});
  var url=new URL(location.href);url.searchParams.set('plan',plan);history.replaceState(null,'',url);
  document.querySelectorAll('a[href*="trip-map.html#"],a[href*="map.html#"]').forEach(function(link){
   var target=new URL(link.href,location.href),hash=new URLSearchParams(target.hash.slice(1));hash.set('plan',plan);target.hash=hash.toString();link.href=target.href;
  });
  if(notify&&frame&&frame.contentWindow)frame.contentWindow.postMessage({type:'trip-plan-set',plan:plan},'*');
 }
 if(frame)frame.addEventListener('load',function(){setPlan(plan,true);});
 window.addEventListener('message',function(event){
  if(frame&&event.source===frame.contentWindow&&event.data&&event.data.type==='trip-plan-change')setPlan(event.data.plan,false);
 });
 document.addEventListener('click',function(event){
  var button=event.target.closest('[data-plan-switch]');
  if(button){setPlan(button.dataset.planSwitch,true);return;}
  var link=event.target.closest('a[data-hotel-map],a[data-hotel-region],a[data-food-map],a[data-food-region]');
  if(!link||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||event.button>0)return;
  if(!frame||!frame.contentWindow)return;
  event.preventDefault();
  var food=link.hasAttribute('data-food-map')||link.hasAttribute('data-food-region');
  frame.contentWindow.postMessage(food?{type:'trip-food-focus',plan:plan,id:link.dataset.foodMap,region:link.dataset.foodRegion,date:link.dataset.foodDate}:{type:'trip-hotel-focus',plan:plan,id:link.dataset.hotelMap,region:link.dataset.hotelRegion},'*');
  document.getElementById('travel-map').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
 });
 setPlan(plan,true);
})();
