"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Maria João Ferreira",
    origin: "Lisboa",
    text: "Uma das melhores experiências gastronómicas que tive em Portugal. O bacalhau à Brás contemporâneo é simplesmente inesquecível. O Chef Pedro é um mestre.",
    rating: 5,
    occasion: "Aniversário",
  },
  {
    name: "António Rodrigues",
    origin: "Porto",
    text: "Fui à Figueira da Foz especificamente para jantar no Picadeiro após a recomendação de um amigo. Valeu cada quilómetro. A harmonização de vinhos é impecável.",
    rating: 5,
    occasion: "Jantar de Negócios",
  },
  {
    name: "Beatriz Santos",
    origin: "Coimbra",
    text: "O menu de degustação Atlântico foi uma viagem pelos sabores do mar português. Cada momento mais surpreendente que o anterior. Serviço impecável, ambiente acolhedor.",
    rating: 5,
    occasion: "Menu Degustação",
  },
  {
    name: "Carlos & Sofia Neves",
    origin: "Aveiro",
    text: "Celebrámos o nosso aniversário de casamento na Adega Privada. Foi perfeito em todos os sentidos — privacidade, serviço personalizado, vinho extraordinário.",
    rating: 5,
    occasion: "Jantar Privado",
  },
  {
    name: "Luísa Marques",
    origin: "Figueira da Foz",
    text: "Como moradora local, o Picadeiro é a minha referência para ocasiões especiais. Em quase quatro décadas nunca desiludiu. Uma instituição desta cidade.",
    rating: 5,
    occasion: "Cliente Habitual",
  },
  {
    name: "François Dupont",
    origin: "Paris, França",
    text: "In all my travels through Portugal, O Picadeiro stands out for its authentic yet refined approach. The roasted kid was extraordinary. I will return.",
    rating: 5,
    occasion: "Viagem Gastronómica",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-[#B87333] text-[#B87333]" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  };

  const t = testimonials[current];

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 bg-[#1B4332]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-8 bg-[#B87333]" />
            <span
              className="text-[#B87333] text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              O Que Dizem
            </span>
            <div className="h-px w-8 bg-[#B87333]" />
          </div>

          <h2
            className="text-4xl md:text-5xl font-light text-[#FFFBEB]"
            style={{ fontFamily: "var(--font-literata)" }}
          >
            Palavras dos{" "}
            <span className="italic text-[#B87333]">Nossos Convidados</span>
          </h2>
        </motion.div>

        {/* Main testimonial */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 60 }}
              transition={{ duration: 0.5 }}
              className="text-center px-4"
            >
              {/* Opening quote */}
              <p
                className="text-[#B87333]/30 text-8xl leading-none mb-4"
                style={{ fontFamily: "var(--font-literata)" }}
              >
                "
              </p>

              <div className="flex justify-center mb-6">
                <Stars count={t.rating} />
              </div>

              <blockquote
                className="text-xl md:text-2xl font-light italic text-[#FFFBEB]/85 leading-relaxed mb-8 max-w-3xl mx-auto"
                style={{ fontFamily: "var(--font-literata)" }}
              >
                {t.text}
              </blockquote>

              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-8 bg-[#B87333]/50" />
                <div className="text-center">
                  <p
                    className="text-[#FFFBEB] font-medium text-sm"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-[#FFFBEB]/40 text-xs mt-0.5"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {t.origin} · {t.occasion}
                  </p>
                </div>
                <div className="h-px w-8 bg-[#B87333]/50" />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={prev}
              className="w-10 h-10 border border-[#FFFBEB]/20 flex items-center justify-center hover:border-[#B87333] hover:text-[#B87333] text-[#FFFBEB]/50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`h-0.5 transition-all duration-300 ${
                    i === current ? "w-8 bg-[#B87333]" : "w-3 bg-[#FFFBEB]/20"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 border border-[#FFFBEB]/20 flex items-center justify-center hover:border-[#B87333] hover:text-[#B87333] text-[#FFFBEB]/50 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Summary stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 pt-12 border-t border-[#FFFBEB]/10 grid grid-cols-3 gap-4"
        >
          {[
            { value: "4.9", label: "Google Reviews" },
            { value: "1.200+", label: "Avaliações" },
            { value: "37 anos", label: "De Excelência" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-3xl md:text-4xl font-light text-[#B87333] mb-1"
                style={{ fontFamily: "var(--font-literata)" }}
              >
                {stat.value}
              </p>
              <p
                className="text-xs tracking-[0.15em] uppercase text-[#FFFBEB]/30"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
