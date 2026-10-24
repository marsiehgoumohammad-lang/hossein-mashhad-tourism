// Central WhatsApp configuration for every direct-contact entry point.
const WHATSAPP_NUMBER = "989915147789";
const DEFAULT_MESSAGE = "السلام عليكم، أود الاستفسار عن زيارة مشهد والخدمات السياحية. كيف يمكنكم مساعدتي؟";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

function initializeSite() {
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

  // Bind once, with an explicit state instead of relying on the hidden attribute alone.
  if (button.dataset.menuReady === "true") return;
  button.dataset.menuReady = "true";
  button.type = "button";
  button.setAttribute("aria-controls", "site-menu");

  const setMenuOpen = (open) => {
    menu.hidden = !open;
    menu.classList.toggle("is-open", open);
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "إغلاق القائمة" : "فتح القائمة");
  };

  setMenuOpen(false);
  button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    setMenuOpen(menu.hidden);
  });
  document.addEventListener("click", (event) => {
    if (!menu.hidden && !menu.contains(event.target) && !button.contains(event.target)) setMenuOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuOpen(false);
  });
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenuOpen(false)));
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeSite, { once: true });
} else {
  initializeSite();
}
