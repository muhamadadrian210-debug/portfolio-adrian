// footer year + helpers (contrast math dipakai kalau nanti butuh audit warna)
function setCopyrightYear() {
  const el = document.getElementById('copyright-year');
  if (el) el.textContent = String(new Date().getFullYear());
}

/** same-site link: relatif .html, bukan mailto/http/# */
function isInternalLink(href) {
  if (!href || href === '#') return false;
  if (href.startsWith('#')) return false;
  if (href.startsWith('javascript:')) return false;
  if (href.startsWith('mailto:') || href.startsWith('tel:')) return false;
  if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')) return false;
  return true;
}

function getRelativeLuminance(hexColor) {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  const toLinear = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function calculateContrastRatio(foreground, background) {
  const l1 = getRelativeLuminance(foreground);
  const l2 = getRelativeLuminance(background);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { setCopyrightYear, isInternalLink, getRelativeLuminance, calculateContrastRatio };
}
