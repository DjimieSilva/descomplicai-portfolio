"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Navigation, Car, Train } from "lucide-react";

export default function Location() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="localizacao"
      className="relative py-24 md:py-32"
      style={{ background: "#292524" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px flex-1 max-w-20" style={{ background: "rgba(234,179,8,0.4)" }} />
            <span
              className="text-xs tracking-[0.4em] uppercase"
              style={{ color: "#EAB308", fontFamily: "var(--font-sora)" }}
            >
              Onde Estamos
            </span>
            <div className="h-px flex-1 max-w-20" style={{ background: "rgba(234,179,8,0.4)" }} />
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "var(--font-sora)", color: "#F5F0E8" }}
          >
            Encontre-nos
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden"
            style={{ aspectRatio: "4/3" }}
          >
            {/* Stylized map */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, #1a1614 0%, #231d1a 50%, #1a1614 100%)",
              }}
            />

            {/* Map grid lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
              {/* Streets */}
              <line x1="0" y1="150" x2="400" y2="150" stroke="rgba(245,240,232,0.08)" strokeWidth="8" />
              <line x1="0" y1="100" x2="400" y2="80" stroke="rgba(245,240,232,0.05)" strokeWidth="4" />
              <line x1="0" y1="200" x2="400" y2="220" stroke="rgba(245,240,232,0.05)" strokeWidth="4" />
              <line x1="200" y1="0" x2="200" y2="300" stroke="rgba(245,240,232,0.08)" strokeWidth="6" />
              <line x1="100" y1="0" x2="80" y2="300" stroke="rgba(245,240,232,0.04)" strokeWidth="3" />
              <line x1="300" y1="0" x2="320" y2="300" stroke="rgba(245,240,232,0.04)" strokeWidth="3" />

              {/* Ocean hint on the right */}
              <rect x="280" y="0" width="120" height="300" fill="rgba(5,150,105,0.06)" />
              <text x="330" y="155" fill="rgba(5,150,105,0.3)" fontSize="10" textAnchor="middle">Atlântico</text>

              {/* Location pin */}
              <circle cx="200" cy="150" r="16" fill="#991B1B" opacity="0.9" />
              <circle cx="200" cy="150" r="6" fill="#EAB308" />
              <circle cx="200" cy="150" r="24" fill="none" stroke="#991B1B" strokeWidth="1.5" opacity="0.4" />
              <circle cx="200" cy="150" r="32" fill="none" stroke="#991B1B" strokeWidth="1" opacity="0.2" />

              {/* Restaurant label */}
              <rect x="140" y="170" width="120" height="28" rx="4" fill="rgba(41,37,36,0.95)" />
              <text x="200" y="186" fill="#F5F0E8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">Mesa dos Amigos</text>
              <text x="200" y="196" fill="rgba(234,179,8,0.8)" fontSize="7" textAnchor="middle">Figueira da Foz</text>
            </svg>

            {/* Overlay */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{ border: "1px solid rgba(245,240,232,0.1)" }}
            />

            {/* Open maps button */}
            <motion.a
              href="https://maps.google.com/?q=Rua+Vasco+da+Gama+64+Figueira+da+Foz"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all hover:scale-105"
              style={{
                background: "#991B1B",
                color: "#F5F0E8",
                fontFamily: "var(--font-sora)",
              }}
            >
              <Navigation size={14} />
              Abrir Maps
            </motion.a>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Address */}
            <div
              className="flex gap-4 p-5 rounded-xl"
              style={{
                background: "rgba(245,240,232,0.04)",
                border: "1px solid rgba(234,179,8,0.2)",
              }}
            >
              <MapPin size={20} className="shrink-0 mt-0.5" style={{ color: "#EAB308" }} />
              <div>
                <h3
                  className="font-semibold mb-1"
                  style={{ color: "#F5F0E8", fontFamily: "var(--font-sora)" }}
                >
                  Endereço
                </h3>
                <p style={{ color: "rgba(245,240,232,0.7)" }}>Rua Vasco da Gama 64</p>
                <p style={{ color: "rgba(245,240,232,0.5)" }} className="text-sm">
                  3080-043 Figueira da Foz · Portugal
                </p>
              </div>
            </div>

            {/* How to get there */}
            <div className="space-y-3">
              <h3
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: "rgba(245,240,232,0.4)", fontFamily: "var(--font-sora)" }}
              >
                Como Chegar
              </h3>

              {[
                {
                  icon: <Car size={18} />,
                  title: "De Carro",
                  desc: "A25 / A14 — Figueira da Foz. Estacionamento disponível nas proximidades.",
                  color: "#EAB308",
                },
                {
                  icon: <Train size={18} />,
                  title: "De Comboio",
                  desc: "Estação de Figueira da Foz — a 10 minutos a pé. Linha de Cascais via Coimbra.",
                  color: "#059669",
                },
                {
                  icon: <Navigation size={18} />,
                  title: "Marcos de Referência",
                  desc: "Junto à praia da Figueira da Foz. Perto do Casino e da Marina.",
                  color: "#EC4899",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-3 items-start p-4 rounded-lg"
                  style={{
                    background: "rgba(245,240,232,0.03)",
                    border: `1px solid ${item.color}15`,
                  }}
                >
                  <div
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: `${item.color}15`, color: item.color }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold mb-0.5"
                      style={{ color: "#F5F0E8", fontFamily: "var(--font-sora)" }}
                    >
                      {item.title}
                    </p>
                    <p className="text-sm" style={{ color: "rgba(245,240,232,0.55)" }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Highlight */}
            <div
              className="p-4 rounded-lg text-center"
              style={{
                background: "linear-gradient(135deg, rgba(153,27,27,0.15), rgba(234,179,8,0.08))",
                border: "1px solid rgba(153,27,27,0.3)",
              }}
            >
              <p className="text-sm" style={{ color: "rgba(245,240,232,0.8)" }}>
                🌊 O único restaurante Thai da costa central de Portugal
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
