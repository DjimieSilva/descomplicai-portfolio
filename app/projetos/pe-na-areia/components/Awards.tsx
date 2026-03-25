"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Star, Trophy } from "lucide-react";

const awards = [
  {
    icon: Trophy,
    year: "2023",
    title: "Seleção Gastronomia & Vinhos",
    description:
      "Distinguido como um dos melhores restaurantes de praia de Portugal, reconhecido pela excelência na cozinha de mar e experiência única.",
    color: "#DDB892",
  },
  {
    icon: Star,
    year: "2022",
    title: "Melhor Restaurante de Praia",
    description:
      "Premiado pela autenticidade e qualidade dos produtos locais, com especial destaque para o peixe grelhado e mariscos frescos.",
    color: "#F97316",
  },
  {
    icon: Award,
    year: "2021",
    title: "Referência Gastronómica Regional",
    description:
      "Eleito pelos leitores como destino gastronómico incontornável da Figueira da Foz, celebrando mais de uma década de sabores.",
    color: "#0E7490",
  },
];

export default function Awards() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[#1a1410] relative overflow-hidden">
      {/* Sand texture background */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />

      {/* Decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-[#DDB892]/30" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p
            className="text-[#DDB892]/50 text-xs tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Reconhecimento
          </p>
          <h2
            className="text-[#FAF8F4] text-4xl md:text-6xl font-light mb-6"
            style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 200 }}
          >
            Prémios &{" "}
            <span className="text-[#DDB892] italic" style={{ fontWeight: 300 }}>
              Distinções
            </span>
          </h2>
          <p className="text-[#9A8C72] text-base max-w-xl mx-auto leading-relaxed">
            Décadas de dedicação ao melhor do mar reconhecidas pelos mais
            prestigiados guias gastronómicos nacionais.
          </p>
        </motion.div>

        {/* Awards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {awards.map((award, i) => {
            const Icon = award.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
                className="group relative"
              >
                <div className="relative p-8 border border-[#DDB892]/10 rounded-2xl bg-[#DDB892]/3 hover:border-[#DDB892]/25 transition-all duration-500 hover:bg-[#DDB892]/6 overflow-hidden">
                  {/* Glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${award.color}10, transparent 70%)`,
                    }}
                  />

                  {/* Year */}
                  <div
                    className="text-[10px] tracking-[0.35em] uppercase mb-6 opacity-40"
                    style={{ color: award.color, fontFamily: "'Manrope', sans-serif" }}
                  >
                    {award.year}
                  </div>

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${award.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: award.color }} />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-[#FAF8F4] text-lg font-medium mb-3 leading-tight"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    {award.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#9A8C72] text-sm leading-relaxed">
                    {award.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex items-center gap-4 px-8 py-4 border border-[#DDB892]/20 rounded-full bg-[#DDB892]/5">
            <Star className="w-4 h-4 text-[#DDB892]" fill="#DDB892" />
            <span
              className="text-[#DDB892]/80 text-xs tracking-[0.25em] uppercase"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Restaurante Icónico da Figueira da Foz
            </span>
            <Star className="w-4 h-4 text-[#DDB892]" fill="#DDB892" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
