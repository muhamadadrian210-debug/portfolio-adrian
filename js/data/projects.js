/**
 * projects.js - Projects data and render functions for Muhamad Adrian's portfolio
 */

const projects = [
  {
    id: 'sivilize-hub-pro',
    name: 'Sivilize Hub Pro',
    description: 'Bukan sekadar kalkulator RAB. Ini adalah asisten digital lengkap untuk kontraktor Indonesia. Dari analisis harga satuan (AHSP) hingga manajemen laporan keuangan proyek secara real-time.',
    technologies: ['React', 'Node.js', 'MySQL', 'Vercel'],
    image: 'assets/images/projects/sivilize-hub-pro.png',
    imageAlt: 'Tampilan dashboard Sivilize Hub Pro dengan fitur AHSP Database',
    theme: 'dark',
    accentColor: '#F7931E',
    link: 'https://sivilize-hub-pro.vercel.app',
    featured: true
  },
  {
    id: 'sikasir',
    name: 'SiKasir',
    description: 'Solusi kasir modern untuk UMKM. Ringan, cepat, dan bisa diakses dari perangkat apapun. Kami fokus pada kemudahan penggunaan tanpa mengorbankan keamanan data transaksi Anda.',
    technologies: ['PWA', 'Express.js', 'MySQL', 'Railway'],
    image: 'assets/images/projects/sikasir.png',
    imageAlt: 'Tampilan dashboard SiKasir aplikasi kasir supermarket berbasis PWA',
    theme: 'dark',
    accentColor: '#F7931E',
    link: 'https://sikasir-production.up.railway.app',
    featured: true
  }
];

/**
 * Handles image load error by replacing the img element with a styled placeholder.
 * @param {HTMLImageElement} imgElement - The image element that failed to load
 * @param {Object} project - The project data object
 */
function handleImageError(imgElement, project) {
  const placeholder = document.createElement('div');
  placeholder.className = 'project-card__image-placeholder';
  placeholder.style.backgroundColor = project.accentColor || '#1E3A5F';
  placeholder.setAttribute('aria-label', `Placeholder untuk ${project.name}`);
  placeholder.setAttribute('role', 'img');

  // Add project initials as visual indicator
  const initials = project.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 3);

  placeholder.innerHTML = `
    <span class="project-card__image-placeholder-text">${initials}</span>
  `;

  if (imgElement.parentNode) {
    imgElement.parentNode.replaceChild(placeholder, imgElement);
  }
}

/**
 * Renders a project card as an HTML string.
 * @param {Object} project - The project data object
 * @returns {string} HTML string for the project card
 */
function renderProjectCard(project, index) {
  const techBadges = project.technologies
    .map(tech => `<span class="badge badge--tech">${escapeHtml(tech)}</span>`)
    .join('');

  const projectNumber = (index + 1).toString().padStart(2, '0');

  const linkButton = project.link
    ? `<a href="${escapeHtml(project.link)}" class="btn btn--primary btn--sm" target="_blank" rel="noopener noreferrer">
        Kunjungi Situs →
       </a>`
    : `<button class="btn btn--secondary btn--sm" disabled aria-label="Proyek ${escapeHtml(project.name)} tidak memiliki tautan publik">
        Situs Tidak Tersedia
       </button>`;

  return `
    <article class="project-card card animate-on-scroll" data-project-id="${escapeHtml(project.id)}">
      <div class="project-card__number">${projectNumber}</div>
      <div class="project-card__image-container">
        <img
          src="${escapeHtml(project.image)}"
          alt="${escapeHtml(project.imageAlt)}"
          class="project-card__image"
          loading="lazy"
          onerror="handleImageError(this, projects.find(p => p.id === '${escapeHtml(project.id)}'))"
        />
      </div>
      <div class="project-card__body card__body">
        <h3 class="project-card__title card__title">${escapeHtml(project.name)}</h3>
        <p class="project-card__description card__description">${escapeHtml(project.description)}</p>
        <div class="project-card__tech badge-group">
          ${techBadges}
        </div>
        <div class="project-card__actions">
          ${linkButton}
        </div>
      </div>
    </article>
  `;
}

/**
 * Escapes HTML special characters to prevent XSS.
 * @param {string} str - String to escape
 * @returns {string} Escaped string
 */
function escapeHtml(str) {
  if (typeof str !== 'string') return String(str);
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Export for Node.js / test environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { projects, renderProjectCard, handleImageError, escapeHtml };
}
