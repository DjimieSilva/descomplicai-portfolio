"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Car, Train, ExternalLink } from "lucide-react";

const accessInfo = [
  {
    icon: MapPin,
    title: "Morada",
    lines: ["Praia da Figueira da Foz", "3080-000 Figueira da Foz"],
    color: "#DDB892",
  },
  {
    icon: Car,
    title: "De Carro",
    lines: ["A17 — Saída Figueira da Foz", "Parque de estacionamento gratuito", "junto ao acesso à praia"],
    color: "#F97316",
  },
  {
    icon: Train,
    title: "De Comboio",
    lines: ["Estação CP Figueira da Foz", "15 min. a pé até à praia", "Táxi disponível na estação"],
    color: "#0E7490",
  },
];

export default function Location() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="localizacao" className="py-24 md:py-32 bg-[#16120e] relative overflow-hidden">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0E7490]/25 to-transparent" />

      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" className="w-full opacity-5" fill="none" preserveAspectRatio="none">
          <path
            d="M0,30 C200,10 400,50 600,30 C800,10 1000,50 1200,30 C1320,20 1400,40 1440,30 L1440,60 L0,60 Z"
            fill="#DDB892"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p
            className="text-[#DDB892]/50 text-xs tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Localização
          </p>
          <h2
            className="text-[#FAF8F4] text-4xl md:text-6xl font-light mb-4"
            style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 200 }}
          >
            Encontre-nos{" "}
            <span className="text-[#DDB892] italic" style={{ fontWeight: 300 }}>
              na praia
            </span>
          </h2>
          <p className="text-[#9A8C72] text-sm max-w-md mx-auto">
            Na linha de água, onde o restaurante encontra o oceano. Um lugar que
            se descobre uma vez e nunca mais se esquece.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3 relative rounded-2xl overflow-hidden border border-[#DDB892]/10"
            style={{ height: "380px" }}
          >
            {/* Stylised map representation */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0d1a1f] via-[#0E7490]/20 to-[#1a1410]" />

            {/* Grid lines simulating map */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(8)].map((_, i) => (
                <div
                  key={`h-${i}`}
                  className="absolute left-0 right-0 h-px bg-[#DDB892]"
                  style={{ top: `${(i + 1) * 12.5}%` }}
                />
              ))}
              {[...Array(8)].map((_, i) => (
                <div
                  key={`v-${i}`}
                  className="absolute top-0 bottom-0 w-px bg-[#DDB892]"
                  style={{ left: `${(i + 1) * 12.5}%` }}
                />
              ))}
            </div>

            {/* Ocean area */}
            <div className="absolute left-0 bottom-0 w-2/5 h-full bg-[#0E7490]/15" />

            {/* Beach strip */}
            <div className="absolute left-2/5 bottom-0 w-8 h-full bg-[#DDB892]/10" />

            {/* Street lines */}
            <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-[#9A8C72]/8" />
            <div className="absolute left-0 right-0 top-1/3 h-1.5 bg-[#9A8C72]/8" />
            <div className="absolute left-0 right-0 top-2/3 h-1 bg-[#9A8C72]/6" />

            {/* Location pin */}
            <div className="absolute left-[42%] top-[45%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-8 h-8 bg-[#F97316] rounded-full flex items-center justify-center shadow-lg shadow-[#F97316]/30"
              >
                <MapPin className="w-4 h-4 text-white" fill="white" />
              </motion.div>
              <div className="mt-2 px-3 py-1 bg-[#1a1410]/90 border border-[#DDB892]/20 rounded-full">
                <span className="text-[#DDB892] text-[10px] font-medium" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  Pé na Areia
                </span>
              </div>
            </div>

            {/* Wave at left edge */}
            <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-gradient-to-r from-[#0E7490]/20 to-transparent" />

            {/* Open in Maps button */}
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-[#1a1410]/90 border border-[#DDB892]/20 rounded-full hover:border-[#DDB892]/50 transition-colors group"
            >
              <span
                className="text-[#9A8C72] text-[10px] tracking-widest uppercase group-hover:text-[#DDB892] transition-colors"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Abrir no Maps
              </span>
              <ExternalLink className="w-3 h-3 text-[#9A8C72] group-hover:text-[#DDB892] transition-colors" />
            </a>
          </motion.div>

          {/* Access info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="lg:col-span-2 space-y-4"
          >
            {accessInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <div
                  key={i}
                  className="p-5 border rounded-xl transition-colors duration-300"
                  style={{ borderColor: `${info.color}15`, backgroundColor: `${info.color}04` }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: `${info.color}15` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: info.color }} />
                    </div>
                    <div>
                      <p
                        className="text-[10px] tracking-[0.3em] uppercase mb-2 opacity-60"
                        style={{ color: info.color, fontFamily: "'Manrope', sans-serif" }}
                      >
                        {info.title}
                      </p>
                      {info.lines.map((line, j) => (
                        <p key={j} className="text-[#9A8C72] text-sm leading-relaxed">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Quick note */}
            <div className="p-4 rounded-xl bg-[#DDB892]/5 border border-[#DDB892]/10">
              <p className="text-[#9A8C72]/70 text-xs text-center leading-relaxed">
                A Figueira da Foz fica a{" "}
                <span className="text-[#DDB892]/80">45 min. de Coimbra</span> e a{" "}
                <span className="text-[#DDB892]/80">2h10 de Lisboa</span> pela A1+A17.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
