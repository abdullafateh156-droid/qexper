const SD_ROUND_G={r1:"handshake",r2:"point",r3:"sign"};
const SD_CG={cool:{me:"cross",opp:"lean",icon:"😎"},hard:{me:"point",opp:"slam",icon:"🔥"},joke:{me:"shrug",opp:"headshake",icon:"😂"}};
const sdPick=a=>a[Math.floor(Math.random()*a.length)];
let _sdLastOpp={};
async function sdTr(list,lang,limit){
 if(lang==="az")return list.map(x=>x[0]);
 if(lang==="en")return list.map(x=>x[1]);
 const to=new Promise(r=>setTimeout(()=>r(null),limit||3000));
 return Promise.all(list.map(x=>(lang==="tr"&&x[2])?Promise.resolve(x[2]):Promise.race([trGet(x[1],"en",lang),to]).then(v=>v||x[1])));
}

let _sdTok=0;
function sdLang(){const l=gameSettings.lang;return SD_T[l]?l:"az"}
function sdBlip(hi){try{const c=_cAudio();if(!c)return;const o=c.createOscillator(),g=c.createGain(),t=c.currentTime;o.type="square";o.frequency.value=(hi?190:130)+Math.random()*50;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.05,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+.07);o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+.08)}catch(e){}}
function sdThud(){try{cineSfx("hit")}catch(e){}try{const c=_cAudio();if(!c)return;const o=c.createOscillator(),g=c.createGain(),t=c.currentTime;o.frequency.setValueAtTime(110,t);o.frequency.exponentialRampToValueAtTime(40,t+.25);g.gain.setValueAtTime(.35,t);g.gain.exponentialRampToValueAtTime(.0001,t+.3);o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+.32)}catch(e){}}
function sdHash(str){let h=0;for(let i=0;i<str.length;i++)h=(h*31+str.charCodeAt(i))|0;return Math.abs(h)}
function sdFighter(id,cls,skin,hair,shirt,beard,dir){
 return `<div class="sdf ${cls}" id="${id}" style="--skin:${skin};--hair:${hair};--shirt:${shirt};--beard:${beard};--dir:${dir};left:${dir*14}k"><div class="flipper"><div class="arm b"><div class="fore"></div></div><div class="neck"></div><div class="torso"></div><div class="head"><div class="hair"></div><div class="beard"></div><div class="brow b1"></div><div class="brow b2"></div><div class="eye e1"></div><div class="eye e2"></div><div class="mouth"></div></div><div class="arm f"><div class="fore"></div></div></div></div>`;
}

