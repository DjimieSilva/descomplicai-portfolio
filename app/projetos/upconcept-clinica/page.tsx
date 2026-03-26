"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Phone, Menu, X } from "lucide-react";

import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Technology from "./components/Technology";
import Team from "./components/Team";
import OpeningHours from "./components/OpeningHours";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const navItems = [
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Tecnologia", href: "#tecnologia" },
  { label: "Equipa", href: "#equipa" },
  { label: "Horários", href: "#horarios" },
  { label: "Contacto", href: "#contacto" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#111827]/95 backdrop-blur-md border-b border-white/10 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-2.5"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold text-white font-[family-name:var(--font-space-grotesk)]"
              style={{ background: "linear-gradient(135deg, #2563EB, #06B6D4)" }}
            >
              UC
            </div>
            <div>
              <p className="text-white font-bold font-[family-name:var(--font-space-grotesk)] text-sm leading-none">
                Upconcept
              </p>
              <p className="text-gray-500 text-xs font-[family-name:var(--font-inter-uc)]">
                Clínica Médica e Dentária
              </p>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNav(item.href)}
                className="text-gray-400 hover:text-white text-sm font-[family-name:var(--font-inter-uc)] transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-[#06B6D4] font-[family-name:var(--font-inter-uc)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
              7 dias/semana
            </div>
            <a
              href="#contacto"
              onClick={(e) => { e.preventDefault(); handleNav("#contacto"); }}
              className="px-4 py-2 rounded-lg text-sm font-semibold font-[family-name:var(--font-space-grotesk)] text-white transition-all duration-200 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #2563EB, #06B6D4)" }}
            >
              Marcar Consulta
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden w-9 h-9 rounded-lg border border-white/20 bg-white/5 flex items-center justify-center text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#111827]/98 backdrop-blur-md flex flex-col pt-24 px-6 pb-8"
          >
            <nav className="flex flex-col gap-2 flex-1">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => handleNav(item.href)}
                  className="text-left text-white text-xl font-semibold font-[family-name:var(--font-space-grotesk)] py-4 border-b border-white/10 hover:text-[#06B6D4] transition-colors duration-200"
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>

            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-sm text-[#06B6D4] font-[family-name:var(--font-inter-uc)]">
                <Clock className="w-4 h-4" />
                Abertos 7 dias/semana — incluindo domingos e feriados
              </div>
              <button
                onClick={() => handleNav("#contacto")}
                className="w-full py-4 rounded-xl font-bold font-[family-name:var(--font-space-grotesk)] text-white"
                style={{ background: "linear-gradient(135deg, #2563EB, #06B6D4)" }}
              >
                Marcar Consulta
              </button>
              <a
                href="tel:+351233000000"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-medium font-[family-name:var(--font-space-grotesk)] text-white border border-white/20 bg-white/5"
              >
                <Phone className="w-4 h-4" />
                Ligar Agora
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Floating WhatsApp button                                             */
/* ------------------------------------------------------------------ */
function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="https://wa.me/351233109109?text=Olá,%20gostaria%20de%20marcar%20uma%20consulta%20na%20Upconcept."
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl shadow-lg shadow-green-900/40 flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #16a34a, #15803d)" }}
          aria-label="Contactar via WhatsApp"
        >
          {/* WhatsApp SVG icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-7 h-7"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>

          {/* Ping animation */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-green-500 opacity-30"
            animate={{ scale: [1, 1.4, 1.4], opacity: [0.3, 0, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */
export default function UpcOnceptPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Technology />
        <OpeningHours />
        <Team />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
