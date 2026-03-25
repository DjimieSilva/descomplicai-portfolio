"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Facebook, Heart } from "lucide-react";

const navLinks = [
  { label: "Conceito", href: "#concept" },
  { label: "Menu", href: "#menu" },
  { label: "Bar", href: "#drinks" },
  { label: "Eventos", href: "#events" },
  { label: "Galeria", href: "#gallery" },
  { label: "Horários", href: "#hours" },
  { label: "Localização", href: "#location" },
  { label: "Contacto", href: "#contact" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#060E1A] overflow-hidden">
      {/* Top wave */}
      <div className="absolute top-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,0 L0,0 Z"
            fill="#0A1628"
          />
        </svg>
      </div>

      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-[#0077B6]/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#FF6B35]/6 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-8">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/10">
          {/* Brand */}
          <div>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05 }}
              className="mb-4 cursor-pointer"
            >
              <h2
                className="text-5xl font-black text-white hover:text-[#FF6B35] transition-colors"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                NALU
              </h2>
            </motion.button>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              Bar de praia com alma. Petiscos frescos, cocktails tropicais e o
              pôr do sol mais bonito de Portugal.
            </p>
            <p className="text-[#FF6B35] text-xs font-bold tracking-wider uppercase">
              Onde o Mar Encontra o Sabor
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3
              className="text-white font-bold text-sm uppercase tracking-wider mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Navegação
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/50 text-sm hover:text-[#FF6B35] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3
              className="text-white font-bold text-sm uppercase tracking-wider mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Contacto
            </h3>
            <div className="space-y-3">
              <a
                href="https://maps.google.com/?q=Praia+de+Cabedelo+Figueira+da+Foz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group"
              >
                <MapPin size={16} className="text-[#FF6B35] shrink-0 mt-0.5" />
                <span className="text-white/50 text-sm group-hover:text-white/80 transition-colors leading-relaxed">
                  Praia de Cabedelo
                  <br />
                  3080-515 Figueira da Foz
                </span>
              </a>
              <a
                href="tel:+351233000000"
                className="flex items-center gap-3 group"
              >
                <Phone size={16} className="text-[#FF6B35] shrink-0" />
                <span className="text-white/50 text-sm group-hover:text-white/80 transition-colors">
                  +351 233 000 000
                </span>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <Facebook size={16} className="text-[#1877F2] shrink-0" />
                <span className="text-white/50 text-sm group-hover:text-white/80 transition-colors">
                  NALU Cabedelo
                </span>
              </a>
            </div>

            {/* Hours summary */}
            <div className="mt-5 p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-[#FFD700] text-xs font-bold mb-1">
                Aberto Hoje
              </p>
              <p className="text-white/70 text-xs">10:00 – 22:00</p>
              <p className="text-white/40 text-xs">
                Happy Hour: 16h–18h 🍹
              </p>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-white/30 text-xs text-center md:text-left">
            © 2025 NALU Cabedelo · Todos os direitos reservados
          </p>
          <p className="text-white/20 text-xs flex items-center gap-1">
            Website por{" "}
            <span className="text-white/40 font-semibold">Descomplicai</span>
            {" "}· Feito com{" "}
            <Heart size={10} className="text-[#FF6B35] fill-[#FF6B35] inline" />
            {" "}em Portugal
          </p>
        </div>
      </div>
    </footer>
  );
}
