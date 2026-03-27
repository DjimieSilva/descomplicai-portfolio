"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ==========================================================================
   DESCOMPLICAI COSMOS — Full Homepage Redesign Concept
   A deep-space themed experience where users scroll through the cosmos
   discovering Descomplicai's work like exploring galaxies.
   ========================================================================== */

// ---------------------------------------------------------------------------
// DATA
// ---------------------------------------------------------------------------

const SERVICES = [
  {
    emoji: "\uD83D\uDE80",
    title: "Presen\u00e7a Digital",
    description:
      "Sites, portf\u00f3lios e landing pages que comunicam a tua ess\u00eancia. Design moderno, r\u00e1pido e que converte.",
    color: "#06b6d4",
    items: ["Websites", "Portf\u00f3lios", "Landing Pages", "E-commerce"],
  },
  {
    emoji: "\uD83E\uDD16",
    title: "IA & Automa\u00e7\u00e3o",
    description:
      "Workflows inteligentes, chatbots e automa\u00e7\u00f5es que libertam o teu tempo para o que realmente importa.",
    color: "#a855f7",
    items: ["Chatbots", "Workflows", "Automa\u00e7\u00e3o", "Integra\u00e7\u00f5es"],
  },
  {
    emoji: "\uD83C\uDFAF",
    title: "Mentoria 1-1",
    description:
      "Sess\u00f5es de orienta\u00e7\u00e3o digital personalizadas. Do conceito ao lan\u00e7amento, lado a lado.",
    color: "#22c55e",
    items: ["Estrat\u00e9gia", "Acompanhamento", "Forma\u00e7\u00e3o", "Lan\u00e7amento"],
  },
];

const FEATURED_PROJECTS = [
  {
    name: "Jaime Silva",
    slug: "jaime-silva",
    emoji: "\uD83D\uDC64",
    description: "Portf\u00f3lio pessoal minimalista",
    gradient: "from-cyan-500 to-blue-600",
    color: "#06b6d4",
  },
  {
    name: "Fractal Explorer",
    slug: "fractal-explorer",
    emoji: "\uD83C\uDF00",
    description: "Explora\u00e7\u00e3o visual de fractais",
    gradient: "from-purple-500 to-pink-600",
    color: "#a855f7",
  },
  {
    name: "Synth",
    slug: "synth",
    emoji: "\uD83C\uDFB9",
    description: "Sintetizador interativo web",
    gradient: "from-green-500 to-emerald-600",
    color: "#22c55e",
  },
  {
    name: "Chess",
    slug: "chess",
    emoji: "\u265F\uFE0F",
    description: "Xadrez com IA integrada",
    gradient: "from-amber-500 to-orange-600",
    color: "#f59e0b",
  },
  {
    name: "Generative Art",
    slug: "generative-art",
    emoji: "\uD83C\uDFA8",
    description: "Arte generativa e criativa",
    gradient: "from-rose-500 to-red-600",
    color: "#f43f5e",
  },
  {
    name: "DentalKid",
    slug: "dentalkid",
    emoji: "\uD83E\uDDB7",
    description: "Cl\u00ednica dent\u00e1ria infantil",
    gradient: "from-sky-400 to-indigo-600",
    color: "#38bdf8",
  },
];

