"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, Phone, MessageCircle, AlertCircle } from "lucide-react";

const schedule = [
  { day: "Segunda-Feira", lunch: "12:00 – 15:00", dinner: "Fechado", closed: false, dinnerClosed: true },
  { day: "Terça-Feira", lunch: "12:00 – 15:00", dinner: "19:00 – 22:00", closed: false, dinnerClosed: false },
  { day: "Quarta-Feira", lunch: "12:00 – 15:00", dinner: "19:00 – 22:00", closed: false, dinnerClosed: false },
  { day: "Quinta-Feira", lunch: "12:00 – 15:00", dinner: "19:00 – 22:00", closed: false, dinnerClosed: false },
  { day: "Sexta-Feira", lunch: "12:00 – 15:30", dinner: "19:00 – 22:30", closed: false, dinnerClosed: false },
  { day: "Sábado", lunch: "12:00 – 15:30", dinner: "19:00 – 22:30", closed: false, dinnerClosed: false },
  { day: "Domingo", lunch: "12:00 – 15:30", dinner: "Fechado", closed: false, dinnerClosed: true },
];

export function Hours() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const today = new Date().getDay(); // 0=Sunday, 1=Monday...
  const dayMap = [6, 0, 1, 2, 3, 4, 5]; // map JS day to schedule index
  const todayIndex = dayMap[today];

  return (
    <section
      id="reservas"
      ref={ref}
      className="py-20 md:py-32 bg-[#F9FAFB] relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            #8B7355 0px,
            transparent 1px,
            transparent 25px
          )`,
        }}
      />

      <div className="max-w-5xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-[#8B7355] text-sm uppercase tracking-[0.2em] font-semibold mb-3">
            Horários e Reservas
          </p>
          <h2
            className="text-4xl md:text-5xl font-black text-[#1E3A5F] mb-4 leading-tight"
            style={{ fontFamily: "var(--font-merriweather)" }}
          >
            Quando Nos Pode<br />
            <span className="text-[#8B7355]">Visitar</span>
          </h2>
          <div className="w-16 h-1 bg-[#C9B896] mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Schedule table */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="bg-white border border-[#C9B896]/30 rounded overflow-hidden"
          >
            <div className="bg-[#1E3A5F] px-5 py-4 flex items-center gap-3">
              <Clock className="w-4 h-4 text-[#C9B896]" />
              <h3
                className="font-bold text-white text-sm uppercase tracking-wider"
                style={{ fontFamily: "var(--font-merriweather)" }}
              >
                Horário Semanal
              </h3>
            </div>
            <div className="divide-y divide-[#C9B896]/15">
              {schedule.map((item, i) => (
                <div
                  key={item.day}
                  className={`flex items-center justify-between px-5 py-3 text-sm transition-colors ${
                    i === todayIndex
                      ? "bg-[#C9B896]/10 border-l-4 border-l-[#C9B896]"
                      : "border-l-4 border-l-transparent"
                  }`}
                >
                  <span
                    className={`font-medium ${i === todayIndex ? "text-[#1E3A5F] font-bold" : "text-[#1E3A5F]/70"}`}
                  >
                    {item.day}
                    {i === todayIndex && (
                      <span className="ml-2 text-[10px] bg-[#C9B896] text-[#1E3A5F] px-1.5 py-0.5 rounded-full uppercase tracking-wider font-bold">
                        Hoje
                      </span>
                    )}
                  </span>
                  <div className="text-right">
                    <p className="text-[#1E3A5F]/60 text-xs">{item.lunch}</p>
                    <p className={`text-xs ${item.dinnerClosed ? "text-[#1E3A5F]/30 italic" : "text-[#1E3A5F]/60"}`}>
                      {item.dinner}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact & reservations */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-5"
          >
            {/* Note */}
            <div className="bg-[#1E3A5F]/5 border-l-4 border-[#C9B896] px-5 py-4 rounded-r flex gap-3">
              <AlertCircle className="w-5 h-5 text-[#8B7355] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#1E3A5F] text-sm mb-1" style={{ fontFamily: "var(--font-merriweather)" }}>
                  Reserva Recomendada
                </p>
                <p className="text-xs text-[#1E3A5F]/60 leading-relaxed">
                  Somos uma tasca pequena, com poucos lugares. Em fim de semana,
                  especialmente no verão, é melhor ligar com antecedência.
                </p>
              </div>
            </div>

            {/* Phone */}
            <a
              href="tel:+351233000000"
              className="flex items-center gap-4 bg-white border border-[#C9B896]/40 rounded p-5 group hover:border-[#1E3A5F]/40 hover:shadow-sm transition-all"
            >
              <div className="w-11 h-11 rounded-full bg-[#1E3A5F]/5 flex items-center justify-center group-hover:bg-[#1E3A5F] transition-colors">
                <Phone className="w-5 h-5 text-[#8B7355] group-hover:text-white transition-colors" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-bold text-[#1E3A5F] text-sm" style={{ fontFamily: "var(--font-merriweather)" }}>
                  Ligar para Reservar
                </p>
                <p className="text-[#8B7355] text-base font-semibold">+351 233 000 000</p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/351930000000?text=Olá!%20Gostaria%20de%20fazer%20uma%20reserva%20na%20Tasca%20Da%20Praia."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-[#25D366]/5 border border-[#25D366]/30 rounded p-5 group hover:bg-[#25D366]/10 transition-all"
            >
              <div className="w-11 h-11 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-[#25D366]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-bold text-[#1E3A5F] text-sm" style={{ fontFamily: "var(--font-merriweather)" }}>
                  WhatsApp
                </p>
                <p className="text-[#25D366] text-sm">Mensagem rápida para reservar</p>
              </div>
            </a>

            {/* Summer note */}
            <div className="bg-[#C9B896]/10 border border-[#C9B896]/30 rounded p-5">
              <p
                className="font-bold text-[#1E3A5F] text-sm mb-2"
                style={{ fontFamily: "var(--font-merriweather)" }}
              >
                Temporada de Verão
              </p>
              <p className="text-xs text-[#1E3A5F]/60 leading-relaxed">
                De Junho a Setembro estamos abertos todos os dias ao almoço e jantar.
                O verão em Buarcos é especial — não perca a sardinha assada na esplanada.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
