"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Clock, Baby, User, Users, CheckCircle, Calendar } from "lucide-react";

const programs = [
  {
    group: "Crianças (3–12 anos)",
    icon: Baby,
    color: "bg-[#D1FAE5]",
    iconBg: "bg-[#064E3B]",
    frequency: "A cada 4–6 meses",
    description: "Criamos hábitos de higiene desde cedo, com consultas lúdicas e sem stresse.",
    checkups: [
      { month: "Jan / Jul", label: "Consulta de Higiene + Flúor tópico" },
      { month: "Abr / Out", label: "Rastreio de cáries + Selantes (se necessário)" },
      { month: "Dez", label: "Avaliação ortodôntica preventiva" },
    ],
    included: [
      "Escovagem supervisionada",
      "Flúor tópico semestral",
      "Selantes de fissuras",
      "Avaliação do crescimento",
    ],
  },
  {
    group: "Adolescentes e Adultos (13–60 anos)",
    icon: User,
    color: "bg-[#FEFCE8]",
    iconBg: "bg-[#6B8F71]",
    frequency: "A cada 6 meses",
    description: "Manutenção profissional e rastreio de patologias para uma saúde oral duradoura.",
    checkups: [
      { month: "Jan / Jul", label: "Consulta de Higiene + Detartragem" },
      { month: "Abr / Out", label: "Radiografias diagnóstico + Rastreio periodontal" },
      { month: "Anual", label: "Fotografia clínica + Reavaliação global" },
    ],
    included: [
      "Detartragem e polimento",
      "Rastreio de cáries e cancro oral",
      "Instrução de higiene personalizada",
      "Relatório de saúde oral",
    ],
  },
  {
    group: "Sénior (60+ anos)",
    icon: Users,
    color: "bg-[#D1FAE5]/60",
    iconBg: "bg-[#064E3B]",
    frequency: "A cada 3–4 meses",
    description: "Atenção reforçada às necessidades específicas desta fase da vida, incluindo xerostomia e próteses.",
    checkups: [
      { month: "Jan / Abr / Jul / Out", label: "Consulta de Higiene + Avaliação prótese" },
      { month: "Jun / Dez", label: "Rastreio cancro oral + Radiografias" },
      { month: "Anual", label: "Avaliação de medicação e saúde sistémica" },
    ],
    included: [
      "Higiene com protocolo suave",
      "Avaliação de próteses e implantes",
      "Rastreio de cancro oral",
      "Coordenação com médico de família",
    ],
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function PreventionProgram() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="prevencao"
      ref={ref}
      className="py-24 md:py-32 bg-white"
      aria-labelledby="prevention-heading"
    >
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#D1FAE5] rounded-full px-4 py-1.5 mb-6">
            <ShieldCheck className="w-3.5 h-3.5 text-[#064E3B]" />
            <span className="text-xs font-semibold text-[#064E3B] uppercase tracking-wider">
              Programa de Prevenção
            </span>
          </div>
          <h2
            id="prevention-heading"
            className="text-3xl md:text-5xl font-bold text-[#064E3B] leading-tight mb-6"
            style={{ fontFamily: "var(--font-sora), sans-serif" }}
          >
            Um plano para{" "}
            <span className="text-[#6B8F71]">cada etapa da vida</span>
          </h2>
          <p className="text-lg text-[#064E3B]/60 leading-relaxed">
            O nosso Programa de Prevenção adapta-se à sua idade e necessidades. Com consultas regulares e rastreio atempado,
            evitamos problemas antes de acontecerem — poupando tempo, dinheiro e desconforto.
          </p>
        </motion.div>

        {/* Stats banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16"
        >
          {[
            { value: "80%", label: "dos problemas dentários são evitáveis com prevenção regular" },
            { value: "3×", label: "mais barato prevenir do que tratar, em média" },
            { value: "15 min", label: "é tudo o que precisa 2× por ano para um check-up" },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#064E3B] rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
                {stat.value}
              </div>
              <p className="text-[#D1FAE5]/80 text-sm leading-relaxed">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Program cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-6"
        >
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <motion.div
                key={program.group}
                variants={cardVariants}
                className={`${program.color} rounded-3xl p-8 md:p-10`}
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left: info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-5">
                      <div className={`w-12 h-12 ${program.iconBg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#064E3B]" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
                          {program.group}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Clock className="w-3.5 h-3.5 text-[#6B8F71]" />
                          <span className="text-sm text-[#6B8F71] font-medium">{program.frequency}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-[#064E3B]/65 mb-6 leading-relaxed">{program.description}</p>

                    <h4 className="text-sm font-semibold text-[#064E3B] uppercase tracking-wide mb-3">
                      O que está incluído
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {program.included.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-[#064E3B]/70">
                          <CheckCircle className="w-4 h-4 text-[#6B8F71] flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right: schedule */}
                  <div className="lg:w-80 flex-shrink-0">
                    <div className="bg-white/70 rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Calendar className="w-4 h-4 text-[#064E3B]" />
                        <span className="text-sm font-semibold text-[#064E3B]">Calendário Típico</span>
                      </div>
                      <div className="space-y-3">
                        {program.checkups.map((checkup, i) => (
                          <div key={i} className="flex gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              <div className="w-6 h-6 bg-[#064E3B] text-white rounded-full flex items-center justify-center text-xs font-bold">
                                {i + 1}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-[#6B8F71] mb-0.5">{checkup.month}</div>
                              <div className="text-sm text-[#064E3B]/70">{checkup.label}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 bg-[#064E3B] text-white px-8 py-4 rounded-2xl text-base font-semibold hover:bg-[#065f46] transition-all hover:shadow-xl hover:shadow-[#064E3B]/20 hover:-translate-y-0.5"
          >
            <Calendar className="w-4 h-4" />
            Inscrever no Programa de Prevenção
          </a>
          <p className="text-sm text-[#064E3B]/50 mt-3">
            Fale connosco e ajudamos a definir o plano ideal para a sua família
          </p>
        </motion.div>
      </div>
    </section>
  );
}
