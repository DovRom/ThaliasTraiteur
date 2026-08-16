/* ================================================================
   Order type — global choice that drives the whole ordering UX.
     "livraison"  -> portions + prices shown
     "evenement"  -> number of people, prices hidden (devis)
   Chosen at the first add (popup chooser) or via the nav buttons.
   Persisted in localStorage["tt-ordertype"].
   Must load BEFORE cart.js and the popup scripts.
   ================================================================ */
(function () {
  var KEY = "tt-ordertype";

  var TTOrder = {
    type: function () { try { return localStorage.getItem(KEY) || null; } catch (e) { return null; } },
    set: function (t) {
      try { localStorage.setItem(KEY, t); } catch (e) {}
      try { document.dispatchEvent(new CustomEvent("tt-order-change")); } catch (e) {}
    },
    clear: function () {
      try { localStorage.removeItem(KEY); } catch (e) {}
      try { document.dispatchEvent(new CustomEvent("tt-order-change")); } catch (e) {}
    },
    needsChoice: function () { return !this.type(); },
    isEvent: function () { return this.type() === "evenement"; },
    unitWord: function (n) { return this.isEvent() ? (n > 1 ? "personnes" : "personne") : (n > 1 ? "portions" : "portion"); },

    /* Reflect the current type on the dish popup */
    applyPopup: function (t) {
      t = t || this.type() || "livraison";
      var ev = (t === "evenement");
      var price = document.getElementById("mpPrice");
      var meta = document.getElementById("mpMeta");
      var stars = document.getElementById("mpStars");
      var qlab = document.getElementById("mpQtyLabel");
      var add = document.getElementById("mpAddCart");
      if (price) price.style.display = ev ? "none" : "";
      if (meta) meta.style.display = ev ? "none" : "";
      if (stars) stars.style.display = ev ? "none" : "";
      if (qlab) qlab.textContent = ev ? "personnes" : "portion(s)";
      if (add) add.innerHTML = ev
        ? '<i class="fas fa-plus"></i> Ajouter à ma sélection'
        : '<i class="fas fa-shopping-cart"></i> Ajouter à ma commande';
    },

    /* Decide chooser vs product view when a dish popup opens */
    ensureView: function (onReady) {
      var pop = document.getElementById("menuPop");
      var chooser = pop && pop.querySelector(".mpchooser");
      var view = pop && pop.querySelector(".mpview");
      var self = this;
      function reveal() {
        if (chooser) chooser.style.display = "none";
        if (view) view.style.display = "";
        self.applyPopup();
        if (onReady) onReady();
      }
      if (this.needsChoice() && chooser && view) {
        view.style.display = "none";
        chooser.style.display = "";
        chooser.querySelectorAll("[data-choose]").forEach(function (b) {
          b.onclick = function () { self.set(b.getAttribute("data-choose")); reveal(); };
        });
      } else {
        reveal();
      }
    }
  };
  window.TTOrder = TTOrder;

  /* Nav "Livraison" / "Événement" buttons: set the type before navigating */
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-set-order]");
    if (b) TTOrder.set(b.getAttribute("data-set-order"));
  });
})();
