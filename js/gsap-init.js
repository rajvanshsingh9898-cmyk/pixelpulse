/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   GSAP-INIT.JS — All GSAP Animations
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

document.addEventListener('DOMContentLoaded', () => {

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  /* ── NAV VISIBILITY ── */
  const nav = document.querySelector('.floating-nav');
  // Nav show/hide handled by main.js scroll listener

  /* ── HERO TEXT REVEAL ── */
  const heroLines = document.querySelectorAll('.hero-line');
  heroLines.forEach((line, i) => {
    gsap.from(line, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      delay: 0.7 + i * 0.12,
      ease: 'power3.out'
    });
  });

  /* ── HERO PILL + SUBLINE + CTAS + STATS ── */
  gsap.from('.hero-pill-label', { opacity: 0, y: 20, duration: 0.6, delay: 0.5, ease: 'power3.out' });
  gsap.from('.hero-subline', { opacity: 0, y: 20, duration: 0.6, delay: 1.1, ease: 'power3.out' });
  gsap.from('.hero-ctas', { opacity: 0, y: 20, duration: 0.6, delay: 1.25, ease: 'power3.out' });
  gsap.from('.hero-stats', { opacity: 0, y: 20, duration: 0.6, delay: 1.4, ease: 'power3.out' });

  /* ── HERO BENTO CARDS ── */
  gsap.utils.toArray('.bento-card').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      scale: 0.92,
      y: 24,
      delay: 0.6 + i * 0.12,
      duration: 0.8,
      ease: 'power3.out'
    });
  });

  /* ── AGENCY INTRO ── */
  const agencyIntro = document.getElementById('agency-intro');
  if (agencyIntro) {
    gsap.from('#agency-intro .animate-text > *', {
      opacity: 0,
      y: 32,
      stagger: 0.1,
      duration: 0.7,
      scrollTrigger: { trigger: '#agency-intro', start: 'top 65%' }
    });
  }

  /* ── SERVICES CARDS ── */
  gsap.utils.toArray('.service-card').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 48,
      delay: i * 0.15,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: '#services', start: 'top 70%' }
    });
  });

  /* ── PROCESS STEPS ── */
  const processTeaser = document.getElementById('process-teaser');
  if (processTeaser) {
    gsap.from('.process-step', {
      opacity: 0,
      x: -24,
      stagger: 0.18,
      duration: 0.6,
      scrollTrigger: { trigger: '#process-teaser', start: 'top 65%' }
    });

    gsap.from('.process-line', {
      scaleX: 0,
      transformOrigin: 'left',
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '#process-teaser', start: 'top 60%' }
    });

    // Parallax
    const bg = document.getElementById('process-bg');
    if (bg) {
      gsap.to(bg, {
        y: '15%',
        ease: 'none',
        scrollTrigger: {
          trigger: processTeaser,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  }

  /* ── CASE STUDY ── */
  const caseStudy = document.getElementById('case-study');
  if (caseStudy) {
    gsap.from('#case-study .case-text > *', {
      opacity: 0,
      y: 24,
      stagger: 0.08,
      duration: 0.7,
      scrollTrigger: { trigger: '#case-study', start: 'top 65%' }
    });
    gsap.from('#case-study .case-visual > *', {
      opacity: 0,
      x: 32,
      stagger: 0.12,
      duration: 0.8,
      scrollTrigger: { trigger: '#case-study', start: 'top 60%' }
    });
  }

  /* ── TESTIMONIALS ── */
  gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 36,
      delay: i * 0.14,
      duration: 0.65,
      scrollTrigger: { trigger: '#testimonials', start: 'top 70%' }
    });
  });

  /* ── PRICING CARDS ── */
  gsap.utils.toArray('.pricing-card').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 40,
      delay: i * 0.15,
      duration: 0.7,
      scrollTrigger: { trigger: '#pricing-preview', start: 'top 70%' }
    });
  });

  /* ── BLOG CARDS ── */
  gsap.utils.toArray('.blog-card').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 32,
      delay: i * 0.1,
      duration: 0.6,
      scrollTrigger: { trigger: '#blog-preview', start: 'top 72%' }
    });
  });

  /* ── FINAL CTA ── */
  const finalCta = document.getElementById('final-cta');
  if (finalCta) {
    gsap.from('#final-cta .final-cta-content > *', {
      opacity: 0,
      y: 24,
      stagger: 0.1,
      duration: 0.7,
      scrollTrigger: { trigger: '#final-cta', start: 'top 65%' }
    });
  }

  /* ── GENERIC FADE UP (for inner pages) ── */
  gsap.utils.toArray('.fade-up').forEach(el => {
    gsap.from(el, {
      opacity: 0,
      y: 32,
      duration: 0.7,
      scrollTrigger: { trigger: el, start: 'top 75%' }
    });
  });

  gsap.utils.toArray('.fade-up-stagger').forEach(group => {
    gsap.from(group.children, {
      opacity: 0,
      y: 32,
      stagger: 0.1,
      duration: 0.7,
      scrollTrigger: { trigger: group, start: 'top 75%' }
    });
  });

});
