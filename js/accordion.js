/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ACCORDION.JS — FAQ Toggle
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('summary')?.addEventListener('click', () => {
      // Close others
      document.querySelectorAll('.faq-item').forEach(other => {
        if (other !== item && other.open) {
          other.open = false;
        }
      });
    });
  });
});
