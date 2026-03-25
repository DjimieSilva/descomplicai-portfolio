"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ScanSearch, Stethoscope, Drill, Smile, ShieldCheck, ChevronRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ScanSearch,
    title: "Consulta e Diagnóstico 3D",
    duration: "Sessão inicial",
    description:
      "O processo começa com uma consulta de avaliação completa. Realizamos um exame clínico detalhado e, quando necessário, um CBCT (tomografia computadorizada 3D) que nos permite analisar ao milímetro a densidade óssea, localização dos nervos e estruturas anatómicas.",
    details: [
      "Avaliação do estado de saúde oral geral",
      "Tomografia cone beam (CBCT) 3D se indicado",
      "Análise digital da oclusão e estética",
      "Apresentação do plano de tratamento personalizado",
      "Discussão de custos e opções de financiamento",
    ],
    color: "from-[#1E40AF] to-[#2563EB]",
    accent: "#DBEAFE",
  },
  {
    number: "02",
    icon: Stethoscope,
    title: "Preparação e Planeamento Cirúrgico",
    duration: "1-2 semanas",
    description:
      "Com base no diagnóstico, elaboramos um plano cirúrgico digital preciso. Utilizamos software especializado para planear virtualmente a posição ideal de cada implante, garantindo resultados funcionais e estéticos. Quando necessário, criamos guias cirúrgicas impressas em 3D.",
    details: [
      "Planeamento digital 3D da posição dos implantes",
      "Criação de guia cirúrgica em caso indicado",
      "Preparação do protocolo anestésico personalizado",
      "Possível tratamento prévio (extração, enxerto ósseo)",
      "Instruções pré-operatórias ao paciente",
    ],
    color: "from-[#1D4ED8] to-[#1E40AF]",
    accent: "#DBEAFE",
  },
  {
    number: "03",
    icon: Drill,
    title: "Colocação Cirúrgica do Implante",
    duration: "30-90 minutos",
    description:
      "A cirurgia de colocação do implante é realizada em consultório, sob anestesia local, de forma confortável e segura. O implante de titânio — uma raiz artificial — é colocado no osso com precisão milimétrica seguindo o plano digital estabelecido.",
    details: [
      "Anestesia local de elevada eficácia",
      "Incisão mínima (técnica minimamente invasiva disponível)",
      "Colocação do implante de titânio grau médico",
      "Sutura e colocação de coroa provisória se indicado",
      "Instruções pós-operatórias detalhadas",
    ],
    color: "from-[#1E3A8A] to-[#1D4ED8]",
    accent: "#DBEAFE",
  },
  {
    number: "04",
    icon: Smile,
    title: "Osseointegração e Cicatrização",
    duration: "3-6 meses",
    description:
      "Durante este período, o implante de titânio funde-se naturalmente com o osso — processo chamado osseointegração. A nossa equipa acompanha regularmente a evolução, assegurando que tudo corre como planeado. O paciente usa uma prótese provisória estética durante esta fase.",
    details: [
      "Consultas de controlo periódicas incluídas",
      "Prótese provisória estética para uso diário",
      "Monitorização da osseointegração por radiografia",
      "Instruções de higiene e cuidados específicos",
      "Disponibilidade permanente para dúvidas",
    ],
    color: "from-[#1E40AF] to-[#2563EB]",
    accent: "#DBEAFE",
  },
  {
    number: "05",
    icon: ShieldCheck,
    title: "Reabilitação Final e Acompanhamento",
    duration: "2-4 semanas",
    description:
      "Com o implante integrado, colocamos a coroa definitiva — uma peça cerâmica que imita na perfeição a cor, forma e translucidez dos dentes naturais. O resultado é uma solução permanente, esteticamente irrepreensível e funcionalmente superior.",
    details: [
      "Impressão digital para coroa de precisão",
      "Coroa em cerâmica de alta resistência (zircónia)",
      "Ajuste fino da oclusão e estética",
      "Protocolo de manutenção e higiene personalizado",
      "Consultas de revisão anuais incluídas no primeiro ano",
    ],
    color: "from-[#1D4ED8] to-[#1E40AF]",
    accent: "#DBEAFE",
  },
];

