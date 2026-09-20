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

/* ─── mobile menu ──────────────────────────────────────────────────────
   The header links are hidden below 820px, so the page needs a way to
   reach them. Progressive: without JS the button simply does nothing
   and the links stay in the header at wider widths. */
(function(){
  var btn = document.querySelector(".navbtn");
  var nav = document.getElementById("sitenav");
  if(!btn || !nav) return;

  function set(open){
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    nav.classList.toggle("open", open);
  }
  function close(){ set(false); }

  btn.addEventListener("click", function(){
    set(btn.getAttribute("aria-expanded") !== "true");
  });

  /* jumping to a section should dismiss the panel */
  nav.addEventListener("click", function(e){
    if(e.target.closest("a")) close();
  });

  document.addEventListener("keydown", function(e){
    if(e.key === "Escape" && nav.classList.contains("open")){ close(); btn.focus(); }
  });

  document.addEventListener("click", function(e){
    if(!nav.classList.contains("open")) return;
    if(!nav.contains(e.target) && !btn.contains(e.target)) close();
  });

  /* if the viewport grows past the breakpoint the panel is irrelevant */
  addEventListener("resize", function(){ if(innerWidth > 820) close(); }, {passive:true});
})();
