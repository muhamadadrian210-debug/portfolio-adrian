/**
 * animations.js - Intersection Observer for scroll animations
 * Muhamad Adrian Portfolio
 */

(function () {
  'use strict';

  /**
   * AnimationController manages scroll-triggered animations
   * using the Intersection Observer API.
   */
  class AnimationController {
    constructor() {
      this.observer = null;
      this.init();
    }

    /**
     * Initialize the Intersection Observer and observe all animated elements.
     */
    init() {
      // Check for IntersectionObserver support
      if (!('IntersectionObserver' in window)) {
        // Fallback: make all elements visible immediately
        this.showAllElements();
        return;
      }

      this.observer = new IntersectionObserver(
        this.handleIntersection.bind(this),
        {
          threshold: 0.01,
          rootMargin: '0px 0px 150px 0px'
        }
      );

      // Observe all elements with animation classes
      document.querySelectorAll('.animate-on-scroll, .fade-in-up, .fade-in').forEach(el => {
        this.observer.observe(el);
      });
    }

    /**
     * Handles intersection events.
     * Adds 'is-visible' class to elements entering the viewport.
     * @param {IntersectionObserverEntry[]} entries
     */
    handleIntersection(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          
          // If it's a fade-in-up or fade-in class, we might need to handle it separately
          // but for now, we'll just let the CSS handle the animation when it becomes visible
          if (entry.target.classList.contains('fade-in-up') || entry.target.classList.contains('fade-in')) {
            entry.target.style.opacity = '1';
          }

          // Stop observing once animation is triggered
          this.observer.unobserve(entry.target);
        }
      });
    }

    /**
     * Fallback: show all animated elements immediately.
     * Used when IntersectionObserver is not supported.
     */
    showAllElements() {
      document.querySelectorAll('.animate-on-scroll, .fade-in-up, .fade-in').forEach(el => {
        el.classList.add('is-visible');
        el.style.opacity = '1';
      });
    }
  }

  /**
   * Text Scramble Effect
   * Mimics "glitchy" or "scrambling" characters before revealing original text
   */
  class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = '!<>-_\\/[]{}—=+*^?#________';
      this.update = this.update.bind(this);
    }
    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => this.resolve = resolve);
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
          // Preserve newlines as <br>
          if (to === '\n') {
            output += '<br>';
          } else {
            output += to;
          }
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span class="dud">${char}</span>`;
        } else {
          // Preserve newlines in the "from" state as well
          if (from === '\n') {
            output += '<br>';
          } else {
            output += from;
          }
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

  /**
   * Initializes all animations.
   */
  const initAnimations = () => {
    // 1. Text Scramble for Main Titles
    initTextScramble();

    // 2. Intersection Observer for Scroll Animations
    new AnimationController();
  };

  /**
   * Global trigger for Text Scramble
   */
  window.initTextScramble = () => {
    const titles = document.querySelectorAll(
      '.hero__title, .about__title, .skills__title, .projects__title, .sec-hero__title, .sim-hero__title, .contact__title'
    );
    titles.forEach(title => {
      const fx = new TextScramble(title);
      fx.setText(title.innerText);
    });
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }

  // Export for testing
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AnimationController };
  }
})();
