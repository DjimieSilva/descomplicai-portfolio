"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef, useState } from "react";

const services = [
  {
    emoji: "🔍",
    title: "Consulta de Diagnóstico",
    shortDesc: "A primeira visita — vamos conhecer-nos!",
    fullDesc:
      "Na primeira consulta, o dentista faz amizade com o teu filho antes de qualquer tratamento. Examinamos os dentes de forma lúdica, tiramos uma radiografia se necessário e explicamos tudo aos pais. Sem surpresas!",
    color: "#7C3AED",
    bg: "#F5F3FF",
    tag: "Todos os idades",
  },
  {
    emoji: "🦷",
    title: "Limpeza e Higiene Oral",
    shortDesc: "Dentes brilhantes como estrelas!",
    fullDesc:
      "Limpeza profissional com pasta de dentes com sabores (morango, tutti-frutti ou menta!). Ensinamos a escovar corretamente e os segredos do fio dental. A criança sai com um kit de higiene de presente.",
    color: "#38BDF8",
    bg: "#F0F9FF",
    tag: "A partir dos 2 anos",
  },
  {
    emoji: "🛡️",
    title: "Selantes e Vernizes de Flúor",
    shortDesc: "Proteção mágica contra as cáries!",
    fullDesc:
      "Os selantes de fissura são uma camada protetora invisível que colocamos nos dentes definitivos para bloquear as cáries. Os vernizes de flúor fortalecem o esmalte. É rápido, indolor e super eficaz!",
    color: "#34D399",
    bg: "#F0FDF4",
    tag: "4–14 anos",
  },
  {
    emoji: "💉",
    title: "Tratamento de Cáries",
    shortDesc: "Adeus bichinho dos dentes!",
    fullDesc:
      "Utilizamos gel anestésico com sabor antes da anestesia para que o teu filho não sinta nada. Os tratamentos são explicados em linguagem infantil — 'vamos fazer dormir o dente' — para não causar medo.",
    color: "#F472B6",
    bg: "#FDF2F8",
    tag: "Todas as idades",
  },
  {
    emoji: "😁",
    title: "Ortodontia Infantil",
    shortDesc: "Para um sorriso direito e bonito!",
    fullDesc:
      "Aparelhos removíveis coloridos ou fixos para corrigir o alinhamento dos dentes e a mordida. As consultas de acompanhamento são regulares e os aparelhos podem ter as cores favoritas do teu filho!",
    color: "#FBBF24",
    bg: "#FFFBEB",
    tag: "8–17 anos",
  },
  {
    emoji: "😴",
    title: "Sedação Consciente",
    shortDesc: "Para as crianças com mais medo",
    fullDesc:
      "Para crianças com ansiedade elevada, oferecemos sedação com óxido nitroso ('gás do riso') — a criança fica relaxada e bem-disposta. Completamente seguro e aprovado para pediatria.",
    color: "#7C3AED",
    bg: "#F5F3FF",
    tag: "A avaliar caso a caso",
  },
  {
    emoji: "🚿",
    title: "Urgências Dentárias",
    shortDesc: "Estamos cá quando precisas!",
    fullDesc:
      "Dente partido, dor de dentes intensa, trauma — temos slots de urgência todos os dias. Liga para nós e tentamos receber o teu filho no próprio dia.",
    color: "#F472B6",
    bg: "#FDF2F8",
    tag: "Todos as idades",
  },
  {
    emoji: "📋",
    title: "Consulta de Ortopedia Dentofacial",
    shortDesc: "O crescimento certo da boca e mandíbula",
    fullDesc:
      "Avaliamos o desenvolvimento da face, mandíbula e oclusão. Uma intervenção precoce pode evitar tratamentos mais complexos no futuro. Recomendamos a avaliação a partir dos 6–7 anos.",
    color: "#38BDF8",
    bg: "#F0F9FF",
    tag: "6–12 anos",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
};

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-purple-50" id="servicos">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            🦷 Os Nossos Serviços
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black text-purple-900 mb-6"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Tudo o que os{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
              dentes dos teus filhos
            </span>{" "}
            precisam
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Clica em cada serviço para saberes mais. Tudo explicado de forma simples —
            para pais e para crianças!
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 17 } }}
              onClick={() =>
                setExpanded(expanded === service.title ? null : service.title)
              }
              className="cursor-pointer rounded-3xl p-5 border-2 hover:shadow-xl transition-all duration-300 select-none"
              style={{
                backgroundColor: service.bg,
                borderColor: expanded === service.title ? service.color : "transparent",
              }}
            >
              <div className="text-4xl mb-3">{service.emoji}</div>
              <span
                className="inline-block text-xs font-bold px-2 py-1 rounded-full mb-2"
                style={{ backgroundColor: service.color + "22", color: service.color }}
              >
                {service.tag}
              </span>
              <h3
                className="text-base font-black text-gray-900 mb-1"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                {service.title}
              </h3>
              <p className="text-sm text-gray-500 mb-3">{service.shortDesc}</p>

              {/* Expandable content */}
              <motion.div
                initial={false}
                animate={{
                  height: expanded === service.title ? "auto" : 0,
                  opacity: expanded === service.title ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="overflow-hidden"
              >
                <p className="text-sm text-gray-600 leading-relaxed pt-2 border-t border-gray-200">
                  {service.fullDesc}
                </p>
              </motion.div>

              <div
                className="mt-2 text-xs font-semibold flex items-center gap-1"
                style={{ color: service.color }}
              >
                {expanded === service.title ? "Ver menos ↑" : "Saber mais ↓"}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
