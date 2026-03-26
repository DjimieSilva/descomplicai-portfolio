"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, Car, Train, Navigation } from "lucide-react";

const hours = [
  { days: "Terça a Quinta", time: "12h30 – 15h00 / 19h30 – 22h30" },
  { days: "Sexta e Sábado", time: "12h30 – 15h30 / 19h30 – 23h00" },
  { days: "Domingo", time: "12h30 – 16h00" },
  { days: "Segunda-feira", time: "Encerrado" },
];

export default function Location() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#F1F5F9] py-24 sm:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-[family-name:var(--font-inter)] text-[#0369A1] text-xs tracking-[0.35em] uppercase mb-4"
        >
          Localização &amp; Horários
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-[family-name:var(--font-hanken)] font-black text-[clamp(2rem,4.5vw,3.2rem)] leading-tight tracking-tight text-[#0C2340] mb-12"
        >
          Encontre-nos em
          <br />
          <span className="text-[#0369A1]">Figueira da Foz</span>
        </motion.h2>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 bg-[#0C2340] rounded-2xl overflow-hidden h-72 sm:h-96 relative"
          >
            {/* Map placeholder visual */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#0369A1]/30 flex items-center justify-center mx-auto mb-4">
                  <MapPin size={24} className="text-[#7DD3FC]" />
                </div>
                <p className="font-[family-name:var(--font-hanken)] text-white font-semibold text-base mb-1">
                  Caçarola Dois
                </p>
                <p className="font-[family-name:var(--font-inter)] text-white/40 text-sm">
                  Figueira da Foz, Portugal
                </p>
              </div>
            </div>
            {/* Grid lines */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(3,105,161,0.5) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(3,105,161,0.5) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            />
            {/* Open maps link */}
            <a
              href="https://maps.google.com/?q=Rua+Bernardo+Lopes+85+Figueira+da+Foz"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 transition-colors duration-200"
            >
              <Navigation size={12} className="text-[#7DD3FC]" />
              <span className="font-[family-name:var(--font-inter)] text-white/60 text-xs">
                Abrir no Maps
              </span>
            </a>
          </motion.div>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Address */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={14} className="text-[#FB923C]" />
                <span className="font-[family-name:var(--font-inter)] text-[#0369A1] text-xs tracking-widest uppercase font-medium">
                  Morada
                </span>
              </div>
              <p className="font-[family-name:var(--font-hanken)] text-[#0C2340] font-semibold text-base leading-snug">
                Rua Bernardo Lopes 85-89
                <br />
                3080-395 Figueira da Foz
              </p>
            </div>

            {/* Hours */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock size={14} className="text-[#FB923C]" />
                <span className="font-[family-name:var(--font-inter)] text-[#0369A1] text-xs tracking-widest uppercase font-medium">
                  Horários
                </span>
              </div>
              <div className="space-y-3">
                {hours.map((h) => (
                  <div key={h.days} className="flex justify-between items-baseline gap-4">
                    <span className="font-[family-name:var(--font-inter)] text-[#475569] text-sm flex-shrink-0">
                      {h.days}
                    </span>
                    <span
                      className={`font-[family-name:var(--font-hanken)] text-sm font-semibold text-right ${
                        h.time === "Encerrado" ? "text-[#94A3B8]" : "text-[#0C2340]"
                      }`}
                    >
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Access */}
            <div>
              <div className="space-y-3">
                {[
                  { icon: Car, text: "Parque de estacionamento a 50m" },
                  { icon: Train, text: "Estação CP a 10 minutos a pé" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0369A1]/10 flex items-center justify-center flex-shrink-0">
                      <item.icon size={14} className="text-[#0369A1]" />
                    </div>
                    <span className="font-[family-name:var(--font-inter)] text-[#475569] text-sm">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
