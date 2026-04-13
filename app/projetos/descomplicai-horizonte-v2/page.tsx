"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";

/* ═══════════════════════════════════════════════════════════════
   DESCOMPLICAI HORIZONTE v2 — Sunrise Crowdfunding Homepage
   "Apoiem-me para que eu possa continuar a criar para todos."

   Design DNA: Sunrise gradients, glassmorphism, warm community
   Colors: Indigo #6366F1, Violet #8B5CF6, Orange #F97316, Amber #F59E0B
   Background: #EFF6FF → #F5F3FF → #FFF7ED (sunrise progression)
   ═══════════════════════════════════════════════════════════════ */

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-jakarta",
});

/* ─────────────────────────── DATA ─────────────────────────── */

const NAV_LINKS = [
  { label: "Início", href: "#hero" },
  { label: "A Minha História", href: "#story" },
  { label: "Impacto", href: "#impact" },
  { label: "Apoiar", href: "#tiers" },
  { label: "Projectos", href: "#projects" },
  { label: "Transparência", href: "#transparency" },
  { label: "Caminho", href: "#roadmap" },
  { label: "FAQ", href: "#faq" },
];

const IMPACT_NUMBERS = [
  { value: 160, suffix: "+", label: "Projectos Criados", icon: "🚀", gradient: "linear-gradient(135deg, #6366F1, #8B5CF6)" },
  { value: 36, suffix: "", label: "Ferramentas Open-Source", icon: "🔧", gradient: "linear-gradient(135deg, #8B5CF6, #A78BFA)" },
  { value: 10, suffix: "%", label: "Devolvido à Comunidade", icon: "❤️", gradient: "linear-gradient(135deg, #F97316, #F59E0B)" },
  { value: 0, suffix: "€", label: "Cobrado por Educação", icon: "📚", gradient: "linear-gradient(135deg, #6366F1, #F97316)" },
];

const SUPPORT_TIERS = [
  {
    name: "Estrela",
    emoji: "⭐",
    price: 5,
    popular: false,
    gradient: "linear-gradient(135deg, #6366F1 0%, #818CF8 100%)",
    borderGradient: "linear-gradient(135deg, #6366F1, #A78BFA)",
    features: [
      "Acesso antecipado a todos os projectos",
      "Newsletter exclusiva semanal",
      "Badge de apoiante no perfil",
      "Nome nos créditos do site",
      "Acesso ao canal privado",
    ],
  },
  {
    name: "Sol",
    emoji: "☀️",
    price: 15,
    popular: true,
    gradient: "linear-gradient(135deg, #8B5CF6 0%, #F97316 100%)",
    borderGradient: "linear-gradient(135deg, #8B5CF6, #F97316)",
    features: [
      "Tudo do plano Estrela",
      "Consultoria mensal de 30 minutos",
      "Grupo privado de discussão",
      "Votação em novos projectos",
      "Behind-the-scenes do processo",
      "Acesso a templates exclusivos",
    ],
  },
  {
    name: "Horizonte",
    emoji: "🌅",
    price: 50,
    popular: false,
    gradient: "linear-gradient(135deg, #F97316 0%, #F59E0B 100%)",
    borderGradient: "linear-gradient(135deg, #F97316, #F59E0B)",
    features: [
      "Tudo do plano Sol",
      "Mentoria personalizada mensal",
      "Projecto personalizado por trimestre",
      "Convite para eventos exclusivos",
      "Co-criação de ferramentas",
      "Reconhecimento como co-fundador",
      "Acesso vitalício a tudo",
    ],
  },
];

const FEATURED_PROJECTS = [
  { name: "Futuro Portfolio", emoji: "🌐", category: "3D / WebGL", description: "Portfolio futurista com efeitos 3D, partículas interativas e navegação imersiva.", gradient: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)" },
  { name: "Seeds", emoji: "🌱", category: "Storytelling", description: "Plataforma de storytelling visual onde cada história cresce como uma planta.", gradient: "linear-gradient(135deg, #10B981 0%, #34D399 100%)" },
  { name: "Mente", emoji: "🧠", category: "Learning", description: "Sistema de aprendizagem adaptativo com spaced repetition e gamificação.", gradient: "linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)" },
  { name: "BFITFAM", emoji: "💪", category: "Fitness", description: "Plataforma de fitness comunitária com treinos, tracking e motivação.", gradient: "linear-gradient(135deg, #F97316 0%, #EF4444 100%)" },
  { name: "NinikaTours", emoji: "🍷", category: "Wine Tourism", description: "Experiência digital para turismo vinícola no Douro e Bairrada.", gradient: "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)" },
  { name: "Design System", emoji: "🧩", category: "Components", description: "Sistema de design com 15+ componentes, tokens e documentação viva.", gradient: "linear-gradient(135deg, #06B6D4 0%, #6366F1 100%)" },
];

const REVENUE_DATA = [
  { month: "Out", amount: 120, percentage: 15 },
  { month: "Nov", amount: 280, percentage: 35 },
  { month: "Dez", amount: 350, percentage: 44 },
  { month: "Jan", amount: 520, percentage: 65 },
  { month: "Fev", amount: 610, percentage: 76 },
  { month: "Mar", amount: 720, percentage: 90 },
  { month: "Abr", amount: 810, percentage: 100 },
];

const EXPENSE_BREAKDOWN = [
  { label: "Hosting & Infraestrutura", percentage: 25, color: "#6366F1", amount: "€202" },
  { label: "APIs & Serviços", percentage: 20, color: "#8B5CF6", amount: "€162" },
  { label: "Ferramentas & Software", percentage: 15, color: "#A78BFA", amount: "€121" },
  { label: "Tempo & Desenvolvimento", percentage: 30, color: "#F97316", amount: "€243" },
  { label: "Comunidade (10%)", percentage: 10, color: "#F59E0B", amount: "€81" },
];

const ROADMAP_PHASES = [
  { phase: 1, title: "Fundação", status: "done", emoji: "✅", description: "160+ projectos criados, design system completo, portfólio estabelecido. A base está sólida.", items: ["160+ projectos entregues", "Design system reutilizável", "Portfólio e marca pessoal", "Primeiros apoiantes"] },
  { phase: 2, title: "Plataforma", status: "active", emoji: "🔄", description: "Construção da plataforma Mente, ferramentas de aprendizagem e APIs públicas.", items: ["Plataforma Mente (learning)", "APIs open-source", "Templates e starters", "Documentação completa"] },
  { phase: 3, title: "Comunidade", status: "upcoming", emoji: "🔜", description: "Cursos gratuitos, programa de mentoria e eventos presenciais em Portugal.", items: ["Cursos gratuitos online", "Programa de mentoria", "Eventos e meetups", "Comunidade de criadores"] },
  { phase: 4, title: "Horizonte", status: "future", emoji: "🌅", description: "Impacto social em escala, open-source total e sustentabilidade a longo prazo.", items: ["Impacto social mensurável", "100% open-source", "Sustentabilidade financeira", "Modelo replicável"] },
];