const PORTFOLIO_CATEGORIES = [
  {
    label: "Restaurantes",
    count: 17,
    items: [
      { name: "Ca\u00e7arola", slug: "cacarola" },
      { name: "Mesa dos Amigos", slug: "mesa-dos-amigos" },
      { name: "Tasca da Praia", slug: "tasca-da-praia" },
      { name: "Sabor Aben\u00e7oado", slug: "sabor-abencoado" },
      { name: "Marisqueira Rosa Am\u00e9lia", slug: "marisqueira-rosa-amelia" },
      { name: "Tasca Dentro", slug: "tasca-dentro" },
      { name: "P\u00e9 na Areia", slug: "pe-na-areia" },
      { name: "Vindima Selvagem", slug: "vindima-selvagem" },
    ],
  },
  {
    label: "Cl\u00ednicas",
    count: 8,
    items: [
      { name: "Alba Sa\u00fade Dent\u00e1ria", slug: "alba-saude-dentaria" },
      { name: "Premium Cl\u00ednica", slug: "premium-clinica-dentaria" },
      { name: "FozCl\u00ednica", slug: "fozclinica" },
      { name: "Cl\u00ednica Tamargueira", slug: "clinica-tamargueira" },
      { name: "DentalKid", slug: "dentalkid" },
      { name: "Cl\u00ednica Quiaios", slug: "clinica-dentaria-quiaios" },
    ],
  },
  {
    label: "Tools",
    count: 30,
    items: [
      { name: "Fractal Explorer", slug: "fractal-explorer" },
      { name: "Synth", slug: "synth" },
      { name: "Chess", slug: "chess" },
      { name: "Pomodoro", slug: "pomodoro" },
      { name: "Calculator", slug: "calculator" },
      { name: "Drawing Canvas", slug: "drawing-canvas" },
      { name: "Markdown Editor", slug: "markdown-editor" },
      { name: "JSON Formatter", slug: "json-formatter" },
    ],
  },
  {
    label: "Experi\u00eancias",
    count: 10,
    items: [
      { name: "Generative Art", slug: "generative-art" },
      { name: "Particle Sim", slug: "particle-sim" },
      { name: "Solar System", slug: "solar-system" },
      { name: "Globe Explorer", slug: "globe-explorer" },
      { name: "Aurora Borealis", slug: "aurora-borealis" },
      { name: "Music Visualizer", slug: "music-visualizer" },
    ],
  },
];

const PROCESS_STEPS = [
  {
    number: 1,
    title: "Conversa",
    description:
      "Ouvimos a tua vis\u00e3o, os teus objetivos e o que te move. Cada projeto come\u00e7a com uma conversa honesta.",
    emoji: "\uD83D\uDCAC",
  },
  {
    number: 2,
    title: "Pesquisa",
    description:
      "Analisamos o mercado, a concorr\u00eancia e as melhores pr\u00e1ticas para criar algo que se destaque.",
    emoji: "\uD83D\uDD0D",
  },
  {
    number: 3,
    title: "Design",
    description:
      "Desenhamos cada detalhe com inten\u00e7\u00e3o. Cada pixel tem um prop\u00f3sito, cada intera\u00e7\u00e3o conta uma hist\u00f3ria.",
    emoji: "\uD83C\uDFA8",
  },
  {
    number: 4,
    title: "Build",
    description:
      "Constru\u00edmos com as melhores tecnologias. C\u00f3digo limpo, r\u00e1pido e feito para durar.",
    emoji: "\uD83D\uDE80",
  },
];

const CONTACT_METHODS = [
  {
    icon: "\u2709\uFE0F",
    title: "Email",
    description: "ola@descomplicai.pt",
    href: "mailto:ola@descomplicai.pt",
    color: "#06b6d4",
  },
  {
    icon: "\uD83D\uDCAC",
    title: "WhatsApp",
    description: "Mensagem direta",
    href: "https://wa.me/351910000000",
    color: "#22c55e",
  },
  {
    icon: "\uD83D\uDCC5",
    title: "Agendar Reuni\u00e3o",
    description: "Marca uma sess\u00e3o",
    href: "#contacto",
    color: "#a855f7",
  },
];

// ---------------------------------------------------------------------------
// STAR FIELD GENERATOR
// ---------------------------------------------------------------------------

function generateStars(count: number) {
  const stars: { x: number; y: number; size: number; delay: number; duration: number }[] = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    });
  }
  return stars;
}

const HERO_STARS = generateStars(150);
const BG_STARS = generateStars(80);

// ---------------------------------------------------------------------------
// GLOBAL STYLES (injected as <style>)
// ---------------------------------------------------------------------------

