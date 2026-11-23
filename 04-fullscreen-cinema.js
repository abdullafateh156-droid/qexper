document.getElementById("startFight").onclick=()=>{if(document.getElementById("startFight").dataset.done==="1"){document.getElementById("startFight").dataset.done="";document.getElementById("startFight").textContent="DÖYÜŞÜ SİMULYASİYA ET";document.getElementById("startFight").disabled=false;prepareFight();return}simulate()};

document.getElementById("acceptFight").onclick=()=>{
 if(s.dead||s.careerEnded){document.getElementById("offerStatus").textContent="Bu karyera artıq başa çatıb. Yeni karyera üçün sıfırla.";return;}
 if(s.week < (s.nextFightWeek||1)){document.getElementById("offerStatus").textContent="Bu həftə döyüş təklifi yoxdur. Növbəti tədbiri gözlə.";return}
 if(!opponent)prepareFight();s.accepted=true;
 document.getElementById("offerStatus").textContent="Döyüş qəbul edildi! Hazır olanda “BAŞLA” düyməsinə bas.";
 document.getElementById("startFight").disabled=false;save();
};
document.getElementById("declineFight").onclick=()=>{
 if(s.dead||s.careerEnded){document.getElementById("offerStatus").textContent="Bu karyera artıq bitib.";return;}
 if(s.week < (s.nextFightWeek||1)){document.getElementById("offerStatus").textContent="İmtina ediləcək döyüş təklifi yoxdur.";return}
 if(!opponent)prepareFight();s.accepted=false;const declineFee=s.careerLevel==="Amatör"?0:s.careerLevel==="Regional"?500:2000;s.cash=Math.max(0,s.cash-declineFee);
 opponent=null;document.getElementById("startFight").disabled=true;
 document.getElementById("offerStatus").textContent=declineFee===0?"Təklifdən imtina etdin. Cərimə yoxdur.":`Təklifdən imtina etdin. ${money(declineFee)} təşkilati cərimə tutuldu.`;
 prepareFight();save();
};
document.getElementById("nextWeek").onclick=()=>{
 if(s.dead||s.careerEnded)return;
 const missed=s.week>=(s.nextFightWeek||1);
 s.week++;s.day+=7;s.accepted=false;const d=new Date((s.calendarDate||"2026-11-13")+"T12:00:00");d.setDate(d.getDate()+7);s.calendarDate=d.toISOString().slice(0,10);
 s.energy=Math.min(100,(s.energy??100)+ENERGY_WEEK);try{shuffleRanks(8)}catch(e){}
 rankingsCache={};document.getElementById("startFight").disabled=true;
 if(missed){s.nextFightWeek=nextEventWeek(s.week-1,1);opponent=null}
 if(s.week>=s.nextFightWeek){
   opponent=null;prepareFight();
   document.getElementById("offerStatus").textContent=`Döyüş həftəsidir! ${eventInfo(s.week).label} — təklifi qəbul edə bilərsən.`;
 } else {
   document.getElementById("offerStatus").textContent=`Bu həftə döyüş yoxdur. Növbəti döyüş ${s.nextFightWeek-s.week} həftə sonra təklif olunacaq. Məşq et və istirahət et.`;
   document.getElementById("oppName").textContent="Döyüş təklifi yoxdur";
   document.getElementById("oppRecord").textContent="Təlim və bərpa həftəsi";
   document.getElementById("myPower").textContent=avg();
   document.getElementById("oppPower").textContent="—";
 }
 save();renderEventCard();
};