const FAQ_ITEMS = [
  { question: "Para onde vai o dinheiro?", answer: "Cada euro é transparente. 25% vai para hosting e infraestrutura, 20% para APIs e serviços, 15% para ferramentas, 30% para tempo de desenvolvimento, e 10% é devolvido directamente à comunidade através de projectos gratuitos e mentoria." },
  { question: "Posso cancelar quando quiser?", answer: "Claro que sim. Sem contratos, sem compromissos longos. Podes cancelar a qualquer momento e continuas com acesso até ao fim do período pago. Sem perguntas, sem complicações." },
  { question: "Porque não cobram pelos projectos?", answer: "Porque acredito que a educação e as ferramentas devem ser acessíveis a todos. O modelo de crowdfunding permite-me continuar a criar sem que o lucro seja a motivação principal. Quem pode, apoia. Quem não pode, usa." },
  { question: "Como funciona a transparência?", answer: "Publico relatórios mensais detalhados com receitas, despesas e decisões. Tudo é visível no dashboard de transparência. Os apoiantes do plano Sol e Horizonte votam nas prioridades e vêem o behind-the-scenes." },
  { question: "Posso contribuir sem pagar?", answer: "Absolutamente! Podes contribuir partilhando os projectos, dando feedback, reportando bugs, contribuindo código nos repositórios open-source, ou simplesmente espalhando a palavra. Cada contribuição conta." },
  { question: "Quando é que a plataforma Mente fica pronta?", answer: "A Fase 2 está em desenvolvimento activo. A versão beta da Mente está prevista para Q3 2026, com spaced repetition e os primeiros cursos. Os apoiantes terão acesso antecipado antes do lançamento público." },
];

const BACKER_COUNT = 143;
const GOAL_PERCENTAGE = 72;

/* ─────────────────────────── HOOKS ─────────────────────────── */

function useCountUp(end: number, duration: number = 2000, active: boolean = false) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      }
    };
    frameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameRef.current);
  }, [end, duration, active]);

  return count;
}

