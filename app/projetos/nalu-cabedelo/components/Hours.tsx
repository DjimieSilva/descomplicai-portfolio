"use client";

import { motion } from "framer-motion";
import { Clock, Sun, Sunset, Moon } from "lucide-react";

const schedule = [
  {
    day: "Segunda",
    short: "2ª",
    summer: "10:00 – 22:00",
    winter: "Fechado",
    summerOpen: true,
    winterOpen: false,
  },
  {
    day: "Terça",
    short: "3ª",
    summer: "10:00 – 22:00",
    winter: "12:00 – 18:00",
    summerOpen: true,
    winterOpen: true,
  },
  {
    day: "Quarta",
    short: "4ª",
    summer: "10:00 – 22:00",
    winter: "12:00 – 18:00",
    summerOpen: true,
    winterOpen: true,
  },
  {
    day: "Quinta",
    short: "5ª",
    summer: "10:00 – 23:00",
    winter: "12:00 – 20:00",
    summerOpen: true,
    winterOpen: true,
  },
  {
    day: "Sexta",
    short: "6ª",
    summer: "10:00 – 02:00",
    winter: "12:00 – 22:00",
    summerOpen: true,
    winterOpen: true,
    highlight: true,
  },
  {
    day: "Sábado",
    short: "Sáb",
    summer: "09:00 – 02:00",
    winter: "10:00 – 22:00",
    summerOpen: true,
    winterOpen: true,
    highlight: true,
  },
  {
    day: "Domingo",
    short: "Dom",
    summer: "09:00 – 22:00",
    winter: "10:00 – 19:00",
    summerOpen: true,
    winterOpen: true,
  },
];

const seasons = [
  {
    icon: Sun,
    label: "Verão",
    period: "Junho · Julho · Agosto · Setembro",
    color: "#FF6B35",
    bg: "rgba(255,107,53,0.1)",
    description: "Horário alargado. Happy Hour 16h–18h todos os dias.",
  },
  {
    icon: Sunset,
    label: "Primavera / Outono",
    period: "Março – Maio · Outubro – Novembro",
    color: "#FFD700",
    bg: "rgba(255,215,0,0.1)",
    description: "Horário intermédio. Fechado às segundas.",
  },
  {
    icon: Moon,
    label: "Inverno",
    period: "Dezembro · Janeiro · Fevereiro",
    color: "#0077B6",
    bg: "rgba(0,119,182,0.1)",
    description: "Horário reduzido. Aberto fins de semana e feriados.",
  },
];

export default function Hours() {
  return (
    <section
      id="hours"
      className="relative py-24 md:py-32 bg-[#0A1628] overflow-hidden"
    >
      {/* Divider wave */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 40" fill="none" className="w-full" preserveAspectRatio="none">
          <path d="M0,20 C480,40 960,0 1440,20 L1440,0 L0,0 Z" fill="#0D1F3C" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[#FFD700] text-sm font-bold tracking-[0.3em] uppercase mb-4 block">
            Horários
          </span>
          <h2
            className="text-4xl md:text-6xl font-black text-white mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Quando Podes
            <br />
            <span className="text-[#FFD700]">Encontrar-nos</span>
          </h2>
          <p className="text-white/60 text-base max-w-xl mx-auto">
            O NALU adapta-se às estações. No verão, a festa nunca para. No
            inverno, é o refúgio perfeito.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Schedule table */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border border-white/10 overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,119,182,0.1) 0%, rgba(13,31,60,0.5) 100%)",
            }}
          >
            {/* Table header */}
            <div className="grid grid-cols-3 gap-4 px-6 py-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-white/40" />
                <span className="text-white/40 text-xs font-semibold uppercase tracking-wider">
                  Dia
                </span>
              </div>
              <div className="text-center">
                <span className="text-[#FF6B35] text-xs font-bold uppercase tracking-wider">
                  Verão ☀️
                </span>
              </div>
              <div className="text-center">
                <span className="text-[#0077B6] text-xs font-bold uppercase tracking-wider">
                  Inverno ❄️
                </span>
              </div>
            </div>

            {/* Rows */}
            {schedule.map((row, index) => (
              <motion.div
                key={row.day}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`grid grid-cols-3 gap-4 px-6 py-4 border-b border-white/5 last:border-0 ${
                  row.highlight ? "bg-[#FF6B35]/5" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`font-bold text-sm ${
                      row.highlight ? "text-[#FF6B35]" : "text-white"
                    }`}
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {row.day}
                  </span>
                  {row.highlight && (
                    <span className="text-[#FF6B35] text-xs">★</span>
                  )}
                </div>
                <div className="text-center">
                  <span
                    className={`text-xs font-semibold ${
                      row.summerOpen ? "text-[#FF6B35]" : "text-white/30"
                    }`}
                  >
                    {row.summer}
                  </span>
                </div>
                <div className="text-center">
                  <span
                    className={`text-xs font-semibold ${
                      row.winterOpen ? "text-white/70" : "text-white/30"
                    }`}
                  >
                    {row.winter}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Seasonal info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            {seasons.map((season, index) => {
              const Icon = season.icon;
              return (
                <motion.div
                  key={season.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-5 rounded-2xl border border-white/10"
                  style={{ background: season.bg }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${season.color}20` }}
                    >
                      <Icon size={18} style={{ color: season.color }} />
                    </div>
                    <div>
                      <h3
                        className="font-bold text-white text-base"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {season.label}
                      </h3>
                      <p
                        className="text-xs font-semibold"
                        style={{ color: season.color }}
                      >
                        {season.period}
                      </p>
                    </div>
                  </div>
                  <p className="text-white/50 text-sm pl-12">
                    {season.description}
                  </p>
                </motion.div>
              );
            })}

            {/* Happy Hour highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-5 rounded-2xl border border-[#FF6B35]/30 bg-[#FF6B35]/10"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🍹</span>
                <h3
                  className="font-black text-[#FF6B35] text-base"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Happy Hour
                </h3>
              </div>
              <p className="text-white/70 text-sm">
                Todos os dias das{" "}
                <span className="text-[#FF6B35] font-bold">16h às 18h</span> —
                2 cocktails pelo preço de 1. Aproveita enquanto o sol ainda está
                alto!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
