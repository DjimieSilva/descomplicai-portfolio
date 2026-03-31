"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring, type MotionValue } from "framer-motion";

/* ─────────────────────────── DATA ─────────────────────────── */

const FEATURED_PROJECTS = [
  {
    name: "Chess",
    category: "Jogos",
    description: "Implementação completa de xadrez com IA adversária, validação de movimentos e interface intuitiva.",
    svgId: "chess" as const,
  },
  {
    name: "Bijou Restaurante",
    category: "Restaurantes",
    description: "Website de fine dining com estética minimalista e elegante. Cada detalhe pensado para transmitir a experiência gastronómica.",
    svgId: "bijou" as const,
  },
  {
    name: "Fractal Explorer",
    category: "Interativo",
    description: "Explorador de fractais Mandelbrot e Julia com zoom infinito, paletas dinâmicas e renderização em tempo real.",
    svgId: "fractal" as const,
  },
  {
    name: "DentalKid",
    category: "Saúde",
    description: "Plataforma educativa de saúde oral para crianças, com jogos e animações que tornam a higiene dentária divertida.",
    svgId: "dentalkid" as const,
  },
  {
    name: "Synth",
    category: "Plataformas",
    description: "Sintetizador polifónico no browser com osciladores, filtros, envelopes e efeitos em tempo real.",
    svgId: "synth" as const,
  },
  {
    name: "Solar System",
    category: "Interativo",
    description: "Explorador interativo do sistema solar com órbitas precisas, informações detalhadas e escala realista.",
    svgId: "solar" as const,
  },
];

const IMPACT_STATS = [
  { value: 110, suffix: "+", label: "Projetos criados" },
  { value: 17, suffix: "", label: "Restaurantes digitalizados" },
  { value: 9, suffix: "", label: "Clínicas com presença digital" },
  { value: 40, suffix: "+", label: "Ferramentas interativas" },
  { value: 0, suffix: "€", label: "Cobrado aos utilizadores" },
];

const SUPPORT_TIERS = [
  {
    name: "Estrela",
    emoji: "\u2B50",
    price: "\u20AC5",
    period: "/m\u00EAs",
    description: "O teu nome na constela\u00E7\u00E3o",
    features: ["Acesso a todos os projetos", "Badge de apoiante", "Canal exclusivo", "Nome na p\u00E1gina de apoiantes"],
    highlighted: false,
    cta: "Juntar-me como Estrela",
  },
  {
    name: "Sol",
    emoji: "\u2600\uFE0F",
    price: "\u20AC15",
    period: "/m\u00EAs",
    description: "Ilumina o caminho",
    features: ["Tudo do Estrela", "Acesso antecipado a novos projetos", "Voto em pr\u00F3ximos projetos", "Sess\u00F5es mensais de Q&A"],
    highlighted: true,
    badge: "Mais Popular",
    cta: "Juntar-me como Sol",
  },
  {
    name: "Horizonte",
    emoji: "\uD83C\uDF05",
    price: "\u20AC30",
    period: "/m\u00EAs",
    description: "Transforma a paisagem",
    features: ["Tudo do Sol", "Sugest\u00F5es priorit\u00E1rias", "Cr\u00E9ditos em todos os projetos", "Linha direta comigo"],
    highlighted: false,
    cta: "Juntar-me como Horizonte",
  },
];

/* ─────────────────────────── HOOKS ─────────────────────────── */

function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    let frame: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [end, duration, start]);
  return count;
}

/* ─────────────────────────── SVG ILLUSTRATIONS ─────────────────────────── */

