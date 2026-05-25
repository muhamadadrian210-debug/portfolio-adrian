// scroll reveal + title scramble (scramble sengaja nggak sentuh services hero — isinya HTML)
(function () {
  'use strict';

  class AnimationController {
    constructor() {
      this.observer = null;
      this.init();
    }

    init() {
      if (!('IntersectionObserver' in window)) {
        this.showAllElements();
        return;
      }

      this.observer = new IntersectionObserver(this.handleIntersection.bind(this), {
        threshold: 0.01,
        rootMargin: '0px 0px 150px 0px'
      });

      document.querySelectorAll('.animate-on-scroll, .fade-in-up, .fade-in').forEach((el) => {
        this.observer.observe(el);
      });
    }

    handleIntersection(entries) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        if (entry.target.classList.contains('fade-in-up') || entry.target.classList.contains('fade-in')) {
          entry.target.style.opacity = '1';
        }
        this.observer.unobserve(entry.target);
      });
    }

    showAllElements() {
      document.querySelectorAll('.animate-on-scroll, .fade-in-up, .fade-in').forEach((el) => {
        el.classList.add('is-visible');
        el.style.opacity = '1';
      });
    }
  }

  class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = '!<>-_\\/[]{}—=+*^?#________';
      this.update = this.update.bind(this);
    }

    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => (this.resolve = resolve));
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }

    update() {
      let output = '';
      let complete = 0;
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];
        if (this.frame >= end) {
          complete++;
          output += to === '\n' ? '<br>' : to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span class="dud">${char}</span>`;
        } else {
          output += from === '\n' ? '<br>' : from;
        }
      }
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }

    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }

  const initAnimations = () => {
    initTextScramble();
    new AnimationController();
  };

  window.initTextScramble = () => {
    const titles = document.querySelectorAll(
      '.hero__title, .about__title, .skills__title, .projects__title, .sec-hero__title, .sim-hero__title, .contact__title'
    );
    titles.forEach((title) => {
      const fx = new TextScramble(title);
      fx.setText(title.innerText);
    });
  };

// System Takeover Transition (Snake/Code Effect)
function triggerTransition(targetId) {
  const overlay = document.querySelector('.page-transition-overlay');
  if (!overlay) return;

  overlay.style.display = 'flex';
  overlay.innerHTML = '<div class="code-rain"></div>';
  
  // Create Snake Segments
  for (let i = 0; i < 10; i++) {
    const segment = document.createElement('div');
    segment.className = 'snake-segment';
    segment.style.animation = `snakeMove 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.05}s forwards`;
    overlay.appendChild(segment);
  }

  // Smooth scroll after animation
  setTimeout(() => {
    const target = document.querySelector(targetId);
    if (target) {
      const headerHeight = document.querySelector('.navbar')?.offsetHeight || 0;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top: targetPosition, behavior: 'auto' });
    }
    
    // Fade out overlay
    overlay.style.transition = 'opacity 0.5s ease';
    overlay.style.opacity = '0';
    
    setTimeout(() => {
      overlay.style.display = 'none';
      overlay.style.opacity = '1';
      overlay.innerHTML = '';
    }, 500);
  }, 1000);
}

// Update navbar clicks to use transition
document.querySelectorAll('.navbar__link, .footer__link, .btn').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#') && href !== '#') {
      e.preventDefault();
      triggerTransition(href);
    }
  });
});

// Initialize other animations
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AnimationController };
  }
})();
