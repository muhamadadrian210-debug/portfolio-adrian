"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Database data demo dengan metadata warna premium, icon SVG, dan informasi penunjang
const demoData: Record<string, {
  title: string;
  themeColor: string;
  glowColor: string;
  textColor: string;
  accentColor: string;
  gradientBg: string;
  features: string[];
  layout: string;
  tagline: string;
}> = {
  "hospital": {
    title: "Sivilize Health Clinic",
    themeColor: "#10b981", // Emerald
    glowColor: "rgba(16, 185, 129, 0.25)",
    textColor: "#a7f3d0",
    accentColor: "#34d399",
    gradientBg: "linear-gradient(135deg, rgba(10, 26, 20, 0.55) 0%, rgba(3, 8, 6, 0.72) 100%), url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat fixed",
    features: ["Pendaftaran Pasien", "Jadwal Dokter", "Dashboard Admin", "Riwayat Pasien", "Informasi Layanan"],
    layout: "hospital",
    tagline: "Sistem Manajemen Antrean Medis & Rekam Medis Cloud-Ready"
  },
  "pharmacy": {
    title: "Apotek Medika Digital",
    themeColor: "#06b6d4", // Cyan
    glowColor: "rgba(6, 182, 212, 0.25)",
    textColor: "#c5f2f7",
    accentColor: "#22d3ee",
    gradientBg: "linear-gradient(135deg, rgba(8, 28, 35, 0.55) 0%, rgba(2, 7, 10, 0.72) 100%), url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat fixed",
    features: ["Katalog Produk", "Stok Obat", "Pemesanan Online", "Dashboard Apotek", "Manajemen Produk"],
    layout: "pharmacy",
    tagline: "Smart POS & E-Commerce Farmasi Terpadu"
  },
  "company": {
    title: "Sivilize Global Holding",
    themeColor: "#6366f1", // Indigo
    glowColor: "rgba(99, 102, 241, 0.25)",
    textColor: "#e0e7ff",
    accentColor: "#818cf8",
    gradientBg: "linear-gradient(135deg, rgba(10, 12, 30, 0.55) 0%, rgba(3, 4, 12, 0.72) 100%), url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat fixed",
    features: ["Company Profile", "Lead Generation", "Service Showcase", "Contact Form", "Portfolio"],
    layout: "corporate",
    tagline: "Transformasi Digital Usaha dengan Arsitektur Skala Enterprise"
  },
  "souvenir": {
    title: "Kriya Nusa Souvenir",
    themeColor: "#f59e0b", // Amber
    glowColor: "rgba(245, 158, 11, 0.25)",
    textColor: "#fde68a",
    accentColor: "#fbbf24",
    gradientBg: "linear-gradient(135deg, rgba(28, 20, 7, 0.55) 0%, rgba(8, 5, 2, 0.72) 100%), url('https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat fixed",
    features: ["Katalog Produk", "WhatsApp Order", "Testimoni", "Galeri Produk", "Promo"],
    layout: "creative",
    tagline: "Showcase Kerajinan Seni Lokal & Hub WhatsApp Kasir"
  },
  "library": {
    title: "E-Library Pustaka Digital",
    themeColor: "#8b5cf6", // Purple
    glowColor: "rgba(139, 92, 246, 0.25)",
    textColor: "#ddd6fe",
    accentColor: "#a78bfa",
    gradientBg: "linear-gradient(135deg, rgba(14, 9, 33, 0.55) 0%, rgba(4, 2, 10, 0.72) 100%), url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat fixed",
    features: ["Manajemen Buku", "Peminjaman", "Pengembalian", "Dashboard Admin", "Pencarian Buku"],
    layout: "library",
    tagline: "Otomasi Katalog & Manajemen Peminjaman Buku Sekolah"
  },
  "travel": {
    title: "Sivilize Horizon Travel",
    themeColor: "#0ea5e9", // Sky
    glowColor: "rgba(14, 165, 233, 0.25)",
    textColor: "#e0f2fe",
    accentColor: "#38bdf8",
    gradientBg: "linear-gradient(135deg, rgba(3, 18, 30, 0.5) 0%, rgba(1, 5, 10, 0.7) 100%), url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat fixed",
    features: ["Paket Wisata", "Booking Online", "Galeri Destinasi", "Jadwal Tour", "Customer Management"],
    layout: "travel",
    tagline: "Reservasi Paket Trip & Itinerari Dinamis Instan"
  },
  "cafe": {
    title: "Senja Coffee & Bistro",
    themeColor: "#f97316", // Orange
    glowColor: "rgba(249, 115, 22, 0.25)",
    textColor: "#ffedd5",
    accentColor: "#fb923c",
    gradientBg: "linear-gradient(135deg, rgba(28, 16, 8, 0.55) 0%, rgba(9, 5, 2, 0.72) 100%), url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat fixed",
    features: ["Digital Menu", "Reservasi", "Pemesanan", "Promo", "Dashboard Pesanan"],
    layout: "cafe",
    tagline: "Katalog Menu F&B Interaktif & Booking Meja Live"
  },
  "property": {
    title: "Sivilize Estate & Residence",
    themeColor: "#ea580c", // Dark Orange/Rust
    glowColor: "rgba(234, 88, 12, 0.25)",
    textColor: "#ffedd5",
    accentColor: "#f97316",
    gradientBg: "linear-gradient(135deg, rgba(24, 10, 4, 0.55) 0%, rgba(7, 3, 1, 0.72) 100%), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat fixed",
    features: ["Katalog Properti", "Landing Page Proyek", "Lead Generation", "Form Konsultasi", "Progress Proyek"],
    layout: "property",
    tagline: "Galeri Hunian Premium & Kalkulator Simulasi Kredit"
  },
  "school": {
    title: "SMA Bangsa Sivilize",
    themeColor: "#3b82f6", // Blue
    glowColor: "rgba(59, 130, 246, 0.25)",
    textColor: "#dbeafe",
    accentColor: "#60a5fa",
    gradientBg: "linear-gradient(135deg, rgba(4, 16, 35, 0.55) 0%, rgba(1, 5, 10, 0.72) 100%), url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat fixed",
    features: ["Informasi Sekolah", "Pendaftaran", "Dashboard Siswa", "Jadwal Pelajaran", "E-Learning"],
    layout: "school",
    tagline: "Portal Akademik Terpadu & Dashboard Pengumpulan Tugas"
  },
  "hotel": {
    title: "Grand Horizon Luxury Resort",
    themeColor: "#d97706", // Amber dark/Gold
    glowColor: "rgba(217, 119, 6, 0.25)",
    textColor: "#fef3c7",
    accentColor: "#fbbf24",
    gradientBg: "linear-gradient(135deg, rgba(23, 16, 5, 0.55) 0%, rgba(6, 4, 1, 0.72) 100%), url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat fixed",
    features: ["Booking Kamar", "Room Showcase", "Galeri Hotel", "Promo", "Customer Management"],
    layout: "hotel",
    tagline: "Hospitality System & Kamar Premium Bintang Lima"
  },
  "workshop": {
    title: "AutoTech Digital Workshop",
    themeColor: "#ef4444", // Red
    glowColor: "rgba(239, 68, 68, 0.25)",
    textColor: "#fee2e2",
    accentColor: "#f87171",
    gradientBg: "linear-gradient(135deg, rgba(28, 6, 6, 0.55) 0%, rgba(7, 2, 2, 0.72) 100%), url('https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat fixed",
    features: ["Booking Service", "Sparepart Catalog", "Riwayat Servis", "Dashboard Bengkel", "WhatsApp Booking"],
    layout: "workshop",
    tagline: "Monitoring Antrean Servis Live & Telemetri Progres Bengkel"
  },
  "ecommerce": {
    title: "Sivilize Cyber Store",
    themeColor: "#ec4899", // Pink/Cyberpunk
    glowColor: "rgba(236, 72, 153, 0.25)",
    textColor: "#fce7f3",
    accentColor: "#f472b6",
    gradientBg: "linear-gradient(135deg, rgba(28, 5, 18, 0.55) 0%, rgba(7, 1, 4, 0.72) 100%), url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat fixed",
    features: ["Katalog Produk", "Keranjang Belanja", "Checkout", "Dashboard Penjualan", "Manajemen Produk"],
    layout: "ecommerce",
    tagline: "Platform Toko Elektronik Modern & Keranjang Pintar"
  }
};

