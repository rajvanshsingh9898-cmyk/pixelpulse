/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   COUNTER.JS — Animated Number Counters
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

document.addEventListener('DOMContentLoaded', () => {

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const counters = document.querySelectorAll('[data-target]');
  if (!counters.length) return;

  counters.forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    let counted = false;

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        if (counted) return;
        counted = true;

        const duration = 1400;
        const startTime = performance.now();

        function update(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Cubic ease-out
          const ease = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(ease * target);
          el.textContent = current + suffix;
          if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
      }
    });
  });
});
