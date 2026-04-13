"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

/* ==========================================================================
   DESCOMPLICAI GLASS — Glassmorphism Design Variation

   A light, airy, frosted-glass themed homepage with:
   - Animated mesh gradient background (purple → blue → pink → teal)
   - Frosted glass cards with backdrop-blur
   - Floating gradient orbs (CSS-only + mouse parallax)
   - IntersectionObserver scroll animations
   - Animated stat counters
   - 9 sections: Navbar, Hero, Stats, Services, Projects, Process, Testimonials, CTA, Footer
   - 8+ keyframe animations
   - Responsive mobile-first design
   ========================================================================== */

// ─── TYPES ──────────────────────────────────────────────────────────────────

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

interface ServiceItem {
  icon: string;
  iconGradient: string;
  title: string;
  description: string;
}

interface ProjectItem {
  emoji: string;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
  tags: string[];
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: string;
}

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

// ─── DATA ───────────────────────────────────────────────────────────────────

const STATS: StatItem[] = [
  { value: 160, suffix: "+", label: "Projetos Entregues", icon: "📦" },
  { value: 36, suffix: "", label: "Ferramentas IA", icon: "🧠" },
  { value: 100, suffix: "%", label: "Powered by IA", icon: "⚡" },
  { value: 1, suffix: "", label: "Portugal 🇵🇹", icon: "📍" },
];

const SERVICES: ServiceItem[] = [
  {
    icon: "🌐",
    iconGradient: "from-indigo-400 to-blue-500",
    title: "Websites & Apps",
    description:
      "Sites modernos, rápidos e otimizados. Next.js, React, Tailwind — tudo feito à medida com foco em conversão e experiência do utilizador.",
  },
  {
    icon: "🤖",
    iconGradient: "from-purple-400 to-pink-500",
    title: "IA & Automação",
    description:
      "Chatbots inteligentes, automação de processos, integração com APIs de IA. Transformamos tarefas repetitivas em fluxos automáticos.",
  },
  {
    icon: "🎨",
    iconGradient: "from-pink-400 to-rose-500",
    title: "Design & Branding",
    description:
      "Identidade visual completa, logos, paletas, tipografia. Criamos marcas que se destacam e comunicam com clareza.",
  },
  {
    icon: "📈",
    iconGradient: "from-teal-400 to-cyan-500",
    title: "Marketing Digital",
    description:
      "SEO, redes sociais, conteúdo estratégico. Fazemos o teu negócio chegar a quem precisa com estratégias data-driven.",
  },
];

const PROJECTS: ProjectItem[] = [
  {
    emoji: "💎",
    category: "Restaurante",
    categoryColor: "from-amber-300 to-orange-400",
    title: "Bijou",
    description:
      "Site premium para restaurante fine-dining com reservas online, menu interativo e galeria imersiva.",
    tags: ["Next.js", "Design", "Reservas"],
  },
  {
    emoji: "💪",
    category: "Fitness",
    categoryColor: "from-green-300 to-emerald-400",
    title: "BFitFam",
    description:
      "Plataforma de fitness familiar com planos personalizados, tracking de progresso e comunidade.",
    tags: ["React", "Dashboard", "IA"],
  },
  {
    emoji: "🌋",
    category: "Turismo",
    categoryColor: "from-red-300 to-pink-400",
    title: "NinikaTours",
    description:
      "Experiências de vinho vulcânico e gastronomia açoriana na Ilha Terceira com booking integrado.",
    tags: ["Turismo", "Booking", "SEO"],
  },
  {
    emoji: "🍷",
    category: "Vinhos",
    categoryColor: "from-purple-300 to-violet-400",
    title: "RibeiroSanto",
    description:
      "Plataforma digital para vinícola do Dão com e-commerce, provas virtuais e storytelling da marca.",
    tags: ["E-commerce", "Branding", "CMS"],
  },
  {
    emoji: "🌱",
    category: "Storytelling",
    categoryColor: "from-emerald-300 to-teal-400",
    title: "Seeds",
    description:
      "Experiência interativa de storytelling — 'A Gift to Humanity'. Parallax, animações e narrativa imersiva.",
    tags: ["Storytelling", "Parallax", "Art"],
  },
  {
    emoji: "🌍",
    category: "Portfolio",
    categoryColor: "from-blue-300 to-indigo-400",
    title: "Futuro",
    description:
      "Portfolio 3D com Three.js — 'O Futuro é Humano'. Experiência imersiva com partículas e navegação espacial.",
    tags: ["Three.js", "3D", "WebGL"],
  },
];

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Descoberta",
    description:
      "Ouvimos o teu negócio, entendemos os objetivos e mapeamos as oportunidades. Uma conversa aberta para alinhar visão.",
    icon: "🔍",
  },
  {
    number: "02",
    title: "Proposta",
    description:
      "Desenhamos uma solução à medida com timeline, tecnologias e investimento claro. Sem surpresas, sem letras pequenas.",
    icon: "📋",
  },
  {
    number: "03",
    title: "Construção",
    description:
      "Desenvolvemos com sprints ágeis e feedback contínuo. Vês o progresso em tempo real e participas nas decisões.",
    icon: "🔨",
  },
  {
    number: "04",
    title: "Lançamento",
    description:
      "Deploy otimizado, testes finais, formação da equipa. Acompanhamos o lançamento e garantimos que tudo funciona.",
    icon: "🚀",
  },
];

const TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      "A Descomplicai transformou completamente a nossa presença online. O site ficou incrível e as reservas aumentaram 40% no primeiro mês. Profissionais de excelência.",
    author: "Maria Santos",
    role: "Proprietária, Bijou Restaurante",
    avatar: "MS",
  },
  {
    quote:
      "O chatbot que nos criaram responde a 80% das perguntas dos clientes automaticamente. Poupamos horas por semana e os clientes adoram a rapidez.",
    author: "João Ribeiro",
    role: "CEO, RibeiroSanto Vinhos",
    avatar: "JR",
  },
  {
    quote:
      "Desde que trabalhámos com a Descomplicai, o nosso negócio digital cresceu de forma que nunca imaginei. Simples, direto e sem complicações — tal como prometido.",
    author: "Ana Ferreira",
    role: "Fundadora, NinikaTours",
    avatar: "AF",
  },
];

// ─── ANIMATED COUNTER HOOK ──────────────────────────────────────────────────

function useAnimatedCounter(
  target: number,
  isVisible: boolean,
  duration: number = 2000
): number {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    let rafId: number;

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    }

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isVisible, target, duration]);

  return count;
}

// ─── INTERSECTION OBSERVER HOOK ─────────────────────────────────────────────

function useIntersectionObserver(
  threshold: number = 0.15
): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}

// ─── MOUSE PARALLAX HOOK ────────────────────────────────────────────────────

