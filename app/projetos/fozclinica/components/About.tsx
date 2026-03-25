"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle, Heart, Users, Award, Stethoscope } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Cuidado Centrado no Doente",
    description: "Cada tratamento é personalizado às necessidades únicas de cada pessoa. Ouvimos antes de agir.",
    color: "#FB7185",
  },
  {
    icon: Users,
    title: "Equipa Multidisciplinar",
    description: "Especialistas de diferentes áreas da saúde que comunicam entre si para o seu benefício.",
    color: "#0D9488",
  },
  {
    icon: Award,
    title: "Excelência Clínica",
    description: "Formação contínua, equipamentos modernos e protocolos atualizados com as melhores práticas.",
    color: "#6366F1",
  },
  {
    icon: Stethoscope,
    title: "Abordagem Integral",
    description: "A saúde é um todo. Tratamos a causa, não apenas os sintomas, com uma visão completa do doente.",
    color: "#F59E0B",
  },
];

const highlights = [
  "Consultas sem lista de espera prolongada",
  "Espaço moderno e acolhedor",
  "Atendimento personalizado e humanizado",
  "Marcações flexíveis, incluindo horário alargado",
  "Localização central na Figueira da Foz",
  "Parcerias com seguradoras e subsistemas de saúde",
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="sobre" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-teal-50 text-teal-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-teal-200">
            Sobre a Fozclinica
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-slate-800 mb-6 max-w-3xl mx-auto"
            style={{ fontFamily: "var(--font-plus-jakarta-sans, sans-serif)" }}
          >
            Um centro de saúde pensado para toda a sua família
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Na Fozclinica, acreditamos que a saúde e o bem-estar são conquistas diárias. Por isso, reunimos especialistas de várias áreas clínicas para oferecer um acompanhamento verdadeiramente integrado — do sorriso ao movimento, da mente ao corpo.
          </p>
        </motion.div>

        {/* Values grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {values.map((value) => (
            <motion.div
              key={value.title}
              variants={itemVariants}
              className="group p-6 rounded-2xl border border-slate-100 bg-white hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${value.color}15` }}
              >
                <value.icon className="w-6 h-6" style={{ color: value.color }} />
              </div>
              <h3
                className="text-base font-bold text-slate-800 mb-2"
                style={{ fontFamily: "var(--font-plus-jakarta-sans, sans-serif)" }}
              >
                {value.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Split section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-teal-500 via-teal-600 to-cyan-700 flex items-center justify-center">
              <div className="text-center p-12">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { label: "Medicina Dentária", color: "#0D9488" },
                    { label: "Podologia", color: "#6366F1" },
                    { label: "Psicologia", color: "#F59E0B" },
                    { label: "Reabilitação", color: "#FB7185" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30"
                    >
                      <div
                        className="w-3 h-3 rounded-full mb-2"
                        style={{ backgroundColor: s.color }}
                      />
                      <p className="text-white text-xs font-semibold leading-tight">{s.label}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/30">
                  <p className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-plus-jakarta-sans, sans-serif)" }}>
                    Fozclinica
                  </p>
                  <p className="text-white/80 text-sm">Centro de Saúde e Bem-Estar</p>
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
              <p className="text-2xl font-bold text-teal-600" style={{ fontFamily: "var(--font-plus-jakarta-sans, sans-serif)" }}>4</p>
              <p className="text-xs text-slate-500 font-medium">Especialidades</p>
            </div>
          </motion.div>

          {/* Right: highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <h3
              className="text-2xl md:text-3xl font-bold text-slate-800 mb-4"
              style={{ fontFamily: "var(--font-plus-jakarta-sans, sans-serif)" }}
            >
              Porque escolher a Fozclinica?
            </h3>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Somos um centro multidisciplinar onde cada especialidade complementa as restantes. A comunicação entre os nossos profissionais garante que o seu acompanhamento é coerente, eficiente e sempre centrado em si.
            </p>
            <ul className="space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
