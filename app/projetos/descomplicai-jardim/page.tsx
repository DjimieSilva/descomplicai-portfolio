"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════════
   DESCOMPLICAI JARDIM — Organic, warm Portuguese garden homepage

   Palette:
     Primary:    Forest green  #166534
     Secondary:  Warm amber    #f59e0b
     Accent:     Soft pink     #f9a8d4
     Background: Warm cream    #fefce8
     Text:       Dark earth    #422006

   Typography: Sora (headings) + Inter (body)
   All illustrations: pure CSS art — no SVGs, no images
═══════════════════════════════════════════════════════════════════════ */

/* ──────────────────────── COLOR TOKENS ──────────────────────── */
const C = {
  green: "#166534",
  greenLight: "#22c55e",
  greenPale: "#bbf7d0",
  greenDark: "#14532d",
  amber: "#f59e0b",
  amberLight: "#fde68a",
  amberDark: "#b45309",
  pink: "#f9a8d4",
  pinkLight: "#fce7f3",
  cream: "#fefce8",
  creamDark: "#fef9c3",
  earth: "#422006",
  earthLight: "#78350f",
  earthMid: "#92400e",
  brown: "#7c2d12",
  brownLight: "#a16207",
  white: "#fffbeb",
  warmGray: "#78716c",
  sky: "#bae6fd",
  skyLight: "#e0f2fe",
};

