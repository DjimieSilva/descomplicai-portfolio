"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, useState } from "react";
import {
  ShieldCheck,
  Sparkles,
  Zap,
  Layers,
  Anchor,
  AlignCenter,
  Star,
  Baby,
} from "lucide-react";

const services = [
  {
    id: "prevencao",
    icon: ShieldCheck,
    title: "Prevenção e Higiene Oral",
    tagline: "O nosso serviço estrela",
    description:
      "Consultas de higiene profissional, detartragem, polimento e instrução de higiene personalizada. A base de tudo o que fazemos.",
    highlight: true,
    features: ["Detartragem e polimento", "Instrução de higiene", "Rastreio de cáries", "Aplicação de flúor"],
  },
  {
    id: "dentisteria",
    icon: Sparkles,
    title: "Dentisteria",
    tagline: "Restauração e conservação",
    description:
      "Tratamento de cáries, restaurações estéticas em compósito e técnicas minimamente invasivas para preservar o dente natural.",
    highlight: false,
    features: ["Restaurações em compósito", "Inlays e Onlays", "Tratamento de cáries", "Técnicas minimamente invasivas"],
  },
  {
    id: "endodontia",
    icon: Zap,
    title: "Endodontia",
    tagline: "Salvar o dente natural",
    description:
      "Tratamento de canal com tecnologia rotativa e localização eletrónica de ápice para eliminar infecções e preservar o dente.",
    highlight: false,
    features: ["Tratamento de canal", "Instrumentação rotatória", "Retratamentos", "Cirurgia endodôntica"],
  },
  {
    id: "protese",
    icon: Layers,
    title: "Prótese",
    tagline: "Devolver função e estética",
    description:
      "Próteses fixas, removíveis e sobre implantes, concebidas para restituir a função mastigatória e a estética do sorriso.",
    highlight: false,
    features: ["Próteses fixas", "Próteses removíveis", "Próteses sobre implantes", "Coroas e pontes"],
  },
  {
    id: "implantologia",
    icon: Anchor,
    title: "Implantologia",
    tagline: "Raízes para o seu sorriso",
    description:
      "Implantes de titânio de última geração, desde implante unitário a reabilitações completas, com planeamento digital 3D.",
    highlight: false,
    features: ["Implantes unitários", "Reabilitação total", "Planeamento 3D", "Carga imediata"],
  },
  {
    id: "ortodontia",
    icon: AlignCenter,
    title: "Ortodontia",
    tagline: "Alinhamento perfeito",
    description:
      "Aparelhos fixos convencionais, autoligáveis e alinhadores transparentes para crianças, adolescentes e adultos.",
    highlight: false,
    features: ["Aparelhos fixos", "Alinhadores transparentes", "Ortodontia interceptiva", "Contenções"],
  },
  {
    id: "estetica",
    icon: Star,
    title: "Estética Dentária",
    tagline: "O sorriso que sempre quis",
    description:
      "Facetas de porcelana, branqueamento clínico, remodelações e desenho digital do sorriso para transformações seguras e naturais.",
    highlight: false,
    features: ["Facetas de porcelana", "Branqueamento", "Redesenho do sorriso", "Gengivas estéticas"],
  },
  {
    id: "pediatria",
    icon: Baby,
    title: "Odontopediatria",
    tagline: "Os primeiros sorrisos",
    description:
      "Consultas adaptadas para os mais pequenos, num ambiente acolhedor que cria hábitos saudáveis desde cedo e elimina o medo do dentista.",
    highlight: false,
    features: ["Consultas pediátricas", "Selantes de fissuras", "Flúor tópico", "Educação parental"],
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section
      id="servicos"
      ref={ref}
      className="py-24 md:py-32 bg-[#FEFCE8]"
      aria-labelledby="services-heading"
    >
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#D1FAE5] rounded-full px-4 py-1.5 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#064E3B]" />
            <span className="text-xs font-semibold text-[#064E3B] uppercase tracking-wider">
              Os Nossos Serviços
            </span>
          </div>
          <h2
            id="services-heading"
            className="text-3xl md:text-5xl font-bold text-[#064E3B] leading-tight mb-4"
            style={{ fontFamily: "var(--font-sora), sans-serif" }}
          >
            Cuidado completo,{" "}
            <span className="text-[#6B8F71]">em cada fase da vida</span>
          </h2>
          <p className="text-lg text-[#064E3B]/60 leading-relaxed">
            Da primeira consulta pediátrica ao sorriso renovado, a Premium acompanha-o em todas as etapas da sua saúde oral.
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {services.map((service) => {
            const Icon = service.icon;
            const isExpanded = expanded === service.id;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className={`
                  rounded-3xl p-7 cursor-pointer transition-all duration-300 group
                  ${service.highlight
                    ? "bg-[#064E3B] text-white col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-2"
                    : "bg-white border border-[#D1FAE5] hover:border-[#6B8F71]/40 hover:shadow-lg"
                  }
                `}
                onClick={() => setExpanded(isExpanded ? null : service.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setExpanded(isExpanded ? null : service.id)}
                aria-expanded={isExpanded}
              >
                <div className={`
                  w-11 h-11 rounded-2xl flex items-center justify-center mb-5
                  ${service.highlight ? "bg-[#D1FAE5]/20" : "bg-[#D1FAE5]"}
                `}>
                  <Icon className={`w-5 h-5 ${service.highlight ? "text-[#D1FAE5]" : "text-[#064E3B]"}`} />
                </div>

                {service.highlight && (
                  <span className="inline-block bg-[#D1FAE5]/20 text-[#D1FAE5] text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {service.tagline}
                  </span>
                )}

                <h3
                  className={`text-lg font-bold mb-2 ${service.highlight ? "text-white" : "text-[#064E3B]"}`}
                  style={{ fontFamily: "var(--font-sora), sans-serif" }}
                >
                  {service.title}
                </h3>

                {!service.highlight && (
                  <p className={`text-xs font-medium mb-2 ${service.highlight ? "text-[#D1FAE5]/70" : "text-[#6B8F71]"}`}>
                    {service.tagline}
                  </p>
                )}

                <p className={`text-sm leading-relaxed ${service.highlight ? "text-white/75" : "text-[#064E3B]/60"}`}>
                  {service.description}
                </p>

                <motion.div
                  initial={false}
                  animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="mt-4 space-y-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className={`flex items-center gap-2 text-sm ${service.highlight ? "text-[#D1FAE5]/90" : "text-[#064E3B]/70"}`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${service.highlight ? "bg-[#D1FAE5]" : "bg-[#6B8F71]"}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <div className={`mt-4 text-xs font-medium flex items-center gap-1 ${service.highlight ? "text-[#D1FAE5]/60" : "text-[#6B8F71]/60"}`}>
                  {isExpanded ? "Fechar" : "Ver detalhes"} ↓
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
