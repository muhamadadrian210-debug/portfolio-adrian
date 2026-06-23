"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShowcaseSection } from "../siweb/page";
import { SiteEffects } from "@/components/runtime/SiteEffects";

export default function DemoPage() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main id="main-content">
        <div style={{ paddingTop: "120px" }}>
          <ShowcaseSection onOpenModal={() => {}} />
        </div>
      </main>
      <Footer />
      <div className="page-transition-overlay" />
      <SiteEffects />
    </div>
  );
}
