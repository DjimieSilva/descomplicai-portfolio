"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Briefcase, PartyPopper, Users } from "lucide-react";

const eventTypes = [
  {
    icon: Heart,
    title: "Casamentos",
    subtitle: "O dia mais especial da sua vida",
    description:
      "Celebre o vosso amor numa quinta histórica com jardins floridos, salão nobre e terraço com vista para o rio. Organizamos o seu casamento de A a Z, com pacotes personalizados e equipa dedicada.",
    features: ["Salão para 200 convidados", "Cerimónia civil disponível", "Menu de degustação personalizado", "Decoração floral incluída", "Coordenador de evento dedicado"],
    accent: "#722F37",
    bg: "rgba(114,47,55,0.08)",
    border: "rgba(114,47,55,0.25)",
  },
  {
    icon: Briefcase,
    title: "Eventos Corporativos",
    subtitle: "Reuniões e conferências com classe",
    description:
      "Fuja do escritório e inspire a sua equipa num ambiente único. Salas privativas, equipamento audiovisual, coffee breaks com produtos artesanais e almoços de trabalho num cenário incomparável.",
    features: ["Salas privativas com AV", "Coffee break artesanal", "Almoços e jantares de equipa", "Teambuilding na natureza", "Serviço de secretariado"],
    accent: "#556B2F",
    bg: "rgba(85,107,47,0.08)",
    border: "rgba(85,107,47,0.25)",
  },
  {
    icon: PartyPopper,
    title: "Celebrações",
    subtitle: "Aniversários, baptizados e comunhões",
    description:
      "Cada celebração merece um cenário à altura. Os nossos espaços adaptam-se a festas de aniversário, baptizados, comunhões e jantares de família com o aconchego de uma quinta portuguesa.",
    features: ["Espaços moduláveis", "Menu infantil disponível", "Bolo de aniversário", "Animação musical", "Estacionamento gratuito"],
    accent: "#C4A55A",
    bg: "rgba(196,165,90,0.08)",
    border: "rgba(196,165,90,0.25)",
  },
  {
    icon: Users,
    title: "Grupos",
    subtitle: "Almoços e jantares de grupo",
    description:
      "Ideal para associações, grupos de turismo ou viagens de estudo. Serviço de buffet ou menu executivo para grupos a partir de 20 pessoas, com pré-reserva e condições especiais.",
    features: ["A partir de 20 pessoas", "Menu executivo ou buffet", "Preço especial por volume", "Visita guiada à Quinta", "Transporte para grupos"],
    accent: "#A8A29E",
    bg: "rgba(168,162,158,0.08)",
    border: "rgba(168,162,158,0.25)",
  },
];

export default function Events() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="eventos"
      className="py-24 md:py-36 relative overflow-hidden"
      style={{ background: "#2D3A1E" }}
    >
      {/* Botanical pattern overlay */}
      <div className="absolute inset-0 opacity-[0.04]">
        <svg viewBox="0 0 800 800" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="ev-bot" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="30" fill="none" stroke="#FEFCE8" strokeWidth="1" />
              <path d="M50 20 L50 80 M20 50 L80 50" stroke="#FEFCE8" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ev-bot)" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-16"
        >
          <p
            className="text-xs tracking-[0.45em] uppercase mb-4"
            style={{ color: "#C4A55A", fontFamily: "var(--font-inter)" }}
          >
            Espaço de Eventos
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: "var(--font-libre-caslon)", color: "#FEFCE8" }}
          >
            Momentos que ficam
            <br />
            <em style={{ color: "#C4A55A" }}>para sempre</em>
          </h2>
          <div className="w-16 h-[2px] mx-auto mb-6" style={{ background: "#722F37" }} />
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(254,252,232,0.75)", fontFamily: "var(--font-inter)", fontWeight: 300 }}
          >
            A Quinta da Salmanha é o palco perfeito para as suas celebrações mais especiais.
            Espaços versáteis, natureza exuberante e uma equipa que transforma cada detalhe
            num momento inesquecível.
          </p>
        </motion.div>

        {/* Event cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {eventTypes.map((ev, i) => (
            <motion.div
              key={ev.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 * i }}
              className="p-8 rounded-sm relative overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: ev.bg,
                border: `1px solid ${ev.border}`,
              }}
            >
              {/* Accent top bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] transition-all duration-300 group-hover:h-[4px]"
                style={{ background: ev.accent }}
              />

              <div className="flex items-start gap-4 mb-5">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: ev.accent }}
                >
                  <ev.icon size={18} color="#FEFCE8" />
                </div>
                <div>
                  <h3
                    className="text-2xl font-bold leading-tight"
                    style={{ fontFamily: "var(--font-libre-caslon)", color: "#FEFCE8" }}
                  >
                    {ev.title}
                  </h3>
                  <p
                    className="text-xs tracking-wide mt-0.5"
                    style={{ color: ev.accent, fontFamily: "var(--font-inter)" }}
                  >
                    {ev.subtitle}
                  </p>
                </div>
              </div>

              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "rgba(254,252,232,0.75)", fontFamily: "var(--font-inter)", fontWeight: 300 }}
              >
                {ev.description}
              </p>

              <ul className="space-y-2 mb-6">
                {ev.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ev.accent }} />
                    <span
                      className="text-xs"
                      style={{ color: "rgba(254,252,232,0.7)", fontFamily: "var(--font-inter)" }}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#reservas"
                className="text-xs tracking-widest uppercase font-medium inline-flex items-center gap-2 transition-all duration-300 hover:gap-3"
                style={{ color: ev.accent, fontFamily: "var(--font-inter)" }}
              >
                Solicitar Proposta →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
