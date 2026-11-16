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

function ensureFooterNav(menu) {
  const footer = document.querySelector("footer:not(.site-footer)");
  if (!footer || footer.querySelector(".footer-nav")) return;

  const footerNav = document.createElement("nav");
  footerNav.className = "footer-nav";
  footerNav.setAttribute("aria-label", "روابط الموقع");
  const heading = document.createElement("strong");
  heading.className = "footer-nav-title";
  heading.textContent = "تصفح الموقع";
  footerNav.appendChild(heading);

  const defaultLinks = [
    { href: "/", label: "الرئيسية" },
    { href: "about-hussein", label: "عن حسين" },
    { href: "services", label: "الخدمات" },
    { href: "health-tourism", label: "السياحة العلاجية" },
    { href: "hotels-near-shrine-comparison", label: "الفنادق قرب الحرم" },
    { href: "guide-ziyarah-imam-reza", label: "دليل زيارة الحرم" },
    { href: "mashhad-trip-cost", label: "تكلفة الرحلة" },
    { href: "blog", label: "دليل السفر إلى مشهد" },
  ];

  if (menu) {
    menu.querySelectorAll("a").forEach((sourceLink) => {
      const link = sourceLink.cloneNode(true);
      link.classList.remove("menu-whatsapp");
      footerNav.appendChild(link);
    });
  } else {
    defaultLinks.forEach((item) => {
      const link = document.createElement("a");
      link.href = item.href;
      link.textContent = item.label;
      footerNav.appendChild(link);
    });
  }

  const footerBottom = footer.querySelector(".footer-bottom");
  footer.insertBefore(footerNav, footerBottom || null);
}

function ensureFooterNavStyles() {
  if (!document.querySelector("footer .footer-nav") || document.getElementById("footer-nav-styles")) return;
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

function initializeTripCalculator() {
  const root = document.querySelector("[data-trip-calculator]");
  if (!root || root.dataset.calcReady === "true") return;
  root.dataset.calcReady = "true";

  const nightsEl = root.querySelector("#calc-nights");
  const travelersEl = root.querySelector("#calc-travelers");
  const roomsEl = root.querySelector("#calc-rooms");
  const tierEl = root.querySelector("#calc-tier");
  const originEl = root.querySelector("#calc-origin");
  const totalEl = root.querySelector("[data-calc-total]");
  const breakdownEl = root.querySelector("[data-calc-breakdown]");
  const originNoteEl = root.querySelector("[data-calc-origin-note]");
  const waBtn = root.querySelector("[data-calc-wa]");

  if (!nightsEl || !travelersEl || !roomsEl || !tierEl || !totalEl || !breakdownEl) return;

  const TIERS = {
    budget: { label: "فندق اقتصادي / ٣ نجوم", min: 30, max: 75 },
    four: { label: "فندق ٤ نجوم", min: 50, max: 125 },
    five: { label: "فندق ٥ نجوم", min: 55, max: 135 },
  };

  const toAr = (n) => Number(n).toLocaleString("ar-EG");

  const update = () => {
    const nights = Math.max(1, Math.min(30, Number(nightsEl.value) || 4));
    const travelers = Math.max(1, Math.min(15, Number(travelersEl.value) || 2));
    const rooms = Math.max(1, Math.min(8, Number(roomsEl.value) || 1));
    const tier = TIERS[tierEl.value] || TIERS.budget;
    const origin = originEl ? originEl.value : "iraq";

    const hotelMin = nights * rooms * tier.min;
    const hotelMax = nights * rooms * tier.max;
    const dailyMin = nights * travelers * 21;
    const dailyMax = nights * travelers * 56;
    const taxiMin = travelers >= 4 ? 32 : 22;
    const taxiMax = travelers >= 4 ? 65 : 46;

    const totalMin = hotelMin + dailyMin + taxiMin;
    const totalMax = hotelMax + dailyMax + taxiMax;

    totalEl.textContent = `النطاق التقديري داخل مشهد: ${toAr(totalMin)} – ${toAr(totalMax)} دولار أمريكي`;
    breakdownEl.innerHTML = "";
    const rows = [
      `الإقامة (${toAr(nights)} ليالٍ × ${toAr(rooms)} غرفة — ${tier.label}): ${toAr(hotelMin)}–${toAr(hotelMax)} دولار`,
      `الطعام والتنقل اليومي داخل مشهد (${toAr(travelers)} مسافر × ${toAr(nights)} أيام): ${toAr(dailyMin)}–${toAr(dailyMax)} دولار`,
      `نقل المطار ذهاباً وإياباً التقديري: ${toAr(taxiMin)}–${toAr(taxiMax)} دولار`,
    ];
    rows.forEach((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      breakdownEl.appendChild(li);
    });

    if (originNoteEl) {
      if (origin === "iraq") {
        originNoteEl.textContent = "للمسافر من العراق: لا يشمل الحساب تذكرة الطيران أو النقل البري؛ راجع سعر صرف الدولار مقابل الدينار العراقي في يوم الحجز ولا تعتمد تقديراً قديماً.";
      } else if (origin === "gulf") {
        originNoteEl.textContent = "للمسافر من الخليج: لا يشمل الحساب تذاكر الطيران الإقليمية أو رسوم المواسم الدينية أو التسوق الشخصي.";
      } else {
        originNoteEl.textContent = "للمسافر من لبنان وسائر الدول: لا يشمل الحساب تذاكر الطيران الدولي أو أي إجراءات طبية.";
      }
    }

    if (waBtn) {
      const msg = `السلام عليكم، أستفسر عن تنسيق رحلة مشهد لـ ${travelers} مسافر لمدة ${nights} ليالٍ (${rooms} غرفة - ${tier.label})، والتقدير الظاهر بالجدول ${totalMin}-${totalMax} دولار دون الطيران. ما التوفر والسعر الفعلي لتواريخي؟`;
      waBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    }
  };

  [nightsEl, travelersEl, roomsEl, tierEl, originEl].forEach((el) => {
    if (el) {
      el.addEventListener("change", update);
      el.addEventListener("input", update);
    }
  });
  update();
}

function initializeSite() {
  loadArabicFontsNonBlocking();
  const whatsappLinks = document.querySelectorAll("#whatsapp-link, #hero-whatsapp-link, .head-link, .mobile-cta, .header-wa");
  const setupWarning = document.getElementById("setup-warning");
  const year = document.getElementById("year");

  if (year) year.textContent = new Date().getFullYear().toLocaleString("ar");
  whatsappLinks.forEach((link) => {
    link.href = WHATSAPP_URL;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    if (!link.getAttribute("aria-label")) {
      link.setAttribute("aria-label", "التواصل مع حسين عبر واتساب");
    }
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

  initializeTripCalculator();

  const button = document.querySelector(".menu-toggle");
  const menu = document.getElementById("site-menu");

  ensureFooterNav(menu);

  if (!button || !menu) return;

  // Reliable mobile navigation: one state source, explicit visibility, and accessible state.
  if (button.dataset.menuReady !== "true") {
    button.dataset.menuReady = "true";
    button.type = "button";
    button.setAttribute("aria-controls", "site-menu");

    const setMenuOpen = (open) => {
      const isMobile = window.matchMedia("(max-width: 899px)").matches;
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
      if (!window.matchMedia("(max-width: 899px)").matches) setMenuOpen(false);
    }, { passive: true });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeSite, { once: true });
} else {
  initializeSite();
}
