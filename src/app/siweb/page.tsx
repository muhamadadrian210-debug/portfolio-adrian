"use client";

import { useState } from "react";
import { SiwebFooter } from "@/components/layout/SiwebFooter";
import { SiwebNavbar } from "@/components/layout/SiwebNavbar";
import { UmkmApplicationForm } from "@/components/siweb/UmkmApplicationForm";

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

const processSteps = [
  ["1", "Cerita Kebutuhan", "Kamu jelaskan usaha, target pelanggan, dan kendala yang ingin dibantu."],
  ["2", "Harga & Isi Disepakati", "Kami bantu rapikan kebutuhan, isi halaman, dan harga sebelum pengerjaan dimulai."],
  ["3", "Website Dibuat", "Kami kerjakan website sambil minta masukan agar hasilnya sesuai usaha kamu."],
  ["4", "Tayang & Dibantu", "Website dipasang, dicek, lalu kamu dibantu memahami cara memakainya."],
];

const faqs = [
  ["Apakah cocok untuk usaha kecil?", "Ya. SiWeb memang dibuat untuk usaha lokal seperti cafe, bengkel, laundry, barbershop, toko, jasa rumahan, dan UMKM yang ingin punya website resmi dengan harga jelas."],
  ["Berapa lama proses pembuatan website?", "Paket sederhana biasanya 7-14 hari. Paket yang lebih lengkap bisa 2-5 minggu, tergantung jumlah isi, foto, dan kebutuhan fitur."],
  ["Kalau saya belum punya bahan tulisan, bisa dibantu?", "Bisa. Kami bantu susun isi halaman dari informasi dasar usaha kamu, supaya tidak perlu bingung mulai dari mana."],
  ["Apakah harga bisa berubah?", "Harga awal sudah ditampilkan jelas. Kalau ada tambahan di luar paket, kami jelaskan dulu sebelum dikerjakan."],
  ["Bisa langsung konsultasi lewat WhatsApp?", "Bisa. Kamu bisa kirim pesan lewat form atau tombol WhatsApp di bagian bawah halaman."],
];

export default function SiwebPage() {
  return (
    <div className="page-wrapper">
      <SiwebNavbar />
      <main id="main-content">
        <HeroSection />
        <ShowcaseSection onOpenModal={() => {}} />
        <PricingSection />
        <UmkmProgramSection />
        <AboutSection />
        <ProcessSection />
        <FaqSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <SiwebFooter />

    </div>
  );
}

function HeroSection() {
  return (
    <section className="siweb-hero">
      <div className="container siweb-content">
        <div style={{ textAlign: "left" }}>
          <img
            src="/assets/images/siweb-logo.svg"
            alt="SiWeb Production Logo"
            className="siweb-logo-img"
            style={{ marginBottom: "2rem", width: 240, maxWidth: "100%", background: "rgba(255,255,255,0.04)", padding: "18px 22px", borderRadius: 12 }}
          />
          <h1 className="siweb-title">Cepat Punya Website Resmi untuk Usaha Lokal.</h1>
          <p className="siweb-subtitle">
            SiWeb Production membantu pemilik cafe, bengkel, laundry, barbershop, toko, dan UMKM punya website yang rapi, jelas, dan mudah dihubungi pelanggan.
          </p>
          <div className="siweb-features">
            <span className="siweb-feature-tag">Harga Jelas</span>
            <span className="siweb-feature-tag">Cocok untuk UMKM</span>
            <span className="siweb-feature-tag">Dibantu dari Awal</span>
            <span className="siweb-feature-tag">Langsung Terhubung WhatsApp</span>
          </div>
          <div className="siweb-cta-group">
            <a href="#pricing" className="siweb-btn siweb-btn-primary">LIHAT HARGA</a>
            <a href="#umkm-gratis" className="siweb-btn siweb-btn-outline">AJUKAN SLOT GRATIS</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
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
              <PricingList title="YANG DIDAPAT" items={item.features} />
              <PricingList title="BANTUAN & WAKTU" items={item.support} />
            </article>
          ))}
        </div>
        <p style={{ color: "var(--color-body)", marginTop: "2rem", fontSize: "0.95rem" }}>
          Catatan: harga adalah titik awal yang transparan. Kalau ada kebutuhan tambahan, kami jelaskan dulu sebelum kamu setuju.
        </p>
      </div>
    </section>
  );
}

