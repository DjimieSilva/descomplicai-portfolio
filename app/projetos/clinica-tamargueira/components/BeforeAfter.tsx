"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star, Clock, User } from "lucide-react";

const cases = [
  {
    id: 1,
    title: "Reabilitação com Implante Unitário",
    patient: "Paciente, 42 anos",
    duration: "4 meses",
    treatment: "Implante + Coroa Cerâmica",
    description:
      "Perda de incisivo central por traumatismo. Colocação de implante com técnica minimamente invasiva e coroa em cerâmica zircónia de alta translucidez.",
    rating: 5,
    quote: "Parece o meu dente natural. Ninguém consegue perceber que é um implante.",
    beforeColor: "bg-[#F3F4F6]",
    afterColor: "bg-[#EFF6FF]",
  },
  {
    id: 2,
    title: "All-on-4 — Arcada Superior Completa",
    patient: "Paciente, 58 anos",
    duration: "6 meses",
    treatment: "All-on-4 com carga imediata",
    description:
      "Dentição em mau estado com múltiplos dentes perdidos. Reabilitação completa da arcada superior com 4 implantes e prótese fixa em 24 horas.",
    rating: 5,
    quote: "Entrei sem dentes fixos e saí no dia seguinte com um sorriso novo. É incrível.",
    beforeColor: "bg-[#F3F4F6]",
    afterColor: "bg-[#EFF6FF]",
  },
  {
    id: 3,
    title: "Implantes Múltiplos + Estética",
    patient: "Paciente, 35 anos",
    duration: "5 meses",
    treatment: "3 Implantes + Facetas de Porcelana",
    description:
      "Três dentes ausentes na zona anterior. Combinação de implantes com facetas nos dentes remanescentes para resultado estético uniforme e natural.",
    rating: 5,
    quote: "Recuperei a confiança para sorrir. Valeu completamente cada cêntimo.",
    beforeColor: "bg-[#F3F4F6]",
    afterColor: "bg-[#EFF6FF]",
  },
];

export default function BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentCase, setCurrentCase] = useState(0);

  const prev = () => setCurrentCase((c) => (c - 1 + cases.length) % cases.length);
  const next = () => setCurrentCase((c) => (c + 1) % cases.length);

  const active = cases[currentCase];

  return (
    <section id="casos" ref={ref} className="py-24 bg-[#F8FAFF]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-[#1E40AF] text-sm font-semibold uppercase tracking-widest mb-4"
          >
            Resultados Reais
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-[#111827] font-[family-name:var(--font-sora)] mb-4"
          >
            Casos Clínicos
            <br />
            <span className="text-[#1E40AF]">Antes e Depois</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#374151] text-lg max-w-xl mx-auto"
          >
            Cada caso é único. Conheça alguns dos tratamentos realizados na nossa clínica.
          </motion.p>
        </div>

        {/* Case display */}
        <motion.div
          key={currentCase}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 gap-8 mb-8"
        >
          {/* Before */}
          <div className="rounded-2xl overflow-hidden border border-[#E5E7EB]">
            <div className="bg-[#374151] text-white text-center py-2 text-sm font-semibold tracking-wider uppercase">
              Antes
            </div>
            <div className={`${active.beforeColor} h-56 md:h-72 flex items-center justify-center`}>
              <div className="text-center text-[#9CA3AF]">
                <div className="w-20 h-20 bg-[#E5E7EB] rounded-full mx-auto mb-3 flex items-center justify-center">
                  <User className="w-10 h-10 text-[#9CA3AF]" />
                </div>
                <p className="text-sm">Fotografia clínica disponível</p>
                <p className="text-xs mt-1">na consulta de avaliação</p>
              </div>
            </div>
          </div>

          {/* After */}
          <div className="rounded-2xl overflow-hidden border border-[#1E40AF]/20">
            <div className="bg-[#1E40AF] text-white text-center py-2 text-sm font-semibold tracking-wider uppercase">
              Depois
            </div>
            <div className={`${active.afterColor} h-56 md:h-72 flex items-center justify-center`}>
              <div className="text-center text-[#1E40AF]">
                <div className="w-20 h-20 bg-[#DBEAFE] rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Star className="w-10 h-10 text-[#1E40AF]" fill="#1E40AF" />
                </div>
                <p className="text-sm font-semibold">Resultado final</p>
                <p className="text-xs mt-1">após tratamento completo</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Case info */}
        <motion.div
          key={`info-${currentCase}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-[#E5E7EB] rounded-2xl p-6 md:p-8 mb-8"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="text-xl font-bold text-[#111827] font-[family-name:var(--font-sora)] mb-1">
                {active.title}
              </h3>
              <div className="flex items-center gap-4 text-sm text-[#6B7280]">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  {active.patient}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {active.duration}
                </span>
              </div>
            </div>
            <span className="bg-[#DBEAFE] text-[#1E40AF] text-sm font-semibold px-3 py-1.5 rounded-full">
              {active.treatment}
            </span>
          </div>
          <p className="text-[#374151] mb-5">{active.description}</p>
          <div className="flex gap-1 mb-3">
            {Array.from({ length: active.rating }).map((_, i) => (
              <Star key={i} className="w-4 h-4 text-[#F59E0B]" fill="#F59E0B" />
            ))}
          </div>
          <blockquote className="italic text-[#374151] border-l-4 border-[#1E40AF] pl-4">
            "{active.quote}"
          </blockquote>
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={prev}
            className="flex items-center gap-2 text-[#374151] hover:text-[#1E40AF] transition-colors duration-200 font-medium"
          >
            <ChevronLeft className="w-5 h-5" />
            Caso anterior
          </button>
          <div className="flex gap-2">
            {cases.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentCase(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                  i === currentCase ? "bg-[#1E40AF] scale-125" : "bg-[#D1D5DB] hover:bg-[#6B7280]"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="flex items-center gap-2 text-[#374151] hover:text-[#1E40AF] transition-colors duration-200 font-medium"
          >
            Próximo caso
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
