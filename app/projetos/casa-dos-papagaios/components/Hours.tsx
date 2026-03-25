"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

const schedule = [
  { day: "Segunda-feira", open: "12:00", close: "15:30", dinner: false, closed: false },
  { day: "Terça-feira", open: "12:00", close: "15:30", dinner: false, closed: false },
  { day: "Quarta-feira", open: "12:00", close: "15:30", dinner: false, closed: false },
  { day: "Quinta-feira", open: "12:00", close: "15:30", dinner: false, closed: false },
  { day: "Sexta-feira", open: "12:00", close: "15:30", dinner: true, dinnerOpen: "19:00", dinnerClose: "22:00", closed: false },
  { day: "Sábado", open: "12:00", close: "16:00", dinner: true, dinnerOpen: "19:00", dinnerClose: "22:30", closed: false },
  { day: "Domingo", open: "12:00", close: "16:00", dinner: false, closed: false },
];

const todayIndex = new Date().getDay(); // 0 = Sunday, 1 = Monday...
// Map JS day (0=Sun) to our array (0=Mon, 6=Sun)
const mappedToday = todayIndex === 0 ? 6 : todayIndex - 1;

export default function Hours() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-[#15803D] text-white px-4 py-2 rounded-full text-sm font-bold mb-6 uppercase tracking-wide">
            <Clock size={14} />
            Horário de Funcionamento
          </div>
          <h2
            className="text-4xl md:text-5xl font-black text-[#78350F] leading-tight mb-4"
            style={{ fontFamily: "var(--font-public-sans)" }}
          >
            Quando Pode
            <br />
            Visitar-nos
          </h2>
          <p className="text-[#78350F]/60 max-w-md mx-auto" style={{ fontFamily: "var(--font-inter)" }}>
            Seguimos o horário do Mercado Municipal.
            Ao almoço todos os dias, às sextas e sábados também ao jantar.
          </p>
        </motion.div>

        {/* Schedule table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-2 mb-10"
        >
          {schedule.map((s, i) => {
            const isToday = i === mappedToday;
            return (
              <motion.div
                key={s.day}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 ${
                  isToday
                    ? "border-[#DC2626] bg-[#DC2626]/5 shadow-md"
                    : s.closed
                    ? "border-transparent bg-gray-50 opacity-50"
                    : "border-transparent bg-[#FEF3C7]/60 hover:bg-[#FEF3C7]"
                }`}
              >
                <div className="flex items-center gap-3">
                  {isToday ? (
                    <AlertCircle size={18} className="text-[#DC2626] flex-shrink-0" />
                  ) : s.closed ? (
                    <XCircle size={18} className="text-gray-400 flex-shrink-0" />
                  ) : (
                    <CheckCircle size={18} className="text-[#15803D] flex-shrink-0" />
                  )}
                  <div>
                    <span
                      className={`font-bold ${isToday ? "text-[#DC2626]" : "text-[#78350F]"}`}
                      style={{ fontFamily: "var(--font-public-sans)" }}
                    >
                      {s.day}
                      {isToday && (
                        <span className="ml-2 text-xs bg-[#DC2626] text-white px-2 py-0.5 rounded-full">
                          Hoje
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  {s.closed ? (
                    <span className="text-gray-400 text-sm font-medium">Encerrado</span>
                  ) : (
                    <div>
                      <p className="font-bold text-[#78350F]" style={{ fontFamily: "var(--font-public-sans)" }}>
                        {s.open} — {s.close}
                      </p>
                      {s.dinner && (
                        <p className="text-[#15803D] text-sm font-medium">
                          + Jantar: {s.dinnerOpen} — {s.dinnerClose}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Important notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="bg-[#FEF3C7] border border-[#78350F]/20 rounded-xl p-5">
            <p className="font-black text-[#78350F] mb-2" style={{ fontFamily: "var(--font-public-sans)" }}>
              📞 Reservas obrigatórias
            </p>
            <p className="text-[#78350F]/70 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
              Ao jantar e fins de semana ao almoço recomendamos vivamente a reserva
              prévia. Somos um espaço pequeno e acolhedor.
            </p>
          </div>
          <div className="bg-[#FEF3C7] border border-[#78350F]/20 rounded-xl p-5">
            <p className="font-black text-[#78350F] mb-2" style={{ fontFamily: "var(--font-public-sans)" }}>
              🎉 Feriados e Épocas Especiais
            </p>
            <p className="text-[#78350F]/70 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
              Em feriados nacionais e nas festas da Figueira da Foz o horário pode
              variar. Consulte-nos antes de vir.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
