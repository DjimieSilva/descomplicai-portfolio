"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Instagram, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#060F1A] text-white px-6 pt-20 pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-2">
              <span className="font-[family-name:var(--font-inter)] text-[#FB923C] text-xs tracking-[0.3em] uppercase">
                Da família Caçarola
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-hanken)] font-black text-4xl text-white mb-1">
              Caçarola
            </h2>
            <h2 className="font-[family-name:var(--font-hanken)] font-black text-4xl text-[#0369A1] mb-5">
              Dois
            </h2>
            <p className="font-[family-name:var(--font-inter)] text-white/35 text-sm leading-relaxed max-w-xs">
              O segundo capítulo da Caçarola — dedicado ao mar e aos frutos
              do oceano atlântico que abraça Figueira da Foz.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#0369A1]/30 flex items-center justify-center transition-colors duration-200"
              >
                <Instagram size={15} className="text-white/40 hover:text-white/80" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-[family-name:var(--font-hanken)] font-bold text-white text-sm mb-5 tracking-wide">
              Navegação
            </h3>
            <ul className="space-y-3">
              {[
                { label: "O Conceito", href: "#" },
                { label: "Ementa", href: "#ementa" },
                { label: "Carta de Vinhos", href: "#" },
                { label: "Galeria", href: "#" },
                { label: "Reservas", href: "#reservas" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-[family-name:var(--font-inter)] text-white/35 text-sm hover:text-[#FB923C] transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-[family-name:var(--font-hanken)] font-bold text-white text-sm mb-5 tracking-wide">
              Contacto
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://maps.google.com/?q=Rua+Bernardo+Lopes+85+Figueira+da+Foz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group"
                >
                  <MapPin size={14} className="text-[#FB923C] mt-0.5 flex-shrink-0" />
                  <span className="font-[family-name:var(--font-inter)] text-white/35 text-sm leading-snug group-hover:text-white/60 transition-colors">
                    Rua Bernardo Lopes 85-89
                    <br />
                    3080-395 Figueira da Foz
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+351233426930"
                  className="flex items-center gap-3 group"
                >
                  <Phone size={14} className="text-[#FB923C] flex-shrink-0" />
                  <span className="font-[family-name:var(--font-inter)] text-white/35 text-sm group-hover:text-white/60 transition-colors">
                    +351 233 426 930
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@cacaroladois.com"
                  className="flex items-center gap-3 group"
                >
                  <Mail size={14} className="text-[#FB923C] flex-shrink-0" />
                  <span className="font-[family-name:var(--font-inter)] text-white/35 text-sm group-hover:text-white/60 transition-colors">
                    info@cacaroladois.com
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="font-[family-name:var(--font-inter)] text-white/20 text-xs">
            © 2025 Caçarola Dois. Todos os direitos reservados.
            <span className="mx-2">·</span>
            Website criado pela{" "}
            <a
              href="/"
              className="text-[#0369A1]/60 hover:text-[#0369A1] transition-colors"
            >
              Descomplicai
            </a>
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-white/25 text-xs hover:text-[#FB923C] transition-colors duration-200 group self-start sm:self-auto"
            aria-label="Voltar ao topo"
          >
            <span>Topo</span>
            <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform duration-200" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
