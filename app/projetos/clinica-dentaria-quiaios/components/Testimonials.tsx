"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Maria José Simões",
    location: "Quiaios",
    text: "Há mais de dez anos que a minha família vem aqui. A Dra. Ana conhece cada um dos meus filhos pelo nome e isso faz toda a diferença. Nunca precisámos de ir à Figueira para nada.",
    rating: 5,
    treatment: "Família — consultas regulares",
  },
  {
    name: "António Rodrigues",
    location: "Brenha",
    text: "Fiz um implante aqui e correu lindamente. O Dr. Miguel explicou tudo ao pormenor, o orçamento foi claro logo no início e nunca senti aquela ansiedade que tenho noutros dentistas.",
    rating: 5,
    treatment: "Implante dentário",
  },
  {
    name: "Filipa Costa",
    location: "Quiaios",
    text: "A minha filha tinha um medo enorme do dentista. Desde que veio aqui com a Dra. Sofia, a coisa mudou completamente. Agora até pede para vir! Recomendo a todas as famílias da zona.",
    rating: 5,
    treatment: "Odontopediatria",
  },
  {
    name: "José Manuel Figueiredo",
    location: "Buarcos",
    text: "Vim de Buarcos por recomendação de um vizinho de Quiaios. Fiz o tratamento de canal e não senti dor nenhuma. Ambiente muito simpático e preços honestos. Voltei para o check-up anual.",
    rating: 5,
    treatment: "Tratamento de canal",
  },
  {
    name: "Conceição Marques",
    location: "Quiaios",
    text: "Já sou paciente há quase vinte anos. Esta clínica faz parte da nossa vila tanto como a padaria ou o café. É bom saber que existe aqui, ao lado de casa, um sítio onde nos tratam bem.",
    rating: 5,
    treatment: "Paciente de longa data",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-[#C2703B] text-[#C2703B]" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  return (
    <section
      id="testemunhos"
      ref={ref}
      className="py-20 lg:py-28 bg-white overflow-hidden"
      aria-label="Testemunhos de pacientes"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-sm font-bold tracking-widest uppercase text-[#C2703B] mb-4">
            Testemunhos
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-[#3D2B1F] leading-tight mb-4"
            style={{ fontFamily: "'Nunito Sans', sans-serif" }}
          >
            O que dizem
            <br />os nossos pacientes
          </h2>
          <p className="text-[#8B6F47] text-lg max-w-xl mx-auto leading-relaxed">
            Histórias reais de pessoas reais da nossa comunidade.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          {/* Main testimonial */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#FFF8F0] rounded-3xl p-8 sm:p-12 border border-[#E8D5C0] relative min-h-[260px] flex flex-col justify-between">
              {/* Quote icon */}
              <div className="absolute top-6 right-8 opacity-10">
                <Quote className="w-20 h-20 text-[#C2703B]" />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                >
                  <StarRating count={testimonials[active].rating} />
                  <blockquote className="mt-4 text-lg sm:text-xl text-[#3D2B1F] leading-relaxed font-medium mb-6">
                    &ldquo;{testimonials[active].text}&rdquo;
                  </blockquote>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* Avatar initial */}
                      <div
                        className="w-10 h-10 rounded-full bg-[#C2703B] flex items-center justify-center text-white font-bold text-sm shrink-0"
                        style={{ fontFamily: "'Nunito Sans', sans-serif" }}
                      >
                        {testimonials[active].name
                          .split(" ")
                          .slice(0, 2)
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="font-bold text-[#3D2B1F] text-sm">
                          {testimonials[active].name}
                        </div>
                        <div className="text-xs text-[#8B6F47]">
                          {testimonials[active].location}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold bg-[#C2703B]/10 text-[#C2703B] rounded-full px-3 py-1 self-start sm:self-auto">
                      {testimonials[active].treatment}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prev}
                aria-label="Testemunho anterior"
                className="w-10 h-10 rounded-full border-2 border-[#E8D5C0] hover:border-[#C2703B] flex items-center justify-center text-[#8B6F47] hover:text-[#C2703B] transition-all duration-150"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Ir para testemunho ${i + 1}`}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      i === active
                        ? "bg-[#C2703B] w-6"
                        : "bg-[#E8D5C0] hover:bg-[#C2703B]/40"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                aria-label="Próximo testemunho"
                className="w-10 h-10 rounded-full border-2 border-[#E8D5C0] hover:border-[#C2703B] flex items-center justify-center text-[#8B6F47] hover:text-[#C2703B] transition-all duration-150"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
