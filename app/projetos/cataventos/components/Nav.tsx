"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Award, Menu, X } from "lucide-react";

const navLinks = [
  { href: "#história", label: "História" },
  { href: "#distinções", label: "Distinções" },
  { href: "#ementa", label: "Ementa" },
  { href: "#vinhos", label: "Vinhos" },
  { href: "#galeria", label: "Galeria" },
  { href: "#reservas", label: "Reservas" },
  { href: "#localização", label: "Localização" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 60);
  });

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#1E293B]/95 backdrop-blur-md border-b border-[#FFFDF7]/8 py-3"
            : "bg-transparent py-5"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <span
              className="text-xl font-bold text-[#FFFDF7] group-hover:text-[#F59E0B] transition-colors"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              Cataventos
            </span>
            <Award className="w-4 h-4 text-[#F59E0B]" />
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#FFFDF7]/65 hover:text-[#F59E0B] text-sm font-medium transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#reservas"
              className="ml-2 bg-[#F59E0B] hover:bg-[#B45309] text-[#1E293B] font-semibold text-sm px-5 py-2.5 rounded-sm transition-all duration-300 tracking-wide"
            >
              Reservar
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-[#FFFDF7]/70 hover:text-[#F59E0B] transition-colors"
            aria-label="Menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={open ? { opacity: 1, x: 0 } : { opacity: 0, x: "100%" }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-40 lg:hidden bg-[#1E293B]/98 backdrop-blur-md flex flex-col pt-24 px-8 pb-8"
      >
        <nav className="flex flex-col gap-2 flex-1">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, x: 20 }}
              animate={open ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.05 }}
              className="text-[#FFFDF7]/70 hover:text-[#F59E0B] text-2xl font-medium py-3 border-b border-[#FFFDF7]/8 transition-colors"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>
        <a
          href="#reservas"
          onClick={() => setOpen(false)}
          className="block text-center bg-[#F59E0B] text-[#1E293B] font-bold text-lg py-4 rounded-sm mt-6"
        >
          Reservar Mesa
        </a>
      </motion.div>
    </>
  );
}
