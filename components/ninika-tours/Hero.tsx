"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  NAV_LINKS,
  HERO_TAGLINE,
  HERO_SUBTITLE,
  HERO_STATS,
  HERO_CTA_PRIMARY,
  HERO_CTA_SECONDARY,
} from "./data";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMenuOpen(false);
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    []
  );

  return (
    <>
      {/* ─── NAV ─── */}
      <nav
        className={`nk-nav ${scrolled ? "nk-nav--scrolled" : ""}`}
        aria-label="Navegação principal"
      >
        <div className="nk-container nk-nav-inner">
          <a href="#hero" className="nk-nav-logo">
            NinikaTours
          </a>

          <ul className="nk-nav-links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            className={`nk-hamburger ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* ─── MOBILE MENU ─── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nk-mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── HERO SECTION ─── */}
      <section id="hero" className="nk-hero nk-dark nk-grain">
        <div className="nk-container nk-hero-content">
          {/* Badge */}
          <motion.div
            className="nk-hero-badge"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            🌋 Vinhos Vulcânicos — Uma das 8 regiões do mundo
          </motion.div>

          {/* Title */}
          <motion.h1
            className="nk-hero-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
          >
            NinikaTours
            <span className="nk-hero-title-accent">Terceira</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="nk-hero-tagline"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
          >
            {HERO_TAGLINE}
          </motion.p>

          {/* Subtitle */}
          <motion.p
            className="nk-hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {HERO_SUBTITLE}
          </motion.p>

          {/* Stats */}
          <motion.div
            className="nk-hero-stats"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {HERO_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="nk-hero-stat"
                variants={fadeInUp}
                custom={i}
              >
                <div className="nk-hero-stat-value">{stat.value}</div>
                <div className="nk-hero-stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="nk-hero-ctas"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <a
              href="#reservar"
              className="nk-btn nk-btn-primary"
              onClick={(e) => handleNavClick(e, "#reservar")}
            >
              {HERO_CTA_PRIMARY}
            </a>
            <a
              href="#experiencias"
              className="nk-btn nk-btn-secondary"
              onClick={(e) => handleNavClick(e, "#experiencias")}
            >
              {HERO_CTA_SECONDARY}
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="nk-scroll-indicator" aria-hidden="true">
          <div className="nk-scroll-indicator-line" />
          <span>Descobre</span>
        </div>
      </section>
    </>
  );
}