function renderEventCard_old(){
 const box=document.getElementById("eventCard"),date=new Date((s.calendarDate||"2026-11-13")+"T12:00:00");
 const dateText=azDate(date);
 if(s.week<(s.nextFightWeek||1)){document.getElementById("eventMeta").textContent=`Həftə ${s.week} • ${dateText} • Tədbirə ${s.nextFightWeek-s.week} həftə qalıb`;box.innerHTML=`<div class="notice">Növbəti döyüş həftəsi hələ çatmayıb. Təqvim: ${dateText}. Məşq et və növbəti həftəyə keç.</div>`;return;}
 const label=s.careerLevel==="Peşəkar"?`UFC ${s.eventNumber||334}`:s.careerLevel==="Regional"?"Regional Fight Night":"Amateur Fight Series";
 const pool=tierOpponentPool().filter(x=>!opponent||x[0]!==opponent.name),card=pool.slice(0,4);
 const prelim=card.map((x,i)=>`<div class="eventrow"><span>${x[0]} <b>VS</b> ${card[(i+1)%card.length]?.[0]||"Rəqib"}</span><span class="muted">PRELIMS</span></div>`).join("");
 document.getElementById("eventMeta").textContent=`${label} • ${dateText} • ${s.weight} • ${s.careerLevel}`;
 box.innerHTML=`<div class="notice"><b>${label}</b> — ${dateText}<br>${s.careerLevel==="Amatör"?"Həvəskar qaydaları • 3 raund":s.careerLevel==="Regional"?"Regional qaydalar • 3 raund":s.belt?"5 raundlu titul döyüşü":"UFC qaydaları • 3 raund"}</div><h4>PRELIMS</h4>${prelim}<h4>MAIN CARD</h4><div class="eventrow" style="background:#e6394618"><b>⭐ MAIN EVENT: ${s.name} vs ${opponent?opponent.name:"Rəqib müəyyənləşir"}</b><b class="gold">${s.belt?"TITLE FIGHT":"MAIN CARD"}</b></div>`;
}

