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

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    if (!href.startsWith("#")) return;
    const target = document.querySelector(href);
    const navbar = document.querySelector(".navbar");
    if (!target) return;
    const headerHeight = navbar instanceof HTMLElement ? navbar.offsetHeight : 0;
    const offsetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
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
            <li><a href="#hero" className="navbar__link navbar__link--active" onClick={() => handleLinkClick("#hero")}>Beranda</a></li>
            <li><a href="#pricing" className="navbar__link" onClick={() => handleLinkClick("#pricing")}>Paket Layanan</a></li>
            <li><a href="#umkm-gratis" className="navbar__link" onClick={() => handleLinkClick("#umkm-gratis")}>Program Gratis</a></li>
            <li><a href="https://wa.me/6281338219957" target="_blank" rel="noopener noreferrer" className="navbar__link" style={{ color: "#25D366" }}>Hubungi Kami</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
