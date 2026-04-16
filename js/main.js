/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAIN.JS — Nav, Cursor, Theme, Scroll
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── PRELOADER ── */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    const bar = preloader.querySelector('.preloader-bar');
    if (bar) {
      requestAnimationFrame(() => bar.classList.add('loading'));
    }
    setTimeout(() => {
      preloader.classList.add('fade-out');
      const main = document.getElementById('main-content');
      if (main) main.style.opacity = '1';
      setTimeout(() => { preloader.style.display = 'none'; }, 400);
    }, 600);
  }

  /* ── LAZY LOAD HERO VIDEO ── */
  const heroVideo = document.querySelector('.hero-video');
  if (heroVideo) {
    heroVideo.play().catch(() => {});
  }

  /* ── HERO FRAME SCROLL ANIMATION ── */
  const heroCanvas = document.getElementById('hero-canvas');
  if (heroCanvas) {
    const ctx = heroCanvas.getContext('2d');
    const frameCount = 200;
    const frames = [];
    let loadedCount = 0;
    let currentFrame = 0;

    // Preload all frames
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `./assets/frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
      img.onload = () => {
        loadedCount++;
        // Draw the first frame immediately once loaded
        if (i === 1) drawFrame(0);
      };
      frames.push(img);
    }

    function drawFrame(index) {
      const img = frames[index];
      if (!img || !img.complete || !img.naturalWidth) return;

      const cw = heroCanvas.width;
      const ch = heroCanvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      // Cover fit
      const scale = Math.max(cw / iw, ch / ih);
      const w = iw * scale;
      const h = ih * scale;
      const x = (cw - w) / 2;
      const y = (ch - h) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, x, y, w, h);
    }

    function resizeCanvas() {
      heroCanvas.width = heroCanvas.offsetWidth * (window.devicePixelRatio > 1 ? 1.5 : 1);
      heroCanvas.height = heroCanvas.offsetHeight * (window.devicePixelRatio > 1 ? 1.5 : 1);
      drawFrame(currentFrame);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Scroll-driven frame sequencer
    const heroOuter = document.querySelector('.hero-outer');
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (heroOuter) {
            const rect = heroOuter.getBoundingClientRect();
            const scrolled = -rect.top;
            const total = heroOuter.offsetHeight - window.innerHeight;
            const progress = Math.max(0, Math.min(1, scrolled / total));
            const index = Math.min(frameCount - 1, Math.floor(progress * frameCount));
            if (index !== currentFrame) {
              currentFrame = index;
              drawFrame(currentFrame);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ── FLOATING NAV ── */
  const nav = document.querySelector('.floating-nav');
  if (nav) {
    let lastScroll = 0;
    const showAt = 300;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > showAt) {
        nav.classList.add('visible');
      } else {
        nav.classList.remove('visible');
      }
      lastScroll = y;
    }, { passive: true });

    // Active page
    const path = window.location.pathname.split('/').pop() || 'index.html';
    nav.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  /* ── MOBILE NAV ── */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileOverlay = document.getElementById('mobile-nav-overlay');
  if (hamburger && mobileOverlay) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileOverlay.classList.toggle('open');
      document.body.style.overflow = mobileOverlay.classList.contains('open') ? 'hidden' : '';
    });
    mobileOverlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileOverlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── CUSTOM CURSOR (desktop only) ── */
  if (!('ontouchstart' in window) && window.matchMedia('(hover: hover)').matches) {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX - 4 + 'px';
      dot.style.top = mouseY - 4 + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX - 16) * 0.12;
      ringY += (mouseY - ringY - 16) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    const hoverTargets = 'a, button, [role="button"], input, select, textarea, summary';
    document.addEventListener('mouseover', e => {
      if (e.target.closest(hoverTargets)) {
        document.body.classList.add('cursor-hover');
      }
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest(hoverTargets)) {
        document.body.classList.remove('cursor-hover');
      }
    });
  }

  /* ── CONTACT FORM ── */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;

      contactForm.querySelectorAll('[required]').forEach(field => {
        const error = field.parentElement.querySelector('.form-error');
        if (!field.value.trim()) {
          valid = false;
          if (error) error.classList.add('visible');
          field.style.borderColor = 'var(--error)';
        } else {
          if (error) error.classList.remove('visible');
          field.style.borderColor = '';
        }
      });

      const email = contactForm.querySelector('[type="email"]');
      if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        valid = false;
        const error = email.parentElement.querySelector('.form-error');
        if (error) {
          error.textContent = 'Please enter a valid email address';
          error.classList.add('visible');
        }
        email.style.borderColor = 'var(--error)';
      }

      if (valid) {
        contactForm.style.opacity = '0';
        contactForm.style.transition = 'opacity 300ms';
        setTimeout(() => {
          contactForm.style.display = 'none';
          const success = document.getElementById('contact-success');
          if (success) success.classList.add('visible');
        }, 300);
      }
    });
  }

  /* ── NEWSLETTER FORM ── */
  const nlForm = document.getElementById('newsletter-form');
  if (nlForm) {
    nlForm.addEventListener('submit', e => {
      e.preventDefault();
      const input = nlForm.querySelector('input[type="email"]');
      if (input && input.value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        nlForm.style.display = 'none';
        const success = document.getElementById('newsletter-success');
        if (success) success.classList.add('visible');
      }
    });
  }

  /* ── WORK FILTER TABS ── */
  const filterTabs = document.querySelectorAll('.filter-tab');
  if (filterTabs.length) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const cat = tab.dataset.category;
        document.querySelectorAll('.work-card').forEach(card => {
          if (cat === 'all' || card.dataset.category === cat) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ── BLOG TOC SCROLL SPY ── */
  const tocLinks = document.querySelectorAll('.toc-link');
  if (tocLinks.length) {
    const sections = [];
    tocLinks.forEach(link => {
      const id = link.getAttribute('href')?.replace('#', '');
      if (id) {
        const el = document.getElementById(id);
        if (el) sections.push({ el, link });
      }
    });

    window.addEventListener('scroll', () => {
      let current = sections[0];
      sections.forEach(s => {
        if (s.el.getBoundingClientRect().top <= 120) current = s;
      });
      tocLinks.forEach(l => l.classList.remove('active'));
      if (current) current.link.classList.add('active');
    }, { passive: true });
  }

});
