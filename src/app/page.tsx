"use client";

import { useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SiteEffects } from "@/components/runtime/SiteEffects";
import { UmkmApplicationForm } from "@/components/siweb/UmkmApplicationForm";
import { ShowcaseSection } from "./siweb/page";

const pricingPackages = [
  {
    title: "Paket Landing Page",
    price: "Rp 800.000",
    description: "Untuk usaha lokal yang butuh website resmi sederhana dan cepat tayang.",
    features: [
      "1 halaman website resmi",
      "Profil usaha, foto, layanan, dan tombol WhatsApp",
      "Bisa dibuka rapi dari HP",
      "Dibantu susun isi halaman dari awal",
      "Cocok untuk cafe, bengkel, laundry, barbershop, dan toko kecil",
    ],
    support: ["Revisi 2x", "Bantuan dasar 14 hari", "Estimasi pengerjaan 7-14 hari"],
  },
  {
    title: "Paket Profil Usaha",
    price: "Rp 1.200.000",
    description: "Untuk usaha yang ingin terlihat lebih rapi, dipercaya, dan mudah ditemukan calon pelanggan.",
    features: [
      "3-5 bagian halaman",
      "Profil usaha, daftar layanan, testimoni, FAQ, dan kontak",
      "Form kontak atau tombol WhatsApp",
      "Bantuan penulisan isi website",
      "Struktur halaman dibantu agar mudah dipahami pelanggan",
    ],
    support: ["Revisi 3x", "Bantuan WhatsApp 1 bulan", "Estimasi pengerjaan 2-3 minggu"],
  },
  {
    title: "Paket Toko Online",
    price: "Rp 3.500.000",
    description: "Untuk toko yang ingin menampilkan produk dan menerima pesanan lebih rapi.",
    features: [
      "Katalog produk",
      "Halaman detail produk",
      "Tombol order ke WhatsApp",
      "Panduan cara update produk",
      "Cocok untuk toko makanan, fashion, aksesoris, dan produk rumahan",
    ],
    support: ["Revisi 4x", "Bantuan WhatsApp 2 bulan", "Estimasi pengerjaan 3-5 minggu"],
  },
  {
    title: "Paket Sistem Bisnis",
    price: "Rp 4.500.000",
    description: "Untuk usaha yang butuh website plus alur kerja sederhana seperti order, data pelanggan, atau pencatatan.",
    features: [
      "Website sesuai kebutuhan usaha",
      "Form order atau pendataan pelanggan",
      "Halaman admin sederhana bila dibutuhkan",
      "Dibantu petakan proses usaha sebelum dibuat",
      "Cocok untuk usaha yang mulai ramai dan butuh sistem lebih tertata",
    ],
    support: ["Revisi sesuai tahap pengerjaan", "Bantuan WhatsApp 3 bulan", "Estimasi mengikuti kebutuhan"],
  },
];

