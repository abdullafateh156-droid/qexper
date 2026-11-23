function faceFallback(name){
 // Fictional fighters use a deterministic locally-rendered MMA portrait, never random stock photos.
 return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(faceSvg(name,1))}`;
}
function setFace(el,name){
 if(!el)return;
 let photo=realFighterPhotos[name]||faceFallback(name);
 // The created fighter's uploaded portrait overrides every avatar placement.
 try{if(s&&name===s.name){const own=localStorage.getItem("ufcFighterProfilePhoto");photo=own||`data:image/svg+xml;charset=UTF-8,${encodeURIComponent(faceSvg(name,1,s.appearance))}`;}}catch(e){}
 const fallback=faceFallback(name);
 const isReal=!!realFighterPhotos[name];
 el.title=isReal?`${name} — real döyüşçü fotosu`:`${name} — AI üslublu uydurma portret`;
 el.innerHTML=`<img class="portrait" alt="${name} profil şəkli" src="${photo}" onerror="if(this.dataset.fallback!=='1'){this.dataset.fallback='1';this.src='${fallback}'}">`;
}
function setTab(tab){document.querySelectorAll(".page").forEach(x=>x.classList.toggle("hidden",x.id!==tab));document.querySelectorAll(".tab").forEach(x=>x.classList.toggle("active",x.dataset.tab===tab));if(tab==="fight")prepareFight()}
document.getElementById("tabs").addEventListener("click",e=>{let b=e.target.closest("[data-tab]");if(b)setTab(b.dataset.tab)});
document.querySelectorAll("[data-goto]").forEach(b=>b.onclick=()=>setTab(b.dataset.goto));
function bar(label,val){return `<div class="statrow"><span>${label}</span><div class="bar"><i style="width:${val}%"></i></div><b>${val}</b></div>`}
function render(){
 document.getElementById("fighterName").textContent=`${s.name} “${s.nick}”`;setFace(document.querySelector("#career .avatar"),s.name);document.getElementById("fighterMeta").textContent=`${s.weight} • ${s.country} • ${s.careerLevel||"Amatör"}`;
 document.getElementById("recordPill").textContent=`${s.wins}-${s.losses}-${s.draws}`;document.getElementById("rankPill").textContent=s.rank>0?`Sıralama: #${s.rank}`:`${s.careerLevel||"Amatör"} liqa`;document.getElementById("beltPill").textContent=s.belt?"Çempion 🏆":"Kəmər yoxdur";
 document.getElementById("rating").textContent=avg();document.getElementById("cash").textContent=money(s.cash);document.getElementById("mainStats").innerHTML=Object.entries({Zərbə:s.stats.striking,Güləş:s.stats.wrestling,Müdafiə:s.stats.defense,Dözümlülük:s.stats.stamina,Sürət:s.stats.speed,Texnika:s.stats.grappling}).map(([k,v])=>bar(k,v)).join("");
 document.getElementById("nameInput").value=s.name;document.getElementById("nickInput").value=s.nick;document.getElementById("countryInput").value=s.country;document.getElementById("weightInput").value=s.weight;
 const look=s.appearance||defaults.appearance;for(const [id,key] of [["lookSkin","skin"],["lookEye","eye"],["lookHair","hair"],["lookHairStyle","hairStyle"],["lookBrow","brow"],["lookEar","ear"],["lookBeard","beard"]]){const el=document.getElementById(id);if(el)el.value=String(look[key]);}
 document.getElementById("weekPill").textContent="HƏFTƏ "+s.week;
  const baseDate=new Date((s.calendarDate||"2026-11-13")+"T12:00:00"),nextDate=new Date(baseDate);nextDate.setDate(nextDate.getDate()+Math.max(0,(s.nextFightWeek-s.week))*7);
  const fmt=d=>azDate(d);
  document.getElementById("calendarInfo").textContent=`Bu gün: ${fmt(baseDate)} • Növbəti tədbir: ${fmt(nextDate)} • 📍 ${venueFor(s.nextFightWeek)}`;
  document.getElementById("eventNumberPill").textContent=eventInfo(s.nextFightWeek).label;
  document.getElementById("nextEventPill").textContent=`Növbəti döyüş: ${fmt(nextDate)}`;document.getElementById("weekInfo").textContent=`Həftə ${s.week}: məşq et, təqvimi yoxla və növbəti döyüşə hazırlaş.`;document.getElementById("gymStats").innerHTML=Object.entries({Zərbə:s.stats.striking,Güləş:s.stats.wrestling,Müdafiə:s.stats.defense,Dözümlülük:s.stats.stamina,Sürət:s.stats.speed,Texnika:s.stats.grappling}).map(([k,v])=>bar(k,v)).join("");
 const upgradeCost=s.careerLevel==="Amatör"?1000:s.careerLevel==="Regional"?2500:4000;document.getElementById("upgradePrice").textContent=money(upgradeCost);
 document.getElementById("trainingOptions").innerHTML=[["striking","Zərbə texnikası"],["wrestling","Güləş məşqi"],["defense","Müdafiə və yayınma"],["stamina","Kondisiya proqramı"],["speed","Sürət və çeviklik"],["grappling","Yerüstü texnika"]].map(([key,title])=>`<div class="result" style="display:flex;justify-content:space-between;align-items:center;gap:10px"><div><b>${title}</b><div class="muted">+1 göstərici • ${money(upgradeCost)}</div></div><button data-train="${key}" ${s.cash<upgradeCost||s.stats[key]>=99||(s.energy??100)<ENERGY_TRAIN?"disabled":""}>Upgrade et</button></div>`).join("");
 document.querySelectorAll("[data-train]").forEach(b=>b.onclick=()=>train(b.dataset.train));
 document.getElementById("recordStats").innerHTML=[["Döyüş sayı",s.wins+s.losses+s.draws],["Qələbə",s.wins],["Məğlubiyyət",s.losses],["Heç-heçə",s.draws],["Qələbə faizi",((s.wins/Math.max(1,s.wins+s.losses+s.draws))*100).toFixed(1)+"%"],["Ümumi reytinq",avg()],["Pul kisəsi",money(s.cash)],["Karyera günü",s.day]].map(([k,v])=>`<div class="statrow" style="grid-template-columns:1fr auto"><span>${k}</span><b>${v}</b></div>`).join("");
 document.getElementById("awards").innerHTML=s.achievements.length?s.achievements.map(a=>`<span class="pill gold" style="display:inline-block;margin:4px">🏅 ${a}</span>`).join(""):"<span class='muted'>Hələ nailiyyət yoxdur. İlk qələbəni qazan!</span>";
 document.getElementById("history").innerHTML=s.history.length?s.history.slice(-8).reverse().map(h=>`<div class="result"><b class="${h.outcome==="QƏLƏBƏ"?"green":h.outcome==="MƏĞLUBİYYƏT"?"red":"gold"}">${h.outcome}</b> — ${h.opponent}<div class="muted">${h.method} • ${h.round}-cü raund • ${h.score}</div></div>`).join(""):"<p class='muted'>Hələ döyüş tarixçən yoxdur.</p>";
 document.getElementById("goalTitle").textContent=s.belt?"Kəmərini qoru!":s.careerLevel==="Amatör"?"Amatör mərhələdə 5 qələbə qazan":s.careerLevel==="Regional"?"Regional liqada 8 qələbə qazan":s.rank<=5?"Çempionluq döyüşünə hazırsan!":"UFC ilk 5-liyinə yüksəl";
 document.getElementById("goalText").textContent=s.belt?"Növbəti müdafiə döyüşündə titulunu qoru.":s.rank<=5?"Növbəti döyüşdə qələbə səni kəmərə yaxınlaşdıracaq.":"Döyüşlər qazan, reytinq xalı topla və ilk 5-ə daxil ol.";
 renderRanking();renderEventCard();try{renderExtras()}catch(e){console.error(e)}
}
function train(key){const cost=s.careerLevel==="Amatör"?1000:s.careerLevel==="Regional"?2500:4000;if(!s.stats[key]||s.cash<cost||s.stats[key]>=99||(s.energy??100)<ENERGY_TRAIN)return;s.cash-=cost;s.energy=Math.max(0,(s.energy??100)-ENERGY_TRAIN);s.stats[key]=Math.min(99,s.stats[key]+1);save()}