function ProjectSVG({ id }: { id: string }) {
  const brown = "#92400E";
  const green = "#86EFAC";

  switch (id) {
    case "chess":
      return (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
          {/* 4x4 grid */}
          {[0, 1, 2, 3].map(row =>
            [0, 1, 2, 3].map(col => (
              <rect
                key={`${row}-${col}`}
                x={12 + col * 14}
                y={12 + row * 14}
                width="14"
                height="14"
                fill={(row + col) % 2 === 0 ? green : brown}
                opacity={(row + col) % 2 === 0 ? 0.3 : 0.2}
                rx="1"
              />
            ))
          )}
          {/* Simple chess piece (king) */}
          <path d="M40 20 L40 16 M36 16 L44 16 M34 28 L46 28 L44 24 C44 22 42 20 40 20 C38 20 36 22 36 24 L34 28Z M32 32 L48 32 L46 28 L34 28 L32 32Z"
            stroke={brown} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"
            transform="translate(0, 20)"
          />
        </svg>
      );
    case "bijou":
      return (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
          {/* Plate */}
          <circle cx="40" cy="42" r="24" stroke={brown} strokeWidth="2" fill="none" />
          <circle cx="40" cy="42" r="18" stroke={brown} strokeWidth="1" opacity="0.3" fill="none" />
          {/* Utensils */}
          <line x1="16" y1="24" x2="16" y2="60" stroke={green} strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="24" x2="20" y2="24" stroke={green} strokeWidth="2" strokeLinecap="round" />
          <line x1="64" y1="24" x2="64" y2="60" stroke={green} strokeWidth="2" strokeLinecap="round" />
          <path d="M60 24 C60 32 64 32 64 24" stroke={green} strokeWidth="2" fill="none" />
          <path d="M64 24 C64 32 68 32 68 24" stroke={green} strokeWidth="2" fill="none" />
        </svg>
      );
    case "fractal":
      return (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
          {/* Nested squares */}
          <rect x="10" y="10" width="60" height="60" stroke={brown} strokeWidth="2" fill="none" rx="2" />
          <rect x="20" y="20" width="40" height="40" stroke={green} strokeWidth="2" fill="none" rx="2" opacity="0.7" />
          <rect x="28" y="28" width="24" height="24" stroke={brown} strokeWidth="2" fill="none" rx="2" opacity="0.5" />
          <rect x="34" y="34" width="12" height="12" stroke={green} strokeWidth="2" fill="none" rx="1" opacity="0.4" />
        </svg>
      );
    case "dentalkid":
      return (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
          {/* Tooth shape */}
          <path d="M30 28 C30 18 38 14 40 14 C42 14 50 18 50 28 C50 38 48 44 46 52 C45 56 43 58 42 58 C41 58 40 56 40 52 C40 56 39 58 38 58 C37 58 35 56 34 52 C32 44 30 38 30 28Z"
            stroke={brown} strokeWidth="2" fill={green} fillOpacity="0.2"
          />
          {/* Sparkle */}
          <circle cx="40" cy="30" r="2" fill={brown} opacity="0.4" />
          <path d="M56 20 L58 18 M58 22 L60 20 M54 18 L56 16" stroke={green} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "synth":
      return (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
          {/* Equalizer bars */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const heights = [24, 36, 18, 42, 30, 22, 34];
            const h = heights[i];
            return (
              <rect
                key={i}
                x={14 + i * 8}
                y={60 - h}
                width="5"
                height={h}
                rx="2"
                fill={i % 2 === 0 ? brown : green}
                opacity={i % 2 === 0 ? 0.7 : 0.5}
              />
            );
          })}
        </svg>
      );
    case "solar":
      return (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
          {/* Sun */}
          <circle cx="40" cy="40" r="8" fill={brown} opacity="0.3" />
          <circle cx="40" cy="40" r="4" fill={brown} opacity="0.6" />
          {/* Orbits */}
          <circle cx="40" cy="40" r="16" stroke={green} strokeWidth="1" opacity="0.4" fill="none" />
          <circle cx="40" cy="40" r="24" stroke={brown} strokeWidth="1" opacity="0.3" fill="none" />
          <circle cx="40" cy="40" r="32" stroke={green} strokeWidth="1" opacity="0.2" fill="none" />
          {/* Planets */}
          <circle cx="56" cy="40" r="3" fill={green} opacity="0.7" />
          <circle cx="40" cy="16" r="2.5" fill={brown} opacity="0.5" />
          <circle cx="14" cy="52" r="2" fill={green} opacity="0.4" />
        </svg>
      );
    default:
      return null;
  }
}

/* ─────────────────────────── FLOATING ORGANIC BLOBS ─────────────────────────── */

const BLOB_CONFIGS = [
  { size: 320, color: "rgba(253,186,116,0.25)", top: "5%", left: "-5%", radius: "30% 70% 60% 40% / 50% 60% 70% 40%", duration: 18, depth: 0.3 },
  { size: 260, color: "rgba(134,239,172,0.2)", top: "15%", right: "-3%", radius: "60% 40% 30% 70% / 40% 50% 60% 50%", duration: 22, depth: 0.5 },
  { size: 200, color: "rgba(254,243,199,0.35)", top: "60%", left: "10%", radius: "50% 50% 40% 60% / 60% 40% 50% 50%", duration: 20, depth: 0.4 },
  { size: 280, color: "rgba(253,186,116,0.15)", top: "40%", right: "5%", radius: "40% 60% 70% 30% / 50% 60% 40% 60%", duration: 24, depth: 0.6 },
  { size: 180, color: "rgba(134,239,172,0.25)", top: "75%", left: "60%", radius: "70% 30% 50% 50% / 40% 60% 50% 60%", duration: 16, depth: 0.2 },
  { size: 240, color: "rgba(254,243,199,0.3)", top: "25%", left: "40%", radius: "45% 55% 65% 35% / 55% 45% 35% 65%", duration: 19, depth: 0.35 },
  { size: 150, color: "rgba(253,186,116,0.2)", top: "85%", left: "25%", radius: "55% 45% 35% 65% / 45% 55% 65% 35%", duration: 21, depth: 0.45 },
  { size: 190, color: "rgba(134,239,172,0.15)", top: "10%", left: "65%", radius: "35% 65% 55% 45% / 65% 35% 45% 55%", duration: 17, depth: 0.55 },
];

