"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";

// Database data demo
const demoData: Record<string, {
  title: string;
  themeColor: string;
  glowColor: string;
  decorations: string[];
  features: string[];
  layout: string;
  icon: string;
  tagline: string;
}> = {
  "hospital": {
    title: "Rumah Sakit & Klinik",
    themeColor: "#10b981", // Emerald Green
    glowColor: "rgba(16, 185, 129, 0.4)",
    decorations: ["Medical Cross", "Stethoscope", "Pulse Line", "Daun Hijau Kecil"],
    features: ["Pendaftaran Pasien", "Jadwal Dokter", "Dashboard Admin", "Riwayat Pasien", "Informasi Layanan"],
    layout: "hospital",
    icon: "🏥",
    tagline: "Healthcare Modern & Integrasi Rekam Medis Cepat"
  },
  "pharmacy": {
    title: "Apotek Digital",
    themeColor: "#06b6d4", // Teal Cyan
    glowColor: "rgba(6, 182, 212, 0.4)",
    decorations: ["Katalog Obat", "Kapsul", "Botol Obat", "Medical Shelf", "Ikon Farmasi"],
    features: ["Katalog Produk", "Stok Obat", "Pemesanan Online", "Dashboard Apotek", "Manajemen Produk"],
    layout: "pharmacy",
    icon: "💊",
    tagline: "Medical Commerce & Sistem POS Apotek Cerdas"
  },
  "company": {
    title: "Landing Page Perusahaan",
    themeColor: "#4f46e5", // Indigo Blue
    glowColor: "rgba(79, 70, 229, 0.4)",
    decorations: ["Gedung Modern", "Grafik Pertumbuhan", "Company Dashboard", "Corporate Document"],
    features: ["Company Profile", "Lead Generation", "Service Showcase", "Contact Form", "Portfolio"],
    layout: "corporate",
    icon: "🏢",
    tagline: "Corporate Business & Profil Profesional Berkinerja Tinggi"
  },
  "souvenir": {
    title: "Toko Souvenir",
    themeColor: "#f59e0b", // Amber Gold
    glowColor: "rgba(245, 158, 11, 0.4)",
    decorations: ["Gift Box", "Product Showcase", "Ribbon", "Product Card", "Shopping Experience"],
    features: ["Katalog Produk", "WhatsApp Order", "Testimoni", "Galeri Produk", "Promo"],
    layout: "creative",
    icon: "🎁",
    tagline: "Retail Showcase & Pengalaman Belanja Souvenir Lokal"
  },
  "library": {
    title: "Sistem Perpustakaan",
    themeColor: "#8b5cf6", // Purple Violet
    glowColor: "rgba(139, 92, 246, 0.4)",
    decorations: ["Rak Buku", "Kartu Anggota", "Dashboard Perpustakaan", "Buku Digital"],
    features: ["Manajemen Buku", "Peminjaman", "Pengembalian", "Dashboard Admin", "Pencarian Buku"],
    layout: "library",
    icon: "📚",
    tagline: "Education System & Otomasi Peminjaman Buku Sekolah"
  },
  "travel": {
    title: "Travel & Tour",
    themeColor: "#0ea5e9", // Sky Blue
    glowColor: "rgba(14, 165, 233, 0.4)",
    decorations: ["Pesawat", "Peta Perjalanan", "Lokasi Wisata", "Booking Panel"],
    features: ["Paket Wisata", "Booking Online", "Galeri Destinasi", "Jadwal Tour", "Customer Management"],
    layout: "travel",
    icon: "✈️",
    tagline: "Tourism Platform & Reservasi Paket Trip Instan"
  },
  "cafe": {
    title: "Cafe & Resto",
    themeColor: "#ea580c", // Orange Brown
    glowColor: "rgba(234, 88, 12, 0.4)",
    decorations: ["Coffee Cup", "Menu Digital", "Makanan", "Reservasi Meja", "Order Dashboard"],
    features: ["Digital Menu", "Reservasi", "Pemesanan", "Promo", "Dashboard Pesanan"],
    layout: "cafe",
    icon: "☕",
    tagline: "Food & Beverage & Manajemen Order Meja Interaktif"
  },
  "property": {
    title: "Property & Developer",
    themeColor: "#f97316", // Slate Orange
    glowColor: "rgba(249, 115, 22, 0.4)",
    decorations: ["Gedung Tinggi", "Blueprint", "Site Plan", "Property Showcase"],
    features: ["Katalog Properti", "Landing Page Proyek", "Lead Generation", "Form Konsultasi", "Progress Proyek"],
    layout: "property",
    icon: "🏙️",
    tagline: "Construction & Property Showcase Perumahan Modern"
  },
  "school": {
    title: "Sekolah & Akademi",
    themeColor: "#6366f1", // Blue Purple
    glowColor: "rgba(99, 102, 241, 0.4)",
    decorations: ["Classroom", "Dashboard Siswa", "E-learning Panel", "Academic Management"],
    features: ["Informasi Sekolah", "Pendaftaran", "Dashboard Siswa", "Jadwal Pelajaran", "E-Learning"],
    layout: "school",
    icon: "🏫",
    tagline: "Education Platform Portal Akademik Terintegrasi"
  },
  "hotel": {
    title: "Hotel & Penginapan",
    themeColor: "#3b82f6", // Royal Blue
    glowColor: "rgba(59, 130, 246, 0.4)",
    decorations: ["Hotel Booking", "Room Showcase", "Reservation System", "Luxury Hospitality"],
    features: ["Booking Kamar", "Room Showcase", "Galeri Hotel", "Promo", "Customer Management"],
    layout: "hotel",
    icon: "🏨",
    tagline: "Luxury Hospitality & Sistem Pemesanan Kamar Instan"
  },
  "workshop": {
    title: "Bengkel & Otomotif",
    themeColor: "#dc2626", // Red Orange
    glowColor: "rgba(220, 38, 38, 0.4)",
    decorations: ["Mobil", "Motor", "Service Dashboard", "Sparepart Showcase"],
    features: ["Booking Service", "Sparepart Catalog", "Riwayat Servis", "Dashboard Bengkel", "WhatsApp Booking"],
    layout: "workshop",
    icon: "🚗",
    tagline: "Automotive Service & Booking Antrean Bengkel Taktis"
  },
  "ecommerce": {
    title: "Toko Online / E-Commerce",
    themeColor: "#2563eb", // Electric Blue
    glowColor: "rgba(37, 99, 235, 0.4)",
    decorations: ["Product Grid", "Shopping Cart", "Checkout Flow", "Sales Analytics"],
    features: ["Katalog Produk", "Keranjang Belanja", "Checkout", "Dashboard Penjualan", "Manajemen Produk"],
    layout: "ecommerce",
    icon: "🛒",
    tagline: "Digital Commerce & Platform Toko Online Siap Pakai"
  }
};

