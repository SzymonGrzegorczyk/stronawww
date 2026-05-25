/* ==========================================================================
   Sprawdzony Ekspert Kredytowy — Wordpress build, vanilla JS
   - sticky nav scroll state + active link tracking
   - mobile menu toggle
   - FAQ accordion
   - form success banner (?sent=1)
   ========================================================================== */
(function () {
  'use strict';

  /* ----- sticky nav + active section ----- */
  const nav = document.querySelector('.sek-nav');
  const sectionIds = ['home', 'services', 'about', 'team', 'calc', 'reviews', 'contact'];
  const navLinks = document.querySelectorAll('[data-sek-nav]');

  function onScroll() {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 30);
    const y = window.scrollY + 200;
    let current = sectionIds[0];
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= y) current = id;
    }
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('data-sek-nav') === current);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ----- smooth scroll for in-page anchors ----- */
  document.querySelectorAll('[data-sek-scroll]').forEach(a => {
    a.addEventListener('click', function (e) {
      const targetId = this.getAttribute('data-sek-scroll');
      const el = document.getElementById(targetId);
      if (!el) return;
      e.preventDefault();
      const top = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top, behavior: 'smooth' });
      closeMobileMenu();
    });
  });

  /* ----- mobile menu ----- */
  const burger = document.querySelector('.sek-nav-burger');
  const mobilePanel = document.querySelector('.sek-nav-mobile');
  function openMobileMenu() {
    burger?.classList.add('is-open');
    mobilePanel?.classList.add('is-open');
    burger?.setAttribute('aria-expanded', 'true');
  }
  function closeMobileMenu() {
    burger?.classList.remove('is-open');
    mobilePanel?.classList.remove('is-open');
    burger?.setAttribute('aria-expanded', 'false');
  }
  burger?.addEventListener('click', function () {
    if (mobilePanel?.classList.contains('is-open')) closeMobileMenu();
    else openMobileMenu();
  });

  /* ----- FAQ accordion ----- */
  document.querySelectorAll('.sek-faq-item').forEach(item => {
    const q = item.querySelector('.sek-faq-q');
    q?.addEventListener('click', function () {
      const isOpen = item.classList.contains('is-open');
      // close all
      document.querySelectorAll('.sek-faq-item.is-open').forEach(el => el.classList.remove('is-open'));
      if (!isOpen) item.classList.add('is-open');
    });
  });
  // open first FAQ by default
  document.querySelector('.sek-faq-item')?.classList.add('is-open');

  /* ----- form success banner (FormSubmit redirects with ?sent=1) ----- */
  if (/[?&]sent=1/.test(window.location.search)) {
    const banner = document.querySelector('.sek-form-success');
    banner?.classList.add('is-visible');
    // clean ?sent=1 from URL
    setTimeout(function () {
      const clean = window.location.pathname + window.location.hash;
      window.history.replaceState({}, '', clean);
    }, 200);
  }

  /* ----- update _next field with current URL for FormSubmit ----- */
  const nextField = document.querySelector('input[name="_next"]');
  if (nextField) {
    const clean = window.location.href.split('#')[0].split('?')[0];
    nextField.value = clean + '?sent=1#contact';
  }

  /* ----- mount calculator widget (tabs) ----- */
  const toolMount = document.getElementById('sek-tool-mount');
  const toolTabs = document.querySelectorAll('.sek-tool-tab');
  const mounters = {
    calc: () => window.mountKKCalculator && window.mountKKCalculator(toolMount),
    pkh:  () => window.mountPkhWidget   && window.mountPkhWidget(toolMount),
    refi: () => window.mountRfWidget    && window.mountRfWidget(toolMount),
  };
  function mountTool(name) {
    if (!toolMount) return;
    // wipe everything (incl. previous widget's id="calc/pkh/refi-root") so each remount is clean
    toolMount.id = 'sek-tool-mount';
    toolMount.innerHTML = '';
    const fn = mounters[name];
    if (fn) fn();
    toolTabs.forEach(t => t.classList.toggle('active', t.dataset.tool === name));
  }
  if (toolMount) {
    mountTool('calc');
    toolTabs.forEach(t => {
      t.addEventListener('click', () => mountTool(t.dataset.tool));
    });
  } else {
    // fallback for single-mount layout (legacy)
    const calcMount = document.getElementById('sek-calc-mount');
    if (calcMount && typeof window.mountKKCalculator === 'function') {
      window.mountKKCalculator(calcMount);
    }
  }
})();
