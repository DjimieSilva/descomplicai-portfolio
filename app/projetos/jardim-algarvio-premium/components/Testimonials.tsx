"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const testimonials = [
  {
    text: "O JardimAlgarvio transformou completamente o nosso espa\u00E7o exterior. O que era um terreno sem gra\u00E7a \u00E9 agora um jardim extraordin\u00E1rio que nos enche de orgulho. A aten\u00E7\u00E3o ao detalhe e o conhecimento das plantas nativas fizeram toda a diferen\u00E7a.",
    author: "Ana & Pedro",
    location: "Vilamoura",
  },
  {
    text: "Profissionalismo e sensibilidade art\u00EDstica numa combina\u00E7\u00E3o rara. O projeto para a minha moradia em Lagos superou todas as expectativas \u2014 cada canto do jardim conta uma hist\u00F3ria e convida a contemplar. A equipa compreendeu perfeitamente a minha vis\u00E3o.",
    author: "Dr. Ricardo Mendes",
    location: "Lagos",
  },
  {
    text: "O jardim que sempre sonh\u00E1mos, mas nunca imagin\u00E1mos poss\u00EDvel. Desde o pomar de citrinos \u00E0 zona de lazer junto \u00E0 piscina, tudo foi pensado ao pormenor. A manuten\u00E7\u00E3o mensal mant\u00E9m tudo impec\u00E1vel durante todo o ano.",
    author: "Fam\u00EDlia Oliveira",
    location: "Tavira",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  return (
    <section
      className="relative py-24 md:py-32 px-6 overflow-hidden"
      style={{ background: "#2A2821" }}
      id="testemunhos"
    >
      {/* Decorative background elements */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ccircle cx='50' cy='50' r='40' fill='none' stroke='%23C9A96E' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      <div className="max-w-4xl mx-auto relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12" style={{ background: "#C9A96E" }} />
            <span
              className="text-xs tracking-[0.4em] uppercase"
              style={{ color: "#C9A96E", fontFamily: "var(--font-inter)" }}
            >
              Testemunhos
            </span>
            <div className="h-px w-12" style={{ background: "#C9A96E" }} />
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "var(--font-playfair)", color: "#F5F0E8" }}
          >
            O Que Dizem <span style={{ color: "#C9A96E" }}>os Nossos Clientes</span>
          </h2>
        </motion.div>

        {/* Testimonial card */}
        <div
          className="relative p-8 md:p-12 lg:p-16"
          style={{
            background: "rgba(26,26,24,0.6)",
            border: "1px solid rgba(201,169,110,0.15)",
            borderRadius: "4px",
          }}
        >
          {/* Large decorative quotation mark */}
          <div className="absolute top-6 left-6 md:top-8 md:left-8">
            <svg
              width="60"
              height="50"
              viewBox="0 0 60 50"
              fill="none"
              className="md:w-[80px] md:h-[66px]"
            >
              <path
                d="M0 30 C0 13.4 13.4 0 30 0 L30 10 C19 10 10 19 10 30 L10 50 L0 50 Z"
                fill="#C9A96E"
                opacity="0.15"
              />
              <path
                d="M30 30 C30 13.4 43.4 0 60 0 L60 10 C49 10 40 19 40 30 L40 50 L30 50 Z"
                fill="#C9A96E"
                opacity="0.15"
              />
            </svg>
          </div>

          {/* Animated testimonial */}
          <div className="min-h-[200px] md:min-h-[180px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <p
                  className="text-xl md:text-2xl lg:text-3xl leading-relaxed mb-8"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontStyle: "italic",
                    color: "rgba(245,240,232,0.9)",
                    fontWeight: 400,
                  }}
                >
                  &ldquo;{testimonials[current].text}&rdquo;
                </p>
                <div>
                  <div
                    className="text-base font-bold mb-1"
                    style={{ color: "#C9A96E", fontFamily: "var(--font-playfair)" }}
                  >
                    {testimonials[current].author}
                  </div>
                  <div
                    className="text-xs tracking-wider uppercase"
                    style={{ color: "rgba(245,240,232,0.4)" }}
                  >
                    {testimonials[current].location}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="transition-all duration-300"
                style={{
                  width: current === i ? "32px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  background:
                    current === i ? "#C9A96E" : "rgba(201,169,110,0.3)",
                }}
                aria-label={`Testemunho ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