function PricingList({ title, items }: { title: string; items: string[] }) {
  return (
    <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
      <div style={{ color: "var(--color-primary)", fontWeight: 700, fontSize: "0.8rem", marginBottom: 8 }}>{title}:</div>
      <div className="siweb-card-list">
        {items.map((item) => <div className="siweb-card-item" key={item}>{item}</div>)}
      </div>
    </div>
  );
}

function UmkmProgramSection() {
  return (
    <section className="siweb-section" id="umkm-gratis" style={{ background: "#050505" }}>
      <div className="container">
        <span className="siweb-section-label">Program UMKM</span>
        <h2 className="siweb-section-title">Program Digitalisasi UMKM Gratis (Kuota 1 Slot Per Bulan)</h2>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(280px, 480px)", gap: 32, alignItems: "start", marginTop: "2rem" }}>
          <div>
            <p style={{ color: "var(--color-body)", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "1rem" }}>
              Setiap bulannya, Sivilize membuka 1 slot gratis pembuatan website untuk pelaku usaha lokal yang siap kami bantu petakan masalah operasionalnya untuk dijadikan studi kasus portfolio kami.
            </p>
            <p style={{ color: "var(--color-body)", fontSize: "1.05rem", lineHeight: 1.8 }}>
              Program ini cocok untuk pemilik usaha yang serius ingin mulai tampil resmi di internet, tapi masih butuh arahan dari nol.
            </p>
          </div>
          <UmkmApplicationForm />
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="siweb-section" id="about" style={{ background: "#050505" }}>
      <div className="container">
        <span className="siweb-section-label">Tentang SiWeb</span>
        <h2 className="siweb-section-title">Website sederhana yang bantu usaha terlihat lebih dipercaya.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginTop: "2rem", alignItems: "start" }}>
          <div>
            <p style={{ color: "var(--color-body)", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "1rem" }}>
              SiWeb Production adalah layanan pembuatan website untuk usaha lokal yang ingin punya halaman resmi, harga jelas, dan proses yang tidak ribet.
            </p>
            <p style={{ color: "var(--color-body)", fontSize: "1.05rem", lineHeight: 1.8 }}>
              Kamu tidak perlu paham teknis. Kami bantu dari susun isi, rapikan tampilan, sampai website siap dibagikan ke pelanggan.
            </p>
          </div>
          <div style={{ background: "rgba(255,255,255,0.02)", padding: 32, border: "1px solid rgba(255,255,255,0.04)", borderRadius: 4 }}>
            <h3 style={{ color: "#fff", marginBottom: 16 }}>Yang Kami Bantu:</h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: 12, listStyle: "none", padding: 0, margin: 0 }}>
              {["Website rapi dan enak dibuka dari HP", "Tombol WhatsApp agar pelanggan mudah menghubungi", "Isi halaman dibantu supaya tidak bingung", "Harga dan proses dijelaskan dari awal"].map((item) => (
                <li style={{ color: "var(--color-body)", display: "flex", alignItems: "start", gap: 12 }} key={item}>
                  <span style={{ color: "var(--color-primary)", fontWeight: 800 }}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="siweb-section" id="process" style={{ background: "#050505" }}>
      <div className="container">
        <span className="siweb-section-label">Proses Kerja</span>
        <h2 className="siweb-section-title">Dibantu dari awal sampai beres.</h2>
        <div className="siweb-process">
          {processSteps.map(([num, title, desc]) => (
            <div className="siweb-step" key={num}>
              <div className="siweb-step-num">{num}</div>
              <div className="siweb-step-title">{title}</div>
              <div className="siweb-step-desc">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="siweb-section" id="faq" style={{ background: "#080808" }}>
      <div className="container">
        <span className="siweb-section-label">Pertanyaan Umum</span>
        <h2 className="siweb-section-title">FAQ</h2>
        <div className="siweb-faq">
          {faqs.map(([question, answer]) => (
            <details className="siweb-faq-item" key={question}>
              <summary className="siweb-faq-q">
                <span>{question}</span>
                <span style={{ fontSize: "1.4rem" }}>+</span>
              </summary>
              <div style={{ color: "var(--color-body)", marginTop: 12, lineHeight: 1.7 }}>{answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="siweb-section" id="testimonials" style={{ background: "#080808" }}>
      <div className="container">
        <span className="siweb-section-label">Cerita Klien</span>
        <h2 className="siweb-section-title">Dibuat untuk usaha yang dekat dengan pelanggan.</h2>
        <div className="siweb-grid" style={{ marginTop: "2.5rem" }}>
          {[
            ["Rina", "Pemilik Laundry Kiloan", "Sekarang pelanggan baru lebih gampang lihat harga, alamat, dan langsung chat WhatsApp."],
            ["Bagus", "Owner Barbershop", "Website-nya sederhana tapi bikin usaha kami kelihatan lebih resmi saat dibagikan ke calon pelanggan."],
            ["Maya", "Pemilik Toko Kue", "Kami dibantu susun isi dari nol. Tidak bingung teknis, tinggal kirim bahan dan cek hasilnya."],
          ].map(([name, role, quote]) => (
            <div className="siweb-card" key={name}>
              <p className="siweb-card-desc" style={{ fontSize: "1rem", lineHeight: 1.8, color: "rgba(255,255,255,0.9)", margin: 0 }}>"{quote}"</p>
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ color: "var(--color-primary)", fontWeight: 700, fontSize: "0.9rem" }}>{name}</div>
                <div style={{ color: "var(--color-body)", fontSize: "0.85rem" }}>{role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="siweb-section" id="contact" style={{ background: "linear-gradient(180deg, rgba(79, 70, 229, 0.05), transparent)", padding: "60px 0" }}>
      <div className="container" style={{ textAlign: "center" }}>
        <h3 style={{ color: "#fff", fontSize: "1.6rem", marginBottom: "1.5rem" }}>Siap bikin website resmi untuk usaha kamu?</h3>
        <p style={{ color: "var(--color-body)", marginBottom: "2rem", maxWidth: 760, marginLeft: "auto", marginRight: "auto" }}>
          Ceritakan nama usaha, jenis usaha, dan paket yang kamu incar. Kami bantu arahkan pilihan yang paling pas.
        </p>
        <a href="https://wa.me/6281338219957" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "16px 32px", background: "#25D366", color: "#fff", textDecoration: "none", fontWeight: 700, borderRadius: 4 }}>
          Chat WhatsApp
        </a>
      </div>
    </section>
  );
}

export const demoProjects = [
  {
    title: "Rumah Sakit & Klinik",
    description: "Sistem informasi manajemen kesehatan terintegrasi untuk meningkatkan layanan pasien dan efisiensi staf medis.",
    themeColor: "#10b981", // Emerald Green
    glowColor: "rgba(16, 185, 129, 0.35)",
    demoUrl: "",
    features: ["Pendaftaran Pasien", "Jadwal Dokter", "Dashboard Admin", "Riwayat Pasien", "Informasi Layanan"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 14c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3H5C3.34 3 2 4.34 2 6v5c0 1.66 1.34 3 3 3h14z" />
        <path d="M12 3v18M3 12h18" />
      </svg>
    ),
    decorations: ["Medical Cross", "Stethoscope", "Pulse Line", "Daun Hijau Kecil"],
    mockupType: "hospital"
  },
  {
    title: "Apotek Digital",
    description: "Platform pengelolaan stok obat, resep digital, dan penjualan farmasi online yang aman dan terstruktur.",
    themeColor: "#06b6d4", // Teal Cyan
    glowColor: "rgba(6, 182, 212, 0.35)",
    demoUrl: "",
    features: ["Katalog Produk", "Stok Obat", "Pemesanan Online", "Dashboard Apotek", "Manajemen Produk"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4.5 16.5c-1.5 0-2.5-1-2.5-2.5v-4c0-1.5 1-2.5 2.5-2.5h15c1.5 0 2.5 1 2.5 2.5v4c0 1.5-1 2.5-2.5 2.5h-15z" />
        <path d="M12 8v8" />
      </svg>
    ),
    decorations: ["Katalog Obat", "Kapsul", "Botol Obat", "Medical Shelf", "Ikon Farmasi"],
    mockupType: "pharmacy"
  },
  {
    title: "Landing Page Perusahaan",
    description: "Presentasi bisnis profesional dengan fokus konversi tinggi dan pengenalan profil korporat yang elegan.",
    themeColor: "#4f46e5", // Indigo Blue
    glowColor: "rgba(79, 70, 229, 0.35)",
    demoUrl: "",
    features: ["Company Profile", "Lead Generation", "Service Showcase", "Contact Form", "Portfolio"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="2" />
        <path d="M6 6h12v4H6zM6 14h6v4H6z" />
      </svg>
    ),
    decorations: ["Gedung Modern", "Grafik Pertumbuhan", "Company Dashboard", "Corporate Document"],
    mockupType: "company"
  },
  {
    title: "Toko Souvenir",
    description: "Etalase digital kerajinan lokal dengan detail produk estetik dan integrasi transaksi praktis langsung.",
    themeColor: "#f59e0b", // Amber Gold
    glowColor: "rgba(245, 158, 11, 0.35)",
    demoUrl: "",
    features: ["Katalog Produk", "WhatsApp Order", "Testimoni", "Galeri Produk", "Promo"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7c0-2-2-4-4-4S4 5 4 7M12 7c0-2 2-4 4-4s4 2 4 4" />
      </svg>
    ),
    decorations: ["Gift Box", "Product Showcase", "Ribbon", "Product Card", "Shopping Experience"],
    mockupType: "souvenir"
  },
  {
    title: "Sistem Perpustakaan",
    description: "Manajemen katalog buku, pencatatan peminjaman, serta statistik perpustakaan modern berbasis web.",
    themeColor: "#8b5cf6", // Purple Violet
    glowColor: "rgba(139, 92, 246, 0.35)",
    demoUrl: "",
    features: ["Manajemen Buku", "Peminjaman", "Pengembalian", "Dashboard Admin", "Pencarian Buku"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5v-15z" />
      </svg>
    ),
    decorations: ["Rak Buku", "Kartu Anggota", "Dashboard Perpustakaan", "Buku Digital"],
    mockupType: "library"
  },
  {
    title: "Travel & Tour",
    description: "Sistem reservasi paket perjalanan wisata, pencarian destinasi, dan galeri petualangan interaktif.",
    themeColor: "#0ea5e9", // Sky Blue
    glowColor: "rgba(14, 165, 233, 0.35)",
    demoUrl: "",
    features: ["Paket Wisata", "Booking Online", "Galeri Destinasi", "Jadwal Tour", "Customer Management"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
      </svg>
    ),
    decorations: ["Pesawat", "Peta Perjalanan", "Lokasi Wisata", "Booking Panel"],
    mockupType: "travel"
  },
  {
    title: "Cafe & Resto",
    description: "Daftar menu digital interaktif dengan integrasi meja pemesanan dan pengelolaan transaksi dapur.",
    themeColor: "#ea580c", // Orange Brown
    glowColor: "rgba(234, 88, 12, 0.35)",
    demoUrl: "",
    features: ["Digital Menu", "Reservasi", "Pemesanan", "Promo", "Dashboard Pesanan"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3" />
      </svg>
    ),
    decorations: ["Coffee Cup", "Menu Digital", "Makanan", "Reservasi Meja", "Order Dashboard"],
    mockupType: "cafe"
  },
  {
    title: "Property & Developer",
    description: "Galeri unit properti eksklusif dengan formulir minat pembeli dan simulasi cicilan sederhana.",
    themeColor: "#f97316", // Slate Orange
    glowColor: "rgba(249, 115, 22, 0.35)",
    demoUrl: "",
    features: ["Katalog Properti", "Landing Page Proyek", "Lead Generation", "Form Konsultasi", "Progress Proyek"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
        <path d="M9 22V12h6v10" />
      </svg>
    ),
    decorations: ["Gedung Tinggi", "Blueprint", "Site Plan", "Property Showcase"],
    mockupType: "property"
  },
  {
    title: "Sekolah & Akademi",
    description: "Sistem informasi akademik, portal elearning siswa, dan manajemen pendaftaran siswa baru online.",
    themeColor: "#6366f1", // Blue Purple
    glowColor: "rgba(99, 102, 241, 0.35)",
    demoUrl: "",
    features: ["Informasi Sekolah", "Pendaftaran", "Dashboard Siswa", "Jadwal Pelajaran", "E-Learning"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
      </svg>
    ),
    decorations: ["Classroom", "Dashboard Siswa", "E-learning Panel", "Academic Management"],
    mockupType: "school"
  },
  {
    title: "Hotel & Penginapan",
    description: "Sistem reservasi kamar hotel dengan galeri visual tipe kamar, detail fasilitas, dan promo diskon.",
    themeColor: "#3b82f6", // Royal Blue
    glowColor: "rgba(59, 130, 246, 0.35)",
    demoUrl: "",
    features: ["Booking Kamar", "Room Showcase", "Galeri Hotel", "Promo", "Customer Management"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M9 9h6M9 13h6M9 17h6" />
      </svg>
    ),
    decorations: ["Hotel Booking", "Room Showcase", "Reservation System", "Luxury Hospitality"],
    mockupType: "hotel"
  },
  {
    title: "Bengkel & Otomotif",
    description: "Sistem antrean servis online, estimasi biaya suku cadang, dan riwayat perawatan mesin berkala.",
    themeColor: "#f97316", // Red Orange
    glowColor: "rgba(249, 115, 22, 0.35)",
    demoUrl: "",
    features: ["Booking Service", "Sparepart Catalog", "Riwayat Servis", "Dashboard Bengkel", "WhatsApp Booking"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    decorations: ["Mobil", "Motor", "Service Dashboard", "Sparepart Showcase"],
    mockupType: "workshop"
  },
  {
    title: "Toko Online / E-Commerce",
    description: "Platform toko retail online lengkap dengan payment gateway, detail keranjang, dan laporan omzet.",
    themeColor: "#2563eb", // Electric Blue
    glowColor: "rgba(37, 99, 235, 0.35)",
    demoUrl: "",
    features: ["Katalog Produk", "Keranjang Belanja", "Checkout", "Dashboard Penjualan", "Manajemen Produk"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
    decorations: ["Product Grid", "Shopping Cart", "Checkout Flow", "Sales Analytics"],
    mockupType: "ecommerce"
  }
];

export function ShowcaseSection({ onOpenModal }: { onOpenModal: (project: any) => void }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleCardClick = (project: any) => {
    window.open("/demo/" + project.mockupType, "_blank");
  };

  return (
    <section className="siweb-section" id="showcase" style={{ background: "#050505" }}>
      <div className="container">
        <span className="siweb-section-label">Website Demo Showcase</span>
        <h2 className="siweb-section-title">Industri Khusus, Desain Khusus.</h2>
        <p style={{ color: "var(--color-body)", marginTop: "0.8rem", maxWidth: 820 }}>
          Jelajahi berbagai contoh website dan sistem digital yang dapat dikembangkan sesuai kebutuhan bisnis, organisasi, maupun institusi Anda.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 30,
          marginTop: "3.5rem"
        }}>
          {demoProjects.map((project, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <article
                key={project.title}
                onClick={() => handleCardClick(project)}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  background: "rgba(15, 23, 42, 0.4)",
                  backdropFilter: "blur(12px)",
                  borderRadius: 16,
                  border: `1px solid ${isHovered ? project.themeColor : "rgba(255,255,255,0.06)"}`,
                  boxShadow: isHovered
                    ? `0 20px 40px -15px ${project.glowColor}, 0 0 15px ${project.glowColor}`
                    : "none",
                  transform: isHovered ? "translateY(-8px)" : "translateY(0)",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  padding: 24,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                {/* Visual Laptop Mockup Custom */}
                <div style={{
                  width: "100%",
                  height: 140,
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: 8,
                  marginBottom: 20,
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  {/* Laptop Frame */}
                  <div style={{
                    width: "80%",
                    height: "75%",
                    background: "#1e293b",
                    border: "4px solid #475569",
                    borderRadius: "6px 6px 0 0",
                    position: "relative",
                    transform: isHovered ? "scale(1.03)" : "scale(1)",
                    transition: "transform 0.4s ease",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden"
                  }}>
                    {/* Screen Content based on Industry */}
                    <div style={{
                      flex: 1,
                      background: "#0f172a",
                      position: "relative",
                      padding: 6,
                      fontSize: "0.5rem"
                    }}>
                      {/* Simuated Dashboard / UI */}
                      <div style={{
                        width: "100%",
                        height: 6,
                        background: project.themeColor,
                        opacity: 0.8,
                        borderRadius: 2,
                        marginBottom: 4
                      }} />
                      <div style={{ display: "flex", gap: 4, height: "100%" }}>
                        <div style={{ width: "25%", background: "rgba(255,255,255,0.05)", borderRadius: 2 }} />
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
                          <div style={{ width: "80%", height: 3, background: "rgba(255,255,255,0.2)", borderRadius: 1 }} />
                          <div style={{ width: "50%", height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 1 }} />
                          <div style={{ width: "90%", height: 12, background: "rgba(255,255,255,0.03)", borderRadius: 2, marginTop: 2 }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Laptop Base */}
                  <div style={{
                    width: "90%",
                    height: 6,
                    background: "#64748b",
                    borderRadius: "0 0 6px 6px",
                    position: "absolute",
                    bottom: 12
                  }} />

                  {/* Decorative Elements */}
                  <div style={{
                    position: "absolute",
                    bottom: 4,
                    right: 4,
                    fontSize: "0.65rem",
                    color: project.themeColor,
                    opacity: isHovered ? 0.9 : 0.4,
                    transition: "opacity 0.4s ease",
                    fontWeight: 700
                  }}>
                    {project.decorations[0]}
                  </div>
                </div>

                {/* Header Kategori */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{
                    color: project.themeColor,
                    transform: isHovered ? "rotate(10deg) scale(1.1)" : "none",
                    transition: "transform 0.3s ease"
                  }}>
                    {project.icon}
                  </div>
                  <h3 style={{
                    fontSize: "1.2rem",
                    fontWeight: 800,
                    margin: 0,
                    textTransform: "uppercase"
                  }}>
                    {project.title}
                  </h3>
                </div>

                {/* Deskripsi */}
                <p style={{
                  color: "var(--color-body)",
                  fontSize: "0.9rem",
                  lineHeight: 1.6,
                  marginBottom: 16,
                  flex: 1
                }}>
                  {project.description}
                </p>

                {/* 3 Fitur Utama */}
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  marginBottom: 24,
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                  paddingTop: 16
                }}>
                  {project.features.map((feat) => (
                    <div key={feat} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem" }}>
                      <span style={{ color: project.themeColor, fontWeight: 900 }}>✓</span>
                      <span style={{ color: "#cbd5e1" }}>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button style={{
                  width: "100%",
                  padding: "12px 16px",
                  background: "transparent",
                  border: `1px solid ${project.themeColor}`,
                  color: project.themeColor,
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  backgroundColor: isHovered ? project.glowColor : "transparent"
                }}>
                  <span>Lihat Demo</span>
                  <span style={{
                    transform: isHovered ? "translateX(4px)" : "none",
                    transition: "transform 0.3s ease"
                  }}>→</span>
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
