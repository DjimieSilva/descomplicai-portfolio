"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Mail, Calendar, Clock, Users } from "lucide-react";

const hours = [
  { day: "Segunda a Quinta", time: "12h00 — 23h00" },
  { day: "Sexta e Sábado", time: "12h00 — 00h00" },
  { day: "Domingo", time: "12h00 — 22h00" },
  { day: "Época de Inverno", time: "Consulte-nos" },
];

const tips = [
  {
    icon: Calendar,
    title: "Reserve com Antecedência",
    desc: "Em época alta e fins de semana, recomendamos reservar com pelo menos 3 dias de antecedência.",
  },
  {
    icon: Clock,
    title: "Mesas ao Pôr do Sol",
    desc: "As mesas com melhor vista têm disponibilidade muito limitada. Reserve especificamente para o pôr do sol.",
  },
  {
    icon: Users,
    title: "Grupos e Eventos",
    desc: "Para grupos acima de 10 pessoas ou eventos privados, contacte-nos diretamente para proposta personalizada.",
  },
];

export default function Reservations() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="reservas" className="py-24 md:py-32 bg-[#0f0d0a] relative overflow-hidden">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DDB892]/25 to-transparent" />

      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#DDB892]/3 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p
            className="text-[#DDB892]/50 text-xs tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Reservas
          </p>
          <h2
            className="text-[#FAF8F4] text-4xl md:text-6xl font-light mb-4"
            style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 200 }}
          >
            Reserve a Sua{" "}
            <span className="text-[#DDB892] italic" style={{ fontWeight: 300 }}>
              Mesa
            </span>
          </h2>
          <p className="text-[#9A8C72] text-sm max-w-md mx-auto">
            Uma experiência começa com uma reserva. Garanta o seu lugar à beira-mar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left — Contact */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-5 mb-10"
            >
              <a
                href="tel:+351233000000"
                className="group flex items-center gap-5 p-5 border border-[#DDB892]/10 rounded-xl hover:border-[#DDB892]/30 transition-all duration-300 bg-[#DDB892]/3"
              >
                <div className="w-11 h-11 rounded-xl bg-[#DDB892]/10 flex items-center justify-center group-hover:bg-[#DDB892]/20 transition-colors">
                  <Phone className="w-4 h-4 text-[#DDB892]" />
                </div>
                <div>
                  <p
                    className="text-[9px] tracking-[0.3em] uppercase text-[#DDB892]/50 mb-0.5"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    Telefone
                  </p>
                  <p className="text-[#FAF8F4] text-base font-medium" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    +351 233 000 000
                  </p>
                </div>
              </a>

              <a
                href="mailto:reservas@penaareia.pt"
                className="group flex items-center gap-5 p-5 border border-[#DDB892]/10 rounded-xl hover:border-[#DDB892]/30 transition-all duration-300 bg-[#DDB892]/3"
              >
                <div className="w-11 h-11 rounded-xl bg-[#DDB892]/10 flex items-center justify-center group-hover:bg-[#DDB892]/20 transition-colors">
                  <Mail className="w-4 h-4 text-[#DDB892]" />
                </div>
                <div>
                  <p
                    className="text-[9px] tracking-[0.3em] uppercase text-[#DDB892]/50 mb-0.5"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    Email
                  </p>
                  <p className="text-[#FAF8F4] text-base font-medium" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    reservas@penaareia.pt
                  </p>
                </div>
              </a>
            </motion.div>

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="p-6 border border-[#DDB892]/10 rounded-xl bg-[#DDB892]/2"
            >
              <p
                className="text-[#DDB892]/60 text-[10px] tracking-[0.35em] uppercase mb-5"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Horário de Funcionamento
              </p>
              <div className="space-y-3">
                {hours.map((h, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-[#9A8C72] text-sm">{h.day}</span>
                    <span className="text-[#DDB892]/80 text-sm font-medium" style={{ fontFamily: "'Manrope', sans-serif" }}>
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Tips */}
          <div className="space-y-5">
            {tips.map((tip, i) => {
              const Icon = tip.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                  className="flex gap-5 p-6 border border-[#DDB892]/8 rounded-xl bg-[#1a1410]/50 hover:border-[#DDB892]/18 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#DDB892]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-[#DDB892]" />
                  </div>
                  <div>
                    <h3
                      className="text-[#FAF8F4] text-sm font-medium mb-1.5"
                      style={{ fontFamily: "'Manrope', sans-serif" }}
                    >
                      {tip.title}
                    </h3>
                    <p className="text-[#9A8C72] text-sm leading-relaxed">{tip.desc}</p>
                  </div>
                </motion.div>
              );
            })}

            {/* Social note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="p-5 border border-[#0E7490]/20 rounded-xl bg-[#0E7490]/5 text-center"
            >
              <p className="text-[#9A8C72] text-sm mb-2">
                Siga-nos para ver disponibilidades e promoções de última hora
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0E7490] text-xs tracking-widest uppercase hover:text-[#DDB892] transition-colors"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  Facebook
                </a>
                <span className="text-[#9A8C72]/30">·</span>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0E7490] text-xs tracking-widest uppercase hover:text-[#DDB892] transition-colors"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  Instagram
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
