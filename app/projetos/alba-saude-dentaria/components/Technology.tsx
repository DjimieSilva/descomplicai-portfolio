"use client";

import { motion } from "framer-motion";
import { Cpu, Camera, Zap, Wind, Microscope, MonitorSmartphone } from "lucide-react";

const technologies = [
  {
    icon: Cpu,
    title: "Bloco Operatório Certificado",
    subtitle: "Cirurgia em Ambiente Hospitalar",
    description:
      "O nosso bloco operatório está equipado ao nível de uma unidade hospitalar, permitindo realizar cirurgias orais complexas com total segurança — desde exodontias de sisos inclusos a implantologia avançada, com monitorização completa do paciente.",
    highlights: ["Monitorização cardíaca contínua", "Equipamento de suporte vital", "Anestesia e sedação consciente", "Ambiente esterilizado certificado"],
    featured: true,
  },
  {
    icon: Camera,
    title: "Imagiologia 3D",
    subtitle: "TAC Cone Beam e Ortopantomografia",
    description:
      "Diagnóstico de precisão com tomografia computorizada de feixe cónico (CBCT) e ortopantomografia digital, permitindo planeamento cirúrgico virtual e colocação guiada de implantes.",
    highlights: ["TAC Cone Beam 3D", "Ortopantomografia Digital", "Planeamento Virtual", "Guias Cirúrgicas"],
    featured: false,
  },
  {
    icon: MonitorSmartphone,
    title: "Design Digital do Sorriso",
    subtitle: "DSD e Mock-Up Pré-Tratamento",
    description:
      "Tecnologia de design digital que permite ao paciente visualizar o resultado estético antes de iniciar qualquer tratamento. Comunicação precisa entre clínico e laboratório para resultados previsíveis.",
    highlights: ["Fotografia Intra-Oral 4K", "Software DSD", "Mock-Up Digital", "Laboratório Virtual"],
    featured: false,
  },
  {
    icon: Zap,
    title: "Laser Dentário",
    subtitle: "Tratamentos Minimamente Invasivos",
    description:
      "Tratamentos com laser diodo de alta potência para cirurgia gengival, desinfecção de bolsas periodontais, aftas e lesões de tecidos moles — com menor desconforto e recuperação mais rápida.",
    highlights: ["Cirurgia Gengival Laser", "Tratamento Periodontal", "Desinfecção Endodôntica", "Sem Suturas em Muitos Casos"],
    featured: false,
  },
  {
    icon: Wind,
    title: "Esterilização e Assepsia",
    subtitle: "Protocolos Hospitalares",
    description:
      "Todos os instrumentos passam por ciclos de esterilização em autoclave classe B certificada, com rastreabilidade completa. Barreiras de protecção descartáveis em cada gabinete para máxima segurança.",
    highlights: ["Autoclave Classe B", "Rastreabilidade de Instrumentos", "Barreiras Descartáveis", "Auditoria de Qualidade"],
    featured: false,
  },
  {
    icon: Microscope,
    title: "Endodontia Microscópica",
    subtitle: "Tratamento de Canal de Precisão",
    description:
      "Tratamentos endodônticos com microscópio operatório de ampliação de até 20x, permitindo localizar e tratar canais com geometria complexa e aumentar significativamente as taxas de sucesso.",
    highlights: ["Microscópio 20x", "Localização Eletrónica de Ápex", "Instrumentação Rotatória", "Obturação 3D"],
    featured: false,
  },
];

