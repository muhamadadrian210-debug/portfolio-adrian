export function SiwebNavbar() {
  return (
    <header style={{ background: "#000", borderBottom: "1px solid rgba(255,255,255,0.05)", position: "sticky", top: 0, zIndex: 1000 }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "#fff", fontWeight: 700, letterSpacing: 2 }}>
          SiWeb by Sivilize
        </a>
        <nav style={{ display: "flex", gap: 20 }}>
          <a href="#showcase" style={{ color: "#fff", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600 }}>Showcase Demo</a>
          <a href="#pricing" style={{ color: "#fff", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600 }}>Harga</a>
          <a href="#umkm-gratis" style={{ color: "#fff", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600 }}>Program Gratis</a>
        </nav>
      </div>
    </header>
  );
}
