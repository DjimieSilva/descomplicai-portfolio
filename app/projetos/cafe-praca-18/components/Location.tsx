"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone, Mail, Navigation } from "lucide-react";

const details = [
  {
    icon: MapPin,
    label: "Morada",
    value: "Praça General Freire de Andrade 18",
    sub: "3080-058 Figueira da Foz",
  },
  {
    icon: Phone,
    label: "Telefone",
    value: "+351 914 418 757",
    sub: "Chamada nacional",
  },
  {
    icon: Mail,
    label: "Email",
    value: "geral@cafepraca18.pt",
    sub: "Resposta em 24 horas",
  },
  {
    icon: Navigation,
    label: "Como Chegar",
    value: "Centro histórico",
    sub: "Parque de estacionamento a 200m",
  },
];

export default function Location() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="location"
      className="py-24 md:py-32 px-6"
      style={{ backgroundColor: "#FFF8F0" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div
            className="inline-flex items-center gap-3 mb-6"
            style={{ color: "#B5A642" }}
          >
            <div className="w-8 h-px" style={{ backgroundColor: "#B5A642" }} />
            <span className="text-xs font-semibold tracking-widest uppercase">
              Localização
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{
              fontFamily: "var(--font-domine), serif",
              color: "#3C1518",
            }}
          >
            Encontre-nos
            <br />
            <span style={{ color: "#B5A642" }}>na Praça</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-sm"
            style={{ minHeight: "400px", backgroundColor: "#3C1518" }}
          >
            {/* Stylized map representation */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="w-full h-full relative">
                {/* Street grid */}
                <svg
                  viewBox="0 0 400 300"
                  className="w-full h-full opacity-30"
                  style={{ color: "#B5A642" }}
                >
                  {/* Streets */}
                  <line x1="0" y1="150" x2="400" y2="150" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                  <line x1="200" y1="0" x2="200" y2="300" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                  <line x1="0" y1="80" x2="400" y2="80" stroke="currentColor" strokeWidth="4" strokeOpacity="0.5" strokeLinecap="round" />
                  <line x1="0" y1="220" x2="400" y2="220" stroke="currentColor" strokeWidth="4" strokeOpacity="0.5" strokeLinecap="round" />
                  <line x1="100" y1="0" x2="100" y2="300" stroke="currentColor" strokeWidth="4" strokeOpacity="0.5" strokeLinecap="round" />
                  <line x1="300" y1="0" x2="300" y2="300" stroke="currentColor" strokeWidth="4" strokeOpacity="0.5" strokeLinecap="round" />
                  {/* Praça square */}
                  <rect x="130" y="110" width="140" height="80" fill="rgba(181,166,66,0.15)" stroke="#B5A642" strokeWidth="2" rx="2" />
                  {/* Pin */}
                  <circle cx="200" cy="150" r="12" fill="#B5A642" />
                  <circle cx="200" cy="150" r="6" fill="#3C1518" />
                </svg>

                {/* Overlay label */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin
                      className="w-10 h-10 mx-auto mb-3"
                      style={{ color: "#B5A642" }}
                    />
                    <div
                      className="text-base font-bold mb-1"
                      style={{
                        fontFamily: "var(--font-domine), serif",
                        color: "#E8D5B7",
                      }}
                    >
                      Café Praça 18
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: "rgba(232,213,183,0.6)" }}
                    >
                      Praça General Freire de Andrade 18 · Figueira da Foz
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Open in Maps CTA */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <a
                href="https://maps.google.com/?q=Praça+General+Freire+de+Andrade+18+Figueira+da+Foz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold tracking-wide transition-all duration-300 hover:brightness-110"
                style={{
                  backgroundColor: "#B5A642",
                  color: "#3C1518",
                  borderRadius: "2px",
                }}
              >
                <Navigation className="w-4 h-4" />
                Abrir no Google Maps
              </a>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {details.map((detail, index) => {
              const Icon = detail.icon;
              return (
                <motion.div
                  key={detail.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-5 p-5 rounded-sm"
                  style={{
                    backgroundColor: "rgba(232,213,183,0.4)",
                    border: "1px solid rgba(60,21,24,0.08)",
                  }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-sm flex-shrink-0"
                    style={{ backgroundColor: "rgba(181,166,66,0.15)" }}
                  >
                    <Icon className="w-4 h-4" style={{ color: "#B5A642" }} />
                  </div>
                  <div>
                    <div
                      className="text-xs font-semibold tracking-widest uppercase mb-1"
                      style={{ color: "#B5A642" }}
                    >
                      {detail.label}
                    </div>
                    <div
                      className="font-semibold mb-0.5"
                      style={{ color: "#3C1518" }}
                    >
                      {detail.value}
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: "rgba(60,21,24,0.5)" }}
                    >
                      {detail.sub}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="p-6 rounded-sm"
              style={{
                backgroundColor: "#3C1518",
              }}
            >
              <p
                className="text-sm font-semibold mb-3"
                style={{
                  fontFamily: "var(--font-domine), serif",
                  color: "#B5A642",
                }}
              >
                A dois passos de tudo
              </p>
              <ul className="space-y-2">
                {[
                  "Centro histórico da Figueira da Foz",
                  "A 5 minutos da praia a pé",
                  "Próximo do Casino da Figueira",
                  "Acessível a pé do centro",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm"
                    style={{ color: "rgba(232,213,183,0.7)" }}
                  >
                    <div
                      className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: "#B5A642" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