export function Technology() {
  return (
    <section id="tecnologia" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-[#B8860B] text-xs tracking-[0.3em] uppercase font-semibold mb-3">
            Infra-Estrutura e Equipamento
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="text-[#1E3A5F] font-bold text-4xl lg:text-5xl leading-tight"
              style={{ fontFamily: "Epilogue, sans-serif" }}
            >
              Tecnologia de Ponta,
              <br />
              Resultados Excepcionais
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed max-w-md">
              Investimos continuamente em equipamento de última geração para oferecer tratamentos mais precisos, mais confortáveis e com tempos de recuperação mais curtos.
            </p>
          </div>
          <div className="mt-8 h-px bg-gradient-to-r from-[#B8860B]/50 via-[#B8860B]/15 to-transparent" />
        </motion.div>

        {/* Featured technology — Operating Room */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative bg-[#1E3A5F] p-8 lg:p-12 mb-8 overflow-hidden"
        >
          {/* Top gold bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B8860B] via-[#B8860B]/60 to-transparent" />
          {/* Background decoration */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(#94A3B8 1px, transparent 1px), linear-gradient(90deg, #94A3B8 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#B8860B]/8 blur-[80px]" />

          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#B8860B]/20 border border-[#B8860B]/40 px-4 py-2 mb-6">
                <Cpu size={14} className="text-[#B8860B]" />
                <span className="text-[#B8860B] text-xs tracking-[0.2em] uppercase font-semibold">
                  Exclusivo na Região
                </span>
              </div>

              <h3
                className="text-white font-bold text-3xl lg:text-4xl mb-4"
                style={{ fontFamily: "Epilogue, sans-serif" }}
              >
                Bloco Operatório
                <br />
                <span className="text-[#B8860B]">Próprio Certificado</span>
              </h3>

              <p className="text-white/65 leading-relaxed mb-8 text-base">
                A Alba Saúde Dentária é o único centro dentário da Figueira da Foz com bloco operatório próprio. Esta infra-estrutura permite realizar procedimentos que, noutras clínicas, exigiriam internamento hospitalar — com toda a segurança, mas em ambiente ambulatório.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {technologies[0].highlights.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B8860B] flex-shrink-0" />
                    <span className="text-white/70 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual representation */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Cirurgias / Ano", value: "500+", sub: "Realizadas em bloco" },
                  { label: "Taxa de Sucesso", value: "99.2%", sub: "Implantologia" },
                  { label: "Sedação", value: "Sim", sub: "Consciente e geral" },
                  { label: "Recuperação", value: "Ambulatório", sub: "Sem internamento" },
                ].map((item) => (
                  <div key={item.label} className="bg-white/5 border border-white/10 p-4 text-center">
                    <div
                      className="text-[#B8860B] font-bold text-2xl mb-1"
                      style={{ fontFamily: "Epilogue, sans-serif" }}
                    >
                      {item.value}
                    </div>
                    <div className="text-white/80 text-xs font-semibold mb-0.5">{item.label}</div>
                    <div className="text-white/40 text-xs">{item.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other technologies grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.slice(1).map((tech, i) => (
            <motion.div
              key={tech.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="bg-white border border-[#E2E8F0] hover:border-[#1E3A5F]/20 hover:shadow-lg hover:shadow-[#1E3A5F]/5 transition-all duration-300 group p-7"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-[#1E3A5F]/6 border border-[#1E3A5F]/12 flex items-center justify-center flex-shrink-0 group-hover:bg-[#B8860B]/10 group-hover:border-[#B8860B]/25 transition-colors duration-300">
                  <tech.icon size={22} className="text-[#1E3A5F] group-hover:text-[#B8860B] transition-colors duration-300" />
                </div>
                <div>
                  <h3
                    className="text-[#1E3A5F] font-bold text-base leading-snug"
                    style={{ fontFamily: "Epilogue, sans-serif" }}
                  >
                    {tech.title}
                  </h3>
                  <p className="text-[#B8860B]/80 text-xs font-semibold tracking-wide mt-0.5">{tech.subtitle}</p>
                </div>
              </div>

              <p className="text-[#94A3B8] text-sm leading-relaxed mb-4">
                {tech.description}
              </p>

              <div className="space-y-1.5">
                {tech.highlights.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#1E3A5F]/30 flex-shrink-0" />
                    <span className="text-[#1E3A5F]/65 text-xs">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
