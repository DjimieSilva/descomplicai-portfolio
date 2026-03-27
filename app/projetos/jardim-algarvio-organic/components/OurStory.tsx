"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import BotanicalDivider from "./BotanicalDivider";

const timelineEntries = [
  {
    year: "2009",
    title: "O Primeiro Jardim",
    text: "Tudo começou com a paixão pela terra algarvia. O nosso fundador, António Soares, transformou o primeiro jardim numa propriedade em Loulé.",
    side: "left" as const,
  },
  {
    year: "2014",
    title: "Crescer com Raízes",
    text: "A equipa cresceu para 8 pessoas. Especializámo-nos em plantas mediterrânicas nativas e sistemas de rega eficientes.",
    side: "right" as const,
  },
  {
    year: "2019",
    title: "Design e Natureza",
    text: "Integrámos o design paisagístico na nossa oferta. Cada jardim passou a ser um projeto único, pensado para o clima e solo do Algarve.",
    side: "left" as const,
  },
  {
    year: "2024",
    title: "Referência no Algarve",
    text: "Mais de 500 jardins criados e mantidos em todo o Algarve. Uma equipa de 15 profissionais apaixonados.",
    side: "right" as const,
  },
];

function TimelineIllustration({ index }: { index: number }) {
  const illustrations = [
    // Seedling
    <svg key="0" viewBox="0 0 60 60" fill="none" className="w-14 h-14">
      <path d="M30 55 L30 35" stroke="#3E2723" strokeWidth="1.5" />
      <path
        d="M30 35 C25 30, 18 28, 15 32 C12 36, 18 40, 30 35Z"
        fill="#43A047"
        fillOpacity={0.5}
      />
      <path
        d="M30 35 C35 28, 42 26, 45 30 C48 34, 42 38, 30 35Z"
        fill="#2E7D32"
        fillOpacity={0.5}
      />
      <path d="M30 55 C25 55, 20 56, 18 55" stroke="#3E2723" strokeWidth="1" strokeOpacity={0.5} />
      <path d="M30 55 C35 55, 40 56, 42 55" stroke="#3E2723" strokeWidth="1" strokeOpacity={0.5} />
    </svg>,
    // Growing tree
    <svg key="1" viewBox="0 0 60 60" fill="none" className="w-14 h-14">
      <path d="M30 55 L30 28" stroke="#3E2723" strokeWidth="2" />
      <path d="M30 40 C22 35, 16 30, 20 26" stroke="#3E2723" strokeWidth="1" fill="none" />
      <path d="M30 35 C38 30, 44 25, 40 22" stroke="#3E2723" strokeWidth="1" fill="none" />
      <circle cx="30" cy="20" r="12" fill="#2E7D32" fillOpacity={0.15} stroke="#2E7D32" strokeWidth="1" />
      <path d="M24 18 C22 15, 20 16, 22 19" fill="#2E7D32" fillOpacity={0.4} />
      <path d="M36 22 C38 19, 40 20, 38 23" fill="#2E7D32" fillOpacity={0.4} />
      <ellipse cx="20" cy="28" rx="3" ry="4" fill="#2E7D32" fillOpacity={0.4} />
      <ellipse cx="40" cy="24" rx="3" ry="4" fill="#43A047" fillOpacity={0.4} />
    </svg>,
    // Design compass + leaf
    <svg key="2" viewBox="0 0 60 60" fill="none" className="w-14 h-14">
      <circle cx="30" cy="30" r="18" stroke="#2E7D32" strokeWidth="1" strokeDasharray="3 3" />
      <path d="M30 12 L30 16" stroke="#2E7D32" strokeWidth="1" />
      <path d="M30 44 L30 48" stroke="#2E7D32" strokeWidth="1" />
      <path d="M12 30 L16 30" stroke="#2E7D32" strokeWidth="1" />
      <path d="M44 30 L48 30" stroke="#2E7D32" strokeWidth="1" />
      <path
        d="M30 20 C38 22, 42 28, 40 35 C38 42, 30 44, 25 40 C20 36, 22 28, 30 20Z"
        fill="#43A047"
        fillOpacity={0.3}
        stroke="#43A047"
        strokeWidth="0.8"
      />
      <path d="M30 20 C30 28, 30 36, 30 44" stroke="#43A047" strokeWidth="0.6" />
    </svg>,
    // Award / star
    <svg key="3" viewBox="0 0 60 60" fill="none" className="w-14 h-14">
      <path
        d="M30 10 L34 22 L47 22 L36 30 L40 42 L30 34 L20 42 L24 30 L13 22 L26 22Z"
        fill="#D4552A"
        fillOpacity={0.2}
        stroke="#D4552A"
        strokeWidth="1"
      />
      <circle cx="30" cy="27" r="6" fill="#D4552A" fillOpacity={0.15} stroke="#D4552A" strokeWidth="0.8" />
      <path d="M30 50 C25 48, 18 50, 15 52" stroke="#2E7D32" strokeWidth="0.8" fill="none" />
      <path d="M30 50 C35 48, 42 50, 45 52" stroke="#2E7D32" strokeWidth="0.8" fill="none" />
      <path
        d="M15 52 C12 50, 10 52, 13 54"
        fill="#2E7D32"
        fillOpacity={0.3}
      />
      <path
        d="M45 52 C48 50, 50 52, 47 54"
        fill="#2E7D32"
        fillOpacity={0.3}
      />
    </svg>,
  ];
  return illustrations[index] || null;
}

