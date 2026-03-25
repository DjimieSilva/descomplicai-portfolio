"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Camera } from "lucide-react";

// Decorative gradient cards simulating food photography
const galleryItems = [
  {
    gradient: "linear-gradient(135deg, #8B4513 0%, #D4A574 50%, #F5DEB3 100%)",
    label: "Caldeirada à Pescador",
    size: "tall",
  },
  {
    gradient: "linear-gradient(135deg, #003049 0%, #006080 50%, #B8E0D2 100%)",
    label: "Vista Atlântico",
    size: "normal",
  },
  {
    gradient: "linear-gradient(135deg, #CC4400 0%, #FF6B35 50%, #FFD700 100%)",
    label: "Camarão Tigre",
    size: "normal",
  },
  {
    gradient: "linear-gradient(135deg, #1a4a3a 0%, #2d7a5f 50%, #B8E0D2 100%)",
    label: "Amêijoas Bulhão Pato",
    size: "wide",
  },
  {
    gradient: "linear-gradient(135deg, #4a3728 0%, #8B6914 50%, #D4A574 100%)",
    label: "Polvo à Lagareiro",
    size: "normal",
  },
  {
    gradient: "linear-gradient(135deg, #001f30 0%, #003049 40%, #0066aa 100%)",
    label: "Pôr do Sol no Marégrafo",
    size: "tall",
  },
  {
    gradient: "linear-gradient(135deg, #6B3FA0 0%, #9B6FCF 50%, #D4A574 100%)",
    label: "Arroz de Marisco",
    size: "normal",
  },
  {
    gradient: "linear-gradient(135deg, #2D5016 0%, #4A7C1F 50%, #B8E0D2 100%)",
    label: "Terraço de Verão",
    size: "normal",
  },
];

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="galeria"
      className="py-24 px-6 md:px-12 overflow-hidden"
      style={{ backgroundColor: "#F8F9FA" }}
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
            style={{ backgroundColor: "#B8E0D2", color: "#003049" }}
          >
            <Camera className="w-4 h-4" />
            <span className="text-sm font-semibold">Galeria</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-5"
            style={{ fontFamily: "Lexend, sans-serif", color: "#003049" }}
          >
            Sabores e momentos
          </h2>
          <p className="text-lg max-w-xl mx-auto leading-relaxed" style={{ color: "#4a6070" }}>
            Uma refeição no Marégrafo é mais do que comer — é uma experiência completa com todos os sentidos.
          </p>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {galleryItems.map((item, i) => {
            const isWide = item.size === "wide";
            const isTall = item.size === "tall";

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className={`relative rounded-2xl overflow-hidden group cursor-pointer
                  ${isWide ? "col-span-2" : "col-span-1"}
                  ${isTall ? "row-span-2" : "row-span-1"}
                `}
                style={{
                  aspectRatio: isTall ? "3/4" : isWide ? "16/7" : "1/1",
                  background: item.gradient,
                }}
              >
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                  style={{ background: "linear-gradient(to top, rgba(0,48,73,0.85), transparent)" }}
                >
                  <p
                    className="text-white font-semibold text-sm"
                    style={{ fontFamily: "Lexend, sans-serif" }}
                  >
                    {item.label}
                  </p>
                </div>

                {/* Decorative wave overlay */}
                <div className="absolute bottom-0 left-0 right-0 opacity-30">
                  <svg viewBox="0 0 200 30" preserveAspectRatio="none" style={{ height: "30px", width: "100%" }}>
                    <path
                      fill="rgba(184,224,210,0.4)"
                      d="M0,15 C50,5 100,25 150,15 C175,10 190,20 200,15 L200,30 L0,30 Z"
                    />
                  </svg>
                </div>

                {/* Always-visible label for mobile */}
                <div className="absolute bottom-0 left-0 right-0 p-3 md:hidden">
                  <p className="text-white text-xs font-medium" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.7)" }}>
                    {item.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="mb-4" style={{ color: "#4a6070" }}>
            Siga-nos no Instagram para ver o peixe do dia e os momentos especiais.
          </p>
          <a
            href="https://instagram.com/maregrafo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: "#003049", color: "white" }}
          >
            <Camera className="w-4 h-4" />
            @maregrafo
          </a>
        </motion.div>
      </div>
    </section>
  );
}
