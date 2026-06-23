"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SiteEffects } from "@/components/runtime/SiteEffects";

const BUDGET_PRESETS = [
  { value: "800000", label: "Rp 800.000", desc: "Landing Page Kilat" },
  { value: "1500000", label: "Rp 1.500.000", desc: "Landing Page Premium" },
  { value: "3000000", label: "Rp 3.000.000", desc: "Profil Usaha Standar" },
  { value: "5000000", label: "Rp 5.000.000", desc: "Profil Usaha Premium" },
  { value: "10000000", label: "Rp 10.000.000", desc: "Katalog & Sistem Ritel" },
  { value: "20000000", label: "Rp 20.000.000", desc: "Sistem Bisnis Kustom" },
  { value: "custom", label: "Custom Budget", desc: "Sesuai Kebutuhan" },
];

const BUSINESS_TYPES = [
  { value: "cafe", label: "Cafe & Resto", icon: "☕" },
  { value: "clinic", label: "Klinik / Rumah Sakit", icon: "🏥" },
  { value: "barbershop", label: "Barbershop", icon: "💈" },
  { value: "laundry", label: "Jasa Laundry", icon: "🧺" },
  { value: "workshop", label: "Bengkel & Otomotif", icon: "🔧" },
  { value: "company", label: "Company Profile", icon: "🏢" },
  { value: "other", label: "Jenis Usaha Lainnya", icon: "⭐" },
];

