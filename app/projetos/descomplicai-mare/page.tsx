"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "framer-motion";

/* ─────────────────────────── DATA ─────────────────────────── */

const PROJECTS = [
  {
    name: "Chess",
    category: "Jogo",
    description: "Xadrez completo no browser com IA adversária.",
    balloon: "Provei que se pode construir um jogo completo no browser, grátis.",
    link: "/projetos/chess",
    svg: "chess",
  },
  {
    name: "Bijou Restaurante",
    category: "Website",
    description: "Fine dining com presença digital elegante.",
    balloon: "Um restaurante local que nunca teria website. Agora tem presença digital profissional.",
    link: "/projetos/bijou-restaurante",
    svg: "bijou",
  },
  {
    name: "Fractal Explorer",
    category: "Experiência",
    description: "Mandelbrot e Julia com zoom infinito.",
    balloon: "Matemática pura transformada em arte interactiva. Educação sem barreiras.",
    link: "/projetos/fractal-explorer",
    svg: "fractal",
  },
  {
    name: "DentalKid",
    category: "Website",
    description: "Clínica infantil acessível para pais.",
    balloon: "Uma clínica infantil com website acessível para pais. Saúde sem barreiras digitais.",
    link: "/projetos/dentalkid",
    svg: "dental",
  },
  {
    name: "Synth",
    category: "Ferramenta",
    description: "Sintetizador polifónico profissional.",
    balloon: "Um sintetizador profissional no browser. Música para quem não pode comprar software.",
    link: "/projetos/synth",
    svg: "synth",
  },
  {
    name: "Solar System",
    category: "Experiência",
    description: "Sistema solar interativo e explorável.",
    balloon: "O universo inteiro, explorável por qualquer criança com internet.",
    link: "/projetos/solar-system",
    svg: "solar",
  },
];

const STATS = [
  { value: 110, suffix: "+", label: "Projetos criados" },
  { value: 17, suffix: "", label: "Restaurantes digitalizados" },
  { value: 9, suffix: "", label: "Clínicas com website" },
  { value: 40, suffix: "+", label: "Ferramentas gratuitas" },
  { value: 0, suffix: "€", label: "Cobrado a utilizadores" },
];

