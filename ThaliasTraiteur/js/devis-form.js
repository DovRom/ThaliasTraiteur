/* ================================================================
   Devis form — Select2 "Plats souhaités" bound to the cart,
   and order-email composition on submit.
   (index.html only — the form lives here.)
   ================================================================ */
(function () {
  function val(id) { var e = document.getElementById(id); return e ? (e.value || "").trim() : ""; }

  function selectedDishes() {
    var sel = document.getElementById("devisPlats");
    if (!sel) return [];
    return Array.prototype.filter.call(sel.options, function (o) { return o.selected; })
      .map(function (o) { return o.value; });
  }

  function qtyFor(name) {
    if (!window.TTCart) return 1;
    var it = window.TTCart.items().filter(function (i) { return i.name === name; })[0];
    return it ? it.qty : 1;
  }

  function buildBody() {
    var dishes = selectedDishes();
    var lines = [];
    lines.push("Bonjour Thalia's Traiteur,");
    lines.push("");
    lines.push("Je souhaite un devis pour l'événement suivant :");
    lines.push("");
    lines.push("• Nom : " + (val("devNom") || "—"));
    lines.push("• Téléphone : " + (val("devTel") || "—"));
    lines.push("• Courriel : " + (val("devMail") || "—"));
    lines.push("• Nombre de convives : " + (val("devConvives") || "—"));
    lines.push("• Type d'événement : " + (val("devType") || "—"));
    lines.push("• Date : " + (val("devDate") || "—"));
    lines.push("");
    lines.push("Plats souhaités :");
    if (dishes.length) {
      dishes.forEach(function (d) { lines.push("   - " + d + " × " + qtyFor(d)); });
    } else {
      lines.push("   (aucun plat sélectionné)");
    }
    var msg = val("devMsg");
    if (msg) { lines.push(""); lines.push("Précisions : " + msg); }
    lines.push("");
    lines.push("Merci !");
    return lines.join("\n");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var $ = window.jQuery;
    var sel = document.getElementById("devisPlats");

    if ($ && sel && $.fn && $.fn.select2) {
      $(sel).select2({
        placeholder: "Sélectionnez vos plats…",
        width: "100%",
        closeOnSelect: false,
        allowClear: true,
        language: {
          noResults: function () { return "Aucun plat trouvé"; },
          searching: function () { return "Recherche…"; }
        }
      });
      // Pre-fill from the cart
      if (window.TTCartSync) window.TTCartSync();
    }

    // Compose the order email on submit (in addition to the on-page confirmation)
    var btn = document.getElementById("resBtn");
    if (btn) {
      btn.addEventListener("click", function () {
        var subject = "Demande de devis – " + (val("devNom") || "Nouveau client");
        var href = "mailto:contact@thaliastraiteur.ca?subject=" +
          encodeURIComponent(subject) + "&body=" + encodeURIComponent(buildBody());
        // open the mail client without navigating away from the page
        setTimeout(function () { window.location.href = href; }, 400);
        // success feedback (needed on commander.html where main.js is absent)
        var ok = document.getElementById("resOk");
        if (ok && ok.style.display !== "block") {
          ok.style.display = "block";
          ok.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      });
    }
  });
})();
