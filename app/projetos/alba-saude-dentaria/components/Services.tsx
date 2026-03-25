"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Sparkles,
  Scan,
  Heart,
  Scissors,
  Smile,
  Baby,
  Shield,
  Zap,
  Activity,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Shield,
    category: "Prevenção e Diagnóstico",
    title: "Medicina Dentária Preventiva",
    description:
      "Consultas de rotina, higiene oral profissional, destartarização e polimento. Deteção precoce de patologias com raio-X digital e ortopantomografia. O melhor tratamento é sempre o que se evita.",
    items: ["Higiene Oral Profissional", "Ortopantomografia Digital", "TAC Cone Beam 3D", "Diagnóstico Precoce"],
    accent: false,
  },
  {
    icon: Zap,
    category: "Reabilitação Oral",
    title: "Implantologia Avançada",
    description:
      "Reabilitação com implantes de última geração para casos simples ou complexos. Carga imediata, all-on-4, all-on-6 e soluções personalizadas para cada paciente, incluindo procedimentos realizados em bloco operatório.",
    items: ["Implantes Unitários", "All-on-4 / All-on-6", "Enxerto Ósseo", "Carga Imediata"],
    accent: true,
  },
  {
    icon: Smile,
    category: "Estética Dental",
    title: "Design do Sorriso",
    description:
      "Transformamos sorrisos com tecnologia de ponta. Facetas em porcelana, branqueamento profissional, mock-up digital e reabilitação estética total. Visualize o resultado antes de iniciar o tratamento.",
    items: ["Facetas em Porcelana", "Branqueamento LED", "Mock-up Digital", "Coroas Cerâmicas"],
    accent: false,
  },
  {
    icon: Activity,
    category: "Ortodontia",
    title: "Ortodontia e Ortopedia",
    description:
      "Tratamento de má-oclusão em crianças e adultos com aparelhos fixos, amovíveis e alinhadores transparentes. Articulação direta com pediatria para casos de ortopedia dento-facial.",
    items: ["Aparelhos Metálicos", "Aparelhos Estéticos", "Alinhadores Invisíveis", "Ortopedia Funcional"],
    accent: false,
  },
  {
    icon: Scissors,
    category: "Cirurgia Oral",
    title: "Cirurgia com Bloco Operatório",
    description:
      "O nosso bloco operatório certificado permite realizar as cirurgias orais mais complexas com total segurança: extração de sisos inclusos, cirurgia periodontal, ressecções apicais e muito mais. Sedação consciente disponível.",
    items: ["Extração de Sisos", "Cirurgia Periodontal", "Sedação Consciente", "Ressecção Apical"],
    accent: true,
  },
  {
    icon: Heart,
    category: "Periodontologia",
    title: "Saúde das Gengivas",
    description:
      "Diagnóstico e tratamento da doença periodontal em todos os seus estágios. Raspagem e alisamento radicular, cirurgia periodontal e manutenção especializada para a saúde das estruturas de suporte dentário.",
    items: ["Tratamento Periodontal", "Cirurgia Gengival", "Regeneração Óssea", "Manutenção Periodontal"],
    accent: false,
  },
  {
    icon: Baby,
    category: "Odontopediatria",
    title: "Saúde Oral Infantil",
    description:
      "Cuidados especializados para os mais pequenos, num ambiente acolhedor e sem stress. Controlo de cáries precoce, selantes de fissuras, ortodontia interceptiva e educação para a saúde oral.",
    items: ["Consulta Pediátrica", "Selantes de Fissuras", "Flúor Tópico", "Ortodontia Precoce"],
    accent: false,
  },
  {
    icon: Scan,
    category: "Medicina Oral",
    title: "Prótese e Reabilitação",
    description:
      "Próteses fixas e removíveis, coroas e pontes em cerâmica, próteses sobre implantes e esquelética. Reabilitação total da função e estética, com materiais biocompatíveis de alta qualidade.",
    items: ["Coroas e Pontes", "Prótese Removível", "Prótese Implanto-suportada", "Prótese Esquelética"],
    accent: false,
  },
  {
    icon: Sparkles,
    category: "Urgências",
    title: "Urgências Dentárias",
    description:
      "Atendimento de urgência para dor dentária aguda, traumatismos, fraturas ou infeções. Capacidade de resposta rápida graças à nossa equipa alargada e equipamento avançado disponível permanentemente.",
    items: ["Dor Aguda", "Traumatismos", "Infeções Orais", "Fraturas Dentárias"],
    accent: false,
  },
];

