// skill stack buat halaman skills (array statis)
const skills = [
  { category: 'Frontend', icon: '⚛️', items: ['React', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3', 'JavaScript'] },
  { category: 'Backend', icon: '⚙️', items: ['Node.js', 'Express.js', 'REST API', 'JWT Auth', 'Middleware'] },
  { category: 'Database', icon: '🗄️', items: ['MySQL', 'MongoDB', 'Redis', 'PostgreSQL'] },
  { category: 'Security', icon: '🔐', items: ['Firewall Middleware', 'CSRF Protection', 'Rate Limiting', 'Brute Force Prevention', 'Helmet.js'] },
  { category: 'DevOps & Tools', icon: '🛠️', items: ['Git', 'GitHub', 'Railway', 'Netlify', 'Vercel', 'Docker', 'Linux'] },
  { category: 'PWA & Mobile', icon: '📱', items: ['Progressive Web App', 'Service Worker', 'ZXing Barcode', 'jsPDF', 'Chart.js'] },
  { category: 'OSRM & Geo-Routing', icon: '🛰️', items: ['OSRM (Open Source Routing Machine)', 'Custom LUA Scripting', 'OpenStreetMap (OSM) Data', 'Distance Matrix API', 'GeoJSON & Mapbox'] }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { skills };
}
