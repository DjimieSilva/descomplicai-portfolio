"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, AlertCircle } from "lucide-react";

type DaySchedule = {
  day: string;
  lunch: string;
  dinner: string;
  closed?: boolean;
  highlight?: boolean;
};

const schedule: DaySchedule[] = [
  { day: "Segunda-feira", lunch: "Encerrado", dinner: "Encerrado", closed: true },
  { day: "Terça-feira", lunch: "12:00 – 15:00", dinner: "19:00 – 22:30" },
  { day: "Quarta-feira", lunch: "12:00 – 15:00", dinner: "19:00 – 22:30" },
  { day: "Quinta-feira", lunch: "12:00 – 15:00", dinner: "19:00 – 23:00" },
  { day: "Sexta-feira", lunch: "12:00 – 15:30", dinner: "19:00 – 23:30", highlight: true },
  { day: "Sábado", lunch: "12:00 – 16:00", dinner: "19:00 – 00:00", highlight: true },
  { day: "Domingo", lunch: "12:00 – 16:00", dinner: "19:00 – 22:00" },
];

function isCurrentlyOpen(): boolean {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const time = hour + minute / 60;

  // Monday = 1, Sunday = 0
  if (day === 1) return false; // Monday closed

  const lunchOpen = 12;
  const lunchClose = day === 6 || day === 0 ? 16 : 15.5;
  const dinnerOpen = 19;
  const dinnerClose = day === 6 ? 24 : day === 5 ? 23.5 : 22.5;

  return (time >= lunchOpen && time < lunchClose) || (time >= dinnerOpen && time < dinnerClose);
}

export default function Hours() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const open = isCurrentlyOpen();

  return (
    <section
      ref={ref}
      className="bg-[#0f0f0f] py-24 px-6 border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-0.5 bg-[#EAB308]" />
              <span className="text-[#EAB308] text-xs font-[family-name:var(--font-space-grotesk)] tracking-[0.2em] uppercase">
                Horários
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] font-black text-[clamp(2rem,5vw,3.5rem)] text-white leading-tight">
              Quando estamos{" "}
              <span className="text-[#EAB308]">à tua espera.</span>
            </h2>
          </div>

          {/* Open/Closed badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-3 border ${
              open
                ? "bg-green-500/10 border-green-500/30 text-green-400"
                : "bg-[#B91C1C]/10 border-[#B91C1C]/30 text-red-400"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${open ? "bg-green-400" : "bg-red-400"}`}
            >
              {open && (
                <motion.div
                  animate={{ scale: [1, 1.8, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-green-400"
                />
              )}
            </div>
            <span className="font-[family-name:var(--font-space-grotesk)] font-bold text-sm tracking-wide">
              {open ? "Aberto agora" : "Fechado agora"}
            </span>
          </div>
        </motion.div>

        {/* Schedule table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="border border-white/[0.06] overflow-hidden"
        >
          {/* Table header */}
          <div className="grid grid-cols-3 bg-white/[0.04] border-b border-white/[0.06] px-6 py-3">
            <span className="font-[family-name:var(--font-space-grotesk)] text-xs font-bold text-[#A3A3A3] tracking-widest uppercase">
              Dia
            </span>
            <span className="font-[family-name:var(--font-space-grotesk)] text-xs font-bold text-[#A3A3A3] tracking-widest uppercase">
              Almoço
            </span>
            <span className="font-[family-name:var(--font-space-grotesk)] text-xs font-bold text-[#A3A3A3] tracking-widest uppercase">
              Jantar
            </span>
          </div>

          {/* Rows */}
          {schedule.map((item, i) => (
            <motion.div
              key={item.day}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
              className={`grid grid-cols-3 items-center px-6 py-4 border-b border-white/[0.04] last:border-0 transition-colors duration-200 ${
                item.highlight
                  ? "bg-[#EAB308]/5 hover:bg-[#EAB308]/8"
                  : item.closed
                  ? "opacity-40"
                  : "hover:bg-white/[0.02]"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`font-[family-name:var(--font-space-grotesk)] font-semibold text-sm ${
                    item.highlight ? "text-[#EAB308]" : item.closed ? "text-[#A3A3A3]" : "text-white"
                  }`}
                >
                  {item.day}
                </span>
                {item.highlight && (
                  <span className="text-[10px] font-[family-name:var(--font-space-grotesk)] font-bold tracking-widest uppercase bg-[#EAB308]/20 text-[#EAB308] px-1.5 py-0.5">
                    Pop
                  </span>
                )}
              </div>
              <span
                className={`font-[family-name:var(--font-inter)] text-sm ${
                  item.closed ? "text-[#A3A3A3]/50" : "text-[#A3A3A3]"
                }`}
              >
                {item.lunch}
              </span>
              <span
                className={`font-[family-name:var(--font-inter)] text-sm ${
                  item.closed ? "text-[#A3A3A3]/50" : "text-[#A3A3A3]"
                }`}
              >
                {item.dinner}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-6 flex items-start gap-3 p-4 bg-white/[0.02] border border-white/[0.04]"
        >
          <AlertCircle size={16} className="text-[#EAB308] mt-0.5 flex-shrink-0" />
          <p className="font-[family-name:var(--font-inter)] text-[#A3A3A3]/70 text-sm leading-relaxed">
            Os horários podem variar em feriados e épocas especiais. Confirma sempre antes de vir.
            Ao fim de semana o restaurante fica cheio — recomendamos reserva.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
