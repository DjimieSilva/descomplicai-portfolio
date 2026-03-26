"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Car, Bus, Anchor, Navigation } from "lucide-react";

const accessMethods = [
  {
    icon: Car,
    title: "De Carro",
    desc: "A 8 km do centro de Figueira da Foz, pela N111 em direção a Montemor-o-Velho. Siga as indicações para Quinta da Salmanha.",
    detail: "Estacionamento gratuito para 80 viaturas",
  },
  {
    icon: Bus,
    title: "Transporte Público",
    desc: "Autocarros da linha Figueira — Montemor param a 500m da entrada da Quinta. Horários disponíveis na recepção.",
    detail: "Paragem: Salmanha (Cruzamento)",
  },
  {
    icon: Anchor,
    title: "Via Fluvial",
    desc: "Para grupos e eventos especiais, oferecemos transporte fluvial desde o Cais da Figueira da Foz mediante reserva prévia.",
    detail: "Disponível para grupos +20 pax",
  },
];

export default function Location() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="localizacao"
      className="py-24 md:py-36 relative overflow-hidden"
      style={{ background: "#2D3A1E" }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-16"
        >
          <p
            className="text-xs tracking-[0.45em] uppercase mb-4"
            style={{ color: "#C4A55A", fontFamily: "var(--font-inter)" }}
          >
            Como Chegar
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-libre-caslon)", color: "#FEFCE8" }}
          >
            Encontre-nos
          </h2>
          <div className="w-16 h-[2px] mx-auto" style={{ background: "#722F37" }} />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
          >
            {/* Stylised map illustration */}
            <div
              className="relative rounded-sm overflow-hidden aspect-[4/3]"
              style={{ background: "rgba(254,252,232,0.05)", border: "1px solid rgba(196,165,90,0.2)" }}
            >
              <svg viewBox="0 0 400 300" className="w-full h-full">
                {/* River */}
                <path
                  d="M0 180 C80 160 120 200 200 170 C280 140 320 185 400 165"
                  fill="none"
                  stroke="rgba(74,122,155,0.6)"
                  strokeWidth="22"
                  strokeLinecap="round"
                />
                <path
                  d="M0 180 C80 160 120 200 200 170 C280 140 320 185 400 165"
                  fill="none"
                  stroke="rgba(93,155,196,0.4)"
                  strokeWidth="18"
                  strokeLinecap="round"
                />
                {/* Roads */}
                <path d="M0 100 L400 110" stroke="rgba(168,162,158,0.4)" strokeWidth="6" />
                <path d="M200 0 L195 300" stroke="rgba(168,162,158,0.3)" strokeWidth="4" />
                {/* Quinta marker */}
                <circle cx="160" cy="145" r="18" fill="rgba(114,47,55,0.8)" />
                <circle cx="160" cy="145" r="10" fill="#722F37" />
                <circle cx="160" cy="145" r="5" fill="#FEFCE8" />
                {/* Quinta label */}
                <text x="145" y="125" fontSize="9" fill="#FEFCE8" fontFamily="serif" textAnchor="middle">
                  Quinta da
                </text>
                <text x="145" y="115" fontSize="9" fill="#C4A55A" fontFamily="serif" textAnchor="middle">
                  Salmanha
                </text>
                {/* Figueira label */}
                <text x="320" y="140" fontSize="8" fill="rgba(254,252,232,0.5)" fontFamily="sans-serif" textAnchor="middle">
                  Figueira da Foz
                </text>
                <circle cx="320" cy="150" r="4" fill="rgba(254,252,232,0.3)" />
                {/* Distance label */}
                <text x="235" y="105" fontSize="7" fill="rgba(196,165,90,0.8)" fontFamily="sans-serif">
                  8 km
                </text>
                {/* River label */}
                <text x="200" y="190" fontSize="9" fill="rgba(74,122,155,0.9)" fontFamily="serif" textAnchor="middle" fontStyle="italic">
                  Rio Mondego
                </text>
                {/* Compass */}
                <g transform="translate(360, 30)">
                  <circle cx="0" cy="0" r="14" fill="rgba(254,252,232,0.05)" stroke="rgba(196,165,90,0.3)" strokeWidth="0.8" />
                  <text x="0" y="-6" fontSize="7" fill="#C4A55A" fontFamily="sans-serif" textAnchor="middle">N</text>
                  <path d="M0 -10 L-3 5 L0 2 L3 5 Z" fill="#C4A55A" />
                </g>
              </svg>

              {/* CTA overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 text-sm tracking-wide transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: "#722F37",
                    color: "#FEFCE8",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  <Navigation size={14} />
                  Abrir no Google Maps
                </a>
              </div>
            </div>

            {/* Address */}
            <div
              className="mt-4 p-5 rounded-sm flex items-start gap-4"
              style={{ background: "rgba(254,252,232,0.05)", border: "1px solid rgba(196,165,90,0.15)" }}
            >
              <MapPin size={18} style={{ color: "#C4A55A", flexShrink: 0, marginTop: 2 }} />
              <div>
                <p
                  className="font-medium mb-1"
                  style={{ color: "#FEFCE8", fontFamily: "var(--font-libre-caslon)", fontSize: "1.05rem" }}
                >
                  Quinta da Salmanha
                </p>
                <p
                  className="text-sm"
                  style={{ color: "rgba(254,252,232,0.65)", fontFamily: "var(--font-inter)", fontWeight: 300 }}
                >
                  Rua da Salmanha 18, 3090-650 Vila Verde<br />
                  Figueira da Foz<br />
                  Coimbra, Portugal
                </p>
              </div>
            </div>
          </motion.div>

          {/* Access methods */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="space-y-6"
          >
            {accessMethods.map((method, i) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                className="p-6 rounded-sm"
                style={{
                  background: "rgba(254,252,232,0.04)",
                  border: "1px solid rgba(254,252,232,0.08)",
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(196,165,90,0.15)", border: "1px solid rgba(196,165,90,0.3)" }}
                  >
                    <method.icon size={16} style={{ color: "#C4A55A" }} />
                  </div>
                  <div>
                    <h3
                      className="font-semibold mb-2"
                      style={{ fontFamily: "var(--font-libre-caslon)", color: "#FEFCE8", fontSize: "1.05rem" }}
                    >
                      {method.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed mb-3"
                      style={{ color: "rgba(254,252,232,0.65)", fontFamily: "var(--font-inter)", fontWeight: 300 }}
                    >
                      {method.desc}
                    </p>
                    <span
                      className="text-xs tracking-wide px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(196,165,90,0.12)",
                        color: "#C4A55A",
                        fontFamily: "var(--font-inter)",
                        border: "1px solid rgba(196,165,90,0.2)",
                      }}
                    >
                      {method.detail}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Surrounding area note */}
            <div
              className="p-6 rounded-sm"
              style={{ background: "rgba(114,47,55,0.15)", border: "1px solid rgba(114,47,55,0.3)" }}
            >
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(254,252,232,0.75)", fontFamily: "var(--font-inter)", fontWeight: 300, fontStyle: "italic" }}
              >
                A Quinta da Salmanha está inserida numa paisagem de campos agrícolas e
                margens do Mondego, a poucos quilómetros da praia e do centro histórico
                de Figueira da Foz. Um destino de eleição no coração da Beira Litoral.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
