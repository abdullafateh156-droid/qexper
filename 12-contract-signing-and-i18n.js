
(function(){
const E=t=>String(t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const R=a=>a[Math.floor(Math.random()*a.length)];
const tst=t=>{try{window.__v7.toast(t)}catch(e){}};
const KEY="ufcLegendsSaveV6",persist=()=>{try{localStorage.setItem(KEY,JSON.stringify(s))}catch(e){}};
const MG={a:{n:"Rauf Əliyev",fee:.05,m:1.2,d:"Kiçik agentlik · 5% komissiya · izləyici artımı ×1.2"},b:{n:"Elena Park",fee:.1,m:1.8,d:"Regional şəbəkə · 10% komissiya · ×1.8"},c:{n:"Marcus Cole",fee:.15,m:3,d:"Qlobal agentlik · 15% komissiya · ×3"}};
const TR=[["Qəfəs Girişi","triangle",[110,146.83,164.81,146.83,123.47,164.81,196,164.81],55],["Qırmızı Künc","sawtooth",[98,123.47,146.83,123.47,110,146.83,174.61,146.83],49],["Ağır Raund","square",[82.41,98,110,98,87.31,110,130.81,110],41],["Kəmər Yolu","triangle",[130.81,164.81,196,246.94,196,164.81,146.83,164.81],65],["Son Raund","sawtooth",[110,110,165,110,123.47,185,220,185],55],["Gecə Zalı","sine",[146.83,174.61,220,174.61,130.81,196,246.94,196],73],["Qalibin Marşı","square",[196,246.94,293.66,246.94,220,261.63,329.63,261.63],98]];
const VO={off:null,mike:{n:"Mike (qalın səs)",p:.6,r:.95},joe:{n:"Joe (orta səs)",p:1,r:1.05},sara:{n:"Sara (incə səs)",p:1.5,r:1}};
const SRC=["MMA Gündəlik","Qəfəs Xəbər","Octagon Post","Sport.az"];
const fmt=n=>n>=1e6?(n/1e6).toFixed(2)+"M":n>=1e3?(n/1e3).toFixed(1)+"K":String(n);
function L(){s.life=s.life||{};const l=s.life;if(l.fol===undefined)Object.assign(l,{fol:3000,mgr:null,fam:60,mar:0,kids:0,news:[],reach:(s.height||178)+Math.round(Math.random()*8-2),wc:-99,voice:"off",track:0,aged:s.week||1,restW:-1,doc:"",wasBelt:!!s.belt});if(l.cash0===undefined)l.cash0=s.cash;return l}
function news(t){const l=L();l.news.unshift({w:s.week,t:"📰 "+R(SRC)+": "+t});l.news=l.news.slice(0,12)}
let last=(s.history||[]).length;
function after(h){const l=L(),o=opponent&&opponent.name===h.opponent?opponent:null,my=avg(),p=o?o.power:my,w=h.outcome==="QƏLƏBƏ",lo=h.outcome==="MƏĞLUBİYYƏT",m=l.mgr?MG[l.mgr].m:1;
let d=w?900:lo?-250:80;if(w&&(h.method==="KO"||h.method==="TKO"||h.method==="SUB"))d+=700;
if(w&&p-my>=6){d+=4000;news(`SÜRPRİZ! ${s.name} favorit ${h.opponent}-i ${h.method} ilə məğlub etdi!`)}
else if(lo&&my-p>=6){d=-2500;news(`Şok məğlubiyyət: ${s.name} zəif görünən ${h.opponent}-ə uduzdu!`)}
else if(w)news(`${s.name} ${h.opponent} üzərində ${h.method} qələbəsi qazandı.`);
else if(lo)news(`${h.opponent} ${s.name}-i məğlub etdi — tənqidlər artır.`);
else news(`${s.name} və ${h.opponent} heç-heçə ilə ayrıldı.`);
l.fol=Math.max(0,Math.round(l.fol+(d>0?d*m:d)));
const gain=s.cash-(l.cash0??s.cash);if(l.mgr&&gain>0){const f=Math.round(gain*MG[l.mgr].fee);s.cash-=f;news(`Menecer ${MG[l.mgr].n} ${money(f)} komissiya götürdü.`)}
l.fam=Math.min(100,Math.max(0,l.fam+(w?3:-8)));l.cash0=s.cash}
function tick(){const l=L(),n=(s.history||[]).length;if(n>last){after(s.history[n-1]);last=n;persist()}else{last=n;l.cash0=s.cash}
if(s.belt&&!l.wasBelt)news(`${s.name} UFC çempion kəmərini qazandı! 🏆`);l.wasBelt=!!s.belt}
function weekly(){const l=L();l.fam=Math.max(0,l.fam-4-l.kids*2);
if(l.fam<30){s.energy=Math.max(0,(s.energy??100)-10);if(Math.random()<.4)news(`${s.name}-in ailə problemləri məşqlərə təsir edir.`)}else if(l.fam>70)s.energy=Math.min(100,(s.energy??100)+5);
l.fol=Math.round(l.fol*1.002);
if(s.week-l.aged>=52){l.aged=s.week;s.age=(s.age||22)+1;const a=s.age,ks=["speed","stamina","grappling","wrestling","defense","striking"],k=R(ks);
if(a>=33){const dn=a>=37?2:1;s.stats[k]=Math.max(20,s.stats[k]-dn);if(a>=36){const k2=R(ks);s.stats[k2]=Math.max(20,s.stats[k2]-1)}news(`${s.name} ${a} yaşına çatdı — yaş təsiri hiss olunur (${k} −${dn}).`)}
else{if(a<=27)s.stats[k]=Math.min(99,s.stats[k]+1);news(`${s.name} ${a} yaşına çatdı.`)}}}
const nw=document.getElementById("nextWeek"),nw0=nw.onclick;
nw.onclick=async function(){const w0=s.week,r=await nw0.apply(this,arguments);if(s.week>w0){try{weekly();persist();save()}catch(e){}}return r};
const sim0=simulate;
simulate=async function(){const l=L(),o=opponent;let b=0;if(o){const hs=[...o.name].reduce((a,c)=>a+c.charCodeAt(0),0),or=(s.height||178)+(hs%9)-3;b=Math.max(-3,Math.min(3,Math.round((l.reach-or)/2)))}
s.stats.striking+=b;try{return await sim0.apply(this,arguments)}finally{s.stats.striking-=b;persist()}};
musicTick=function(){if(!musicCtx||!musicOn)return;const t=TR[L().track]||TR[0],now=musicCtx.currentTime,o=musicCtx.createOscillator(),g=musicCtx.createGain(),v=t[1]==="triangle"||t[1]==="sine"?.11:.05;
o.type=t[1];o.frequency.setValueAtTime(t[2][musicStep%8],now);g.gain.setValueAtTime(.0001,now);g.gain.exponentialRampToValueAtTime(v,now+.025);g.gain.exponentialRampToValueAtTime(.0001,now+.32);o.connect(g);g.connect(musicMaster||musicCtx.destination);o.start(now);o.stop(now+.34);
if(musicStep%2===0){const b=musicCtx.createOscillator(),bg=musicCtx.createGain();b.type="sine";b.frequency.value=t[3];bg.gain.setValueAtTime(.0001,now);bg.gain.exponentialRampToValueAtTime(.14,now+.02);bg.gain.exponentialRampToValueAtTime(.0001,now+.18);b.connect(bg);bg.connect(musicMaster||musicCtx.destination);b.start(now);b.stop(now+.2)}musicStep++};
let spoken="";const fl=document.getElementById("fightLog");
if(fl)new MutationObserver(()=>{const v=VO[L().voice];if(!v)return;try{const p=[...fl.querySelectorAll("p")].pop();if(!p)return;const t=p.textContent.trim();if(!t||t===spoken)return;spoken=t;const vs=speechSynthesis.getVoices(),lg=gameSettings.lang||"az",vc=vs.find(x=>x.lang.toLowerCase().startsWith(lg))||vs.find(x=>x.lang.toLowerCase().startsWith("tr"))||vs.find(x=>x.lang.toLowerCase().startsWith("en")),u=new SpeechSynthesisUtterance(t);if(vc){u.voice=vc;u.lang=vc.lang}u.pitch=v.p;u.rate=v.r;if(speechSynthesis.pending)speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){}}).observe(fl,{childList:true});
document.getElementById("tabs").insertAdjacentHTML("beforeend",'<button class="tab" data-tab="life"><i>🌟</i><span>Həyat</span></button>');
document.querySelector("main footer").insertAdjacentHTML("beforebegin",'<section id="life" class="page hidden" translate="no"><div id="lifeBox"></div></section>');
const opt=(arr,sel)=>arr.map(([v,t])=>`<option value="${v}" ${String(v)===String(sel)?"selected":""}>${E(t)}</option>`).join("");
function paint(){const box=document.getElementById("lifeBox");if(!box||document.getElementById("life").classList.contains("hidden"))return;const l=L(),en=Math.round(s.energy??100),H=s.history||[];
box.innerHTML=`<div class="grid">
<div class="card span6"><h3>🧬 Döyüşçü və sağlamlıq</h3><div class="pills"><span class="pill">🎂 Yaş: ${s.age||22}</span><span class="pill">📏 Boy: ${s.height||178} sm</span><span class="pill">🦾 Qol uzunluğu: ${l.reach} sm</span><span class="pill">⚡ Enerji: ${en}</span></div><p class="muted" style="font-size:12px">Qol uzunluğu rəqibdən artıqdırsa striking-ə (±3) təsir edir. 33 yaşdan sonra göstəricilər illik düşür.</p><button data-act="rest" ${l.restW===s.week?"disabled":""}>😴 İstirahət (+25 enerji, həftədə 1)</button> <button data-act="doc">🩺 Həkim yoxlaması ($300)</button><div class="result" ${l.doc?"":'style="display:none"'}>${E(l.doc)}</div></div>
<div class="card span6"><h3>📱 Sosial media</h3><div class="big gold">${fmt(l.fol)}</div><div class="muted">Instagram izləyicisi</div><div class="log" style="max-height:190px">${l.news.length?l.news.map(n=>`<p>${E(n.t)} <span class="muted">(h.${n.w})</span></p>`).join(""):'<p class="muted">Hələ xəbər yoxdur.</p>'}</div></div>
<div class="card span6"><h3>💼 Menecer</h3>${l.mgr?`<div class="result"><b>${MG[l.mgr].n}</b><div class="muted">${MG[l.mgr].d}</div></div><button data-act="fire" style="margin-top:8px">Müqaviləni bitir</button>`:Object.entries(MG).map(([k,m])=>`<div class="eventrow"><span><b>${m.n}</b><br><span class="muted">${m.d}</span></span><button data-act="hire" data-v="${k}">Seç</button></div>`).join("")}</div>
<div class="card span6"><h3>👨‍👩‍👧 Ailə həyatı</h3><div class="pills"><span class="pill">${l.mar?"💍 Evli":"Subay"}</span><span class="pill">👶 Uşaq: ${l.kids}</span></div><div class="statrow" style="grid-template-columns:70px 1fr 32px"><span>Əhval</span><div class="bar"><i style="width:${l.fam}%"></i></div><b>${Math.round(l.fam)}</b></div><p class="muted" style="font-size:12px">Əhval 30-dan aşağı enerjini azaldır, 70-dən yuxarı artırır.</p><button data-act="fam">🍽️ Ailə ilə vaxt (−15 enerji)</button> ${l.mar?"":'<button data-act="marry">💍 Evlən ($8,000)</button>'} ${l.mar&&l.kids<3?'<button data-act="kid">👶 Uşaq sahibi ol</button>':""}</div>
<div class="card span6"><h3>⚖️ Çəki dərəcəsini dəyiş</h3><p class="muted" style="font-size:12px">Hazırda: ${s.weight}. Dəyişəndə reytinq #15-ə düşür, kəmər itir. 8 həftədə bir.</p><select id="wcSel">${opt(Object.keys(divisionPools).map(k=>[k,k]),s.weight)}</select><button data-act="wc" style="margin-top:8px">Dəyiş</button></div>
<div class="card span6"><h3>🎙️ Şərhçi və 🎵 Musiqi</h3><label>Şərhçi səsi</label><select id="voSel">${opt([["off","Söndürülüb"],...Object.entries(VO).filter(x=>x[1]).map(([k,v])=>[k,v.n])],l.voice)}</select><label>Playlist (7 mahnı)</label><select id="trSel">${opt(TR.map((t,i)=>[i,(i+1)+". "+t[0]]),l.track)}</select><div style="display:flex;gap:8px;margin-top:8px"><button data-act="prev">⏮</button><button data-act="mus">▶/⏸</button><button data-act="next">⏭</button></div></div>
<div class="card span12"><h3>📜 Karyera tarixçəsi (${H.length})</h3>${H.length?`<div style="overflow-x:auto"><table><tr><th>#</th><th>Rəqib</th><th>Nəticə</th><th>Üsul</th><th>Raund</th><th>Xal</th></tr>${H.map((h,i)=>[i,h]).reverse().map(([i,h])=>`<tr><td>${i+1}</td><td>${E(h.opponent)}</td><td class="${h.outcome==="QƏLƏBƏ"?"green":h.outcome==="MƏĞLUBİYYƏT"?"red":""}">${E(h.outcome)}</td><td>${E(h.method)}</td><td>${h.round||"-"}</td><td>${E(h.score||"")}</td></tr>`).join("")}</table></div>`:'<p class="muted">Hələ döyüş yoxdur.</p>'}</div></div>`}
function act(a,v){const l=L();
if(a==="rest"){l.restW=s.week;s.energy=Math.min(100,(s.energy??100)+25);l.fam=Math.min(100,l.fam+4)}
else if(a==="doc"){if(s.cash<300)return tst("Pul çatmır");s.cash-=300;const inj=s.injury&&s.injury.w>0,en=Math.round(s.energy??100),st=Object.entries(s.stats).sort((x,y)=>x[1]-y[1])[0];let part="";try{part=window.__v7.T("parts")[s.injury.i]}catch(e){}
l.doc=`🩺 Dr. Kərimov (həftə ${s.week}): `+(inj?`${part||"Zədə"} zədəsi var, ${s.injury.w} həftə sağalma lazımdır; döyüş risklidir. `:"Ciddi zədə yoxdur. ")+(en<50?"Yorğunluq yüksəkdir, istirahət məsləhətdir. ":"Enerji normaldir. ")+(s.age>=33?"Yaşa görə oynaq və bərpa nəzarəti vacibdir. ":"")+`Ən zəif göstərici: ${st[0]} (${st[1]}). Ailə əhvalı: ${l.fam<30?"pis":l.fam>70?"əla":"normal"}.`}
else if(a==="hire"){l.mgr=v;news(`${s.name} menecer ${MG[v].n} ilə müqavilə imzaladı.`)}
else if(a==="fire"){l.mgr=null}
else if(a==="fam"){l.fam=Math.min(100,l.fam+20);s.energy=Math.max(0,(s.energy??100)-15)}
else if(a==="marry"){if(s.cash<8000)return tst("Pul çatmır ($8,000)");s.cash-=8000;l.mar=1;l.fam=Math.min(100,l.fam+30);l.fol+=2000;news(`${s.name} evləndi! Toy şəkilləri sosial mediada gündəmdədir.`)}
else if(a==="kid"){l.kids++;l.fam=Math.min(100,l.fam+25);l.fol+=1500;news(`${s.name}-in ailəsində körpə dünyaya gəldi! 👶`)}
else if(a==="wc"){const w=document.getElementById("wcSel").value;if(w===s.weight)return;if(s.week-l.wc<8)return tst("Çəki dərəcəsini 8 həftədən bir dəyişmək olar");l.wc=s.week;s.weight=w;s.rank=15;s.belt=false;s.accepted=false;opponent=null;news(`${s.name} ${w} çəki dərəcəsinə keçdi.`);try{prepareFight()}catch(e){}}
else if(a==="prev"||a==="next"){l.track=(l.track+(a==="next"?1:6))%7;musicStep=0}
else if(a==="mus"){document.getElementById("musicToggle").click();return}
try{save()}catch(e){persist();paint()}}
const box=document.getElementById("lifeBox");
box.addEventListener("click",e=>{const b=e.target.closest("[data-act]");if(b&&!b.disabled)act(b.dataset.act,b.dataset.v)});
box.addEventListener("change",e=>{const l=L();if(e.target.id==="voSel"){l.voice=e.target.value;persist()}else if(e.target.id==="trSel"){l.track=+e.target.value;musicStep=0;persist()}});
document.getElementById("tabs").addEventListener("click",e=>{if(e.target.closest('[data-tab="life"]'))setTimeout(paint,0)});
const r0=render;render=function(){const r=r0.apply(this,arguments);try{tick();paint()}catch(e){}return r};
L();
})();
