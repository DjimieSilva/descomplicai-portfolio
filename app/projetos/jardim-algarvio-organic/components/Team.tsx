"use client";

import { motion } from "framer-motion";
import BotanicalDivider from "./BotanicalDivider";

const team = [
  {
    name: "António Soares",
    role: "Fundador & Paisagista",
    bio: "Com mais de 15 anos de experiência, o António fundou a JardimAlgarvio com a visão de criar jardins que respeitem a natureza algarvia.",
    gradient: "linear-gradient(135deg, #4A5D23 0%, #6B8F3C 100%)",
  },
  {
    name: "Sofia Rodrigues",
    role: "Designer de Jardins",
    bio: "Formada em Arquitetura Paisagista, a Sofia traz uma abordagem artística a cada projeto.",
    gradient: "linear-gradient(135deg, #8BA888 0%, #B8D4E3 100%)",
  },
  {
    name: "Miguel Costa",
    role: "Chefe de Equipa",
    bio: "O Miguel lidera a equipa de campo com dedicação e conhecimento profundo das espécies mediterrânicas.",
    gradient: "linear-gradient(135deg, #C2703E 0%, #E8A87C 100%)",
  },
  {
    name: "Inês Martins",
    role: "Especialista em Rega",
    bio: "A Inês é responsável por todos os sistemas de rega, garantindo eficiência hídrica em cada jardim.",
    gradient: "linear-gradient(135deg, #B8D4E3 0%, #8BA888 100%)",
  },
];

function AvatarWreath({ gradient, index }: { gradient: string; index: number }) {
  const wreathColors = ["#4A5D23", "#8BA888", "#6B8F3C", "#4A5D23"];
  const wreathColor = wreathColors[index % wreathColors.length];

  return (
    <div className="relative w-28 h-28 mx-auto mb-4">
      {/* Botanical wreath frame */}
      <svg
        viewBox="0 0 120 120"
        fill="none"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left wreath arc */}
        <path
          d="M60 10 C35 10, 12 30, 10 55 C8 80, 25 105, 55 112"
          stroke={wreathColor}
          strokeWidth="1.2"
          fill="none"
          strokeOpacity={0.6}
        />
        {/* Right wreath arc */}
        <path
          d="M60 10 C85 10, 108 30, 110 55 C112 80, 95 105, 65 112"
          stroke={wreathColor}
          strokeWidth="1.2"
          fill="none"
          strokeOpacity={0.6}
        />
        {/* Left leaves */}
        {[20, 40, 60, 80, 95].map((progress, i) => {
          const t = progress / 100;
          const cx = 60 + (10 - 60) * Math.pow(1 - t, 2) + (10 - 60) * 2 * (1 - t) * t + (55 - 60) * t * t;
          const cy = 10 + (55 - 10) * t + (112 - 55) * t * t * 0.3;
          const adjustedCx = cx - 5 * (1 - Math.abs(t - 0.5) * 2);
          return (
            <path
              key={`ll-${i}`}
              d={`M${adjustedCx} ${cy} C${adjustedCx - 8} ${cy - 4}, ${adjustedCx - 10} ${cy - 1}, ${adjustedCx - 7} ${cy + 3}`}
              fill={wreathColor}
              fillOpacity={0.3 + i * 0.04}
            />
          );
        })}
        {/* Right leaves */}
        {[20, 40, 60, 80, 95].map((progress, i) => {
          const t = progress / 100;
          const cx = 60 + (110 - 60) * Math.pow(1 - t, 2) + (110 - 60) * 2 * (1 - t) * t + (65 - 60) * t * t;
          const cy = 10 + (55 - 10) * t + (112 - 55) * t * t * 0.3;
          const adjustedCx = cx + 5 * (1 - Math.abs(t - 0.5) * 2);
          return (
            <path
              key={`rl-${i}`}
              d={`M${adjustedCx} ${cy} C${adjustedCx + 8} ${cy - 4}, ${adjustedCx + 10} ${cy - 1}, ${adjustedCx + 7} ${cy + 3}`}
              fill={wreathColor}
              fillOpacity={0.3 + i * 0.04}
            />
          );
        })}
        {/* Small berries */}
        <circle cx="22" cy="50" r="2" fill={wreathColor} fillOpacity={0.5} />
        <circle cx="98" cy="50" r="2" fill={wreathColor} fillOpacity={0.5} />
        <circle cx="30" cy="85" r="2" fill={wreathColor} fillOpacity={0.4} />
        <circle cx="90" cy="85" r="2" fill={wreathColor} fillOpacity={0.4} />
      </svg>

      {/* Avatar gradient circle */}
      <div
        className="absolute inset-3 rounded-full flex items-center justify-center"
        style={{ background: gradient }}
      >
        {/* Person icon silhouette */}
        <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
          <circle cx="20" cy="14" r="6" fill="#FDF6EC" fillOpacity={0.6} />
          <path
            d="M8 36 C8 28, 13 24, 20 24 C27 24, 32 28, 32 36"
            fill="#FDF6EC"
            fillOpacity={0.4}
          />
        </svg>
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <section className="py-24 px-4" style={{ backgroundColor: "#E8DCC8" }}>
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
          A Nossa Equipa
        </h2>
        <p
          className="text-lg max-w-md mx-auto"
          style={{
            fontFamily: "var(--font-newsreader), serif",
            fontStyle: "italic",
            color: "#8BA888",
          }}
        >
          Pessoas apaixonadas por jardins
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {team.map((member, index) => (
          <motion.div
            key={member.name}
            className="rounded-2xl p-6 text-center"
            style={{
              backgroundColor: "#FDF6EC",
              boxShadow: "0 2px 16px rgba(92,64,51,0.06)",
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
            whileHover={{
              y: -4,
              boxShadow: "0 8px 30px rgba(92,64,51,0.1)",
            }}
          >
            <AvatarWreath gradient={member.gradient} index={index} />

            <h3
              className="text-lg font-bold mb-1"
              style={{
                fontFamily: "var(--font-libre-caslon), serif",
                color: "#4A5D23",
              }}
            >
              {member.name}
            </h3>
            <p
              className="text-sm font-semibold mb-3"
              style={{
                fontFamily: "var(--font-source-sans), sans-serif",
                color: "#C2703E",
              }}
            >
              {member.role}
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{
                fontFamily: "var(--font-source-sans), sans-serif",
                color: "#5C4033",
                opacity: 0.85,
              }}
            >
              {member.bio}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-20">
        <BotanicalDivider variant="flowers" color="#8BA888" />
      </div>
    </section>
  );
}
