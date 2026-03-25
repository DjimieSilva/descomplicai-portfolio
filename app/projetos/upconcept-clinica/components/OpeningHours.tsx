"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, CheckCircle, Star, AlertCircle } from "lucide-react";

const schedule = [
  { day: "Segunda-feira", hours: "09:00 – 19:30", open: true },
  { day: "Terça-feira", hours: "09:00 – 19:30", open: true },
  { day: "Quarta-feira", hours: "09:00 – 19:30", open: true },
  { day: "Quinta-feira", hours: "09:00 – 19:30", open: true },
  { day: "Sexta-feira", hours: "09:00 – 19:30", open: true },
  { day: "Sábado", hours: "09:00 – 17:00", open: true, special: true },
  { day: "Domingo", hours: "09:00 – 13:00", open: true, highlight: true },
];

const differentiators = [
  {
    icon: Star,
    title: "Únicos na Região",
    description: "A única clínica dentária da Figueira da Foz aberta todos os dias da semana.",
  },
  {
    icon: CheckCircle,
    title: "Feriados Incluídos",
    description: "Não fechamos em feriados nacionais ou locais. Estamos sempre cá para si.",
  },
  {
    icon: Clock,
    title: "Urgências Dentárias",
    description: "Dor de dentes não escolhe hora. Contacte-nos a qualquer dia para atendimento urgente.",
  },
];

export default function OpeningHours() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const today = new Date().getDay(); // 0=Sun, 1=Mon...
  const dayIndexMap: Record<number, number> = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 0: 6 };
  const todayIndex = dayIndexMap[today];

  return (
    <section id="horarios" ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0D1421]">
        {/* Animated radial gradient accent */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(6,182,212,0.06) 0%, transparent 70%)",
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-[#06B6D4]/40 bg-[#06B6D4]/10"
          >
            <Clock className="w-4 h-4 text-[#06B6D4]" />
            <span className="text-sm font-medium text-[#06B6D4] font-[family-name:var(--font-inter-uc)]">
              Horário de Funcionamento
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] text-white mb-4"
          >
            Abertos quando
            <br />
            <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
              os outros fecham
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto font-[family-name:var(--font-inter-uc)]"
          >
            Na Upconcept, acreditamos que a saúde oral não tem dia de folga. Por isso somos os
            únicos na região abertos todos os dias, incluindo domingos e feriados.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Schedule table */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden"
          >
            {/* Table header */}
            <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-[#2563EB]/20 to-[#06B6D4]/20">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#06B6D4] animate-pulse" />
                <span className="text-white font-semibold font-[family-name:var(--font-space-grotesk)]">
                  Horário Semanal Completo
                </span>
              </div>
            </div>

            {/* Schedule rows */}
            <div className="divide-y divide-white/5">
              {schedule.map((item, index) => {
                const isToday = index === todayIndex;
                return (
                  <motion.div
                    key={item.day}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.35 + index * 0.06 }}
                    className={`flex items-center justify-between px-6 py-4 transition-colors duration-200 ${
                      isToday
                        ? "bg-gradient-to-r from-[#2563EB]/20 to-transparent"
                        : item.highlight
                        ? "bg-gradient-to-r from-[#06B6D4]/10 to-transparent"
                        : "hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isToday && (
                        <div className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse shrink-0" />
                      )}
                      <div>
                        <span
                          className={`font-medium font-[family-name:var(--font-space-grotesk)] ${
                            isToday
                              ? "text-[#2563EB]"
                              : item.highlight
                              ? "text-[#06B6D4]"
                              : "text-white"
                          }`}
                        >
                          {item.day}
                        </span>
                        {isToday && (
                          <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-[#2563EB]/30 text-[#2563EB] font-[family-name:var(--font-inter-uc)]">
                            hoje
                          </span>
                        )}
                        {item.highlight && !isToday && (
                          <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-[#06B6D4]/20 text-[#06B6D4] font-[family-name:var(--font-inter-uc)]">
                            especial
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-white font-medium font-[family-name:var(--font-inter-uc)] tabular-nums">
                        {item.hours}
                      </span>
                      <CheckCircle
                        className="w-4 h-4 shrink-0"
                        style={{ color: item.highlight ? "#06B6D4" : isToday ? "#2563EB" : "#22c55e" }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer note */}
            <div className="px-6 py-4 border-t border-white/10 bg-[#06B6D4]/5">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-[#06B6D4] shrink-0 mt-0.5" />
                <p className="text-sm text-gray-400 font-[family-name:var(--font-inter-uc)]">
                  Abertos também em todos os feriados nacionais e locais, incluindo Natal, Ano Novo
                  e Páscoa.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Differentiators + CTA */}
          <div className="space-y-6">
            {/* Big highlight card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative p-8 rounded-3xl overflow-hidden border border-[#2563EB]/30"
              style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(6,182,212,0.10) 100%)" }}
            >
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-20"
                style={{ background: "radial-gradient(circle, #2563EB, transparent)", transform: "translate(30%, -30%)" }}
              />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm font-[family-name:var(--font-inter-uc)]">O nosso compromisso</p>
                    <h3 className="text-white font-bold font-[family-name:var(--font-space-grotesk)] text-xl">
                      7 Dias por Semana
                    </h3>
                  </div>
                </div>
                <p className="text-gray-300 font-[family-name:var(--font-inter-uc)] leading-relaxed">
                  Somos a <strong className="text-white">única clínica dentária</strong> da Figueira
                  da Foz com funcionamento ininterrupto ao longo de toda a semana. Domingos, feriados,
                  Natal — estamos sempre aqui para si e para a sua família.
                </p>
                <div className="mt-6 grid grid-cols-7 gap-1.5">
                  {["S", "T", "Q", "Q", "S", "S", "D"].map((d, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-lg flex items-center justify-center text-xs font-bold font-[family-name:var(--font-space-grotesk)]"
                      style={{
                        background:
                          i === 6
                            ? "linear-gradient(135deg, #2563EB, #06B6D4)"
                            : i === 5
                            ? "rgba(6,182,212,0.3)"
                            : "rgba(37,99,235,0.2)",
                        color: i >= 5 ? "white" : "#9ca3af",
                        border: i === 6 ? "none" : "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      {d}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[#06B6D4] font-[family-name:var(--font-inter-uc)] mt-2 text-right">
                  Todos os dias ✓
                </p>
              </div>
            </motion.div>

            {/* Differentiator cards */}
            {differentiators.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.45 + index * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-[#06B6D4]/30 hover:bg-[#06B6D4]/5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#06B6D4]/20 border border-[#06B6D4]/30 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-[#06B6D4]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold font-[family-name:var(--font-space-grotesk)] mb-1">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 text-sm font-[family-name:var(--font-inter-uc)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* CTA */}
            <motion.a
              href="#contacto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex items-center justify-center gap-2 w-full py-4 px-6 rounded-2xl font-bold font-[family-name:var(--font-space-grotesk)] text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#2563EB]/30"
              style={{ background: "linear-gradient(135deg, #2563EB, #06B6D4)" }}
            >
              <Clock className="w-5 h-5" />
              Marcar Consulta — Qualquer Dia
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
