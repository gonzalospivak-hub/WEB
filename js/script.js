(() => {
  "use strict";

  // Placeholder contact number — swap for Gonzalo's real WhatsApp line.
  const WA_NUMBER = "5491133445566";
  const WA_DEFAULT_TEXT = "Hola Gonzalo! Vengo de tu web y quiero hablar sobre una propiedad.";
  const waLink = (text) => "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text);

  const PROPERTIES = [
    { tag: "PALERMO SOHO", barrio: "PALERMO", price: "USD 189.000", title: "2 amb luminoso con balcón a los árboles", amb: "2 amb", m2: "48 m²", extra: "Balcón", img: "assets/prop-1.png" },
    { tag: "A ESTRENAR", barrio: "COLEGIALES", price: "USD 215.000", title: "3 amb con living comedor integrado y cocina nueva", amb: "3 amb", m2: "71 m²", extra: "Amenities", img: "assets/prop-2.png" },
    { tag: "FAMILIAR", barrio: "BELGRANO", price: "USD 340.000", title: "4 amb clásico impecable, piso de madera original", amb: "4 amb", m2: "108 m²", extra: "Cochera", img: "assets/prop-3.png" },
    { tag: "OPORTUNIDAD", barrio: "VILLA CRESPO", price: "USD 132.000", title: "PH de 3 amb con balcón terraza al frente", amb: "3 amb", m2: "62 m²", extra: "Terraza", img: "assets/prop-4.png" },
    { tag: "INVERSIÓN", barrio: "ALMAGRO", price: "USD 96.000", title: "Monoambiente con renta en dólares en curso", amb: "1 amb", m2: "32 m²", extra: "Rentado", img: "assets/prop-2.png" },
    { tag: "PREMIUM", barrio: "NÚÑEZ", price: "USD 425.000", title: "3 amb premium con balcón y vista abierta", amb: "3 amb", m2: "95 m²", extra: "Vista", img: "assets/prop-1.png" }
  ];

  const FILTER_LABELS = ["Todos", "Palermo", "Villa Crespo", "Inversión", "Casas y PH"];

  const REELS = [
    { img: "assets/reel-1.png", caption: "reel · 20.320 USD → ¿alcanza?" },
    { img: "assets/reel-2.png", caption: "post · la mejor cuadra de Palermo" },
    { img: "assets/reel-3.png", caption: "reel · U$S 125k o U$S 430k?" },
    { img: "assets/reel-4.png", caption: "reel · antes y después de una obra" }
  ];

  const FAQS = [
    { q: "¿Cuánto cobrás de comisión?", a: "En CABA el honorario del vendedor es del 4% + IVA y el del comprador 4% + IVA, según lo que fija la normativa vigente. Te lo aclaro por escrito antes de firmar cualquier autorización." },
    { q: "¿La tasación es realmente gratis?", a: "Sí. Visito la propiedad, reviso documentación y te entrego el informe sin costo, incluso si después decidís no vender o vender con otro." },
    { q: "¿En cuánto tiempo se vende una propiedad?", a: "Con precio bien puesto y buena producción de fotos, el promedio de mis operaciones ronda los 45 a 75 días desde la publicación hasta la reserva." },
    { q: "¿Trabajás solo con departamentos?", a: "Departamentos, PH, casas y lotes en CABA y zona norte de GBA. También unidades para reciclar si sos inversor." },
    { q: "¿Qué pasa si el comprador necesita crédito?", a: "Lo acompañamos: pre-calificación con el banco antes de la reserva para no frenar la operación a mitad de camino." }
  ];

  function matchesFilter(p, filter) {
    if (filter === "Todos") return true;
    if (filter === "Inversión") return p.tag === "INVERSIÓN" || p.tag === "OPORTUNIDAD";
    if (filter === "Casas y PH") return p.amb === "Casa" || p.title.indexOf("PH") === 0;
    return p.barrio.toLowerCase() === filter.toLowerCase();
  }

  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  // Wire every static WhatsApp CTA on the page.
  function bindWaLinks() {
    document.querySelectorAll("[data-wa-link]").forEach((a) => {
      a.href = waLink(WA_DEFAULT_TEXT);
    });
  }

  // Filters + property grid

  let currentFilter = "Todos";

  function renderFilters() {
    const wrap = document.getElementById("filters");
    wrap.innerHTML = "";
    FILTER_LABELS.forEach((label) => {
      const btn = el("button", "filter-btn", label.toUpperCase());
      btn.type = "button";
      if (label === currentFilter) btn.classList.add("is-active");
      btn.addEventListener("click", () => {
        currentFilter = label;
        renderFilters();
        renderProperties();
      });
      wrap.appendChild(btn);
    });
  }

  function renderProperties() {
    const wrap = document.getElementById("properties");
    wrap.innerHTML = "";
    PROPERTIES.filter((p) => matchesFilter(p, currentFilter)).forEach((p) => {
      const card = el("article", "property-card");
      card.innerHTML = `
        <div class="property-card__media">
          <img src="${p.img}" alt="${p.title}" loading="lazy" />
          <span class="property-card__tag">${p.tag}</span>
        </div>
        <div class="property-card__body">
          <div class="property-card__row">
            <span class="property-card__price">${p.price}</span>
            <span class="property-card__barrio">${p.barrio}</span>
          </div>
          <div class="property-card__title">${p.title}</div>
          <div class="property-card__pills">
            <span class="property-card__pill">${p.amb}</span>
            <span class="property-card__pill">${p.m2}</span>
            <span class="property-card__pill">${p.extra}</span>
          </div>
          <a href="${waLink("Hola Gonzalo! Quiero más información sobre: " + p.title + " (" + p.barrio + ", " + p.price + ").")}" target="_blank" rel="noopener" class="property-card__cta">Pedir info y visita</a>
        </div>`;
      wrap.appendChild(card);
    });
  }

  // Instagram reels

  function renderReels() {
    const wrap = document.getElementById("reels");
    wrap.innerHTML = "";
    REELS.forEach((r) => {
      const a = el("a", "reel");
      a.href = "https://www.instagram.com/gonzalospivak/";
      a.target = "_blank";
      a.rel = "noopener";
      a.innerHTML = `
        <img src="${r.img}" alt="${r.caption}" loading="lazy" />
        <div class="reel__fade"></div>
        <span class="reel__caption">${r.caption}</span>`;
      wrap.appendChild(a);
    });
  }

  // FAQ accordion

  function renderFaq() {
    const wrap = document.getElementById("faq-list");
    wrap.innerHTML = "";
    let openIndex = 0;

    FAQS.forEach((f, i) => {
      const item = el("div", "faq-item");
      item.innerHTML = `
        <button type="button" class="faq-item__q">
          <span>${f.q}</span>
          <span class="faq-item__sign">+</span>
        </button>
        <div class="faq-item__a-wrap"><p class="faq-item__a">${f.a}</p></div>`;
      wrap.appendChild(item);

      item.querySelector(".faq-item__q").addEventListener("click", () => {
        openIndex = openIndex === i ? -1 : i;
        wrap.querySelectorAll(".faq-item").forEach((node, j) => {
          const open = j === openIndex;
          node.classList.toggle("is-open", open);
          node.querySelector(".faq-item__sign").textContent = open ? "–" : "+";
        });
      });
    });

    wrap.children[0].classList.add("is-open");
    wrap.children[0].querySelector(".faq-item__sign").textContent = "–";
  }

  // Tasación form → WhatsApp deep link

  function bindTasacionForm() {
    const form = document.getElementById("tasacionForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const nombre = (data.get("nombre") || "").toString().trim();
      const zona = (data.get("zona") || "").toString().trim();
      const amb = (data.get("amb") || "").toString();
      const tel = (data.get("tel") || "").toString().trim();

      const msg = "Hola Gonzalo! Quiero tasar mi propiedad.\n\n" +
        "Nombre: " + (nombre || "-") +
        "\nDirección o barrio: " + (zona || "-") +
        "\nAmbientes: " + amb +
        "\nMi WhatsApp: " + (tel || "-");

      window.open(waLink(msg), "_blank");
    });
  }

  // Mobile nav

  function bindNavToggle() {
    const toggle = document.getElementById("navToggle");
    const nav = document.getElementById("siteNav");
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Scroll reveal

  function bindReveal() {
    const nodes = Array.from(document.querySelectorAll(".reveal"));
    const show = (n) => n.classList.add("is-visible");
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show(entry.target);
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      nodes.forEach((n) => io.observe(n));
    } else {
      nodes.forEach(show);
    }
    setTimeout(() => nodes.forEach(show), 2200);
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindWaLinks();
    renderFilters();
    renderProperties();
    renderReels();
    renderFaq();
    bindTasacionForm();
    bindNavToggle();
    bindReveal();
  });
})();
