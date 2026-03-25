"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";

const navLinks = [
  { label: "A Quinta", href: "#quinta" },
  { label: "Restaurante", href: "#restaurante" },
  { label: "Buffet", href: "#buffet" },
  { label: "Terraço", href: "#terraco" },
  { label: "Eventos", href: "#eventos" },
  { label: "Ementa", href: "#ementa" },
  { label: "Galeria", href: "#galeria" },
  { label: "Reservas", href: "#reservas" },
  { label: "Localização", href: "#localizacao" },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <footer
      ref={ref}
      style={{ background: "#1E1208" }}
    >
      {/* Top section */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "#722F37" }}
              >
                <span style={{ color: "#FEFCE8", fontFamily: "var(--font-libre-caslon)", fontWeight: 700, fontSize: "1rem" }}>Q</span>
              </div>
              <div>
                <p
                  className="font-bold leading-none"
                  style={{ fontFamily: "var(--font-libre-caslon)", color: "#FEFCE8", fontSize: "1.1rem" }}
                >
                  Quinta da Salmanha
                </p>
                <p
                  className="text-xs tracking-wide"
                  style={{ color: "#C4A55A", fontFamily: "var(--font-inter)" }}
                >
                  Restaurante &amp; Eventos
                </p>
              </div>
            </div>

            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: "rgba(254,252,232,0.55)", fontFamily: "var(--font-inter)", fontWeight: 300 }}
            >
              Uma quinta histórica junto ao Mondego, onde a tradição portuguesa se encontra
              com a natureza da Beira Litoral. O palco ideal para refeições memoráveis
              e celebrações inesquecíveis.
            </p>

            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ background: "rgba(254,252,232,0.08)", border: "1px solid rgba(254,252,232,0.12)" }}
                aria-label="Instagram"
              >
                <Instagram size={15} style={{ color: "#C4A55A" }} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ background: "rgba(254,252,232,0.08)", border: "1px solid rgba(254,252,232,0.12)" }}
                aria-label="Facebook"
              >
                <Facebook size={15} style={{ color: "#C4A55A" }} />
              </a>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <p
              className="text-xs tracking-[0.4em] uppercase mb-6"
              style={{ color: "#C4A55A", fontFamily: "var(--font-inter)" }}
            >
              Navegação
            </p>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm transition-colors duration-200 hover:text-[#C4A55A]"
                  style={{ color: "rgba(254,252,232,0.55)", fontFamily: "var(--font-inter)", fontWeight: 300 }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p
              className="text-xs tracking-[0.4em] uppercase mb-6"
              style={{ color: "#C4A55A", fontFamily: "var(--font-inter)" }}
            >
              Contactos
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={14} style={{ color: "#722F37", flexShrink: 0, marginTop: 2 }} />
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(254,252,232,0.55)", fontFamily: "var(--font-inter)", fontWeight: 300 }}
                >
                  Estrada Nacional 111, Salmanha<br />
                  3080-000 Figueira da Foz
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} style={{ color: "#722F37", flexShrink: 0 }} />
                <a
                  href="tel:+351239000000"
                  className="text-sm transition-colors duration-200 hover:text-[#C4A55A]"
                  style={{ color: "rgba(254,252,232,0.55)", fontFamily: "var(--font-inter)", fontWeight: 300 }}
                >
                  +351 239 000 000
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} style={{ color: "#722F37", flexShrink: 0 }} />
                <a
                  href="mailto:geral@quintadasalmanha.pt"
                  className="text-sm transition-colors duration-200 hover:text-[#C4A55A]"
                  style={{ color: "rgba(254,252,232,0.55)", fontFamily: "var(--font-inter)", fontWeight: 300 }}
                >
                  geral@quintadasalmanha.pt
                </a>
              </div>
            </div>

            <div
              className="mt-6 p-4 rounded-sm"
              style={{ background: "rgba(114,47,55,0.15)", border: "1px solid rgba(114,47,55,0.25)" }}
            >
              <p
                className="text-xs tracking-[0.3em] uppercase mb-2"
                style={{ color: "#C4A55A", fontFamily: "var(--font-inter)" }}
              >
                Reservas
              </p>
              <a
                href="#reservas"
                className="text-sm font-medium transition-colors duration-200 hover:text-[#C4A55A]"
                style={{ color: "#FEFCE8", fontFamily: "var(--font-inter)" }}
              >
                reservas@quintadasalmanha.pt
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Gold divider */}
      <div
        className="h-px mx-6 lg:mx-12"
        style={{ background: "linear-gradient(90deg, transparent, rgba(196,165,90,0.3) 30%, rgba(196,165,90,0.3) 70%, transparent)" }}
      />

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p
          className="text-xs text-center sm:text-left"
          style={{ color: "rgba(254,252,232,0.3)", fontFamily: "var(--font-inter)" }}
        >
          © 2025 Quinta da Salmanha · Todos os direitos reservados
        </p>
        <p
          className="text-xs text-center sm:text-right"
          style={{ color: "rgba(254,252,232,0.2)", fontFamily: "var(--font-inter)" }}
        >
          NIF: 500 000 000 · Registo de Turismo: RNET/XXXXX
        </p>
      </div>
    </footer>
  );
}