export default function OurStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const vineLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="historia"
      ref={containerRef}
      className="relative py-24 px-4"
      style={{
        backgroundColor: "#FBF1E0",
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(92,64,51,0.03) 1px, transparent 0)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* Section heading */}
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2
          className="text-4xl md:text-5xl mb-4"
          style={{
            fontFamily: "var(--font-libre-caslon), serif",
            color: "#2E7D32",
          }}
        >
          A Nossa História
        </h2>
        <p
          className="text-lg max-w-md mx-auto"
          style={{
            fontFamily: "var(--font-newsreader), serif",
            fontStyle: "italic",
            color: "#4CAF50",
          }}
        >
          Raízes profundas no solo algarvio
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative max-w-4xl mx-auto">
        {/* Vine SVG line */}
        <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 hidden md:block">
          <svg
            className="w-8 h-full"
            viewBox="0 0 32 800"
            preserveAspectRatio="none"
            fill="none"
          >
            <motion.path
              d="M16 0 C18 50, 14 100, 16 150 C18 200, 14 250, 16 300 C18 350, 14 400, 16 450 C18 500, 14 550, 16 600 C18 650, 14 700, 16 800"
              stroke="#4CAF50"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              style={{ pathLength: vineLength }}
            />
            {/* Small leaves along the vine */}
            {[100, 250, 400, 550, 700].map((y, i) => (
              <path
                key={i}
                d={
                  i % 2 === 0
                    ? `M16 ${y} C10 ${y - 8}, 4 ${y - 6}, 6 ${y - 2}`
                    : `M16 ${y} C22 ${y - 8}, 28 ${y - 6}, 26 ${y - 2}`
                }
                fill="#4CAF50"
                fillOpacity={0.3}
              />
            ))}
          </svg>
        </div>

        {/* Timeline entries */}
        <div className="space-y-16 md:space-y-24">
          {timelineEntries.map((entry, index) => (
            <motion.div
              key={entry.year}
              className={`relative flex flex-col md:flex-row items-center gap-6 ${
                entry.side === "right" ? "md:flex-row-reverse" : ""
              }`}
              initial={{ opacity: 0, x: entry.side === "left" ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Content card */}
              <div
                className={`flex-1 p-6 md:p-8 rounded-3xl max-w-md ${
                  entry.side === "left" ? "md:text-right" : "md:text-left"
                }`}
                style={{
                  backgroundColor: "#E8DCC8",
                  boxShadow: "0 4px 20px rgba(92,64,51,0.08)",
                }}
              >
                <div
                  className={`flex items-center gap-3 mb-3 ${
                    entry.side === "left" ? "md:justify-end" : ""
                  }`}
                >
                  <TimelineIllustration index={index} />
                  <span
                    className="text-3xl font-bold"
                    style={{
                      fontFamily: "var(--font-libre-caslon), serif",
                      color: "#D4552A",
                    }}
                  >
                    {entry.year}
                  </span>
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{
                    fontFamily: "var(--font-libre-caslon), serif",
                    color: "#2E7D32",
                  }}
                >
                  {entry.title}
                </h3>
                <p
                  className="leading-relaxed"
                  style={{
                    fontFamily: "var(--font-source-sans), sans-serif",
                    color: "#3E2723",
                    opacity: 0.9,
                  }}
                >
                  {entry.text}
                </p>
              </div>

              {/* Center dot */}
              <div
                className="hidden md:flex w-5 h-5 rounded-full border-2 shrink-0 z-10"
                style={{
                  borderColor: "#2E7D32",
                  backgroundColor: "#FBF1E0",
                }}
              />

              {/* Spacer for opposite side */}
              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <BotanicalDivider variant="leaves" color="#4CAF50" />
      </div>
    </section>
  );
}
