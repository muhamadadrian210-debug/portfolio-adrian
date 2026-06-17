import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SiteEffects } from "@/components/runtime/SiteEffects";
import { homeMainHtml } from "@/content/home";

export default function Home() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main id="main-content" dangerouslySetInnerHTML={{ __html: homeMainHtml }} />
      <Footer />
      <div className="page-transition-overlay" />
      <SiteEffects />
    </div>
  );
}
