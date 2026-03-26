"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, MessageSquare, Calendar, Users, CheckCircle } from "lucide-react";

const options = [
  {
    icon: Phone,
    title: "Por Telefone",
    description: "Liga-nos directamente e ficamos a tratar de tudo.",
    value: "+351 233 098 962",
    action: "tel:+351233098962",
    label: "Ligar agora",
    accent: "#EAB308",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp",
    description: "Envia mensagem e confirmamos a reserva em minutos.",
    value: "+351 233 098 962",
    action: "https://wa.me/351233098962",
    label: "Enviar mensagem",
    accent: "#22c55e",
  },
  {
    icon: Calendar,
    title: "Redes Sociais",
    description: "Envia-nos DM no Instagram ou Facebook.",
    value: "@penobairro",
    action: "https://www.instagram.com/",
    label: "Ir para o Instagram",
    accent: "#a855f7",
  },
];

const policies = [
  "Confirmamos todas as reservas por mensagem",
  "Reservas para grupos de 8+ pessoas, por favor avisar com antecedência",
  "Cancelamentos até 2h antes sem custo",
  "Disponibilidade sujeita a confirmação",
];

export default function Reservations() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="reservas"
      ref={ref}
      className="bg-[#0f0f0f] py-24 px-6 border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-12 items-end mb-14"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-0.5 bg-[#EAB308]" />
              <span className="text-[#EAB308] text-xs font-[family-name:var(--font-space-grotesk)] tracking-[0.2em] uppercase">
                Reservas
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] font-black text-[clamp(2rem,5vw,3.5rem)] text-white leading-tight">
              Garante o teu{" "}
              <span className="text-[#EAB308]">lugar à mesa.</span>
            </h2>
          </div>
          <div>
            <p className="font-[family-name:var(--font-inter)] text-[#A3A3A3] text-base sm:text-lg leading-relaxed">
              Especialmente ao fim de semana o restaurante fica cheio. Recomendamos
              reserva para grupos. Durante a semana ao almoço, há sempre espaço.
            </p>
          </div>
        </motion.div>

        {/* Contact options */}
        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {options.map((option, i) => (
            <motion.a
              key={option.title}
              href={option.action}
              target={option.action.startsWith("http") ? "_blank" : undefined}
              rel={option.action.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group block p-6 bg-white/[0.03] border border-white/[0.06] hover:border-[#EAB308]/30 transition-all duration-300"
            >
              <div
                className="w-10 h-10 flex items-center justify-center mb-4 transition-colors duration-300"
                style={{ backgroundColor: `${option.accent}15` }}
              >
                <option.icon
                  size={18}
                  style={{ color: option.accent }}
                />
              </div>
              <h3 className="font-[family-name:var(--font-space-grotesk)] font-bold text-white text-base mb-2">
                {option.title}
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-[#A3A3A3] text-sm leading-relaxed mb-4">
                {option.description}
              </p>
              <div
                className="font-[family-name:var(--font-space-grotesk)] font-bold text-sm mb-3"
                style={{ color: option.accent }}
              >
                {option.value}
              </div>
              <div className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-xs text-[#A3A3A3] group-hover:text-white transition-colors duration-200">
                <span>{option.label}</span>
                <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-200">→</span>
              </div>
              <div
                className="mt-4 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                style={{ backgroundColor: option.accent }}
              />
            </motion.a>
          ))}
        </div>

        {/* Policies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-6 bg-[#EAB308]/5 border border-[#EAB308]/10"
        >
          <div className="flex items-center gap-2 mb-4">
            <Users size={16} className="text-[#EAB308]" />
            <span className="font-[family-name:var(--font-space-grotesk)] font-bold text-white text-sm tracking-wide">
              Política de Reservas
            </span>
          </div>
          <ul className="grid sm:grid-cols-2 gap-2">
            {policies.map((policy) => (
              <li
                key={policy}
                className="flex items-start gap-2 font-[family-name:var(--font-inter)] text-[#A3A3A3] text-sm"
              >
                <CheckCircle
                  size={14}
                  className="text-[#EAB308] mt-0.5 flex-shrink-0"
                />
                {policy}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