document.getElementById("saveProfile").onclick=()=>{s.name=document.getElementById("nameInput").value.trim()||"Fighter";s.nick=document.getElementById("nickInput").value.trim()||"Legend";s.country=document.getElementById("countryInput").value;s.weight=document.getElementById("weightInput").value;opponent=null;save();prepareFight()};
function tierOpponentPool(){
 const all=divisionPools[s.weight]||divisionPools.Lightweight;
 if(s.careerLevel==="Amatör")return [
  ["Luca Bianchi",0,0,38,"Boxer"],["Mateusz Kowalski",1,0,40,"Wrestler"],["Kenji Sato",1,1,41,"Karateka"],
  ["Diego Morales",2,0,42,"Muay Thai"],["Omar Haddad",2,1,43,"BJJ"],["Ethan Brooks",3,1,44,"Boxer"],
  ["Nikolai Petrov",3,2,45,"Sambo"],["Thiago Costa",4,1,46,"Jiu-Jitsu"],["Jamal Carter",4,2,47,"Kickboxer"],
  ["Davit Beridze",2,1,42,"Wrestler"],["Alex Miller",5,1,49,"Boxer"],["Yuki Tanaka",4,0,51,"Karateka"],
  ["Carlos Silva",6,2,53,"Muay Thai"],["Pavel Novak",5,1,55,"Sambo"],["Moussa Diallo",7,2,57,"Wrestler"],
  ["Ryan Mitchell",8,1,59,"Kickboxer"],["Andrei Popescu",6,0,61,"Boxer"],["Hugo Santos",9,2,64,"BJJ"], ["Farid Mammadov",5,1,48,"Wrestler"], ["Emil Huseynli",6,2,50,"Boxer"], ["Santiago Ruiz",7,2,52,"Kickboxer"], ["Aiden Murphy",8,1,54,"BJJ"], ["Kamil Nowak",9,3,56,"Sambo"], ["Zaid Rahman",10,2,58,"Muay Thai"], ["Tural Aliyev",11,3,60,"Wrestler"], ["Marco Bellini",12,2,62,"Boxer"]
 ];
 if(s.careerLevel==="Regional")return [["Rashad Karimov",4,1,41,"Boxer"],["Milan Petrov",5,2,43,"Sambo"],["Ethan Brooks",6,2,45,"Wrestler"],["Lucas Ferreira",7,3,47,"BJJ"],["Artem Sokolov",8,3,49,"Kickboxer"],["Diego Santos",8,3,51,"Muay Thai"],["Noah Carter",9,4,53,"Boxer"],["Victor Chen",10,3,55,"Karateka"],["Andre Costa",11,4,57,"Jiu-Jitsu"],["Maksim Orlov",12,3,59,"Sambo"],["Leon Edwards Jr.",12,2,61,"Wrestler"],["Gabriel Moreira",13,4,63,"Muay Thai"],["Sean O'Connor",14,3,65,"Boxer"],["Kaito Nakamura",14,2,67,"Karateka"],["Darius King",16,5,69,"Kickboxer"],["Farid Mammadov",15,3,71,"Wrestler"],["Kamil Nowak",16,4,73,"Sambo"],["Yusuf Demir",17,4,75,"Boxer"],["Mateo Rojas",18,5,77,"Muay Thai"],["Tural Aliyev",19,3,79,"Wrestler"],["Nabil Haddad",20,4,81,"BJJ"]];
 const _R=s.rank||15;return rankList().map((n,i)=>[n,0,0,powerOfName(n,i),undefined,i]).filter(x=>x[5]>=Math.max(1,_R-4)&&x[5]<=Math.min(15,_R+3));
}
/* ===== V2: aylıq təqvim, mükafatlar, reytinq, sponsorlar, enerji ===== */
const ENERGY_MIN=60, ENERGY_TRAIN=8, ENERGY_WEEK=30;
const GAP_EVENTS={"Amatör":[1,2],"Regional":[2,3],"Peşəkar":[3,4]}; /* döyüşdən sonra neçə tədbir keçsin */
const PURSES={
 "Amatör":{ko:15000,sub:12000,win:10000,draw:7000,loss:5000},
 "Regional":{ko:30000,sub:25000,win:20000,draw:15000,loss:10000},
 "Peşəkar":{ko:75000,sub:55000,win:40000,draw:25000,loss:20000}
};
function fightPurse(kind,finish){const t=PURSES[s.careerLevel]||PURSES["Amatör"];if(kind==="win")return finish==="KO"||finish==="TKO"?t.ko:finish==="SUB"?t.sub:t.win;return t[kind]}
/* 4 həftəlik dövr: 1=Fight Night, 2=Əsas tədbir (UFC), 3=Fight Night, 4=tədbir yox */
function evKind(w){const m=((w-1)%4)+1;return m===1||m===3?"FN":m===2?"MAIN":null}
function ufcNo(w){return 334+Math.max(0,Math.floor((w-2)/4))}
function eventInfo(w){const k=evKind(w),L=s.careerLevel;
 if(!k)return{kind:null,label:"Bu həftə tədbir yoxdur"};
 if(L==="Peşəkar")return{kind:k,label:k==="MAIN"?`UFC ${ufcNo(w)}`:"UFC Fight Night"};
 if(L==="Regional")return{kind:k,label:k==="MAIN"?"Regional Championship Series":"Regional Fight Night"};
 return{kind:k,label:k==="MAIN"?"Amateur Grand Series":"Amateur Fight Night"}}
