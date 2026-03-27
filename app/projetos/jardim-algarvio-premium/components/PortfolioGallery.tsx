"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";

const projects = [
  {
    name: "Villa Quinta do Lago",
    location: "Quinta do Lago",
    type: "Jardim Residencial de Luxo",
    description:
      "Jardim de luxo com piscina natural, relvado ornamental e percursos em pedra natural. Integração perfeita entre a arquitectura e a paisagem.",
    gradient: "linear-gradient(135deg, #2A3A20 0%, #3D5A3E 50%, #1A2A15 100%)",
  },
  {
    name: "Terraço do Atlântico",
    location: "Lagos",
    type: "Espaço Exterior Panorâmico",
    description:
      "Espaço exterior panorâmico sobre o oceano com jardim de gramíneas, pérgola em madeira de cedro e iluminação cénica.",
    gradient: "linear-gradient(135deg, #2A2821 0%, #4A3F30 50%, #2A2518 100%)",
  },
  {
    name: "Jardim dos Cítricos",
    location: "Tavira",
    type: "Pomar & Jardim Sensorial",
    description:
      "Pomar e jardim sensorial com laranjeiras, limoeiros e plantas aromáticas. Um refúgio de aromas e texturas mediterrânicas.",
    gradient: "linear-gradient(135deg, #3D5A3E 0%, #5A7D5C 50%, #2A4A2C 100%)",
  },
  {
    name: "Refúgio de Pedra",
    location: "Silves",
    type: "Paisagismo em Terreno Rochoso",
    description:
      "Transformação de terreno rochoso em paisagem naturalista com muros de pedra seca, suculentas e árvores autóctones.",
    gradient: "linear-gradient(135deg, #5A4A3A 0%, #A0522D 40%, #3A2A1A 100%)",
  },
  {
    name: "Oásis de Vilamoura",
    location: "Vilamoura",
    type: "Resort Privado",
    description:
      "Resort privado com rega automatizada inteligente, jardim tropical controlado e deck em ipe para zona de piscina.",
    gradient: "linear-gradient(135deg, #1A2A28 0%, #2A4A3E 50%, #1A2018 100%)",
  },
  {
    name: "Horta da Serra",
    location: "Monchique",
    type: "Jardim Sustentável & Horta Biológica",
    description:
      "Jardim sustentável e horta biológica na serra de Monchique. Compostagem integrada, recolha de águas pluviais e biodiversidade local.",
    gradient: "linear-gradient(135deg, #2A3A1E 0%, #4A6A30 50%, #1A2A10 100%)",
  },
];

export default function PortfolioGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative py-24 md:py-32 px-6" id="projetos">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12" style={{ background: "#C9A96E" }} />
            <span
              className="text-xs tracking-[0.4em] uppercase"
              style={{ color: "#C9A96E", fontFamily: "var(--font-inter)" }}
            >
              Portfólio
            </span>
            <div className="h-px w-12" style={{ background: "#C9A96E" }} />
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            style={{ fontFamily: "var(--font-playfair)", color: "#F5F0E8" }}
          >
            Projetos <span style={{ color: "#C9A96E" }}>Selecionados</span>
          </h2>
          <p
            className="text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: "rgba(245,240,232,0.6)" }}
          >
            Uma seleção dos nossos trabalhos mais recentes no Algarve
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group relative overflow-hidden cursor-pointer"
              style={{
                borderRadius: "4px",
                minHeight: i % 3 === 0 ? "420px" : "360px",
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Background gradient */}
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                style={{ background: project.gradient }}
              />

              {/* Subtle pattern overlay */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30Z' fill='none' stroke='%23F5F0E8' stroke-width='0.5'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "repeat",
                }}
              />

              {/* Top info */}
              <div className="absolute top-0 left-0 right-0 p-6 z-10">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={14} style={{ color: "#C9A96E" }} />
                  <span
                    className="text-xs tracking-wider uppercase"
                    style={{ color: "rgba(201,169,110,0.8)" }}
                  >
                    {project.location}
                  </span>
                </div>
                <span
                  className="text-xs tracking-wider"
                  style={{ color: "rgba(245,240,232,0.5)" }}
                >
                  {project.type}
                </span>
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <h3
                  className="text-2xl md:text-3xl font-bold mb-2"
                  style={{ fontFamily: "var(--font-playfair)", color: "#F5F0E8" }}
                >
                  {project.name}
                </h3>

                {/* Hover overlay */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: hoveredIndex === i ? 1 : 0,
                    y: hoveredIndex === i ? 0 : 20,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: "rgba(245,240,232,0.8)" }}
                  >
                    {project.description}
                  </p>
                  <div
                    className="inline-flex items-center gap-2 text-xs tracking-wider uppercase"
                    style={{ color: "#C9A96E" }}
                  >
                    Ver Projeto <ArrowUpRight size={14} />
                  </div>
                </motion.div>
              </div>

              {/* Gradient overlay for text readability */}
              <div
                className="absolute inset-0 z-[5]"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 40%, rgba(0,0,0,0.5) 100%)",
                }}
              />

              {/* Hover border */}
              <motion.div
                className="absolute inset-0 z-20 pointer-events-none"
                initial={false}
                animate={{
                  boxShadow:
                    hoveredIndex === i
                      ? "inset 0 0 0 1px rgba(201,169,110,0.4)"
                      : "inset 0 0 0 0px rgba(201,169,110,0)",
                }}
                transition={{ duration: 0.3 }}
                style={{ borderRadius: "4px" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