const globalStyles = `
  /* ---- RESET & BASE ---- */
  .cosmos-root {
    font-family: var(--font-inter, 'Inter', system-ui, sans-serif);
    background: #030014;
    color: #ffffff;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }
  .cosmos-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .cosmos-heading {
    font-family: var(--font-sora, 'Sora', system-ui, sans-serif);
  }

  /* ---- STAR TWINKLE ---- */
  @keyframes twinkle {
    0%, 100% { opacity: 0.2; }
    50% { opacity: 1; }
  }

  /* ---- NEBULA DRIFT ---- */
  @keyframes nebulaDrift1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -20px) scale(1.05); }
    66% { transform: translate(-20px, 15px) scale(0.95); }
  }
  @keyframes nebulaDrift2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(-25px, 20px) scale(1.08); }
    66% { transform: translate(15px, -25px) scale(0.92); }
  }
  @keyframes nebulaDrift3 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(20px, 25px) scale(0.96); }
    66% { transform: translate(-30px, -15px) scale(1.04); }
  }

  /* ---- ORBIT ---- */
  @keyframes orbit {
    0% { transform: rotate(0deg) translateX(180px) rotate(0deg); }
    100% { transform: rotate(360deg) translateX(180px) rotate(-360deg); }
  }
  @keyframes orbitMobile {
    0% { transform: rotate(0deg) translateX(110px) rotate(0deg); }
    100% { transform: rotate(360deg) translateX(110px) rotate(-360deg); }
  }

  /* ---- TYPING CURSOR ---- */
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  /* ---- BOUNCE CHEVRON ---- */
  @keyframes bounceDown {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(10px); }
  }

  /* ---- GLOW PULSE ---- */
  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 20px rgba(6, 182, 212, 0.3); }
    50% { box-shadow: 0 0 40px rgba(6, 182, 212, 0.6); }
  }

  /* ---- DASH ANIMATION ---- */
  @keyframes dashFlow {
    0% { stroke-dashoffset: 20; }
    100% { stroke-dashoffset: 0; }
  }

  /* ---- CONSTELLATION ---- */
  @keyframes constellationFade {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.8; }
  }

  /* ---- AURORA ---- */
  @keyframes auroraShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  /* ---- ROCKET PATH ---- */
  @keyframes rocketFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
  }

  /* ---- GRADIENT TEXT ---- */
  .gradient-text {
    background: linear-gradient(135deg, #06b6d4 0%, #a855f7 50%, #ec4899 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .gradient-text-cyan {
    background: linear-gradient(135deg, #06b6d4 0%, #a855f7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ---- GLASSMORPHISM ---- */
  .glass {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  .glass-strong {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.12);
  }

  /* ---- SCROLLBAR ---- */
  .cosmos-root::-webkit-scrollbar { width: 6px; }
  .cosmos-root::-webkit-scrollbar-track { background: #030014; }
  .cosmos-root::-webkit-scrollbar-thumb { background: rgba(168, 85, 247, 0.4); border-radius: 3px; }

  /* ---- SELECTION ---- */
  .cosmos-root ::selection {
    background: rgba(168, 85, 247, 0.4);
    color: #ffffff;
  }
`;

// ---------------------------------------------------------------------------
// COMPONENT: StarField
// ---------------------------------------------------------------------------