function FloatingBlob({ config, mouseX, mouseY }: {
  config: typeof BLOB_CONFIGS[0];
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  const x = useTransform(mouseX, [-1, 1], [-20 * config.depth, 20 * config.depth]);
  const y = useTransform(mouseY, [-1, 1], [-15 * config.depth, 15 * config.depth]);
  const springX = useSpring(x as MotionValue<number>, { stiffness: 40, damping: 25 });
  const springY = useSpring(y as MotionValue<number>, { stiffness: 40, damping: 25 });

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const scaledSize = isMobile ? config.size * 0.5 : config.size;

  const posStyle: React.CSSProperties = {
    position: "absolute",
    width: scaledSize,
    height: scaledSize,
    borderRadius: config.radius,
    background: config.color,
    ...(config.top !== undefined && { top: config.top }),
    ...(config.left !== undefined && { left: config.left }),
    ...("right" in config && config.right !== undefined && { right: config.right }),
  };

  return (
    <motion.div
      style={{ ...posStyle, x: springX, y: springY }}
      animate={{
        rotate: [-2, 2, -1.5, 2.5, -2],
        scale: [1, 1.04, 0.98, 1.02, 1],
      }}
      transition={{
        duration: config.duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/* ─────────────────────────── LEAF PARTICLES ─────────────────────────── */

function LeafParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 7 }, (_, i) => ({
      id: i,
      left: 10 + Math.random() * 80,
      size: 4 + Math.random() * 6,
      delay: Math.random() * 8,
      duration: 10 + Math.random() * 8,
      opacity: 0.15 + Math.random() * 0.25,
    })), []);

  return (
    <div className="pomar-leaf-particles">
      {particles.map(p => (
        <motion.div
          key={p.id}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: "-5%",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: `rgba(134, 239, 172, ${p.opacity})`,
            pointerEvents: "none",
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, Math.sin(p.id) * 60, Math.cos(p.id) * 40, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────── LEAF TOOLTIP ─────────────────────────── */

function LeafTooltip({ text, visible }: { text: string; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="tooltip"
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 5, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          style={{
            position: "absolute",
            bottom: "calc(100% + 14px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#ECFDF5",
            border: "1px solid rgba(134,239,172,0.3)",
            borderRadius: "16px 16px 16px 4px",
            padding: "12px 16px",
            color: "#92400E",
            fontSize: 13,
            lineHeight: 1.5,
            fontFamily: "'Inter', sans-serif",
            maxWidth: 260,
            minWidth: 200,
            textAlign: "left",
            zIndex: 20,
            boxShadow: "0 4px 16px rgba(5,150,105,0.08)",
            pointerEvents: "none",
          }}
        >
          {text}
          {/* Stem pointer */}
          <div style={{
            position: "absolute",
            bottom: -8,
            left: "50%",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderTop: "8px solid #ECFDF5",
          }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────── MAIN COMPONENT ─────────────────────────── */

export default function PomarPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });

  const heroRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width * 2 - 1);
    mouseY.set((e.clientY - rect.top) / rect.height * 2 - 1);
  }, [mouseX, mouseY]);

  const { scrollYProgress } = useScroll();
  const heroParallax = useTransform(scrollYProgress, [0, 0.3], [0, -100]);

  /* Impact section */
  const impactRef = useRef(null);
  const impactInView = useInView(impactRef, { once: true, margin: "-100px" });
  const c1 = useCountUp(110, 2000, impactInView);
  const c2 = useCountUp(17, 1800, impactInView);
  const c3 = useCountUp(9, 1600, impactInView);
  const c4 = useCountUp(40, 1900, impactInView);

  /* Mission counter */
  const missionRef = useRef(null);
  const missionInView = useInView(missionRef, { once: true, margin: "-100px" });
  const missionCount = useCountUp(110, 2500, missionInView);

  const navLinks = ["História", "Projetos", "Impacto", "Apoiar"];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleFormChange = (field: string, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      {/* Fonts & Reset */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700&family=Inter:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; overflow-x: hidden; }
        body { font-family: 'Inter', sans-serif; color: #4B5563; overflow-x: hidden; font-size: clamp(14px, 1vw, 16px); }
        @media (max-width: 768px) {
          .pomar-leaf-particles { display: none !important; }
        }
        ::selection { background: #FDE68A; color: #78350F; }
        @keyframes sway {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes gradientPulse {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #FFFBEB 0%, #FEF3C7 40%, #ECFDF5 100%)",
      }}>

        {/* ═══════════════════════════ SECTION 1: NAVBAR ═══════════════════════════ */}
        <motion.nav
          aria-label="Navegacao principal"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            position: "fixed",
            top: 16,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
            width: "min(90%, 900px)",
            padding: "12px 24px",
            borderRadius: 9999,
            background: "rgba(255,251,235,0.8)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 4px 30px rgba(146,64,14,0.06), 0 1px 3px rgba(0,0,0,0.04)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "1px solid rgba(253,186,116,0.25)",
          }}
        >
          {/* Logo */}
          <div
            role="button"
            tabIndex={0}
            aria-label="Voltar ao topo"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: 20,
              color: "#78350F",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              minHeight: 44,
              WebkitTapHighlightColor: "transparent",
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); } }}
          >
            descomplic
            <span style={{
              background: "linear-gradient(135deg, #92400E, #FDBA74, #86EFAC)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>ai</span>
            <span style={{ fontSize: 14 }}>🌱</span>
          </div>

          {/* Desktop Links */}
          <div style={{ display: "flex", gap: 28, alignItems: "center" }} className="pomar-nav-desktop">
            <style>{`
              @media (max-width: 768px) { .pomar-nav-desktop { display: none !important; } }
              @media (min-width: 769px) { .pomar-mobile-btn { display: none !important; } }
            `}</style>
            {navLinks.map(link => (
              <button
                type="button"
                key={link}
                onClick={() => scrollTo(link.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))}
                aria-label={`Navegar para ${link}`}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500,
                  color: "#78350F", transition: "color 0.2s", opacity: 0.7,
                  minHeight: 44, minWidth: 44, display: "inline-flex", alignItems: "center",
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.color = "#059669"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "0.7"; e.currentTarget.style.color = "#78350F"; }}
              >
                {link}
              </button>
            ))}
            <button
              type="button"
              onClick={() => scrollTo("apoiar")}
              aria-label="Navegar para Fazer parte"
              style={{
                background: "linear-gradient(135deg, #059669, #10B981)",
                color: "white",
                border: "none",
                borderRadius: 9999,
                padding: "8px 20px",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                transition: "transform 0.2s, box-shadow 0.2s",
                boxShadow: "0 2px 10px rgba(5,150,105,0.25)",
                minHeight: 44,
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(5,150,105,0.35)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 2px 10px rgba(5,150,105,0.25)"; }}
            >
              Fazer parte
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="pomar-mobile-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
            role="button"
            style={{
              background: "none", border: "none", cursor: "pointer",
              width: 44, height: 44, display: "flex", flexDirection: "column",
              justifyContent: "center", alignItems: "center", gap: 5,
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <motion.span animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 7 : 0 }}
              style={{ display: "block", width: 20, height: 2, background: "#78350F", borderRadius: 2 }} />
            <motion.span animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
              style={{ display: "block", width: 20, height: 2, background: "#78350F", borderRadius: 2 }} />
            <motion.span animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -7 : 0 }}
              style={{ display: "block", width: 20, height: 2, background: "#78350F", borderRadius: 2 }} />
          </button>
        </motion.nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                position: "fixed", top: 80, left: "5%", right: "5%", zIndex: 999,
                background: "rgba(255,251,235,0.95)", backdropFilter: "blur(20px)",
                borderRadius: 24, padding: "24px 32px",
                boxShadow: "0 10px 40px rgba(146,64,14,0.1)",
                display: "flex", flexDirection: "column", gap: 16,
              }}
            >
              {navLinks.map(link => (
                <button
                  type="button"
                  key={link}
                  onClick={() => scrollTo(link.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))}
                  aria-label={`Navegar para ${link}`}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    fontSize: 18, fontWeight: 600, color: "#78350F",
                    fontFamily: "'Playfair Display', serif", textAlign: "left",
                    padding: "12px 0", minHeight: 44, borderBottom: "1px solid rgba(253,186,116,0.2)",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  {link}
                </button>
              ))}
              <button
                type="button"
                onClick={() => scrollTo("apoiar")}
                aria-label="Navegar para Fazer parte"
                style={{
                  background: "linear-gradient(135deg, #059669, #10B981)",
                  color: "white", border: "none", borderRadius: 12,
                  padding: "14px", fontSize: 16, fontWeight: 600, cursor: "pointer",
                  fontFamily: "'Inter', sans-serif", marginTop: 8, minHeight: 44,
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                Fazer parte
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══════════════════════════ SECTION 2: HERO ═══════════════════════════ */}
        <motion.section
          ref={heroRef}
          onMouseMove={handleMouseMove}
          style={{
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            padding: "120px 24px 80px",
            y: heroParallax,
          }}
        >
          {/* Floating blobs */}
          {BLOB_CONFIGS.map((config, i) => (
            <FloatingBlob key={i} config={config} mouseX={mouseX} mouseY={mouseY} />
          ))}

          {/* Leaf particles */}
          <LeafParticles />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: 800 }}
          >
            {/* Small tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                display: "inline-block",
                padding: "6px 16px",
                borderRadius: 9999,
                background: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(134,239,172,0.3)",
                color: "#059669",
                fontSize: 13,
                fontWeight: 500,
                marginBottom: 32,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              110+ projetos gratuitos
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(42px, 8vw, 80px)",
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: 24,
                color: "#78350F",
              }}
            >
              Olha o que estou a{" "}
              <span style={{
                background: "linear-gradient(135deg, #92400E, #FDBA74, #86EFAC)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                cultivar.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                color: "#78350F",
                maxWidth: 600,
                margin: "0 auto 16px",
                lineHeight: 1.2,
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontStyle: "italic",
              }}
            >
              Vem.
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              style={{
                fontSize: "clamp(16px, 2.5vw, 22px)",
                color: "#92400E",
                maxWidth: 600,
                margin: "0 auto 40px",
                lineHeight: 1.6,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                opacity: 0.8,
              }}
            >
              110+ projetos gratuitos. Cada um plantado com cuidado. Isto é só o começo.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}
            >
              <button
                type="button"
                onClick={() => scrollTo("projetos")}
                aria-label="Explorar o pomar de projetos"
                style={{
                  background: "linear-gradient(135deg, #92400E, #B45309)",
                  color: "white",
                  border: "none",
                  borderRadius: 9999,
                  padding: "14px 32px",
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  boxShadow: "0 4px 20px rgba(146,64,14,0.25)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  minHeight: 44,
                  WebkitTapHighlightColor: "transparent",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(146,64,14,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(146,64,14,0.25)"; }}
              >
                Explorar o pomar
              </button>
              <button
                type="button"
                onClick={() => scrollTo("apoiar")}
                aria-label="Fazer parte do projeto"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  color: "#059669",
                  border: "1px solid rgba(5,150,105,0.25)",
                  borderRadius: 9999,
                  padding: "14px 32px",
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  backdropFilter: "blur(10px)",
                  transition: "transform 0.2s, background 0.2s",
                  minHeight: 44,
                  WebkitTapHighlightColor: "transparent",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.background = "rgba(255,255,255,0.9)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "rgba(255,255,255,0.7)"; }}
              >
                Fazer parte
              </button>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            style={{
              position: "absolute",
              bottom: 40,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 12, color: "#92400E", opacity: 0.5, fontFamily: "'Inter', sans-serif" }}>
              scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: 24,
                height: 36,
                borderRadius: 12,
                border: "2px solid rgba(146,64,14,0.2)",
                display: "flex",
                justifyContent: "center",
                paddingTop: 6,
              }}
            >
              <motion.div
                animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  width: 4,
                  height: 8,
                  borderRadius: 2,
                  background: "rgba(146,64,14,0.3)",
                }}
              />
            </motion.div>
          </motion.div>
        </motion.section>

        {/* ═══════════════════════════ SECTION 3: MISSÃO ═══════════════════════════ */}
        <section
          id="historia"
          style={{
            padding: "100px 24px",
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          <motion.div
            ref={missionRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 40,
            }}
          >
            {/* Section label */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}>
              <div style={{
                width: 4,
                height: 28,
                borderRadius: 2,
                background: "linear-gradient(180deg, #059669, #86EFAC)",
              }} />
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#059669",
              }}>
                A nossa história
              </span>
            </div>

            {/* Pull quote */}
            <div style={{
              borderLeft: "4px solid #059669",
              paddingLeft: 32,
              paddingTop: 8,
              paddingBottom: 8,
            }}>
              <motion.blockquote
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(24px, 4vw, 36px)",
                  fontWeight: 700,
                  fontStyle: "italic",
                  color: "#78350F",
                  lineHeight: 1.4,
                  marginBottom: 16,
                }}
              >
                &ldquo;A melhor coisa que construí hoje vai ajudar alguém que nunca vou conhecer.&rdquo;
              </motion.blockquote>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: "#92400E",
                opacity: 0.6,
              }}>
                — Jaime Silva, criador do Descomplicai
              </p>
            </div>

            {/* Body text + counter */}
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 40,
              alignItems: "flex-start",
            }}>
              <div style={{ flex: "1 1 400px" }}>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: "#4B5563",
                  marginBottom: 20,
                }}>
                  Grátis para ti. Mas não grátis de fazer. Cada projeto nasce de horas de trabalho, servidores e ferramentas.
                  Faço-o porque resolver problemas é o que me faz feliz.
                </p>
              </div>

              {/* Counter */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                style={{
                  flex: "0 0 auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "32px 40px",
                  background: "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 24,
                  border: "1px solid rgba(134,239,172,0.2)",
                }}
              >
                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 64,
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #059669, #86EFAC)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1,
                }}>
                  {missionCount}+
                </span>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: "#92400E",
                  marginTop: 8,
                  opacity: 0.7,
                }}>
                  projetos e a contar
                </span>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ═══════════════════════════ SECTION 4: PROJETOS — Frutos na Árvore ═══════════════════════════ */}
        <section
          id="projetos"
          style={{
            padding: "80px 24px 100px",
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: 56 }}
          >
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 16,
            }}>
              <div style={{
                width: 4,
                height: 28,
                borderRadius: 2,
                background: "linear-gradient(180deg, #059669, #86EFAC)",
              }} />
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#059669",
              }}>
                Frutos na árvore
              </span>
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 5vw, 44px)",
              fontWeight: 800,
              color: "#78350F",
              marginBottom: 12,
            }}>
              Projetos significativos
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              color: "#4B5563",
              maxWidth: 500,
              margin: "0 auto",
              lineHeight: 1.6,
            }}>
              Cada fruto foi cultivado com atenção, desde a semente até à colheita.
            </p>
          </motion.div>

          {/* 2x3 Grid */}
          <div
            className="pomar-projects-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 24,
              maxWidth: 900,
              margin: "0 auto",
            }}
          >
            <style>{`
              @media (max-width: 599px) {
                .pomar-projects-grid { grid-template-columns: 1fr !important; }
              }
              @media (min-width: 600px) and (max-width: 1023px) {
                .pomar-projects-grid { grid-template-columns: repeat(2, 1fr) !important; }
              }
              @media (min-width: 1024px) {
                .pomar-projects-grid { grid-template-columns: repeat(3, 1fr) !important; }
              }
            `}</style>
            {FEATURED_PROJECTS.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                onMouseEnter={() => setHoveredProject(project.name)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => setHoveredProject(hoveredProject === project.name ? null : project.name)}
                role="button"
                tabIndex={0}
                aria-label={`${project.name} - ${project.category}. Toca para ver detalhes.`}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setHoveredProject(hoveredProject === project.name ? null : project.name); } }}
                style={{
                  position: "relative",
                  background: "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 16,
                  padding: "28px 24px",
                  borderLeft: "4px solid #059669",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                  cursor: "pointer",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  WebkitTapHighlightColor: "transparent",
                }}
                whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(5,150,105,0.1)" }}
              >
                {/* Leaf Tooltip */}
                <LeafTooltip text={project.description} visible={hoveredProject === project.name} />

                {/* SVG */}
                <div style={{ marginBottom: 16 }}>
                  <ProjectSVG id={project.svgId} />
                </div>

                {/* Name */}
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#78350F",
                  marginBottom: 8,
                }}>
                  {project.name}
                </h3>

                {/* Category badge */}
                <span style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  borderRadius: 9999,
                  background: "rgba(5,150,105,0.08)",
                  color: "#059669",
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: "'Inter', sans-serif",
                }}>
                  {project.category}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════ SECTION 5: IMPACTO ═══════════════════════════ */}
        <section
          id="impacto"
          ref={impactRef}
          style={{
            padding: "80px 24px 100px",
            maxWidth: 1000,
            margin: "0 auto",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: 56 }}
          >
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 16,
            }}>
              <div style={{
                width: 4,
                height: 28,
                borderRadius: 2,
                background: "linear-gradient(180deg, #92400E, #FDBA74)",
              }} />
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#92400E",
              }}>
                Impacto real
              </span>
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 5vw, 44px)",
              fontWeight: 800,
              color: "#78350F",
            }}>
              Números que importam
            </h2>
          </motion.div>

          {/* Stats Grid */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 24,
          }}>
            {IMPACT_STATS.map((stat, i) => {
              const counts = [c1, c2, c3, c4, 0];
              const displayValue = i === 4 ? `${stat.value}${stat.suffix}` : `${counts[i]}${stat.suffix}`;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  style={{
                    flex: "1 1 140px",
                    minWidth: 140,
                    maxWidth: 200,
                    padding: "24px 16px",
                    background: "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(10px)",
                    borderRadius: 20,
                    textAlign: "center",
                    border: "1px solid rgba(253,186,116,0.15)",
                  }}
                >
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 40,
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #92400E, #FDBA74)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    lineHeight: 1.1,
                    marginBottom: 8,
                  }}>
                    {displayValue}
                  </div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    color: "#6B7280",
                    lineHeight: 1.4,
                  }}>
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════ SECTION 6: COMO APOIAR ═══════════════════════════ */}
        <section
          id="apoiar"
          style={{
            padding: "80px 24px 100px",
            maxWidth: 1000,
            margin: "0 auto",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: 56 }}
          >
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 16,
            }}>
              <div style={{
                width: 4,
                height: 28,
                borderRadius: 2,
                background: "linear-gradient(180deg, #059669, #86EFAC)",
              }} />
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#059669",
              }}>
                FAZER PARTE
              </span>
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 5vw, 44px)",
              fontWeight: 800,
              marginBottom: 12,
            }}>
              <span style={{
                background: "linear-gradient(135deg, #92400E, #FDBA74, #86EFAC)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Vem para a viagem
              </span>
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              color: "#4B5563",
              maxWidth: 560,
              margin: "0 auto",
              lineHeight: 1.6,
            }}>
              Os projetos são sempre gratuitos. Isto é para quem quer estar mais perto do processo.
            </p>
          </motion.div>

          {/* Tiers */}
          <div
            className="pomar-tiers-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
              maxWidth: 900,
              margin: "0 auto",
            }}
          >
            <style>{`
              @media (max-width: 599px) {
                .pomar-tiers-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
              }
              @media (min-width: 900px) {
                .pomar-tiers-grid { grid-template-columns: repeat(3, 1fr) !important; }
              }
            `}</style>
            {SUPPORT_TIERS.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                style={{
                  position: "relative",
                  background: "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 20,
                  padding: tier.highlighted ? "36px 28px" : "32px 28px",
                  border: tier.highlighted
                    ? "2px solid transparent"
                    : "1px solid rgba(253,186,116,0.15)",
                  boxShadow: tier.highlighted
                    ? "0 8px 32px rgba(5,150,105,0.12)"
                    : "0 2px 12px rgba(0,0,0,0.03)",
                  overflow: "hidden",
                  transition: "transform 0.3s",
                }}
                whileHover={{ y: -4 }}
              >
                {/* Popular badge */}
                {"badge" in tier && tier.badge && (
                  <div style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    padding: "4px 12px",
                    borderRadius: 9999,
                    background: "linear-gradient(135deg, #059669, #10B981)",
                    color: "white",
                    fontSize: 11,
                    fontWeight: 700,
                    fontFamily: "'Inter', sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    zIndex: 2,
                  }}>
                    {tier.badge}
                  </div>
                )}

                {/* Highlighted tier — animated gradient border */}
                {tier.highlighted && (
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 20,
                    padding: 2,
                    background: "linear-gradient(135deg, #059669, #86EFAC, #059669, #86EFAC)",
                    backgroundSize: "300% 300%",
                    animation: "gradientPulse 4s ease infinite",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    pointerEvents: "none",
                  }} />
                )}

                {/* Wood-grain texture border (subtle) */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 20,
                  background: `repeating-linear-gradient(
                    90deg,
                    rgba(146,64,14,0.03) 0px,
                    transparent 1px,
                    transparent 4px
                  )`,
                  pointerEvents: "none",
                }} />

                {/* Content */}
                <div style={{ position: "relative", zIndex: 1 }}>
                  {/* Emoji + Name */}
                  <div style={{
                    fontSize: 36,
                    marginBottom: 12,
                  }}>
                    {tier.emoji}
                  </div>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 24,
                    fontWeight: 700,
                    color: "#78350F",
                    marginBottom: 4,
                  }}>
                    {tier.name}
                  </h3>

                  {/* Price */}
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 32,
                    fontWeight: 800,
                    color: "#92400E",
                    marginBottom: 8,
                  }}>
                    {tier.price}
                    {tier.period && (
                      <span style={{
                        fontSize: 14,
                        fontWeight: 400,
                        color: "#6B7280",
                        fontFamily: "'Inter', sans-serif",
                      }}>
                        {tier.period}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    color: "#6B7280",
                    marginBottom: 20,
                    lineHeight: 1.5,
                  }}>
                    {tier.description}
                  </p>

                  {/* Features */}
                  <ul style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginBottom: 24,
                  }}>
                    {tier.features.map(f => (
                      <li key={f} style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 14,
                        color: "#4B5563",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}>
                        <span style={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          background: "rgba(5,150,105,0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 10,
                          color: "#059669",
                          flexShrink: 0,
                        }}>
                          ✓
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    type="button"
                    aria-label={tier.cta}
                    style={{
                      width: "100%",
                      padding: "14px",
                      borderRadius: 12,
                      border: tier.highlighted ? "none" : "1px solid rgba(5,150,105,0.2)",
                      background: tier.highlighted
                        ? "linear-gradient(135deg, #059669, #10B981)"
                        : "transparent",
                      color: tier.highlighted ? "white" : "#059669",
                      fontSize: 15,
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "'Inter', sans-serif",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      boxShadow: tier.highlighted ? "0 4px 16px rgba(5,150,105,0.2)" : "none",
                      minHeight: 44,
                      WebkitTapHighlightColor: "transparent",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                  >
                    {tier.cta}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{
              textAlign: "center",
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              color: "#6B7280",
              marginTop: 40,
              fontStyle: "italic",
              lineHeight: 1.6,
            }}
          >
            Partilhar o projeto com alguém é tão valioso como qualquer contribuição.
          </motion.p>
        </section>

        {/* ═══════════════════════════ SECTION 7: VISÃO ═══════════════════════════ */}
        <section style={{
          padding: "80px 24px 100px",
          maxWidth: 800,
          margin: "0 auto",
          textAlign: "center",
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(32px, 6vw, 56px)",
                fontWeight: 700,
                fontStyle: "italic",
                color: "#78350F",
                lineHeight: 1.3,
                marginBottom: 24,
              }}
            >
              Isto é só o{" "}
              <span style={{
                background: "linear-gradient(135deg, #92400E, #FDBA74, #86EFAC)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                começo.
              </span>
            </motion.h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 18,
              color: "#4B5563",
              maxWidth: 600,
              margin: "0 auto",
              lineHeight: 1.7,
            }}>
              Se gostas do que vês, há mais a caminho.
            </p>

            {/* Decorative divider */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              marginTop: 40,
            }}>
              <div style={{ width: 40, height: 1, background: "rgba(146,64,14,0.15)" }} />
              <span style={{ color: "#86EFAC", fontSize: 18 }}>🌿</span>
              <div style={{ width: 40, height: 1, background: "rgba(146,64,14,0.15)" }} />
            </div>
          </motion.div>
        </section>

        {/* ═══════════════════════════ SECTION 8: CONTACTO + FOOTER ═══════════════════════════ */}
        <section
          id="contacto"
          style={{
            padding: "80px 24px 40px",
            maxWidth: 700,
            margin: "0 auto",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: 48 }}
          >
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 5vw, 40px)",
              fontWeight: 800,
              color: "#78350F",
              marginBottom: 12,
            }}>
              Uma conversa começa com uma semente
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              color: "#4B5563",
              lineHeight: 1.6,
            }}>
              Partilha as tuas ideias, sugestões ou simplesmente diz olá.
            </p>
          </motion.div>

          {/* Contact links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 16,
              marginBottom: 40,
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "Email", href: "mailto:hello@descomplicai.pt", icon: "📧" },
              { label: "GitHub", href: "https://github.com/descomplicai", icon: "🐙" },
              { label: "LinkedIn", href: "https://linkedin.com/in/jaimesilva", icon: "💼" },
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Contactar via ${link.label}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 20px",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(253,186,116,0.15)",
                  color: "#78350F",
                  textDecoration: "none",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  minHeight: 44,
                  WebkitTapHighlightColor: "transparent",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
              >
                <span>{link.icon}</span>
                {link.label}
              </a>
            ))}
          </motion.div>

          {/* Contact form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            onSubmit={e => e.preventDefault()}
            style={{
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(10px)",
              borderRadius: 20,
              padding: "32px",
              border: "1px solid rgba(253,186,116,0.15)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div className="pomar-form-row" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <style>{`
                @media (max-width: 599px) {
                  .pomar-form-row { flex-direction: column !important; }
                  .pomar-form-row input { flex: 1 1 100% !important; width: 100% !important; }
                  .pomar-form-submit { align-self: stretch !important; width: 100% !important; }
                }
              `}</style>
              <input
                type="text"
                placeholder="O teu nome"
                value={contactForm.name}
                onChange={e => handleFormChange("name", e.target.value)}
                aria-label="O teu nome"
                autoComplete="name"
                style={{
                  flex: "1 1 200px",
                  padding: "14px 16px",
                  borderRadius: 12,
                  border: "1px solid rgba(253,186,116,0.2)",
                  background: "rgba(255,251,235,0.5)",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 16,
                  color: "#78350F",
                  outline: "none",
                  transition: "border-color 0.2s",
                  minHeight: 44,
                }}
                onFocus={e => e.currentTarget.style.borderColor = "rgba(5,150,105,0.4)"}
                onBlur={e => e.currentTarget.style.borderColor = "rgba(253,186,116,0.2)"}
              />
              <input
                type="email"
                placeholder="O teu email"
                value={contactForm.email}
                onChange={e => handleFormChange("email", e.target.value)}
                aria-label="O teu email"
                autoComplete="email"
                style={{
                  flex: "1 1 200px",
                  padding: "14px 16px",
                  borderRadius: 12,
                  border: "1px solid rgba(253,186,116,0.2)",
                  background: "rgba(255,251,235,0.5)",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 16,
                  color: "#78350F",
                  outline: "none",
                  transition: "border-color 0.2s",
                  minHeight: 44,
                }}
                onFocus={e => e.currentTarget.style.borderColor = "rgba(5,150,105,0.4)"}
                onBlur={e => e.currentTarget.style.borderColor = "rgba(253,186,116,0.2)"}
              />
            </div>
            <textarea
              placeholder="A tua mensagem..."
              value={contactForm.message}
              onChange={e => handleFormChange("message", e.target.value)}
              aria-label="A tua mensagem"
              rows={4}
              style={{
                padding: "14px 16px",
                borderRadius: 12,
                border: "1px solid rgba(253,186,116,0.2)",
                background: "rgba(255,251,235,0.5)",
                fontFamily: "'Inter', sans-serif",
                fontSize: 16,
                color: "#78350F",
                outline: "none",
                resize: "vertical",
                transition: "border-color 0.2s",
                minHeight: 120,
              }}
              onFocus={e => e.currentTarget.style.borderColor = "rgba(5,150,105,0.4)"}
              onBlur={e => e.currentTarget.style.borderColor = "rgba(253,186,116,0.2)"}
            />
            <button
              type="submit"
              aria-label="Enviar mensagem de contacto"
              className="pomar-form-submit"
              style={{
                alignSelf: "flex-end",
                padding: "14px 32px",
                borderRadius: 12,
                border: "none",
                background: "linear-gradient(135deg, #92400E, #B45309)",
                color: "white",
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                transition: "transform 0.2s, box-shadow 0.2s",
                boxShadow: "0 4px 16px rgba(146,64,14,0.2)",
                minHeight: 44,
                WebkitTapHighlightColor: "transparent",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(146,64,14,0.3)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(146,64,14,0.2)"; }}
            >
              Enviar mensagem
            </button>
          </motion.form>
        </section>

        {/* Footer */}
        <footer style={{
          padding: "48px 24px 32px",
          textAlign: "center",
          maxWidth: 700,
          margin: "0 auto",
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            marginBottom: 20,
          }}>
            <div style={{ width: 40, height: 1, background: "rgba(146,64,14,0.1)" }} />
            <span style={{ fontSize: 14 }}>🌱</span>
            <div style={{ width: 40, height: 1, background: "rgba(146,64,14,0.1)" }} />
          </div>

          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 16,
            fontStyle: "italic",
            color: "#92400E",
            opacity: 0.6,
            marginBottom: 16,
            lineHeight: 1.6,
          }}>
            Feito com cuidado, como tudo o que construo.
          </p>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            color: "#9CA3AF",
            lineHeight: 1.6,
          }}>
            Descomplicai &copy; {new Date().getFullYear()}. Todos os projetos, sempre gratuitos.
          </p>
        </footer>

      </div>
    </>
  );
}
