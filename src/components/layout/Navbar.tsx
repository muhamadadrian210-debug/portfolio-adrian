"use client";

import { useEffect, useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false);
    if (window.location.pathname === "/") {
      if (href === "/" || href === "/#hero" || href === "#hero") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const hash = href.includes("#") ? href.substring(href.indexOf("#")) : "";
      if (hash) {
        const target = document.querySelector(hash);
        const navbar = document.querySelector(".navbar");
        if (target) {
          e.preventDefault();
          const headerHeight = navbar instanceof HTMLElement ? navbar.offsetHeight : 0;
          const offsetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }
    }
  };

  return (
    <header className={`navbar${isOpen ? " navbar--open" : ""}${isScrolled ? " navbar--scrolled" : ""}`} role="banner">
      <div className="navbar__container">
        <a href="/" className="navbar__logo" aria-label="SiWeb by Sivilize - Beranda">
          <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", letterSpacing: "1px" }}>SiWeb<span style={{ color: "var(--color-primary)" }}>.</span></span>
        </a>
        <button className="navbar__hamburger" aria-label="Buka menu navigasi" aria-expanded={isOpen} onClick={() => setIsOpen((value) => !value)}>
          <span className="navbar__hamburger-line" />
          <span className="navbar__hamburger-line" />
          <span className="navbar__hamburger-line" />
        </button>
        <nav className="navbar__nav" id="mobile-menu" role="navigation" aria-label="Navigasi utama">
          <ul className="navbar__list">
            <li><a href="/" className="navbar__link" onClick={(e) => handleLinkClick(e, "/")}>Beranda</a></li>
            <li><a href="/demo" className="navbar__link">Showcase Demo</a></li>
            <li><a href="/#pricing" className="navbar__link" onClick={(e) => handleLinkClick(e, "/#pricing")}>Paket Layanan</a></li>
            <li><a href="/#umkm-gratis" className="navbar__link" onClick={(e) => handleLinkClick(e, "/#umkm-gratis")}>Program Gratis</a></li>
            <li><a href="https://wa.me/6281338219957" target="_blank" rel="noopener noreferrer" className="navbar__link" style={{ color: "#25D366" }}>Hubungi Kami</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
