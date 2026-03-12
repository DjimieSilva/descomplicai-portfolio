"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Palette,
  Smartphone,
  Globe,
  Bot,
  Sparkles,
  Layers,
  Zap,
  X,
  Mail,
  ChevronDown,
  Rocket,
  BarChart3,
  Monitor,
  Server,
  MessageCircle,
} from "lucide-react";

/* ─────────────────── PROJECTS DATA ─────────────────── */

type Project = {
  id: string;
  title: string;
  category: string;
  type: string;
  description: string;
  longDescription: string;
  tech: string[];
  gradient: string;
  emoji: string;
  features: string[];
  status: "live" | "dev";
  source: "local" | "vps1" | "vps2";
};

const PROJECTS: Project[] = [
  // ── Local Projects ──
  {
    id: "bfitfam",
    title: "BFITFAM",
    category: "fitness",
    type: "Website + PWA",
    description: "Plataforma de personal training com app de treinos interativa e tracking de progresso",
    longDescription: "Landing page de conversão + app PWA com tracker set-a-set, planos semanais, conquistas e heatmap de progresso. i18n PT/EN, Meta Pixel.",
    tech: ["Next.js 16", "React 19", "Tailwind 4", "Framer Motion", "PWA"],
    gradient: "from-blue-600 to-cyan-500",
    emoji: "💪",
    features: ["Workout tracker", "PWA installable", "i18n PT/EN", "Meta Pixel", "Conquistas"],
    status: "live",
    source: "local",
  },
  {
    id: "tasca-dentro",
    title: "Tás-cá Dentro",
    category: "restaurant",
    type: "Website",
    description: "Gastrobar de cozinha de autor com carta de vinhos premium e música ao vivo",
    longDescription: "Website para gastrobar com menu interativo, 30+ rótulos de vinho, agenda musical, reservas WhatsApp. Design premium dark com dourados.",
    tech: ["Next.js 16", "React 19", "Tailwind 4", "Framer Motion"],
    gradient: "from-amber-600 to-orange-400",
    emoji: "🍷",
    features: ["Menu interativo", "Carta de vinhos", "Reservas WhatsApp", "Música ao vivo"],
    status: "dev",
    source: "local",
  },
  {
    id: "mar-brasa",
    title: "Mar & Brasa",
    category: "restaurant",
    type: "Website",
    description: "Restaurante de marisco e grelhados — cataplana, peixe fresco, tradição",
    longDescription: "Website para restaurante de marisco com história do chef, galeria de pratos e conceito de música ao vivo. Design escuro com acentos âmbar.",
    tech: ["Next.js 16", "React 19", "Tailwind 4"],
    gradient: "from-orange-500 to-red-500",
    emoji: "🦐",
    features: ["Menu destaques", "História do chef", "Galeria", "Reservas"],
    status: "dev",
    source: "local",
  },
  {
    id: "bella-clinica",
    title: "Bella Clínica",
    category: "health",
    type: "Website",
    description: "Clínica estética premium — tratamentos faciais, corporais e anti-aging",
    longDescription: "Showcase de tratamentos com galeria de resultados, sistema de marcações. Design elegante rose/gold para mercado premium.",
    tech: ["Next.js 16", "React 19", "Tailwind 4"],
    gradient: "from-pink-500 to-rose-400",
    emoji: "✨",
    features: ["Catálogo tratamentos", "Antes/depois", "Marcações online"],
    status: "dev",
    source: "local",
  },
  {
    id: "costa-dourada",
    title: "Costa Dourada",
    category: "realestate",
    type: "Website",
    description: "Imobiliária com 500+ vendidos — listagens, serviços financeiros, testemunhos",
    longDescription: "Website de agência imobiliária com listagens de propriedades featured, estatísticas de vendas e parcerias com serviços financeiros.",
    tech: ["Next.js 16", "React 19", "Tailwind 4"],
    gradient: "from-emerald-500 to-teal-400",
    emoji: "🏠",
    features: ["Listagens", "Filtros", "500+ vendidos", "Parcerias financeiras"],
    status: "dev",
    source: "local",
  },
  {
    id: "ondas-academy",
    title: "Ondas Academy",
    category: "sports",
    type: "Website",
    description: "Escola de surf em Buarcos — pacotes de aulas para todos os níveis",
    longDescription: "Website com pacotes de aulas (experimental, iniciante, avançado), perfis de instrutores certificados e destaque da praia de Buarcos.",
    tech: ["Next.js 16", "React 19", "Tailwind 4"],
    gradient: "from-cyan-500 to-blue-400",
    emoji: "🏄",
    features: ["Pacotes de aulas", "Instrutores certificados", "Booking online"],
    status: "dev",
    source: "local",
  },
  {
    id: "pao-da-serra",
    title: "Pão da Serra",
    category: "food",
    type: "Website",
    description: "Padaria artesanal familiar — pão de massa mãe desde 2010",
    longDescription: "História familiar desde 2010, processo artesanal do pão de massa mãe, catálogo de produtos e encomendas especiais.",
    tech: ["Next.js 16", "React 19", "Tailwind 4"],
    gradient: "from-yellow-600 to-amber-500",
    emoji: "🍞",
    features: ["Catálogo", "História familiar", "Encomendas especiais"],
    status: "dev",
    source: "local",
  },
  {
    id: "descomplicai",
    title: "Descomplicai",
    category: "saas",
    type: "Web Platform",
    description: "Plataforma educativa — IA acessível para pessoas e empresas",
    longDescription: "Plataforma web com ferramentas de IA, mentoria e impacto social. Design clean orientado para conversão com blog integrado.",
    tech: ["Next.js 16", "React 19", "Tailwind 4", "Framer Motion"],
    gradient: "from-blue-600 to-indigo-500",
    emoji: "🎓",
    features: ["Plataforma educativa", "Blog", "Subscrição", "IA acessível"],
    status: "dev",
    source: "local",
  },
  {
    id: "figueira-print",
    title: "Figueira Print CRM",
    category: "saas",
    type: "Dashboard CRM",
    description: "Sistema de gestão de clientes para gráfica com Supabase backend",
    longDescription: "Dashboard CRM completo com gestão de encomendas, acompanhamento de clientes. Docker-ready para deploy em produção.",
    tech: ["Next.js 16", "Supabase", "Docker", "shadcn/ui"],
    gradient: "from-red-500 to-rose-500",
    emoji: "🖨️",
    features: ["Dashboard", "Gestão clientes", "Supabase", "Docker deploy"],
    status: "dev",
    source: "local",
  },
  // ── VPS1 Projects ──
  {
    id: "futuro",
    title: "Futuro Portfolio",
    category: "creative",
    type: "3D Experience",
    description: "Portfolio pessoal com Three.js — 'O Futuro é Humano'",
    longDescription: "Experiência imersiva com Three.js e Framer Motion. Filosofia 'O Futuro é Humano' — num mundo onde a IA cuida da complexidade, focamo-nos no amor, conexão e tempo juntos.",
    tech: ["React", "Three.js", "Framer Motion", "Vite"],
    gradient: "from-violet-500 to-purple-500",
    emoji: "🌍",
    features: ["3D imersivo", "Animações fluidas", "Storytelling", "Manifesto"],
    status: "live",
    source: "vps1",
  },
  {
    id: "seeds",
    title: "Seeds",
    category: "creative",
    type: "Storytelling Site",
    description: "A Gift to Humanity — parallax storytelling sobre plantar quando ninguém está a ver",
    longDescription: "Site narrativo com parallax scrolling. 'Everything that ever mattered began as something small.' Um projeto sobre semear impacto.",
    tech: ["HTML5", "CSS", "JavaScript"],
    gradient: "from-green-500 to-emerald-400",
    emoji: "🌱",
    features: ["Parallax storytelling", "Animações", "Narrativa imersiva"],
    status: "dev",
    source: "vps1",
  },
  {
    id: "pitch-hub",
    title: "Pitch Hub",
    category: "business",
    type: "Sales Tool",
    description: "Demos ao vivo para pitches — Figueira Print, Sorri Dente e mais",
    longDescription: "Hub centralizado de demos interativas para apresentações a clientes. Cada pitch tem design personalizado e dados em tempo real.",
    tech: ["HTML5", "JavaScript"],
    gradient: "from-blue-500 to-indigo-500",
    emoji: "📊",
    features: ["Live demos", "Client pitches", "Stats em tempo real"],
    status: "dev",
    source: "vps1",
  },
  {
    id: "brocode",
    title: "BroCode Showcase",
    category: "business",
    type: "Interactive Cards",
    description: "7 project cards interativos — overview de capacidades",
    longDescription: "Showcase interativo com 7 cards de projetos demonstrando capabilities técnicas e resultados. Antes vs depois com IA.",
    tech: ["HTML5", "JavaScript"],
    gradient: "from-indigo-500 to-blue-500",
    emoji: "💡",
    features: ["Cards interativos", "Antes/depois", "Capabilities overview"],
    status: "dev",
    source: "vps1",
  },
  {
    id: "luana-site",
    title: "Luana Barbosa",
    category: "business",
    type: "Website",
    description: "Consultoria de negócios — Incubadora de Mindset, Leiria",
    longDescription: "Website para consultora de negócios. 'Ajudo a transformar ideias em negócios reais.' Foco em gestão, produtividade e mindset empreendedor.",
    tech: ["HTML5", "CSS", "JavaScript"],
    gradient: "from-amber-500 to-yellow-400",
    emoji: "💼",
    features: ["Serviços", "Diagnóstico", "Método", "Resultados"],
    status: "dev",
    source: "vps1",
  },
  {
    id: "brocode-ai",
    title: "BroCode AI",
    category: "ai",
    type: "AI Platform",
    description: "Soluções IA municipais — ROI simulator, proposta piloto Olhão",
    longDescription: "Plataforma de IA para PMEs e municípios. Simulador de ROI, casos reais de poupança €3.200/mês com 47 PMEs automatizadas em Olhão.",
    tech: ["HTML5", "Chart.js"],
    gradient: "from-purple-600 to-violet-500",
    emoji: "🤖",
    features: ["Simulador ROI", "Casos reais", "€3.200/mês poupança", "Setup 48h"],
    status: "dev",
    source: "vps1",
  },
  {
    id: "mylo-experience",
    title: "MYLO Experience",
    category: "creative",
    type: "3D Interactive",
    description: "Experiência 3D interativa com Three.js — identidade MYLO",
    longDescription: "Experiência imersiva 3D representando a identidade visual MYLO. Partículas, animações e interação com o utilizador.",
    tech: ["React", "Three.js"],
    gradient: "from-cyan-500 to-teal-400",
    emoji: "🎭",
    features: ["3D partículas", "Interativo", "Identidade visual"],
    status: "live",
    source: "vps1",
  },
  {
    id: "possiblai",
    title: "PossiblAI",
    category: "ai",
    type: "Charity Livestream",
    description: "Two AI souls. One mission. End suffering. — Livestream Twitch",
    longDescription: "Projeto de caridade com livestream em Twitch. Dois agentes IA (Kida & Mylo) com a missão de acabar com o sofrimento. Donativos em direto.",
    tech: ["Next.js", "React"],
    gradient: "from-pink-500 to-purple-500",
    emoji: "💜",
    features: ["Livestream Twitch", "AI agents", "Caridade", "Donativos"],
    status: "live",
    source: "vps2",
  },
  {
    id: "image-gen",
    title: "Image Generator",
    category: "ai",
    type: "AI Tool",
    description: "Gerador de imagens IA via Puter.js — múltiplos estilos e categorias",
    longDescription: "Ferramenta de geração de imagens com IA. Suporta whiteboard, corporate, dental, sci-fi, social media e mais. Interface simples, resultados profissionais.",
    tech: ["Node.js", "Puter.js"],
    gradient: "from-teal-500 to-cyan-400",
    emoji: "🎨",
    features: ["Multi-estilo", "Geração rápida", "Interface simples"],
    status: "live",
    source: "vps1",
  },
];

