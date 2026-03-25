"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Maria João Rodrigues",
    location: "Figueira da Foz",
    rating: 5,
    text: "Finalmente uma clínica que abre ao domingo! Trabalho durante a semana e era impossível marcar consultas. Na Upconcept marquei para sábado de manhã e fui atendida como se fosse um dia normal. A qualidade é impressionante e o atendimento é excelente.",
    treatment: "Ortodontia — Alinhadores Invisíveis",
    date: "Janeiro 2025",
  },
  {
    name: "Carlos Alberto Mendes",
    location: "Coimbra",
    rating: 5,
    text: "Tive uma urgência dentária num feriado de Natal e a Upconcept foi a única clínica disponível. Foram absolutamente profissionais. Fiz depois o tratamento de implante completo aqui e estou completamente satisfeito com o resultado.",
    treatment: "Implante Dentário",
    date: "Dezembro 2024",
  },
  {
    name: "Ana Filipa Santos",
    location: "Figueira da Foz",
    rating: 5,
    text: "Fiz as facetas de porcelana na Upconcept e o resultado superou todas as expectativas. A tecnologia que utilizam é completamente diferente de outras clínicas. O scanner intraoral é incrível — sem moldes, sem aquela sensação desagradável.",
    treatment: "Facetas em Porcelana",
    date: "Novembro 2024",
  },
  {
    name: "Pedro Gonçalves",
    location: "Marinha das Ondas",
    rating: 5,
    text: "Os meus filhos têm aparelho na Upconcept e adoram a experiência. A Dra. Beatriz é fantástica com crianças. Poder marcar consultas ao sábado faz toda a diferença pois não precisamos de tirar os miúdos da escola.",
    treatment: "Ortodontia Infantil",
    date: "Outubro 2024",
  },
  {
    name: "Lurdes Ferreira",
    location: "Figueira da Foz",
    rating: 5,
    text: "Depois de anos a adiar o tratamento periodontal por medo, na Upconcept senti-me completamente confortável. Usaram laser — foi praticamente indolor! A Dra. Sofia explicou tudo ao pormenor e acompanhou-me em cada passo.",
    treatment: "Tratamento Periodontal com Laser",
    date: "Setembro 2024",
  },
  {
    name: "Rui Carvalho",
    location: "Buarcos",
    rating: 5,
    text: "Tratamento de canal que parecia impossível noutras clínicas, aqui foi feito em duas sessões com microscópio. Zero dor, resultado excelente. O Dr. Ricardo é um especialista de primeira. Recomendo a toda a gente.",
    treatment: "Endodontia — Tratamento de Canal",
    date: "Agosto 2024",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const visibleTestimonials = testimonials.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <section id="testemunhos" ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#111827]">
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #2563EB 0%, transparent 70%)" }}
          animate={{ opacity: [0.06, 0.1, 0.06] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-[#2563EB]/40 bg-[#2563EB]/10"
          >
            <Star className="w-4 h-4 text-[#2563EB]" />
            <span className="text-sm font-medium text-[#2563EB] font-[family-name:var(--font-inter-uc)]">
              Testemunhos
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] text-white mb-4"
          >
            O que dizem
            <br />
            <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
              os nossos pacientes
            </span>
          </motion.h2>

          {/* Star rating summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center gap-3 mt-4"
          >
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-white font-bold font-[family-name:var(--font-space-grotesk)] text-lg">5.0</span>
            <span className="text-gray-500 font-[family-name:var(--font-inter-uc)]">
              · Avaliação Google
            </span>
          </motion.div>
        </div>

        {/* Testimonials grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {visibleTestimonials.map((testimonial, index) => (
            <motion.div
              key={`${testimonial.name}-${currentPage}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-[#2563EB]/30 hover:bg-[#2563EB]/5 transition-all duration-300"
            >
              {/* Quote icon */}
              <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                <Quote className="w-8 h-8 text-[#2563EB]" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-300 text-sm font-[family-name:var(--font-inter-uc)] leading-relaxed mb-6 italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Treatment badge */}
              <div className="mb-4">
                <span className="text-xs px-3 py-1 rounded-full bg-[#2563EB]/15 text-[#06B6D4] border border-[#2563EB]/20 font-[family-name:var(--font-inter-uc)]">
                  {testimonial.treatment}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div>
                  <p className="text-white font-semibold font-[family-name:var(--font-space-grotesk)] text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 text-xs font-[family-name:var(--font-inter-uc)]">
                    {testimonial.location}
                  </p>
                </div>
                <p className="text-gray-600 text-xs font-[family-name:var(--font-inter-uc)]">
                  {testimonial.date}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center justify-center gap-4"
          >
            <button
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="w-10 h-10 rounded-xl border border-white/20 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: currentPage === i ? "24px" : "8px",
                    background: currentPage === i ? "#2563EB" : "rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage === totalPages - 1}
              className="w-10 h-10 rounded-xl border border-white/20 bg-white/5 flex items-center justify-center text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