const TIERS = [
  {
    name: "Estrela",
    emoji: "\u2B50",
    price: "5\u20AC/m\u00EAs",
    tagline: "O teu nome na constela\u00E7\u00E3o",
    perks: ["Mural de apoiantes", "Updates behind-the-scenes", "Badge Apoiante Estrela"],
    cta: "Juntar-me como Estrela",
    style: "outline" as const,
    popular: false,
  },
  {
    name: "Sol",
    emoji: "\u2600\uFE0F",
    price: "15\u20AC/m\u00EAs",
    tagline: "Ilumina o caminho",
    perks: ["Tudo da Estrela", "Newsletter exclusiva mensal", "Acesso antecipado a ferramentas", "Templates e recursos premium"],
    cta: "Juntar-me como Sol",
    style: "solid" as const,
    popular: true,
    badge: "Mais Popular",
  },
  {
    name: "Horizonte",
    emoji: "\uD83C\uDF05",
    price: "30\u20AC/m\u00EAs",
    tagline: "Transforma a paisagem",
    perks: ["Tudo do Sol", "Sess\u00E3o de mentoria 1:1 mensal (30min)", "Input direto em novos projetos", "Cr\u00E9dito permanente no site", "Convite para eventos"],
    cta: "Juntar-me como Horizonte",
    style: "gradient" as const,
    popular: false,
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

/* ─────────────────────────── FLOATING SHAPES ─────────────────────────── */

function FloatingShape({
  style,
  mouseX,
  mouseY,
  depth,
}: {
  style: React.CSSProperties;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  depth: number;
}) {
  const x = useTransform(mouseX, [-1, 1], [-30 * depth, 30 * depth]);
  const y = useTransform(mouseY, [-1, 1], [-20 * depth, 20 * depth]);
  const springX = useSpring(x as MotionValue<number>, { stiffness: 50, damping: 20 });
  const springY = useSpring(y as MotionValue<number>, { stiffness: 50, damping: 20 });

  return (
    <motion.div
      style={{
        position: "absolute",
        borderRadius: "50%",
        ...style,
        x: springX,
        y: springY,
      }}
      animate={{
        y: [0, -12, 0, 8, 0],
        x: [0, 15, -10, 20, 0],
        rotate: [0, 3, -2, 5, 0],
      }}
      transition={{
        duration: 10 + depth * 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/* ─────────────────────────── SVG ILLUSTRATIONS ─────────────────────────── */

function ProjectSVG({ type }: { type: string }) {
  const size = 80;
  switch (type) {
    case "chess":
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
          {/* 4x4 board */}
          {[0, 1, 2, 3].map(row =>
            [0, 1, 2, 3].map(col => (
              <rect
                key={`${row}-${col}`}
                x={12 + col * 14}
                y={16 + row * 14}
                width={14}
                height={14}
                fill={(row + col) % 2 === 0 ? "#CCFBF1" : "white"}
                stroke="rgba(13,148,136,0.2)"
                strokeWidth={0.5}
              />
            ))
          )}
          {/* Pawn */}
          <circle cx={40} cy={28} r={5} fill="#0D9488" />
          <path d="M35 38 L45 38 L43 33 L37 33 Z" fill="#0D9488" />
          <rect x={34} y={38} width={12} height={3} rx={1} fill="#0D9488" />
        </svg>
      );
    case "bijou":
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
          {/* Plate */}
          <circle cx={40} cy={42} r={24} stroke="#0D9488" strokeWidth={2} fill="white" />
          <circle cx={40} cy={42} r={18} stroke="rgba(13,148,136,0.3)" strokeWidth={1} fill="none" />
          {/* Fork */}
          <line x1={22} y1={20} x2={22} y2={52} stroke="#0D9488" strokeWidth={2} strokeLinecap="round" />
          <line x1={19} y1={20} x2={19} y2={30} stroke="#0D9488" strokeWidth={1.5} strokeLinecap="round" />
          <line x1={25} y1={20} x2={25} y2={30} stroke="#0D9488" strokeWidth={1.5} strokeLinecap="round" />
          {/* Knife */}
          <line x1={58} y1={20} x2={58} y2={52} stroke="#0D9488" strokeWidth={2} strokeLinecap="round" />
          <path d="M56 20 Q58 16 60 20 L60 32 Q58 34 56 32 Z" fill="#0D9488" opacity={0.3} />
        </svg>
      );
    case "fractal":
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
          <rect x={22} y={22} width={36} height={36} rx={2} stroke="#0D9488" strokeWidth={2} fill="none" transform="rotate(0 40 40)" />
          <rect x={22} y={22} width={36} height={36} rx={2} stroke="#0EA5E9" strokeWidth={1.5} fill="none" transform="rotate(15 40 40)" opacity={0.7} />
          <rect x={22} y={22} width={36} height={36} rx={2} stroke="#FB923C" strokeWidth={1} fill="none" transform="rotate(30 40 40)" opacity={0.5} />
        </svg>
      );
    case "dental":
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
          {/* Tooth shape */}
          <path
            d="M30 30 Q30 18 38 18 Q40 22 42 18 Q50 18 50 30 Q50 42 46 55 Q44 60 40 55 Q36 60 34 55 Q30 42 30 30Z"
            fill="white"
            stroke="#0D9488"
            strokeWidth={2}
          />
          <path
            d="M34 28 Q37 32 40 28 Q43 32 46 28"
            stroke="#0EA5E9"
            strokeWidth={1.5}
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      );
    case "synth":
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
          {[0, 1, 2, 3, 4].map(i => {
            const heights = [28, 40, 20, 35, 24];
            const colors = ["#0D9488", "#0EA5E9", "#FB923C", "#0D9488", "#0EA5E9"];
            return (
              <rect
                key={i}
                x={20 + i * 10}
                y={55 - heights[i]}
                width={6}
                height={heights[i]}
                rx={3}
                fill={colors[i]}
                opacity={0.8}
              />
            );
          })}
        </svg>
      );
    case "solar":
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
          {/* Orbits */}
          <circle cx={40} cy={40} r={12} stroke="rgba(13,148,136,0.2)" strokeWidth={1} fill="none" />
          <circle cx={40} cy={40} r={20} stroke="rgba(14,165,233,0.2)" strokeWidth={1} fill="none" />
          <circle cx={40} cy={40} r={28} stroke="rgba(251,146,60,0.2)" strokeWidth={1} fill="none" />
          {/* Sun */}
          <circle cx={40} cy={40} r={6} fill="#FB923C" />
          {/* Planets */}
          <circle cx={52} cy={38} r={3} fill="#0D9488" />
          <circle cx={25} cy={48} r={2.5} fill="#0EA5E9" />
          <circle cx={60} cy={52} r={2} fill="#FB923C" opacity={0.7} />
          <circle cx={40} cy={12} r={1.8} fill="#0D9488" opacity={0.6} />
        </svg>
      );
    default:
      return null;
  }
}

