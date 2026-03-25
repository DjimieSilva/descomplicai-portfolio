"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Car, Navigation, Waves } from "lucide-react";

const directions = [
  {
    icon: Car,
    title: "De Carro",
    steps: [
      "Siga para Buarcos, Figueira da Foz",
      "Entre pela Rua dos Pescadores",
      "Estacione junto ao cais — estacionamento gratuito",
      "A tasca é a que tem a âncora na porta",
    ],
  },
  {
    icon: Waves,
    title: "A Pé da Praia",
    steps: [
      "Da Praia de Buarcos, siga junto ao areal",
      "Vire à direita na rua dos pescadores",
      "Menos de 5 minutos a pé",
      "Vai sentir o cheiro antes de chegar",
    ],
  },
];

export function Location() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 bg-white relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-[#8B7355] text-sm uppercase tracking-[0.2em] font-semibold mb-3">
            Como Chegar
          </p>
          <h2
            className="text-4xl md:text-5xl font-black text-[#1E3A5F] mb-4 leading-tight"
            style={{ fontFamily: "var(--font-merriweather)" }}
          >
            Na Rua dos Pescadores<br />
            <span className="text-[#8B7355]">de Buarcos</span>
          </h2>
          <div className="w-16 h-1 bg-[#C9B896] mx-auto mb-6" />
          <div className="inline-flex items-center gap-2 text-[#1E3A5F]/60 text-sm">
            <MapPin className="w-4 h-4 text-[#8B7355]" />
            <span>Rua dos Pescadores, Buarcos — Figueira da Foz</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div
              className="w-full aspect-[4/3] rounded overflow-hidden relative border-4 border-[#C9B896]/30"
              style={{ background: "#1E3A5F" }}
            >
              {/* Stylized map placeholder */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
                {/* Ocean gradient */}
                <div className="absolute inset-0" style={{
                  background: "linear-gradient(160deg, #1E3A5F 0%, #2D5F8A 50%, #1E3A5F 100%)"
                }} />
                {/* Wave lines */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute left-0 right-0 h-px opacity-10"
                    style={{
                      background: "#C9B896",
                      top: `${15 + i * 14}%`,
                    }}
                  />
                ))}
                {/* Location marker */}
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-[#C9B896] flex items-center justify-center shadow-lg shadow-[#C9B896]/30">
                    <MapPin className="w-8 h-8 text-[#1E3A5F]" fill="currentColor" />
                  </div>
                  <div className="text-center">
                    <p
                      className="text-white font-bold text-lg"
                      style={{ fontFamily: "var(--font-merriweather)" }}
                    >
                      Tasca Da Praia
                    </p>
                    <p className="text-white/60 text-xs mt-1">
                      Rua dos Pescadores, Buarcos
                    </p>
                    <p className="text-white/60 text-xs">
                      Figueira da Foz
                    </p>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Buarcos,Figueira+da+Foz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center gap-2 bg-[#C9B896] text-[#1E3A5F] px-4 py-2 rounded text-sm font-bold uppercase tracking-wider hover:bg-white transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                    Abrir Mapa
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Directions */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {directions.map((dir, i) => {
              const Icon = dir.icon;
              return (
                <div key={dir.title}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded bg-[#1E3A5F]/5 border border-[#C9B896]/40 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[#8B7355]" strokeWidth={1.5} />
                    </div>
                    <h3
                      className="font-bold text-[#1E3A5F] text-base"
                      style={{ fontFamily: "var(--font-merriweather)" }}
                    >
                      {dir.title}
                    </h3>
                  </div>
                  <ol className="space-y-2 ml-12">
                    {dir.steps.map((step, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="shrink-0 w-5 h-5 rounded-full bg-[#C9B896]/30 flex items-center justify-center text-[10px] font-bold text-[#8B7355] mt-0.5">
                          {j + 1}
                        </span>
                        <span className="text-sm text-[#1E3A5F]/65 leading-relaxed">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              );
            })}

            {/* Address card */}
            <div className="bg-[#F9FAFB] border border-[#C9B896]/30 rounded p-5 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#8B7355]" />
                <span className="font-bold text-[#1E3A5F] text-sm" style={{ fontFamily: "var(--font-merriweather)" }}>
                  Morada
                </span>
              </div>
              <p className="text-sm text-[#1E3A5F]/65 ml-6">
                Rua dos Pescadores<br />
                Buarcos, 3080<br />
                Figueira da Foz
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
