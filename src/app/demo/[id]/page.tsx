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

  // Render Visual Website Asli 100% Sesuai Tema Industri
  const renderActualWebsite = () => {
    switch (demo.layout) {
      case "hospital":
        return (
          <div style={{ background: "linear-gradient(rgba(248, 250, 252, 0.9), rgba(248, 250, 252, 0.95)), url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat", color: "#1e293b", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            {/* Navigasi RS */}
            <header style={{ background: "#fff", borderBottom: "2px solid #e2e8f0", padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "#10b981" }}>🟢 RS SIVILIZE CARE</span>
              <nav style={{ display: "flex", gap: 24, fontSize: "0.9rem", fontWeight: 600 }}>
                <a href="#about" style={{ color: "#475569" }}>Profil</a>
                <a href="#dokter" style={{ color: "#475569" }}>Jadwal Dokter</a>
                <a href="#pendaftaran" style={{ color: "#10b981" }}>Pendaftaran Online</a>
              </nav>
            </header>

            {/* Banner Utama */}
            <section style={{ background: "linear-gradient(135deg, #e6f4ea 0%, #c4ebd0 100%)", padding: "60px 40px", textAlign: "center" }}>
              <h2 style={{ textTransform: "none", color: "#065f46", fontSize: "2rem", marginBottom: 12, textShadow: "none" }}>Layanan Medis Terpercaya & Instan</h2>
              <p style={{ color: "#065f46", margin: "0 auto", maxWidth: 600 }}>Daftar antrean konsultasi dokter spesialis secara mandiri dari rumah tanpa ribet antre di loket.</p>
            </section>

            {/* Form Pendaftaran & Antrean Live */}
            <div style={{ flex: 1, padding: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
              <div style={{ background: "#fff", padding: 30, borderRadius: 12, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
                <h3 style={{ textTransform: "none", color: "#1e293b", marginBottom: 20, textShadow: "none" }}>Form Registrasi Pasien Baru</h3>
                <form onSubmit={handleRegisterPatient} style={{ display: "grid", gap: 16 }}>
                  <div>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 700, fontSize: "0.85rem" }}>Nama Lengkap Pasien</label>
                    <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} required placeholder="Contoh: Joko Widodo" style={{ width: "100%", padding: 12, border: "1px solid #cbd5e1", borderRadius: 6, color: "#000" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 700, fontSize: "0.85rem" }}>Pilih Dokter Spesialis</label>
                    <select value={patientDoctor} onChange={(e) => setPatientDoctor(e.target.value)} style={{ width: "100%", padding: 12, border: "1px solid #cbd5e1", borderRadius: 6, color: "#000" }}>
                      <option value="Dr. Adrian (Sp. Bedah)">Dr. Adrian (Sp. Bedah)</option>
                      <option value="Dr. Clara (Sp. Anak)">Dr. Clara (Sp. Anak)</option>
                      <option value="Dr. Hendra (Sp. Jantung)">Dr. Hendra (Sp. Jantung)</option>
                    </select>
                  </div>
                  <button type="submit" style={{ background: "#10b981", color: "#fff", padding: 14, border: "none", borderRadius: 6, fontWeight: 700, cursor: "pointer" }}>Daftar Antrean</button>
                </form>
              </div>

              <div style={{ background: "#fff", padding: 30, borderRadius: 12, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
                <h3 style={{ textTransform: "none", color: "#1e293b", marginBottom: 20, textShadow: "none" }}>Daftar Antrean Live Hari Ini</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {patientsList.map((p) => (
                    <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 16, background: "#f8fafc", borderRadius: 8, borderLeft: "4px solid #10b981" }}>
                      <div>
                        <div style={{ fontWeight: 800 }}>{p.name}</div>
                        <div style={{ fontSize: "0.8rem", color: "#64748b" }}>Tujuan: {p.doctor}</div>
                      </div>
                      <span style={{ background: "#e6f4ea", color: "#10b981", padding: "6px 12px", borderRadius: 20, fontSize: "0.75rem", fontWeight: 700 }}>{p.id}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "pharmacy":
        return (
          <div style={{ background: "linear-gradient(rgba(240, 253, 244, 0.9), rgba(240, 253, 244, 0.95)), url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat", color: "#0f172a", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            {/* Header Apotek */}
            <header style={{ background: "#fff", padding: "20px 40px", borderBottom: "2px solid #bbf7d0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "1.3rem", fontWeight: 950, color: "#06b6d4" }}>💊 SIVILIZE APOTEK SEHAT</span>
              <span style={{ fontWeight: 700 }}>🛒 Keranjang ({cartItems.reduce((acc, c) => acc + c.qty, 0)})</span>
            </header>

            {/* Katalog Obat & Pembelian */}
            <div style={{ flex: 1, padding: 40, display: "grid", gridTemplateColumns: "1fr 340px", gap: 30 }}>
              <div>
                <h3 style={{ textTransform: "none", color: "#0f172a", marginBottom: 20, textShadow: "none" }}>Etalase Obat & Vitamin Resmi</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                  {[
                    { name: "Paracetamol 500mg", price: 12000, desc: "Pereda demam & sakit kepala" },
                    { name: "Amoxicillin Trihydrate 500mg", price: 34000, desc: "Antibiotik resep dokter" },
                    { name: "Multivitamin Active C", price: 25000, desc: "Daya tahan tubuh optimal" }
                  ].map((med) => (
                    <div key={med.name} style={{ background: "#fff", padding: 20, borderRadius: 10, border: "1px solid #cbd5e1", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: "1rem" }}>{med.name}</div>
                        <p style={{ fontSize: "0.75rem", color: "#64748b", margin: "8px 0 16px" }}>{med.desc}</p>
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, color: "#06b6d4", marginBottom: 12 }}>Rp {med.price.toLocaleString("id-ID")}</div>
                        <button
                          onClick={() => {
                            const exist = cartItems.find((c) => c.name === med.name);
                            if (exist) {
                              setCartItems(cartItems.map((c) => c.name === med.name ? { ...c, qty: c.qty + 1 } : c));
                            } else {
                              setCartItems([...cartItems, { name: med.name, qty: 1, price: med.price }]);
                            }
                          }}
                          style={{ width: "100%", padding: 10, background: "#06b6d4", border: "none", color: "#fff", borderRadius: 6, fontWeight: 700, cursor: "pointer" }}
                        >
                          + Beli Obat
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checkout Form */}
              <div style={{ background: "#fff", padding: 24, borderRadius: 12, border: "1px solid #cbd5e1" }}>
                <h3 style={{ textTransform: "none", color: "#0f172a", marginBottom: 16, textShadow: "none" }}>Checkout / POS Kasir</h3>
                {cartItems.length === 0 ? (
                  <p style={{ color: "#64748b", fontSize: "0.85rem" }}>Keranjang Anda masih kosong.</p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {cartItems.map((item) => (
                      <div key={item.name} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                        <span>{item.name} (x{item.qty})</span>
                        <span>Rp {(item.price * item.qty).toLocaleString("id-ID")}</span>
                      </div>
                    ))}
                    <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 12, display: "flex", justifyContent: "space-between", fontWeight: 800 }}>
                      <span>Total Tagihan:</span>
                      <span>Rp {cartItems.reduce((acc, c) => acc + (c.price * c.qty), 0).toLocaleString("id-ID")}</span>
                    </div>
                    <button onClick={() => { setCartItems([]); alert("Transaksi Sukses! Terima kasih telah berbelanja."); }} style={{ width: "100%", padding: 12, background: "#10b981", color: "#fff", border: "none", borderRadius: 6, fontWeight: 700, marginTop: 16, cursor: "pointer" }}>Bayar & Cetak Struk</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "corporate":
        return (
          <div style={{ background: "linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.9)), url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat", color: "#0f172a", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            {/* Header Corporate */}
            <header style={{ background: "#0f172a", color: "#fff", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "1.2rem", fontWeight: 800 }}>🏢 SIVILIZE HOLDING GROUP</span>
              <nav style={{ display: "flex", gap: 24, fontSize: "0.85rem", fontWeight: 700 }}>
                <a href="#about">About</a>
                <a href="#solutions">Solutions</a>
                <a href="#contact">Contact</a>
              </nav>
            </header>

            {/* Corporate Banner */}
            <div style={{ background: "linear-gradient(rgba(15,23,42,0.9), rgba(15,23,42,0.9)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab') center/cover", color: "#fff", padding: "100px 40px", textAlign: "center" }}>
              <h1 style={{ textTransform: "none", fontSize: "2.4rem", fontWeight: 900, marginBottom: 16 }}>Leading Innovation & Construction</h1>
              <p style={{ color: "#94a3b8", fontSize: "1.05rem", margin: "0 auto 30px", maxWidth: 640 }}>Membangun fondasi digital dan fisik yang solid untuk keberlanjutan bisnis korporat berskala global.</p>
              <button style={{ padding: "16px 32px", background: "#4f46e5", color: "#fff", border: "none", fontWeight: 700, borderRadius: 6, cursor: "pointer" }}>Hubungi Kami</button>
            </div>

            {/* Lead generation form */}
            <div style={{ padding: 60, maxWidth: 600, margin: "0 auto", width: "100%" }}>
              <div style={{ background: "#f8fafc", padding: 40, borderRadius: 12, border: "1px solid #e2e8f0" }}>
                <h3 style={{ textTransform: "none", color: "#0f172a", marginBottom: 20, textAlign: "center", textShadow: "none" }}>Dapatkan Penawaran Project Kustom</h3>
                <form onSubmit={handleSendMessage} style={{ display: "grid", gap: 16 }}>
                  <input type="text" placeholder="Nama Perusahaan Anda" required style={{ padding: 12, border: "1px solid #cbd5e1", borderRadius: 6, color: "#000" }} />
                  <input type="email" placeholder="Email Kantor Resmi" required style={{ padding: 12, border: "1px solid #cbd5e1", borderRadius: 6, color: "#000" }} />
                  <textarea placeholder="Ceritakan kebutuhan sistem / website Anda..." rows={4} required style={{ padding: 12, border: "1px solid #cbd5e1", borderRadius: 6, color: "#000" }} />
                  <button type="submit" style={{ padding: 14, background: "#4f46e5", color: "#fff", border: "none", borderRadius: 6, fontWeight: 700, cursor: "pointer" }}>Kirim Proposal Kerjasama</button>
                </form>
              </div>
            </div>
          </div>
        );

      case "creative":
        return (
          <div style={{ background: "linear-gradient(rgba(255, 252, 245, 0.9), rgba(255, 252, 245, 0.95)), url('https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat", color: "#452d0a", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            {/* Header Toko Souvenir */}
            <header style={{ background: "#f59e0b", color: "#fff", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "1.4rem", fontWeight: 900 }}>🎁 TOKO SOUVENIR RAYA</span>
              <span style={{ fontWeight: 700 }}>Hubungi Pembuat Batik</span>
            </header>

            {/* Showcase Souvenir */}
            <div style={{ flex: 1, padding: 40 }}>
              <h2 style={{ textTransform: "none", color: "#452d0a", fontSize: "1.8rem", marginBottom: 24, textAlign: "center", textShadow: "none" }}>Katalog Karya Seni & Kerajinan Lokal</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                {[
                  { name: "Vas Keramik Tanah Liat", price: "Rp 120.000", img: "🏺" },
                  { name: "Piring Kayu Jati Ukir", price: "Rp 95.000", img: "🪵" },
                  { name: "Dompet Kulit Sapi Asli", price: "Rp 245.000", img: "👜" }
                ].map((item) => (
                  <div key={item.name} style={{ background: "#fff", border: "2px solid #f59e0b22", borderRadius: 12, padding: 24, textAlign: "center" }}>
                    <div style={{ fontSize: "4rem", marginBottom: 16 }}>{item.img}</div>
                    <div style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: 8 }}>{item.name}</div>
                    <div style={{ color: "#f59e0b", fontWeight: 800, fontSize: "1.1rem", marginBottom: 16 }}>{item.price}</div>
                    <button
                      onClick={() => window.open(`https://wa.me/6281338219957?text=Halo%20Toko%20Souvenir,%20saya%20tertarik%20dengan%20${item.name}`, "_blank")}
                      style={{ padding: "10px 20px", background: "#f59e0b", border: "none", color: "#fff", fontWeight: 700, borderRadius: 6, cursor: "pointer" }}
                    >
                      Pesan via WhatsApp
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "library":
        return (
          <div style={{ background: "linear-gradient(rgba(243, 240, 255, 0.9), rgba(243, 240, 255, 0.95)), url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat", color: "#1e1b4b", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <header style={{ background: "#8b5cf6", color: "#fff", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "1.2rem", fontWeight: 800 }}>📚 E-LIBRARY ACADEMIA</span>
              <span style={{ fontSize: "0.9rem" }}>Total Buku Dipinjam: {borrowedBooks.length}</span>
            </header>

            <div style={{ flex: 1, padding: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
              {/* Form pinjam buku */}
              <div style={{ background: "#fff", padding: 30, borderRadius: 12, border: "1px solid #ddd" }}>
                <h3 style={{ textTransform: "none", color: "#1e1b4b", marginBottom: 20, textShadow: "none" }}>Ajukan Peminjaman Buku</h3>
                <form onSubmit={handleBorrowBook} style={{ display: "grid", gap: 16 }}>
                  <div>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 700 }}>Judul Buku Utama</label>
                    <input type="text" value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} required placeholder="Contoh: Logika Algoritma" style={{ width: "100%", padding: 12, border: "1px solid #cbd5e1", borderRadius: 6, color: "#000" }} />
                  </div>
                  <button type="submit" style={{ padding: 14, background: "#8b5cf6", color: "#fff", border: "none", borderRadius: 6, fontWeight: 700, cursor: "pointer" }}>Pinjam Buku Sekarang</button>
                </form>
              </div>

              {/* Log list */}
              <div style={{ background: "#fff", padding: 30, borderRadius: 12, border: "1px solid #ddd" }}>
                <h3 style={{ textTransform: "none", color: "#1e1b4b", marginBottom: 20, textShadow: "none" }}>Daftar Peminjaman Aktif</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {borrowedBooks.map((book, idx) => (
                    <div key={idx} style={{ padding: 12, background: "#f5f3ff", borderRadius: 6, borderLeft: "4px solid #8b5cf6", display: "flex", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontWeight: 800 }}>{book.title}</div>
                        <div style={{ fontSize: "0.8rem", color: "#64748b" }}>Peminjam: {book.borrower}</div>
                      </div>
                      <span style={{ fontSize: "0.75rem", color: "#8b5cf6", fontWeight: 700 }}>{book.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "travel":
        return (
          <div style={{ background: "linear-gradient(rgba(240, 249, 255, 0.85), rgba(240, 249, 255, 0.9)), url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat", color: "#0c4a6e", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <header style={{ background: "#0ea5e9", color: "#fff", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "1.3rem", fontWeight: 900 }}>✈️ SIVILIZE EXPLORE TOUR</span>
              <button onClick={() => window.open("https://wa.me/6281338219957", "_blank")} style={{ padding: "8px 16px", background: "#fff", color: "#0ea5e9", border: "none", borderRadius: 6, fontWeight: 700, cursor: "pointer" }}>Hubungi Agen</button>
            </header>

            <div style={{ flex: 1, padding: 40 }}>
              <h2 style={{ textTransform: "none", color: "#0c4a6e", fontSize: "1.8rem", marginBottom: 24, textAlign: "center", textShadow: "none" }}>Pilihan Paket Tour Terbaik & Hemat</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                {[
                  { name: "Trip Nusa Penida, Bali", price: "Rp 1.850.000", desc: "3 Hari 2 Malam, Transport & Hotel Bintang 4", img: "🌴" },
                  { name: "Explore Rinjani, Lombok", price: "Rp 2.400.000", desc: "4 Hari 3 Malam, Porter & Camping Gear Lengkap", img: "🏔️" },
                  { name: "Eksotisme Raja Ampat, Papua", price: "Rp 8.900.000", desc: "5 Hari 4 Malam, Yacht Trip & Snorkeling", img: "⛵" }
                ].map((trip) => (
                  <div key={trip.name} style={{ background: "#fff", padding: 24, borderRadius: 12, border: "1px solid #e0f2fe", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontSize: "3rem", marginBottom: 12 }}>{trip.img}</div>
                      <div style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: 6 }}>{trip.name}</div>
                      <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "0 0 16px" }}>{trip.desc}</p>
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, color: "#0ea5e9", fontSize: "1.15rem", marginBottom: 16 }}>{trip.price}</div>
                      <button onClick={() => window.open(`https://wa.me/6281338219957?text=Halo%20saya%20tertarik%20booking%20${trip.name}`, "_blank")} style={{ width: "100%", padding: 12, background: "#0ea5e9", border: "none", color: "#fff", borderRadius: 6, fontWeight: 700, cursor: "pointer" }}>Booking Online</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "cafe":
        return (
          <div style={{ background: "linear-gradient(rgba(250, 247, 242, 0.9), rgba(250, 247, 242, 0.95)), url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat", color: "#432a18", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <header style={{ background: "#ea580c", color: "#fff", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "1.2rem", fontWeight: 800 }}>☕ SENJA CAFE & BISTRO</span>
              <span>Jam Operasional: 10:00 - 22:00</span>
            </header>

            <div style={{ flex: 1, padding: 40, maxWidth: 800, margin: "0 auto", width: "100%" }}>
              <h2 style={{ textTransform: "none", color: "#432a18", fontSize: "2rem", marginBottom: 30, textAlign: "center", textShadow: "none" }}>Daftar Menu Hidangan Utama</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { name: "Es Kopi Susu Aren", price: "Rp 22.000", desc: "Espresso premium dengan susu murni & sirup aren manis legit." },
                  { name: "Almond Butter Croissant", price: "Rp 26.000", desc: "Croissant berlapis renyah bertabur kacang almond panggang gurih." },
                  { name: "Spaghetti Aglio Olio Tuna", price: "Rp 38.000", desc: "Pasta al dente dengan tumisan bawang putih, cabai kering, dan potongan tuna." }
                ].map((item) => (
                  <div key={item.name} style={{ background: "#fff", padding: 20, borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #f1eae0" }}>
                    <div style={{ maxWidth: "70%" }}>
                      <div style={{ fontWeight: 800, fontSize: "1.05rem" }}>{item.name}</div>
                      <p style={{ margin: "4px 0 0", fontSize: "0.8rem", color: "#78716c" }}>{item.desc}</p>
                    </div>
                    <span style={{ color: "#ea580c", fontWeight: 800, fontSize: "1.1rem" }}>{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "property":
        return (
          <div style={{ background: "linear-gradient(rgba(248, 250, 252, 0.9), rgba(248, 250, 252, 0.95)), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat", color: "#0f172a", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <header style={{ background: "#1e293b", color: "#fff", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "1.2rem", fontWeight: 800 }}>🏙️ SIVILIZE LAND & PROPERTY</span>
              <button onClick={() => window.open("https://wa.me/6281338219957", "_blank")} style={{ padding: "8px 16px", background: "#f97316", border: "none", color: "#fff", borderRadius: 6, fontWeight: 700, cursor: "pointer" }}>Hubungi Sales</button>
            </header>

            <div style={{ flex: 1, padding: 40 }}>
              <h2 style={{ textTransform: "none", color: "#1e293b", fontSize: "1.8rem", marginBottom: 24, textAlign: "center", textShadow: "none" }}>Daftar Perumahan & Cluster Premium</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                {[
                  { name: "Cluster Green Foresta", loc: "Bandung Utara", price: "Rp 780 Juta", img: "🏡" },
                  { name: "Metropolitan Condominium", loc: "Jakarta Selatan", price: "Rp 1.4 Miliar", img: "🏢" },
                  { name: "Grand Vista Residence", loc: "Yogyakarta", price: "Rp 620 Juta", img: "🏠" }
                ].map((item) => (
                  <div key={item.name} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
                    <div style={{ background: "#e2e8f0", height: 160, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem" }}>{item.img}</div>
                    <div style={{ padding: 20 }}>
                      <div style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: 6 }}>{item.name}</div>
                      <div style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: 12 }}>📍 {item.loc}</div>
                      <div style={{ color: "#f97316", fontWeight: 800, fontSize: "1.1rem" }}>{item.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "school":
        return (
          <div style={{ background: "linear-gradient(rgba(241, 245, 249, 0.9), rgba(241, 245, 249, 0.95)), url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat", color: "#1e293b", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <header style={{ background: "#4f46e5", color: "#fff", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "1.2rem", fontWeight: 800 }}>🏫 SMA NEGERI SIVILIZE</span>
              <nav style={{ display: "flex", gap: 24, fontSize: "0.9rem" }}>
                <span>Dashboard E-Learning</span>
              </nav>
            </header>

            <div style={{ flex: 1, padding: 40, display: "grid", gridTemplateColumns: "250px 1fr", gap: 30 }}>
              <div style={{ background: "#fff", padding: 20, borderRadius: 10, border: "1px solid #cbd5e1" }}>
                <div style={{ fontWeight: 800, color: "#4f46e5", marginBottom: 16 }}>Portal Belajar</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: "0.85rem" }}>
                  <div style={{ padding: 8, background: "#e0e7ff", color: "#4f46e5", borderRadius: 4, fontWeight: 700 }}>📚 Matematika Dasar</div>
                  <div>🔬 Fisika Kuantum</div>
                  <div>🧬 Biologi Sel</div>
                </div>
              </div>
              <div style={{ background: "#fff", padding: 30, borderRadius: 10, border: "1px solid #cbd5e1" }}>
                <h3 style={{ textTransform: "none", color: "#1e293b", marginBottom: 16, textShadow: "none" }}>Daftar Tugas & Ujian Mandiri</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ padding: 16, background: "#f8fafc", borderRadius: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>Tugas Trigonometri - Kumpulkan sebelum 23:59</span>
                    <span style={{ background: "#ef444422", color: "#ef4444", padding: "4px 8px", borderRadius: 4, fontSize: "0.75rem", fontWeight: 700 }}>Belum Selesai</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "hotel":
        return (
          <div style={{ background: "linear-gradient(rgba(248, 250, 252, 0.85), rgba(248, 250, 252, 0.9)), url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat", color: "#1e293b", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <header style={{ background: "#1e293b", color: "#fff", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "1.3rem", fontWeight: 900, color: "#3b82f6" }}>🏨 LUXURY HOTEL & SPA</span>
              <button onClick={() => window.open("https://wa.me/6281338219957", "_blank")} style={{ padding: "8px 16px", background: "#3b82f6", border: "none", color: "#fff", borderRadius: 6, fontWeight: 700, cursor: "pointer" }}>Reservasi Kamar</button>
            </header>

            <div style={{ flex: 1, padding: 40 }}>
              <h2 style={{ textTransform: "none", color: "#1e293b", fontSize: "1.8rem", marginBottom: 24, textAlign: "center", textShadow: "none" }}>Pilihan Kamar Mewah & Eksklusif</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                {[
                  { name: "Executive Suite Ocean", price: "Rp 1.450.000", desc: "King Bed, Pemandangan Laut Lepas, Sarapan Pagi" },
                  { name: "Deluxe Family Room", price: "Rp 1.100.000", desc: "Twin Bed, Gym & Kolam Renang Gratis" },
                  { name: "Presidential Luxury Suite", price: "Rp 4.500.000", desc: "Double Suite, Private Pool, Butler Service 24 Jam" }
                ].map((room) => (
                  <div key={room.name} style={{ background: "#fff", border: "1px solid #cbd5e1", borderRadius: 10, padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: 8 }}>{room.name}</div>
                      <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "0 0 16px" }}>{room.desc}</p>
                    </div>
                    <div>
                      <div style={{ color: "#3b82f6", fontWeight: 800, fontSize: "1.1rem", marginBottom: 12 }}>{room.price} / Malam</div>
                      <button onClick={() => window.open("https://wa.me/6281338219957", "_blank")} style={{ width: "100%", padding: 10, background: "#1e293b", border: "none", color: "#fff", borderRadius: 6, fontWeight: 700, cursor: "pointer" }}>Booking Kamar</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "workshop":
        return (
          <div style={{ background: "linear-gradient(rgba(30, 30, 30, 0.9), rgba(30, 30, 30, 0.95)), url('https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat", color: "#fff", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <header style={{ background: "#dc2626", color: "#fff", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "1.2rem", fontWeight: 800 }}>🚗 BENGKEL DIGITAL AUTO</span>
              <button onClick={() => window.open("https://wa.me/6281338219957", "_blank")} style={{ padding: "8px 16px", background: "#fff", color: "#dc2626", border: "none", borderRadius: 6, fontWeight: 700, cursor: "pointer" }}>Booking Mekanik</button>
            </header>

            <div style={{ flex: 1, padding: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}>
              <div style={{ background: "#2d2d2d", padding: 24, borderRadius: 10 }}>
                <h3 style={{ textTransform: "none", color: "#fff", marginBottom: 16, textShadow: "none" }}>Daftar Servis Mandiri</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {["Ganti Oli Mesin Berkala", "Tune Up & Cek Sensor", "Servis Rem & Kaki-Kaki"].map((s) => (
                    <div key={s} style={{ padding: 12, background: "#3d3d3d", borderRadius: 6, display: "flex", justifyContent: "space-between" }}>
                      <span>{s}</span>
                      <span style={{ color: "#dc2626", fontWeight: 700 }}>Pilih</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: "#2d2d2d", padding: 24, borderRadius: 10 }}>
                <h3 style={{ textTransform: "none", color: "#fff", marginBottom: 16, textShadow: "none" }}>Status Perbaikan Live</h3>
                <div style={{ padding: 16, background: "#3d3d3d", borderRadius: 6 }}>
                  <div style={{ fontWeight: 700 }}>Honda Civic (B 1242 AD)</div>
                  <div style={{ fontSize: "0.8rem", color: "#a1a1aa", marginTop: 4 }}>Tahap: Ganti Oli Mesin</div>
                  <div style={{ width: "100%", height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 3, overflow: "hidden", marginTop: 12 }}>
                    <div style={{ width: "70%", height: "100%", background: "#dc2626" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "ecommerce":
        return (
          <div style={{ background: "linear-gradient(rgba(248, 250, 252, 0.85), rgba(248, 250, 252, 0.95)), url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat", color: "#0f172a", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <header style={{ background: "#2563eb", color: "#fff", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "1.3rem", fontWeight: 900 }}>🛒 SIVILIZE MEGA STORE</span>
              <span>Checkout Kasir</span>
            </header>

            <div style={{ flex: 1, padding: 40, display: "grid", gridTemplateColumns: "1fr 320px", gap: 30 }}>
              <div>
                <h3 style={{ textTransform: "none", color: "#0f172a", marginBottom: 20, textShadow: "none" }}>Daftar Produk Retail Tersedia</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                  {[
                    { name: "Wireless Mechanical Keyboard", price: 890000, img: "⌨️" },
                    { name: "Wireless Gaming Mouse", price: 650000, img: "🖱️" },
                    { name: "Full HD Monitor IPS 24 Inch", price: 1750000, img: "🖥️" }
                  ].map((p) => (
                    <div key={p.name} style={{ background: "#fff", border: "1px solid #cbd5e1", borderRadius: 10, padding: 20, textAlign: "center" }}>
                      <div style={{ fontSize: "3rem", marginBottom: 12 }}>{p.img}</div>
                      <div style={{ fontWeight: 800, fontSize: "0.95rem", marginBottom: 8 }}>{p.name}</div>
                      <div style={{ color: "#2563eb", fontWeight: 800, marginBottom: 16 }}>Rp {p.price.toLocaleString("id-ID")}</div>
                      <button
                        onClick={() => {
                          const exist = cartItems.find((c) => c.name === p.name);
                          if (exist) {
                            setCartItems(cartItems.map((c) => c.name === p.name ? { ...c, qty: c.qty + 1 } : c));
                          } else {
                            setCartItems([...cartItems, { name: p.name, qty: 1, price: p.price }]);
                          }
                        }}
                        style={{ padding: "10px 20px", background: "#2563eb", border: "none", color: "#fff", fontWeight: 700, borderRadius: 6, cursor: "pointer" }}
                      >
                        + Masuk Keranjang
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shopping cart summary */}
              <div style={{ background: "#fff", padding: 24, borderRadius: 12, border: "1px solid #cbd5e1" }}>
                <h3 style={{ textTransform: "none", color: "#0f172a", marginBottom: 16, textShadow: "none" }}>Keranjang Belanja</h3>
                {cartItems.length === 0 ? (
                  <p style={{ color: "#64748b", fontSize: "0.85rem" }}>Keranjang Anda masih kosong.</p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {cartItems.map((item) => (
                      <div key={item.name} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                        <span>{item.name} (x{item.qty})</span>
                        <span>Rp {(item.price * item.qty).toLocaleString("id-ID")}</span>
                      </div>
                    ))}
                    <div style={{ borderTop: "1px solid #cbd5e1", paddingTop: 12, display: "flex", justifyContent: "space-between", fontWeight: 800 }}>
                      <span>Subtotal:</span>
                      <span>Rp {cartItems.reduce((acc, c) => acc + (c.price * c.qty), 0).toLocaleString("id-ID")}</span>
                    </div>
                    <button onClick={() => { setCartItems([]); alert("Pesanan Berhasil Diproses! Tim marketing kami akan menghubungi Anda."); }} style={{ width: "100%", padding: 12, background: "#10b981", color: "#fff", border: "none", borderRadius: 6, fontWeight: 700, marginTop: 16, cursor: "pointer" }}>Checkout Order</button>
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
