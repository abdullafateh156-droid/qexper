/* ===== ADD-ON v2: yeni karyerada xarakter yaratma + musiqi pleyeri ===== */
(function(){
const $=id=>document.getElementById(id);
/* 1) Yeni karyera → həmişə xarakter yaratma pəncərəsi */
function creator(){
 if($("chM"))return;
 const cs=[...$("countryInput").options].map(o=>`<option>${o.text}</option>`).join(""),ws=[...$("weightInput").options].map(o=>`<option>${o.text}</option>`).join("");
 const m=document.createElement("div");m.id="chM";
 m.innerHTML=`<div class="bx"><h3>🥊 Yeni döyüşçü yarat</h3><label>Ad</label><input id="cN" maxlength="24" value="${$("nameInput").value}"><label>Ləqəb</label><input id="cK" maxlength="20" value="${$("nickInput").value}"><label>Ölkə</label><select id="cC">${cs}</select><label>Çəki dərəcəsi</label><select id="cW">${ws}</select><button id="cOk">KARYERAYA BAŞLA</button></div>`;
 document.body.appendChild(m);$("cC").value=$("countryInput").value;$("cW").value=$("weightInput").value;
 $("cOk").onclick=()=>{$("nameInput").value=$("cN").value;$("nickInput").value=$("cK").value;$("countryInput").value=$("cC").value;$("weightInput").value=$("cW").value;
  try{$("saveProfile").onclick()}catch(e){console.error(e)}m.remove()};
}
["resetCareer","chooseAmateur"].forEach(id=>{const b=$(id);if(!b)return;const old=b.onclick;
 b.onclick=function(){const before=s,r=old&&old.apply(this,arguments);if(s!==before)setTimeout(creator,80);return r}});
})();
