// Central WhatsApp configuration for every direct-contact entry point.
const WHATSAPP_NUMBER = "989915147789";
const DEFAULT_MESSAGE = "السلام عليكم، أود الاستفسار عن زيارة مشهد والخدمات السياحية. كيف يمكنكم مساعدتي؟";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

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


const menuToggle = document.querySelector(".menu-toggle");
const siteMenu = document.getElementById("site-menu");
if (menuToggle && siteMenu) {
  const closeMenu = () => { siteMenu.hidden = true; menuToggle.setAttribute("aria-expanded", "false"); menuToggle.setAttribute("aria-label", "فتح القائمة"); };
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    siteMenu.hidden = isOpen;
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "فتح القائمة" : "إغلاق القائمة");
  });
  siteMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });
  document.addEventListener("click", (event) => { if (!siteMenu.hidden && !siteMenu.contains(event.target) && !menuToggle.contains(event.target)) closeMenu(); });
}
