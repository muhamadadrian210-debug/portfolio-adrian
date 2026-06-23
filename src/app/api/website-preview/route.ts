import { NextResponse } from "next/server";

type BusinessType =
  | "cafe"
  | "clinic"
  | "barbershop"
  | "laundry"
  | "workshop"
  | "company"
  | "hotel"
  | "school";

type BudgetTier = "starter" | "growth" | "premium";

type PreviewSection = {
  type: "menu" | "services" | "gallery" | "schedule" | "pricing" | "portfolio" | "facilities" | "testimonials" | "location" | "cta";
  title: string;
  description: string;
  items: string[];
};

type PreviewConcept = {
  businessType: BusinessType;
  budgetTier: BudgetTier;
  websiteName: string;
  targetAudience: string;
  designDirection: string;
  visualKeywords: string[];
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    muted: string;
  };
  typographyStyle: string;
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    cta: string;
    secondaryCta: string;
    visualLabel: string;
  };
  about: {
    title: string;
    body: string;
  };
  sections: PreviewSection[];
  featuresIncluded: string[];
  featuresExcluded: string[];
  recommendedPackage: string;
  estimatedTimeline: string;
  complexityLevel: "Rendah" | "Sedang" | "Tinggi";
  budgetExplanation: string;
  whatsappMessage: string;
};

type RequestBody = {
  businessName?: string;
  businessDesc?: string;
  location?: string;
  businessType?: string;
  budget?: string;
  customBudget?: string;
};

const BUSINESS_TYPES: BusinessType[] = ["cafe", "clinic", "barbershop", "laundry", "workshop", "company", "hotel", "school"];

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RequestBody;
    const params = normalizeParams(body);

    if (!params.businessName || !params.businessDesc || !params.businessType || !params.budget) {
      return NextResponse.json({ error: "Kolom nama, deskripsi, jenis bisnis, dan budget wajib diisi." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const fallbackConcept = generateFallbackConcept(params);
    let conceptData: PreviewConcept | null = null;

    if (apiKey) {
      conceptData = await generateWithGemini(apiKey, params, fallbackConcept);
    }

    return NextResponse.json(conceptData ?? fallbackConcept);
  } catch (error) {
    console.error("API error in website-preview:", error);
    return NextResponse.json({ error: "Gagal memproses analisis konsep website. Silakan coba lagi." }, { status: 500 });
  }
}

function normalizeParams(body: RequestBody) {
  const businessType = BUSINESS_TYPES.includes(body.businessType as BusinessType) ? (body.businessType as BusinessType) : "company";

  return {
    businessName: cleanText(body.businessName || ""),
    businessDesc: cleanText(body.businessDesc || ""),
    location: cleanText(body.location || "Indonesia"),
    businessType,
    budget: body.budget || "1500000",
    customBudget: body.customBudget,
  };
}

function cleanText(value: string) {
  return value.trim().replace(/\s+/g, " ").slice(0, 420);
}

function formatBudgetText(budget: string, customBudget?: string) {
  if (budget === "custom" && customBudget) {
    return `Rp ${parseBudget(customBudget).toLocaleString("id-ID")}`;
  }

  return `Rp ${parseBudget(budget).toLocaleString("id-ID")}`;
}

function parseBudget(value?: string) {
  const parsed = Number.parseInt(value || "0", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1500000;
}

function getBudgetTier(budget: string, customBudget?: string): BudgetTier {
  const amount = budget === "custom" ? parseBudget(customBudget) : parseBudget(budget);
  if (amount < 1500000) return "starter";
  if (amount <= 4000000) return "growth";
  return "premium";
}

async function generateWithGemini(
  apiKey: string,
  params: ReturnType<typeof normalizeParams>,
  fallbackConcept: PreviewConcept,
): Promise<PreviewConcept | null> {
  const formattedBudget = formatBudgetText(params.budget, params.customBudget);

  const prompt = `
Anda adalah strategist website UMKM Indonesia. Revisi konsep berikut agar copywriting terasa spesifik untuk bisnis, bukan template AI.

Data bisnis:
- Nama: ${params.businessName}
- Deskripsi: ${params.businessDesc}
- Lokasi: ${params.location}
- Kategori: ${params.businessType}
- Budget: ${formattedBudget}

Aturan:
1. Jangan memakai frasa generik seperti "solusi terbaik", "layanan berkualitas", "profesional terpercaya", atau "terdepan".
2. Pertahankan kategori dan budgetTier dari JSON awal.
3. Tulis CTA sesuai industri: cafe reservasi/order, klinik konsultasi, barbershop booking, laundry order laundry, bengkel booking servis, company konsultasi, hotel pesan kamar, sekolah daftar.
4. Section harus relevan dengan industri dan budget. Budget starter sederhana, growth lebih lengkap, premium terasa lebih kaya.
5. Output hanya JSON valid. Jangan markdown.

JSON awal yang harus diperkaya tanpa mengubah struktur:
${JSON.stringify(fallbackConcept)}
`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.55,
        },
      }),
    });

    if (!response.ok) {
      console.warn("Gemini API call failed:", response.status, response.statusText);
      return null;
    }

    const data = (await response.json()) as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return null;

    return coerceConcept(JSON.parse(text), fallbackConcept);
  } catch (error) {
    console.warn("Failed to parse or generate with Gemini:", error);
    return null;
  }
}

