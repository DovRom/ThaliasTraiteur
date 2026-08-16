/* Contact page — compose message email (mailto). */
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("contactBtn");
    if (!btn) return;
    function v(id){ var e=document.getElementById(id); return e?(e.value||"").trim():""; }
    btn.addEventListener("click", function () {
      var body = ["Bonjour Thalia's Traiteur,","",
        "Nom : " + (v("cNom") || "—"),
        "Courriel : " + (v("cMail") || "—"),
        "Téléphone : " + (v("cTel") || "—"),
        "Sujet : " + (v("cSujet") || "—"), "",
        v("cMsg") || "", "", "Merci !"].join("\n");
      var href = "mailto:contact@thaliastraiteur.ca?subject=" +
        encodeURIComponent("Contact – " + (v("cNom") || "Site")) + "&body=" + encodeURIComponent(body);
      setTimeout(function(){ window.location.href = href; }, 300);
      var ok = document.getElementById("ctcOk");
      if (ok) { ok.style.display = "block"; ok.scrollIntoView({ behavior:"smooth", block:"nearest" }); }
    });
  });
})();
