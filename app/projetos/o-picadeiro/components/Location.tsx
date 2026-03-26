"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Car, Train, Navigation } from "lucide-react";

const accessInfo = [
  {
    icon: MapPin,
    title: "Morada",
    lines: ["Rua Académico Zagalo 20", "3080-161 Figueira da Foz"],
  },
  {
    icon: Car,
    title: "De Carro",
    lines: ["Estacionamento gratuito na Praça", "do Comércio (5 min a pé)", "A17 — Saída Figueira Centro"],
  },
  {
    icon: Train,
    title: "De Comboio",
    lines: ["Estação da Figueira da Foz", "8 minutos a pé pelo centro", "CP — Linha do Oeste"],
  },
  {
    icon: Navigation,
    title: "Referências",
    lines: ["Em frente ao Mercado Municipal", "A 200m da Praia da Claridade", "Centro histórico da cidade"],
  },
];

export default function Location() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 bg-[#FFFBEB]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-8 bg-[#B87333]" />
            <span
              className="text-[#B87333] text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Localização
            </span>
            <div className="h-px w-8 bg-[#B87333]" />
          </div>

          <h2
            className="text-4xl md:text-5xl font-light text-[#292524] mb-4"
            style={{ fontFamily: "var(--font-literata)" }}
          >
            No{" "}
            <span className="italic text-[#1B4332]">Coração da Cidade</span>
          </h2>

          <p
            className="text-[#292524]/60 max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            A dois passos do Mondego e da praia, O Picadeiro ocupa um edifício
            histórico do século XIX no coração da Figueira da Foz.
          </p>
        </motion.div>

        {/* Map placeholder + access info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 overflow-hidden">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-2 relative min-h-[360px] bg-[#1B4332]"
          >
            {/* Decorative map representation */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `
                  linear-gradient(#B87333 1px, transparent 1px),
                  linear-gradient(90deg, #B87333 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
              }}
            />

            {/* Center marker */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-flex flex-col items-center"
                >
                  <div className="w-6 h-6 bg-[#B87333] rounded-full shadow-lg shadow-[#B87333]/40 mb-1" />
                  <div className="w-0.5 h-4 bg-[#B87333]" />
                  <div className="w-3 h-0.5 bg-[#B87333]" />
                </motion.div>
                <div className="mt-4 bg-[#FFFBEB] px-4 py-2 shadow-xl">
                  <p
                    className="text-[#1B4332] font-medium text-sm"
                    style={{ fontFamily: "var(--font-literata)" }}
                  >
                    O Picadeiro
                  </p>
                  <p
                    className="text-[#292524]/50 text-xs"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Figueira da Foz
                  </p>
                </div>
              </div>
            </div>

            {/* Directions link */}
            <a
              href="https://maps.google.com/?q=O+Picadeiro+Figueira+da+Foz"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 bg-[#B87333] text-[#FFFBEB] px-4 py-2 text-xs tracking-[0.15em] uppercase hover:bg-[#FFFBEB] hover:text-[#B87333] transition-colors duration-200"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Ver no Maps
            </a>

            {/* Label overlay */}
            <div className="absolute top-6 left-6">
              <p
                className="text-[#FFFBEB]/30 text-xs tracking-[0.2em] uppercase"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Centro · Figueira da Foz
              </p>
            </div>
          </motion.div>

          {/* Access info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#292524] p-8 space-y-8"
          >
            {accessInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-8 h-8 border border-[#B87333]/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-[#B87333]" />
                  </div>
                  <div>
                    <p
                      className="text-xs tracking-[0.2em] uppercase text-[#B87333] mb-2"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {info.title}
                    </p>
                    {info.lines.map((line, j) => (
                      <p
                        key={j}
                        className="text-sm text-[#FFFBEB]/60 leading-relaxed"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
