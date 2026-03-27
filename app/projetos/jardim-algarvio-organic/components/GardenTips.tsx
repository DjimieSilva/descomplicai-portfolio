"use client";

import { motion } from "framer-motion";
import BotanicalDivider from "./BotanicalDivider";

const tips = [
  {
    title: "Como Preparar o Jardim para o Verão Algarvio",
    tag: "Guia Sazonal",
    excerpt:
      "O verão no Algarve traz temperaturas acima dos 35°C e meses sem chuva. Prepare o seu jardim com estas estratégias de rega e proteção.",
    illustration: (
      <svg viewBox="0 0 300 140" fill="none" className="w-full h-full">
        {/* Sky gradient background */}
        <rect width="300" height="140" rx="16" fill="#FDF6EC" />
        {/* Sun */}
        <circle cx="240" cy="40" r="22" fill="#C2703E" fillOpacity={0.15} />
        <circle cx="240" cy="40" r="14" fill="#C2703E" fillOpacity={0.1} />
        {/* Sun rays - precomputed for hydration safety */}
        {[
          { x1: 266, y1: 40, x2: 274, y2: 40 },
          { x1: 258.38, y1: 21.62, x2: 264.04, y2: 15.96 },
          { x1: 240, y1: 14, x2: 240, y2: 6 },
          { x1: 221.62, y1: 21.62, x2: 215.96, y2: 15.96 },
          { x1: 214, y1: 40, x2: 206, y2: 40 },
          { x1: 221.62, y1: 58.38, x2: 215.96, y2: 64.04 },
          { x1: 240, y1: 66, x2: 240, y2: 74 },
          { x1: 258.38, y1: 58.38, x2: 264.04, y2: 64.04 },
        ].map((r, i) => (
            <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} stroke="#C2703E" strokeWidth="1.5" strokeLinecap="round" strokeOpacity={0.4} />
        ))}
        {/* Watering can */}
        <path d="M60 110 L60 80 C60 76, 64 72, 68 72 L92 72 C96 72, 100 76, 100 80 L100 110 Z" fill="#B8D4E3" fillOpacity={0.3} stroke="#B8D4E3" strokeWidth="1.5" />
        <path d="M68 72 L68 66 L92 66 L92 72" stroke="#B8D4E3" strokeWidth="1" />
        <path d="M100 78 L120 65 L122 68 L102 82" stroke="#B8D4E3" strokeWidth="1.5" />
        {/* Water drops */}
        <path d="M118 70 C119 66, 120 63, 118 62" stroke="#B8D4E3" strokeWidth="1" strokeOpacity={0.6} />
        <path d="M122 72 C123 68, 124 65, 122 64" stroke="#B8D4E3" strokeWidth="1" strokeOpacity={0.5} />
        <path d="M126 74 C127 70, 128 67, 126 66" stroke="#B8D4E3" strokeWidth="1" strokeOpacity={0.4} />
        {/* Plant being watered */}
        <path d="M160 120 L160 85" stroke="#6B8F3C" strokeWidth="1.5" />
        <path d="M160 95 C150 88, 142 85, 144 90 C146 95, 154 96, 160 95Z" fill="#6B8F3C" fillOpacity={0.4} />
        <path d="M160 90 C170 83, 178 80, 176 85 C174 90, 166 91, 160 90Z" fill="#8BA888" fillOpacity={0.4} />
        <path d="M160 85 C155 78, 148 75, 150 80 C152 85, 157 86, 160 85Z" fill="#6B8F3C" fillOpacity={0.35} />
        {/* Ground */}
        <path d="M40 120 C100 118, 200 118, 260 120" stroke="#5C4033" strokeWidth="0.8" strokeOpacity={0.2} />
      </svg>
    ),
  },
  {
    title: "Plantas Nativas do Algarve: O Guia Completo",
    tag: "Espécies",
    excerpt:
      "Alecrim, alfazema, oliveira, alfarrobeira, medronheiro — descubra as plantas que prosperam naturalmente no clima mediterrânico.",
    illustration: (
      <svg viewBox="0 0 300 140" fill="none" className="w-full h-full">
        <rect width="300" height="140" rx="16" fill="#FDF6EC" />
        {/* Rosemary branch */}
        <path d="M40 120 C50 100, 55 80, 50 60" stroke="#4A5D23" strokeWidth="1.5" />
        {[60, 70, 80, 90, 100, 110].map((y, i) => (
          <g key={`ros-${i}`}>
            <path d={`M${50 + (i % 2) * 2} ${y} C${44 - i * 0.5} ${y - 4}, ${40 - i * 0.5} ${y - 2}, ${42 - i * 0.3} ${y + 1}`} fill="#4A5D23" fillOpacity={0.3} />
            <path d={`M${50 + (i % 2) * 2} ${y} C${56 + i * 0.5} ${y - 4}, ${60 + i * 0.5} ${y - 2}, ${58 + i * 0.3} ${y + 1}`} fill="#4A5D23" fillOpacity={0.3} />
          </g>
        ))}
        {/* Lavender */}
        <path d="M120 120 C122 100, 118 80, 120 60" stroke="#6B8F3C" strokeWidth="1.2" />
        {[58, 65, 72, 79].map((y, i) => (
          <ellipse key={`lav-${i}`} cx={120 + (i % 2 === 0 ? -1 : 1)} cy={y} rx="5" ry="3.5" fill="#8B7EC8" fillOpacity={0.45 - i * 0.05} />
        ))}
        {/* Olive branch */}
        <path d="M180 120 C185 100, 190 80, 195 60" stroke="#5C4033" strokeWidth="1.5" />
        <path d="M188 95 C182 90, 176 88, 178 93 C180 98, 185 97, 188 95Z" fill="#4A5D23" fillOpacity={0.4} />
        <path d="M192 80 C198 75, 204 73, 202 78 C200 83, 195 82, 192 80Z" fill="#4A5D23" fillOpacity={0.4} />
        <ellipse cx="185" cy="85" rx="3" ry="4" fill="#4A5D23" fillOpacity={0.6} />
        <ellipse cx="196" cy="72" rx="3" ry="4" fill="#4A5D23" fillOpacity={0.6} />
        {/* Carob tree leaf */}
        <path d="M250 120 C252 105, 248 85, 250 65" stroke="#5C4033" strokeWidth="1.5" />
        <path d="M250 100 C242 96, 235 94, 237 99 C239 104, 246 102, 250 100Z" fill="#4A5D23" fillOpacity={0.35} />
        <path d="M250 90 C258 86, 265 84, 263 89 C261 94, 254 92, 250 90Z" fill="#4A5D23" fillOpacity={0.35} />
        <path d="M250 80 C242 76, 236 75, 238 80 C240 85, 247 82, 250 80Z" fill="#4A5D23" fillOpacity={0.35} />
        {/* Carob pod */}
        <path d="M255 95 C258 93, 262 92, 265 94 C268 96, 265 99, 260 100 C255 101, 253 98, 255 95Z" fill="#5C4033" fillOpacity={0.4} />
      </svg>
    ),
  },
  {
    title: "Rega Eficiente: Poupar Água sem Sacrificar o Jardim",
    tag: "Sustentabilidade",
    excerpt:
      "Sistemas de rega gota-a-gota, mulching e espécies xerófitas: como ter um jardim bonito gastando menos 60% de água.",
    illustration: (
      <svg viewBox="0 0 300 140" fill="none" className="w-full h-full">
        <rect width="300" height="140" rx="16" fill="#FDF6EC" />
        {/* Large water drop */}
        <path d="M80 90 C80 65, 60 50, 60 35 C60 20, 80 10, 80 10 C80 10, 100 20, 100 35 C100 50, 80 65, 80 90Z" fill="#B8D4E3" fillOpacity={0.2} stroke="#B8D4E3" strokeWidth="1.5" />
        {/* Inner shine */}
        <path d="M72 50 C70 42, 74 35, 78 30" stroke="#B8D4E3" strokeWidth="1" strokeOpacity={0.5} strokeLinecap="round" />
        {/* Drip irrigation line */}
        <path d="M130 110 L280 110" stroke="#5C4033" strokeWidth="1.5" strokeOpacity={0.5} />
        {/* Drip emitters */}
        {[150, 195, 240].map((x, i) => (
          <g key={`drip-${i}`}>
            <rect x={x - 4} y={107} width="8" height="6" rx="1" fill="#5C4033" fillOpacity={0.3} />
            <path d={`M${x} 113 C${x} 118, ${x - 2} 120, ${x} 122 C${x + 2} 120, ${x} 118, ${x} 113Z`} fill="#B8D4E3" fillOpacity={0.5} />
          </g>
        ))}
        {/* Plants growing from drips */}
        {[150, 195, 240].map((x, i) => (
          <g key={`plant-${i}`}>
            <path d={`M${x} 107 L${x} ${85 - i * 5}`} stroke="#6B8F3C" strokeWidth="1" />
            <path d={`M${x} ${95 - i * 3} C${x - 8} ${90 - i * 3}, ${x - 12} ${88 - i * 3}, ${x - 10} ${93 - i * 3}`} fill="#6B8F3C" fillOpacity={0.35} />
            <path d={`M${x} ${90 - i * 3} C${x + 8} ${85 - i * 3}, ${x + 12} ${83 - i * 3}, ${x + 10} ${88 - i * 3}`} fill="#8BA888" fillOpacity={0.35} />
          </g>
        ))}
        {/* Mulch layer */}
        <path d="M130 120 C160 118, 200 119, 240 118 C260 117, 275 119, 280 120" fill="#C4AA85" fillOpacity={0.2} />
        {/* Percentage text hint */}
        <text x="60" y="115" fill="#B8D4E3" fillOpacity={0.4} fontSize="14" fontWeight="bold" fontFamily="var(--font-source-sans)">-60%</text>
      </svg>
    ),
  },
];

