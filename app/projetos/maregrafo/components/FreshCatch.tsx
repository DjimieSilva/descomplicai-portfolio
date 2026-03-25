"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sunrise, Truck, ChefHat, UtensilsCrossed } from "lucide-react";

const steps = [
  {
    icon: <Sunrise className="w-7 h-7" />,
    time: "5h00",
    title: "Os pescadores partem",
    text: "Antes do amanhecer, as embarcações de Buarcos saem para o Atlântico. A pesca artesanal garante qualidade e sustentabilidade.",
  },
  {
    icon: <Truck className="w-7 h-7" />,
    time: "8h30",
    title: "Do cais à cozinha",
    text: "O peixe fresco chega directamente do cais de Buarcos. Selecionamos pessoalmente o melhor de cada dia.",
  },
  {
    icon: <ChefHat className="w-7 h-7" />,
    time: "11h00",
    title: "A cozinha prepara",
    text: "Os nossos cozinheiros preparam cada prato com técnicas tradicionais portuguesas, sem mascarar o sabor do mar.",
  },
  {
    icon: <UtensilsCrossed className="w-7 h-7" />,
    time: "12h30",
    title: "Na sua mesa",
    text: "Em menos de 8 horas, o que estava no oceano está no seu prato — com vista para esse mesmo mar.",
  },
];

export default function FreshCatch() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="py-24 px-6 md:px-12 overflow-hidden"
      style={{ backgroundColor: "#003049" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-5"
            style={{ backgroundColor: "rgba(184,224,210,0.15)", color: "#B8E0D2" }}
          >
            <span className="text-sm font-semibold">Do Mar Para a Mesa</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-5"
            style={{ fontFamily: "Lexend, sans-serif" }}
          >
            Menos de 8 horas do
            <br />
            <span style={{ color: "#B8E0D2" }}>oceano ao prato</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto leading-relaxed" style={{ color: "rgba(184,224,210,0.7)" }}>
            Nunca servimos peixe congelado. A nossa promessa é simples: se não
            chegou hoje, não está na ementa.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden md:block absolute top-14 left-0 right-0 h-0.5 mx-16"
            style={{ backgroundColor: "rgba(184,224,210,0.2)" }}
          />

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.time}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * i }}
                className="relative text-center md:text-left"
              >
                {/* Icon circle */}
                <div className="flex md:block justify-center">
                  <div
                    className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center mb-5 mx-auto md:mx-0 border-2"
                    style={{
                      backgroundColor: "#003049",
                      borderColor: "#B8E0D2",
                      color: "#B8E0D2",
                    }}
                  >
                    {step.icon}
                  </div>
                </div>

                {/* Time badge */}
                <div
                  className="inline-block rounded-full px-3 py-1 text-xs font-bold mb-3"
                  style={{ backgroundColor: "#D4A574", color: "white" }}
                >
                  {step.time}
                </div>

                <h3
                  className="font-bold text-white text-lg mb-2"
                  style={{ fontFamily: "Lexend, sans-serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(184,224,210,0.65)" }}>
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-20 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ backgroundColor: "rgba(184,224,210,0.1)", border: "1px solid rgba(184,224,210,0.2)" }}
        >
          <div>
            <h3
              className="text-2xl font-bold text-white mb-2"
              style={{ fontFamily: "Lexend, sans-serif" }}
            >
              Qual o peixe de hoje?
            </h3>
            <p style={{ color: "rgba(184,224,210,0.7)" }} className="text-sm">
              Ligue-nos e ficará a saber o que chegou esta manhã do mar.
            </p>
          </div>
          <a
            href="tel:+351233000000"
            className="flex-shrink-0 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: "#D4A574" }}
          >
            Ligar Agora
          </a>
        </motion.div>
      </div>
    </section>
  );
}
