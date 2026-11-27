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

  const ids = [
    "calc-nights", "calc-days", "calc-travelers", "calc-rooms",
    "calc-hotel-price", "calc-hotel-discount", "calc-food-price",
    "calc-local-transport", "calc-airport-transfer", "calc-flight-price",
    "calc-extra-costs", "calc-origin"
  ];
  const fields = Object.fromEntries(ids.map((id) => [id, root.querySelector(`#${id}`)]));
  const totalEl = root.querySelector("[data-calc-total]");
  const breakdownEl = root.querySelector("[data-calc-breakdown]");
  const noteEl = root.querySelector("[data-calc-season-note]");
  const originNoteEl = root.querySelector("[data-calc-origin-note]");
  const waBtn = root.querySelector("[data-calc-wa]");
  if (ids.some((id) => !fields[id]) || !totalEl || !breakdownEl) return;

  const toAr = (n) => Number(n).toLocaleString("ar-EG", { maximumFractionDigits: 2 });
  const val = (id) => Math.max(0, Number(fields[id].value) || 0);
  const update = () => {
    const nights = Math.max(1, Math.min(30, Number(fields["calc-nights"].value) || 1));
    const days = Math.max(1, Math.min(31, Number(fields["calc-days"].value) || nights + 1));
    const travelers = Math.max(1, Math.min(15, Number(fields["calc-travelers"].value) || 1));
    const rooms = Math.max(1, Math.min(8, Number(fields["calc-rooms"].value) || 1));
    const hotelRate = val("calc-hotel-price");
    const discount = Math.max(0, Math.min(20, val("calc-hotel-discount")));
    if (Number(fields["calc-hotel-discount"].value) > 20) fields["calc-hotel-discount"].value = "20";
    const foodRate = val("calc-food-price");
    const localRate = val("calc-local-transport");
    const transfer = val("calc-airport-transfer");
    const flightRate = val("calc-flight-price");
    const extra = val("calc-extra-costs");
    const hasQuote = [hotelRate, foodRate, localRate, transfer, flightRate, extra].some((n) => n > 0);

    breakdownEl.replaceChildren();
    if (!hasQuote) {
      totalEl.textContent = "أدخل الأسعار الحالية التي حصلت عليها ليظهر تقدير ميزانيتك.";
      if (noteEl) noteEl.textContent = "الحاسبة لا تجلب أسعاراً مباشرة؛ أدخل عروض الفندق والناقل والتكاليف التي تحققت منها بنفسك.";
      if (originNoteEl) originNoteEl.textContent = "جميع المبالغ بالدولار الأمريكي. حوّلها إلى عملتك بسعر الصرف المتاح يوم السفر.";
      return;
    }

    const hotelTotal = hotelRate * nights * rooms * (1 - discount / 100);
    const foodTotal = foodRate * travelers * days;
    const localTotal = localRate * days;
    const flightTotal = flightRate * travelers;
    const total = hotelTotal + foodTotal + localTotal + transfer + flightTotal + extra;
    totalEl.textContent = `الإجمالي التقديري بناءً على الأسعار المدخلة: ${toAr(total)} دولار أمريكي`;

    const rows = [
      [`الإقامة (${toAr(rooms)} غرفة × ${toAr(nights)} ليلة)`, hotelTotal],
      [`الطعام (${toAr(travelers)} مسافر × ${toAr(days)} يوم)`, foodTotal],
      [`التنقل داخل المدينة (${toAr(days)} يوم)`, localTotal],
      ["الانتقال من المطار وإليه", transfer],
      [`تذاكر الطيران ذهاباً وعودة (${toAr(travelers)} مسافر)`, flightTotal],
      ["التأمين والمصاريف الإضافية", extra]
    ];
    rows.forEach(([label, amount]) => {
      const li = document.createElement("li");
      li.textContent = `${label}: ${toAr(amount)} دولار`;
      breakdownEl.appendChild(li);
    });
    if (noteEl) {
      noteEl.textContent = `احتُسب الفندق بعد خصم ${toAr(discount)}٪. أدخل هذه النسبة فقط إذا أكدها الفندق لك؛ الحد الأقصى للخصم الذي يمكن إدخاله هو ٢٠٪. هذا تقدير حسابي وليس عرض سعر أو حجزاً.`;
    }
    const origin = fields["calc-origin"].value;
    const originNames = { iraq: "العراق", gulf: "دول الخليج", lebanon: "لبنان" };
    if (originNoteEl) originNoteEl.textContent = `بلد المغادرة المحدد: ${originNames[origin] || "غير محدد"}. لا تتضمن الحاسبة تحويل العملات؛ استخدم سعر الصرف يوم السفر.`;
    if (waBtn) {
      const msg = `أرغب في مراجعة ميزانية رحلتي إلى مشهد. بلد المغادرة: ${originNames[origin] || "غير محدد"}. عدد المسافرين: ${travelers}، الليالي: ${nights}، الأيام: ${days}، الغرف: ${rooms}. الإجمالي الحسابي حسب الأسعار التي أدخلتها: ${toAr(total)} دولار. أرجو التحقق من التوفر والأسعار الحالية.`;
      waBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    }
  };

  ids.forEach((id) => {
    const el = fields[id];
    if (el) {
      el.addEventListener("input", update);
      el.addEventListener("change", update);
    }
  });
  update();
}

