import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sivilize Corp | Ekosistem Digital untuk Bisnis",
  description:
    "Sivilize Corp adalah perusahaan digital Indonesia yang membangun ekosistem bisnis melalui Sivilize Hub Pro, SiKasir, dan layanan digital seperti website perusahaan, landing page, dan solusi custom.",
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
      </head>
      <body>
        <a href="#main-content" className="skip-link">Lewati ke konten utama</a>
        {children}
      </body>
    </html>
  );
}
