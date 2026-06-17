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
