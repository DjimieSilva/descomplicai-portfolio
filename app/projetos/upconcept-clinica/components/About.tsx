"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Zap, Heart, Users } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Excelência Clínica",
    description:
      "Equipa multidisciplinar com formação avançada nas mais recentes técnicas e tecnologias dentárias.",
    color: "#2563EB",
  },
  {
    icon: Zap,
    title: "Inovação Constante",
    description:
      "Equipamento de última geração: scanner intraoral 3D, CBCT, CAD/CAM e lasers dentários.",
    color: "#06B6D4",
  },
  {
    icon: Heart,
    title: "Cuidado Personalizado",
    description:
      "Cada paciente é único. Desenvolvemos planos de tratamento à medida das suas necessidades e objetivos.",
    color: "#2563EB",
  },
  {
    icon: Users,
    title: "Disponibilidade Total",
    description:
      "Os únicos na região abertos 7 dias por semana. Porque a sua saúde oral não espera pelo próximo dia útil.",
    color: "#06B6D4",
  },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre" ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0D1421]">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(37,99,235,0.8) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #2563EB 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-[#2563EB]/40 bg-[#2563EB]/10"
            >
              <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
              <span className="text-sm font-medium text-[#2563EB] font-[family-name:var(--font-inter-uc)]">
                Sobre a Clínica
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] text-white leading-tight mb-6"
            >
              Redefinimos o que é
              <br />
              <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
                cuidar do seu sorriso
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-400 text-lg font-[family-name:var(--font-inter-uc)] leading-relaxed mb-6"
            >
              A Upconcept nasceu com uma missão clara: tornar a medicina dentária de excelência
              acessível a todos, sem barreiras de horário. Na Figueira da Foz, somos os únicos que
              abrem todos os dias da semana — porque entendemos que a vida não para ao fim-de-semana.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-400 text-lg font-[family-name:var(--font-inter-uc)] leading-relaxed mb-10"
            >
              Combinamos tecnologia de ponta com uma abordagem humanizada. Da consulta de rotina ao
              tratamento mais complexo, a nossa equipa especializada está sempre disponível para
              garantir os melhores resultados com o máximo conforto.
            </motion.p>

            {/* Key numbers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-3 gap-6"
            >
              {[
                { num: "7", unit: "dias/semana", label: "Disponibilidade" },
                { num: "8+", unit: "especialidades", label: "Tratamentos" },
                { num: "100%", unit: "dedicação", label: "A si" },
              ].map(({ num, unit, label }) => (
                <div key={label} className="text-center">
                  <p className="text-3xl font-bold font-[family-name:var(--font-space-grotesk)] bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent leading-none">
                    {num}
                  </p>
                  <p className="text-xs text-[#06B6D4] font-[family-name:var(--font-inter-uc)] mt-1">
                    {unit}
                  </p>
                  <p className="text-gray-500 text-xs font-[family-name:var(--font-inter-uc)] mt-0.5">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Values grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="group p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-[#2563EB]/40 hover:bg-[#2563EB]/5 transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${value.color}20`, border: `1px solid ${value.color}40` }}
                >
                  <value.icon className="w-6 h-6" style={{ color: value.color }} />
                </div>
                <h3 className="text-white font-semibold font-[family-name:var(--font-space-grotesk)] text-lg mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-500 text-sm font-[family-name:var(--font-inter-uc)] leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
