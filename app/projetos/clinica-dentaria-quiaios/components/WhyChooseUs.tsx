"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, Heart, UserCheck, Star, Leaf } from "lucide-react";

const reasons = [
  {
    icon: MapPin,
    title: "A 10 minutos da Figueira",
    description:
      "Sem tráfego, sem estacionamento difícil. A clínica fica no Largo de S. Sebastião, em plena vila de Quiaios — fácil de chegar, fácil de estacionar.",
    color: "#C2703B",
  },
  {
    icon: Heart,
    title: "Tratamos de si como família",
    description:
      "Não somos um número. Aqui, a equipa conhece o seu nome, a sua história e cuida de si com genuína atenção pessoal.",
    color: "#C2703B",
  },
  {
    icon: UserCheck,
    title: "Médico dentista de confiança",
    description:
      "Anos de experiência ao serviço da comunidade de Quiaios e arredores. A mesma equipa, a mesma qualidade, consulta após consulta.",
    color: "#C2703B",
  },
  {
    icon: Clock,
    title: "Horários flexíveis",
    description:
      "Sabemos que a vida é ocupada. Trabalhamos para arranjar a marcação que melhor se adapta à sua agenda.",
    color: "#5F7A3A",
  },
  {
    icon: Star,
    title: "Qualidade sem surpresas",
    description:
      "Orçamentos claros antes de qualquer tratamento. Sem letras pequenas, sem custos escondidos. Transparência total.",
    color: "#5F7A3A",
  },
  {
    icon: Leaf,
    title: "Raízes na nossa terra",
    description:
      "Uma clínica local, para pessoas locais. Somos parte de Quiaios e do seu tecido comunitário há décadas.",
    color: "#5F7A3A",
  },
];

export default function WhyChooseUs() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="porquenos"
      ref={ref}
      className="py-20 lg:py-28 bg-white"
      aria-label="Porquê escolher-nos"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-sm font-bold tracking-widest uppercase text-[#C2703B] mb-4">
            Porquê Escolher-nos
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-[#3D2B1F] leading-tight mb-4"
            style={{ fontFamily: "'Nunito Sans', sans-serif" }}
          >
            Proximidade, confiança
            <br />e cuidado pessoal
          </h2>
          <p className="text-[#8B6F47] text-lg max-w-xl mx-auto leading-relaxed">
            Numa cidade, é mais um paciente. Em Quiaios, é parte da nossa
            comunidade.
          </p>
        </motion.div>

        {/* Reasons grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.09 }}
                className="flex flex-col gap-4"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${reason.color}18` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: reason.color }} />
                  </div>
                  <div>
                    <h3
                      className="font-bold text-[#3D2B1F] text-lg leading-snug mb-1"
                      style={{ fontFamily: "'Nunito Sans', sans-serif" }}
                    >
                      {reason.title}
                    </h3>
                    <p className="text-[#8B6F47] text-sm leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
                {i < reasons.length - 1 && (
                  <div className="h-px bg-gradient-to-r from-transparent via-[#E8D5C0] to-transparent" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom highlight banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 bg-gradient-to-r from-[#FFF8F0] to-[#F0F7E8] rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-6 border border-[#E8D5C0]"
        >
          <div className="flex-1 text-center sm:text-left">
            <h3
              className="text-xl font-extrabold text-[#3D2B1F] mb-1"
              style={{ fontFamily: "'Nunito Sans', sans-serif" }}
            >
              Mais de 2.000 famílias de Quiaios e arredores já confiam em nós
            </h3>
            <p className="text-[#8B6F47] text-sm">
              Junte-se à comunidade que cuida do sorriso perto de casa.
            </p>
          </div>
          <a
            href="tel:934868049"
            className="shrink-0 bg-[#C2703B] hover:bg-[#A85E2E] text-white font-bold px-6 py-3.5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 text-sm"
          >
            Marcar Consulta
          </a>
        </motion.div>
      </div>
    </section>
  );
}