function playSitDown(){
 return new Promise(resolve=>{
  const root=document.getElementById("sitd");if(!root){resolve();return}
  const tok=++_sdTok;let skipped=false,wake=null;
  const me=s.name||"Fateh",opp=(typeof opponent!=="undefined"&&opponent&&opponent.name)||"Rival";
  const ap=s.appearance||{},h=sdHash(opp);
  const skins=["#f0c9a5","#e7b995","#c98e68","#b87a55","#8a5a3b","#6b4328"],hairs=["#17171b","#38251d","#5a4435","#c9a76a","#222"];
  root.innerHTML=`<div class="wall"></div><div class="sdlogo">UFC</div>
  <div class="topbar" translate="no"><div class="ttl" id="sdTtl"></div><div class="ctl"><select class="lang" id="sdLang"></select><button class="skip" id="sdSkip"></button></div></div>
  <div class="st"><div id="sdWrapA"></div><div id="sdWrapB"></div><div class="cloth"></div><div class="table" id="sdTable"></div>
   <div class="paper" id="sdPaper"></div><div class="mic" style="left:-9.6k"></div><div class="mic" style="left:9k"></div><div class="bottle" style="left:-18k"></div><div class="bottle" style="left:17k"></div></div>
  <div class="bub me" id="sdBubA"></div><div class="bub" id="sdBubB"></div>
  <div class="choices" id="sdChoices"></div>
  <div class="cap" id="sdCap"></div><div class="hint" id="sdHint"></div><div class="flash" id="sdFl"></div>`;
  root.querySelectorAll("[style]").forEach(el=>{el.setAttribute("style",el.getAttribute("style").replace(/(-?[\d.]+)k\b/g,"calc(var(--k)*$1)"))});
  const st=root.querySelector(".st");
  st.querySelector("#sdWrapA").outerHTML=sdFighter("sdA","A",ap.skin||"#c98e68",ap.hair||"#17171b","#c6a65b",ap.beard?1:0,-1);
  st.querySelector("#sdWrapB").outerHTML=sdFighter("sdB","B",skins[h%skins.length],hairs[(h>>3)%hairs.length],"#a8232f",(h>>5)%2,1);
  root.querySelectorAll("#sdA,#sdB").forEach(el=>el.setAttribute("style",el.getAttribute("style").replace(/left:(-?[\d.]+)k/,"left:calc(var(--k)*$1)")));
  const A=root.querySelector("#sdA"),B=root.querySelector("#sdB"),bubA=root.querySelector("#sdBubA"),bubB=root.querySelector("#sdBubB"),cap=root.querySelector("#sdCap"),tbl=root.querySelector("#sdTable"),paper=root.querySelector("#sdPaper"),chBox=root.querySelector("#sdChoices");
  const sel=root.querySelector("#sdLang");sel.innerHTML=Object.entries(SD_LANGS).map(([k,v])=>`<option value="${k}">${v}</option>`).join("");
  const skipBtn=root.querySelector("#sdSkip");
  function applyLang(){const L=SD_T[sdLang()];sel.value=sdLang();root.setAttribute("dir",sdLang()==="ar"?"rtl":"ltr");root.querySelector("#sdTtl").textContent="🥊 "+L.title;skipBtn.textContent=L.skip;root.querySelector("#sdHint").textContent=L.hint}
  applyLang();
  sel.onchange=()=>setUiLang(sel.value);
  const sleep=ms=>new Promise(r=>{wake=r;setTimeout(r,ms)});
  const gest=["g-handshake","g-fist","g-point","g-shrug","g-slam","g-lean","g-sign","g-headshake","g-cross"];
  function setG(el,g,angry){el.classList.remove(...gest);void el.offsetWidth;if(g)el.classList.add("g-"+g);el.classList.toggle("angry",!!angry)}
  const fill=x=>x.replace(/\{me\}/g,me).replace(/\{opp\}/g,opp);
  function say(who,text,g,angry,other){
   const spk=who==="A"?A:B,oth=who==="A"?B:A,bub=who==="A"?bubA:bubB,ob=who==="A"?bubB:bubA;
   ob.classList.remove("show");bub.innerHTML=`<span class="nm">${who==="A"?me:opp}</span>`;bub.appendChild(document.createTextNode(text));bub.classList.add("show");
   setG(spk,g,angry);setG(oth,other||"",0);spk.classList.add("talk");oth.classList.remove("talk");
   if(g==="slam")setTimeout(()=>{if(tok!==_sdTok)return;tbl.classList.remove("hit");void tbl.offsetWidth;tbl.classList.add("hit");sdThud()},300);
   const n=Math.min(14,Math.ceil(text.length/3));for(let j=0;j<n;j++)setTimeout(()=>{if(tok===_sdTok&&!skipped)sdBlip(who==="B")},j*70);
   return sleep(Math.max(1900,text.length*55+800));
  }
  let round=null;
  function renderChoices(types,labels){
   chBox.innerHTML="";chBox.classList.add("show");root.querySelector("#sdHint").style.opacity=0;
   types.forEach((t,i)=>{const b=document.createElement("button");b.className="chb "+t;b.dataset.t=t;b.textContent=SD_CG[t].icon+" "+labels[i];b.onclick=e=>{e.stopPropagation();round.pick(t)};chBox.appendChild(b)});
  }
  function ask(types,labels){
   return new Promise(res=>{round={pick:t=>{round=null;chBox.classList.remove("show");root.querySelector("#sdHint").style.opacity=.45;res(t)},types,cancel:()=>{round=null;chBox.classList.remove("show");res(null)}};renderChoices(types,labels)});
  }
  chBox.onclick=e=>e.stopPropagation();
  window.sdOnLang=async()=>{applyLang();if(round&&round.items){const tx=await sdTr(round.items,sdLang());if(!round)return;bubB.lastChild.textContent=tx[0];renderChoices(round.types,tx.slice(1,4));}};
  function end(){skipped=true;if(round)round.cancel();if(wake)wake()}
  function onKey(e){if(e.key==="Escape"){e.preventDefault();end()}else if(e.key===" "||e.key==="Enter"){if(!round){e.preventDefault();wake&&wake()}}}
  function finish(){if(tok!==_sdTok)return;_sdTok++;window.sdOnLang=null;root.classList.remove("on");root.innerHTML="";document.removeEventListener("keydown",onKey);resolve()}
  document.addEventListener("keydown",onKey);
  skipBtn.onclick=e=>{e.stopPropagation();end()};
  root.onclick=()=>{if(!round&&wake)wake()};
  root.classList.add("on");
  (async()=>{
   try{
    await sleep(200);A.classList.add("in");B.classList.add("in");await sleep(700);
    for(const rk of ["r1","r2","r3"]){
     if(skipped)break;
     const D=SD_D[rk];let o=sdPick(D.opp);for(let q=0;q<4&&o===_sdLastOpp[rk]&&D.opp.length>1;q++)o=sdPick(D.opp);_sdLastOpp[rk]=o;
     const types=["cool","hard","joke"].sort(()=>Math.random()-.5);
     const chs=types.map(t=>sdPick(D.ch[t])),res=types.map(t=>sdPick(D.re[t]));
     const items=[o,...chs,...res].map(x=>[fill(x[0]),fill(x[1]),x[2]?fill(x[2]):undefined]);
     const tx=await sdTr(items,sdLang());if(skipped)break;
     const lbls=tx.slice(1,4),reacts=tx.slice(4,7);
     round=null;
     await say("B",tx[0],SD_ROUND_G[rk],rk==="r2",SD_ROUND_G[rk]==="point"?"cross":SD_ROUND_G[rk]);
     if(skipped)break;
     const pending={items:items.slice(0,4),types};
     const pr=ask(types,lbls);round.items=pending.items;
     const pick=await pr;if(!pick||skipped)break;
     const i=types.indexOf(pick),cg=SD_CG[pick];
     await say("A",tx[1+i],rk==="r1"&&pick==="cool"?"handshake":cg.me,pick==="hard",rk==="r1"&&pick==="cool"?"handshake":"");try{window.sdCrowd(pick)}catch(e){}
     if(skipped)break;
     await say("B",reacts[i],rk==="r1"&&pick==="cool"?"handshake":cg.opp,pick==="hard"||pick==="joke",pick==="hard"?"point":"");
     if(skipped)break;
     setG(A,"",0);setG(B,"",0);A.classList.remove("talk");B.classList.remove("talk");
    }
    if(!skipped){
     bubA.classList.remove("show");bubB.classList.remove("show");A.classList.remove("talk");B.classList.remove("talk");
     setG(A,"sign");setG(B,"sign");paper.classList.add("signed");
     cap.textContent=SD_T[sdLang()].sign;cap.classList.add("show");
     try{cineSfx("bell")}catch(e){}
     const f=root.querySelector("#sdFl");f&&f.classList.add("go");
     await sleep(2300);
    }
   }catch(e){console.error("sitdown",e)}
   finish();
  })();
 });
}
/* ===== header + settings language selectors, scene hook, skip-fight ===== */
(function(){
 const opts=Object.entries(SD_LANGS).map(([k,v])=>`<option value="${k}">${v}</option>`).join("");
 const hs=document.createElement("select");hs.id="uiLang";hs.setAttribute("translate","no");hs.setAttribute("aria-label","Language");hs.innerHTML=opts;hs.value=sdLang();
 hs.style.cssText="background:#161b26;color:#fff;border:1px solid #ffffff44;border-radius:10px;padding:8px 6px;font-size:13px;max-width:118px";
 hs.onchange=()=>setUiLang(hs.value);
 document.getElementById("settingsOpen").before(hs);
 const lab=document.querySelector('label[for="trashTalkRate"]');
 if(lab){const wrap=document.createElement("div");wrap.innerHTML=`<label for="sdLangSetting">🌐 Dil / Language</label><select id="sdLangSetting" translate="no">${opts}</select>`;
  const sel=wrap.querySelector("select");sel.value=sdLang();sel.onchange=()=>setUiLang(sel.value);document.getElementById("trashTalkRate").after(wrap)}
 TRL.obs=new MutationObserver(()=>{if(!TRL.lock)trSched()});
 TRL.obs.observe(document.body,{childList:true,subtree:true,characterData:true});
 setUiLang(sdLang());
})();
(function(){
 const btn=document.getElementById("acceptFight"),orig=btn.onclick;
 btn.onclick=async function(){
  const before=s.accepted;orig.call(this);
  if(s.accepted&&!before){try{if(typeof musicCtx!=="undefined"&&musicCtx&&musicCtx.state==="suspended")musicCtx.resume()}catch(e){}await playSitDown()}
 };
 /* Skip the whole fight: instantly jump to the result */
 const arena=document.getElementById("fightAnimation"),sk=document.createElement("button");
 sk.id="skipFightBtn";sk.className="hidden";sk.textContent="⏭ Döyüşü keç";arena.appendChild(sk);
 sk.onclick=()=>{window.__skipFight=true;sk.classList.add("hidden");try{const c=document.getElementById("cSkip");c&&c.click()}catch(e){}};
 const _sim=simulate;
 simulate=async function(){window.__skipFight=false;sk.classList.remove("hidden");try{return await _sim.apply(this,arguments)}finally{sk.classList.add("hidden");window.__skipFight=false}};
 const _cin=playFinishCinematic;
 playFinishCinematic=async function(o){if(window.__skipFight)return;return _cin.apply(this,arguments)};
})();

