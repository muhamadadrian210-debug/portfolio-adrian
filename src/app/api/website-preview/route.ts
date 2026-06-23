import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { businessName, businessDesc, location, businessType, budget, customBudget } = body;

    if (!businessName || !businessDesc || !businessType || !budget) {
      return NextResponse.json({ error: "Kolom nama, deskripsi, jenis bisnis, dan budget wajib diisi." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    let conceptData;

    if (apiKey) {
      conceptData = await generateWithGemini(apiKey, {
        businessName,
        businessDesc,
        location: location || "Indonesia",
        businessType,
        budget,
        customBudget,
      });
    }

    // Fallback if no apiKey or Gemini generation failed/returned invalid data
    if (!conceptData) {
      conceptData = generateFallbackConcept({
        businessName,
        businessDesc,
        location: location || "Indonesia",
        businessType,
        budget,
        customBudget,
      });
    }

    return NextResponse.json(conceptData);
  } catch (error: any) {
    console.error("API error in website-preview:", error);
    return NextResponse.json({ error: "Gagal memproses analisis konsep website. Silakan coba lagi." }, { status: 500 });
  }
}

function formatBudgetText(budget: string, customBudget?: string) {
  if (budget === "custom" && customBudget) {
    return `Rp ${parseInt(customBudget).toLocaleString("id-ID")}`;
  }
  const numericBudget = parseInt(budget);
  if (isNaN(numericBudget)) return `Rp ${budget}`;
  return `Rp ${numericBudget.toLocaleString("id-ID")}`;
}

async function generateWithGemini(apiKey: string, params: any) {
  const { businessName, businessDesc, location, businessType, budget, customBudget } = params;
  const formattedBudget = formatBudgetText(budget, customBudget);

  const prompt = `
Anda adalah konsultan copywriter dan desainer web profesional khusus UMKM di Indonesia.
Tugas Anda adalah menyusun rencana konsep website yang realistis, natural (bukan gaya AI generik), dan meyakinkan untuk bisnis berikut:
- Nama Bisnis: ${businessName}
- Deskripsi: ${businessDesc}
- Lokasi: ${location}
- Kategori Bisnis: ${businessType}
- Target Budget Klien: ${formattedBudget}

Aturan Penting Pembuatan Konten:
1. Copywriting harus natural, manusiawi, hangat, dan spesifik untuk industri ini. Jangan pakai jargon kosong seperti "solusi terbaik", "kualitas tinggi", "teknologi mutakhir".
2. Sesuaikan gaya bahasa dan konten berdasarkan industri:
   - cafe: Fokus pada menu, jam buka, suasana tempat, CTA reservasi/order.
   - clinic: Bersih, profesional, jadwal dokter, daftar layanan kesehatan, kontak darurat.
   - barbershop: Maskulin, bold, daftar harga potong, galeri hasil, booking.
   - laundry: Sederhana, praktis, info harga per kilo, pickup-delivery, WhatsApp order.
   - workshop: Tangguh, mekanis, list layanan, suku cadang, booking antrean.
   - company: Elegan, profesional, keunggulan, tim/profil singkat, kontak resmi.
3. Kustomisasi berdasarkan budget:
   - Budget Rendah (< Rp 1.500.000): Sederhana 1 halaman, fitur dasar, timeline cepat (7 hari).
   - Budget Menengah (Rp 1.500.000 - Rp 4.000.000): Landing page premium, beberapa bagian, galeri, testimoni, timeline 10-14 hari.
   - Budget Tinggi (> Rp 4.000.000): Website lengkap multi-page/multi-section premium, CMS/katalog, sistem booking, integrasi penuh, timeline 3-5 minggu.

Berikan output dalam format JSON valid dengan schema berikut tanpa markdown block (\`\`\`json) atau teks pembuka/penutup lainnya:
{
  "businessType": "${businessType}",
  "websiteName": "${businessName}",
  "targetAudience": "audiens target spesifik",
  "designDirection": "arah desain visual dan mood",
  "colorPalette": {
    "primary": "warna utama (hex)",
    "secondary": "warna sekunder (hex)",
    "accent": "warna aksen (hex)",
    "background": "warna background bersih (hex)",
    "text": "warna text gelap/terang kontras (hex)"
  },
  "typographyStyle": "gaya font (e.g. Modern Minimalist, Warm Classic, Bold Tech, Clean Corporate)",
  "hero": {
    "headline": "headline spesifik yang memikat",
    "subheadline": "subheadline detail dan membumi",
    "cta": "label tombol cta utama"
  },
  "about": {
    "title": "judul bagian tentang kami",
    "body": "narasi singkat yang ramah dan spesifik tentang bisnis ini"
  },
  "sections": [
    {
      "type": "layout section (pilih dari: split-hero, centered-hero, image-placeholder, editorial, service-grid, horizontal-feature, testimonial-strip, stats, cta-block, contact-card)",
      "title": "judul section",
      "description": "deskripsi singkat section",
      "items": ["daftar poin atau fitur spesifik, minimal 3 item"]
    }
  ],
  "featuresIncluded": ["fitur yang didapat untuk budget ini"],
  "featuresExcluded": ["fitur yang belum didapat untuk budget ini, yang bisa di-upgrade jika budget ditambah"],
  "recommendedPackage": "nama paket yang direkomendasikan",
  "estimatedTimeline": "perkiraan waktu pengerjaan",
  "complexityLevel": "Rendah | Sedang | Tinggi",
  "budgetExplanation": "penjelasan logis mengapa budget ini cocok dan apa yang membedakannya dengan budget lain",
  "whatsappMessage": "pesan otomatis whatsapp untuk konsultasi"
}
`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      }),
    });

    if (!response.ok) {
      console.warn("Gemini API call failed:", response.statusText);
      return null;
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return null;

    return JSON.parse(text.trim());
  } catch (err) {
    console.warn("Failed to parse or generate with Gemini:", err);
    return null;
  }
}

