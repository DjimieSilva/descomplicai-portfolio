"use client";

import { motion } from "framer-motion";
import { Instagram, MapPin } from "lucide-react";

const navLinks = [
  { label: "História", href: "#" },
  { label: "Ementa", href: "#ementa" },
  { label: "Chef", href: "#" },
  { label: "Localização", href: "#localizacao" },
  { label: "Reservas", href: "#reservas" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1C1917] border-t border-[#FAF9F6]/8 px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div>
            <h3 className="font-['Playfair_Display'] text-[#FAF9F6] text-3xl font-light tracking-tight mb-3">SAND</h3>
            <p className="text-[#D4C5A9]/40 text-xs tracking-[0.25em] uppercase font-['Libre_Franklin'] mb-5">
              Murtinheira · Figueira da Foz
            </p>
            <div className="flex items-center gap-2">
              <span className="font-['Playfair_Display'] text-[#92702B] text-2xl font-light">9.7</span>
              <span className="text-[#D4C5A9]/40 text-xs font-['Libre_Franklin']">/ 10 · O mais bem avaliado da região</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[#D4C5A9]/40 text-xs tracking-[0.3em] uppercase font-['Libre_Franklin'] mb-5">Menu</p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#D4C5A9]/60 text-sm font-['Libre_Franklin'] hover:text-[#D4C5A9] transition-colors duration-300 font-light"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[#D4C5A9]/40 text-xs tracking-[0.3em] uppercase font-['Libre_Franklin'] mb-5">Contacto</p>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#92702B] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[#D4C5A9]/70 text-sm font-['Libre_Franklin'] font-light">Rua Marecos do Sul</p>
                  <p className="text-[#D4C5A9]/50 text-sm font-['Libre_Franklin'] font-light">3080-514 Quiaios, Figueira da Foz</p>
                </div>
              </div>
              <p className="text-[#D4C5A9]/70 text-sm font-['Libre_Franklin'] font-light">+351 233 103 189</p>
              <p className="text-[#D4C5A9]/70 text-sm font-['Libre_Franklin'] font-light">sandmurtinheira@gmail.com</p>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 border border-[#FAF9F6]/15 flex items-center justify-center text-[#D4C5A9]/50 hover:text-[#92702B] hover:border-[#92702B]/40 transition-all duration-300"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-[#FAF9F6]/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#D4C5A9]/30 text-xs font-['Libre_Franklin'] text-center md:text-left">
            © {new Date().getFullYear()} SAND Murtinheira. Todos os direitos reservados.
          </p>
          <p className="text-[#D4C5A9]/20 text-xs font-['Libre_Franklin'] text-center md:text-right">
            Ter — Dom: 19h00 – 23h00 · Almoço Sáb & Dom: 12h30 – 15h00
          </p>
        </div>
      </div>
    </footer>
  );
}
