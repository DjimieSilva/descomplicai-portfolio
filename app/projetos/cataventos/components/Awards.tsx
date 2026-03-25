"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Star, Trophy, Shield } from "lucide-react";

const awards = [
  {
    icon: <Trophy className="w-8 h-8" />,
    title: "Seleção Gastronomia e Vinhos",
    year: "2024",
    description:
      "Distinção máxima atribuída aos restaurantes que elevam a gastronomia portuguesa à categoria de excelência.",
    featured: true,
  },
  {
    icon: <Star className="w-8 h-8" />,
    title: "Avaliação 8.1/10",
    year: "Pontuação",
    description:
      "Reconhecido pelos críticos e visitantes como uma referência gastronómica na Figueira da Foz.",
    featured: false,
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Qualidade Certificada",
    year: "Excelência",
    description:
      "Ingredientes de primeira qualidade, serviço impecável e uma cozinha que respeita as tradições.",
    featured: false,
  },
];

export default function Awards() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="distinções" className="py-24 bg-[#1E293B] relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a2332] to-[#1E293B]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F59E0B]/40 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-[#F59E0B]" />
            <Award className="w-5 h-5 text-[#F59E0B]" />
            <div className="h-px w-8 bg-[#F59E0B]" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#FFFDF7] mb-4"
            style={{ fontFamily: "'Work Sans', sans-serif" }}
          >
            Distinções & Reconhecimento
          </h2>
          <p className="text-[#FFFDF7]/60 text-lg max-w-xl mx-auto">
            A qualidade que nos distingue, reconhecida pelos melhores guias gastronómicos de Portugal.
          </p>
        </motion.div>

        {/* Featured award — full width */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-8 rounded-sm overflow-hidden border border-[#F59E0B]/40 bg-gradient-to-br from-[#F59E0B]/10 to-[#B45309]/5 p-10 md:p-14 relative"
        >
          {/* Corner decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
            <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M128 0 L128 128 L0 0 Z" fill="#F59E0B" />
            </svg>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="flex-shrink-0 w-20 h-20 rounded-full bg-[#F59E0B]/20 border border-[#F59E0B]/40 flex items-center justify-center">
              <Trophy className="w-10 h-10 text-[#F59E0B]" />
            </div>
            <div className="text-center md:text-left">
              <div className="text-[#F59E0B] text-sm font-semibold tracking-widest uppercase mb-2">
                Distinção Principal · 2024
              </div>
              <h3
                className="text-3xl md:text-4xl font-bold text-[#FFFDF7] mb-4"
                style={{ fontFamily: "'Work Sans', sans-serif" }}
              >
                Seleção Gastronomia e Vinhos
              </h3>
              <p className="text-[#FFFDF7]/70 text-lg leading-relaxed max-w-2xl">
                Uma distinção de prestígio que reconhece os restaurantes que aliam excelência
                culinária, qualidade de serviço e uma carta de vinhos de autor. Apenas os melhores
                recebem este reconhecimento — e o Cataventos é um deles.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                {["Excelência Culinária", "Carta de Vinhos", "Serviço de Qualidade"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 border border-[#F59E0B]/30 text-[#F59E0B] text-xs tracking-wider uppercase rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other recognitions */}
        <div className="grid md:grid-cols-2 gap-6">
          {awards.slice(1).map((award, i) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className="border border-[#FFFDF7]/10 hover:border-[#F59E0B]/30 bg-[#FFFDF7]/3 hover:bg-[#F59E0B]/5 rounded-sm p-8 transition-all duration-300"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-14 h-14 rounded-sm bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex items-center justify-center text-[#F59E0B]">
                  {award.icon}
                </div>
                <div>
                  <div className="text-[#F59E0B] text-xs font-semibold tracking-widest uppercase mb-1">
                    {award.year}
                  </div>
                  <h3
                    className="text-xl font-bold text-[#FFFDF7] mb-2"
                    style={{ fontFamily: "'Work Sans', sans-serif" }}
                  >
                    {award.title}
                  </h3>
                  <p className="text-[#FFFDF7]/60 text-sm leading-relaxed">{award.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