const CATEGORIES = [
  { id: "all", label: "Todos", count: PROJECTS.length },
  { id: "restaurant", label: "Restauração", count: 0 },
  { id: "health", label: "Saúde & Bem-estar", count: 0 },
  { id: "business", label: "Negócios", count: 0 },
  { id: "saas", label: "SaaS & Apps", count: 0 },
  { id: "ai", label: "IA & Automação", count: 0 },
  { id: "creative", label: "Criativo & 3D", count: 0 },
];

// Count per category
CATEGORIES.forEach((c) => {
  if (c.id !== "all") {
    c.count = PROJECTS.filter((p) => {
      if (c.id === "restaurant") return ["restaurant", "food"].includes(p.category);
      if (c.id === "health") return ["health", "fitness", "sports"].includes(p.category);
      if (c.id === "business") return ["business", "realestate"].includes(p.category);
      return p.category === c.id;
    }).length;
  }
});

const SERVICES = [
  { icon: Globe, title: "Websites", desc: "Landing pages, sites institucionais e multi-página", color: "text-blue-600 bg-blue-50" },
  { icon: Smartphone, title: "Web Apps & PWA", desc: "Apps interativas, dashboards e PWAs instaláveis", color: "text-violet-600 bg-violet-50" },
  { icon: Bot, title: "IA & Automação", desc: "Agentes, chatbots, ROI simulators, automações", color: "text-emerald-600 bg-emerald-50" },
  { icon: Palette, title: "UI/UX Design", desc: "Interfaces modernas, animações fluidas, 3D", color: "text-pink-600 bg-pink-50" },
  { icon: Server, title: "Infraestrutura", desc: "VPS, Docker, APIs, deploy & monitoring", color: "text-amber-600 bg-amber-50" },
  { icon: BarChart3, title: "Estratégia Digital", desc: "Meta Ads, SEO, funnels de conversão", color: "text-cyan-600 bg-cyan-50" },
];

