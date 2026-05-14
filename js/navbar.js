/**
 * navbar.js - Navbar logic: active state, hamburger menu, scroll effect
 * Muhamad Adrian Portfolio
 */

(function () {
  'use strict';

  /**
   * Determines the active page based on the current URL pathname.
   * @returns {string} The page identifier (home, about, skills, projects, contact)
   */
  function getActivePage() {
    const pathname = window.location.pathname;
    const filename = pathname.split('/').pop() || 'index.html';

    if (filename === '' || filename === 'index.html') return 'home';
    if (filename === 'about.html') return 'about';
    if (filename === 'skills.html') return 'skills';
    if (filename === 'projects.html') return 'projects';
    if (filename === 'contact.html') return 'contact';

    return 'home';
  }

  /**
   * Sets the active class on the correct navbar link.
   */
  function setActiveNavLink() {
    const activePage = getActivePage();
    const navLinks = document.querySelectorAll('.navbar__link');

    navLinks.forEach(function (link) {
      link.classList.remove('navbar__link--active');
      link.removeAttribute('aria-current');

      if (link.getAttribute('data-page') === activePage) {
        link.classList.add('navbar__link--active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /**
   * Initializes the hamburger menu toggle.
   */
  function initHamburgerMenu() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.navbar__hamburger');
    const navMenu = document.querySelector('.navbar__nav');

    if (!hamburger || !navbar) return;

    hamburger.addEventListener('click', function () {
      const isOpen = navbar.classList.contains('navbar--open');

      if (isOpen) {
        navbar.classList.remove('navbar--open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Buka menu navigasi');
      } else {
        navbar.classList.add('navbar--open');
        hamburger.setAttribute('aria-expanded', 'true');
        hamburger.setAttribute('aria-label', 'Tutup menu navigasi');
      }
    });

    // Close menu when a nav link is clicked (mobile)
    const navLinks = document.querySelectorAll('.navbar__link');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        navbar.classList.remove('navbar--open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Buka menu navigasi');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!navbar.contains(e.target)) {
        navbar.classList.remove('navbar--open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Buka menu navigasi');
      }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navbar.classList.contains('navbar--open')) {
        navbar.classList.remove('navbar--open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Buka menu navigasi');
        hamburger.focus();
      }
    });
  }

  /**
   * Initializes the scroll listener for navbar shadow effect.
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
    // Run once on load
    handleScroll();
  }

  /**
   * Initialize all navbar functionality.
   */
  function init() {
    setActiveNavLink();
    initHamburgerMenu();
    initScrollListener();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export for testing
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { getActivePage, setActiveNavLink };
  }
})();
