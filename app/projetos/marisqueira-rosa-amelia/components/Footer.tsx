"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";

const navLinks = [
  { label: "Tradição", href: "#tradicao" },
  { label: "Marisco", href: "#marisco" },
  { label: "Ementa", href: "#ementa" },
  { label: "Vinhos", href: "#vinhos" },
  { label: "Galeria", href: "#galeria" },
  { label: "Reservas", href: "#reservas" },
  { label: "Localização", href: "#localizacao" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0f1f30] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-14">
          {/* Brand */}
          <div>
            <p className="text-[#D4A574]/50 text-[10px] tracking-[0.4em] uppercase mb-3"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              A Casa do Marisco
            </p>
            <h2
              className="text-[#FFF1E6] text-2xl font-light leading-tight mb-1"
              style={{ fontFamily: "var(--font-newsreader), serif" }}
            >
              Marisqueira
            </h2>
            <h2
              className="text-[#D4A574] text-2xl font-light italic leading-tight mb-5"
              style={{ fontFamily: "var(--font-newsreader), serif" }}
            >
              Rosa Amélia
            </h2>
            <p className="text-[#FFF1E6]/35 text-sm leading-relaxed max-w-xs">
              Desde 1978 na Figueira da Foz, a servir o melhor marisco
              fresco do Atlântico. Tradição, sabor e frescura no coração
              da Costa da Prata.
            </p>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              <a
                href="#"
                className="w-9 h-9 border border-[#D4A574]/25 rounded-full flex items-center justify-center text-[#D4A574]/60 hover:border-[#D4A574]/60 hover:text-[#D4A574] transition-colors"
              >
                <Instagram size={15} />
              </a>
              <a
                href="#"
                className="w-9 h-9 border border-[#D4A574]/25 rounded-full flex items-center justify-center text-[#D4A574]/60 hover:border-[#D4A574]/60 hover:text-[#D4A574] transition-colors"
              >
                <Facebook size={15} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[#D4A574]/50 text-[10px] tracking-[0.4em] uppercase mb-5"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              Navegação
            </p>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#FFF1E6]/45 text-sm hover:text-[#D4A574] transition-colors"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[#D4A574]/50 text-[10px] tracking-[0.4em] uppercase mb-5"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              Contactos
            </p>
            <div className="space-y-4">
              <a href="tel:+351233412288" className="flex items-start gap-3 group">
                <Phone className="w-4 h-4 text-[#D4A574]/50 mt-0.5 group-hover:text-[#D4A574] transition-colors flex-shrink-0" />
                <span className="text-[#FFF1E6]/45 text-sm group-hover:text-[#FFF1E6]/70 transition-colors">
                  +351 233 412 288
                </span>
              </a>
              <a href="mailto:verdadeira.ra@gmail.com" className="flex items-start gap-3 group">
                <Mail className="w-4 h-4 text-[#D4A574]/50 mt-0.5 group-hover:text-[#D4A574] transition-colors flex-shrink-0" />
                <span className="text-[#FFF1E6]/45 text-sm group-hover:text-[#FFF1E6]/70 transition-colors">
                  verdadeira.ra@gmail.com
                </span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4A574]/50 mt-0.5 flex-shrink-0" />
                <span className="text-[#FFF1E6]/45 text-sm">
                  Av. Dom João II, 2, Tamargueira<br />
                  3080-229 Figueira da Foz
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider with shell motif */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-[#D4A574]/10" />
          <svg width="20" height="18" viewBox="0 0 20 18" fill="none" className="text-[#D4A574]/30">
            <path
              d="M10,2 C15,2 18,6 18,10 C18,14 15,17 10,17 C5,17 2,14 2,10 C2,6 5,2 10,2 Z M10,2 L9.2,9 M10,2 L10.8,9 M10,2 L8,8 M10,2 L12,8 M10,2 L6.5,7 M10,2 L13.5,7"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
            />
          </svg>
          <div className="flex-1 h-px bg-[#D4A574]/10" />
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-[#FFF1E6]/20 text-xs"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            © {new Date().getFullYear()} Marisqueira Rosa Amélia · Todos os direitos reservados
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center gap-2"
          >
            <span className="text-[#FFF1E6]/15 text-xs"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              Website por
            </span>
            <span className="text-[#D4A574]/40 text-xs font-medium"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              Descomplicai
            </span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
