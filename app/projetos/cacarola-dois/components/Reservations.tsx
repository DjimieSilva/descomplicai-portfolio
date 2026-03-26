"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, MessageCircle, CalendarDays, Users, Clock } from "lucide-react";

const timeSlots = [
  "12:30", "13:00", "13:30", "14:00",
  "19:30", "20:00", "20:30", "21:00", "21:30",
];

export default function Reservations() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [guests, setGuests] = useState(2);

  return (
    <section id="reservas" ref={ref} className="bg-[#0C2340] py-24 sm:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="font-[family-name:var(--font-inter)] text-[#FB923C] text-xs tracking-[0.35em] uppercase mb-4"
            >
              Reservas
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-[family-name:var(--font-hanken)] font-black text-[clamp(2rem,4.5vw,3.2rem)] leading-tight tracking-tight text-white mb-6"
            >
              Reserve a sua
              <br />
              <span className="text-[#0369A1]">mesa junto ao mar</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-[family-name:var(--font-inter)] text-white/50 text-base leading-relaxed mb-10"
            >
              Recomendamos reserva antecipada, especialmente ao fim de semana.
              Para grupos acima de 8 pessoas, contacte-nos diretamente.
            </motion.p>

            {/* Contact options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="space-y-4"
            >
              {[
                { icon: Phone, label: "Telefone", value: "+351 233 426 930", href: "tel:+351233426930" },
                { icon: Phone, label: "Telefone 2", value: "+351 233 425 347", href: "tel:+351233425347" },
                { icon: Mail, label: "Email", value: "info@cacaroladois.com", href: "mailto:info@cacaroladois.com" },
              ].map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#0369A1]/30 transition-colors duration-200 flex-shrink-0">
                    <contact.icon size={16} className="text-white/40 group-hover:text-[#7DD3FC] transition-colors duration-200" />
                  </div>
                  <div>
                    <div className="font-[family-name:var(--font-inter)] text-white/30 text-xs mb-0.5">
                      {contact.label}
                    </div>
                    <div className="font-[family-name:var(--font-hanken)] text-white/80 font-medium text-sm group-hover:text-white transition-colors duration-200">
                      {contact.value}
                    </div>
                  </div>
                </a>
              ))}
            </motion.div>
          </div>

          {/* Interactive reservation widget */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-white/4 border border-white/10 rounded-2xl p-7"
          >
            <h3 className="font-[family-name:var(--font-hanken)] font-bold text-white text-lg mb-6">
              Pré-Reserva Online
            </h3>

            {/* Guests selector */}
            <div className="mb-6">
              <label className="font-[family-name:var(--font-inter)] text-white/40 text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                <Users size={12} />
                Número de pessoas
              </label>
              <div className="flex gap-2 flex-wrap">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <button
                    key={n}
                    onClick={() => setGuests(n)}
                    className={`w-10 h-10 rounded-lg text-sm font-[family-name:var(--font-hanken)] font-semibold transition-all duration-150 ${
                      guests === n
                        ? "bg-[#0369A1] text-white"
                        : "bg-white/5 text-white/50 hover:bg-white/10"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Date */}
            <div className="mb-6">
              <label className="font-[family-name:var(--font-inter)] text-white/40 text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                <CalendarDays size={12} />
                Data
              </label>
              <input
                type="date"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-[family-name:var(--font-inter)] focus:outline-none focus:border-[#0369A1]/60 transition-colors"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            {/* Time slots */}
            <div className="mb-8">
              <label className="font-[family-name:var(--font-inter)] text-white/40 text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                <Clock size={12} />
                Hora
              </label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2.5 rounded-lg text-sm font-[family-name:var(--font-hanken)] font-medium transition-all duration-150 ${
                      selectedTime === time
                        ? "bg-[#FB923C] text-white"
                        : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <a
              href={`https://wa.me/351233426930?text=Olá! Gostaria de reservar uma mesa para ${guests} pessoa${guests > 1 ? "s" : ""}${selectedTime ? ` às ${selectedTime}` : ""}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#0369A1] text-white font-[family-name:var(--font-hanken)] font-bold py-4 rounded-xl hover:bg-[#025d91] transition-colors duration-200 text-sm tracking-wide"
            >
              <MessageCircle size={16} />
              Confirmar via WhatsApp
            </a>
            <p className="font-[family-name:var(--font-inter)] text-white/25 text-xs text-center mt-3">
              Receberá confirmação em até 2 horas
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
