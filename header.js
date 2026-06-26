(function () {
  "use strict";

  var siteTitle = "Philip B. Zhang's Homepage";
  var navItems = [
    ["index.html", "Home"],
    ["research.html", "Research"],
    ["teaching.html", "Teaching"],
    ["chinese.html", "Chinese Version"]
  ];

  function ensureMeta() {
    if (!document.querySelector("meta[charset]")) {
      var charset = document.createElement("meta");
      charset.setAttribute("charset", "utf-8");
      document.head.prepend(charset);
    }

    if (!document.querySelector('meta[name="viewport"]')) {
      var viewport = document.createElement("meta");
      viewport.name = "viewport";
      viewport.content = "width=device-width, initial-scale=1";
      document.head.appendChild(viewport);
    }

    if (!document.title) {
      document.title = siteTitle;
    }
  }

  function ensureStylesheet() {
    if (!document.querySelector('link[href$="stylesheet.css"]')) {
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = siteRoot() + "stylesheet.css";
      document.head.appendChild(link);
    }
  }

  function ensureAnalytics() {
    if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
      return;
    }

    var gtagScript = document.createElement("script");
    gtagScript.async = true;
    gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-P1V0D8EL8Y";
    document.head.appendChild(gtagScript);

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", "G-P1V0D8EL8Y");
  }

  function ensureMathJax() {
    if (document.querySelector('script[src*="MathJax"], script[src*="mathjax"]')) {
      return;
    }

    var mathJax = document.createElement("script");
    mathJax.defer = true;
    mathJax.src = "https://cdn.jsdelivr.net/npm/mathjax@4/tex-mml-chtml.js";
    document.head.appendChild(mathJax);
  }

  function currentPage() {
    var page = window.location.pathname.split("/").pop();
    return page || "index.html";
  }

  function siteRoot() {
    if (window.siteRoot) {
      return window.siteRoot;
    }

    var script = document.currentScript || document.querySelector('script[src$="header.js"]');
    var src = script ? script.getAttribute("src") : "";

    if (!src || src.indexOf("/") === -1) {
      return "./";
    }

    return src.replace(/header\.js(?:\?.*)?$/, "");
  }

  function buildHeader() {
    if (document.querySelector(".site-header")) {
      return;
    }

    var root = siteRoot();
    var header = document.createElement("header");
    header.className = "site-header";

    var title = document.createElement("div");
    title.className = "zzz";
    title.textContent = "Philip B. Zhang (张彪)";
    header.appendChild(title);

    var nav = document.createElement("nav");
    nav.setAttribute("aria-label", "Main navigation");

    var list = document.createElement("ul");
    var page = currentPage();

    navItems.forEach(function (item) {
      var li = document.createElement("li");
      var link = document.createElement("a");
      link.href = root + item[0];
      link.textContent = item[1];

      if (page === item[0]) {
        link.setAttribute("aria-current", "page");
      }

      li.appendChild(link);
      list.appendChild(li);
    });

    nav.appendChild(list);
    header.appendChild(nav);

    document.body.insertBefore(header, document.body.firstChild);
  }

  function init() {
    ensureMeta();
    ensureStylesheet();
    ensureAnalytics();
    ensureMathJax();
    buildHeader();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
