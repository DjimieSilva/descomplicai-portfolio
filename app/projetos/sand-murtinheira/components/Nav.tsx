"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Menu as MenuIcon, X } from "lucide-react";

const links = [
  { label: "História", href: "#historia" },
  { label: "Ementa", href: "#ementa" },
  { label: "Chef", href: "#chef" },
  { label: "Localização", href: "#localizacao" },
  { label: "Reservas", href: "#reservas" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 60);
  });

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.8 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#1C1917]/95 backdrop-blur-md border-b border-[#FAF9F6]/8"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="font-['Playfair_Display'] text-[#FAF9F6] text-xl font-light tracking-widest">
            SAND
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#D4C5A9]/60 text-xs tracking-[0.2em] uppercase font-['Libre_Franklin'] hover:text-[#D4C5A9] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#reservas"
              className="ml-4 border border-[#92702B]/60 text-[#92702B] px-5 py-2 text-xs tracking-[0.2em] uppercase font-['Libre_Franklin'] hover:bg-[#92702B] hover:text-[#FAF9F6] transition-all duration-300"
            >
              Reservar
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-[#D4C5A9]/70 hover:text-[#D4C5A9] transition-colors"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            {open ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={open ? { opacity: 1, x: 0 } : { opacity: 0, x: "100%" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-40 bg-[#1C1917] flex flex-col items-center justify-center gap-8 md:hidden"
      >
        {links.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            onClick={() => setOpen(false)}
            initial={{ opacity: 0, y: 20 }}
            animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: open ? i * 0.07 : 0 }}
            className="font-['Playfair_Display'] text-[#FAF9F6] text-3xl font-light hover:text-[#D4C5A9] transition-colors duration-300"
          >
            {link.label}
          </motion.a>
        ))}
        <motion.a
          href="#reservas"
          onClick={() => setOpen(false)}
          initial={{ opacity: 0 }}
          animate={open ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: open ? 0.5 : 0 }}
          className="mt-4 border border-[#92702B] text-[#92702B] px-8 py-3 text-xs tracking-[0.3em] uppercase font-['Libre_Franklin']"
        >
          Reservar Mesa
        </motion.a>
      </motion.div>
    </>
  );
}