function nextEventWeek(from,n){let w=from,c=0;while(c<n){w++;if(evKind(w))c++}return w}
function nextOfferWeek(){const g=GAP_EVENTS[s.careerLevel]||[1,2];const n=g[0]+Math.floor(Math.random()*(g[1]-g[0]+1));return nextEventWeek(s.week,n)}
function pickSlot(){const r=Math.random();return r<.15?"MAIN EVENT":r<.35?"CO-MAIN EVENT":r<.70?"MAIN CARD":"PRELIMS"}
function fatiguePenalty(){return Math.max(0,Math.min(6,(85-(s.energy??100))/5))}
/* UFC reytinqi: 1 ən yaxşı, 15 ən aşağı. gap>0 = rəqib səndən yuxarıda sıralanıb */
function moveRank(win,finish,cur){
 const oR=opponent&&opponent.rankIdx,gap=oR===undefined?0:cur-oR,r=Math.random();
 if(win){let up;
  if(gap<=0)up=r<.5?0:r<.9?1:2;                 /* özündən zəifi udmaq: çox vaxt yerində qal və ya 1 pillə */
  else if(gap<=2)up=r<.15?0:r<.55?1:r<.9?2:3;
  else up=r<.1?1:r<.4?2:r<.75?3:4;              /* özündən xeyli güclünü udmaq: 2-4 pillə */
  if(finish&&Math.random()<.3)up++;
  return Math.max(1,cur-Math.min(up,5))}
 let dn;
 if(gap>=2)dn=r<.6?0:1;                          /* güclüyə uduzmaq: az itki */
 else if(gap>=-1)dn=r<.2?0:r<.7?1:2;
 else dn=r<.2?1:r<.6?2:3;                        /* zəifə uduzmaq: böyük itki */
 return Math.min(15,cur+dn)}