function useInView(threshold: number = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

/* useScrollProgress removed — replaced with rAF-throttled CSS variable approach
   to avoid full-page re-renders on every scroll pixel. See DescomplicaiHorizonteV2. */

/* ─────────────────────────── KEYFRAMES & STYLES ─────────────────────────── */

const globalStyles = `
  @keyframes sunriseGradient {
    0%, 100% { background-position: 0% 50%; }
    25% { background-position: 50% 0%; }
    50% { background-position: 100% 50%; }
    75% { background-position: 50% 100%; }
  }

  @keyframes orbFloat1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(30px, -40px) scale(1.05); }
    50% { transform: translate(-20px, -60px) scale(0.95); }
    75% { transform: translate(40px, -20px) scale(1.02); }
  }

  @keyframes orbFloat2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    20% { transform: translate(-40px, -30px) scale(1.08); }
    40% { transform: translate(20px, -70px) scale(0.92); }
    60% { transform: translate(-30px, -50px) scale(1.04); }
    80% { transform: translate(10px, -20px) scale(0.98); }
  }

  @keyframes orbFloat3 {
    0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
    33% { transform: translate(50px, -35px) scale(1.1) rotate(5deg); }
    66% { transform: translate(-25px, -55px) scale(0.9) rotate(-3deg); }
  }

  @keyframes orbFloat4 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    15% { transform: translate(-35px, -25px) scale(1.06); }
    35% { transform: translate(25px, -65px) scale(0.94); }
    55% { transform: translate(-45px, -40px) scale(1.03); }
    75% { transform: translate(15px, -15px) scale(0.97); }
  }

  @keyframes orbFloat5 {
    0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
    20% { transform: translate(20px, -50px) scale(1.07) rotate(3deg); }
    50% { transform: translate(-35px, -30px) scale(0.93) rotate(-5deg); }
    80% { transform: translate(40px, -55px) scale(1.02) rotate(2deg); }
  }

  @keyframes progressFill {
    from { width: 0%; }
    to { width: var(--target-width); }
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeInLeft {
    from { opacity: 0; transform: translateX(-40px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes fadeInRight {
    from { opacity: 0; transform: translateX(40px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes fadeInScale {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }

  @keyframes gradientText {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.4), 0 0 40px rgba(139, 92, 246, 0.2); }
    50% { box-shadow: 0 0 30px rgba(99, 102, 241, 0.6), 0 0 60px rgba(139, 92, 246, 0.3), 0 0 80px rgba(249, 115, 22, 0.15); }
  }

  @keyframes barGrow {
    from { height: 0%; }
    to { height: var(--target-height); }
  }

  @keyframes timelineReveal {
    from { opacity: 0; transform: scale(0.5); }
    to { opacity: 1; transform: scale(1); }
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  @keyframes pulseRing {
    0% { transform: scale(1); opacity: 0.6; }
    50% { transform: scale(1.15); opacity: 0.3; }
    100% { transform: scale(1); opacity: 0.6; }
  }

  @keyframes typewriter {
    from { width: 0; }
    to { width: 100%; }
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  @keyframes meshGradient {
    0%, 100% {
      background-position: 0% 0%, 100% 0%, 100% 100%, 0% 100%;
    }
    25% {
      background-position: 100% 0%, 100% 100%, 0% 100%, 0% 0%;
    }
    50% {
      background-position: 100% 100%, 0% 100%, 0% 0%, 100% 0%;
    }
    75% {
      background-position: 0% 100%, 0% 0%, 100% 0%, 100% 100%;
    }
  }

  @keyframes slideDown {
    from { max-height: 0; opacity: 0; padding-top: 0; padding-bottom: 0; }
    to { max-height: 500px; opacity: 1; padding-top: 20px; padding-bottom: 20px; }
  }

  @keyframes slideUp {
    from { max-height: 500px; opacity: 1; padding-top: 20px; padding-bottom: 20px; }
    to { max-height: 0; opacity: 0; padding-top: 0; padding-bottom: 0; }
  }

  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.8) translateY(20px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }

  .animate-in {
    animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .animate-in-left {
    animation: fadeInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .animate-in-right {
    animation: fadeInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .animate-in-scale {
    animation: fadeInScale 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .glass {
    background: rgba(255, 255, 255, 0.65);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  .glass-strong {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.4);
  }

  .glass-dark {
    background: rgba(30, 27, 75, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(99, 102, 241, 0.2);
  }

  .gradient-text {
    background: linear-gradient(135deg, #6366F1, #8B5CF6, #F97316, #F59E0B);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradientText 6s ease infinite;
  }

  .gradient-text-slow {
    background: linear-gradient(135deg, #6366F1, #8B5CF6, #F97316, #F59E0B, #6366F1);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradientText 8s ease infinite;
  }

  .sunrise-bg {
    background: linear-gradient(180deg, #EFF6FF 0%, #F5F3FF 40%, #FFF7ED 100%);
  }

  .mesh-gradient {
    background:
      radial-gradient(ellipse at 20% 50%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 20%, rgba(139, 92, 246, 0.06) 0%, transparent 50%),
      radial-gradient(ellipse at 60% 80%, rgba(249, 115, 22, 0.06) 0%, transparent 50%),
      radial-gradient(ellipse at 40% 30%, rgba(245, 158, 11, 0.04) 0%, transparent 50%);
    animation: meshGradient 20s ease infinite;
  }

  .card-hover {
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
  }

  .card-hover:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(99, 102, 241, 0.15), 0 8px 24px rgba(0, 0, 0, 0.08);
  }

  .shimmer-effect {
    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%);
    background-size: 200% 100%;
    animation: shimmer 3s ease-in-out infinite;
  }

  .progress-bar-fill {
    animation: progressFill 2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .bar-grow {
    animation: barGrow 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .timeline-dot {
    animation: timelineReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .glow-button {
    animation: glowPulse 2s ease-in-out infinite;
  }

  .float-animation {
    animation: float 3s ease-in-out infinite;
  }

  /* Smooth scroll for the entire page */
  html {
    scroll-behavior: smooth;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #EFF6FF;
  }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #6366F1, #F97316);
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #4F46E5, #EA580C);
  }

  /* Respect reduced-motion preference — disable floating orbs and decorative animations */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* CSS-only scroll progress bar (scroll-driven animation) */
  @keyframes scroll-progress {
    from { width: 0%; }
    to { width: 100%; }
  }
`;

/* ─────────────────────────── FLOATING ORBS ─────────────────────────── */

function FloatingOrbs() {
  const orbs = useMemo(
    () => [
      { size: 300, top: "10%", left: "5%", color: "rgba(99, 102, 241, 0.12)", animation: "orbFloat1 8s ease-in-out infinite", delay: "0s" },
      { size: 220, top: "30%", right: "10%", color: "rgba(139, 92, 246, 0.10)", animation: "orbFloat2 10s ease-in-out infinite", delay: "1s" },
      { size: 180, top: "60%", left: "15%", color: "rgba(249, 115, 22, 0.10)", animation: "orbFloat3 12s ease-in-out infinite", delay: "2s" },
      { size: 250, top: "20%", right: "25%", color: "rgba(245, 158, 11, 0.08)", animation: "orbFloat4 9s ease-in-out infinite", delay: "0.5s" },
      { size: 160, top: "70%", right: "5%", color: "rgba(99, 102, 241, 0.09)", animation: "orbFloat5 11s ease-in-out infinite", delay: "1.5s" },
      { size: 200, top: "45%", left: "40%", color: "rgba(139, 92, 246, 0.07)", animation: "orbFloat1 14s ease-in-out infinite", delay: "3s" },
      { size: 140, top: "85%", left: "60%", color: "rgba(249, 115, 22, 0.08)", animation: "orbFloat2 13s ease-in-out infinite", delay: "2.5s" },
    ],
    []
  );

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {orbs.map((orb, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: orb.size,
            height: orb.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            top: orb.top,
            left: orb.left,
            right: orb.right,
            animation: orb.animation,
            animationDelay: orb.delay,
            filter: "blur(40px)",
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────── GLASSMORPHISM NAVBAR ─────────────────────────── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection((prev) => (prev === id ? prev : id));
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNav = useCallback((href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? "12px 0" : "20px 0",
        background: scrolled ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.4)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(99, 102, 241, 0.1)" : "1px solid transparent",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <button
          onClick={() => handleNav("#hero")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: 0,
          }}
        >
          <span style={{ fontSize: 24 }}>🌅</span>
          <span
            className="gradient-text"
            style={{
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            descomplicai
          </span>
        </button>

        {/* Desktop Nav */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
          className="desktop-nav"
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              style={{
                background: activeSection === link.href.replace("#", "")
                  ? "linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))"
                  : "none",
                border: "none",
                padding: "8px 14px",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: activeSection === link.href.replace("#", "") ? 600 : 500,
                color: activeSection === link.href.replace("#", "") ? "#6366F1" : "#4B5563",
                cursor: "pointer",
                transition: "all 0.3s ease",
                whiteSpace: "nowrap",
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav("#tiers")}
            style={{
              background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
              border: "none",
              padding: "10px 20px",
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 700,
              color: "#fff",
              cursor: "pointer",
              marginLeft: 8,
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              boxShadow: "0 4px 14px rgba(99, 102, 241, 0.3)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(99, 102, 241, 0.4)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(99, 102, 241, 0.3)"; }}
          >
            Apoiar ❤️
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            padding: 8,
            cursor: "pointer",
            flexDirection: "column",
            gap: 5,
          }}
          className="mobile-hamburger"
        >
          <span style={{ display: "block", width: 24, height: 2, background: "#1E1B4B", borderRadius: 2, transition: "all 0.3s ease", transform: mobileOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ display: "block", width: 24, height: 2, background: "#1E1B4B", borderRadius: 2, transition: "all 0.3s ease", opacity: mobileOpen ? 0 : 1 }} />
          <span style={{ display: "block", width: 24, height: 2, background: "#1E1B4B", borderRadius: 2, transition: "all 0.3s ease", transform: mobileOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(99, 102, 241, 0.1)",
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              style={{
                background: activeSection === link.href.replace("#", "")
                  ? "linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))"
                  : "none",
                border: "none",
                padding: "12px 16px",
                borderRadius: 10,
                fontSize: 15,
                fontWeight: activeSection === link.href.replace("#", "") ? 600 : 500,
                color: activeSection === link.href.replace("#", "") ? "#6366F1" : "#4B5563",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav("#tiers")}
            style={{
              background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
              border: "none",
              padding: "12px 20px",
              borderRadius: 12,
              fontSize: 15,
              fontWeight: 700,
              color: "#fff",
              cursor: "pointer",
              marginTop: 8,
            }}
          >
            Apoiar ❤️
          </button>
        </div>
      )}

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

/* ─────────────────────────── SECTION: HERO ─────────────────────────── */

function HeroSection() {
  const { ref, isInView } = useInView(0.1);
  const backerCount = useCountUp(BACKER_COUNT, 2500, isInView);
  const goalCount = useCountUp(GOAL_PERCENTAGE, 2000, isInView);
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShowProgress(true), 400);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section
      id="hero"
      ref={ref}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: "120px 24px 80px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(40px)",
          transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 20px",
            borderRadius: 100,
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(99, 102, 241, 0.15)",
            marginBottom: 32,
            fontSize: 14,
            fontWeight: 600,
            color: "#6366F1",
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
          }}
        >
          <span style={{ animation: "float 2s ease-in-out infinite" }}>🌅</span>
          Building in Public since 2025
        </div>

        {/* Main Heading */}
        <h1
          style={{
            fontSize: "clamp(36px, 5.5vw, 72px)",
            fontWeight: 800,
            lineHeight: 1.1,
            color: "#1E1B4B",
            marginBottom: 24,
            letterSpacing: "-0.03em",
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
          }}
        >
          Apoiem-me para que eu
          <br />
          possa continuar a{" "}
          <span className="gradient-text-slow">criar para todos.</span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "#6B7280",
            lineHeight: 1.7,
            maxWidth: 640,
            margin: "0 auto 40px",
            fontWeight: 400,
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s",
          }}
        >
          Construo ferramentas, websites e experiências digitais gratuitas.
          <br />
          Cada projecto é uma semente plantada para a comunidade.
        </p>

        {/* Progress Bar Container */}
        <div
          style={{
            maxWidth: 500,
            margin: "0 auto 24px",
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "baseline" }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#6366F1" }}>
              {goalCount}% do objectivo
            </span>
            <span style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 500 }}>
              €810 / €1.125 por mês
            </span>
          </div>
          <div
            style={{
              height: 12,
              borderRadius: 100,
              background: "rgba(99, 102, 241, 0.1)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                height: "100%",
                borderRadius: 100,
                background: "linear-gradient(90deg, #6366F1, #8B5CF6, #F97316)",
                width: showProgress ? `${GOAL_PERCENTAGE}%` : "0%",
                transition: "width 2s cubic-bezier(0.16, 1, 0.3, 1)",
                position: "relative",
              }}
            >
              <div
                className="shimmer-effect"
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 100,
                }}
              />
            </div>
          </div>
        </div>

        {/* Backer Count */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            marginBottom: 40,
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(15px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.7s",
          }}
        >
          {/* Stacked avatars placeholder */}
          <div style={{ display: "flex" }}>
            {["#6366F1", "#8B5CF6", "#F97316", "#F59E0B", "#A78BFA"].map((color, i) => (
              <div
                key={i}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: color,
                  border: "2px solid #fff",
                  marginLeft: i > 0 ? -10 : 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  color: "#fff",
                  fontWeight: 700,
                  zIndex: 5 - i,
                }}
              >
                {["J", "M", "A", "S", "L"][i]}
              </div>
            ))}
          </div>
          <span style={{ fontSize: 15, color: "#4B5563", fontWeight: 500 }}>
            <strong style={{ color: "#1E1B4B", fontWeight: 700 }}>{backerCount}</strong>{" "}
            apoiantes já acreditam neste projecto
          </span>
        </div>

        {/* CTA Buttons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            flexWrap: "wrap",
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(15px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.8s",
          }}
        >
          <button
            onClick={() => document.getElementById("tiers")?.scrollIntoView({ behavior: "smooth" })}
            className="glow-button"
            style={{
              background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
              border: "none",
              padding: "16px 36px",
              borderRadius: 16,
              fontSize: 17,
              fontWeight: 700,
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Apoiar Agora
            <span style={{ fontSize: 20 }}>❤️</span>
          </button>
          <button
            onClick={() => document.getElementById("story")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "transparent",
              border: "2px solid rgba(99, 102, 241, 0.3)",
              padding: "14px 32px",
              borderRadius: 16,
              fontSize: 17,
              fontWeight: 600,
              color: "#6366F1",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#6366F1"; e.currentTarget.style.background = "rgba(99, 102, 241, 0.05)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.3)"; e.currentTarget.style.background = "transparent"; }}
          >
            Saber Mais
          </button>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            marginTop: 60,
            opacity: isInView ? 0.5 : 0,
            transition: "opacity 1s ease 1.2s",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            Scroll para descobrir
          </span>
          <div style={{ width: 24, height: 40, borderRadius: 12, border: "2px solid rgba(99, 102, 241, 0.2)", display: "flex", justifyContent: "center", paddingTop: 8 }}>
            <div
              style={{
                width: 4,
                height: 8,
                borderRadius: 2,
                background: "#6366F1",
                animation: "float 1.5s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── SECTION: STORY ─────────────────────────── */

function StorySection() {
  const { ref, isInView } = useInView(0.15);

  return (
    <section
      id="story"
      ref={ref}
      style={{
        padding: "100px 24px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 60,
          alignItems: "center",
        }}
      >
        {/* Left: Pull Quote */}
        <div
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateX(0)" : "translateX(-40px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div
            style={{
              borderLeft: "4px solid",
              borderImage: "linear-gradient(180deg, #6366F1, #F97316) 1",
              paddingLeft: 32,
            }}
          >
            <blockquote
              style={{
                fontSize: "clamp(24px, 3vw, 36px)",
                fontWeight: 700,
                lineHeight: 1.3,
                color: "#1E1B4B",
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              &ldquo;Quero construir sem que o lucro seja o motor.&rdquo;
            </blockquote>
            <p
              style={{
                marginTop: 20,
                fontSize: 16,
                color: "#6366F1",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 20 }}>🌅</span>
              Jaime Silva — Criador do Descomplicai
            </p>
          </div>

          {/* Emoji accents */}
          <div style={{ display: "flex", gap: 20, marginTop: 40 }}>
            {[
              { emoji: "🌅", label: "Sunrise", color: "rgba(249, 115, 22, 0.1)" },
              { emoji: "🚀", label: "Build", color: "rgba(99, 102, 241, 0.1)" },
              { emoji: "❤️", label: "Love", color: "rgba(239, 68, 68, 0.1)" },
              { emoji: "🌱", label: "Grow", color: "rgba(16, 185, 129, 0.1)" },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: item.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  animation: `float ${2 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                  opacity: isInView ? 1 : 0,
                  transition: `opacity 0.6s ease ${0.3 + i * 0.15}s`,
                }}
                title={item.label}
              >
                {item.emoji}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Narrative */}
        <div
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateX(0)" : "translateX(40px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(20px, 2.5vw, 28px)",
              fontWeight: 700,
              color: "#1E1B4B",
              marginBottom: 20,
              letterSpacing: "-0.01em",
            }}
          >
            A minha história
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "#4B5563" }}>
              Comecei a programar porque queria resolver problemas. Não os meus — os dos outros.
              Ao longo de dois anos, criei mais de 160 projectos: websites para restaurantes
              que não podiam pagar um developer, ferramentas para estudantes que precisavam
              de recursos, experiências interativas para quem quer aprender.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "#4B5563" }}>
              Nunca cobrei um euro por educação. Nunca coloquei um paywall num projecto
              que pudesse ajudar alguém. Mas manter esta missão custa — hosting, APIs,
              tempo, energia. O crowdfunding permite-me continuar a construir{" "}
              <strong style={{ color: "#1E1B4B" }}>para todos</strong>, financiado por{" "}
              <strong style={{ color: "#1E1B4B" }}>quem pode</strong>.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "#4B5563" }}>
              Cada euro que entra é transparente. Cada decisão é partilhada. Cada projecto
              é uma semente plantada na esperança de que alguém a use para crescer.
              Este é o Descomplicai — e o horizonte é nosso.
            </p>
          </div>

          {/* Values badges */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 24 }}>
            {["Open Source", "Transparência", "Comunidade", "Educação Grátis"].map((value, i) => (
              <span
                key={i}
                style={{
                  padding: "6px 14px",
                  borderRadius: 100,
                  fontSize: 13,
                  fontWeight: 600,
                  background: `rgba(${i % 2 === 0 ? "99, 102, 241" : "249, 115, 22"}, 0.1)`,
                  color: i % 2 === 0 ? "#6366F1" : "#F97316",
                }}
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          #story > div { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────── SECTION: IMPACT NUMBERS ─────────────────────────── */

function ImpactSection() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section
      id="impact"
      ref={ref}
      style={{
        padding: "100px 24px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Section Title */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 60,
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 600, color: "#6366F1", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Impacto Real
          </span>
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 800,
              color: "#1E1B4B",
              marginTop: 12,
              letterSpacing: "-0.02em",
            }}
          >
            Números que falam por si
          </h2>
        </div>

        {/* Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
          }}
        >
          {IMPACT_NUMBERS.map((item, i) => (
            <ImpactCard key={i} item={item} index={i} isInView={isInView} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #impact > div > div:last-child { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 500px) {
          #impact > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function ImpactCard({ item, index, isInView }: { item: typeof IMPACT_NUMBERS[0]; index: number; isInView: boolean }) {
  const count = useCountUp(item.value, 2000, isInView);

  return (
    <div
      className="card-hover"
      style={{
        position: "relative",
        borderRadius: 20,
        padding: 2,
        background: `linear-gradient(135deg, ${item.gradient.split(",")[0].split("(")[2]?.trim() || "#6366F1"}, ${item.gradient.split(",")[1]?.replace(")", "").trim() || "#F97316"})`,
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.12}s`,
      }}
    >
      <div
        className="glass-strong"
        style={{
          borderRadius: 18,
          padding: "32px 24px",
          textAlign: "center",
          height: "100%",
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 16, animation: `float ${2.5 + index * 0.3}s ease-in-out infinite` }}>
          {item.icon}
        </div>
        <div
          className="gradient-text"
          style={{
            fontSize: "clamp(32px, 3vw, 48px)",
            fontWeight: 800,
            lineHeight: 1,
            marginBottom: 8,
          }}
        >
          {item.value === 0 ? "0" : count}
          {item.suffix}
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#4B5563", lineHeight: 1.4 }}>
          {item.label}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── SECTION: SUPPORT TIERS ─────────────────────────── */

function TiersSection() {
  const { ref, isInView } = useInView(0.15);

  return (
    <section
      id="tiers"
      ref={ref}
      style={{
        padding: "100px 24px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Section Title */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 60,
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 600, color: "#F97316", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Escolhe o teu plano
          </span>
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 800,
              color: "#1E1B4B",
              marginTop: 12,
              letterSpacing: "-0.02em",
            }}
          >
            Apoia ao teu ritmo
          </h2>
          <p style={{ fontSize: 16, color: "#6B7280", marginTop: 12, maxWidth: 500, margin: "12px auto 0" }}>
            Cada nível desbloqueia benefícios exclusivos. Mas o maior benefício é saber que estás a ajudar a construir algo para todos.
          </p>
        </div>

        {/* Tiers Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 28,
            alignItems: "stretch",
          }}
        >
          {SUPPORT_TIERS.map((tier, i) => (
            <TierCard key={i} tier={tier} index={i} isInView={isInView} />
          ))}
        </div>

        {/* Extra note */}
        <p
          style={{
            textAlign: "center",
            marginTop: 40,
            fontSize: 14,
            color: "#9CA3AF",
            opacity: isInView ? 1 : 0,
            transition: "opacity 0.8s ease 0.6s",
          }}
        >
          Todos os preços em EUR. Cancelamento a qualquer momento. Sem contratos.
        </p>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #tiers > div > div:nth-child(2) { grid-template-columns: 1fr !important; max-width: 420px; margin: 0 auto; }
        }
      `}</style>
    </section>
  );
}

function TierCard({ tier, index, isInView }: { tier: typeof SUPPORT_TIERS[0]; index: number; isInView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: 24,
        overflow: "hidden",
        opacity: isInView ? 1 : 0,
        transform: isInView
          ? hovered ? "translateY(-12px)" : "translateY(0)"
          : "translateY(40px)",
        transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.15}s`,
        boxShadow: hovered
          ? "0 24px 60px rgba(99, 102, 241, 0.18), 0 8px 24px rgba(0, 0, 0, 0.06)"
          : "0 4px 20px rgba(0, 0, 0, 0.04)",
      }}
    >
      {/* Top gradient border */}
      <div
        style={{
          height: 4,
          background: tier.gradient,
        }}
      />

      {/* Popular badge */}
      {tier.popular && (
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            padding: "4px 12px",
            borderRadius: 100,
            background: "linear-gradient(135deg, #8B5CF6, #F97316)",
            fontSize: 11,
            fontWeight: 700,
            color: "#fff",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Popular
        </div>
      )}

      <div
        className="glass-strong"
        style={{
          padding: "36px 28px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: "0 0 24px 24px",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          borderTop: "none",
        }}
      >
        {/* Tier Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>{tier.emoji}</div>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: "#1E1B4B", marginBottom: 4 }}>
            {tier.name}
          </h3>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
            <span
              className="gradient-text"
              style={{ fontSize: 40, fontWeight: 800, lineHeight: 1 }}
            >
              €{tier.price}
            </span>
            <span style={{ fontSize: 15, color: "#9CA3AF", fontWeight: 500 }}>/mês</span>
          </div>
        </div>

        {/* Features */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
          {tier.features.map((feature, fi) => (
            <div key={fi} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 6,
                  background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(249, 115, 22, 0.1))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: 2,
                  fontSize: 11,
                }}
              >
                ✓
              </div>
              <span style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.5 }}>{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          style={{
            width: "100%",
            padding: "14px 24px",
            borderRadius: 14,
            border: tier.popular ? "none" : "2px solid rgba(99, 102, 241, 0.2)",
            background: tier.popular ? tier.gradient : "transparent",
            color: tier.popular ? "#fff" : "#6366F1",
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: tier.popular ? "0 4px 16px rgba(99, 102, 241, 0.3)" : "none",
          }}
          onMouseEnter={(e) => {
            if (!tier.popular) {
              e.currentTarget.style.background = "rgba(99, 102, 241, 0.05)";
              e.currentTarget.style.borderColor = "#6366F1";
            } else {
              e.currentTarget.style.transform = "scale(1.02)";
            }
          }}
          onMouseLeave={(e) => {
            if (!tier.popular) {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.2)";
            } else {
              e.currentTarget.style.transform = "scale(1)";
            }
          }}
        >
          Escolher {tier.name}
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────── SECTION: FEATURED PROJECTS ─────────────────────────── */

function ProjectsSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section
      id="projects"
      ref={ref}
      style={{
        padding: "100px 24px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Section Title */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 60,
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 600, color: "#8B5CF6", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Projectos em Destaque
          </span>
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 800,
              color: "#1E1B4B",
              marginTop: 12,
              letterSpacing: "-0.02em",
            }}
          >
            O que o vosso apoio permite
          </h2>
          <p style={{ fontSize: 16, color: "#6B7280", marginTop: 12, maxWidth: 500, margin: "12px auto 0" }}>
            Cada projecto nasce de uma necessidade real. Cada ferramenta é gratuita. Cada linha de código é para a comunidade.
          </p>
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {FEATURED_PROJECTS.map((project, i) => (
            <div
              key={i}
              className="card-hover"
              style={{
                borderRadius: 20,
                overflow: "hidden",
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.05 + i * 0.1}s`,
              }}
            >
              {/* Gradient Header */}
              <div
                style={{
                  height: 120,
                  background: project.gradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <span style={{ fontSize: 48, position: "relative", zIndex: 1 }}>{project.emoji}</span>
                {/* Shimmer overlay */}
                <div
                  className="shimmer-effect"
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0.3,
                  }}
                />
              </div>

              {/* Card Body */}
              <div
                className="glass-strong"
                style={{
                  padding: "24px 20px",
                  borderRadius: "0 0 20px 20px",
                }}
              >
                {/* Category Badge */}
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 10px",
                    borderRadius: 8,
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#6366F1",
                    background: "rgba(99, 102, 241, 0.08)",
                    marginBottom: 12,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  {project.category}
                </span>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1E1B4B", marginBottom: 8 }}>
                  {project.name}
                </h3>
                <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.6 }}>
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* More projects note */}
        <div
          style={{
            textAlign: "center",
            marginTop: 40,
            opacity: isInView ? 1 : 0,
            transition: "opacity 0.8s ease 0.8s",
          }}
        >
          <p style={{ fontSize: 15, color: "#6B7280" }}>
            E mais <strong style={{ color: "#6366F1" }}>154+ projectos</strong> disponíveis gratuitamente.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #projects > div > div:nth-child(2) { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          #projects > div > div:nth-child(2) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────── SECTION: TRANSPARENCY DASHBOARD ─────────────────────────── */

function TransparencySection() {
  const { ref, isInView } = useInView(0.15);

  return (
    <section
      id="transparency"
      ref={ref}
      style={{
        padding: "100px 24px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Section Title */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 60,
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 600, color: "#F59E0B", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Onde vai cada euro
          </span>
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 800,
              color: "#1E1B4B",
              marginTop: 12,
              letterSpacing: "-0.02em",
            }}
          >
            Transparência Total
          </h2>
          <p style={{ fontSize: 16, color: "#6B7280", marginTop: 12, maxWidth: 560, margin: "12px auto 0" }}>
            Cada euro é transparente. Cada decisão é partilhada. Sem segredos, sem surpresas.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
          }}
        >
          {/* Revenue Chart */}
          <div
            className="glass-strong"
            style={{
              borderRadius: 24,
              padding: "32px 28px",
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateX(0)" : "translateX(-40px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1E1B4B", marginBottom: 24 }}>
              📈 Receita Mensal
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 12,
                height: 200,
                paddingBottom: 32,
                position: "relative",
              }}
            >
              {REVENUE_DATA.map((bar, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    height: "100%",
                    justifyContent: "flex-end",
                  }}
                >
                  {/* Amount label */}
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#6366F1",
                      opacity: isInView ? 1 : 0,
                      transition: `opacity 0.5s ease ${0.8 + i * 0.1}s`,
                    }}
                  >
                    €{bar.amount}
                  </span>
                  {/* Bar */}
                  <div
                    style={{
                      width: "100%",
                      maxWidth: 48,
                      borderRadius: "8px 8px 4px 4px",
                      background: `linear-gradient(180deg, #6366F1 0%, ${i === REVENUE_DATA.length - 1 ? "#F97316" : "#8B5CF6"} 100%)`,
                      height: isInView ? `${bar.percentage}%` : "0%",
                      transition: `height 1.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.4 + i * 0.12}s`,
                      position: "relative",
                      overflow: "hidden",
                      minHeight: 8,
                    }}
                  >
                    <div
                      className="shimmer-effect"
                      style={{ position: "absolute", inset: 0, opacity: 0.2 }}
                    />
                  </div>
                  {/* Month label */}
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: "#9CA3AF",
                      position: "absolute",
                      bottom: 8,
                    }}
                  >
                    {bar.month}
                  </span>
                </div>
              ))}
            </div>
            {/* Growth indicator */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginTop: 8,
                padding: "8px 14px",
                borderRadius: 10,
                background: "rgba(16, 185, 129, 0.08)",
                width: "fit-content",
              }}
            >
              <span style={{ fontSize: 14 }}>📈</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#059669" }}>
                +575% crescimento em 7 meses
              </span>
            </div>
          </div>

          {/* Expense Breakdown */}
          <div
            className="glass-strong"
            style={{
              borderRadius: 24,
              padding: "32px 28px",
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateX(0)" : "translateX(40px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
            }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1E1B4B", marginBottom: 24 }}>
              📊 Despesas por Categoria
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {EXPENSE_BREAKDOWN.map((expense, i) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "baseline" }}>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "#4B5563" }}>
                      {expense.label}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: expense.color }}>
                      {expense.amount} ({expense.percentage}%)
                    </span>
                  </div>
                  <div
                    style={{
                      height: 8,
                      borderRadius: 100,
                      background: "rgba(0, 0, 0, 0.04)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        borderRadius: 100,
                        background: expense.color,
                        width: isInView ? `${expense.percentage}%` : "0%",
                        transition: `width 1.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + i * 0.12}s`,
                        opacity: 0.85,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Community highlight */}
            <div
              style={{
                marginTop: 24,
                padding: "14px 18px",
                borderRadius: 14,
                background: "linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(249, 115, 22, 0.08))",
                border: "1px solid rgba(245, 158, 11, 0.15)",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ fontSize: 20 }}>❤️</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#92400E", lineHeight: 1.4 }}>
                10% de todas as receitas são devolvidas directamente à comunidade
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #transparency > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────── SECTION: ROADMAP ─────────────────────────── */

function RoadmapSection() {
  const { ref, isInView } = useInView(0.1);

  const statusStyles: Record<string, { dotBg: string; lineBg: string; badge: string; badgeBg: string }> = {
    done: { dotBg: "linear-gradient(135deg, #10B981, #34D399)", lineBg: "#10B981", badge: "Completo", badgeBg: "rgba(16, 185, 129, 0.1)" },
    active: { dotBg: "linear-gradient(135deg, #6366F1, #8B5CF6)", lineBg: "#6366F1", badge: "Em Progresso", badgeBg: "rgba(99, 102, 241, 0.1)" },
    upcoming: { dotBg: "linear-gradient(135deg, #F97316, #F59E0B)", lineBg: "#F97316", badge: "Em Breve", badgeBg: "rgba(249, 115, 22, 0.1)" },
    future: { dotBg: "linear-gradient(135deg, #8B5CF6, #F97316)", lineBg: "#8B5CF6", badge: "Horizonte", badgeBg: "rgba(139, 92, 246, 0.1)" },
  };

  return (
    <section
      id="roadmap"
      ref={ref}
      style={{
        padding: "100px 24px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {/* Section Title */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 60,
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 600, color: "#8B5CF6", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            O Plano
          </span>
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 800,
              color: "#1E1B4B",
              marginTop: 12,
              letterSpacing: "-0.02em",
            }}
          >
            O Caminho
          </h2>
        </div>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          {/* Connecting Line */}
          <div
            style={{
              position: "absolute",
              left: 28,
              top: 0,
              bottom: 0,
              width: 3,
              background: isInView
                ? "linear-gradient(180deg, #10B981 0%, #6366F1 35%, #F97316 70%, #8B5CF6 100%)"
                : "rgba(0, 0, 0, 0.06)",
              borderRadius: 2,
              transition: "background 1.5s ease 0.3s",
            }}
          />

          {/* Phase Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {ROADMAP_PHASES.map((phase, i) => {
              const style = statusStyles[phase.status];
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 28,
                    alignItems: "flex-start",
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? "translateX(0)" : "translateX(-30px)",
                    transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + i * 0.2}s`,
                  }}
                >
                  {/* Dot */}
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background: style.dotBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                      flexShrink: 0,
                      boxShadow: `0 4px 16px ${style.lineBg}33`,
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {phase.emoji}
                    {/* Pulse ring for active */}
                    {phase.status === "active" && (
                      <div
                        style={{
                          position: "absolute",
                          inset: -6,
                          borderRadius: "50%",
                          border: `2px solid ${style.lineBg}`,
                          animation: "pulseRing 2s ease-in-out infinite",
                        }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div
                    className="glass-strong"
                    style={{
                      flex: 1,
                      borderRadius: 20,
                      padding: "24px 28px",
                      border: phase.status === "active" ? "1px solid rgba(99, 102, 241, 0.2)" : "1px solid rgba(255, 255, 255, 0.4)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                      <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1E1B4B", margin: 0 }}>
                        Fase {phase.phase}: {phase.title}
                      </h3>
                      <span
                        style={{
                          padding: "3px 10px",
                          borderRadius: 100,
                          fontSize: 11,
                          fontWeight: 600,
                          color: style.lineBg,
                          background: style.badgeBg,
                        }}
                      >
                        {style.badge}
                      </span>
                    </div>
                    <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.6, marginBottom: 16 }}>
                      {phase.description}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {phase.items.map((item, j) => (
                        <span
                          key={j}
                          style={{
                            padding: "4px 12px",
                            borderRadius: 8,
                            fontSize: 12,
                            fontWeight: 500,
                            color: "#4B5563",
                            background: "rgba(0, 0, 0, 0.03)",
                            border: "1px solid rgba(0, 0, 0, 0.04)",
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── SECTION: FAQ ─────────────────────────── */

function FAQSection() {
  const { ref, isInView } = useInView(0.1);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      ref={ref}
      style={{
        padding: "100px 24px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        {/* Section Title */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 60,
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 600, color: "#6366F1", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Perguntas Frequentes
          </span>
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 800,
              color: "#1E1B4B",
              marginTop: 12,
              letterSpacing: "-0.02em",
            }}
          >
            Dúvidas? Respondemos.
          </h2>
        </div>

        {/* FAQ Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({
  item,
  index,
  isOpen,
  onToggle,
  isInView,
}: {
  item: typeof FAQ_ITEMS[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isInView: boolean;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div
      className="glass-strong"
      style={{
        borderRadius: 16,
        overflow: "hidden",
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.05 + index * 0.08}s`,
        border: isOpen ? "1px solid rgba(99, 102, 241, 0.15)" : "1px solid rgba(255, 255, 255, 0.4)",
      }}
    >
      {/* Question */}
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          padding: "20px 24px",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          textAlign: "left",
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 600, color: "#1E1B4B", lineHeight: 1.4 }}>
          {item.question}
        </span>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: isOpen ? "linear-gradient(135deg, #6366F1, #8B5CF6)" : "rgba(99, 102, 241, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.3s ease",
            color: isOpen ? "#fff" : "#6366F1",
            fontSize: 16,
            fontWeight: 700,
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </div>
      </button>

      {/* Answer */}
      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? contentHeight + 40 : 0,
          opacity: isOpen ? 1 : 0,
          overflow: "hidden",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div style={{ padding: "0 24px 20px" }}>
          <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.7, margin: 0 }}>
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── SECTION: FINAL CTA ─────────────────────────── */

function FinalCTASection() {
  const { ref, isInView } = useInView(0.2);
  const backerCount = useCountUp(BACKER_COUNT, 2500, isInView);
  const goalCount = useCountUp(GOAL_PERCENTAGE, 2000, isInView);
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShowProgress(true), 400);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section
      id="cta"
      ref={ref}
      style={{
        padding: "120px 24px",
        position: "relative",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      {/* Sunset gradient background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, #312E81 0%, #4C1D95 25%, #7C2D12 60%, #F97316 100%)",
          backgroundSize: "200% 200%",
          animation: "sunriseGradient 20s ease infinite",
          opacity: 0.95,
        }}
      />

      {/* Mesh overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(99, 102, 241, 0.2) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 70% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 50% 80%, rgba(249, 115, 22, 0.2) 0%, transparent 50%)",
        }}
      />

      <div
        style={{
          maxWidth: 700,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Heading */}
        <h2
          style={{
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 24,
            letterSpacing: "-0.03em",
            background: "linear-gradient(135deg, #fff 0%, #E0E7FF 30%, #FED7AA 60%, #fff 100%)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "gradientText 6s ease infinite",
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          O horizonte é nosso.
        </h2>

        <p
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "rgba(255, 255, 255, 0.75)",
            lineHeight: 1.7,
            marginBottom: 40,
            maxWidth: 520,
            margin: "0 auto 40px",
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
          }}
        >
          Cada apoiante traz-nos mais perto do objectivo.
          Juntos, construímos algo que pertence a todos.
        </p>

        {/* Progress bar */}
        <div
          style={{
            maxWidth: 500,
            margin: "0 auto 24px",
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(15px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#FDE68A" }}>
              {goalCount}% do objectivo
            </span>
            <span style={{ fontSize: 13, color: "rgba(255, 255, 255, 0.5)" }}>
              €810 / €1.125
            </span>
          </div>
          <div
            style={{
              height: 10,
              borderRadius: 100,
              background: "rgba(255, 255, 255, 0.15)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                borderRadius: 100,
                background: "linear-gradient(90deg, #FDE68A, #F97316, #EF4444)",
                width: showProgress ? `${GOAL_PERCENTAGE}%` : "0%",
                transition: "width 2s cubic-bezier(0.16, 1, 0.3, 1)",
                position: "relative",
              }}
            >
              <div className="shimmer-effect" style={{ position: "absolute", inset: 0, borderRadius: 100 }} />
            </div>
          </div>
        </div>

        {/* Backer count */}
        <p
          style={{
            fontSize: 15,
            color: "rgba(255, 255, 255, 0.6)",
            marginBottom: 40,
            opacity: isInView ? 1 : 0,
            transition: "opacity 0.8s ease 0.5s",
          }}
        >
          <strong style={{ color: "#FDE68A" }}>{backerCount}</strong> apoiantes já fazem parte desta história
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            flexWrap: "wrap",
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(15px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s",
          }}
        >
          <button
            className="glow-button"
            style={{
              background: "linear-gradient(135deg, #FDE68A, #F97316)",
              border: "none",
              padding: "18px 40px",
              borderRadius: 16,
              fontSize: 18,
              fontWeight: 800,
              color: "#1E1B4B",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 10,
              transition: "transform 0.2s ease",
              boxShadow: "0 8px 32px rgba(249, 115, 22, 0.4)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; }}
          >
            Apoiar o Projecto
            <span style={{ fontSize: 22 }}>🌅</span>
          </button>
          <button
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "2px solid rgba(255, 255, 255, 0.25)",
              padding: "16px 32px",
              borderRadius: 16,
              fontSize: 17,
              fontWeight: 600,
              color: "#fff",
              cursor: "pointer",
              backdropFilter: "blur(12px)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)"; e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.5)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"; e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.25)"; }}
          >
            Partilhar 🔗
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── SECTION: FOOTER ─────────────────────────── */

function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      {/* Gradient background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, #1E1B4B 0%, #0F0E2A 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1100,
          margin: "0 auto",
          padding: "60px 24px 40px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: 48,
            marginBottom: 48,
          }}
        >
          {/* Brand Column */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 24 }}>🌅</span>
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #A5B4FC, #FDE68A)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                descomplicai
              </span>
            </div>
            <p style={{ fontSize: 14, color: "rgba(255, 255, 255, 0.5)", lineHeight: 1.7, maxWidth: 360 }}>
              Construo ferramentas, websites e experiências digitais gratuitas para a comunidade.
              Cada projecto é uma semente. O horizonte é nosso.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              {[
                { label: "GitHub", icon: "GH" },
                { label: "Twitter/X", icon: "X" },
                { label: "LinkedIn", icon: "in" },
                { label: "Email", icon: "@" },
              ].map((social, i) => (
                <div
                  key={i}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "rgba(255, 255, 255, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "rgba(255, 255, 255, 0.6)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                  }}
                  title={social.label}
                >
                  {social.icon}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: "rgba(255, 255, 255, 0.8)", marginBottom: 20, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Navegação
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {NAV_LINKS.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  style={{
                    fontSize: 14,
                    color: "rgba(255, 255, 255, 0.45)",
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255, 255, 255, 0.45)"; }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Column */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: "rgba(255, 255, 255, 0.8)", marginBottom: 20, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Contacto
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 14, color: "rgba(255, 255, 255, 0.45)" }}>
              <span>jaime@descomplicai.pt</span>
              <span>Portugal 🇵🇹</span>
              <span>Building in Public</span>
            </div>
            <div
              style={{
                marginTop: 24,
                padding: "12px 16px",
                borderRadius: 12,
                background: "rgba(99, 102, 241, 0.1)",
                border: "1px solid rgba(99, 102, 241, 0.15)",
              }}
            >
              <span style={{ fontSize: 12, color: "#A5B4FC", fontWeight: 500, lineHeight: 1.5, display: "block" }}>
                💡 Este é um conceito de design. O crowdfunding é um projecto futuro.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.06)",
            paddingTop: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <span style={{ fontSize: 13, color: "rgba(255, 255, 255, 0.3)" }}>
            © 2025 Descomplicai. Portugal · Building in Public since 2025
          </span>
          <span style={{ fontSize: 13, color: "rgba(255, 255, 255, 0.3)" }}>
            Feito com ❤️ e muitas linhas de código
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer > div:first-of-type + div > div:first-child { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </footer>
  );
}

/* ─────────────────────────── MAIN PAGE ─────────────────────────── */

export default function DescomplicaiHorizonteV2() {
  /* Scroll progress: rAF-throttled, updates only a CSS property — no React state, no re-renders */
  useEffect(() => {
    let ticking = false;
    const bar = document.getElementById("scroll-bar");
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const total =
            document.documentElement.scrollHeight - window.innerHeight;
          if (bar && total > 0)
            bar.style.width = `${(window.scrollY / total) * 100}%`;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`sunrise-bg ${jakarta.variable}`}
      style={{
        fontFamily: "var(--font-jakarta), 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        minHeight: "100vh",
        position: "relative",
        overflowX: "hidden",
        color: "#1E1B4B",
      }}
    >
      {/* Inject global styles */}
      <style>{globalStyles}</style>

      {/* Scroll progress bar — driven by rAF, not React state */}
      <div
        id="scroll-bar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: 3,
          background: "linear-gradient(90deg, #6366F1, #8B5CF6, #F97316)",
          width: "0%",
          zIndex: 1001,
        }}
      />

      {/* Mesh gradient overlay */}
      <div className="mesh-gradient" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }} />

      {/* Floating Orbs */}
      <FloatingOrbs />

      {/* Navbar */}
      <Navbar />

      {/* Sections */}
      <HeroSection />
      <StorySection />
      <ImpactSection />
      <TiersSection />
      <ProjectsSection />
      <TransparencySection />
      <RoadmapSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}
