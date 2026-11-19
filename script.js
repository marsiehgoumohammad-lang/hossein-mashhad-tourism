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
  const seasonEl = root.querySelector("#calc-season");
  const originEl = root.querySelector("#calc-origin");
  const totalEl = root.querySelector("[data-calc-total]");
  const breakdownEl = root.querySelector("[data-calc-breakdown]");
  const originNoteEl = root.querySelector("[data-calc-origin-note]");
  const seasonNoteEl = root.querySelector("[data-calc-season-note]");
  const waBtn = root.querySelector("[data-calc-wa]");

  if (!nightsEl || !travelersEl || !roomsEl || !tierEl || !totalEl || !breakdownEl) return;

  const TIERS = {
    budget: { label: "فندق اقتصادي / ٣ نجوم", min: 26, max: 65 },
    four: { label: "فندق ٤ نجوم", min: 42, max: 110 },
    five: { label: "فندق ٥ نجوم", min: 48, max: 125 },
  };

  const SEASONS = {
    offpeak: { label: "موسم هادئ (خارج الذروة)", mult: 0.84, note: "في الفترات الهادئة خارج الذروة لا يوجد خصم مضمون، وقد يتاح التفاوض أحياناً على خصم يصل إلى ٢٠٪ وفق موافقة الفندق والإشغال وتاريخ السفر؛ يُتحقق من السعر النهائي كتابياً يوم الاستفسار." },
    regular: { label: "موسم معتدل", mult: 1.0, note: "الأسعار المعتادة تختلف بحسب الشارع وقرب الغرفة من موعد السفر؛ قد تتوفر عروض جزئية بالحجز المبكر." },
    peak: { label: "موسم ذروة ومناسبات دينية", mult: 1.18, note: "في مواسم الزيارة الكبرى والعطل يرتفع الإشغال وتنخفض فرص الخصم الكبير؛ يُنصح بالتأكيد المبكر مكتوباً." },
  };

  const toAr = (n) => Number(Math.round(n)).toLocaleString("ar-EG");

  const update = () => {
    const nights = Math.max(1, Math.min(30, Number(nightsEl.value) || 4));
    const travelers = Math.max(1, Math.min(15, Number(travelersEl.value) || 2));
    const rooms = Math.max(1, Math.min(8, Number(roomsEl.value) || 1));
    const tier = TIERS[tierEl.value] || TIERS.budget;
    const seasonKey = seasonEl ? seasonEl.value : "regular";
    const season = SEASONS[seasonKey] || SEASONS.regular;
    const origin = originEl ? originEl.value : "iraq";

    const hotelMin = Math.round(nights * rooms * tier.min * season.mult);
    const hotelMax = Math.round(nights * rooms * tier.max * (seasonKey === "offpeak" ? 0.9 : season.mult));
    const dailyMin = nights * travelers * 20;
    const dailyMax = nights * travelers * 52;
    const taxiMin = travelers >= 4 ? 30 : 20;
    const taxiMax = travelers >= 4 ? 62 : 44;

    const totalMin = hotelMin + dailyMin + taxiMin;
    const totalMax = hotelMax + dailyMax + taxiMax;

    totalEl.textContent = `النطاق التقديري داخل مشهد (${season.label}): ${toAr(totalMin)} – ${toAr(totalMax)} دولار أمريكي`;
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

    if (seasonNoteEl) {
      seasonNoteEl.textContent = season.note;
    }

    if (originNoteEl) {
      if (origin === "iraq") {
        originNoteEl.textContent = "للمسافر من العراق: الحساب لا يشمل تذكرة الطيران أو النقل البري؛ حوّل النطاق الموضح إلى الدينار العراقي حسب سعر الصرف السوقي في مدينتك يوم السفر ولا تعتمد تقديراً قديماً.";
      } else if (origin === "gulf") {
        originNoteEl.textContent = "للمسافر من الخليج: الحساب لا يشمل تذاكر الطيران الإقليمية أو التسوق الشخصي؛ راجع سعر الصرف مقابل عملتك المحلية وقت الحجز.";
      } else {
        originNoteEl.textContent = "للمسافر من لبنان وسائر الدول: لا يشمل الحساب تذاكر الطيران الدولي أو أي إجراءات طبية.";
      }
    }

    if (waBtn) {
      const msg = `السلام عليكم، أستفسر عن تنسيق رحلة مشهد لـ ${travelers} مسافر لمدة ${nights} ليالٍ (${rooms} غرفة - ${tier.label} - ${season.label})، والتقدير الظاهر بالحاسبة ${totalMin}-${totalMax} دولار دون الطيران. ما التوفر والسعر الصافي وهل يتاح أي خصم لتواريخي؟`;
      waBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    }
  };

  [nightsEl, travelersEl, roomsEl, tierEl, seasonEl, originEl].forEach((el) => {
    if (el) {
      el.addEventListener("change", update);
      el.addEventListener("input", update);
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
