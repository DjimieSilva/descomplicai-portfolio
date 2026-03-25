"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Zap,
  Scan,
  Sparkles,
  Layers,
  AlignCenter,
  ShieldPlus,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Zap,
    title: "Implante Unitário",
    description:
      "Substituição de um único dente ausente com um implante de titânio e coroa cerâmica de alta estética. A solução mais natural e duradoura para dentes perdidos.",
    highlight: "Mais popular",
    details: ["Sem desgaste dos dentes adjacentes", "Coroa em cerâmica zircónia", "Resultado permanente e estético"],
  },
  {
    icon: Layers,
    title: "Implantes Múltiplos",
    description:
      "Para casos de múltiplos dentes ausentes, planeamos a melhor distribuição de implantes para suportar pontes fixas ou coroas individuais com máxima eficiência.",
    highlight: null,
    details: ["Planeamento digital 3D", "Pontes fixas sobre implantes", "Reabilitação parcial ou total"],
  },
  {
    icon: AlignCenter,
    title: "Prótese Total Fixa (All-on-4/6)",
    description:
      "Reabilitação de toda a arcada dentária com 4 ou 6 implantes estrategicamente posicionados. Dentes fixos em 24 horas, sem padrão amovível.",
    highlight: "Transformação total",
    details: ["Dentes fixos no mesmo dia", "Mínimo de implantes", "Alta qualidade de vida imediata"],
  },
  {
    icon: Scan,
    title: "Radiologia 3D (CBCT)",
    description:
      "Diagnóstico preciso com tomografia computadorizada cone beam. Avaliação completa do osso, nervos e estruturas antes de qualquer procedimento cirúrgico.",
    highlight: null,
    details: ["Imagem tridimensional", "Baixa dose de radiação", "Planeamento de precisão"],
  },
  {
    icon: Sparkles,
    title: "Estética Dentária",
    description:
      "Facetas em cerâmica, branqueamento profissional e cargas estéticas integradas com os implantes para um sorriso perfeitamente harmonioso.",
    highlight: null,
    details: ["Facetas de porcelana", "Branqueamento LED", "Design digital do sorriso"],
  },
  {
    icon: ShieldPlus,
    title: "Manutenção Peri-implantar",
    description:
      "Programa de higiene e manutenção especializado para doentes com implantes. Prevenção de peri-implantite e longevidade máxima dos tratamentos.",
    highlight: null,
    details: ["Limpeza especializada", "Controlo radiológico", "Protocolo personalizado"],
  },
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="serviços" ref={ref} className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-[#1E40AF] text-sm font-semibold uppercase tracking-widest mb-4"
          >
            Tratamentos
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-[#111827] font-[family-name:var(--font-sora)] mb-4"
          >
            Soluções para
            <br />
            <span className="text-[#1E40AF]">Cada Situação</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#374151] text-lg max-w-2xl mx-auto"
          >
            Da substituição de um único dente à reabilitação completa da boca,
            oferecemos tratamentos à medida com tecnologia e experiência.
          </motion.p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="relative bg-[#F8FAFF] border border-[#E5E7EB] rounded-2xl p-6 hover:border-[#1E40AF]/30 hover:shadow-lg transition-all duration-300 group"
            >
              {service.highlight && (
                <span className="absolute -top-3 left-6 bg-[#1E40AF] text-white text-xs font-bold px-3 py-1 rounded-full">
                  {service.highlight}
                </span>
              )}

              <div className="w-12 h-12 bg-[#DBEAFE] rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#1E40AF] transition-colors duration-300">
                <service.icon className="w-6 h-6 text-[#1E40AF] group-hover:text-white transition-colors duration-300" />
              </div>

              <h3 className="text-lg font-bold text-[#111827] font-[family-name:var(--font-sora)] mb-3">
                {service.title}
              </h3>
              <p className="text-[#374151] text-sm leading-relaxed mb-5">
                {service.description}
              </p>

              <ul className="space-y-2 mb-5">
                {service.details.map((detail) => (
                  <li key={detail} className="flex items-center gap-2 text-sm text-[#374151]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1E40AF] flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>

              <a
                href="#contacto"
                className="flex items-center gap-1 text-[#1E40AF] text-sm font-semibold hover:gap-2 transition-all duration-200"
              >
                Saber mais
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-center text-[#6B7280] text-sm mt-10"
        >
          Todos os tratamentos incluem consulta de avaliação inicial e plano de tratamento personalizado.
          <br />
          <a href="#contacto" className="text-[#1E40AF] font-medium hover:underline">
            Agende a sua consulta gratuita →
          </a>
        </motion.p>
      </div>
    </section>
  );
}
