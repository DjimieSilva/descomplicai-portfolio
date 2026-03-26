"use client";

import { motion } from "framer-motion";
import { Anchor, MapPin, Phone, MessageCircle, Instagram, Clock, ArrowUp } from "lucide-react";

export default function Footer() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer style={{ backgroundColor: "#001f30" }}>
      {/* Main footer content */}
      <div className="px-6 md:px-12 pt-16 pb-10 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#D4A574" }}
              >
                <Anchor className="w-5 h-5 text-white" />
              </div>
              <div>
                <p
                  className="text-white font-bold text-lg leading-tight"
                  style={{ fontFamily: "Lexend, sans-serif" }}
                >
                  Marégrafo
                </p>
                <p className="text-[#B8E0D2]/60 text-xs">Buarcos · Figueira da Foz</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(184,224,210,0.6)" }}>
              Do mar para a mesa desde 1993.
              <br />
              Marisco fresco com vista Atlântico.
            </p>
            {/* Wave decoration */}
            <svg viewBox="0 0 120 20" className="w-24 opacity-30">
              <path
                fill="none"
                stroke="#B8E0D2"
                strokeWidth="1.5"
                d="M0,10 C20,0 40,20 60,10 C80,0 100,20 120,10"
              />
            </svg>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="font-bold text-white mb-4 text-sm"
              style={{ fontFamily: "Lexend, sans-serif" }}
            >
              O Restaurante
            </h4>
            <ul className="space-y-3">
              {[
                ["A Nossa História", "#historia"],
                ["Ementa", "#ementa"],
                ["Vista Mar", "#vista"],
                ["Galeria", "#galeria"],
                ["Localização", "#localizacao"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "rgba(184,224,210,0.6)" }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Horário */}
          <div>
            <h4
              className="font-bold text-white mb-4 text-sm"
              style={{ fontFamily: "Lexend, sans-serif" }}
            >
              Horário
            </h4>
            <div className="space-y-2 text-sm" style={{ color: "rgba(184,224,210,0.6)" }}>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-[#B8E0D2]" />
              </div>
              {[
                ["Segunda-feira", "Encerrado"],
                ["Ter – Sex", "12h–15h · 19h–22h"],
                ["Sábado", "12h–15h30 · 19h–22h30"],
                ["Domingo", "12h–16h"],
              ].map(([day, hours]) => (
                <div key={day} className="flex justify-between gap-4">
                  <span>{day}</span>
                  <span
                    className={hours === "Encerrado" ? "" : "text-[#B8E0D2]/80"}
                    style={hours === "Encerrado" ? { color: "#D4A574" } : {}}
                  >
                    {hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-bold text-white mb-4 text-sm"
              style={{ fontFamily: "Lexend, sans-serif" }}
            >
              Contactos
            </h4>
            <div className="space-y-3">
              <a
                href="tel:+351233433150"
                className="flex items-center gap-2 text-sm transition-colors hover:text-white"
                style={{ color: "rgba(184,224,210,0.6)" }}
              >
                <Phone className="w-4 h-4 text-[#B8E0D2]" />
                +351 233 433 150
              </a>
              <a
                href="mailto:rmanof@gmail.com"
                className="flex items-center gap-2 text-sm transition-colors hover:text-white"
                style={{ color: "rgba(184,224,210,0.6)" }}
              >
                <MessageCircle className="w-4 h-4 text-[#B8E0D2]" />
                rmanof@gmail.com
              </a>
              <a
                href="https://instagram.com/maregrafo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors hover:text-white"
                style={{ color: "rgba(184,224,210,0.6)" }}
              >
                <Instagram className="w-4 h-4 text-[#B8E0D2]" />
                @maregrafo
              </a>
              <div
                className="flex items-start gap-2 text-sm"
                style={{ color: "rgba(184,224,210,0.6)" }}
              >
                <MapPin className="w-4 h-4 text-[#B8E0D2] mt-0.5 flex-shrink-0" />
                <span>
                  Largo Maria Jarra 2
                  <br />
                  3080-261 Buarcos, Figueira da Foz
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider with wave */}
        <div className="relative mb-8">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full" style={{ borderTop: "1px solid rgba(184,224,210,0.1)" }} />
          </div>
          <div className="relative flex justify-center">
            <svg viewBox="0 0 80 14" className="w-20" style={{ backgroundColor: "#001f30" }}>
              <path
                fill="none"
                stroke="rgba(184,224,210,0.3)"
                strokeWidth="1"
                d="M0,7 C13,0 27,14 40,7 C53,0 67,14 80,7"
              />
            </svg>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs" style={{ color: "rgba(184,224,210,0.4)" }}>
            © {new Date().getFullYear()} Marégrafo · Buarcos, Figueira da Foz · Todos os direitos reservados
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs" style={{ color: "rgba(184,224,210,0.4)" }}>
              Website por{" "}
              <a
                href="https://descomplicai.pt"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#B8E0D2] transition-colors"
              >
                Descomplicai
              </a>
            </p>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ backgroundColor: "rgba(184,224,210,0.1)", color: "#B8E0D2" }}
              aria-label="Voltar ao topo"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
