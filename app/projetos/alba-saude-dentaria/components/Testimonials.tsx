"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Maria João Santos",
    location: "Figueira da Foz",
    rating: 5,
    date: "Março 2025",
    service: "Implantologia",
    text: "Fiz dois implantes na Alba Saúde Dentária e não podia estar mais satisfeita. A Dra. Ana explicou tudo ao detalhe antes da cirurgia, o bloco operatório deu-me uma confiança enorme e a recuperação foi muito melhor do que esperava. Recomendo a toda a minha família.",
  },
  {
    name: "António Ferreira",
    location: "Buarcos",
    rating: 5,
    date: "Janeiro 2025",
    service: "Cirurgia Oral",
    text: "Tinha muito medo de tirar os sisos por serem inclusos e o médico da minha anterior clínica não conseguia fazer a cirurgia. Na Alba realizaram tudo no bloco operatório, com sedação, e nem me apercebi. Acordei sem dor e com tudo feito. Profissionalismo a um nível diferente.",
  },
  {
    name: "Carla Mendes",
    location: "Figueira da Foz",
    rating: 5,
    date: "Fevereiro 2025",
    service: "Ortodontia",
    text: "A minha filha está a ser acompanhada pela Dra. Sofia desde os 8 anos. A abordagem é cuidadosa, explicam sempre o plano de tratamento e o espaço é muito acolhedor. Sinto que aqui há uma equipa a trabalhar em conjunto e não apenas um dentista.",
  },
  {
    name: "Manuel Rodrigues",
    location: "Ferreira-a-Nova",
    rating: 5,
    date: "Dezembro 2024",
    service: "Design do Sorriso",
    text: "Fiz as facetas de porcelana e o resultado superou todas as expectativas. O Dr. Rui mostrou-me o mock-up digital e pude ver exatamente como ficaria antes de avançar. A diferença no meu sorriso é enorme. Vale cada cêntimo.",
  },
  {
    name: "Susana Lopes",
    location: "Figueira da Foz",
    rating: 5,
    date: "Novembro 2024",
    service: "Periodontologia",
    text: "Tinha periodontite avançada e estava resignada a perder vários dentes. O Dr. João fez um trabalho excecional de tratamento periodontal, com cirurgia incluída. Passados 8 meses os meus dentes estão estáveis e com saúde. Gratidão enorme a esta equipa.",
  },
  {
    name: "Paulo Costa",
    location: "Maiorca",
    rating: 5,
    date: "Outubro 2024",
    service: "Urgência",
    text: "Apareci com uma dor fortíssima numa sexta-feira à tarde. Atenderam-me com prioridade, fizeram logo o diagnóstico, trataram o canal e fiquei sem dor. A equipa de apoio é também muito simpática e eficiente. Mudei definitivamente para a Alba.",
  },
];

export function Testimonials() {
  return (
    <section id="testemunhos" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-[#B8860B] text-xs tracking-[0.3em] uppercase font-semibold mb-3">
            Testemunhos
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="text-[#1E3A5F] font-bold text-4xl lg:text-5xl leading-tight"
              style={{ fontFamily: "Epilogue, sans-serif" }}
            >
              A Opinião de
              <br />
              Quem Nos Escolheu
            </h2>
            {/* Aggregate rating */}
            <div className="flex items-center gap-5 p-5 bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="text-center">
                <div
                  className="text-[#1E3A5F] font-bold text-4xl"
                  style={{ fontFamily: "Epilogue, sans-serif" }}
                >
                  4.9
                </div>
                <div className="flex gap-0.5 my-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-[#B8860B] fill-[#B8860B]" />
                  ))}
                </div>
                <div className="text-[#94A3B8] text-xs">+300 avaliações</div>
              </div>
              <div className="h-12 w-px bg-[#E2E8F0]" />
              <div className="text-[#94A3B8] text-xs leading-relaxed max-w-[160px]">
                Classificação média no Google e Doctoralia
              </div>
            </div>
          </div>
          <div className="mt-8 h-px bg-gradient-to-r from-[#B8860B]/50 via-[#B8860B]/15 to-transparent" />
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="border border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#1E3A5F]/20 hover:bg-white hover:shadow-lg hover:shadow-[#1E3A5F]/5 transition-all duration-300 p-7 relative"
            >
              {/* Quote icon */}
              <div className="absolute top-5 right-5 opacity-10">
                <Quote size={32} className="text-[#1E3A5F]" />
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, si) => (
                  <Star key={si} size={13} className="text-[#B8860B] fill-[#B8860B]" />
                ))}
              </div>

              {/* Service tag */}
              <span className="inline-block bg-[#1E3A5F]/8 text-[#1E3A5F] text-xs tracking-wide font-semibold px-3 py-1 mb-4">
                {t.service}
              </span>

              {/* Text */}
              <p className="text-[#1E3A5F]/75 text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
                <div>
                  <div
                    className="text-[#1E3A5F] font-bold text-sm"
                    style={{ fontFamily: "Epilogue, sans-serif" }}
                  >
                    {t.name}
                  </div>
                  <div className="text-[#94A3B8] text-xs">{t.location}</div>
                </div>
                <div className="text-[#94A3B8] text-xs">{t.date}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
