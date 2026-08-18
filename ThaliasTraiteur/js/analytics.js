/* ================================================================
   Analytics — Google Analytics 4 (loads only if TT_CONFIG.GA_ID set)
   Exposes window.ttTrack(eventName, params) used across the site.
   ================================================================ */
(function () {
  var id = (window.TT_CONFIG && window.TT_CONFIG.GA_ID) || "";
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  if (id) {
    var sc = document.createElement("script");
    sc.async = true;
    sc.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
    document.head.appendChild(sc);
    gtag("js", new Date());
    gtag("config", id);
  }

  window.ttTrack = function (name, params) {
    try { if (id) gtag("event", name, params || {}); } catch (e) {}
  };
})();
