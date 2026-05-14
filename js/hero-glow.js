/**
 * hero-glow.js - Mouse following glow effect for Hero section
 */

(function () {
  'use strict';

  const hero = document.querySelector('.hero');
  if (!hero) return;

  // Create glow element
  const glow = document.createElement('div');
  glow.className = 'hero__mouse-glow';
  hero.appendChild(glow);

  // Update position on mouse move
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    glow.style.transform = `translate(${x}px, ${y}px)`;
  });

  // Handle touch for mobile
  hero.addEventListener('touchmove', (e) => {
    const rect = hero.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    glow.style.transform = `translate(${x}px, ${y}px)`;
  }, { passive: true });

})();