const trashTalk=[
 ["Mən səni ilk raundda bitirəcəyəm.","Sən əvvəlcə qəfəsə sağ-salamat gir, sonra danışarıq."],
 ["Sənin rekordun kağız üzərində yaxşı görünür. Amma mən kağız deyiləm.","Boş-boş danışma. Sənin planını çoxdan oxumuşam."],
 ["Bu döyüş sənin üçün böyük fürsətdir. Mənim üçün adi iş günüdür.","Özünü ulduz hesab edirsən? Hələ heç nə qazanmamısan."],
 ["Sənin güləşin mənə təsir etmir. Ayağa qalxmağı bacarıram.","Mən səni yerə salanda fikrin dəyişəcək."],
 ["Mənim zərbələrimlə tanış olanda bu müsahibəni xatırlayacaqsan.","Çox lovğalanma, dostum. Qəfəsdə qaçmağa yer yoxdur."],
 ["Sənə hörmətim var, amma şənbə günü səni məğlub edəcəyəm.","Hörmətini özündə saxla. Mən qələbə üçün gəlmişəm."],
 ["Bu qədər danışmağın səbəbi qorxmağındır?","Qorxan mən deyiləm. Sən döyüş günü bunu anlayacaqsan."],
 ["Mən səni nokauta salacağam, sonra bəhanələrini dinləyəcəyəm.","Lənət olsun, nə qədər özündən razısan. Gəl bunu qəfəsdə həll edək."],
 ["Sən mənim səviyyəmdə deyilsən.","Bunu deyən ilk adam deyilsən. Hamısı uduzub gedib."],
 ["Mən çempion olmaq üçün gəlmişəm, dost qazanmağa yox.","Sənin çempionluq xəyalını dağıtmağa hazıram."],
 ["Ağzını yığ, qardaş. Qəfəsdə danışmaq yox, döyüşmək lazımdır.","Sən kimsən ki, mənə dərs keçirsən?"],
 ["Məşq zalında güclüsən, amma işıqlar yananda donub qalacaqsan.","Mən təzyiq altında daha təhlükəli oluram."],
 ["Səni güləşə çəkəcəyəm, sonra çıxış yolu axtaracaqsan.","Məni tutmaq sənin düşündüyün qədər asan deyil."],
 ["Sənin kardion bitəndə mən hələ isinməmiş olacağam.","Mənim tempimə tab gətirə bilməyəcəksən."],
 ["Bu döyüşdən sonra reytinqdə mənim adım sənin üstündə olacaq.","Əvvəl məni məğlub et, sonra reytinqdən danışarsan."],
 ["Mən bu gecə hamıya niyə burada olduğumu göstərəcəyəm.","Sənə uğurlar. Amma qələbəni mən aparacağam."],
 ["Bu, sənin üçün pis gecə olacaq, əmin ol.","Görək kim kimin gecəsini korlayır."],
 ["Sənin zərbələrin zəifdir, özünə inamın isə həddindən artıqdır.","Danışmağı dayandır və döyüşə hazırlaş."]
];
const commentaryLines=[
 "Şərhçi 1: Döyüş başladı! Hər iki idmançı məsafəni yoxlayır.",
 "Şərhçi 2: Gözəl kombinasiya! Bu tempdə döyüş çox maraqlı olacaq.",
 "Şərhçi 1: Rəqib təzyiqi artırır, amma müdafiə də yerindədir.",
 "Şərhçi 2: Əla takedown cəhdi! İndi qəfəs kənarında mübarizə gedir.",
 "Şərhçi 1: Tamaşaçılar ayaqdadır! Bu raundun taleyi dəyişə bilər.",
 "Şərhçi 2: Nə zərbə idi! Rəqib özünü tez toparlamalıdır.",
 "Şərhçi 1: Çox ağıllı kontratak. Vaxtlaması əladır.",
 "Şərhçi 2: Raundun son saniyələri — hər iki döyüşçü son gücünü qoyur."
];
document.getElementById("conferenceBtn").onclick=()=>{
 if(!opponent&&s.week>=(s.nextFightWeek||1))prepareFight();
 if(s.week<(s.nextFightWeek||1)||!opponent){document.getElementById("conferenceText").innerHTML="Hələ mətbuat konfransı yoxdur. Döyüş həftəsini gözlə.";return;}
 const pair=trashTalk[Math.floor(Math.random()*trashTalk.length)];
 const journalist=[
  `Jurnalist: “${opponent.name}, rəqibinin ən zəif tərəfi nədir?”`,
  `Jurnalist: “${s.name}, bu döyüşdə təzyiq hiss edirsən?”`,
  `Jurnalist: “Sizcə, döyüş hakimlərin qərarına gedəcək?”`,
  `Jurnalist: “Qalib gələn növbəti kimə meydan oxuyacaq?”`,
  `Jurnalist: “Rəqibinizin dediklərinə cavabınız nədir?”`,
  `Jurnalist: “Azarkeşlərə nə söz verirsiniz?”`
 ];
 const exchanges=[
  `${s.name}: “${pair[0]}”`,
  `${opponent.name}: “${pair[1]}”`,
  `${s.name}: “Mən nəticə göstərməyə gəlmişəm. Bəhanə eşitmək istəmirəm.”`,
  `${opponent.name}: “Qəfəsdə görüşərik. Orada hər şey aydın olacaq.”`,
  `Jurnalist: “Son sözünüz?”`,
  `${s.name}: “Əlcəklər bağlananda söhbət bitir.”`
 ];
 const dana=Math.random()<.22?`<div class="talkline"><b>Dana White:</b> “Bu döyüş kartın ən maraqlı qarşılaşmalarından biri olacaq. İkiniz də özünüzü sübut edin!”</div>`:"";
 const shuffled=journalist.sort(()=>Math.random()-.5).slice(0,2);
 const rudeRate={low:.08,medium:.18,high:.30}[gameSettings.trashTalkRate]??.18;
 const roughLines=[`${s.name}: “Sikdir get, qəfəsdə cavabını alacaqsan, peyser.”`,`${opponent.name}: “Gijdullaq kimi danışma, döyüşdə görəcəyik.”`,`${s.name}: “Qəhbə söhbətini saxla, anasız-pedaraz təhqirlərinlə məni qorxuda bilməzsən.”`,`${opponent.name}: “Petux kimi qaçma, qancıq, döyüşə çıx!”`];
 const extraTrash=Math.random()<rudeRate?[roughLines[Math.floor(Math.random()*roughLines.length)]]:[];
 document.getElementById("conferenceText").innerHTML=[...shuffled,...exchanges.slice(0,4),...extraTrash].sort(()=>Math.random()-.5).map(line=>`<div class="talkline">${line}</div>`).join("")+dana;
};

