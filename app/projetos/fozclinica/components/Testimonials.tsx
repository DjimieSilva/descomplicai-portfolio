"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Maria José F.",
    location: "Figueira da Foz",
    specialty: "Medicina Dentária",
    color: "#0D9488",
    rating: 5,
    text: "Fui à Fozclinica pela primeira vez com muito receio de dentistas — confesso que sou das mais medrosas. A Dra. Ana foi incrivelmente paciente e gentil, expliquei tudo o que me ia fazer antes de fazer. Nunca me senti assim numa clínica. Recomendo sem hesitar!",
  },
  {
    name: "Carlos M.",
    location: "Marinha das Ondas",
    specialty: "Reabilitação Física",
    color: "#FB7185",
    rating: 5,
    text: "Depois de uma cirurgia ao joelho, precisava de fisioterapia de qualidade. A equipa de reabilitação da Fozclinica superou todas as expectativas. Plano personalizado, acompanhamento constante e resultados visíveis desde as primeiras semanas. Voltei a jogar futebol com o meu filho!",
  },
  {
    name: "Daniela S.",
    location: "Figueira da Foz",
    specialty: "Psicologia",
    color: "#F59E0B",
    rating: 5,
    text: "Custou-me muito pedir ajuda psicológica, mas o Dr. Paulo criou logo um ambiente de confiança total. Sinto que finalmente tenho ferramentas para lidar com a ansiedade. A clínica é discreta, acolhedora e profissional. Muito grata por ter dado este passo.",
  },
  {
    name: "António P.",
    location: "Buarcos",
    specialty: "Podologia",
    color: "#6366F1",
    rating: 5,
    text: "Tenho diabetes e os meus pés preocupavam-me há muito. A Dra. Catarina fez uma avaliação completa e um plano de cuidados preventivos. Pela primeira vez sinto que os meus pés estão verdadeiramente acompanhados por alguém especializado. Uma diferença enorme na minha qualidade de vida.",
  },
  {
    name: "Filipa R.",
    location: "Figueira da Foz",
    specialty: "Medicina Dentária",
    color: "#0D9488",
    rating: 5,
    text: "Fiz o alinhamento dentário com alinhadores transparentes e o resultado foi incrível. O Dr. Tiago acompanhou-me em cada fase, sempre disponível para tirar dúvidas. A clínica tem umas instalações modernas e o atendimento é sempre simpático e eficiente.",
  },
  {
    name: "João B.",
    location: "Lavos",
    specialty: "Reabilitação Física",
    color: "#FB7185",
    rating: 5,
    text: "Dores lombares crónicas que me impediam de trabalhar. Após 2 meses de fisioterapia com a Dra. Inês, recuperei mobilidade e reduzi drasticamente as dores. O tratamento foi rigoroso e personalizado. Não podia estar mais satisfeito com os resultados.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="w-4 h-4"
          fill={i < rating ? "#F59E0B" : "none"}
          stroke={i < rating ? "#F59E0B" : "#D1D5DB"}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testemunhos" className="py-24 bg-slate-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-teal-50 text-teal-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-teal-200">
            Testemunhos
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-slate-800 mb-4"
            style={{ fontFamily: "var(--font-plus-jakarta-sans, sans-serif)" }}
          >
            O que dizem os nossos doentes
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            A confiança dos nossos doentes é o nosso maior reconhecimento. Estas são algumas das experiências que nos motivam todos os dias.
          </p>
        </motion.div>

        {/* Overall rating */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white border border-slate-100 rounded-2xl px-8 py-5 flex items-center gap-6 shadow-sm">
            <div className="text-center">
              <div
                className="text-4xl font-bold text-slate-800"
                style={{ fontFamily: "var(--font-plus-jakarta-sans, sans-serif)" }}
              >
                5.0
              </div>
              <StarRating rating={5} />
              <p className="text-xs text-slate-400 mt-1">Avaliação geral</p>
            </div>
            <div className="w-px h-12 bg-slate-100" />
            <div className="text-center">
              <div
                className="text-4xl font-bold text-slate-800"
                style={{ fontFamily: "var(--font-plus-jakarta-sans, sans-serif)" }}
              >
                100%
              </div>
              <p className="text-xs text-slate-400 mt-1">Recomendariam</p>
            </div>
            <div className="w-px h-12 bg-slate-100" />
            <div className="text-center">
              <div
                className="text-4xl font-bold text-slate-800"
                style={{ fontFamily: "var(--font-plus-jakarta-sans, sans-serif)" }}
              >
                4
              </div>
              <p className="text-xs text-slate-400 mt-1">Especialidades</p>
            </div>
          </div>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:shadow-slate-100 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <StarRating rating={t.rating} />
                  <span
                    className="inline-block mt-2 px-2.5 py-0.5 text-xs font-semibold rounded-full"
                    style={{ backgroundColor: `${t.color}15`, color: t.color }}
                  >
                    {t.specialty}
                  </span>
                </div>
                <Quote className="w-6 h-6 text-slate-200 flex-shrink-0" />
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-5">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: `${t.color}20`, color: t.color, fontFamily: "var(--font-plus-jakarta-sans, sans-serif)" }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