function coerceConcept(value: unknown, fallback: PreviewConcept): PreviewConcept | null {
  if (!value || typeof value !== "object") return null;

  const candidate = value as Partial<PreviewConcept>;
  if (!candidate.hero || !candidate.about || !Array.isArray(candidate.sections)) return null;

  return {
    ...fallback,
    ...candidate,
    businessType: fallback.businessType,
    budgetTier: fallback.budgetTier,
    websiteName: fallback.websiteName,
    colorPalette: { ...fallback.colorPalette, ...(candidate.colorPalette || {}) },
    hero: { ...fallback.hero, ...candidate.hero },
    about: { ...fallback.about, ...candidate.about },
    sections: candidate.sections.length ? candidate.sections.slice(0, 6).map((section, index) => ({
      ...fallback.sections[index % fallback.sections.length],
      ...section,
      items: Array.isArray(section.items) && section.items.length ? section.items.slice(0, 6) : fallback.sections[index % fallback.sections.length].items,
    })) : fallback.sections,
    featuresIncluded: Array.isArray(candidate.featuresIncluded) ? candidate.featuresIncluded : fallback.featuresIncluded,
    featuresExcluded: Array.isArray(candidate.featuresExcluded) ? candidate.featuresExcluded : fallback.featuresExcluded,
  };
}

function generateFallbackConcept(params: ReturnType<typeof normalizeParams>): PreviewConcept {
  const tier = getBudgetTier(params.budget, params.customBudget);
  const formattedBudget = formatBudgetText(params.budget, params.customBudget);
  const base = industryBase(params.businessType, params.businessName, params.location, params.businessDesc);
  const budget = budgetBase(tier, params.businessType);

  const whatsappMessage = `Halo tim SiWeb Sivilize, saya ingin konsultasi website untuk:
- Nama Bisnis: ${params.businessName}
- Kategori: ${labelBusiness(params.businessType)}
- Lokasi: ${params.location}
- Deskripsi: ${params.businessDesc}
- Budget: ${formattedBudget}
- Paket Preview: ${budget.recommendedPackage}

Bisa bantu cek konsep, kebutuhan konten, dan estimasi pengerjaan?`;

  return {
    businessType: params.businessType,
    budgetTier: tier,
    websiteName: params.businessName,
    targetAudience: base.targetAudience,
    designDirection: `${base.designDirection} ${budget.designDepth}`,
    visualKeywords: base.visualKeywords,
    colorPalette: base.colorPalette,
    typographyStyle: base.typographyStyle,
    hero: base.hero,
    about: base.about,
    sections: base.sectionsByTier[tier],
    featuresIncluded: budget.featuresIncluded,
    featuresExcluded: budget.featuresExcluded,
    recommendedPackage: budget.recommendedPackage,
    estimatedTimeline: budget.estimatedTimeline,
    complexityLevel: budget.complexityLevel,
    budgetExplanation: budget.budgetExplanation,
    whatsappMessage,
  };
}

function labelBusiness(type: BusinessType) {
  const labels: Record<BusinessType, string> = {
    cafe: "Cafe & Resto",
    clinic: "Klinik / Rumah Sakit",
    barbershop: "Barbershop",
    laundry: "Laundry",
    workshop: "Bengkel & Otomotif",
    company: "Company Profile",
    hotel: "Hotel",
    school: "Sekolah",
  };

  return labels[type];
}

