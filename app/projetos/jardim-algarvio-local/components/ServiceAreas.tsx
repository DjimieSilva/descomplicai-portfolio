"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin } from "lucide-react";

interface City {
  name: string;
  x: number;
  y: number;
  primary?: boolean;
}

const cities: City[] = [
  { name: "Lagos", x: 60, y: 130, primary: false },
  { name: "Portimão", x: 120, y: 145 },
  { name: "Silves", x: 165, y: 110 },
  { name: "Albufeira", x: 220, y: 150, primary: true },
  { name: "Vilamoura", x: 270, y: 140 },
  { name: "Quarteira", x: 275, y: 165 },
  { name: "Loulé", x: 295, y: 110, primary: true },
  { name: "Faro", x: 350, y: 135, primary: true },
  { name: "Olhão", x: 390, y: 145 },
  { name: "Tavira", x: 440, y: 130 },
];

export default function ServiceAreas() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="areas" className="py-20 sm:py-24" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold"
            style={{ backgroundColor: "#DCFCE7", color: "#15803D" }}
          >
            <MapPin className="h-4 w-4" />
            Áreas de Serviço
          </span>
          <h2
            className="mt-4 text-3xl font-bold sm:text-4xl"
            style={{ fontFamily: "var(--font-jakarta), sans-serif", color: "#1F2937" }}
          >
            Servimos Todo o Algarve
          </h2>
          <p className="mt-3 text-base max-w-2xl mx-auto" style={{ color: "#6B7280" }}>
            De Lagos a Vila Real de Santo António, as nossas equipas estão distribuídas por toda a região.
          </p>
        </div>

        {/* Map */}
        <motion.div
          ref={ref}
          className="mx-auto max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-2xl border p-6 sm:p-8" style={{ backgroundColor: "#F8FAF7", borderColor: "#E5E7EB" }}>
            <svg
              viewBox="0 0 520 220"
              className="w-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Simplified Algarve coastline */}
              <path
                d="M20,100 C40,85 60,80 90,75 C120,70 150,65 180,68 C210,71 240,78 270,82 C300,86 330,80 360,78 C390,76 420,80 450,85 C470,88 490,95 500,100 L500,170 C480,175 450,178 420,180 C390,182 360,180 330,178 C300,176 270,180 240,182 C210,184 180,180 150,178 C120,176 90,180 60,182 C40,183 25,180 20,175 Z"
                fill="#DCFCE7"
                stroke="#16A34A"
                strokeWidth="1.5"
                opacity="0.8"
              />
              {/* Coastline accent */}
              <path
                d="M20,100 C40,85 60,80 90,75 C120,70 150,65 180,68 C210,71 240,78 270,82 C300,86 330,80 360,78 C390,76 420,80 450,85 C470,88 490,95 500,100"
                fill="none"
                stroke="#16A34A"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* City dots and labels */}
              {cities.map((c, i) => (
                <g key={c.name}>
                  <motion.circle
                    cx={c.x}
                    cy={c.y}
                    r={c.primary ? 7 : 5}
                    fill={c.primary ? "#16A34A" : "#22C55E"}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.06, type: "spring", stiffness: 300 }}
                  />
                  <text
                    x={c.x}
                    y={c.y - (c.primary ? 14 : 12)}
                    textAnchor="middle"
                    fill="#1F2937"
                    fontSize={c.primary ? "11" : "9.5"}
                    fontWeight={c.primary ? "700" : "500"}
                    fontFamily="var(--font-inter), sans-serif"
                  >
                    {c.name}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <p className="mt-6 text-center text-sm" style={{ color: "#6B7280" }}>
            Não encontra a sua zona?{" "}
            <a href="#contacto" className="font-semibold underline" style={{ color: "#16A34A" }}>
              Contacte-nos
            </a>{" "}
            — provavelmente também servimos a sua área!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
