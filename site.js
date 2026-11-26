/* Small progressive enhancements. The site works without this file. */
(function () {
  "use strict";

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    var area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    try { document.execCommand("copy"); } finally { document.body.removeChild(area); }
    return Promise.resolve();
  }

  function flash(el, original, message) {
    el.textContent = message;
    window.setTimeout(function () { el.textContent = original; }, 1600);
  }

  document.addEventListener("click", function (event) {
    var target = event.target;

    // Email: copy the real address, briefly confirm in place.
    var copyBtn = target.closest(".email__copy");
    if (copyBtn) {
      var email = copyBtn.closest(".email");
      var label = email.querySelector(".email__text");
      var address = email.dataset.user + "@" + email.dataset.domain;
      var shown = label.dataset.shown || label.textContent;
      label.dataset.shown = shown;
      copyText(address).then(function () {
        email.classList.add("is-copied");
        flash(label, shown, "copied to clipboard");
        window.setTimeout(function () { email.classList.remove("is-copied"); }, 1600);
      });
      return;
    }

    // Publications: show / hide BibTeX.
    var toggle = target.closest("[data-bib-toggle]");
    if (toggle) {
      var panel = document.getElementById(toggle.getAttribute("aria-controls"));
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      panel.hidden = open;
      return;
    }

    // Publications: copy BibTeX.
    var bibCopy = target.closest("[data-bib-copy]");
    if (bibCopy) {
      var pre = bibCopy.parentElement.querySelector("pre");
      copyText(pre.textContent).then(function () { flash(bibCopy, "copy", "copied"); });
    }
  });
})();
