"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, Car, Phone } from "lucide-react";

const info = [
  {
    icon: MapPin,
    label: "Morada",
    value: "Estrada da Murtinheira, s/n",
    sub: "3080-515 Murtinheira, Figueira da Foz",
  },
  {
    icon: Clock,
    label: "Horário",
    value: "Terça a Domingo",
    sub: "19h00 — 23h00 · Almoço Sáb & Dom 12h30 — 15h00",
  },
  {
    icon: Car,
    label: "Como Chegar",
    value: "A17 — Saída Figueira da Foz Norte",
    sub: "Seguir para Murtinheira · 8 min do centro da cidade",
  },
  {
    icon: Phone,
    label: "Contacto",
    value: "+351 233 000 000",
    sub: "reservas@sandmurtinheira.pt",
  },
];

export default function Location() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="localizacao" className="bg-[#1C1917] py-24 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">

          {/* Left */}
          <div className="md:col-span-5">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="text-[#92702B]/60 text-xs tracking-[0.4em] uppercase font-['Libre_Franklin'] mb-5"
            >
              Localização
            </motion.p>
            <div className="overflow-hidden mb-6">
              <motion.h2
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="font-['Playfair_Display'] text-[#FAF9F6] text-4xl md:text-5xl font-light leading-tight"
              >
                Um lugar<br />à beira do mar
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-[#D4C5A9]/60 text-base leading-relaxed font-['Libre_Franklin'] font-light"
            >
              Murtinheira é uma pequena aldeia piscatória encostada à Mata Nacional do Urso, numa das zonas mais preservadas da costa portuguesa. O SAND está aqui, no fim da estrada, com o Atlântico como único vizinho.
            </motion.p>

            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.45 }}
              className="mt-8 aspect-[4/3] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#2d3a2e] via-[#1e2a1f] to-[#0f1510]" />
              {/* Simulated map grid */}
              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: "linear-gradient(#D4C5A9 1px, transparent 1px), linear-gradient(90deg, #D4C5A9 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              {/* Pin */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-[#92702B] ring-4 ring-[#92702B]/30" />
                  <div className="w-px h-6 bg-[#92702B]/60 mt-0.5" />
                </div>
              </div>
              {/* Label */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-[#1C1917]/80 backdrop-blur-sm border border-[#FAF9F6]/10 px-4 py-2.5 inline-flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#92702B]" />
                  <span className="text-[#FAF9F6] text-xs font-['Libre_Franklin'] tracking-[0.1em]">SAND Murtinheira</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — info cards */}
          <div className="md:col-span-7 space-y-6">
            {info.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-5 py-6 border-b border-[#FAF9F6]/8"
                >
                  <div className="w-10 h-10 border border-[#92702B]/30 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[#92702B]" />
                  </div>
                  <div>
                    <p className="text-[#D4C5A9]/40 text-xs tracking-[0.25em] uppercase font-['Libre_Franklin'] mb-1">{item.label}</p>
                    <p className="text-[#FAF9F6] text-base font-['Libre_Franklin'] font-light">{item.value}</p>
                    <p className="text-[#D4C5A9]/50 text-sm font-['Libre_Franklin'] font-light mt-0.5">{item.sub}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
