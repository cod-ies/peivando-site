/* Peivando — static runtime (multipage) */
var PV = window.PV || {};
var FORM_URL = "";                       /* paste Formspree endpoint here to activate the form */

(function(){
  var wa = "https://wa.me/" + PV.wa + "?text=" + encodeURIComponent(PV.waText || "");
  ["cta-wa","ch-wa"].forEach(function(id){ var e=document.getElementById(id); if(e) e.href=wa; });

  var m = document.getElementById("ch-mail");
  if(m) m.href = "mailto:" + PV.email + "?subject=" + encodeURIComponent("Website-Anfrage / Website enquiry");

  var num = document.getElementById("wa-num");
  if(num) num.textContent = "+" + String(PV.wa).replace(/^(\d{1,3})(\d{2})(\d{3})(\d+)$/,"$1 $2 $3 $4");

  var yr = document.getElementById("yr");
  if(yr) yr.textContent = new Date().getFullYear();

  var head = document.getElementById("head");
  if(head) addEventListener("scroll", function(){ head.classList.toggle("stuck", scrollY > 24); }, {passive:true});

  var form = document.getElementById("contact-form"), out = document.getElementById("form-msg");
  if(form && out){
    var M = PV.msg || {};
    function say(k,t){ out.className = "msg show " + k; out.textContent = t; }
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var fd = new FormData(form);
      if(!String(fd.get("name")||"").trim() || !String(fd.get("contact")||"").trim() || !String(fd.get("message")||"").trim()){ say("warn", M.miss); return; }
      if(!FORM_URL){ say("warn", M.off); return; }
      fd.append("_language", document.documentElement.lang);
      fetch(FORM_URL, {method:"POST", body:fd, headers:{Accept:"application/json"}})
        .then(function(r){ if(r.ok){ form.reset(); say("ok", M.sent); } else say("warn", M.err); })
        .catch(function(){ say("warn", M.err); });
    });
  }
})();

/* ─── hero network ─────────────────────────────────────── */
(function(){
  var cv=document.getElementById("net"), ctx=cv.getContext("2d");
  var host=cv.parentElement, dpr=Math.min(devicePixelRatio||1,2);
  var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  var W=0,H=0,pts=[],mouse={x:-9e9,y:-9e9};
  var LINK=170, TEAL="58,207,182";

  function seedRand(s){ return function(){ s=(s*1664525+1013904223)>>>0; return s/4294967296; }; }

  function build(){
    var r=host.getBoundingClientRect();
    W=r.width; H=r.height;
    cv.width=W*dpr; cv.height=H*dpr;
    ctx.setTransform(dpr,0,0,dpr,0,0);
    var density=Math.round((W*H)/26000);
    var n=Math.max(26,Math.min(92,density));
    var rnd=seedRand(20260916);
    pts=[];
    for(var i=0;i<n;i++){
      pts.push({
        x:rnd()*W, y:rnd()*H,
        vx:(rnd()-.5)*.14, vy:(rnd()-.5)*.14,
        r:rnd()<.16?2.4:1.4,
        hot:rnd()<.16
      });
    }
  }

  function frame(){
    ctx.clearRect(0,0,W,H);
    for(var i=0;i<pts.length;i++){
      var p=pts[i];
      if(!reduce){
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<-20)p.x=W+20; if(p.x>W+20)p.x=-20;
        if(p.y<-20)p.y=H+20; if(p.y>H+20)p.y=-20;
      }
      var dxm=p.x-mouse.x, dym=p.y-mouse.y, dm=Math.hypot(dxm,dym);
      p.lit = dm<210 ? 1-(dm/210) : 0;
    }
    for(var a=0;a<pts.length;a++){
      for(var b=a+1;b<pts.length;b++){
        var dx=pts[a].x-pts[b].x, dy=pts[a].y-pts[b].y, d=Math.hypot(dx,dy);
        if(d<LINK){
          var base=(1-d/LINK)*0.16;
          var boost=Math.max(pts[a].lit,pts[b].lit)*0.34;
          ctx.strokeStyle="rgba("+TEAL+","+(base+boost).toFixed(3)+")";
          ctx.lineWidth=1;
          ctx.beginPath(); ctx.moveTo(pts[a].x,pts[a].y); ctx.lineTo(pts[b].x,pts[b].y); ctx.stroke();
        }
      }
    }
    for(var k=0;k<pts.length;k++){
      var q=pts[k];
      var al=(q.hot?0.75:0.4)+q.lit*0.45;
      ctx.fillStyle="rgba("+TEAL+","+Math.min(al,1).toFixed(3)+")";
      ctx.beginPath(); ctx.arc(q.x,q.y,q.r+q.lit*1.6,0,6.2832); ctx.fill();
    }
    if(!reduce) raf=requestAnimationFrame(frame);
  }

  var raf;
  function start(){ build(); cancelAnimationFrame(raf); frame(); }
  start();

  addEventListener("resize",function(){ clearTimeout(window.__nt); window.__nt=setTimeout(start,180); });
  host.addEventListener("pointermove",function(e){
    var r=host.getBoundingClientRect();
    mouse.x=e.clientX-r.left; mouse.y=e.clientY-r.top;
    if(reduce) frame();
  });
  host.addEventListener("pointerleave",function(){ mouse.x=-9e9; mouse.y=-9e9; if(reduce) frame(); });
})();

