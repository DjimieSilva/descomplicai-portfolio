"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, Ship, Flame, Star } from "lucide-react";

const steps = [
  {
    time: "05:00",
    icon: Ship,
    label: "Saída dos Barcos",
    desc: "Os pescadores de Buarcos saem ao mar antes do amanhecer, como sempre fizeram.",
  },
  {
    time: "09:00",
    icon: Star,
    label: "Chegada do Peixe",
    desc: "O barco atracado, o peixe desembarca fresco na nossa porta. Sem intermediários.",
  },
  {
    time: "12:00",
    icon: Flame,
    label: "Brasa e Tacho",
    desc: "Do carvão à caldeirada — cozinhado com tempo, amor e os temperos de sempre.",
  },
  {
    time: "13:00",
    icon: Clock,
    label: "Na Sua Mesa",
    desc: "Menos de 8 horas do mar ao prato. O peixe mais fresco da região.",
  },
];

export function FreshFish() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 relative overflow-hidden"
      style={{ background: "#1E3A5F" }}
    >
      {/* Diagonal rope pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -60deg,
            #C9B896 0px,
            #C9B896 1px,
            transparent 1px,
            transparent 20px
          )`,
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-[#C9B896] text-sm uppercase tracking-[0.2em] font-semibold mb-3">
            Peixe Fresco do Dia
          </p>
          <h2
            className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight"
            style={{ fontFamily: "var(--font-merriweather)" }}
          >
            Do Mar à Brasa<br />
            <span className="text-[#C9B896]">em Menos de 8 Horas</span>
          </h2>
          <div className="w-16 h-1 bg-[#C9B896]/60 mx-auto" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Line connecting steps (desktop) */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-[#C9B896]/20" />

          <div className="grid md:grid-cols-4 gap-10 md:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.time}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.15 * i }}
                  className="text-center relative"
                >
                  {/* Icon circle */}
                  <div className="relative inline-block mb-5">
                    <div className="w-16 h-16 rounded-full bg-[#C9B896]/10 border border-[#C9B896]/30 flex items-center justify-center mx-auto">
                      <Icon className="w-7 h-7 text-[#C9B896]" strokeWidth={1.5} />
                    </div>
                    <span className="absolute -top-2 -right-2 text-[10px] font-bold bg-[#C9B896] text-[#1E3A5F] px-2 py-0.5 rounded-full">
                      {step.time}
                    </span>
                  </div>
                  <h3
                    className="text-base font-bold text-white mb-2"
                    style={{ fontFamily: "var(--font-merriweather)" }}
                  >
                    {step.label}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 border border-[#C9B896]/40 px-6 py-3 rounded-full text-[#C9B896] text-sm uppercase tracking-widest">
            <Star className="w-4 h-4 fill-current" />
            <span>O peixe do dia muda todos os dias — como deve ser</span>
            <Star className="w-4 h-4 fill-current" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
