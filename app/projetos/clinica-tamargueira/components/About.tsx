"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle, Heart, Microscope, Users } from "lucide-react";

const values = [
  {
    icon: Microscope,
    title: "Tecnologia de Ponta",
    description: "Equipamentos de diagnóstico 3D, guias cirúrgicos digitais e materiais de última geração para resultados previsíveis e seguros.",
  },
  {
    icon: Heart,
    title: "Cuidado Personalizado",
    description: "Cada paciente é único. O seu plano de tratamento é desenvolvido especificamente para as suas necessidades, anatomia e expectativas.",
  },
  {
    icon: Users,
    title: "Equipa Especializada",
    description: "Médicos dentistas com formação avançada em implantologia e reabilitação oral, com constante atualização científica.",
  },
  {
    icon: CheckCircle,
    title: "Garantia de Qualidade",
    description: "Utilizamos apenas implantes das melhores marcas europeias, com garantia de longa duração e histórico clínico comprovado.",
  },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre" ref={ref} className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block text-[#1E40AF] text-sm font-semibold uppercase tracking-widest mb-4"
            >
              Sobre a Clínica
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-[#111827] font-[family-name:var(--font-sora)] leading-tight mb-6"
            >
              Referência em Implantologia
              <br />
              <span className="text-[#1E40AF]">na Figueira da Foz</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#374151] text-lg leading-relaxed mb-6"
            >
              A Clínica Dentária Tamargueira nasceu com uma missão clara: oferecer
              tratamentos de implantologia com o mais alto nível de exigência técnica e
              científica, num ambiente acolhedor e próximo.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-[#374151] text-base leading-relaxed mb-8"
            >
              Ao longo de mais de 15 anos, construímos uma reputação sólida na região de
              Figueira da Foz, tratando mais de 1500 pacientes com implantes dentários.
              A nossa abordagem combina tecnologia de diagnóstico avançada com o cuidado
              humano que cada pessoa merece.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              {[
                "Médico Dentista certificado pela OMD",
                "Formação europeia em implantologia",
                "Parceiro certificado Nobel Biocare",
                "Radiologia 3D na clínica",
              ].map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-2 bg-[#EFF6FF] text-[#1E40AF] text-sm px-3 py-1.5 rounded-full font-medium"
                >
                  <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right — values grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-[#F8FAFF] border border-[#DBEAFE] rounded-2xl p-6 hover:border-[#1E40AF]/30 hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 bg-[#DBEAFE] rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-5 h-5 text-[#1E40AF]" />
                </div>
                <h3 className="font-bold text-[#111827] font-[family-name:var(--font-sora)] mb-2">{value.title}</h3>
                <p className="text-[#374151] text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