function budgetBase(tier: BudgetTier, businessType: BusinessType) {
  const bookingWord: Record<BusinessType, string> = {
    cafe: "reservasi dan tombol WhatsApp order",
    clinic: "pendaftaran konsultasi via WhatsApp",
    barbershop: "booking slot barber",
    laundry: "order pickup-delivery",
    workshop: "booking servis kendaraan",
    company: "form konsultasi prospek",
    hotel: "pesan kamar via WhatsApp",
    school: "pendaftaran siswa baru",
  };

  if (tier === "starter") {
    return {
      designDepth: "Versi budget starter dibuat ringkas: satu halaman kuat, visual jelas, dan alur kontak cepat.",
      recommendedPackage: "Paket Landing Page Kilat",
      estimatedTimeline: "5-7 hari kerja",
      complexityLevel: "Rendah" as const,
      budgetExplanation: "Budget ini cocok untuk validasi awal. Preview dibuat sederhana, fokus pada kesan pertama, info penting, lokasi, dan ajakan kontak yang langsung bisa dipakai.",
      featuresIncluded: ["Landing page responsif", `CTA ${bookingWord[businessType]}`, "Copywriting inti bisnis", "Section lokasi dan jam operasional", "Optimasi tampilan mobile"],
      featuresExcluded: ["CMS edit mandiri", "Katalog atau booking otomatis", "Multi halaman lengkap", "SEO lokal lanjutan"],
    };
  }

  if (tier === "growth") {
    return {
      designDepth: "Versi budget menengah menambah galeri, bukti sosial, dan section layanan yang lebih lengkap.",
      recommendedPackage: "Paket Profil Usaha Premium",
      estimatedTimeline: "10-14 hari kerja",
      complexityLevel: "Sedang" as const,
      budgetExplanation: "Budget ini memberi ruang untuk layout lebih hidup: galeri, detail layanan, testimoni, dan CTA yang diarahkan ke WhatsApp agar calon pelanggan lebih yakin sebelum menghubungi.",
      featuresIncluded: ["Multi-section landing page", "Galeri visual bisnis", "Testimoni atau trust block", `Alur ${bookingWord[businessType]}`, "SEO dasar dan struktur halaman rapi"],
      featuresExcluded: ["Dashboard admin kompleks", "Pembayaran otomatis", "Integrasi inventori atau sistem internal"],
    };
  }

  return {
    designDepth: "Versi premium dibuat seperti website bisnis matang dengan komposisi visual lebih kaya dan beberapa alur konversi.",
    recommendedPackage: "Paket Sistem Bisnis & Katalog",
    estimatedTimeline: "3-5 minggu",
    complexityLevel: "Tinggi" as const,
    budgetExplanation: "Budget premium memungkinkan pengalaman lebih lengkap: konten berlapis, katalog atau jadwal, halaman pendukung, dan struktur yang siap dikembangkan menjadi sistem bisnis.",
    featuresIncluded: ["Website multi-page atau landing premium panjang", "Katalog layanan interaktif", "Alur booking/order lebih detail", "CMS sederhana untuk update konten", "SEO lokal dan analytics"],
    featuresExcluded: ["E-commerce skala besar multi-gudang", "Aplikasi mobile native", "Integrasi ERP khusus"],
  };
}