export function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="servicos" className="py-24 bg-[#F8FAFC]">
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
            Especialidades
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="text-[#1E3A5F] font-bold text-4xl lg:text-5xl leading-tight"
              style={{ fontFamily: "Epilogue, sans-serif" }}
            >
              Todas as Valências
              <br />
              Sob o Mesmo Tecto
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed max-w-md">
              Da consulta de rotina à cirurgia oral de alta complexidade — a Alba Saúde Dentária oferece todas as especialidades dentárias, eliminando a necessidade de referenciação externa.
            </p>
          </div>
          <div className="mt-8 h-px bg-gradient-to-r from-[#B8860B]/50 via-[#B8860B]/15 to-transparent" />
        </motion.div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
              className={`relative group cursor-pointer transition-all duration-300 ${
                service.accent
                  ? "bg-[#1E3A5F] border border-[#B8860B]/30"
                  : "bg-white border border-[#E2E8F0] hover:border-[#1E3A5F]/20 hover:shadow-lg hover:shadow-[#1E3A5F]/5"
              }`}
            >
              {service.accent && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B8860B] via-[#B8860B]/70 to-transparent" />
              )}

              <div className="p-7">
                {/* Category tag */}
                <p className={`text-xs tracking-[0.2em] uppercase font-semibold mb-4 ${
                  service.accent ? "text-[#B8860B]/80" : "text-[#94A3B8]"
                }`}>
                  {service.category}
                </p>

                {/* Icon + title */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                    service.accent
                      ? "bg-[#B8860B]/20 group-hover:bg-[#B8860B]/30"
                      : "bg-[#1E3A5F]/6 group-hover:bg-[#B8860B]/10"
                  }`}>
                    <service.icon
                      size={22}
                      className={service.accent ? "text-[#B8860B]" : "text-[#1E3A5F] group-hover:text-[#B8860B] transition-colors duration-300"}
                    />
                  </div>
                  <h3
                    className={`font-bold text-lg leading-snug ${
                      service.accent ? "text-white" : "text-[#1E3A5F]"
                    }`}
                    style={{ fontFamily: "Epilogue, sans-serif" }}
                  >
                    {service.title}
                  </h3>
                </div>

                <p className={`text-sm leading-relaxed mb-5 ${
                  service.accent ? "text-white/65" : "text-[#94A3B8]"
                }`}>
                  {service.description}
                </p>

                {/* Items list */}
                <div className="grid grid-cols-2 gap-1.5 mb-5">
                  {service.items.map((item) => (
                    <div key={item} className="flex items-center gap-1.5">
                      <div className={`w-1 h-1 rounded-full flex-shrink-0 ${
                        service.accent ? "bg-[#B8860B]" : "bg-[#1E3A5F]/30"
                      }`} />
                      <span className={`text-xs ${
                        service.accent ? "text-white/70" : "text-[#1E3A5F]/70"
                      }`}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className={`flex items-center gap-1.5 text-xs font-semibold tracking-wide transition-all duration-300 ${
                  service.accent
                    ? "text-[#B8860B]"
                    : "text-[#1E3A5F]/40 group-hover:text-[#B8860B]"
                }`}>
                  Saber Mais
                  <ArrowRight size={12} className={`transition-transform duration-300 ${hoveredIndex === i ? "translate-x-1" : ""}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 bg-[#1E3A5F] p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <p className="text-[#B8860B] text-xs tracking-[0.2em] uppercase font-semibold mb-1">
              Não tem a certeza de qual tratamento necessita?
            </p>
            <h3 className="text-white font-bold text-xl" style={{ fontFamily: "Epilogue, sans-serif" }}>
              Agende uma Consulta de Diagnóstico Inicial
            </h3>
          </div>
          <a
            href="tel:+351233403600"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-[#B8860B] hover:bg-[#a07609] text-white px-8 py-4 font-bold text-sm tracking-widest uppercase transition-all duration-300"
          >
            233 403 600
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