function rankMsg(a,b){return b<a?`📈 Sıralama: #${a} → #${b} (${a-b} pillə yüksəldin)`:b>a?`📉 Sıralama: #${a} → #${b} (${b-a} pillə düşdün)`:`➡️ Sıralamada yerində qaldın: #${b}`}
/* ---- sponsorlar ---- */
const SPONSORS={
 "Amatör":[
  {id:"a1",name:"Mahalla Gym",desc:"Yerli idman zalı",pay:1500,fights:3,need:0},
  {id:"a2",name:"Sabah Market",desc:"Məhəllə mağazası",pay:2000,fights:3,need:1},
  {id:"a3",name:"Qara Dəniz Protein Bar",desc:"Kiçik yerli brend",pay:2500,fights:3,need:2},
  {id:"a4",name:"Yeni Nəsil Barber",desc:"Şəhər bərbərxanası",pay:3000,fights:2,need:3}],
 "Regional":[
  {id:"r1",name:"Iron Wolf Gear",desc:"Regional idman geyimi",pay:4000,fights:3,need:0},
  {id:"r2",name:"Atlas Fitness",desc:"Zal şəbəkəsi",pay:5000,fights:3,need:1},
  {id:"r3",name:"FightFuel Energy",desc:"Enerji içkisi",pay:6000,fights:3,need:2},
  {id:"r4",name:"Nova Mobile",desc:"Mobil operator",pay:8000,fights:3,need:4}],
 "Peşəkar":[
  {id:"u1",name:"Venum",desc:"UFC geyim tərəfdaşı",pay:8000,fights:3,maxRank:15},
  {id:"u2",name:"Metro by T-Mobile",desc:"UFC rəsmi tərəfdaşı",pay:10000,fights:3,maxRank:12},
  {id:"u3",name:"Monster Energy",desc:"UFC rəsmi tərəfdaşı",pay:12000,fights:4,maxRank:8},
  {id:"u4",name:"Crypto.com",desc:"UFC rəsmi tərəfdaşı",pay:15000,fights:4,maxRank:5},
  {id:"u5",name:"Toyota",desc:"UFC rəsmi tərəfdaşı",pay:18000,fights:4,maxRank:3}]
};
const SP_SLOTS={"Amatör":1,"Regional":1,"Peşəkar":2};
let spNote="";
function spLeagueWins(){return s.careerLevel==="Amatör"?(s.amateurWins||0):s.careerLevel==="Regional"?(s.regionalWins||0):(s.proWins||0)}
function spMeets(d){return d.maxRank!==undefined?(s.belt||(s.rank||15)<=d.maxRank):spLeagueWins()>=d.need}
function spReq(d){return d.maxRank!==undefined?(d.maxRank>=15?"Şərt yoxdur":`Reytinq #${d.maxRank} və ya daha yaxşı`):(d.need?`${d.need} liqa qələbəsi lazımdır`:"Şərt yoxdur")}
function signSponsor(id){const L=s.careerLevel,d=(SPONSORS[L]||[]).find(x=>x.id===id);if(!d||s.sponsors.some(x=>x.id===id))return;
 if(s.sponsors.length>=SP_SLOTS[L]){spNote="Slotlar doludur. Əvvəlcə mövcud sponsorlardan birini ləğv et.";render();return}
 if(!spMeets(d)){spNote="Bu sponsorun şərtlərini hələ ödəmirsən.";render();return}
 s.sponsors.push({id:d.id,name:d.name,pay:d.pay,left:d.fights,lvl:L});spNote=`${d.name} ilə müqavilə imzalandı: hər döyüşə ${money(d.pay)}.`;save()}