// Original, synthesized arena-style background loop (no external copyrighted track).
let musicOn=false, musicCtx=null, musicTimer=null, musicStep=0, musicMaster=null;
function musicTick(){
 if(!musicCtx||!musicOn)return;
 const notes=[110,146.83,164.81,146.83,123.47,164.81,196,164.81];
 const now=musicCtx.currentTime, freq=notes[musicStep%notes.length];
 const osc=musicCtx.createOscillator(), gain=musicCtx.createGain();
 osc.type="triangle";osc.frequency.setValueAtTime(freq,now);
 gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(.11,now+.025);gain.gain.exponentialRampToValueAtTime(.0001,now+.32);
 osc.connect(gain);gain.connect(musicMaster||musicCtx.destination);osc.start(now);osc.stop(now+.34);
 if(musicStep%2===0){
  const bass=musicCtx.createOscillator(), bg=musicCtx.createGain();
  bass.type="sine";bass.frequency.value=55;bg.gain.setValueAtTime(.0001,now);bg.gain.exponentialRampToValueAtTime(.14,now+.02);bg.gain.exponentialRampToValueAtTime(.0001,now+.18);
  bass.connect(bg);bg.connect(musicMaster||musicCtx.destination);bass.start(now);bass.stop(now+.2);
 }
 musicStep++;
}
document.getElementById("musicToggle").onclick=()=>{
 if(!musicOn){
  const AC=window.AudioContext||window.webkitAudioContext;
  if(!AC){document.getElementById("musicToggle").textContent="♫ ✕";return}
  musicCtx=musicCtx||new AC();musicMaster=musicMaster||musicCtx.createGain();musicMaster.connect(musicCtx.destination);musicMaster.gain.value=(gameSettings.musicVolume??100)/100;musicCtx.resume();musicOn=true;
  musicTick();musicTimer=setInterval(musicTick,360);
  document.getElementById("musicToggle").textContent="♫ ON";
 }else{
  musicOn=false;clearInterval(musicTimer);if(musicCtx)musicCtx.suspend();
  document.getElementById("musicToggle").textContent="♫ OFF";
 }
};


// Settings panel: audio, match difficulty, dialogue frequency, and career ending.
const settingsPanel=document.getElementById("settingsPanel");
function saveGameSettings(){localStorage.setItem("ufcLegendsSettings",JSON.stringify(gameSettings));}
function applyMusicVolume(){const v=Number(gameSettings.musicVolume??100);document.getElementById("musicVolume").value=v;document.getElementById("musicVolumeValue").textContent=v+"%";if(musicMaster)musicMaster.gain.setTargetAtTime(v/100,musicCtx.currentTime,.04);}
document.getElementById("settingsOpen").onclick=()=>{settingsPanel.classList.remove("hidden");document.getElementById("difficulty").value=gameSettings.difficulty;document.getElementById("trashTalkRate").value=gameSettings.trashTalkRate;document.getElementById("fightSpeed").value=gameSettings.fightSpeed||"normal";applyMusicVolume()};
function closeSettings(){settingsPanel.classList.add("hidden")}
document.getElementById("settingsClose").onclick=closeSettings;document.getElementById("settingsDone").onclick=closeSettings;
document.getElementById("musicVolume").oninput=e=>{gameSettings.musicVolume=Number(e.target.value);applyMusicVolume();saveGameSettings()};
document.getElementById("difficulty").onchange=e=>{gameSettings.difficulty=e.target.value;saveGameSettings()};
document.getElementById("trashTalkRate").onchange=e=>{gameSettings.trashTalkRate=e.target.value;saveGameSettings()};
document.getElementById("fightSpeed").onchange=e=>{gameSettings.fightSpeed=e.target.value;saveGameSettings()};
document.getElementById("finishCareer").onclick=()=>{if(!confirm("Karyeranı yekunlaşdırmaq istəyirsən? Rekordun saxlanacaq, döyüşlər bağlanacaq. Yeni karyera üçün ayrıca sıfırlaya bilərsən."))return;s.careerEnded=true;save();closeSettings();document.getElementById("offerStatus").textContent="🏁 Karyera yekunlaşdırıldı. Rekordun saxlanıldı. Yeni karyera üçün profil bölməsində sıfırla.";document.getElementById("acceptFight").disabled=true;document.getElementById("declineFight").disabled=true;document.getElementById("startFight").disabled=true;document.getElementById("fightResult").innerHTML=`<div class="big gold">🏁 KARYERA BİTDİ</div><p class="winnerline">${s.name} — ${s.wins} qələbə, ${s.losses} məğlubiyyət, ${s.draws} heç-heçə.</p><p class="muted">${s.belt?"Çempionluq kəməri qazandın!":"Karyera yekunlaşdı."} Rekordun yadda saxlanıldı.</p>`;};
settingsPanel.addEventListener("click",e=>{if(e.target===settingsPanel)closeSettings()});

