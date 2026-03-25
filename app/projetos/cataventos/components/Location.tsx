"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Navigation, Car, Train, ExternalLink } from "lucide-react";

const howToArrive = [
  {
    icon: <Car className="w-5 h-5" />,
    title: "De Carro",
    text: "A 2 minutos do centro da Figueira da Foz. Estacionamento disponível nas imediações.",
  },
  {
    icon: <Train className="w-5 h-5" />,
    title: "De Comboio",
    text: "Estação da Figueira da Foz a 10 minutos a pé. Ligações diretas a partir de Coimbra e Lisboa.",
  },
  {
    icon: <Navigation className="w-5 h-5" />,
    title: "GPS",
    text: "Pesquise \"Cataventos Restaurante, Figueira da Foz\" no Google Maps para navegação precisa.",
  },
];

export default function Location() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="localização" className="py-24 bg-[#1E293B] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F59E0B]/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-[#F59E0B]" />
            <MapPin className="w-5 h-5 text-[#F59E0B]" />
            <div className="h-px w-8 bg-[#F59E0B]" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#FFFDF7] mb-4"
            style={{ fontFamily: "'Work Sans', sans-serif" }}
          >
            Localização
          </h2>
          <p className="text-[#FFFDF7]/60 text-lg max-w-xl mx-auto">
            No coração da Figueira da Foz, junto ao mar que inspira a nossa cozinha.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — map placeholder + address */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {/* Map placeholder */}
            <div className="relative rounded-sm overflow-hidden bg-[#243447] border border-[#FFFDF7]/10 aspect-[4/3] mb-6">
              {/* SVG map-like illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-30">
                  {/* Roads */}
                  <line x1="0" y1="150" x2="400" y2="150" stroke="#FFFDF7" strokeWidth="2" />
                  <line x1="200" y1="0" x2="200" y2="300" stroke="#FFFDF7" strokeWidth="2" />
                  <line x1="0" y1="80" x2="400" y2="80" stroke="#FFFDF7" strokeWidth="1" strokeDasharray="5 5" />
                  <line x1="0" y1="220" x2="400" y2="220" stroke="#FFFDF7" strokeWidth="1" strokeDasharray="5 5" />
                  <line x1="100" y1="0" x2="100" y2="300" stroke="#FFFDF7" strokeWidth="1" strokeDasharray="5 5" />
                  <line x1="300" y1="0" x2="300" y2="300" stroke="#FFFDF7" strokeWidth="1" strokeDasharray="5 5" />
                  {/* Blocks */}
                  <rect x="110" y="90" width="80" height="50" fill="#FFFDF7" fillOpacity="0.05" />
                  <rect x="210" y="90" width="80" height="50" fill="#FFFDF7" fillOpacity="0.05" />
                  <rect x="110" y="160" width="80" height="50" fill="#FFFDF7" fillOpacity="0.05" />
                  <rect x="210" y="160" width="80" height="50" fill="#FFFDF7" fillOpacity="0.05" />
                  {/* River/sea */}
                  <path d="M350 0 Q380 50 360 100 Q340 150 370 200 Q390 250 380 300 L400 300 L400 0 Z" fill="#F59E0B" fillOpacity="0.15" />
                </svg>

                {/* Pin */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#F59E0B] flex items-center justify-center shadow-lg shadow-[#F59E0B]/40">
                    <MapPin className="w-5 h-5 text-[#1E293B]" />
                  </div>
                  <div className="mt-2 bg-[#1E293B] border border-[#F59E0B]/40 px-3 py-1.5 rounded-sm text-xs text-[#FFFDF7] font-medium whitespace-nowrap">
                    Cataventos
                  </div>
                </div>
              </div>

              {/* Open maps button */}
              <a
                href="https://maps.google.com/?q=Cataventos+Restaurante+Figueira+da+Foz"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 flex items-center gap-2 bg-[#F59E0B] hover:bg-[#B45309] text-[#1E293B] text-xs font-semibold px-3 py-2 rounded-sm transition-all"
              >
                <ExternalLink className="w-3 h-3" />
                Abrir no Maps
              </a>
            </div>

            {/* Address card */}
            <div className="border border-[#FFFDF7]/10 rounded-sm p-6 bg-[#FFFDF7]/3">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B] flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[#F59E0B] text-xs font-semibold tracking-widest uppercase mb-1">
                    Morada
                  </div>
                  <div className="text-[#FFFDF7] font-semibold text-base">Restaurante Cataventos</div>
                  <div className="text-[#FFFDF7]/60 text-sm mt-1">Figueira da Foz, Portugal</div>
                  <div className="text-[#FFFDF7]/40 text-sm">3080 – Figueira da Foz</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — how to arrive */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h3
                className="text-xl font-bold text-[#FFFDF7] mb-6"
                style={{ fontFamily: "'Work Sans', sans-serif" }}
              >
                Como Chegar
              </h3>
              <div className="space-y-5">
                {howToArrive.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="flex gap-5 items-start p-5 border border-[#FFFDF7]/8 rounded-sm hover:border-[#F59E0B]/30 bg-[#FFFDF7]/3 hover:bg-[#F59E0B]/5 transition-all"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-sm bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex items-center justify-center text-[#F59E0B]">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#FFFDF7] mb-1">{item.title}</h4>
                      <p className="text-[#FFFDF7]/55 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Nearby landmarks */}
            <div className="border border-[#F59E0B]/20 rounded-sm p-6 bg-[#F59E0B]/5">
              <div className="text-[#F59E0B] text-xs font-semibold tracking-widest uppercase mb-3">
                Próximo de
              </div>
              <div className="space-y-2">
                {[
                  { place: "Praia da Figueira da Foz", distance: "5 min a pé" },
                  { place: "Casino da Figueira", distance: "8 min a pé" },
                  { place: "Museu Municipal Dr. Santos Rocha", distance: "10 min a pé" },
                  { place: "Marina da Figueira", distance: "12 min a pé" },
                ].map((nearby) => (
                  <div key={nearby.place} className="flex justify-between items-center">
                    <span className="text-[#FFFDF7]/70 text-sm">{nearby.place}</span>
                    <span className="text-[#F59E0B]/70 text-xs">{nearby.distance}</span>
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
