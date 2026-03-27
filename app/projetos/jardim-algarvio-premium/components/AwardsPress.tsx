"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Star } from "lucide-react";

const awards = [
  {
    title: "Melhor Projeto Paisag\u00EDstico",
    org: "Associa\u00E7\u00E3o Portuguesa de Arquitetura Paisagista",
    year: "2024",
  },
  {
    title: "Excel\u00EAncia em Sustentabilidade",
    org: "Pr\u00E9mio Algarve Verde",
    year: "2023",
  },
  {
    title: "Top 10 Est\u00FAdios de Paisagismo",
    org: "Revista Casa & Jardim",
    year: "2024",
  },
  {
    title: "Certifica\u00E7\u00E3o Rega Eficiente",
    org: "Ag\u00EAncia Portuguesa do Ambiente",
    year: "2023",
  },
];

const pressQuotes = [
  {
    quote: "Refer\u00EAncia em paisagismo no Algarve",
    source: "Revista Jardins",
  },
  {
    quote: "O est\u00FAdio que est\u00E1 a transformar os jardins do sul",
    source: "Expresso Imobili\u00E1rio",
  },
  {
    quote: "Arte e ci\u00EAncia ao servi\u00E7o da natureza",
    source: "Observador Lifestyle",
  },
];

export default function AwardsPress() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12" style={{ background: "#C9A96E" }} />
            <span
              className="text-xs tracking-[0.4em] uppercase"
              style={{ color: "#C9A96E", fontFamily: "var(--font-inter)" }}
            >
              Reconhecimento
            </span>
            <div className="h-px w-12" style={{ background: "#C9A96E" }} />
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "var(--font-playfair)", color: "#F5F0E8" }}
          >
            Pr&eacute;mios & <span style={{ color: "#C9A96E" }}>Imprensa</span>
          </h2>
        </motion.div>

        {/* Awards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {awards.map((award, i) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative p-6 text-center group"
              style={{
                border: "1px solid rgba(201,169,110,0.2)",
                borderRadius: "4px",
                background: "rgba(42,40,33,0.4)",
              }}
            >
              {/* Award icon */}
              <div className="mb-4 flex justify-center">
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 56 56"
                  fill="none"
                  className="transition-transform duration-300 group-hover:scale-110"
                >
                  {/* Outer circle */}
                  <circle
                    cx="28"
                    cy="28"
                    r="26"
                    stroke="#C9A96E"
                    strokeWidth="1"
                    opacity="0.4"
                  />
                  {/* Inner decorative ring */}
                  <circle
                    cx="28"
                    cy="28"
                    r="20"
                    stroke="#C9A96E"
                    strokeWidth="0.5"
                    strokeDasharray="3 3"
                    opacity="0.3"
                  />
                  {/* Star */}
                  <path
                    d="M28 14 L31 23 L40 23 L33 29 L35.5 38 L28 33 L20.5 38 L23 29 L16 23 L25 23 Z"
                    stroke="#C9A96E"
                    strokeWidth="1"
                    fill="rgba(201,169,110,0.1)"
                  />
                </svg>
              </div>

              <div
                className="text-xs tracking-wider uppercase mb-2"
                style={{ color: "#C9A96E" }}
              >
                {award.year}
              </div>
              <h3
                className="text-sm font-bold mb-2"
                style={{ fontFamily: "var(--font-playfair)", color: "#F5F0E8" }}
              >
                {award.title}
              </h3>
              <p
                className="text-xs"
                style={{ color: "rgba(245,240,232,0.5)" }}
              >
                {award.org}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Press quotes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div
            className="text-center mb-8"
            style={{
              color: "rgba(245,240,232,0.4)",
              fontSize: "0.75rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            Na Imprensa
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pressQuotes.map((item, i) => (
              <motion.div
                key={item.source}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                className="text-center"
              >
                <Star
                  size={16}
                  className="mx-auto mb-3"
                  style={{ color: "rgba(201,169,110,0.4)" }}
                />
                <p
                  className="text-lg md:text-xl mb-3 leading-relaxed"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontStyle: "italic",
                    color: "rgba(245,240,232,0.8)",
                  }}
                >
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div
                  className="text-xs tracking-wider uppercase"
                  style={{ color: "#C9A96E" }}
                >
                  &mdash; {item.source}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
