/* ===== v9: in-page confirm dialogs (browser confirm() can be blocked on phones) ===== */
(function(){
const {T,esc,LNG,OV,D}=window.__v7,off=window.__off;
const YN={az:["Bəli","Xeyr"],en:["Yes","No"],tr:["Evet","Hayır"]};
const _real=window.confirm;
window.confirm=()=>true;
function ask(msg){return new Promise(res=>{const L=LNG(),m=off(String(msg),L)||msg,o=document.createElement("div");o.setAttribute("translate","no");o.style.cssText=OV.replace("cursor:pointer","cursor:default")+";z-index:300";
 const bs="border:0;border-radius:12px;padding:12px 26px;font:800 16px system-ui;cursor:pointer;margin:0 6px";
 o.innerHTML=`<div style="max-width:440px;font-size:clamp(15px,4vw,19px);font-weight:700">${esc(m)}</div><div style="margin-top:20px"><button id="cy" style="${bs};background:#e63946;color:#fff">${YN[L][0]}</button><button id="cn" style="${bs};background:#2a3346;color:#fff">${YN[L][1]}</button></div>`;
 document.body.appendChild(o);o.querySelector("#cy").onclick=()=>{o.remove();res(true)};o.querySelector("#cn").onclick=()=>{o.remove();res(false)}})}
function guard(id,msg){const b=document.getElementById(id),prev=b.onclick;b.onclick=async function(){const a=arguments;if(!(await ask(typeof msg==="function"?msg():msg)))return;return prev.apply(this,a)}}
guard("resetCareer","Bütün karyera məlumatların silinəcək: rekordlar, pul, reytinq, məşqlər. Davam edilsin?");
guard("finishCareer","Karyeranı yekunlaşdırmaq istəyirsən? Rekordun saxlanacaq, döyüşlər bağlanacaq.");
/* injury warning */
const ab=document.getElementById("acceptFight"),pa=ab.onclick;
ab.onclick=async function(){const a=arguments;if(s.injury&&s.injury.w>0&&!s.accepted&&!s.dead&&!s.careerEnded&&s.week>=(s.nextFightWeek||1)){if(!(await ask(T("injWarn",{p:T("parts")[s.injury.i]}))))return}return pa.apply(this,a)};
})();

