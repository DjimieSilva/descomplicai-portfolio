"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Facebook, Clock, ChevronUp } from "lucide-react";

const footerLinks = [
  { label: "A Nossa História", href: "#mercado" },
  { label: "Frescura do Mercado", href: "#frescura" },
  { label: "Especiais do Dia", href: "#especiais-do-dia" },
  { label: "Ementa", href: "#menu" },
  { label: "Prémios", href: "#premios" },
  { label: "Galeria", href: "#galeria" },
  { label: "Horário", href: "#horario" },
  { label: "Localização", href: "#localizacao" },
  { label: "Reservas", href: "#reservas" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#78350F] text-[#FEF3C7] py-16 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand column */}
          <div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-block mb-6"
            >
              <h2
                className="text-3xl font-black text-[#FEF3C7] leading-tight"
                style={{ fontFamily: "var(--font-public-sans)" }}
              >
                Casa dos
                <br />
                <span className="text-[#DC2626]">Papagaios</span>
              </h2>
            </motion.div>
            <p className="text-[#FEF3C7]/60 text-sm leading-relaxed mb-6" style={{ fontFamily: "var(--font-inter)" }}>
              Restaurante premiado no coração do Mercado Municipal da Figueira da Foz.
              Do mercado para o prato — todos os dias, com a máxima frescura.
            </p>
            {/* Social */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FEF3C7]/10 hover:bg-[#DC2626] text-[#FEF3C7] px-4 py-2 rounded-full text-sm font-bold transition-colors duration-200"
            >
              <Facebook size={16} />
              Facebook
            </a>
          </div>

          {/* Links column */}
          <div>
            <h3
              className="font-black text-[#FEF3C7] text-lg mb-5"
              style={{ fontFamily: "var(--font-public-sans)" }}
            >
              Navegação
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[#FEF3C7]/60 hover:text-[#DC2626] text-sm transition-colors duration-200"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact column */}
          <div>
            <h3
              className="font-black text-[#FEF3C7] text-lg mb-5"
              style={{ fontFamily: "var(--font-public-sans)" }}
            >
              Contactos
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#DC2626] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#FEF3C7]/90 text-sm font-semibold">Localização</p>
                  <p className="text-[#FEF3C7]/60 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                    Rua Engenheiro Silva 8-12<br />
                    3080-150 Figueira da Foz
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-[#DC2626] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#FEF3C7]/90 text-sm font-semibold">Telefone</p>
                  <a
                    href="tel:+351233435133"
                    className="text-[#FEF3C7]/60 hover:text-[#DC2626] text-sm transition-colors duration-200"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    +351 233 435 133
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-[#DC2626] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#FEF3C7]/90 text-sm font-semibold">Horário de Almoço</p>
                  <p className="text-[#FEF3C7]/60 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                    Segunda a Domingo<br />
                    12:00 — 15:30 / 16:00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#FEF3C7]/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-[#FEF3C7]/40 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                © {new Date().getFullYear()} Casa dos Papagaios · Mercado Municipal, Figueira da Foz
              </p>
              <p className="text-[#FEF3C7]/25 text-xs mt-1" style={{ fontFamily: "var(--font-inter)" }}>
                Website criado por{" "}
                <a
                  href="/"
                  className="hover:text-[#FEF3C7]/50 transition-colors duration-200"
                >
                  Descomplicai
                </a>
              </p>
            </div>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 bg-[#FEF3C7]/10 hover:bg-[#DC2626] text-[#FEF3C7] px-4 py-2 rounded-full text-sm font-bold transition-colors duration-200"
            >
              <ChevronUp size={16} />
              Voltar ao topo
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
