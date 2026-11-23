/* LIVE FIGHT: oynana bilən döyüş rejimi */
(function(){
const $=id=>document.getElementById(id),R=Math.random,FA=["😠","😎","🧔","🥸","🤨","😤"],NM=["Dmitri Volkov","Khalid Reyes","Jon Pike","Tariq Bell","Ivan Petrov","Mateus Silva"];
let G=null,raf=0,face=0,AC,keys={},hold={};
const b=document.createElement("button");b.id="lfBtn";b.textContent="🥊 LIVE FIGHT";document.body.appendChild(b);
const ov=document.createElement("div");ov.id="lf";ov.hidden=true;document.body.appendChild(ov);
b.onclick=pick;
function pick(){cancelAnimationFrame(raf);G=null;ov.hidden=false;const nm=(typeof s!=="undefined"&&s&&s.name)||"Fighter";
 ov.innerHTML=`<div id="lfP"><h2>🥊 Üzünü seç</h2><div>${FA.map((f,i)=>`<span class="fc${i==face?" on":""}" data-i="${i}">${f}</span>`).join("")}</div><input id="lfN" maxlength="22" value="${nm}"><br><button class="go" id="lfG">DÖYÜŞƏ BAŞLA</button><br><button id="lfQ" style="margin-top:12px;padding:8px 14px;border-radius:8px;border:0">Bağla</button></div>`;
 ov.onclick=e=>{const t=e.target;if(t.dataset.i){face=+t.dataset.i;pick()}if(t.id==="lfG")start($("lfN").value||"Fighter");if(t.id==="lfQ")close()}}
function close(){cancelAnimationFrame(raf);G=null;ov.hidden=true;ov.innerHTML=""}
const mk=(n,f,x,d)=>({n,f,x,d,hp:{h:100,b:100,l:100},en:100,st:"idle",t:0,k:"",blk:0,dmg:0,tds:0,inj:false,bru:[],blur:0,cd:0,cdv:0});
function start(name){const o=NM[R()*NM.length|0];ov.onclick=null;
 ov.innerHTML=`<canvas id="lfC" width="800" height="450"></canvas><div id="lfB"></div><button id="lfX">✕</button>`;$("lfX").onclick=close;
 G={p:mk(name,FA[face],250,1),o:mk(o,FA[(face+1+R()*4|0)%6],550,-1),time:120,fx:[],say:[],mode:"stand",sb:null,esc:0,slow:1,end:null,sh:0,top:null};
 const bt=$("lfB");bt.onpointerdown=e=>{const a=e.target.dataset.a;if(a){hold[a]=performance.now();if(a=="L"||a=="Rr")keys[a]=1;e.preventDefault()}};
 bt.onpointerup=bt.onpointerout=e=>{const a=e.target.dataset.a;if(a){if(a=="L"||a=="Rr")keys[a]=0;else if(hold[a]){input(a,performance.now()-hold[a]);hold[a]=0}}};
 let last=performance.now();(function loop(n){const dt=Math.min(.05,(n-last)/1e3);last=n;if(!G)return;upd(dt*G.slow);draw();ui();raf=requestAnimationFrame(loop)})(last)}
const KM={a:"L",d:"Rr",j:"P",k:"K",l:"E",s:"B",x:"X",t:"T",g:"U","1":"A","2":"H","3":"N"};
addEventListener("keydown",e=>{const a=KM[e.key.toLowerCase()];if(!G||!a||e.repeat)return;if(a=="L"||a=="Rr")keys[a]=1;else hold[a]=performance.now()});
addEventListener("keyup",e=>{const a=KM[e.key.toLowerCase()];if(!G||!a)return;if(a=="L"||a=="Rr")keys[a]=0;else if(hold[a]){input(a,performance.now()-hold[a]);hold[a]=0}});
function snd(v){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();const n=AC.sampleRate*.7|0,bf=AC.createBuffer(1,n,AC.sampleRate),d=bf.getChannelData(0);for(let i=0;i<n;i++)d[i]=(R()*2-1)*Math.sin(i/n*Math.PI);const s=AC.createBufferSource(),g=AC.createGain(),f=AC.createBiquadFilter();f.type="bandpass";f.frequency.value=900;s.buffer=bf;g.gain.value=Math.min(.5,v);s.connect(f);f.connect(g);g.connect(AC.destination);s.start()}catch(e){}}
function say(t){G.say.push({t,x:200+R()*400,y:90,l:1})}
const COST={P:6,O:14,K:9,H:16,E:4,T:15};
function input(a,ms){const p=G.p;if(G.end)return;
 if(a=="U"&&p.st=="down"){p.up=(p.up||0)+1;return}
 if(G.mode=="tdbar"){if(a=="T"&&G.sb.top==p)G.sb.v+=11;if(a=="U"&&G.sb.top!=p)G.sb.v-=13;return}
 if(G.mode=="ground"){if(G.top==p){if("AHN".includes(a)&&!G.sb)G.sb={type:a,v:12,top:p};else if(G.sb&&a==G.sb.type)G.sb.v+=11}else if(a=="U")G.esc+=13;return}
 if(p.st=="down"||p.st=="atk"||p.st=="ko")return;
 if(a=="B"){p.blk=p.blk==1?0:1;return}if(a=="X"){p.blk=p.blk==2?0:2;return}
 const k=a=="P"?(ms>450?"O":"P"):a=="K"?(ms>450?"H":"K"):a;if(COST[k])attack(p,G.o,k)}
function attack(F,O,k){if(F.st=="atk"||F.st=="down"||F.cd>0)return;F.en=Math.max(0,F.en-COST[k]);F.st="atk";F.k=k;F.t=.28+(k=="O"?.15:0);F.cd=.1;
 const d=Math.abs(F.x-O.x),reach={P:105,O:115,K:125,H:130,E:90,T:105}[k];
 if(k=="T"){if(d<reach&&O.st!="down"){G.mode="tdbar";G.sb={type:"td",v:20,top:F}}return}
 if(d>reach||O.st=="down"||O.st=="ko"){F.miss=1;return}
 let tg=k=="K"?(R()<.6?"l":"b"):k=="P"?(R()<.65?"h":"b"):"h",dm={P:5,O:13,K:8,H:14,E:3}[k]*(.55+.45*F.en/100)*(F.inj?.8:1);
 if(F.blur>0&&R()<.5){return}
 const bl=O.blk==1&&tg!="l"?.15:O.blk==2&&tg=="l"?.15:1;if(k=="E")O.blur=3;dm*=bl;
 if(bl<1){say("BLOCK");dm=Math.max(dm,.5)}
 O.hp[tg]=Math.max(0,O.hp[tg]-dm);F.dmg+=dm;O.en=Math.max(0,O.en-dm*.4);O.st=O.st=="down"?"down":"hit";O.t=.2;O.x+=F.d*(dm>9?22:8);
 if(bl==1){for(let i=0;i<(tg=="h"?(dm>9?14:6):2);i++)G.fx.push({x:O.x,y:tg=="h"?215:265,vx:F.d*(R()*180)+R()*60-30,vy:-R()*170,l:1,c:"#b00"});
  O.bru.push({y:tg=="h"?0:1,dx:R()*20-10,dy:R()*16-8,c:R()<.5?"#4a3a9a":"#7a2a7a"});if(O.bru.length>12)O.bru.shift();
  snd(dm/20);say(dm>9?"OHHHH!!":dm>5?"OH!":"");G.sh=dm>9?10:4;if(R()<.01&&!O.inj){O.inj=true;say("💥 INJURY!")}}
 if(O.hp.h<=0||(O.hp.h<22&&dm>=10&&R()<.35)){ko(O)}else if(O.hp.b<=0||O.hp.l<=0){O.st="down";O.up=0;O.hp.b=Math.max(O.hp.b,8);O.hp.l=Math.max(O.hp.l,8)}}
function ko(O){O.st="ko";O.t=0;G.slow=.3;G.end={w:O==G.p?G.o:G.p,how:"KO"};snd(.9);say("KNOCKOUT!!!");setTimeout(()=>{if(G)G.slow=1},2500)}
function finish(w,how){if(!G.end)G.end={w,how}}
function stopFight(){const{p,o}=G;if(o.inj&&o.hp.h<25)G.end={w:p,how:"Doctor stoppage (TKO)"};if(p.inj&&p.hp.h<25)G.end={w:o,how:"Doctor stoppage (TKO)"}}
function upd(dt){const{p,o}=G;G.time-=dt;G.sh*=.85;
 for(const F of[p,o]){F.cd-=dt;F.blur-=dt;if(F.st=="atk"||F.st=="hit"){F.t-=dt;if(F.t<=0)F.st="idle"}
  if(F.st=="ko"){F.t+=dt}
  const lo=(F.hp.h+F.hp.b+F.hp.l)/300;F.en=Math.min(100,F.en+dt*(F.st=="down"?4:F.blk?3:9)*(.3+.7*lo)*(F.inj?.5:1));
  if(F.en<=0&&F.st=="idle"&&G.mode=="stand"){F.st="down";F.up=0;say(F.n+" is exhausted!")}
  if(F.st=="down"&&G.mode=="stand"){F.up=F.up||0;if(F.up>=6||(F==o&&(F.at=(F.at||0)+dt)>1.6)){F.st="idle";F.up=0;F.at=0;F.en=Math.max(F.en,22);F.blk=0}}}
 if(G.mode=="stand"&&p.st=="idle"){const m=(keys.Rr?1:0)-(keys.L?1:0);p.x+=m*dt*(p.hp.l<30?60:150)*(p.inj?.8:1)}
 p.x=Math.max(60,Math.min(740,p.x));o.x=Math.max(60,Math.min(740,o.x));p.d=p.x<o.x?1:-1;o.d=-p.d;
 if(Math.abs(p.x-o.x)<70){const s2=(70-Math.abs(p.x-o.x))/2;p.x-=p.d*s2;o.x+=p.d*s2}
 if(G.mode=="stand")ai(dt);else if(G.mode=="tdbar")tdb(dt);else groundp(dt);
 G.fx.forEach(f=>{f.x+=f.vx*dt;f.y+=f.vy*dt;f.vy+=500*dt;f.l-=dt*.8});G.fx=G.fx.filter(f=>f.l>0&&f.y<372);G.say.forEach(s=>{s.y-=18*dt;s.l-=dt*.7});G.say=G.say.filter(s=>s.l>0);
 if(G.end&&G.end.how=="KO"){G.eT=(G.eT||0)+dt;if(G.eT>2.2)G.slow=1}
 if(!G.end){stopFight();if(G.time<=0){const a=p.dmg+p.tds*6,c=o.dmg+o.tds*6,w=a>=c?p:o,l=w==p?o:p,sc=[0,1,2].map(()=>(R()<.8?[29,28]:[28,29])[0]);G.end={w:a==c?(R()<.5?p:o):w,how:"Ref decision: "+(Math.abs(a-c)<8?"split":"unanimous")+" "+(w==p?"29-28, 29-28, "+(R()<.4?"28-29":"29-28"):"28-29, 28-29, "+(R()<.4?"29-28":"28-29"))}}}}
function ai(dt){const o=G.o,p=G.p;if(o.st!="idle"||G.end)return;o.cdv-=dt;if(o.cdv>0)return;o.cdv=.45+R()*.5;const d=Math.abs(o.x-p.x);
 if(R()<.18){o.blk=R()<.5?1:2;setTimeout(()=>{o.blk=0},500+R()*500);return}
 if(d>125){o.x+=o.d*70;return}if(o.en<18){o.x-=o.d*60;return}
 const r=R();if(r<.1&&p.en<70)attack(o,p,"T");else if(r<.4)attack(o,p,"P");else if(r<.55)attack(o,p,"K");else if(r<.65)attack(o,p,"O");else if(r<.73)attack(o,p,"H");else if(r<.78)attack(o,p,"E");else o.x-=o.d*45}
function tdb(dt){const s=G.sb,F=s.top,T=F==G.p?G.o:G.p;s.v+=(F==G.o?24:0)*dt*(.5+F.en/200)-(F==G.p?(16*(.4+T.en/100)):0)*dt;if(F==G.o)s.v-=0;
 if(s.v>=100){G.mode="ground";G.top=F;F.tds++;T.st="down";T.up=0;G.esc=0;G.sb=null;F.x=T.x-F.d*40;say("TAKEDOWN!");snd(.4)}else if(s.v<=0){G.mode="stand";G.sb=null;say("Stuffed!")}}
function groundp(dt){const p=G.p,o=G.o,top=G.top,bot=top==p?o:p;
 if(!G.sb){if(top==o){if((G.ai=(G.ai||0)+dt)>1.3){G.ai=0;G.sb={type:"AHN"[R()*3|0],v:15,top:o}}}else{G.esc=Math.max(0,G.esc-8*dt)}if(top==p&&bot.up>6)G.mode="stand";
  if(bot==p){G.esc=Math.max(0,G.esc-9*dt);if(G.esc>=100){G.mode="stand";bot.st="idle";bot.en=Math.max(bot.en,25);say("ESCAPE!")}}
  if(top==p&&(G.ge=(G.ge||0)+dt)>5+bot.en/12){G.ge=0;G.mode="stand";bot.st="idle";say(bot.n+" escapes!")}
  if(top==o&&bot==p&&G.esc>=100){}}
 else{const s=G.sb;if(s.top==o){s.v+=(22-0)*dt*(.5+o.en/200);if(top==o&&bot==p)s.v-=0}else s.v-=15*dt*(.4+bot.en/100);if(s.top==o&&G.esc>0){s.v-=G.esc;G.esc=0}
  if(s.v>=100){const nm={A:"ARMBAR",H:"HEEL HOOK",N:"RNC"}[s.type];say("TAP TAP! "+nm);snd(.6);G.end={w:s.top,how:"Submission ("+nm+")"};bot.st="down"}
  else if(s.v<=0){G.sb=null;say("Sub escaped!")}}}
function ui(){const bt=$("lfB");if(!bt)return;const p=G.p,m=G.mode;let h;
 if(G.end)h=`<button onclick="document.getElementById('lfBtn').click()">🔁 Yenidən</button>`;
 else if(p.st=="down"&&m=="stand")h=`<button data-a="U">⬆ GET UP (tap!)</button>`;
 else if(m=="tdbar")h=G.sb.top==p?`<button data-a="T" style="font-size:20px">TAKEDOWN! TAP!</button>`:`<button data-a="U" style="font-size:20px">SPRAWL! TAP!</button>`;
 else if(m=="ground")h=G.top==p?(G.sb?`<button data-a="${G.sb.type}" style="font-size:20px">SQUEEZE! TAP!</button>`:`<button data-a="A">💪 Armbar</button><button data-a="H">🦶 Heel hook</button><button data-a="N">🐍 RNC</button>`):`<button data-a="U" style="font-size:20px">ESCAPE! TAP!</button>`;
 else h=`<button data-a="L">◀</button><button data-a="Rr">▶</button><button data-a="P">👊 Punch<br><small>hold=overhand</small></button><button data-a="K">🦵 Kick<br><small>hold=head kick</small></button><button data-a="E">👁 Eye poke</button><button data-a="B">🛡 Block</button><button data-a="X">🛡 Low block</button><button data-a="T">🤼 Takedown</button>`;
 if(bt.dataset.h!=h){bt.dataset.h=h;bt.innerHTML=h;const r=bt.querySelector("button[onclick]");if(r)r.onclick=()=>start(p.n)}}
function bar(c,x,y,w,v,col,t){c.fillStyle="#222";c.fillRect(x,y,w,8);c.fillStyle=col;c.fillRect(x,y,w*Math.max(0,v)/100,8);if(t){c.fillStyle="#bbb";c.font="9px sans-serif";c.fillText(t,x+w+4,y+8)}}
function fig(c,F,O){c.save();c.translate(F.x,360);const d=F.d,dn=F.st=="down"||F.st=="ko";let a=0;if(F.st=="ko")a=Math.min(1.45,F.t*1.2);else if(dn)a=1.25;c.rotate(-d*a);
 const sk="#d9a066",sh=F.st=="hit"?-d*8:0;c.translate(sh,0);c.strokeStyle=F==G.p?"#d22":"#27c";c.lineWidth=11;c.lineCap="round";
 c.beginPath();c.moveTo(0,-50);c.lineTo(-d*10,0);c.moveTo(0,-50);c.lineTo(d*12,0);if(F.st=="atk"&&F.k=="K"||F.k=="H"&&F.st=="atk"){c.moveTo(0,-50);c.lineTo(d*(F.k=="H"?60:80),F.k=="H"?-120:-35)}c.stroke();
 c.lineWidth=16;c.beginPath();c.moveTo(0,-60);c.lineTo(0,-120);c.stroke();c.lineWidth=8;c.strokeStyle=sk;c.beginPath();
 if(F.blk==1){c.moveTo(0,-110);c.lineTo(d*22,-150);c.moveTo(0,-110);c.lineTo(d*30,-135)}else if(F.blk==2){c.moveTo(0,-110);c.lineTo(d*20,-75);c.moveTo(0,-110);c.lineTo(d*28,-55)}
 else if(F.st=="atk"&&(F.k=="P"||F.k=="O"||F.k=="E")){c.moveTo(0,-108);c.lineTo(d*(F.k=="O"?95:F.k=="E"?80:90),-140+(F.k=="O"?20:0))}else{c.moveTo(0,-108);c.lineTo(d*28,-135)}c.stroke();
 F.bru.filter(u=>u.y==1).forEach(u=>{c.fillStyle=u.c;c.globalAlpha=.7;c.beginPath();c.arc(u.dx,-90+u.dy,6,0,7);c.fill()});c.globalAlpha=1;
 c.fillStyle=sk;c.beginPath();c.arc(0,-146,26,0,7);c.fill();F.bru.filter(u=>u.y==0).forEach(u=>{c.fillStyle=u.c;c.globalAlpha=.7;c.beginPath();c.arc(u.dx,-146+u.dy,7,0,7);c.fill()});c.globalAlpha=1;
 if(F.hp.h<60){c.fillStyle="#a00";c.fillRect(d*6,-160,3,18+(60-F.hp.h)/3)}c.font="30px serif";c.textAlign="center";c.fillStyle="#000";c.fillText(F.f,0,-136);if(F.blur>0){c.fillStyle="#fff8";c.fillRect(-26,-170,52,50)}
 if(F.st=="ko"){c.font="22px serif";c.fillText("💫",0,-185)}c.restore()}
function draw(){const c=$("lfC").getContext("2d"),{p,o}=G;c.save();c.clearRect(0,0,800,450);if(G.sh>.5)c.translate(R()*G.sh-G.sh/2,R()*G.sh-G.sh/2);
 const g=c.createLinearGradient(0,0,0,450);g.addColorStop(0,"#1a1f33");g.addColorStop(1,"#0a0c14");c.fillStyle=g;c.fillRect(0,0,800,450);
 for(let i=0;i<70;i++){c.fillStyle=`hsl(${i*37%360},35%,${25+i%4*6}%)`;c.beginPath();c.arc(i*12+4,150+(i%3)*14,7,0,7);c.fill()}
 c.fillStyle="#2a2f45";c.fillRect(0,360,800,90);c.fillStyle="#8b1a1a";c.fillRect(30,358,740,6);
 const lo=G.mode=="ground"||G.mode=="tdbar";if(G.mode=="ground"){const T=G.top;}
 fig(c,p);fig(c,o);G.fx.forEach(f=>{c.fillStyle=f.c;c.globalAlpha=f.l;c.beginPath();c.arc(f.x,f.y,3,0,7);c.fill()});c.globalAlpha=1;
 c.textAlign="center";G.say.forEach(s=>{c.globalAlpha=Math.max(0,s.l);c.fillStyle="#ffd54a";c.font="900 22px sans-serif";c.fillText(s.t,s.x,s.y+90)});c.globalAlpha=1;c.textAlign="left";
 [[p,10],[o,430]].forEach(([F,x])=>{c.fillStyle="#fff";c.font="bold 13px sans-serif";c.fillText(F.n+(F.inj?" 🩹":""),x,16);bar(c,x,22,170,F.hp.h,"#e33","HEAD");bar(c,x,34,170,F.hp.b,"#e90","BODY");bar(c,x,46,170,F.hp.l,"#7c3","LEGS");bar(c,x,58,170,F.en,"#39f","ENERGY")});
 c.fillStyle="#fff";c.font="bold 20px sans-serif";c.textAlign="center";c.fillText(Math.max(0,G.time|0)+"s",400,26);
 if(G.sb){c.fillStyle="#222";c.fillRect(250,90,300,14);c.fillStyle="#fc0";c.fillRect(250,90,3*Math.max(0,Math.min(100,G.sb.v)),14);c.fillStyle="#fff";c.font="12px sans-serif";c.fillText({td:"TAKEDOWN",A:"ARMBAR",H:"HEEL HOOK",N:"RNC"}[G.sb.type],400,118)}
 if(G.mode=="ground"&&!G.sb&&G.top==G.o){c.fillStyle="#222";c.fillRect(250,90,300,10);c.fillStyle="#6cf";c.fillRect(250,90,3*Math.min(100,G.esc),10)}
 if(G.end&&(G.end.how!="KO"||G.eT>1.2)){c.fillStyle="#000b";c.fillRect(0,150,800,150);c.fillStyle="#ffd54a";c.font="900 38px sans-serif";c.fillText(G.end.how=="KO"?"KNOCKOUT!":"FIGHT OVER",400,205);c.fillStyle="#fff";c.font="20px sans-serif";c.fillText(G.end.w.n+" WINS · "+(G.end.how=="KO"?"KO":G.end.how),400,245)}c.restore()}
})();
