
/* ===== Gizli rəqib: döyüş qəbul edilməmişdən əvvəl rəqib göstərilmir ===== */
(function(){
 const UNK="❓ Naməlum rəqib";
 let wasHidden=null,busy=false;
 const hidden=()=>{try{return !s.accepted}catch(e){return false}};
 const setT=(el,t)=>{if(el&&el.textContent!==t)el.textContent=t};
 function mask(){
  if(busy)return;busy=true;
  try{
   if(hidden()){
    setT(document.getElementById("oppName"),UNK);
    setT(document.getElementById("oppRecord"),"Qəbul etdikdən sonra açıqlanacaq");
    setT(document.getElementById("oppPower"),"??");
    setT(document.getElementById("fightPreview"),"Rəqibin kimliyi, rekordu və gücü döyüşü qəbul etdikdən sonra məlum olacaq.");
    const av=document.querySelectorAll("#fight .matchup .avatar")[1];
    if(av&&(av.querySelector("img")||av.textContent!=="❓")){av.innerHTML="❓";av.title=""}
    document.querySelectorAll("#eventCard b").forEach(b=>{
     if(b.textContent.indexOf("MAIN EVENT")>-1){const t="⭐ MAIN EVENT: "+s.name+" vs "+UNK;if(b.textContent!==t)b.textContent=t}
    });
    wasHidden=true;
   }else if(wasHidden){
    wasHidden=false;
    busy=false;
    try{prepareFight();renderEventCard()}catch(e){console.error(e)}
   }
  }catch(e){}
  busy=false;
 }
 const mo=new MutationObserver(()=>{mo.disconnect();mask();attach()});
 function attach(){["fight","eventCard"].forEach(id=>{const el=document.getElementById(id);if(el)mo.observe(el,{childList:true,subtree:true,characterData:true})})}
 /* mətbuat konfransı: rəqib məlum olmadan keçirilmir */
 const cb=document.getElementById("conferenceBtn"),co=cb&&cb.onclick;
 if(cb)cb.onclick=function(){
  if(hidden()){document.getElementById("conferenceText").innerHTML="Rəqib hələ məlum deyil. Mətbuat konfransı üçün əvvəlcə döyüşü qəbul et.";return}
  return co&&co.apply(this,arguments)};
 setInterval(mask,250);mask();attach();
})();