applyMusicVolume();
function renderRanking(){
 const box=document.getElementById("rankingTable");
 if(s.careerLevel!=="Peşəkar"){
  const label=s.careerLevel==="Amatör"?"Amatör turnir cədvəli":"Regional liqa cədvəli";
  const names=s.careerLevel==="Amatör"?["Luca Bianchi","Mateusz Kowalski","Kenji Sato","Diego Morales","Omar Haddad","Ethan Brooks"]:["Rashad Karimov","Davit Beridze","Milan Petrov","Ethan Brooks","Lucas Ferreira","Artem Sokolov"];
  const styles=["Boxer","Wrestler","Karateka","Muay Thai","BJJ","Kickboxer"];const rows=names.map((n,i)=>({name:n,style:styles[i],w:i+1,l:Math.max(0,i-1),p:42+i*2,you:false})).concat([{name:s.name+" (SƏN)",style:"Sənin stilin",w:s.wins,l:s.losses,p:avg(),you:true}]).sort((a,b)=>b.w-a.w||b.p-a.p);
  document.getElementById("rank").querySelector("h3").textContent=`🏆 ${label}`;
  box.innerHTML=`<p class="muted">Peşəkar UFC reytinqi yalnız peşəkar müqavilə aldıqdan sonra açılır.</p><table><thead><tr><th>#</th><th>Döyüşçü</th><th>Stil</th><th>Güc</th><th>Rekord</th></tr></thead><tbody>${rows.map((x,i)=>`<tr style="${x.you?'background:#e6394618;font-weight:800':''}"><td>${i+1}</td><td><span class="fighter"><span class="avatar rank-avatar" data-rank-face="${x.name}"></span>${x.name}</span></td><td>${x.style||"MMA"}</td><td>${x.p}</td><td>${x.w}-${x.l}-0</td></tr>`).join("")}</tbody></table>`;
  box.querySelectorAll("[data-rank-face]").forEach(el=>setFace(el,el.dataset.rankFace));
  return;
 }
 const _o=rankList();const data={champion:_o[0],fighters:_o.slice(1)};
 const rows=[{name:data.champion,rank:"C",champion:true},...data.fighters.map((name,i)=>({name,rank:i+1,champion:false}))];
 const myRank=Math.max(1,Math.min(15,s.rank||15));
 rows.splice(Math.min(rows.length, myRank),0,{name:s.name,rank:myRank,you:true});
 document.getElementById("rank").querySelector("h3").textContent=`🏆 ${s.weight} UFC reytinqi`;
 box.innerHTML=`<p class="muted">Çempion və sıralama sənin göndərdiyin siyahı əsasında qurulub.</p><table><thead><tr><th>#</th><th>Döyüşçü</th><th>Ölkə</th><th>Güc</th></tr></thead><tbody>${rows.map(x=>`<tr style="${x.you?'background:#e6394618;font-weight:800':''}"><td>${x.champion?'🏆':x.rank}${rankArrow(x)}</td><td><span class="fighter"><span class="avatar rank-avatar" data-rank-face="${x.name}"></span>${x.name}${x.you?' (SƏN)':''}</span></td><td>${fighterCountries[x.name]||"—"}</td><td>${x.you?Math.round(avg()):powerOfName(x.name,x.champion?0:x.rank)}</td></tr>`).join("")}</tbody></table>`;
 box.querySelectorAll("[data-rank-face]").forEach(el=>setFace(el,el.dataset.rankFace));
}

document.getElementById("resetCareer").onclick=()=>{
 if(!confirm("Bütün karyera məlumatların silinəcək: rekordlar, pul, reytinq, məşqlər və kəmər. Yeni karyera başlasın?"))return;
 s=JSON.parse(JSON.stringify(defaults));
 opponent=null;lastOpponentName="";rankingsCache={};
 localStorage.removeItem("ufcLegendsSaveV6");
 document.getElementById("fightResult").innerHTML='<span class="muted">Yeni karyera başladı. İlk döyüşünü gözləyir!</span>';
 document.getElementById("fightLog").innerHTML='<p class="muted">Döyüş başlayanda hadisələr burada görünəcək.</p>';
 const start=document.getElementById("startFight");
 start.disabled=false;start.dataset.done="";start.textContent="DÖYÜŞÜ SİMULYASİYA ET";
 save();prepareFight();document.getElementById("startFight").disabled=true;document.getElementById("offerStatus").textContent="Əvvəlcə döyüş təklifini qəbul et.";setTab("career");
};

