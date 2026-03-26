"use client";

import { motion } from "framer-motion";
import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1B4332] border-t border-[#FFFBEB]/8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Main footer content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-16 grid grid-cols-1 md:grid-cols-4 gap-10"
        >
          {/* Brand */}
          <div className="md:col-span-2">
            <h3
              className="text-3xl font-light text-[#FFFBEB] mb-2"
              style={{ fontFamily: "var(--font-literata)" }}
            >
              O Picadeiro
            </h3>
            <div className="w-8 h-px bg-[#B87333] mb-4" />
            <p
              className="text-[#FFFBEB]/50 text-sm leading-relaxed max-w-xs mb-6"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Referência gastronómica da Figueira da Foz desde 1987. Cozinha
              portuguesa refinada, vinhos portugueses, hospitalidade genuína.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 border border-[#FFFBEB]/15 flex items-center justify-center text-[#FFFBEB]/40 hover:border-[#B87333] hover:text-[#B87333] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 border border-[#FFFBEB]/15 flex items-center justify-center text-[#FFFBEB]/40 hover:border-[#B87333] hover:text-[#B87333] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Horário */}
          <div>
            <h4
              className="text-xs tracking-[0.25em] uppercase text-[#B87333] mb-5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Horário
            </h4>
            <div
              className="space-y-2 text-sm text-[#FFFBEB]/50"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <div>
                <p className="text-[#FFFBEB]/70">Almoço</p>
                <p>Terça — Domingo</p>
                <p>12:30 — 15:00</p>
              </div>
              <div className="pt-2">
                <p className="text-[#FFFBEB]/70">Jantar</p>
                <p>Terça — Sábado</p>
                <p>19:00 — 22:30</p>
              </div>
              <p className="pt-2 text-[#FFFBEB]/30 text-xs">
                Encerrado às segundas-feiras
              </p>
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h4
              className="text-xs tracking-[0.25em] uppercase text-[#B87333] mb-5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Contacto
            </h4>
            <div
              className="space-y-4 text-sm text-[#FFFBEB]/50"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#B87333] shrink-0 mt-0.5" />
                <p>Rua Académico Zagalo 20<br />3080-161 Figueira da Foz</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#B87333] shrink-0" />
                <a
                  href="tel:+351233041157"
                  className="hover:text-[#B87333] transition-colors"
                >
                  +351 233 041 157
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#B87333] shrink-0" />
                <a
                  href="mailto:opicadeiro.ff@gmail.com"
                  className="hover:text-[#B87333] transition-colors"
                >
                  opicadeiro.ff@gmail.com
                </a>
              </div>
            </div>

            <a
              href="#reservas"
              className="mt-8 inline-flex items-center gap-2 bg-[#B87333] text-[#FFFBEB] px-6 py-3 text-xs tracking-[0.2em] uppercase hover:bg-[#FFFBEB] hover:text-[#1B4332] transition-colors duration-300"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Reservar Mesa
            </a>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-[#FFFBEB]/8 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p
            className="text-xs text-[#FFFBEB]/25"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            © {currentYear} O Picadeiro · Todos os direitos reservados
          </p>
          <p
            className="text-xs text-[#FFFBEB]/20"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Website por{" "}
            <a
              href="/"
              className="text-[#B87333]/50 hover:text-[#B87333] transition-colors"
            >
              Descomplicai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
