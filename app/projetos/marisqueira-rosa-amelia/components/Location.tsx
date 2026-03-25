"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Navigation, Car, Waves } from "lucide-react";

const infos = [
  {
    icon: <MapPin className="w-5 h-5" />,
    titulo: "Endereço",
    texto: "Rua da Marisqueira, 12\n3080-000 Figueira da Foz\nPortugal",
  },
  {
    icon: <Navigation className="w-5 h-5" />,
    titulo: "Como Chegar",
    texto: "A 5 minutos a pé da Praia da Figueira.\nPróximo do Casino e do Museu Municipal.",
  },
  {
    icon: <Car className="w-5 h-5" />,
    titulo: "Estacionamento",
    texto: "Parque de estacionamento público\na 100m. Estacionamento gratuito\naos domingos e feriados.",
  },
  {
    icon: <Waves className="w-5 h-5" />,
    titulo: "A Nossa Localização",
    texto: "No coração da Figueira da Foz,\na dois passos do Atlântico e\ndo mercado de peixe local.",
  },
];

export default function Location() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="localizacao" className="bg-[#1D3557] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[#D4A574]/60 text-xs tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            Encontre-nos
          </p>
          <h2
            className="text-[#FFF1E6] text-[clamp(2.5rem,6vw,5rem)] leading-tight font-light"
            style={{ fontFamily: "var(--font-newsreader), serif" }}
          >
            A Nossa{" "}
            <span className="italic text-[#D4A574]">Localização</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="w-20 h-px bg-[#E63946] mx-auto mt-8"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-sm overflow-hidden"
            style={{ minHeight: "400px" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1D3557] via-[#1a2f4a] to-[#162540]" />

            {/* Decorative map-like elements */}
            <svg
              className="absolute inset-0 w-full h-full opacity-20"
              viewBox="0 0 400 400"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Streets */}
              <line x1="0" y1="200" x2="400" y2="200" stroke="#D4A574" strokeWidth="2"/>
              <line x1="200" y1="0" x2="200" y2="400" stroke="#D4A574" strokeWidth="2"/>
              <line x1="0" y1="100" x2="400" y2="100" stroke="#D4A574" strokeWidth="1"/>
              <line x1="0" y1="300" x2="400" y2="300" stroke="#D4A574" strokeWidth="1"/>
              <line x1="100" y1="0" x2="100" y2="400" stroke="#D4A574" strokeWidth="1"/>
              <line x1="300" y1="0" x2="300" y2="400" stroke="#D4A574" strokeWidth="1"/>
              {/* Diagonal streets */}
              <line x1="0" y1="0" x2="200" y2="400" stroke="#D4A574" strokeWidth="0.5" strokeDasharray="4 4"/>
              <line x1="200" y1="0" x2="400" y2="400" stroke="#D4A574" strokeWidth="0.5" strokeDasharray="4 4"/>
              {/* Ocean area */}
              <rect x="0" y="320" width="160" height="80" fill="#E63946" opacity="0.15" rx="2"/>
              <text x="30" y="368" fill="#D4A574" fontSize="10" opacity="0.8">Praia</text>
            </svg>

            {/* Pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#E63946] border-4 border-[#FFF1E6] shadow-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="w-0.5 h-4 bg-[#E63946]/60" />
                <div className="w-2 h-1 bg-[#E63946]/30 rounded-full" />
              </motion.div>
              <div className="mt-2 px-3 py-1.5 bg-[#1D3557] border border-[#D4A574]/30 rounded-sm text-center">
                <p
                  className="text-[#FFF1E6] text-xs font-light"
                  style={{ fontFamily: "var(--font-newsreader), serif" }}
                >
                  Marisqueira Rosa Amélia
                </p>
                <p className="text-[#D4A574]/60 text-[10px]"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                  Figueira da Foz
                </p>
              </div>
            </div>

            {/* Google Maps CTA */}
            <div className="absolute bottom-5 left-5 right-5">
              <a
                href="https://maps.google.com/?q=Marisqueira+Rosa+Amelia+Figueira+da+Foz"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 text-center bg-[#E63946] text-white text-xs tracking-[0.2em] uppercase rounded-sm hover:bg-[#E63946]/90 transition-colors"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Abrir no Google Maps
              </a>
            </div>
          </motion.div>

          {/* Info grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {infos.map((info, i) => (
              <motion.div
                key={info.titulo}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                className="p-6 border border-[#D4A574]/15 rounded-sm hover:border-[#D4A574]/35 transition-colors"
              >
                <div className="text-[#D4A574] mb-4">{info.icon}</div>
                <h3
                  className="text-[#FFF1E6] text-base font-light mb-3"
                  style={{ fontFamily: "var(--font-newsreader), serif" }}
                >
                  {info.titulo}
                </h3>
                <p className="text-[#FFF1E6]/50 text-sm leading-relaxed whitespace-pre-line">
                  {info.texto}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
