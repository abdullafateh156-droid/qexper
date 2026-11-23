let _cineCtx=null;
function _cAudio(){try{if(!_cineCtx)_cineCtx=new (window.AudioContext||window.webkitAudioContext)();if(_cineCtx.state==="suspended")_cineCtx.resume();return _cineCtx}catch(e){return null}}
function _cNoise(c,dur,vol,freq,type){const n=Math.floor(c.sampleRate*dur),b=c.createBuffer(1,n,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;const src=c.createBufferSource();src.buffer=b;const f=c.createBiquadFilter();f.type=type||"bandpass";f.frequency.value=freq;const g=c.createGain(),t=c.currentTime;g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(vol,t+Math.min(.08,dur/3));g.gain.exponentialRampToValueAtTime(.0001,t+dur);src.connect(f);f.connect(g);g.connect(c.destination);src.start(t);src.stop(t+dur)}
function cineSfx(kind){const c=_cAudio();if(!c)return;try{const t=c.currentTime;
 if(kind==="thud"||kind==="big"){const o=c.createOscillator(),g=c.createGain(),b=kind==="big";o.frequency.setValueAtTime(b?180:130,t);o.frequency.exponentialRampToValueAtTime(40,t+.22);g.gain.setValueAtTime(b?.9:.5,t);g.gain.exponentialRampToValueAtTime(.001,t+.32);o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+.35);_cNoise(c,.14,b?.6:.3,b?1400:2200)}
 else if(kind==="tap"){const o=c.createOscillator(),g=c.createGain();o.type="triangle";o.frequency.setValueAtTime(260,t);o.frequency.exponentialRampToValueAtTime(120,t+.08);g.gain.setValueAtTime(.5,t);g.gain.exponentialRampToValueAtTime(.001,t+.12);o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+.15);_cNoise(c,.06,.25,3000)}
 else if(kind==="roar"){_cNoise(c,2.6,.28,700,"lowpass");_cNoise(c,2.6,.12,2400)}
 else if(kind==="bell"){[880,1320,1760].forEach((f,i)=>{const o=c.createOscillator(),g=c.createGain();o.frequency.value=f;g.gain.setValueAtTime(.25/(i+1),t);g.gain.exponentialRampToValueAtTime(.001,t+1.4);o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+1.5)})}
}catch(e){}}

function judgeCards(o){
 const rs=o.roundScores.slice(0,o.totalRounds);const winnerIsMe=o.outcome==="QƏLƏBƏ";
 let w=0,l=0,d=0;rs.forEach(r=>{const mw=winnerIsMe?r[0]:r[1],ml=winnerIsMe?r[1]:r[0];if(mw>ml)w++;else if(mw<ml)l++;else d++});
 if(w<=l){const need=l-w+1;w+=need;l=Math.max(0,l-need);d=Math.max(0,rs.length-w-l)}
 const R=rs.length,mk=(W,L)=>`${10*W+9*L+10*(R-W-L)}-${9*W+10*L+10*(R-W-L)}`;
 const cards=[mk(w,l),mk(w,l),mk(w,l)];
 if(w-l>=2&&Math.random()<.3)cards[2]=mk(w-1,l+1);
 return cards;
}