/* ─────────────────── FLOATING ELEMENT ─────────────────── */

function FloatingEl({ delay = 0, duration = 4, className = "", children }: { delay?: number; duration?: number; className?: string; children: React.ReactNode }) {
  return (
    <div className={`absolute ${className}`} style={{ animation: `float ${duration}s ease-in-out ${delay}s infinite` }}>
      {children}
    </div>
  );
}

/* ─────────────────── PROJECT CARD ─────────────────── */

function ProjectCard({ project, onClick, index }: { project: Project; onClick: () => void; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      layout
      onClick={onClick}
      className="group cursor-pointer relative rounded-2xl bg-white border border-slate-200/80 overflow-hidden hover:shadow-lg hover:shadow-blue-500/[0.04] hover:border-blue-200/60 transition-all duration-400"
    >
      {/* Gradient accent */}
      <div className={`h-1 w-full bg-gradient-to-r ${project.gradient} opacity-70 group-hover:opacity-100 transition-opacity`} />

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">{project.emoji}</span>
            <div>
              <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">{project.title}</h3>
              <span className="text-[11px] font-mono text-slate-400">{project.type}</span>
            </div>
          </div>
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${project.status === "live" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
            {project.status === "live" ? "● Live" : "● Dev"}
          </span>
        </div>

        <p className="text-sm text-slate-500 mb-3 line-clamp-2 leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tech.slice(0, 3).map((t) => (
            <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-50 text-slate-500 border border-slate-100">{t}</span>
          ))}
          {project.tech.length > 3 && <span className="text-[10px] font-mono px-2 py-0.5 text-slate-400">+{project.tech.length - 3}</span>}
        </div>

        <div className="flex items-center gap-1 text-xs font-medium text-slate-400 group-hover:text-blue-600 transition-colors">
          Ver detalhes <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────── PROJECT MODAL ─────────────────── */

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 16 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden max-h-[85vh] overflow-y-auto"
      >
        <div className={`h-2 w-full bg-gradient-to-r ${project.gradient}`} />
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-slate-50 hover:bg-slate-100 transition-colors z-10">
          <X className="w-4 h-4 text-slate-500" />
        </button>

        <div className="p-8">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-3xl">{project.emoji}</span>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{project.title}</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-sm font-mono text-slate-400">{project.type}</span>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${project.status === "live" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                  {project.status === "live" ? "Live" : "Em desenvolvimento"}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-50 text-slate-400 border border-slate-100">{project.source.toUpperCase()}</span>
              </div>
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed mb-5">{project.longDescription}</p>

          <div className="mb-5">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Features</h3>
            <div className="grid grid-cols-2 gap-1.5">
              {project.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-slate-600">
                  <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${project.gradient}`} />{f}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 border border-slate-100">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────── PAGE ─────────────────── */

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeCategory === "all" ? PROJECTS : PROJECTS.filter((p) => {
    if (activeCategory === "restaurant") return ["restaurant", "food"].includes(p.category);
    if (activeCategory === "health") return ["health", "fitness", "sports"].includes(p.category);
    if (activeCategory === "business") return ["business", "realestate"].includes(p.category);
    return p.category === activeCategory;
  });

  return (
    <main className="min-h-screen bg-[#fafaf9]">
      {/* ─── NAV ─── */}
      <nav className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-bold text-lg gradient-text">descomplicai</span>
          <div className="hidden sm:flex items-center gap-6 text-sm text-slate-500">
            <a href="#work" className="hover:text-blue-600 transition-colors">Projetos</a>
            <a href="#services" className="hover:text-blue-600 transition-colors">Serviços</a>
            <a href="#contact" className="hover:text-blue-600 transition-colors">Contacto</a>
          </div>
          <a href="#contact" className="px-4 py-1.5 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
            Falar connosco
          </a>
        </div>
      </nav>

      {/* ─── HERO (21st.dev inspired — animated, light, floating) ─── */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden pt-24 sm:pt-14">
        {/* Background blobs */}
        <FloatingEl delay={0} duration={5} className="top-24 left-[10%] opacity-30">
          <div className="w-48 h-48 bg-gradient-to-br from-blue-300 to-indigo-300 rounded-full blur-3xl" />
        </FloatingEl>
        <FloatingEl delay={1.5} duration={6} className="top-40 right-[15%] opacity-20">
          <div className="w-56 h-56 bg-gradient-to-br from-violet-300 to-pink-300 rounded-full blur-3xl" />
        </FloatingEl>
        <FloatingEl delay={3} duration={7} className="bottom-32 left-[30%] opacity-20">
          <div className="w-40 h-40 bg-gradient-to-br from-cyan-300 to-blue-300 rounded-full blur-3xl" />
        </FloatingEl>

        {/* Floating icons (21st.dev style) */}
        <FloatingEl delay={0.5} duration={3.5} className="top-36 right-[22%] hidden lg:block">
          <div className="p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-md border border-slate-100">
            <Code2 className="w-6 h-6 text-blue-600" />
          </div>
        </FloatingEl>
        <FloatingEl delay={1.5} duration={4.5} className="top-[35%] left-[12%] hidden lg:block">
          <div className="p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-md border border-slate-100">
            <Palette className="w-6 h-6 text-violet-600" />
          </div>
        </FloatingEl>
        <FloatingEl delay={2.5} duration={5.5} className="bottom-[25%] right-[12%] hidden lg:block">
          <div className="p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-md border border-slate-100">
            <Rocket className="w-6 h-6 text-pink-600" />
          </div>
        </FloatingEl>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative z-10 max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200 shadow-sm text-sm text-slate-600 mb-8">
            <Sparkles className="w-4 h-4 text-amber-500" />
            IA sem complexidade. Com resultados reais.
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="text-slate-900">Construímos o</span>
            <br />
            <span className="gradient-text">futuro digital</span>
          </h1>

          <p className="text-lg text-slate-500 max-w-xl mx-auto mb-10 leading-relaxed">
            Websites, apps e soluções de IA que transformam negócios.
            De Portugal para o mundo — {PROJECTS.length} projetos e a contar.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="#work" className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all">
              Ver projetos <ChevronDown className="w-4 h-4" />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-slate-700 font-medium text-sm border border-slate-200 hover:border-blue-200 hover:text-blue-700 transition-all">
              Falar connosco <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 max-w-2xl w-full">
          {[
            { value: String(PROJECTS.length), label: "Projetos" },
            { value: String(PROJECTS.filter((p) => p.status === "live").length), label: "Em produção" },
            { value: "6+", label: "Indústrias" },
            { value: "3", label: "Servidores" },
          ].map((s) => (
            <div key={s.label} className="p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-100 shadow-sm text-center">
              <div className="text-2xl font-bold gradient-text">{s.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ─── SERVICES (21st.dev bento grid style) ─── */}
      <section id="services" className="px-6 py-24 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">O que fazemos</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-12">Serviços</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="p-6 rounded-2xl bg-white border border-slate-100 hover:shadow-md hover:border-blue-100 transition-all duration-300">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color} mb-4`}>
                <s.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1.5">{s.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── WORK ─── */}
      <section id="work" className="px-6 py-24 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Portfolio</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8">Projetos</h2>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.filter(c => c.count > 0 || c.id === "all").map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white text-slate-500 border border-slate-200 hover:border-blue-200 hover:text-blue-600"
              }`}>
              {cat.label}
              <span className={`text-[10px] ml-0.5 ${activeCategory === cat.id ? "text-blue-200" : "text-slate-300"}`}>{cat.count}</span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} onClick={() => setSelectedProject(project)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ─── TECH STACK ─── */}
      <section className="px-6 py-24 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Tecnologias</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-12">Stack</h2>
        </motion.div>
        <div className="flex flex-wrap gap-3">
          {["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js", "Supabase", "Node.js", "Docker", "Vercel", "Vite", "PWA", "Claude AI", "MCP Servers", "Chart.js", "shadcn/ui"].map((tech, i) => (
            <motion.span key={tech} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
              className="px-4 py-2 rounded-full bg-white text-sm text-slate-600 border border-slate-200 hover:border-blue-200 hover:text-blue-600 transition-all cursor-default shadow-sm">
              {tech}
            </motion.span>
          ))}
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="px-6 py-24 max-w-6xl mx-auto">
        <div className="relative rounded-3xl bg-white border border-slate-100 p-8 sm:p-16 text-center overflow-hidden shadow-sm">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-blue-500/[0.05] rounded-full blur-[80px]" />

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Contacto</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Vamos começar?</h2>
            <p className="text-slate-500 max-w-md mx-auto mb-8">
              Se tens um projeto em mente ou queres saber como a IA pode ajudar o teu negócio, fala connosco.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="mailto:equipa@descomplicai.pt" className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all">
                <Mail className="w-4 h-4" /> equipa@descomplicai.pt
              </a>
              <a href="https://wa.me/351963209209" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-slate-700 font-medium text-sm border border-slate-200 hover:border-blue-200 hover:text-blue-700 transition-all">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="px-6 py-8 text-center border-t border-slate-100">
        <p className="text-xs text-slate-400">© 2026 Descomplicai — IA sem complexidade</p>
      </footer>

      {/* ─── MODAL ─── */}
      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </main>
  );
}