function industryBase(type: BusinessType, name: string, location: string, desc: string) {
  const shortDesc = desc || `layanan ${labelBusiness(type).toLowerCase()} di ${location}`;

  const data: Record<BusinessType, Omit<PreviewConcept, "businessType" | "budgetTier" | "websiteName" | "featuresIncluded" | "featuresExcluded" | "recommendedPackage" | "estimatedTimeline" | "complexityLevel" | "budgetExplanation" | "whatsappMessage"> & { sectionsByTier: Record<BudgetTier, PreviewSection[]> }> = {
    cafe: {
      targetAudience: `Pelanggan yang mencari tempat makan, kopi, dan ruang santai di ${location}`,
      designDirection: "Visual hangat dengan foto menu, tekstur meja, dan galeri suasana cafe.",
      visualKeywords: ["Foto Cafe", "Menu Kopi", "Interior Hangat", "Galeri Suasana"],
      colorPalette: { primary: "#7c3f18", secondary: "#d8a15d", accent: "#2f6f4e", background: "#fff7ed", surface: "#f6e7d1", text: "#2a160b", muted: "#7a5a43" },
      typographyStyle: "Warm serif headline dengan sans yang mudah dibaca",
      hero: {
        eyebrow: "Cafe & resto lokal",
        headline: `${name}, tempat singgah untuk makan enak dan ngobrol lama`,
        subheadline: `${shortDesc}. Tampilkan menu unggulan, jam ramai, suasana tempat, dan reservasi WhatsApp dalam satu halaman yang terasa seperti cafe sungguhan.`,
        cta: "Reservasi Sekarang",
        secondaryCta: "Lihat Menu",
        visualLabel: "Foto Cafe",
      },
      about: {
        title: "Rasa, suasana, dan cerita dari dapur",
        body: `${name} perlu tampil dengan foto menu yang menggugah, cerita singkat tentang suasana, dan info praktis supaya orang di ${location} tahu kapan harus datang atau pesan.`,
      },
      sections: [],
      sectionsByTier: {
        starter: [
          section("menu", "Menu Unggulan", "Beberapa menu utama yang paling mudah dijual dari halaman pertama.", ["Kopi susu aren dengan espresso pekat", "Nasi atau snack favorit pelanggan", "Paket berdua untuk sore hari"]),
          section("location", "Jam Buka & Lokasi", "Info kunjungan dibuat jelas untuk pelanggan sekitar.", [`Area ${location}`, "Jam buka harian", "Tombol arahkan ke Maps"]),
          section("cta", "Reservasi Cepat", "Ajakan sederhana untuk booking meja atau pesan lewat WhatsApp.", ["Reservasi meja", "Pesan untuk dibawa pulang", "Tanya menu hari ini"]),
        ],
        growth: [
          section("menu", "Menu Favorit", "Kartu menu dengan harga ringkas dan foto yang terasa nyata.", ["Signature coffee", "Makanan berat", "Dessert dan camilan", "Paket gathering kecil"]),
          section("gallery", "Galeri Suasana", "Preview interior, meja, bar kopi, dan area kumpul.", ["Indoor nyaman", "Outdoor sore hari", "Bar kopi", "Spot foto pelanggan"]),
          section("testimonials", "Kata Pelanggan", "Review singkat yang menonjolkan rasa dan suasana.", ["Cocok untuk kerja sore", "Kopinya konsisten", "Tempatnya tidak berisik"]),
          section("location", "Lokasi & Reservasi", "Maps, jam buka, dan reservasi langsung.", [`Dekat area ${location}`, "Reservasi meja", "Order WhatsApp"]),
        ],
        premium: [
          section("menu", "Menu Signature", "Menu dikemas seperti katalog mini dengan kategori dan cerita rasa.", ["Coffee bar", "Main course", "Pastry", "Seasonal menu", "Catering meeting"]),
          section("gallery", "Cerita Visual Cafe", "Urutan visual dari bar, dapur, meja, sampai event kecil.", ["Foto interior", "Foto plating", "Foto pelanggan", "Live music", "Private event"]),
          section("testimonials", "Review & Rating", "Bukti sosial untuk pengunjung baru.", ["Rating Google", "Review pelanggan tetap", "Highlight menu paling laku"]),
          section("cta", "Reservasi & Event", "Alur reservasi untuk meja, ulang tahun, atau meeting kecil.", ["Booking meja", "Paket event", "Pre-order menu"]),
        ],
      },
    },
    clinic: {
      targetAudience: `Pasien keluarga dan calon pasien di ${location}`,
      designDirection: "Tampilan klinis bersih dengan ruang putih, foto tenaga medis, dan informasi layanan yang mudah dipindai.",
      visualKeywords: ["Fasilitas Klinik", "Tenaga Medis", "Ruang Konsultasi", "Jadwal Dokter"],
      colorPalette: { primary: "#087f8c", secondary: "#b8e6e1", accent: "#f59e0b", background: "#f7fbfc", surface: "#eaf6f6", text: "#0f2830", muted: "#5d7480" },
      typographyStyle: "Clean medical sans",
      hero: {
        eyebrow: "Klinik dan layanan kesehatan",
        headline: `Daftar konsultasi di ${name} tanpa menunggu informasi yang simpang siur`,
        subheadline: `${shortDesc}. Website menampilkan layanan medis, jadwal dokter, fasilitas, kontak darurat, dan pendaftaran WhatsApp dengan nuansa tenang.`,
        cta: "Daftar Konsultasi",
        secondaryCta: "Lihat Jadwal Dokter",
        visualLabel: "Fasilitas Klinik",
      },
      about: {
        title: "Informasi kesehatan yang rapi sebelum pasien datang",
        body: `${name} membutuhkan tampilan yang bersih dan meyakinkan, dengan daftar layanan yang jelas agar pasien di ${location} bisa memilih jadwal sebelum datang.`,
      },
      sections: [],
      sectionsByTier: {
        starter: [section("services", "Layanan Medis", "Daftar layanan utama untuk pasien baru.", ["Konsultasi umum", "Pemeriksaan dasar", "Surat keterangan sehat"]), section("schedule", "Jam Praktik", "Jadwal dasar dibuat mudah dibaca.", ["Senin-Jumat", "Sabtu terbatas", "Daftar via WhatsApp"]), section("location", "Kontak Darurat", "Nomor penting dan lokasi klinik.", ["WhatsApp admin", "Maps klinik", "Info rujukan"])],
        growth: [section("services", "Layanan Klinik", "Kartu layanan dengan penjelasan singkat.", ["Dokter umum", "Ibu dan anak", "Lab sederhana", "Tindakan ringan"]), section("schedule", "Jadwal Dokter", "Jadwal praktik harian dan pendaftaran.", ["Dokter pagi", "Dokter sore", "Kuota konsultasi", "Pengingat WhatsApp"]), section("facilities", "Fasilitas Klinik", "Visual ruang tunggu dan ruang tindakan.", ["Ruang tunggu", "Ruang konsultasi", "Area farmasi"]), section("location", "Lokasi & Kontak", "Akses pasien dibuat cepat.", [`Wilayah ${location}`, "Kontak darurat", "Peta lokasi"])],
        premium: [section("services", "Layanan Terpadu", "Struktur layanan lengkap untuk website klinik.", ["Poli umum", "KIA", "Laboratorium", "Vaksinasi", "Medical check-up"]), section("schedule", "Jadwal Dokter Spesialis", "Jadwal dibuat seperti modul informasi pasien.", ["Filter dokter", "Jam praktik", "Kuota harian", "Daftar online"]), section("facilities", "Fasilitas & Standar Layanan", "Visual fasilitas dengan narasi keselamatan pasien.", ["Sterilisasi alat", "Ruang tindakan", "Farmasi", "Alur pasien"]), section("cta", "Pendaftaran Konsultasi", "CTA untuk pasien baru dan pasien kontrol.", ["Daftar pasien baru", "Kontrol lanjutan", "Tanya admin"])],
      },
    },
    barbershop: {
      targetAudience: `Pria yang ingin potongan rapi dan booking cepat di ${location}`,
      designDirection: "Visual bold dengan foto hasil potong, kursi barber, dan daftar harga yang tegas.",
      visualKeywords: ["Hasil Potong Rambut", "Interior Barbershop", "Kursi Barber", "Galeri Fade"],
      colorPalette: { primary: "#111827", secondary: "#c8a15a", accent: "#9f1239", background: "#f4f1ea", surface: "#ded7c8", text: "#151515", muted: "#6b6258" },
      typographyStyle: "Bold editorial sans",
      hero: {
        eyebrow: "Barbershop booking",
        headline: `Potongan rapi di ${name}, tinggal pilih barber dan jam datang`,
        subheadline: `${shortDesc}. Preview dibuat dengan harga layanan, galeri hasil potong, dan tombol booking yang langsung terasa seperti website barbershop aktif.`,
        cta: "Booking Sekarang",
        secondaryCta: "Lihat Harga",
        visualLabel: "Hasil Potong Rambut",
      },
      about: {
        title: "Lebih dari sekadar potong rambut",
        body: `${name} bisa tampil lebih kuat lewat galeri before-after, daftar layanan, dan slot booking supaya pelanggan di ${location} tidak perlu antre tanpa kepastian.`,
      },
      sections: [],
      sectionsByTier: {
        starter: [section("pricing", "Layanan & Harga", "Harga inti tampil langsung.", ["Haircut", "Hair wash", "Beard trim"]), section("gallery", "Galeri Hasil", "Preview beberapa gaya rambut.", ["Fade", "Classic cut", "Crop cut"]), section("cta", "Booking Barber", "Chat WhatsApp untuk pilih jam.", ["Pilih jam", "Pilih layanan", "Konfirmasi datang"])],
        growth: [section("pricing", "Paket Grooming", "Layanan dikemas dengan harga jelas.", ["Signature haircut", "Haircut + wash", "Shave", "Kids cut"]), section("gallery", "Hasil Potong", "Galeri visual hasil kerja barber.", ["Low fade", "Mid fade", "Pompadour", "Textured crop"]), section("testimonials", "Review Pelanggan", "Komentar pelanggan tentang hasil dan antrean.", ["Potongan presisi", "Booking tepat waktu", "Tempat bersih"]), section("cta", "Booking Sekarang", "Slot booking WhatsApp.", ["Pilih barber", "Pilih jam", "Datang sesuai jadwal"])],
        premium: [section("pricing", "Menu Grooming Lengkap", "Daftar harga lebih premium dan mudah dipilih.", ["Haircut", "Beard care", "Hair color", "Scalp treatment", "Membership"]), section("gallery", "Portfolio Barber", "Hasil potong dikelompokkan per style.", ["Fade gallery", "Long trim", "Color work", "Before-after"]), section("testimonials", "Client Wall", "Bukti sosial dari pelanggan tetap.", ["Review member", "Style favorit", "Barber recommendation"]), section("cta", "Booking Slot", "Alur booking untuk cabang atau barber tertentu.", ["Pilih cabang", "Pilih barber", "Reminder WhatsApp"])],
      },
    },
    laundry: {
      targetAudience: `Rumah tangga, kos, dan pekerja sibuk di ${location}`,
      designDirection: "Tampilan segar dengan visual pakaian bersih, alur pickup, dan harga kiloan yang mudah dipahami.",
      visualKeywords: ["Pakaian Bersih", "Proses Laundry", "Pickup Delivery", "Rak Setrika"],
      colorPalette: { primary: "#0f8fb3", secondary: "#b7edf5", accent: "#14b8a6", background: "#f2fbfd", surface: "#dff5f8", text: "#10313a", muted: "#55757c" },
      typographyStyle: "Rounded friendly sans",
      hero: {
        eyebrow: "Laundry kiloan dan satuan",
        headline: `${name} bantu cucian selesai tanpa mengganggu hari Anda`,
        subheadline: `${shortDesc}. Website menonjolkan harga kiloan, area layanan, pickup-delivery, dan tombol order WhatsApp yang praktis.`,
        cta: "Order Laundry",
        secondaryCta: "Cek Harga",
        visualLabel: "Pakaian Bersih",
      },
      about: {
        title: "Cucian rapi, alur order jelas",
        body: `${name} perlu menjawab tiga hal dengan cepat: harga berapa, area mana yang dijemput, dan kapan cucian selesai untuk pelanggan di ${location}.`,
      },
      sections: [],
      sectionsByTier: {
        starter: [section("pricing", "Harga Kiloan", "Harga utama tampil sederhana.", ["Cuci setrika reguler", "Setrika saja", "Express terbatas"]), section("services", "Layanan", "Jenis cucian paling sering dipesan.", ["Kiloan", "Satuan", "Bedcover"]), section("cta", "Pickup Delivery", "Order jemput lewat WhatsApp.", ["Kirim alamat", "Timbang di tempat", "Antar kembali"])],
        growth: [section("pricing", "Daftar Harga", "Harga reguler, express, dan satuan.", ["Reguler 3 hari", "Express 1 hari", "Bedcover", "Sepatu dan tas"]), section("services", "Alur Laundry", "Proses dibuat transparan.", ["Pickup", "Sortir", "Cuci", "Setrika", "Antar"]), section("location", "Area Layanan", "Coverage area untuk pickup.", [`Area ${location}`, "Minimal kiloan", "Jam pickup"]), section("testimonials", "Pelanggan Rutin", "Bukti layanan rapi dan tepat waktu.", ["Wangi tahan lama", "Tidak tertukar", "Kurir responsif"])],
        premium: [section("pricing", "Paket Laundry", "Paket keluarga, kos, dan langganan.", ["Paket mingguan", "Paket kos", "Express", "Satuan premium"]), section("services", "Tracking Cucian", "Konsep alur status untuk premium.", ["Diterima", "Dicuci", "Disetrika", "Siap antar"]), section("location", "Pickup Delivery Area", "Coverage dibuat seperti area operasional.", ["Zona gratis", "Zona berbayar", "Jadwal kurir"]), section("cta", "Order dan Langganan", "CTA untuk order satuan atau paket bulanan.", ["Order hari ini", "Langganan bulanan", "Tanya admin"])],
      },
    },
    workshop: {
      targetAudience: `Pemilik motor dan mobil yang butuh servis jelas di ${location}`,
      designDirection: "Visual industrial dengan teknisi bekerja, area servis, sparepart, dan CTA booking antrean.",
      visualKeywords: ["Area Servis", "Teknisi Bekerja", "Sparepart", "Kendaraan"],
      colorPalette: { primary: "#c2410c", secondary: "#334155", accent: "#facc15", background: "#111827", surface: "#1f2937", text: "#f8fafc", muted: "#cbd5e1" },
      typographyStyle: "Industrial condensed sans",
      hero: {
        eyebrow: "Bengkel dan otomotif",
        headline: `Servis di ${name} dibuat jelas dari keluhan sampai booking antrean`,
        subheadline: `${shortDesc}. Preview menampilkan layanan servis, sparepart, galeri pengerjaan, dan booking servis via WhatsApp.`,
        cta: "Booking Servis",
        secondaryCta: "Lihat Layanan",
        visualLabel: "Area Servis",
      },
      about: {
        title: "Bengkel perlu terlihat rapi sebelum pelanggan datang",
        body: `${name} bisa menampilkan jenis servis, estimasi pengerjaan, sparepart, dan bukti pekerjaan agar pemilik kendaraan di ${location} merasa lebih siap.`,
      },
      sections: [],
      sectionsByTier: {
        starter: [section("services", "Layanan Servis", "Servis utama langsung terlihat.", ["Ganti oli", "Tune up", "Cek rem"]), section("portfolio", "Galeri Pengerjaan", "Foto area servis dan kendaraan.", ["Motor masuk", "Teknisi bekerja", "Sparepart"]), section("cta", "Booking Servis", "WhatsApp untuk jadwal antrean.", ["Kirim keluhan", "Pilih jam", "Datang ke bengkel"])],
        growth: [section("services", "Layanan Bengkel", "Layanan dibuat per kategori kendaraan.", ["Servis berkala", "Kaki-kaki", "Kelistrikan", "Ganti oli"]), section("facilities", "Sparepart & Peralatan", "Bukti alat dan sparepart tersedia.", ["Oli resmi", "Scanner", "Toolkit", "Ruang tunggu"]), section("portfolio", "Galeri Pengerjaan", "Foto hasil servis dan proses.", ["Before-after", "Area servis", "Teknisi", "Komponen"]), section("cta", "Booking Antrean", "Booking servis via WhatsApp.", ["Jenis kendaraan", "Keluhan", "Jam datang"])],
        premium: [section("services", "Layanan Servis Lengkap", "Layanan lengkap untuk website bengkel premium.", ["Servis berkala", "Diagnosis injeksi", "Kaki-kaki", "AC mobil", "Detailing"]), section("facilities", "Area Servis & Sparepart", "Visual fasilitas dan stok komponen.", ["Lift hidrolik", "Scanner", "Sparepart OEM", "Ruang tunggu"]), section("portfolio", "Pengerjaan Terbaru", "Portfolio pekerjaan untuk membangun trust.", ["Overhaul", "Tune up", "Rem", "Kelistrikan"]), section("cta", "Booking Servis Online", "Alur booking lebih lengkap.", ["Pilih layanan", "Upload foto keluhan", "Reminder WhatsApp"])],
      },
    },
    company: {
      targetAudience: `Calon klien, mitra, dan stakeholder ${name} di ${location}`,
      designDirection: "Korporat editorial dengan visual kantor, tim, proyek, dan portofolio klien.",
      visualKeywords: ["Tim Profesional", "Kantor", "Portofolio Proyek", "Klien"],
      colorPalette: { primary: "#164e63", secondary: "#94a3b8", accent: "#c8a15a", background: "#f8fafc", surface: "#e2e8f0", text: "#0f172a", muted: "#64748b" },
      typographyStyle: "Clean corporate sans",
      hero: {
        eyebrow: "Company profile",
        headline: `${name} tampil kredibel sejak halaman pertama`,
        subheadline: `${shortDesc}. Website company profile harus memperlihatkan siapa timnya, apa layanannya, proyek yang pernah ditangani, dan cara menghubungi tim sales.`,
        cta: "Konsultasi Sekarang",
        secondaryCta: "Lihat Portofolio",
        visualLabel: "Portofolio Proyek",
      },
      about: {
        title: "Profil perusahaan yang tidak berhenti di paragraf panjang",
        body: `${name} butuh struktur yang rapi: cerita singkat, layanan, portofolio, klien, dan CTA agar calon mitra di ${location} cepat paham posisi perusahaan.`,
      },
      sections: [],
      sectionsByTier: {
        starter: [section("services", "Layanan Utama", "Tiga layanan inti tampil ringkas.", ["Konsultasi", "Implementasi", "Pendampingan"]), section("portfolio", "Contoh Proyek", "Beberapa highlight pekerjaan.", ["Proyek lokal", "Hasil kerja", "Klien terkait"]), section("cta", "Kontak Resmi", "CTA konsultasi via WhatsApp.", ["Tanya kebutuhan", "Jadwalkan call", "Minta proposal"])],
        growth: [section("services", "Lini Layanan", "Layanan ditata seperti profil bisnis matang.", ["Konsultasi", "Operasional", "Digitalisasi", "Maintenance"]), section("portfolio", "Portofolio", "Proyek atau studi kasus singkat.", ["Proyek A", "Proyek B", "Proyek C"]), section("testimonials", "Klien & Partner", "Logo atau kutipan klien.", ["Klien lokal", "Mitra vendor", "Repeat order"]), section("cta", "Diskusi Proyek", "CTA untuk prospek baru.", ["Konsultasi", "Minta company deck", "WhatsApp sales"])],
        premium: [section("services", "Solusi Perusahaan", "Struktur layanan lebih lengkap.", ["Strategy", "Implementation", "Managed service", "Training", "Support"]), section("portfolio", "Studi Kasus", "Portfolio-first layout untuk membangun kredibilitas.", ["Masalah klien", "Solusi", "Dampak", "Durasi proyek"]), section("testimonials", "Klien dan Dampak", "Bukti sosial dan angka hasil.", ["Logo klien", "Kutipan direktur", "Metrik dampak"]), section("cta", "Konsultasi Korporat", "CTA untuk lead bernilai tinggi.", ["Jadwalkan meeting", "Kirim brief", "Minta proposal"])],
      },
    },
    hotel: {
      targetAudience: `Tamu bisnis dan wisatawan yang mencari kamar di ${location}`,
      designDirection: "Hospitality visual dengan foto kamar, fasilitas, ambience lobby, dan modul pesan kamar.",
      visualKeywords: ["Kamar Hotel", "Fasilitas", "Lobby", "Lokasi Hotel"],
      colorPalette: { primary: "#0f3d3e", secondary: "#d6b16a", accent: "#8a5a2b", background: "#fbf7ef", surface: "#eee2cc", text: "#1f2a24", muted: "#746958" },
      typographyStyle: "Elegant hospitality serif",
      hero: {
        eyebrow: "Hotel dan penginapan",
        headline: `${name}, tempat menginap yang mudah dipilih sebelum tamu datang`,
        subheadline: `${shortDesc}. Preview menonjolkan tipe kamar, fasilitas, galeri hotel, lokasi, dan tombol pesan kamar via WhatsApp.`,
        cta: "Pesan Kamar",
        secondaryCta: "Lihat Tipe Kamar",
        visualLabel: "Kamar Hotel",
      },
      about: {
        title: "Tamu ingin melihat kamar sebelum bertanya harga",
        body: `${name} perlu memperlihatkan foto kamar, fasilitas, dan akses lokasi agar calon tamu di ${location} cepat yakin untuk menghubungi resepsionis.`,
      },
      sections: [],
      sectionsByTier: {
        starter: [section("facilities", "Tipe Kamar", "Kamar utama dan fasilitas dasar.", ["Standard room", "Deluxe room", "Sarapan"]), section("gallery", "Foto Hotel", "Visual kamar dan lobby.", ["Kamar", "Lobby", "Area parkir"]), section("cta", "Pesan Kamar", "WhatsApp resepsionis.", ["Cek tanggal", "Tanya harga", "Konfirmasi booking"])],
        growth: [section("facilities", "Tipe Kamar", "Kartu kamar dengan fasilitas.", ["Standard", "Deluxe", "Family room", "Extra bed"]), section("gallery", "Galeri Hotel", "Foto kamar, lobby, dan fasilitas.", ["Kamar", "Lobby", "Restoran", "Parkir"]), section("location", "Lokasi Strategis", "Akses ke titik penting sekitar.", [`Area ${location}`, "Dekat pusat kota", "Arah Maps"]), section("cta", "Reservasi", "CTA pesan kamar.", ["Cek ketersediaan", "Pilih kamar", "WhatsApp resepsionis"])],
        premium: [section("facilities", "Room Collection", "Tipe kamar lebih premium.", ["Superior", "Deluxe", "Suite", "Family", "Meeting package"]), section("gallery", "Hospitality Gallery", "Galeri kaya untuk membangun rasa percaya.", ["Bedroom", "Bathroom", "Restaurant", "Meeting room", "View"]), section("location", "Fasilitas & Lokasi", "Fasilitas dan akses dipresentasikan lengkap.", ["Breakfast", "Wi-Fi", "Parkir", "Nearby attraction"]), section("cta", "Pesan Kamar", "Alur booking lebih detail.", ["Tanggal menginap", "Jumlah tamu", "Preferensi kamar"])],
      },
    },
    school: {
      targetAudience: `Orang tua dan calon siswa di ${location}`,
      designDirection: "Visual edukasi yang cerah dengan siswa, ruang belajar, kegiatan, dan pendaftaran.",
      visualKeywords: ["Siswa", "Lingkungan Belajar", "Fasilitas Sekolah", "Kegiatan"],
      colorPalette: { primary: "#1d4ed8", secondary: "#facc15", accent: "#16a34a", background: "#f8fbff", surface: "#e8f0ff", text: "#10203f", muted: "#5d6f91" },
      typographyStyle: "Clear education sans",
      hero: {
        eyebrow: "Sekolah dan pendidikan",
        headline: `${name} memperlihatkan lingkungan belajar sebelum orang tua bertanya biaya`,
        subheadline: `${shortDesc}. Preview berisi program, fasilitas, kegiatan siswa, lokasi, dan CTA daftar via WhatsApp.`,
        cta: "Daftar Sekarang",
        secondaryCta: "Lihat Program",
        visualLabel: "Lingkungan Belajar",
      },
      about: {
        title: "Website sekolah harus menjawab rasa ingin tahu orang tua",
        body: `${name} bisa menampilkan program belajar, kegiatan, fasilitas, dan alur pendaftaran agar keluarga di ${location} punya gambaran jelas sebelum datang.`,
      },
      sections: [],
      sectionsByTier: {
        starter: [section("services", "Program Belajar", "Program utama sekolah.", ["Kelas reguler", "Ekstrakurikuler", "Pembinaan karakter"]), section("facilities", "Fasilitas", "Fasilitas dasar ditampilkan jelas.", ["Ruang kelas", "Lapangan", "Perpustakaan"]), section("cta", "Pendaftaran", "WhatsApp admin penerimaan siswa.", ["Tanya biaya", "Jadwal kunjungan", "Daftar awal"])],
        growth: [section("services", "Program Pendidikan", "Program dan jenjang belajar.", ["Kurikulum", "Ekstrakurikuler", "Kegiatan siswa", "Bimbingan"]), section("facilities", "Fasilitas Sekolah", "Visual fasilitas untuk orang tua.", ["Ruang kelas", "Lab", "Perpustakaan", "Lapangan"]), section("gallery", "Kegiatan Siswa", "Galeri kegiatan sekolah.", ["Upacara", "Praktik kelas", "Lomba", "Kunjungan"]), section("cta", "Daftar Sekarang", "CTA pendaftaran siswa baru.", ["Tanya biaya", "Ambil formulir", "Jadwal survey"])],
        premium: [section("services", "Program Unggulan", "Program sekolah ditampilkan seperti portal penerimaan.", ["Akademik", "Karakter", "Bahasa", "Teknologi", "Ekstrakurikuler"]), section("facilities", "Fasilitas Belajar", "Fasilitas lengkap dan kegiatan pendukung.", ["Lab", "Perpustakaan", "Sport area", "Creative room"]), section("gallery", "Kegiatan & Prestasi", "Galeri untuk prestasi dan kegiatan.", ["Prestasi", "Kegiatan kelas", "Lomba", "Field trip"]), section("cta", "Penerimaan Siswa Baru", "Alur pendaftaran lebih lengkap.", ["Download info", "Jadwal open house", "Daftar WhatsApp"])],
      },
    },
  };

  return data[type];
}

function section(type: PreviewSection["type"], title: string, description: string, items: string[]): PreviewSection {
  return { type, title, description, items };
}