/* ===== v7 additions: injuries, height, ring announcer, prospects, promotion scenes, 3 languages ===== */
(function(){
const LG=["az","en","tr"],LNG=()=>LG.includes(gameSettings.lang)?gameSettings.lang:"az";
const D={
az:{injBan:"🩹 Zədən var: {p} — {w} həftə qalıb. Bu müddətdə döyüşsən gücün azalacaq.",injNew:"🩹 ZƏDƏ! {p} — {w} həftə bərpa lazımdır.",injHeal:"✅ Zədən sağaldı: {p}!",injWarn:"Zədəlisən ({p}). Döyüşsən gücün azalacaq. Yenə də qəbul edək?",cornerL:"Sol küncdə",cornerR:"Sağ küncdə",rec:"rekordu {w}-{l}-{d}",hh:"boyu {h} sm",kg:"{k} kq",fight:"Xanımlar və cənablar... döyüş başlasın!",debut:"🆕 Debütant",newP:"🆕 Yeni gənc döyüşçü {n} {lv} liqasına qoşuldu!",lastT:"⚠️ SON DÖYÜŞ",lastA:"Bu sənin AMATÖR karyerandakı SON döyüşündür! Qalib gəlsən Regional liqaya yüksələcəksən.",lastR:"Bu sənin REGİONAL karyerandakı SON döyüşündür! Qalib gəlsən UFC-yə yüksələcəksən!",toR:"📈 REGİONAL LİQAYA YÜKSƏLDİN!",toU:"🏟️ UFC-YƏ XOŞ GƏLDİN!",toRs:"Amatör karyeranı uğurla başa vurdun. Artıq regional səhnədəsən.",toUs:"Dana White: “Sənin üçün müqavilə hazırdır. UFC-yə xoş gəldin!”",tap:"davam üçün toxun",crowd:["👏 Tamaşaçılar alqışlayır!","🔥 Tamaşaçılar qışqırır!","😂 Zal gülür!"],scenes:["MÜQAVİLƏ İMZALANMASI","FACE-OFF","MƏTBUAT KONFRANSI","TƏRƏZİYƏ ÇƏKİLMƏ","KULİS GÖRÜŞÜ"],parts:["göz üstü kəsik","burun sınığı","qabırğa zədəsi","əl biləyi zədəsi","diz bağı zədəsi","çiyin zədəsi","beyin sarsıntısı","topuq burxulması"],hl:"Boy (sm)"},
en:{injBan:"🩹 You're injured: {p} — {w} week(s) left. Fighting now will reduce your power.",injNew:"🩹 INJURY! {p} — {w} week(s) of recovery needed.",injHeal:"✅ You've healed: {p}!",injWarn:"You're injured ({p}). Fighting will lower your power. Accept anyway?",cornerL:"In the left corner",cornerR:"In the right corner",rec:"with a record of {w}-{l}-{d}",hh:"standing {h} cm",kg:"{k} kg",fight:"Ladies and gentlemen... let's get ready to fight!",debut:"🆕 Debutant",newP:"🆕 A young prospect, {n}, has joined the {lv} league!",lastT:"⚠️ FINAL FIGHT",lastA:"This is your LAST AMATEUR fight! Win and you move up to the Regional league.",lastR:"This is your LAST REGIONAL fight! Win and you're going to the UFC!",toR:"📈 PROMOTED TO THE REGIONAL LEAGUE!",toU:"🏟️ WELCOME TO THE UFC!",toRs:"You finished your amateur career. You're on the regional stage now.",toUs:"Dana White: “Your contract is ready. Welcome to the UFC!”",tap:"tap to continue",crowd:["👏 The crowd applauds!","🔥 The crowd roars!","😂 The arena laughs!"],scenes:["CONTRACT SIGNING","FACE-OFF","PRESS CONFERENCE","WEIGH-INS","BACKSTAGE MEETING"],parts:["cut above the eye","broken nose","rib injury","wrist injury","knee ligament injury","shoulder injury","concussion","ankle sprain"],hl:"Height (cm)"},
tr:{injBan:"🩹 Sakatsın: {p} — {w} hafta kaldı. Şimdi dövüşürsen gücün düşer.",injNew:"🩹 SAKATLIK! {p} — {w} hafta iyileşme gerekiyor.",injHeal:"✅ Sakatlığın iyileşti: {p}!",injWarn:"Sakatsın ({p}). Dövüşürsen gücün düşecek. Yine de kabul edelim mi?",cornerL:"Sol köşede",cornerR:"Sağ köşede",rec:"rekoru {w}-{l}-{d}",hh:"boyu {h} cm",kg:"{k} kg",fight:"Bayanlar ve baylar... dövüş başlasın!",debut:"🆕 Çaylak",newP:"🆕 Genç yetenek {n}, {lv} ligine katıldı!",lastT:"⚠️ SON DÖVÜŞ",lastA:"Bu AMATÖR kariyerinin SON dövüşü! Kazanırsan Bölgesel lige yükselirsin.",lastR:"Bu BÖLGESEL kariyerinin SON dövüşü! Kazanırsan UFC'ye yükselirsin!",toR:"📈 BÖLGESEL LİGE YÜKSELDİN!",toU:"🏟️ UFC'YE HOŞ GELDİN!",toRs:"Amatör kariyerini başarıyla tamamladın. Artık bölgesel sahnedesin.",toUs:"Dana White: “Sözleşmen hazır. UFC'ye hoş geldin!”",tap:"devam için dokun",crowd:["👏 Seyirciler alkışlıyor!","🔥 Seyirciler bağırıyor!","😂 Salon gülüyor!"],scenes:["SÖZLEŞME İMZALAMA","YÜZ YÜZE (FACE-OFF)","BASIN TOPLANTISI","SIKLET TARTISI","KULİS GÖRÜŞMESİ"],parts:["göz üstü kesik","burun kırığı","kaburga sakatlığı","bilek sakatlığı","diz bağı sakatlığı","omuz sakatlığı","beyin sarsıntısı","ayak bileği burkulması"],hl:"Boy (cm)"}
};
const T=(k,v)=>{let x=D[LNG()][k];if(typeof x==="string")for(const a in v||{})x=x.split("{"+a+"}").join(v[a]);return x};
const sl=ms=>new Promise(r=>setTimeout(r,ms)),esc=t=>String(t).replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));
const KG={Flyweight:57,Bantamweight:61,Featherweight:66,Lightweight:70,Welterweight:77,Middleweight:84,"Light Heavyweight":93,Heavyweight:120};
const HB={Flyweight:166,Bantamweight:168,Featherweight:171,Lightweight:175,Welterweight:179,Middleweight:184,"Light Heavyweight":188,Heavyweight:192};
const OV="position:fixed;inset:0;z-index:150;background:radial-gradient(circle at 50% 30%,#2a3350,#05070b 70%);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:24px;color:#fff;font:800 clamp(16px,4vw,26px)/1.35 system-ui;cursor:pointer";
function toast(t){const e=document.createElement("div");e.setAttribute("translate","no");e.style.cssText="position:fixed;left:50%;bottom:70px;transform:translateX(-50%);z-index:210;max-width:92vw;background:#000e;color:#f5c95b;border:1px solid #f5c95b88;border-radius:14px;padding:10px 16px;font:700 14px system-ui;text-align:center";e.textContent=t;document.body.appendChild(e);setTimeout(()=>e.remove(),5000)}
function overlay(html,ms){return new Promise(res=>{const o=document.createElement("div");o.setAttribute("translate","no");o.style.cssText=OV;o.innerHTML=html+`<div style="margin-top:22px;font-size:12px;color:#9aa6ba;font-weight:600">${T("tap")}</div>`;document.body.appendChild(o);try{cineSfx("bell")}catch(e){}const done=()=>{clearTimeout(tm);o.remove();res()},tm=setTimeout(done,ms||6000);o.onclick=done})}
function speak(t){try{const v=speechSynthesis.getVoices().find(x=>x.lang.toLowerCase().startsWith(LNG()));if(!v)return;const u=new SpeechSynthesisUtterance(t);u.voice=v;u.lang=v.lang;u.rate=.95;u.pitch=.7;speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){}}
window.__v7={T,D,esc,KG,HB,toast,overlay,sl,speak,LNG,OV};
/* height select */
const hsel=document.getElementById("heightInput");for(let h=150;h<=215;h++)hsel.add(new Option(h+" cm",h));
document.getElementById("heightLabel").textContent=T("hl");
/* injuries */
const partName=()=>T("parts")[s.injury.i];
const INJ=[[1,2],[2,3],[3,5],[3,4],[5,7],[4,6],[2,4],[2,3]];
function banner(){const b=document.getElementById("injuryBanner");if(!b)return;b.innerHTML=s.injury&&s.injury.w>0?`<div class="notice" style="margin:10px 0">${esc(T("injBan",{p:partName(),w:s.injury.w}))}</div>`:""}
function rollInjury(){const h=s.history[s.history.length-1];if(!h||s.injury&&s.injury.w>0)return;const lost=h.outcome==="MƏĞLUBİYYƏT",fin=["KO","TKO","SUB"].includes(h.method);
 if(Math.random()<.07+(lost?.1:0)+(lost&&fin?.1:0)+(fin?.03:0)){const i=Math.floor(Math.random()*8),w=INJ[i][0]+Math.floor(Math.random()*(INJ[i][1]-INJ[i][0]+1));s.injury={i,w};const m=T("injNew",{p:partName(),w});
  const r=document.getElementById("fightResult");if(r)r.insertAdjacentHTML("beforeend",`<div class="notice" translate="no" style="margin-top:10px">${esc(m)}</div>`);const lg=document.getElementById("fightLog");if(lg)lg.insertAdjacentHTML("beforeend",`<p translate="no">${esc(m)}</p>`);toast(m)}}
