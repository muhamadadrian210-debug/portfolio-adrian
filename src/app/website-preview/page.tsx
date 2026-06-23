"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SiteEffects } from "@/components/runtime/SiteEffects";

type BusinessType = "cafe" | "clinic" | "barbershop" | "laundry" | "workshop" | "company" | "hotel" | "school";
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

type IndustryConfig = {
  label: string;
  glyph: string;
  heroImage: string;
  heroClass: string;
  nav: string[];
  galleryLabels: string[];
};

const BUDGET_PRESETS = [
  { value: "800000", label: "Rp 800.000", desc: "Landing Page Kilat" },
  { value: "1500000", label: "Rp 1.500.000", desc: "Landing Page Premium" },
  { value: "3000000", label: "Rp 3.000.000", desc: "Profil Usaha Standar" },
  { value: "5000000", label: "Rp 5.000.000", desc: "Profil Usaha Premium" },
  { value: "10000000", label: "Rp 10.000.000", desc: "Katalog & Sistem Ritel" },
  { value: "20000000", label: "Rp 20.000.000", desc: "Sistem Bisnis Kustom" },
  { value: "custom", label: "Custom Budget", desc: "Sesuai Kebutuhan" },
];

const BUSINESS_TYPES: Array<{ value: BusinessType; label: string; icon: string }> = [
  { value: "cafe", label: "Cafe & Resto", icon: "CF" },
  { value: "clinic", label: "Klinik / Rumah Sakit", icon: "MD" },
  { value: "barbershop", label: "Barbershop", icon: "BR" },
  { value: "laundry", label: "Jasa Laundry", icon: "LD" },
  { value: "workshop", label: "Bengkel & Otomotif", icon: "OT" },
  { value: "company", label: "Company Profile", icon: "CO" },
  { value: "hotel", label: "Hotel", icon: "HT" },
  { value: "school", label: "Sekolah", icon: "SC" },
];

const INDUSTRIES: Record<BusinessType, IndustryConfig> = {
  cafe: {
    label: "Cafe & Resto",
    glyph: "Cafe",
    heroImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1300&q=80",
    heroClass: "preview-cafe",
    nav: ["Menu", "Galeri", "Reservasi"],
    galleryLabels: ["Foto Cafe", "Menu Kopi", "Interior Cafe"],
  },
  clinic: {
    label: "Klinik / Rumah Sakit",
    glyph: "Care",
    heroImage: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1300&q=80",
    heroClass: "preview-clinic",
    nav: ["Layanan", "Dokter", "Kontak"],
    galleryLabels: ["Fasilitas Klinik", "Tenaga Medis", "Ruang Konsultasi"],
  },
  barbershop: {
    label: "Barbershop",
    glyph: "Cut",
    heroImage: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1300&q=80",
    heroClass: "preview-barber",
    nav: ["Harga", "Hasil", "Booking"],
    galleryLabels: ["Hasil Potong Rambut", "Kursi Barber", "Interior Barbershop"],
  },
  laundry: {
    label: "Laundry",
    glyph: "Wash",
    heroImage: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=1300&q=80",
    heroClass: "preview-laundry",
    nav: ["Harga", "Area", "Order"],
    galleryLabels: ["Pakaian Bersih", "Proses Laundry", "Pickup Delivery"],
  },
  workshop: {
    label: "Bengkel & Otomotif",
    glyph: "Servis",
    heroImage: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=1300&q=80",
    heroClass: "preview-workshop",
    nav: ["Servis", "Sparepart", "Booking"],
    galleryLabels: ["Area Servis", "Teknisi Bekerja", "Sparepart"],
  },
  company: {
    label: "Company Profile",
    glyph: "Corp",
    heroImage: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1300&q=80",
    heroClass: "preview-company",
    nav: ["Tentang", "Portofolio", "Kontak"],
    galleryLabels: ["Tim Profesional", "Kantor", "Portofolio Proyek"],
  },
  hotel: {
    label: "Hotel",
    glyph: "Stay",
    heroImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1300&q=80",
    heroClass: "preview-hotel",
    nav: ["Kamar", "Fasilitas", "Pesan"],
    galleryLabels: ["Kamar Hotel", "Lobby", "Fasilitas"],
  },
  school: {
    label: "Sekolah",
    glyph: "Edu",
    heroImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1300&q=80",
    heroClass: "preview-school",
    nav: ["Program", "Kegiatan", "Daftar"],
    galleryLabels: ["Lingkungan Belajar", "Siswa", "Fasilitas Sekolah"],
  },
};

