"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative py-16 overflow-hidden"
      style={{ background: "#0e0b0a" }}
    >
      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #EAB308, #991B1B, #EAB308, transparent)",
        }}
      />

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="footer-pat" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="20" fill="none" stroke="#EAB308" strokeWidth="0.5" />
              <path d="M40 20 Q50 30 40 40 Q30 30 40 20Z" fill="none" stroke="#EAB308" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-pat)" />
        </svg>
      </div>

      <div className="relative max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          {/* Logo area */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="text-3xl">🏮</div>
            <h2
              className="text-2xl font-bold"
              style={{ fontFamily: "var(--font-sora)", color: "#F5F0E8" }}
            >
              Mesa dos Amigos
            </h2>
            <div className="text-3xl">🪷</div>
          </div>
          <p
            className="text-sm italic"
            style={{ color: "#EAB308" }}
          >
            Sabores da Tailândia — Figueira da Foz
          </p>
        </motion.div>

        {/* Nav links */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 mb-10"
        >
          {[
            { label: "Especialidades", href: "#especialidades" },
            { label: "Ementa", href: "#menu" },
            { label: "Guia Picante", href: "#guia-picante" },
            { label: "Bebidas", href: "#bebidas" },
            { label: "Galeria", href: "#galeria" },
            { label: "Reservas", href: "#reservas" },
            { label: "Localização", href: "#localizacao" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm transition-colors hover:opacity-80"
              style={{ color: "rgba(245,240,232,0.55)", fontFamily: "var(--font-sora)" }}
            >
              {link.label}
            </a>
          ))}
        </motion.div>

        {/* Divider */}
        <div
          className="h-px mb-10"
          style={{ background: "rgba(245,240,232,0.08)" }}
        />

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          <div>
            <p className="text-xs" style={{ color: "rgba(245,240,232,0.35)" }}>
              © {year} Mesa dos Amigos. Todos os direitos reservados.
            </p>
            <p className="text-xs mt-1" style={{ color: "rgba(245,240,232,0.25)" }}>
              Figueira da Foz · Portugal · 9.2/10
            </p>
          </div>

          {/* Thai greeting */}
          <div className="text-center">
            <p
              className="text-sm font-semibold"
              style={{ color: "#EAB308", fontFamily: "var(--font-sora)" }}
            >
              ขอบคุณค่ะ
            </p>
            <p className="text-xs" style={{ color: "rgba(245,240,232,0.35)" }}>
              Khob khun kha — Obrigado
            </p>
          </div>

          <div>
            <p className="text-xs" style={{ color: "rgba(245,240,232,0.35)" }}>
              Website por{" "}
              <span style={{ color: "#EAB308" }}>Descomplicai</span>
            </p>
            <p className="text-xs mt-1" style={{ color: "rgba(245,240,232,0.2)" }}>
              A Tailândia Chegou à Figueira da Foz
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