/* ──────────────────────── GLOBAL CSS ──────────────────────── */
const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'Inter', 'Sora', sans-serif;
    background: ${C.cream};
    color: ${C.earth};
    overflow-x: hidden;
  }
  ::selection { background: ${C.green}; color: ${C.cream}; }

  /* ─── KEYFRAMES ─── */
  @keyframes sway {
    0%, 100% { transform: rotate(-2deg); }
    50% { transform: rotate(2deg); }
  }
  @keyframes swayReverse {
    0%, 100% { transform: rotate(2deg); }
    50% { transform: rotate(-2deg); }
  }
  @keyframes grassWave {
    0%, 100% { transform: skewX(-3deg) scaleY(1); }
    25% { transform: skewX(2deg) scaleY(1.05); }
    75% { transform: skewX(-1deg) scaleY(0.98); }
  }
  @keyframes butterflyWing {
    0%, 100% { transform: scaleX(1); }
    50% { transform: scaleX(0.3); }
  }
  @keyframes butterflyDrift {
    0% { transform: translate(0, 0) rotate(5deg); }
    25% { transform: translate(60px, -40px) rotate(-5deg); }
    50% { transform: translate(120px, -10px) rotate(10deg); }
    75% { transform: translate(60px, 20px) rotate(-8deg); }
    100% { transform: translate(0, 0) rotate(5deg); }
  }
  @keyframes butterflyDrift2 {
    0% { transform: translate(0, 0) rotate(-5deg); }
    25% { transform: translate(-50px, -30px) rotate(8deg); }
    50% { transform: translate(-100px, 10px) rotate(-3deg); }
    75% { transform: translate(-40px, 30px) rotate(6deg); }
    100% { transform: translate(0, 0) rotate(-5deg); }
  }
  @keyframes sunPulse {
    0%, 100% { box-shadow: 0 0 60px 30px rgba(251,191,36,0.3), 0 0 120px 60px rgba(251,191,36,0.1); }
    50% { box-shadow: 0 0 80px 40px rgba(251,191,36,0.4), 0 0 160px 80px rgba(251,191,36,0.15); }
  }
  @keyframes sunRays {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes leafDrift1 {
    0% { transform: translate(0, -20px) rotate(0deg); opacity: 0; }
    10% { opacity: 0.7; }
    90% { opacity: 0.7; }
    100% { transform: translate(200px, 100vh) rotate(720deg); opacity: 0; }
  }
  @keyframes leafDrift2 {
    0% { transform: translate(0, -20px) rotate(45deg); opacity: 0; }
    10% { opacity: 0.6; }
    90% { opacity: 0.6; }
    100% { transform: translate(-150px, 100vh) rotate(-540deg); opacity: 0; }
  }
  @keyframes leafDrift3 {
    0% { transform: translate(0, -20px) rotate(90deg); opacity: 0; }
    10% { opacity: 0.5; }
    90% { opacity: 0.5; }
    100% { transform: translate(100px, 100vh) rotate(450deg); opacity: 0; }
  }
  @keyframes waterDrop {
    0% { transform: translateY(0) scale(1); opacity: 1; }
    100% { transform: translateY(30px) scale(0.5); opacity: 0; }
  }
  @keyframes bloomOpen {
    0% { transform: scale(0) rotate(-45deg); opacity: 0; }
    60% { transform: scale(1.1) rotate(5deg); opacity: 1; }
    100% { transform: scale(1) rotate(0deg); opacity: 1; }
  }
  @keyframes gateOpen {
    0% { transform: perspective(600px) rotateY(0deg); }
    100% { transform: perspective(600px) rotateY(-70deg); }
  }
  @keyframes vineGrow {
    0% { stroke-dashoffset: 300; }
    100% { stroke-dashoffset: 0; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  @keyframes seasonRotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

/* ──────────────────────── PROJECTS DATA ──────────────────────── */
const PROJECTS = {
  restaurantes: [
    { emoji: "🍽️", name: "Cacarola", desc: "Restaurante em Figueira da Foz", href: "/projetos/cacarola" },
    { emoji: "🍷", name: "Vindima Selvagem", desc: "Restaurante rústico e orgânico", href: "/projetos/vindima-selvagem" },
    { emoji: "🍕", name: "Zeff Pizza", desc: "Pizzaria artesanal italiana", href: "/projetos/zeff-pizza" },
    { emoji: "🦐", name: "Marisqueira Rosa Amélia", desc: "Mariscos frescos do Atlântico", href: "/projetos/marisqueira-rosa-amelia" },
    { emoji: "🍺", name: "Tasca da Praia", desc: "Petiscos junto ao mar", href: "/projetos/tasca-da-praia" },
    { emoji: "🥘", name: "Tasca Dentro", desc: "Cozinha portuguesa autêntica", href: "/projetos/tasca-dentro" },
    { emoji: "🍝", name: "Mesa dos Amigos", desc: "Restaurante familiar", href: "/projetos/mesa-dos-amigos" },
    { emoji: "☕", name: "Café Praça 18", desc: "Café no coração da cidade", href: "/projetos/cafe-praca-18" },
    { emoji: "🍹", name: "Sabor Abençoado", desc: "Sabores com alma", href: "/projetos/sabor-abencoado" },
    { emoji: "🐟", name: "Pé na Areia", desc: "Restaurante de praia", href: "/projetos/pe-na-areia" },
    { emoji: "🍷", name: "Vinho na Rua", desc: "Wine bar urbano", href: "/projetos/vinho-na-rua" },
    { emoji: "🏠", name: "O Picadeiro", desc: "Cozinha de campo", href: "/projetos/o-picadeiro" },
  ],
  clinicas: [
    { emoji: "🦷", name: "Alba Saúde Dentária", desc: "Clínica moderna e acolhedora", href: "/projetos/alba-saude-dentaria" },
    { emoji: "🏥", name: "Clínica Tamargueira", desc: "Saúde integrada", href: "/projetos/clinica-tamargueira" },
    { emoji: "🦷", name: "DentalKid", desc: "Dentista para crianças", href: "/projetos/dentalkid" },
    { emoji: "🏥", name: "FozClínica", desc: "Clínica geral na Figueira", href: "/projetos/fozclinica" },
    { emoji: "🦷", name: "Premium Clínica Dentária", desc: "Odontologia premium", href: "/projetos/premium-clinica-dentaria" },
    { emoji: "🏥", name: "Clínica Vasco da Gama", desc: "Saúde familiar", href: "/projetos/clinica-vasco-da-gama" },
    { emoji: "🏥", name: "UpConcept Clínica", desc: "Estética e saúde", href: "/projetos/upconcept-clinica" },
    { emoji: "🦷", name: "Clínica Dentária Quiaios", desc: "Cuidados dentários", href: "/projetos/clinica-dentaria-quiaios" },
  ],
  ferramentas: [
    { emoji: "📝", name: "Markdown Editor", desc: "Editor minimalista", href: "/projetos/markdown-editor" },
    { emoji: "🎨", name: "Color Palette Generator", desc: "Paletas de cores", href: "/projetos/color-palette-generator" },
    { emoji: "🔑", name: "Password Generator", desc: "Senhas seguras", href: "/projetos/password-generator" },
    { emoji: "📊", name: "JSON Formatter", desc: "Formatador de JSON", href: "/projetos/json-formatter" },
    { emoji: "🎯", name: "Regex Tester", desc: "Testar expressões regulares", href: "/projetos/regex-tester" },
    { emoji: "🧮", name: "Calculator", desc: "Calculadora científica", href: "/projetos/calculator" },
    { emoji: "📐", name: "Unit Converter", desc: "Conversor de unidades", href: "/projetos/unit-converter" },
    { emoji: "🖌️", name: "CSS Playground", desc: "Brincar com CSS", href: "/projetos/css-playground" },
  ],
  experiencias: [
    { emoji: "🎮", name: "Snake Game", desc: "Clássico reinventado", href: "/projetos/snake-game" },
    { emoji: "🧠", name: "Memory Game", desc: "Jogo de memória", href: "/projetos/memory-game" },
    { emoji: "🎵", name: "Music Visualizer", desc: "Visualizador de música", href: "/projetos/music-visualizer" },
    { emoji: "🌌", name: "Generative Art", desc: "Arte generativa", href: "/projetos/generative-art" },
    { emoji: "🌍", name: "Globe Explorer", desc: "Explorador do globo", href: "/projetos/globe-explorer" },
    { emoji: "🏰", name: "RPG Quest", desc: "Aventura interativa", href: "/projetos/rpg-quest" },
    { emoji: "🎹", name: "Music Box", desc: "Caixa de música", href: "/projetos/music-box" },
    { emoji: "🎨", name: "Pixel Art", desc: "Editor pixel art", href: "/projetos/pixel-art" },
  ],
};

const FEATURED_PROJECTS = [
  { name: "Caçarola", color: "#ef4444", href: "/projetos/cacarola" },
  { name: "Alba Saúde", color: "#3b82f6", href: "/projetos/alba-saude-dentaria" },
  { name: "Vindima Selvagem", color: "#8b5cf6", href: "/projetos/vindima-selvagem" },
  { name: "DentalKid", color: "#06b6d4", href: "/projetos/dentalkid" },
  { name: "Vinho na Rua", color: "#ec4899", href: "/projetos/vinho-na-rua" },
  { name: "Markdown Editor", color: "#f97316", href: "/projetos/markdown-editor" },
];

const NAV_LINKS = [
  { label: "Servicos", href: "#servicos" },
  { label: "Jardim", href: "#pomar" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Sobre", href: "#manifesto" },
  { label: "Contacto", href: "#contacto" },
];

/* ──────────────────────── HELPER COMPONENTS ──────────────────────── */

/* ── Floating Leaves ── */
function FloatingLeaves() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 50, overflow: "hidden" }}>
      {[
        { left: "10%", delay: "0s", dur: "18s", anim: "leafDrift1", size: 14, color: C.greenLight },
        { left: "30%", delay: "4s", dur: "22s", anim: "leafDrift2", size: 10, color: C.green },
        { left: "60%", delay: "8s", dur: "20s", anim: "leafDrift3", size: 12, color: C.greenPale },
        { left: "80%", delay: "12s", dur: "24s", anim: "leafDrift1", size: 8, color: C.greenLight },
      ].map((l, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: "-20px",
            left: l.left,
            width: l.size,
            height: l.size * 1.4,
            background: l.color,
            borderRadius: "0 50% 50% 50%",
            opacity: 0,
            animation: `${l.anim} ${l.dur} ${l.delay} infinite ease-in-out`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Sun Component ── */
function Sun() {
  return (
    <div
      style={{
        position: "absolute",
        top: 40,
        right: 60,
        width: 100,
        height: 100,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${C.amber} 0%, ${C.amberLight} 40%, transparent 70%)`,
        animation: "sunPulse 4s ease-in-out infinite",
        zIndex: 1,
      }}
    >
      {/* Sun rays */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 180,
          height: 180,
          marginTop: -90,
          marginLeft: -90,
          animation: "sunRays 60s linear infinite",
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 2,
              height: 40,
              background: `linear-gradient(to bottom, ${C.amber}40, transparent)`,
              transformOrigin: "center top",
              transform: `rotate(${i * 45}deg) translateY(-60px)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Butterfly ── */
function Butterfly({ color, left, top, animName }: { color: string; left: string; top: string; animName: string }) {
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        zIndex: 3,
        animation: `${animName} 12s ease-in-out infinite`,
      }}
    >
      <div style={{ position: "relative", width: 24, height: 16 }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 10,
            height: 14,
            background: color,
            borderRadius: "50% 0 50% 50%",
            transformOrigin: "right center",
            animation: "butterflyWing 0.4s ease-in-out infinite",
            opacity: 0.8,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 10,
            height: 14,
            background: color,
            borderRadius: "0 50% 50% 50%",
            transformOrigin: "left center",
            animation: "butterflyWing 0.4s ease-in-out infinite",
            opacity: 0.8,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 2,
            height: 16,
            marginLeft: -1,
            marginTop: -8,
            background: C.earth,
            borderRadius: 2,
          }}
        />
      </div>
    </div>
  );
}

/* ── Flower ── */
function Flower({
  color,
  stemH,
  x,
  delay = 0,
}: {
  color: string;
  stemH: number;
  x: number;
  delay?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 40,
        left: x,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transformOrigin: "bottom center",
        animation: `sway 3s ${delay}s ease-in-out infinite`,
      }}
    >
      {/* Petals */}
      <div style={{ position: "relative", width: 24, height: 24, marginBottom: -4 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: color,
              top: "50%",
              left: "50%",
              transform: `rotate(${i * 72}deg) translateY(-8px) translate(-50%, -50%)`,
              opacity: 0.85,
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: C.amber,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
      {/* Stem */}
      <div style={{ width: 3, height: stemH, background: C.green, borderRadius: 2 }} />
      {/* Leaf */}
      <div
        style={{
          position: "absolute",
          bottom: stemH * 0.4,
          left: "50%",
          marginLeft: 2,
          width: 10,
          height: 6,
          background: C.greenLight,
          borderRadius: "0 50% 50% 0",
          transform: "rotate(-20deg)",
        }}
      />
    </div>
  );
}

/* ── Grass Patch ── */
function GrassPatch() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        overflow: "hidden",
      }}
    >
      {/* Base grass */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 40,
          background: `linear-gradient(to top, ${C.green}, ${C.greenLight})`,
          borderRadius: "60% 60% 0 0 / 20px 20px 0 0",
        }}
      />
      {/* Grass blades */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            bottom: 30,
            left: `${(i / 30) * 100}%`,
            width: 4,
            height: 15 + Math.random() * 20,
            background: i % 3 === 0 ? C.greenLight : C.green,
            borderRadius: "2px 2px 0 0",
            transformOrigin: "bottom center",
            animation: `grassWave ${2 + Math.random() * 2}s ${Math.random() * 2}s ease-in-out infinite`,
            opacity: 0.8,
          }}
        />
      ))}
    </div>
  );
}