async function playFinishCinematic(o){
 const cine=document.getElementById("cine");if(!cine)return;
 let skip=false;const sleep=ms=>new Promise(r=>skip?r():setTimeout(r,ms));
 const meWin=o.outcome==="QƏLƏBƏ",draw=o.outcome==="HEÇ-HEÇƏ";
 const mySkin=(s.appearance&&s.appearance.skin)||"#c98e68",oppSkin="#d9a97f";
 const fig=(id,flip,skin,col)=>`<div class="fw ${flip?"flip":""}" id="${id}" style="left:calc(50% ${flip?"+":"-"} calc(var(--u)*10));--skin:${skin};--c:${col}"><div class="fg idle" data-base="idle"><div class="leg a"></div><div class="leg b"></div><div class="arm r"><i class="gl"></i></div><div class="torso"></div><div class="shorts"></div><div class="head"></div><div class="arm f"><i class="gl"></i></div><div class="stars">★ ★ ★</div></div></div>`;
 cine.innerHTML=`<div class="world"><div class="bg"></div><div class="crowd"></div><div class="flashbulbs"></div><div class="spot a"></div><div class="spot b"></div><div class="floor"></div><div class="cage"></div>
 ${fig("cMe",false,mySkin,"#d62839")}${fig("cOpp",true,oppSkin,"#2b6fe0")}
 <div class="fw ref ghost" id="cRef" style="left:calc(50% + calc(var(--u)*0))"><div class="fg" data-base=""><div class="leg a"></div><div class="leg b"></div><div class="torso"></div><div class="shorts"></div><div class="head"></div><div class="rarm r"></div><div class="rarm l"></div></div></div>
 <div class="rnc" id="cRnc"><i></i></div></div>
 <div class="vig"></div><div class="bars"></div><div class="banner" id="cBan"></div><div class="sub" id="cSub"></div><div class="flash" id="cFl"></div>
 <div class="tag">UFC • ${o.finish?o.finishRound+"-CU RAUND":"FİNAL"}</div><button class="skipbtn" id="cSkip">⏭ Keç</button>`;
 cine.className="on";document.body.style.overflow="hidden";
 const q=id=>cine.querySelector(id),world=q(".world"),me=q("#cMe"),opp=q("#cOpp"),ref=q("#cRef"),rnc=q("#cRnc"),ban=q("#cBan"),sub=q("#cSub"),fl=q("#cFl");
 setFace(me.querySelector(".head"),o.myName);setFace(opp.querySelector(".head"),o.oppName);
 ref.querySelector(".head").style.background="#e2b28a";
 const fg=w=>w.querySelector(".fg");
 const base=(w,c)=>{const g=fg(w);g.dataset.base=c;g.className="fg "+c};
 const react=async(w,c,ms)=>{const g=fg(w);g.className="fg "+c;await sleep(ms);g.className="fg "+(g.dataset.base||"")};
 const pos=(w,k)=>{w.style.left=`calc(50% + calc(var(--u)*${k}))`};
 const rbase=c=>{ref.className="fw ref "+c};
 const banner=(t,c)=>{ban.className="banner "+(c||"");ban.textContent=t;void ban.offsetWidth;ban.classList.add("show")};
 const say=t=>{sub.textContent=t;sub.classList.add("show")},hush=()=>sub.classList.remove("show");
 const flash=()=>{fl.classList.remove("go");void fl.offsetWidth;fl.classList.add("go")};
 const shake=()=>{cine.classList.remove("shake");void cine.offsetWidth;cine.classList.add("shake")};
 const words=["POW!","BAM!","WHAM!","SMACK!"],rw=()=>words[Math.floor(Math.random()*words.length)];
 const pop=(t,w)=>{const r=w.getBoundingClientRect(),e=document.createElement("div");e.className="impact";e.textContent=t;e.style.left=(r.left+r.width/2-50+(Math.random()*40-20))+"px";e.style.top=(r.top+r.height*.05)+"px";cine.appendChild(e);setTimeout(()=>e.remove(),800)};
 const zoom=async(w,sc,ms)=>{const r=w.getBoundingClientRect();world.style.transformOrigin=`${r.left+r.width/2}px ${r.top+r.height*.15}px`;world.style.transform=`scale(${sc})`;await sleep(ms);world.style.transform=""};
 const confetti=()=>{const cols=["#ffd35c","#e63946","#fff","#4bd19b","#4da3ff"];for(let i=0;i<90;i++){const e=document.createElement("i");e.className="conf";e.style.left=Math.random()*100+"%";e.style.background=cols[i%cols.length];e.style.animationDuration=(2.2+Math.random()*2.2)+"s";e.style.animationDelay=(Math.random()*.8)+"s";cine.appendChild(e);setTimeout(()=>e.remove(),5500)}};
 const strike=async(att,def,type,hitCls)=>{const g=fg(att);g.className="fg jab"+type;await sleep(170);if(def){cineSfx("thud");pop(rw(),def);react(def,hitCls||"hit",320)}await sleep(280);g.className="fg "+(g.dataset.base||"")};
 const close=()=>{skip=true;cine.className="";cine.innerHTML="";document.body.style.overflow=""};
 q("#cSkip").onclick=close;

 const winEl=draw?null:(meWin?me:opp),loseEl=draw?null:(meWin?opp:me);
 const wS=winEl===me?-1:1,lS=-wS;
 const winName=meWin?o.myName:o.oppName;
 const bring=(from)=>{ // referee runs in
  ref.style.transition="none";pos(ref,from);ref.className="fw ref ghost";void ref.offsetWidth;ref.style.transition="";rbase("run");
 };

 /* ---------- KO ---------- */
 async function seqKO(){
  await sleep(600);cineSfx("bell");
  await strike(winEl,loseEl,"F");
  react(loseEl,"jabR",380);await sleep(450);
  await strike(winEl,loseEl,"R");
  banner("R"+o.finishRound,"small gold");await sleep(300);
  react(winEl,"big",800);await sleep(470);
  flash();shake();cineSfx("big");pop("BOOM!",loseEl);react(loseEl,"hit",320);
  zoom(loseEl,1.45,700);await sleep(380);
  base(loseEl,"fallBack");banner("KNOCKOUT!");cineSfx("roar");
  await sleep(1550);base(loseEl,"lie dizzy");
  bring(wS*-70);await sleep(60);pos(ref,0);await sleep(900);
  rbase("waveX");say("Hakim döyüşü dayandırdı!");await sleep(1700);
 }
 /* ---------- TKO ---------- */
 async function seqTKO(){
  await sleep(600);cineSfx("bell");
  await strike(winEl,loseEl,"F");await strike(winEl,loseEl,"R");
  pos(loseEl,lS*16);base(loseEl,"hurt");pos(winEl,wS*4);await sleep(850);
  await strike(winEl,loseEl,"F");
  react(winEl,"big",800);await sleep(470);
  flash();shake();cineSfx("big");pop("BAM!",loseEl);zoom(loseEl,1.35,600);
  base(loseEl,"slump dizzy");await sleep(500);
  for(let i=0;i<3;i++){await strike(winEl,loseEl,i%2?"F":"R","slumpHit");if(i===0)banner("ARDICIL ZƏRBƏLƏR!","small")}
  bring(wS*-70);pos(ref,lS*6+wS*0);await sleep(850);
  rbase("waveX");pos(winEl,wS*10);banner("TKO!");cineSfx("roar");say("Hakim döyüşü dayandırdı!");await sleep(1900);
 }
 /* ---------- SUBMISSION ---------- */
 async function seqSUB(){
  await sleep(600);cineSfx("bell");
  await strike(loseEl,null,"F");await sleep(150);
  pos(winEl,wS*-4);banner("TAKEDOWN!","small");await sleep(520);
  // ground cluster: heads point the same way as the loser's head
  const headDir=loseEl===opp?1:-1,pL=-headDir*16,pW=pL-headDir*2.6;
  flash();shake();cineSfx("big");
  winEl.classList.toggle("flip",loseEl===opp);
  pos(loseEl,pL);pos(winEl,pW);loseEl.classList.add("top");
  base(loseEl,"fallBack");base(winEl,"lie");
  await sleep(1600);base(loseEl,"strain");
  const hr=loseEl.querySelector(".head").getBoundingClientRect();
  rnc.style.setProperty("--wskin",winEl===me?mySkin:oppSkin);
  const ru=hr.width/7.4*11;rnc.style.width=ru+"px";rnc.style.height=(hr.width/7.4*2.8)+"px";
  rnc.style.left=(hr.left+hr.width/2-ru/2+headDir*(-hr.width*.15))+"px";rnc.style.top=(hr.top+hr.height*.72)+"px";
  rnc.style.transform=`rotate(${headDir>0?-16:16}deg)`;rnc.classList.add("on");
  say(`🔒 ${winName} arxadan boğma fəndini oturtdu!`);banner("BOĞMA!","small");await sleep(1500);
  banner("TAP! TAP!","gold");
  for(let i=0;i<5;i++){cineSfx("tap");pop("TAP!",loseEl);await sleep(300)}
  // referee in
  bring(headDir*80);pos(ref,headDir*(16+14));await sleep(900);
  rbase("down");await sleep(500);
  rnc.classList.remove("on");banner("SUBMISSION!");cineSfx("roar");rbase("waveX");say("Rəqib təslim oldu — hakim döyüşü bitirdi!");
  await sleep(1300);
  // fighters get up
  loseEl.classList.remove("top");winEl.classList.toggle("flip",winEl===opp);
  base(winEl,"idle");pos(winEl,wS*12);base(loseEl,"sit");pos(loseEl,lS*14);await sleep(1200);
 }
 /* ---------- Final qərar ---------- */
 async function declare(){
  hush();
  if(o.grim){say("🕯️ Həkimlər təcili olaraq rinqə daxil oldu…");await sleep(3200);return}
  const fighting=o.finish;
  if(!fighting){
   // decision: fighters walk to the center, referee takes both hands
   banner("HAKİMLƏRİN QƏRARI","small gold");base(me,"idle");base(opp,"idle");
   pos(me,-12);pos(opp,12);pos(ref,0);rbase("hold");ref.classList.remove("ghost");await sleep(900);
   base(me,"holdhand");base(opp,"holdhand");await sleep(900);
   const cards=judgeCards(o);
   if(draw){say("Hakim kartları: 28-28 • 28-28 • 28-28");}
   else say(`Hakim kartları: ${cards.join(" • ")} — ${winName} xeyrinə`);
   await sleep(2800);
  }else{
   const how={KO:"nokautla",TKO:"texniki nokautla",SUB:"təslim fəndi ilə"}[o.finish];
   say(`${o.finishRound}-ci raundda, ${how}…`);
   pos(ref,0);pos(winEl,wS*12);base(winEl,"idle");rbase("hold");ref.classList.remove("ghost");await sleep(1400);
   if(o.finish!=="KO"&&loseEl)base(loseEl,"sit");
   await sleep(300);
  }
  say(draw?"… nəticə:":"… və qalib:");await sleep(1700);hush();
  // reveal
  flash();cineSfx("roar");confetti();
  if(draw){banner("HEÇ-HEÇƏ!","gold");rbase("upBoth");base(me,"raised");base(opp,"raised");say("Qərar: bərabərlik")}
  else{
   banner(winName.toUpperCase()+"!",meWin?"gold":"");
   rbase(wS<0?"upL":"upR");base(winEl,"raised");
   if(!o.finish)base(loseEl,"sad");
   say(meWin?"🏆 Təbriklər — qələbə sənindir!":"Bu dəfə alınmadı… Güclənib qayıdacaqsan.");
  }
  await sleep(4200);
 }
 try{
  await sleep(300);
  if(o.finish==="KO")await seqKO();else if(o.finish==="TKO")await seqTKO();else if(o.finish==="SUB")await seqSUB();
  await declare();
 }catch(e){console.error("cinematic",e)}
 close();
}