export default function Home() {
  const [selectedDemo, setSelectedDemo] = useState<any | null>(null);

  return (
    <div className="page-wrapper">
      <Navbar />
      <main id="main-content">
        {/* HERO SECTION */}
        <section className="siweb-hero" id="hero">
          <div className="container siweb-content">
            <div style={{ textAlign: "left" }}>
              <div className="hero__overhead" style={{ marginBottom: "1.5rem" }}>
                <span className="hero__brand" style={{ margin: 0 }}>SIWEB BY SIVILIZE</span>
              </div>
              <h1 className="siweb-title" style={{ textTransform: "uppercase" }}>
                DIGITALISASI KILAT UNTUK PERTUMBUHAN BISNIS LOKAL & UMKM.
              </h1>
              <p className="siweb-subtitle" style={{ maxWidth: "800px" }}>
                SiWeb by Sivilize menghadirkan layanan pembuatan website profesional, landing page modern, dan sistem operasional taktis yang dirancang khusus ramah kantong untuk UMKM, toko, hingga cafe.
              </p>
              <div className="siweb-features">
                <span className="siweb-feature-tag">Harga Jelas & Ramah UMKM</span>
                <span className="siweb-feature-tag">Dibantu dari Nol</span>
                <span className="siweb-feature-tag">Langsung Terhubung WhatsApp</span>
              </div>
              <div className="siweb-cta-group">
                <a href="#pricing" className="siweb-btn siweb-btn-primary">LIHAT HARGA</a>
                <a href="#umkm-gratis" className="siweb-btn siweb-btn-outline">AJUKAN SLOT GRATIS</a>
              </div>
            </div>
          </div>
        </section>

        {/* WEBSITE DEMO SHOWCASE */}
        <ShowcaseSection onOpenModal={(project) => setSelectedDemo(project)} />

        {/* PRICING SECTION */}
        <section className="siweb-section" id="pricing" style={{ background: "#080808" }}>
          <div className="container">
            <span className="siweb-section-label">Paket & Harga</span>
            <h2 className="siweb-section-title">Harga jelas langsung kelihatan.</h2>
            <p style={{ color: "var(--color-body)", marginTop: "0.8rem", maxWidth: 820 }}>
              Pilih paket sesuai tahap usaha kamu. Semua paket dimulai dari kebutuhan sederhana, lalu bisa disesuaikan kalau usaha kamu perlu fitur tambahan.
            </p>
            <div className="siweb-grid" style={{ marginTop: "3rem" }}>
              {pricingPackages.map((item) => (
                <article className="siweb-card" key={item.title}>
                  <div className="siweb-card-title">{item.title}</div>
                  <div className="siweb-card-price">{item.price}</div>
                  <p className="siweb-card-desc">{item.description}</p>
                  
                  <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                    <div style={{ color: "var(--color-primary)", fontWeight: 700, fontSize: "0.8rem", marginBottom: 8 }}>YANG DIDAPAT:</div>
                    <div className="siweb-card-list">
                      {item.features.map((feature) => (
                        <div className="siweb-card-item" key={feature}>{feature}</div>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                    <div style={{ color: "var(--color-primary)", fontWeight: 700, fontSize: "0.8rem", marginBottom: 8 }}>BANTUAN & WAKTU:</div>
                    <div className="siweb-card-list">
                      {item.support.map((supp) => (
                        <div className="siweb-card-item" key={supp}>{supp}</div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p style={{ color: "var(--color-body)", marginTop: "2rem", fontSize: "0.95rem" }}>
              Catatan: harga adalah titik awal yang transparan. Kalau ada kebutuhan tambahan, kami jelaskan dulu sebelum kamu setuju.
            </p>
          </div>
        </section>

        {/* UMKM PROGRAM SECTION */}
        <section className="siweb-section" id="umkm-gratis" style={{ background: "#050505" }}>
          <div className="container">
            <span className="siweb-section-label">Program UMKM</span>
            <h2 className="siweb-section-title">Program Digitalisasi UMKM Gratis (Kuota 1 Slot Per Bulan)</h2>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(280px, 480px)", gap: 32, alignItems: "start", marginTop: "2rem" }}>
              <div>
                <p style={{ color: "var(--color-body)", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "1rem" }}>
                  Setiap bulannya, SiWeb membuka 1 slot gratis pembuatan website untuk pelaku usaha lokal yang siap kami bantu petakan masalah operasionalnya untuk dijadikan studi kasus portfolio kami.
                </p>
                <p style={{ color: "var(--color-body)", fontSize: "1.05rem", lineHeight: 1.8 }}>
                  Program ini cocok untuk pemilik usaha yang serius ingin mulai tampil resmi di internet, tapi masih butuh arahan dari nol.
                </p>
              </div>
              <UmkmApplicationForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <div className="page-transition-overlay" />
      <SiteEffects />

      {selectedDemo && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "#090d16",
          zIndex: 99999,
          display: "flex",
          flexDirection: "column",
          color: "#fff",
          fontFamily: "var(--font-sans)"
        }}>
          {/* Top Header Bar */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            background: "#0f172a"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{
                color: selectedDemo.themeColor,
                display: "inline-flex",
                alignItems: "center"
              }}>
                {selectedDemo.icon}
              </span>
              <span style={{ fontWeight: 800, fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: 1 }}>
                Demo: {selectedDemo.title}
              </span>
              <span style={{
                background: "rgba(255,255,255,0.05)",
                padding: "4px 10px",
                borderRadius: 4,
                fontSize: "0.75rem",
                color: selectedDemo.themeColor,
                border: `1px solid ${selectedDemo.themeColor}33`
              }}>
                Live Simulation Mode
              </span>
            </div>
            <button
              onClick={() => setSelectedDemo(null)}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#fff",
                padding: "8px 16px",
                borderRadius: 6,
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.85rem",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
            >
              Kembali ke Portofolio ×
            </button>
          </div>

          {/* Main Simulated Browser Frame */}
          <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
            {/* Sidebar Simulation */}
            <div style={{
              width: 240,
              background: "#0f172a",
              borderRight: "1px solid rgba(255,255,255,0.05)",
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 20
            }}>
              <div>
                <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#64748b", letterSpacing: 1, marginBottom: 12 }}>Menu Utama</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {selectedDemo.features.map((feat: string, idx: number) => (
                    <div
                      key={feat}
                      style={{
                        padding: "10px 14px",
                        background: idx === 0 ? selectedDemo.glowColor : "transparent",
                        borderLeft: `3px solid ${idx === 0 ? selectedDemo.themeColor : "transparent"}`,
                        borderRadius: "0 6px 6px 0",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        color: idx === 0 ? "#fff" : "#94a3b8",
                        cursor: "pointer"
                      }}
                    >
                      {feat}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: "auto", background: "rgba(255,255,255,0.02)", padding: 16, borderRadius: 8, border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 700, marginBottom: 6 }}>Kustomisasi?</div>
                <p style={{ fontSize: "0.75rem", color: "#94a3b8", margin: 0, lineHeight: 1.5 }}>
                  Desain dan alur sistem ini bisa disesuaikan 100% dengan kebutuhan operasional bisnis Anda.
                </p>
              </div>
            </div>

            {/* Dashboard Content Simulation */}
            <div style={{ flex: 1, padding: 32, overflowY: "auto", background: "#090d16" }}>
              {/* Top Summary Banner */}
              <div style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: 12,
                padding: 24,
                marginBottom: 30,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div>
                  <h1 style={{ fontSize: "1.8rem", fontWeight: 800, margin: 0, textTransform: "none", textShadow: "none" }}>
                    Selamat Datang di {selectedDemo.title} Dashboard
                  </h1>
                  <p style={{ color: "#94a3b8", margin: "6px 0 0", fontSize: "0.95rem" }}>
                    Berikut adalah preview visual antarmuka sistem yang kami kembangkan.
                  </p>
                </div>
                <button
                  onClick={() => window.open("https://wa.me/6281338219957", "_blank")}
                  style={{
                    background: selectedDemo.themeColor,
                    color: "#fff",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: 8,
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: `0 8px 20px -6px ${selectedDemo.glowColor}`
                  }}
                >
                  Konsultasikan Sistem Ini
                </button>
              </div>

              {/* Data Widgets Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 30 }}>
                {[
                  { label: "Total Data Masuk", val: "1,248", change: "+12% minggu ini" },
                  { label: "Status Operasional", val: "Aktif / Optimal", change: "Latency 24ms" },
                  { label: "Efisiensi Proses", val: "99.4%", change: "Meningkat 3.2%" }
                ].map((w) => (
                  <div key={w.label} style={{
                    background: "rgba(15, 23, 42, 0.6)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: 12,
                    padding: 20
                  }}>
                    <div style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>{w.label}</div>
                    <div style={{ fontSize: "1.6rem", fontWeight: 800, margin: "8px 0 4px" }}>{w.val}</div>
                    <div style={{ fontSize: "0.75rem", color: selectedDemo.themeColor }}>{w.change}</div>
                  </div>
                ))}
              </div>

              {/* Main Visual Container */}
              <div style={{
                background: "rgba(15, 23, 42, 0.6)",
                border: `1px solid ${selectedDemo.themeColor}33`,
                borderRadius: 12,
                padding: 30,
                position: "relative"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <h3 style={{ fontSize: "1.1rem", margin: 0, textTransform: "none", textShadow: "none" }}>Visualisasi Alur & Elemen Industri</h3>
                  <span style={{ color: "#64748b", fontSize: "0.8rem" }}>Sivilize UI Engine V1.0</span>
                </div>

                <div style={{
                  height: 220,
                  border: "1px dashed rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(0,0,0,0.2)",
                  gap: 16
                }}>
                  {/* Decorative Industrial Shapes */}
                  <div style={{ display: "flex", gap: 20 }}>
                    {selectedDemo.decorations.map((d: string) => (
                      <div
                        key={d}
                        style={{
                          padding: "10px 20px",
                          background: "rgba(255,255,255,0.03)",
                          border: `1px solid ${selectedDemo.themeColor}`,
                          borderRadius: 8,
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          color: "#fff",
                          boxShadow: `0 4px 12px ${selectedDemo.glowColor}`
                        }}
                      >
                        ✦ {d}
                      </div>
                    ))}
                  </div>
                  <p style={{ color: "#64748b", fontSize: "0.85rem", maxWidth: 500, textAlign: "center", lineHeight: 1.6 }}>
                    Sistem ini mengintegrasikan seluruh ornamen industri diatas ke dalam database yang aman, cepat, dan mudah dipantau secara real-time dari gadget manapun.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
