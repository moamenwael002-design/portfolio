(() => {
  'use strict';
  const theme = document.querySelector('.mw-theme');
  const button = document.querySelector('.mw-motion');
  if (!theme || !button) return;
  button.addEventListener('click', () => {
    const paused = theme.classList.toggle('mw-paused');
    button.setAttribute('aria-pressed', String(paused));
    button.textContent = paused ? 'Resume motion' : 'Pause motion';
  });
  // Text remains visible without JavaScript, or if motion is reduced.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const elements = Array.from(document.querySelectorAll('.mw-reveal'));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  elements.forEach(element => observer.observe(element));
  document.documentElement.classList.add('mw-animate');
})();