/* prospects: new young fighters appear in Regional / UFC */
const FN=["Rafael","Jonas","Takumi","Ilyas","Mateo","Bruno","Kamran","Leo","Dmitri","Omar","Samuel","Nico"],LN=["Almeida","Kovac","Hayashi","Aslanov","Vega","Ferrari","Novak","Okafor","Moreau","Petrov","Silva","Duran"],ST=["Boxer","Wrestler","Kickboxer","BJJ","Muay Thai","Sambo"];
function spawn(){if(s.careerLevel==="Amatör"||s.dead||s.careerEnded||Math.random()>.3)return;s.prospects=s.prospects||[];
 const n=FN[Math.floor(Math.random()*12)]+" "+LN[Math.floor(Math.random()*12)],pro=s.careerLevel==="Peşəkar";
 s.prospects.push({name:n,w:pro?8+Math.floor(Math.random()*6):2+Math.floor(Math.random()*5),l:Math.floor(Math.random()*3),power:Math.min(82,(pro?48:44)+Math.floor(Math.random()*(14+(s.proWins||0)*2))),style:ST[Math.floor(Math.random()*6)],level:s.careerLevel,weight:s.weight});
 if(s.prospects.length>6)s.prospects.shift();toast(T("newP",{n,lv:pro?"UFC":"Regional"}))}
