"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Phone, Mail, MapPin, Heart } from "lucide-react";

const navLinks = [
  { label: "Ementa", href: "#ementa" },
  { label: "Cocktails", href: "#cocktails" },
  { label: "Experiência", href: "#experiencia" },
  { label: "Eventos", href: "#eventos" },
  { label: "Reservas", href: "#reservas" },
  { label: "Localização", href: "#localizacao" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0806] relative overflow-hidden">
      {/* Top separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#DDB892]/20 to-transparent" />

      {/* Wave decoration at top */}
      <div className="relative">
        <svg viewBox="0 0 1440 40" className="w-full opacity-8" fill="none" preserveAspectRatio="none">
          <path
            d="M0,20 C300,0 600,40 900,20 C1100,8 1320,32 1440,20 L1440,40 L0,40 Z"
            fill="#DDB892"
            fillOpacity="0.05"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
          {/* Brand column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h3
                className="text-[#FAF8F4] text-2xl font-light mb-1"
                style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 200 }}
              >
                Pé na{" "}
                <span className="text-[#DDB892] italic" style={{ fontWeight: 300 }}>
                  Areia
                </span>
              </h3>
              <p
                className="text-[#DDB892]/40 text-[9px] tracking-[0.35em] uppercase mb-5"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Figueira da Foz · Praia
              </p>
              <p className="text-[#9A8C72] text-sm leading-relaxed mb-6 max-w-xs">
                Restaurante de praia icónico, distinguido pela Seleção Gastronomia
                e Vinhos. A mesa com melhor vista do Atlântico.
              </p>

              {/* Social */}
              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-[#DDB892]/15 flex items-center justify-center hover:border-[#DDB892]/40 hover:bg-[#DDB892]/8 transition-all duration-300 group"
                >
                  <Facebook className="w-3.5 h-3.5 text-[#9A8C72] group-hover:text-[#DDB892] transition-colors" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-[#DDB892]/15 flex items-center justify-center hover:border-[#DDB892]/40 hover:bg-[#DDB892]/8 transition-all duration-300 group"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#9A8C72] group-hover:text-[#DDB892] transition-colors" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Navigation column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <p
                className="text-[#DDB892]/50 text-[9px] tracking-[0.35em] uppercase mb-5"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Navegação
              </p>
              <nav className="grid grid-cols-2 gap-2">
                {navLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    className="text-[#9A8C72] text-sm hover:text-[#DDB892] transition-colors duration-200 py-0.5"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </motion.div>
          </div>

          {/* Contact column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <p
                className="text-[#DDB892]/50 text-[9px] tracking-[0.35em] uppercase mb-5"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Contactos
              </p>
              <div className="space-y-3">
                <a
                  href="tel:+351233104149"
                  className="flex items-center gap-3 text-[#9A8C72] hover:text-[#DDB892] transition-colors group"
                >
                  <Phone className="w-3.5 h-3.5 text-[#DDB892]/40 group-hover:text-[#DDB892] transition-colors flex-shrink-0" />
                  <span className="text-sm">+351 233 104 149</span>
                </a>
                <a
                  href="https://wa.me/351934352806"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#9A8C72] hover:text-[#DDB892] transition-colors group"
                >
                  <Phone className="w-3.5 h-3.5 text-[#DDB892]/40 group-hover:text-[#DDB892] transition-colors flex-shrink-0" />
                  <span className="text-sm">+351 934 352 806 (WhatsApp)</span>
                </a>
                <a
                  href="mailto:reservas@penaareia.pt"
                  className="flex items-center gap-3 text-[#9A8C72] hover:text-[#DDB892] transition-colors group"
                >
                  <Mail className="w-3.5 h-3.5 text-[#DDB892]/40 group-hover:text-[#DDB892] transition-colors flex-shrink-0" />
                  <span className="text-sm">reservas@penaareia.pt</span>
                </a>
                <div className="flex items-start gap-3 text-[#9A8C72]">
                  <MapPin className="w-3.5 h-3.5 text-[#DDB892]/40 flex-shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed">
                    Avenida Brasil 218, Praia de Buarcos
                    <br />
                    3080-323 Figueira da Foz
                  </span>
                </div>
              </div>

              {/* Hours quick ref */}
              <div className="mt-6 pt-5 border-t border-[#DDB892]/8">
                <p
                  className="text-[#DDB892]/40 text-[9px] tracking-[0.3em] uppercase mb-3"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  Horário
                </p>
                <p className="text-[#9A8C72] text-xs leading-relaxed">
                  Seg–Qui 12h–23h &nbsp;|&nbsp; Sex–Sáb 12h–00h
                  <br />
                  Domingo 12h–22h
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="h-px bg-[#DDB892]/8 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#9A8C72]/40 text-xs" style={{ fontFamily: "'Manrope', sans-serif" }}>
            © 2024 Pé na Areia · Todos os direitos reservados
          </p>
          <div className="flex items-center gap-1.5">
            <span className="text-[#9A8C72]/30 text-xs">Website por</span>
            <span className="text-[#DDB892]/50 text-xs" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Descomplicai
            </span>
            <Heart className="w-3 h-3 text-[#DDB892]/30" fill="#DDB892" fillOpacity={0.3} />
          </div>
        </div>
      </div>
    </footer>
  );
}
