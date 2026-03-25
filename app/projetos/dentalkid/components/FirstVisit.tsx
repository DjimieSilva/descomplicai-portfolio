"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    step: "1",
    emoji: "📞",
    title: "Marcas a consulta",
    desc: "Liga para nós ou envia mensagem pelo WhatsApp. Escolhes a clínica (Buarcos ou Tavarede), o dia e a hora que te convém.",
    color: "#7C3AED",
    detail: "Tempo: 2 minutos",
  },
  {
    step: "2",
    emoji: "🚪",
    title: "Chegada à clínica",
    desc: "A nossa rececionista recebe-te com um sorriso. A sala de espera tem tablets, livros e brinquedos para entreter o teu filho enquanto espera.",
    color: "#38BDF8",
    detail: "Sala de espera divertida",
  },
  {
    step: "3",
    emoji: "🤝",
    title: "Conhecer o dentista",
    desc: "O dentista apresenta-se e conversa primeiro com a criança — de forma descontraída e sem instrumentos. O objetivo é criar confiança antes de qualquer exame.",
    color: "#34D399",
    detail: "Sem pressão nem apressar",
  },
  {
    step: "4",
    emoji: "🔦",
    title: "Exame lúdico",
    desc: "Com espelhinhos coloridos e 'contamos os dentes' — o exame é transformado numa brincadeira. A criança vê os próprios dentes no ecrã se quiser!",
    color: "#F472B6",
    detail: "Indolor e divertido",
  },
  {
    step: "5",
    emoji: "💬",
    title: "Conversa com os pais",
    desc: "O dentista explica tudo o que encontrou, propõe o plano de tratamento e responde a todas as perguntas — com tempo e sem pressa.",
    color: "#FBBF24",
    detail: "Transparência total",
  },
  {
    step: "6",
    emoji: "🎁",
    title: "Presente e próxima visita",
    desc: "A criança escolhe um presente da nossa caixa de tesouros e já sai com a próxima consulta marcada. Queremos que ela saia contente e ansiosa por voltar!",
    color: "#7C3AED",
    detail: "Sempre uma surpresa",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 280, damping: 22 },
  },
};

export default function FirstVisit() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="py-24 bg-gradient-to-b from-purple-50 to-yellow-50"
      id="primeira-visita"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            🌟 Primeira Visita
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black text-purple-900 mb-6"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            O que acontece na{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-400">
              primeira consulta?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Sabemos que os pais ficam nervosos antes da primeira visita ao dentista.
            Por isso, detalhamos tudo o que vai acontecer — passo a passo, sem surpresas!
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {steps.map((s, idx) => (
            <motion.div
              key={s.step}
              variants={stepVariants}
              whileHover={{
                y: -6,
                transition: { type: "spring", stiffness: 400, damping: 17 },
              }}
              className="relative bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Step connector line (hidden on mobile) */}
              {idx < steps.length - 1 && (idx + 1) % 3 !== 0 && (
                <div className="hidden lg:block absolute top-8 -right-3 w-6 h-0.5 bg-gray-200 z-10" />
              )}

              {/* Number badge */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg mb-4"
                style={{ backgroundColor: s.color }}
              >
                {s.emoji}
              </div>

              {/* Step number chip */}
              <span
                className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white"
                style={{ backgroundColor: s.color + "aa" }}
              >
                {s.step}
              </span>

              <h3
                className="text-lg font-black text-gray-900 mb-2"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                {s.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">{s.desc}</p>
              <span
                className="text-xs font-bold px-3 py-1 rounded-full"
                style={{ backgroundColor: s.color + "22", color: s.color }}
              >
                {s.detail}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, type: "spring", stiffness: 200, damping: 25 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-white rounded-3xl px-8 py-6 shadow-md border border-purple-100">
            <p className="text-gray-700 text-lg font-semibold mb-2">
              ⏱️ Duração média da primeira consulta:{" "}
              <strong className="text-purple-700">45–60 minutos</strong>
            </p>
            <p className="text-gray-500 text-sm">
              Levamos o tempo que for necessário — nunca apressamos uma criança.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