const _pool=tierOpponentPool;tierOpponentPool=function(){return _pool().concat((s.prospects||[]).filter(p=>p.level===s.careerLevel&&p.weight===s.weight).map(p=>[p.name,p.w,p.l,p.power,p.style]))};
const _prep=prepareFight;prepareFight=function(){_prep.apply(this,arguments);try{if(opponent&&(s.prospects||[]).some(p=>p.name===opponent.name)){document.getElementById("oppRecord").insertAdjacentHTML("beforeend",` <span translate="no">• ${T("debut")}</span>`)}}catch(e){}};
/* render / language / profile hooks */
const _r=render;render=function(){_r.apply(this,arguments);try{if(document.activeElement!==hsel)hsel.value=String(s.height||178);banner()}catch(e){}};
const _sul=setUiLang;setUiLang=function(l){if(!LG.includes(l))l="az";_sul(l);try{document.getElementById("heightLabel").textContent=T("hl");banner()}catch(e){}};
const sp=document.getElementById("saveProfile"),spo=sp.onclick;sp.onclick=function(){s.height=+hsel.value||178;return spo.apply(this,arguments)};
const nw=document.getElementById("nextWeek"),nwo=nw.onclick;nw.onclick=function(){const r=nwo.apply(this,arguments);if(s.injury){s.injury.w--;if(s.injury.w<=0){toast(T("injHeal",{p:partName()}));s.injury=null}}spawn();save();return r};
const ab=document.getElementById("acceptFight"),abo=ab.onclick;ab.onclick=async function(){if(s.injury&&s.injury.w>0&&!s.accepted&&!s.dead&&!s.careerEnded&&s.week>=(s.nextFightWeek||1)&&!confirm(T("injWarn",{p:partName()})))return;return abo.apply(this,arguments)};
/* sit-down: crowd reactions + varied scenes */
window.sdCrowd=function(pick){try{cineSfx("roar")}catch(e){}const r=document.getElementById("sitd");if(!r)return;const b=document.createElement("div");b.setAttribute("translate","no");b.textContent=T("crowd")[pick==="cool"?0:pick==="hard"?1:2];b.style.cssText="position:absolute;left:50%;top:12%;transform:translateX(-50%);z-index:20;background:#000b;color:#f5c95b;border:1px solid #f5c95b88;border-radius:30px;padding:8px 16px;font:800 15px system-ui;pointer-events:none;transition:opacity .6s";r.appendChild(b);setTimeout(()=>b.style.opacity=0,1400);setTimeout(()=>b.remove(),2100)};
const _psd=playSitDown;playSitDown=function(){const p=_psd.apply(this,arguments);try{const r=document.getElementById("sitd"),k=Math.floor(Math.random()*5);r.style.filter=["none","hue-rotate(35deg)","hue-rotate(-40deg) saturate(1.2)","hue-rotate(120deg)","brightness(1.1) saturate(.8)"][k];const t=r.querySelector(".ttl");if(t){t.setAttribute("translate","no");t.textContent=T("scenes")[k]}}catch(e){}return p};
const add=(rk,part,lines)=>{const t=part.split(".");(t.length===2?SD_D[rk][t[0]][t[1]]:SD_D[rk][t[0]]).push(...lines)};
add("r1","opp",[["Rekordunu gördüm. Səndən çox şey gözləmirdim.","I saw your record. I wasn't expecting much.","Rekorunu gördüm. Pek bir şey beklemiyordum."],["Salam, {me}. Bu gecə son rahat gecən olacaq.","Hey, {me}. Tonight is your last comfortable night.","Selam {me}. Bu gece son rahat gecen olacak."],["Mən bura qalib gəlməyə gəlmişəm, {me}. Sən sadəcə yolun üstündəsən.","I came here to win, {me}. You're just in the way.","Buraya kazanmaya geldim {me}. Sen sadece yoldasın."]]);
add("r1","ch.hard",[["Qəfəsdə danışarıq. Çox səs çıxarırsan.","We'll talk in the cage. You're loud.","Kafeste konuşuruz. Çok ses çıkarıyorsun."]]);add("r1","re.hard",[["Görək kimin səsi kəsiləcək!","We'll see whose voice gets cut off!","Kimin sesi kesilecek göreceğiz!"]]);
add("r1","ch.joke",[["Narahat olma, səni yumşaq yıxacağam.","Don't worry, I'll drop you gently.","Merak etme, seni yumuşak düşüreceğim."]]);add("r1","re.joke",[["Zarafat bitdi. Tezliklə hamı biləcək.","Joke's over. Everyone will know soon.","Şaka bitti. Yakında herkes görecek."]]);
add("r1","ch.cool",[["Sakit, hazır və acam.","Calm, ready and hungry.","Sakin, hazır ve açım."]]);add("r1","re.cool",[["Hazır olduğunu deyirsən... görərik.","You say you're ready... we'll see.","Hazırım diyorsun... göreceğiz."]]);
add("r2","opp",[["Kimsə sənin adını bilmir. Bu gecədən sonra mənimkini biləcək.","Nobody knows your name. After tonight they'll know mine.","Kimse adını bilmiyor. Bu geceden sonra benimkini bilecekler."],["Bu qəfəs mənim evimdir, sən qonaqsan.","This cage is my home, you're a guest.","Bu kafes benim evim, sen misafirsin."]]);
add("r3","opp",[["Əlin əsir? Qələm də elə.","Is your hand shaking? The pen too.","Elin titriyor mu? Kalem de öyle."]]);
/* ring announcer before every fight */
async function lastNotice(){const a=s.careerLevel==="Amatör"&&(s.amateurWins||0)>=3,r=s.careerLevel==="Regional"&&(s.regionalWins||0)>=5;if(!a&&!r)return;await overlay(`<div style="font-size:clamp(40px,12vw,80px)">${a?"🥊":"🏟️"}</div><div style="color:#f4c95d;letter-spacing:3px;margin:10px 0">${T("lastT")}</div><div>${esc(T(a?"lastA":"lastR"))}</div>`,7000)}
async function announcer(){if(window.__skipFight)return;const o=document.createElement("div");o.setAttribute("translate","no");o.style.cssText=OV;document.body.appendChild(o);let skip=false;o.onclick=()=>{skip=true};
 const wait=async ms=>{for(let i=0;i<ms/50&&!skip;i++)await sl(50)},hs=sdHash(opponent.name);
 const card=(right,nm,w,l,d,h)=>({html:`<div style="color:${right?"#6aa9ff":"#e63946"};font-size:14px;letter-spacing:3px">${right?"🔵 "+T("cornerR"):"🔴 "+T("cornerL")}</div><div style="margin:8px 0;color:#cfd6e4;font-size:clamp(14px,3.6vw,20px)">${T("rec",{w,l,d})} • ${T("hh",{h})} • ${T("kg",{k:KG[s.weight]||70})}</div><div style="font-size:clamp(30px,9vw,60px);font-weight:1000;color:#f4c95d;font-style:italic">${esc(nm)}</div>`,say:`${right?T("cornerR"):T("cornerL")}, ${T("rec",{w,l,d})}, ${nm}!`});
 const ow=opponent.recordKnown?opponent.wins:10+hs%14,ol=opponent.recordKnown?opponent.losses:hs%6,oh=(HB[s.weight]||175)+hs%13-6;
 for(const c of [card(false,s.name,s.wins,s.losses,s.draws,s.height||178),card(true,opponent.name,ow,ol,0,oh)]){if(skip)break;o.innerHTML=c.html;try{cineSfx("roar")}catch(e){}speak(c.say);await wait(4200)}
 if(!skip){o.innerHTML=`<div style="font-size:clamp(20px,5.5vw,38px);color:#fff">${esc(T("fight"))}</div>`;try{cineSfx("bell")}catch(e){}speak(T("fight"));await wait(2600)}
 try{speechSynthesis.cancel()}catch(e){}o.remove()}
async function promo(lv){const u=lv==="Peşəkar";await overlay(`<div style="font-size:clamp(44px,13vw,90px)">${u?"🏟️":"📈"}</div><div style="color:#f4c95d;margin:10px 0;font-size:clamp(22px,6vw,40px)">${T(u?"toU":"toR")}</div><div style="color:#cfd6e4">${esc(T(u?"toUs":"toRs"))}</div>`,8000)}
const _s3=simulate;simulate=async function(){if(!opponent)prepareFight();const sf=document.getElementById("startFight");sf.disabled=true;const lv=s.careerLevel,on=opponent.name;
 try{await lastNotice();await (window.__announcer||announcer)()}catch(e){console.error(e)}
 if(s.injury&&s.injury.w>0)opponent.power=Math.min(99,opponent.power+5+Math.min(5,s.injury.w));
 const r=await _s3.apply(this,arguments);
 if(!s.dead){rollInjury();s.prospects=(s.prospects||[]).filter(p=>p.name!==on);if(lv!==s.careerLevel)s.prospects=[];spawn();save();if(lv!==s.careerLevel)await promo(s.careerLevel)}
 return r};
if(!LG.includes(gameSettings.lang))setUiLang("az");
try{render()}catch(e){}
})();
