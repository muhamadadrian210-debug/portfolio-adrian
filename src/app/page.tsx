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
  const [modalOpen, setModalOpen] = useState(false);

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
        <ShowcaseSection onOpenModal={() => setModalOpen(true)} />

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

      {modalOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99999,
          padding: 20
        }}>
          <div style={{
            background: "#0f172a",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: 32,
            borderRadius: 16,
            maxWidth: 400,
            width: "100%",
            textAlign: "center",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)"
          }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: 12, color: "#fff" }}>Mohon Maaf</h3>
            <p style={{ color: "#94a3b8", marginBottom: 24, fontSize: "1rem", lineHeight: 1.6 }}>Demo sedang dipersiapkan.</p>
            <button
              onClick={() => setModalOpen(false)}
              className="siweb-btn siweb-btn-primary"
              style={{ padding: "12px 24px", width: "100%" }}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