function normalizeArabicText(str) {
  return (str || "")
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .trim();
}

function initializeBlogFilter() {
  const searchInput = document.getElementById("blog-search");
  const filterBar = document.querySelector("[data-blog-filters]");
  if (!searchInput && !filterBar) return;

  const sections = Array.from(document.querySelectorAll(".content-cat"));
  const statusEl = document.getElementById("blog-filter-status");
  let activeCat = "all";

  const applyFilter = () => {
    const query = normalizeArabicText(searchInput ? searchInput.value : "");
    let visibleCount = 0;

    sections.forEach((sec) => {
      const catMatch = activeCat === "all" || sec.id === activeCat;
      const items = Array.from(sec.querySelectorAll(".content-list li"));
      let sectionMatches = 0;

      items.forEach((li) => {
        const text = normalizeArabicText(li.textContent);
        const match = catMatch && (!query || text.includes(query));
        li.classList.toggle("is-filtered-out", !match);
        if (match) {
          sectionMatches++;
          visibleCount++;
        }
      });

      sec.classList.toggle("is-filtered-out", !catMatch || sectionMatches === 0);
    });

    if (statusEl) {
      statusEl.textContent = visibleCount > 0
        ? `عدد الأدلة المعروضة: ${visibleCount.toLocaleString("ar-EG")}`
        : "لا توجد نتائج مطابقة لهذا البحث؛ جرّب كلمة أقصر أو تصفح كل الأقسام.";
    }
  };

  if (searchInput) {
    searchInput.addEventListener("input", applyFilter);
  }
  if (filterBar) {
    const buttons = Array.from(filterBar.querySelectorAll("[data-cat-filter]"));
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        activeCat = btn.dataset.catFilter || "all";
        buttons.forEach((b) => {
          const isCurrent = b === btn;
          b.classList.toggle("is-active", isCurrent);
          b.setAttribute("aria-pressed", String(isCurrent));
        });
        applyFilter();
      });
    });
  }
}

function initializeHotelFilter() {
  const filterBar = document.querySelector("[data-hotel-filters]");
  if (!filterBar) return;

  const buttons = Array.from(filterBar.querySelectorAll("[data-hotel-filter]"));
  const targets = Array.from(document.querySelectorAll("[data-hotel-tags]"));
  const statusEl = document.getElementById("hotel-filter-status");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.hotelFilter || "all";
      buttons.forEach((b) => {
        const isCurrent = b === btn;
        b.classList.toggle("is-active", isCurrent);
        b.setAttribute("aria-pressed", String(isCurrent));
      });

      let shown = 0;
      targets.forEach((el) => {
        const tags = (el.dataset.hotelTags || "").split(/\s+/);
        const show = filter === "all" || tags.includes(filter);
        el.classList.toggle("is-filtered-out", !show);
        if (show) shown++;
      });

      if (statusEl) {
        statusEl.textContent = filter === "all"
          ? "يعرض جميع الفنادق والشقق الفندقية للمقارنة."
          : `العناصر المعروضة وفق التصنيف المختار: ${shown.toLocaleString("ar-EG")}`;
      }
    });
  });
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
  initializeBlogFilter();
  initializeHotelFilter();

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
