"use client";

import { use } from "react";
import { useRouter } from "next/navigation";

// Database 12 Demo Projects sesuai spesifikasi user
const demoData: Record<string, {
  title: string;
  themeColor: string;
  glowColor: string;
  decorations: string[];
  features: string[];
  layout: string;
  icon: string;
}> = {
  "hospital": {
    title: "Rumah Sakit & Klinik",
    themeColor: "#10b981", // Emerald Green
    glowColor: "rgba(16, 185, 129, 0.2)",
    decorations: ["Medical Cross", "Stethoscope", "Pulse Line", "Daun Hijau Kecil"],
    features: ["Pendaftaran Pasien", "Jadwal Dokter", "Dashboard Admin", "Riwayat Pasien", "Informasi Layanan"],
    layout: "hospital",
    icon: "🏥"
  },
  "pharmacy": {
    title: "Apotek Digital",
    themeColor: "#06b6d4", // Teal Cyan
    glowColor: "rgba(6, 182, 212, 0.2)",
    decorations: ["Katalog Obat", "Kapsul", "Botol Obat", "Medical Shelf", "Ikon Farmasi"],
    features: ["Katalog Produk", "Stok Obat", "Pemesanan Online", "Dashboard Apotek", "Manajemen Produk"],
    layout: "pharmacy",
    icon: "💊"
  },
  "company": {
    title: "Landing Page Perusahaan",
    themeColor: "#4f46e5", // Indigo Blue
    glowColor: "rgba(79, 70, 229, 0.2)",
    decorations: ["Gedung Modern", "Grafik Pertumbuhan", "Company Dashboard", "Corporate Document"],
    features: ["Company Profile", "Lead Generation", "Service Showcase", "Contact Form", "Portfolio"],
    layout: "corporate",
    icon: "🏢"
  },
  "souvenir": {
    title: "Toko Souvenir",
    themeColor: "#f59e0b", // Amber Gold
    glowColor: "rgba(245, 158, 11, 0.2)",
    decorations: ["Gift Box", "Product Showcase", "Ribbon", "Product Card", "Shopping Experience"],
    features: ["Katalog Produk", "WhatsApp Order", "Testimoni", "Galeri Produk", "Promo"],
    layout: "creative",
    icon: "🎁"
  },
  "library": {
    title: "Sistem Perpustakaan",
    themeColor: "#8b5cf6", // Purple Violet
    glowColor: "rgba(139, 92, 246, 0.2)",
    decorations: ["Rak Buku", "Kartu Anggota", "Dashboard Perpustakaan", "Buku Digital"],
    features: ["Manajemen Buku", "Peminjaman", "Pengembalian", "Dashboard Admin", "Pencarian Buku"],
    layout: "library",
    icon: "📚"
  },
  "travel": {
    title: "Travel & Tour",
    themeColor: "#0ea5e9", // Sky Blue
    glowColor: "rgba(14, 165, 233, 0.2)",
    decorations: ["Pesawat", "Peta Perjalanan", "Lokasi Wisata", "Booking Panel"],
    features: ["Paket Wisata", "Booking Online", "Galeri Destinasi", "Jadwal Tour", "Customer Management"],
    layout: "travel",
    icon: "✈️"
  },
  "cafe": {
    title: "Cafe & Resto",
    themeColor: "#ea580c", // Orange Brown
    glowColor: "rgba(234, 88, 12, 0.2)",
    decorations: ["Coffee Cup", "Menu Digital", "Makanan", "Reservasi Meja", "Order Dashboard"],
    features: ["Digital Menu", "Reservasi", "Pemesanan", "Promo", "Dashboard Pesanan"],
    layout: "cafe",
    icon: "☕"
  },
  "property": {
    title: "Property & Developer",
    themeColor: "#f97316", // Slate Orange (Orange Slate)
    glowColor: "rgba(249, 115, 22, 0.2)",
    decorations: ["Gedung Tinggi", "Blueprint", "Site Plan", "Property Showcase"],
    features: ["Katalog Properti", "Landing Page Proyek", "Lead Generation", "Form Konsultasi", "Progress Proyek"],
    layout: "property",
    icon: "🏙️"
  },
  "school": {
    title: "Sekolah & Akademi",
    themeColor: "#6366f1", // Blue Purple
    glowColor: "rgba(99, 102, 241, 0.2)",
    decorations: ["Classroom", "Dashboard Siswa", "E-learning Panel", "Academic Management"],
    features: ["Informasi Sekolah", "Pendaftaran", "Dashboard Siswa", "Jadwal Pelajaran", "E-Learning"],
    layout: "school",
    icon: "🏫"
  },
  "hotel": {
    title: "Hotel & Penginapan",
    themeColor: "#3b82f6", // Royal Blue
    glowColor: "rgba(59, 130, 246, 0.2)",
    decorations: ["Hotel Booking", "Room Showcase", "Reservation System", "Luxury Hospitality"],
    features: ["Booking Kamar", "Room Showcase", "Galeri Hotel", "Promo", "Customer Management"],
    layout: "hotel",
    icon: "🏨"
  },
  "workshop": {
    title: "Bengkel & Otomotif",
    themeColor: "#f97316", // Red Orange
    glowColor: "rgba(249, 115, 22, 0.2)",
    decorations: ["Mobil", "Motor", "Service Dashboard", "Sparepart Showcase"],
    features: ["Booking Service", "Sparepart Catalog", "Riwayat Servis", "Dashboard Bengkel", "WhatsApp Booking"],
    layout: "workshop",
    icon: "🚗"
  },
  "ecommerce": {
    title: "Toko Online / E-Commerce",
    themeColor: "#2563eb", // Electric Blue
    glowColor: "rgba(37, 99, 235, 0.2)",
    decorations: ["Product Grid", "Shopping Cart", "Checkout Flow", "Sales Analytics"],
    features: ["Katalog Produk", "Keranjang Belanja", "Checkout", "Dashboard Penjualan", "Manajemen Produk"],
    layout: "ecommerce",
    icon: "🛒"
  }
};