function cancelSponsor(id){s.sponsors=s.sponsors.filter(x=>x.id!==id);spNote="Müqavilə ləğv edildi.";save()}
function sponsorAfterFight(logs){
 s.sponsors=(s.sponsors||[]).filter(x=>x.lvl===s.careerLevel);if(!s.sponsors.length)return;
 let tot=0;const names=[],ended=[];
 s.sponsors.forEach(x=>{tot+=x.pay;names.push(x.name);x.left--;if(x.left<=0)ended.push(x.name)});
 s.cash+=tot;logs.push(`🤝 Sponsor ödənişi: +${money(tot)} (${names.join(", ")})`);
 s.sponsors=s.sponsors.filter(x=>x.left>0);
 if(ended.length)logs.push(`📄 Sponsor müqaviləsi bitdi: ${ended.join(", ")}. Sponsorlar bölməsindən yenisini seç.`)}
function renderExtras(){
 if(!evKind(s.nextFightWeek))s.nextFightWeek=nextEventWeek(Math.max(0,(s.nextFightWeek||1)-1),1);
 s.sponsors=(s.sponsors||[]).filter(x=>x.lvl===s.careerLevel).slice(0,SP_SLOTS[s.careerLevel]||1);
 const en=Math.round(s.energy??100),set=(id,t)=>{const e=document.getElementById(id);if(e)e.textContent=t};
 set("energyPill",`⚡ Enerji ${en}/100`);set("gymEnergy",`${en}/100`);
 const ev=eventInfo(s.week);const cyc=[1,2,3,4].map(i=>{const w=s.week-((s.week-1)%4)+i-1;return(w===s.week?"▶ ":"")+(evKind(w)==="MAIN"?"UFC":evKind(w)==="FN"?"Fight Night":"—")}).join(" • ");
 set("weekInfo",`Həftə ${s.week}: ${ev.kind?ev.label:"tədbir yoxdur"}. Bu ayın cədvəli: ${cyc}. Enerji: ${en}/100.`);
 const box=document.getElementById("sponsorBox");if(!box)return;
 const L=s.careerLevel,slots=SP_SLOTS[L]||1,list=SPONSORS[L]||[];
 const mine=s.sponsors.length?s.sponsors.map(x=>`<div class="result" style="display:flex;justify-content:space-between;align-items:center;gap:10px"><div><b>${x.name}</b><div class="muted">${money(x.pay)} / döyüş • ${x.left} döyüş qalıb</div></div><button data-spcancel="${x.id}">Ləğv et</button></div>`).join(""):`<p class="muted">Hələ aktiv sponsorun yoxdur.</p>`;
 const avail=list.filter(d=>!s.sponsors.some(x=>x.id===d.id)).map(d=>{const ok=spMeets(d);return`<div class="result" style="display:flex;justify-content:space-between;align-items:center;gap:10px"><div><b>${d.name}</b><div class="muted">${d.desc} • ${money(d.pay)} / döyüş • ${d.fights} döyüş</div><div class="muted" style="font-size:12px">${ok?"✅ ":"🔒 "}${spReq(d)}</div></div><button data-spsign="${d.id}" ${ok?"":"disabled"}>İmzala</button></div>`}).join("");
 box.innerHTML=`<p class="muted">${L} səviyyəsi • Slot: ${s.sponsors.length}/${slots}. Sponsor hər döyüşdən sonra ödəniş edir (nəticədən asılı olmayaraq). Liqa dəyişəndə köhnə liqanın sponsorları bitir.</p>${spNote?`<div class="notice">${spNote}</div>`:""}<h4>Aktiv müqavilələr</h4>${mine}<h4>Təkliflər</h4>${avail}`;
 box.querySelectorAll("[data-spsign]").forEach(b=>b.onclick=()=>signSponsor(b.dataset.spsign));
 box.querySelectorAll("[data-spcancel]").forEach(b=>b.onclick=()=>cancelSponsor(b.dataset.spcancel));
}

