(function(){
const $=id=>document.getElementById(id);
/* Musiqi: prosedural phonk / kədərli / motivasiya + YouTube linki */
const AC=window.AudioContext||window.webkitAudioContext;let ctx,master,tm=null,mood=null,st=0,nx=0;
const BPM={phonk:132,sad:68,motivation:128},F=n=>440*Math.pow(2,(n-69)/12);
function init(){if(!ctx){ctx=new AC();master=ctx.createGain();master.gain.value=+($("muV").value);master.connect(ctx.destination)}if(ctx.state==="suspended")ctx.resume()}
function osc(f,t,d,ty,v,f2){const o=ctx.createOscillator(),g=ctx.createGain();o.type=ty;o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(master);o.start(t);o.stop(t+d+.05)}
function nz(t,d,v){const n=ctx.sampleRate*d|0,b=ctx.createBuffer(1,n,ctx.sampleRate),a=b.getChannelData(0);for(let i=0;i<n;i++)a[i]=Math.random()*2-1;const s=ctx.createBufferSource(),g=ctx.createGain(),h=ctx.createBiquadFilter();h.type="highpass";h.frequency.value=7000;s.buffer=b;g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(h);h.connect(g);g.connect(master);s.start(t)}
const kick=t=>osc(150,t,.35,"sine",.9,38),cow=(t,v=.18)=>{osc(587,t,.18,"square",v);osc(845,t,.18,"square",v)};
function play(t,i){const b=i%16,bar=(i/16|0)%4;
 if(mood==="phonk"){const A=[57,57,60,55][bar];if([0,3,6,10,12].includes(b))kick(t);if([0,3,6,8,11,14].includes(b))cow(t);nz(t,.04,b%2?.05:.1);if(b===4||b===12)nz(t,.12,.25);if(b%4===0)osc(F(A-12),t,.4,"sawtooth",.18);if([0,6,10].includes(b))osc(F(A+12+[0,3,7,3][bar]),t,.2,"triangle",.12)}
 else if(mood==="sad"){const R=[57,53,48,55][bar],ch=[0,3,7];if(b===0)ch.forEach(c=>osc(F(R-12+c+(c?12:0)),t,3.2,"triangle",.1));if(b%2===0)osc(F(R+12+ch[(b/2)%3|0]),t,1.1,"sine",.09);if(b===8)osc(F(R+19),t,1.6,"sine",.07)}
 else if(mood==="motivation"){const R=[60,67,57,65][bar];if(b%4===0)kick(t);if(b===4||b===12)nz(t,.14,.3);nz(t,.03,.05);if(b===0)[0,4,7].forEach(c=>osc(F(R-12+c),t,1.8,"sawtooth",.07));osc(F(R+[0,4,7,12][b%4]+(b>7?12:0)),t,.2,"square",.07)}}
function sched(){const sp=60/BPM[mood]/4;while(nx<ctx.currentTime+.2){play(nx,st++);nx+=sp}}
function stop(){clearInterval(tm);tm=null;mood=null;$("muY").innerHTML="";document.querySelectorAll("#muP .md").forEach(b=>b.classList.remove("on"))}
function start(m,b){stop();init();mood=m;st=0;nx=ctx.currentTime+.05;tm=setInterval(sched,40);b.classList.add("on")}
function yt(u){const m=u.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);return m&&m[1]}
let list=[];try{list=JSON.parse(localStorage.getItem("ufcYtList")||"[]")}catch(e){}
function rl(){$("muL").innerHTML=list.map((x,i)=>`<button data-p="${i}">▶ ${x}</button><button data-d="${i}">✕</button>`).join("")||"<small>Hələ link yoxdur.</small>"}
const btn=document.createElement("button");btn.id="muBtn";btn.textContent="🎵";document.body.appendChild(btn);
const P=document.createElement("div");P.id="muP";P.hidden=true;
P.innerHTML=`<b>🎵 Musiqi</b><div><button class="md" data-m="phonk">🔥 Phonk</button><button class="md" data-m="sad">🌧 Kədərli</button><button class="md" data-m="motivation">💪 Motivasiya</button><button id="muS">⏹</button></div><small>Səs</small><input id="muV" type="range" min="0" max="1" step=".05" value=".5" style="width:100%"><hr style="border-color:var(--line)"><small>YouTube linki yapışdır (öz seçdiyin mahnı):</small><input type="text" id="muI" placeholder="https://youtube.com/watch?v=..."><button id="muA">Əlavə et</button><div id="muL"></div><div id="muY"></div>`;
document.body.appendChild(P);rl();
btn.onclick=()=>{P.hidden=!P.hidden};
P.addEventListener("click",e=>{const t=e.target;
 if(t.dataset.m)start(t.dataset.m,t);
 if(t.id==="muS")stop();
 if(t.id==="muA"){const id=yt($("muI").value);if(id&&!list.includes(id)){list.push(id);localStorage.setItem("ufcYtList",JSON.stringify(list));$("muI").value="";rl()}}
 if(t.dataset.d){list.splice(+t.dataset.d,1);localStorage.setItem("ufcYtList",JSON.stringify(list));rl()}
 if(t.dataset.p){stop();$("muY").innerHTML=`<iframe src="https://www.youtube.com/embed/${list[+t.dataset.p]}?autoplay=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>`}});
P.addEventListener("input",e=>{if(e.target.id==="muV"&&master)master.gain.value=+e.target.value});
})();