export default function GardenTips() {
  return (
    <section className="py-24 px-4" style={{ backgroundColor: "#E8DCC8" }}>
      <motion.div
        className="text-center mb-4"
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
          Do Nosso Jardim para o Seu
        </h2>
        <p
          className="text-lg max-w-lg mx-auto"
          style={{
            fontFamily: "var(--font-newsreader), serif",
            fontStyle: "italic",
            color: "#8BA888",
          }}
        >
          Dicas e conhecimento sobre jardinagem no Algarve
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
        {tips.map((tip, index) => (
          <motion.article
            key={tip.title}
            className="rounded-2xl overflow-hidden group cursor-pointer"
            style={{
              backgroundColor: "#FDF6EC",
              boxShadow: "0 2px 12px rgba(92,64,51,0.06)",
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
            whileHover={{
              y: -6,
              boxShadow: "0 12px 40px rgba(92,64,51,0.12)",
            }}
          >
            {/* Illustration header */}
            <div className="h-36 overflow-hidden">{tip.illustration}</div>

            {/* Content */}
            <div className="p-6">
              <span
                className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3"
                style={{
                  backgroundColor: "rgba(194,112,62,0.1)",
                  color: "#C2703E",
                  fontFamily: "var(--font-source-sans), sans-serif",
                }}
              >
                {tip.tag}
              </span>
              <h3
                className="text-lg font-bold mb-3 leading-snug"
                style={{
                  fontFamily: "var(--font-libre-caslon), serif",
                  color: "#4A5D23",
                }}
              >
                {tip.title}
              </h3>
              <p
                className="text-sm leading-relaxed mb-4"
                style={{
                  fontFamily: "var(--font-source-sans), sans-serif",
                  color: "#5C4033",
                  opacity: 0.85,
                }}
              >
                {tip.excerpt}
              </p>
              <span
                className="inline-flex items-center text-sm font-semibold group-hover:gap-2 transition-all"
                style={{
                  color: "#4A5D23",
                  fontFamily: "var(--font-source-sans), sans-serif",
                }}
              >
                Ler Mais
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="ml-1 group-hover:translate-x-1 transition-transform"
                >
                  <path
                    d="M3 8 L12 8 M9 5 L12 8 L9 11"
                    stroke="#4A5D23"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-20">
        <BotanicalDivider variant="leaves" color="#4A5D23" />
      </div>
    </section>
  );
}
