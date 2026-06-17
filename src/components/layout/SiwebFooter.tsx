import { SocialLinks } from "./Footer";

export function SiwebFooter() {
  return (
    <footer role="contentinfo" style={{ background: "#051018", padding: "100px 0 60px" }}>
      <div className="container" style={{ maxWidth: 780, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 28, textAlign: "center" }}>
        <img src="/assets/images/logo.svg" alt="Sivilize Corp Logo" style={{ width: 220, maxWidth: "100%", height: "auto" }} />
        <SocialLinks />
        <p style={{ color: "#cbd5e1", fontSize: "1rem", maxWidth: 680, margin: 0, lineHeight: 1.8 }}>
          SiWeb by Sivilize — Layanan Pembuatan Website Profesional & Digitalisasi Taktis untuk Usaha Lokal & UMKM.
        </p>
        <p style={{ color: "#7f8fa4", fontSize: "0.88rem", margin: 0 }}>&copy; 2026 SiWeb by Sivilize. All rights reserved.</p>
      </div>
    </footer>
  );
}
