
(function(){const _sv=simulate;simulate=async function(){try{const sp=document.querySelector("#fightAnimation .arena-top span");if(sp)sp.textContent=eventInfo(s.nextFightWeek).label+" • "+venueFor(s.nextFightWeek);const od=document.getElementById("arenaOdds");if(od)od.remove()}catch(e){}return _sv.apply(this,arguments)}})();
/* enerji qapısı: yorğun döyüşçü döyüşü qəbul etmir */
(function(){
 const ab=document.getElementById("acceptFight"),prev=ab.onclick;
 ab.onclick=function(){
  if(!s.dead&&!s.careerEnded&&!s.accepted&&s.week>=(s.nextFightWeek||1)&&(s.energy??100)<ENERGY_MIN){
   document.getElementById("offerStatus").textContent=`😮‍💨 Enerjin ${Math.round(s.energy)}/100. Komandan döyüşə çıxmağı məsləhət görmür (ən az ${ENERGY_MIN} lazımdır). Növbəti həftəyə keçib istirahət et.`;
   return}
  return prev.apply(this,arguments)};
})();