function generateFallbackConcept(params: any) {
  const { businessName, businessDesc, location, businessType, budget, customBudget } = params;
  const formattedBudget = formatBudgetText(budget, customBudget);

  const numericBudget = budget === "custom" ? parseInt(customBudget || "0") : parseInt(budget);

  // Default color palettes based on business type
  let colorPalette = {
    primary: "#4f46e5",
    secondary: "#0ea5e9",
    accent: "#f59e0b",
    background: "#0b0f19",
    text: "#f8fafc",
  };

  let typographyStyle = "Modern Minimalist";
  let designDirection = "Desain modern, clean, dan responsif.";

  if (businessType === "cafe") {
    colorPalette = {
      primary: "#854d0e", // Warm brown/coffee
      secondary: "#ca8a04",
      accent: "#b45309",
      background: "#0f0d0a",
      text: "#fdf8f2",
    };
    typographyStyle = "Warm Serif & Clean Sans";
    designDirection = "Estetika cafe hangat, mengedepankan foto menu makanan dan minuman.";
  } else if (businessType === "clinic") {
    colorPalette = {
      primary: "#0d9488", // Clean teal
      secondary: "#0284c7",
      accent: "#0f766e",
      background: "#f8fafc",
      text: "#0f172a",
    };
    typographyStyle = "Clean Sans-Serif";
    designDirection = "Tampilan bersih, steril, terpercaya, dan profesional medis.";
  } else if (businessType === "barbershop") {
    colorPalette = {
      primary: "#1e293b", // Slate / Gold accent
      secondary: "#b45309",
      accent: "#ca8a04",
      background: "#080b11",
      text: "#f1f5f9",
    };
    typographyStyle = "Bold Editorial Mono";
    designDirection = "Gaya maskulin, retro-modern, kontras tinggi dan bold.";
  } else if (businessType === "laundry") {
    colorPalette = {
      primary: "#0284c7", // Sky blue
      secondary: "#38bdf8",
      accent: "#0ea5e9",
      background: "#f0fdfa",
      text: "#0f172a",
    };
    typographyStyle = "Rounded Friendly Sans";
    designDirection = "Nuansa segar, bersih, praktis dan ramah pelanggan.";
  } else if (businessType === "workshop") {
    colorPalette = {
      primary: "#ea580c", // Industrial orange
      secondary: "#475569",
      accent: "#f97316",
      background: "#0f172a",
      text: "#f8fafc",
    };
    typographyStyle = "Industrial Sans-Serif";
    designDirection = "Kesan kokoh, profesional, teknis dan dapat diandalkan.";
  } else if (businessType === "company") {
    colorPalette = {
      primary: "#1e3a8a", // Navy corporate
      secondary: "#0284c7",
      accent: "#3b82f6",
      background: "#020617",
      text: "#f8fafc",
    };
    typographyStyle = "Clean Corporate & Sans";
    designDirection = "Desain korporat premium, berorientasi bisnis dan reputasi tinggi.";
  }

  // Budget category logic
  let featuresIncluded: string[] = [];
  let featuresExcluded: string[] = [];
  let estimatedTimeline = "7-10 Hari Kerja";
  let recommendedPackage = "Paket Landing Page";
  let complexityLevel = "Rendah";
  let budgetExplanation = "";

  if (numericBudget < 1500000) {
    featuresIncluded = [
      "1 Halaman Utama (Landing Page) Responsif",
      "Integrasi Tombol WhatsApp untuk Pesanan",
      "Peta Lokasi Google Maps Terintegrasi",
      "Copywriting Dasar dari Informasi Usaha",
      "Hosting & Domain Standar (.com atau Subdomain)",
    ];
    featuresExcluded = [
      "Sistem Booking/Reservasi Online Otomatis",
      "Halaman Admin (CMS) untuk Edit Mandiri",
      "Halaman Produk Terpisah (Katalog Detail)",
      "Advanced SEO Optimization & Statistik Pengunjung",
    ];
    recommendedPackage = "Paket Landing Page Kilat";
    estimatedTimeline = "5-7 Hari Kerja";
    complexityLevel = "Rendah";
    budgetExplanation = "Budget ini sangat pas untuk usaha lokal yang baru memulai kehadiran digital. Kami merancang 1 halaman landing page taktis yang memuat informasi kontak penting, jam buka, dan peta lokasi yang ramah diakses dari HP.";
  } else if (numericBudget <= 4000000) {
    featuresIncluded = [
      "Multi-Section Landing Page Premium",
      "Galeri Produk/Galeri Foto Usaha (Grid Estetik)",
      "Testimoni & Review Pelanggan",
      "Formulir Kontak Kustom atau Formulir Order",
      "Struktur SEO Dasar & Sertifikat Keamanan SSL",
      "Revisi Tampilan hingga 3x",
    ];
    featuresExcluded = [
      "Sistem Autentikasi / Akun Pelanggan",
      "Integrasi Gateway Pembayaran Otomatis",
      "Dashboard Admin Kompleks untuk Inventaris",
    ];
    recommendedPackage = "Paket Profil Usaha Premium";
    estimatedTimeline = "10-14 Hari Kerja";
    complexityLevel = "Sedang";
    budgetExplanation = "Dengan budget ini, Anda mendapatkan layout multi-section yang dinamis. Ideal untuk menampilkan detail layanan, portofolio hasil kerja, review pelanggan, dan formulir pengisian data yang langsung terhubung ke WhatsApp.";
  } else {
    featuresIncluded = [
      "Website Multi-Page Profesional (3-5 Halaman)",
      "Katalog Produk atau Layanan Interaktif",
      "Sistem Reservasi / Booking Tanggal Online",
      "Halaman Admin Mandiri (CMS Sederhana) untuk Update Produk/Artikel",
      "Advanced SEO Optimization (Riset Kata Kunci Lokal)",
      "Integrasi Google Analytics & Pixel Pelacakan",
    ];
    featuresExcluded = [
      "Sistem E-Commerce Skala Besar dengan Multi-Gudang",
      "Integrasi Pengiriman Logistik Pihak Ketiga Real-time (membutuhkan API custom tambahan)",
    ];
    recommendedPackage = "Paket Sistem Bisnis & Ritel";
    estimatedTimeline = "3-4 Minggu";
    complexityLevel = "Tinggi";
    budgetExplanation = "Budget premium ini memungkinkan kami membangun website bisnis seutuhnya. Dilengkapi katalog interaktif, sistem penjadwalan antrean/booking otomatis, dan halaman admin bagi Anda untuk mengupdate foto serta detail bisnis kapan saja secara mandiri.";
  }

  // Copywriting generator based on type and input
  let headline = `Digitalisasi ${businessName} di ${location}`;
  let subheadline = `Kami membantu menghadirkan layanan profesional ${businessName} langsung ke calon pelanggan Anda.`;
  let cta = "HUBUNGI LEWAT WHATSAPP";
  let aboutTitle = `Tentang ${businessName}`;
  let aboutBody = `${businessName} berkomitmen memberikan pelayanan terbaik di ${location}. Didukung tim berpengalaman, kami memastikan kebutuhan bisnis Anda terpenuhi dengan standar kualitas tinggi.`;
  let sections = [];

  if (businessType === "cafe") {
    headline = `Cita Rasa Autentik dari ${businessName}`;
    subheadline = `Nikmati racikan kopi khas, makanan lezat, dan suasana santai yang cocok untuk berkumpul bersama teman di ${location}.`;
    cta = "LIHAT MENU & RESERVASI";
    aboutTitle = `Kisah Seduhan Kami`;
    aboutBody = `Berawal dari kecintaan kami terhadap kopi lokal berkualitas, ${businessName} hadir di ${location} untuk menjadi ruang berkumpul hangat yang menyajikan kopi pilihan, teh premium, dan camilan rumahan yang dibuat segar setiap hari.`;
    sections = [
      {
        type: "service-grid",
        title: "Menu Terfavorit Kami",
        description: "Hidangan kopi dan makanan yang paling sering dipesan oleh pelanggan setia kami.",
        items: [
          "Signature Es Kopi Susu Aren - Kopi espresso ganda dengan gula aren murni fatululi.",
          "Classic Cappuccino - Espresso dengan foam susu tebal dan taburan bubuk cokelat premium.",
          "Roti Bakar Cokelat Keju - Roti bakar empuk dengan isian cokelat lumer dan keju melimpah.",
          "Kentang Goreng Bumbu - Kentang renyah berbalur bumbu gurih khusus cafe."
        ]
      },
      {
        type: "editorial",
        title: "Suasana Hangat & Nyaman",
        description: "Tempat ideal untuk bekerja remote (WFC), berkumpul keluarga, atau sekadar melepas penat.",
        items: [
          "Fasilitas Wi-Fi berkecepatan tinggi di seluruh area.",
          "Tersedia area indoor ber-AC dan outdoor ramah asap rokok.",
          "Live music akustik setiap akhir pekan mulai jam 19.00."
        ]
      }
    ];
  } else if (businessType === "clinic") {
    headline = `Layanan Kesehatan Terpercaya di ${businessName}`;
    subheadline = `Mengedepankan kenyamanan pasien dengan dokter ahli dan fasilitas medis modern di wilayah ${location}.`;
    cta = "JADWALKAN KONSULTASI";
    aboutTitle = `Dedikasi Kesehatan Anda`;
    aboutBody = `${businessName} adalah klinik kesehatan keluarga yang berdiri di ${location}. Kami hadir untuk memberikan layanan medis primer terpadu dengan pendekatan yang ramah, profesional, dan mengutamakan pencegahan dini penyakit.`;
    sections = [
      {
        type: "service-grid",
        title: "Layanan Medis Utama",
        description: "Pelayanan kesehatan lengkap yang ditangani langsung oleh dokter berlisensi.",
        items: [
          "Konsultasi Dokter Umum - Pemeriksaan fisik, diagnosis, dan peresepan obat terarah.",
          "Klinik KIA (Kesehatan Ibu & Anak) - Konsultasi kehamilan, tumbuh kembang, dan imunisasi dasar.",
          "Laboratorium Dasar - Cek darah rutin, kadar kolesterol, asam urat, dan gula darah cepat.",
          "Nebulizer & Terapi Uap - Penanganan cepat sesak napas atau asma pada anak dan dewasa."
        ]
      },
      {
        type: "horizontal-feature",
        title: "Jadwal Praktik Dokter",
        description: "Informasi jam operasional layanan dokter keluarga kami.",
        items: [
          "Senin s/d Jumat: Pagi (08:00 - 12:00) & Sore (16:00 - 20:00)",
          "Sabtu: Pagi (08:00 - 13:00), Minggu & Hari Libur Nasional Tutup",
          "Layanan Pendaftaran Online dibuka H-1 melalui WhatsApp Resmi"
        ]
      }
    ];
  } else if (businessType === "barbershop") {
    headline = `Tampil Maksimal Bersama ${businessName}`;
    subheadline = `Potongan rambut pria premium, pijat rileks, dan perawatan janggut berkelas dari barber berpengalaman di ${location}.`;
    cta = "BOOKING JADWAL SEKARANG";
    aboutTitle = `Gentlemen's Corner`;
    aboutBody = `Di ${businessName}, kami percaya bahwa potongan rambut adalah cerminan karakter pria. Kami menyediakan layanan cukur rambut kelas utama dengan peralatan steril, handuk hangat, dan pomade berkualitas untuk menunjang penampilan harian Anda.`;
    sections = [
      {
        type: "service-grid",
        title: "Daftar Harga & Layanan",
        description: "Pilihan paket cukur rambut dan perawatan rambut pria terbaik.",
        items: [
          "Signature Haircut - Keramas, potong rambut kustom, pijat kepala, dan handuk hangat.",
          "Kids Haircut - Cukur rambut anak dengan pendekatan sabar dan menyenangkan.",
          "Beard Trim & Shave - Perapian janggut/kumis dengan krim cukur premium dan pijatan.",
          "Hair Color & Bleaching - Pewarnaan rambut trendi menggunakan produk aman kulit kepala."
        ]
      },
      {
        type: "testimonial-strip",
        title: "Apa Kata Klien Kami",
        description: "Testimoni jujur dari pelanggan setia barbershop kami.",
        items: [
          "\"Barbernya ramah, potongan presisi, dan pijatannya juara banget!\" - Doni, Pekerja Swasta",
          "\"Tempatnya bersih, wangi, AC dingin, dan tidak antre panjang kalau booking dulu.\" - Rian, Mahasiswa",
          "\"Cukur rambut anak di sini sangat sabar, anak saya tidak menangis sama sekali.\" - Pak Budi, Orangtua"
        ]
      }
    ];
  } else if (businessType === "laundry") {
    headline = `Cuci Rapi Bersih Harum Tanpa Ribet`;
    subheadline = `Jasa laundry kiloan, satuan, dan antar-jemput express untuk area ${location} dan sekitarnya.`;
    cta = "PESAN ANTAR-JEMPUT LAUNDRY";
    aboutTitle = `Solusi Pakaian Bersih Anda`;
    aboutBody = `${businessName} hadir meringankan beban cucian harian Anda. Kami menggunakan detergen ramah lingkungan, pewangi premium tahan lama, serta mesin cuci modern berteknologi tinggi untuk memastikan serat pakaian Anda tetap terjaga.`;
    sections = [
      {
        type: "service-grid",
        title: "Daftar Harga Kiloan & Satuan",
        description: "Layanan laundry ekonomis dengan jaminan bersih dan rapi.",
        items: [
          "Cuci Setrika Kiloan (Reguler 3 Hari) - Rp 7.000 / Kg. Bersih, wangi, setrika uap rapi.",
          "Cuci Setrika Express (1 Hari) - Rp 12.000 / Kg. Solusi darurat untuk baju besok.",
          "Laundry Satuan Sprei & Bedcover - Mulai Rp 15.000 / Pcs. Bersih maksimal bebas tungau.",
          "Layanan Cuci Sepatu & Tas - Pembersihan khusus noda membandel tanpa merusak bahan."
        ]
      },
      {
        type: "horizontal-feature",
        title: "Ketentuan Antar-Jemput Gratis",
        description: "Kemudahan laundry tanpa perlu keluar rumah di area operasional kami.",
        items: [
          "Gratis antar-jemput dengan minimal cucian 5 Kg untuk jarak di bawah 3 Km.",
          "Pemesanan kurir pick-up bisa melalui chat WhatsApp sebelum jam 17:00 WITA.",
          "Pakaian ditimbang langsung di lokasi penjemputan dengan timbangan digital akurat."
        ]
      }
    ];
  } else if (businessType === "workshop") {
    headline = `Servis Kendaraan Terpercaya & Bergaransi`;
    subheadline = `Perbaikan mesin mobil/motor, ganti oli, tune-up, dan suku cadang asli di ${location}.`;
    cta = "HUBUNGI BENGKEL KAMI";
    aboutTitle = `Mekanik Ahli Anda`;
    aboutBody = `${businessName} adalah bengkel otomotif terpercaya di ${location}. Kami memiliki tim mekanik bersertifikat dan peralatan diagnosis komputer modern untuk menjamin mobil atau motor Anda kembali prima di jalan raya.`;
    sections = [
      {
        type: "service-grid",
        title: "Layanan Perbaikan Utama",
        description: "Servis berkala dan perbaikan mekanik otomotif menyeluruh.",
        items: [
          "Tune-Up & Bersih Karburator/Injeksi - Mengembalikan tenaga mesin yang loyo agar hemat bahan bakar.",
          "Ganti Oli & Filter - Pilihan oli mesin motor/mobil bergaransi asli dari produsen resmi.",
          "Servis Rem & Kaki-kaki - Penggantian kampas rem, shockbreaker, dan penyelarasan roda.",
          "Diagnosis Komputer & Sensor - Pelacakan kerusakan sistem kelistrikan injeksi mobil."
        ]
      },
      {
        type: "horizontal-feature",
        title: "Garansi Pekerjaan & Lokasi",
        description: "Jaminan kualitas layanan mekanik bengkel kami.",
        items: [
          "Garansi servis mesin ringan selama 7 hari kalender setelah kendaraan keluar bengkel.",
          "Menyediakan suku cadang asli (OEM) dan opsi suku cadang aftermarket tepercaya.",
          "Tersedia ruang tunggu ber-AC, kopi gratis, dan steker listrik saat menunggu servis."
        ]
      }
    ];
  } else {
    headline = `Digitalisasi Bisnis Anda Bersama ${businessName}`;
    subheadline = `Kami membantu profil korporat Anda tampil kredibel, modern, dan profesional di internet di wilayah ${location}.`;
    cta = "PELAJARI PROFIL PERUSAHAAN";
    aboutTitle = `Misi Dan Visi Kami`;
    aboutBody = `${businessName} berkomitmen menjadi mitra strategis pertumbuhan bisnis klien di ${location}. Kami menghadirkan solusi operasional dan pemasaran digital terintegrasi yang disesuaikan dengan tantangan pasar modern.`;
    sections = [
      {
        type: "service-grid",
        title: "Keunggulan Layanan Kami",
        description: "Mengapa puluhan klien mempercayakan operasional bisnisnya kepada kami.",
        items: [
          "Analisis Proses Bisnis Taktis - Memetakan alur kerja agar lebih efisien dan hemat biaya.",
          "Implementasi Sistem Digital - Mengubah pencatatan manual menjadi dashboard berbasis web.",
          "Pendampingan Usaha Berkelanjutan - Evaluasi sistem secara berkala pasca go-live.",
          "Pelatihan Staf Operasional - Edukasi pemakaian sistem agar berjalan mandiri di perusahaan."
        ]
      },
      {
        type: "stats",
        title: "Pencapaian Klien Kami",
        description: "Angka riil dari dampak digitalisasi yang telah dikerjakan.",
        items: [
          "100+ - Pelaku UMKM Lokal yang Telah Go-Digital",
          "30% - Rata-rata Peningkatan Efisiensi Alur Kerja Operasional",
          "24/7 - Keaktifan Sistem Monitoring Bisnis Tanpa Downtime"
        ]
      }
    ];
  }

  // Generate WhatsApp Message
  const whatsappMessage = `Halo tim SiWeb Sivilize, saya tertarik berkonsultasi mengenai:
- Nama Bisnis: ${businessName}
- Jenis Bisnis: ${businessType}
- Lokasi: ${location}
- Deskripsi: ${businessDesc}
- Budget Pilihan: ${formattedBudget}
- Rekomendasi Paket: ${recommendedPackage}
- Perkiraan Timeline: ${estimatedTimeline}

Tolong infokan ketersediaan kuota slot bulan ini untuk survei/konsultasi awal. Terima kasih!`;

  return {
    businessType,
    websiteName: businessName,
    targetAudience: `Calon pelanggan lokal ${businessName} di wilayah ${location}`,
    designDirection,
    colorPalette,
    typographyStyle,
    hero: {
      headline,
      subheadline,
      cta,
    },
    about: {
      title: aboutTitle,
      body: aboutBody,
    },
    sections,
    featuresIncluded,
    featuresExcluded,
    recommendedPackage,
    estimatedTimeline,
    complexityLevel,
    budgetExplanation,
    whatsappMessage,
  };
}