/* ── Seed Packet Stat Card ── */
function SeedPacket({
  number,
  label,
  emoji,
  delay,
}: {
  number: string;
  label: string;
  emoji: string;
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay }}
      style={{
        background: C.white,
        border: `2px solid ${C.amberLight}`,
        borderRadius: 16,
        padding: "24px 28px",
        textAlign: "center",
        minWidth: 180,
        boxShadow: "0 4px 24px rgba(120,53,15,0.08)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative top strip */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: `linear-gradient(90deg, ${C.green}, ${C.amber}, ${C.pink})`,
          borderRadius: "14px 14px 0 0",
        }}
      />
      <div style={{ fontSize: 28, marginBottom: 8, marginTop: 4 }}>{emoji}</div>
      <div
        style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: 32,
          fontWeight: 800,
          color: C.green,
          lineHeight: 1,
          marginBottom: 4,
        }}
      >
        {number}
      </div>
      <div style={{ fontSize: 13, color: C.warmGray, fontWeight: 500, letterSpacing: 0.5 }}>
        {label}
      </div>
    </motion.div>
  );
}

/* ── Section Reveal Wrapper ── */
function Reveal({
  children,
  delay = 0,
  y = 40,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ── Tree Component for Pomar Section ── */
function FruitTree({
  project,
  index,
}: {
  project: (typeof FEATURED_PROJECTS)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.a
      ref={ref}
      href={project.href}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textDecoration: "none",
        cursor: "pointer",
        position: "relative",
      }}
    >
      {/* Canopy */}
      <motion.div
        animate={hovered ? { rotate: [0, -2, 2, -1, 0] } : {}}
        transition={{ duration: 1.5, repeat: hovered ? Infinity : 0 }}
        style={{
          width: 100,
          height: 80,
          background: `radial-gradient(ellipse, ${C.greenLight} 30%, ${C.green} 100%)`,
          borderRadius: "50% 50% 45% 45%",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `inset -8px -8px 20px ${C.greenDark}30`,
        }}
      >
        {/* Fruits */}
        {[
          { x: -20, y: 10 },
          { x: 20, y: -5 },
          { x: 5, y: 20 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            animate={hovered ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{
              position: "absolute",
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: project.color,
              left: `calc(50% + ${pos.x}px)`,
              top: `calc(50% + ${pos.y}px)`,
              transform: "translate(-50%, -50%)",
              boxShadow: `0 2px 6px ${project.color}40`,
            }}
          />
        ))}
      </motion.div>
      {/* Trunk */}
      <div
        style={{
          width: 16,
          height: 40,
          background: `linear-gradient(to right, ${C.brown}, ${C.earthLight})`,
          borderRadius: "0 0 4px 4px",
          marginTop: -4,
        }}
      />
      {/* Label */}
      <motion.div
        animate={hovered ? { scale: 1.05 } : { scale: 1 }}
        style={{
          marginTop: 10,
          fontFamily: "'Sora', sans-serif",
          fontSize: 14,
          fontWeight: 600,
          color: C.green,
          textAlign: "center",
          maxWidth: 120,
        }}
      >
        {project.name}
      </motion.div>
    </motion.a>
  );
}