/* ===== CONTRACT SIGNING TABLE SCENE: JS ===== */
const SD_LANGS={az:"Azərbaycan",en:"English",tr:"Türkçe"};
const SD_T={
az:{title:"MÜQAVİLƏ İMZALANMASI",skip:"⏭ Keç",hint:"Növbəti cümlə üçün toxun",sign:"✍️ Müqavilələr imzalandı — döyüş qəbul edildi!"},
en:{title:"CONTRACT SIGNING",skip:"⏭ Skip",hint:"Tap for next line",sign:"✍️ Contracts signed — the fight is ON!"},
tr:{title:"SÖZLEŞME İMZALAMA",skip:"⏭ Geç",hint:"Sonraki cümle için dokun",sign:"✍️ Sözleşmeler imzalandı — dövüş kabul edildi!"},
ru:{title:"ПОДПИСАНИЕ КОНТРАКТА",skip:"⏭ Пропустить",hint:"Нажми для следующей реплики",sign:"✍️ Контракты подписаны — бой принят!"},
es:{title:"FIRMA DEL CONTRATO",skip:"⏭ Saltar",hint:"Toca para la siguiente línea",sign:"✍️ Contratos firmados: ¡la pelea está confirmada!"},
de:{title:"VERTRAGSUNTERZEICHNUNG",skip:"⏭ Überspringen",hint:"Tippen für die nächste Zeile",sign:"✍️ Verträge unterschrieben – der Kampf steht!"},
fr:{title:"SIGNATURE DU CONTRAT",skip:"⏭ Passer",hint:"Touche pour la réplique suivante",sign:"✍️ Contrats signés — le combat est confirmé !"},
pt:{title:"ASSINATURA DO CONTRATO",skip:"⏭ Pular",hint:"Toque para a próxima fala",sign:"✍️ Contratos assinados — a luta está confirmada!"},
it:{title:"FIRMA DEL CONTRATTO",skip:"⏭ Salta",hint:"Tocca per la battuta successiva",sign:"✍️ Contratti firmati — il match è confermato!"},
ar:{title:"توقيع العقد",skip:"⏭ تخطي",hint:"المس للجملة التالية",sign:"✍️ تم توقيع العقود — النزال مؤكد!"},
ja:{title:"契約調印式",skip:"⏭ スキップ",hint:"タップで次のセリフ",sign:"✍️ 契約成立 — 試合が決定！"},
zh:{title:"签约仪式",skip:"⏭ 跳过",hint:"点击进入下一句",sign:"✍️ 合同已签署 — 比赛确定！"}
};

