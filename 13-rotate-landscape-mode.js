
/* ===== Ekran çevirmə (üfüqi rejim) ===== */
(function(){
 const H=document.documentElement,B=document.body,btn=document.getElementById("rotateBtn");
 let want=false;try{want=localStorage.getItem("ufcRot")==="1"}catch(e){}
 const _g=Element.prototype.getBoundingClientRect;
 Element.prototype.getBoundingClientRect=function(){const r=_g.call(this);if(!H.classList.contains("rotated"))return r;const W=innerWidth;return new DOMRect(r.top,W-r.right,r.height,r.width)};
 function layout(){
  const w=innerWidth,h=innerHeight,rot=want&&h>w;
  H.classList.toggle("rotated",rot);H.classList.toggle("land",rot||w>h);
  btn.classList.toggle("on",want);btn.setAttribute("aria-pressed",want);
  if(rot){B.style.width=h+"px";B.style.height=w+"px";B.style.transform="translateX("+w+"px) rotate(90deg)";H.style.setProperty("--vw",h/100+"px");H.style.setProperty("--vh",w/100+"px")}
  else{B.style.width=B.style.height=B.style.transform="";H.style.removeProperty("--vw");H.style.removeProperty("--vh")}
 }
 async function native(on){try{if(on){await H.requestFullscreen();await screen.orientation.lock("landscape")}else{try{screen.orientation.unlock()}catch(e){}if(document.fullscreenElement)await document.exitFullscreen()}}catch(e){}}
 btn.addEventListener("click",()=>{want=!want;try{localStorage.setItem("ufcRot",want?"1":"0")}catch(e){}layout();native(want).then(layout)});
 addEventListener("resize",layout);addEventListener("orientationchange",()=>setTimeout(layout,150));
 layout();
})();