function StarField({
  stars,
  parallaxX = 0,
  parallaxY = 0,
}: {
  stars: typeof HERO_STARS;
  parallaxX?: number;
  parallaxY?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        transform: `translate(${parallaxX}px, ${parallaxY}px)`,
        transition: "transform 0.3s ease-out",
      }}
    >
      {stars.map((star, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            borderRadius: "50%",
            background: "#ffffff",
            animation: `twinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// COMPONENT: Nebula
// ---------------------------------------------------------------------------

function Nebula({
  color,
  x,
  y,
  size,
  animationName,
}: {
  color: string;
  x: string;
  y: string;
  size: number;
  animationName: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity: 0.15,
        filter: "blur(60px)",
        animation: `${animationName} 25s ease-in-out infinite`,
        pointerEvents: "none",
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// COMPONENT: Section Wrapper
// ---------------------------------------------------------------------------

function Section({
  id,
  children,
  className = "",
  style = {},
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      style={{
        position: "relative",
        padding: "120px 24px",
        maxWidth: 1280,
        margin: "0 auto",
        ...style,
      }}
      initial={{ opacity: 0, y: 60 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

// ---------------------------------------------------------------------------
// COMPONENT: SectionTitle
// ---------------------------------------------------------------------------

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 64 }}>
      <h2
        className="cosmos-heading"
        style={{
          fontSize: "clamp(2rem, 5vw, 3rem)",
          fontWeight: 800,
          marginBottom: 16,
          position: "relative",
          display: "inline-block",
        }}
      >
        {children}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          style={{
            position: "absolute",
            bottom: -8,
            left: 0,
            height: 3,
            borderRadius: 2,
            background: "linear-gradient(90deg, #06b6d4, #a855f7, #ec4899)",
          }}
        />
      </h2>
    </div>
  );
}

// ---------------------------------------------------------------------------
// COMPONENT: Navigation
// ---------------------------------------------------------------------------

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Servi\u00e7os", href: "#servicos" },
    { label: "Projetos", href: "#projetos" },
    { label: "Processo", href: "#processo" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: "0 24px",
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          background: scrolled ? "rgba(3, 0, 20, 0.8)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <a
            href="#hero"
            className="cosmos-heading gradient-text-cyan"
            style={{
              fontSize: "1.3rem",
              fontWeight: 800,
              textDecoration: "none",
              letterSpacing: "-0.02em",
            }}
          >
            descomplicai
          </a>

          {/* Desktop Links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 32,
            }}
            className="nav-desktop"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#ffffff")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.7)")
                }
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              className="glass"
              style={{
                padding: "10px 24px",
                borderRadius: 50,
                color: "#ffffff",
                textDecoration: "none",
                fontSize: "0.85rem",
                fontWeight: 600,
                transition: "all 0.3s",
                border: "1px solid rgba(6, 182, 212, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 25px rgba(6, 182, 212, 0.4)";
                e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.3)";
              }}
            >
              Falar connosco
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="nav-mobile-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
            style={{
              display: "none",
              background: "none",
              border: "none",
              color: "#ffffff",
              fontSize: "1.5rem",
              cursor: "pointer",
              padding: 8,
            }}
          >
            {mobileOpen ? "\u2715" : "\u2630"}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 999,
              background: "rgba(3, 0, 20, 0.95)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 40,
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="cosmos-heading"
                style={{
                  color: "#ffffff",
                  textDecoration: "none",
                  fontSize: "1.8rem",
                  fontWeight: 700,
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setMobileOpen(false)}
              className="glass"
              style={{
                padding: "14px 40px",
                borderRadius: 50,
                color: "#ffffff",
                textDecoration: "none",
                fontSize: "1rem",
                fontWeight: 600,
                border: "1px solid rgba(6, 182, 212, 0.4)",
              }}
            >
              Falar connosco
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive CSS for nav */}
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}

// ---------------------------------------------------------------------------
// COMPONENT: HeroSection
// ---------------------------------------------------------------------------

function HeroSection() {
  const [parallaxX, setParallaxX] = useState(0);
  const [parallaxY, setParallaxY] = useState(0);
  const [typedText, setTypedText] = useState("");
  const fullText = "Tornamos a intelig\u00eancia artificial acess\u00edvel.";
  const [typingDone, setTypingDone] = useState(false);

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * -20;
      const y = (e.clientY / window.innerHeight - 0.5) * -20;
      setParallaxX(x);
      setParallaxY(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Typing effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        setTypingDone(true);
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: "P\u00e1ginas", value: "109" },
    { label: "Projetos", value: "55+" },
    { label: "Linhas", value: "52K" },
  ];

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        height: "100vh",
        minHeight: 700,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#030014",
      }}
    >
      {/* Star Field with Parallax */}
      <StarField stars={HERO_STARS} parallaxX={parallaxX} parallaxY={parallaxY} />

      {/* Nebulae */}
      <Nebula color="rgba(168, 85, 247, 0.5)" x="10%" y="20%" size={500} animationName="nebulaDrift1" />
      <Nebula color="rgba(6, 182, 212, 0.4)" x="60%" y="50%" size={600} animationName="nebulaDrift2" />
      <Nebula color="rgba(236, 72, 153, 0.3)" x="30%" y="70%" size={450} animationName="nebulaDrift3" />

      {/* Center Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          maxWidth: 800,
          padding: "0 24px",
        }}
      >
        {/* Main Title */}
        <motion.h1
          className="cosmos-heading gradient-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            fontSize: "clamp(3rem, 8vw, 5rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: 16,
            letterSpacing: "-0.03em",
          }}
        >
          DESCOMPLICAI
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "rgba(255,255,255,0.6)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 32,
            fontWeight: 400,
          }}
        >
          Estrutura Digital &middot; Mentoria &middot; IA
        </motion.p>

        {/* Typing Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          style={{
            fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
            color: "rgba(255,255,255,0.85)",
            marginBottom: 48,
            minHeight: "2em",
            fontWeight: 300,
          }}
        >
          {typedText}
          <span
            style={{
              animation: "blink 1s step-end infinite",
              marginLeft: 2,
              color: "#06b6d4",
              fontWeight: 100,
            }}
          >
            {typingDone ? "" : "|"}
          </span>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <a
            href="#servicos"
            className="glass"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "16px 40px",
              borderRadius: 50,
              color: "#ffffff",
              textDecoration: "none",
              fontSize: "1rem",
              fontWeight: 600,
              border: "1px solid rgba(6, 182, 212, 0.3)",
              animation: "glowPulse 3s ease-in-out infinite",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(6, 182, 212, 0.15)";
              e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.3)";
            }}
          >
            Explorar o Universo <span style={{ fontSize: "1.2rem" }}>&darr;</span>
          </a>
        </motion.div>
      </div>

      {/* Orbiting Stats */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 0,
          height: 0,
          zIndex: 5,
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            className="orbit-stat"
            style={{
              position: "absolute",
              animation: `orbit 20s linear infinite`,
              animationDelay: `${(i * 20) / 3}s`,
            }}
          >
            <div
              className="glass"
              style={{
                width: 90,
                height: 90,
                borderRadius: "50%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transform: "translate(-50%, -50%)",
              }}
            >
              <span
                className="cosmos-heading"
                style={{ fontSize: "1.1rem", fontWeight: 800, color: "#06b6d4" }}
              >
                {stat.value}
              </span>
              <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.6)", marginTop: 2 }}>
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          animation: "bounceDown 2s ease-in-out infinite",
          color: "rgba(255,255,255,0.4)",
          fontSize: "1.5rem",
        }}
      >
        &#8964;
      </div>

      {/* Orbit responsive */}
      <style>{`
        @media (max-width: 768px) {
          .orbit-stat {
            animation-name: orbitMobile !important;
          }
          .orbit-stat .glass {
            width: 70px !important;
            height: 70px !important;
          }
          .orbit-stat .cosmos-heading {
            font-size: 0.9rem !important;
          }
        }
        @media (max-width: 480px) {
          .orbit-stat { display: none !important; }
        }
      `}</style>
    </section>
  );
}

// ---------------------------------------------------------------------------
// COMPONENT: ServicesSection
// ---------------------------------------------------------------------------

function ServicesSection() {
  return (
    <div
      style={{
        position: "relative",
        background: "linear-gradient(180deg, #030014 0%, #0a0025 50%, #030014 100%)",
      }}
    >
      {/* Subtle background stars */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", opacity: 0.5 }}>
        <StarField stars={BG_STARS} />
      </div>

      <Section id="servicos">
        <SectionTitle>O que fazemos</SectionTitle>

        {/* Connecting Lines SVG */}
        <svg
          className="service-lines"
          style={{
            position: "absolute",
            top: "55%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80%",
            height: 4,
            overflow: "visible",
          }}
        >
          <line
            x1="15%"
            y1="0"
            x2="85%"
            y2="0"
            stroke="rgba(168, 85, 247, 0.3)"
            strokeWidth="2"
            strokeDasharray="8 6"
            style={{ animation: "dashFlow 2s linear infinite" }}
          />
        </svg>

        {/* Service Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 32,
            position: "relative",
            zIndex: 2,
          }}
        >
          {SERVICES.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="glass"
              style={{
                borderRadius: 20,
                padding: 40,
                borderTop: `3px solid ${service.color}`,
                cursor: "default",
                transition: "box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${service.color}33`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: 20 }}>{service.emoji}</div>
              <h3
                className="cosmos-heading"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  marginBottom: 12,
                }}
              >
                {service.title}
              </h3>
              <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.7,
                  fontSize: "0.95rem",
                  marginBottom: 24,
                }}
              >
                {service.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {service.items.map((item, i) => (
                  <span
                    key={i}
                    style={{
                      padding: "6px 14px",
                      borderRadius: 20,
                      fontSize: "0.75rem",
                      background: `${service.color}15`,
                      color: service.color,
                      border: `1px solid ${service.color}30`,
                      fontWeight: 500,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hide SVG lines on mobile */}
        <style>{`
          @media (max-width: 768px) {
            .service-lines { display: none; }
          }
        `}</style>
      </Section>
    </div>
  );
}

// ---------------------------------------------------------------------------
// COMPONENT: FeaturedProjectsSection
// ---------------------------------------------------------------------------

function FeaturedProjectsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      style={{
        position: "relative",
        background: "#030014",
      }}
    >
      <Section id="projetos">
        <SectionTitle>Gal\u00e1xias em Destaque</SectionTitle>

        {/* Orbit lines SVG background */}
        <svg
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 600,
            opacity: 0.1,
            pointerEvents: "none",
          }}
        >
          <circle cx="300" cy="300" r="120" fill="none" stroke="#a855f7" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="300" cy="300" r="200" fill="none" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="300" cy="300" r="280" fill="none" stroke="#ec4899" strokeWidth="1" strokeDasharray="4 4" />
        </svg>

        {/* Projects Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 32,
            maxWidth: 900,
            margin: "0 auto",
            position: "relative",
            zIndex: 2,
          }}
        >
          {FEATURED_PROJECTS.map((project, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Link
                  href={`/projetos/${project.slug}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <motion.div
                    animate={{
                      scale: isHovered ? 1.1 : 1,
                      boxShadow: isHovered
                        ? `0 0 50px ${project.color}44`
                        : `0 0 20px ${project.color}11`,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      width: 140,
                      height: 140,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${project.color}33, ${project.color}11)`,
                      border: `2px solid ${project.color}44`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "3rem",
                      marginBottom: 16,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Glow ring */}
                    <div
                      style={{
                        position: "absolute",
                        inset: -2,
                        borderRadius: "50%",
                        border: `2px solid ${project.color}`,
                        opacity: isHovered ? 0.6 : 0,
                        transition: "opacity 0.3s",
                      }}
                    />
                    {project.emoji}
                  </motion.div>

                  <motion.div
                    style={{ textAlign: "center" }}
                    animate={{ opacity: isHovered ? 1 : 0.8 }}
                  >
                    <h3
                      className="cosmos-heading"
                      style={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        marginBottom: 4,
                      }}
                    >
                      {project.name}
                    </h3>
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <p
                            style={{
                              fontSize: "0.8rem",
                              color: "rgba(255,255,255,0.5)",
                              marginBottom: 8,
                            }}
                          >
                            {project.description}
                          </p>
                          <span
                            style={{
                              fontSize: "0.8rem",
                              color: project.color,
                              fontWeight: 600,
                            }}
                          >
                            Ver &rarr;
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}

