"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Star, Award, ThumbsUp } from "lucide-react";

const awards = [
  {
    icon: Trophy,
    year: "2023",
    title: "Melhor Restaurante de Peixe",
    organization: "Guia Gastronómico do Centro",
    description:
      "Reconhecidos pela qualidade excecional do peixe fresco e pela autenticidade das receitas tradicionais.",
    color: "#DC2626",
    bg: "#FEE2E2",
  },
  {
    icon: Star,
    year: "2022",
    title: "Estrela de Qualidade Alimentar",
    organization: "ASAE — Certificação de Excelência",
    description:
      "Certificação de excelência em higiene e qualidade alimentar, concedida após inspeção minuciosa.",
    color: "#15803D",
    bg: "#DCFCE7",
  },
  {
    icon: Award,
    year: "2021",
    title: "Prémio Tradição Gastronómica",
    organization: "Câmara Municipal da Figueira da Foz",
    description:
      "Homenagem pela preservação e divulgação da gastronomia tradicional da região de Coimbra.",
    color: "#78350F",
    bg: "#FEF3C7",
  },
  {
    icon: ThumbsUp,
    year: "2019–2024",
    title: "Top 10 no Eatbu",
    organization: "Plataforma Eatbu — Avaliação dos Clientes",
    description:
      "Cinco anos consecutivos no top 10 dos restaurantes mais bem avaliados da Figueira da Foz.",
    color: "#1D4ED8",
    bg: "#DBEAFE",
  },
];

const testimonials = [
  {
    text: "O melhor polvo que comi na vida. E já comi muito polvo. Simples, honesto, perfeito.",
    author: "João F.",
    location: "Lisboa",
    stars: 5,
  },
  {
    text: "Estar dentro do mercado faz toda a diferença — sente-se mesmo que o peixe é do dia. Voltarei sempre.",
    author: "Maria C.",
    location: "Porto",
    stars: 5,
  },
  {
    text: "Caldeirada de peixe que me fez lembrar a da minha avó. Uma honestidade enorme nesta cozinha.",
    author: "Rui S.",
    location: "Figueira da Foz",
    stars: 5,
  },
];

export default function Awards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 md:py-32 bg-[#78350F] relative overflow-hidden">
      {/* Top wave */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 fill-white">
          <path d="M0,0 C360,60 1080,0 1440,40 L1440,0 Z" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[#FEF3C7]/70 font-bold uppercase tracking-widest text-sm mb-4">
            Reconhecimento
          </p>
          <h2
            className="text-4xl md:text-5xl font-black text-[#FEF3C7] leading-tight mb-4"
            style={{ fontFamily: "var(--font-public-sans)" }}
          >
            Premiados por Quem
            <br />
            <span className="text-[#DC2626]">Entende de Boa Mesa</span>
          </h2>
          <p className="text-[#FEF3C7]/70 max-w-xl mx-auto" style={{ fontFamily: "var(--font-inter)" }}>
            Anos de dedicação à cozinha honesta reconhecidos por críticos,
            instituições e — o que mais nos orgulha — pelos nossos clientes.
          </p>
        </motion.div>

        {/* Awards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {awards.map((award, i) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -4 }}
              className="bg-[#FEF3C7] rounded-2xl p-6 relative overflow-hidden"
            >
              {/* Year badge */}
              <div className="absolute top-4 right-4 text-xs font-bold text-[#78350F]/40">
                {award.year}
              </div>

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: award.bg }}
              >
                <award.icon size={24} style={{ color: award.color }} />
              </div>

              <h3
                className="text-lg font-black text-[#78350F] mb-2 leading-tight"
                style={{ fontFamily: "var(--font-public-sans)" }}
              >
                {award.title}
              </h3>
              <p className="text-[#DC2626] text-xs font-bold mb-3 uppercase tracking-wide">
                {award.organization}
              </p>
              <p className="text-[#78350F]/70 text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                {award.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center mb-10"
        >
          <h3
            className="text-2xl md:text-3xl font-black text-[#FEF3C7] mb-2"
            style={{ fontFamily: "var(--font-public-sans)" }}
          >
            O que dizem os nossos clientes
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              className="bg-[#FEF3C7]/10 border border-[#FEF3C7]/20 rounded-2xl p-6"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, si) => (
                  <Star key={si} size={16} className="fill-[#DC2626] text-[#DC2626]" />
                ))}
              </div>

              <p className="text-[#FEF3C7] text-base leading-relaxed mb-4 italic" style={{ fontFamily: "var(--font-inter)" }}>
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#DC2626] rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <p className="text-[#FEF3C7] font-bold text-sm">{t.author}</p>
                  <p className="text-[#FEF3C7]/50 text-xs">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 fill-[#FEF3C7]">
          <path d="M0,60 C360,0 1080,60 1440,20 L1440,60 Z" />
        </svg>
      </div>
    </section>
  );
}