/* ── Garden Bed Service Card ── */
function GardenBedCard({
  emoji,
  title,
  desc,
  animType,
  delay,
}: {
  emoji: string;
  title: string;
  desc: string;
  animType: "tree" | "water" | "flower";
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay }}
      whileHover={{ y: -6, boxShadow: "0 12px 40px rgba(22,101,52,0.12)" }}
      style={{
        background: C.white,
        border: `2px solid ${C.brownLight}30`,
        borderRadius: 20,
        padding: "36px 28px 28px",
        flex: "1 1 300px",
        maxWidth: 380,
        position: "relative",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* Earth border top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${C.brown}, ${C.earthLight}, ${C.brown})`,
          borderRadius: "18px 18px 0 0",
        }}
      />

      {/* Animated illustration */}
      <div style={{ height: 80, display: "flex", alignItems: "flex-end", justifyContent: "center", marginBottom: 20 }}>
        {animType === "tree" && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, delay: delay + 0.3 }}
            style={{
              transformOrigin: "bottom center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 50,
                height: 40,
                background: `radial-gradient(ellipse, ${C.greenLight}, ${C.green})`,
                borderRadius: "50%",
              }}
            />
            <div style={{ width: 8, height: 30, background: C.brown, borderRadius: "0 0 4px 4px", marginTop: -4 }} />
          </motion.div>
        )}
        {animType === "water" && (
          <div style={{ position: "relative", width: 60, height: 60 }}>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: [0, 1, 0] } : {}}
                transition={{
                  duration: 1.2,
                  delay: delay + 0.3 + i * 0.4,
                  repeat: Infinity,
                  repeatDelay: 0.8,
                }}
                style={{
                  position: "absolute",
                  left: 15 + i * 12,
                  top: 10,
                  width: 6,
                  height: 10,
                  background: C.sky,
                  borderRadius: "50% 50% 50% 50% / 30% 30% 70% 70%",
                }}
              />
            ))}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 5,
                width: 50,
                height: 20,
                background: `linear-gradient(to top, ${C.sky}40, transparent)`,
                borderRadius: "50%",
              }}
            />
          </div>
        )}
        {animType === "flower" && (
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={inView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 1, delay: delay + 0.3, type: "spring" }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <div style={{ position: "relative", width: 36, height: 36 }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: i % 2 === 0 ? C.amber : C.pink,
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${i * 60}deg) translateY(-12px) translate(-50%, -50%)`,
                  }}
                />
              ))}
              <div
                style={{
                  position: "absolute",
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: C.amberDark,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            </div>
            <div style={{ width: 3, height: 25, background: C.green, marginTop: -2, borderRadius: 2 }} />
          </motion.div>
        )}
      </div>

      <div style={{ fontSize: 32, marginBottom: 12 }}>{emoji}</div>
      <h3
        style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: 20,
          fontWeight: 700,
          color: C.green,
          marginBottom: 8,
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: 15, color: C.warmGray, lineHeight: 1.6 }}>{desc}</p>
    </motion.div>
  );
}

/* ── Portfolio Card ── */
function PortfolioCard({
  project,
  delay,
}: {
  project: { emoji: string; name: string; desc: string; href: string };
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.a
      ref={ref}
      href={project.href}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(22,101,52,0.1)" }}
      style={{
        display: "block",
        background: C.white,
        borderRadius: 16,
        padding: "20px 22px",
        textDecoration: "none",
        border: `1px solid ${C.greenPale}`,
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.3s",
      }}
    >
      {/* Leaf decoration top-right */}
      <div
        style={{
          position: "absolute",
          top: -4,
          right: -4,
          width: 24,
          height: 24,
          background: C.greenPale,
          borderRadius: "0 14px 0 50%",
          opacity: 0.5,
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <span style={{ fontSize: 24 }}>{project.emoji}</span>
        <span
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            fontSize: 15,
            color: C.green,
          }}
        >
          {project.name}
        </span>
      </div>
      <p style={{ fontSize: 13, color: C.warmGray, lineHeight: 1.5, marginBottom: 8 }}>
        {project.desc}
      </p>
      <span style={{ fontSize: 13, fontWeight: 600, color: C.amber }}>Ver &rarr;</span>
    </motion.a>
  );
}