// ---------------------------------------------------------------------------
// COMPONENT: PortfolioShowcase
// ---------------------------------------------------------------------------

function PortfolioShowcase() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div
      style={{
        position: "relative",
        background: "linear-gradient(180deg, #030014 0%, #050020 50%, #030014 100%)",
      }}
    >
      <Section id="portfolio">
        <SectionTitle>O Universo Completo</SectionTitle>

        {/* Category Tabs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 48,
          }}
        >
          {PORTFOLIO_CATEGORIES.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(i)}
              className={activeCategory === i ? "glass-strong" : ""}
              style={{
                padding: "10px 24px",
                borderRadius: 50,
                border:
                  activeCategory === i
                    ? "1px solid rgba(6, 182, 212, 0.4)"
                    : "1px solid rgba(255,255,255,0.1)",
                background:
                  activeCategory === i
                    ? "rgba(6, 182, 212, 0.1)"
                    : "rgba(255,255,255,0.03)",
                color:
                  activeCategory === i
                    ? "#06b6d4"
                    : "rgba(255,255,255,0.6)",
                cursor: "pointer",
                fontSize: "0.85rem",
                fontWeight: 600,
                transition: "all 0.3s",
                fontFamily: "inherit",
              }}
            >
              {cat.label}
              <span
                style={{
                  marginLeft: 8,
                  fontSize: "0.75rem",
                  opacity: 0.6,
                }}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 16,
            marginBottom: 48,
          }}
        >
          {PORTFOLIO_CATEGORIES[activeCategory].items.map((item, i) => (
            <Link
              key={i}
              href={`/projetos/${item.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                style={{
                  padding: 24,
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(6, 182, 212, 0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                }}
              >
                <h4
                  className="cosmos-heading"
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    marginBottom: 4,
                  }}
                >
                  {item.name}
                </h4>
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  Ver projeto &rarr;
                </span>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* View All Link */}
        <div style={{ textAlign: "center" }}>
          <Link
            href="/projetos"
            className="glass"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 32px",
              borderRadius: 50,
              color: "#06b6d4",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: 600,
              border: "1px solid rgba(6, 182, 212, 0.3)",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(6, 182, 212, 0.1)";
              e.currentTarget.style.boxShadow = "0 0 30px rgba(6, 182, 212, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Ver todos os projetos &rarr;
          </Link>
        </div>
      </Section>
    </div>
  );
}

