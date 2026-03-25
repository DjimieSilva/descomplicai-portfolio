"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
import Location from "./components/Location";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const navItems = [
  { label: "Sobre Nós", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Equipa", href: "#equipa" },
  { label: "Testemunhos", href: "#testemunhos" },
  { label: "Localização", href: "#localizacao" },
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

  // Close mobile menu on route change / link click
  function handleNavClick() {
    setMobileOpen(false);
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-[#E8D5C0]"
            : "bg-transparent"
        }`}
        role="banner"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-2 group"
              aria-label="Clínica Médico Dentária de Quiaios — voltar ao topo"
            >
              <div className="w-9 h-9 rounded-xl bg-[#C2703B] flex items-center justify-center shadow-sm">
                <svg
                  viewBox="0 0 32 32"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path
                    d="M8,8 C6,8 4,10 4,13 C4,16 5,19 7,22 C8,24 9,26 11,26 C12,26 13,24 13.5,22 C14,20 14,18 16,18 C18,18 18,20 18.5,22 C19,24 20,26 21,26 C23,26 24,24 25,22 C27,19 28,16 28,13 C28,10 26,8 24,8 C22,8 21,9 19.5,9 C18,9 17,8 16,8 C15,8 14,9 12.5,9 C11,9 10,8 8,8 Z"
                    fill="white"
                    fillOpacity="0.95"
                  />
                </svg>
              </div>
              <div className="hidden sm:block">
                <div
                  className={`font-extrabold text-sm leading-none transition-colors ${
                    scrolled ? "text-[#3D2B1F]" : "text-[#3D2B1F]"
                  }`}
                  style={{ fontFamily: "'Nunito Sans', sans-serif" }}
                >
                  Clínica Dentária
                </div>
                <div className="text-[#C2703B] text-xs font-bold leading-none mt-0.5">
                  de Quiaios
                </div>
              </div>
            </a>

            {/* Desktop nav */}
            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Navegação principal"
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-[#8B6F47] hover:text-[#C2703B] hover:bg-[#C2703B]/8 transition-all duration-150"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:934868049"
                className="flex items-center gap-2 bg-[#C2703B] hover:bg-[#A85E2E] text-white font-bold px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-150 text-sm"
              >
                <Phone className="w-4 h-4" />
                934 868 049
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-[#8B6F47] hover:bg-[#C2703B]/10 hover:text-[#C2703B] transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-white border-b border-[#E8D5C0] shadow-lg lg:hidden"
            role="dialog"
            aria-label="Menu de navegação móvel"
          >
            <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className="px-4 py-3 rounded-xl text-sm font-semibold text-[#3D2B1F] hover:bg-[#FFF8F0] hover:text-[#C2703B] transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="tel:934868049"
                onClick={handleNavClick}
                className="mt-2 flex items-center justify-center gap-2 bg-[#C2703B] text-white font-bold px-4 py-3 rounded-xl shadow-sm text-sm"
              >
                <Phone className="w-4 h-4" />
                934 868 049
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating WhatsApp button                                           */
/* ------------------------------------------------------------------ */
function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="https://wa.me/351934868049?text=Olá%2C+gostaria+de+marcar+uma+consulta+na+Clínica+Dentária+de+Quiaios."
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#1DB954] text-white font-bold px-5 py-3.5 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow"
          aria-label="Contactar via WhatsApp"
        >
          {/* WhatsApp icon */}
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 fill-white shrink-0"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          <span className="text-sm hidden sm:block">WhatsApp</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function ClinicaDentariaQuiaiosPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <Team />
        <Testimonials />
        <Location />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
