"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Navigation, Bus, Car, Info } from "lucide-react";

const directions = [
  {
    icon: Car,
    title: "De Carro",
    steps: [
      "Siga para o centro da Figueira da Foz",
      "Dirija-se à Rua Fernandes Tomás",
      "Estacionamento gratuito junto ao mercado (primeiros 30 min)",
      "Procure a entrada principal do Mercado Municipal",
    ],
  },
  {
    icon: Bus,
    title: "De Autocarro",
    steps: [
      "Linha 1 — Paragem Mercado Municipal (frente ao mercado)",
      "Linha 3 — Paragem Centro (5 min a pé)",
      "Consulte os horários dos SMTUC na app ou no website",
    ],
  },
  {
    icon: Navigation,
    title: "A Pé",
    steps: [
      "A 5 minutos da Praia da Figueira da Foz",
      "A 3 minutos da Câmara Municipal",
      "Passe pela Praça 8 de Maio e siga em direção ao mercado",
    ],
  },
];

export default function Location() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 md:py-32 bg-[#FEF3C7]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-[#15803D] text-white px-4 py-2 rounded-full text-sm font-bold mb-6 uppercase tracking-wide">
            <MapPin size={14} />
            Como Chegar
          </div>
          <h2
            className="text-4xl md:text-5xl font-black text-[#78350F] leading-tight mb-4"
            style={{ fontFamily: "var(--font-public-sans)" }}
          >
            Estamos no Coração
            <br />
            <span className="text-[#DC2626]">do Mercado Municipal</span>
          </h2>
          <p className="text-[#78350F]/70 max-w-lg mx-auto" style={{ fontFamily: "var(--font-inter)" }}>
            Entre pela entrada principal, siga o cheiro de peixe fresco e os sons
            animados do mercado — vamos estar lá à sua espera.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Map placeholder + address */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Map illustration */}
            <div className="bg-[#15803D] rounded-2xl overflow-hidden mb-6 relative h-64 md:h-80">
              {/* Simplified illustrated map */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  {/* Market building */}
                  <div className="bg-[#78350F] text-[#FEF3C7] rounded-xl px-6 py-4 mb-4 relative mx-auto w-fit">
                    {/* Roof */}
                    <div
                      className="absolute -top-4 left-0 right-0 h-5 rounded-t-lg"
                      style={{
                        background: "repeating-linear-gradient(90deg, #DC2626 0px, #DC2626 16px, #FEF3C7 16px, #FEF3C7 32px)",
                      }}
                    />
                    <p className="font-black text-lg mt-1" style={{ fontFamily: "var(--font-public-sans)" }}>
                      🏪 Mercado Municipal
                    </p>
                    <p className="text-xs opacity-70">Figueira da Foz</p>
                  </div>

                  {/* Pin */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex flex-col items-center"
                  >
                    <div className="bg-[#DC2626] text-white rounded-full px-4 py-2 font-bold text-sm flex items-center gap-2 shadow-lg">
                      <MapPin size={16} />
                      Casa dos Papagaios
                    </div>
                    <div className="w-0.5 h-4 bg-[#DC2626] mx-auto" />
                    <div className="w-2 h-2 bg-[#DC2626] rounded-full" />
                  </motion.div>
                </div>
              </div>

              {/* Grid lines */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "linear-gradient(#FEF3C7 1px, transparent 1px), linear-gradient(90deg, #FEF3C7 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
            </div>

            {/* Address card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#78350F]/10">
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-[#DC2626]/10 p-2.5 rounded-lg flex-shrink-0">
                  <MapPin size={20} className="text-[#DC2626]" />
                </div>
                <div>
                  <p className="font-black text-[#78350F] text-lg" style={{ fontFamily: "var(--font-public-sans)" }}>
                    Mercado Municipal da Figueira da Foz
                  </p>
                  <p className="text-[#78350F]/60 text-sm mt-1" style={{ fontFamily: "var(--font-inter)" }}>
                    Rua Fernandes Tomás<br />
                    3080 Figueira da Foz<br />
                    Portugal
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-[#FEF3C7] rounded-lg p-3">
                <Info size={16} className="text-[#78350F]/50 flex-shrink-0" />
                <p className="text-[#78350F]/70 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                  Dentro do mercado, zona de restauração — piso térreo, ala nascente.
                </p>
              </div>

              <a
                href="https://www.google.com/maps/search/Mercado+Municipal+Figueira+da+Foz"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full bg-[#DC2626] text-white py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#B91C1C] transition-colors duration-200"
              >
                <Navigation size={16} />
                Ver no Google Maps
              </a>
            </div>
          </motion.div>

          {/* Directions */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-5"
          >
            {directions.map((dir, i) => (
              <motion.div
                key={dir.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-[#78350F]/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[#15803D]/10 p-2.5 rounded-lg">
                    <dir.icon size={20} className="text-[#15803D]" />
                  </div>
                  <h3
                    className="font-black text-[#78350F] text-lg"
                    style={{ fontFamily: "var(--font-public-sans)" }}
                  >
                    {dir.title}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {dir.steps.map((step, si) => (
                    <li key={si} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 bg-[#FEF3C7] rounded-full flex items-center justify-center text-xs font-bold text-[#78350F] flex-shrink-0 mt-0.5">
                        {si + 1}
                      </span>
                      <p className="text-[#78350F]/70 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                        {step}
                      </p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
