// titik glow ngikutin pointer di hero (mouse + touch)
(function () {
  'use strict';

  const hero = document.querySelector('.hero');
  if (!hero) return;

  const glow = document.createElement('div');
  glow.className = 'hero__mouse-glow';
  hero.appendChild(glow);

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    glow.style.transform = `translate(${e.clientX - rect.left}px, ${e.clientY - rect.top}px)`;
  });

  hero.addEventListener(
    'touchmove',
    (e) => {
      const rect = hero.getBoundingClientRect();
      const touch = e.touches[0];
      glow.style.transform = `translate(${touch.clientX - rect.left}px, ${touch.clientY - rect.top}px)`;
    },
    { passive: true }
  );
})();