/* ===== AUTO-TRANSLATE LAYER (whole UI) ===== */
const TRL={cache:{},map:new Map(),failed:new Set(),t:null,lock:false,obs:null,saveT:null};
try{TRL.cache=JSON.parse(localStorage.getItem("ufcTrCacheV1")||"{}")}catch(e){}
const TRQ={run:0,wait:[],fly:new Map(),fail:0,ok:0};
const TR_CODE={zh:"zh-CN"};
async function trFetch(text,src,tgt){
 const tl=TR_CODE[tgt]||tgt;
 try{const r=await fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl="+src+"&tl="+tl+"&dt=t&q="+encodeURIComponent(text));
  if(r.ok){const j=await r.json();const out=(j[0]||[]).map(x=>x[0]).join("");if(out)return out}}catch(e){}
 try{const r=await fetch("https://api.mymemory.translated.net/get?q="+encodeURIComponent(text)+"&langpair="+src+"|"+tl);
  const j=await r.json();const out=j.responseData&&j.responseData.translatedText;if(out&&!/MYMEMORY|INVALID|QUERY LENGTH/i.test(out))return out}catch(e){}
 return null;
}
function trDirty(){clearTimeout(TRL.saveT);TRL.saveT=setTimeout(()=>{try{const j=JSON.stringify(TRL.cache);if(j.length>3e6){TRL.cache={};return}localStorage.setItem("ufcTrCacheV1",j)}catch(e){}},1500)}
function trToast(){
 let el=document.getElementById("trToast");
 if(!el){el=document.createElement("div");el.id="trToast";el.setAttribute("translate","no");el.style.cssText="position:fixed;left:10px;bottom:10px;z-index:200;background:#000c;color:#f5c95b;border:1px solid #f5c95b55;border-radius:20px;padding:6px 12px;font:700 12px system-ui;display:none;pointer-events:none";document.body.appendChild(el)}
 const n=TRQ.wait.length+TRQ.run;
 if(n>0){el.textContent="🌐 … "+n;el.style.display="block"}
 else if(TRQ.fail>0&&TRQ.ok===0){el.textContent="🌐 Auto-translate needs internet";el.style.display="block";setTimeout(()=>{el.style.display="none"},4000);TRQ.fail=0}
 else el.style.display="none";
}
function trPump(){while(TRQ.run<6&&TRQ.wait.length){const f=TRQ.wait.shift();TRQ.run++;f().finally(()=>{TRQ.run--;trToast();trPump()})}trToast()}
function trGet(text,src,tgt){
 const key=src+">"+tgt+"|"+text;
 if(TRL.cache[key])return Promise.resolve(TRL.cache[key]);
 if(TRL.failed.has(key))return Promise.resolve(null);
 if(TRQ.fly.has(key))return TRQ.fly.get(key);
 const p=new Promise(res=>{TRQ.wait.push(async()=>{const v=await trFetch(text,src,tgt);if(v){TRL.cache[key]=v;TRQ.ok++;trDirty()}else{TRQ.fail++;TRL.failed.add(key)}res(v)})});
 TRQ.fly.set(key,p);p.then(()=>TRQ.fly.delete(key));trPump();return p;
}
function trResolve(r,cur,L,need){
 const core=r.az.trim();
 if(!core||!/\p{L}/u.test(core))return cur;
 if(L==="az")return r.az;
 const hit=TRL.cache["az>"+L+"|"+core];
 if(hit)return r.az.match(/^\s*/)[0]+hit+r.az.match(/\s*$/)[0];
 need.add(core);return cur;
}
function trScan(){
 const L=gameSettings.lang||"az",need=new Set();TRL.lock=true;
 try{
  const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:n=>{const p=n.parentNode;return(!p||/^(SCRIPT|STYLE|TEXTAREA|NOSCRIPT)$/.test(p.nodeName)||p.closest("#sitd,[translate=no]"))?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}});
  let n;while(n=w.nextNode()){
   let r=TRL.map.get(n);if(!r||n.data!==r.tr){r={az:n.data,tr:n.data};TRL.map.set(n,r)}
   const v=trResolve(r,n.data,L,need);if(v!==n.data)n.data=v;r.tr=v;
  }
  document.querySelectorAll("[placeholder],[title],[aria-label]").forEach(el=>{
   if(el.closest("#sitd,[translate=no]"))return;
   ["placeholder","title","aria-label"].forEach(a=>{const cur=el.getAttribute(a);if(cur==null)return;el.__a=el.__a||{};let r=el.__a[a];if(!r||cur!==r.tr){r=el.__a[a]={az:cur,tr:cur}}const v=trResolve(r,cur,L,need);if(v!==cur)el.setAttribute(a,v);r.tr=v})
  });
 }finally{TRL.lock=false}
 for(const m of TRL.map.keys())if(!m.isConnected)TRL.map.delete(m);
 if(TRL.obs)TRL.obs.takeRecords();
 need.forEach(c=>{trGet(c,"az",L).then(v=>{if(v)trSched()})});
}
function trSched(){clearTimeout(TRL.t);TRL.t=setTimeout(trScan,60)}
function setUiLang(l){
 if(!SD_T[l])l="az";gameSettings.lang=l;saveGameSettings();TRL.failed.clear();
 document.documentElement.lang=l;document.documentElement.dir=l==="ar"?"rtl":"ltr";
 ["uiLang","sdLangSetting","sdLang"].forEach(id=>{const e=document.getElementById(id);if(e&&e.value!==l)e.value=l});
 trScan();if(typeof window.sdOnLang==="function")window.sdOnLang();
}

