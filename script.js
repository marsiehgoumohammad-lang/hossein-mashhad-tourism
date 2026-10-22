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


// Accessible mobile navigation.
(()=>{const button=document.querySelector('.menu-toggle');const menu=document.getElementById('site-menu');if(!button||!menu)return;const close=()=>{button.setAttribute('aria-expanded','false');button.setAttribute('aria-label','فتح القائمة');menu.hidden=true};button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?'إغلاق القائمة':'فتح القائمة');menu.hidden=!open});document.addEventListener('click',e=>{if(!menu.hidden&&!menu.contains(e.target)&&!button.contains(e.target))close()});document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',close))})();
