"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Anchor, Fish, Wind } from "lucide-react";

const milestones = [
  {
    year: "1993",
    title: "Os primeiros anos",
    text: "Fundado por pescadores de Buarcos, o Marégrafo nasce da tradição de servir o peixe acabado de chegar ao cais.",
  },
  {
    year: "2001",
    title: "A vista privilegiada",
    text: "A mudança para o atual espaço trouxe a grande janela sobre o Atlântico — hoje o nosso cartão de visita.",
  },
  {
    year: "Hoje",
    title: "Tradição renovada",
    text: "Mantemos os sabores de sempre com o mesmo compromisso: só entra na cozinha o que o mar deu nessa manhã.",
  },
];

export default function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="historia"
      className="py-24 px-6 md:px-12 overflow-hidden"
      style={{ backgroundColor: "#F8F9FA" }}
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
            style={{ backgroundColor: "#B8E0D2", color: "#003049" }}
          >
            <Anchor className="w-4 h-4" />
            <span className="text-sm font-semibold">Buarcos · Vila Piscatória</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-5"
            style={{
              fontFamily: "Lexend, sans-serif",
              color: "#003049",
            }}
          >
            Uma história que cheira a sal
          </h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "#4a6070" }}>
            Buarcos é uma das mais antigas vilas piscatórias da costa portuguesa. O Marégrafo
            nasceu desta herança — não como restaurante turístico, mas como extensão natural
            de quem vive do mar.
          </p>
        </motion.div>

        {/* Two column layout */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          {/* Left: ocean illustration / visual element */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div
              className="rounded-3xl overflow-hidden aspect-[4/3] flex items-center justify-center relative"
              style={{ backgroundColor: "#003049" }}
            >
              {/* Decorative ocean scene */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #001f30 0%, #003049 50%, #004d6b 100%)" }} />
              {/* Waves */}
              <svg className="absolute bottom-0 w-full" viewBox="0 0 400 120" preserveAspectRatio="none">
                <path
                  fill="#B8E0D2"
                  fillOpacity="0.2"
                  d="M0,60 C100,20 200,100 300,60 C350,40 380,70 400,60 L400,120 L0,120 Z"
                />
                <path
                  fill="#B8E0D2"
                  fillOpacity="0.1"
                  d="M0,80 C80,50 160,90 240,70 C300,55 360,80 400,70 L400,120 L0,120 Z"
                />
              </svg>
              {/* Fishing boat icon */}
              <div className="relative z-10 text-center">
                <div className="text-7xl mb-4">⚓</div>
                <p
                  className="text-white text-xl font-bold"
                  style={{ fontFamily: "Lexend, sans-serif" }}
                >
                  Buarcos, Figueira da Foz
                </p>
                <p className="text-[#B8E0D2] text-sm mt-1">Costa da Prata · Atlântico Norte</p>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-5 -right-5 rounded-2xl shadow-xl p-4 flex items-center gap-3"
              style={{ backgroundColor: "#D4A574" }}
            >
              <Fish className="w-6 h-6 text-white" />
              <div>
                <p className="text-white font-bold text-sm" style={{ fontFamily: "Lexend, sans-serif" }}>
                  Peixe do Dia
                </p>
                <p className="text-white/80 text-xs">Fresco todos os dias</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: milestones */}
          <div className="space-y-8">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                className="flex gap-5"
              >
                <div className="flex-shrink-0">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-sm"
                    style={{
                      backgroundColor: i === 2 ? "#003049" : "#B8E0D2",
                      color: i === 2 ? "#B8E0D2" : "#003049",
                      fontFamily: "Lexend, sans-serif",
                    }}
                  >
                    {m.year}
                  </div>
                </div>
                <div>
                  <h3
                    className="font-bold text-lg mb-1"
                    style={{ fontFamily: "Lexend, sans-serif", color: "#003049" }}
                  >
                    {m.title}
                  </h3>
                  <p className="leading-relaxed text-sm" style={{ color: "#4a6070" }}>
                    {m.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="rounded-3xl p-8 md:p-12 grid md:grid-cols-3 gap-8"
          style={{ backgroundColor: "#003049" }}
        >
          {[
            {
              icon: <Fish className="w-6 h-6" />,
              title: "Pesca local",
              text: "Trabalhamos com pescadores de Buarcos que saem ao mar todos os dias.",
            },
            {
              icon: <Wind className="w-6 h-6" />,
              title: "Sazonal e honesto",
              text: "A ementa muda conforme o que o mar oferece. Nunca congelado.",
            },
            {
              icon: <Anchor className="w-6 h-6" />,
              title: "Tradição viva",
              text: "Receitas passadas de geração em geração, com o mesmo carinho de sempre.",
            },
          ].map(({ icon, title, text }) => (
            <div key={title} className="text-center">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "rgba(184,224,210,0.15)", color: "#B8E0D2" }}
              >
                {icon}
              </div>
              <h4
                className="font-bold mb-2 text-white"
                style={{ fontFamily: "Lexend, sans-serif" }}
              >
                {title}
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: "#B8E0D2/70", opacity: 0.7 }}>
                {text}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