function useMouseParallax(intensity: number = 0.02): { x: number; y: number } {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    function handleMouseMove(e: MouseEvent) {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      targetX = (e.clientX - centerX) * intensity;
      targetY = (e.clientY - centerY) * intensity;
    }

    function lerp() {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      setPosition({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(lerp);
    }

    window.addEventListener("mousemove", handleMouseMove);
    rafId = requestAnimationFrame(lerp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [intensity]);

  return position;
}

// ─── STAT CARD COMPONENT ────────────────────────────────────────────────────

function StatCard({
  stat,
  isVisible,
  index,
}: {
  stat: StatItem;
  isVisible: boolean;
  index: number;
}) {
  const count = useAnimatedCounter(stat.value, isVisible, 2000 + index * 200);

  return (
    <div
      className="glass-card-strong p-6 md:p-8 text-center group hover:-translate-y-1 transition-all duration-500"
      style={{
        animationDelay: `${index * 150}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${index * 150}ms, transform 0.6s ease ${index * 150}ms`,
      }}
    >
      <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
        {stat.icon}
      </div>
      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        {count}
        {stat.suffix}
      </div>
      <div className="text-sm md:text-base text-slate-600 mt-2 font-medium">
        {stat.label}
      </div>
    </div>
  );
}

// ─── SERVICE CARD COMPONENT ─────────────────────────────────────────────────

function ServiceCard({
  service,
  index,
  isVisible,
}: {
  service: ServiceItem;
  index: number;
  isVisible: boolean;
}) {
  return (
    <div
      className="glass-card p-8 group hover:-translate-y-1 transition-all duration-500 card-float"
      style={{
        animationDelay: `${index * 2}s`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${index * 150}ms, transform 0.7s ease ${index * 150}ms`,
      }}
    >
      {/* Icon circle */}
      <div
        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.iconGradient} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}
      >
        {service.icon}
      </div>

      <h3 className="text-xl font-bold text-slate-800 mb-3">{service.title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm">{service.description}</p>

      {/* Hover glow line */}
      <div className="mt-6 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-indigo-400 to-purple-400 transition-all duration-500 rounded-full" />
    </div>
  );
}

// ─── PROJECT CARD COMPONENT ─────────────────────────────────────────────────

function ProjectCard({
  project,
  index,
  isVisible,
}: {
  project: ProjectItem;
  index: number;
  isVisible: boolean;
}) {
  return (
    <div
      className="glass-card p-6 group hover:-translate-y-1 transition-all duration-500 overflow-hidden relative"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
        transition: `opacity 0.6s ease ${index * 100}ms, transform 0.6s ease ${index * 100}ms`,
      }}
    >
      {/* Shimmer overlay */}
      <div className="absolute inset-0 glass-shimmer pointer-events-none" />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
          {project.emoji}
        </span>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${project.categoryColor} text-white shadow-sm`}
        >
          {project.category}
        </span>
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
        {project.title}
      </h3>
      <p className="text-slate-600 text-sm leading-relaxed mb-4">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/40 text-slate-700 border border-white/40 backdrop-blur-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── PROCESS STEP COMPONENT ─────────────────────────────────────────────────

function ProcessStepCard({
  step,
  index,
  isVisible,
  isLast,
}: {
  step: ProcessStep;
  index: number;
  isVisible: boolean;
  isLast: boolean;
}) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Connector line (not on last) */}
      {!isLast && (
        <div className="hidden md:block absolute top-12 left-[calc(50%+48px)] w-[calc(100%-48px)] h-0.5">
          <div
            className="h-full bg-gradient-to-r from-indigo-300 to-purple-300 rounded-full"
            style={{
              transform: isVisible ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transition: `transform 0.8s ease ${index * 200 + 400}ms`,
            }}
          />
        </div>
      )}

      {/* Card */}
      <div
        className="glass-card-strong p-8 text-center group hover:-translate-y-1 transition-all duration-500 w-full"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(40px)",
          transition: `opacity 0.7s ease ${index * 200}ms, transform 0.7s ease ${index * 200}ms`,
        }}
      >
        {/* Step number badge */}
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-200/50 group-hover:scale-110 transition-transform duration-300">
          {step.number}
        </div>

        <span className="text-3xl mb-3 block">{step.icon}</span>
        <h3 className="text-lg font-bold text-slate-800 mb-3">{step.title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
      </div>
    </div>
  );
}

// ─── TESTIMONIAL CARD COMPONENT ─────────────────────────────────────────────

function TestimonialCard({
  testimonial,
  index,
  isVisible,
}: {
  testimonial: TestimonialItem;
  index: number;
  isVisible: boolean;
}) {
  return (
    <div
      className="glass-card p-8 group hover:-translate-y-1 transition-all duration-500 relative overflow-hidden"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s ease ${index * 150}ms, transform 0.7s ease ${index * 150}ms`,
      }}
    >
      {/* Quote mark */}
      <div className="absolute top-4 right-6 text-6xl font-serif text-indigo-200/40 leading-none select-none">
        &ldquo;
      </div>

      {/* Quote text */}
      <p className="text-slate-700 leading-relaxed mb-6 relative z-10 italic">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold shadow-md">
          {testimonial.avatar}
        </div>
        <div>
          <div className="font-semibold text-slate-800 text-sm">
            {testimonial.author}
          </div>
          <div className="text-slate-500 text-xs">{testimonial.role}</div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function DescomplicaiGlassmorphism() {
  // ─── State ──────────────────────────────────────────────────
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const emailTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ─── Refs & observers ──────────────────────────────────────
  const [statsRef, statsVisible] = useIntersectionObserver(0.2);
  const [servicesRef, servicesVisible] = useIntersectionObserver(0.1);
  const [projectsRef, projectsVisible] = useIntersectionObserver(0.1);
  const [processRef, processVisible] = useIntersectionObserver(0.1);
  const [testimonialsRef, testimonialsVisible] = useIntersectionObserver(0.1);
  const [ctaRef, ctaVisible] = useIntersectionObserver(0.2);
  const [heroRef, heroVisible] = useIntersectionObserver(0.1);

  // ─── Mouse parallax for hero orbs ─────────────────────────
  const mouse = useMouseParallax(0.015);

  // ─── Scroll listener for navbar ───────────────────────────
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ─── Cleanup email timeout on unmount ─────────────────────
  useEffect(() => {
    return () => {
      if (emailTimeoutRef.current) clearTimeout(emailTimeoutRef.current);
    };
  }, []);

  // ─── Email submit handler ────────────────────────────────
  const handleEmailSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (email.trim()) {
        setEmailSubmitted(true);
        if (emailTimeoutRef.current) clearTimeout(emailTimeoutRef.current);
        emailTimeoutRef.current = setTimeout(() => setEmailSubmitted(false), 4000);
        setEmail("");
      }
    },
    [email]
  );

  // ─── Smooth scroll navigation ────────────────────────────
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  }, []);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          GLOBAL STYLES
          ═══════════════════════════════════════════════════════ */}
      <style jsx global>{`
        /* ── Base ── */
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          padding: 0;
          font-family: var(--font-inter), "Inter", -apple-system, BlinkMacSystemFont,
            "Segoe UI", sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          overflow-x: hidden;
        }

        /* ── Mesh Gradient Background ── */
        .mesh-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -2;
          background: linear-gradient(
            135deg,
            #f0e6ff 0%,
            #e8f4fd 25%,
            #fce7f3 50%,
            #e0f7f6 75%,
            #ede9fe 100%
          );
          background-size: 400% 400%;
          animation: meshGradient 20s ease infinite;
        }

        /* ── Floating Orbs ── */
        .orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.5;
          z-index: -1;
          pointer-events: none;
          will-change: transform;
        }

        .orb-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, #667eea 0%, transparent 70%);
          top: -10%;
          left: -5%;
          animation: float1 8s ease-in-out infinite;
        }

        .orb-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #f093fb 0%, transparent 70%);
          top: 30%;
          right: -8%;
          animation: float2 10s ease-in-out infinite;
        }

        .orb-3 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, #4fd1c5 0%, transparent 70%);
          bottom: 10%;
          left: 10%;
          animation: float3 12s ease-in-out infinite;
        }

        .orb-4 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, #764ba2 0%, transparent 70%);
          top: 60%;
          left: 50%;
          animation: float1 9s ease-in-out infinite reverse;
        }

        .orb-5 {
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, #a78bfa 0%, transparent 70%);
          top: 15%;
          right: 25%;
          animation: float2 7s ease-in-out infinite;
        }

        .orb-6 {
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, #f9a8d4 0%, transparent 70%);
          bottom: 30%;
          right: 15%;
          animation: float3 11s ease-in-out infinite reverse;
        }

        /* ── Glass Card Styles ── */
        .glass-card {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(100, 100, 180, 0.08);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glass-card:hover {
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          background: rgba(255, 255, 255, 0.22);
          border-color: rgba(255, 255, 255, 0.5);
          box-shadow: 0 12px 48px rgba(100, 100, 180, 0.14),
            0 0 0 1px rgba(255, 255, 255, 0.2);
        }

        .glass-card-strong {
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          background: rgba(255, 255, 255, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(100, 100, 180, 0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glass-card-strong:hover {
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
          background: rgba(255, 255, 255, 0.35);
          border-color: rgba(255, 255, 255, 0.6);
          box-shadow: 0 16px 56px rgba(100, 100, 180, 0.16);
        }

        /* ── Glass Navbar ── */
        .glass-nav {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.6);
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }

        .glass-nav-scrolled {
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          background: rgba(255, 255, 255, 0.8);
          box-shadow: 0 4px 30px rgba(100, 100, 180, 0.08);
        }

        /* ── Glass Button ── */
        .glass-btn {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 14px;
          padding: 12px 28px;
          font-weight: 600;
          font-size: 0.95rem;
          color: #4338ca;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
          position: relative;
          overflow: hidden;
        }

        .glass-btn:hover {
          background: rgba(255, 255, 255, 0.35);
          border-color: rgba(255, 255, 255, 0.6);
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.2),
            0 8px 24px rgba(100, 100, 180, 0.12);
        }

        .glass-btn:active {
          transform: scale(0.98);
        }

        .glass-btn-primary {
          background: linear-gradient(
            135deg,
            rgba(99, 102, 241, 0.85),
            rgba(139, 92, 246, 0.85)
          );
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.25);
        }

        .glass-btn-primary:hover {
          background: linear-gradient(
            135deg,
            rgba(99, 102, 241, 0.95),
            rgba(139, 92, 246, 0.95)
          );
          box-shadow: 0 0 30px rgba(99, 102, 241, 0.35),
            0 8px 24px rgba(100, 100, 180, 0.15);
        }

        /* ── Glass Input ── */
        .glass-input {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          background: rgba(255, 255, 255, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 14px;
          padding: 14px 20px;
          font-size: 0.95rem;
          color: #334155;
          outline: none;
          width: 100%;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .glass-input::placeholder {
          color: #94a3b8;
        }

        .glass-input:focus {
          background: rgba(255, 255, 255, 0.4);
          border-color: rgba(99, 102, 241, 0.5);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1),
            0 4px 16px rgba(100, 100, 180, 0.08);
        }

        /* ── Glass Shimmer ── */
        .glass-shimmer::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.15),
            transparent
          );
          animation: glassShimmer 4s ease-in-out infinite;
        }

        /* ── Gradient Text ── */
        .gradient-text-animated {
          background: linear-gradient(
            90deg,
            #667eea,
            #764ba2,
            #f093fb,
            #4fd1c5,
            #667eea
          );
          background-size: 300% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientText 6s ease infinite;
        }

        /* ── Card Float ── */
        .card-float {
          animation: cardFloat 8s ease-in-out infinite;
        }

        /* ── Mobile Menu ── */
        .mobile-menu-open {
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          background: rgba(255, 255, 255, 0.9);
        }

        /* ═════════════════════════════════════
           KEYFRAME ANIMATIONS
           ═════════════════════════════════════ */

        @keyframes meshGradient {
          0% {
            background-position: 0% 50%;
          }
          25% {
            background-position: 100% 25%;
          }
          50% {
            background-position: 100% 50%;
          }
          75% {
            background-position: 0% 75%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes float1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(30px, -40px) scale(1.05);
          }
          50% {
            transform: translate(-20px, -60px) scale(0.95);
          }
          75% {
            transform: translate(40px, -20px) scale(1.02);
          }
        }

        @keyframes float2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-40px, 30px) scale(1.03);
          }
          66% {
            transform: translate(20px, -40px) scale(0.97);
          }
        }

        @keyframes float3 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          20% {
            transform: translate(25px, 35px) scale(1.04);
          }
          40% {
            transform: translate(-35px, 15px) scale(0.96);
          }
          60% {
            transform: translate(15px, -25px) scale(1.02);
          }
          80% {
            transform: translate(-20px, -35px) scale(0.98);
          }
        }

        @keyframes pulseGlow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(99, 102, 241, 0.15);
          }
          50% {
            box-shadow: 0 0 40px rgba(99, 102, 241, 0.3);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glassShimmer {
          0% {
            left: -100%;
          }
          50%,
          100% {
            left: 200%;
          }
        }

        @keyframes gradientText {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes cardFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        @keyframes heroFloat {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-15px) rotate(1deg);
          }
          75% {
            transform: translateY(10px) rotate(-1deg);
          }
        }

        @keyframes badgeFloat1 {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-12px) translateX(8px);
          }
        }

        @keyframes badgeFloat2 {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(10px) translateX(-6px);
          }
        }

        @keyframes badgeFloat3 {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-8px) translateX(-10px);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes borderPulse {
          0%,
          100% {
            border-color: rgba(255, 255, 255, 0.3);
          }
          50% {
            border-color: rgba(255, 255, 255, 0.6);
          }
        }

        /* ═════════════════════════════════════
           RESPONSIVE
           ═════════════════════════════════════ */

        @media (max-width: 768px) {
          .orb {
            opacity: 0.3;
          }

          .orb-1 {
            width: 300px;
            height: 300px;
          }

          .orb-2 {
            width: 250px;
            height: 250px;
          }

          .orb-3 {
            width: 200px;
            height: 200px;
          }

          .orb-4,
          .orb-5,
          .orb-6 {
            width: 150px;
            height: 150px;
          }
        }

        @media (max-width: 480px) {
          .glass-btn {
            padding: 10px 20px;
            font-size: 0.875rem;
          }

          .glass-card,
          .glass-card-strong {
            border-radius: 16px;
          }
        }

        /* ── Scrollbar ── */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.3);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.5);
        }

        /* ── Selection ── */
        ::selection {
          background: rgba(99, 102, 241, 0.2);
          color: #4338ca;
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════════
          BACKGROUND LAYER — Mesh Gradient + Floating Orbs
          ═══════════════════════════════════════════════════════ */}
      <div className="mesh-bg" />

      {/* Floating gradient orbs with mouse parallax */}
      <div
        className="orb orb-1"
        style={{
          transform: `translate(${mouse.x * 1.2}px, ${mouse.y * 1.2}px)`,
        }}
      />
      <div
        className="orb orb-2"
        style={{
          transform: `translate(${mouse.x * -0.8}px, ${mouse.y * -0.8}px)`,
        }}
      />
      <div
        className="orb orb-3"
        style={{
          transform: `translate(${mouse.x * 0.5}px, ${mouse.y * 0.5}px)`,
        }}
      />
      <div
        className="orb orb-4"
        style={{
          transform: `translate(${mouse.x * -1.0}px, ${mouse.y * -1.0}px)`,
        }}
      />
      <div
        className="orb orb-5"
        style={{
          transform: `translate(${mouse.x * 0.7}px, ${mouse.y * 0.7}px)`,
        }}
      />
      <div
        className="orb orb-6"
        style={{
          transform: `translate(${mouse.x * -0.4}px, ${mouse.y * -0.4}px)`,
        }}
      />

      {/* ═══════════════════════════════════════════════════════
          SECTION 1 — FLOATING GLASS NAVBAR
          ═══════════════════════════════════════════════════════ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-nav glass-nav-scrolled" : "glass-nav"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button
              onClick={() => scrollTo("hero")}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-200/50 group-hover:shadow-indigo-300/70 transition-shadow duration-300">
                D
              </div>
              <span className="text-lg font-bold text-slate-800 tracking-tight">
                Descomplicai
              </span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {[
                { label: "Serviços", id: "services" },
                { label: "Projetos", id: "projects" },
                { label: "Processo", id: "process" },
                { label: "Testemunhos", id: "testimonials" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-white/30 transition-all duration-300"
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={() => scrollTo("cta")}
                className="glass-btn glass-btn-primary ml-3 text-sm !py-2.5 !px-5"
              >
                Contactar
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-1.5 hover:bg-white/30 transition-all duration-300"
              aria-label="Menu"
            >
              <span
                className={`w-5 h-0.5 bg-slate-700 transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-slate-700 transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-slate-700 transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mobile-menu-open border-t border-white/20">
            <div className="px-4 py-4 flex flex-col gap-1">
              {[
                { label: "Serviços", id: "services" },
                { label: "Projetos", id: "projects" },
                { label: "Processo", id: "process" },
                { label: "Testemunhos", id: "testimonials" },
                { label: "Contactar", id: "cta" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="px-4 py-3 rounded-xl text-left text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-white/40 transition-all duration-300"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2 — HERO
          ═══════════════════════════════════════════════════════ */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden"
      >
        {/* Hero floating decorative badges */}
        <div
          className="absolute top-[18%] left-[8%] hidden lg:block"
          style={{ animation: "badgeFloat1 6s ease-in-out infinite" }}
        >
          <div className="glass-card-strong px-4 py-2.5 flex items-center gap-2 text-sm">
            <span className="text-lg">🚀</span>
            <span className="font-semibold text-slate-700">Next.js 15</span>
          </div>
        </div>

        <div
          className="absolute top-[25%] right-[6%] hidden lg:block"
          style={{ animation: "badgeFloat2 7s ease-in-out infinite" }}
        >
          <div className="glass-card-strong px-4 py-2.5 flex items-center gap-2 text-sm">
            <span className="text-lg">🤖</span>
            <span className="font-semibold text-slate-700">IA Integrada</span>
          </div>
        </div>

        <div
          className="absolute bottom-[22%] left-[12%] hidden lg:block"
          style={{ animation: "badgeFloat3 8s ease-in-out infinite" }}
        >
          <div className="glass-card-strong px-4 py-2.5 flex items-center gap-2 text-sm">
            <span className="text-lg">⚡</span>
            <span className="font-semibold text-slate-700">100% Acessível</span>
          </div>
        </div>

        <div
          className="absolute bottom-[28%] right-[10%] hidden lg:block"
          style={{ animation: "badgeFloat1 9s ease-in-out infinite reverse" }}
        >
          <div className="glass-card-strong px-4 py-2.5 flex items-center gap-2 text-sm">
            <span className="text-lg">🇵🇹</span>
            <span className="font-semibold text-slate-700">Made in PT</span>
          </div>
        </div>

        <div
          className="absolute top-[45%] left-[4%] hidden xl:block"
          style={{ animation: "badgeFloat2 10s ease-in-out infinite" }}
        >
          <div className="glass-card-strong px-4 py-2.5 flex items-center gap-2 text-sm">
            <span className="text-lg">🎨</span>
            <span className="font-semibold text-slate-700">Design Premium</span>
          </div>
        </div>

        {/* Hero content */}
        <div
          className="text-center max-w-4xl mx-auto relative z-10"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 glass-card-strong px-5 py-2.5 mb-8 text-sm font-medium text-slate-700">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500" />
            </span>
            Estrutura Digital &bull; Mentoria &bull; Inteligência Artificial
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] mb-6 tracking-tight">
            <span className="gradient-text-animated">IA sem</span>
            <br />
            <span className="text-slate-800">complexidade.</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Criamos websites, automatizações e soluções com inteligência
            artificial para pequenos negócios em Portugal.{" "}
            <span className="font-semibold text-slate-700">
              Sem jargão, sem complicações.
            </span>
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollTo("cta")}
              className="glass-btn glass-btn-primary text-base !py-3.5 !px-8 w-full sm:w-auto"
            >
              Começar Agora
              <span className="ml-2">→</span>
            </button>
            <button
              onClick={() => scrollTo("projects")}
              className="glass-btn text-base !py-3.5 !px-8 w-full sm:w-auto"
            >
              Ver Projetos
            </button>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-6 mt-12 text-sm text-slate-500">
            <div className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Sem compromisso
            </div>
            <div className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Resposta em 24h
            </div>
            <div className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              100% Português
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-slate-400 font-medium tracking-wider uppercase">
            Scroll
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-slate-300/50 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3 — STATS BAR
          ═══════════════════════════════════════════════════════ */}
      <section id="stats" className="py-16 md:py-20 px-4">
        <div ref={statsRef} className="max-w-5xl mx-auto">
          <div className="glass-card-strong p-4 md:p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {STATS.map((stat, i) => (
                <StatCard
                  key={stat.label}
                  stat={stat}
                  isVisible={statsVisible}
                  index={i}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4 — SERVICES
          ═══════════════════════════════════════════════════════ */}
      <section id="services" className="py-20 md:py-28 px-4">
        <div ref={servicesRef} className="max-w-6xl mx-auto">
          {/* Section header */}
          <div
            className="text-center mb-16"
            style={{
              opacity: servicesVisible ? 1 : 0,
              transform: servicesVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div className="inline-flex items-center gap-2 glass-card-strong px-4 py-2 mb-6 text-sm font-medium text-slate-600">
              <span>✨</span> O que fazemos
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">
              Soluções que{" "}
              <span className="gradient-text-animated">descomplicam</span>
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto text-lg">
              Transformamos ideias em produtos digitais que funcionam. Simples,
              bonitos e eficientes.
            </p>
          </div>

          {/* Services grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SERVICES.map((service, i) => (
              <ServiceCard
                key={service.title}
                service={service}
                index={i}
                isVisible={servicesVisible}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 5 — FEATURED PROJECTS
          ═══════════════════════════════════════════════════════ */}
      <section id="projects" className="py-20 md:py-28 px-4">
        <div ref={projectsRef} className="max-w-6xl mx-auto">
          {/* Section header */}
          <div
            className="text-center mb-16"
            style={{
              opacity: projectsVisible ? 1 : 0,
              transform: projectsVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div className="inline-flex items-center gap-2 glass-card-strong px-4 py-2 mb-6 text-sm font-medium text-slate-600">
              <span>🎯</span> Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">
              Projetos em{" "}
              <span className="gradient-text-animated">destaque</span>
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto text-lg">
              Uma seleção dos nossos trabalhos mais recentes. Cada projeto é
              único, cada solução é à medida.
            </p>
          </div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={i}
                isVisible={projectsVisible}
              />
            ))}
          </div>

          {/* View all link */}
          <div
            className="text-center mt-12"
            style={{
              opacity: projectsVisible ? 1 : 0,
              transition: "opacity 0.6s ease 0.8s",
            }}
          >
            <Link
              href="/projetos"
              className="glass-btn inline-flex items-center gap-2 !text-indigo-600 hover:!text-purple-600 transition-colors"
            >
              Ver todos os projetos
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 6 — PROCESS
          ═══════════════════════════════════════════════════════ */}
      <section id="process" className="py-20 md:py-28 px-4">
        <div ref={processRef} className="max-w-6xl mx-auto">
          {/* Section header */}
          <div
            className="text-center mb-16"
            style={{
              opacity: processVisible ? 1 : 0,
              transform: processVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div className="inline-flex items-center gap-2 glass-card-strong px-4 py-2 mb-6 text-sm font-medium text-slate-600">
              <span>⚙️</span> Como trabalhamos
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">
              Do conceito ao{" "}
              <span className="gradient-text-animated">lançamento</span>
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto text-lg">
              Um processo transparente em 4 passos. Sem surpresas, sem
              complicações.
            </p>
          </div>

          {/* Process steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative">
            {PROCESS_STEPS.map((step, i) => (
              <ProcessStepCard
                key={step.number}
                step={step}
                index={i}
                isVisible={processVisible}
                isLast={i === PROCESS_STEPS.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 7 — TESTIMONIALS
          ═══════════════════════════════════════════════════════ */}
      <section id="testimonials" className="py-20 md:py-28 px-4">
        <div ref={testimonialsRef} className="max-w-6xl mx-auto">
          {/* Section header */}
          <div
            className="text-center mb-16"
            style={{
              opacity: testimonialsVisible ? 1 : 0,
              transform: testimonialsVisible
                ? "translateY(0)"
                : "translateY(30px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div className="inline-flex items-center gap-2 glass-card-strong px-4 py-2 mb-6 text-sm font-medium text-slate-600">
              <span>💬</span> Testemunhos
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">
              O que dizem os nossos{" "}
              <span className="gradient-text-animated">clientes</span>
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto text-lg">
              Feedback real de quem confiou em nós para transformar o seu
              negócio digital.
            </p>
          </div>

          {/* Testimonials grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, i) => (
              <TestimonialCard
                key={testimonial.author}
                testimonial={testimonial}
                index={i}
                isVisible={testimonialsVisible}
              />
            ))}
          </div>

          {/* Social proof row */}
          <div
            className="flex flex-wrap items-center justify-center gap-8 mt-16"
            style={{
              opacity: testimonialsVisible ? 1 : 0,
              transition: "opacity 0.6s ease 0.6s",
            }}
          >
            {[
              { metric: "4.9/5", label: "Satisfação" },
              { metric: "98%", label: "Entregas no prazo" },
              { metric: "85%", label: "Clientes recorrentes" },
              { metric: "24h", label: "Tempo de resposta" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {item.metric}
                </div>
                <div className="text-xs text-slate-500 mt-1 font-medium">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 8 — CTA
          ═══════════════════════════════════════════════════════ */}
      <section id="cta" className="py-20 md:py-28 px-4">
        <div ref={ctaRef} className="max-w-3xl mx-auto">
          <div
            className="glass-card-strong p-8 sm:p-12 md:p-16 text-center relative overflow-hidden"
            style={{
              opacity: ctaVisible ? 1 : 0,
              transform: ctaVisible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
              animation: ctaVisible ? "pulseGlow 3s ease-in-out infinite" : "none",
            }}
          >
            {/* Decorative background gradient circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-300/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-300/20 to-transparent rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">
              <span className="text-5xl mb-6 block">🪟</span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 leading-tight">
                Vamos descomplicar
                <br />
                <span className="gradient-text-animated">o teu negócio?</span>
              </h2>

              <p className="text-slate-600 max-w-lg mx-auto mb-10 text-lg">
                Diz-nos o que precisas. Sem compromisso, sem complicações. Uma
                conversa pode mudar tudo.
              </p>

              {/* Email form */}
              <form
                onSubmit={handleEmailSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="o-teu@email.pt"
                    required
                    className="glass-input"
                  />
                </div>
                <button
                  type="submit"
                  className="glass-btn glass-btn-primary !py-3.5 !px-7 whitespace-nowrap"
                >
                  {emailSubmitted ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Enviado!
                    </span>
                  ) : (
                    "Enviar"
                  )}
                </button>
              </form>

              <p className="text-xs text-slate-400 mt-4">
                Respondemos em menos de 24 horas. Sem spam, prometido.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 9 — FOOTER
          ═══════════════════════════════════════════════════════ */}
      <footer className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card p-8 sm:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
              {/* Brand column */}
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-200/50">
                    D
                  </div>
                  <span className="text-lg font-bold text-slate-800">
                    Descomplicai
                  </span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Estrutura Digital, Mentoria e Inteligência Artificial para
                  pequenos negócios em Portugal. Sem jargão, sem complicações.
                </p>
                <div className="flex items-center gap-3">
                  {/* Social icons */}
                  {[
                    {
                      label: "Instagram",
                      path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
                    },
                    {
                      label: "LinkedIn",
                      path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                    },
                    {
                      label: "Twitter",
                      path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                    },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href="#"
                      aria-label={social.label}
                      className="w-9 h-9 rounded-xl bg-white/30 border border-white/30 flex items-center justify-center hover:bg-white/50 hover:border-white/50 transition-all duration-300 group"
                    >
                      <svg
                        className="w-4 h-4 text-slate-600 group-hover:text-indigo-600 transition-colors"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d={social.path} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* Navigation column */}
              <div>
                <h4 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider">
                  Navegação
                </h4>
                <ul className="space-y-2.5">
                  {[
                    { label: "Serviços", id: "services" },
                    { label: "Projetos", id: "projects" },
                    { label: "Processo", id: "process" },
                    { label: "Testemunhos", id: "testimonials" },
                    { label: "Contacto", id: "cta" },
                  ].map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollTo(item.id)}
                        className="text-slate-600 hover:text-indigo-600 text-sm transition-colors duration-300"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact column */}
              <div>
                <h4 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider">
                  Contacto
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-400/20 to-purple-400/20 flex items-center justify-center text-base flex-shrink-0">
                      📧
                    </div>
                    <span>info@descomplicai.pt</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-400/20 to-purple-400/20 flex items-center justify-center text-base flex-shrink-0">
                      📍
                    </div>
                    <span>Figueira da Foz, Portugal</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-400/20 to-purple-400/20 flex items-center justify-center text-base flex-shrink-0">
                      🌐
                    </div>
                    <span>descomplicai.pt</span>
                  </li>
                </ul>

                {/* Tech stack badges */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {["Next.js", "React", "Tailwind", "IA"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/30 text-slate-600 border border-white/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-10 pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-500">
                &copy; 2026 Descomplicai. Todos os direitos
                reservados.
              </p>
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <span>Feito com</span>
                <span className="text-red-400">❤</span>
                <span>em Portugal 🇵🇹</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════════════════
          BACK TO TOP BUTTON
          ═══════════════════════════════════════════════════════ */}
      {scrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 glass-card-strong w-12 h-12 flex items-center justify-center hover:-translate-y-1 transition-all duration-300 group !rounded-2xl"
          aria-label="Voltar ao topo"
          style={{
            animation: "fadeInUp 0.3s ease",
          }}
        >
          <svg
            className="w-5 h-5 text-slate-600 group-hover:text-indigo-600 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      )}
    </>
  );
}
