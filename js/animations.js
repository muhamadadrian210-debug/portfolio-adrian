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

      // Observe all elements with animate-on-scroll class
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
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
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.classList.add('is-visible');
      });
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new AnimationController();
    });
  } else {
    new AnimationController();
  }

  // Export for testing
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AnimationController };
  }
})();