/* ── Season Circle Stage ── */
function SeasonStage({
  emoji,
  season,
  title,
  desc,
  color,
  delay,
}: {
  emoji: string;
  season: string;
  title: string;
  desc: string;
  color: string;
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: "1 1 200px",
        maxWidth: 240,
      }}
    >
      <motion.div
        whileHover={{ scale: 1.08, rotate: 5 }}
        style={{
          width: 110,
          height: 110,
          borderRadius: "50%",
          background: `${color}15`,
          border: `3px solid ${color}40`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 40,
          marginBottom: 16,
          cursor: "default",
        }}
      >
        {emoji}
      </motion.div>
      <div
        style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: 12,
          fontWeight: 600,
          color,
          textTransform: "uppercase",
          letterSpacing: 2,
          marginBottom: 6,
        }}
      >
        {season}
      </div>
      <h4
        style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: 18,
          fontWeight: 700,
          color: C.earth,
          marginBottom: 4,
        }}
      >
        {title}
      </h4>
      <p style={{ fontSize: 13, color: C.warmGray, textAlign: "center", lineHeight: 1.5 }}>
        {desc}
      </p>
    </motion.div>
  );
}

/* ── Contact Seed Packet ── */
function ContactPacket({
  emoji,
  label,
  value,
  href,
  delay,
}: {
  emoji: string;
  label: string;
  value: string;
  href: string;
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30, rotateY: 20 }}
      animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      whileHover={{ y: -6, scale: 1.03 }}
      style={{
        display: "block",
        background: C.white,
        borderRadius: 16,
        padding: "28px 24px",
        textDecoration: "none",
        border: `2px solid ${C.amberLight}`,
        textAlign: "center",
        flex: "1 1 200px",
        maxWidth: 260,
        boxShadow: "0 4px 20px rgba(120,53,15,0.06)",
      }}
    >
      <div style={{ fontSize: 36, marginBottom: 12 }}>{emoji}</div>
      <div
        style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: 16,
          fontWeight: 700,
          color: C.green,
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 13, color: C.warmGray }}>{value}</div>
    </motion.a>
  );
}