export default function DemoPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const demo = demoData[id];

  // Client states untuk interaktivitas simulasi web asli
  const [patientName, setPatientName] = useState("");
  const [patientDoctor, setPatientDoctor] = useState("Dr. Adrian (Sp. Bedah)");
  const [patientsList, setPatientsList] = useState<Array<{ name: string; doctor: string; id: string }>>([
    { id: "P-1", name: "Budi Santoso", doctor: "Dr. Adrian (Sp. Bedah)" },
    { id: "P-2", name: "Siti Rahma", doctor: "Dr. Clara (Sp. Anak)" }
  ]);

  const [cartItems, setCartItems] = useState<Array<{ name: string; qty: number; price: number }>>([]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const [chatMessage, setChatMessage] = useState("");
  const [chatList, setChatList] = useState<string[]>(["Halo! Ada yang bisa kami bantu hari ini?"]);

  const [bookTitle, setBookTitle] = useState("");
  const [borrowedBooks, setBorrowedBooks] = useState<Array<{ title: string; borrower: string; date: string }>>([
    { title: "Dasar Pemrograman Web", borrower: "Adrian", date: "2026-06-17" }
  ]);

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

  // Action Handlers
  const handleRegisterPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName) return;
    setPatientsList([...patientsList, {
      id: `P-${patientsList.length + 1}`,
      name: patientName,
      doctor: patientDoctor
    }]);
    setPatientName("");
    alert("Pendaftaran Berhasil! Silakan cek daftar antrean di bawah.");
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage) return;
    setChatList([...chatList, `Anda: ${chatMessage}`, "Sivilize AI: Terima kasih! Pertanyaan Anda telah kami terima, tim marketing kami akan segera menghubungi nomor Anda."]);
    setChatMessage("");
  };

  const handleBorrowBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookTitle) return;
    setBorrowedBooks([...borrowedBooks, {
      title: bookTitle,
      borrower: "Pengunjung Demo",
      date: new Date().toISOString().split('T')[0]
    }]);
    setBookTitle("");
  };

  // Render Visual Website Asli 100% Sesuai Tema Industri (Handcrafted UI, Anti-AI Aesthetic)
  const renderActualWebsite = () => {
    switch (demo.layout) {
      case "hospital":
        return (
          <div style={{ background: "linear-gradient(rgba(248, 250, 252, 0.92), rgba(248, 250, 252, 0.96)), url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat", color: "#1e293b", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            {/* Navigasi RS */}
            <header style={{ background: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(16, 185, 129, 0.15)", padding: "18px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
                <span style={{ fontSize: "1.35rem", fontWeight: 900, letterSpacing: "-0.025em", color: "#0f5132" }}>SIVILIZE HEALTH</span>
              </div>
              <nav style={{ display: "flex", gap: 28, fontSize: "0.925rem", fontWeight: 700 }}>
                <a href="#profil" style={{ color: "#475569", textDecoration: "none", transition: "color 0.2s" }}>Profil Medis</a>
                <a href="#jadwal" style={{ color: "#475569", textDecoration: "none", transition: "color 0.2s" }}>Dokter Spesialis</a>
                <a href="#pendaftaran" style={{ color: "#10b981", textDecoration: "none", borderBottom: "2px solid #10b981", paddingBottom: 4 }}>Pendaftaran Online</a>
              </nav>
            </header>

            {/* Banner Utama */}
            <section style={{ padding: "80px 40px", textAlign: "center", position: "relative" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(circle at center, rgba(16, 185, 129, 0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
              <span style={{ background: "#e6f4ea", color: "#065f46", padding: "6px 16px", borderRadius: 20, fontSize: "0.75rem", fontWeight: 800, letterSpacing: 1, textTransform: "uppercase" }}>SIMULASI LAYANAN KLINIK</span>
              <h2 style={{ textTransform: "none", color: "#0f5132", fontSize: "2.8rem", fontWeight: 900, letterSpacing: "-0.03em", marginTop: 16, marginBottom: 16, textShadow: "none" }}>Portal Registrasi & Antrean Medis Real-time</h2>
              <p style={{ color: "#334155", margin: "0 auto", maxWidth: 650, fontSize: "1.1rem", lineHeight: 1.6 }}>Pangkas waktu tunggu di fasilitas kesehatan. Sistem otomatisasi loket pasien terintegrasi langsung ke sistem manajemen rekam medis internal.</p>
            </section>

            {/* Form Pendaftaran & Antrean Live */}
            <div style={{ flex: 1, padding: "0 40px 80px", maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 40 }}>
              <div style={{ background: "#fff", padding: 36, borderRadius: 20, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.05), 0 10px 10px -5px rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.03)" }}>
                <h3 style={{ textTransform: "none", color: "#1e293b", fontSize: "1.4rem", fontWeight: 800, marginBottom: 24, textShadow: "none" }}>Daftar Kunjungan Hari Ini</h3>
                <form onSubmit={handleRegisterPatient} style={{ display: "grid", gap: 20 }}>
                  <div>
                    <label style={{ display: "block", marginBottom: 8, fontWeight: 700, fontSize: "0.85rem", color: "#475569", textTransform: "uppercase", letterSpacing: 0.5 }}>Nama Lengkap Pasien</label>
                    <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} required placeholder="Misal: Joko Susilo" style={{ width: "100%", padding: 14, border: "2px solid #e2e8f0", borderRadius: 10, fontSize: "1rem", outline: "none", transition: "border-color 0.2s", color: "#000" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", marginBottom: 8, fontWeight: 700, fontSize: "0.85rem", color: "#475569", textTransform: "uppercase", letterSpacing: 0.5 }}>Pilih Dokter Spesialis & Poliklinik</label>
                    <select value={patientDoctor} onChange={(e) => setPatientDoctor(e.target.value)} style={{ width: "100%", padding: 14, border: "2px solid #e2e8f0", borderRadius: 10, fontSize: "1rem", outline: "none", cursor: "pointer", color: "#000" }}>
                      <option value="Dr. Adrian (Sp. Bedah)">Dr. Adrian (Sp. Bedah) - Poli Bedah Utama</option>
                      <option value="Dr. Clara (Sp. Anak)">Dr. Clara (Sp. Anak) - Poli Anak & Tumbuh Kembang</option>
                      <option value="Dr. Hendra (Sp. Jantung)">Dr. Hendra (Sp. Jantung) - Poli Jantung & Pembuluh Darah</option>
                    </select>
                  </div>
                  <button type="submit" style={{ background: "#10b981", color: "#fff", padding: "16px", border: "none", borderRadius: 10, fontWeight: 800, fontSize: "1rem", cursor: "pointer", boxShadow: "0 10px 15px -3px rgba(16, 185, 129, 0.3)", transition: "all 0.2s" }}>Daftarkan Antrean Kunjungan</button>
                </form>
              </div>

              <div style={{ background: "#fff", padding: 36, borderRadius: 20, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.05), 0 10px 10px -5px rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.03)", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                  <h3 style={{ textTransform: "none", color: "#1e293b", fontSize: "1.4rem", fontWeight: 800, textShadow: "none", margin: 0 }}>Antrean Berjalan</h3>
                  <span style={{ background: "#e6f4ea", color: "#10b981", padding: "4px 12px", borderRadius: 12, fontSize: "0.8rem", fontWeight: 800 }}>LIVE STATS</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
                  {patientsList.map((p) => (
                    <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 20, background: "#f8fafc", borderRadius: 12, border: "1px solid rgba(0,0,0,0.02)", borderLeft: "5px solid #10b981", transition: "transform 0.2s" }}>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "#1e293b" }}>{p.name}</div>
                        <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                          {p.doctor}
                        </div>
                      </div>
                      <span style={{ background: "#10b981", color: "#fff", padding: "8px 16px", borderRadius: 30, fontSize: "0.85rem", fontWeight: 900 }}>{p.id}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "pharmacy":
        return (
          <div style={{ background: "linear-gradient(rgba(240, 253, 244, 0.92), rgba(240, 253, 244, 0.96)), url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat", color: "#0f172a", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            {/* Header Apotek */}
            <header style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", padding: "20px 40px", borderBottom: "1px solid rgba(6, 182, 212, 0.15)", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2.5">
                  <path d="M4.5 10.5h15M12 3v15" />
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                </svg>
                <span style={{ fontSize: "1.35rem", fontWeight: 950, color: "#083344" }}>APOTEK SEHAT</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(6, 182, 212, 0.1)", color: "#0891b2", padding: "8px 20px", borderRadius: 30, fontWeight: 800, fontSize: "0.9rem" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                Keranjang: {cartItems.reduce((acc, c) => acc + c.qty, 0)} Item
              </div>
            </header>

            {/* Katalog Obat & Pembelian */}
            <div style={{ flex: 1, padding: 40, maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 360px", gap: 40 }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
                  <h3 style={{ textTransform: "none", color: "#0f172a", fontSize: "1.5rem", fontWeight: 900, textShadow: "none", margin: 0 }}>Etalase Obat & Multivitamin</h3>
                  <span style={{ color: "#64748b", fontSize: "0.85rem", fontWeight: 700 }}>Menampilkan 3 Produk Resmi</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                  {[
                    { name: "Paracetamol 500mg", price: 12000, desc: "Pereda demam & pereda rasa sakit kepala berlebih.", category: "Obat Bebas" },
                    { name: "Amoxicillin 500mg", price: 34000, desc: "Antibiotik spektrum luas wajib resep dokter.", category: "Resep Dokter" },
                    { name: "Multivitamin Active C", price: 25000, desc: "Daya tahan tubuh ekstra anti oksidan.", category: "Suplemen" }
                  ].map((med) => (
                    <div key={med.name} style={{ background: "#fff", padding: 24, borderRadius: 16, border: "1px solid rgba(0,0,0,0.03)", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.03)", display: "flex", flexDirection: "column", justifyContent: "space-between", transition: "transform 0.2s" }}>
                      <div>
                        <span style={{ display: "inline-block", background: med.category === "Resep Dokter" ? "#fee2e2" : "#e0f2fe", color: med.category === "Resep Dokter" ? "#ef4444" : "#0284c7", padding: "4px 10px", borderRadius: 8, fontSize: "0.7rem", fontWeight: 800, marginBottom: 14 }}>{med.category}</span>
                        <div style={{ fontWeight: 900, fontSize: "1.1rem", color: "#1e293b" }}>{med.name}</div>
                        <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "10px 0 20px", lineHeight: 1.5 }}>{med.desc}</p>
                      </div>
                      <div>
                        <div style={{ fontWeight: 900, color: "#06b6d4", fontSize: "1.2rem", marginBottom: 14 }}>Rp {med.price.toLocaleString("id-ID")}</div>
                        <button
                          onClick={() => {
                            const exist = cartItems.find((c) => c.name === med.name);
                            if (exist) {
                              setCartItems(cartItems.map((c) => c.name === med.name ? { ...c, qty: c.qty + 1 } : c));
                            } else {
                              setCartItems([...cartItems, { name: med.name, qty: 1, price: med.price }]);
                            }
                          }}
                          style={{ width: "100%", padding: "12px", background: "#06b6d4", border: "none", color: "#fff", borderRadius: 10, fontWeight: 800, cursor: "pointer", transition: "all 0.2s", boxShadow: "0 4px 12px rgba(6, 182, 212, 0.2)" }}
                        >
                          Tambah Keranjang
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checkout Form */}
              <div style={{ background: "#fff", padding: 30, borderRadius: 20, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.03)", alignSelf: "start" }}>
                <h3 style={{ textTransform: "none", color: "#0f172a", fontSize: "1.3rem", fontWeight: 900, marginBottom: 20, textShadow: "none" }}>Kasir / POS Virtual</h3>
                {cartItems.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "40px 0", color: "#94a3b8" }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: "0 auto 12px" }}>
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 14s1.5-2 4-2 4 2 4 2M9 9h.01M15 9h.01" />
                    </svg>
                    <p style={{ fontSize: "0.85rem", margin: 0 }}>Keranjang masih kosong</p>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {cartItems.map((item) => (
                        <div key={item.name} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#334155" }}>
                          <span style={{ fontWeight: 600 }}>{item.name} (x{item.qty})</span>
                          <span style={{ fontWeight: 800 }}>Rp {(item.price * item.qty).toLocaleString("id-ID")}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ borderTop: "2px dashed #e2e8f0", paddingTop: 16, display: "flex", justifyContent: "space-between", fontSize: "1.05rem", fontWeight: 900, color: "#0f172a" }}>
                      <span>Total Tagihan:</span>
                      <span>Rp {cartItems.reduce((acc, c) => acc + (c.price * c.qty), 0).toLocaleString("id-ID")}</span>
                    </div>
                    <button onClick={() => { setCartItems([]); alert("Transaksi Sukses! Terima kasih telah berbelanja."); }} style={{ width: "100%", padding: 14, background: "#10b981", color: "#fff", border: "none", borderRadius: 10, fontWeight: 800, marginTop: 10, cursor: "pointer", transition: "all 0.2s", boxShadow: "0 6px 15px rgba(16, 185, 129, 0.25)" }}>Bayar & Cetak Struk</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "corporate":
        return (
          <div style={{ background: "linear-gradient(rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.94)), url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat", color: "#0f172a", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            {/* Header Corporate */}
            <header style={{ background: "rgba(15, 23, 42, 0.95)", backdropFilter: "blur(12px)", color: "#fff", padding: "22px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5">
                  <path d="M22 21H2V3h20v18zM6 8h4v4H6V8zM14 8h4v4h-4V8z" />
                </svg>
                <span style={{ fontSize: "1.3rem", fontWeight: 900, letterSpacing: "-0.03em" }}>SIVILIZE HOLDING</span>
              </div>
              <nav style={{ display: "flex", gap: 30, fontSize: "0.85rem", fontWeight: 800, letterSpacing: 0.5, textTransform: "uppercase" }}>
                <a href="#about" style={{ color: "#94a3b8", textDecoration: "none" }}>Tentang Kami</a>
                <a href="#solutions" style={{ color: "#94a3b8", textDecoration: "none" }}>Solusi Bisnis</a>
                <a href="#contact" style={{ color: "#6366f1", textDecoration: "none" }}>Kemitraan</a>
              </nav>
            </header>

            {/* Corporate Banner */}
            <div style={{ background: "linear-gradient(rgba(15,23,42,0.85), rgba(15,23,42,0.92)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80') center/cover", color: "#fff", padding: "120px 40px", textAlign: "center", position: "relative" }}>
              <h1 style={{ textTransform: "none", fontSize: "3.2rem", fontWeight: 950, letterSpacing: "-0.03em", marginBottom: 20 }}>Membangun Masa Depan Infrastruktur Digital</h1>
              <p style={{ color: "#cbd5e1", fontSize: "1.2rem", margin: "0 auto 36px", maxWidth: 700, lineHeight: 1.6 }}>Solusi teknologi terkelola untuk transformasi arsitektur bisnis korporasi berskala nasional dan multinasional.</p>
              <a href="#form-penawaran" style={{ display: "inline-block", padding: "16px 36px", background: "#4f46e5", color: "#fff", border: "none", fontWeight: 800, textDecoration: "none", borderRadius: 10, cursor: "pointer", transition: "all 0.2s", boxShadow: "0 10px 20px rgba(79, 70, 229, 0.3)" }}>Hubungi Divisi Kemitraan</a>
            </div>

            {/* Lead generation form */}
            <div id="form-penawaran" style={{ padding: "80px 40px", maxWidth: 700, margin: "0 auto", width: "100%" }}>
              <div style={{ background: "#fff", padding: 48, borderRadius: 24, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.03)" }}>
                <h3 style={{ textTransform: "none", color: "#0f172a", fontSize: "1.6rem", fontWeight: 900, marginBottom: 12, textAlign: "center", textShadow: "none" }}>Formulir Permintaan Proposal Kemitraan</h3>
                <p style={{ color: "#64748b", fontSize: "0.95rem", textAlign: "center", marginBottom: 30 }}>Konsultasikan proyek digital usaha Anda bersama tim arsitek solusi kami.</p>
                <form onSubmit={handleSendMessage} style={{ display: "grid", gap: 20 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                    <input type="text" placeholder="Nama Perusahaan" required style={{ padding: 14, border: "2px solid #e2e8f0", borderRadius: 10, fontSize: "0.95rem", color: "#000" }} />
                    <input type="email" placeholder="Email Kantor Resmi" required style={{ padding: 14, border: "2px solid #e2e8f0", borderRadius: 10, fontSize: "0.95rem", color: "#000" }} />
                  </div>
                  <textarea placeholder="Jelaskan secara singkat rencana kebutuhan sistem / arsitektur digital perusahaan Anda..." rows={4} required style={{ padding: 14, border: "2px solid #e2e8f0", borderRadius: 10, fontSize: "0.95rem", color: "#000" }} />
                  <button type="submit" style={{ padding: 16, background: "#4f46e5", color: "#fff", border: "none", borderRadius: 10, fontWeight: 800, fontSize: "1rem", cursor: "pointer", transition: "all 0.2s", boxShadow: "0 6px 20px rgba(79, 70, 229, 0.2)" }}>Kirim Proposal Kerjasama</button>
                </form>
              </div>
            </div>
          </div>
        );

      case "creative":
        return (
          <div style={{ background: "linear-gradient(rgba(255, 252, 245, 0.92), rgba(255, 252, 245, 0.96)), url('https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat", color: "#452d0a", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            {/* Header Toko Souvenir */}
            <header style={{ background: "rgba(245, 158, 11, 0.95)", color: "#fff", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7c0-2-2-4-4-4S4 5 4 7M12 7c0-2 2-4 4-4s4 2 4 4" />
                </svg>
                <span style={{ fontSize: "1.3rem", fontWeight: 900 }}>TOKO SOUVENIR RAYA</span>
              </div>
              <span style={{ fontWeight: 800, fontSize: "0.9rem", border: "2px solid #fff", padding: "6px 16px", borderRadius: 30 }}>Kriya & Seni Lokal</span>
            </header>

            {/* Showcase Souvenir */}
            <div style={{ flex: 1, padding: 60, maxWidth: 1200, margin: "0 auto", width: "100%" }}>
              <h2 style={{ textTransform: "none", color: "#452d0a", fontSize: "2.2rem", fontWeight: 900, marginBottom: 8, textAlign: "center", textShadow: "none" }}>Etalase Kerajinan & Karya Seni Khas Daerah</h2>
              <p style={{ color: "#78350f", textAlign: "center", marginBottom: 48, fontSize: "1.05rem" }}>Koleksi premium buatan tangan pengrajin lokal bergaransi mutu.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 30 }}>
                {[
                  { name: "Vas Keramik Tanah Liat", price: "Rp 120.000", desc: "Vas bunga etnik hasil kerajinan tangan dari daerah Kasongan.", img: "🏺" },
                  { name: "Piring Kayu Jati Ukir", price: "Rp 95.000", desc: "Piring saji hias dengan motif ukiran Jepara kayu pilihan.", img: "🪵" },
                  { name: "Dompet Kulit Sapi Asli", price: "Rp 245.000", desc: "Dompet kartu eksklusif berdaya tahan tinggi bermaterial kulit premium.", img: "👜" }
                ].map((item) => (
                  <div key={item.name} style={{ background: "#fff", border: "1px solid rgba(245, 158, 11, 0.15)", borderRadius: 20, padding: 30, textAlign: "center", boxShadow: "0 15px 30px rgba(69, 45, 10, 0.03)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontSize: "3.5rem", marginBottom: 20 }}>{item.img}</div>
                      <div style={{ fontWeight: 900, fontSize: "1.25rem", color: "#452d0a", marginBottom: 8 }}>{item.name}</div>
                      <p style={{ fontSize: "0.85rem", color: "#78350f", lineHeight: 1.5, margin: "0 0 20px" }}>{item.desc}</p>
                    </div>
                    <div>
                      <div style={{ color: "#d97706", fontWeight: 900, fontSize: "1.3rem", marginBottom: 20 }}>{item.price}</div>
                      <button
                        onClick={() => window.open(`https://wa.me/6281338219957?text=Halo%20Toko%20Souvenir,%20saya%20tertarik%20dengan%20${item.name}`, "_blank")}
                        style={{ padding: "12px 24px", width: "100%", background: "#f59e0b", border: "none", color: "#fff", fontWeight: 800, borderRadius: 10, cursor: "pointer", transition: "all 0.2s", boxShadow: "0 4px 12px rgba(245, 158, 11, 0.25)" }}
                      >
                        Pesan via WhatsApp
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "library":
        return (
          <div style={{ background: "linear-gradient(rgba(243, 240, 255, 0.92), rgba(243, 240, 255, 0.96)), url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat", color: "#1e1b4b", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <header style={{ background: "#8b5cf6", color: "#fff", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5v-15z" />
                </svg>
                <span style={{ fontSize: "1.3rem", fontWeight: 900 }}>E-LIBRARY ACADEMIA</span>
              </div>
              <span style={{ fontSize: "0.9rem", background: "rgba(255,255,255,0.2)", padding: "6px 16px", borderRadius: 30, fontWeight: 700 }}>Peminjaman Digital</span>
            </header>

            <div style={{ flex: 1, padding: 50, maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 40 }}>
              {/* Form pinjam buku */}
              <div style={{ background: "#fff", padding: 36, borderRadius: 20, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.02)" }}>
                <h3 style={{ textTransform: "none", color: "#1e1b4b", fontSize: "1.4rem", fontWeight: 800, marginBottom: 24, textShadow: "none" }}>Ajukan Peminjaman Buku</h3>
                <form onSubmit={handleBorrowBook} style={{ display: "grid", gap: 20 }}>
                  <div>
                    <label style={{ display: "block", marginBottom: 8, fontWeight: 700, fontSize: "0.85rem", color: "#5b21b6" }}>JUDUL BUKU UTAMA</label>
                    <input type="text" value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} required placeholder="Contoh: Logika Algoritma & Dasar Pemrograman" style={{ width: "100%", padding: 14, border: "2px solid #ddd", borderRadius: 10, fontSize: "1rem", color: "#000" }} />
                  </div>
                  <button type="submit" style={{ padding: 16, background: "#8b5cf6", color: "#fff", border: "none", borderRadius: 10, fontWeight: 800, fontSize: "1rem", cursor: "pointer", transition: "all 0.2s", boxShadow: "0 8px 16px rgba(139, 92, 246, 0.25)" }}>Pinjam Buku Sekarang</button>
                </form>
              </div>

              {/* Log list */}
              <div style={{ background: "#fff", padding: 36, borderRadius: 20, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.02)", display: "flex", flexDirection: "column" }}>
                <h3 style={{ textTransform: "none", color: "#1e1b4b", fontSize: "1.4rem", fontWeight: 800, marginBottom: 20, textShadow: "none" }}>Log Peminjaman Aktif</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
                  {borrowedBooks.map((book, idx) => (
                    <div key={idx} style={{ padding: 16, background: "#f5f3ff", borderRadius: 12, borderLeft: "5px solid #8b5cf6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontWeight: 900, color: "#1e1b4b", fontSize: "1.05rem" }}>{book.title}</div>
                        <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: 4 }}>Peminjam: {book.borrower}</div>
                      </div>
                      <span style={{ fontSize: "0.8rem", color: "#8b5cf6", fontWeight: 800, background: "rgba(139, 92, 246, 0.1)", padding: "4px 12px", borderRadius: 8 }}>{book.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "travel":
        return (
          <div style={{ background: "linear-gradient(rgba(240, 249, 255, 0.88), rgba(240, 249, 255, 0.94)), url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat", color: "#0c4a6e", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <header style={{ background: "rgba(14, 165, 233, 0.95)", color: "#fff", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
                <span style={{ fontSize: "1.3rem", fontWeight: 900, letterSpacing: "-0.02em" }}>SIVILIZE TOURS</span>
              </div>
              <button onClick={() => window.open("https://wa.me/6281338219957", "_blank")} style={{ padding: "8px 18px", background: "#fff", color: "#0ea5e9", border: "none", borderRadius: 30, fontWeight: 800, fontSize: "0.85rem", cursor: "pointer" }}>Hubungi Agen Wisata</button>
            </header>

            <div style={{ flex: 1, padding: 50, maxWidth: 1200, margin: "0 auto", width: "100%" }}>
              <h2 style={{ textTransform: "none", color: "#0369a1", fontSize: "2.4rem", fontWeight: 950, letterSpacing: "-0.03em", marginBottom: 8, textAlign: "center", textShadow: "none" }}>Pilihan Paket Perjalanan Eksklusif</h2>
              <p style={{ color: "#0284c7", textAlign: "center", marginBottom: 48, fontSize: "1.05rem" }}>Nikmati kenyamanan liburan tanpa repot mengurus akomodasi dan transportasi.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 30 }}>
                {[
                  { name: "Trip Nusa Penida, Bali", price: "Rp 1.850.000", desc: "3 Hari 2 Malam, Transport AC, Tiket Wisata & Hotel Bintang 4.", tag: "Favorit" },
                  { name: "Explore Rinjani, Lombok", price: "Rp 2.400.000", desc: "4 Hari 3 Malam, Porter, Alat Tenda Lengkap & Makanan Bergizi.", tag: "Petualangan" },
                  { name: "Eksotisme Raja Ampat", price: "Rp 8.900.000", desc: "5 Hari 4 Malam, Liveaboard Yacht Trip & Snorkeling Gear.", tag: "Mewah" }
                ].map((trip) => (
                  <div key={trip.name} style={{ background: "#fff", padding: 30, borderRadius: 20, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.03)", border: "1px solid rgba(14, 165, 233, 0.1)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <span style={{ display: "inline-block", background: "#e0f2fe", color: "#0284c7", padding: "4px 12px", borderRadius: 8, fontSize: "0.75rem", fontWeight: 800, marginBottom: 16 }}>{trip.tag}</span>
                      <div style={{ fontWeight: 900, fontSize: "1.25rem", color: "#0c4a6e", marginBottom: 8 }}>{trip.name}</div>
                      <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "0 0 24px", lineHeight: 1.5 }}>{trip.desc}</p>
                    </div>
                    <div>
                      <div style={{ fontWeight: 900, color: "#0284c7", fontSize: "1.35rem", marginBottom: 18 }}>{trip.price}</div>
                      <button onClick={() => window.open(`https://wa.me/6281338219957?text=Halo%20saya%20tertarik%20booking%20${trip.name}`, "_blank")} style={{ width: "100%", padding: 14, background: "#0ea5e9", border: "none", color: "#fff", borderRadius: 10, fontWeight: 800, cursor: "pointer", transition: "all 0.2s" }}>Booking Online</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "cafe":
        return (
          <div style={{ background: "linear-gradient(rgba(250, 247, 242, 0.92), rgba(250, 247, 242, 0.96)), url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat", color: "#432a18", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <header style={{ background: "rgba(234, 88, 12, 0.95)", color: "#fff", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
              <span style={{ fontSize: "1.3rem", fontWeight: 900, letterSpacing: "1px" }}>☕ SENJA BISTRO</span>
              <span style={{ fontSize: "0.85rem", border: "1px solid #fff", padding: "4px 12px", borderRadius: 4 }}>Buka: 10:00 - 22:00</span>
            </header>

            <div style={{ flex: 1, padding: 50, maxWidth: 900, margin: "0 auto", width: "100%" }}>
              <h2 style={{ textTransform: "none", color: "#432a18", fontSize: "2.2rem", fontWeight: 900, marginBottom: 8, textAlign: "center", textShadow: "none" }}>Daftar Menu Sajian Terbaik</h2>
              <p style={{ color: "#c2410c", textAlign: "center", marginBottom: 40, fontSize: "1rem" }}>Diramu dengan bahan baku pilihan dari biji kopi lokal kualitas nomor satu.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { name: "Es Kopi Susu Aren", price: "Rp 22.000", desc: "Espresso premium dengan susu murni & sirup aren manis legit khas nusantara." },
                  { name: "Almond Butter Croissant", price: "Rp 26.000", desc: "Croissant berlapis renyah bertabur kacang almond panggang gurih buatan toko sendiri." },
                  { name: "Spaghetti Aglio Olio Tuna", price: "Rp 38.000", desc: "Pasta al dente dengan tumisan bawang putih wangi, cabai kering, dan potongan tuna melimpah." }
                ].map((item) => (
                  <div key={item.name} style={{ background: "#fff", padding: 24, borderRadius: 16, display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid rgba(234, 88, 12, 0.08)", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.02)" }}>
                    <div style={{ maxWidth: "75%" }}>
                      <div style={{ fontWeight: 900, fontSize: "1.15rem", color: "#432a18" }}>{item.name}</div>
                      <p style={{ margin: "6px 0 0", fontSize: "0.85rem", color: "#78716c", lineHeight: 1.5 }}>{item.desc}</p>
                    </div>
                    <span style={{ color: "#ea580c", fontWeight: 900, fontSize: "1.2rem", whiteSpace: "nowrap" }}>{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "property":
        return (
          <div style={{ background: "linear-gradient(rgba(248, 250, 252, 0.92), rgba(248, 250, 252, 0.96)), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat", color: "#0f172a", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <header style={{ background: "#1e293b", color: "#fff", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
                </svg>
                <span style={{ fontSize: "1.3rem", fontWeight: 900 }}>SIVILIZE PROPERTY</span>
              </div>
              <button onClick={() => window.open("https://wa.me/6281338219957", "_blank")} style={{ padding: "8px 18px", background: "#f97316", border: "none", color: "#fff", borderRadius: 30, fontWeight: 800, fontSize: "0.85rem", cursor: "pointer" }}>Hubungi Agen Kami</button>
            </header>

            <div style={{ flex: 1, padding: 50, maxWidth: 1200, margin: "0 auto", width: "100%" }}>
              <h2 style={{ textTransform: "none", color: "#0f172a", fontSize: "2.4rem", fontWeight: 950, letterSpacing: "-0.03em", marginBottom: 8, textAlign: "center", textShadow: "none" }}>Koleksi Cluster & Hunian Premium</h2>
              <p style={{ color: "#64748b", textAlign: "center", marginBottom: 48, fontSize: "1.05rem" }}>Lingkungan eksklusif dengan akses jalan tol mudah dan keamanan 24 jam non-stop.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 30 }}>
                {[
                  { name: "Cluster Green Foresta", loc: "Bandung Utara", price: "Rp 780 Juta", details: "3 Kamar Tidur | 2 Kamar Mandi | Garasi 2 Mobil", img: "🏡" },
                  { name: "Metropolitan Condominium", loc: "Jakarta Selatan", price: "Rp 1.4 Miliar", details: "2 Kamar Utama | Gym & Kolam Renang Privat | Balkon Luas", img: "🏢" },
                  { name: "Grand Vista Residence", loc: "Yogyakarta", price: "Rp 620 Juta", details: "2 Kamar Tidur | Keamanan Satu Gerbang Utama | Asri", img: "🏠" }
                ].map((item) => (
                  <div key={item.name} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.04)", borderRadius: 20, overflow: "hidden", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.03)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div style={{ background: "#f1f5f9", height: 180, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4.5rem" }}>{item.img}</div>
                    <div style={{ padding: 24 }}>
                      <div style={{ fontWeight: 900, fontSize: "1.2rem", color: "#1e293b", marginBottom: 6 }}>{item.name}</div>
                      <div style={{ fontSize: "0.85rem", color: "#f97316", fontWeight: 800, marginBottom: 12 }}>📍 {item.loc}</div>
                      <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "0 0 16px" }}>{item.details}</p>
                      <div style={{ color: "#334155", fontWeight: 900, fontSize: "1.2rem" }}>{item.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "school":
        return (
          <div style={{ background: "linear-gradient(rgba(241, 245, 249, 0.92), rgba(241, 245, 249, 0.96)), url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat", color: "#1e293b", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <header style={{ background: "#4f46e5", color: "#fff", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                </svg>
                <span style={{ fontSize: "1.25rem", fontWeight: 900 }}>SMA NEGERI SIVILIZE</span>
              </div>
              <span style={{ fontSize: "0.85rem", background: "rgba(255,255,255,0.2)", padding: "6px 16px", borderRadius: 30, fontWeight: 700 }}>Portal Akademik</span>
            </header>

            <div style={{ flex: 1, padding: 50, maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "280px 1fr", gap: 40 }}>
              <div style={{ background: "#fff", padding: 24, borderRadius: 20, border: "1px solid rgba(0,0,0,0.03)", height: "fit-content", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.03)" }}>
                <div style={{ fontWeight: 900, color: "#4f46e5", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 20 }}>Portal Belajar</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: "0.9rem" }}>
                  <div style={{ padding: "10px 14px", background: "#e0e7ff", color: "#4f46e5", borderRadius: 8, fontWeight: 800 }}>Matematika Dasar</div>
                  <div style={{ padding: "10px 14px", color: "#475569", borderRadius: 8, fontWeight: 600 }}>Fisika Kuantum</div>
                  <div style={{ padding: "10px 14px", color: "#475569", borderRadius: 8, fontWeight: 600 }}>Biologi Sel & Gen</div>
                </div>
              </div>

              <div style={{ background: "#fff", padding: 36, borderRadius: 20, border: "1px solid rgba(0,0,0,0.03)", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.05)" }}>
                <h3 style={{ textTransform: "none", color: "#1e293b", fontSize: "1.4rem", fontWeight: 900, marginBottom: 20, textShadow: "none" }}>Daftar Tugas & Evaluasi Mingguan</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ padding: 20, background: "#f8fafc", borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid rgba(0,0,0,0.01)" }}>
                    <div>
                      <div style={{ fontWeight: 800, color: "#1e293b" }}>Tugas Uji Rumus Trigonometri</div>
                      <div style={{ fontSize: "0.8rem", color: "#64748b", marginTop: 4 }}>Batas Waktu: Hari ini, Pukul 23:59 WIB</div>
                    </div>
                    <span style={{ background: "#fee2e2", color: "#ef4444", padding: "6px 12px", borderRadius: 8, fontSize: "0.8rem", fontWeight: 800 }}>Belum Kumpul</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "hotel":
        return (
          <div style={{ background: "linear-gradient(rgba(248, 250, 252, 0.88), rgba(248, 250, 252, 0.94)), url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat", color: "#1e293b", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <header style={{ background: "#1e293b", color: "#fff", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5">
                  <path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M9 9h6M9 13h6" />
                </svg>
                <span style={{ fontSize: "1.3rem", fontWeight: 900, color: "#3b82f6" }}>LUXURY RESORT & SPA</span>
              </div>
              <button onClick={() => window.open("https://wa.me/6281338219957", "_blank")} style={{ padding: "8px 18px", background: "#3b82f6", border: "none", color: "#fff", borderRadius: 30, fontWeight: 800, fontSize: "0.85rem", cursor: "pointer" }}>Reservasi Online</button>
            </header>

            <div style={{ flex: 1, padding: 50, maxWidth: 1200, margin: "0 auto", width: "100%" }}>
              <h2 style={{ textTransform: "none", color: "#1e293b", fontSize: "2.4rem", fontWeight: 950, letterSpacing: "-0.03em", marginBottom: 8, textAlign: "center", textShadow: "none" }}>Kamar & Suite Istimewa</h2>
              <p style={{ color: "#3b82f6", textAlign: "center", marginBottom: 48, fontSize: "1.05rem", fontWeight: 700 }}>Pengalaman menginap mewah tak terlupakan dengan layanan hotel bintang lima.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 30 }}>
                {[
                  { name: "Executive Suite Ocean", price: "Rp 1.450.000", desc: "Tempat tidur utama, pemandangan laut biru lepas, gratis sarapan pagi.", bed: "1 King Bed" },
                  { name: "Deluxe Family Room", price: "Rp 1.100.000", desc: "Dua tempat tidur, akses kolam renang gratis & fasilitas kebugaran.", bed: "2 Queen Bed" },
                  { name: "Presidential Luxury Suite", price: "Rp 4.500.000", desc: "Kamar ganda mewah, kolam renang pribadi luar ruangan & pelayan 24 jam.", bed: "Double Suite Room" }
                ].map((room) => (
                  <div key={room.name} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.04)", borderRadius: 20, padding: 30, display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.03)" }}>
                    <div>
                      <span style={{ display: "inline-block", background: "#eff6ff", color: "#3b82f6", padding: "4px 12px", borderRadius: 8, fontSize: "0.75rem", fontWeight: 800, marginBottom: 16 }}>{room.bed}</span>
                      <div style={{ fontWeight: 900, fontSize: "1.25rem", color: "#1e293b", marginBottom: 8 }}>{room.name}</div>
                      <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "0 0 20px", lineHeight: 1.5 }}>{room.desc}</p>
                    </div>
                    <div>
                      <div style={{ color: "#3b82f6", fontWeight: 900, fontSize: "1.3rem", marginBottom: 16 }}>{room.price} <span style={{ fontSize: "0.8rem", color: "#64748b" }}>/ Malam</span></div>
                      <button onClick={() => window.open("https://wa.me/6281338219957", "_blank")} style={{ width: "100%", padding: 12, background: "#1e293b", border: "none", color: "#fff", borderRadius: 10, fontWeight: 800, cursor: "pointer", transition: "all 0.2s" }}>Pesan Kamar</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "workshop":
        return (
          <div style={{ background: "linear-gradient(rgba(30, 30, 30, 0.92), rgba(30, 30, 30, 0.96)), url('https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat", color: "#fff", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <header style={{ background: "#dc2626", color: "#fff", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
                <span style={{ fontSize: "1.3rem", fontWeight: 900 }}>BENGKEL AUTO DIGITAL</span>
              </div>
              <button onClick={() => window.open("https://wa.me/6281338219957", "_blank")} style={{ padding: "8px 18px", background: "#fff", color: "#dc2626", border: "none", borderRadius: 30, fontWeight: 800, fontSize: "0.85rem", cursor: "pointer" }}>Booking Jadwal Servis</button>
            </header>

            <div style={{ flex: 1, padding: 50, maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 40 }}>
              <div style={{ background: "#262626", padding: 36, borderRadius: 20, border: "1px solid rgba(255,255,255,0.03)" }}>
                <h3 style={{ textTransform: "none", color: "#fff", fontSize: "1.35rem", fontWeight: 900, marginBottom: 20, textShadow: "none" }}>Daftar Servis Kendaraan</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {["Ganti Oli Mesin Berkala", "Tune Up & Cek Kelistrikan", "Servis Sistem Rem & Kaki-Kaki"].map((s) => (
                    <div key={s} style={{ padding: 18, background: "#171717", borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid rgba(255,255,255,0.02)" }}>
                      <span style={{ fontWeight: 700 }}>{s}</span>
                      <span style={{ color: "#dc2626", fontWeight: 900, cursor: "pointer", fontSize: "0.9rem" }}>Pilih & Jadwalkan →</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: "#262626", padding: 36, borderRadius: 20, border: "1px solid rgba(255,255,255,0.03)", display: "flex", flexDirection: "column" }}>
                <h3 style={{ textTransform: "none", color: "#fff", fontSize: "1.35rem", fontWeight: 900, marginBottom: 20, textShadow: "none" }}>Status Pengerjaan Unit Aktif</h3>
                <div style={{ padding: 24, background: "#171717", borderRadius: 12, border: "1px solid rgba(255,255,255,0.02)", flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: "1.1rem" }}>Honda Civic (B 1242 AD)</div>
                  <div style={{ fontSize: "0.85rem", color: "#a3a3a3", marginTop: 4 }}>Pekerjaan: Ganti Oli Mesin & Filter Udara</div>
                  <div style={{ width: "100%", height: 8, background: "rgba(255,255,255,0.05)", borderRadius: 4, overflow: "hidden", marginTop: 24 }}>
                    <div style={{ width: "70%", height: "100%", background: "#dc2626" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "#a3a3a3", marginTop: 12 }}>
                    <span>Progres: 70% Selesai</span>
                    <span>Estimasi: 15 Menit Lagi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "ecommerce":
        return (
          <div style={{ background: "linear-gradient(rgba(248, 250, 252, 0.92), rgba(248, 250, 252, 0.96)), url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat", color: "#0f172a", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <header style={{ background: "rgba(255, 255, 255, 0.85)", backdropFilter: "blur(12px)", padding: "20px 40px", borderBottom: "1px solid rgba(37, 99, 235, 0.15)", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <span style={{ fontSize: "1.3rem", fontWeight: 950, color: "#1e3a8a" }}>SIVILIZE RETAIL</span>
              </div>
              <span style={{ fontWeight: 800, fontSize: "0.9rem" }}>Toko Elektronik Digital</span>
            </header>

            <div style={{ flex: 1, padding: 40, maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 360px", gap: 40 }}>
              <div>
                <h3 style={{ textTransform: "none", color: "#0f172a", fontSize: "1.4rem", fontWeight: 900, marginBottom: 20, textShadow: "none" }}>Daftar Aksesoris Gadget</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                  {[
                    { name: "Mechanical Keyboard", price: 890000, desc: "Papan ketik mekanikal berkonektivitas nirkabel responsif.", label: "Premium" },
                    { name: "Gaming Mouse Wireless", price: 650000, desc: "Tetikus nirkabel bersensor presisi tinggi 16000 DPI.", label: "Terlaris" },
                    { name: "IPS Monitor 24 Inch", price: 1750000, desc: "Layar monitor panel IPS resolusi tajam Full HD 75Hz.", label: "Diskon" }
                  ].map((p) => (
                    <div key={p.name} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.03)", borderRadius: 16, padding: 24, textAlign: "center", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.03)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <span style={{ display: "inline-block", background: "#eff6ff", color: "#2563eb", padding: "4px 12px", borderRadius: 8, fontSize: "0.75rem", fontWeight: 800, marginBottom: 16 }}>{p.label}</span>
                        <div style={{ fontWeight: 900, fontSize: "1.1rem", color: "#1e293b", marginBottom: 8 }}>{p.name}</div>
                        <p style={{ fontSize: "0.8rem", color: "#64748b", lineHeight: 1.5, margin: "0 0 20px" }}>{p.desc}</p>
                      </div>
                      <div>
                        <div style={{ color: "#2563eb", fontWeight: 900, fontSize: "1.2rem", marginBottom: 16 }}>Rp {p.price.toLocaleString("id-ID")}</div>
                        <button
                          onClick={() => {
                            const exist = cartItems.find((c) => c.name === p.name);
                            if (exist) {
                              setCartItems(cartItems.map((c) => c.name === p.name ? { ...c, qty: c.qty + 1 } : c));
                            } else {
                              setCartItems([...cartItems, { name: p.name, qty: 1, price: p.price }]);
                            }
                          }}
                          style={{ width: "100%", padding: 12, background: "#2563eb", border: "none", color: "#fff", fontWeight: 800, borderRadius: 10, cursor: "pointer", transition: "all 0.2s" }}
                        >
                          Beli Sekarang
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shopping cart summary */}
              <div style={{ background: "#fff", padding: 30, borderRadius: 20, border: "1px solid rgba(0,0,0,0.03)", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.05)", alignSelf: "start" }}>
                <h3 style={{ textTransform: "none", color: "#0f172a", fontSize: "1.3rem", fontWeight: 900, marginBottom: 20, textShadow: "none" }}>Daftar Keranjang</h3>
                {cartItems.length === 0 ? (
                  <p style={{ color: "#94a3b8", fontSize: "0.85rem", textAlign: "center", margin: "40px 0" }}>Keranjang masih kosong</p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {cartItems.map((item) => (
                      <div key={item.name} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#334155" }}>
                        <span>{item.name} (x{item.qty})</span>
                        <span style={{ fontWeight: 800 }}>Rp {(item.price * item.qty).toLocaleString("id-ID")}</span>
                      </div>
                    ))}
                    <div style={{ borderTop: "2px dashed #e2e8f0", paddingTop: 16, display: "flex", justifyContent: "space-between", fontWeight: 900, fontSize: "1.05rem", color: "#0f172a" }}>
                      <span>Subtotal:</span>
                      <span>Rp {cartItems.reduce((acc, c) => acc + (c.price * c.qty), 0).toLocaleString("id-ID")}</span>
                    </div>
                    <button onClick={() => { setCartItems([]); alert("Pesanan Berhasil Diproses! Tim marketing kami akan menghubungi Anda."); }} style={{ width: "100%", padding: 14, background: "#10b981", color: "#fff", border: "none", borderRadius: 10, fontWeight: 800, marginTop: 10, cursor: "pointer", transition: "all 0.2s" }}>Bayar Belanjaan</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      fontFamily: "var(--font-sans)",
      position: "relative"
    }}>
      {/* Tombol kembali melayang dengan efek kaca (glassmorphism) */}
      <div style={{
        position: "fixed",
        bottom: 24,
        left: 24,
        zIndex: 9999
      }}>
        <button
          onClick={() => router.push("/#showcase")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(15, 23, 42, 0.75)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: 9999,
            fontSize: "0.85rem",
            fontWeight: 700,
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
            cursor: "pointer",
            transition: "transform 0.2s, background 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.background = "rgba(15, 23, 42, 0.9)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.background = "rgba(15, 23, 42, 0.75)";
          }}
        >
          <span>← Kembali ke Portofolio</span>
        </button>
      </div>

      {/* Tampilan halaman web industri yang nyata */}
      {renderActualWebsite()}
    </div>
  );
}
