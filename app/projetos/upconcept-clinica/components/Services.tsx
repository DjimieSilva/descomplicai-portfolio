"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Smile,
  Layers,
  GitBranch,
  Sparkles,
  Scissors,
  Activity,
  Shield,
  ChevronRight,
} from "lucide-react";

const services = [
  {
    icon: Smile,
    title: "Medicina Dentária Geral",
    subtitle: "Base da saúde oral",
    description:
      "Consultas de rotina, limpezas profissionais, tratamento de cáries e manutenção preventiva para garantir uma saúde oral perfeita ao longo da vida.",
    features: ["Consulta de diagnóstico", "Destartarização", "Restaurações estéticas", "Radiografias digitais"],
    color: "#2563EB",
    gradient: "from-[#2563EB]/20 to-transparent",
  },
  {
    icon: Layers,
    title: "Implantes Dentários",
    subtitle: "Soluções permanentes",
    description:
      "Implantes de titânio de última geração para substituição de dentes perdidos. Resultados naturais, duradouros e com total funcionalidade mastigatória.",
    features: ["Implantes unitários", "Implantes múltiplos", "All-on-4 / All-on-6", "Carga imediata"],
    color: "#06B6D4",
    gradient: "from-[#06B6D4]/20 to-transparent",
  },
  {
    icon: GitBranch,
    title: "Ortodontia",
    subtitle: "Alinhamento perfeito",
    description:
      "Correção da posição dos dentes e da mordida com aparelhos convencionais ou sistemas de alinhadores invisíveis adaptados a todas as idades.",
    features: ["Aparelho fixo metálico", "Aparelho estético cerâmico", "Alinhadores invisíveis", "Contenção pós-tratamento"],
    color: "#2563EB",
    gradient: "from-[#2563EB]/20 to-transparent",
  },
  {
    icon: Sparkles,
    title: "Estética Dentária",
    subtitle: "Sorriso de sonho",
    description:
      "Transforme o seu sorriso com técnicas estéticas avançadas. Do branqueamento às facetas, criamos resultados naturais e harmoniosos.",
    features: ["Branqueamento dentário", "Facetas em porcelana", "Lentes de contacto dentárias", "Microestética"],
    color: "#06B6D4",
    gradient: "from-[#06B6D4]/20 to-transparent",
  },
  {
    icon: Scissors,
    title: "Cirurgia Oral",
    subtitle: "Intervenções precisas",
    description:
      "Procedimentos cirúrgicos realizados com técnicas minimamente invasivas, garantindo máxima segurança, precisão e recuperação rápida.",
    features: ["Extração de sisos", "Apicectomia", "Regeneração óssea", "Enxertos gengivais"],
    color: "#2563EB",
    gradient: "from-[#2563EB]/20 to-transparent",
  },
  {
    icon: Activity,
    title: "Endodontia",
    subtitle: "Salvar os seus dentes",
    description:
      "Tratamento de canais radiculares com tecnologia rotacional e localizadores apicais eletrónicos para maior precisão e conforto.",
    features: ["Tratamento de canal", "Retratamento endodôntico", "Pulpotomia", "Curetagem apical"],
    color: "#06B6D4",
    gradient: "from-[#06B6D4]/20 to-transparent",
  },
  {
    icon: Shield,
    title: "Periodontia",
    subtitle: "Saúde das gengivas",
    description:
      "Diagnóstico e tratamento das doenças periodontais. Gengivas saudáveis são a base de um sorriso duradouro e de uma boa saúde geral.",
    features: ["Tratamento da gengivite", "Raspagem e alisamento radicular", "Cirurgia periodontal", "Manutenção periodontal"],
    color: "#2563EB",
    gradient: "from-[#2563EB]/20 to-transparent",
  },
  {
    icon: Smile,
    title: "Prótese Dentária",
    subtitle: "Reabilitação oral",
    description:
      "Reabilitação oral completa com próteses fixas ou removíveis. Recupere a função mastigatória e a estética do seu sorriso.",
    features: ["Prótese fixa (coroas e pontes)", "Prótese removível total", "Prótese sobre implantes", "Prótese parcial esquelética"],
    color: "#06B6D4",
    gradient: "from-[#06B6D4]/20 to-transparent",
  },
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeService, setActiveService] = useState<number | null>(null);

  return (
    <section id="servicos" ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#111827]" />
      <motion.div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-[#06B6D4]/40 bg-[#06B6D4]/10"
          >
            <span className="w-2 h-2 rounded-full bg-[#06B6D4]" />
            <span className="text-sm font-medium text-[#06B6D4] font-[family-name:var(--font-inter-uc)]">
              As Nossas Especialidades
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] text-white mb-4"
          >
            Tudo o que precisa,
            <br />
            <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
              num só lugar
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto font-[family-name:var(--font-inter-uc)]"
          >
            Oito especialidades, uma clínica. Da prevenção à reabilitação completa, a Upconcept
            tem os tratamentos que precisa disponíveis qualquer dia da semana.
          </motion.p>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onMouseEnter={() => setActiveService(index)}
              onMouseLeave={() => setActiveService(null)}
              className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-opacity-60 cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02]"
              style={{
                borderColor: activeService === index ? `${service.color}60` : undefined,
                background: activeService === index ? `${service.color}08` : undefined,
              }}
            >
              {/* Glow effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{
                  background: `radial-gradient(ellipse at top left, ${service.color}15 0%, transparent 60%)`,
                }}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${service.color}20`,
                    border: `1px solid ${service.color}40`,
                  }}
                >
                  <service.icon className="w-6 h-6" style={{ color: service.color }} />
                </div>

                {/* Subtitle */}
                <p
                  className="text-xs font-medium font-[family-name:var(--font-inter-uc)] mb-1 transition-colors duration-300"
                  style={{ color: service.color }}
                >
                  {service.subtitle}
                </p>

                {/* Title */}
                <h3 className="text-white font-semibold font-[family-name:var(--font-space-grotesk)] text-base mb-3 leading-tight">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm font-[family-name:var(--font-inter-uc)] leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-1.5">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-xs text-gray-500 font-[family-name:var(--font-inter-uc)]"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: service.color }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Arrow indicator */}
                <div className="mt-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs font-medium" style={{ color: service.color }}>
                    Saber mais
                  </span>
                  <ChevronRight className="w-3 h-3" style={{ color: service.color }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-12"
        >
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold font-[family-name:var(--font-space-grotesk)] text-white transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #2563EB, #06B6D4)" }}
          >
            Marcar Consulta Hoje
            <ChevronRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
