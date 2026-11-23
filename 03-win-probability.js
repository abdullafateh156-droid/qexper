/* ---- qazanma ehtimalı ---- */
function winProb(m,o,lead){const z=(m-o)/6+lead/14;return Math.max(3,Math.min(97,Math.round(100/(1+Math.exp(-z)))))}
function oddsEl(){if(!document.getElementById("arenaOdds")){const st=document.getElementById("arenaStatus");st.insertAdjacentHTML("beforebegin",'<div id="arenaOdds" style="margin:8px 0;font-size:13px"><div id="arenaOddsTxt" style="display:flex;justify-content:space-between;font-weight:800;gap:8px"></div><div style="height:8px;border-radius:6px;overflow:hidden;background:#3b6ea8;margin-top:4px"><i id="arenaOddsBar" style="display:block;height:100%;background:#e63946;width:50%;transition:width .6s"></i></div></div>')}}
function oddsPaint(p){oddsEl();document.getElementById("arenaOddsTxt").innerHTML=`<span>🎯 ${s.name}: ${p}%</span><span>${opponent.name}: ${100-p}%</span>`;document.getElementById("arenaOddsBar").style.width=p+"%"}
function oddsShow(m,o){oddsPaint(winProb(m,o,0))}
function oddsUpdate(rs,r,tot,m,o){let lead=0;for(let i=0;i<r;i++)lead+=(rs[i][0]-rs[i][1]);oddsPaint(winProb(m,o,lead))}
function renderEventCard(){
 const box=document.getElementById("eventCard"),meta=document.getElementById("eventMeta");if(!box)return;
 const dateOf=w=>{const d=new Date((s.calendarDate||"2026-11-13")+"T12:00:00");d.setDate(d.getDate()+(w-s.week)*7);return azDate(d)};
 const H=t=>String(t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
 if(s.week<(s.nextFightWeek||1)){
  meta.textContent=`Həftə ${s.week} • ${dateOf(s.week)} • Növbəti döyüşünə ${s.nextFightWeek-s.week} həftə qalıb`;
  const rows=[];for(let w=s.week;rows.length<4&&w<s.week+8;w++){if(evKind(w))rows.push(`<div class="eventrow"><span>${eventInfo(w).label}<br><small class="muted">📍 ${venueFor(w)}</small></span><span class="${w===s.nextFightWeek?"gold":"muted"}">${w===s.nextFightWeek?"⭐ SƏNİN DÖYÜŞÜN":dateOf(w)}</span></div>`)}
  box.innerHTML=`<div class="notice">Bu həftə sənin döyüşün yoxdur. Məşq et, enerji bərpa et. Növbəti döyüş: <b>${eventInfo(s.nextFightWeek).label}</b> — ${dateOf(s.nextFightWeek)}.<br>📍 ${venueFor(s.nextFightWeek)}</div><h4>Yaxın tədbirlər</h4>${rows.join("")}`;return}
 const w=s.nextFightWeek,info=eventInfo(w),card=buildCard(w);
 const oppName=opponent?H(opponent.name):"Rəqib müəyyənləşir";
 const _pro=s.careerLevel==="Peşəkar",rk=v=>_pro&&v!==undefined?(v===0?"🏆 ":"#"+v+" "):"";
 const row=(r,i)=>{const tag=SLOT_NAMES[i]==="MAIN EVENT"&&s.belt&&r.me?"TITLE FIGHT":SLOT_NAMES[i];
  return r.me?`<div class="eventrow" style="background:#e6394618"><span><b class="myrow">⭐ ${H(s.name)} vs ${oppName}</b></span><b class="gold">${tag}</b></div>`:`<div class="eventrow"><span>${rk(r.ra)}${H(r.a)} <b>VS</b> ${rk(r.rb)}${H(r.b)}</span><span class="muted">${tag}</span></div>`};
 const R=card.rows,pre=R.slice(4).map((r,k)=>row(r,4+k)).join(""),main=[R[3]&&row(R[3],3),R[2]&&row(R[2],2),R[1]&&row(R[1],1)].filter(Boolean).join(""),ev=row(R[0],0);
 s.cardSlot=card.slot;
 meta.textContent=`${info.label} • ${dateOf(w)} • ${s.weight} • ${s.careerLevel} • Sənin yerin: ${card.slot}`;
 box.innerHTML=`<div class="notice"><b>${info.label}</b> — ${dateOf(w)}<br>📍 <b>${venueFor(w)}</b><br>${s.careerLevel==="Amatör"?"Həvəskar qaydaları • 3 raund":s.careerLevel==="Regional"?"Regional qaydalar • 3 raund":s.belt&&card.slot==="MAIN EVENT"?"5 raundlu titul döyüşü":"UFC qaydaları • 3 raund"}</div>${_pro?`<p class="muted" style="font-size:12px">Slot reytinqə görə müəyyən olunur: kartda səndən yüksək sıralı döyüş yoxdursa MAIN EVENT, 1 döyüş varsa CO-MAIN, 2–3 varsa MAIN CARD.</p>`:""}<h4>PRELIMS</h4>${pre}<h4>MAIN CARD</h4>${main}<h4>MAIN EVENT</h4>${ev}`;
}

function preOdds(){try{let el=document.getElementById("preOdds");
 if(!opponent||s.week<(s.nextFightWeek||1)){if(el)el.remove();return}
 const E=x=>String(x).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
 const st=(document.getElementById("strategy")||{}).value||"balanced",S=s.stats;
 const bonus={balanced:(S.striking+S.wrestling+S.defense)/3,striker:S.striking*1.12,wrestler:(S.wrestling+S.grappling)*.56,counter:(S.defense+S.speed)*.56,pressure:(S.striking+S.stamina)*.56}[st];
 const m=avg()*.68+bonus*.32-fatiguePenalty(),p=winProb(m,opponent.power,0);
 if(!el){el=document.createElement("div");el.id="preOdds";el.style.cssText="margin-top:8px;font-size:13px";document.getElementById("fightPreview").insertAdjacentElement("afterend",el)}
 el.innerHTML=`<div class="muted" style="margin-bottom:6px">📍 ${E(venueFor(s.nextFightWeek))} • ${E(eventInfo(s.nextFightWeek).label)}</div><div style="display:flex;justify-content:space-between;font-weight:800;gap:8px"><span>🎯 ${E(s.name)}: ${p}%</span><span>${E(opponent.name)}: ${100-p}%</span></div><div style="height:8px;border-radius:6px;overflow:hidden;background:#3b6ea8;margin-top:4px"><i style="display:block;height:100%;width:${p}%;background:#e63946"></i></div><div class="muted" style="font-size:11px;margin-top:3px">Qazanma ehtimalı (seçdiyin strategiya və enerji daxil)</div>`}catch(e){}}
document.getElementById("strategy").addEventListener("change",preOdds);
function prepareFight(){
 if(s.dead||s.careerEnded){document.getElementById("offerStatus").textContent="Bu karyera bitib. Yeni karyera başlatmaq üçün sıfırla.";return;}
 if(s.week < (s.nextFightWeek||1))return;
 if(!opponent){
  const pool=tierOpponentPool();let choices=pool.filter(x=>x[0]!==lastOpponentName);if(!choices.length)choices=pool;
  const recent=(s.history||[]).slice(-4).map(h=>h.opponent);const fresh=choices.filter(x=>!recent.includes(x[0]));if(fresh.length>=3)choices=fresh;let o=null;const _pr=choices.filter(x=>x[5]!==undefined);if(s.careerLevel==="Peşəkar"&&_pr.length>=2){const R=s.rank||15,rl=Math.random(),dl=rl<.25?-(2+Math.floor(Math.random()*3)):rl<.45?(2+Math.floor(Math.random()*2)):(Math.floor(Math.random()*3)-1),want=Math.max(1,Math.min(15,R+dl));const srt=_pr.slice().sort((a,b)=>Math.abs(a[5]-want)-Math.abs(b[5]-want));o=srt[Math.floor(Math.random()*Math.min(2,srt.length))]}if(s.careerLevel!=="Peşəkar"){const _cap=choices.filter(x=>x[3]<=avg()+(s.careerLevel==="Regional"?7:9));if(_cap.length>=3)choices=_cap}const _rl=Math.random(),_off=_rl<.3?-(3+Math.random()*6):_rl<.7?(Math.random()*5-2):(3+Math.random()*5);const target=avg()+_off;
  const sorted=choices.sort((a,b)=>Math.abs(a[3]-target)-Math.abs(b[3]-target));
  if(!o)o=sorted[Math.floor(Math.random()*Math.min(3,sorted.length))];
  opponent={name:o[0],wins:o[1],losses:o[2],recordKnown:!Object.prototype.hasOwnProperty.call(fighterCountries,o[0])?true:false,country:fighterCountries[o[0]]||"",power:Math.max(30,Math.min(99,o[3]+Math.floor(Math.random()*5)-2)),style:o[4]||(["Boxer","Wrestler","Kickboxer","BJJ","Muay Thai"][Math.floor(Math.random()*5)])};lastOpponentName=o[0];opponent.rankIdx=o[5];s.cardSlot=buildCard(s.nextFightWeek).slot;
 }
 document.getElementById("fightHeading").textContent=`🔥 ${s.careerLevel==="Peşəkar"?"UFC":"Fight Night"} — ${s.weight}`;
 document.getElementById("myFightName").textContent=s.name;document.getElementById("myFightRecord").textContent=`${s.wins}-${s.losses}-${s.draws}`;
 document.getElementById("oppName").textContent=opponent.name;document.getElementById("oppRecord").textContent=`${opponent.recordKnown?`${opponent.wins}-${opponent.losses}-0`:"Rekord məlum deyil"} • ${opponent.country?opponent.country+" • ":""}${opponent.style||"MMA"}`;
 const avatars=document.querySelectorAll("#fight .matchup .avatar");setFace(avatars[0],s.name);setFace(avatars[1],opponent.name);
 document.getElementById("myPower").textContent=avg();document.getElementById("oppPower").textContent=Math.round(opponent.power);
 document.getElementById("fightPreview").textContent=`Stil: ${opponent.style||"MMA"} • `+(avg()>opponent.power+5?"Hazırlıq göstəricilərin yaxşıdır, amma rəqibi yüngül sayma.":avg()<opponent.power-5?"Rəqib bir az öndədir. Məşq və düzgün taktika vacib olacaq.":"Güc fərqi azdır. Bu qarşılaşmada xırda detallar həlledici ola bilər.");preOdds();
}
async function simulate(){
 if(!opponent)prepareFight();document.getElementById("startFight").disabled=true;document.getElementById("startFight").classList.add("hidden");const arenaMe=document.getElementById("arenaMe"),arenaOpp=document.getElementById("arenaOpp"),arenaStatus=document.getElementById("arenaStatus"),arenaRound=document.getElementById("arenaRound"),arenaProgress=document.getElementById("arenaProgress");setFace(arenaMe.querySelector(".arena-face"),s.name);setFace(arenaOpp.querySelector(".arena-face"),opponent.name);document.getElementById("arenaMeName").textContent=s.name;document.getElementById("arenaOppName").textContent=opponent.name;arenaMe.classList.remove("down");arenaOpp.classList.remove("down");arenaProgress.style.width="0%";const speedFactor={slow:1.45,normal:1,fast:.58}[gameSettings.fightSpeed||"normal"];const pause=ms=>new Promise(resolve=>setTimeout(resolve,window.__skipFight?0:ms*speedFactor));const strat=document.getElementById("strategy").value,stats=s.stats;
 const totalRounds=s.careerLevel==="Amatör"?3:(s.careerLevel==="Regional"?3:(s.belt?5:3));
 const logs=[],roundScores=Array.from({length:totalRounds},()=>[0,0]);let stamina=stats.stamina,oppStamina=70,finish=null,finishWinner=null,finishRound=totalRounds;
 const bonus={balanced:(stats.striking+stats.wrestling+stats.defense)/3,striker:stats.striking*1.12,wrestler:(stats.wrestling+stats.grappling)*.56,counter:(stats.defense+stats.speed)*.56,pressure:(stats.striking+stats.stamina)*.56}[strat];
 const myBase=avg()*.68+bonus*.32-fatiguePenalty();const oppBase=opponent.power;try{oddsShow(myBase,oppBase)}catch(e){}
 logs.push(`🔔 ${s.careerLevel==="Amatör"?"Həvəskar döyüş":s.belt?"Çempionluq əsas döyüşü":"Fight Night"} başladı! ${s.name} vs ${opponent.name}. ${totalRounds} raund.`);
 logs.push("🎙️ Şərhçi 1: Xanımlar və cənablar, döyüş gecəsinə xoş gəlmisiniz!");
 for(let r=1;r<=totalRounds;r++){
  let mine=0,theirs=0;logs.push(`— ${r}-cü raund başladı —`);
  logs.push("🎙️ "+commentaryLines[Math.floor(Math.random()*commentaryLines.length)]);
  for(let t=1;t<=5;t++){
   stamina=Math.max(15,stamina-(strat==="pressure"?5:3.5)+Math.random()*1.8);oppStamina=Math.max(18,oppStamina-3.5+Math.random()*1.5);
   const difficultyPenalty={easy:-5,normal:0,hard:3,legend:6}[gameSettings.difficulty]??0;
   let myChance=myBase+(stamina-65)*.13+(Math.random()*18-9),oppChance=oppBase+difficultyPenalty+(oppStamina-65)*.1+(Math.random()*18-9);
   if(strat==="striker"&&Math.random()<.28)myChance+=8;if(strat==="wrestler"&&Math.random()<.28)myChance+=8;if(strat==="counter"&&Math.random()<.25)myChance+=9;
   if(myChance>oppChance+3){mine+=1;logs.push(`R${r} • ${t*3}:00 — ${s.name} dəqiq hücumla üstünlük qazandı.`)}
   else if(oppChance>myChance+3){theirs+=1;logs.push(`R${r} • ${t*3}:00 — ${opponent.name} yaxşı cavab verdi.`)}
   else{mine+=.5;theirs+=.5;logs.push(`R${r} • ${t*3}:00 — bərabər mübarizə, hər iki döyüşçü xal topladı.`)}
   arenaRound.textContent=`${r}-CU RAUND • ${t*3}:00`;
   arenaMe.classList.toggle("active",myChance>=oppChance);arenaOpp.classList.toggle("active",oppChance>myChance);
   arenaStatus.className="arena-status impact";
   arenaStatus.textContent=myChance>oppChance?`🥊 ${s.name} zərbə endirir!`:`🥊 ${opponent.name} əks-hücum edir!`;
   arenaProgress.style.width=`${((r-1)*5+t)/(totalRounds*5)*100}%`;
   await pause(900);
  }
  roundScores[r-1]=[mine,theirs];try{oddsUpdate(roundScores,r,totalRounds,myBase,oppBase)}catch(e){}logs.push("🎙️ Şərhçi 2: Raund başa çatdı, görək hakimlər kimə üstünlük verəcək.");logs.push(`Raund ${r} yekunu: ${mine>theirs?"Sən üstün oldun":mine<theirs?"Rəqib üstün oldu":"Bərabər raund"}.`);
  // Finish attempts: striking knockouts, referee stoppages and grappling submissions.
  const strikeSkill=strat==="striker"||strat==="pressure"?stats.striking:stats.striking*.72;
  const grapplingSkill=strat==="wrestler"?stats.grappling+stats.wrestling:stats.grappling;
  const finishEdge=(myBase-oppBase)/100;
  const koChance=Math.max(.012,Math.min(.19,.055+(strikeSkill-oppBase)*.0012+finishEdge*.08));
  const tkoChance=Math.max(.012,Math.min(.18,.055+(stats.stamina-oppBase)*.001+finishEdge*.07));
  const subChance=Math.max(.01,Math.min(.15,.035+(grapplingSkill-oppBase)*.0015+(strat==="wrestler"?.035:0)));
  const roll=Math.random();
  if(r<totalRounds&&roll<koChance){finish="KO";finishRound=r;finishWinner=(myBase+Math.random()*22>=oppBase+Math.random()*22)?s.name:opponent.name;logs.push(`💥 ${finishWinner} güclü zərbə vurdu və rəqibini nokauta göndərdi! Hakim dərhal araya girdi.`);break}
  if(r<totalRounds&&roll<koChance+tkoChance){finish="TKO";finishRound=r;finishWinner=(myBase+Math.random()*22>=oppBase+Math.random()*22)?s.name:opponent.name;logs.push(`🛑 ${finishWinner} ardıcıl güclü zərbələr endirdi — hakim texniki nokautla döyüşü dayandırdı!`);break}
  if(roll<koChance+tkoChance+subChance){
   const subAttacker=(strat==="wrestler"||stats.grappling+stats.wrestling>opponent.power*1.35)?s.name:opponent.name;
   const subSkill=subAttacker===s.name?stats.grappling+stats.wrestling:opponent.power;
   const escapeSkill=subAttacker===s.name?opponent.power:stats.grappling+stats.wrestling;
   const subSuccess=Math.random()<Math.max(.18,Math.min(.88,.48+(subSkill-escapeSkill)*.012));
   if(subSuccess){finish="SUB";finishRound=r;finishWinner=subAttacker;logs.push(`🤼 ${subAttacker} boğma/ağrı fəndini tam oturtdu — rəqib təslim oldu! Submission ilə qələbə!`);break}
   logs.push(`🤼 ${subAttacker} submission cəhdi etdi, amma rəqib müdafiə olunub fənddən çıxdı! Döyüş davam edir.`);
   arenaStatus.className="arena-status impact";arenaStatus.textContent=`🤼 ${subAttacker} submission cəhdi! Rəqib fənddən çıxdı!`;
   await pause(700);
  }
  arenaMe.classList.remove("active");arenaOpp.classList.remove("active");
  arenaStatus.className="arena-status";
  arenaStatus.innerHTML=`📊 <b>${r}-ci raundun xalı:</b><br>${s.name}: ${Math.round(mine)} — ${opponent.name}: ${Math.round(theirs)}<br><small>${mine>theirs?"Bu raund səndədir":mine<theirs?"Bu raund rəqibdədir":"Raund bərabərdir"}</small>`;
  arenaRound.textContent=`${r}-CU RAUND BAŞA ÇATDI`;
  await pause(3500);
 }
 let mine=roundScores.reduce((a,b)=>a+b[0],0),theirs=roundScores.reduce((a,b)=>a+b[1],0);
 let outcome=finish?(finishWinner===s.name?"QƏLƏBƏ":"MƏĞLUBİYYƏT"):(mine>theirs?"QƏLƏBƏ":mine<theirs?"MƏĞLUBİYYƏT":"HEÇ-HEÇƏ");
 const method=finish==="KO"?"KO":finish==="TKO"?"TKO":finish==="SUB"?"SUB":"Hakimlərin yekdil/qismən qərarı";
 // Extremely rare fictional career-mode tragedy: 0.08% chance, only after a KO.
 let fatalIncident=false;
 if(finish==="KO" && Math.random()<0.0008){fatalIncident=true;const victim=finishWinner===s.name?opponent.name:s.name;logs.push(`🕯️ TƏCİLİ XƏBƏR: ${victim} nokautdan sonra ağır vəziyyətə düşdü və həkimlərin bütün səylərinə baxmayaraq həyatını itirdi. Döyüş dünyası yas içindədir.`);if(victim===s.name){s.dead=true;s.careerEnded=true;}}
 if(!finish)logs.push("🧑‍⚖️ Hakimlər kartları hesabladı — bu döyüş məsafəyə getdi!");
 logs.push(`🎙️ Şərhçi 1: Rəsmi nəticə — ${outcome}! ${method}.`); 
 if(Math.random()<.18)logs.push("🧢 Dana White: “Bu döyüşü bəyəndim! Qalib, ofisimə gəl — səninlə danışacağıq.”");
 const curRank=s.rank||15;
 if(outcome==="QƏLƏBƏ"){s.wins++;const prize=fightPurse("win",finish);s.cash+=prize;s.rating+=2;s.rank=s.careerLevel==="Peşəkar"?moveRank(true,finish,curRank):0;logs.push(`🏆 QƏLƏBƏ (${method})! Mükafat: ${money(prize)}.`);if(s.careerLevel==="Peşəkar")logs.push(rankMsg(curRank,s.rank))}
 else if(outcome==="MƏĞLUBİYYƏT"){s.losses++;const lossPrize=fightPurse("loss",finish);s.cash+=lossPrize;s.rating=Math.max(30,s.rating-1);s.rank=s.careerLevel==="Peşəkar"?moveRank(false,finish,curRank):0;logs.push(`Bu dəfə alınmadı. Məğlubiyyət ödənişi: ${money(lossPrize)}.`);if(s.careerLevel==="Peşəkar")logs.push(rankMsg(curRank,s.rank))}
 else{s.draws++;const dp=fightPurse("draw",finish);s.cash+=dp;logs.push(`Heç-heçə! Mükafat: ${money(dp)}.`)}
 s.day++;s.accepted=false;try{shuffleRanks(6);s.debutMain=false;sponsorAfterFight(logs);s.energy=Math.max(0,(s.energy??100)-(22+finishRound*8));logs.push(`⚡ Enerji: ${s.energy}/100 — istirahət etmək üçün növbəti həftəyə keç.`)}catch(e){console.error(e)}
 if(s.wins>=1&&!s.achievements.includes("İlk qələbə"))s.achievements.push("İlk qələbə");
 if(s.wins>=5&&!s.achievements.includes("5 qələbə"))s.achievements.push("5 qələbə");
 if(s.wins>=10&&!s.achievements.includes("10 qələbə"))s.achievements.push("10 qələbə");
 if(outcome==="QƏLƏBƏ"){
  if(s.careerLevel==="Amatör")s.amateurWins=(s.amateurWins||0)+1;
  else if(s.careerLevel==="Regional")s.regionalWins=(s.regionalWins||0)+1;
  else s.proWins=(s.proWins||0)+1;
 }
 const opponentName=opponent.name;
 const score=`${Math.round(mine)}-${Math.round(theirs)}`;s.history.push({opponent:opponentName,outcome,method,round:finishRound,score});
 s.nextFightWeek=nextOfferWeek();
 if(s.careerLevel==="Amatör"&&(s.amateurWins||0)>=4){s.careerLevel="Regional";s.rank=0;s.nextFightWeek=nextOfferWeek();if(!s.achievements.includes("Regional liqaya yüksəliş"))s.achievements.push("Regional liqaya yüksəliş");logs.push("📈 4 amatör qələbə qazandın və mərhələni keçdin! Regional turnir müqaviləsi qazandın. 6 regional qələbədən sonra UFC-yə keçəcəksən.");}
 else if(s.careerLevel==="Regional"&&(s.regionalWins||0)>=6){s.careerLevel="Peşəkar";s.rank=15;s.nextFightWeek=nextOfferWeek();if(!s.achievements.includes("Peşəkar liqaya keçid"))s.achievements.push("Peşəkar liqaya keçid");logs.push("📣 Peşəkar müqavilə! İndi UFC reytinqinə doğru yol başlayır.");}
 else if(s.careerLevel==="Peşəkar"&&s.rank===0){s.rank=15;}
 if(s.careerLevel==="Peşəkar"&&s.proWins>=8&&s.rank<=1&&!s.belt){s.belt=true;s.championshipWins++;logs.push("🏅 TƏBRİKLƏR! Çempionluq kəmərini qazandın!");}
 if(s.belt&&!s.achievements.includes("Çempion"))s.achievements.push("Çempion");
 s.eventNumber=ufcNo(s.nextFightWeek);
 opponent=null;if(s.history.length>20)s.history.shift();
 try{localStorage.setItem("ufcLegendsSaveV6",JSON.stringify(s))}catch(e){}
 try{await playFinishCinematic({finish,outcome,finishWinner,finishRound,myName:s.name,oppName:opponentName,roundScores,totalRounds,grim:fatalIncident})}catch(e){console.error(e)}
 // Final animation: show the correct winner and finish type.
 arenaMe.classList.remove("active");arenaOpp.classList.remove("active");
 const loserIsOpp=outcome==="QƏLƏBƏ";
 if(outcome==="HEÇ-HEÇƏ"){arenaMe.classList.remove("down");arenaOpp.classList.remove("down")}
 else (loserIsOpp?arenaOpp:arenaMe).classList.add("down");
 arenaStatus.className="arena-status finish";
 arenaStatus.textContent=finish==="KO"?`💥 ${finishWinner} — NOKAUT!`:finish==="TKO"?`🛑 ${finishWinner} — TEXNİKİ NOKAUT!`:finish==="SUB"?`🤼 ${finishWinner} — SUBMISSION QƏLƏBƏSİ!`:"🧑‍⚖️ HAKİMLƏRİN QƏRARI!";
 arenaRound.textContent=`${finishRound}-CU RAUND • ${method}`;
 await pause(1200);
 const roundCards=roundScores.map((sc,i)=>`<div class="roundcard"><b>${i+1}-ci raund</b>${i+1>finishRound?"<div class='muted'>Keçirilmədi — döyüş daha əvvəl bitdi.</div>":`<div>${s.name}: <strong>${Math.round(sc[0])}</strong> xal — ${opponentName}: <strong>${Math.round(sc[1])}</strong> xal</div><div class="muted">${sc[0]>sc[1]?"Raundu sən qazandın":sc[0]<sc[1]?"Raundu rəqib qazandı":"Raund heç-heçə bitdi"}</div>`}</div>`).join("");
 const finalWinner=outcome==="QƏLƏBƏ"?s.name:outcome==="MƏĞLUBİYYƏT"?opponentName:"Heç-heçə";
 document.getElementById("fightResult").innerHTML=`${s.dead?"<div class=\"big red\">🕯️ KARYERA FACİƏ İLƏ BİTDİ</div><p class=\"winnerline\">Döyüşçün ağır nokaut zədəsindən sonra həyatını itirdi. Bu karyera artıq davam etdirilə bilməz.</p>":""}<div class="big ${outcome==="QƏLƏBƏ"?"green":outcome==="MƏĞLUBİYYƏT"?"red":"gold"}">${outcome}</div><b>${method}</b><p class="winnerline">🏆 Qalib: ${finalWinner}</p><p class="muted">Ümumi hakim xalı: ${score} • ${finishRound} raund keçirildi (${totalRounds} raund planlaşdırılmışdı)</p>${roundCards}<p>Mükafat və karyera göstəriciləri yeniləndi.</p>`;
 document.getElementById("fightLog").innerHTML=logs.map(x=>`<p>${x}</p>`).join("");if(s.dead){document.getElementById("acceptFight").disabled=true;document.getElementById("declineFight").disabled=true;document.getElementById("startFight").disabled=true;}save();renderEventCard();document.getElementById("startFight").disabled=true;document.getElementById("startFight").textContent="DÖYÜŞ BAŞA ÇATDI";document.getElementById("startFight").dataset.done="1";document.getElementById("startFight").classList.remove("hidden");
}