"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone, Instagram, Facebook, ArrowUp } from "lucide-react";

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer
      ref={ref}
      className="bg-[#171717] border-t border-white/5"
    >
      {/* Top section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4">
              <h3 className="font-[family-name:var(--font-space-grotesk)] font-black text-2xl text-white">
                Pé no{" "}
                <span className="text-[#EAB308]">Bairro</span>
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-[#A3A3A3] text-sm mt-1">
                Cozinha de Bairro com Alma
              </p>
            </div>
            <p className="font-[family-name:var(--font-inter)] text-[#A3A3A3] text-sm leading-relaxed max-w-xs">
              Um restaurante que nasceu do bairro, para o bairro. Comida
              portuguesa honesta, num espaço contemporâneo e acolhedor em
              Figueira da Foz.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-[family-name:var(--font-space-grotesk)] font-bold text-white text-sm tracking-widest uppercase mb-5">
              Navegar
            </h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "A Nossa Filosofia", href: "#" },
                { label: "Ementa", href: "#ementa" },
                { label: "Para Beber", href: "#" },
                { label: "O Ambiente", href: "#" },
                { label: "Reservas", href: "#reservas" },
                { label: "Localização", href: "#" },
                { label: "Horários", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-[family-name:var(--font-inter)] text-[#A3A3A3] text-sm hover:text-[#EAB308] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-[family-name:var(--font-space-grotesk)] font-bold text-white text-sm tracking-widest uppercase mb-5">
              Contacto
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href="tel:+351233000000"
                className="flex items-center gap-3 group"
              >
                <div className="w-8 h-8 bg-[#EAB308]/10 flex items-center justify-center group-hover:bg-[#EAB308]/20 transition-colors duration-200">
                  <Phone size={13} className="text-[#EAB308]" />
                </div>
                <span className="font-[family-name:var(--font-inter)] text-[#A3A3A3] text-sm group-hover:text-white transition-colors duration-200">
                  +351 233 000 000
                </span>
              </a>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#EAB308]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={13} className="text-[#EAB308]" />
                </div>
                <div>
                  <p className="font-[family-name:var(--font-inter)] text-[#A3A3A3] text-sm">
                    Rua do Bairro Novo, 42
                  </p>
                  <p className="font-[family-name:var(--font-inter)] text-[#A3A3A3] text-sm">
                    3080-000 Figueira da Foz
                  </p>
                </div>
              </div>

              {/* Social */}
              <div className="flex gap-3 pt-2">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 bg-white/[0.04] border border-white/[0.06] flex items-center justify-center hover:border-[#EAB308]/40 hover:text-[#EAB308] text-[#A3A3A3] transition-all duration-200"
                >
                  <Instagram size={15} />
                </a>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 bg-white/[0.04] border border-white/[0.06] flex items-center justify-center hover:border-[#EAB308]/40 hover:text-[#EAB308] text-[#A3A3A3] transition-all duration-200"
                >
                  <Facebook size={15} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <p className="font-[family-name:var(--font-inter)] text-[#A3A3A3]/50 text-xs">
              © 2024 Pé no Bairro. Todos os direitos reservados.
            </p>
            <span className="text-[#A3A3A3]/20 text-xs hidden sm:block">•</span>
            <p className="font-[family-name:var(--font-inter)] text-[#A3A3A3]/40 text-xs hidden sm:block">
              Site desenvolvido pela{" "}
              <a
                href="/"
                className="hover:text-[#EAB308] transition-colors duration-200"
              >
                Descomplicai
              </a>
            </p>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 font-[family-name:var(--font-space-grotesk)] text-xs text-[#A3A3A3]/50 hover:text-[#EAB308] transition-colors duration-200 group tracking-wide"
          >
            <span>Voltar ao topo</span>
            <div className="w-6 h-6 border border-white/10 flex items-center justify-center group-hover:border-[#EAB308]/40 transition-colors duration-200">
              <ArrowUp size={12} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
