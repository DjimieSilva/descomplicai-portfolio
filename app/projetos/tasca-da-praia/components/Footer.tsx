"use client";

import { motion } from "framer-motion";
import { Anchor, MapPin, Phone, Fish } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden" style={{ background: "#1E3A5F" }}>
      {/* Wave top */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" className="w-full" fill="#F9FAFB">
          <path d="M0,30 C360,0 720,60 1080,30 C1260,15 1380,45 1440,30 L1440,0 L0,0 Z" />
        </svg>
      </div>

      {/* Rope texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #C9B896 0px,
            #C9B896 1px,
            transparent 1px,
            transparent 14px
          )`,
        }}
      />

      <div className="max-w-6xl mx-auto px-6 pt-20 pb-10 relative">
        {/* Main footer content */}
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Anchor className="w-8 h-8 text-[#C9B896]" strokeWidth={1.5} />
              <div>
                <h3
                  className="text-xl font-black text-white leading-none"
                  style={{ fontFamily: "var(--font-merriweather)" }}
                >
                  Tasca Da Praia
                </h3>
                <p className="text-[#C9B896]/70 text-xs uppercase tracking-widest mt-0.5">
                  Buarcos
                </p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              Peixe fresco do dia, tradição de Buarcos.<br />
              Comida honesta, feita por gente honesta,<br />
              para quem sabe apreciar o que é real.
            </p>
            <div className="flex items-center gap-2 text-[#C9B896]/60 text-xs">
              <Fish className="w-3.5 h-3.5" />
              <span>Desde Buarcos, com o sabor do mar</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4
              className="text-white font-bold text-sm uppercase tracking-widest mb-5"
              style={{ fontFamily: "var(--font-merriweather)" }}
            >
              Na Tasca
            </h4>
            <ul className="space-y-3">
              {[
                { label: "A Nossa História", href: "#tradicao" },
                { label: "Peixe do Dia", href: "#peixe" },
                { label: "Ementa", href: "#menu" },
                { label: "A Família", href: "#familia" },
                { label: "Reservas", href: "#reservas" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/50 text-sm hover:text-[#C9B896] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#C9B896]/40 group-hover:bg-[#C9B896] transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-white font-bold text-sm uppercase tracking-widest mb-5"
              style={{ fontFamily: "var(--font-merriweather)" }}
            >
              Encontre-nos
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C9B896] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/70 text-sm">Rua dos Pescadores</p>
                  <p className="text-white/70 text-sm">Buarcos, 3080</p>
                  <p className="text-white/70 text-sm">Figueira da Foz</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C9B896] shrink-0" />
                <a
                  href="tel:+351233000000"
                  className="text-white/70 text-sm hover:text-[#C9B896] transition-colors"
                >
                  +351 233 000 000
                </a>
              </div>
            </div>

            {/* Hours summary */}
            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="text-[#C9B896]/70 text-xs uppercase tracking-wider mb-2 font-semibold">
                Horário
              </p>
              <p className="text-white/50 text-xs">Seg: Almoço | Ter–Dom: Almoço e Jantar</p>
              <p className="text-white/50 text-xs mt-1">Verão: Aberto todos os dias</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs text-center">
              © {currentYear} Tasca Da Praia — Buarcos, Figueira da Foz
            </p>
            <div className="flex items-center gap-2 text-white/20 text-xs">
              <span>Website por</span>
              <a
                href="https://descomplicai.pt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C9B896]/50 hover:text-[#C9B896] transition-colors"
              >
                Descomplicai
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
