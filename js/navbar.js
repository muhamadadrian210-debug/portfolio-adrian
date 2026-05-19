/**
 * navbar.js - BMW-style Mega Menu and Navbar logic
 * Sivilize Corp Portfolio
 */

(function () {
  'use strict';

  const menuData = {
    models: {
      title: 'Our Digital Models',
      items: [
        { label: 'Sivilize Hub Pro', link: 'projects.html#hub' },
        { label: 'SiKasir Cloud', link: 'projects.html#kasir' },
        { label: 'OSRM Custom Engine', link: 'projects.html#osrm' },
        { label: 'Firewall Layer 7', link: 'projects.html#firewall' }
      ]
    },
    services: {
      title: 'Professional Services',
      items: [
        { label: 'Fullstack Development', link: 'services.html#web' },
        { label: 'Cybersecurity Audit', link: 'services.html#security' },
        { label: 'Infrastructure Setup', link: 'services.html#infra' },
        { label: 'GIS & Mapping Solutions', link: 'services.html#gis' }
      ]
    },
    discover: {
      title: 'Discover Sivilize Corp',
      items: [
        { label: 'About the Founder', link: 'about.html' },
        { label: 'Our Mission', link: 'about.html#mission' },
        { label: 'Technical Stack', link: 'skills.html' },
        { label: 'Contact Us', link: 'contact.html' }
      ]
    },
    loyalty: {
      title: 'Exclusive Loyalty Program',
      items: [
        { label: 'Partner Benefits', link: '#' },
        { label: 'Early Access', link: '#' },
        { label: 'Community Support', link: '#' }
      ]
    }
  };

  /**
   * Initializes the Mega Menu.
   */
  function initMegaMenu() {
    const navLinks = document.querySelectorAll('.navbar__link[data-mega]');
    const megaMenu = document.getElementById('mega-menu');
    const megaList = document.getElementById('mega-menu-list');
    const megaContent = document.getElementById('mega-menu-content');
    const closeBtn = document.getElementById('mega-menu-close');

    if (!megaMenu || !navLinks.length) return;

    function openMenu(key) {
      const data = menuData[key];
      if (!data) return;

      // Clear previous
      megaList.innerHTML = '';
      megaContent.innerHTML = `<h2 class="mega-menu__content-title">${data.title}</h2>`;

      // Fill sidebar
      data.items.forEach((item, index) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = item.link;
        a.className = 'mega-menu__item-link';
        a.textContent = item.label;
        if (index === 0) a.classList.add('is-active');
        li.appendChild(a);
        megaList.appendChild(li);
      });

      megaMenu.classList.add('is-open');
    }

    function closeMenu() {
      megaMenu.classList.remove('is-open');
    }

    navLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        const key = link.getAttribute('data-mega');
        openMenu(key);
      });
    });

    megaMenu.addEventListener('mouseleave', closeMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    // Prevent closing when moving from link to menu
    let timeout;
    navLinks.forEach(link => {
      link.addEventListener('mouseleave', () => {
        timeout = setTimeout(closeMenu, 100);
      });
    });

    megaMenu.addEventListener('mouseenter', () => {
      clearTimeout(timeout);
    });
  }

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
   * Initialize all navbar functionality.
   */
  function init() {
    initMegaMenu();
    initScrollListener();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
