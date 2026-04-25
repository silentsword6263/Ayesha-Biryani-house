/* ============================================================
   Ayesha Biryani House — main.js
   Vanilla JS: nav, lightbox, scroll fade-ins, form validation
   ============================================================ */

(function () {
  'use strict';

  /* === HEADER SCROLL BEHAVIOUR === */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
        header.classList.remove('site-header--transparent');
      } else {
        header.classList.remove('scrolled');
        if (header.dataset.transparent === 'true') {
          header.classList.add('site-header--transparent');
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* === MOBILE NAVIGATION === */
  const hamburger   = document.querySelector('.nav-hamburger');
  const mobileMenu  = document.querySelector('.nav-mobile');
  const overlay     = document.querySelector('.nav-overlay');
  const closeBtn    = document.querySelector('.nav-close');

  function openMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('open');
    overlay && overlay.classList.add('open');
    hamburger && hamburger.classList.add('active');
    hamburger && hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn && closeBtn.focus();
  }

  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    overlay && overlay.classList.remove('open');
    hamburger && hamburger.classList.remove('active');
    hamburger && hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    hamburger && hamburger.focus();
  }

  hamburger  && hamburger.addEventListener('click', openMenu);
  closeBtn   && closeBtn.addEventListener('click', closeMenu);
  overlay    && overlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  /* === SCROLL FADE-IN (Intersection Observer) === */
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    fadeEls.forEach((el) => io.observe(el));
  } else {
    fadeEls.forEach((el) => el.classList.add('visible'));
  }

  /* === GALLERY LIGHTBOX === */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox     = document.querySelector('.lightbox');
  const lightboxImg  = document.querySelector('.lightbox-img');
  const lbClose      = document.querySelector('.lightbox-close');
  const lbPrev       = document.querySelector('.lightbox-prev');
  const lbNext       = document.querySelector('.lightbox-next');

  if (galleryItems.length && lightbox) {
    let currentIdx = 0;
    const images = Array.from(galleryItems).map((item) => ({
      src: item.querySelector('img').src,
      alt: item.querySelector('img').alt,
    }));

    function openLightbox(idx) {
      currentIdx = idx;
      const img = images[currentIdx];
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      lbClose && lbClose.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      galleryItems[currentIdx] && galleryItems[currentIdx].focus();
    }

    function navigate(dir) {
      currentIdx = (currentIdx + dir + images.length) % images.length;
      lightboxImg.src = images[currentIdx].src;
      lightboxImg.alt = images[currentIdx].alt;
    }

    galleryItems.forEach((item, idx) => {
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      item.setAttribute('aria-label', `View photo ${idx + 1}`);
      item.addEventListener('click', () => openLightbox(idx));
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(idx);
        }
      });
    });

    lbClose && lbClose.addEventListener('click', closeLightbox);
    lbPrev  && lbPrev.addEventListener('click',  () => navigate(-1));
    lbNext  && lbNext.addEventListener('click',  () => navigate(1));

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowLeft')  navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    });
  }

  /* === CONTACT FORM VALIDATION === */
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      let valid = true;

      const fields = [
        { id: 'name',    rule: (v) => v.trim().length >= 2 },
        { id: 'phone',   rule: (v) => /^[0-9\s\+\-()]{7,15}$/.test(v.trim()) },
        { id: 'message', rule: (v) => v.trim().length >= 10 },
      ];

      fields.forEach(({ id, rule }) => {
        const input = contactForm.querySelector(`#${id}`);
        const group = input && input.closest('.form-group');
        if (!input || !group) return;
        if (!rule(input.value)) {
          group.classList.add('has-error');
          valid = false;
        } else {
          group.classList.remove('has-error');
        }
      });

      if (!valid) {
        e.preventDefault();
        const firstError = contactForm.querySelector('.form-group.has-error input, .form-group.has-error textarea');
        firstError && firstError.focus();
      }
    });

    contactForm.querySelectorAll('.form-input, .form-textarea').forEach((input) => {
      input.addEventListener('input', () => {
        input.closest('.form-group') && input.closest('.form-group').classList.remove('has-error');
      });
    });
  }

  /* === REVIEWS CAROUSEL (Home page — simple CSS-scroll-snap) === */
  /* No JS needed — handled via CSS scroll-snap. */

  /* === SECTION-HEADER UNDERLINE TRIGGER === */
  const sectionHeaders = document.querySelectorAll('.section-header');
  if (sectionHeaders.length && 'IntersectionObserver' in window) {
    const shIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          shIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    sectionHeaders.forEach((el) => shIO.observe(el));
  }

  /* === SLIDE-LEFT / SLIDE-RIGHT / SCALE-IN OBSERVERS === */
  const motionEls = document.querySelectorAll('.slide-left, .slide-right, .scale-in');
  if (motionEls.length && 'IntersectionObserver' in window) {
    const mio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          mio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    motionEls.forEach((el) => mio.observe(el));
  }

  /* === HEADING UNDERLINE OBSERVER === */
  const huEls = document.querySelectorAll('.heading-underline');
  if (huEls.length && 'IntersectionObserver' in window) {
    const huIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); huIO.unobserve(e.target); }
      });
    }, { threshold: 0.3 });
    huEls.forEach((el) => huIO.observe(el));
  }

  /* === COUNTER ANIMATION === */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1600;
    const step = target / (duration / 16);
    let current = 0;
    const tick = () => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current).toLocaleString('en-IN');
      if (current < target) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  const counters = document.querySelectorAll('[data-target]');
  if (counters.length && 'IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach((el) => cio.observe(el));
  }

  /* === RIPPLE EFFECT ON BUTTONS === */
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size/2}px;top:${e.clientY - rect.top - size/2}px`;
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  /* === LUCIDE ICONS (initialise after DOM) === */
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

})();
