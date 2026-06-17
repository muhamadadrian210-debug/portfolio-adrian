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
        <a href="/" className="navbar__logo" aria-label="Sivilize Corp - Beranda">
          <img src="/assets/images/logo.svg" alt="Sivilize Corp Logo" className="navbar__logo-image" />
        </a>
        <button className="navbar__hamburger" aria-label="Buka menu navigasi" aria-expanded={isOpen} onClick={() => setIsOpen((value) => !value)}>
          <span className="navbar__hamburger-line" />
          <span className="navbar__hamburger-line" />
          <span className="navbar__hamburger-line" />
        </button>
        <nav className="navbar__nav" id="mobile-menu" role="navigation" aria-label="Navigasi utama">
          <ul className="navbar__list">
            <li><a href="#hero" className="navbar__link navbar__link--active" onClick={() => handleLinkClick("#hero")}>Beranda</a></li>
            <li><a href="#ecosystem" className="navbar__link" onClick={() => handleLinkClick("#ecosystem")}>Ekosistem</a></li>
            <li><a href="#why-sivilize" className="navbar__link" onClick={() => handleLinkClick("#why-sivilize")}>Kenapa Sivilize</a></li>
            <li><a href="#services" className="navbar__link" onClick={() => handleLinkClick("#services")}>Layanan</a></li>
            <li><a href="#products" className="navbar__link" onClick={() => handleLinkClick("#products")}>Produk</a></li>
            <li><a href="/siweb" className="navbar__link">SiWeb</a></li>
            <li><a href="#contact" className="navbar__link" onClick={() => handleLinkClick("#contact")}>Kontak</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
