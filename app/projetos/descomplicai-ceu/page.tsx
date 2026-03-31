"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
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

const FEATURED_PROJECTS = [
  {
    id: "chess",
    name: "Chess",
    category: "Jogos",
    type: "Aplicacao",
    description:
      "Implementacao completa de xadrez com IA adversaria, validacao de movimentos e interface intuitiva.",
    color: "#6366f1",
    // desktop constellation position
    pos: { top: "5%", left: "8%" },
  },
  {
    id: "bijou",
    name: "Bijou Restaurante",
    category: "Restaurantes",
    type: "Website",
    description:
      "Website de fine dining com estetica minimalista e elegante. Cada detalhe pensado para transmitir a experiencia gastronomica.",
    color: "#8B5CF6",
    pos: { top: "2%", right: "10%" },
  },
  {
    id: "fractal",
    name: "Fractal Explorer",
    category: "Interativo",
    type: "Experiencia",
    description:
      "Explorador de fractais Mandelbrot e Julia com zoom infinito, paletas dinamicas e renderizacao em tempo real.",
    color: "#3B82F6",
    pos: { top: "38%", left: "2%" },
  },
  {
    id: "dentalkid",
    name: "DentalKid",
    category: "Saude",
    type: "Plataforma",
    description:
      "Plataforma pediatrica que torna a saude dentaria divertida para criancas com jogos educativos.",
    color: "#ec4899",
    pos: { top: "42%", right: "5%" },
  },
  {
    id: "synth",
    name: "Synth",
    category: "Plataformas",
    type: "Ferramenta",
    description:
      "Sintetizador polifonico no browser com osciladores, filtros, envelopes e efeitos em tempo real.",
    color: "#8B5CF6",
    pos: { bottom: "8%", left: "15%" },
  },
  {
    id: "solar",
    name: "Solar System",
    category: "Interativo",
    type: "Experiencia",
    description:
      "Explorador interativo do sistema solar com orbitas precisas, informacoes detalhadas e escala realista.",
    color: "#3B82F6",
    pos: { bottom: "5%", right: "12%" },
  },
];

const CONSTELLATION_LINES = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 4],
  [3, 5],
  [4, 5],
  [2, 3],
];

const IMPACT_STATS = [
  { label: "Projetos criados", value: 110, suffix: "+" },
  { label: "Restaurantes", value: 17, suffix: "" },
  { label: "Clinicas", value: 9, suffix: "" },
  { label: "Ferramentas", value: 40, suffix: "+" },
  { label: "Utilizadores impactados", value: 5000, suffix: "+" },
];

const SUPPORT_TIERS = [
  {
    name: "Estrela",
    icon: "\u2b50",
    price: "\u20ac5",
    period: "/mes",
    features: [
      "Acesso a todos os projetos",
      "Updates por email",
      "Badge de apoiante",
    ],
    gradient: "linear-gradient(135deg, #3B82F6, #60a5fa)",
    glow: "rgba(59,130,246,0.15)",
    tier: 0,
    popular: false,
  },
  {
    name: "Sol",
    icon: "\u2600\ufe0f",
    price: "\u20ac15",
    period: "/mes",
    features: [
      "Tudo do Estrela",
      "Acesso antecipado",
      "Nome nos creditos",
      "Sugestao de projetos",
    ],
    gradient: "linear-gradient(135deg, #8B5CF6, #a78bfa)",
    glow: "rgba(139,92,246,0.2)",
    tier: 1,
    popular: true,
  },
  {
    name: "Horizonte",
    icon: "\ud83c\udf05",
    price: "\u20ac30",
    period: "/mes",
    features: [
      "Tudo do Sol",
      "Projetos personalizados",
      "Reuniao mensal",
      "Co-criacao",
      "Prioridade maxima",
    ],
    gradient: "linear-gradient(135deg, #3B82F6, #8B5CF6, #FDE68A)",
    glow: "rgba(253,230,138,0.3)",
    tier: 2,
    popular: false,
  },
];

/* ─────────────────────────── HOOKS ─────────────────────────── */