/* ===== DIALOGUE POOL (az + en source; other languages auto-translated from en) ===== */
const SD_D={
r1:{opp:[["Deməli, sənsən {me}. Haqqında çox eşitmişəm.","So you're {me}. I've heard a lot about you."],["Gəlib çıxdın, {me}? Mən səni daha hündür təsəvvür edirdim.","You showed up, {me}? I pictured you taller."],["Salam, {me}. Gözlərinə baxıram, qorxu görürəm.","Hey, {me}. I'm looking in your eyes and I see fear."]],
 ch:{cool:[["Hörmət edirəm. Qoy qəfəs danışsın.","Respect. Let the cage do the talking."],["Salam, {opp}. Yaxşı döyüş olsun.","Hello, {opp}. May the better fighter win."]],
     hard:[["Mən heç kimdən qorxmuram. Tezliklə özün də görəcəksən.","I fear nobody. You'll see that soon enough."],["Qorxu sənin gözlərindədir, kloun.","The fear is in your eyes, clown."]],
     joke:[["Eşitdim yaxşı yatırsan. Tezliklə daha dərin yatacaqsan.","I hear you sleep well. Soon you'll sleep even deeper."],["Hündürlük vacib deyil, yerdə hamı bərabərdir.","Height doesn't matter, everyone's equal on the floor."]]},
 re:{cool:[["Ağıllı cavabdır. Amma ringdə sənə hörmət olmayacaq.","Smart answer. But there'll be no respect for you in the ring."],["Yaxşı. Sakit döyüşçüləri sevirəm... tez yıxılırlar.","Fine. I like quiet fighters... they fall faster."]],
     hard:[["Ha! Bax sənə! Görək qəfəsdə də belə cəsarətlisən?","Ha! Look at you! Let's see if you're this tough in the cage."],["Ağzını yığ, uşaq! Danışmaq asandır.","Watch your mouth, kid! Talk is cheap."]],
     joke:[["Çox gülməlidir... Gülüşün birinci raundda bitəcək.","Very funny... your laughing ends in round one."],["Zarafatcıl, hə? Mənim yumruqlarım zarafat bilmir.","A joker, huh? My fists don't get jokes."]]}},
r2:{opp:[["Rekordun gülməlidir. Mənə qarşı bir raund da dayana bilməzsən.","Your record is a joke. You won't last a round against me."],["Səni o qəfəsdə yatızdıracağam, hamı da baxacaq.","I'll put you to sleep in that cage and everyone will watch."],["Bu döyüşü mənə hədiyyə verdilər. Sən sadəcə qurbansan.","They handed me this fight as a gift. You're just the victim."],["Lənət olsun, nə vaxtdan belə zəif rəqiblərlə döyüşürəm?","Damn, since when do I fight such weak opponents?"]],
 ch:{hard:[["Kəs səsini, boş danışan! Qəfəsdə görüşərik.","Shut up, big mouth! See you in the cage."],["Bu sözləri yadında saxla, yerdən qalxanda hamısını yeyəcəksən.","Remember these words, you'll eat them when you get up off the floor."]],
     joke:[["Gözləmə, avtoqraf vermirəm. Ancaq yumruq imzalayıram.","Don't wait, I don't sign autographs. Only fists."],["Çox danışırsan. Heç yorulmursan?","You talk a lot. Don't you get tired?"]],
     cool:[["Danış, danış. Zəng çalanda hamı gerçəyi görəcək.","Keep talking. When the bell rings, everyone will see the truth."],["Mən hazıram. Sən də hazırlaşsan yaxşı olar.","I'm ready. You'd better get ready too."]]},
 re:{hard:[["Nə dedin?! Bunu ödəyəcəksən, axmaq!","What did you say?! You'll pay for that, idiot!"],["Cəsarətin var, amma beynin yoxdur!","You've got guts, but no brains!"]],
     joke:[["Gülməli deyil, kloun! Bu zarafata görə yıxılacaqsan.","Not funny, clown! You'll go down for that joke."],["Hələ gülürsən? Görək ağlayanda necə olacaq.","Still laughing? Let's see how you cry."]],
     cool:[["Soyuqqanlısan... Xoşuma gəlmir bu.","Cold-blooded... I don't like that."],["Sakitlər həmişə təhlükəlidir. Amma sən məni qorxutmazsan.","The quiet ones are always dangerous. But you don't scare me."]]}},
r3:{opp:[["Qələm masanın üstündədir. İmzala, əgər cəsarətin çatırsa.","The pen's on the table. Sign it, if you've got the guts."],["Qaçış yoxdur. İmzala və taleyinlə üz-üzə gəl.","No way out. Sign and face your fate."],["Hamı gözləyir, {me}. İmzala görək!","Everybody's waiting, {me}. Sign it already!"]],
 ch:{hard:[["İmzaladım. Döyüş gecəsi görüşərik, uduzan.","Signed. See you on fight night, loser."],["Bu imza sənin axırın olacaq.","This signature will be your end."]],
     cool:[["İmzalayıram. Qoy ən yaxşısı qalib gəlsin.","I'm signing. May the best fighter win."],["Hazıram. İmza atıram və işimə baxıram.","I'm ready. I sign and get to work."]],
     joke:[["Qələmi sənə borc verim? Bəhanələrini yazmaq üçün lazım olacaq.","Want to borrow the pen? You'll need it to write your excuses."],["İmzalayım... amma haqqımı artırın, bu asan olacaq.","I'll sign... but raise my pay, this will be easy."]]},
 re:{hard:[["Hörmət... amma yalnız zəng çalınana qədər.","Respect... but only until the bell rings."],["Gözəl. Sonra bu sözləri yerdən təkrar edərsən.","Nice. You can repeat those words from the floor later."]],
     cool:[["Yaxşı. Qəfəsdə görüşərik, {me}.","Good. See you in the cage, {me}."],["Hörmətini yadda saxlayacağam. Yumruğumu da.","I'll remember your respect. And my punch too."]],
     joke:[["Gülüşünü saxla, axırıncı dəfədir.","Save your laugh, it's your last."],["Pul sənə lazım olmayacaq, xəstəxanaya gedəcəksən.","You won't need the money, you're going to the hospital."]]}}
};