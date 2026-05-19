// data proyek + helper render kartu
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

// kalau gambar proyek gagal load, ganti placeholder inisial
function handleImageError(imgElement, project) {
  const placeholder = document.createElement('div');
  placeholder.className = 'project-card__image-placeholder';
  placeholder.style.backgroundColor = '#fafafa';
  placeholder.style.width = '100%';
  placeholder.style.height = '100%';
  placeholder.style.display = 'flex';
  placeholder.style.alignItems = 'center';
  placeholder.style.justifyContent = 'center';
  placeholder.setAttribute('aria-label', `Placeholder untuk ${project.name}`);
  placeholder.setAttribute('role', 'img');

  const initials = project.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 3);

  placeholder.innerHTML = `
    <span style="font-family: var(--font-sans); font-weight: 700; color: #ccc; font-size: 48px;">${initials}</span>
  `;

  if (imgElement.parentNode) {
    imgElement.parentNode.replaceChild(placeholder, imgElement);
  }
}

// return string HTML satu kartu (dipakai innerHTML di projects.html)
function renderProjectCard(project, index) {
  const linkButton = project.link
    ? `<a href="${escapeHtml(project.link)}" class="project-card__link" target="_blank" rel="noopener noreferrer">
        LEARN MORE
       </a>`
    : `<span class="project-card__link" style="opacity: 0.5; cursor: not-allowed;">
        COMING SOON
       </span>`;

  return `
    <article class="project-card animate-on-scroll" data-project-id="${escapeHtml(project.id)}">
      <div class="project-card__image-plate">
        <img
          src="${escapeHtml(project.image)}"
          alt="${escapeHtml(project.imageAlt)}"
          class="project-card__image"
          loading="lazy"
          onerror="handleImageError(this, projects.find(p => p.id === '${escapeHtml(project.id)}'))"
        />
      </div>
      <div class="project-card__content">
        <h3 class="project-card__title">${escapeHtml(project.name)}</h3>
        <p class="project-card__text">${escapeHtml(project.description)}</p>
        ${linkButton}
      </div>
    </article>
  `;
}

function escapeHtml(str) {
  if (typeof str !== 'string') return String(str);
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { projects, renderProjectCard, handleImageError, escapeHtml };
}
