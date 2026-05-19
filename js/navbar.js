/**
 * navbar.js - Original Sivilize Corp Navbar logic
 */

(function () {
  'use strict';

  /**
   * Initializes the scroll listener for navbar background effect.
   */
  function initScrollListener() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    function handleScroll() {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar--scrolled');
      } else {
        navbar.classList.remove('navbar--scrolled');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /**
   * Sets active class on nav links based on current page.
   */
  function initActiveLink() {
    const navLinks = document.querySelectorAll('.navbar__link');
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
      const linkHref = link.getAttribute('href');
      if (linkHref === pageName || (pageName === 'index.html' && linkHref === 'index.html')) {
        link.classList.add('navbar__link--active');
      } else {
        link.classList.remove('navbar__link--active');
      }
    });
  }

  /**
   * Initialize all navbar functionality.
   */
  function init() {
    initScrollListener();
    initActiveLink();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