export default function WebsitePreviewPage() {
  const [businessName, setBusinessName] = useState("");
  const [businessDesc, setBusinessDesc] = useState("");
  const [location, setLocation] = useState("");
  const [businessType, setBusinessType] = useState<BusinessType>("cafe");
  const [budget, setBudget] = useState("1500000");
  const [customBudget, setCustomBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Menganalisis kebutuhan bisnis...");
  const [concept, setConcept] = useState<PreviewConcept | null>(null);
  const [error, setError] = useState("");

  const selectedIndustry = useMemo(() => INDUSTRIES[businessType], [businessType]);

  useEffect(() => {
    if (!loading) return;

    const texts = [
      "Menganalisis kebutuhan bisnis...",
      "Memilih layout berdasarkan industri...",
      "Menyesuaikan visual dengan budget...",
      "Membuat section yang tidak generik...",
      "Menyiapkan CTA WhatsApp...",
    ];
    let index = 0;
    const timer = window.setInterval(() => {
      index = (index + 1) % texts.length;
      setLoadingText(texts[index]);
    }, 1600);

    return () => window.clearInterval(timer);
  }, [loading]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    setConcept(null);

    try {
      const response = await fetch("/api/website-preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          businessDesc,
          location,
          businessType,
          budget,
          customBudget: budget === "custom" ? customBudget : undefined,
        }),
      });

      const data = (await response.json()) as PreviewConcept | { error?: string };
      if (isApiError(data)) {
        throw new Error(data.error);
      }

      if (!response.ok) {
        throw new Error("Gagal menghubungkan ke server.");
      }

      setConcept(data as PreviewConcept);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan koneksi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-wrapper" style={{ background: "#020204", color: "#fff", minHeight: "100vh" }}>
      <Navbar />

      <main id="main-content" className="preview-page-shell">
        <div className="preview-container">
          <header className="preview-header">
            <span>Konsep Instan & Transparan</span>
            <h1>Website Preview + Budget Estimator</h1>
            <p>
              Isi detail bisnis, pilih kategori dan budget, lalu lihat preview yang komposisinya berubah sesuai industri. Bukan template yang hanya diganti nama.
            </p>
          </header>

          <div className="preview-builder-grid">
            <section className="preview-form-panel">
              <h2>1. Analisis Kebutuhan Bisnis</h2>
              <form onSubmit={handleSubmit} className="preview-form">
                <Field label="Nama Bisnis / Toko / Brand" htmlFor="name">
                  <input id="name" required value={businessName} onChange={(event) => setBusinessName(event.target.value)} placeholder="Contoh: Kopi Senja, Klinik Amanda, Bold Barbershop" />
                </Field>

                <Field label="Lokasi Usaha" htmlFor="location">
                  <input id="location" required value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Contoh: Kupang, Fatululi, Oebobo" />
                </Field>

                <div>
                  <label>Kategori Jenis Bisnis</label>
                  <div className="preview-choice-grid">
                    {BUSINESS_TYPES.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setBusinessType(type.value)}
                        className={businessType === type.value ? "is-selected" : ""}
                      >
                        <b>{type.icon}</b>
                        <span>{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <Field label="Deskripsi Singkat & Apa yang Dijual/Ditawarkan" htmlFor="desc">
                  <textarea
                    id="desc"
                    required
                    rows={3}
                    value={businessDesc}
                    onChange={(event) => setBusinessDesc(event.target.value)}
                    placeholder="Contoh: Menjual kopi susu aren, roti bakar, dan menyediakan tempat WFC dengan Wi-Fi."
                  />
                </Field>

                <div>
                  <label>Pilih Estimasi Target Budget</label>
                  <div className="preview-budget-grid">
                    {BUDGET_PRESETS.map((preset) => (
                      <button key={preset.value} type="button" onClick={() => setBudget(preset.value)} className={budget === preset.value ? "is-selected" : ""}>
                        <strong>{preset.label}</strong>
                        <small>{preset.desc}</small>
                      </button>
                    ))}
                  </div>
                </div>

                {budget === "custom" && (
                  <Field label="Masukkan Budget Kustom (Rupiah)" htmlFor="custom-budget">
                    <input id="custom-budget" type="number" required value={customBudget} onChange={(event) => setCustomBudget(event.target.value)} placeholder="Contoh: 4500000" />
                  </Field>
                )}

                <button type="submit" className="preview-submit" disabled={loading}>
                  {loading ? "Menganalisis Data..." : "Lihat Preview Website"}
                </button>
              </form>
            </section>

            <section className="preview-output-panel">
              {loading && <LoadingState text={loadingText} industry={selectedIndustry} />}
              {error && <ErrorState message={error} />}
              {!loading && !concept && !error && <IdleState industry={selectedIndustry} />}
              {concept && <PreviewResult concept={concept} industry={INDUSTRIES[concept.businessType]} />}
            </section>
          </div>
        </div>
      </main>

      <Footer />
      <div className="page-transition-overlay" />
      <SiteEffects />
      <PreviewStyles />
    </div>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  );
}

function LoadingState({ text, industry }: { text: string; industry: IndustryConfig }) {
  return (
    <div className="preview-state">
      <div className="preview-spinner" />
      <h3>{text}</h3>
      <p>Renderer sedang memilih komposisi visual untuk {industry.label}, termasuk hero, section, dan CTA yang sesuai.</p>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="preview-error">
      <strong>Terjadi Kendala</strong>
      <p>{message}</p>
    </div>
  );
}

function IdleState({ industry }: { industry: IndustryConfig }) {
  return (
    <div className="preview-idle">
      <div className="preview-idle-visual" style={{ backgroundImage: `linear-gradient(135deg, rgba(0,0,0,.08), rgba(0,0,0,.6)), url(${industry.heroImage})` }}>
        <span>{industry.galleryLabels[0]}</span>
      </div>
      <h3>Preview {industry.label} siap dirakit</h3>
      <p>Pilih budget dan isi detail bisnis untuk melihat bentuk website yang disesuaikan dengan kategori ini.</p>
    </div>
  );
}

