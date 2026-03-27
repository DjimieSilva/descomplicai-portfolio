"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BotanicalDivider from "./BotanicalDivider";

const projects = [
  {
    title: "Jardim da Vila",
    location: "Albufeira",
    description: "De terreno abandonado a oásis verde",
    beforeGradient: "linear-gradient(135deg, #8B7355 0%, #A0926B 40%, #C4B99A 100%)",
    afterGradient: "linear-gradient(135deg, #4A5D23 0%, #6B8F3C 40%, #8BA888 70%, #A8C896 100%)",
    beforeLabel: "Antes",
    afterLabel: "Depois",
    clipPath: "polygon(5% 0%, 95% 2%, 100% 95%, 3% 100%)",
  },
  {
    title: "Quinta dos Limões",
    location: "Tavira",
    description: "Um pomar que voltou à vida",
    beforeGradient: "linear-gradient(135deg, #8E8E8E 0%, #A9A9A9 40%, #C0C0C0 100%)",
    afterGradient: "linear-gradient(135deg, #6B8F3C 0%, #C2B535 30%, #8BA888 60%, #A8C896 100%)",
    beforeLabel: "Antes",
    afterLabel: "Depois",
    clipPath: "polygon(3% 2%, 97% 0%, 98% 97%, 0% 95%)",
  },
  {
    title: "Terraço Atlântico",
    location: "Lagos",
    description: "Varanda com vista e jardim vertical",
    beforeGradient: "linear-gradient(135deg, #9E9E9E 0%, #BDBDBD 40%, #E0E0E0 100%)",
    afterGradient: "linear-gradient(135deg, #4A5D23 0%, #6B8F3C 30%, #C2703E 70%, #E8A87C 100%)",
    beforeLabel: "Antes",
    afterLabel: "Depois",
    clipPath: "polygon(2% 3%, 98% 0%, 96% 98%, 0% 96%)",
  },
  {
    title: "Horta Familiar",
    location: "Loulé",
    description: "Horta biológica e jardim sensorial",
    beforeGradient: "linear-gradient(135deg, #A68B6B 0%, #C4AA85 40%, #D4C4A8 100%)",
    afterGradient: "linear-gradient(135deg, #5C4033 0%, #6B8F3C 30%, #8BA888 60%, #C2703E 100%)",
    beforeLabel: "Antes",
    afterLabel: "Depois",
    clipPath: "polygon(4% 0%, 96% 3%, 100% 96%, 2% 100%)",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <motion.div
      className="relative cursor-pointer group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      onClick={() => setShowAfter(!showAfter)}
      onMouseEnter={() => setShowAfter(true)}
      onMouseLeave={() => setShowAfter(false)}
    >
      <div
        className="relative overflow-hidden"
        style={{
          clipPath: project.clipPath,
          borderRadius: "24px",
        }}
      >
        {/* Before/After gradient area */}
        <div className="relative h-64 sm:h-72">
          <AnimatePresence mode="wait">
            {!showAfter ? (
              <motion.div
                key="before"
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: project.beforeGradient }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Before SVG illustration */}
                <svg viewBox="0 0 120 80" fill="none" className="w-24 opacity-40">
                  <path d="M20 70 L20 45 C20 40, 25 35, 30 35 L90 35 C95 35, 100 40, 100 45 L100 70" stroke="#FDF6EC" strokeWidth="1.5" />
                  <path d="M10 70 L110 70" stroke="#FDF6EC" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="45" cy="25" r="8" stroke="#FDF6EC" strokeWidth="1" strokeDasharray="2 2" />
                  <path d="M60 35 L60 15" stroke="#FDF6EC" strokeWidth="1" strokeDasharray="3 3" />
                </svg>
                <span
                  className="absolute bottom-4 left-4 text-sm font-semibold px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: "rgba(253,246,236,0.85)",
                    color: "#5C4033",
                    fontFamily: "var(--font-source-sans), sans-serif",
                  }}
                >
                  {project.beforeLabel}
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="after"
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: project.afterGradient }}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* After SVG illustration */}
                <svg viewBox="0 0 120 80" fill="none" className="w-24 opacity-50">
                  <path d="M30 70 C30 55, 35 45, 40 40 C42 38, 44 35, 45 30" stroke="#FDF6EC" strokeWidth="1.5" />
                  <path d="M45 30 C40 25, 35 22, 33 26 C31 30, 38 32, 45 30Z" fill="#FDF6EC" fillOpacity={0.5} />
                  <path d="M45 30 C50 25, 55 22, 57 26 C59 30, 52 32, 45 30Z" fill="#FDF6EC" fillOpacity={0.5} />
                  <path d="M60 70 C60 50, 62 42, 65 35" stroke="#FDF6EC" strokeWidth="1.5" />
                  <path d="M65 35 C60 28, 55 25, 53 30 C51 35, 58 38, 65 35Z" fill="#FDF6EC" fillOpacity={0.4} />
                  <path d="M65 35 C70 28, 75 25, 77 30 C79 35, 72 38, 65 35Z" fill="#FDF6EC" fillOpacity={0.4} />
                  <path d="M85 70 C85 58, 83 48, 80 42 C78 38, 82 33, 85 28" stroke="#FDF6EC" strokeWidth="1.5" />
                  <path d="M85 28 C80 22, 75 20, 74 25 C73 30, 79 32, 85 28Z" fill="#FDF6EC" fillOpacity={0.5} />
                  {/* Flowers */}
                  <circle cx="50" cy="22" r="3" fill="#FDF6EC" fillOpacity={0.6} />
                  <circle cx="75" cy="20" r="2.5" fill="#FDF6EC" fillOpacity={0.5} />
                </svg>
                <span
                  className="absolute bottom-4 left-4 text-sm font-semibold px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: "rgba(253,246,236,0.85)",
                    color: "#4A5D23",
                    fontFamily: "var(--font-source-sans), sans-serif",
                  }}
                >
                  {project.afterLabel}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Click hint */}
          <div
            className="absolute top-3 right-3 text-xs px-2 py-1 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
            style={{
              backgroundColor: "rgba(253,246,236,0.8)",
              color: "#5C4033",
              fontFamily: "var(--font-source-sans), sans-serif",
            }}
          >
            {showAfter ? "Ver antes" : "Ver depois"}
          </div>
        </div>
      </div>

      {/* Card info */}
      <div className="mt-4 px-2">
        <h3
          className="text-xl font-bold"
          style={{
            fontFamily: "var(--font-libre-caslon), serif",
            color: "#4A5D23",
          }}
        >
          {project.title}
        </h3>
        <p
          className="text-sm mt-1"
          style={{
            fontFamily: "var(--font-source-sans), sans-serif",
            color: "#C2703E",
          }}
        >
          {project.location}
        </p>
        <p
          className="text-sm mt-1"
          style={{
            fontFamily: "var(--font-newsreader), serif",
            fontStyle: "italic",
            color: "#5C4033",
            opacity: 0.8,
          }}
        >
          {project.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function GardenGallery() {
  return (
    <section id="jardins" className="py-24 px-4" style={{ backgroundColor: "#E8DCC8" }}>
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2
          className="text-4xl md:text-5xl mb-4"
          style={{
            fontFamily: "var(--font-libre-caslon), serif",
            color: "#4A5D23",
          }}
        >
          Transformações
        </h2>
        <p
          className="text-lg max-w-lg mx-auto"
          style={{
            fontFamily: "var(--font-newsreader), serif",
            fontStyle: "italic",
            color: "#8BA888",
          }}
        >
          Passe o rato ou toque para ver a transformação
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>

      <div className="mt-20">
        <BotanicalDivider variant="flowers" color="#C2703E" />
      </div>
    </section>
  );
}
