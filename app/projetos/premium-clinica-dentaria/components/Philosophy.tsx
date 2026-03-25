"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { Heart, ShieldCheck, Leaf, Stethoscope } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Prevenção em Primeiro Lugar",
    description:
      "Acreditamos que o melhor tratamento é aquele que nunca precisa de acontecer. Por isso, investimos em rastreio precoce, higiene regular e educação para a saúde oral.",
    color: "bg-[#D1FAE5]",
    iconColor: "text-[#064E3B]",
  },
  {
    icon: Heart,
    title: "Cuidado Holístico",
    description:
      "A saúde oral está profundamente ligada ao bem-estar geral. Olhamos para o paciente na sua totalidade — corpo, mente e estilo de vida.",
    color: "bg-[#FEFCE8]",
    iconColor: "text-[#6B8F71]",
  },
  {
    icon: Leaf,
    title: "Abordagem Natural",
    description:
      "Sempre que possível, optamos por abordagens minimamente invasivas que respeitam os tecidos naturais e preservam a sua saúde a longo prazo.",
    color: "bg-[#D1FAE5]/60",
    iconColor: "text-[#064E3B]",
  },
  {
    icon: Stethoscope,
    title: "Medicina Integrada",
    description:
      "A nossa equipa multidisciplinar combina medicina dentária com medicina geral, garantindo um cuidado completo e coordenado para cada paciente.",
    color: "bg-[#FEFCE8]",
    iconColor: "text-[#6B8F71]",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="filosofia"
      ref={ref}
      className="py-24 md:py-32 bg-white"
      aria-labelledby="philosophy-heading"
    >
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-[#D1FAE5] rounded-full px-4 py-1.5 mb-6">
            <Leaf className="w-3.5 h-3.5 text-[#064E3B]" />
            <span className="text-xs font-semibold text-[#064E3B] uppercase tracking-wider">
              A Nossa Filosofia
            </span>
          </div>
          <h2
            id="philosophy-heading"
            className="text-3xl md:text-5xl font-bold text-[#064E3B] leading-tight mb-6"
            style={{ fontFamily: "var(--font-sora), sans-serif" }}
          >
            Saúde oral começa{" "}
            <span className="text-[#6B8F71]">antes de doer</span>
          </h2>
          <p className="text-lg text-[#064E3B]/60 leading-relaxed">
            Fundámos a Premium com uma convicção simples: a grande maioria dos problemas dentários
            são evitáveis. Com os cuidados certos, no momento certo, protegemos o seu sorriso
            para toda a vida.
          </p>
        </motion.div>

        {/* Pillars grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                variants={itemVariants}
                className={`${pillar.color} rounded-3xl p-8 md:p-10 group hover:shadow-lg transition-shadow duration-300`}
              >
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Icon className={`w-6 h-6 ${pillar.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-[#064E3B] mb-3" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
                  {pillar.title}
                </h3>
                <p className="text-[#064E3B]/65 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quote highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 bg-[#064E3B] rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D1FAE5] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#6B8F71] rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="relative z-10">
            <p className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
              &ldquo;Prevenir é o Melhor Tratamento&rdquo;
            </p>
            <p className="text-[#D1FAE5]/80 text-lg">
              Este não é apenas o nosso slogan — é o princípio que guia cada consulta, cada diagnóstico e cada decisão clínica.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
