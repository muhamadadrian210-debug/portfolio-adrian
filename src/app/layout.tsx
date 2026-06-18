import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sivilize.my.id"),
  title: {
    default: "SiWeb by Sivilize | Jasa Pembuatan Website & Digitalisasi Ritel UMKM Terbaik",
    template: "%s | SiWeb by Sivilize"
  },
  description:
    "Jasa pembuatan website profesional, landing page modern, dan sistem kasir/operasional taktis dari SiWeb by Sivilize. Solusi digitalisasi UMKM, toko ritel, cafe, dan bisnis lokal agar lebih unggul dari kompetitor.",
  keywords: [
    "jasa pembuatan website",
    "jasa website profesional",
    "jasa landing page",
    "sivilize",
    "siweb",
    "sivilize corp",
    "digitalisasi umkm",
    "jasa pembuatan website ritel",
    "pembuatan website toko online",
    "pembuatan website cafe",
    "jasa seo murah",
    "agency web developer indonesia",
    "website custom murah",
    "jasa pembuatan web terbaik"
  ],
  authors: [{ name: "Sivilize Corp" }],
  creator: "Sivilize Corp",
  publisher: "Sivilize Corp",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://sivilize.my.id/siweb",
    title: "SiWeb by Sivilize | Jasa Pembuatan Website & Digitalisasi Ritel UMKM Terbaik",
    description: "Tingkatkan penjualan bisnis Anda dengan website profesional, responsif, dan super cepat dari SiWeb by Sivilize. Khusus UMKM, toko, ritel, dan bisnis lokal.",
    siteName: "SiWeb by Sivilize",
    images: [
      {
        url: "/assets/images/siweb-logo.svg",
        width: 800,
        height: 600,
        alt: "SiWeb by Sivilize Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SiWeb by Sivilize | Jasa Pembuatan Website Profesional",
    description: "Jasa pembuatan website profesional, landing page, dan digitalisasi ritel UMKM dari Sivilize Corp.",
    images: ["/assets/images/siweb-logo.svg"],
  },
  alternates: {
    canonical: "/siweb",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebDesignService",
              "name": "SiWeb by Sivilize",
              "description": "Jasa pembuatan website profesional, landing page modern, dan sistem kasir/operasional taktis dari SiWeb by Sivilize. Solusi digitalisasi UMKM, toko ritel, cafe, dan bisnis lokal.",
              "url": "https://sivilizecorp.vercel.app/",
              "logo": "https://sivilizecorp.vercel.app/assets/images/siweb-logo.svg",
              "priceRange": "Rp 800.000 - Rp 4.500.000",
              "provider": {
                "@type": "Organization",
                "name": "Sivilize Corp",
                "url": "https://sivilizecorp.vercel.app"
              },
              "areaServed": {
                "@type": "Country",
                "name": "Indonesia"
              },
              "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "IDR",
                "lowPrice": "800000",
                "highPrice": "4500000",
                "offerCount": "4"
              }
            })
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Lewati ke konten utama</a>
        {children}
      </body>
    </html>
  );
}
