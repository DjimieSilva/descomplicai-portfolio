"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const pillars = [
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path
          d="M18 3C18 3 6 9 6 18C6 24.627 11.373 30 18 30C24.627 30 30 24.627 30 18C30 9 18 3 18 3Z"
          stroke="#CFB53B"
          strokeWidth="1.5"
          fill="none"
        />
        <path d="M18 12V18L22 20" stroke="#CFB53B" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Receitas Centenárias",
    description:
      "As nossas receitas têm mais de um século. Passadas de mão em mão, de avó para neta, guardadas em cadernos amarelados que nunca deixaram a cozinha.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path
          d="M8 28C8 28 10 20 18 20C26 20 28 28 28 28"
          stroke="#CFB53B"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="18" cy="13" r="5" stroke="#CFB53B" strokeWidth="1.5" />
        <path d="M6 18H30" stroke="#CFB53B" strokeWidth="0.75" strokeDasharray="2 3" />
      </svg>
    ),
    title: "Produto Local",
    description:
      "Trabalhamos com os pescadores de Buarcos desde sempre. O peixe que sai do mar de manhã está na mesa ao almoço. A frescura não se imita.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path
          d="M8 8H28V24C28 26.209 26.209 28 24 28H12C9.791 28 8 26.209 8 24V8Z"
          stroke="#CFB53B"
          strokeWidth="1.5"
        />
        <path d="M14 8V6M18 8V5M22 8V6" stroke="#CFB53B" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M13 16H23M13 20H20" stroke="#CFB53B" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Cozinha de Alma",
    description:
      "Não há atalhos na nossa cozinha. O bacalhau demolha 48 horas. O cabrito assado leva o dia inteiro. A pressa nunca entrou por esta porta.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path
          d="M18 6L20.5 13.5H28.5L22 18L24.5 25.5L18 21L11.5 25.5L14 18L7.5 13.5H15.5L18 6Z"
          stroke="#CFB53B"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Hospitalidade Genuína",
    description:
      "Os nossos clientes tornam-se família. Há quem venha ao Bijou desde criança e hoje traz os filhos. Essa continuidade é o maior elogio que podemos receber.",
  },
];

export default function Philosophy() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="filosofia"
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: "#4A3728" }}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <svg viewBox="0 0 800 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="philo-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path
                d="M40 5 Q55 20 40 40 Q25 20 40 5Z"
                fill="none"
                stroke="#CFB53B"
                strokeWidth="1"
              />
              <path
                d="M5 40 Q20 25 40 40 Q20 55 5 40Z"
                fill="none"
                stroke="#CFB53B"
                strokeWidth="1"
              />
              <path
                d="M75 40 Q60 25 40 40 Q60 55 75 40Z"
                fill="none"
                stroke="#CFB53B"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#philo-pattern)" />
        </svg>
      </div>

      <div ref={ref} className="relative max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p
            className="text-xs tracking-[0.4em] uppercase mb-4"
            style={{ color: "#CFB53B", fontFamily: "var(--font-source-sans-3)" }}
          >
            A Nossa Filosofia
          </p>
          <h2
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{ fontFamily: "var(--font-eb-garamond)", color: "#FFFFF0" }}
          >
            O Que Nos Torna
            <br />
            <em>Diferentes</em>
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-20" style={{ background: "#CFB53B" }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#CFB53B" }} />
            <div className="h-px w-20" style={{ background: "#CFB53B" }} />
          </div>
        </motion.div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="group p-8 border transition-all duration-300"
              style={{
                borderColor: "rgba(207,181,59,0.2)",
                background: "rgba(255,255,240,0.03)",
              }}
            >
              <div className="mb-5 group-hover:scale-110 transition-transform duration-300 inline-block">
                {pillar.icon}
              </div>
              <h3
                className="text-2xl font-bold mb-3"
                style={{ fontFamily: "var(--font-eb-garamond)", color: "#CFB53B" }}
              >
                {pillar.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,240,0.75)", fontFamily: "var(--font-source-sans-3)" }}
              >
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16 max-w-3xl mx-auto"
        >
          <p
            className="text-2xl md:text-3xl italic leading-relaxed mb-4"
            style={{ fontFamily: "var(--font-eb-garamond)", color: "#FFFFF0" }}
          >
            &ldquo;A cozinha é a memória de um povo. No Bijou, preservamos essa memória
            com o mesmo amor de sempre.&rdquo;
          </p>
          <cite
            className="text-sm tracking-widest not-italic"
            style={{ color: "#CFB53B", fontFamily: "var(--font-source-sans-3)" }}
          >
            — Ana Luísa Pinto, Terceira Geração
          </cite>
        </motion.blockquote>
      </div>
    </section>
  );
}
