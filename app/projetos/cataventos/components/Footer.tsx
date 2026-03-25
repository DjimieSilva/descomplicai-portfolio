"use client";

import { motion } from "framer-motion";
import { Award, Facebook, Phone, Mail, MapPin, ArrowUp } from "lucide-react";

export default function Footer() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="bg-[#0f1a28] text-[#FFFDF7] relative overflow-hidden">
      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent" />

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-3">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footer-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="#F59E0B" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-pattern)" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Main footer content */}
        <div className="py-16 grid md:grid-cols-3 gap-12 border-b border-[#FFFDF7]/8">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <h3
                className="text-2xl font-bold text-[#FFFDF7] mb-1"
                style={{ fontFamily: "'Work Sans', sans-serif" }}
              >
                Cataventos
              </h3>
              <p className="text-[#FFFDF7]/40 text-sm">Figueira da Foz</p>
            </div>
            <div className="flex items-center gap-2 bg-[#F59E0B]/10 border border-[#F59E0B]/25 rounded-sm px-4 py-3 mb-6 w-fit">
              <Award className="w-4 h-4 text-[#F59E0B] flex-shrink-0" />
              <span className="text-[#F59E0B] text-xs font-medium leading-tight">
                Seleção Gastronomia<br />e Vinhos
              </span>
            </div>
            <p className="text-[#FFFDF7]/50 text-sm leading-relaxed">
              Gastronomia portuguesa de excelência, distinguida e reconhecida pelos melhores guias
              gastronómicos do país.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[#F59E0B] text-xs font-semibold tracking-widest uppercase mb-5">
              Navegar
            </h4>
            <nav className="space-y-3">
              {[
                { href: "#história", label: "A Nossa História" },
                { href: "#distinções", label: "Distinções" },
                { href: "#ementa", label: "Ementa" },
                { href: "#vinhos", label: "Carta de Vinhos" },
                { href: "#chef", label: "A Nossa Equipa" },
                { href: "#galeria", label: "Galeria" },
                { href: "#reservas", label: "Reservas" },
                { href: "#localização", label: "Localização" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-[#FFFDF7]/55 hover:text-[#F59E0B] text-sm transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#F59E0B] text-xs font-semibold tracking-widest uppercase mb-5">
              Contacto
            </h4>
            <div className="space-y-4 mb-8">
              <a
                href="tel:+351233000000"
                className="flex items-center gap-3 text-[#FFFDF7]/55 hover:text-[#FFFDF7] text-sm transition-colors group"
              >
                <Phone className="w-4 h-4 text-[#F59E0B]/60 group-hover:text-[#F59E0B] transition-colors" />
                +351 233 000 000
              </a>
              <a
                href="mailto:reservas@cataventos.pt"
                className="flex items-center gap-3 text-[#FFFDF7]/55 hover:text-[#FFFDF7] text-sm transition-colors group"
              >
                <Mail className="w-4 h-4 text-[#F59E0B]/60 group-hover:text-[#F59E0B] transition-colors" />
                reservas@cataventos.pt
              </a>
              <div className="flex items-start gap-3 text-[#FFFDF7]/55 text-sm">
                <MapPin className="w-4 h-4 text-[#F59E0B]/60 flex-shrink-0 mt-0.5" />
                <span>Figueira da Foz, Portugal</span>
              </div>
            </div>

            {/* Social */}
            <div>
              <div className="text-[#FFFDF7]/30 text-xs uppercase tracking-wider mb-3">Redes Sociais</div>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#FFFDF7]/15 hover:border-[#F59E0B]/40 hover:text-[#F59E0B] text-[#FFFDF7]/55 px-4 py-2 rounded-sm text-sm transition-all"
              >
                <Facebook className="w-4 h-4" />
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#FFFDF7]/30 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Cataventos · Figueira da Foz · Todos os direitos reservados
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[#FFFDF7]/20 text-xs">Website por</span>
            <span className="text-[#F59E0B]/60 text-xs font-medium">Descomplicai</span>
            <button
              onClick={scrollToTop}
              aria-label="Voltar ao topo"
              className="ml-4 w-8 h-8 border border-[#FFFDF7]/15 hover:border-[#F59E0B]/40 rounded-sm flex items-center justify-center text-[#FFFDF7]/40 hover:text-[#F59E0B] transition-all"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
