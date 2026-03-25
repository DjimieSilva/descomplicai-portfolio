"use client";

import { motion } from "framer-motion";
import { CheckCircle, Building2, Stethoscope, Award } from "lucide-react";

const pillars = [
  {
    icon: Building2,
    title: "Instalações de Referência",
    description:
      "Um espaço clínico de grande dimensão, concebido para dar resposta a todas as necessidades de saúde oral — desde a consulta de rotina à cirurgia complexa em bloco operatório.",
  },
  {
    icon: Stethoscope,
    title: "Equipa Multidisciplinar",
    description:
      "Mais de 6 médicos dentistas com especialização nas diferentes áreas da medicina dentária, oferecendo tratamento integrado e coordenado para cada paciente.",
  },
  {
    icon: Award,
    title: "Excelência Comprovada",
    description:
      "Reconhecidos na comunidade da Figueira da Foz por mais de uma década de cuidados de saúde oral de qualidade, com milhares de pacientes satisfeitos.",
  },
];

const highlights = [
  "Bloco operatório certificado para cirurgia oral complexa",
  "Sedação consciente — cirurgia sem ansiedade",
  "Diagnóstico digital com ortopantomografia e TAC 3D",
  "Gabinetes individualizados para total privacidade",
  "Acessível a pacientes com mobilidade reduzida",
  "Acordos com ADSE, Multicare, Médis e mais de 12 subsistemas",
  "Horário alargado para maior comodidade",
  "Urgências dentárias com atendimento prioritário",
];

export function About() {
  return (
    <section id="sobre" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-[#B8860B] text-xs tracking-[0.3em] uppercase font-semibold mb-3">
            Sobre o Centro
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="text-[#1E3A5F] font-bold text-4xl lg:text-5xl leading-tight max-w-2xl"
              style={{ fontFamily: "Epilogue, sans-serif" }}
            >
              Uma Clínica de Grande Dimensão ao Serviço da Sua Saúde
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed max-w-sm">
              A Alba Saúde Dentária nasceu com uma visão clara: criar o mais completo centro de saúde oral da Figueira da Foz, com capacidade e competência para todos os tratamentos dentários.
            </p>
          </div>
          {/* Gold divider */}
          <div className="mt-8 h-px bg-gradient-to-r from-[#B8860B]/60 via-[#B8860B]/20 to-transparent" />
        </motion.div>

        {/* Three pillars */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group"
            >
              <div className="w-14 h-14 bg-[#1E3A5F]/8 border border-[#1E3A5F]/15 flex items-center justify-center mb-5 group-hover:bg-[#B8860B]/10 group-hover:border-[#B8860B]/30 transition-colors duration-300">
                <pillar.icon size={24} className="text-[#1E3A5F] group-hover:text-[#B8860B] transition-colors duration-300" />
              </div>
              <h3
                className="text-[#1E3A5F] font-bold text-lg mb-3"
                style={{ fontFamily: "Epilogue, sans-serif" }}
              >
                {pillar.title}
              </h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Highlights grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#F8FAFC] border border-[#E2E8F0] p-8 lg:p-12"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-[#E2E8F0]" />
            <p
              className="text-[#1E3A5F] font-bold text-sm tracking-[0.15em] uppercase"
              style={{ fontFamily: "Epilogue, sans-serif" }}
            >
              O Que Nos Distingue
            </p>
            <div className="h-px flex-1 bg-[#E2E8F0]" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex items-start gap-3"
              >
                <CheckCircle size={16} className="text-[#B8860B] mt-0.5 flex-shrink-0" />
                <span className="text-[#1E3A5F] text-sm leading-snug font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