/* ── Garden Gate (CSS) ── */
function GardenGate({ open }: { open: boolean }) {
  return (
    <div
      style={{
        position: "relative",
        width: 280,
        height: 200,
        margin: "0 auto 40px",
      }}
    >
      {/* Posts */}
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: 16,
          height: 200,
          background: `linear-gradient(to right, ${C.brown}, ${C.earthLight})`,
          borderRadius: "4px 4px 0 0",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: 16,
          height: 200,
          background: `linear-gradient(to right, ${C.earthLight}, ${C.brown})`,
          borderRadius: "4px 4px 0 0",
        }}
      />
      {/* Arch */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 8,
          right: 8,
          height: 60,
          borderRadius: "130px 130px 0 0",
          border: `6px solid ${C.brown}`,
          borderBottom: "none",
        }}
      />
      {/* Left gate door */}
      <motion.div
        animate={open ? { rotateY: -70 } : { rotateY: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          position: "absolute",
          left: 16,
          top: 60,
          width: 124,
          height: 140,
          background: `repeating-linear-gradient(
            0deg,
            ${C.green}20 0px,
            ${C.green}20 2px,
            transparent 2px,
            transparent 12px
          )`,
          border: `2px solid ${C.brown}60`,
          borderRadius: "0 0 0 4px",
          transformOrigin: "left center",
        }}
      >
        {/* Horizontal bars */}
        {[30, 70, 110].map((t) => (
          <div
            key={t}
            style={{
              position: "absolute",
              top: t,
              left: 0,
              right: 0,
              height: 3,
              background: `${C.brown}50`,
            }}
          />
        ))}
      </motion.div>
      {/* Right gate door */}
      <motion.div
        animate={open ? { rotateY: 70 } : { rotateY: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          position: "absolute",
          right: 16,
          top: 60,
          width: 124,
          height: 140,
          background: `repeating-linear-gradient(
            0deg,
            ${C.green}20 0px,
            ${C.green}20 2px,
            transparent 2px,
            transparent 12px
          )`,
          border: `2px solid ${C.brown}60`,
          borderRadius: "0 0 4px 0",
          transformOrigin: "right center",
        }}
      >
        {[30, 70, 110].map((t) => (
          <div
            key={t}
            style={{
              position: "absolute",
              top: t,
              left: 0,
              right: 0,
              height: 3,
              background: `${C.brown}50`,
            }}
          />
        ))}
      </motion.div>
      {/* Decorative vines on arch */}
      {[20, 40, 60, 80].map((pct) => (
        <div
          key={pct}
          style={{
            position: "absolute",
            top: 10,
            left: `${pct}%`,
            width: 6,
            height: 6,
            background: C.greenLight,
            borderRadius: "50%",
            opacity: 0.7,
          }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
══════════════════════════════════════════════════════════════════════ */
export default function DescomplicaiJardim() {
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<keyof typeof PROJECTS>("restaurantes");
  const [gateOpen, setGateOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const gateRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  /* ── Scroll listeners ── */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      // Gate open logic
      if (gateRef.current) {
        const rect = gateRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.6) {
          setGateOpen(true);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Category tabs ── */
  const categories: { key: keyof typeof PROJECTS; label: string; emoji: string }[] = [
    { key: "restaurantes", label: "Restaurantes", emoji: "🍽️" },
    { key: "clinicas", label: "Clinicas", emoji: "🏥" },
    { key: "ferramentas", label: "Ferramentas", emoji: "🛠️" },
    { key: "experiencias", label: "Experiencias", emoji: "🎮" },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <FloatingLeaves />

      {/* ════════════════════════════════════════════════════════
          NAVIGATION
      ════════════════════════════════════════════════════════ */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled ? `${C.cream}f0` : `${C.cream}cc`,
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${C.greenPale}`,
          transition: "background 0.3s, box-shadow 0.3s",
          boxShadow: scrolled ? "0 2px 20px rgba(22,101,52,0.06)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <a
            href="#"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 20 }}>🌿</span>
            <span
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: 18,
                fontWeight: 700,
                color: C.green,
                letterSpacing: -0.5,
              }}
            >
              descomplicai
            </span>
          </a>

          {/* Desktop links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 32,
            }}
            className="nav-desktop"
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  textDecoration: "none",
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: C.green,
                  transition: "color 0.2s",
                }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contacto"
              style={{
                textDecoration: "none",
                fontFamily: "'Sora', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: C.white,
                background: C.green,
                padding: "8px 20px",
                borderRadius: 10,
                transition: "background 0.2s",
              }}
            >
              Plantar Connosco
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
              fontSize: 24,
              color: C.green,
            }}
            className="nav-mobile-btn"
            aria-label="Menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                overflow: "hidden",
                background: C.cream,
                borderTop: `1px solid ${C.greenPale}`,
              }}
            >
              <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
                {NAV_LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      textDecoration: "none",
                      fontFamily: "'Sora', sans-serif",
                      fontSize: 16,
                      fontWeight: 500,
                      color: C.green,
                    }}
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="#contacto"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    textDecoration: "none",
                    fontFamily: "'Sora', sans-serif",
                    fontSize: 14,
                    fontWeight: 600,
                    color: C.white,
                    background: C.green,
                    padding: "10px 20px",
                    borderRadius: 10,
                    textAlign: "center",
                  }}
                >
                  Plantar Connosco
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Responsive CSS */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .nav-mobile-btn { display: none !important; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
      `,
        }}
      />

      {/* ════════════════════════════════════════════════════════
          SECTION 1: HERO
      ════════════════════════════════════════════════════════ */}
      <section
        style={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "120px 24px 160px",
          background: `radial-gradient(circle at 20% 30%, ${C.creamDark}40 0%, transparent 50%),
                       radial-gradient(circle at 80% 70%, ${C.pinkLight}30 0%, transparent 40%),
                       ${C.cream}`,
        }}
      >
        {/* Paper texture dots */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(${C.earth}08 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
            zIndex: 0,
          }}
        />

        <Sun />

        {/* Main content */}
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 700 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "clamp(42px, 8vw, 80px)",
                fontWeight: 800,
                color: C.green,
                letterSpacing: -2,
                lineHeight: 1,
                marginBottom: 20,
              }}
            >
              DESCOMPLICAI
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(16px, 2.5vw, 22px)",
              color: C.earthLight,
              lineHeight: 1.5,
              marginBottom: 12,
              fontWeight: 400,
            }}
          >
            Cultivamos presenca digital para pessoas e empresas
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              fontSize: 18,
              color: C.amber,
              fontWeight: 500,
              marginBottom: 40,
            }}
          >
            🌱 Plantamos. Crescemos. Colhemos juntos.
          </motion.p>

          {/* Stats — Seed Packets */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
              justifyContent: "center",
              marginBottom: 40,
            }}
          >
            <SeedPacket number="109" label="Paginas Plantadas" emoji="📄" delay={0.5} />
            <SeedPacket number="55+" label="Jardins Criados" emoji="🌿" delay={0.7} />
            <SeedPacket number="52K" label="Linhas Cultivadas" emoji="💻" delay={0.9} />
          </div>

          {/* CTA */}
          <motion.a
            href="#servicos"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(22,101,52,0.2)" }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "'Sora', sans-serif",
              fontSize: 16,
              fontWeight: 600,
              color: C.white,
              background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`,
              padding: "14px 32px",
              borderRadius: 14,
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(22,101,52,0.15)",
              cursor: "pointer",
            }}
          >
            🍃 Explorar o Jardim &rarr;
          </motion.a>
        </div>

        {/* Garden scene at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 120,
          }}
        >
          <GrassPatch />
          <Flower color={C.pink} stemH={45} x={80} delay={0} />
          <Flower color={C.amber} stemH={55} x={200} delay={0.5} />
          <Flower color="#c084fc" stemH={40} x={350} delay={1} />
          <Flower color={C.pink} stemH={50} x={500} delay={0.3} />
          <Flower color={C.amber} stemH={35} x={650} delay={0.8} />
          <Flower color="#c084fc" stemH={48} x={800} delay={1.2} />
          <Flower color={C.pink} stemH={42} x={950} delay={0.6} />
          <Flower color={C.amber} stemH={52} x={1100} delay={0.2} />
          <Butterfly color={C.amber} left="20%" top="60%" animName="butterflyDrift" />
          <Butterfly color={C.pink} left="70%" top="50%" animName="butterflyDrift2" />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 2: SERVICOS (Garden Beds)
      ════════════════════════════════════════════════════════ */}
      <section
        id="servicos"
        style={{
          padding: "100px 24px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: C.amber,
                textTransform: "uppercase",
                letterSpacing: 3,
                marginBottom: 12,
              }}
            >
              🌻 Servicos
            </p>
            <h2
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "clamp(28px, 5vw, 44px)",
                fontWeight: 800,
                color: C.earth,
                letterSpacing: -1,
              }}
            >
              O que cultivamos
            </h2>
          </div>
        </Reveal>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
            justifyContent: "center",
          }}
        >
          <GardenBedCard
            emoji="🌳"
            title="Sites & Portfolios"
            desc="Plantamos raizes digitais fortes. Cada site e uma arvore que cresce, dá sombra e frutos ao longo do tempo."
            animType="tree"
            delay={0}
          />
          <GardenBedCard
            emoji="🤖"
            title="IA & Automacao"
            desc="Irrigacao automatica para o seu negocio. Sistemas inteligentes que regam enquanto voce descansa."
            animType="water"
            delay={0.15}
          />
          <GardenBedCard
            emoji="🌻"
            title="Mentoria"
            desc="Sementes de conhecimento. Ensinamos a plantar, regar e colher — para que cresça sozinho."
            animType="flower"
            delay={0.3}
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 3: POMAR (Orchard — Featured Projects as Trees)
      ════════════════════════════════════════════════════════ */}
      <section
        id="pomar"
        style={{
          padding: "80px 24px 100px",
          background: `linear-gradient(to bottom, ${C.cream}, ${C.greenPale}15, ${C.cream})`,
        }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <p
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: C.amber,
                  textTransform: "uppercase",
                  letterSpacing: 3,
                  marginBottom: 12,
                }}
              >
                🍊 Projetos em destaque
              </p>
              <h2
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "clamp(28px, 5vw, 44px)",
                  fontWeight: 800,
                  color: C.earth,
                  letterSpacing: -1,
                }}
              >
                O Nosso Pomar
              </h2>
              <p
                style={{
                  fontSize: 16,
                  color: C.warmGray,
                  marginTop: 12,
                  maxWidth: 500,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                Cada projeto e uma arvore que plantamos. Clique nos frutos para explorar.
              </p>
            </div>
          </Reveal>

          {/* Ground line */}
          <div
            style={{
              position: "relative",
              paddingBottom: 40,
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 40,
                justifyContent: "center",
                paddingBottom: 20,
              }}
            >
              {FEATURED_PROJECTS.map((p, i) => (
                <FruitTree key={p.name} project={p} index={i} />
              ))}
            </div>

            {/* Ground */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 20,
                background: `linear-gradient(to top, ${C.brown}20, transparent)`,
                borderRadius: "50% 50% 0 0 / 10px 10px 0 0",
              }}
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 4: PORTFOLIO GRID (All Seeds)
      ════════════════════════════════════════════════════════ */}
      <section
        id="portfolio"
        style={{
          padding: "100px 24px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: C.amber,
                textTransform: "uppercase",
                letterSpacing: 3,
                marginBottom: 12,
              }}
            >
              🌱 Portfolio completo
            </p>
            <h2
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "clamp(28px, 5vw, 44px)",
                fontWeight: 800,
                color: C.earth,
                letterSpacing: -1,
              }}
            >
              Todas as Sementes
            </h2>
          </div>
        </Reveal>

        {/* Category tabs — garden markers */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: activeCategory === cat.key ? C.white : C.earth,
                background: activeCategory === cat.key ? C.green : `${C.amberLight}40`,
                border: `2px solid ${activeCategory === cat.key ? C.green : C.amberLight}`,
                borderRadius: 12,
                padding: "10px 20px",
                cursor: "pointer",
                transition: "all 0.3s",
                display: "flex",
                alignItems: "center",
                gap: 6,
                position: "relative",
              }}
            >
              {/* Wooden stake look — top notch */}
              <div
                style={{
                  position: "absolute",
                  top: -4,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 20,
                  height: 4,
                  background: activeCategory === cat.key ? C.greenDark : `${C.brown}30`,
                  borderRadius: "2px 2px 0 0",
                }}
              />
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Project grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 16,
            }}
          >
            {PROJECTS[activeCategory].map((p, i) => (
              <PortfolioCard key={p.name} project={p} delay={i * 0.05} />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 5: MANIFESTO (Garden Quote)
      ════════════════════════════════════════════════════════ */}
      <section
        id="manifesto"
        style={{
          padding: "100px 24px",
          background: `linear-gradient(135deg, ${C.greenPale}30, ${C.creamDark}40, ${C.pinkLight}20)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Vine decorations on edges */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: 40,
            background: `repeating-linear-gradient(
              to bottom,
              transparent 0px,
              transparent 20px,
              ${C.greenLight}15 20px,
              ${C.greenLight}15 22px
            )`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: 40,
            background: `repeating-linear-gradient(
              to bottom,
              transparent 0px,
              transparent 20px,
              ${C.greenLight}15 20px,
              ${C.greenLight}15 22px
            )`,
          }}
        />
        {/* Leaf decorations */}
        {[
          { top: 40, left: 12, rotate: 45 },
          { top: 120, left: 8, rotate: -30 },
          { top: 220, left: 14, rotate: 60 },
          { top: 80, right: 10, rotate: -45, isRight: true },
          { top: 180, right: 8, rotate: 30, isRight: true },
          { top: 280, right: 14, rotate: -60, isRight: true },
        ].map((leaf, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: leaf.top,
              ...(leaf.isRight ? { right: leaf.right || leaf.left } : { left: leaf.left }),
              width: 14,
              height: 10,
              background: C.greenLight,
              borderRadius: leaf.isRight ? "50% 0 50% 50%" : "0 50% 50% 50%",
              transform: `rotate(${leaf.rotate}deg)`,
              opacity: 0.3,
            }}
          />
        ))}

        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <Reveal>
            <blockquote
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "clamp(24px, 4vw, 38px)",
                fontWeight: 700,
                color: C.green,
                lineHeight: 1.4,
                marginBottom: 50,
                fontStyle: "italic",
              }}
            >
              &ldquo;O futuro e humano. Cada projeto e uma semente.&rdquo;
            </blockquote>
          </Reveal>

          {/* Garden stones — values */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 24,
              justifyContent: "center",
            }}
          >
            {[
              { emoji: "🤝", label: "Humanos Primeiro" },
              { emoji: "🌊", label: "Vida Autentica" },
              { emoji: "❤️", label: "Amor no Codigo" },
            ].map((v, i) => (
              <Reveal key={v.label} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.04 }}
                  style={{
                    background: `${C.white}cc`,
                    backdropFilter: "blur(8px)",
                    border: `1px solid ${C.greenPale}`,
                    borderRadius: 60,
                    padding: "16px 32px",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    cursor: "default",
                    boxShadow: "0 4px 16px rgba(22,101,52,0.06)",
                  }}
                >
                  <span style={{ fontSize: 22 }}>{v.emoji}</span>
                  <span
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: 15,
                      fontWeight: 600,
                      color: C.earth,
                    }}
                  >
                    {v.label}
                  </span>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 6: PROCESSO (Growth Cycle / Seasons)
      ════════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: "100px 24px",
          maxWidth: 1000,
          margin: "0 auto",
        }}
      >
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: C.amber,
                textTransform: "uppercase",
                letterSpacing: 3,
                marginBottom: 12,
              }}
            >
              🔄 Processo
            </p>
            <h2
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "clamp(28px, 5vw, 44px)",
                fontWeight: 800,
                color: C.earth,
                letterSpacing: -1,
              }}
            >
              Como Crescemos Juntos
            </h2>
          </div>
        </Reveal>

        {/* Season connector line */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: 55,
              left: "10%",
              right: "10%",
              height: 2,
              background: `linear-gradient(90deg, ${C.pink}40, ${C.amber}40, ${C.amberDark}40, ${C.sky}40)`,
              zIndex: 0,
              display: "none",
            }}
            className="season-line"
          />
          <style
            dangerouslySetInnerHTML={{
              __html: `@media (min-width: 769px) { .season-line { display: block !important; } }`,
            }}
          />

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 32,
              justifyContent: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <SeasonStage
              emoji="🌸"
              season="Primavera"
              title="Conversa"
              desc="Plantamos a ideia juntos, ouvimos o que precisa crescer"
              color="#ec4899"
              delay={0}
            />
            <SeasonStage
              emoji="☀️"
              season="Verao"
              title="Pesquisa"
              desc="Nutrimos com dados, sol e estrategia"
              color={C.amber}
              delay={0.15}
            />
            <SeasonStage
              emoji="🍂"
              season="Outono"
              title="Design"
              desc="Colhemos o conceito visual, cada folha no lugar certo"
              color={C.amberDark}
              delay={0.3}
            />
            <SeasonStage
              emoji="❄️"
              season="Inverno"
              title="Build"
              desc="Consolidamos e entregamos, raizes fortes para o futuro"
              color="#60a5fa"
              delay={0.45}
            />
          </div>
        </div>

        {/* Animated rotating season indicator */}
        <Reveal delay={0.6}>
          <div style={{ textAlign: "center", marginTop: 50 }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 60,
                height: 60,
                borderRadius: "50%",
                border: `2px dashed ${C.greenPale}`,
              }}
            >
              <span style={{ fontSize: 24 }}>🌍</span>
            </motion.div>
            <p style={{ fontSize: 13, color: C.warmGray, marginTop: 12, fontStyle: "italic" }}>
              Um ciclo continuo de crescimento
            </p>
          </div>
        </Reveal>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 7: CONTACTO (Garden Gate)
      ════════════════════════════════════════════════════════ */}
      <section
        id="contacto"
        ref={gateRef}
        style={{
          padding: "100px 24px",
          background: `linear-gradient(to bottom, ${C.cream}, ${C.greenPale}10)`,
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <p
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: C.amber,
                textTransform: "uppercase",
                letterSpacing: 3,
                marginBottom: 12,
              }}
            >
              🚪 Contacto
            </p>
            <h2
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "clamp(28px, 5vw, 44px)",
                fontWeight: 800,
                color: C.earth,
                letterSpacing: -1,
                marginBottom: 40,
              }}
            >
              Vamos plantar juntos?
            </h2>
          </Reveal>

          <GardenGate open={gateOpen} />

          {/* Contact cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={gateOpen ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
              justifyContent: "center",
            }}
          >
            <ContactPacket
              emoji="📧"
              label="Email"
              value="ola@descomplicai.pt"
              href="mailto:ola@descomplicai.pt"
              delay={0.6}
            />
            <ContactPacket
              emoji="💬"
              label="WhatsApp"
              value="Conversar agora"
              href="https://wa.me/351910000000"
              delay={0.8}
            />
            <ContactPacket
              emoji="📅"
              label="Reuniao"
              value="Marcar um cafe virtual"
              href="https://cal.com"
              delay={1.0}
            />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 8: FOOTER
      ════════════════════════════════════════════════════════ */}
      <footer
        style={{
          position: "relative",
          background: C.green,
          color: C.greenPale,
          overflow: "hidden",
        }}
      >
        {/* Grass/earth border at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 30,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 30,
              background: C.cream,
              borderRadius: "0 0 50% 50% / 0 0 30px 30px",
            }}
          />
        </div>

        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            padding: "60px 24px 40px",
            textAlign: "center",
          }}
        >
          {/* Logo */}
          <div
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 22,
              fontWeight: 700,
              color: C.greenPale,
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <span>🌿</span>
            descomplicai
          </div>

          <p
            style={{
              fontSize: 14,
              color: `${C.greenPale}90`,
              marginBottom: 24,
              lineHeight: 1.6,
            }}
          >
            Cultivamos presenca digital com inteligencia artificial
          </p>

          {/* Social links as garden tool icons */}
          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              marginBottom: 32,
            }}
          >
            {[
              { label: "GitHub", emoji: "🌱", href: "https://github.com/descomplicai" },
              { label: "LinkedIn", emoji: "🌿", href: "https://linkedin.com/company/descomplicai" },
              { label: "Instagram", emoji: "🌻", href: "https://instagram.com/descomplicai.pt" },
              { label: "Twitter", emoji: "🍃", href: "https://twitter.com/descomplicai" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: `${C.greenDark}80`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  textDecoration: "none",
                  transition: "background 0.3s, transform 0.3s",
                }}
              >
                {s.emoji}
              </a>
            ))}
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background: `${C.greenPale}20`,
              marginBottom: 20,
            }}
          />

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "8px 24px",
              fontSize: 13,
              color: `${C.greenPale}70`,
            }}
          >
            <span>&copy; 2026 Descomplicai</span>
            <span>Cultivado em Figueira da Foz</span>
            <span>Feito com 🌱 e Claude</span>
          </div>
        </div>
      </footer>

      {/* ── Scroll-to-top button ── */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              position: "fixed",
              bottom: 24,
              right: 24,
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: C.green,
              border: "none",
              color: C.white,
              fontSize: 20,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 16px rgba(22,101,52,0.2)",
              zIndex: 90,
            }}
            aria-label="Voltar ao topo"
          >
            🌱
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
