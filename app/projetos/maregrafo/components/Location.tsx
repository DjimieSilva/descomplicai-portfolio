"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Car, Bus, Bike, ExternalLink } from "lucide-react";

const directions = [
  {
    icon: <Car className="w-5 h-5" />,
    title: "De carro",
    steps: [
      "A partir da A17, saia no nó de Figueira da Foz",
      "Siga para Buarcos pela EN109",
      "Na orla marítima, siga a marginal norte",
      "Estacionamento gratuito junto ao restaurante",
    ],
  },
  {
    icon: <Bus className="w-5 h-5" />,
    title: "Transportes públicos",
    steps: [
      "Autocarro n.º 4 (Figueira da Foz — Buarcos)",
      "Paragem: Largo Maria Jarra, Buarcos",
      "A 2 min a pé do restaurante",
      "Frequência: cada 30 min",
    ],
  },
  {
    icon: <Bike className="w-5 h-5" />,
    title: "A pé ou de bicicleta",
    steps: [
      "A 15 min a pé do centro da Figueira",
      "Percurso pela orla marítima — vista incrível",
      "Parque de bicicletas disponível",
    ],
  },
];

export default function Location() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="localizacao"
      className="py-24 px-6 md:px-12 overflow-hidden"
      style={{ backgroundColor: "#003049" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-5"
            style={{ backgroundColor: "rgba(184,224,210,0.15)", color: "#B8E0D2" }}
          >
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-semibold">Como chegar</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-5"
            style={{ fontFamily: "Lexend, sans-serif" }}
          >
            Encontre-nos em Buarcos
          </h2>
          <p className="text-lg max-w-xl mx-auto leading-relaxed" style={{ color: "rgba(184,224,210,0.7)" }}>
            Estamos na marginal de Buarcos, com estacionamento fácil e vista directa para o Atlântico.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left: map placeholder + address */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Map visual placeholder */}
            <div
              className="rounded-3xl overflow-hidden mb-6 relative"
              style={{ aspectRatio: "4/3", backgroundColor: "#001f30" }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, #001f30 0%, #003049 40%, #004060 70%, #B8E0D2 100%)",
                  opacity: 0.7,
                }}
              />
              {/* Stylized map elements */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap gap-2">
                    {["Buarcos", "Praia", "Foz do Mondego"].map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full"
                        style={{ backgroundColor: "rgba(184,224,210,0.2)", color: "#B8E0D2" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Center pin */}
                <div className="flex justify-center">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center"
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
                      style={{ backgroundColor: "#D4A574" }}
                    >
                      <MapPin className="w-7 h-7 text-white" />
                    </div>
                    <div className="w-0.5 h-6 mt-1" style={{ backgroundColor: "#D4A574" }} />
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: "rgba(212,165,116,0.3)" }}
                    />
                  </motion.div>
                </div>
                <div />
              </div>
            </div>

            {/* Address card */}
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: "rgba(184,224,210,0.08)", border: "1px solid rgba(184,224,210,0.2)" }}
            >
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#B8E0D2" }} />
                <div>
                  <p
                    className="font-bold text-white"
                    style={{ fontFamily: "Lexend, sans-serif" }}
                  >
                    Marégrafo — Restaurante de Marisco
                  </p>
                  <p className="text-sm mt-1" style={{ color: "rgba(184,224,210,0.7)" }}>
                    Largo Maria Jarra 2
                    <br />
                    3080-261 Buarcos, Figueira da Foz
                  </p>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=Buarcos+Figueira+da+Foz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-white"
                style={{ color: "#B8E0D2" }}
              >
                <ExternalLink className="w-4 h-4" />
                Abrir no Google Maps
              </a>
            </div>
          </motion.div>

          {/* Right: directions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-5"
          >
            {directions.map((dir, i) => (
              <motion.div
                key={dir.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
                className="rounded-2xl p-6"
                style={{
                  backgroundColor: "rgba(184,224,210,0.07)",
                  border: "1px solid rgba(184,224,210,0.15)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "rgba(184,224,210,0.15)", color: "#B8E0D2" }}
                  >
                    {dir.icon}
                  </div>
                  <h3
                    className="font-bold text-white"
                    style={{ fontFamily: "Lexend, sans-serif" }}
                  >
                    {dir.title}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {dir.steps.map((step) => (
                    <li key={step} className="flex items-start gap-2 text-sm" style={{ color: "rgba(184,224,210,0.7)" }}>
                      <span
                        className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: "#D4A574" }}
                      />
                      {step}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
