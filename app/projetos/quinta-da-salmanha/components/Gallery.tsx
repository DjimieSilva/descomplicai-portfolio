"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

type GalleryCell = {
  label: string;
  gradient: string;
  span?: string;
  pattern?: string;
};

const cells: GalleryCell[] = [
  {
    label: "Salão Nobre",
    gradient: "linear-gradient(135deg, #3D2B1F 0%, #722F37 60%, #4A1520 100%)",
    span: "col-span-2 row-span-2",
    pattern: "stone",
  },
  {
    label: "Jardins da Quinta",
    gradient: "linear-gradient(160deg, #2D3A1E 0%, #556B2F 50%, #3A5020 100%)",
    pattern: "leaves",
  },
  {
    label: "Vista para o Rio",
    gradient: "linear-gradient(180deg, #1A2E4A 0%, #4A7A9B 40%, #2C4E7A 100%)",
    pattern: "water",
  },
  {
    label: "Mesa de Buffet",
    gradient: "linear-gradient(135deg, #5C4A3A 0%, #8B6914 50%, #C4A55A 100%)",
    pattern: "wood",
  },
  {
    label: "Terraço Exterior",
    gradient: "linear-gradient(160deg, #2D3A1E 0%, #4A5E2A 40%, #6B8E23 100%)",
  },
  {
    label: "Adega da Quinta",
    gradient: "linear-gradient(135deg, #2C1810 0%, #722F37 50%, #3D1A20 100%)",
    pattern: "barrels",
  },
  {
    label: "Casamento na Quinta",
    gradient: "linear-gradient(160deg, #722F37 0%, #9B3F4A 40%, #FEFCE8 100%)",
    span: "col-span-2",
    pattern: "floral",
  },
];

function PatternOverlay({ type }: { type?: string }) {
  if (!type) return null;
  return (
    <div className="absolute inset-0 opacity-[0.12]">
      <svg viewBox="0 0 200 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        {type === "stone" && (
          <g stroke="#FEFCE8" strokeWidth="0.5" fill="none">
            {Array.from({ length: 8 }).map((_, i) =>
              Array.from({ length: 6 }).map((_, j) => (
                <rect
                  key={`${i}-${j}`}
                  x={i * 26 + (j % 2 === 0 ? 0 : 13)}
                  y={j * 20}
                  width="24"
                  height="18"
                  rx="1"
                />
              ))
            )}
          </g>
        )}
        {type === "leaves" && (
          <g>
            {Array.from({ length: 10 }).map((_, i) => (
              <ellipse
                key={i}
                cx={(i % 4) * 50 + 25}
                cy={Math.floor(i / 4) * 70 + 35}
                rx="18"
                ry="28"
                fill="none"
                stroke="#FEFCE8"
                strokeWidth="0.8"
                transform={`rotate(${i * 36} ${(i % 4) * 50 + 25} ${Math.floor(i / 4) * 70 + 35})`}
              />
            ))}
          </g>
        )}
        {type === "water" && (
          <g>
            {Array.from({ length: 12 }).map((_, i) => (
              <ellipse key={i} cx="100" cy={i * 17 + 8} rx={60 + i * 3} ry="6" fill="none" stroke="#FEFCE8" strokeWidth="0.8" />
            ))}
          </g>
        )}
        {type === "wood" && (
          <g>
            {Array.from({ length: 20 }).map((_, i) => (
              <path key={i} d={`M0 ${i * 10} Q50 ${i * 10 + 3} 100 ${i * 10} Q150 ${i * 10 - 3} 200 ${i * 10}`} fill="none" stroke="#FEFCE8" strokeWidth="0.6" />
            ))}
          </g>
        )}
        {type === "floral" && (
          <g>
            {Array.from({ length: 6 }).map((_, i) =>
              Array.from({ length: 4 }).map((_, j) => (
                <circle
                  key={`${i}-${j}`}
                  cx={i * 40 + 20}
                  cy={j * 55 + 28}
                  r={12}
                  fill="none"
                  stroke="#FEFCE8"
                  strokeWidth="0.7"
                />
              ))
            )}
          </g>
        )}
      </svg>
    </div>
  );
}

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="galeria"
      className="py-24 md:py-36 relative overflow-hidden"
      style={{ background: "#3D2B1F" }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-14"
        >
          <p
            className="text-xs tracking-[0.45em] uppercase mb-4"
            style={{ color: "#C4A55A", fontFamily: "var(--font-inter)" }}
          >
            Galeria
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-libre-caslon)", color: "#FEFCE8" }}
          >
            A Quinta em Imagens
          </h2>
          <div className="w-16 h-[2px] mx-auto" style={{ background: "#722F37" }} />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-3 gap-3 md:gap-4 auto-rows-[160px] md:auto-rows-[200px]">
          {cells.map((cell, i) => (
            <motion.div
              key={cell.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`relative rounded-sm overflow-hidden group cursor-pointer ${cell.span || ""}`}
              style={{ background: cell.gradient }}
            >
              <PatternOverlay type={cell.pattern} />

              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: "rgba(0,0,0,0.35)" }}
              />

              {/* Label */}
              <div className="absolute inset-0 flex items-end p-4">
                <motion.p
                  className="text-sm tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0"
                  style={{ color: "#FEFCE8", fontFamily: "var(--font-inter)", fontWeight: 300 }}
                >
                  {cell.label}
                </motion.p>
              </div>

              {/* Bottom gold line on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"
                style={{ background: "#C4A55A" }}
              />
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-8 text-sm"
          style={{ color: "rgba(168,162,158,0.6)", fontFamily: "var(--font-inter)", fontStyle: "italic" }}
        >
          Passe o rato sobre as imagens para descobrir cada espaço da Quinta.
        </motion.p>
      </div>
    </section>
  );
}
