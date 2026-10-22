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

  // Bind after the DOM exists; keep the hidden attribute and ARIA state in sync.
  const button = document.querySelector(".menu-toggle");
  const menu = document.getElementById("site-menu");
  if (!button || !menu || button.dataset.menuReady === "true") return;
  button.dataset.menuReady = "true";

  const setMenuOpen = (open) => {
    menu.hidden = !open;
    menu.classList.toggle("is-open", open);
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "إغلاق القائمة" : "فتح القائمة");
  };

  // Normalize the initial state in case a browser restores stale DOM state.
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
