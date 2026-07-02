"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SiteEffects } from "@/components/runtime/SiteEffects";

// Types
type TabType = "kuliner" | "ritel" | "proyek" | "agensi";
type TierType = "standard" | "growup" | "pro" | "business";
type DomainType = "subdomain" | "custom";

interface PackageData {
  tier: TierType;
  title: string;
  price: string;
  rawPrice: number;
  description: string;
  features: string[];
  highlight: string;
}

interface ComparisonFeature {
  name: string;
  std: string;
  grow: string;
  pro: string;
  biz: string;
}

const DOMAIN_ADDON_PRICE = 200000;

function formatPrice(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

export default function BundlingPage() {
  const [activeTab, setActiveTab] = useState<TabType>("kuliner");
  const [selectedPackage, setSelectedPackage] = useState<{
    saas: TabType;
    tier: TierType;
    basePrice: number;
  } | null>(null);

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [domainChoice, setDomainChoice] = useState<DomainType>("subdomain");
  const [checkoutData, setCheckoutData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    subdomain: "",
    customDomain: "",
  });
  const [simulationStep, setSimulationStep] = useState<
    "checkout" | "payment" | "success"
  >("checkout");
  const [simulatedInvoiceId, setSimulatedInvoiceId] = useState("");

  const saasNames: Record<TabType, string> = {
    kuliner: "Sivilize Dine Lite (F&B / Cafe)",
    ritel: "SiKasir (Ritel / Toko)",
    proyek: "Sivilize Hub Pro (Kontraktor)",
    agensi: "Sivilize Brief (AI Agensi)",
  };

  const tabLabels: Record<TabType, string> = {
    kuliner: "🍽️  F&B / Cafe",
    ritel: "🛒  Retail / Toko",
    proyek: "🏗️  Kontraktor",
    agensi: "🎙️  Agensi / Kreatif",
  };

  /* ──────────────────── PACKAGE DATA ──────────────────── */
  const packages: Record<TabType, PackageData[]> = {
    kuliner: [
      {
        tier: "standard",
        title: "Standard",
        price: "Rp 800.000",
        rawPrice: 800000,
        description:
          "Hadirkan bisnis kuliner Anda secara online dengan halaman profil yang rapi, informatif, dan mudah ditemukan pelanggan.",
        features: [
          "1 Halaman Website Profil Restoran/Cafe",
          "Tampilan Menu Statis (Foto & Deskripsi)",
          "Integrasi Google Maps",
          "Tombol WhatsApp langsung ke Owner",
          "Tampilan Responsif (HP & Desktop)",
          "Estimasi Selesai: 7–14 Hari Kerja",
        ],
        highlight:
          "Langkah pertama yang tepat untuk bisnis kuliner yang ingin hadir secara profesional di internet.",
      },
      {
        tier: "growup",
        title: "Growup",
        price: "Rp 1.800.000",
        rawPrice: 1800000,
        description:
          "Website profesional dilengkapi sistem reservasi digital. Pelanggan bisa booking meja kapan saja, dan Anda bisa mengelolanya dari dashboard admin.",
        features: [
          "Semua Fitur Standard",
          "Sistem Reservasi Meja Online",
          "Dashboard Admin Manajemen Booking",
          "Notifikasi Status Reservasi via WhatsApp",
          "Lookup Status Reservasi oleh Pelanggan",
          "Kapasitas: Hingga 5 Meja Aktif",
        ],
        highlight:
          "Ideal untuk cafe yang ingin mengurangi antrean walk-in dan mulai mengelola reservasi secara terstruktur.",
      },
      {
        tier: "pro",
        title: "Pro",
        price: "Rp 3.200.000",
        rawPrice: 3200000,
        description:
          "Solusi digitalisasi operasional lengkap. Pelanggan cukup scan QR meja untuk memesan — tidak perlu memanggil pelayan.",
        features: [
          "Semua Fitur Growup",
          "QR Ordering & Live Cart per Meja",
          "Kitchen View & Order Dashboard Real-time",
          "CRM Pelanggan & Loyalty Tier (Bronze–Platinum)",
          "Laporan Penjualan + Export CSV",
          "Kapasitas: Hingga 20 Meja Aktif",
        ],
        highlight:
          "Paket terlaris. Ideal bagi cafe yang sudah ramai dan ingin mengoptimalkan kecepatan pelayanan.",
      },
      {
        tier: "business",
        title: "Business",
        price: "Rp 5.000.000",
        rawPrice: 5000000,
        description:
          "Platform enterprise untuk bisnis kuliner multi-cabang. Kelola seluruh operasional dari satu dashboard terpusat.",
        features: [
          "Semua Fitur Pro",
          "AI Menu Import (Foto / PDF Menu Lama)",
          "CRM Analytics Mendalam",
          "Multi-outlet / Multi-tenant",
          "Live Database Supabase (Full Setup)",
          "Meja Tidak Terbatas",
          "Support Prioritas 24/7",
        ],
        highlight:
          "Untuk jaringan cafe atau restoran yang membutuhkan kontrol terpusat atas semua cabang.",
      },
    ],
    ritel: [
      {
        tier: "standard",
        title: "Standard",
        price: "Rp 800.000",
        rawPrice: 800000,
        description:
          "Tampilkan toko Anda secara online dengan profil yang bersih, lengkap dengan informasi produk dan kontak.",
        features: [
          "1 Halaman Profil Toko",
          "Katalog Produk (Format Gambar/Statis)",
          "Integrasi Google Maps",
          "Tombol Chat Langsung ke WhatsApp",
          "Tampilan Responsif (HP & Desktop)",
          "Estimasi Selesai: 7–14 Hari Kerja",
        ],
        highlight:
          "Cara paling efisien untuk membuat toko Anda mudah ditemukan dan dihubungi pelanggan secara online.",
      },
      {
        tier: "growup",
        title: "Growup",
        price: "Rp 2.000.000",
        rawPrice: 2000000,
        description:
          "Website profil toko ditambah sistem kasir digital yang bisa diakses dari HP — catat transaksi lebih rapi dan laporan tersusun otomatis.",
        features: [
          "Semua Fitur Standard",
          "Sistem Kasir Web & Mobile (PWA)",
          "Input Produk & Pencatatan Transaksi (Maks. 100 Produk)",
          "Laporan Penjualan Harian",
          "1 Kasir Aktif, 1 Cabang",
        ],
        highlight:
          "Cocok untuk toko yang ingin mulai beralih dari pencatatan manual ke sistem kasir yang tertata.",
      },
      {
        tier: "pro",
        title: "Pro",
        price: "Rp 3.500.000",
        rawPrice: 3500000,
        description:
          "Sistem kasir multi-kasir dengan manajemen stok otomatis, struk digital, dan kemampuan bekerja tanpa koneksi internet.",
        features: [
          "Semua Fitur Growup",
          "Multi-kasir (Maks. 3 Kasir)",
          "Manajemen Stok & Notifikasi Stok Menipis",
          "Kirim Struk via PDF / WhatsApp",
          "Diskon & Manajemen Promo",
          "PWA Offline Mode",
          "Kapasitas: Hingga 1.000 Produk",
        ],
        highlight:
          "Untuk minimarket atau toko ritel yang aktif dan membutuhkan sistem yang bisa diandalkan setiap hari.",
      },
      {
        tier: "business",
        title: "Business",
        price: "Rp 6.000.000",
        rawPrice: 6000000,
        description:
          "Ekosistem ritel multi-cabang yang saling terhubung — stok terpantau, laporan terintegrasi, dan pelanggan loyal terdata.",
        features: [
          "Semua Fitur Pro",
          "Multi-outlet & Multi-cabang",
          "Transfer & Sinkronisasi Stok Antar Cabang",
          "CRM Loyalty Point Pelanggan",
          "Pajak & Service Charge Custom",
          "Kasir & Produk Tidak Terbatas",
          "Support Prioritas 24/7",
        ],
        highlight:
          "Solusi terpadu untuk jaringan toko ritel yang ingin mengelola semua cabang dari satu platform.",
      },
    ],
    proyek: [
      {
        tier: "standard",
        title: "Standard",
        price: "Rp 800.000",
        rawPrice: 800000,
        description:
          "Tampilkan portofolio proyek dan identitas perusahaan kontraktor Anda secara profesional di internet.",
        features: [
          "1 Halaman Portofolio Kontraktor",
          "Galeri Foto Proyek Selesai",
          "Profil Perusahaan & Informasi Kontak",
          "Tombol Ajukan Penawaran (WhatsApp)",
          "Tampilan Responsif (HP & Desktop)",
          "Estimasi Selesai: 7–14 Hari Kerja",
        ],
        highlight:
          "Langkah awal yang ideal untuk kontraktor yang ingin membangun kepercayaan calon klien secara digital.",
      },
      {
        tier: "growup",
        title: "Growup",
        price: "Rp 2.500.000",
        rawPrice: 2500000,
        description:
          "Website portofolio ditambah dashboard manajemen proyek dasar — pantau anggaran dan tugaskan pekerjaan kepada tim lapangan dengan lebih terstruktur.",
        features: [
          "Semua Fitur Standard",
          "Dashboard Manajemen Proyek Sederhana",
          "Pencatatan Rencana Anggaran (RAB Dasar)",
          "Task Tracker & Pembagian Tugas Tim",
          "Maks. 3 Proyek Aktif, 5 Anggota Tim",
        ],
        highlight:
          "Untuk kontraktor yang mulai mengelola beberapa proyek sekaligus dan ingin koordinasi tim lebih lancar.",
      },
      {
        tier: "pro",
        title: "Pro",
        price: "Rp 4.800.000",
        rawPrice: 4800000,
        description:
          "Platform manajemen proyek lengkap dengan database AHSP sipil — kalkulasi anggaran proyek lebih akurat, dan laporan lapangan bisa diakses real-time.",
        features: [
          "Semua Fitur Growup",
          "Database AHSP (Analisis Harga Satuan Pekerjaan)",
          "Kalkulator Anggaran Proyek Otomatis",
          "Laporan Harian Lapangan Real-time",
          "Lampiran Dokumen Proyek",
          "Maks. 10 Proyek Aktif, 20 Anggota Tim",
        ],
        highlight:
          "Ideal untuk kontraktor yang sering mengerjakan proyek sipil skala menengah dan butuh akurasi kalkulasi biaya.",
      },
      {
        tier: "business",
        title: "Business",
        price: "Rp 8.500.000",
        rawPrice: 8500000,
        description:
          "Sistem manajemen proyek enterprise dengan portal transparansi khusus untuk klien — mereka bisa memantau progress langsung tanpa perlu menelepon.",
        features: [
          "Semua Fitur Pro",
          "Client Portal (Pantau Progress Proyek Secara Mandiri)",
          "Invoice & Progress Billing Otomatis",
          "Custom Domain Portal Klien",
          "Multi-perusahaan / Multi-tenant",
          "Proyek & Tim Tidak Terbatas",
          "Support Prioritas 24/7",
        ],
        highlight:
          "Untuk perusahaan kontraktor besar yang mengelola banyak proyek dan klien sekaligus.",
      },
    ],
    agensi: [
      {
        tier: "standard",
        title: "Standard",
        price: "Rp 800.000",
        rawPrice: 800000,
        description:
          "Hadirkan identitas agensi atau studio kreatif Anda secara online dengan portofolio yang bersih dan menarik.",
        features: [
          "1 Halaman Profil Agensi",
          "Portofolio Layanan & Karya",
          "Tampilan Klien & Testimoni",
          "Tombol Hubungi via WhatsApp",
          "Tampilan Responsif (HP & Desktop)",
          "Estimasi Selesai: 7–14 Hari Kerja",
        ],
        highlight:
          "Cara paling cepat bagi agensi untuk tampil profesional dan memperluas jangkauan klien potensial.",
      },
      {
        tier: "growup",
        title: "Growup",
        price: "Rp 2.200.000",
        rawPrice: 2200000,
        description:
          "Website agensi dilengkapi platform meeting digital dengan transkripsi otomatis — dokumentasi briefing lebih akurat dan bisa diakses kapan saja.",
        features: [
          "Semua Fitur Standard",
          "Live Meeting Room (WebRTC Audio & Video)",
          "Transkripsi Suara Real-time (Speech-to-Text)",
          "Upload & Simpan Rekaman Rapat",
          "Unduh Notulen sebagai Google Docs / MS Word",
          "Maks. 5 Meeting/Bulan, 100 Menit Transkripsi",
        ],
        highlight:
          "Untuk agensi yang ingin memastikan setiap detail briefing klien terdokumentasi dengan baik.",
      },
      {
        tier: "pro",
        title: "Pro",
        price: "Rp 3.800.000",
        rawPrice: 3800000,
        description:
          "AI otomatis menyusun ringkasan rapat, daftar tugas, tenggat waktu, dan potensi risiko — satu klik setelah meeting selesai.",
        features: [
          "Semua Fitur Growup",
          "Analisis Rapat oleh AI (Gemini 2.5 Flash)",
          "Ringkasan Otomatis, Action Items & Decisions",
          "Identifikasi Risiko & Rekomendasi Mitigasi",
          "Ekspor Langsung ke Notion",
          "Kirim Notulen Otomatis via WhatsApp & Email",
          "Maks. 25 Meeting/Bulan, 500 Menit Transkripsi",
        ],
        highlight:
          "Paket terlaris untuk agensi yang ingin meningkatkan profesionalisme dan kecepatan follow-up pasca meeting.",
      },
      {
        tier: "business",
        title: "Business",
        price: "Rp 7.000.000",
        rawPrice: 7000000,
        description:
          "Platform kolaborasi enterprise dengan keamanan tingkat tinggi, multi-workspace, dan monitoring penggunaan AI secara mendetail.",
        features: [
          "Semua Fitur Pro",
          "Monitoring Biaya & Penggunaan Token AI",
          "Multi-workspace & Kolaborasi Tim",
          "Panel Keamanan Edge IP Block (Firewall)",
          "Sistem Honeypot & Audit Log",
          "Meeting & Transkripsi Tidak Terbatas",
          "Support Prioritas 24/7",
        ],
        highlight:
          "Untuk agensi skala besar yang menangani banyak klien dan memprioritaskan keamanan data.",
      },
    ],
  };

  /* ──────────────────── COMPARISON TABLE DATA ──────────────────── */
  const comparisonData: Record<TabType, ComparisonFeature[]> = {
    kuliner: [
      { name: "Website Profil Usaha", std: "✔ 1 Halaman", grow: "✔ 1 Halaman", pro: "✔ Premium", biz: "✔ Custom Enterprise" },
      { name: "Sistem Reservasi Meja", std: "—", grow: "✔ Digital", pro: "✔ + Notif WA", biz: "✔ + Notif WA" },
      { name: "QR Ordering & Live Cart", std: "—", grow: "—", pro: "✔", biz: "✔" },
      { name: "Kitchen View Dashboard", std: "—", grow: "—", pro: "✔", biz: "✔" },
      { name: "CRM & Loyalty Tier", std: "—", grow: "—", pro: "✔", biz: "✔ Analytics Mendalam" },
      { name: "Laporan Penjualan & CSV", std: "—", grow: "—", pro: "✔", biz: "✔" },
      { name: "Kapasitas Meja", std: "—", grow: "Maks. 5", pro: "Maks. 20", biz: "Tidak Terbatas" },
      { name: "AI Menu Import", std: "—", grow: "—", pro: "—", biz: "✔" },
      { name: "Multi-outlet / Multi-tenant", std: "—", grow: "—", pro: "—", biz: "✔" },
    ],
    ritel: [
      { name: "Website Profil Toko", std: "✔ 1 Halaman", grow: "✔ 1 Halaman", pro: "✔ Premium", biz: "✔ Custom Enterprise" },
      { name: "Sistem Kasir (POS)", std: "—", grow: "✔ Dasar", pro: "✔ Pro + PWA Offline", biz: "✔ Multi-cabang" },
      { name: "Kapasitas Produk", std: "—", grow: "Maks. 100", pro: "Maks. 1.000", biz: "Tidak Terbatas" },
      { name: "Notifikasi Stok Menipis", std: "—", grow: "—", pro: "✔", biz: "✔ + Sinkronisasi" },
      { name: "Struk Digital (PDF/WA)", std: "—", grow: "—", pro: "✔", biz: "✔ Custom Logo" },
      { name: "Jumlah Kasir Aktif", std: "—", grow: "1 Kasir", pro: "Maks. 3 Kasir", biz: "Tidak Terbatas" },
      { name: "Diskon & Manajemen Promo", std: "—", grow: "—", pro: "✔", biz: "✔ + Loyalty Point" },
      { name: "Transfer Stok Antar Cabang", std: "—", grow: "—", pro: "—", biz: "✔" },
    ],
    proyek: [
      { name: "Website Portofolio", std: "✔ 1 Halaman", grow: "✔ 1 Halaman", pro: "✔ Premium", biz: "✔ Custom Enterprise" },
      { name: "Dashboard RAB & Anggaran", std: "—", grow: "✔ Dasar", pro: "✔ Auto + AHSP", biz: "✔ Auto + AHSP" },
      { name: "Task Management Tim", std: "—", grow: "✔ Sederhana", pro: "✔ Progress Lapangan", biz: "✔ Full Workflows" },
      { name: "Database AHSP Sipil", std: "—", grow: "—", pro: "✔ Lengkap", biz: "✔ Custom" },
      { name: "Laporan Harian Lapangan", std: "—", grow: "—", pro: "✔ Real-time", biz: "✔ + Lampiran" },
      { name: "Client Portal Transparansi", std: "—", grow: "—", pro: "—", biz: "✔ Custom Domain" },
      { name: "Progress Billing Otomatis", std: "—", grow: "—", pro: "—", biz: "✔" },
      { name: "Maks. Proyek Aktif", std: "—", grow: "3 Proyek", pro: "10 Proyek", biz: "Tidak Terbatas" },
    ],
    agensi: [
      { name: "Website Profil Agensi", std: "✔ 1 Halaman", grow: "✔ 1 Halaman", pro: "✔ Premium", biz: "✔ Custom Enterprise" },
      { name: "Live Meeting Room (WebRTC)", std: "—", grow: "✔", pro: "✔", biz: "✔" },
      { name: "Transkripsi Suara Real-time", std: "—", grow: "✔", pro: "✔", biz: "✔" },
      { name: "Analisis Meeting oleh AI", std: "—", grow: "—", pro: "✔ Gemini 2.5", biz: "✔ Token Custom" },
      { name: "Ekspor ke Notion & Google Docs", std: "—", grow: "✔ Google Docs", pro: "✔ Notion + GDocs", biz: "✔ Notion Mapping" },
      { name: "Kirim Notulen Otomatis (WA/Email)", std: "—", grow: "—", pro: "✔", biz: "✔" },
      { name: "Keamanan Edge Firewall", std: "—", grow: "—", pro: "—", biz: "✔ 8-Layer + Honeypot" },
      { name: "Maks. Transkripsi/Bulan", std: "—", grow: "100 Menit", pro: "500 Menit", biz: "Tidak Terbatas" },
    ],
  };

  /* ──────────────────── HANDLERS ──────────────────── */
  const handleOpenCheckout = (saas: TabType, tier: TierType, basePrice: number) => {
    setSelectedPackage({ saas, tier, basePrice });
    setDomainChoice("subdomain");
    setCheckoutData({ name: "", whatsapp: "", email: "", subdomain: "", customDomain: "" });
    setSimulatedInvoiceId("SIV-INV-" + Math.floor(100000 + Math.random() * 900000));
    setSimulationStep("checkout");
    setShowCheckoutModal(true);
  };

  const totalPrice = selectedPackage
    ? selectedPackage.basePrice + (domainChoice === "custom" ? DOMAIN_ADDON_PRICE : 0)
    : 0;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const needSubdomain = selectedPackage?.tier !== "standard" && domainChoice === "subdomain";
    const needCustom = domainChoice === "custom";
    if (!checkoutData.name || !checkoutData.whatsapp || !checkoutData.email) {
      alert("Mohon lengkapi semua data yang diperlukan.");
      return;
    }
    if (needSubdomain && !checkoutData.subdomain) {
      alert("Mohon isi nama subdomain yang Anda inginkan.");
      return;
    }
    if (needCustom && !checkoutData.customDomain) {
      alert("Mohon masukkan nama domain yang Anda miliki.");
      return;
    }
    setSimulationStep("payment");
  };

  const handleSimulatePayment = () => setSimulationStep("success");

  /* ──────────────────── RENDER ──────────────────── */
  return (
    <div className="page-wrapper" style={{ background: "var(--color-canvas)", color: "var(--color-body)" }}>
      <Navbar />
      <main id="main-content" style={{ paddingTop: "120px", paddingBottom: "100px" }}>

        {/* HERO */}
        <section style={{ textAlign: "center", marginBottom: "4rem", padding: "0 20px" }}>
          <div className="container">
            <span style={{ color: "var(--color-primary)", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", fontSize: "0.8rem" }}>
              Sivilize Ecosystem — Paket Bundling
            </span>
            <h1 style={{ color: "#fff", fontSize: "clamp(2rem, 5vw, 3.8rem)", fontWeight: 900, marginTop: "1rem", lineHeight: 1.1, letterSpacing: "-0.04em" }}>
              WEBSITE PROFESIONAL +<br />SISTEM OPERASIONAL DIGITAL.
            </h1>
            <p style={{ maxWidth: "680px", margin: "1.5rem auto 0", fontSize: "1.05rem", color: "var(--color-body)", lineHeight: 1.8 }}>
              Lebih dari sekadar website — dapatkan solusi digital terintegrasi yang membantu bisnis Anda beroperasi lebih efisien sejak hari pertama. Pilih lini bisnis Anda di bawah ini:
            </p>
          </div>
        </section>

        {/* TAB SWITCHER */}
        <section className="container" style={{ marginBottom: "3rem" }}>
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            flexWrap: "wrap",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            padding: "8px",
            borderRadius: "10px",
            maxWidth: "760px",
            margin: "0 auto",
          }}>
            {(Object.keys(tabLabels) as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "11px 20px",
                  background: activeTab === tab ? "var(--color-primary)" : "transparent",
                  color: activeTab === tab ? "#fff" : "var(--color-body)",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  letterSpacing: "0.5px",
                  transition: "all 0.25s ease",
                  boxShadow: activeTab === tab ? "0 0 16px rgba(79,70,229,0.4)" : "none",
                }}
              >
                {tabLabels[tab]}
              </button>
            ))}
          </div>
        </section>

        {/* PRICING CARDS */}
        <section className="container" style={{ marginBottom: "5rem" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "22px",
            alignItems: "stretch",
          }}>
            {packages[activeTab].map((pkg) => {
              const isStd = pkg.tier === "standard";
              const isBiz = pkg.tier === "business";
              const isBest = pkg.tier === "pro";
              const accentColor = isBiz ? "#06b6d4" : "var(--color-primary)";

              return (
                <article
                  key={pkg.tier}
                  style={{
                    background: isStd ? "rgba(255,255,255,0.015)" : "rgba(255,255,255,0.03)",
                    border: isBiz ? "2px solid #06b6d4" : isBest ? "2px solid var(--color-primary)" : "1px solid rgba(255,255,255,0.07)",
                    padding: "32px 24px",
                    borderRadius: "14px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    position: "relative",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    boxShadow: isBest ? "0 8px 28px rgba(79,70,229,0.12)" : isBiz ? "0 8px 28px rgba(6,182,212,0.12)" : "none",
                  }}
                >
                  {isBest && (
                    <span style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: "var(--color-primary)", color: "#fff", padding: "4px 14px", borderRadius: "20px", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "1px", whiteSpace: "nowrap" }}>
                      PALING POPULER
                    </span>
                  )}
                  {isBiz && (
                    <span style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: "#06b6d4", color: "#fff", padding: "4px 14px", borderRadius: "20px", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "1px", whiteSpace: "nowrap" }}>
                      ENTERPRISE
                    </span>
                  )}

                  <div>
                    <h3 style={{ color: "#fff", fontSize: "1.35rem", marginBottom: "6px" }}>Paket {pkg.title}</h3>
                    <div style={{ color: accentColor, fontSize: "1.9rem", fontWeight: 900, marginBottom: "1rem", lineHeight: 1 }}>
                      {pkg.price}
                    </div>
                    <p style={{ fontSize: "0.875rem", color: "var(--color-body)", lineHeight: 1.65, marginBottom: "1.5rem" }}>
                      {pkg.description}
                    </p>

                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1.2rem", marginBottom: "1.2rem" }}>
                      <div style={{ color: accentColor, fontWeight: 700, fontSize: "0.75rem", letterSpacing: "1.2px", marginBottom: "12px" }}>
                        YANG ANDA DAPATKAN
                      </div>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        {pkg.features.map((f, i) => (
                          <li key={i} style={{ fontSize: "0.85rem", marginBottom: "8px", display: "flex", gap: "8px", alignItems: "flex-start" }}>
                            <span style={{ color: accentColor, flexShrink: 0, marginTop: "1px" }}>✓</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <div style={{ background: "rgba(79,70,229,0.06)", borderLeft: "2px solid rgba(79,70,229,0.4)", padding: "10px 12px", fontSize: "0.8rem", color: "#a5b4fc", lineHeight: 1.55, marginBottom: "1.2rem", borderRadius: "0 4px 4px 0" }}>
                      {pkg.highlight}
                    </div>
                    <button
                      onClick={() => handleOpenCheckout(activeTab, pkg.tier, pkg.rawPrice)}
                      style={{
                        width: "100%",
                        padding: "14px",
                        background: isBiz ? "#06b6d4" : isStd ? "rgba(255,255,255,0.07)" : "var(--color-primary)",
                        color: "#fff",
                        border: isBiz || !isStd ? "none" : "1px solid rgba(255,255,255,0.15)",
                        borderRadius: "6px",
                        fontWeight: 700,
                        cursor: "pointer",
                        letterSpacing: "1px",
                        fontSize: "0.85rem",
                        transition: "opacity 0.2s ease",
                      }}
                    >
                      {isStd ? "Pesan Website" : "Pesan Paket Bundling →"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="container">
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h2 style={{ color: "#fff", fontSize: "1.7rem", letterSpacing: "-0.02em" }}>Perbandingan Fitur Lengkap</h2>
            <p style={{ color: "var(--color-body)", fontSize: "0.9rem", marginTop: "8px" }}>
              Bandingkan secara detail apa yang ada di setiap paket sebelum memutuskan.
            </p>
          </div>
          <div style={{ overflowX: "auto", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem", minWidth: "620px" }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.025)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <th style={{ padding: "14px 18px", color: "#fff", fontWeight: 700, textAlign: "left" }}>Fitur</th>
                  <th style={{ padding: "14px 16px", color: "#94a3b8", fontWeight: 600, textAlign: "center" }}>Standard</th>
                  <th style={{ padding: "14px 16px", color: "#94a3b8", fontWeight: 600, textAlign: "center" }}>Growup</th>
                  <th style={{ padding: "14px 16px", color: "var(--color-primary)", fontWeight: 700, textAlign: "center" }}>Pro ★</th>
                  <th style={{ padding: "14px 16px", color: "#06b6d4", fontWeight: 700, textAlign: "center" }}>Business</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData[activeTab].map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.045)", background: i % 2 !== 0 ? "rgba(255,255,255,0.01)" : "transparent" }}>
                    <td style={{ padding: "13px 18px", color: "#e2e8f0", fontWeight: 500 }}>{row.name}</td>
                    <td style={{ padding: "13px 16px", color: "#64748b", textAlign: "center" }}>{row.std}</td>
                    <td style={{ padding: "13px 16px", color: "#94a3b8", textAlign: "center" }}>{row.grow}</td>
                    <td style={{ padding: "13px 16px", color: "var(--color-primary)", fontWeight: 600, textAlign: "center" }}>{row.pro}</td>
                    <td style={{ padding: "13px 16px", color: "#06b6d4", fontWeight: 600, textAlign: "center" }}>{row.biz}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </main>

      {/* CHECKOUT MODAL */}
      {showCheckoutModal && selectedPackage && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: "16px" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowCheckoutModal(false); }}
        >
          <div style={{ background: "#0c1120", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", width: "100%", maxWidth: "580px", maxHeight: "92vh", overflowY: "auto", padding: "32px", position: "relative" }}>
            <button onClick={() => setShowCheckoutModal(false)} style={{ position: "absolute", top: "18px", right: "18px", background: "transparent", color: "#94a3b8", border: "none", fontSize: "1.3rem", cursor: "pointer", lineHeight: 1 }}>✕</button>

            {/* STEP INDICATOR */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
              {(["checkout", "payment", "success"] as const).map((s, i) => (
                <div key={s} style={{ flex: 1, height: "3px", borderRadius: "2px", background: simulationStep === s || (s === "checkout" && simulationStep === "payment") || (s !== "success" && simulationStep === "success") ? "var(--color-primary)" : "rgba(255,255,255,0.1)", transition: "background 0.3s" }} />
              ))}
            </div>

            {/* ── STEP 1: FORM ── */}
            {simulationStep === "checkout" && (
              <form onSubmit={handleCheckoutSubmit}>
                <p style={{ color: "var(--color-primary)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "1.5px", marginBottom: "4px" }}>LANGKAH 1 / 3 — DATA PEMESANAN</p>
                <h3 style={{ color: "#fff", fontSize: "1.4rem", marginBottom: "4px" }}>
                  Paket {selectedPackage.tier.charAt(0).toUpperCase() + selectedPackage.tier.slice(1)} — {saasNames[selectedPackage.saas]}
                </h3>
                <p style={{ fontSize: "0.82rem", color: "var(--color-body)", marginBottom: "20px", lineHeight: 1.55 }}>
                  Lengkapi data di bawah ini. Setelah pembayaran dikonfirmasi, sistem akan diaktifkan secara otomatis dan akses akan dikirimkan ke WhatsApp Anda.
                </p>

                {/* Domain Choice */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ color: "#fff", fontWeight: 700, fontSize: "0.82rem", display: "block", marginBottom: "10px" }}>
                    Pilihan Domain Website
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    {(["subdomain", "custom"] as DomainType[]).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setDomainChoice(opt)}
                        style={{
                          padding: "14px 12px",
                          background: domainChoice === opt ? "rgba(79,70,229,0.15)" : "rgba(255,255,255,0.03)",
                          border: domainChoice === opt ? "2px solid var(--color-primary)" : "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "8px",
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "all 0.2s",
                        }}
                      >
                        <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.85rem", marginBottom: "4px" }}>
                          {opt === "subdomain" ? "🌐  Subdomain Sivilize" : "🔗  Domain Sendiri"}
                        </div>
                        <div style={{ color: opt === "subdomain" ? "#22c55e" : "#06b6d4", fontSize: "0.78rem", fontWeight: 700 }}>
                          {opt === "subdomain" ? "Gratis (nama.sivilize.com)" : `+${formatPrice(DOMAIN_ADDON_PRICE)} — Setup & Koneksi Domain`}
                        </div>
                        {opt === "custom" && (
                          <div style={{ color: "#64748b", fontSize: "0.72rem", marginTop: "3px" }}>
                            Anda perlu memiliki domain sendiri terlebih dahulu
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subdomain or Custom Domain Input */}
                {domainChoice === "subdomain" ? (
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ color: "#fff", fontWeight: 700, fontSize: "0.82rem", display: "block", marginBottom: "6px" }}>
                      Nama Subdomain yang Diinginkan
                    </label>
                    <div style={{ display: "flex" }}>
                      <input
                        type="text"
                        placeholder="namabisnis"
                        value={checkoutData.subdomain}
                        onChange={(e) => setCheckoutData({ ...checkoutData, subdomain: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") })}
                        style={{ flex: 1, padding: "11px 12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRight: "none", borderRadius: "6px 0 0 6px", color: "#fff", fontSize: "0.9rem" }}
                      />
                      <span style={{ padding: "11px 14px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0 6px 6px 0", color: "#64748b", fontSize: "0.85rem", whiteSpace: "nowrap" }}>
                        .sivilize.com
                      </span>
                    </div>
                  </div>
                ) : (
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ color: "#fff", fontWeight: 700, fontSize: "0.82rem", display: "block", marginBottom: "6px" }}>
                      Nama Domain yang Anda Miliki
                    </label>
                    <input
                      type="text"
                      placeholder="contoh: tokoberkah.com"
                      value={checkoutData.customDomain}
                      onChange={(e) => setCheckoutData({ ...checkoutData, customDomain: e.target.value })}
                      style={{ width: "100%", padding: "11px 12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", color: "#fff", fontSize: "0.9rem" }}
                    />
                    <small style={{ color: "#475569", fontSize: "0.73rem" }}>Tim kami akan membantu proses koneksi domain Anda ke sistem.</small>
                  </div>
                )}

                {/* Personal Info */}
                {[
                  { key: "name", label: "Nama Pemilik / Bisnis", type: "text", placeholder: "Contoh: Budi Santoso / Kopi Nusantara" },
                  { key: "whatsapp", label: "Nomor WhatsApp Aktif", type: "tel", placeholder: "628123456789" },
                  { key: "email", label: "Alamat Email", type: "email", placeholder: "email@domain.com" },
                ].map((field) => (
                  <div key={field.key} style={{ marginBottom: "14px" }}>
                    <label style={{ color: "#fff", fontWeight: 700, fontSize: "0.82rem", display: "block", marginBottom: "6px" }}>{field.label}</label>
                    <input
                      type={field.type}
                      required
                      placeholder={field.placeholder}
                      value={(checkoutData as Record<string, string>)[field.key]}
                      onChange={(e) => setCheckoutData({ ...checkoutData, [field.key]: e.target.value })}
                      style={{ width: "100%", padding: "11px 12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", color: "#fff", fontSize: "0.9rem" }}
                    />
                  </div>
                ))}

                {/* Order Summary */}
                <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "8px", padding: "14px 16px", marginTop: "20px", marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "6px" }}>
                    <span>Paket {selectedPackage.tier.charAt(0).toUpperCase() + selectedPackage.tier.slice(1)}</span>
                    <span style={{ color: "#fff" }}>{formatPrice(selectedPackage.basePrice)}</span>
                  </div>
                  {domainChoice === "custom" && (
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "6px" }}>
                      <span>Setup Domain Sendiri</span>
                      <span style={{ color: "#06b6d4" }}>+{formatPrice(DOMAIN_ADDON_PRICE)}</span>
                    </div>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "10px", marginTop: "8px", fontWeight: 800 }}>
                    <span style={{ color: "#fff" }}>Total Tagihan</span>
                    <span style={{ color: "var(--color-primary)", fontSize: "1.1rem" }}>{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                <button type="submit" style={{ width: "100%", padding: "14px", background: "var(--color-primary)", color: "#fff", border: "none", borderRadius: "6px", fontWeight: 700, cursor: "pointer", fontSize: "0.9rem", letterSpacing: "0.5px" }}>
                  Lanjut ke Pembayaran →
                </button>
              </form>
            )}

            {/* ── STEP 2: PAYMENT SIMULATOR ── */}
            {simulationStep === "payment" && (
              <div style={{ textAlign: "center" }}>
                <p style={{ color: "#eab308", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "1.5px", marginBottom: "4px" }}>LANGKAH 2 / 3 — PEMBAYARAN</p>
                <h3 style={{ color: "#fff", fontSize: "1.35rem", marginBottom: "16px" }}>Selesaikan Pembayaran</h3>

                {/* Invoice Summary */}
                <div style={{ background: "#080c14", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", padding: "16px", marginBottom: "20px", textAlign: "left" }}>
                  {[
                    ["Invoice ID", simulatedInvoiceId],
                    ["Nama", checkoutData.name],
                    ["Domain", domainChoice === "subdomain" ? `${checkoutData.subdomain}.sivilize.com` : checkoutData.customDomain],
                    ["Paket", `${selectedPackage.tier.toUpperCase()} — ${saasNames[selectedPackage.saas]}`],
                  ].map(([label, val]) => (
                    <div key={label} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "8px", marginBottom: "8px", fontSize: "0.83rem", gap: "12px" }}>
                      <span style={{ color: "#64748b", flexShrink: 0 }}>{label}:</span>
                      <span style={{ color: "#fff", fontWeight: 600, textAlign: "right", wordBreak: "break-all" }}>{val}</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: "0.95rem" }}>
                    <span style={{ color: "#fff" }}>Total</span>
                    <span style={{ color: "#22c55e" }}>{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                {/* Simulated QRIS */}
                <div style={{ margin: "0 auto 16px", maxWidth: "180px", padding: "14px", background: "#fff", borderRadius: "10px" }}>
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SivilizePaymentDemo" alt="Simulated QRIS" style={{ width: "100%", display: "block" }} />
                  <div style={{ color: "#000", fontWeight: 800, fontSize: "0.7rem", marginTop: "8px", letterSpacing: "0.5px" }}>QRIS — SIMULASI</div>
                </div>

                <p style={{ fontSize: "0.8rem", color: "var(--color-body)", marginBottom: "20px", lineHeight: 1.6 }}>
                  Ini adalah simulasi tampilan pembayaran. Di implementasi nyata, pelanggan dapat membayar via QRIS, transfer Bank, atau Virtual Account secara instan.
                </p>

                <button onClick={handleSimulatePayment} style={{ width: "100%", padding: "14px", background: "#22c55e", color: "#fff", border: "none", borderRadius: "6px", fontWeight: 700, cursor: "pointer", fontSize: "0.9rem", boxShadow: "0 0 20px rgba(34,197,94,0.3)" }}>
                  Simulasi Pembayaran Berhasil →
                </button>
              </div>
            )}

            {/* ── STEP 3: SUCCESS + WA MOCKUP ── */}
            {simulationStep === "success" && (
              <div>
                <div style={{ textAlign: "center", marginBottom: "24px" }}>
                  <p style={{ color: "#22c55e", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "1.5px", marginBottom: "8px" }}>LANGKAH 3 / 3 — SISTEM AKTIF</p>
                  <div style={{ width: "56px", height: "56px", background: "rgba(34,197,94,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", color: "#22c55e", fontSize: "1.6rem" }}>✓</div>
                  <h3 style={{ color: "#fff", fontSize: "1.35rem", margin: "0 0 8px" }}>Pembayaran Berhasil!</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--color-body)", lineHeight: 1.6 }}>
                    Sistem <strong style={{ color: "#fff" }}>{selectedPackage.tier.toUpperCase()}</strong> untuk {saasNames[selectedPackage.saas]} telah diaktifkan secara otomatis. Akses dikirimkan melalui WhatsApp berikut ini:
                  </p>
                </div>

                {/* WA Mockup */}
                <div style={{ background: "#0b1621", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "14px", marginBottom: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "10px", marginBottom: "12px" }}>
                    <div style={{ width: "34px", height: "34px", background: "#25D366", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "0.75rem", flexShrink: 0 }}>SV</div>
                    <div>
                      <div style={{ color: "#fff", fontSize: "0.85rem", fontWeight: 700 }}>Sivilize Corp</div>
                      <div style={{ fontSize: "0.7rem", color: "#25D366" }}>Bot Notifikasi Transaksi</div>
                    </div>
                  </div>
                  <div style={{ background: "#1a2c1a", border: "1px solid rgba(37,211,102,0.15)", padding: "12px 14px", borderRadius: "0 10px 10px 10px", fontSize: "0.8rem", color: "#e2e8f0", lineHeight: 1.65, maxWidth: "90%" }}>
                    <p style={{ margin: "0 0 6px", fontWeight: 700, color: "#25D366" }}>✅ PEMBAYARAN DIKONFIRMASI</p>
                    <p style={{ margin: "0 0 6px" }}>Halo <strong>{checkoutData.name}</strong>,</p>
                    <p style={{ margin: "0 0 6px" }}>Pembayaran <strong>{simulatedInvoiceId}</strong> sebesar <strong>{formatPrice(totalPrice)}</strong> untuk paket <strong>{selectedPackage.tier.toUpperCase()}</strong> telah kami terima.</p>
                    <p style={{ margin: "0 0 6px" }}>
                      Sistem Anda telah aktif dan dapat diakses di:<br />
                      <span style={{ color: "#34b7f1" }}>
                        {domainChoice === "subdomain"
                          ? `https://${checkoutData.subdomain || "bisnis"}.sivilize.com`
                          : `https://${checkoutData.customDomain || "domain-anda.com"}`}
                      </span>
                    </p>
                    <p style={{ margin: "0 0 10px" }}>Klik tautan berikut untuk mengatur akses admin pertama kali:</p>
                    <div style={{ background: "rgba(0,0,0,0.3)", padding: "8px 10px", borderRadius: "4px", fontFamily: "monospace", color: "#fbbf24", fontSize: "0.75rem", wordBreak: "break-all", marginBottom: "8px" }}>
                      https://sivilize.com/onboarding?token=tkn_{simulatedInvoiceId}
                    </div>
                    <span style={{ display: "block", textAlign: "right", fontSize: "0.65rem", color: "#4a5568" }}>Pesan Otomatis — {new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                </div>

                <p style={{ fontSize: "0.8rem", color: "var(--color-body)", marginBottom: "20px", textAlign: "center", lineHeight: 1.6 }}>
                  Di sistem live, seluruh proses ini — mulai dari konfirmasi pembayaran, aktivasi database, hingga pengiriman akses — berlangsung secara otomatis dalam hitungan detik.
                </p>

                <button onClick={() => setShowCheckoutModal(false)} style={{ width: "100%", padding: "14px", background: "var(--color-primary)", color: "#fff", border: "none", borderRadius: "6px", fontWeight: 700, cursor: "pointer", fontSize: "0.9rem" }}>
                  Selesai
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
      <SiteEffects />
      <div className="page-transition-overlay" />
    </div>
  );
}