// ---------------------------------------------------------------------------
// COMPONENT: ManifestoSection
// ---------------------------------------------------------------------------

function ManifestoSection() {
  // Generate constellation points
  const constellationPoints = Array.from({ length: 20 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 4,
  }));

  // Create connections between nearby points
  const connections: { x1: number; y1: number; x2: number; y2: number; delay: number }[] = [];
  for (let i = 0; i < constellationPoints.length; i++) {
    for (let j = i + 1; j < constellationPoints.length; j++) {
      const dx = constellationPoints[i].x - constellationPoints[j].x;
      const dy = constellationPoints[i].y - constellationPoints[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 25) {
        connections.push({
          x1: constellationPoints[i].x,
          y1: constellationPoints[i].y,
          x2: constellationPoints[j].x,
          y2: constellationPoints[j].y,
          delay: Math.random() * 3,
        });
      }
    }
  }

  const values = [
    { label: "Humanos Primeiro", color: "#06b6d4" },
    { label: "Vida Aut\u00eantica", color: "#a855f7" },
    { label: "Amor no C\u00f3digo", color: "#ec4899" },
  ];

  return (
    <div
      style={{
        position: "relative",
        background: "#030014",
        overflow: "hidden",
      }}
    >
      {/* Constellation Background */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {connections.map((conn, i) => (
          <line
            key={`line-${i}`}
            x1={`${conn.x1}%`}
            y1={`${conn.y1}%`}
            x2={`${conn.x2}%`}
            y2={`${conn.y2}%`}
            stroke="rgba(168, 85, 247, 0.15)"
            strokeWidth="1"
            style={{
              animation: `constellationFade 4s ease-in-out infinite`,
              animationDelay: `${conn.delay}s`,
            }}
          />
        ))}
        {constellationPoints.map((point, i) => (
          <circle
            key={`point-${i}`}
            cx={`${point.x}%`}
            cy={`${point.y}%`}
            r="2"
            fill="rgba(168, 85, 247, 0.4)"
            style={{
              animation: `constellationFade 3s ease-in-out infinite`,
              animationDelay: `${point.delay}s`,
            }}
          />
        ))}
      </svg>

      <Section>
        <div
          style={{
            textAlign: "center",
            maxWidth: 700,
            margin: "0 auto",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Quote marks */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              fontSize: "4rem",
              color: "rgba(168, 85, 247, 0.3)",
              marginBottom: -20,
              fontFamily: "Georgia, serif",
            }}
          >
            &ldquo;
          </motion.div>

          <motion.h2
            className="cosmos-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              lineHeight: 1.3,
              marginBottom: 48,
              background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            O futuro \u00e9 humano.
            <br />A tecnologia \u00e9 o caminho.
          </motion.h2>

          {/* Value Pills */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="glass"
                style={{
                  padding: "12px 28px",
                  borderRadius: 50,
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: value.color,
                  border: `1px solid ${value.color}33`,
                }}
              >
                {value.label}
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}

// ---------------------------------------------------------------------------
// COMPONENT: ProcessSection
// ---------------------------------------------------------------------------

function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rocketY = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "90%"]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        background: "linear-gradient(180deg, #030014 0%, #080028 50%, #030014 100%)",
      }}
    >
      <Section id="processo">
        <SectionTitle>Como Trabalhamos</SectionTitle>

        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            position: "relative",
          }}
        >
          {/* Vertical connecting line */}
          <div
            className="process-line"
            style={{
              position: "absolute",
              left: 30,
              top: 0,
              bottom: 0,
              width: 2,
              background: "linear-gradient(180deg, #06b6d4 0%, #a855f7 50%, #ec4899 100%)",
              opacity: 0.3,
            }}
          />

          {/* Rocket traveling along the path */}
          <motion.div
            className="process-rocket"
            style={{
              position: "absolute",
              left: 18,
              top: rocketY,
              fontSize: "1.5rem",
              zIndex: 5,
              animation: "rocketFloat 2s ease-in-out infinite",
              filter: "drop-shadow(0 0 10px rgba(6, 182, 212, 0.5))",
            }}
          >
            {"\uD83D\uDE80"}
          </motion.div>

          {/* Process Steps */}
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              style={{
                display: "flex",
                gap: 32,
                marginBottom: index < PROCESS_STEPS.length - 1 ? 64 : 0,
                position: "relative",
              }}
            >
              {/* Node Circle */}
              <div
                style={{
                  width: 62,
                  height: 62,
                  minWidth: 62,
                  borderRadius: "50%",
                  background: "rgba(6, 182, 212, 0.1)",
                  border: "2px solid rgba(6, 182, 212, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                {step.emoji}
              </div>

              {/* Content */}
              <div style={{ paddingTop: 8 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "#06b6d4",
                      background: "rgba(6, 182, 212, 0.1)",
                      padding: "4px 12px",
                      borderRadius: 20,
                    }}
                  >
                    0{step.number}
                  </span>
                  <h3
                    className="cosmos-heading"
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: 700,
                    }}
                  >
                    {step.title}
                  </h3>
                </div>
                <p
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    lineHeight: 1.7,
                    fontSize: "0.95rem",
                    maxWidth: 500,
                  }}
                >
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Responsive hide rocket/line on mobile */}
        <style>{`
          @media (max-width: 480px) {
            .process-rocket { display: none; }
            .process-line { left: 15px !important; }
          }
        `}</style>
      </Section>
    </div>
  );
}