/* ---- dəyişkən reytinq cədvəli ---- */
function rankList(){
 const data=divisionRankings[s.weight]||divisionRankings.Lightweight;
 s.rankOrder=s.rankOrder||{};
 let o=s.rankOrder[s.weight];
 if(!Array.isArray(o)||o.length!==16)o=s.rankOrder[s.weight]=[data.champion].concat(data.fighters);
 return o}
function powerOfName(n,i){const p=(divisionPools[s.weight]||divisionPools.Lightweight).find(x=>x[0]===n);return p?p[3]:Math.max(65,99-i*2)}
function shuffleRanks(times){
 const o=rankList();s.rankPrev=s.rankPrev||{};s.rankPrev[s.weight]=o.slice();
 for(let k=0;k<times;k++){
  const i=2+Math.floor(Math.random()*14),j=Math.max(1,i-1-Math.floor(Math.random()*5));if(j>=i)continue;
  const n=o.splice(i,1)[0];
  if(Math.random()<.5)o.splice(j,0,n);
  else o.splice(Math.min(15,i+1+Math.floor(Math.random()*3)),0,n)}
 if(!s.belt&&Math.random()<.12){const c=o[0];o[0]=o[1];o[1]=c}}
function rankArrow(x){
 if(x.you||x.champion)return"";const prev=s.rankPrev&&s.rankPrev[s.weight];if(!prev)return"";
 const old=prev.indexOf(x.name);if(old<0)return"";const d=old-x.rank;
 return d>0?` <span class="green">▲${d}</span>`:d<0?` <span class="red">▼${-d}</span>`:""}
