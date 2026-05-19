// transisi halaman: fade cepet biar nggak kerasa "nunggu loading"
(function () {
  'use strict';

  class PageNavigation {
    constructor() {
      this.duration = 150; // Durasi sangat cepat (0.15 detik) biar nggak kerasa nunggu
    }

    init() {
      document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        
        // Cek apakah link internal
        if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('//') && !href.startsWith('javascript:')) {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Efek Fade Out Halus
            document.body.style.transition = `opacity ${this.duration}ms ease-in-out, transform ${this.duration}ms ease-in-out`;
            document.body.style.opacity = '0';
            document.body.style.transform = 'scale(0.98)'; // Sedikit mengecil biar elegan
            
            setTimeout(() => {
              window.location.href = href;
            }, this.duration);
          });
        }
      });

      // Efek Fade In saat halaman baru dimuat
      window.addEventListener('pageshow', () => {
        document.body.style.opacity = '0';
        document.body.style.transform = 'scale(1.02)'; // Mulai dari sedikit lebih besar
        
        requestAnimationFrame(() => {
          document.body.style.transition = `opacity ${this.duration}ms ease-out, transform ${this.duration}ms ease-out`;
          document.body.style.opacity = '1';
          document.body.style.transform = 'scale(1)';
        });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new PageNavigation().init());
  } else {
    new PageNavigation().init();
  }
})();
