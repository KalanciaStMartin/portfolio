(function () {
  "use strict";

  const root = document.documentElement;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------- Thème clair / sombre ---------- */
  const themeBtn = $("#themeToggle");
  themeBtn.addEventListener("click", () => {
    const current =
      root.getAttribute("data-theme") ||
      (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    const next = current === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  /* ---------- Navigation : fond au scroll + menu mobile ---------- */
  const nav = $("#nav");
  const burger = $("#burger");
  const links = $("#navLinks");

  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const closeMenu = () => {
    links.classList.remove("is-open");
    nav.classList.remove("menu-open");
    burger.setAttribute("aria-expanded", "false");
  };
  burger.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    nav.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", String(open));
  });
  $$("a", links).forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => e.key === "Escape" && closeMenu());

  /* ---------- Lien actif selon la section visible ---------- */
  const sections = $$("main section[id]");
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        $$("a", links).forEach((a) =>
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id)
        );
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  /* ---------- Apparition au défilement ---------- */
  const revealer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  $$(".reveal").forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 70 + "ms";
    revealer.observe(el);
  });

  /* ---------- Effet machine à écrire ---------- */
  // ✏️ Modifiez les mots qui défilent dans le titre
  const words = ["innovantes", "fiables", "créatives", "sécurisées"];
  const typed = $("#typed");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (typed && !reduce) {
    let w = 0, c = words[0].length, deleting = true;
    const tick = () => {
      const word = words[w];
      typed.textContent = word.slice(0, c);
      let delay = deleting ? 60 : 110;
      if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; delay = 300; }
      else if (!deleting && c === words[w].length) { deleting = true; delay = 2000; }
      c += deleting ? -1 : 1;
      setTimeout(tick, delay);
    };
    setTimeout(tick, 2200);
  }

  /* ---------- Compteurs animés ---------- */
  const counter = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = +el.dataset.count;
        const start = performance.now();
        const dur = reduce ? 0 : 1400;
        const step = (t) => {
          const p = dur ? Math.min((t - start) / dur, 1) : 1;
          el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        counter.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );
  $$("[data-count]").forEach((el) => counter.observe(el));

  /* ---------- Filtres de projets ---------- */
  const filters = $$(".filter");
  const projects = $$(".project");
  filters.forEach((btn) =>
    btn.addEventListener("click", () => {
      filters.forEach((b) => b.classList.toggle("is-active", b === btn));
      const f = btn.dataset.filter;
      projects.forEach((p) => {
        const show = f === "all" || p.dataset.category === f;
        p.classList.toggle("is-hidden", !show);
        if (show) p.classList.add("is-visible");
      });
    })
  );

  /* ---------- Formulaire (Formspree, envoi sans rechargement) ---------- */
  const form = $("#contactForm");
  const status = $("#formStatus");
  form.addEventListener("submit", async (e) => {
    if (form.action.includes("VOTRE_ID")) {
      e.preventDefault();
      status.className = "form__status err";
      status.textContent = "Formulaire non configuré : ajoutez votre ID Formspree dans index.html.";
      return;
    }
    e.preventDefault();
    const btn = $("button[type=submit]", form);
    btn.disabled = true;
    status.className = "form__status";
    status.textContent = "Envoi en cours…";
    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error();
      form.reset();
      status.className = "form__status ok";
      status.textContent = "Merci ! Votre message a bien été envoyé.";
    } catch {
      status.className = "form__status err";
      status.textContent = "Oups, une erreur est survenue. Écrivez-moi directement par e-mail.";
    } finally {
      btn.disabled = false;
    }
  });

  /* ---------- Année du footer ---------- */
  $("#year").textContent = new Date().getFullYear();
})();