export default function ImplantologySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="implantologia" ref={ref} className="py-24 bg-[#F8FAFF]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-[#1E40AF] text-sm font-semibold uppercase tracking-widest mb-4"
          >
            Processo Clínico
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-[#111827] font-[family-name:var(--font-sora)] mb-4"
          >
            O Caminho para o Seu
            <br />
            <span className="text-[#1E40AF]">Sorriso Permanente</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#374151] text-lg max-w-2xl mx-auto"
          >
            O nosso protocolo clínico garante segurança, previsibilidade e resultados
            estéticos superiores em cada etapa do tratamento.
          </motion.p>
        </div>

        {/* Step selector tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex overflow-x-auto gap-2 mb-8 pb-2 scrollbar-hide"
        >
          {steps.map((step, index) => (
            <button
              key={step.number}
              onClick={() => setActiveStep(index)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeStep === index
                  ? "bg-[#1E40AF] text-white shadow-lg"
                  : "bg-white text-[#374151] border border-[#E5E7EB] hover:border-[#1E40AF]/30 hover:text-[#1E40AF]"
              }`}
            >
              <span className={`text-xs font-bold ${activeStep === index ? "text-[#93C5FD]" : "text-[#9CA3AF]"}`}>{step.number}</span>
              {step.title.split(" ").slice(0, 2).join(" ")}
            </button>
          ))}
        </motion.div>

        {/* Active step detail */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          {/* Left — info */}
          <div className={`bg-gradient-to-br ${steps[activeStep].color} rounded-2xl p-8 text-white`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                {(() => {
                  const Icon = steps[activeStep].icon;
                  return <Icon className="w-7 h-7 text-white" />;
                })()}
              </div>
              <div>
                <p className="text-[#93C5FD] text-xs font-semibold uppercase tracking-wider">Passo {steps[activeStep].number}</p>
                <p className="text-white/80 text-sm">{steps[activeStep].duration}</p>
              </div>
            </div>
            <h3 className="text-2xl font-bold font-[family-name:var(--font-sora)] mb-4">
              {steps[activeStep].title}
            </h3>
            <p className="text-[#DBEAFE] leading-relaxed text-base">
              {steps[activeStep].description}
            </p>
          </div>

          {/* Right — details list */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8">
            <h4 className="font-bold text-[#111827] font-[family-name:var(--font-sora)] mb-6 text-lg">
              O que acontece nesta fase:
            </h4>
            <ul className="space-y-4">
              {steps[activeStep].details.map((detail, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  className="flex items-start gap-3 text-[#374151]"
                >
                  <ChevronRight className="w-4 h-4 text-[#1E40AF] flex-shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed">{detail}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Visual timeline */}
        <div className="relative">
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-[#DBEAFE] hidden md:block" />
          <div className="grid grid-cols-5 gap-2 md:gap-4">
            {steps.map((step, index) => (
              <motion.button
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                onClick={() => setActiveStep(index)}
                className="flex flex-col items-center gap-3 group"
              >
                <div
                  className={`relative z-10 w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    activeStep === index
                      ? "bg-[#1E40AF] border-[#1E40AF] shadow-lg shadow-[#1E40AF]/30"
                      : index < activeStep
                      ? "bg-[#DBEAFE] border-[#1E40AF]"
                      : "bg-white border-[#D1D5DB] group-hover:border-[#1E40AF]/50"
                  }`}
                >
                  {(() => {
                    const Icon = step.icon;
                    return (
                      <Icon
                        className={`w-5 h-5 ${
                          activeStep === index
                            ? "text-white"
                            : index < activeStep
                            ? "text-[#1E40AF]"
                            : "text-[#9CA3AF] group-hover:text-[#1E40AF]"
                        }`}
                      />
                    );
                  })()}
                </div>
                <span className={`text-xs font-medium text-center leading-tight hidden md:block ${activeStep === index ? "text-[#1E40AF]" : "text-[#6B7280]"}`}>
                  {step.title.split(" ").slice(0, 2).join(" ")}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-14 text-center bg-[#1E40AF] rounded-2xl p-8 md:p-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-sora)] mb-3">
            Pronto para começar o seu tratamento?
          </h3>
          <p className="text-[#BFDBFE] mb-8 max-w-xl mx-auto">
            Agende a sua consulta de avaliação gratuita e descubra se os implantes são a solução
            certa para si. Sem compromissos.
          </p>
          <a
            href="#contacto"
            className="inline-block bg-white text-[#1E40AF] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#DBEAFE] transition-colors duration-200 font-[family-name:var(--font-sora)]"
          >
            Consulta Gratuita de Avaliação
          </a>
        </motion.div>
      </div>
    </section>
  );
}
