"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, Leaf } from "lucide-react";

const navLinks = [
  { label: "Serviços", href: "#servicos" },
  { label: "Preços", href: "#precos" },
  { label: "Áreas", href: "#areas" },
  { label: "Contacto", href: "#contacto" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <Leaf className="h-7 w-7" style={{ color: "#16A34A" }} />
          <span
            className="text-xl font-bold"
            style={{ fontFamily: "var(--font-jakarta), sans-serif", color: "#16A34A" }}
          >
            JardimAlgarvio
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium transition-colors hover:text-[#16A34A]"
              style={{ color: "#1F2937" }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+351912345678"
            className="flex items-center gap-1.5 text-sm font-medium"
            style={{ color: "#1F2937" }}
          >
            <Phone className="h-4 w-4" style={{ color: "#16A34A" }} />
            +351 912 345 678
          </a>
          <a
            href="#contacto"
            className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-colors"
            style={{ backgroundColor: "#16A34A" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#15803D")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#16A34A")}
          >
            Pedir Orçamento
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg"
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
        >
          <Menu className="h-6 w-6" style={{ color: "#1F2937" }} />
        </button>
      </nav>

      {/* Mobile slide-in */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-2xl flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E7EB]">
                <span
                  className="text-lg font-bold"
                  style={{ fontFamily: "var(--font-jakarta), sans-serif", color: "#16A34A" }}
                >
                  JardimAlgarvio
                </span>
                <button onClick={() => setOpen(false)} aria-label="Fechar menu" className="p-1">
                  <X className="h-6 w-6" style={{ color: "#1F2937" }} />
                </button>
              </div>

              <div className="flex flex-col gap-1 px-5 py-6 flex-1">
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-[#DCFCE7]"
                    style={{ color: "#1F2937" }}
                  >
                    {l.label}
                  </a>
                ))}
              </div>

              <div className="px-5 pb-6 flex flex-col gap-3">
                <a
                  href="tel:+351912345678"
                  className="flex items-center justify-center gap-2 rounded-lg border py-3 text-sm font-semibold"
                  style={{ borderColor: "#16A34A", color: "#16A34A" }}
                >
                  <Phone className="h-4 w-4" />
                  +351 912 345 678
                </a>
                <a
                  href="#contacto"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center rounded-lg py-3 text-sm font-semibold text-white"
                  style={{ backgroundColor: "#16A34A" }}
                >
                  Pedir Orçamento
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
