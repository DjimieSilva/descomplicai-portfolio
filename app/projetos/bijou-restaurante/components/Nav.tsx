"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Phone, Menu, X } from "lucide-react";

const navLinks = [
  { label: "História", href: "#historia" },
  { label: "Ementa", href: "#menu" },
  { label: "Vinhos", href: "#adega" },
  { label: "Galeria", href: "#galeria" },
  { label: "Localização", href: "#localizacao" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 60);
  });

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(26,15,10,0.97)"
            : "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(207,181,59,0.15)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#top"
            className="flex flex-col leading-none"
          >
            <span
              className="text-2xl font-bold"
              style={{ fontFamily: "var(--font-eb-garamond)", color: "#FFFFF0" }}
            >
              Bijou
            </span>
            <span
              className="text-[0.55rem] tracking-[0.3em] uppercase"
              style={{ color: "#CFB53B", fontFamily: "var(--font-source-sans-3)" }}
            >
              Desde 1912
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs tracking-[0.2em] uppercase transition-colors hover:text-[#CFB53B]"
                style={{ color: "rgba(255,255,240,0.75)", fontFamily: "var(--font-source-sans-3)" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+351233434447"
              className="flex items-center gap-2 text-xs tracking-wide"
              style={{ color: "#CFB53B", fontFamily: "var(--font-source-sans-3)" }}
            >
              <Phone size={13} />
              233 434 447
            </a>
            <a
              href="#reservas"
              className="px-5 py-2 text-xs tracking-widest uppercase transition-all hover:scale-105"
              style={{
                background: "#800020",
                color: "#FFFFF0",
                fontFamily: "var(--font-source-sans-3)",
              }}
            >
              Reservar
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden"
            style={{ color: "#FFFFF0" }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-16 left-0 right-0 z-40 py-6 px-6"
          style={{ background: "rgba(26,15,10,0.98)", borderBottom: "1px solid rgba(207,181,59,0.2)" }}
        >
          <div className="space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm tracking-widest uppercase py-2"
                style={{ color: "rgba(255,255,240,0.8)", fontFamily: "var(--font-source-sans-3)" }}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t" style={{ borderColor: "rgba(207,181,59,0.2)" }}>
              <a
                href="#reservas"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center py-3 text-xs tracking-widest uppercase mt-3"
                style={{
                  background: "#800020",
                  color: "#FFFFF0",
                  fontFamily: "var(--font-source-sans-3)",
                }}
              >
                Reservar Mesa
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
