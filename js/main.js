// ================= DHU Man Power Services - shared site script =================
// Runs on every page: mobile nav menu, terms & conditions modal, footer year, PWA sw registration.

(function () {
  "use strict";

  /* ---------- Mobile menu ---------- */
  var btn = document.getElementById("mobile-menu-button");
  var menu = document.getElementById("mobile-menu");
  var iconOpen = document.getElementById("menu-icon-open");
  var iconClose = document.getElementById("menu-icon-close");

  function setMenuState(isOpen) {
    if (!menu || !btn) return;
    menu.classList.toggle("hidden", !isOpen);
    btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    if (iconOpen && iconClose) {
      iconOpen.classList.toggle("hidden", isOpen);
      iconClose.classList.toggle("hidden", !isOpen);
    }
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  if (btn && menu) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var isOpen = !menu.classList.contains("hidden");
      setMenuState(!isOpen);
    });

    // Close the mobile menu when a link inside it is tapped
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenuState(false);
      });
    });

    // Close on outside click / escape, and auto-close if resized to desktop
    document.addEventListener("click", function (e) {
      if (!menu.classList.contains("hidden") && !menu.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
        setMenuState(false);
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenuState(false);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 768) setMenuState(false);
    });
  }

  /* ---------- Terms & Conditions modal ---------- */
  window.openModal = function (serviceName) {
    var modal = document.getElementById("termsModal");
    var titleEl = document.getElementById("modalTitle");
    var serviceEl = document.getElementById("serviceNameDisplay");
    if (!modal) return;

    if (titleEl) titleEl.textContent = "Service Terms & Conditions";
    if (serviceEl) serviceEl.textContent = serviceName ? "For: " + serviceName : "";

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    modal.querySelector(".bg-white") && modal.querySelector(".bg-white").focus();
  };

  window.closeModal = function () {
    var modal = document.getElementById("termsModal");
    if (!modal) return;
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  };

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") window.closeModal();
  });

  var modalEl = document.getElementById("termsModal");
  if (modalEl) {
    modalEl.addEventListener("click", function (e) {
      if (e.target === modalEl) window.closeModal();
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- PWA service worker ---------- */
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register(
        (location.pathname.indexOf("/blog/") !== -1 ? "../" : "") + "js/service-worker.js"
      ).catch(function () { /* silent fail is fine - PWA is a progressive enhancement */ });
    });
  }
})();
