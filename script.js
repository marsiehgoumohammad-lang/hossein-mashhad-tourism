/* Replace this empty value with the verified international WhatsApp number before launch. */
const WHATSAPP_NUMBER = "";
const DEFAULT_MESSAGE = "السلام عليكم حسين، أرغب في معرفة المزيد عن ترتيب رحلتي إلى مشهد.";
const link = document.getElementById("whatsapp-link");
const warning = document.getElementById("setup-warning");
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear().toLocaleString("ar");
if (link && /^\d{8,15}$/.test(WHATSAPP_NUMBER)) {
  link.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(DEFAULT_MESSAGE);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  if (warning) warning.hidden = true;
} else if (link) {
  link.href = "#contact";
  link.addEventListener("click", function (event) {
    event.preventDefault();
    if (warning) {
      warning.textContent = "لم يُضَف رقم واتساب بعد. أضف الرقم الدولي في ملف script.js قبل النشر.";
      warning.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
}
/* Reel thumbnails are placeholders until real, licensed video files are supplied. */
