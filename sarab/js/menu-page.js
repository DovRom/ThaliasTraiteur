/* ================================================================
   Menu page — category filter + dish detail popup.
   Standalone (does not depend on main.js, which binds homepage-only
   elements). Mirrors the popup/filter behaviour of the home page.
   ================================================================ */
(function () {
  // Navbar shadow on scroll
  var nav = document.getElementById("nav");
  window.addEventListener("scroll", function () {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 30);
  });

  // ---- Category filter ----
  function filterMenu(cat) {
    document.querySelectorAll(".filtbtn").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-f") === cat);
    });
    document.querySelectorAll(".mwrap").forEach(function (w) {
      var show = cat === "all" || w.getAttribute("data-c") === cat;
      w.style.display = show ? "" : "none";
    });
  }
  document.querySelectorAll(".filtbtn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterMenu(this.getAttribute("data-f"));
    });
  });

  // ---- Dish detail popup ----
  var menuPop = document.getElementById("menuPop");
  var qty = 1;

  function g(card, k) {
    return card.getAttribute(k);
  }

  function openPop(card) {
    window.__ttDish = { name: g(card, "data-title"), price: g(card, "data-price") };
    document.getElementById("mpImg").src = g(card, "data-img");
    document.getElementById("mpCat").textContent = g(card, "data-cat");
    document.getElementById("mpTitle").textContent = g(card, "data-title");

    var rating = parseFloat(g(card, "data-rating"));
    var full = Math.round(rating);
    document.getElementById("mpStars").innerHTML =
      '<i class="fas fa-star"></i>'.repeat(full) +
      "☆".repeat(5 - full) +
      ' <span style="color:#bbb;font-size:.78rem;">' +
      rating +
      " (" +
      g(card, "data-reviews") +
      " avis)</span>";

    document.getElementById("mpDesc").textContent = g(card, "data-desc");
    document.getElementById("mpPrice").innerHTML = g(card, "data-price");

    document.getElementById("mpMeta").innerHTML =
      '<div class="mpm"><div class="mpmv">' +
      g(card, "data-cal") +
      '</div><div class="mpml">Portion</div></div>' +
      '<div class="mpm"><div class="mpmv">' +
      g(card, "data-time") +
      '</div><div class="mpml">Délai</div></div>' +
      '<div class="mpm"><div class="mpmv">' +
      rating +
      '/5</div><div class="mpml">Note</div></div>';

    document.getElementById("mpTags").innerHTML = (g(card, "data-tags") || "")
      .split(",")
      .filter(Boolean)
      .map(function (t) {
        return '<span class="mptag">' + t.trim() + "</span>";
      })
      .join("");

    qty = 1;
    document.getElementById("mpQnum").textContent = 1;
    document.getElementById("mpAddCart").innerHTML =
      '<i class="fas fa-shopping-cart"></i> Ajouter à ma commande';
    document.getElementById("mpAddCart").style.background = "";

    menuPop.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closePop() {
    menuPop.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".mcard").forEach(function (card) {
    card.addEventListener("click", function (e) {
      if (e.target.closest(".mhrt")) return; // heart handled separately
      openPop(card);
    });
  });

  document.getElementById("mpClose").addEventListener("click", closePop);
  menuPop.addEventListener("click", function (e) {
    if (e.target === menuPop) closePop();
  });
  document.getElementById("mpMinus").addEventListener("click", function () {
    if (qty > 1) {
      qty--;
      document.getElementById("mpQnum").textContent = qty;
    }
  });
  document.getElementById("mpPlus").addEventListener("click", function () {
    qty++;
    document.getElementById("mpQnum").textContent = qty;
  });
  document.getElementById("mpAddCart").addEventListener("click", function () {
    if (window.TTCart && window.__ttDish) window.TTCart.add(window.__ttDish.name, window.__ttDish.price, qty);
    this.innerHTML = '<i class="fas fa-check"></i> Ajouté !';
    this.style.background = "linear-gradient(135deg,var(--green),var(--green-dark))";
    var self = this;
    setTimeout(function () {
      closePop();
      self.innerHTML = '<i class="fas fa-shopping-cart"></i> Ajouter à ma commande';
      self.style.background = "";
    }, 1000);
  });

  // ---- Heart toggle ----
  document.querySelectorAll(".mhrt").forEach(function (h) {
    h.addEventListener("click", function (e) {
      e.stopPropagation();
      var ic = this.querySelector("i");
      if (ic) {
        ic.classList.toggle("far");
        ic.classList.toggle("fas");
      }
    });
  });
})();