function useCountUp(
  end: number,
  duration: number = 2000,
  start: boolean = false
) {
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

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

/* ─────────────────────────── CLOUD COMPONENT ─────────────────────────── */

function CSSCloud({
  style,
  mouseX,
  mouseY,
  depth,
  scale = 1,
}: {
  style: React.CSSProperties;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  depth: number;
  scale?: number;
}) {
  const x = useTransform(mouseX, [-1, 1], [-40 * depth, 40 * depth]);
  const y = useTransform(mouseY, [-1, 1], [-25 * depth, 25 * depth]);
  const springX = useSpring(x as MotionValue<number>, {
    stiffness: 40,
    damping: 25,
  });
  const springY = useSpring(y as MotionValue<number>, {
    stiffness: 40,
    damping: 25,
  });

  const baseSize = 60 * scale;
  return (
    <motion.div
      style={{
        position: "absolute",
        ...style,
        x: springX,
        y: springY,
        pointerEvents: "none",
      }}
      animate={{ y: [0, -8 * scale, 0, 5 * scale, 0] }}
      transition={{
        duration: 10 + depth * 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Main body */}
      <div
        style={{
          position: "absolute",
          width: baseSize * 2,
          height: baseSize,
          borderRadius: "50%",
          background: `rgba(255,255,255,${0.15 + depth * 0.05})`,
          top: baseSize * 0.3,
          left: 0,
        }}
      />
      {/* Left bump */}
      <div
        style={{
          position: "absolute",
          width: baseSize * 1.2,
          height: baseSize * 1.2,
          borderRadius: "50%",
          background: `rgba(255,255,255,${0.12 + depth * 0.04})`,
          top: -baseSize * 0.1,
          left: baseSize * 0.2,
        }}
      />
      {/* Right bump */}
      <div
        style={{
          position: "absolute",
          width: baseSize * 1.4,
          height: baseSize * 1.4,
          borderRadius: "50%",
          background: `rgba(255,255,255,${0.13 + depth * 0.04})`,
          top: -baseSize * 0.2,
          left: baseSize * 0.7,
        }}
      />
      {/* Top bump */}
      <div
        style={{
          position: "absolute",
          width: baseSize * 0.9,
          height: baseSize * 0.9,
          borderRadius: "50%",
          background: `rgba(255,255,255,${0.1 + depth * 0.03})`,
          top: -baseSize * 0.4,
          left: baseSize * 0.5,
        }}
      />
    </motion.div>
  );
}

/* ─────────────────────────── TWINKLING STAR ─────────────────────────── */

function TwinklingStar({
  top,
  left,
  size,
  delay,
}: {
  top: string;
  left: string;
  size: number;
  delay: number;
}) {
  return (
    <motion.div
      style={{
        position: "absolute",
        top,
        left,
        width: size,
        height: size,
        pointerEvents: "none",
        zIndex: 2,
      }}
      animate={{ opacity: [0.15, 0.6, 0.15], scale: [0.8, 1.2, 0.8] }}
      transition={{
        duration: 3 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#FDE68A",
          clipPath:
            "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        }}
      />
    </motion.div>
  );
}

/* ─────────────────────────── SVG ILLUSTRATIONS ─────────────────────────── */

function ProjectIllustration({
  id,
  size = 80,
}: {
  id: string;
  size?: number;
}) {
  const s = size;
  const mid = s / 2;

  switch (id) {
    case "chess":
      // Crown / king piece
      return (
        <svg
          width={s}
          height={s}
          viewBox={`0 0 ${s} ${s}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x={mid - 20}
            y={s - 20}
            width={40}
            height={8}
            rx={4}
            fill="#DDD6FE"
          />
          <path
            d={`M${mid - 18} ${s - 20} L${mid - 14} ${mid - 5} L${mid - 8} ${mid + 5} L${mid} ${mid - 10} L${mid + 8} ${mid + 5} L${mid + 14} ${mid - 5} L${mid + 18} ${s - 20} Z`}
            fill="#3B82F6"
            opacity={0.85}
          />
          <circle cx={mid - 14} cy={mid - 8} r={3} fill="#FDE68A" />
          <circle cx={mid} cy={mid - 13} r={3.5} fill="#FDE68A" />
          <circle cx={mid + 14} cy={mid - 8} r={3} fill="#FDE68A" />
        </svg>
      );
    case "bijou":
      // Diamond / gem
      return (
        <svg
          width={s}
          height={s}
          viewBox={`0 0 ${s} ${s}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points={`${mid},12 ${mid + 22},${mid - 5} ${mid},${s - 12} ${mid - 22},${mid - 5}`}
            fill="#8B5CF6"
            opacity={0.8}
          />
          <polygon
            points={`${mid},12 ${mid + 22},${mid - 5} ${mid},${mid + 8}`}
            fill="#DDD6FE"
            opacity={0.5}
          />
          <polygon
            points={`${mid},12 ${mid - 22},${mid - 5} ${mid},${mid + 8}`}
            fill="#3B82F6"
            opacity={0.3}
          />
          <line
            x1={mid - 22}
            y1={mid - 5}
            x2={mid + 22}
            y2={mid - 5}
            stroke="#FDE68A"
            strokeWidth={1.5}
          />
        </svg>
      );
    case "fractal":
      // Starburst
      return (
        <svg
          width={s}
          height={s}
          viewBox={`0 0 ${s} ${s}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const len = i % 2 === 0 ? 28 : 18;
            return (
              <line
                key={i}
                x1={mid}
                y1={mid}
                x2={mid + Math.cos(angle) * len}
                y2={mid + Math.sin(angle) * len}
                stroke={i % 3 === 0 ? "#FDE68A" : i % 3 === 1 ? "#3B82F6" : "#DDD6FE"}
                strokeWidth={1.5}
                strokeLinecap="round"
              />
            );
          })}
          <circle cx={mid} cy={mid} r={4} fill="#8B5CF6" />
        </svg>
      );
    case "dentalkid":
      // Heart
      return (
        <svg
          width={s}
          height={s}
          viewBox={`0 0 ${s} ${s}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={`M${mid} ${s - 16} C${mid - 30} ${mid + 5} ${mid - 30} ${mid - 18} ${mid} ${mid - 8} C${mid + 30} ${mid - 18} ${mid + 30} ${mid + 5} ${mid} ${s - 16}Z`}
            fill="#ec4899"
            opacity={0.8}
          />
          <path
            d={`M${mid} ${s - 20} C${mid - 22} ${mid + 2} ${mid - 22} ${mid - 12} ${mid} ${mid - 4}`}
            fill="#DDD6FE"
            opacity={0.3}
          />
        </svg>
      );
    case "synth":
      // Music notes
      return (
        <svg
          width={s}
          height={s}
          viewBox={`0 0 ${s} ${s}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx={mid - 12} cy={s - 22} rx={7} ry={5} fill="#8B5CF6" opacity={0.85} />
          <line x1={mid - 5} y1={s - 22} x2={mid - 5} y2={18} stroke="#8B5CF6" strokeWidth={2} />
          <ellipse cx={mid + 14} cy={s - 28} rx={7} ry={5} fill="#3B82F6" opacity={0.85} />
          <line x1={mid + 21} y1={s - 28} x2={mid + 21} y2={14} stroke="#3B82F6" strokeWidth={2} />
          <line x1={mid - 5} y1={18} x2={mid + 21} y2={14} stroke="#FDE68A" strokeWidth={2.5} strokeLinecap="round" />
          <line x1={mid - 5} y1={24} x2={mid + 21} y2={20} stroke="#DDD6FE" strokeWidth={2} strokeLinecap="round" />
        </svg>
      );
    case "solar":
      // Ringed planet
      return (
        <svg
          width={s}
          height={s}
          viewBox={`0 0 ${s} ${s}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx={mid} cy={mid} r={16} fill="#3B82F6" opacity={0.8} />
          <circle cx={mid - 5} cy={mid - 5} r={5} fill="#DDD6FE" opacity={0.3} />
          <ellipse
            cx={mid}
            cy={mid}
            rx={30}
            ry={10}
            stroke="#FDE68A"
            strokeWidth={2}
            fill="none"
            transform={`rotate(-20 ${mid} ${mid})`}
          />
          <ellipse
            cx={mid}
            cy={mid}
            rx={30}
            ry={10}
            stroke="#DDD6FE"
            strokeWidth={1}
            fill="none"
            opacity={0.4}
            transform={`rotate(-20 ${mid} ${mid})`}
            strokeDasharray="4 3"
          />
        </svg>
      );
    default:
      return null;
  }
}

/* ─────────────────────────── CONSTELLATION CARD ─────────────────────────── */

function ConstellationCard({
  project,
  index,
  isDesktop,
}: {
  project: (typeof FEATURED_PROJECTS)[0];
  index: number;
  isDesktop: boolean;
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const posStyle: React.CSSProperties = isDesktop
    ? { position: "absolute", ...project.pos, width: 180 }
    : { position: "relative", width: "100%" };

  // Close tooltip when clicking outside (mobile)
  useEffect(() => {
    if (!showTooltip || isDesktop) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowTooltip(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [showTooltip, isDesktop]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, type: "spring", stiffness: 120 }}
      style={{
        ...posStyle,
        zIndex: showTooltip ? 20 : 5,
        cursor: "pointer",
      }}
      onMouseEnter={() => isDesktop && setShowTooltip(true)}
      onMouseLeave={() => isDesktop && setShowTooltip(false)}
      onClick={() => !isDesktop && setShowTooltip((prev) => !prev)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setShowTooltip((prev) => !prev);
        }
        if (e.key === "Escape") setShowTooltip(false);
      }}
      tabIndex={0}
      role="button"
      aria-expanded={showTooltip}
      aria-label={`${project.name} - ${project.category}. ${showTooltip ? "Fechar detalhes" : "Ver detalhes"}`}
    >
      <motion.div
        animate={showTooltip ? { scale: 1.05, y: -4 } : { scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          background: "rgba(255,255,255,0.9)",
          borderRadius: 20,
          padding: isDesktop ? "20px 16px" : "20px 24px",
          textAlign: "center",
          boxShadow: showTooltip
            ? `0 8px 32px rgba(59,130,246,0.18), 0 0 0 1px rgba(59,130,246,0.1)`
            : `0 4px 16px rgba(59,130,246,0.08), 0 0 0 1px rgba(59,130,246,0.05)`,
          transition: "box-shadow 0.3s",
          display: "flex",
          flexDirection: isDesktop ? "column" : "row",
          alignItems: "center",
          gap: isDesktop ? 8 : 16,
          minHeight: 44,
        }}
      >
        <ProjectIllustration id={project.id} size={isDesktop ? 80 : 64} />
        <div style={{ textAlign: isDesktop ? "center" : "left", flex: isDesktop ? undefined : 1 }}>
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: isDesktop ? 14 : 16,
              color: "#1E3A5F",
              marginBottom: 2,
            }}
          >
            {project.name}
          </div>
          <div
            style={{
              fontSize: 14,
              color: "#8B5CF6",
              fontWeight: 500,
            }}
          >
            {project.category}
          </div>
        </div>
        {/* Mobile tap hint */}
        {!isDesktop && (
          <div style={{ fontSize: 14, color: "#9CA3AF", flexShrink: 0 }} aria-hidden="true">
            {showTooltip ? "\u2715" : "\u2139\ufe0f"}
          </div>
        )}
      </motion.div>

      {/* Glowing balloon tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            role="tooltip"
            aria-label={`Detalhes de ${project.name}`}
            style={{
              position: isDesktop ? "absolute" : "relative",
              top: isDesktop ? "100%" : "auto",
              bottom: isDesktop ? "auto" : "auto",
              left: isDesktop ? "50%" : 0,
              transform: isDesktop ? "translateX(-50%)" : "none",
              marginTop: 8,
              width: isDesktop ? 220 : "100%",
              padding: "16px 18px",
              background: "rgba(255,255,255,0.95)",
              borderRadius: 16,
              boxShadow:
                "0 0 20px rgba(253,230,138,0.4), 0 8px 32px rgba(0,0,0,0.08)",
              border: "1px solid rgba(253,230,138,0.5)",
              zIndex: 30,
              backdropFilter: "blur(12px)",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 8, fontSize: 16 }} aria-hidden="true">
              {"\u2b50"}
            </div>
            <div
              style={{
                fontSize: 14,
                color: "#4B5563",
                lineHeight: 1.6,
                textAlign: "center",
              }}
            >
              {project.description}
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 14,
                color: "#8B5CF6",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              {project.type}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────── MAIN COMPONENT ─────────────────────────── */

export default function CeuPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMsg, setFormMsg] = useState("");
  const [formSent, setFormSent] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const isDesktop = useMediaQuery("(min-width: 768px)");

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
  const bgParallax = useTransform(scrollYProgress, [0, 0.3], [0, -80]);
  const midParallax = useTransform(scrollYProgress, [0, 0.3], [0, -40]);

  /* Impact counters */
  const impactRef = useRef(null);
  const impactInView = useInView(impactRef, { once: true, margin: "-100px" });
  const counters = [
    useCountUp(110, 2000, impactInView),
    useCountUp(17, 1800, impactInView),
    useCountUp(9, 1600, impactInView),
    useCountUp(40, 1900, impactInView),
    useCountUp(5000, 2200, impactInView),
  ];

  /* Mission counter */
  const missionRef = useRef(null);
  const missionInView = useInView(missionRef, { once: true, margin: "-100px" });
  const missionCount = useCountUp(110, 2500, missionInView);

  const navLinks = ["Missao", "Projetos", "Impacto", "Apoiar"];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  /* Constellation SVG lines — computed positions for desktop */
  const constellationRef = useRef<HTMLDivElement>(null);
  const [lineCoords, setLineCoords] = useState<
    { x1: number; y1: number; x2: number; y2: number }[]
  >([]);

  useEffect(() => {
    if (!isDesktop) return;
    const updateLines = () => {
      const container = constellationRef.current;
      if (!container) return;
      const cards = container.querySelectorAll("[data-constellation-card]");
      if (cards.length < 6) return;
      const containerRect = container.getBoundingClientRect();
      const centers = Array.from(cards).map((card) => {
        const r = card.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 - containerRect.left,
          y: r.top + r.height / 2 - containerRect.top,
        };
      });
      setLineCoords(
        CONSTELLATION_LINES.map(([a, b]) => ({
          x1: centers[a]?.x ?? 0,
          y1: centers[a]?.y ?? 0,
          x2: centers[b]?.x ?? 0,
          y2: centers[b]?.y ?? 0,
        }))
      );
    };
    const timer = setTimeout(updateLines, 800);
    window.addEventListener("resize", updateLines);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateLines);
    };
  }, [isDesktop]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
    setFormName("");
    setFormEmail("");
    setFormMsg("");
  };

  const starsData = useMemo(
    () => [
      { top: "8%", left: "12%", size: 8, delay: 0 },
      { top: "15%", left: "75%", size: 6, delay: 0.8 },
      { top: "22%", left: "35%", size: 5, delay: 1.5 },
      { top: "5%", left: "55%", size: 7, delay: 0.3 },
      { top: "30%", left: "88%", size: 5, delay: 2 },
      { top: "18%", left: "92%", size: 6, delay: 1.2 },
      { top: "35%", left: "8%", size: 7, delay: 0.6 },
      { top: "12%", left: "48%", size: 5, delay: 1.8 },
      { top: "40%", left: "65%", size: 6, delay: 0.4 },
      { top: "28%", left: "20%", size: 8, delay: 1.1 },
      { top: "45%", left: "42%", size: 5, delay: 2.2 },
      { top: "50%", left: "78%", size: 6, delay: 0.9 },
    ],
    []
  );

  return (
    <>
      {/* ─── GLOBAL STYLES ─── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Inter', sans-serif; color: #4B5563; overflow-x: hidden; }
        ::selection { background: #DDD6FE; color: #1E3A5F; }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.6; }
        }
        @keyframes gradientBorder {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes sunPulse {
          0%, 100% { box-shadow: 0 0 40px rgba(253,230,138,0.5), 0 0 80px rgba(253,230,138,0.2); }
          50% { box-shadow: 0 0 60px rgba(253,230,138,0.7), 0 0 120px rgba(253,230,138,0.3); }
        }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .star-hide-mobile { display: none !important; }
          .form-grid-responsive { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 769px) { .nav-mobile-btn { display: none !important; } }
        input:focus, textarea:focus { outline: none; border-color: #3B82F6 !important; box-shadow: 0 0 0 3px rgba(59,130,246,0.15) !important; }
        button:focus-visible, a:focus-visible, [role="button"]:focus-visible {
          outline: 2px solid #3B82F6;
          outline-offset: 2px;
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          overflowX: "hidden",
          background:
            "linear-gradient(180deg, #EFF6FF 0%, #F5F3FF 30%, #FEFCE8 60%, #FDF2F8 100%)",
        }}
      >
        {/* ═══════════════════════ 1. NAVBAR ═══════════════════════ */}
        <motion.nav
          aria-label="Navegacao principal"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            position: "fixed",
            top: 16,
            left: 0,
            right: 0,
            marginLeft: "auto",
            marginRight: "auto",
            zIndex: 1000,
            width: "min(92%, 900px)",
            padding: "12px 24px",
            borderRadius: 9999,
            background: "rgba(239,246,255,0.75)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow:
              "0 4px 30px rgba(59,130,246,0.08), 0 1px 3px rgba(0,0,0,0.04)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "1px solid rgba(255,255,255,0.6)",
          }}
        >
          {/* Logo */}
          <div
            role="button"
            tabIndex={0}
            aria-label="Voltar ao topo"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: 20,
              cursor: "pointer",
              color: "#1E3A5F",
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            descomplic
            <span
              style={{
                background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
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
                onClick={() => scrollTo(link.toLowerCase())}
                aria-label={`Navegar para ${link}`}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#4B5563",
                  padding: "10px 4px",
                  minHeight: 44,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#3B82F6")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "#4B5563")
                }
              >
                {link === "Missao" ? "Missao" : link}
              </button>
            ))}
            <button
              onClick={() => scrollTo("apoiar")}
              style={{
                background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                color: "white",
                border: "none",
                borderRadius: 9999,
                padding: "8px 22px",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                transition: "transform 0.2s, box-shadow 0.2s",
                boxShadow: "0 2px 12px rgba(59,130,246,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 4px 20px rgba(59,130,246,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 2px 12px rgba(59,130,246,0.3)";
              }}
            >
              Apoiar
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="nav-mobile-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              width: 44,
              height: 44,
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
                background: "#1E3A5F",
                borderRadius: 2,
              }}
            />
            <motion.span
              animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
              style={{
                display: "block",
                width: 20,
                height: 2,
                background: "#1E3A5F",
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
                background: "#1E3A5F",
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
                zIndex: 999,
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(20px)",
                borderRadius: 24,
                padding: "24px 32px",
                boxShadow: "0 10px 40px rgba(59,130,246,0.12)",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link.toLowerCase())}
                  aria-label={`Navegar para ${link}`}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#1E3A5F",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    textAlign: "left",
                    padding: "12px 0",
                    minHeight: 44,
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  {link}
                </button>
              ))}
              <button
                onClick={() => scrollTo("apoiar")}
                style={{
                  background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
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
                Apoiar
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══════════════════════ 2. HERO ═══════════════════════ */}
        <section
          ref={heroRef}
          onMouseMove={handleMouseMove}
          style={{
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            padding: "120px 24px 80px",
          }}
        >
          {/* Background depth layer (0.3) — large faint clouds */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              y: bgParallax,
              background:
                "linear-gradient(180deg, #dbeafe 0%, #ede9fe 35%, #fef9c3 70%, #fce7f3 100%)",
            }}
          >
            <CSSCloud
              mouseX={mouseX}
              mouseY={mouseY}
              depth={0.3}
              scale={2.2}
              style={{ top: "10%", left: "2%" }}
            />
            <CSSCloud
              mouseX={mouseX}
              mouseY={mouseY}
              depth={0.3}
              scale={2.5}
              style={{ top: "5%", right: "5%" }}
            />
            <CSSCloud
              mouseX={mouseX}
              mouseY={mouseY}
              depth={0.3}
              scale={1.8}
              style={{ top: "55%", left: "60%" }}
            />
            <CSSCloud
              mouseX={mouseX}
              mouseY={mouseY}
              depth={0.25}
              scale={2.0}
              style={{ bottom: "15%", left: "10%" }}
            />
          </motion.div>

          {/* Middle depth layer (1.0) — smaller, slightly more opaque clouds */}
          <motion.div
            style={{ position: "absolute", inset: 0, zIndex: 1, y: midParallax }}
          >
            <CSSCloud
              mouseX={mouseX}
              mouseY={mouseY}
              depth={1.0}
              scale={1.2}
              style={{ top: "20%", left: "15%" }}
            />
            <CSSCloud
              mouseX={mouseX}
              mouseY={mouseY}
              depth={0.8}
              scale={1.0}
              style={{ top: "30%", right: "18%" }}
            />
            <CSSCloud
              mouseX={mouseX}
              mouseY={mouseY}
              depth={1.0}
              scale={0.9}
              style={{ bottom: "25%", left: "40%" }}
            />
            <CSSCloud
              mouseX={mouseX}
              mouseY={mouseY}
              depth={0.9}
              scale={1.1}
              style={{ top: "60%", right: "8%" }}
            />
          </motion.div>

          {/* Twinkling stars — hide every other star on mobile for performance */}
          <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
            {starsData.map((star, i) => (
              <div key={i} className={i % 2 === 1 ? "star-hide-mobile" : undefined}>
                <TwinklingStar {...star} />
              </div>
            ))}
          </div>

          {/* Sun element */}
          <div
            style={{
              position: "absolute",
              top: "8%",
              right: "10%",
              width: 60,
              height: 60,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, #FDE68A 0%, #FCD34D 40%, rgba(253,230,138,0) 70%)",
              animation: "sunPulse 4s ease-in-out infinite",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />

          {/* Content — foreground layer (1.8) */}
          <motion.div
            style={{
              position: "relative",
              zIndex: 3,
              textAlign: "center",
              maxWidth: 900,
              margin: "0 auto",
            }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2.8rem, 8vw, 6rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "#1E3A5F",
                marginBottom: 24,
              }}
            >
              O futuro e{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #3B82F6, #8B5CF6, #FDE68A)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "shimmer 4s linear infinite",
                }}
              >
                para todos.
              </span>
              <br />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                style={{
                  display: "block",
                  fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
                  fontWeight: 700,
                  color: "#3B82F6",
                  marginTop: 8,
                }}
              >
                Vem.
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              style={{
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                color: "#6B7280",
                maxWidth: 600,
                margin: "0 auto 40px",
                lineHeight: 1.7,
              }}
            >
              110+ projetos gratuitos. Construidos em publico. Isto e so o comeco.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              style={{
                display: "flex",
                gap: 16,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => scrollTo("projetos")}
                aria-label="Explorar projetos"
                style={{
                  background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                  color: "white",
                  border: "none",
                  borderRadius: 9999,
                  padding: "14px 32px",
                  fontSize: 16,
                  minHeight: 44,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  boxShadow: "0 4px 20px rgba(59,130,246,0.35)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-2px) scale(1.03)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 30px rgba(59,130,246,0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(59,130,246,0.35)";
                }}
              >
                Explorar
              </button>
              <button
                onClick={() => scrollTo("apoiar")}
                aria-label="Fazer parte do projeto"
                style={{
                  background: "transparent",
                  color: "#3B82F6",
                  border: "2px solid #3B82F6",
                  borderRadius: 9999,
                  padding: "12px 30px",
                  fontSize: 16,
                  minHeight: 44,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "rgba(59,130,246,0.08)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Fazer parte
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════════════════════ 3. MISSAO ═══════════════════════ */}
        <section
          id="missao"
          aria-label="A nossa missao"
          style={{
            padding: "100px 24px",
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          <motion.div
            ref={missionRef}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            style={{
              borderLeft: "4px solid #3B82F6",
              paddingLeft: 32,
              position: "relative",
            }}
          >
            <h2
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                color: "#1E3A5F",
                marginBottom: 20,
                lineHeight: 1.2,
              }}
            >
              A melhor coisa que construi hoje vai ajudar alguem que nunca vou conhecer.
            </h2>
            <p
              style={{
                fontSize: "clamp(1rem, 2vw, 1.15rem)",
                color: "#4B5563",
                lineHeight: 1.8,
                maxWidth: 650,
                marginBottom: 32,
              }}
            >
              Gratis para ti. Mas nao gratis de fazer.
            </p>

            {/* Big counter */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(3rem, 8vw, 5rem)",
                  background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1,
                }}
              >
                {missionCount}+
              </span>
              <span
                style={{
                  fontSize: "clamp(1rem, 2vw, 1.3rem)",
                  color: "#6B7280",
                  fontWeight: 500,
                }}
              >
                projetos gratuitos
              </span>
            </div>
          </motion.div>
        </section>

        {/* ═══════════════════════ 4. PROJETOS — CONSTELACOES NO CEU ═══════════════════════ */}
        <section
          id="projetos"
          aria-label="Projetos em destaque"
          style={{
            padding: "80px 24px 100px",
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: 60 }}
          >
            <h2
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                color: "#1E3A5F",
                marginBottom: 12,
              }}
            >
              Constelacoes no{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #3B82F6, #8B5CF6, #FDE68A)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Ceu
              </span>
            </h2>
            <p
              style={{
                fontSize: "clamp(1rem, 2vw, 1.15rem)",
                color: "#6B7280",
                maxWidth: 500,
                margin: "0 auto",
              }}
            >
              Projetos que brilham com proposito.{" "}
              {isDesktop
                ? "Passa o rato para descobrir cada um."
                : "Toca num projeto para saber mais."}
            </p>
          </motion.div>

          {/* Constellation container */}
          <div
            ref={constellationRef}
            style={{
              position: "relative",
              width: "100%",
              height: isDesktop ? 550 : "auto",
              maxWidth: 900,
              margin: "0 auto",
              ...(isDesktop
                ? {}
                : {
                    display: "flex",
                    flexDirection: "column" as const,
                    gap: 16,
                  }),
            }}
          >
            {/* SVG constellation lines (desktop only) */}
            {isDesktop && lineCoords.length > 0 && (
              <svg
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  zIndex: 1,
                  pointerEvents: "none",
                }}
              >
                {lineCoords.map((line, i) => (
                  <motion.line
                    key={i}
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke="#DDD6FE"
                    strokeWidth={1.5}
                    strokeDasharray="6 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.6 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.15 }}
                  />
                ))}
              </svg>
            )}

            {/* Project cards */}
            {FEATURED_PROJECTS.map((project, i) => (
              <div
                key={project.id}
                data-constellation-card
                style={
                  isDesktop
                    ? { position: "absolute", ...project.pos, zIndex: 2 }
                    : { position: "relative", zIndex: 2 }
                }
              >
                <ConstellationCard
                  project={project}
                  index={i}
                  isDesktop={isDesktop}
                />
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════ 5. IMPACTO ═══════════════════════ */}
        <section
          id="impacto"
          ref={impactRef}
          aria-label="Impacto em numeros"
          style={{
            padding: "100px 24px",
            background:
              "linear-gradient(180deg, rgba(221,214,254,0.15) 0%, rgba(239,246,255,0.3) 100%)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: 60 }}
          >
            <h2
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                color: "#1E3A5F",
                marginBottom: 12,
              }}
            >
              Impacto em numeros
            </h2>
            <p
              style={{
                fontSize: "clamp(1rem, 2vw, 1.15rem)",
                color: "#6B7280",
                maxWidth: 500,
                margin: "0 auto",
              }}
            >
              Cada numero representa horas de trabalho e vidas tocadas.
            </p>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isDesktop
                ? "repeat(auto-fit, minmax(160px, 1fr))"
                : "repeat(2, 1fr)",
              gap: isDesktop ? 32 : 12,
              maxWidth: 1000,
              margin: "0 auto",
            }}
          >
            {IMPACT_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  background: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(12px)",
                  borderRadius: 20,
                  padding: isDesktop ? "32px 40px" : "20px 16px",
                  textAlign: "center",
                  boxShadow: "0 4px 20px rgba(59,130,246,0.06)",
                  border: "1px solid rgba(59,130,246,0.08)",
                  ...((!isDesktop && i === IMPACT_STATS.length - 1 && IMPACT_STATS.length % 2 !== 0)
                    ? { gridColumn: "1 / -1" }
                    : {}),
                }}
              >
                <div
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(2rem, 5vw, 3rem)",
                    background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    lineHeight: 1.1,
                    marginBottom: 8,
                  }}
                >
                  {counters[i]}
                  {stat.suffix}
                </div>
                <div
                  style={{
                    fontSize: isDesktop ? 14 : 13,
                    color: "#6B7280",
                    fontWeight: 500,
                    lineHeight: 1.4,
                  }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════ 6. COMO APOIAR ═══════════════════════ */}
        <section
          id="apoiar"
          aria-label="Como apoiar o projeto"
          style={{
            padding: "100px 24px",
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: 60 }}
          >
            <h2
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                color: "#1E3A5F",
                marginBottom: 12,
              }}
            >
              Vem para a viagem
            </h2>
            <div
              style={{
                display: "inline-block",
                padding: "4px 16px",
                borderRadius: 9999,
                background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                color: "white",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              FAZER PARTE
            </div>
            <p
              style={{
                fontSize: "clamp(1rem, 2vw, 1.15rem)",
                color: "#6B7280",
                maxWidth: 560,
                margin: "0 auto",
              }}
            >
              Os projetos sao sempre gratuitos. Isto e para quem quer estar mais perto do processo.
            </p>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
              maxWidth: 960,
              margin: "0 auto",
            }}
          >
            {SUPPORT_TIERS.map((tier, i) => {
              const isTop = tier.popular;
              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  style={{
                    position: "relative",
                    borderRadius: 24,
                    padding: isTop ? 3 : 0,
                    background: isTop
                      ? "linear-gradient(135deg, #3B82F6, #8B5CF6, #FDE68A, #3B82F6)"
                      : "transparent",
                    backgroundSize: isTop ? "300% 300%" : "auto",
                    animation: isTop
                      ? "gradientBorder 4s ease infinite"
                      : "none",
                  }}
                >
                  {isTop && (
                    <div
                      style={{
                        position: "absolute",
                        top: -12,
                        left: "50%",
                        transform: "translateX(-50%)",
                        padding: "4px 16px",
                        borderRadius: 9999,
                        background: "linear-gradient(135deg, #8B5CF6, #a78bfa)",
                        color: "white",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: 1,
                        whiteSpace: "nowrap" as const,
                        zIndex: 5,
                      }}
                    >
                      Mais Popular
                    </div>
                  )}
                  <div
                    style={{
                      background: "rgba(255,255,255,0.9)",
                      backdropFilter: "blur(12px)",
                      borderRadius: isTop ? 21 : 24,
                      padding: "36px 28px",
                      border: isTop
                        ? "none"
                        : "1px solid rgba(59,130,246,0.1)",
                      boxShadow: `0 ${4 + tier.tier * 6}px ${16 + tier.tier * 16}px ${tier.glow}`,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 36,
                        marginBottom: 12,
                        textAlign: "center",
                      }}
                    >
                      {tier.icon}
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 800,
                        fontSize: 22,
                        color: "#1E3A5F",
                        textAlign: "center",
                        marginBottom: 4,
                      }}
                    >
                      {tier.name}
                    </h3>
                    <div
                      style={{
                        textAlign: "center",
                        marginBottom: 24,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontWeight: 900,
                          fontSize: 32,
                          background: tier.gradient,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {tier.price}
                      </span>
                      {tier.period && (
                        <span
                          style={{
                            fontSize: 14,
                            color: "#6B7280",
                            marginLeft: 4,
                          }}
                        >
                          {tier.period}
                        </span>
                      )}
                    </div>
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                        marginBottom: 28,
                      }}
                    >
                      {tier.features.map((f) => (
                        <li
                          key={f}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            fontSize: 14,
                            color: "#4B5563",
                          }}
                        >
                          <span
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: "50%",
                              background: tier.gradient,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              fontSize: 11,
                              color: "white",
                            }}
                          >
                            \u2713
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      aria-label={`Juntar-me como ${tier.name} por ${tier.price}${tier.period}`}
                      style={{
                        width: "100%",
                        padding: "14px 24px",
                        borderRadius: 9999,
                        border: isTop ? "none" : "2px solid #3B82F6",
                        background: isTop ? tier.gradient : "transparent",
                        color: isTop ? "white" : "#3B82F6",
                        fontSize: 15,
                        minHeight: 44,
                        fontWeight: 700,
                        cursor: "pointer",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        transition: "transform 0.2s, box-shadow 0.2s",
                        boxShadow: isTop
                          ? "0 4px 20px rgba(59,130,246,0.3)"
                          : "none",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(-2px) scale(1.02)";
                        if (isTop)
                          e.currentTarget.style.boxShadow =
                            "0 8px 30px rgba(59,130,246,0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform =
                          "translateY(0) scale(1)";
                        if (isTop)
                          e.currentTarget.style.boxShadow =
                            "0 4px 20px rgba(59,130,246,0.3)";
                      }}
                    >
                      {`Juntar-me como ${tier.name}`}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              textAlign: "center",
              marginTop: 48,
              fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
              color: "#6B7280",
              fontStyle: "italic",
              maxWidth: 500,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Partilhar o projeto com alguem e tao valioso como qualquer contribuicao.
          </motion.p>
        </section>

        {/* ═══════════════════════ 7. VISAO ═══════════════════════ */}
        <section
          style={{
            padding: "100px 24px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Radial blue glow */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              height: 400,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              maxWidth: 750,
              margin: "0 auto",
              textAlign: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <h2
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                color: "#1E3A5F",
                marginBottom: 24,
                lineHeight: 1.3,
              }}
            >
              Isto e so o comeco.
            </h2>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
                fontWeight: 800,
                color: "#1E3A5F",
                lineHeight: 1.4,
              }}
            >
              Se gostas do que ves, ha mais a{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #3B82F6, #8B5CF6, #FDE68A)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                caminho.
              </span>
            </p>
          </motion.div>
        </section>

        {/* ═══════════════════════ 8. CONTACTO + FOOTER ═══════════════════════ */}
        <section
          id="contacto"
          aria-label="Formulario de contacto"
          style={{
            padding: "80px 24px 40px",
            maxWidth: 700,
            margin: "0 auto",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: 40 }}
          >
            <h2
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                color: "#1E3A5F",
                marginBottom: 12,
              }}
            >
              O ceu comeca com uma conversa
            </h2>
            <p
              style={{
                fontSize: "clamp(1rem, 2vw, 1.1rem)",
                color: "#6B7280",
              }}
            >
              Tens uma ideia? Queres colaborar? Envia uma mensagem.
            </p>
          </motion.div>

          {/* Contact links */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 20,
              marginBottom: 40,
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "Email", href: "mailto:hello@descomplicai.com", icon: "\u2709\ufe0f" },
              { label: "GitHub", href: "https://github.com", icon: "\ud83d\udc19" },
              { label: "LinkedIn", href: "https://linkedin.com", icon: "\ud83d\udcbc" },
            ].map((link) => (
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
                  minHeight: 44,
                  borderRadius: 9999,
                  background: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(59,130,246,0.1)",
                  color: "#1E3A5F",
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 500,
                  transition: "all 0.2s",
                  boxShadow: "0 2px 8px rgba(59,130,246,0.06)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 16px rgba(59,130,246,0.15)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(59,130,246,0.06)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span>{link.icon}</span>
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact form */}
          <motion.form
            onSubmit={handleFormSubmit}
            aria-label="Formulario de contacto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(12px)",
              borderRadius: 24,
              padding: "32px 28px",
              border: "1px solid rgba(59,130,246,0.08)",
              boxShadow: "0 4px 24px rgba(59,130,246,0.06)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div
              className="form-grid-responsive"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              <input
                type="text"
                placeholder="Nome"
                aria-label="O teu nome"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                required
                style={{
                  padding: "12px 16px",
                  borderRadius: 12,
                  border: "1px solid #e5e7eb",
                  fontSize: 16,
                  fontFamily: "'Inter', sans-serif",
                  background: "rgba(255,255,255,0.8)",
                  color: "#1E3A5F",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  width: "100%",
                }}
              />
              <input
                type="email"
                placeholder="Email"
                aria-label="O teu email"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                required
                style={{
                  padding: "12px 16px",
                  borderRadius: 12,
                  border: "1px solid #e5e7eb",
                  fontSize: 16,
                  fontFamily: "'Inter', sans-serif",
                  background: "rgba(255,255,255,0.8)",
                  color: "#1E3A5F",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  width: "100%",
                }}
              />
            </div>
            <textarea
              placeholder="A tua mensagem..."
              aria-label="A tua mensagem"
              value={formMsg}
              onChange={(e) => setFormMsg(e.target.value)}
              required
              rows={4}
              style={{
                padding: "12px 16px",
                borderRadius: 12,
                border: "1px solid #e5e7eb",
                fontSize: 16,
                fontFamily: "'Inter', sans-serif",
                background: "rgba(255,255,255,0.8)",
                color: "#1E3A5F",
                resize: "vertical",
                transition: "border-color 0.2s, box-shadow 0.2s",
                width: "100%",
              }}
            />
            <button
              type="submit"
              aria-label={formSent ? "Mensagem enviada" : "Enviar mensagem"}
              style={{
                alignSelf: isDesktop ? "flex-end" : "stretch",
                background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                color: "white",
                border: "none",
                borderRadius: 9999,
                padding: "14px 32px",
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: "transform 0.2s, box-shadow 0.2s",
                boxShadow: "0 4px 16px rgba(59,130,246,0.25)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 24px rgba(59,130,246,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 16px rgba(59,130,246,0.25)";
              }}
            >
              {formSent ? "\u2713 Enviado!" : "Enviar mensagem"}
            </button>
          </motion.form>
        </section>

        {/* Footer */}
        <footer
          style={{
            padding: "48px 24px 32px",
            background:
              "linear-gradient(180deg, transparent 0%, rgba(239,246,255,0.5) 50%, rgba(221,214,254,0.2) 100%)",
            textAlign: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo */}
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: 22,
                color: "#1E3A5F",
                marginBottom: 16,
              }}
            >
              descomplic
              <span
                style={{
                  background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ai
              </span>
            </div>

            <p
              style={{
                fontSize: 15,
                color: "#6B7280",
                marginBottom: 8,
              }}
            >
              Feito com {"\u2764\ufe0f"} para todos
            </p>

            <p
              style={{
                fontSize: 13,
                color: "#9CA3AF",
              }}
            >
              {"\u00a9"} {new Date().getFullYear()} Descomplicai. Todos os
              projetos sao gratuitos e open source.
            </p>

            {/* Small decorative dots */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 8,
                marginTop: 24,
              }}
            >
              {["#3B82F6", "#8B5CF6", "#FDE68A", "#FECDD3", "#DDD6FE"].map(
                (color, i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{
                      duration: 2,
                      delay: i * 0.3,
                      repeat: Infinity,
                    }}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: color,
                      opacity: 0.6,
                    }}
                  />
                )
              )}
            </div>
          </motion.div>
        </footer>
      </div>
    </>
  );
}
