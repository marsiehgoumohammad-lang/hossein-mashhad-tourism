// Central WhatsApp configuration for all contact entry points.
const WHATSAPP_NUMBER = "989915147789";
const DEFAULT_MESSAGE = "السلام عليكم، أود الاستفسار عن زيارة مشهد والخدمات السياحية. كيف يمكنكم مساعدتي؟";

const whatsappLink = document.getElementById("whatsapp-link");
const setupWarning = document.getElementById("setup-warning");
const year = document.getElementById("year");

if (year) year.textContent = new Date().getFullYear().toLocaleString("ar");

if (whatsappLink) {
  whatsappLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;
  whatsappLink.target = "_blank";
  whatsappLink.rel = "noopener noreferrer";
  if (setupWarning) setupWarning.hidden = true;
}

// The reel cards remain clearly marked as coming soon until real, approved video files are added.
