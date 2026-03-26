"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Navigation, Bus, Car } from "lucide-react";

const transportInfo = [
  {
    icon: Car,
    title: "De Carro",
    info: "Estacionamento disponível nas proximidades",
  },
  {
    icon: Bus,
    title: "De Autocarro",
    info: "Linhas 3 e 7, paragem Bairro Centro — em frente ao restaurante",
  },
  {
    icon: Navigation,
    title: "A Pé",
    info: "10 minutos do centro histórico, 15 minutos da Praia da Figueira",
  },
];

export default function Location() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="bg-[#171717] py-24 px-6 border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-0.5 bg-[#EAB308]" />
            <span className="text-[#EAB308] text-xs font-[family-name:var(--font-space-grotesk)] tracking-[0.2em] uppercase">
              Localização
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-space-grotesk)] font-black text-[clamp(2rem,5vw,3.5rem)] text-white leading-tight">
            Encontra-nos no{" "}
            <span className="text-[#EAB308]">coração do bairro.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left: Map placeholder + address */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {/* Map placeholder */}
            <div className="relative w-full h-64 sm:h-80 bg-[#0f0f0f] border border-white/5 overflow-hidden group mb-6">
              {/* Grid lines mimicking a map */}
              <div className="absolute inset-0 opacity-20">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={`h-${i}`}
                    className="absolute left-0 right-0 border-t border-white/10"
                    style={{ top: `${(i / 8) * 100}%` }}
                  />
                ))}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={`v-${i}`}
                    className="absolute top-0 bottom-0 border-l border-white/10"
                    style={{ left: `${(i / 8) * 100}%` }}
                  />
                ))}
              </div>

              {/* "Streets" */}
              <div className="absolute inset-0">
                <div className="absolute top-1/2 left-0 right-0 h-px bg-[#A3A3A3]/20" />
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[#A3A3A3]/20" />
                <div className="absolute top-1/3 left-1/4 right-0 h-px bg-[#A3A3A3]/10" />
                <div className="absolute top-2/3 left-0 right-1/4 h-px bg-[#A3A3A3]/10" />
                <div className="absolute top-0 bottom-1/4 left-3/4 w-px bg-[#A3A3A3]/10" />
              </div>

              {/* Pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="flex flex-col items-center"
                >
                  <div className="w-10 h-10 bg-[#EAB308] flex items-center justify-center shadow-lg shadow-[#EAB308]/30">
                    <MapPin size={18} className="text-[#171717]" />
                  </div>
                  <div className="w-2 h-2 bg-[#EAB308] rotate-45 -mt-1" />
                </motion.div>

                {/* Pulse */}
                <motion.div
                  animate={{ scale: [1, 2, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-[#EAB308]/40"
                />
              </div>

              {/* Watermark label */}
              <div className="absolute bottom-3 right-3 font-[family-name:var(--font-space-grotesk)] text-xs text-white/20 tracking-widest uppercase">
                Figueira da Foz
              </div>

              {/* Open in maps overlay on hover */}
              <a
                href="https://maps.google.com/?q=Rua+de+São+Lourenço+1+Figueira+da+Foz"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center bg-[#EAB308]/0 group-hover:bg-[#EAB308]/10 transition-colors duration-300"
              >
                <span className="font-[family-name:var(--font-space-grotesk)] text-xs font-bold tracking-widest uppercase text-white/0 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                  <Navigation size={14} />
                  Abrir no Google Maps
                </span>
              </a>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4 p-5 bg-white/[0.03] border border-white/[0.06]">
              <MapPin size={18} className="text-[#EAB308] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-[family-name:var(--font-space-grotesk)] font-bold text-white text-base">
                  Rua de São Lourenço 1
                </p>
                <p className="font-[family-name:var(--font-inter)] text-[#A3A3A3] text-sm mt-1">
                  3080-147 Figueira da Foz, Portugal
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Transport + nearby */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div>
              <h3 className="font-[family-name:var(--font-space-grotesk)] font-bold text-white text-lg mb-5">
                Como chegar
              </h3>
              <div className="flex flex-col gap-4">
                {transportInfo.map((transport, i) => (
                  <motion.div
                    key={transport.title}
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="flex gap-4 p-4 bg-white/[0.03] border border-white/[0.06]"
                  >
                    <div className="w-9 h-9 bg-[#EAB308]/10 flex items-center justify-center flex-shrink-0">
                      <transport.icon size={15} className="text-[#EAB308]" />
                    </div>
                    <div>
                      <p className="font-[family-name:var(--font-space-grotesk)] font-semibold text-white text-sm">
                        {transport.title}
                      </p>
                      <p className="font-[family-name:var(--font-inter)] text-[#A3A3A3] text-sm mt-0.5 leading-snug">
                        {transport.info}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Nearby */}
            <div className="p-5 border border-[#EAB308]/10 bg-[#EAB308]/5">
              <h4 className="font-[family-name:var(--font-space-grotesk)] font-bold text-[#EAB308] text-sm tracking-wide mb-3">
                Perto de nós
              </h4>
              <ul className="font-[family-name:var(--font-inter)] text-[#A3A3A3] text-sm space-y-1.5">
                <li>• Mercado Municipal — 3 min a pé</li>
                <li>• Praia da Figueira — 15 min a pé</li>
                <li>• Parque Municipal — 5 min a pé</li>
                <li>• Centro Histórico — 10 min a pé</li>
              </ul>
            </div>

            {/* Google Maps CTA */}
            <a
              href="https://maps.google.com/?q=Rua+de+São+Lourenço+1+Figueira+da+Foz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#EAB308] text-[#171717] font-[family-name:var(--font-space-grotesk)] font-bold px-6 py-4 text-sm tracking-widest uppercase hover:bg-[#ca9a06] transition-colors duration-200 group"
            >
              <Navigation size={16} />
              Abrir no Google Maps
              <span className="ml-auto translate-x-0 group-hover:translate-x-1 transition-transform duration-200">→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
