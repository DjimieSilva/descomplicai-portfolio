"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, Phone } from "lucide-react";

const locations = [
  {
    name: "Caçarola",
    subtitle: "O Restaurante Original",
    address: "Rua da Tradição, 12\nFigueira da Foz, 3080",
    phone: "+351 233 000 001",
    hours: [
      { days: "Terça a Sexta", time: "12h00 – 15h00 · 19h00 – 22h30" },
      { days: "Sábado", time: "12h00 – 15h30 · 19h00 – 23h00" },
      { days: "Domingo", time: "12h00 – 15h30" },
      { days: "Segunda-feira", time: "Encerrado" },
    ],
    features: ["Sala principal", "Terraço", "Estacionamento próximo", "Acessível a mobilidade reduzida"],
    highlight: "Casa-mãe — o espaço onde tudo começou",
    color: "#C2410C",
  },
  {
    name: "Caçarola Dois",
    subtitle: "O Restaurante Irmão",
    address: "Rua do Sabor, 45\nFigueira da Foz, 3080",
    phone: "+351 233 000 002",
    hours: [
      { days: "Terça a Sexta", time: "12h00 – 15h00 · 19h00 – 22h30" },
      { days: "Sábado", time: "12h00 – 16h00 · 19h00 – 23h00" },
      { days: "Domingo", time: "12h00 – 16h00" },
      { days: "Segunda-feira", time: "Encerrado" },
    ],
    features: ["Sala ampla para grupos", "Eventos e celebrações", "Espaço infantil", "Reservas privadas"],
    highlight: "Ideal para famílias, grupos e celebrações",
    color: "#4D7C0F",
  },
];

export default function Locations() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="localizacao"
      className="py-24 px-6"
      style={{ background: "#FEF3C7" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p
            className="text-xs tracking-[0.45em] uppercase mb-4"
            style={{ color: "#C2410C", fontFamily: "var(--font-inter)" }}
          >
            Onde Estamos
          </p>
          <h2
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: "var(--font-source-serif-4)", color: "#7C2D12" }}
          >
            Dois Espaços em
            <br />
            <em>Figueira da Foz</em>
          </h2>
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: "#78350F", fontFamily: "var(--font-inter)" }}
          >
            Seja no Caçarola original ou no Caçarola Dois — a cozinha é a mesma,
            o carinho é o mesmo, o sabor é o mesmo.
          </p>
        </motion.div>

        {/* Location cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {locations.map((location, i) => {
            const cardRef = useRef(null);
            const cardInView = useInView(cardRef, { once: true, margin: "-60px" });
            return (
              <motion.div
                key={location.name}
                ref={cardRef}
                initial={{ opacity: 0, y: 30 }}
                animate={cardInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="overflow-hidden"
                style={{
                  background: "#FFFBEB",
                  border: `1.5px solid rgba(194,65,12,0.2)`,
                }}
              >
                {/* Top accent */}
                <div
                  className="h-1.5"
                  style={{ background: `linear-gradient(90deg, ${location.color}, ${location.color}AA)` }}
                />

                <div className="p-8">
                  {/* Highlight badge */}
                  <p
                    className="text-xs tracking-wider uppercase font-semibold mb-4 italic"
                    style={{ color: location.color, fontFamily: "var(--font-inter)" }}
                  >
                    {location.highlight}
                  </p>

                  <h3
                    className="text-3xl font-bold mb-1"
                    style={{ fontFamily: "var(--font-source-serif-4)", color: "#7C2D12" }}
                  >
                    {location.name}
                  </h3>
                  <p
                    className="text-sm mb-6"
                    style={{ color: "#92400E", fontFamily: "var(--font-inter)" }}
                  >
                    {location.subtitle}
                  </p>

                  {/* Address & phone */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="flex-shrink-0 mt-0.5" style={{ color: location.color }} />
                      <p
                        className="text-sm whitespace-pre-line"
                        style={{ color: "#78350F", fontFamily: "var(--font-inter)" }}
                      >
                        {location.address}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={16} className="flex-shrink-0" style={{ color: location.color }} />
                      <a
                        href={`tel:${location.phone.replace(/\s/g, "")}`}
                        className="text-sm hover:underline"
                        style={{ color: "#78350F", fontFamily: "var(--font-inter)" }}
                      >
                        {location.phone}
                      </a>
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    className="h-px mb-6"
                    style={{ background: "rgba(194,65,12,0.15)" }}
                  />

                  {/* Hours */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock size={14} style={{ color: location.color }} />
                      <h4
                        className="text-xs tracking-[0.3em] uppercase font-semibold"
                        style={{ color: location.color, fontFamily: "var(--font-inter)" }}
                      >
                        Horário
                      </h4>
                    </div>
                    <div className="space-y-1.5">
                      {location.hours.map((h) => (
                        <div key={h.days} className="flex justify-between gap-4">
                          <span
                            className="text-xs font-medium"
                            style={{ color: "#92400E", fontFamily: "var(--font-inter)" }}
                          >
                            {h.days}
                          </span>
                          <span
                            className="text-xs"
                            style={{
                              color: h.time === "Encerrado" ? "#C2410C" : "#78350F",
                              fontFamily: "var(--font-inter)",
                              fontStyle: h.time === "Encerrado" ? "italic" : "normal",
                            }}
                          >
                            {h.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {location.features.map((feat) => (
                      <span
                        key={feat}
                        className="text-xs px-3 py-1"
                        style={{
                          background: `${location.color}12`,
                          color: location.color,
                          border: `1px solid ${location.color}30`,
                          fontFamily: "var(--font-inter)",
                        }}
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Map placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 h-48 flex items-center justify-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)",
            border: "1.5px solid rgba(194,65,12,0.2)",
          }}
        >
          {/* Grid pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 600 200">
            <defs>
              <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C2410C" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Map pin icons */}
            <circle cx="220" cy="100" r="12" fill="#C2410C" opacity="0.7" />
            <circle cx="380" cy="100" r="12" fill="#4D7C0F" opacity="0.7" />
            <path d="M220 85 L220 115" stroke="white" strokeWidth="1.5" />
            <path d="M380 85 L380 115" stroke="white" strokeWidth="1.5" />
          </svg>
          <div className="relative text-center">
            <MapPin size={28} className="mx-auto mb-2" style={{ color: "#C2410C" }} />
            <p
              className="text-sm font-medium"
              style={{ color: "#7C2D12", fontFamily: "var(--font-inter)" }}
            >
              Figueira da Foz, Portugal
            </p>
            <p
              className="text-xs mt-1"
              style={{ color: "#92400E", fontFamily: "var(--font-inter)" }}
            >
              Dois espaços na cidade — ambos de fácil acesso
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