// ---------------------------------------------------------------------------
// COMPONENT: ContactSection
// ---------------------------------------------------------------------------

function ContactSection() {
  return (
    <div
      id="contacto"
      style={{
        position: "relative",
        background: "#030014",
        overflow: "hidden",
      }}
    >
      {/* Aurora background */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "60%",
          background:
            "linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(168, 85, 247, 0.05) 50%, rgba(236, 72, 153, 0.03) 100%)",
          backgroundSize: "200% 200%",
          animation: "auroraShift 15s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      {/* Stars */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", opacity: 0.3 }}>
        <StarField stars={generateStars(40)} />
      </div>

      <Section>
        <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
          <motion.h2
            className="cosmos-heading gradient-text"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              marginBottom: 16,
            }}
          >
            Vamos explorar juntos?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "1.1rem",
              marginBottom: 56,
              maxWidth: 500,
              margin: "0 auto 56px",
            }}
          >
            O teu pr\u00f3ximo projeto come\u00e7a com uma conversa. Escolhe o canal que preferes.
          </motion.p>

          {/* Contact Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 24,
              maxWidth: 800,
              margin: "0 auto",
            }}
          >
            {CONTACT_METHODS.map((method, index) => (
              <motion.a
                key={index}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="glass"
                style={{
                  padding: 32,
                  borderRadius: 20,
                  textDecoration: "none",
                  color: "inherit",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "box-shadow 0.3s, border-color 0.3s",
                  borderColor: "rgba(255,255,255,0.1)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${method.color}22`;
                  (e.currentTarget as HTMLElement).style.borderColor = `${method.color}44`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>{method.icon}</div>
                <h3
                  className="cosmos-heading"
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    marginBottom: 8,
                  }}
                >
                  {method.title}
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "0.9rem",
                  }}
                >
                  {method.description}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}

// ---------------------------------------------------------------------------
// COMPONENT: Footer
// ---------------------------------------------------------------------------

function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      style={{
        position: "relative",
        background: "#030014",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "48px 24px",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        {/* Main Footer Text */}
        <p
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: "0.85rem",
            textAlign: "center",
          }}
        >
          &copy; 2026 Descomplicai &middot; Figueira da Foz &middot; Portugal
        </p>

        {/* Social Links */}
        <div style={{ display: "flex", gap: 24 }}>
          <a
            href="https://github.com/jaimesilvapt"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "rgba(255,255,255,0.4)",
              textDecoration: "none",
              fontSize: "0.85rem",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/jaimesilvapt"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "rgba(255,255,255,0.4)",
              textDecoration: "none",
              fontSize: "0.85rem",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
          >
            LinkedIn
          </a>
        </div>

        {/* Made with */}
        <p
          style={{
            color: "rgba(255,255,255,0.2)",
            fontSize: "0.75rem",
          }}
        >
          Feito com &#10084;&#65039; e Claude
        </p>
      </div>

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="glass"
            style={{
              position: "fixed",
              bottom: 32,
              right: 32,
              width: 48,
              height: 48,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#ffffff",
              cursor: "pointer",
              fontSize: "1.2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 100,
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(6, 182, 212, 0.4)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(6, 182, 212, 0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            &uarr;
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// MAIN PAGE COMPONENT
// ---------------------------------------------------------------------------

export default function DescomplicaiCosmosPage() {
  return (
    <div className="cosmos-root">
      {/* Inject global styles */}
      <style>{globalStyles}</style>

      {/* Navigation */}
      <Navigation />

      {/* Hero */}
      <HeroSection />

      {/* Services */}
      <ServicesSection />

      {/* Featured Projects */}
      <FeaturedProjectsSection />

      {/* Portfolio Showcase */}
      <PortfolioShowcase />

      {/* Manifesto */}
      <ManifestoSection />

      {/* Process */}
      <ProcessSection />

      {/* Contact */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
