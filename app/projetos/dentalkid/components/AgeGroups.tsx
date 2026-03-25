"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const ageGroups = [
  {
    range: "0–3 anos",
    label: "Bebés e Bébés",
    emoji: "👶",
    color: "#F472B6",
    bg: "from-pink-400 to-rose-400",
    lightBg: "#FDF2F8",
    desc: "Os primeiros dentes de leite são os mais importantes! A primeira consulta deve ser feita logo que o primeiro dente apareça — por volta dos 6 meses.",
    services: [
      "Avaliação do frénulo lingual (língua presa)",
      "Aconselhamento sobre chupeta e biberão",
      "Prevenção de cáries de biberão",
      "Orientação sobre higiene oral do bebé",
      "Monitorização do crescimento dentário",
    ],
    tip: "Dica para pais: comece a limpar as gengivas do bebé com uma gaze húmida ainda antes dos dentes nascerem!",
    tipEmoji: "💡",
  },
  {
    range: "4–8 anos",
    label: "Pré-escolares e Escolares",
    emoji: "🧒",
    color: "#FBBF24",
    bg: "from-yellow-400 to-amber-400",
    lightBg: "#FFFBEB",
    desc: "A idade da troca! Os dentes de leite caem e os definitivos aparecem. É a altura ideal para criar hábitos de higiene que durem para a vida toda.",
    services: [
      "Selantes de fissura nos primeiros molares definitivos",
      "Aplicação de verniz de flúor",
      "Extração de dentes de leite persistentes",
      "Avaliação ortodôntica precoce",
      "Educação sobre higiene oral de forma lúdica",
    ],
    tip: "Dica para pais: aos 6 anos aparece o 'dente de los 6 anos' — o primeiro molar definitivo. É o mais importante a proteger!",
    tipEmoji: "⭐",
  },
  {
    range: "9–12 anos",
    label: "Pré-adolescentes",
    emoji: "🧑",
    color: "#34D399",
    bg: "from-emerald-400 to-teal-400",
    lightBg: "#F0FDF4",
    desc: "A dentição definitiva está quase completa. É a fase certa para avaliar a necessidade de ortodontia e consolidar os hábitos de higiene.",
    services: [
      "Avaliação ortopédica dentofacial completa",
      "Início de tratamento ortodôntico se necessário",
      "Consultas de higiene e motivação",
      "Selantes nos segundos molares",
      "Tratamento de má oclusão",
    ],
    tip: "Dica para pais: nesta fase as crianças ganham autonomia. Ensine-as a usar fio dental — é tão importante como escovar!",
    tipEmoji: "🦷",
  },
  {
    range: "13–17 anos",
    label: "Adolescentes",
    emoji: "🧑‍🦱",
    color: "#7C3AED",
    bg: "from-violet-500 to-purple-500",
    lightBg: "#F5F3FF",
    desc: "A fase em que o sorriso importa mais do que nunca! Os adolescentes preocupam-se muito com a aparência — e nós ajudamos a criar o sorriso dos sonhos.",
    services: [
      "Ortodontia com aparelhos metálicos ou estéticos",
      "Alinhadores transparentes (Invisalign)",
      "Branqueamento dentário supervisionado",
      "Tratamento de gengivite (muito comum nesta fase)",
      "Avaliação dos dentes do siso",
    ],
    tip: "Dica para pais: os adolescentes com aparelho precisam de higiene reforçada. Escovas interdentais e irrigadores orais são os melhores aliados!",
    tipEmoji: "😎",
  },
];

export default function AgeGroups() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeGroup, setActiveGroup] = useState(0);

  const active = ageGroups[activeGroup];

  return (
    <section className="py-24 bg-white" id="faixas-etarias">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            🎂 Por Faixa Etária
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black text-purple-900 mb-6"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Cuidados adaptados a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
              cada fase
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Cada criança é única e cada fase de crescimento tem as suas
            necessidades específicas. Descobre o que fazemos por cada grupo etário.
          </p>
        </motion.div>

        {/* Tab buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 25 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {ageGroups.map((group, idx) => (
            <button
              key={group.range}
              onClick={() => setActiveGroup(idx)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105 active:scale-95 ${
                activeGroup === idx
                  ? "text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              style={
                activeGroup === idx
                  ? { background: `linear-gradient(to right, ${group.color}cc, ${group.color})` }
                  : {}
              }
            >
              <span className="text-lg">{group.emoji}</span>
              <span className="hidden sm:inline">{group.range}</span>
              <span className="sm:hidden">{group.range.split("–")[0]}+</span>
            </button>
          ))}
        </motion.div>

        {/* Content area */}
        <motion.div
          key={activeGroup}
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="grid lg:grid-cols-2 gap-8 items-start"
        >
          {/* Left: Description */}
          <div
            className="rounded-3xl p-8 border border-gray-100"
            style={{ backgroundColor: active.lightBg }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${active.bg} flex items-center justify-center text-3xl shadow-lg`}
              >
                {active.emoji}
              </div>
              <div>
                <div
                  className="text-sm font-bold mb-1"
                  style={{ color: active.color }}
                >
                  {active.range}
                </div>
                <h3
                  className="text-2xl font-black text-gray-900"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  {active.label}
                </h3>
              </div>
            </div>
            <p className="text-gray-700 text-base leading-relaxed mb-6">{active.desc}</p>

            {/* Parent tip */}
            <div
              className="rounded-2xl p-4 border-l-4"
              style={{ borderColor: active.color, backgroundColor: active.color + "15" }}
            >
              <div className="flex gap-3">
                <span className="text-xl shrink-0">{active.tipEmoji}</span>
                <p className="text-sm text-gray-700 leading-relaxed">{active.tip}</p>
              </div>
            </div>
          </div>

          {/* Right: Services list */}
          <div>
            <h4
              className="text-lg font-black text-gray-900 mb-5"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              O que fazemos nesta fase:
            </h4>
            <div className="space-y-3">
              {active.services.map((service, idx) => (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    delay: idx * 0.07,
                  }}
                  className="flex items-start gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-sm font-black text-white"
                    style={{ backgroundColor: active.color }}
                  >
                    {idx + 1}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{service}</p>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="tel:+351233000000"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="mt-6 inline-flex items-center gap-3 text-white font-black px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ background: `linear-gradient(to right, ${active.color}cc, ${active.color})` }}
            >
              <span>Marcar consulta para {active.range}</span>
              <span>→</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
