// Central WhatsApp configuration for every direct-contact entry point.
const WHATSAPP_NUMBER = "989915147789";
const DEFAULT_MESSAGE = "السلام عليكم، أود الاستفسار عن زيارة مشهد والخدمات السياحية. كيف يمكنكم مساعدتي؟";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

function loadArabicFontsNonBlocking() {
  const fontStylesheet = "https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@500;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap";
  if (document.querySelector('link[data-arabic-fonts="true"]')) return;

  const googleFonts = document.createElement("link");
  googleFonts.rel = "preconnect";
  googleFonts.href = "https://fonts.googleapis.com";
  document.head.appendChild(googleFonts);

  const googleFontsStatic = document.createElement("link");
  googleFontsStatic.rel = "preconnect";
  googleFontsStatic.href = "https://fonts.gstatic.com";
  googleFontsStatic.crossOrigin = "anonymous";
  document.head.appendChild(googleFontsStatic);

  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = fontStylesheet;
  stylesheet.media = "print";
  stylesheet.dataset.arabicFonts = "true";
  stylesheet.onload = () => { stylesheet.media = "all"; };
  document.head.appendChild(stylesheet);
}

function initializeSite() {
  loadArabicFontsNonBlocking();
  const whatsappLinks = document.querySelectorAll("#whatsapp-link, #hero-whatsapp-link, .head-link, .mobile-cta");
  const setupWarning = document.getElementById("setup-warning");
  const year = document.getElementById("year");

  if (year) year.textContent = new Date().getFullYear().toLocaleString("ar");
  whatsappLinks.forEach((link) => {
    link.href = WHATSAPP_URL;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", "التواصل مع حسين عبر واتساب");
  });
  if (setupWarning) setupWarning.hidden = true;

  // Keep the summary readable over the dark hero image.
  if (!document.getElementById("hero-summary-contrast")) {
    const style = document.createElement("style");
    style.id = "hero-summary-contrast";
    style.textContent = `
      .hero .quick-answer{background:rgba(5,15,23,.82);border-color:rgba(255,255,255,.48);border-inline-start-color:#fff;color:#fff}
      .hero .quick-answer h2,.hero .quick-answer p{color:#fff!important}
      .hero .quick-answer h2{font-weight:800}
    `;
    document.head.appendChild(style);
  }

  const button = document.querySelector(".menu-toggle");
  const menu = document.getElementById("site-menu");
  if (!button || !menu) return;

  // A visible fallback navigation in the footer keeps every key destination accessible.
  const footer = document.querySelector("footer");
  if (footer && !footer.querySelector(".footer-nav")) {
    const footerNav = document.createElement("nav");
    footerNav.className = "footer-nav";
    footerNav.setAttribute("aria-label", "روابط الموقع");
    const heading = document.createElement("strong");
    heading.className = "footer-nav-title";
    heading.textContent = "تصفح الموقع";
    footerNav.appendChild(heading);
    menu.querySelectorAll("a").forEach((sourceLink) => {
      const link = sourceLink.cloneNode(true);
      link.classList.remove("menu-whatsapp");
      footerNav.appendChild(link);
    });
    const footerBottom = footer.querySelector(".footer-bottom");
    footer.insertBefore(footerNav, footerBottom || null);

    if (!document.getElementById("footer-nav-styles")) {
      const style = document.createElement("style");
      style.id = "footer-nav-styles";
      style.textContent = `
        footer .footer-nav{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px 16px;max-width:var(--max);margin:20px auto 24px;padding:18px 0;border-top:1px solid rgba(229,193,88,.24);border-bottom:1px solid rgba(229,193,88,.24)}
        footer .footer-nav-title{grid-column:1/-1;color:#e5c158;font-size:14px;margin-bottom:4px}
        footer .footer-nav a{display:block;color:#fff;text-decoration:none;padding:7px 0;line-height:1.7}
        footer .footer-nav a span{color:#e5c158}
        @media(min-width:620px){footer .footer-nav{grid-template-columns:repeat(3,minmax(0,1fr))}}
      `;
      document.head.appendChild(style);
    }
  }

  // Reliable mobile navigation: one state source, explicit visibility, and accessible state.
  if (button.dataset.menuReady !== "true") {
    button.dataset.menuReady = "true";
    button.type = "button";
    button.setAttribute("aria-controls", "site-menu");

    const setMenuOpen = (open) => {
      const isMobile = window.matchMedia("(max-width: 619px)").matches;
      const shouldOpen = Boolean(open && isMobile);
      menu.hidden = !shouldOpen;
      menu.classList.toggle("is-open", shouldOpen);
      menu.style.display = shouldOpen ? "flex" : "none";
      button.setAttribute("aria-expanded", String(shouldOpen));
      button.setAttribute("aria-label", shouldOpen ? "إغلاق القائمة" : "فتح القائمة");
    };

    setMenuOpen(false);
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      setMenuOpen(menu.hidden || button.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("click", (event) => {
      if (!menu.hidden && !menu.contains(event.target) && !button.contains(event.target)) setMenuOpen(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !menu.hidden) {
        setMenuOpen(false);
        button.focus();
      }
    });
    menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenuOpen(false)));
    window.addEventListener("resize", () => {
      if (!window.matchMedia("(max-width: 619px)").matches) setMenuOpen(false);
    }, { passive: true });
  }

}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeSite, { once: true });
} else {
  initializeSite();
}
