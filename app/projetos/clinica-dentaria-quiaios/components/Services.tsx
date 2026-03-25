"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Smile,
  ShieldCheck,
  Sparkles,
  Baby,
  AlignCenter,
  Syringe,
} from "lucide-react";

const services = [
  {
    icon: ShieldCheck,
    title: "Consulta de Medicina Dentária",
    description:
      "Avaliação completa da saúde oral com diagnóstico preciso e plano de tratamento personalizado para cada paciente.",
    highlight: false,
  },
  {
    icon: Smile,
    title: "Tratamentos de Canal",
    description:
      "Endodontia com equipamentos modernos para salvar dentes comprometidos, com o máximo de conforto e eficácia.",
    highlight: false,
  },
  {
    icon: Sparkles,
    title: "Branqueamento Dentário",
    description:
      "Recupere o brilho natural do seu sorriso com técnicas profissionais seguras e resultados visíveis.",
    highlight: true,
  },
  {
    icon: Baby,
    title: "Odontopediatria",
    description:
      "Cuidados dentários adaptados aos mais pequenos, num ambiente amigável que combate o medo do dentista desde cedo.",
    highlight: false,
  },
  {
    icon: AlignCenter,
    title: "Ortodontia",
    description:
      "Correção da posição dos dentes e mordida com aparelhos fixos ou amovíveis, para crianças e adultos.",
    highlight: false,
  },
  {
    icon: Syringe,
    title: "Implantes Dentários",
    description:
      "Reposição de dentes perdidos com implantes de titânio duradouros, para recuperar a função e a estética do sorriso.",
    highlight: false,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08 },
  }),
};

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="servicos"
      ref={ref}
      className="py-20 lg:py-28 bg-[#FFF8F0]"
      aria-label="Serviços"
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
            Os Nossos Serviços
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-[#3D2B1F] leading-tight mb-4"
            style={{ fontFamily: "'Nunito Sans', sans-serif" }}
          >
            Cuidados completos para
            <br />
            todo o sorriso da família
          </h2>
          <p className="text-[#8B6F47] text-lg max-w-xl mx-auto leading-relaxed">
            Desde a primeira consulta à manutenção anual, oferecemos todos os
            cuidados que o seu sorriso precisa — perto de si, em Quiaios.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className={`group relative rounded-2xl p-6 border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                  service.highlight
                    ? "bg-[#C2703B] border-[#C2703B] text-white shadow-md"
                    : "bg-white border-[#E8D5C0] hover:border-[#C2703B]/40"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    service.highlight
                      ? "bg-white/20"
                      : "bg-[#FFF8F0] group-hover:bg-[#C2703B]/10"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      service.highlight ? "text-white" : "text-[#C2703B]"
                    }`}
                  />
                </div>

                <h3
                  className={`font-bold text-lg mb-2 leading-snug ${
                    service.highlight ? "text-white" : "text-[#3D2B1F]"
                  }`}
                  style={{ fontFamily: "'Nunito Sans', sans-serif" }}
                >
                  {service.title}
                </h3>

                <p
                  className={`text-sm leading-relaxed ${
                    service.highlight ? "text-white/85" : "text-[#8B6F47]"
                  }`}
                >
                  {service.description}
                </p>

                {service.highlight && (
                  <div className="absolute top-4 right-4">
                    <span className="text-xs font-bold bg-white/25 rounded-full px-2.5 py-1 text-white">
                      Popular
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-[#8B6F47] mb-4">
            Tem dúvidas sobre qual o serviço mais adequado para si?
          </p>
          <a
            href="tel:934868049"
            className="inline-flex items-center gap-2 bg-[#C2703B] hover:bg-[#A85E2E] text-white font-bold px-7 py-3.5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200"
          >
            Ligue-nos e esclareça todas as dúvidas
          </a>
        </motion.div>
      </div>
    </section>
  );
}
