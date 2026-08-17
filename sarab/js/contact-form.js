/* Contact page — real submit (Formspree if configured, else mailto) + confirmation. */
(function () {
  function cfg(k, d) { return (window.TT_CONFIG && window.TT_CONFIG[k]) || d; }
  function v(id) { var e = document.getElementById(id); return e ? (e.value || "").trim() : ""; }

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("contactBtn");
    if (!btn) return;

    function payload() {
      return {
        "_subject": "Contact – " + (v("cNom") || "Site"),
        "Nom": v("cNom"), "Courriel": v("cMail"), "Téléphone": v("cTel"),
        "Sujet": v("cSujet"), "email": v("cMail"), "message": v("cMsg")
      };
    }
    function done() {
      if (window.ttTrack) window.ttTrack("contact_submit", {});
      var card = document.querySelector("#contact-section .fcard") || btn.closest(".fcard");
      if (card) {
        card.innerHTML = '<div class="order-done"><i class="fas fa-circle-check"></i>' +
          '<h3>Merci ' + (v("cNom") ? v("cNom").split(" ")[0] : "") + ' !</h3>' +
          "<p>Votre message a bien été envoyé. Nous vous répondons sous <strong>" +
          cfg("REPLY_TIME", "24 h") + "</strong>.</p></div>";
        card.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
    function mailtoFallback() {
      var p = payload();
      var body = ["Nom : " + p["Nom"], "Courriel : " + p["Courriel"], "Téléphone : " + p["Téléphone"],
        "Sujet : " + p["Sujet"], "", p["message"], "", "Merci !"].join("\n");
      window.location.href = "mailto:" + cfg("CONTACT_EMAIL", "contact@thaliastraiteur.ca") +
        "?subject=" + encodeURIComponent(p["_subject"]) + "&body=" + encodeURIComponent(body);
      done();
    }

    btn.addEventListener("click", function () {
      if (!v("cNom") || !v("cMail") || !v("cMsg")) {
        alert("Merci de renseigner votre nom, courriel et message.");
        return;
      }
      var endpoint = cfg("FORM_ENDPOINT", "");
      if (!endpoint) { mailtoFallback(); return; }
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi…'; btn.disabled = true;
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload())
      }).then(function (r) { r.ok ? done() : mailtoFallback(); })
        .catch(function () { mailtoFallback(); });
    });
  });
})();