function PreviewResult({ concept, industry }: { concept: PreviewConcept; industry: IndustryConfig }) {
  const palette = concept.colorPalette;

  return (
    <div className="preview-result">
      <div className="browser-frame">
        <div className="browser-bar">
          <span />
          <span />
          <span />
          <div>https://{slugify(concept.websiteName)}.siweb.id</div>
        </div>

        <article
          className={`website-canvas ${industry.heroClass} tier-${concept.budgetTier}`}
          style={{
            "--preview-primary": palette.primary,
            "--preview-secondary": palette.secondary,
            "--preview-accent": palette.accent,
            "--preview-bg": palette.background,
            "--preview-surface": palette.surface,
            "--preview-text": palette.text,
            "--preview-muted": palette.muted,
          } as React.CSSProperties}
        >
          <SiteNav concept={concept} industry={industry} />
          <IndustryHero concept={concept} industry={industry} />
          <IndustrySections concept={concept} industry={industry} />
        </article>
      </div>

      <BudgetBreakdown concept={concept} />
    </div>
  );
}

function SiteNav({ concept, industry }: { concept: PreviewConcept; industry: IndustryConfig }) {
  return (
    <nav className="site-preview-nav">
      <strong>{concept.websiteName}</strong>
      <div>
        {industry.nav.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </nav>
  );
}

function IndustryHero({ concept, industry }: { concept: PreviewConcept; industry: IndustryConfig }) {
  if (concept.businessType === "cafe") return <CafeHero concept={concept} industry={industry} />;
  if (concept.businessType === "clinic") return <ClinicHero concept={concept} industry={industry} />;
  if (concept.businessType === "barbershop") return <BarberHero concept={concept} industry={industry} />;
  if (concept.businessType === "laundry") return <LaundryHero concept={concept} industry={industry} />;
  if (concept.businessType === "workshop") return <WorkshopHero concept={concept} industry={industry} />;
  if (concept.businessType === "hotel") return <HotelHero concept={concept} industry={industry} />;
  if (concept.businessType === "school") return <SchoolHero concept={concept} industry={industry} />;
  return <CompanyHero concept={concept} industry={industry} />;
}

function CafeHero({ concept, industry }: { concept: PreviewConcept; industry: IndustryConfig }) {
  return (
    <section className="industry-hero cafe-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(42,22,11,.88), rgba(42,22,11,.38)), url(${industry.heroImage})` }}>
      <HeroCopy concept={concept} />
      <div className="menu-ticket">
        <span>Menu hari ini</span>
        {concept.sections[0]?.items.slice(0, 3).map((item) => <b key={item}>{splitItem(item)[0]}</b>)}
      </div>
    </section>
  );
}

function ClinicHero({ concept, industry }: { concept: PreviewConcept; industry: IndustryConfig }) {
  return (
    <section className="industry-hero clinic-hero">
      <div className="clinic-copy"><HeroCopy concept={concept} /></div>
      <div className="clinic-visual" style={{ backgroundImage: `linear-gradient(180deg, rgba(255,255,255,.1), rgba(8,127,140,.72)), url(${industry.heroImage})` }}>
        <span>{concept.hero.visualLabel}</span>
        <div><b>Jadwal</b><small>{concept.sections.find((section) => section.type === "schedule")?.items[0] || "Daftar via WhatsApp"}</small></div>
      </div>
    </section>
  );
}

function BarberHero({ concept, industry }: { concept: PreviewConcept; industry: IndustryConfig }) {
  return (
    <section className="industry-hero barber-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(17,24,39,.75), rgba(17,24,39,.18)), url(${industry.heroImage})` }}>
      <div className="barber-mark">{industry.glyph}</div>
      <HeroCopy concept={concept} />
    </section>
  );
}

function LaundryHero({ concept, industry }: { concept: PreviewConcept; industry: IndustryConfig }) {
  return (
    <section className="industry-hero laundry-hero">
      <HeroCopy concept={concept} />
      <div className="laundry-stack">
        {industry.galleryLabels.map((label, index) => <span key={label} style={{ transform: `translateX(${index * 14}px)` }}>{label}</span>)}
      </div>
    </section>
  );
}

function WorkshopHero({ concept, industry }: { concept: PreviewConcept; industry: IndustryConfig }) {
  return (
    <section className="industry-hero workshop-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(17,24,39,.92), rgba(17,24,39,.45)), url(${industry.heroImage})` }}>
      <HeroCopy concept={concept} />
      <div className="service-board">
        {concept.sections[0]?.items.slice(0, 4).map((item) => <span key={item}>{splitItem(item)[0]}</span>)}
      </div>
    </section>
  );
}

function CompanyHero({ concept, industry }: { concept: PreviewConcept; industry: IndustryConfig }) {
  return (
    <section className="industry-hero company-hero">
      <HeroCopy concept={concept} />
      <div className="company-panel" style={{ backgroundImage: `linear-gradient(180deg, rgba(15,23,42,.08), rgba(15,23,42,.62)), url(${industry.heroImage})` }}>
        <span>{concept.hero.visualLabel}</span>
      </div>
    </section>
  );
}

function HotelHero({ concept, industry }: { concept: PreviewConcept; industry: IndustryConfig }) {
  return (
    <section className="industry-hero hotel-hero" style={{ backgroundImage: `linear-gradient(180deg, rgba(15,61,62,.15), rgba(15,61,62,.72)), url(${industry.heroImage})` }}>
      <HeroCopy concept={concept} />
      <div className="booking-strip">
        <span>Check-in</span>
        <span>Tamu</span>
        <b>{concept.hero.cta}</b>
      </div>
    </section>
  );
}

function SchoolHero({ concept, industry }: { concept: PreviewConcept; industry: IndustryConfig }) {
  return (
    <section className="industry-hero school-hero">
      <div className="school-photo" style={{ backgroundImage: `url(${industry.heroImage})` }}><span>{concept.hero.visualLabel}</span></div>
      <HeroCopy concept={concept} />
    </section>
  );
}

function HeroCopy({ concept }: { concept: PreviewConcept }) {
  return (
    <div className="hero-copy">
      <span>{concept.hero.eyebrow}</span>
      <h2>{concept.hero.headline}</h2>
      <p>{concept.hero.subheadline}</p>
      <div className="hero-actions">
        <button>{concept.hero.cta}</button>
        <button>{concept.hero.secondaryCta}</button>
      </div>
    </div>
  );
}

function IndustrySections({ concept, industry }: { concept: PreviewConcept; industry: IndustryConfig }) {
  if (concept.businessType === "cafe") return <CafeSections concept={concept} industry={industry} />;
  if (concept.businessType === "clinic") return <ClinicSections concept={concept} industry={industry} />;
  if (concept.businessType === "barbershop") return <BarberSections concept={concept} industry={industry} />;
  if (concept.businessType === "laundry") return <LaundrySections concept={concept} industry={industry} />;
  if (concept.businessType === "workshop") return <WorkshopSections concept={concept} industry={industry} />;
  if (concept.businessType === "hotel") return <HotelSections concept={concept} industry={industry} />;
  if (concept.businessType === "school") return <SchoolSections concept={concept} industry={industry} />;
  return <CompanySections concept={concept} industry={industry} />;
}

function CafeSections({ concept, industry }: { concept: PreviewConcept; industry: IndustryConfig }) {
  return (
    <div className="section-flow cafe-flow">
      <AboutBand concept={concept} />
      <CardGrid sections={concept.sections.slice(0, concept.budgetTier === "starter" ? 2 : 3)} />
      <GalleryRail labels={industry.galleryLabels} />
      <CtaBand concept={concept} />
    </div>
  );
}

function ClinicSections({ concept, industry }: { concept: PreviewConcept; industry: IndustryConfig }) {
  return (
    <div className="section-flow clinic-flow">
      <CardGrid sections={concept.sections.filter((section) => section.type !== "cta")} />
      <GalleryRail labels={industry.galleryLabels} />
      <AboutBand concept={concept} />
      <CtaBand concept={concept} />
    </div>
  );
}

function BarberSections({ concept, industry }: { concept: PreviewConcept; industry: IndustryConfig }) {
  return (
    <div className="section-flow barber-flow">
      <GalleryRail labels={industry.galleryLabels} />
      <CardGrid sections={concept.sections} compact />
      <CtaBand concept={concept} />
    </div>
  );
}

function LaundrySections({ concept }: { concept: PreviewConcept; industry: IndustryConfig }) {
  return (
    <div className="section-flow laundry-flow">
      <ProcessStrip items={concept.sections.find((section) => section.type === "services")?.items || concept.sections[0]?.items || []} />
      <CardGrid sections={concept.sections.filter((section) => section.type !== "services")} />
      <CtaBand concept={concept} />
    </div>
  );
}

function WorkshopSections({ concept, industry }: { concept: PreviewConcept; industry: IndustryConfig }) {
  return (
    <div className="section-flow workshop-flow">
      <CardGrid sections={concept.sections.slice(0, 2)} compact />
      <GalleryRail labels={industry.galleryLabels} />
      <CardGrid sections={concept.sections.slice(2)} compact />
    </div>
  );
}

function CompanySections({ concept }: { concept: PreviewConcept; industry: IndustryConfig }) {
  return (
    <div className="section-flow company-flow">
      <AboutBand concept={concept} />
      <PortfolioLayout sections={concept.sections} />
      <CtaBand concept={concept} />
    </div>
  );
}

function HotelSections({ concept, industry }: { concept: PreviewConcept; industry: IndustryConfig }) {
  return (
    <div className="section-flow hotel-flow">
      <GalleryRail labels={industry.galleryLabels} />
      <CardGrid sections={concept.sections} />
      <CtaBand concept={concept} />
    </div>
  );
}

function SchoolSections({ concept, industry }: { concept: PreviewConcept; industry: IndustryConfig }) {
  return (
    <div className="section-flow school-flow">
      <AboutBand concept={concept} />
      <CardGrid sections={concept.sections.filter((section) => section.type !== "cta")} />
      <GalleryRail labels={industry.galleryLabels} />
      <CtaBand concept={concept} />
    </div>
  );
}

function AboutBand({ concept }: { concept: PreviewConcept }) {
  return (
    <section className="about-band">
      <span>{concept.typographyStyle}</span>
      <h3>{concept.about.title}</h3>
      <p>{concept.about.body}</p>
    </section>
  );
}

function CardGrid({ sections, compact = false }: { sections: PreviewSection[]; compact?: boolean }) {
  return (
    <div className={compact ? "industry-card-grid compact" : "industry-card-grid"}>
      {sections.map((section) => (
        <section key={section.title} className={`industry-section-card type-${section.type}`}>
          <small>{section.type}</small>
          <h3>{section.title}</h3>
          <p>{section.description}</p>
          <div>
            {section.items.slice(0, compact ? 3 : 5).map((item) => {
              const [title, detail] = splitItem(item);
              return (
                <article key={item}>
                  <b>{title}</b>
                  {detail && <span>{detail}</span>}
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

function GalleryRail({ labels }: { labels: string[] }) {
  return (
    <section className="gallery-rail">
      {labels.map((label, index) => (
        <div key={label} className={`gallery-tile tile-${index + 1}`}>
          <span>{label}</span>
        </div>
      ))}
    </section>
  );
}

function ProcessStrip({ items }: { items: string[] }) {
  return (
    <section className="process-strip">
      {items.slice(0, 5).map((item, index) => (
        <article key={item}>
          <b>{String(index + 1).padStart(2, "0")}</b>
          <span>{splitItem(item)[0]}</span>
        </article>
      ))}
    </section>
  );
}

function PortfolioLayout({ sections }: { sections: PreviewSection[] }) {
  return (
    <section className="portfolio-layout">
      {sections.map((section, index) => (
        <article key={section.title} className={index === 0 ? "is-large" : ""}>
          <small>{section.type}</small>
          <h3>{section.title}</h3>
          <p>{section.description}</p>
        </article>
      ))}
    </section>
  );
}

function CtaBand({ concept }: { concept: PreviewConcept }) {
  return (
    <section className="preview-site-cta">
      <div>
        <span>{concept.targetAudience}</span>
        <h3>{concept.hero.cta}</h3>
      </div>
      <button>{concept.hero.cta}</button>
    </section>
  );
}

function BudgetBreakdown({ concept }: { concept: PreviewConcept }) {
  return (
    <section className="budget-breakdown">
      <h3>Analisis Rencana Paket & Budget</h3>
      <div className="budget-meta">
        <Info title="Rekomendasi Paket" value={concept.recommendedPackage} />
        <Info title="Estimasi Pengerjaan" value={concept.estimatedTimeline} />
        <Info title="Kompleksitas" value={concept.complexityLevel} />
        <Info title="Tipe Preview" value={concept.budgetTier} />
      </div>

      <p className="budget-note">{concept.budgetExplanation}</p>

      <div className="feature-columns">
        <FeatureList title="Fitur Terintegrasi" tone="included" items={concept.featuresIncluded} />
        <FeatureList title="Belum Termasuk" tone="excluded" items={concept.featuresExcluded} />
      </div>

      <a className="whatsapp-cta" href={`https://wa.me/6281338219957?text=${encodeURIComponent(concept.whatsappMessage)}`} target="_blank" rel="noopener noreferrer">
        Konsultasi Via WhatsApp
      </a>
      <small>*Preview ini simulasi konsep awal. Hasil final mengikuti materi bisnis, foto, dan kebutuhan yang dikonfirmasi saat konsultasi.</small>
    </section>
  );
}

function Info({ title, value }: { title: string; value: string }) {
  return (
    <div>
      <span>{title}</span>
      <b>{value}</b>
    </div>
  );
}

function FeatureList({ title, tone, items }: { title: string; tone: "included" | "excluded"; items: string[] }) {
  return (
    <div className={tone}>
      <h4>{title}</h4>
      <ul>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

function splitItem(item: string) {
  const [title, ...rest] = item.split(" - ");
  return [title, rest.join(" - ")] as const;
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 36) || "website-bisnis";
}

function isApiError(value: PreviewConcept | { error?: string }): value is { error: string } {
  return "error" in value && typeof value.error === "string";
}

function PreviewStyles() {
  return (
    <style jsx global>{`
      .preview-page-shell { padding: 120px 0 80px; }
      .preview-container { width: min(1560px, calc(100% - 40px)); margin: 0 auto; }
      .preview-header { text-align: center; margin-bottom: 3.5rem; }
      .preview-header span { color: var(--color-primary); text-transform: uppercase; letter-spacing: 4px; font-size: .82rem; font-weight: 800; }
      .preview-header h1 { font-size: clamp(2rem, 5vw, 3.5rem); margin: .5rem 0 1rem; }
      .preview-header p { max-width: 760px; margin: 0 auto; color: var(--color-body); font-size: 1.05rem; line-height: 1.7; }
      .preview-builder-grid { display: grid; grid-template-columns: minmax(360px, 520px) minmax(720px, 1fr); gap: 44px; align-items: start; }
      .preview-form-panel, .budget-breakdown { background: rgba(255,255,255,.02); border: 1px solid rgba(255,255,255,.07); border-radius: 12px; padding: 28px; }
      .preview-form-panel h2 { font-size: 1.15rem; margin: 0 0 24px; padding-bottom: 14px; border-bottom: 1px solid rgba(255,255,255,.06); }
      .preview-form { display: grid; gap: 22px; }
      .preview-form label { display: block; color: #f8fafc; font-size: .9rem; font-weight: 700; margin-bottom: 9px; }
      .preview-form input, .preview-form textarea { width: 100%; border: 0; border-bottom: 1px solid rgba(255,255,255,.16); background: transparent; color: #fff; padding: 12px 0; outline: none; font: inherit; resize: vertical; }
      .preview-form input:focus, .preview-form textarea:focus { border-bottom-color: var(--color-primary); }
      .preview-form input::placeholder, .preview-form textarea::placeholder { color: rgba(255,255,255,.34); }
      .preview-choice-grid, .preview-budget-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(128px, 1fr)); gap: 10px; }
      .preview-choice-grid button, .preview-budget-grid button { min-height: 72px; text-align: left; border: 1px solid rgba(255,255,255,.08); border-radius: 8px; background: rgba(255,255,255,.015); color: #fff; padding: 12px; cursor: pointer; transition: .25s ease; }
      .preview-choice-grid button:hover, .preview-budget-grid button:hover, .preview-choice-grid .is-selected, .preview-budget-grid .is-selected { border-color: var(--color-primary); background: rgba(79,70,229,.16); }
      .preview-choice-grid b { display: inline-grid; place-items: center; width: 32px; height: 32px; border-radius: 999px; background: rgba(255,255,255,.08); color: var(--color-primary); font-size: .72rem; margin-bottom: 8px; }
      .preview-choice-grid span, .preview-budget-grid strong, .preview-budget-grid small { display: block; text-shadow: none; }
      .preview-choice-grid span { font-size: .8rem; font-weight: 700; }
      .preview-budget-grid strong { font-size: .82rem; }
      .preview-budget-grid small { color: var(--color-body); font-size: .72rem; margin-top: 3px; }
      .preview-submit { border: 0; border-radius: 6px; background: var(--color-primary); color: #fff; padding: 17px 20px; text-transform: uppercase; letter-spacing: 2px; font-weight: 800; cursor: pointer; }
      .preview-submit:disabled { opacity: .68; cursor: wait; }
      .preview-output-panel { min-width: 0; }
      .preview-state, .preview-idle, .preview-error { min-height: 360px; display: grid; place-items: center; text-align: center; gap: 12px; background: rgba(255,255,255,.02); border: 1px solid rgba(255,255,255,.07); border-radius: 12px; padding: 34px; }
      .preview-state p, .preview-idle p, .preview-error p { max-width: 440px; color: var(--color-body); margin: 0; }
      .preview-spinner { width: 48px; height: 48px; border-radius: 50%; border: 3px solid rgba(79,70,229,.2); border-top-color: var(--color-primary); animation: preview-spin 1s linear infinite; }
      .preview-error { place-items: start; text-align: left; min-height: auto; background: rgba(239,68,68,.1); color: #fecaca; border-color: rgba(239,68,68,.28); }
      .preview-idle-visual { width: min(100%, 460px); height: 210px; border-radius: 10px; background-size: cover; background-position: center; display: flex; align-items: end; padding: 18px; }
      .preview-idle-visual span { background: rgba(0,0,0,.56); color: #fff; padding: 8px 10px; border-radius: 6px; font-weight: 800; }
      .preview-result { display: grid; gap: 28px; width: 100%; }
      .browser-frame { border: 1px solid rgba(255,255,255,.1); border-radius: 12px; overflow: hidden; background: #111827; box-shadow: 0 28px 70px rgba(0,0,0,.42); }
      .browser-bar { display: grid; grid-template-columns: 10px 10px 10px 1fr; align-items: center; gap: 8px; padding: 12px 16px; background: rgba(0,0,0,.62); }
      .browser-bar span { width: 10px; height: 10px; border-radius: 50%; background: #ef4444; }
      .browser-bar span:nth-child(2) { background: #eab308; }
      .browser-bar span:nth-child(3) { background: #22c55e; }
      .browser-bar div { margin-left: 8px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: rgba(255,255,255,.46); font: 11px var(--font-mono); text-align: center; background: rgba(255,255,255,.05); border-radius: 5px; padding: 4px 10px; }
      .website-canvas { --preview-primary: #164e63; --preview-secondary: #94a3b8; --preview-accent: #c8a15a; --preview-bg: #fff; --preview-surface: #f3f4f6; --preview-text: #111827; --preview-muted: #6b7280; background: var(--preview-bg); color: var(--preview-text); min-height: 760px; text-shadow: none; }
      .website-canvas * { text-shadow: none !important; box-sizing: border-box; }
      .website-canvas h2, .website-canvas h3, .website-canvas h4 { color: var(--preview-text) !important; letter-spacing: 0; text-transform: none; line-height: 1.08; }
      .site-preview-nav { display: flex; justify-content: space-between; gap: 18px; align-items: center; padding: 18px 24px; background: color-mix(in srgb, var(--preview-bg) 82%, white); border-bottom: 1px solid color-mix(in srgb, var(--preview-text) 12%, transparent); }
      .site-preview-nav strong { color: var(--preview-primary); font-size: 1rem; }
      .site-preview-nav div { display: flex; gap: 16px; color: var(--preview-muted); font-size: .75rem; font-weight: 800; }
      .industry-hero { min-height: 520px; padding: 54px; display: grid; gap: 34px; background-size: cover; background-position: center; position: relative; overflow: hidden; }
      .hero-copy { max-width: 660px; align-self: center; position: relative; z-index: 2; }
      .hero-copy > span { color: var(--preview-accent); text-transform: uppercase; letter-spacing: 2px; font-size: .72rem; font-weight: 900; }
      .hero-copy h2 { margin: 10px 0 14px; font-size: clamp(2.25rem, 3.6vw, 4.4rem); }
      .hero-copy p { color: var(--preview-muted); line-height: 1.65; font-size: 1.03rem; max-width: 620px; }
      .hero-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 22px; }
      .hero-actions button, .preview-site-cta button { border: 0; border-radius: 6px; padding: 11px 16px; background: var(--preview-primary); color: #fff; font-weight: 900; cursor: default; }
      .hero-actions button:nth-child(2) { background: transparent; color: var(--preview-primary); border: 1px solid color-mix(in srgb, var(--preview-primary) 38%, transparent); }
      .cafe-hero { grid-template-columns: 1.2fr .8fr; color: #fff; }
      .cafe-hero h2, .cafe-hero p { color: #fff !important; }
      .menu-ticket { align-self: end; background: #fff7ed; color: #2a160b; padding: 20px; border-radius: 8px; display: grid; gap: 10px; box-shadow: 0 24px 60px rgba(0,0,0,.28); }
      .menu-ticket span { color: #7c3f18; font-weight: 900; text-transform: uppercase; font-size: .7rem; letter-spacing: 1px; }
      .menu-ticket b { border-top: 1px solid rgba(42,22,11,.15); padding-top: 10px; }
      .clinic-hero { grid-template-columns: minmax(0, 1.05fr) minmax(360px, .95fr); background: linear-gradient(120deg, #f7fbfc, #dff5f8); }
      .clinic-visual { min-height: 420px; border-radius: 10px; background-size: cover; background-position: center; padding: 22px; display: flex; flex-direction: column; justify-content: space-between; color: #fff; }
      .clinic-visual > span, .clinic-visual div { background: rgba(8,127,140,.78); padding: 10px 12px; border-radius: 6px; width: fit-content; }
      .clinic-visual div { display: grid; gap: 4px; }
      .clinic-visual small { color: rgba(255,255,255,.8); }
      .barber-hero { color: #fff; min-height: 460px; align-items: end; }
      .barber-hero h2, .barber-hero p { color: #fff !important; }
      .barber-mark { position: absolute; top: 28px; right: 34px; color: rgba(255,255,255,.16); font-weight: 900; font-size: 4.5rem; line-height: 1; }
      .laundry-hero { grid-template-columns: 1fr 280px; background: linear-gradient(135deg, #f2fbfd, #dff5f8); }
      .laundry-stack { display: grid; align-content: center; gap: 12px; }
      .laundry-stack span { background: #fff; border: 1px solid rgba(15,143,179,.16); color: #0f8fb3; padding: 18px; border-radius: 8px; box-shadow: 0 16px 34px rgba(15,143,179,.12); font-weight: 900; }
      .workshop-hero { color: #fff; grid-template-columns: 1fr 250px; }
      .workshop-hero h2, .workshop-hero p { color: #fff !important; }
      .service-board { align-self: center; border-left: 4px solid var(--preview-accent); background: rgba(0,0,0,.5); display: grid; }
      .service-board span { color: #fff; padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,.12); font-weight: 900; }
      .company-hero { grid-template-columns: minmax(0, 1fr) minmax(380px, .8fr); background: #f8fafc; }
      .company-panel { border-radius: 0; min-height: 420px; background-size: cover; background-position: center; display: flex; align-items: end; padding: 18px; }
      .company-panel span { color: #fff; background: rgba(15,23,42,.72); padding: 10px 12px; border-radius: 4px; font-weight: 900; }
      .hotel-hero { color: #fff; align-items: end; }
      .hotel-hero h2, .hotel-hero p { color: #fff !important; }
      .booking-strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(255,255,255,.35); align-self: end; max-width: 520px; }
      .booking-strip span, .booking-strip b { background: #fbf7ef; color: #0f3d3e; padding: 14px; font-weight: 900; }
      .booking-strip b { background: var(--preview-secondary); color: #1f2a24; }
      .school-hero { grid-template-columns: minmax(330px, .75fr) minmax(0, 1fr); background: linear-gradient(135deg, #f8fbff, #e8f0ff); }
      .school-photo { min-height: 420px; background-size: cover; background-position: center; border-radius: 12px; display: flex; align-items: end; padding: 16px; }
      .school-photo span { background: rgba(29,78,216,.78); color: #fff; border-radius: 6px; padding: 9px 12px; font-weight: 900; }
      .tier-starter .industry-hero { min-height: 430px; }
      .tier-starter .hero-copy h2 { font-size: clamp(2rem, 3vw, 3.35rem); }
      .tier-premium .industry-hero { min-height: 610px; }
      .section-flow { padding: 26px; display: grid; gap: 24px; }
      .about-band { display: grid; gap: 8px; padding: 24px; background: var(--preview-surface); border-left: 5px solid var(--preview-primary); }
      .about-band span { color: var(--preview-primary); font-weight: 900; text-transform: uppercase; font-size: .7rem; letter-spacing: 1px; }
      .about-band h3, .about-band p { margin: 0; }
      .about-band p, .industry-section-card p, .preview-site-cta span { color: var(--preview-muted); line-height: 1.6; }
      .industry-card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 14px; }
      .industry-card-grid.compact { grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); }
      .industry-section-card { border: 1px solid color-mix(in srgb, var(--preview-text) 10%, transparent); background: color-mix(in srgb, var(--preview-bg) 88%, white); padding: 18px; border-radius: 8px; }
      .industry-section-card small { color: var(--preview-accent); text-transform: uppercase; font-weight: 900; letter-spacing: 1px; }
      .industry-section-card h3 { margin: 7px 0; font-size: 1.2rem; }
      .industry-section-card article { display: grid; gap: 3px; padding: 10px 0; border-top: 1px solid color-mix(in srgb, var(--preview-text) 9%, transparent); }
      .industry-section-card article span { color: var(--preview-muted); font-size: .82rem; }
      .gallery-rail { display: grid; grid-template-columns: 1.25fr .9fr .9fr; gap: 12px; min-height: 160px; }
      .gallery-tile { display: flex; align-items: end; padding: 16px; border-radius: 8px; color: #fff; min-height: 130px; background: linear-gradient(135deg, var(--preview-primary), var(--preview-accent)); overflow: hidden; position: relative; }
      .gallery-tile:before { content: ""; position: absolute; inset: 0; opacity: .16; background: repeating-linear-gradient(45deg, #fff 0 1px, transparent 1px 12px); }
      .gallery-tile span { position: relative; font-weight: 900; }
      .tile-2 { background: linear-gradient(135deg, var(--preview-secondary), var(--preview-primary)); }
      .tile-3 { background: linear-gradient(135deg, var(--preview-accent), var(--preview-secondary)); }
      .process-strip { display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 10px; }
      .process-strip article { background: #fff; color: #10313a; padding: 14px; border-radius: 8px; border: 1px solid rgba(15,143,179,.16); }
      .process-strip b { color: var(--preview-primary); display: block; margin-bottom: 8px; }
      .portfolio-layout { display: grid; grid-template-columns: 1.4fr 1fr; gap: 12px; }
      .portfolio-layout article { min-height: 150px; background: var(--preview-surface); padding: 18px; display: flex; flex-direction: column; justify-content: end; border-radius: 4px; }
      .portfolio-layout article.is-large { grid-row: span 2; min-height: 310px; background: linear-gradient(135deg, var(--preview-primary), var(--preview-surface)); color: #fff; }
      .portfolio-layout article.is-large h3, .portfolio-layout article.is-large p { color: #fff !important; }
      .preview-site-cta { display: flex; align-items: center; justify-content: space-between; gap: 18px; background: var(--preview-text); color: var(--preview-bg); padding: 22px; border-radius: 8px; }
      .preview-site-cta h3 { color: var(--preview-bg) !important; margin: 4px 0 0; }
      .preview-site-cta button { background: var(--preview-accent); color: var(--preview-text); }
      .budget-breakdown h3 { font-size: 1.1rem; margin: 0 0 18px; color: var(--color-primary) !important; }
      .budget-meta { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
      .budget-meta div { background: rgba(255,255,255,.025); border: 1px solid rgba(255,255,255,.06); border-radius: 8px; padding: 14px; }
      .budget-meta span { display: block; color: var(--color-body); text-transform: uppercase; letter-spacing: 1px; font-size: .7rem; margin-bottom: 5px; }
      .budget-meta b { color: #fff; }
      .budget-note { margin: 18px 0; color: var(--color-body); line-height: 1.6; background: rgba(255,255,255,.025); border: 1px solid rgba(255,255,255,.06); border-radius: 8px; padding: 14px; }
      .feature-columns { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
      .feature-columns h4 { margin: 0 0 10px; font-size: .9rem; color: #fff !important; }
      .feature-columns ul { padding: 0; margin: 0; display: grid; gap: 8px; }
      .feature-columns li { color: var(--color-body); font-size: .82rem; line-height: 1.45; position: relative; padding-left: 16px; }
      .feature-columns li:before { content: ""; position: absolute; left: 0; top: .6em; width: 6px; height: 6px; border-radius: 50%; background: #22c55e; }
      .excluded li:before { background: #ef4444; }
      .whatsapp-cta { display: block; text-align: center; margin-top: 24px; background: #25d366; color: #fff; border-radius: 8px; padding: 16px; text-transform: uppercase; letter-spacing: 1.8px; font-weight: 900; }
      .budget-breakdown > small { display: block; color: var(--color-body); text-align: center; margin-top: 13px; line-height: 1.5; }
      @keyframes preview-spin { to { transform: rotate(360deg); } }
      @media (max-width: 1180px) {
        .preview-builder-grid { grid-template-columns: 1fr; }
        .industry-hero, .cafe-hero, .clinic-hero, .laundry-hero, .workshop-hero, .company-hero, .school-hero { grid-template-columns: 1fr; }
        .clinic-visual, .company-panel, .school-photo { min-height: 250px; }
      }
      @media (max-width: 640px) {
        .preview-container { width: min(100% - 24px, 1560px); }
        .preview-page-shell { padding-top: 96px; }
        .preview-form-panel, .budget-breakdown { padding: 20px; }
        .industry-hero { padding: 26px; }
        .site-preview-nav { align-items: flex-start; flex-direction: column; }
        .site-preview-nav div { flex-wrap: wrap; }
        .gallery-rail, .portfolio-layout, .budget-meta, .feature-columns { grid-template-columns: 1fr; }
        .booking-strip { grid-template-columns: 1fr; }
        .preview-site-cta { align-items: stretch; flex-direction: column; }
      }
    `}</style>
  );
}