document.getElementById("chooseAmateur").onclick=()=>{s=JSON.parse(JSON.stringify(defaults));opponent=null;localStorage.setItem("ufcLegendsSaveV6",JSON.stringify(s));document.getElementById("startChoice").style.display="none";save();prepareFight();};
document.getElementById("chooseUfc").onclick=()=>{s=JSON.parse(JSON.stringify(defaults));s.careerLevel="Peşəkar";s.rank=15;s.eventNumber=334;s.stats={striking:56,wrestling:54,defense:55,stamina:57,speed:56,grappling:53};s.cash=30000;s.week=2;s.calendarDate="2026-11-20";s.nextFightWeek=2;s.debutMain=true;opponent=null;localStorage.setItem("ufcLegendsSaveV6",JSON.stringify(s));document.getElementById("startChoice").style.display="none";save();prepareFight();};

// Live character creator: every visual change is saved and reused in all fighter slots.
(function(){
 const ids=["lookSkin","lookEye","lookHair","lookHairStyle","lookBrow","lookEar","lookBeard"];
 ids.forEach(id=>{const el=document.getElementById(id);if(!el)return;el.addEventListener("change",()=>{
  s.appearance=s.appearance||{...defaults.appearance};
  const key={lookSkin:"skin",lookEye:"eye",lookHair:"hair",lookHairStyle:"hairStyle",lookBrow:"brow",lookEar:"ear",lookBeard:"beard"}[id];
  s.appearance[key]=["hairStyle","brow","ear","beard"].includes(key)?Number(el.value):el.value;
  try{localStorage.removeItem("ufcFighterProfilePhoto");}catch(e){}
  const preview=document.getElementById("fighterPhotoPreview");if(preview)preview.style.display="none";
  save();prepareFight();
 });});
})();

render();prepareFight();renderEventCard();
if(s.dead||s.careerEnded){document.getElementById("acceptFight").disabled=true;document.getElementById("declineFight").disabled=true;document.getElementById("startFight").disabled=true;document.getElementById("offerStatus").textContent=s.dead?"Bu döyüşçü artıq həyatda deyil. Karyera faciəvi şəkildə bitib.":"Karyera yekunlaşdırılıb. Yeni karyera üçün sıfırlama et.";}
if(freshCareer)document.getElementById("startChoice").style.display="grid";

// One saved portrait is reused for the player's career, fight and ranking cards.
(function(){
 const input=document.getElementById("fighterCameraInput");
 const button=document.getElementById("takeFighterPhoto");
 const preview=document.getElementById("fighterPhotoPreview");
 if(!input||!button||!preview)return;
 function loadPhoto(){try{const saved=localStorage.getItem("ufcFighterProfilePhoto");if(saved){preview.src=saved;preview.style.display="block";button.textContent="📸 Şəkli dəyiş";}}catch(e){}}
 button.addEventListener("click",()=>input.click());
 input.addEventListener("change",()=>{
  const file=input.files&&input.files[0];if(!file||!file.type.startsWith("image/"))return;
  const reader=new FileReader();reader.onload=()=>{
   const img=new Image();img.onload=()=>{
    const canvas=document.createElement("canvas"),max=640,scale=Math.min(1,max/Math.max(img.width,img.height));
    canvas.width=Math.round(img.width*scale);canvas.height=Math.round(img.height*scale);
    canvas.getContext("2d").drawImage(img,0,0,canvas.width,canvas.height);
    const data=canvas.toDataURL("image/jpeg",.84);
    try{localStorage.setItem("ufcFighterProfilePhoto",data);}catch(e){}
    preview.src=data;preview.style.display="block";button.textContent="📸 Şəkli dəyiş";
    if(typeof render==="function")render();
   };img.src=reader.result;
  };reader.readAsDataURL(file);
 });
 loadPhoto();
})();

/* ===== FULLSCREEN FINISH CINEMATIC (KO / TKO / SUB / Hakim qərarı) ===== */