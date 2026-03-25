"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Anchor, Leaf } from "lucide-react";

const pillars = [
  {
    icon: <Heart className="w-5 h-5" />,
    title: "Paixão",
    text: "Cada prato é preparado com a dedicação de quem ama verdadeiramente a cozinha portuguesa.",
  },
  {
    icon: <Anchor className="w-5 h-5" />,
    title: "Tradição",
    text: "Raízes na costa portuguesa, sabores que atravessam gerações e chegam à sua mesa com orgulho.",
  },
  {
    icon: <Leaf className="w-5 h-5" />,
    title: "Frescura",
    text: "Ingredientes locais e sazonais, selecionados diariamente para garantir o melhor sabor.",
  },
];

export default function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="história" className="py-24 bg-[#FFFDF7] relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="story-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#1E293B" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#story-dots)" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-px w-8 bg-[#F59E0B]" />
              <span className="text-[#B45309] text-sm font-semibold tracking-widest uppercase">
                A Nossa História
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold text-[#1E293B] mb-6 leading-tight"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              Onde a Costa{" "}
              <span className="text-[#B45309]">Encontra</span> a Cozinha
            </h2>
            <p className="text-[#1E293B]/70 text-lg leading-relaxed mb-6">
              Nas margens da Figueira da Foz, onde o Atlântico abraça a costa portuguesa, nasceu o
              Cataventos. Um espaço pensado para celebrar a riqueza da gastronomia do nosso país —
              com respeito pela tradição e atenção ao detalhe contemporâneo.
            </p>
            <p className="text-[#1E293B]/70 text-lg leading-relaxed mb-10">
              A distinção da Seleção Gastronomia e Vinhos não é apenas um prémio. É o reflexo de
              anos de dedicação, de escolha cuidada de produtores locais, e de uma equipa que acredita
              que cozinhar bem é, acima de tudo, um ato de amor.
            </p>

            {/* Pillars */}
            <div className="space-y-5">
              {pillars.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-sm bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex items-center justify-center text-[#B45309]">
                    {pillar.icon}
                  </div>
                  <div>
                    <span className="font-semibold text-[#1E293B] text-base">{pillar.title} — </span>
                    <span className="text-[#1E293B]/65 text-base">{pillar.text}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — decorative visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main card */}
            <div className="relative rounded-sm overflow-hidden bg-[#1E293B] aspect-[4/5]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1E293B] to-[#0f1a28]" />
              {/* Abstract food illustration using CSS */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                <div className="w-24 h-24 rounded-full border-2 border-[#F59E0B]/40 flex items-center justify-center mb-6">
                  <svg viewBox="0 0 80 80" fill="none" className="w-14 h-14">
                    <circle cx="40" cy="40" r="30" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 3" />
                    <path d="M25 40 Q40 20 55 40 Q40 60 25 40Z" fill="#F59E0B" fillOpacity="0.3" stroke="#F59E0B" strokeWidth="1" />
                    <circle cx="40" cy="40" r="5" fill="#F59E0B" fillOpacity="0.6" />
                  </svg>
                </div>
                <blockquote className="text-[#FFFDF7]/80 text-xl italic font-light leading-relaxed mb-6">
                  "A cozinha é memória, é identidade, é o elo que nos une à nossa terra."
                </blockquote>
                <div className="h-px w-16 bg-[#F59E0B]/40 mx-auto mb-4" />
                <p className="text-[#F59E0B]/80 text-sm tracking-wider uppercase">
                  Chef Cataventos
                </p>
              </div>
              {/* Bottom decoration */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F59E0B] via-[#B45309] to-[#F59E0B]" />
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-[#F59E0B] text-[#1E293B] p-6 rounded-sm shadow-xl"
            >
              <div className="text-3xl font-bold" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                8.1
              </div>
              <div className="text-xs font-semibold tracking-wider uppercase mt-1">
                Classificação
              </div>
            </motion.div>

            {/* Floating award card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute -top-4 -right-4 bg-[#FFFDF7] border border-[#F59E0B]/30 p-4 rounded-sm shadow-lg"
            >
              <div className="text-[#B45309] text-xs font-semibold tracking-wider uppercase mb-1">
                Distinguido
              </div>
              <div className="text-[#1E293B] text-sm font-bold leading-tight max-w-[120px]">
                Seleção Gastronomia e Vinhos
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
