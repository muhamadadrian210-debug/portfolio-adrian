export type Project = {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  image: string;
  imageAlt: string;
  theme: "dark" | "light";
  accentColor: string;
  link: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: "sivilize-hub-pro",
    name: "Sivilize Hub Pro",
    description:
      "Dashboard digital untuk kontraktor dan tim proyek yang butuh kontrol biaya, analisis harga satuan, dan laporan real-time dengan alur kerja yang lebih terstruktur.",
    technologies: ["React", "Node.js", "MySQL", "Vercel"],
    image: "/assets/images/projects/sivilize-hub-pro.png",
    imageAlt: "Tampilan dashboard Sivilize Hub Pro dengan fitur AHSP Database",
    theme: "dark",
    accentColor: "#F7931E",
    link: "https://sivilize-hub-pro.vercel.app",
    featured: true,
  },
  {
    id: "sikasir",
    name: "SiKasir",
    description:
      "Solusi kasir digital untuk UMKM yang membutuhkan transaksi cepat, laporan sederhana, dan pengalaman pengguna praktis di berbagai perangkat.",
    technologies: ["PWA", "Express.js", "MySQL", "Railway"],
    image: "/assets/images/projects/sikasir.png",
    imageAlt: "Tampilan dashboard SiKasir aplikasi kasir supermarket berbasis PWA",
    theme: "dark",
    accentColor: "#F7931E",
    link: "https://sikasir-production.up.railway.app",
    featured: true,
  },
];