/* ─────────────────────────── BALLOON TOOLTIP ─────────────────────────── */

function BalloonTooltip({
  children,
  message,
}: {
  children: React.ReactNode;
  message: string;
}) {
  const [show, setShow] = useState(false);

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={() => setShow(prev => !prev)}
    >
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              position: "absolute",
              bottom: "calc(100% + 16px)",
              left: "50%",
              transform: "translateX(-50%)",
              background: "white",
              borderRadius: 16,
              padding: "16px 20px",
              boxShadow: "0 8px 32px rgba(13,148,136,0.15)",
              borderBottom: "2px solid #0D9488",
              width: "min(280px, 90vw)",
              zIndex: 30,
              fontSize: 14,
              lineHeight: 1.6,
              color: "#4B5563",
              fontFamily: "'Inter', sans-serif",
              textAlign: "center",
            }}
          >
            {message}
            {/* Triangle pointer */}
            <div
              style={{
                position: "absolute",
                bottom: -8,
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderTop: "8px solid white",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
}

/* ─────────────────────────── MAIN COMPONENT ─────────────────────────── */

export default function MarePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
      mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
    },
    [mouseX, mouseY]
  );

  const { scrollYProgress } = useScroll();
  const heroParallax = useTransform(scrollYProgress, [0, 0.3], [0, -120]);

  /* Impact section */
  const impactRef = useRef(null);
  const impactInView = useInView(impactRef, { once: true, margin: "-100px" });
  const s0 = useCountUp(110, 2000, impactInView);
  const s1 = useCountUp(17, 1800, impactInView);
  const s2 = useCountUp(9, 1600, impactInView);
  const s3 = useCountUp(40, 1900, impactInView);
  const s4 = useCountUp(0, 500, impactInView);
  const statCounts = [s0, s1, s2, s3, s4];

  /* Mission counter */
  const missionRef = useRef(null);
  const missionInView = useInView(missionRef, { once: true, margin: "-100px" });
  const missionCount = useCountUp(110, 2500, missionInView);

  const navLinks = ["Missão", "Projetos", "Impacto", "Apoiar"];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const sectionIdFromLink = (link: string) =>
    link
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  return (
    <>
      {/* ─── Fonts & Global Styles ─── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Inter', sans-serif; color: #134E4A; overflow-x: hidden; }
        ::selection { background: #CCFBF1; color: #134E4A; }
        @keyframes waveFloat {
          0%, 100% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(15px) translateY(-5px); }
          50% { transform: translateX(-10px) translateY(3px); }
          75% { transform: translateX(20px) translateY(-8px); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .hero-ctas { flex-direction: column !important; align-items: center !important; }
          .mission-grid { grid-template-columns: 1fr !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .tiers-grid { grid-template-columns: 1fr !important; }
          .contact-row { flex-direction: column !important; gap: 12px !important; }
          .footer-inner { flex-direction: column !important; text-align: center !important; gap: 16px !important; }
          .vision-text { font-size: clamp(1.25rem, 4vw, 2rem) !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile-btn { display: none !important; }
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #F0FDFA 0%, #E0F2FE 40%, #F0F9FF 100%)",
        }}
      >
        {/* ═══════════════════════════════════════════════════════════
            SECTION 1 — NAVBAR
        ═══════════════════════════════════════════════════════════ */}
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            position: "fixed",
            top: 16,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 50,
            width: "min(90%, 900px)",
            padding: "12px 24px",
            borderRadius: 9999,
            background: "rgba(240,253,250,0.75)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow:
              "0 4px 30px rgba(13, 148, 136, 0.1), 0 1px 3px rgba(0,0,0,0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "1px solid rgba(13, 148, 136, 0.1)",
          }}
        >
          {/* Logo */}
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: 20,
              cursor: "pointer",
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            descomplic
            <span
              style={{
                background: "linear-gradient(135deg, #0D9488, #0EA5E9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ai
            </span>
          </div>

          {/* Desktop Links */}
          <div
            className="nav-desktop"
            style={{ display: "flex", gap: 28, alignItems: "center" }}
          >
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(sectionIdFromLink(link))}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#4B5563",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#0D9488")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#4B5563")}
              >
                {link}
              </button>
            ))}
            <button
              onClick={() => scrollTo("apoiar")}
              style={{
                background: "linear-gradient(135deg, #0D9488, #0EA5E9)",
                color: "white",
                border: "none",
                borderRadius: 9999,
                padding: "8px 20px",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                transition: "transform 0.2s, box-shadow 0.2s",
                boxShadow: "0 2px 10px rgba(13, 148, 136, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 4px 20px rgba(13, 148, 136, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 2px 10px rgba(13, 148, 136, 0.3)";
              }}
            >
              Apoiar
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="nav-mobile-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              width: 32,
              height: 32,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
            }}
          >
            <motion.span
              animate={{
                rotate: mobileMenuOpen ? 45 : 0,
                y: mobileMenuOpen ? 7 : 0,
              }}
              style={{
                display: "block",
                width: 20,
                height: 2,
                background: "#134E4A",
                borderRadius: 2,
              }}
            />
            <motion.span
              animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
              style={{
                display: "block",
                width: 20,
                height: 2,
                background: "#134E4A",
                borderRadius: 2,
              }}
            />
            <motion.span
              animate={{
                rotate: mobileMenuOpen ? -45 : 0,
                y: mobileMenuOpen ? -7 : 0,
              }}
              style={{
                display: "block",
                width: 20,
                height: 2,
                background: "#134E4A",
                borderRadius: 2,
              }}
            />
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
                position: "fixed",
                top: 80,
                left: "5%",
                right: "5%",
                zIndex: 49,
                background: "rgba(240,253,250,0.95)",
                backdropFilter: "blur(20px)",
                borderRadius: 24,
                padding: "24px 32px",
                boxShadow: "0 10px 40px rgba(13, 148, 136, 0.15)",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(sectionIdFromLink(link))}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#134E4A",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    textAlign: "left",
                    padding: "8px 0",
                    borderBottom: "1px solid rgba(13,148,136,0.1)",
                  }}
                >
                  {link}
                </button>
              ))}
              <button
                onClick={() => scrollTo("apoiar")}
                style={{
                  background: "linear-gradient(135deg, #0D9488, #0EA5E9)",
                  color: "white",
                  border: "none",
                  borderRadius: 9999,
                  padding: "12px 24px",
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  marginTop: 8,
                }}
              >
                Fazer parte
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 2 — HERO
        ═══════════════════════════════════════════════════════════ */}
        <motion.section
          ref={heroRef}
          onMouseMove={handleMouseMove}
          style={{
            minHeight: "100svh",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "120px 24px 80px",
            y: heroParallax,
          }}
        >
          {/* Floating shapes (ocean-themed) */}
          <FloatingShape
            mouseX={mouseX}
            mouseY={mouseY}
            depth={0.5}
            style={{
              width: 300,
              height: 300,
              top: "8%",
              left: "-5%",
              background:
                "radial-gradient(circle, rgba(13,148,136,0.15), transparent 70%)",
              borderRadius: "50%",
            }}
          />
          <FloatingShape
            mouseX={mouseX}
            mouseY={mouseY}
            depth={0.8}
            style={{
              width: 200,
              height: 200,
              top: "15%",
              right: "5%",
              background:
                "radial-gradient(circle, rgba(14,165,233,0.2), transparent 70%)",
              borderRadius: "45% 55% 50% 50%",
            }}
          />
          <FloatingShape
            mouseX={mouseX}
            mouseY={mouseY}
            depth={1.2}
            style={{
              width: 150,
              height: 150,
              top: "55%",
              left: "10%",
              background:
                "radial-gradient(circle, rgba(251,146,60,0.15), transparent 70%)",
              borderRadius: "55% 45% 50% 50%",
            }}
          />
          <FloatingShape
            mouseX={mouseX}
            mouseY={mouseY}
            depth={0.6}
            style={{
              width: 250,
              height: 250,
              bottom: "15%",
              right: "-3%",
              background:
                "radial-gradient(circle, rgba(13,148,136,0.12), transparent 70%)",
              borderRadius: "40% 60% 55% 45%",
            }}
          />
          <FloatingShape
            mouseX={mouseX}
            mouseY={mouseY}
            depth={1.0}
            style={{
              width: 120,
              height: 120,
              top: "35%",
              left: "60%",
              background:
                "radial-gradient(circle, rgba(14,165,233,0.18), transparent 70%)",
              borderRadius: "50%",
            }}
          />
          <FloatingShape
            mouseX={mouseX}
            mouseY={mouseY}
            depth={0.4}
            style={{
              width: 180,
              height: 180,
              top: "70%",
              left: "40%",
              background:
                "radial-gradient(circle, rgba(13,148,136,0.1), transparent 70%)",
              borderRadius: "50% 50% 45% 55%",
            }}
          />
          <FloatingShape
            mouseX={mouseX}
            mouseY={mouseY}
            depth={0.9}
            style={{
              width: 100,
              height: 100,
              top: "10%",
              left: "35%",
              background:
                "radial-gradient(circle, rgba(251,146,60,0.12), transparent 70%)",
              borderRadius: "50%",
            }}
          />
          <FloatingShape
            mouseX={mouseX}
            mouseY={mouseY}
            depth={1.1}
            style={{
              width: 160,
              height: 160,
              top: "45%",
              right: "25%",
              background:
                "radial-gradient(circle, rgba(14,165,233,0.1), transparent 70%)",
              borderRadius: "60% 40% 50% 50%",
            }}
          />

          {/* Hero content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{
              textAlign: "center",
              maxWidth: 800,
              position: "relative",
              zIndex: 2,
            }}
          >
            <h1
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2.5rem, 7vw, 5rem)",
                lineHeight: 1.1,
                color: "#134E4A",
                marginBottom: 8,
              }}
            >
              Olha o que estou a construir.
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                color: "#6B7280",
                marginBottom: 24,
              }}
            >
              Vem.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              style={{
                fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                color: "#4B5563",
                lineHeight: 1.7,
                maxWidth: 640,
                margin: "0 auto 40px",
              }}
            >
              110+ projetos gratuitos. Construídos em público. Isto é só o começo.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="hero-ctas"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              style={{ display: "flex", gap: 16, justifyContent: "center" }}
            >
              <button
                onClick={() => scrollTo("projetos")}
                style={{
                  background: "linear-gradient(135deg, #0D9488, #0EA5E9)",
                  color: "white",
                  border: "none",
                  borderRadius: 9999,
                  padding: "14px 32px",
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  boxShadow: "0 4px 20px rgba(13,148,136,0.3)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 30px rgba(13,148,136,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(13,148,136,0.3)";
                }}
              >
                Explorar
              </button>
              <button
                onClick={() => scrollTo("apoiar")}
                style={{
                  background: "rgba(255,255,255,0.7)",
                  color: "#0D9488",
                  border: "2px solid rgba(13,148,136,0.3)",
                  borderRadius: 9999,
                  padding: "12px 32px",
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  backdropFilter: "blur(10px)",
                  transition: "transform 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.9)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.7)";
                }}
              >
                Fazer parte
              </button>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            style={{
              position: "absolute",
              bottom: 40,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 2,
            }}
          >
            <motion.svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="#0D9488"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.div>

          {/* Wave divider */}
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: 80,
            }}
          >
            <path
              fill="#F0FDFA"
              d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
            />
          </svg>
        </motion.section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 3 — MISSÃO
        ═══════════════════════════════════════════════════════════ */}
        <section
          id="missao"
          style={{
            padding: "100px 24px",
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          <div
            className="mission-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 60,
              alignItems: "center",
            }}
          >
            {/* Left — Story */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              style={{
                borderLeft: "4px solid #0D9488",
                paddingLeft: 32,
              }}
            >
              <h2
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  color: "#134E4A",
                  marginBottom: 20,
                }}
              >
                Porquê gratuito?
              </h2>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: "#4B5563",
                  marginBottom: 16,
                }}
              >
                Grátis para ti. Mas não grátis de fazer. Cada projeto nasce de horas de trabalho, servidores e ferramentas. Faço-o porque resolver problemas é o que me faz feliz.
              </p>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: "#4B5563",
                  fontStyle: "italic",
                }}
              >
                A melhor coisa que construí hoje vai ajudar alguém que nunca vou conhecer.
              </p>
            </motion.div>

            {/* Right — Counter card */}
            <motion.div
              ref={missionRef}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                background:
                  "linear-gradient(135deg, rgba(13,148,136,0.05), rgba(14,165,233,0.08))",
                borderRadius: 20,
                padding: "48px 40px",
                textAlign: "center",
                boxShadow: "0 8px 40px rgba(13,148,136,0.08)",
              }}
            >
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(3rem, 8vw, 5rem)",
                  background: "linear-gradient(135deg, #0D9488, #0EA5E9, #FB923C)",
                  backgroundSize: "200% 200%",
                  animation: "gradientShift 4s ease infinite",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {missionCount}+
              </div>
              <p
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  color: "#4B5563",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                projetos criados
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 4 — PROJETOS SIGNIFICATIVOS
        ═══════════════════════════════════════════════════════════ */}
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
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: 56 }}
          >
            <h2
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                color: "#134E4A",
                marginBottom: 12,
              }}
            >
              Seis ilhas no oceano
            </h2>
            <p style={{ fontSize: 16, color: "#4B5563", maxWidth: 500, margin: "0 auto" }}>
              Cada projeto é uma ilha — um ponto de chegada para quem precisa.
            </p>
          </motion.div>

          <div
            className="projects-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2rem",
            }}
          >
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <BalloonTooltip message={project.balloon}>
                  <a
                    href={project.link}
                    style={{ textDecoration: "none", color: "inherit", display: "block" }}
                  >
                    <motion.div
                      whileHover={{ y: -6, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      style={{
                        background: "rgba(255,255,255,0.8)",
                        backdropFilter: "blur(12px)",
                        borderRadius: 20,
                        padding: "32px 24px 28px",
                        boxShadow: "0 4px 24px rgba(13,148,136,0.08)",
                        border: "1px solid rgba(13,148,136,0.1)",
                        clipPath:
                          "polygon(0 0, 100% 0, 100% calc(100% - 12px), 85% 100%, 70% calc(100% - 8px), 55% 100%, 40% calc(100% - 10px), 25% 100%, 10% calc(100% - 6px), 0 100%)",
                        cursor: "pointer",
                        position: "relative",
                      }}
                    >
                      <div style={{ marginBottom: 16 }}>
                        <ProjectSVG type={project.svg} />
                      </div>
                      <div
                        style={{
                          display: "inline-block",
                          background: "rgba(13,148,136,0.1)",
                          color: "#0D9488",
                          borderRadius: 9999,
                          padding: "4px 12px",
                          fontSize: 12,
                          fontWeight: 600,
                          marginBottom: 10,
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        {project.category}
                      </div>
                      <h3
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontWeight: 700,
                          fontSize: 18,
                          color: "#134E4A",
                          marginBottom: 6,
                        }}
                      >
                        {project.name}
                      </h3>
                      <p
                        style={{
                          fontSize: 14,
                          color: "#4B5563",
                          lineHeight: 1.5,
                        }}
                      >
                        {project.description}
                      </p>
                    </motion.div>
                  </a>
                </BalloonTooltip>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 5 — IMPACTO
        ═══════════════════════════════════════════════════════════ */}
        <section
          id="impacto"
          ref={impactRef}
          style={{
            padding: "80px 24px",
            background: "rgba(13,148,136,0.03)",
            position: "relative",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: 48 }}
          >
            <h2
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                color: "#134E4A",
                marginBottom: 8,
              }}
            >
              O impacto até agora
            </h2>
          </motion.div>

          <div
            className="stats-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 24,
              maxWidth: 1000,
              margin: "0 auto",
            }}
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                style={{
                  textAlign: "center",
                  padding: "24px 16px",
                  background: "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(8px)",
                  borderRadius: 16,
                  border: "1px solid rgba(13,148,136,0.1)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    color: "#0D9488",
                    lineHeight: 1.1,
                    marginBottom: 8,
                  }}
                >
                  {statCounts[i]}
                  {stat.suffix}
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: "#6B7280",
                    lineHeight: 1.4,
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 6 — COMO APOIAR
        ═══════════════════════════════════════════════════════════ */}
        <section
          id="apoiar"
          style={{
            padding: "100px 24px",
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: 56 }}
          >
            <h2
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                color: "#134E4A",
                marginBottom: 12,
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" as const, color: "#0D9488", display: "block", marginBottom: 8 }}>FAZER PARTE</span>
              <span style={{
                background: "linear-gradient(135deg, #0D9488, #0EA5E9, #FB923C)",
                backgroundSize: "200% 200%",
                animation: "gradientShift 4s ease infinite",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>Vem para a viagem</span>
            </h2>
            <p style={{ fontSize: 16, color: "#4B5563", maxWidth: 600, margin: "0 auto" }}>
              Os projetos são sempre gratuitos. Isto é para quem quer estar mais perto do processo.
            </p>
          </motion.div>

          <div
            className="tiers-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
              marginBottom: 48,
            }}
          >
            {TIERS.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    borderRadius: 20,
                    padding: "36px 28px",
                    position: "relative",
                    boxShadow: "0 4px 24px rgba(13,148,136,0.08)",
                    border:
                      tier.style === "gradient"
                        ? "2px solid transparent"
                        : "1px solid rgba(13,148,136,0.1)",
                    backgroundImage:
                      tier.style === "gradient"
                        ? "linear-gradient(white, white), linear-gradient(135deg, #0D9488, #0EA5E9, #FB923C)"
                        : undefined,
                    backgroundOrigin:
                      tier.style === "gradient" ? "border-box" : undefined,
                    backgroundClip:
                      tier.style === "gradient"
                        ? "padding-box, border-box"
                        : undefined,
                    overflow: "hidden",
                  }}
                >
                  {/* Popular badge */}
                  {tier.popular && tier.badge && (
                    <div
                      style={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        background: "linear-gradient(135deg, #0D9488, #0EA5E9)",
                        color: "white",
                        borderRadius: 9999,
                        padding: "4px 12px",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: 0.5,
                      }}
                    >
                      {tier.badge}
                    </div>
                  )}

                  <div style={{ fontSize: 36, marginBottom: 12 }}>
                    {tier.emoji}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: 22,
                      color: "#134E4A",
                      marginBottom: 4,
                    }}
                  >
                    {tier.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: 16,
                      color: "#0D9488",
                      marginBottom: 16,
                    }}
                  >
                    {tier.price}
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#6B7280",
                      fontStyle: "italic",
                      marginBottom: 16,
                    }}
                  >
                    {tier.tagline}
                  </p>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: "0 0 24px 0",
                      fontSize: 14,
                      color: "#4B5563",
                      lineHeight: 2,
                    }}
                  >
                    {tier.perks.map((perk: string) => (
                      <li key={perk} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ color: "#0D9488", fontSize: 16 }}>&#10003;</span>
                        {perk}
                      </li>
                    ))}
                  </ul>
                  <button
                    style={{
                      width: "100%",
                      padding: "12px 24px",
                      borderRadius: 9999,
                      fontSize: 15,
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      ...(tier.style === "outline"
                        ? {
                            background: "transparent",
                            color: "#0D9488",
                            border: "2px solid rgba(13,148,136,0.3)",
                          }
                        : tier.style === "solid"
                        ? {
                            background: "#0D9488",
                            color: "white",
                            border: "none",
                            boxShadow: "0 4px 16px rgba(13,148,136,0.3)",
                          }
                        : {
                            background:
                              "linear-gradient(135deg, #0D9488, #0EA5E9)",
                            color: "white",
                            border: "none",
                            boxShadow: "0 4px 20px rgba(13,148,136,0.3)",
                          }),
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.03)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    {tier.cta}
                  </button>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              textAlign: "center",
              fontSize: 15,
              color: "#6B7280",
              lineHeight: 1.7,
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            Partilhar o projeto com alguém é tão valioso como qualquer contribuição.
          </motion.p>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 7 — VISÃO
        ═══════════════════════════════════════════════════════════ */}
        <section
          style={{
            padding: "8rem 24px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Radial glow */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              height: 600,
              background:
                "radial-gradient(circle, rgba(13,148,136,0.06), transparent 70%)",
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto" }}
          >
            <p
              className="vision-text"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
                lineHeight: 1.8,
                color: "#374151",
                marginBottom: 32,
              }}
            >
              Isto é só o começo. Se gostas do que vês, há mais a caminho.
            </p>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 8 — CONTACTO + FOOTER
        ═══════════════════════════════════════════════════════════ */}
        <section
          style={{
            borderTop: "1px solid rgba(13,148,136,0.1)",
            padding: "80px 24px 40px",
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: 60 }}
          >
            <h2
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                color: "#134E4A",
                marginBottom: 24,
              }}
            >
              Vamos conversar?
            </h2>
            <div
              className="contact-row"
              style={{
                display: "flex",
                gap: 16,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {[
                {
                  label: "Email",
                  href: "mailto:jaime@descomplicai.pt",
                  icon: (
                    <svg
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x={2} y={4} width={20} height={16} rx={2} />
                      <path d="M22 7l-10 7L2 7" />
                    </svg>
                  ),
                },
                {
                  label: "WhatsApp",
                  href: "https://wa.me/351000000000",
                  icon: (
                    <svg
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  ),
                },
                {
                  label: "LinkedIn",
                  href: "https://linkedin.com/in/jaimesilva",
                  icon: (
                    <svg
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                },
              ].map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "12px 24px",
                    borderRadius: 9999,
                    background: "rgba(255,255,255,0.7)",
                    border: "1px solid rgba(13,148,136,0.15)",
                    color: "#134E4A",
                    textDecoration: "none",
                    fontSize: 15,
                    fontWeight: 500,
                    fontFamily: "'Inter', sans-serif",
                    transition: "background 0.2s, transform 0.2s",
                    backdropFilter: "blur(8px)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "rgba(13,148,136,0.08)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "rgba(255,255,255,0.7)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {contact.icon}
                  {contact.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Footer */}
          <div
            style={{
              borderTop: "1px solid rgba(13,148,136,0.1)",
              paddingTop: 32,
            }}
          >
            <div
              className="footer-inner"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              {/* Logo */}
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: 18,
                }}
              >
                descomplic
                <span
                  style={{
                    background: "linear-gradient(135deg, #0D9488, #0EA5E9)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  ai
                </span>
              </div>

              {/* Nav links */}
              <div style={{ display: "flex", gap: 24 }}>
                {navLinks.map((link) => (
                  <button
                    key={link}
                    onClick={() => scrollTo(sectionIdFromLink(link))}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 13,
                      fontWeight: 500,
                      color: "#6B7280",
                      fontFamily: "'Inter', sans-serif",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#0D9488")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#6B7280")
                    }
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>

            <div
              style={{
                textAlign: "center",
                paddingBottom: 24,
              }}
            >
              <p
                style={{
                  fontSize: 14,
                  color: "#6B7280",
                  marginBottom: 4,
                }}
              >
                Feito com ❤️ para todos
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: "#9CA3AF",
                }}
              >
                © 2026 Descomplicai
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
