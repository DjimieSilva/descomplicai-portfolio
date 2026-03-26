"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone, Clock, Car, Bus } from "lucide-react";

const locations = [
  {
    name: "Dentalkid Buarcos",
    address: "Rua Joaquim Sotto Mayor 120\nLoja 11/2, 3080-300\nFigueira da Foz",
    phone: "+351 233 429 538",
    hours: [
      { day: "Segunda–Sexta", time: "9h00–19h00" },
      { day: "Sábado", time: "9h00–13h00" },
      { day: "Domingo", time: "Encerrado" },
    ],
    parking: "Estacionamento gratuito junto à clínica",
    transport: "Paragem de autocarro a 50 metros",
    emoji: "🏖️",
    color: "#7C3AED",
    bg: "from-purple-500 to-violet-600",
    lightBg: "#F5F3FF",
    mapEmbedUrl: "https://www.google.com/maps?q=Buarcos,Figueira+da+Foz&output=embed",
    whatsapp: "351233429538",
    features: ["Sala de espera infantil", "Zona de brincar", "Ecrã de entretenimento"],
  },
  {
    name: "Dentalkid Tavarede",
    address: "Rua Joaquim Sotto Mayor 120\nLoja 11/2, 3080-300\nFigueira da Foz",
    phone: "+351 233 429 538",
    hours: [
      { day: "Segunda–Sexta", time: "9h00–19h00" },
      { day: "Sábado", time: "9h00–13h00" },
      { day: "Domingo", time: "Encerrado" },
    ],
    parking: "Estacionamento público gratuito em frente",
    transport: "Ligação fácil à Figueira da Foz",
    emoji: "🌿",
    color: "#38BDF8",
    bg: "from-sky-400 to-blue-500",
    lightBg: "#F0F9FF",
    mapEmbedUrl: "https://www.google.com/maps?q=Tavarede,Figueira+da+Foz&output=embed",
    whatsapp: "351233429538",
    features: ["Tecnologia de ponta", "Raio-X digital", "Sala dedicada à ortodontia"],
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.93 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 240, damping: 22 },
  },
};

export default function Locations() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="py-24 bg-gradient-to-b from-gray-50 to-white"
      id="localizacoes"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            📍 As Nossas Clínicas
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black text-purple-900 mb-6"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Perto de si{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              em Figueira da Foz
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Duas clínicas para melhor servir as famílias de toda a região.
            Escolhe a que fica mais perto de ti!
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-8"
        >
          {locations.map((loc) => (
            <motion.div
              key={loc.name}
              variants={cardVariants}
              className="rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Header */}
              <div
                className={`bg-gradient-to-r ${loc.bg} p-6 text-white`}
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-3xl">{loc.emoji}</span>
                  <h3
                    className="text-2xl font-black"
                    style={{ fontFamily: "'Nunito', sans-serif" }}
                  >
                    {loc.name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {loc.features.map((f) => (
                    <span
                      key={f}
                      className="text-xs bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full font-medium"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Body */}
              <div className="p-6" style={{ backgroundColor: loc.lightBg }}>
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Address */}
                  <div>
                    <div className="flex items-start gap-3 mb-4">
                      <MapPin
                        className="w-5 h-5 mt-0.5 shrink-0"
                        style={{ color: loc.color }}
                      />
                      <div>
                        <p className="font-bold text-gray-900 text-sm mb-1">Morada</p>
                        <p className="text-gray-600 text-sm whitespace-pre-line leading-relaxed">
                          {loc.address}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 mb-4">
                      <Phone
                        className="w-5 h-5 mt-0.5 shrink-0"
                        style={{ color: loc.color }}
                      />
                      <div>
                        <p className="font-bold text-gray-900 text-sm mb-1">Telefone</p>
                        <a
                          href={`tel:${loc.phone.replace(/\s/g, "")}`}
                          className="text-sm font-semibold hover:underline"
                          style={{ color: loc.color }}
                        >
                          {loc.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 mb-4">
                      <Car
                        className="w-5 h-5 mt-0.5 shrink-0"
                        style={{ color: loc.color }}
                      />
                      <p className="text-gray-600 text-sm">{loc.parking}</p>
                    </div>

                    <div className="flex items-start gap-3">
                      <Bus
                        className="w-5 h-5 mt-0.5 shrink-0"
                        style={{ color: loc.color }}
                      />
                      <p className="text-gray-600 text-sm">{loc.transport}</p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-5 h-5" style={{ color: loc.color }} />
                      <p className="font-bold text-gray-900 text-sm">Horário</p>
                    </div>
                    <div className="space-y-2">
                      {loc.hours.map((h) => (
                        <div
                          key={h.day}
                          className="flex justify-between items-center text-sm"
                        >
                          <span className="text-gray-600">{h.day}</span>
                          <span
                            className="font-bold px-2 py-0.5 rounded-lg text-xs"
                            style={{
                              backgroundColor:
                                h.time === "Encerrado"
                                  ? "#FEE2E2"
                                  : loc.color + "22",
                              color:
                                h.time === "Encerrado" ? "#DC2626" : loc.color,
                            }}
                          >
                            {h.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-gray-200">
                  <a
                    href={`tel:${loc.phone.replace(/\s/g, "")}`}
                    className="flex-1 flex items-center justify-center gap-2 text-white font-black py-3 px-6 rounded-2xl text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{ backgroundColor: loc.color }}
                  >
                    <Phone className="w-4 h-4" />
                    Ligar para marcar
                  </a>
                  <a
                    href={`https://wa.me/${loc.whatsapp}?text=Olá!%20Gostaria%20de%20marcar%20uma%20consulta.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-black py-3 px-6 rounded-2xl text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    <span className="text-base">💬</span>
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
