
(function(){
 const T=document.getElementById("titleScreen"),note=document.getElementById("tsNote");
 function toast(t){note.textContent=t;note.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>note.classList.remove("on"),2200)}
 function hasSave(){try{return !!localStorage.getItem("ufcLegendsSaveV6")}catch(e){return false}}
 function enter(){T.classList.add("hidden")}
 document.getElementById("tsNew").onclick=()=>{
  enter();
  const sc=document.getElementById("startChoice");if(sc)sc.style.display="grid";
 };
 document.getElementById("tsOld").onclick=()=>{
  if(!hasSave()){toast("Kayıtlı kariyer yok — yeni kariyer oluştur");return}
  const sc=document.getElementById("startChoice");if(sc)sc.style.display="none";
  enter();
 };
 document.getElementById("tsSet").onclick=()=>document.getElementById("settingsOpen").click();
 const mt=document.getElementById("musicToggle"),mtxt=document.getElementById("tsMusT");
 document.getElementById("tsMus").onclick=()=>{mt.click();setTimeout(()=>{mtxt.textContent=/ON/.test(mt.textContent)?"Müzik: Açık":"Müzik"},60)};
 const ab=document.getElementById("aboutBox");
 document.getElementById("tsAbout").onclick=()=>ab.classList.remove("hidden");
 document.getElementById("aboutClose").onclick=()=>ab.classList.add("hidden");
 // Ana ekrana dönmek üçün ayarlar paneli: "Karyeranı sıfırla" sonrası başlanğıc seçimi artıq mövcuddur
})();
