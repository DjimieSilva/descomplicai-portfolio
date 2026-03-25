"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ChefHat, Quote } from "lucide-react";

const philosophy = [
  {
    title: "Produto Local",
    text: "Trabalhamos diretamente com produtores da região centro, garantindo frescura máxima e apoio à economia local.",
  },
  {
    title: "Técnica Contemporânea",
    text: "Receitas clássicas portuguesas reinterpretadas com técnicas modernas, sem perder a alma original.",
  },
  {
    title: "Sazonalidade",
    text: "A ementa muda a cada estação. O que a natureza oferece, nós cozinhamos — sem atalhos.",
  },
];

export default function Chef() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="chef" className="py-24 bg-[#FFFDF7] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1E293B]/10 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-[#F59E0B]" />
            <ChefHat className="w-5 h-5 text-[#B45309]" />
            <div className="h-px w-8 bg-[#F59E0B]" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#1E293B] mb-4"
            style={{ fontFamily: "'Work Sans', sans-serif" }}
          >
            A Nossa Equipa
          </h2>
          <p className="text-[#1E293B]/60 text-lg max-w-xl mx-auto">
            Por detrás de cada prato, uma equipa apaixonada que vê a cozinha como arte e vocação.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — chef card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-[#1E293B] rounded-sm p-10 relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="chef-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                      <circle cx="20" cy="20" r="15" fill="none" stroke="#F59E0B" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#chef-pattern)" />
                </svg>
              </div>

              {/* Quote icon */}
              <Quote className="w-10 h-10 text-[#F59E0B]/30 mb-6" />

              {/* Chef avatar placeholder */}
              <div className="w-20 h-20 rounded-full bg-[#F59E0B]/20 border-2 border-[#F59E0B]/40 flex items-center justify-center mb-6">
                <ChefHat className="w-10 h-10 text-[#F59E0B]" />
              </div>

              <blockquote className="text-[#FFFDF7]/85 text-xl italic font-light leading-relaxed mb-8">
                "Cozinhar com produtos portugueses é uma responsabilidade. Cada prato que sai desta cozinha
                é um tributo à nossa terra, às nossas gentes e à nossa história."
              </blockquote>

              <div>
                <div
                  className="text-[#FFFDF7] font-bold text-lg"
                  style={{ fontFamily: "'Work Sans', sans-serif" }}
                >
                  Chef Cataventos
                </div>
                <div className="text-[#F59E0B]/70 text-sm tracking-wider uppercase mt-1">
                  Chef Executivo · Figueira da Foz
                </div>
              </div>

              {/* Bottom gold line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F59E0B] via-[#B45309] to-[#F59E0B]" />
            </div>

            {/* Experience badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-5 -right-5 bg-[#F59E0B] text-[#1E293B] p-5 rounded-sm shadow-lg"
            >
              <div className="text-2xl font-bold" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                +15
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider">Anos de<br />Experiência</div>
            </motion.div>
          </motion.div>

          {/* Right — philosophy */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3
              className="text-2xl font-bold text-[#1E293B] mb-2"
              style={{ fontFamily: "'Work Sans', sans-serif" }}
            >
              Filosofia de Cozinha
            </h3>
            <p className="text-[#1E293B]/60 mb-8">
              Três princípios que guiam cada decisão que tomamos dentro e fora da cozinha.
            </p>

            <div className="space-y-6">
              {philosophy.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="flex gap-5 items-start"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-sm bg-[#F59E0B] flex items-center justify-center text-[#1E293B] font-bold text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1E293B] mb-1">{item.title}</h4>
                    <p className="text-[#1E293B]/60 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Team stats */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { value: "8", label: "Chefs" },
                { value: "15+", label: "Anos" },
                { value: "1", label: "Distinção" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center border border-[#1E293B]/10 rounded-sm p-4 bg-white/50"
                >
                  <div
                    className="text-2xl font-bold text-[#1E293B]"
                    style={{ fontFamily: "'Work Sans', sans-serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[#1E293B]/50 text-xs tracking-wider uppercase mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