export default function DemoPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const demo = demoData[id];

  // 1. States untuk Rumah Sakit
  const [patientName, setPatientName] = useState("");
  const [patientDoctor, setPatientDoctor] = useState("Dr. Adrian (Sp. Bedah)");
  const [patientsList, setPatientsList] = useState<Array<{ name: string; doctor: string; id: string }>>([
    { id: "P-1", name: "Budi Santoso", doctor: "Dr. Adrian (Sp. Bedah)" },
    { id: "P-2", name: "Siti Rahma", doctor: "Dr. Clara (Sp. Anak)" }
  ]);

  // 2. States untuk Apotek & E-Commerce
  const [cartItems, setCartItems] = useState<Array<{ name: string; qty: number; price: number }>>([]);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState("");
  const [discount, setDiscount] = useState(0);

  // 3. States untuk Corporate / LP
  const [corporateName, setCorporateName] = useState("");
  const [corporateEmail, setCorporateEmail] = useState("");
  const [corporateDesc, setCorporateDesc] = useState("");
  const [isProposalSent, setIsProposalSent] = useState(false);

  // 4. States untuk Library
  const [bookTitle, setBookTitle] = useState("");
  const [bookSearchQuery, setBookSearchQuery] = useState("");
  const [borrowedBooks, setBorrowedBooks] = useState<Array<{ title: string; borrower: string; date: string }>>([
    { title: "Dasar Pemrograman Web Modern", borrower: "Adrian", date: "2026-06-17" },
    { title: "Konsep Arsitektur Cloud", borrower: "Putra", date: "2026-06-18" }
  ]);

  // 5. States untuk Travel
  const [travelPax, setTravelPax] = useState(1);
  const [travelDest, setTravelDest] = useState(1850000); // Default Bali price

  // 6. States untuk Cafe & Resto
  const [selectedTable, setSelectedTable] = useState("Meja 04");
  const [bookedTables, setBookedTables] = useState<string[]>(["Meja 01", "Meja 07"]);

  // 7. States untuk Property KPR Calculator
  const [propertyPrice, setPropertyPrice] = useState(780000000);
  const [dpPercentage, setDpPercentage] = useState(20);
  const [tenureYears, setTenureYears] = useState(15);

  // 8. States untuk E-learning / School
  const [homeworkStatus, setHomeworkStatus] = useState("Belum Kumpul");
  const [isSubmittingTask, setIsSubmittingTask] = useState(false);

  // 9. States untuk Hotel Availability
  const [checkInDate, setCheckInDate] = useState("2026-06-20");
  const [checkOutDate, setCheckOutDate] = useState("2026-06-22");
  const [isRoomAvailable, setIsRoomAvailable] = useState<boolean | null>(null);

  // 10. States untuk Workshop Servis
  const [carPlate, setCarPlate] = useState("");
  const [serviceType, setServiceType] = useState("Ganti Oli Mesin Berkala");
  const [workshopQueue, setWorkshopQueue] = useState<Array<{ plate: string; service: string; progress: number }>>([
    { plate: "B 1242 AD", service: "Ganti Oli Mesin", progress: 70 },
    { plate: "D 9982 YZ", service: "Tune Up & Kelistrikan", progress: 25 }
  ]);

  if (!demo) {
    return (
      <div style={{ background: "#020617", color: "#fff", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <h2 style={{ color: "#fff", fontSize: "2rem", textShadow: "none" }}>Demo Tidak Ditemukan</h2>
        <button onClick={() => router.push("/")} style={{ marginTop: 20, padding: "12px 24px", background: "#4f46e5", border: "none", color: "#fff", cursor: "pointer", borderRadius: 8, fontWeight: 700 }}>
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
    alert("Pendaftaran Berhasil! Silakan cek daftar antrean di sebelah kanan.");
  };

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "SEHAT10") {
      setDiscount(10);
      setAppliedPromo("SEHAT10 (Diskon 10%)");
      alert("Kode promo berhasil dipasang!");
    } else {
      alert("Kode promo tidak valid. Gunakan: SEHAT10");
    }
  };

  const handleSendProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!corporateName || !corporateEmail || !corporateDesc) return;
    setIsProposalSent(true);
    setTimeout(() => {
      setIsProposalSent(false);
      setCorporateName("");
      setCorporateEmail("");
      setCorporateDesc("");
      alert("Proposal kemitraan Anda berhasil disimulasikan terkirim ke sistem Sivilize CRM.");
    }, 2000);
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

  const handleBookTable = () => {
    if (bookedTables.includes(selectedTable)) {
      alert(`${selectedTable} sudah dipesan!`);
    } else {
      setBookedTables([...bookedTables, selectedTable]);
      alert(`Berhasil memesan ${selectedTable} secara real-time.`);
    }
  };

  const handleKPRCalculation = () => {
    const loanAmount = propertyPrice * (1 - dpPercentage / 100);
    const annualInterestRate = 0.08; // Flat 8% bunga simulasi
    const monthlyInterestRate = annualInterestRate / 12;
    const numberOfPayments = tenureYears * 12;
    const monthlyPayment = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
                           (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    return Math.round(monthlyPayment);
  };

  const handleUploadTask = () => {
    setIsSubmittingTask(true);
    setTimeout(() => {
      setIsSubmittingTask(false);
      setHomeworkStatus("Sudah Dikumpul (Dalam Antrean Penilaian)");
      alert("Tugas simulasi berhasil diupload ke server akademis.");
    }, 1500);
  };

  const handleCheckRoom = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRoomAvailable(true);
    alert("Kamar Tersedia! Anda dapat melanjutkan pemesanan fiktif.");
  };

  const handleAddWorkshopQueue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!carPlate) return;
    setWorkshopQueue([...workshopQueue, {
      plate: carPlate.toUpperCase(),
      service: serviceType,
      progress: 0
    }]);
    setCarPlate("");
    alert("Mobil Anda berhasil didaftarkan masuk antrean servis live.");
  };

  // Render Visual Website Asli Premium (Handcrafted UI, Premium Aesthetics)
  const renderActualWebsite = () => {
    switch (demo.layout) {
      case "hospital":
        return (
          <div style={{ background: demo.gradientBg, color: "#e2e8f0", minHeight: "100vh", display: "flex", flexDirection: "column", paddingBottom: 60 }}>
            {/* Navigasi RS Glassmorphism */}
            <header style={{ background: "rgba(10, 26, 20, 0.8)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(16, 185, 129, 0.2)", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={demo.themeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
                <span style={{ fontSize: "1.4rem", fontWeight: 900, letterSpacing: "-0.025em", color: "#fff" }}>SIVILIZE HEALTH</span>
              </div>
              <nav style={{ display: "flex", gap: 28, fontSize: "0.925rem", fontWeight: 700 }}>
                <a href="#profil" style={{ color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = demo.themeColor} onMouseLeave={(e) => e.currentTarget.style.color = "#94a3b8"}>Layanan Spesialis</a>
                <a href="#jadwal" style={{ color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = demo.themeColor} onMouseLeave={(e) => e.currentTarget.style.color = "#94a3b8"}>Ulasan Pasien</a>
                <a href="#pendaftaran" style={{ color: demo.themeColor, textDecoration: "none", borderBottom: `2px solid ${demo.themeColor}`, paddingBottom: 4 }}>Registrasi Online</a>
              </nav>
            </header>

            {/* Banner Utama */}
            <section style={{ padding: "100px 40px 60px", textAlign: "center", position: "relative" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: `radial-gradient(circle at center, ${demo.glowColor} 0%, transparent 60%)`, pointerEvents: "none" }} />
              <span style={{ background: "rgba(16, 185, 129, 0.15)", color: demo.accentColor, padding: "8px 18px", borderRadius: 9999, fontSize: "0.75rem", fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", border: "1px solid rgba(16, 185, 129, 0.3)" }}>SIMULASI PORTAL MEDIS</span>
              <h2 style={{ textTransform: "none", color: "#fff", fontSize: "3.2rem", fontWeight: 900, letterSpacing: "-0.03em", marginTop: 24, marginBottom: 20, textShadow: "none" }}>Portal Registrasi & Antrean Medis</h2>
              <p style={{ color: "#94a3b8", margin: "0 auto", maxWidth: 700, fontSize: "1.15rem", lineHeight: 1.7 }}>Pangkas waktu tunggu di klinik kami. Data rekam medis terenkripsi aman dan terintegrasi langsung dengan antrean poliklinik secara live.</p>
            </section>

            {/* Grid Content */}
            <div style={{ flex: 1, padding: "0 40px", maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 40 }}>
              {/* Form Input */}
              <div style={{ background: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(12px)", padding: 40, borderRadius: 24, border: "1px solid rgba(255,255,255,0.06)", boxShadow: `0 20px 40px -15px ${demo.glowColor}` }}>
                <h3 style={{ textTransform: "none", color: "#fff", fontSize: "1.5rem", fontWeight: 800, marginBottom: 28, textShadow: "none" }}>Form Registrasi Pasien Baru</h3>
                <form onSubmit={handleRegisterPatient} style={{ display: "grid", gap: 24 }}>
                  <div>
                    <label style={{ display: "block", marginBottom: 10, fontWeight: 700, fontSize: "0.85rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5 }}>Nama Lengkap Pasien</label>
                    <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} required placeholder="Misal: Budi Santoso" style={{ width: "100%", padding: 16, background: "rgba(255,255,255,0.03)", border: "2px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: "1rem", color: "#fff", outline: "none", transition: "all 0.2s" }} onFocus={(e) => e.currentTarget.style.borderColor = demo.themeColor} onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"} />
                  </div>
                  <div>
                    <label style={{ display: "block", marginBottom: 10, fontWeight: 700, fontSize: "0.85rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5 }}>Poli & Dokter Spesialis</label>
                    <select value={patientDoctor} onChange={(e) => setPatientDoctor(e.target.value)} style={{ width: "100%", padding: 16, background: "#0c1a16", border: "2px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: "1rem", color: "#fff", outline: "none", cursor: "pointer" }}>
                      <option value="Dr. Adrian (Sp. Bedah)">Dr. Adrian (Sp. Bedah) - Bedah Utama</option>
                      <option value="Dr. Clara (Sp. Anak)">Dr. Clara (Sp. Anak) - Poli Anak & Tumbuh Kembang</option>
                      <option value="Dr. Hendra (Sp. Jantung)">Dr. Hendra (Sp. Jantung) - Jantung Koroner</option>
                    </select>
                  </div>
                  <button type="submit" style={{ background: demo.themeColor, color: "#fff", padding: "18px", border: "none", borderRadius: 12, fontWeight: 800, fontSize: "1rem", cursor: "pointer", boxShadow: `0 10px 20px -5px ${demo.glowColor}`, transition: "transform 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>Daftarkan ke Sistem Antrean</button>
                </form>
              </div>

              {/* Live Status */}
              <div style={{ background: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(12px)", padding: 40, borderRadius: 24, border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
                  <h3 style={{ textTransform: "none", color: "#fff", fontSize: "1.5rem", fontWeight: 800, textShadow: "none", margin: 0 }}>Antrean Real-time</h3>
                  <span style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(16, 185, 129, 0.15)", color: demo.accentColor, padding: "6px 12px", borderRadius: 9999, fontSize: "0.8rem", fontWeight: 800, border: `1px solid ${demo.themeColor}` }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: demo.themeColor, display: "inline-block", animation: "pulse 1.5s infinite" }} />
                    LIVE ANTRIAN
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
                  {patientsList.map((p) => (
                    <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 22, background: "rgba(255,255,255,0.02)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.04)", borderLeft: `6px solid ${demo.themeColor}` }}>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "#fff" }}>{p.name}</div>
                        <div style={{ fontSize: "0.85rem", color: "#94a3b8", marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                          {p.doctor}
                        </div>
                      </div>
                      <span style={{ background: `linear-gradient(135deg, ${demo.themeColor} 0%, #059669 100%)`, color: "#fff", padding: "8px 18px", borderRadius: 9999, fontSize: "0.9rem", fontWeight: 900 }}>{p.id}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "pharmacy":
        return (
          <div style={{ background: demo.gradientBg, color: "#e2e8f0", minHeight: "100vh", display: "flex", flexDirection: "column", paddingBottom: 60 }}>
            {/* Header Apotek */}
            <header style={{ background: "rgba(10, 31, 38, 0.8)", backdropFilter: "blur(16px)", padding: "22px 40px", borderBottom: `1px solid ${demo.glowColor}`, display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={demo.themeColor} strokeWidth="2.5">
                  <path d="M4.5 10.5h15M12 3v15" />
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                </svg>
                <span style={{ fontSize: "1.4rem", fontWeight: 950, color: "#fff" }}>APOTEK SEHAT DIGITAL</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(6, 182, 212, 0.15)", color: demo.accentColor, padding: "10px 22px", borderRadius: 9999, fontWeight: 800, fontSize: "0.9rem", border: `1px solid ${demo.themeColor}` }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                Keranjang: {cartItems.reduce((acc, c) => acc + c.qty, 0)} Item
              </div>
            </header>

            <section style={{ padding: "60px 40px 40px", textAlign: "center" }}>
              <h2 style={{ textTransform: "none", color: "#fff", fontSize: "2.8rem", fontWeight: 900, marginBottom: 16, textShadow: "none" }}>Etalase Multivitamin & Obat Resmi</h2>
              <p style={{ color: "#94a3b8", fontSize: "1.1rem" }}>Pesan multivitamin harian Anda secara virtual. Masukkan kode <span style={{ color: demo.accentColor, fontWeight: 800 }}>SEHAT10</span> untuk simulasi potongan harga 10%.</p>
            </section>

            {/* Katalog & Checkout */}
            <div style={{ flex: 1, padding: "0 40px", maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 380px", gap: 40 }}>
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
                  {[
                    { name: "Paracetamol 500mg", price: 12000, desc: "Pereda demam & pereda rasa sakit kepala berlebih.", category: "Obat Bebas" },
                    { name: "Amoxicillin 500mg", price: 34000, desc: "Antibiotik spektrum luas wajib resep dokter.", category: "Resep Dokter" },
                    { name: "Multivitamin Active C", price: 25000, desc: "Daya tahan tubuh ekstra anti oksidan harian.", category: "Suplemen" }
                  ].map((med) => (
                    <div key={med.name} style={{ background: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(12px)", padding: 28, borderRadius: 20, border: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <span style={{ display: "inline-block", background: med.category === "Resep Dokter" ? "rgba(239, 68, 68, 0.15)" : "rgba(6, 182, 212, 0.15)", color: med.category === "Resep Dokter" ? "#f87171" : demo.accentColor, padding: "6px 14px", borderRadius: 8, fontSize: "0.75rem", fontWeight: 800, marginBottom: 16 }}>{med.category}</span>
                        <div style={{ fontWeight: 900, fontSize: "1.2rem", color: "#fff" }}>{med.name}</div>
                        <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: "12px 0 24px", lineHeight: 1.6 }}>{med.desc}</p>
                      </div>
                      <div>
                        <div style={{ fontWeight: 900, color: demo.accentColor, fontSize: "1.35rem", marginBottom: 16 }}>Rp {med.price.toLocaleString("id-ID")}</div>
                        <button
                          onClick={() => {
                            const exist = cartItems.find((c) => c.name === med.name);
                            if (exist) {
                              setCartItems(cartItems.map((c) => c.name === med.name ? { ...c, qty: c.qty + 1 } : c));
                            } else {
                              setCartItems([...cartItems, { name: med.name, qty: 1, price: med.price }]);
                            }
                          }}
                          style={{ width: "100%", padding: "14px", background: demo.themeColor, border: "none", color: "#fff", borderRadius: 10, fontWeight: 800, cursor: "pointer", transition: "all 0.2s" }}
                        >
                          Tambah Keranjang
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kasir Register */}
              <div style={{ background: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(12px)", padding: 32, borderRadius: 24, border: "1px solid rgba(255,255,255,0.06)", alignSelf: "start" }}>
                <h3 style={{ textTransform: "none", color: "#fff", fontSize: "1.4rem", fontWeight: 900, marginBottom: 24, textShadow: "none" }}>Virtual Checkout POS</h3>
                {cartItems.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "40px 0", color: "#64748b" }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: "0 auto 16px" }}>
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 14s1.5-2 4-2 4 2 4 2M9 9h.01M15 9h.01" />
                    </svg>
                    <p style={{ fontSize: "0.9rem", margin: 0 }}>Keranjang belanja Anda kosong</p>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {cartItems.map((item) => (
                        <div key={item.name} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem", color: "#cbd5e1" }}>
                          <span>{item.name} <span style={{ color: demo.accentColor }}>x{item.qty}</span></span>
                          <span style={{ fontWeight: 800, color: "#fff" }}>Rp {(item.price * item.qty).toLocaleString("id-ID")}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Kode Promo Simulator */}
                    <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                      <input type="text" placeholder="Masukkan Kode Promo" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} style={{ flex: 1, padding: "10px 14px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff", fontSize: "0.85rem", outline: "none" }} />
                      <button onClick={handleApplyPromo} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", padding: "0 16px", borderRadius: 8, fontSize: "0.85rem", cursor: "pointer", fontWeight: 700 }}>Pasang</button>
                    </div>

                    {appliedPromo && (
                      <div style={{ fontSize: "0.85rem", color: demo.accentColor, fontWeight: 700 }}>Promo Aktif: {appliedPromo}</div>
                    )}

                    <div style={{ borderTop: "2px dashed rgba(255,255,255,0.1)", paddingTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                      {discount > 0 && (
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem", color: "#94a3b8" }}>
                          <span>Diskon Promo:</span>
                          <span>-Rp {(cartItems.reduce((acc, c) => acc + (c.price * c.qty), 0) * (discount / 100)).toLocaleString("id-ID")}</span>
                        </div>
                      )}
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.2rem", fontWeight: 900, color: "#fff" }}>
                        <span>Total Tagihan:</span>
                        <span style={{ color: demo.accentColor }}>Rp {(cartItems.reduce((acc, c) => acc + (c.price * c.qty), 0) * (1 - discount / 100)).toLocaleString("id-ID")}</span>
                      </div>
                    </div>
                    <button onClick={() => { setCartItems([]); setAppliedPromo(""); setDiscount(0); setPromoCode(""); alert("Simulasi transaksi sukses! Terima kasih."); }} style={{ width: "100%", padding: 16, background: demo.themeColor, color: "#fff", border: "none", borderRadius: 12, fontWeight: 800, cursor: "pointer", transition: "all 0.2s", boxShadow: `0 10px 20px -5px ${demo.glowColor}` }}>Bayar & Cetak Struk Virtual</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "corporate":
        return (
          <div style={{ background: demo.gradientBg, color: "#e2e8f0", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            {/* Header Corporate Ultra-Premium */}
            <header style={{ background: "rgba(9, 10, 31, 0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#fff", padding: "24px 60px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${demo.themeColor} 0%, ${demo.accentColor} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "1.1rem" }}>S</div>
                <span style={{ fontSize: "1.4rem", fontWeight: 950, letterSpacing: "-0.04em" }}>SIVILIZE GLOBAL</span>
              </div>
              <nav style={{ display: "flex", gap: 32, fontSize: "0.85rem", fontWeight: 800, letterSpacing: 1, textTransform: "uppercase" }}>
                <a href="#about" style={{ color: "#94a3b8" }}>Profil Klien</a>
                <a href="#solutions" style={{ color: "#94a3b8" }}>Solusi Sistem</a>
                <a href="#form-penawaran" style={{ color: demo.accentColor }}>Ajukan Hubungan Kemitraan</a>
              </nav>
            </header>

            {/* Corporate Banner Hero */}
            <div style={{ padding: "140px 40px 100px", textAlign: "center", position: "relative", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: `radial-gradient(circle at center, ${demo.glowColor} 0%, transparent 60%)`, pointerEvents: "none" }} />
              <h1 style={{ textTransform: "none", fontSize: "3.8rem", fontWeight: 950, letterSpacing: "-0.04em", marginBottom: 24, lineHeight: 1.1, color: "#fff" }}>Arsitektur Sistem Skala Enterprise</h1>
              <p style={{ color: "#94a3b8", fontSize: "1.3rem", margin: "0 auto 40px", maxWidth: 740, lineHeight: 1.7 }}>Kami membangun infrastruktur perangkat lunak dengan performa tinggi, keamanan berstandar militer, dan fleksibilitas cloud untuk pertumbuhan bisnis Anda.</p>
              <a href="#form-penawaran" style={{ display: "inline-block", padding: "18px 42px", background: `linear-gradient(135deg, ${demo.themeColor} 0%, #4338ca 100%)`, color: "#fff", border: "none", fontWeight: 800, textDecoration: "none", borderRadius: 12, cursor: "pointer", boxShadow: `0 10px 30px -5px ${demo.glowColor}` }}>Mulai Konsultasi Kemitraan</a>
            </div>

            {/* Lead generation form */}
            <div id="form-penawaran" style={{ padding: "100px 40px", maxWidth: 800, margin: "0 auto", width: "100%" }}>
              <div style={{ background: "rgba(255,255,255,0.02)", backdropFilter: "blur(16px)", padding: 48, borderRadius: 28, border: "1px solid rgba(255,255,255,0.06)", boxShadow: `0 20px 50px -10px ${demo.glowColor}` }}>
                <h3 style={{ textTransform: "none", color: "#fff", fontSize: "1.8rem", fontWeight: 900, marginBottom: 12, textAlign: "center", textShadow: "none" }}>Ajukan Kerjasama & Proposal Proyek</h3>
                <p style={{ color: "#94a3b8", fontSize: "1rem", textAlign: "center", marginBottom: 36 }}>Konsultasikan rancangan digitalisasi korporasi Anda bersama arsitek solusi senior kami secara instan.</p>
                <form onSubmit={handleSendProposal} style={{ display: "grid", gap: 24 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                    <div>
                      <label style={{ display: "block", marginBottom: 8, fontSize: "0.85rem", color: "#94a3b8", fontWeight: 700 }}>Nama Perusahaan</label>
                      <input type="text" placeholder="Misal: PT Global Tekno" required value={corporateName} onChange={(e) => setCorporateName(e.target.value)} style={{ width: "100%", padding: 14, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, fontSize: "0.95rem", color: "#fff", outline: "none" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: 8, fontSize: "0.85rem", color: "#94a3b8", fontWeight: 700 }}>Email Resmi</label>
                      <input type="email" placeholder="kantor@perusahaan.com" required value={corporateEmail} onChange={(e) => setCorporateEmail(e.target.value)} style={{ width: "100%", padding: 14, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, fontSize: "0.95rem", color: "#fff", outline: "none" }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", marginBottom: 8, fontSize: "0.85rem", color: "#94a3b8", fontWeight: 700 }}>Rencana Anggaran & Spesifikasi Kebutuhan Proyek</label>
                    <textarea placeholder="Jelaskan kebutuhan integrasi sistem, platform E-Commerce, CRM, atau kustomisasi ERP..." rows={5} required value={corporateDesc} onChange={(e) => setCorporateDesc(e.target.value)} style={{ width: "100%", padding: 14, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, fontSize: "0.95rem", color: "#fff", outline: "none", resize: "none" }} />
                  </div>
                  <button type="submit" disabled={isProposalSent} style={{ padding: 18, background: demo.themeColor, color: "#fff", border: "none", borderRadius: 12, fontWeight: 800, fontSize: "1rem", cursor: "pointer", transition: "all 0.2s", opacity: isProposalSent ? 0.7 : 1 }}>
                    {isProposalSent ? "Mengirimkan Proposal..." : "Ajukan Dokumen Kemitraan"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        );

      case "creative":
        return (
          <div style={{ background: demo.gradientBg, color: "#f3f4f6", minHeight: "100vh", display: "flex", flexDirection: "column", paddingBottom: 60 }}>
            {/* Header Toko Souvenir Warm */}
            <header style={{ background: "rgba(24, 17, 5, 0.95)", borderBottom: `1px solid rgba(245, 158, 11, 0.15)`, padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={demo.themeColor} strokeWidth="2.5">
                  <path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7c0-2-2-4-4-4S4 5 4 7M12 7c0-2 2-4 4-4s4 2 4 4" />
                </svg>
                <span style={{ fontSize: "1.4rem", fontWeight: 900, color: "#fff", letterSpacing: "0.5px" }}>KRIYA NUSA ART</span>
              </div>
              <span style={{ fontWeight: 800, fontSize: "0.9rem", border: `2px solid ${demo.themeColor}`, color: demo.accentColor, padding: "6px 18px", borderRadius: 30 }}>Katalog Premium Nusantara</span>
            </header>

            {/* Showcase Souvenir */}
            <div style={{ flex: 1, padding: "60px 40px 0", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
              <h2 style={{ textTransform: "none", color: "#fff", fontSize: "2.6rem", fontWeight: 900, marginBottom: 12, textAlign: "center", textShadow: "none" }}>Etalase Kerajinan & Kriya Hias Seni</h2>
              <p style={{ color: "#d97706", textAlign: "center", marginBottom: 48, fontSize: "1.1rem", fontWeight: 700 }}>Eksplorasi karya tangan asli Nusantara yang berdaya tahan tinggi, ramah lingkungan, dan otentik.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 30 }}>
                {[
                  { name: "Vas Keramik Tanah Liat", price: 120000, desc: "Vas bunga etnik hasil kerajinan tangan dari daerah Kasongan Jogja.", category: "Tanah Liat" },
                  { name: "Piring Kayu Jati Ukir", price: 95000, desc: "Piring saji hias dengan motif ukiran Jepara kayu jati pilihan.", category: "Kayu Ukir" },
                  { name: "Dompet Kulit Sapi Asli", price: 245000, desc: "Dompet kartu eksklusif bermaterial kulit premium berkualitas ekspor.", category: "Aksesoris Kulit" }
                ].map((item) => (
                  <div key={item.name} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(245, 158, 11, 0.1)", borderRadius: 24, padding: 30, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <span style={{ display: "inline-block", background: "rgba(245, 158, 11, 0.1)", color: demo.accentColor, padding: "6px 12px", borderRadius: 8, fontSize: "0.75rem", fontWeight: 800, marginBottom: 18 }}>{item.category}</span>
                      <div style={{ fontWeight: 900, fontSize: "1.3rem", color: "#fff", marginBottom: 10 }}>{item.name}</div>
                      <p style={{ fontSize: "0.9rem", color: "#94a3b8", lineHeight: 1.6, margin: "0 0 24px" }}>{item.desc}</p>
                    </div>
                    <div>
                      <div style={{ color: demo.accentColor, fontWeight: 900, fontSize: "1.4rem", marginBottom: 20 }}>Rp {item.price.toLocaleString("id-ID")}</div>
                      <button
                        onClick={() => window.open(`https://wa.me/6281338219957?text=Halo%20Kriya%20Nusa,%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(item.name)}%20seharga%20Rp%20${item.price.toLocaleString("id-ID")}`, "_blank")}
                        style={{ padding: "14px 24px", width: "100%", background: demo.themeColor, border: "none", color: "#fff", fontWeight: 800, borderRadius: 10, cursor: "pointer", transition: "all 0.2s" }}
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
          <div style={{ background: demo.gradientBg, color: "#e2e8f0", minHeight: "100vh", display: "flex", flexDirection: "column", paddingBottom: 60 }}>
            <header style={{ background: "rgba(14, 9, 33, 0.8)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${demo.glowColor}`, padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={demo.themeColor} strokeWidth="2.5">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5v-15z" />
                </svg>
                <span style={{ fontSize: "1.35rem", fontWeight: 900, color: "#fff" }}>E-LIBRARY ACADEMIA</span>
              </div>
              <span style={{ fontSize: "0.85rem", background: "rgba(139, 92, 246, 0.15)", border: `1px solid ${demo.themeColor}`, color: demo.accentColor, padding: "6px 16px", borderRadius: 30, fontWeight: 700 }}>Portal Perpustakaan Digital</span>
            </header>

            <section style={{ padding: "60px 40px 40px", textAlign: "center" }}>
              <h2 style={{ textTransform: "none", color: "#fff", fontSize: "2.8rem", fontWeight: 900, marginBottom: 16, textShadow: "none" }}>Log Pengajuan Pinjaman Buku</h2>
              <p style={{ color: "#94a3b8", fontSize: "1.1rem" }}>Masukkan judul buku yang ingin diajukan secara fiktif untuk simulasi sistem pencatatan peminjaman.</p>
            </section>

            <div style={{ flex: 1, padding: "0 40px", maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 40 }}>
              {/* Form pinjam buku */}
              <div style={{ background: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(12px)", padding: 40, borderRadius: 24, border: "1px solid rgba(255,255,255,0.06)", height: "fit-content" }}>
                <h3 style={{ textTransform: "none", color: "#fff", fontSize: "1.4rem", fontWeight: 800, marginBottom: 24, textShadow: "none" }}>Ajukan Buku Baru</h3>
                <form onSubmit={handleBorrowBook} style={{ display: "grid", gap: 20 }}>
                  <div>
                    <label style={{ display: "block", marginBottom: 8, fontWeight: 700, fontSize: "0.85rem", color: "#94a3b8" }}>JUDUL BUKU UTAMA</label>
                    <input type="text" value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} required placeholder="Contoh: Logika Algoritma & Dasar Pemrograman" style={{ width: "100%", padding: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, fontSize: "1rem", color: "#fff", outline: "none" }} />
                  </div>
                  <button type="submit" style={{ padding: 16, background: demo.themeColor, color: "#fff", border: "none", borderRadius: 10, fontWeight: 800, fontSize: "1rem", cursor: "pointer", transition: "all 0.2s" }}>Masukkan Data Pinjaman</button>
                </form>
              </div>

              {/* Log list */}
              <div style={{ background: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(12px)", padding: 40, borderRadius: 24, border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                  <input type="text" placeholder="Cari buku yang dipinjam..." value={bookSearchQuery} onChange={(e) => setBookSearchQuery(e.target.value)} style={{ flex: 1, padding: "10px 14px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff", fontSize: "0.85rem", outline: "none" }} />
                </div>
                <h3 style={{ textTransform: "none", color: "#fff", fontSize: "1.4rem", fontWeight: 800, marginBottom: 20, textShadow: "none" }}>Log Peminjaman Aktif</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
                  {borrowedBooks
                    .filter((b) => b.title.toLowerCase().includes(bookSearchQuery.toLowerCase()))
                    .map((book, idx) => (
                      <div key={idx} style={{ padding: 20, background: "rgba(255,255,255,0.02)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.04)", borderLeft: `6px solid ${demo.themeColor}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <div style={{ fontWeight: 900, color: "#fff", fontSize: "1.1rem" }}>{book.title}</div>
                          <div style={{ fontSize: "0.85rem", color: "#94a3b8", marginTop: 4 }}>Peminjam: {book.borrower}</div>
                        </div>
                        <span style={{ fontSize: "0.8rem", color: demo.accentColor, fontWeight: 800, background: "rgba(139, 92, 246, 0.15)", padding: "6px 14px", borderRadius: 8, border: `1px solid rgba(139, 92, 246, 0.3)` }}>{book.date}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "travel":
        return (
          <div style={{ background: demo.gradientBg, color: "#e2e8f0", minHeight: "100vh", display: "flex", flexDirection: "column", paddingBottom: 60 }}>
            <header style={{ background: "rgba(3, 20, 34, 0.8)", backdropFilter: "blur(16px)", borderBottom: `1px solid rgba(14, 165, 233, 0.2)`, padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={demo.themeColor} strokeWidth="2.5">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
                <span style={{ fontSize: "1.4rem", fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" }}>SIVILIZE TOURS</span>
              </div>
              <button onClick={() => window.open("https://wa.me/6281338219957", "_blank")} style={{ padding: "10px 20px", background: demo.themeColor, color: "#fff", border: "none", borderRadius: 30, fontWeight: 800, fontSize: "0.85rem", cursor: "pointer", boxShadow: `0 8px 20px -5px ${demo.glowColor}` }}>Hubungi Agen Wisata</button>
            </header>

            <div style={{ flex: 1, padding: "60px 40px 0", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
              <h2 style={{ textTransform: "none", color: "#fff", fontSize: "2.6rem", fontWeight: 950, letterSpacing: "-0.03em", marginBottom: 8, textAlign: "center", textShadow: "none" }}>Pilihan Paket Perjalanan Eksklusif</h2>
              <p style={{ color: demo.accentColor, textAlign: "center", marginBottom: 48, fontSize: "1.1rem", fontWeight: 700 }}>Jelajahi keindahan Indonesia dengan layanan reservasi akomodasi bintang lima.</p>

              <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 40 }}>
                {/* Trip Cards Grid */}
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  {[
                    { name: "Trip Nusa Penida, Bali", price: 1850000, desc: "3 Hari 2 Malam, Transport AC, Tiket Wisata & Resort Pantai.", tag: "Favorit Wisatawan" },
                    { name: "Explore Rinjani, Lombok", price: 2400000, desc: "4 Hari 3 Malam, Porter Berpengalaman, Perlengkapan Kemah Mewah.", tag: "Petualangan Alam" },
                    { name: "Eksotisme Raja Ampat, Papua", price: 8900000, desc: "5 Hari 4 Malam, Liveaboard Yacht VIP Trip & Peralatan Snorkeling Premium.", tag: "Luxury Escape" }
                  ].map((trip) => (
                    <div key={trip.name} style={{ background: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(12px)", padding: 30, borderRadius: 24, border: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ maxWidth: "70%" }}>
                        <span style={{ display: "inline-block", background: "rgba(14, 165, 233, 0.15)", color: demo.accentColor, padding: "6px 14px", borderRadius: 8, fontSize: "0.75rem", fontWeight: 800, marginBottom: 12 }}>{trip.tag}</span>
                        <div style={{ fontWeight: 900, fontSize: "1.35rem", color: "#fff", marginBottom: 6 }}>{trip.name}</div>
                        <p style={{ fontSize: "0.9rem", color: "#94a3b8", margin: 0, lineHeight: 1.5 }}>{trip.desc}</p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontWeight: 900, color: "#fff", fontSize: "1.3rem", marginBottom: 14 }}>Rp {trip.price.toLocaleString("id-ID")}</div>
                        <button
                          onClick={() => { setTravelDest(trip.price); alert(`Paket terpilih: ${trip.name}. Estimasi harga terupdate di kalkulator.`); }}
                          style={{ padding: "10px 20px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", borderRadius: 8, fontWeight: 800, cursor: "pointer" }}
                        >
                          Pilih Paket
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Travel Calculator */}
                <div style={{ background: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(12px)", padding: 36, borderRadius: 24, border: "1px solid rgba(255,255,255,0.06)", alignSelf: "start" }}>
                  <h3 style={{ textTransform: "none", color: "#fff", fontSize: "1.4rem", fontWeight: 900, marginBottom: 24, textShadow: "none" }}>Estimator Kustom Tour</h3>
                  <div style={{ display: "grid", gap: 20 }}>
                    <div>
                      <label style={{ display: "block", marginBottom: 8, fontSize: "0.85rem", color: "#94a3b8", fontWeight: 700 }}>Destinasi & Biaya Dasar</label>
                      <select value={travelDest} onChange={(e) => setTravelDest(Number(e.target.value))} style={{ width: "100%", padding: 14, background: "#031422", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#fff" }}>
                        <option value={1850000}>Bali Trip (Rp 1.850.000 / pax)</option>
                        <option value={2400000}>Lombok Trip (Rp 2.400.000 / pax)</option>
                        <option value={8900000}>Raja Ampat Trip (Rp 8.900.000 / pax)</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: 8, fontSize: "0.85rem", color: "#94a3b8", fontWeight: 700 }}>Jumlah Peserta (Pax): {travelPax} Orang</label>
                      <input type="range" min={1} max={10} value={travelPax} onChange={(e) => setTravelPax(Number(e.target.value))} style={{ width: "100%", accentColor: demo.themeColor }} />
                    </div>
                    <div style={{ borderTop: "2px dashed rgba(255,255,255,0.1)", paddingTop: 20, display: "flex", justifyContent: "space-between", fontSize: "1.2rem", fontWeight: 900 }}>
                      <span>Total Estimasi:</span>
                      <span style={{ color: demo.accentColor }}>Rp {(travelDest * travelPax).toLocaleString("id-ID")}</span>
                    </div>
                    <button onClick={() => window.open(`https://wa.me/6281338219957?text=Halo%20Sivilize%20Tours,%20saya%20ingin%20booking%20tour%20pax%20jumlah%20${travelPax}%20orang.`, "_blank")} style={{ width: "100%", padding: 16, background: demo.themeColor, color: "#fff", border: "none", borderRadius: 12, fontWeight: 800, cursor: "pointer", boxShadow: `0 8px 20px -5px ${demo.glowColor}` }}>Daftar & Pesan via WA</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "cafe":
        return (
          <div style={{ background: demo.gradientBg, color: "#e2e8f0", minHeight: "100vh", display: "flex", flexDirection: "column", paddingBottom: 60 }}>
            <header style={{ background: "rgba(26, 15, 8, 0.95)", borderBottom: `1px solid rgba(249, 115, 22, 0.15)`, padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
              <span style={{ fontSize: "1.4rem", fontWeight: 900, letterSpacing: "2px", color: "#fff" }}>☕ SENJA BISTRO & CAFE</span>
              <span style={{ fontSize: "0.85rem", border: `1px solid ${demo.themeColor}`, color: demo.accentColor, padding: "6px 16px", borderRadius: 30, fontWeight: 800 }}>Buka: 10:00 - 22:00</span>
            </header>

            <div style={{ flex: 1, padding: "60px 40px 0", maxWidth: 1000, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 40 }}>
              {/* Menu Digital */}
              <div>
                <h2 style={{ textTransform: "none", color: "#fff", fontSize: "2.2rem", fontWeight: 900, marginBottom: 8, textShadow: "none" }}>Daftar Menu Pilihan</h2>
                <p style={{ color: "#f97316", marginBottom: 30, fontSize: "0.95rem", fontWeight: 700 }}>Menu sajian istimewa dari racikan biji kopi Nusantara terpilih.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    { name: "Es Kopi Susu Aren", price: 22000, desc: "Espresso premium dengan susu murni & sirup aren legit khas Jawa." },
                    { name: "Almond Butter Croissant", price: 26000, desc: "Croissant renyah berlapis dengan taburan kacang almond panggang gurih." },
                    { name: "Spaghetti Aglio Olio Tuna", price: 38000, desc: "Pasta al dente dengan tumisan bawang putih wangi, cabai kering, dan tuna." }
                  ].map((item) => (
                    <div key={item.name} style={{ background: "rgba(255,255,255,0.02)", padding: 22, borderRadius: 16, display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid rgba(255,255,255,0.04)" }}>
                      <div style={{ maxWidth: "75%" }}>
                        <div style={{ fontWeight: 900, fontSize: "1.15rem", color: "#fff" }}>{item.name}</div>
                        <p style={{ margin: "6px 0 0", fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.5 }}>{item.desc}</p>
                      </div>
                      <span style={{ color: demo.accentColor, fontWeight: 900, fontSize: "1.2rem", whiteSpace: "nowrap" }}>Rp {item.price.toLocaleString("id-ID")}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Table Booking */}
              <div style={{ background: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(12px)", padding: 36, borderRadius: 24, border: "1px solid rgba(255,255,255,0.06)", alignSelf: "start" }}>
                <h3 style={{ textTransform: "none", color: "#fff", fontSize: "1.4rem", fontWeight: 900, marginBottom: 24, textShadow: "none" }}>Reservasi Meja Interaktif</h3>
                <div style={{ display: "grid", gap: 20 }}>
                  <div>
                    <label style={{ display: "block", marginBottom: 8, fontSize: "0.85rem", color: "#94a3b8", fontWeight: 700 }}>Pilih Meja Kunjungan</label>
                    <select value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)} style={{ width: "100%", padding: 14, background: "#1a0f08", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#fff" }}>
                      {["Meja 01", "Meja 02", "Meja 03", "Meja 04", "Meja 05", "Meja 06", "Meja 07", "Meja 08"].map((m) => (
                        <option key={m} value={m}>{m} {bookedTables.includes(m) ? "(Sudah Dipesan)" : "(Tersedia)"}</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10, margin: "10px 0" }}>
                    {["Meja 01", "Meja 02", "Meja 03", "Meja 04", "Meja 05", "Meja 06", "Meja 07", "Meja 08"].map((m) => {
                      const isBooked = bookedTables.includes(m);
                      return (
                        <span key={m} style={{ padding: "8px 14px", borderRadius: 8, fontSize: "0.8rem", fontWeight: 800, background: isBooked ? "rgba(239, 68, 68, 0.15)" : "rgba(16, 185, 129, 0.15)", color: isBooked ? "#f87171" : "#34d399", border: `1px solid ${isBooked ? "rgba(239, 68, 68, 0.3)" : "rgba(16, 185, 129, 0.3)"}` }}>{m}</span>
                      );
                    })}
                  </div>
                  <button onClick={handleBookTable} style={{ width: "100%", padding: 16, background: demo.themeColor, color: "#fff", border: "none", borderRadius: 12, fontWeight: 800, cursor: "pointer", boxShadow: `0 8px 20px -5px ${demo.glowColor}` }}>Daftar Booking Meja</button>
                </div>
              </div>
            </div>
          </div>
        );

      case "property":
        return (
          <div style={{ background: demo.gradientBg, color: "#e2e8f0", minHeight: "100vh", display: "flex", flexDirection: "column", paddingBottom: 60 }}>
            <header style={{ background: "rgba(22, 10, 4, 0.95)", borderBottom: `1px solid rgba(234, 88, 12, 0.15)`, padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={demo.themeColor} strokeWidth="2.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
                </svg>
                <span style={{ fontSize: "1.4rem", fontWeight: 900, color: "#fff" }}>SIVILIZE PROPERTY</span>
              </div>
              <button onClick={() => window.open("https://wa.me/6281338219957", "_blank")} style={{ padding: "10px 20px", background: demo.themeColor, border: "none", color: "#fff", borderRadius: 30, fontWeight: 800, fontSize: "0.85rem", cursor: "pointer" }}>Hubungi Agen Kami</button>
            </header>

            <div style={{ flex: 1, padding: "60px 40px 0", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
              <h2 style={{ textTransform: "none", color: "#fff", fontSize: "2.6rem", fontWeight: 950, letterSpacing: "-0.03em", marginBottom: 8, textAlign: "center", textShadow: "none" }}>Koleksi Cluster & Hunian Premium</h2>
              <p style={{ color: demo.accentColor, textAlign: "center", marginBottom: 48, fontSize: "1.1rem", fontWeight: 700 }}>Temukan hunian eksklusif berteknologi tinggi dengan arsitektur modern tropis.</p>

              <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 40 }}>
                {/* Properti List */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
                  {[
                    { name: "Cluster Green Foresta", loc: "Bandung Utara", price: 780000000, details: "3 Kamar Tidur | 2 Kamar Mandi | Garasi 2 Mobil" },
                    { name: "Metropolitan Suite", loc: "Jakarta Selatan", price: 1400000000, details: "2 Kamar Utama | Gym & Kolam Renang Privat | Balkon Luas" }
                  ].map((item) => (
                    <div key={item.name} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 24, padding: 28, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontWeight: 900, fontSize: "1.3rem", color: "#fff", marginBottom: 8 }}>{item.name}</div>
                        <div style={{ fontSize: "0.85rem", color: demo.accentColor, fontWeight: 800, marginBottom: 12 }}>📍 {item.loc}</div>
                        <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: "0 0 20px", lineHeight: 1.5 }}>{item.details}</p>
                      </div>
                      <div>
                        <div style={{ color: "#fff", fontWeight: 900, fontSize: "1.35rem", marginBottom: 16 }}>Rp {item.price.toLocaleString("id-ID")}</div>
                        <button
                          onClick={() => { setPropertyPrice(item.price); alert(`Terpilih: ${item.name}. Harga disinkronkan ke kalkulator simulasi KPR.`); }}
                          style={{ width: "100%", padding: 12, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", borderRadius: 8, fontWeight: 800, cursor: "pointer" }}
                        >
                          Hitung KPR
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* KPR Calculator */}
                <div style={{ background: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(12px)", padding: 36, borderRadius: 24, border: "1px solid rgba(255,255,255,0.06)", alignSelf: "start" }}>
                  <h3 style={{ textTransform: "none", color: "#fff", fontSize: "1.4rem", fontWeight: 900, marginBottom: 24, textShadow: "none" }}>Kalkulator Simulasi KPR</h3>
                  <div style={{ display: "grid", gap: 20 }}>
                    <div>
                      <label style={{ display: "block", marginBottom: 8, fontSize: "0.85rem", color: "#94a3b8", fontWeight: 700 }}>Harga Properti (Rp)</label>
                      <input type="number" value={propertyPrice} onChange={(e) => setPropertyPrice(Number(e.target.value))} style={{ width: "100%", padding: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff", outline: "none" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: 8, fontSize: "0.85rem", color: "#94a3b8", fontWeight: 700 }}>Uang Muka / DP (%): {dpPercentage}%</label>
                      <input type="range" min={10} max={90} step={5} value={dpPercentage} onChange={(e) => setDpPercentage(Number(e.target.value))} style={{ width: "100%", accentColor: demo.themeColor }} />
                      <div style={{ fontSize: "0.85rem", color: demo.accentColor, marginTop: 4 }}>Senilai: Rp {(propertyPrice * (dpPercentage / 100)).toLocaleString("id-ID")}</div>
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: 8, fontSize: "0.85rem", color: "#94a3b8", fontWeight: 700 }}>Jangka Waktu Cicilan: {tenureYears} Tahun</label>
                      <input type="range" min={5} max={30} step={5} value={tenureYears} onChange={(e) => setTenureYears(Number(e.target.value))} style={{ width: "100%", accentColor: demo.themeColor }} />
                    </div>
                    <div style={{ borderTop: "2px dashed rgba(255,255,255,0.1)", paddingTop: 20, display: "flex", justifyContent: "space-between", fontSize: "1.2rem", fontWeight: 900 }}>
                      <span>Cicilan / Bulan:</span>
                      <span style={{ color: demo.accentColor }}>Rp {handleKPRCalculation().toLocaleString("id-ID")}</span>
                    </div>
                    <button onClick={() => alert("Simulasi pengajuan kredit terkirim ke tim sales properti.")} style={{ width: "100%", padding: 16, background: demo.themeColor, color: "#fff", border: "none", borderRadius: 12, fontWeight: 800, cursor: "pointer", boxShadow: `0 8px 20px -5px ${demo.glowColor}` }}>Ajukan Simulasi KPR</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "school":
        return (
          <div style={{ background: demo.gradientBg, color: "#e2e8f0", minHeight: "100vh", display: "flex", flexDirection: "column", paddingBottom: 60 }}>
            <header style={{ background: "rgba(4, 15, 33, 0.95)", borderBottom: `1px solid rgba(59, 130, 246, 0.2)`, padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={demo.themeColor} strokeWidth="2.5">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                </svg>
                <span style={{ fontSize: "1.3rem", fontWeight: 900, color: "#fff" }}>SMA SIVILIZE UTAMA</span>
              </div>
              <span style={{ fontSize: "0.85rem", background: "rgba(59, 130, 246, 0.15)", border: `1px solid ${demo.themeColor}`, color: demo.accentColor, padding: "6px 16px", borderRadius: 30, fontWeight: 700 }}>Portal E-Learning</span>
            </header>

            <div style={{ flex: 1, padding: "50px 40px 0", maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "280px 1fr", gap: 40 }}>
              {/* Sidebar Portal Belajar */}
              <div style={{ background: "rgba(255,255,255,0.02)", padding: 24, borderRadius: 20, border: "1px solid rgba(255,255,255,0.05)", height: "fit-content" }}>
                <div style={{ fontWeight: 900, color: demo.accentColor, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: 1, marginBottom: 20 }}>Mata Pelajaran</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: "0.9rem" }}>
                  <div style={{ padding: "12px 16px", background: "rgba(59, 130, 246, 0.15)", color: "#fff", borderRadius: 8, fontWeight: 800, borderLeft: `4px solid ${demo.themeColor}` }}>Matematika Peminatan</div>
                  <div style={{ padding: "12px 16px", color: "#94a3b8", borderRadius: 8, fontWeight: 600 }}>Fisika Kuantum</div>
                  <div style={{ padding: "12px 16px", color: "#94a3b8", borderRadius: 8, fontWeight: 600 }}>Biologi Sel Organik</div>
                </div>
              </div>

              {/* Central Panel Tugas */}
              <div style={{ background: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(12px)", padding: 40, borderRadius: 24, border: "1px solid rgba(255,255,255,0.06)" }}>
                <h3 style={{ textTransform: "none", color: "#fff", fontSize: "1.6rem", fontWeight: 900, marginBottom: 12, textShadow: "none" }}>Tugas Uji Rumus Trigonometri</h3>
                <p style={{ color: "#94a3b8", fontSize: "0.95rem", marginBottom: 30 }}>Kumpulkan jawaban Anda sebelum batas tenggat waktu berakhir malam ini.</p>
                
                <div style={{ padding: 24, background: "rgba(255,255,255,0.02)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
                  <div>
                    <div style={{ fontSize: "0.85rem", color: "#94a3b8", fontWeight: 700 }}>STATUS PENGUMPULAN</div>
                    <div style={{ fontWeight: 900, fontSize: "1.2rem", color: homeworkStatus.includes("Sudah") ? "#34d399" : "#f87171", marginTop: 4 }}>{homeworkStatus}</div>
                  </div>
                  {homeworkStatus === "Belum Kumpul" && (
                    <button
                      onClick={handleUploadTask}
                      disabled={isSubmittingTask}
                      style={{ padding: "12px 24px", background: demo.themeColor, color: "#fff", border: "none", borderRadius: 10, fontWeight: 800, cursor: "pointer" }}
                    >
                      {isSubmittingTask ? "Sedang Mengirim..." : "Upload File Tugas"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case "hotel":
        return (
          <div style={{ background: demo.gradientBg, color: "#e2e8f0", minHeight: "100vh", display: "flex", flexDirection: "column", paddingBottom: 60 }}>
            <header style={{ background: "rgba(21, 15, 5, 0.95)", borderBottom: `1px solid rgba(217, 119, 6, 0.15)`, padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={demo.themeColor} strokeWidth="2.5">
                  <path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M9 9h6M9 13h6" />
                </svg>
                <span style={{ fontSize: "1.4rem", fontWeight: 900, color: "#fff" }}>HORIZON RESORT</span>
              </div>
              <button onClick={() => window.open("https://wa.me/6281338219957", "_blank")} style={{ padding: "10px 20px", background: demo.themeColor, border: "none", color: "#fff", borderRadius: 30, fontWeight: 800, fontSize: "0.85rem", cursor: "pointer" }}>Reservasi Online</button>
            </header>

            <div style={{ flex: 1, padding: "60px 40px 0", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
              <h2 style={{ textTransform: "none", color: "#fff", fontSize: "2.6rem", fontWeight: 950, letterSpacing: "-0.03em", marginBottom: 8, textAlign: "center", textShadow: "none" }}>Kamar & Suite Mewah Bintang 5</h2>
              <p style={{ color: demo.accentColor, textAlign: "center", marginBottom: 48, fontSize: "1.1rem", fontWeight: 700 }}>Nikmati kenyamanan menginap yang tak tertandingi dengan pemandangan laut lepas.</p>

              <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 40 }}>
                {/* Rooms Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
                  {[
                    { name: "Executive Suite Ocean", price: 1450000, bed: "1 King Bed", desc: "Pemandangan laut biru lepas, gratis sarapan pagi prasmanan." },
                    { name: "Deluxe Family Suite", price: 2100000, bed: "2 Queen Bed", desc: "Akses kolam renang privat langsung dan ruang tamu luas." }
                  ].map((room) => (
                    <div key={room.name} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(217, 119, 6, 0.1)", borderRadius: 24, padding: 28, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <span style={{ display: "inline-block", background: "rgba(217, 119, 6, 0.15)", color: demo.accentColor, padding: "6px 14px", borderRadius: 8, fontSize: "0.75rem", fontWeight: 800, marginBottom: 16 }}>{room.bed}</span>
                        <div style={{ fontWeight: 900, fontSize: "1.25rem", color: "#fff", marginBottom: 10 }}>{room.name}</div>
                        <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: "0 0 20px", lineHeight: 1.5 }}>{room.desc}</p>
                      </div>
                      <div>
                        <div style={{ color: demo.accentColor, fontWeight: 900, fontSize: "1.35rem", marginBottom: 16 }}>Rp {room.price.toLocaleString("id-ID")} <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>/ Malam</span></div>
                        <button onClick={() => alert(`Simulasi reservasi ${room.name} berhasil.`)} style={{ width: "100%", padding: 12, background: demo.themeColor, border: "none", color: "#fff", borderRadius: 10, fontWeight: 800, cursor: "pointer" }}>Pesan Kamar</button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Date checker */}
                <div style={{ background: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(12px)", padding: 36, borderRadius: 24, border: "1px solid rgba(255,255,255,0.06)", alignSelf: "start" }}>
                  <h3 style={{ textTransform: "none", color: "#fff", fontSize: "1.4rem", fontWeight: 900, marginBottom: 24, textShadow: "none" }}>Cek Ketersediaan Kamar</h3>
                  <form onSubmit={handleCheckRoom} style={{ display: "grid", gap: 20 }}>
                    <div>
                      <label style={{ display: "block", marginBottom: 8, fontSize: "0.85rem", color: "#94a3b8", fontWeight: 700 }}>Tanggal Check-In</label>
                      <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} style={{ width: "100%", padding: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: 8, fontSize: "0.85rem", color: "#94a3b8", fontWeight: 700 }}>Tanggal Check-Out</label>
                      <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} style={{ width: "100%", padding: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff" }} />
                    </div>
                    <button type="submit" style={{ width: "100%", padding: 16, background: demo.themeColor, color: "#fff", border: "none", borderRadius: 12, fontWeight: 800, cursor: "pointer" }}>Cari Kamar Tersedia</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );

      case "workshop":
        return (
          <div style={{ background: demo.gradientBg, color: "#e2e8f0", minHeight: "100vh", display: "flex", flexDirection: "column", paddingBottom: 60 }}>
            <header style={{ background: "rgba(26, 6, 6, 0.95)", borderBottom: `1px solid rgba(239, 68, 68, 0.15)`, padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={demo.themeColor} strokeWidth="2.5">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
                <span style={{ fontSize: "1.4rem", fontWeight: 900, color: "#fff" }}>AUTOTECH WORKSHOP</span>
              </div>
              <button onClick={() => window.open("https://wa.me/6281338219957", "_blank")} style={{ padding: "10px 20px", background: demo.themeColor, border: "none", color: "#fff", borderRadius: 30, fontWeight: 800, fontSize: "0.85rem", cursor: "pointer" }}>Hubungi Service Advisor</button>
            </header>

            <div style={{ flex: 1, padding: "50px 40px 0", maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 40 }}>
              {/* Form registrasi antrean */}
              <div style={{ background: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(12px)", padding: 36, borderRadius: 24, border: "1px solid rgba(255,255,255,0.06)", height: "fit-content" }}>
                <h3 style={{ textTransform: "none", color: "#fff", fontSize: "1.4rem", fontWeight: 900, marginBottom: 24, textShadow: "none" }}>Daftarkan Antrean Servis</h3>
                <form onSubmit={handleAddWorkshopQueue} style={{ display: "grid", gap: 20 }}>
                  <div>
                    <label style={{ display: "block", marginBottom: 8, fontSize: "0.85rem", color: "#94a3b8", fontWeight: 700 }}>Nomor Plat Kendaraan</label>
                    <input type="text" value={carPlate} onChange={(e) => setCarPlate(e.target.value)} required placeholder="Misal: B 1234 CDG" style={{ width: "100%", padding: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff", outline: "none" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", marginBottom: 8, fontSize: "0.85rem", color: "#94a3b8", fontWeight: 700 }}>Jenis Servis</label>
                    <select value={serviceType} onChange={(e) => setServiceType(e.target.value)} style={{ width: "100%", padding: 12, background: "#1a0606", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff" }}>
                      <option value="Ganti Oli Mesin Berkala">Ganti Oli Mesin Berkala</option>
                      <option value="Tune Up & Kelistrikan">Tune Up & Kelistrikan</option>
                      <option value="Servis Sistem Pengereman">Servis Sistem Pengereman</option>
                    </select>
                  </div>
                  <button type="submit" style={{ width: "100%", padding: 16, background: demo.themeColor, color: "#fff", border: "none", borderRadius: 12, fontWeight: 800, cursor: "pointer" }}>Daftarkan Unit Servis</button>
                </form>
              </div>

              {/* Status Pengerjaan */}
              <div style={{ background: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(12px)", padding: 36, borderRadius: 24, border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column" }}>
                <h3 style={{ textTransform: "none", color: "#fff", fontSize: "1.4rem", fontWeight: 900, marginBottom: 24, textShadow: "none" }}>Monitoring Pengerjaan Unit Live</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {workshopQueue.map((item, idx) => (
                    <div key={idx} style={{ padding: 22, background: "rgba(255,255,255,0.02)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.04)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        <div style={{ fontWeight: 800, fontSize: "1.15rem", color: "#fff" }}>{item.plate}</div>
                        <span style={{ fontSize: "0.8rem", color: demo.accentColor, fontWeight: 800 }}>{item.service}</span>
                      </div>
                      <div style={{ width: "100%", height: 8, background: "rgba(255,255,255,0.05)", borderRadius: 9999, overflow: "hidden" }}>
                        <div style={{ width: `${item.progress}%`, height: "100%", background: demo.themeColor }} />
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "#94a3b8", marginTop: 8 }}>
                        <span>Progress Pengerjaan: {item.progress}%</span>
                        <span>{item.progress === 100 ? "Selesai" : "Sedang Dikerjakan"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "ecommerce":
        return (
          <div style={{ background: demo.gradientBg, color: "#e2e8f0", minHeight: "100vh", display: "flex", flexDirection: "column", paddingBottom: 60 }}>
            <header style={{ background: "rgba(25, 5, 16, 0.95)", borderBottom: `1px solid rgba(236, 72, 153, 0.15)`, padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={demo.themeColor} strokeWidth="2.5">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <span style={{ fontSize: "1.4rem", fontWeight: 950, color: "#fff" }}>SIVILIZE CYBER STORE</span>
              </div>
              <span style={{ fontWeight: 800, fontSize: "0.9rem", color: demo.accentColor }}>Gadget & Aksesoris Gamer</span>
            </header>

            <div style={{ flex: 1, padding: "50px 40px 0", maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 380px", gap: 40 }}>
              <div>
                <h3 style={{ textTransform: "none", color: "#fff", fontSize: "1.6rem", fontWeight: 900, marginBottom: 24, textShadow: "none" }}>Daftar Hardware Pilihan</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
                  {[
                    { name: "Mechanical Keyboard", price: 890000, desc: "Papan ketik mekanikal nirkabel responsif dengan RGB.", label: "Premium Gear" },
                    { name: "Gaming Mouse Wireless", price: 650000, desc: "Sensor presisi tinggi 16000 DPI baterai tahan lama.", label: "Terlaris" },
                    { name: "IPS Monitor 24 Inch", price: 1750000, desc: "Layar panel IPS warna tajam Full HD 75Hz bezel tipis.", label: "Best Value" }
                  ].map((p) => (
                    <div key={p.name} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 24, padding: 26, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <span style={{ display: "inline-block", background: "rgba(236, 72, 153, 0.15)", color: demo.accentColor, padding: "6px 12px", borderRadius: 8, fontSize: "0.75rem", fontWeight: 800, marginBottom: 16 }}>{p.label}</span>
                        <div style={{ fontWeight: 900, fontSize: "1.2rem", color: "#fff", marginBottom: 8 }}>{p.name}</div>
                        <p style={{ fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.5, margin: "0 0 20px" }}>{p.desc}</p>
                      </div>
                      <div>
                        <div style={{ color: "#fff", fontWeight: 900, fontSize: "1.3rem", marginBottom: 16 }}>Rp {p.price.toLocaleString("id-ID")}</div>
                        <button
                          onClick={() => {
                            const exist = cartItems.find((c) => c.name === p.name);
                            if (exist) {
                              setCartItems(cartItems.map((c) => c.name === p.name ? { ...c, qty: c.qty + 1 } : c));
                            } else {
                              setCartItems([...cartItems, { name: p.name, qty: 1, price: p.price }]);
                            }
                          }}
                          style={{ width: "100%", padding: "12px", background: demo.themeColor, border: "none", color: "#fff", fontWeight: 800, borderRadius: 10, cursor: "pointer", transition: "all 0.2s" }}
                        >
                          Beli Sekarang
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shopping cart summary */}
              <div style={{ background: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(12px)", padding: 32, borderRadius: 24, border: "1px solid rgba(255,255,255,0.06)", alignSelf: "start" }}>
                <h3 style={{ textTransform: "none", color: "#fff", fontSize: "1.4rem", fontWeight: 900, marginBottom: 24, textShadow: "none" }}>Daftar Keranjang Belanja</h3>
                {cartItems.length === 0 ? (
                  <p style={{ color: "#64748b", fontSize: "0.9rem", textAlign: "center", margin: "40px 0" }}>Keranjang masih kosong</p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {cartItems.map((item) => (
                      <div key={item.name} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem", color: "#cbd5e1" }}>
                        <span>{item.name} (x{item.qty})</span>
                        <span style={{ fontWeight: 800, color: "#fff" }}>Rp {(item.price * item.qty).toLocaleString("id-ID")}</span>
                      </div>
                    ))}
                    <div style={{ borderTop: "2px dashed rgba(255,255,255,0.1)", paddingTop: 20, display: "flex", justifyContent: "space-between", fontWeight: 900, fontSize: "1.15rem", color: "#fff" }}>
                      <span>Subtotal:</span>
                      <span style={{ color: demo.accentColor }}>Rp {cartItems.reduce((acc, c) => acc + (c.price * c.qty), 0).toLocaleString("id-ID")}</span>
                    </div>
                    <button onClick={() => { setCartItems([]); alert("Transaksi Checkout Berhasil!"); }} style={{ width: "100%", padding: 16, background: demo.themeColor, color: "#fff", border: "none", borderRadius: 12, fontWeight: 800, marginTop: 10, cursor: "pointer", transition: "all 0.2s" }}>Bayar Belanjaan</button>
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
      position: "relative",
      backgroundColor: "#020617"
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
            padding: "14px 24px",
            borderRadius: 9999,
            fontSize: "0.9rem",
            fontWeight: 700,
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
            cursor: "pointer",
            transition: "all 0.2s"
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