export default function DemoPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const demo = demoData[id];

  if (!demo) {
    return (
      <div style={{ background: "#020617", color: "#fff", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <h2>Demo Tidak Ditemukan</h2>
        <button onClick={() => router.push("/")} style={{ marginTop: 20, padding: "10px 20px", background: "#4f46e5", border: "none", color: "#fff", cursor: "pointer", borderRadius: 6 }}>
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  // Render Visual Layout Khusus Per Industri (100% Berbeda Tata Letaknya)
  const renderVisualMockup = () => {
    switch (demo.layout) {
      case "hospital":
        return (
          <div style={{ background: "#0b151f", border: "1px solid #10b98133", borderRadius: 12, padding: 30, display: "grid", gridTemplateColumns: "250px 1fr", gap: 30 }}>
            {/* Klinik Sidebar Panel */}
            <div style={{ background: "#0f2130", borderRadius: 8, padding: 20, borderLeft: "4px solid #10b981" }}>
              <div style={{ display: "flex", gap: 8, color: "#10b981", fontWeight: 700, marginBottom: 20 }}>
                <span>🏥</span> KLINIK SEHAT CORE
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: "0.85rem", color: "#94a3b8" }}>
                <div style={{ padding: 10, background: "rgba(16,185,129,0.1)", color: "#fff", borderRadius: 4 }}>🩺 Antrean Pasien</div>
                <div>📅 Jadwal Dokter Spesialis</div>
                <div>💊 Apotek Internal</div>
                <div>🧾 Invoice / Tagihan</div>
              </div>
            </div>
            {/* Central Hospital Screen */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <h3 style={{ textTransform: "none", margin: 0, fontSize: "1.3rem" }}>📋 Pendaftaran Pasien Rawat Jalan</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div style={{ background: "#0f2130", padding: 20, borderRadius: 8 }}>
                  <div style={{ color: "#94a3b8", fontSize: "0.8rem" }}>Pasien Terdaftar Hari Ini</div>
                  <div style={{ fontSize: "2rem", fontWeight: 900, color: "#10b981", margin: "10px 0" }}>142 Jiwa</div>
                  <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Status: Stabil optimal</span>
                </div>
                <div style={{ background: "#0f2130", padding: 20, borderRadius: 8 }}>
                  <div style={{ color: "#94a3b8", fontSize: "0.8rem" }}>Kamar Rawat Inap Tersedia</div>
                  <div style={{ fontSize: "2rem", fontWeight: 900, color: "#f59e0b", margin: "10px 0" }}>18 Bed</div>
                  <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Update: 2 menit yang lalu</span>
                </div>
              </div>
              {/* Pulse line chart placeholder */}
              <div style={{ height: 100, border: "1px dashed rgba(255,255,255,0.05)", borderRadius: 8, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <span style={{ color: "#10b981", position: "absolute", left: 20 }}>Pulse Monitor</span>
                <svg width="100%" height="60" style={{ stroke: "#10b981", strokeWidth: 2, fill: "none" }}>
                  <path d="M0,30 L100,30 L120,10 L140,50 L160,30 L250,30 L270,5 L290,55 L310,30 L600,30" />
                </svg>
              </div>
            </div>
          </div>
        );

      case "pharmacy":
        return (
          <div style={{ background: "#0a1820", border: "1px solid #06b6d433", borderRadius: 12, padding: 30 }}>
            {/* Pharmacy Grid layout */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: "2rem" }}>💊</span>
                <div>
                  <h3 style={{ textTransform: "none", margin: 0 }}>Apotek Sejahtera Digital</h3>
                  <p style={{ margin: 0, color: "#64748b", fontSize: "0.8rem" }}>Sistem Kontrol Inventory & POS</p>
                </div>
              </div>
              <div style={{ padding: "8px 16px", background: "rgba(6,182,212,0.1)", border: "1px solid #06b6d4", color: "#06b6d4", borderRadius: 20, fontSize: "0.8rem" }}>
                POS Kasir Aktif
              </div>
            </div>
            {/* Shelf Items */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {[
                { name: "Paracetamol 500mg", stock: "142 Box", price: "Rp 12.000", alert: false },
                { name: "Amoxicillin Trihydrate", stock: "12 Botol", price: "Rp 34.000", alert: true },
                { name: "Vitamin C Active 1000mg", stock: "89 Strip", price: "Rp 15.000", alert: false }
              ].map((item) => (
                <div key={item.name} style={{ background: "#10232e", padding: 20, borderRadius: 8, border: item.alert ? "1px solid #ef444455" : "1px solid transparent" }}>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 12 }}>{item.name}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "#94a3b8" }}>
                    <span>Stok: <strong style={{ color: item.alert ? "#ef4444" : "#fff" }}>{item.stock}</strong></span>
                    <span>{item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "corporate":
        return (
          <div style={{ background: "#0b0c16", border: "1px solid #4f46e533", borderRadius: 12, padding: 40, position: "relative" }}>
            {/* Corporate Grid layout */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(to right, #4f46e5, #818cf8)" }} />
            <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
              <div style={{ fontSize: "0.8rem", color: "#818cf8", letterSpacing: 4, textTransform: "uppercase", marginBottom: 16 }}>INNOVATION FOR BUSINESS</div>
              <h2 style={{ textTransform: "none", fontSize: "2.2rem", fontWeight: 900, lineHeight: 1.2, color: "#fff", marginBottom: 20 }}>
                Membangun Infrastruktur Digital Masa Depan Perusahaan Anda
              </h2>
              <p style={{ color: "#94a3b8", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: 30 }}>
                Kami membantu mentransformasikan alur kerja manual korporat Anda menjadi sistem terintegrasi cloud yang aman, cepat, dan scalable.
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                <button style={{ padding: "14px 28px", background: "#4f46e5", border: "none", color: "#fff", fontWeight: 700, borderRadius: 6 }}>Mulai Konsultasi</button>
                <button style={{ padding: "14px 28px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontWeight: 700, borderRadius: 6 }}>Lihat Profil</button>
              </div>
            </div>
          </div>
        );

      case "creative":
        return (
          <div style={{ background: "#1b140a", border: "1px solid #f59e0b33", borderRadius: 12, padding: 30 }}>
            {/* Souvenir/Creative layout */}
            <h3 style={{ textTransform: "none", color: "#f59e0b", marginBottom: 24, fontSize: "1.3rem" }}>✨ Galeri Mahakarya Lokal & Souvenir</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              {[
                { title: "Anyaman Bambu Tradisional", category: "Dekorasi Rumah", img: "🏺" },
                { title: "Gantungan Kunci Kayu Ukir", category: "Aksesoris", img: "🪵" },
                { title: "Batik Canting Tulis Solo", category: "Sandangan", img: "👘" },
                { title: "Tas Etnik Kulit Sapi", category: "Fashion", img: "👜" }
              ].map((p) => (
                <div key={p.title} style={{ background: "#261d0f", borderRadius: 8, padding: 16, textAlign: "center", border: "1px solid rgba(245,158,11,0.05)" }}>
                  <div style={{ fontSize: "3rem", margin: "10px 0" }}>{p.img}</div>
                  <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#fff", marginBottom: 6 }}>{p.title}</div>
                  <div style={{ fontSize: "0.75rem", color: "#f59e0b" }}>{p.category}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case "library":
        return (
          <div style={{ background: "#120e1c", border: "1px solid #8b5cf633", borderRadius: 12, padding: 30 }}>
            {/* Library list/search mockup */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ textTransform: "none", margin: 0, fontSize: "1.2rem" }}>📚 Katalog Buku Perpustakaan Utama</h3>
              <input type="text" placeholder="Cari judul buku..." style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "8px 16px", borderRadius: 6, fontSize: "0.85rem" }} readOnly />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { title: "Dasar Logika Pemrograman Modern", author: "Dr. Adrian", code: "PROG-0021", status: "Dipinjam" },
                { title: "Analisis Struktur Rekayasa Sipil", author: "Prof. Sivilize", code: "CIV-0142", status: "Tersedia" }
              ].map((b) => (
                <div key={b.title} style={{ background: "#1a1529", padding: 16, borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{b.title}</div>
                    <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Pengarang: {b.author} | Kode: {b.code}</div>
                  </div>
                  <span style={{ fontSize: "0.8rem", color: b.status === "Tersedia" ? "#10b981" : "#ef4444", fontWeight: 700 }}>{b.status}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "travel":
        return (
          <div style={{ background: "#0a141d", border: "1px solid #0ea5e933", borderRadius: 12, padding: 30 }}>
            {/* Travel/Tour mockup */}
            <h3 style={{ textTransform: "none", color: "#0ea5e9", marginBottom: 20, fontSize: "1.2rem" }}>✈️ Paket Trip Unggulan Teraktif</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {[
                { dest: "Explore Nusa Penida, Bali", duration: "3 Hari 2 Malam", price: "Rp 1.850.000", bg: "🌊" },
                { dest: "Pendakian Gunung Rinjani Lombok", duration: "4 Hari 3 Malam", price: "Rp 2.400.000", bg: "🌋" }
              ].map((t) => (
                <div key={t.dest} style={{ background: "#111f2c", padding: 24, borderRadius: 10, display: "flex", alignItems: "center", gap: 20 }}>
                  <div style={{ fontSize: "2.5rem" }}>{t.bg}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: "1rem" }}>{t.dest}</div>
                    <div style={{ fontSize: "0.8rem", color: "#94a3b8", margin: "4px 0 8px" }}>{t.duration}</div>
                    <div style={{ color: "#0ea5e9", fontWeight: 700, fontSize: "0.95rem" }}>{t.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "cafe":
        return (
          <div style={{ background: "#1c100a", border: "1px solid #ea580c33", borderRadius: 12, padding: 30 }}>
            {/* Cafe Menu layout */}
            <h3 style={{ textTransform: "none", color: "#ea580c", marginBottom: 20, fontSize: "1.2rem" }}>☕ Menu Digital Kopi & Makanan Utama</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { name: "Signature Espresso Latte", desc: "Espresso premium dicampur susu murni & sirup gula aren khas", price: "Rp 24.000" },
                { name: "Cinnamon Almond Croissant", desc: "Croissant mentega berlapis renyah bertabur bubuk kayu manis", price: "Rp 28.000" }
              ].map((m) => (
                <div key={m.name} style={{ background: "#2a1b14", padding: 20, borderRadius: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "0.95rem", marginBottom: 6 }}>
                    <span>{m.name}</span>
                    <span style={{ color: "#ea580c" }}>{m.price}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: "0.8rem", color: "#a1a1aa", lineHeight: 1.4 }}>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "property":
        return (
          <div style={{ background: "#1a110a", border: "1px solid #f9731633", borderRadius: 12, padding: 30 }}>
            {/* Property list */}
            <h3 style={{ textTransform: "none", color: "#f97316", marginBottom: 20, fontSize: "1.2rem" }}>🏠 Proyek Perumahan & Unit Tersedia</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {[
                { name: "Cluster Green Foresta", loc: "Bandung Utara", price: "Mulai 780 Jt", spec: "3 KT | 2 KM" },
                { name: "Metropolitan Condominium", loc: "Jakarta Selatan", price: "Mulai 1.4 Miliar", spec: "Studio | 1 KM" },
                { name: "Grand Vista Residenceia", loc: "Yogyakarta", price: "Mulai 620 Jt", spec: "2 KT | 1 KM" }
              ].map((item) => (
                <div key={item.name} style={{ background: "#261a10", padding: 18, borderRadius: 8, border: "1px solid rgba(249,115,22,0.05)" }}>
                  <div style={{ fontWeight: 800, fontSize: "0.9rem", color: "#fff", marginBottom: 6 }}>{item.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginBottom: 12 }}>📍 {item.loc}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.75rem" }}>
                    <span style={{ color: "#f97316", fontWeight: 700 }}>{item.price}</span>
                    <span style={{ color: "#64748b" }}>{item.spec}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "school":
        return (
          <div style={{ background: "#0d0e1a", border: "1px solid #6366f133", borderRadius: 12, padding: 30, display: "grid", gridTemplateColumns: "200px 1fr", gap: 24 }}>
            <div style={{ background: "#131427", borderRadius: 8, padding: 16 }}>
              <div style={{ color: "#6366f1", fontWeight: 800, fontSize: "0.85rem", marginBottom: 12 }}>SISWA PORTAL</div>
              <div style={{ fontSize: "0.8rem", display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ color: "#fff" }}>📖 E-Learning</div>
                <div style={{ opacity: 0.5 }}>📅 Kalender Akademik</div>
                <div style={{ opacity: 0.5 }}>📝 Nilai Ujian</div>
              </div>
            </div>
            <div>
              <h3 style={{ textTransform: "none", margin: "0 0 16px 0", fontSize: "1.1rem" }}>Tugas Aktif Minggu Ini</h3>
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", padding: 16, borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>Matematika Diskrit - Bab 4 Aljabar</span>
                <span style={{ background: "#ef444422", color: "#ef4444", padding: "4px 8px", borderRadius: 4, fontSize: "0.75rem" }}>Belum Kumpul</span>
              </div>
            </div>
          </div>
        );

      case "hotel":
        return (
          <div style={{ background: "#091224", border: "1px solid #3b82f633", borderRadius: 12, padding: 30 }}>
            <h3 style={{ textTransform: "none", color: "#3b82f6", marginBottom: 16, fontSize: "1.2rem" }}>🏨 Reservasi Kamar Hotel Lux Sivilize</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
              {[
                { name: "Executive Ocean Room", price: "Rp 1.450.000 / Malam", desc: "King Bed, Ocean View, Breakfast Included" },
                { name: "Deluxe Garden View", price: "Rp 980.000 / Malam", desc: "Twin Bed, Balcony View, Gym Access" }
              ].map((r) => (
                <div key={r.name} style={{ background: "#0e1c38", padding: 20, borderRadius: 8, border: "1px solid rgba(59,130,246,0.1)" }}>
                  <div style={{ fontWeight: 800, fontSize: "1rem", color: "#fff", marginBottom: 6 }}>{r.name}</div>
                  <div style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: 12 }}>{r.desc}</div>
                  <div style={{ color: "#3b82f6", fontWeight: 700, fontSize: "0.9rem" }}>{r.price}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case "workshop":
        return (
          <div style={{ background: "#1a0f0d", border: "1px solid #f9731633", borderRadius: 12, padding: 30 }}>
            <h3 style={{ textTransform: "none", color: "#f97316", marginBottom: 16, fontSize: "1.2rem" }}>🚗 Antrean & Estimasi Servis Kendaraan</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { plat: "B 1242 AD", type: "Honda Civic Type R", job: "Ganti Oli & Tune Up", progress: "70%" },
                { plat: "DK 9921 SF", type: "Kawasaki ZX-25R", job: "Servis Rem & Kelistrikan", progress: "20%" }
              ].map((item) => (
                <div key={item.plat} style={{ background: "#261715", padding: 16, borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ fontWeight: 800, color: "#fff" }}>{item.plat}</span> - <span style={{ fontSize: "0.85rem", color: "#a1a1aa" }}>{item.type}</span>
                    <div style={{ fontSize: "0.8rem", color: "#f97316", marginTop: 4 }}>Pekerjaan: {item.job}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 80, height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ width: item.progress, height: "100%", background: "#f97316" }} />
                    </div>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700 }}>{item.progress}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "ecommerce":
        return (
          <div style={{ background: "#0a101f", border: "1px solid #2563eb33", borderRadius: 12, padding: 30 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ textTransform: "none", margin: 0, fontSize: "1.1rem" }}>🛒 Keranjang Belanja Anda (2 Items)</h3>
              <span style={{ color: "#2563eb", fontWeight: 700, fontSize: "0.85rem" }}>Total: Rp 1.540.000</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { name: "Mechanical Keyboard 75% Sivilize", qty: "1 Unit", price: "Rp 890.000", key: "kbd" },
                { name: "Ergonomic Vertical Mouse Wireless", qty: "1 Unit", price: "Rp 650.000", key: "mouse" }
              ].map((item) => (
                <div key={item.key} style={{ background: "#0f1a30", padding: 16, borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{item.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Jumlah: {item.qty}</div>
                  </div>
                  <div style={{ fontWeight: 700, color: "#fff" }}>{item.price}</div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{
      background: "#020617",
      minHeight: "100vh",
      color: "#fff",
      fontFamily: "var(--font-sans)",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Header navigasi atas */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        background: "#090d16"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontWeight: 800, fontSize: "1.4rem", letterSpacing: 1 }}>
            SiWeb<span style={{ color: demo.themeColor }}>.</span>
          </span>
          <span style={{
            background: "rgba(255,255,255,0.03)",
            padding: "4px 12px",
            border: `1px solid ${demo.themeColor}44`,
            borderRadius: 20,
            fontSize: "0.75rem",
            color: demo.themeColor,
            fontWeight: 700
          }}>
            Interactive Demo Mode
          </span>
        </div>
        <button
          onClick={() => router.push("/#showcase")}
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: 700,
            fontSize: "0.85rem",
            transition: "all 0.2s"
          }}
        >
          Kembali ke Portofolio
        </button>
      </div>

      {/* Main body showcase */}
      <div style={{ flex: 1, padding: "50px 40px", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 50, alignItems: "start" }}>
          
          {/* Main Visual Display */}
          <div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 30
            }}>
              <span style={{ fontSize: "2rem" }}>
                {demo.icon}
              </span>
              <h1 style={{ textTransform: "none", fontSize: "2rem", margin: 0, textShadow: "none" }}>{demo.title}</h1>
            </div>

            {/* Custom Rendered UI */}
            {renderVisualMockup()}

            {/* Simulated interactive features */}
            <div style={{ marginTop: 40 }}>
              <h3 style={{ textTransform: "none", marginBottom: 20, fontSize: "1.1rem" }}>Fitur Utama yang Disimulasikan</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {demo.features.map((feat) => (
                  <div key={feat} style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.01)", padding: "16px 20px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.03)" }}>
                    <span style={{ color: demo.themeColor, fontWeight: 900 }}>✓</span>
                    <span style={{ fontWeight: 600 }}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Action Panel */}
          <div style={{
            background: "rgba(15, 23, 42, 0.4)",
            border: `1px solid ${demo.themeColor}33`,
            borderRadius: 16,
            padding: 30,
            boxShadow: `0 20px 40px -20px ${demo.themeColor}44`
          }}>
            <h3 style={{ textTransform: "none", margin: "0 0 12px", fontSize: "1.2rem", textShadow: "none" }}>Tertarik dengan sistem ini?</h3>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: 24 }}>
              SiWeb Sivilize siap merancang dan mengkustomisasi web demo ini secara khusus sesuai skema operasional usaha Anda sendiri.
            </p>

            <button
              onClick={() => window.open("https://wa.me/6281338219957", "_blank")}
              style={{
                width: "100%",
                padding: "16px",
                background: demo.themeColor,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: `0 8px 24px -6px ${demo.glowColor}`,
                transition: "all 0.2s"
              }}
            >
              Hubungi Pembuat ➜
            </button>

            <div style={{ marginTop: 30, borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 24 }}>
              <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 700, marginBottom: 12 }}>DEKORASI INDUSTRI</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {demo.decorations.map((d) => (
                  <span key={d} style={{ fontSize: "0.75rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", padding: "4px 10px", borderRadius: 4 }}>
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