/* ---- məkanlar ---- */
const VENUES={
 "Peşəkar":["T-Mobile Arena — Las Vegas, ABŞ","UFC APEX — Las Vegas, ABŞ","Madison Square Garden — Nyu-York, ABŞ","O2 Arena — London, Britaniya","Etihad Arena — Abu-Dabi, BƏƏ","Baku Crystal Hall — Bakı, Azərbaycan","Climate Pledge Arena — Sietl, ABŞ","Rogers Arena — Vankuver, Kanada","Qudos Bank Arena — Sidney, Avstraliya","Ginásio do Ibirapuera — San-Paulu, Braziliya"],
 "Regional":["Sumqayıt Olimpiya Kompleksi — Sumqayıt","Gəncə Şəhər İdman Sarayı — Gəncə","Tbilisi Arena — Tbilisi, Gürcüstan","Ataşehir Spor Salonu — İstanbul, Türkiyə","Arena Gliwice — Qlivitse, Polşa","Palais des Sports — Paris, Fransa","Milano Fight Hall — Milan, İtaliya","Dubai Fight Dome — Dubay, BƏƏ"],
 "Amatör":["Bakı Məhəllə İdman Kompleksi — Bakı","Lənkəran Şəhər Zalı — Lənkəran","Mingəçevir İdman Sarayı — Mingəçevir","Şəki Gənclər Mərkəzi — Şəki","Naxçıvan Olimpiya Zalı — Naxçıvan","Quba Rayon İdman Zalı — Quba"]};
function venueFor(w){const L=VENUES[s.careerLevel]||VENUES["Amatör"];return L[(w*7+Math.floor(w/4)*3)%L.length]}
/* ---- kart: slot reytinqə (və ya gücə) görə müəyyən olunur ---- */
function seededRand(seed){let x=(seed>>>0)||1;return()=>{x^=x<<13;x>>>=0;x^=x>>>17;x^=x<<5;x>>>=0;return x/4294967296}}
const SLOT_NAMES=["MAIN EVENT","CO-MAIN EVENT","MAIN CARD","MAIN CARD","PRELIMS","PRELIMS","PRELIMS"];
function buildCard(w){
 const pro=s.careerLevel==="Peşəkar",rnd=seededRand(w*7919+(s.weight||"").length*104729+(s.careerLevel||"").length*31);
 let f=pro?rankList().map((n,i)=>({name:n,imp:i})):tierOpponentPool().map(x=>({name:x[0],imp:-x[3]}));
 const seen={};f=f.filter(x=>{if(seen[x.name]||x.name===s.name||(opponent&&x.name===opponent.name))return false;seen[x.name]=1;return true});
 for(let i=f.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[f[i],f[j]]=[f[j],f[i]]}
 const rows=[];for(let i=0;i+1<Math.min(f.length,12);i+=2)rows.push({a:f[i].name,b:f[i+1].name,ra:pro?f[i].imp:undefined,rb:pro?f[i+1].imp:undefined,imp:Math.min(f[i].imp,f[i+1].imp)});
 const myImp=pro?Math.min(s.rank||15,opponent&&opponent.rankIdx!==undefined?opponent.rankIdx:15):-Math.max(avg(),opponent?opponent.power:0);
 rows.push({me:true,imp:myImp});
 rows.sort((x,y)=>x.imp-y.imp||(x.me?-1:y.me?1:0));
 let idx=rows.findIndex(x=>x.me);
 if(s.debutMain&&idx>2){const m=rows.splice(idx,1)[0];rows.splice(2,0,m);idx=2}
 return{rows:rows.slice(0,7),idx:Math.min(idx,6),slot:SLOT_NAMES[Math.min(idx,6)]}}