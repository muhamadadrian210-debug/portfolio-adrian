export function SiwebNavbar() {
  return (
    <header style={{ background: "#000", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "#fff", fontWeight: 700, letterSpacing: 2 }}>
          ← Kembali ke Sivilize Corp
        </a>
      </div>
    </header>
  );
}
