"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Maria João Ferreira",
    age: "38 anos",
    text: "Fui à Premium pela primeira vez com muita ansiedade — tenho medo do dentista desde criança. A Dra. Sofia foi incrivelmente paciente e hoje já não me custa nada marcar consulta. A abordagem de prevenção mudou a minha relação com a saúde oral.",
    rating: 5,
    service: "Prevenção e Higiene Oral",
    initials: "MJ",
  },
  {
    name: "António Rodrigues",
    age: "52 anos",
    text: "Fiz implantes com o Dr. Rui e o resultado superou as expectativas. Desde o planeamento digital até à colocação, tudo foi explicado ao pormenor. Sinto-me muito mais confiante a sorrir agora.",
    rating: 5,
    service: "Implantologia",
    initials: "AR",
  },
  {
    name: "Carla Mendes",
    age: "Mãe de 3 filhos",
    text: "Os meus filhos adoram ir à clínica! A Dra. Ana tem um jeito incrível com crianças. O mais novo, que tinha muito medo, agora pede para ir ao dentista. Melhor publicidade que posso fazer.",
    rating: 5,
    service: "Odontopediatria",
    initials: "CM",
  },
  {
    name: "Pedro Soares",
    age: "27 anos",
    text: "Fiz o tratamento de ortodontia com alinhadores e ficou perfeito. Adorei poder ver o resultado previsto no computador antes de começar. Recomendo a todos os meus amigos.",
    rating: 5,
    service: "Ortodontia",
    initials: "PS",
  },
  {
    name: "Rosa Pinheiro",
    age: "65 anos",
    text: "Venho à Premium há muitos anos. A equipa conhece-me bem e adapta sempre o tratamento às minhas necessidades. O programa de prevenção para sénior é excelente — sinto-me acompanhada.",
    rating: 5,
    service: "Programa Sénior",
    initials: "RP",
  },
  {
    name: "Henrique Lopes",
    age: "44 anos",
    text: "Fiz as facetas de porcelana para o sorriso que sempre quis. O resultado é absolutamente natural — os meus colegas notaram que eu estava diferente mas ninguém descobriu porquê. Fantástico.",
    rating: 5,
    service: "Estética Dentária",
    initials: "HL",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="testemunhos"
      ref={ref}
      className="py-24 md:py-32 bg-[#D1FAE5]/30"
      aria-labelledby="testimonials-heading"
    >
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#D1FAE5] rounded-full px-4 py-1.5 mb-6">
            <Star className="w-3.5 h-3.5 text-[#064E3B]" fill="#064E3B" />
            <span className="text-xs font-semibold text-[#064E3B] uppercase tracking-wider">
              Testemunhos
            </span>
          </div>
          <h2
            id="testimonials-heading"
            className="text-3xl md:text-5xl font-bold text-[#064E3B] leading-tight mb-4"
            style={{ fontFamily: "var(--font-sora), sans-serif" }}
          >
            O que dizem{" "}
            <span className="text-[#6B8F71]">os nossos pacientes</span>
          </h2>
          <p className="text-lg text-[#064E3B]/60">
            A melhor prova do nosso trabalho são as palavras de quem nos confia o seu sorriso.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={cardVariants}
              className="bg-white rounded-3xl p-7 flex flex-col hover:shadow-lg transition-shadow duration-300"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-[#D1FAE5] mb-4" fill="#D1FAE5" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#064E3B]" fill="#064E3B" />
                ))}
              </div>

              {/* Text */}
              <p className="text-[#064E3B]/70 text-sm leading-relaxed flex-1 mb-6">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#D1FAE5] rounded-full flex items-center justify-center font-bold text-[#064E3B] text-sm">
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#064E3B]">{testimonial.name}</div>
                    <div className="text-xs text-[#064E3B]/50">{testimonial.age}</div>
                  </div>
                </div>
                <div className="bg-[#D1FAE5]/60 text-[#064E3B] text-xs font-medium px-3 py-1 rounded-full text-right">
                  {testimonial.service}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Google reviews note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="text-center text-sm text-[#064E3B]/45 mt-10"
        >
          Todos os testemunhos são reais e verificáveis. Classificação média de 4,9 ⭐ no Google Reviews.
        </motion.p>
      </div>
    </section>
  );
}
