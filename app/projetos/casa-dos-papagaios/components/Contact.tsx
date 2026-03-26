"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Mail, Facebook, MessageCircle, Users, CalendarDays } from "lucide-react";

const contactMethods = [
  {
    icon: Phone,
    label: "Telefone",
    value: "+351 233 435 133",
    subValue: "Seg — Sáb, 10h às 16h",
    href: "tel:+351233435133",
    color: "#DC2626",
    bg: "#FEE2E2",
    cta: "Ligar agora",
  },
  {
    icon: Facebook,
    label: "Facebook",
    value: "Casa dos Papagaios",
    subValue: "Mensagem direta disponível",
    href: "https://facebook.com",
    color: "#1D4ED8",
    bg: "#DBEAFE",
    cta: "Abrir Facebook",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "come.cala@sapo.pt",
    subValue: "Resposta em 24 horas",
    href: "mailto:come.cala@sapo.pt",
    color: "#15803D",
    bg: "#DCFCE7",
    cta: "Enviar e-mail",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="reservas" ref={ref} className="py-20 md:py-32 bg-[#15803D] relative overflow-hidden">
      {/* Top wave */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 fill-[#FEF3C7]">
          <path d="M0,0 C360,60 1080,0 1440,40 L1440,0 Z" />
        </svg>
      </div>

      {/* Background dots */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, #FEF3C7 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-[#FEF3C7]/70 font-bold uppercase tracking-widest text-sm mb-4">
            Contactos & Reservas
          </p>
          <h2
            className="text-4xl md:text-5xl font-black text-[#FEF3C7] leading-tight mb-4"
            style={{ fontFamily: "var(--font-public-sans)" }}
          >
            Reserve a Sua Mesa.
            <br />
            <span className="text-[#FEF3C7]/60">Não Fique de Fora.</span>
          </h2>
          <p className="text-[#FEF3C7]/80 max-w-xl mx-auto text-lg" style={{ fontFamily: "var(--font-inter)" }}>
            Somos um espaço pequeno e com muita procura. Reservar mesa é a melhor
            forma de garantir a sua visita — especialmente ao fim de semana.
          </p>
        </motion.div>

        {/* Contact methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, i) => (
            <motion.a
              key={method.label}
              href={method.href}
              target={method.label === "Facebook" ? "_blank" : undefined}
              rel={method.label === "Facebook" ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-white rounded-2xl p-6 flex flex-col items-start gap-4 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: method.bg }}
              >
                <method.icon size={24} style={{ color: method.color }} />
              </div>

              <div className="flex-1">
                <p className="text-[#78350F]/50 text-xs font-bold uppercase tracking-wide mb-1">
                  {method.label}
                </p>
                <p
                  className="font-black text-[#78350F] text-lg leading-tight mb-1"
                  style={{ fontFamily: "var(--font-public-sans)" }}
                >
                  {method.value}
                </p>
                <p className="text-[#78350F]/60 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                  {method.subValue}
                </p>
              </div>

              <span
                className="text-sm font-bold px-4 py-2 rounded-full w-full text-center"
                style={{ background: method.bg, color: method.color }}
              >
                {method.cta} →
              </span>
            </motion.a>
          ))}
        </div>

        {/* Reservation highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="bg-[#DC2626] rounded-2xl p-8 md:p-10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 text-[150px] opacity-5 leading-none select-none">
            🦜
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-xl flex-shrink-0">
                <CalendarDays size={28} className="text-white" />
              </div>
              <div>
                <h3
                  className="text-2xl md:text-3xl font-black text-white mb-2"
                  style={{ fontFamily: "var(--font-public-sans)" }}
                >
                  Grupos e Eventos Privados
                </h3>
                <p className="text-white/80 max-w-md" style={{ fontFamily: "var(--font-inter)" }}>
                  Celebrações de aniversário, almoços de empresa, reuniões de família?
                  Temos capacidade para grupos até 30 pessoas. Fale connosco para um
                  menu personalizado.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <Users size={16} />
                <span>Até 30 pessoas</span>
              </div>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <MessageCircle size={16} />
                <span>Menu personalizado</span>
              </div>
              <a
                href="tel:+351233435133"
                className="bg-white text-[#DC2626] font-bold px-6 py-3 rounded-full hover:bg-[#FEF3C7] transition-colors duration-200 text-center"
              >
                Pedir Informações
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 fill-[#78350F]">
          <path d="M0,60 C360,0 1080,60 1440,20 L1440,60 Z" />
        </svg>
      </div>
    </section>
  );
}
