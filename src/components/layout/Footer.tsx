import type { CSSProperties } from "react";

export const socialStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 56,
  height: 56,
  borderRadius: "50%",
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
  textDecoration: "none",
};

export const iconStyle: CSSProperties = { width: 24, height: 24 };

export function Footer() {
  return (
    <footer role="contentinfo" style={{ background: "#051018", padding: "80px 0 40px" }}>
      <div className="container" style={{ maxWidth: 780, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 24, textAlign: "center" }}>
        <span style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff", letterSpacing: "1px" }}>SiWeb<span style={{ color: "var(--color-primary)" }}>.</span></span>
        <SocialLinks />
        <p style={{ color: "#cbd5e1", fontSize: "0.95rem", maxWidth: 680, margin: 0, lineHeight: 1.8 }}>
          SiWeb by Sivilize | Layanan digitalisasi taktis, pembuatan website instan, dan program gratis khusus pelaku usaha lokal/UMKM.
        </p>
        <p style={{ color: "#7f8fa4", fontSize: "0.85rem", margin: 0 }}>&copy; 2026 SiWeb by Sivilize. All rights reserved.</p>
      </div>
    </footer>
  );
}

export function SocialLinks() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap", justifyContent: "center" }}>
      <a href="https://wa.me/6281338219957" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" style={socialStyle}><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={iconStyle}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.149-.672.149-.198.297-.767.967-.94 1.167-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.474-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.173.198-.297.298-.496.099-.198.05-.372-.025-.52-.075-.149-.672-1.612-.92-2.212-.242-.579-.487-.5-.672-.51l-.573-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347z" /></svg></a>
      <a href="https://www.linkedin.com/in/muhamad-adrian-226785345/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={socialStyle}><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={iconStyle}><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8.5h4V24h-4V8.5zM7.5 8.5h3.75v2.2h.05c.52-.98 1.8-2.02 3.7-2.02 3.96 0 4.7 2.6 4.7 5.98V24h-4V14.7c0-2.2-.04-5-3.05-5-3.05 0-3.52 2.38-3.52 4.84V24h-4V8.5z" /></svg></a>
      <a href="https://www.tiktok.com/@sivilizecorp.id" target="_blank" rel="noopener noreferrer" aria-label="TikTok" style={socialStyle}><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={iconStyle}><path d="M12.51 2.01h-1.5v10.35c0 1.33 1.08 2.41 2.41 2.41.14 0 .27-.01.4-.03v1.67c-.16.03-.33.04-.5.04-2.4 0-4.35-1.95-4.35-4.35V2.01h-1.5v.01c0 2.1 1.7 3.81 3.8 3.95v5.09c0 1.65 1.34 2.99 2.99 2.99 1.74 0 3.15-1.33 3.27-3.03v-7.01h-1.44v.01c-.15.74-.78 1.3-1.53 1.3-1.07 0-1.94-.87-1.94-1.94V2.01z" /></svg></a>
      <a href="mailto:hello@siweb-production.vercel.app" aria-label="Email" style={socialStyle}><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={iconStyle}><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg></a>
    </div>
  );
}
