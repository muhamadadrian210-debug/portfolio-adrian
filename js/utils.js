/**
 * utils.js - Helper functions for portfolio website
 * Muhamad Adrian Portfolio
 */

/**
 * Sets the copyright year in the footer.
 * Finds element with id="copyright-year" and sets its text to the current year.
 */
function setCopyrightYear() {
  const yearEl = document.getElementById('copyright-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/**
 * Determines if a given href is an internal link (same-site navigation).
 * @param {string} href - The href attribute value to check
 * @returns {boolean} True if the link is internal, false otherwise
 */
function isInternalLink(href) {
  if (!href) return false;
  // Exclude empty, hash-only, javascript:, mailto:, tel:, and external URLs
  if (href === '#') return false;
  if (href.startsWith('#')) return false;
  if (href.startsWith('javascript:')) return false;
  if (href.startsWith('mailto:')) return false;
  if (href.startsWith('tel:')) return false;
  if (href.startsWith('http://') || href.startsWith('https://')) return false;
  if (href.startsWith('//')) return false;
  // Relative paths are internal
  return true;
}

/**
 * Calculates the relative luminance of a hex color.
 * Used for WCAG contrast ratio calculation.
 * @param {string} hexColor - Hex color string (e.g., "#FAFAFA" or "FAFAFA")
 * @returns {number} Relative luminance value between 0 and 1
 */
function getRelativeLuminance(hexColor) {
  // Remove # if present
  const hex = hexColor.replace('#', '');

  // Parse RGB components
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // Apply gamma correction
  const toLinear = (c) => {
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };

  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/**
 * Calculates the WCAG contrast ratio between two colors.
 * @param {string} foreground - Foreground hex color (e.g., "#1A1A2E")
 * @param {string} background - Background hex color (e.g., "#FAFAFA")
 * @returns {number} Contrast ratio (1:1 to 21:1)
 */
function calculateContrastRatio(foreground, background) {
  const l1 = getRelativeLuminance(foreground);
  const l2 = getRelativeLuminance(background);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

// Export for use in other modules (Node.js / test environments)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    setCopyrightYear,
    isInternalLink,
    getRelativeLuminance,
    calculateContrastRatio
  };
}