export default function WebsitePreviewPage() {
  const [businessName, setBusinessName] = useState("");
  const [businessDesc, setBusinessDesc] = useState("");
  const [location, setLocation] = useState("");
  const [businessType, setBusinessType] = useState("cafe");
  const [budget, setBudget] = useState("1500000");
  const [customBudget, setCustomBudget] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Menganalisis kebutuhan bisnis...");
  const [concept, setConcept] = useState<any | null>(null);
  const [error, setError] = useState("");

  // Loading text animator
  useEffect(() => {
    if (!loading) return;
    const texts = [
      "Menganalisis kebutuhan bisnis...",
      "Menyiapkan konsep website...",
      "Menyesuaikan dengan budget...",
      "Menyusun palet warna yang pas...",
      "Merancang tata letak (layout) responsif...",
      "Menyusun salinan copywriting spesifik..."
    ];
    let idx = 0;
    const timer = setInterval(() => {
      idx = (idx + 1) % texts.length;
      setLoadingText(texts[idx]);
    }, 2000);
    return () => clearInterval(timer);
  }, [loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setConcept(null);

    try {
      const response = await fetch("/api/website-preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          businessDesc,
          location,
          businessType,
          budget,
          customBudget: budget === "custom" ? customBudget : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal menghubungkan ke server.");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setConcept(data);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan koneksi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper" style={{ background: "#020204", color: "#fff", minHeight: "100vh" }}>
      <Navbar />
      
      <main id="main-content" style={{ paddingTop: "120px", paddingBottom: "80px" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", paddingInline: "20px" }}>
          
          {/* HEADER */}
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span style={{ color: "var(--color-primary)", textTransform: "uppercase", letterSpacing: "4px", fontSize: "0.85rem", fontWeight: 700 }}>
              Konsep Instan & Transparan
            </span>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, marginTop: "0.5rem", marginBottom: "1rem", letterSpacing: "-1px", textTransform: "uppercase" }}>
              Website Preview + Budget Estimator
            </h1>
            <p style={{ color: "var(--color-body)", maxWidth: "720px", margin: "0 auto", fontSize: "1.1rem", lineHeight: 1.7 }}>
              Ketik kebutuhan bisnis Anda, pilih budget, lalu lihat simulasi konsep website realistis yang dirancang khusus untuk industri Anda. Tanpa kompromi, tanpa template AI generik yang membosankan.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "40px", alignItems: "start" }} className="siweb-about-grid">
            
            {/* INPUT FORM PANEL */}
            <section className="siweb-card" style={{ background: "rgba(255,255,255,0.01)", padding: "32px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "12px" }}>
                1. ANALISIS KEBUTUHAN BISNIS
              </h2>
              
              <form onSubmit={handleSubmit} style={{ display: "grid", gap: "24px" }}>
                
                <div>
                  <label htmlFor="name" style={{ display: "block", color: "#f8fafc", fontWeight: 600, fontSize: "0.95rem", marginBottom: "8px" }}>Nama Bisnis / Toko / Brand</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Contoh: Kopi Senja, Klinik Amanda, Barbershop Bold"
                    className="siweb-form-input"
                    style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "#fff", width: "100%", outline: "none", transition: "all 0.3s" }}
                  />
                </div>

                <div>
                  <label htmlFor="location" style={{ display: "block", color: "#f8fafc", fontWeight: 600, fontSize: "0.95rem", marginBottom: "8px" }}>Lokasi Usaha (Kota/Kecamatan)</label>
                  <input
                    id="location"
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Contoh: Kupang Barat, Fatululi, Oebobo"
                    className="siweb-form-input"
                    style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "#fff", width: "100%", outline: "none", transition: "all 0.3s" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", color: "#f8fafc", fontWeight: 600, fontSize: "0.95rem", marginBottom: "12px" }}>Kategori Jenis Bisnis</label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "10px" }}>
                    {BUSINESS_TYPES.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setBusinessType(type.value)}
                        style={{
                          padding: "12px",
                          borderRadius: "8px",
                          border: `1px solid ${businessType === type.value ? "var(--color-primary)" : "rgba(255,255,255,0.06)"}`,
                          background: businessType === type.value ? "rgba(79, 70, 229, 0.15)" : "rgba(255,255,255,0.01)",
                          color: "#fff",
                          textAlign: "center",
                          cursor: "pointer",
                          transition: "all 0.3s",
                        }}
                      >
                        <span style={{ fontSize: "1.4rem", display: "block", marginBottom: "4px" }}>{type.icon}</span>
                        <span style={{ fontSize: "0.82rem", fontWeight: 600 }}>{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="desc" style={{ display: "block", color: "#f8fafc", fontWeight: 600, fontSize: "0.95rem", marginBottom: "8px" }}>Deskripsi Singkat & Apa yang Dijual/Ditawarkan</label>
                  <textarea
                    id="desc"
                    required
                    rows={3}
                    value={businessDesc}
                    onChange={(e) => setBusinessDesc(e.target.value)}
                    placeholder="Contoh: Kami menjual kopi susu aren, roti bakar, dan camilan kentang goreng. Menyediakan tempat WFC yang nyaman dengan wifi kencang dan live music."
                    className="siweb-form-input"
                    style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "#fff", width: "100%", outline: "none", resize: "none", transition: "all 0.3s" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", color: "#f8fafc", fontWeight: 600, fontSize: "0.95rem", marginBottom: "12px" }}>Pilih Estimasi Target Budget Usaha Anda</label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "10px" }}>
                    {BUDGET_PRESETS.map((preset) => (
                      <button
                        key={preset.value}
                        type="button"
                        onClick={() => setBudget(preset.value)}
                        style={{
                          padding: "12px",
                          borderRadius: "8px",
                          border: `1px solid ${budget === preset.value ? "var(--color-primary)" : "rgba(255,255,255,0.06)"}`,
                          background: budget === preset.value ? "rgba(79, 70, 229, 0.15)" : "rgba(255,255,255,0.01)",
                          color: "#fff",
                          textAlign: "left",
                          cursor: "pointer",
                          transition: "all 0.3s",
                        }}
                      >
                        <span style={{ fontSize: "0.9rem", fontWeight: 700, display: "block" }}>{preset.label}</span>
                        <span style={{ fontSize: "0.75rem", color: "var(--color-body)" }}>{preset.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {budget === "custom" && (
                  <div>
                    <label htmlFor="custom-budget" style={{ display: "block", color: "#f8fafc", fontWeight: 600, fontSize: "0.95rem", marginBottom: "8px" }}>Masukkan Budget Kustom Anda (Rupiah)</label>
                    <input
                      id="custom-budget"
                      type="number"
                      required
                      value={customBudget}
                      onChange={(e) => setCustomBudget(e.target.value)}
                      placeholder="Contoh: 4500000"
                      className="siweb-form-input"
                      style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "#fff", width: "100%", outline: "none" }}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="siweb-btn siweb-btn-primary"
                  style={{ width: "100%", padding: "18px 0", cursor: "pointer", opacity: loading ? 0.7 : 1, transition: "all 0.3s" }}
                >
                  {loading ? "MENGANALISIS DATA..." : "LIHAT PREVIEW WEBSITE"}
                </button>
                
              </form>
            </section>

            {/* PREVIEW WINDOW & BREAKDOWN */}
            <section style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
              
              {/* LOADING STATE */}
              {loading && (
                <div style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "12px",
                  padding: "60px 20px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "24px"
                }}>
                  <div style={{
                    width: "48px",
                    height: "48px",
                    border: "3px solid rgba(79, 70, 229, 0.2)",
                    borderTopColor: "var(--color-primary)",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite"
                  }} />
                  <style jsx global>{`
                    @keyframes spin {
                      to { transform: rotate(360deg); }
                    }
                  `}</style>
                  <p style={{ color: "#fff", fontWeight: 600, fontSize: "1.1rem" }}>{loadingText}</p>
                  <p style={{ color: "var(--color-body)", fontSize: "0.85rem" }}>Sistem sedang merakit konsep visual yang paling relevan untuk jenis usaha Anda.</p>
                </div>
              )}

              {/* ERROR STATE */}
              {error && (
                <div style={{
                  background: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                  borderRadius: "12px",
                  padding: "24px",
                  color: "#fca5a5"
                }}>
                  <p style={{ fontWeight: 700, marginBottom: "8px" }}>⚠️ Terjadi Kendala</p>
                  <p style={{ fontSize: "0.9rem", lineHeight: 1.5 }}>{error}</p>
                </div>
              )}

              {/* WELCOME / IDLE STATE */}
              {!loading && !concept && !error && (
                <div style={{
                  background: "rgba(255,255,255,0.01)",
                  border: "1px solid rgba(255,255,255,0.04)",
                  borderRadius: "12px",
                  padding: "80px 30px",
                  textAlign: "center",
                  color: "var(--color-body)"
                }}>
                  <span style={{ fontSize: "3rem", display: "block", marginBottom: "16px" }}>💻</span>
                  <h3 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: 700, marginBottom: "8px" }}>Belum Ada Preview Terpasang</h3>
                  <p style={{ fontSize: "0.95rem", maxWidth: "420px", margin: "0 auto", lineHeight: 1.6 }}>
                    Silakan isi form di sebelah kiri untuk melihat simulasi visual halaman website Anda secara langsung di sini.
                  </p>
                </div>
              )}

              {/* DYNAMIC WEBSITE VISUAL PREVIEW */}
              {concept && (
                <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                  
                  {/* Browser Window Mockup Wrapper */}
                  <div style={{
                    background: "rgba(15, 23, 42, 0.6)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                  }}>
                    
                    {/* Browser Toolbar Controls */}
                    <div style={{
                      background: "rgba(0, 0, 0, 0.4)",
                      padding: "12px 18px",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.06)"
                    }}>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
                        <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#eab308", display: "inline-block" }} />
                        <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                      </div>
                      
                      {/* Search Bar mockup */}
                      <div style={{
                        flex: 1,
                        background: "rgba(255,255,255,0.04)",
                        borderRadius: "6px",
                        fontSize: "0.75rem",
                        color: "rgba(255,255,255,0.4)",
                        padding: "4px 12px",
                        textAlign: "center",
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.5px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      }}>
                        https://{concept.websiteName.toLowerCase().replace(/[^a-z0-9]/g, "") || "website-bisnis"}.siweb.id
                      </div>
                    </div>

                    {/* LIVE VIEWPORT INNER */}
                    <div style={{
                      background: concept.colorPalette.background || "#0b0f19",
                      color: concept.colorPalette.text || "#f8fafc",
                      padding: "30px 24px",
                      fontFamily: concept.typographyStyle.includes("Serif") ? "Georgia, serif" : "var(--font-sans)",
                      position: "relative"
                    }}>
                      
                      {/* Concept Tag Header */}
                      <div style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        fontSize: "0.65rem",
                        background: concept.colorPalette.accent,
                        color: "#fff",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        fontWeight: 700,
                        letterSpacing: "1px",
                        textTransform: "uppercase"
                      }}>
                        KONSEP PREVIEW
                      </div>

                      {/* Header Navbar Mockup */}
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: `1px solid rgba(255,255,255,0.08)`,
                        paddingBottom: "15px",
                        marginBottom: "30px"
                      }}>
                        <div style={{ fontWeight: 800, fontSize: "1.1rem", color: concept.colorPalette.primary }}>
                          {concept.websiteName}
                        </div>
                        
                        {/* Navlinks Mockup for high budgets */}
                        {parseInt(budget) >= 3000000 && (
                          <div style={{ display: "flex", gap: "15px", fontSize: "0.75rem", fontWeight: 600, opacity: 0.8 }}>
                            <span>Beranda</span>
                            <span>Layanan</span>
                            <span>Tentang Kami</span>
                            <span>Kontak</span>
                          </div>
                        )}
                      </div>

                      {/* HERO SECTION RENDERING */}
                      <div style={{ marginBottom: "40px", textAlign: "left" }}>
                        <h3 style={{
                          color: concept.colorPalette.primary,
                          fontSize: "clamp(1.4rem, 4vw, 2.2rem)",
                          fontWeight: 800,
                          lineHeight: 1.15,
                          marginBottom: "12px",
                          textTransform: "none",
                          textShadow: "none"
                        }}>
                          {concept.hero.headline}
                        </h3>
                        <p style={{
                          color: concept.colorPalette.text,
                          opacity: 0.8,
                          fontSize: "0.95rem",
                          lineHeight: 1.6,
                          marginBottom: "20px",
                          maxWidth: "600px",
                          textShadow: "none"
                        }}>
                          {concept.hero.subheadline}
                        </p>
                        <button style={{
                          background: concept.colorPalette.primary,
                          color: "#fff",
                          border: "none",
                          padding: "10px 20px",
                          borderRadius: "4px",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          letterSpacing: "1px",
                          cursor: "default"
                        }}>
                          {concept.hero.cta}
                        </button>
                      </div>

                      {/* ABOUT SECTION RENDERING */}
                      <div style={{
                        background: "rgba(255,255,255,0.02)",
                        border: `1px solid rgba(255,255,255,0.04)`,
                        borderRadius: "8px",
                        padding: "20px",
                        marginBottom: "40px"
                      }}>
                        <h4 style={{
                          color: concept.colorPalette.accent,
                          fontSize: "1rem",
                          fontWeight: 700,
                          marginBottom: "8px",
                          textTransform: "uppercase"
                        }}>
                          {concept.about.title}
                        </h4>
                        <p style={{
                          color: concept.colorPalette.text,
                          opacity: 0.8,
                          fontSize: "0.88rem",
                          lineHeight: 1.6,
                          margin: 0,
                          textShadow: "none"
                        }}>
                          {concept.about.body}
                        </p>
                      </div>

                      {/* DYNAMIC SECTIONS RENDERING */}
                      <div style={{ display: "grid", gap: "30px" }}>
                        {concept.sections.map((sect: any, idx: number) => (
                          <div key={idx} style={{ borderTop: `1px solid rgba(255,255,255,0.05)`, paddingTop: "20px" }}>
                            <h4 style={{ color: concept.colorPalette.primary, fontSize: "1.1rem", fontWeight: 700, marginBottom: "4px", textTransform: "none" }}>
                              {sect.title}
                            </h4>
                            <p style={{ color: concept.colorPalette.text, opacity: 0.6, fontSize: "0.8rem", marginBottom: "15px", textShadow: "none" }}>
                              {sect.description}
                            </p>
                            
                            {/* Service Grid Layout */}
                            {sect.type === "service-grid" && (
                              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px" }}>
                                {sect.items.map((item: string, i: number) => {
                                  const parts = item.split(" - ");
                                  return (
                                    <div key={i} style={{ padding: "12px", background: "rgba(255,255,255,0.01)", border: `1px solid rgba(255,255,255,0.03)`, borderRadius: "6px" }}>
                                      <div style={{ fontWeight: 700, fontSize: "0.85rem", color: concept.colorPalette.accent }}>{parts[0]}</div>
                                      {parts[1] && <div style={{ fontSize: "0.78rem", opacity: 0.8, marginTop: "4px" }}>{parts[1]}</div>}
                                    </div>
                                  );
                                })}
                              </div>
                            )}

                            {/* Editorial or Testimonial List Layout */}
                            {sect.type !== "service-grid" && (
                              <ul style={{ display: "flex", flexDirection: "column", gap: "10px", padding: 0, margin: 0, listStyle: "none" }}>
                                {sect.items.map((item: string, i: number) => (
                                  <li key={i} style={{ display: "flex", gap: "10px", alignItems: "start", fontSize: "0.82rem" }}>
                                    <span style={{ color: concept.colorPalette.accent, fontWeight: 900 }}>•</span>
                                    <span style={{ opacity: 0.9 }}>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            )}

                          </div>
                        ))}
                      </div>

                      {/* Mock Image Placeholder Section */}
                      <div style={{ borderTop: `1px solid rgba(255,255,255,0.05)`, paddingTop: "25px", marginTop: "30px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                          {["Visual Halaman Utama", "Katalog Detail", "Kontak Resmi"].map((label, idx) => (
                            <div
                              key={idx}
                              style={{
                                height: "70px",
                                background: `linear-gradient(135deg, ${concept.colorPalette.primary}22, ${concept.colorPalette.secondary}11)`,
                                border: `1px dashed ${concept.colorPalette.primary}44`,
                                borderRadius: "6px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                color: concept.colorPalette.primary,
                                fontSize: "0.65rem",
                                fontWeight: 700,
                                textAlign: "center",
                                padding: "4px"
                              }}
                            >
                              <span>🖼️</span>
                              <span style={{ marginTop: "4px", opacity: 0.9 }}>{label}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* CONCEPT BREAKDOWN & BUDGET ESTIMATOR */}
                  <div className="siweb-card" style={{ background: "rgba(255,255,255,0.01)", padding: "32px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--color-primary)", marginBottom: "1rem", textTransform: "uppercase" }}>
                      Analisis Rencana Paket & Rincian Budget
                    </h3>
                    
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }} className="siweb-split-grid">
                      <div>
                        <div style={{ fontSize: "0.8rem", color: "var(--color-body)", textTransform: "uppercase", letterSpacing: "1px" }}>Rekomendasi Paket</div>
                        <div style={{ fontSize: "1.15rem", fontWeight: 700, color: "#fff", marginTop: "4px" }}>{concept.recommendedPackage}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: "0.8rem", color: "var(--color-body)", textTransform: "uppercase", letterSpacing: "1px" }}>Estimasi Pengerjaan</div>
                        <div style={{ fontSize: "1.15rem", fontWeight: 700, color: "#fff", marginTop: "4px" }}>{concept.estimatedTimeline}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: "0.8rem", color: "var(--color-body)", textTransform: "uppercase", letterSpacing: "1px" }}>Tingkat Kompleksitas</div>
                        <div style={{ fontSize: "1.15rem", fontWeight: 700, color: "#fff", marginTop: "4px" }}>{concept.complexityLevel}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: "0.8rem", color: "var(--color-body)", textTransform: "uppercase", letterSpacing: "1px" }}>Target Usaha / Lokasi</div>
                        <div style={{ fontSize: "1.15rem", fontWeight: 700, color: "#fff", marginTop: "4px" }}>{concept.targetAudience}</div>
                      </div>
                    </div>

                    {concept.budgetExplanation && (
                      <div style={{ background: "rgba(255,255,255,0.02)", padding: "16px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.04)", marginBottom: "24px" }}>
                        <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--color-primary)", display: "block", textTransform: "uppercase", marginBottom: "6px" }}>Penjelasan Pilihan Budget</span>
                        <p style={{ color: "var(--color-body)", fontSize: "0.88rem", lineHeight: 1.6, margin: 0 }}>{concept.budgetExplanation}</p>
                      </div>
                    )}

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "1.5rem" }} className="siweb-split-grid">
                      <div>
                        <h4 style={{ color: "#22c55e", fontSize: "0.9rem", fontWeight: 700, marginBottom: "10px", textTransform: "uppercase" }}>Fitur Terintegrasi (Didapat):</h4>
                        <ul style={{ paddingLeft: "16px", margin: 0, fontSize: "0.82rem", color: "var(--color-body)", display: "flex", flexDirection: "column", gap: "8px", listStyleType: "square" }}>
                          {concept.featuresIncluded.map((feat: string, idx: number) => (
                            <li key={idx} style={{ lineHeight: 1.4 }}>{feat}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 style={{ color: "#ef4444", fontSize: "0.9rem", fontWeight: 700, marginBottom: "10px", textTransform: "uppercase" }}>Belum Termasuk (Bisa Di-Upgrade):</h4>
                        <ul style={{ paddingLeft: "16px", margin: 0, fontSize: "0.82rem", color: "var(--color-body)", display: "flex", flexDirection: "column", gap: "8px", listStyleType: "square" }}>
                          {concept.featuresExcluded.map((feat: string, idx: number) => (
                            <li key={idx} style={{ lineHeight: 1.4 }}>{feat}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div style={{ marginTop: "32px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "24px", textAlign: "center" }}>
                      <a
                        href={`https://wa.me/6281338219957?text=${encodeURIComponent(concept.whatsappMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="siweb-btn"
                        style={{
                          background: "#25D366",
                          color: "#fff",
                          width: "100%",
                          padding: "18px 0",
                          fontWeight: 700,
                          textAlign: "center",
                          display: "inline-block"
                        }}
                      >
                        KONSULTASI VIA WHATSAPP
                      </a>
                      
                      {/* DISCLAIMER */}
                      <p style={{ color: "var(--color-body)", fontSize: "0.78rem", lineHeight: 1.5, marginTop: "16px", marginInline: "auto", maxWidth: "680px" }}>
                        *Disclaimer: Preview ini merupakan simulasi konsep awal. Hasil akhir dapat berbeda setelah konsultasi, materi bisnis, dan kebutuhan final dikonfirmasi secara resmi.
                      </p>
                    </div>

                  </div>

                </div>
              )}

            </section>

          </div>

        </div>
      </main>

      <Footer />
      <div className="page-transition-overlay" />
      <SiteEffects />
    </div>
  );
}
