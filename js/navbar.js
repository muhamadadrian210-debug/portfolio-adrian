// navbar — scroll state, active link, mobile menu
(function () {
  'use strict';

  function initScrollListener() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    function handleScroll() {
      navbar.classList.toggle('navbar--scrolled', window.scrollY > 50);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  function initActiveLink() {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar__link').forEach((link) => {
      const href = link.getAttribute('href');
      const match = href === current || (current === 'index.html' && href === 'index.html');
      link.classList.toggle('navbar__link--active', match);
    });
  }

  function initHamburger() {
    const hamburger = document.querySelector('.navbar__hamburger');
    const navbar = document.querySelector('.navbar');
    if (!hamburger || !navbar) return;

    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      navbar.classList.toggle('navbar--open');
    });

    document.addEventListener('click', (e) => {
      if (navbar.classList.contains('navbar--open') && !navbar.contains(e.target)) {
        navbar.classList.remove('navbar--open');
      }
    });

    document.querySelectorAll('.navbar__link').forEach((link) => {
      link.addEventListener('click', () => navbar.classList.remove('navbar--open'));
    });
  }

  function init() {
    initScrollListener();
    initActiveLink();
    initHamburger();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
