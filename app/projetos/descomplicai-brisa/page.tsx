"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ─────────────────────────── DATA ─────────────────────────── */

const categories = [
  { id: "all", name: "Todos", emoji: "🌐", count: 110 },
  { id: "restaurants", name: "Restaurantes", emoji: "🍽️", count: 17 },
  { id: "clinics", name: "Clínicas", emoji: "🏥", count: 9 },
  { id: "tools", name: "Ferramentas", emoji: "🛠️", count: 15 },
  { id: "games", name: "Jogos", emoji: "🎮", count: 8 },
  { id: "creative", name: "Criativos", emoji: "🎨", count: 12 },
  { id: "music", name: "Música", emoji: "🎵", count: 6 },
  { id: "education", name: "Educação", emoji: "📚", count: 10 },
  { id: "business", name: "Negócios", emoji: "💼", count: 8 },
  { id: "interactive", name: "Interativos", emoji: "✨", count: 25 },
];

const featuredProjects = [
  { name: "Bijou Restaurante", emoji: "💎", cat: "restaurants", desc: "Website premium para restaurante fine-dining com reservas online e menu interativo.", size: "large", gradient: "from-amber-100 to-orange-100" },
  { name: "Chess", emoji: "♟️", cat: "games", desc: "Jogo de xadrez completo com IA, análise de jogadas e modos multiplayer.", size: "large", gradient: "from-slate-100 to-zinc-200" },
  { name: "Fractal Explorer", emoji: "🌀", cat: "creative", desc: "Explorador interativo de fractais com zoom infinito e paletas de cores.", size: "large", gradient: "from-purple-100 to-pink-100" },
  { name: "Solar System", emoji: "🪐", cat: "education", desc: "Sistema solar 3D interativo com dados reais de cada planeta.", size: "large", gradient: "from-blue-100 to-indigo-100" },
  { name: "Synth", emoji: "🎹", cat: "music", desc: "Sintetizador web completo com osciladores e efeitos.", size: "medium", gradient: "from-violet-100 to-fuchsia-100" },
  { name: "Generative Art", emoji: "🎨", cat: "creative", desc: "Motor de arte generativa com algoritmos em tempo real.", size: "medium", gradient: "from-emerald-100 to-teal-100" },
  { name: "Particle Sim", emoji: "⚡", cat: "interactive", desc: "Simulador de partículas com física realista.", size: "medium", gradient: "from-cyan-100 to-sky-100" },
  { name: "Alba Saúde Dentária", emoji: "🦷", cat: "clinics", desc: "Clínica dentária com marcação online.", size: "medium", gradient: "from-sky-100 to-blue-100" },
  { name: "Maze Solver", emoji: "🧩", cat: "games", desc: "Gerador e solver de labirintos com visualização.", size: "small", gradient: "from-lime-100 to-green-100" },
  { name: "Music Visualizer", emoji: "🌈", cat: "music", desc: "Visualizador de música com WebAudio API.", size: "small", gradient: "from-rose-100 to-pink-100" },
  { name: "JSON Formatter", emoji: "📋", cat: "tools", desc: "Formatador e validador de JSON.", size: "small", gradient: "from-amber-100 to-yellow-100" },
  { name: "Pomodoro", emoji: "🍅", cat: "tools", desc: "Timer Pomodoro com estatísticas.", size: "small", gradient: "from-red-100 to-orange-100" },
  { name: "Drawing Canvas", emoji: "🖌️", cat: "creative", desc: "Canvas de desenho com pincéis.", size: "small", gradient: "from-indigo-100 to-violet-100" },
  { name: "Periodic Table", emoji: "⚗️", cat: "education", desc: "Tabela periódica interativa.", size: "small", gradient: "from-teal-100 to-cyan-100" },
  { name: "Globe Explorer", emoji: "🌍", cat: "education", desc: "Globo 3D com dados geográficos.", size: "small", gradient: "from-green-100 to-emerald-100" },
];

const allProjects = [
  { name: "AI Chat Sim", emoji: "🤖", cat: "interactive" },
  { name: "Alba Saúde Dentária", emoji: "🦷", cat: "clinics" },
  { name: "Aurora Borealis", emoji: "🌌", cat: "creative" },
  { name: "BFitFam", emoji: "💪", cat: "business" },
  { name: "Bijou Restaurante", emoji: "💎", cat: "restaurants" },
  { name: "BMI Calculator", emoji: "⚖️", cat: "tools" },
  { name: "Breathing Exercise", emoji: "🧘", cat: "interactive" },
  { name: "Caçarola", emoji: "🍲", cat: "restaurants" },
  { name: "Caçarola Dois", emoji: "🥘", cat: "restaurants" },
  { name: "Café Praça 18", emoji: "☕", cat: "restaurants" },
  { name: "Calculator", emoji: "🔢", cat: "tools" },
  { name: "Casa dos Papagaios", emoji: "🦜", cat: "restaurants" },
  { name: "Cataventos", emoji: "🌬️", cat: "restaurants" },
  { name: "Chess", emoji: "♟️", cat: "games" },
  { name: "Clínica Dentária Quiaios", emoji: "🏥", cat: "clinics" },
  { name: "Clínica Tamargueira", emoji: "🏥", cat: "clinics" },
  { name: "Clínica Vasco da Gama", emoji: "🏥", cat: "clinics" },
  { name: "Color Blindness Sim", emoji: "👁️", cat: "interactive" },
  { name: "Color Palette Generator", emoji: "🎨", cat: "tools" },
  { name: "Color Theory", emoji: "🌈", cat: "education" },
  { name: "Countdown", emoji: "⏰", cat: "tools" },
  { name: "CSS Art Gallery", emoji: "🖼️", cat: "creative" },
  { name: "CSS Playground", emoji: "🎠", cat: "tools" },
  { name: "Decision Wheel", emoji: "🎡", cat: "interactive" },
  { name: "DentalKid", emoji: "😁", cat: "clinics" },
  { name: "DentalKid v2", emoji: "😁", cat: "clinics" },
  { name: "Design System", emoji: "📐", cat: "tools" },
  { name: "Drawing Canvas", emoji: "🖌️", cat: "creative" },
  { name: "Drum Machine", emoji: "🥁", cat: "music" },
  { name: "Emoji Mixer", emoji: "😜", cat: "interactive" },
  { name: "Flashcards", emoji: "📇", cat: "education" },
  { name: "FozClínica", emoji: "🏥", cat: "clinics" },
  { name: "Fractal Explorer", emoji: "🌀", cat: "creative" },
  { name: "Futuro", emoji: "🔮", cat: "business" },
  { name: "Generative Art", emoji: "🎨", cat: "creative" },
  { name: "Globe Explorer", emoji: "🌍", cat: "education" },
  { name: "Gradient Maker", emoji: "🌅", cat: "tools" },
  { name: "Guitar Tuner", emoji: "🎸", cat: "music" },
  { name: "Habit Tracker", emoji: "✅", cat: "tools" },
  { name: "Jaime Silva", emoji: "👨‍💻", cat: "business" },
  { name: "JSON Formatter", emoji: "📋", cat: "tools" },
  { name: "Mapa Portugal", emoji: "🗺️", cat: "education" },
  { name: "Marégrafo", emoji: "🌊", cat: "restaurants" },
  { name: "Marisqueira Rosa Amélia", emoji: "🦐", cat: "restaurants" },
  { name: "Markdown Editor", emoji: "✍️", cat: "tools" },
  { name: "Maze Solver", emoji: "🧩", cat: "games" },
  { name: "MeioCheio", emoji: "🍷", cat: "restaurants" },
  { name: "Memory Game", emoji: "🃏", cat: "games" },
  { name: "Mesa dos Amigos", emoji: "🍻", cat: "restaurants" },
  { name: "Mood Journal", emoji: "📔", cat: "interactive" },
  { name: "Morse Code", emoji: "📡", cat: "education" },
  { name: "Music Box", emoji: "🎵", cat: "music" },
  { name: "Music Theory", emoji: "🎼", cat: "education" },
  { name: "Music Visualizer", emoji: "🌈", cat: "music" },
  { name: "Nalu Cabedelo", emoji: "🏄", cat: "restaurants" },
  { name: "Ninika Tours", emoji: "✈️", cat: "business" },
  { name: "O Picadeiro", emoji: "🎪", cat: "restaurants" },
  { name: "Ondas Academy", emoji: "🏄‍♂️", cat: "business" },
  { name: "Particle Sim", emoji: "⚡", cat: "interactive" },
  { name: "Password Generator", emoji: "🔐", cat: "tools" },
  { name: "Pé na Areia", emoji: "🏖️", cat: "restaurants" },
  { name: "Pé no Bairro", emoji: "🏘️", cat: "restaurants" },
  { name: "Periodic Table", emoji: "⚗️", cat: "education" },
  { name: "Photo Filters", emoji: "📷", cat: "creative" },
  { name: "Pixel Art", emoji: "👾", cat: "creative" },
  { name: "Pomodoro", emoji: "🍅", cat: "tools" },
  { name: "Portfolio Builder", emoji: "💼", cat: "tools" },
  { name: "Premium Clínica Dentária", emoji: "✨", cat: "clinics" },
  { name: "Quinta da Salmanha", emoji: "🏡", cat: "restaurants" },
  { name: "Quintas Estrelas", emoji: "⭐", cat: "business" },
  { name: "Quiz Portugal", emoji: "🇵🇹", cat: "education" },
  { name: "Rabbit Hole", emoji: "🐰", cat: "interactive" },
  { name: "Recipe Finder", emoji: "🔍", cat: "tools" },
  { name: "Regex Tester", emoji: "🔧", cat: "tools" },
  { name: "Ribeirosanto", emoji: "🏞️", cat: "business" },
  { name: "Rota dos Vinhos", emoji: "🍇", cat: "restaurants" },
  { name: "RPG Chronicle", emoji: "📜", cat: "games" },
  { name: "RPG Quest", emoji: "⚔️", cat: "games" },
  { name: "Sabor Abençoado", emoji: "🙏", cat: "restaurants" },
  { name: "Sand Murtinheira", emoji: "🏝️", cat: "interactive" },
  { name: "Seeds", emoji: "🌱", cat: "interactive" },
  { name: "Snake Game", emoji: "🐍", cat: "games" },
  { name: "Solar System", emoji: "🪐", cat: "education" },
  { name: "Sorting Visualizer", emoji: "📊", cat: "interactive" },
  { name: "Synth", emoji: "🎹", cat: "music" },
  { name: "Tasca da Praia", emoji: "🌅", cat: "restaurants" },
  { name: "Tasca Dentro", emoji: "🍺", cat: "restaurants" },
  { name: "Text Analyzer", emoji: "📝", cat: "tools" },
  { name: "Todo Kanban", emoji: "📌", cat: "tools" },
  { name: "Typing Speed Test", emoji: "⌨️", cat: "games" },
  { name: "Unit Converter", emoji: "📏", cat: "tools" },
  { name: "UPConcept Clínica", emoji: "🏥", cat: "clinics" },
  { name: "Vindima Selvagem", emoji: "🍇", cat: "interactive" },
  { name: "Vinho na Rua", emoji: "🍷", cat: "interactive" },
  { name: "Weather Mood", emoji: "🌤️", cat: "interactive" },
  { name: "World Clock", emoji: "🕐", cat: "interactive" },
  { name: "Zeff Pizza", emoji: "🍕", cat: "restaurants" },
];

const impactStats = [
  { value: 110, suffix: "+", label: "Projetos criados", emoji: "🚀" },
  { value: 17, suffix: "", label: "Restaurantes digitalizados", emoji: "🍽️" },
  { value: 9, suffix: "", label: "Clínicas com presença online", emoji: "🏥" },
  { value: 40, suffix: "+", label: "Ferramentas gratuitas", emoji: "🛠️" },
  { value: null, suffix: "∞", label: "Problemas resolvidos", emoji: "💡" },
];

const testimonials = [
  {
    name: "Maria Santos",
    role: "Proprietária — Bijou Restaurante",
    quote: "O Jaime transformou a presença online do meu restaurante. Em duas semanas tínhamos um site profissional e as reservas online aumentaram 40%. E não me cobrou nada!",
    avatar: "MS",
  },
  {
    name: "Dr. Pedro Almeida",
    role: "Clínica Dentária Quiaios",
    quote: "Procurei orçamentos para websites e todos ultrapassavam os 2.000 euros. O Jaime fez um site melhor do que qualquer proposta que recebi — e fez porque acredita na missão.",
    avatar: "PA",
  },
  {
    name: "Sofia Rodrigues",
    role: "Estudante de Design",
    quote: "Aprendi mais sobre interatividade web com os projetos do Jaime do que em dois semestres na faculdade. O Fractal Explorer e o Generative Art são brilhantes.",
    avatar: "SR",
  },
  {
    name: "Carlos Ferreira",
    role: "Empreendedor — Quintas Estrelas",
    quote: "Ter uma presença digital profissional era impossível com o nosso orçamento. Graças ao Jaime, conseguimos competir com empresas muito maiores.",
    avatar: "CF",
  },
];


/* ─────────────────── HELPERS & HOOKS ─────────────────── */

function useCountUp(target: number | null, inView: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView || target === null) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return target === null ? "" : count;
}

function slugify(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.07 } },
};

/* ─────────────────── GLASS CARD ─────────────────── */

function Glass({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-2xl border border-[rgba(14,165,233,0.1)] bg-white/70 backdrop-blur-xl shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

/* ─────────────────── COMPONENT: CountStat ─────────────────── */

function CountStat({
  value,
  suffix,
  label,
  emoji,
  inView,
}: {
  value: number | null;
  suffix: string;
  label: string;
  emoji: string;
  inView: boolean;
}) {
  const display = useCountUp(value, inView);
  return (
    <motion.div variants={cardVariants}>
      <Glass className="p-6 text-center min-w-[160px] flex-1">
        <span className="text-3xl mb-2 block">{emoji}</span>
        <p className="text-3xl md:text-4xl font-bold text-[#0F172A] font-mono tracking-tight">
          {value === null ? suffix : `${display}${suffix}`}
        </p>
        <p className="text-sm text-[#64748B] mt-1">{label}</p>
      </Glass>
    </motion.div>
  );
}

/* ═══════════════════════════ PAGE ═══════════════════════════ */

export default function BrisaPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleProjects, setVisibleProjects] = useState(24);

  /* refs for intersection observer count-up */
  const impactRef = useRef<HTMLDivElement>(null);
  const impactInView = useInView(impactRef, { once: true, margin: "-100px" });

  /* lazy load more projects */
  const loaderRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleProjects((prev) => Math.min(prev + 24, allProjects.length));
        }
      },
      { rootMargin: "200px" }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, []);

  const filteredProjects =
    activeFilter === "all"
      ? allProjects
      : allProjects.filter((p) => p.cat === activeFilter);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  }, []);

  const navLinks = [
    { label: "Sobre", id: "sobre" },
    { label: "Projetos", id: "projetos" },
    { label: "Impacto", id: "impacto" },
    { label: "Apoiar", id: "apoiar" },
  ];

  /* ─────────────────────── RENDER ─────────────────────── */

  return (
    <>
      {/* Google Fonts */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap"
        rel="stylesheet"
      />

      <div
        className="min-h-screen w-full overflow-x-hidden"
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          background: "linear-gradient(135deg, #F0F9FF 0%, #ECFDF5 50%, #F0F9FF 100%)",
          color: "#0F172A",
        }}
      >
        {/* ═════════ NAVBAR ═════════ */}
        <nav
          className="fixed top-0 left-0 right-0 z-50 border-b border-[rgba(14,165,233,0.1)]"
          style={{
            background: "rgba(240,249,255,0.75)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-xl font-bold tracking-tight cursor-pointer"
              style={{ fontFamily: "'Sora', system-ui" }}
            >
              descomplica<span className="text-[#0EA5E9]">i</span>
            </button>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className="text-sm font-medium text-[#64748B] hover:text-[#0EA5E9] transition-colors cursor-pointer"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("apoiar")}
                className="px-5 py-2 rounded-full text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all cursor-pointer"
                style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)" }}
              >
                Apoiar o Projeto
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <div className="space-y-1.5">
                <span
                  className={`block w-6 h-0.5 bg-[#0F172A] transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
                />
                <span
                  className={`block w-6 h-0.5 bg-[#0F172A] transition-all ${mobileOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`block w-6 h-0.5 bg-[#0F172A] transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
                />
              </div>
            </button>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden border-t border-[rgba(14,165,233,0.1)]"
                style={{ background: "rgba(240,249,255,0.95)", backdropFilter: "blur(20px)" }}
              >
                <div className="p-4 flex flex-col gap-3">
                  {navLinks.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => scrollTo(l.id)}
                      className="text-left text-base font-medium text-[#0F172A] py-2 cursor-pointer"
                    >
                      {l.label}
                    </button>
                  ))}
                  <button
                    onClick={() => scrollTo("apoiar")}
                    className="mt-2 px-5 py-3 rounded-full text-sm font-semibold text-white cursor-pointer"
                    style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)" }}
                  >
                    Apoiar o Projeto
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* ═════════ HERO ═════════ */}
        <section className="relative min-h-screen flex items-center justify-center pt-16 px-4 overflow-hidden">
          {/* Decorative orbs */}
          <div
            className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-30 blur-3xl animate-pulse"
            style={{ background: "radial-gradient(circle, #0EA5E9 0%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{
              background: "radial-gradient(circle, #10B981 0%, transparent 70%)",
              animation: "pulse 4s ease-in-out infinite alternate",
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
            style={{ background: "radial-gradient(circle, #F59E0B 0%, transparent 70%)" }}
          />

          <div className="max-w-6xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1
                className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight mb-6"
                style={{ fontFamily: "'Sora', system-ui" }}
              >
                Olha o que estou
                <br />
                <span className="bg-gradient-to-r from-[#0EA5E9] to-[#10B981] bg-clip-text text-transparent">
                  a construir. Vem.
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl text-[#64748B] max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              110+ projetos gratuitos. Construídos em público. Isto é só o começo.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <button
                onClick={() => scrollTo("projetos")}
                className="px-8 py-4 rounded-full text-base font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
                style={{ background: "linear-gradient(135deg, #0EA5E9, #10B981)" }}
              >
                Explorar
              </button>
              <button
                onClick={() => scrollTo("apoiar")}
                className="px-8 py-4 rounded-full text-base font-semibold border-2 border-[#F59E0B] text-[#D97706] hover:bg-[#F59E0B] hover:text-white shadow-sm hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
              >
                Fazer parte
              </button>
            </motion.div>

            {/* Floating preview cards */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Glass className="p-5 max-w-xs text-left hover:scale-105 transition-transform">
                <span className="text-3xl">💎</span>
                <h3 className="font-bold mt-2 text-sm">Bijou Restaurante</h3>
                <p className="text-xs text-[#64748B] mt-1">
                  Website premium com reservas e menu interativo
                </p>
              </Glass>
              <Glass className="p-5 max-w-xs text-left hover:scale-105 transition-transform sm:mt-8">
                <span className="text-3xl">🌀</span>
                <h3 className="font-bold mt-2 text-sm">Fractal Explorer</h3>
                <p className="text-xs text-[#64748B] mt-1">
                  Explorador de fractais com zoom infinito
                </p>
              </Glass>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-[#0EA5E9]/30 flex items-start justify-center p-1.5">
              <div className="w-1.5 h-3 rounded-full bg-[#0EA5E9]/50" />
            </div>
          </motion.div>
        </section>

        {/* ═════════ A MINHA HISTÓRIA ═════════ */}
        <section id="sobre" className="py-20 sm:py-28 px-4">
          <motion.div
            className="max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <div className="grid md:grid-cols-[1fr_2fr] gap-10 items-center">
              {/* Avatar */}
              <div className="flex justify-center">
                <div
                  className="w-48 h-48 md:w-56 md:h-56 rounded-full flex items-center justify-center text-6xl shadow-xl"
                  style={{
                    background: "linear-gradient(135deg, #0EA5E9, #10B981)",
                  }}
                >
                  <span className="text-white text-5xl font-bold" style={{ fontFamily: "'Sora'" }}>
                    JS
                  </span>
                </div>
              </div>

              {/* Story */}
              <div>
                <h2
                  className="text-3xl sm:text-4xl font-bold mb-6"
                  style={{ fontFamily: "'Sora', system-ui" }}
                >
                  Quem é o{" "}
                  <span className="bg-gradient-to-r from-[#0EA5E9] to-[#10B981] bg-clip-text text-transparent">
                    Jaime
                  </span>
                  ?
                </h2>
                <div className="space-y-4 text-[#64748B] leading-relaxed">
                  <p>
                    Sou um developer que adora resolver problemas. Comecei a programar
                    porque queria criar coisas que ajudassem as pessoas, e nunca mais
                    parei. Em pouco tempo, construí mais de 110 projetos — websites
                    para restaurantes locais, plataformas para clínicas, jogos,
                    ferramentas educativas e experiências interativas.
                  </p>
                  <p>
                    Tudo gratuito. Tudo para a comunidade. Não quero estar preocupado
                    com profits.{" "}
                    <strong className="text-[#0F172A]">
                      Quero construir para o bem de todos e para a minha felicidade.
                    </strong>
                  </p>
                  <p>
                    O crowdfunding permite-me continuar a fazer o que amo sem
                    comprometer a acessibilidade dos projetos. Cada apoio significa
                    mais horas a criar, mais servidores ativos, mais ideias realizadas.
                  </p>
                </div>

                {/* Mini timeline */}
                <div className="mt-8 flex flex-wrap gap-4">
                  {[
                    { num: "110+", txt: "Projetos" },
                    { num: "26+", txt: "Negócios ajudados" },
                    { num: "0€", txt: "Cobrado" },
                    { num: "100%", txt: "Paixão" },
                  ].map((m) => (
                    <Glass key={m.txt} className="px-4 py-3 text-center">
                      <p className="text-xl font-bold text-[#0EA5E9] font-mono">{m.num}</p>
                      <p className="text-xs text-[#64748B]">{m.txt}</p>
                    </Glass>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ═════════ PROJETOS EM DESTAQUE (Bento Grid) ═════════ */}
        <section id="projetos" className="py-20 sm:py-28 px-4">
          <motion.div
            className="max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <div className="text-center mb-14">
              <h2
                className="text-3xl sm:text-4xl font-bold mb-3"
                style={{ fontFamily: "'Sora', system-ui" }}
              >
                Projetos em{" "}
                <span className="bg-gradient-to-r from-[#0EA5E9] to-[#10B981] bg-clip-text text-transparent">
                  destaque
                </span>
              </h2>
              <p className="text-[#64748B] max-w-xl mx-auto">
                Alguns dos projetos que mais gosto. Cada um foi feito com carinho e com
                o objetivo de resolver um problema real.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[180px]"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {featuredProjects.map((p) => {
                const span =
                  p.size === "large"
                    ? "sm:col-span-2 sm:row-span-2"
                    : p.size === "medium"
                      ? "sm:col-span-2 sm:row-span-1"
                      : "";
                return (
                  <motion.a
                    key={p.name}
                    href={`/projetos/${slugify(p.name)}`}
                    variants={cardVariants}
                    className={`group relative rounded-2xl border border-[rgba(14,165,233,0.1)] bg-gradient-to-br ${p.gradient} bg-opacity-50 backdrop-blur-xl p-6 flex flex-col justify-between overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all ${span}`}
                  >
                    <div>
                      <span className="text-4xl lg:text-5xl block mb-3">{p.emoji}</span>
                      <h3 className="font-bold text-lg text-[#0F172A]">{p.name}</h3>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/60 text-[#64748B]">
                        {categories.find((c) => c.id === p.cat)?.name}
                      </span>
                    </div>
                    <p className="text-sm text-[#64748B] mt-2 line-clamp-2">{p.desc}</p>
                    <span className="text-xs text-[#0EA5E9] font-semibold mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      Ver projeto →
                    </span>
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>
        </section>

        {/* ═════════ IMPACTO ═════════ */}
        <section id="impacto" className="py-20 sm:py-28 px-4" ref={impactRef}>
          <motion.div
            className="max-w-5xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold mb-3"
              style={{ fontFamily: "'Sora', system-ui" }}
            >
              O{" "}
              <span className="bg-gradient-to-r from-[#0EA5E9] to-[#10B981] bg-clip-text text-transparent">
                impacto
              </span>{" "}
              até agora
            </h2>
            <p className="text-[#64748B] max-w-xl mx-auto mb-12">
              Cada projeto é uma história. Cada número representa pessoas e negócios
              que ganharam uma presença digital.
            </p>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {impactStats.map((s) => (
                <CountStat key={s.label} {...s} inView={impactInView} />
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ═════════ CATEGORIAS ═════════ */}
        <section className="py-20 sm:py-28 px-4">
          <motion.div
            className="max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <div className="text-center mb-14">
              <h2
                className="text-3xl sm:text-4xl font-bold mb-3"
                style={{ fontFamily: "'Sora', system-ui" }}
              >
                Explora por{" "}
                <span className="bg-gradient-to-r from-[#0EA5E9] to-[#10B981] bg-clip-text text-transparent">
                  categoria
                </span>
              </h2>
              <p className="text-[#64748B]">10 categorias, infinitas possibilidades.</p>
            </div>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {categories
                .filter((c) => c.id !== "all")
                .map((c) => (
                  <motion.button
                    key={c.id}
                    variants={cardVariants}
                    onClick={() => {
                      setActiveFilter(c.id);
                      scrollTo("todos-projetos");
                    }}
                    className="cursor-pointer"
                  >
                    <Glass className="p-5 text-center hover:shadow-lg hover:scale-105 transition-all">
                      <span className="text-3xl block mb-2">{c.emoji}</span>
                      <p className="font-semibold text-sm text-[#0F172A]">{c.name}</p>
                      <p className="text-xs text-[#64748B] mt-1">{c.count} projetos</p>
                    </Glass>
                  </motion.button>
                ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ═════════ TODOS OS PROJETOS ═════════ */}
        <section id="todos-projetos" className="py-20 sm:py-28 px-4">
          <motion.div
            className="max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <div className="text-center mb-10">
              <h2
                className="text-3xl sm:text-4xl font-bold mb-3"
                style={{ fontFamily: "'Sora', system-ui" }}
              >
                Todos os{" "}
                <span className="bg-gradient-to-r from-[#0EA5E9] to-[#10B981] bg-clip-text text-transparent">
                  110+ projetos
                </span>
              </h2>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveFilter(c.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                    activeFilter === c.id
                      ? "bg-[#0EA5E9] text-white shadow-lg"
                      : "bg-white/60 text-[#64748B] hover:bg-white hover:text-[#0F172A] border border-[rgba(14,165,233,0.1)]"
                  }`}
                >
                  {c.emoji} {c.name}
                </button>
              ))}
            </div>

            {/* Project grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {filteredProjects.slice(0, visibleProjects).map((p) => {
                const catColor =
                  p.cat === "restaurants"
                    ? "#F59E0B"
                    : p.cat === "clinics"
                      ? "#10B981"
                      : p.cat === "tools"
                        ? "#0EA5E9"
                        : p.cat === "games"
                          ? "#8B5CF6"
                          : p.cat === "creative"
                            ? "#EC4899"
                            : p.cat === "music"
                              ? "#6366F1"
                              : p.cat === "education"
                                ? "#14B8A6"
                                : p.cat === "business"
                                  ? "#F97316"
                                  : "#0EA5E9";
                return (
                  <motion.a
                    key={p.name}
                    href={`/projetos/${slugify(p.name)}`}
                    variants={cardVariants}
                    className="group"
                  >
                    <Glass className="p-4 flex items-center gap-3 hover:shadow-md hover:scale-[1.02] transition-all">
                      <span className="text-2xl flex-shrink-0">{p.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-[#0F172A] truncate">
                          {p.name}
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ background: catColor }}
                          />
                          <span className="text-xs text-[#64748B]">
                            {categories.find((c) => c.id === p.cat)?.name}
                          </span>
                        </div>
                      </div>
                      <span className="text-[#0EA5E9] opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                        →
                      </span>
                    </Glass>
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Lazy load trigger */}
            {visibleProjects < filteredProjects.length && (
              <div ref={loaderRef} className="h-10" />
            )}
          </motion.div>
        </section>

        {/* ═════════ COMO APOIAR ═════════ */}
        <section id="apoiar" className="py-20 sm:py-28 px-4">
          <motion.div
            className="max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <div className="text-center mb-14">
              <span className="text-xs font-semibold tracking-[3px] uppercase text-[#F59E0B]">FAZER PARTE</span>
              <h2
                className="text-3xl sm:text-4xl font-bold mb-3 mt-4"
                style={{ fontFamily: "'Sora', system-ui" }}
              >
                Vem para a{" "}
                <span className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] bg-clip-text text-transparent">
                  viagem
                </span>
              </h2>
            </div>

            <motion.div
              className="grid md:grid-cols-3 gap-6"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Tier 1 — Estrela */}
              <motion.div variants={cardVariants}>
                <Glass className="p-8 text-center h-full flex flex-col hover:shadow-xl transition-shadow">
                  <span className="text-5xl mb-4">⭐</span>
                  <h3 className="text-xl font-bold mb-2">Estrela</h3>
                  <p className="text-2xl font-bold text-[#F59E0B] mb-3 font-mono">5€/mês</p>
                  <ul className="text-sm text-[#64748B] flex-1 text-left space-y-2">
                    <li>Nome no muro de apoiantes</li>
                    <li>Acesso ao diário de desenvolvimento</li>
                    <li>Badge exclusivo de apoiante</li>
                  </ul>
                  <button
                    className="mt-6 w-full px-6 py-3 rounded-full text-sm font-semibold border-2 border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B] hover:text-white transition-all cursor-pointer"
                  >
                    Juntar-me como Estrela
                  </button>
                </Glass>
              </motion.div>

              {/* Tier 2 — Sol */}
              <motion.div variants={cardVariants}>
                <Glass className="p-8 text-center h-full flex flex-col relative overflow-hidden hover:shadow-xl transition-shadow ring-2 ring-[#F59E0B]/30">
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#F59E0B] text-white text-[10px] font-bold">
                    POPULAR
                  </div>
                  <span className="text-5xl mb-4">☀️</span>
                  <h3 className="text-xl font-bold mb-2">Sol</h3>
                  <p className="text-2xl font-bold text-[#F59E0B] mb-3 font-mono">
                    15€/mês
                  </p>
                  <ul className="text-sm text-[#64748B] flex-1 text-left space-y-2">
                    <li>Tudo do Estrela, mais:</li>
                    <li>Acesso antecipado a novos projetos</li>
                    <li>Sugestao de projetos prioritarios</li>
                    <li>Canal exclusivo de comunicacao</li>
                  </ul>
                  <button
                    className="mt-6 w-full px-6 py-3 rounded-full text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
                    style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)" }}
                  >
                    Juntar-me como Sol
                  </button>
                </Glass>
              </motion.div>

              {/* Tier 3 — Horizonte */}
              <motion.div variants={cardVariants}>
                <Glass className="p-8 text-center h-full flex flex-col hover:shadow-xl transition-shadow">
                  <span className="text-5xl mb-4">🌅</span>
                  <h3 className="text-xl font-bold mb-2">Horizonte</h3>
                  <p className="text-2xl font-bold text-[#0EA5E9] mb-3 font-mono">
                    30€/mês
                  </p>
                  <ul className="text-sm text-[#64748B] flex-1 text-left space-y-2">
                    <li>Tudo do Sol, mais:</li>
                    <li>Sessao mensal 1:1 comigo</li>
                    <li>Credito especial nos projetos</li>
                    <li>Influencia direta no roadmap</li>
                  </ul>
                  <button
                    className="mt-6 w-full px-6 py-3 rounded-full text-sm font-semibold border-2 border-[#0EA5E9] text-[#0EA5E9] hover:bg-[#0EA5E9] hover:text-white transition-all cursor-pointer"
                  >
                    Juntar-me como Horizonte
                  </button>
                </Glass>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* ═════════ PULL QUOTE ═════════ */}
        <section className="py-20 sm:py-28 px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <blockquote>
              <p
                className="text-2xl sm:text-3xl md:text-4xl font-bold leading-relaxed italic text-[#0F172A]"
                style={{ fontFamily: "'Sora', system-ui" }}
              >
                &ldquo;A melhor coisa que construí hoje vai ajudar alguém que nunca vou conhecer.&rdquo;
              </p>
              <footer className="mt-8 text-[#64748B] text-sm font-medium">
                — Jaime Silva
              </footer>
            </blockquote>
          </motion.div>
        </section>

        {/* ═════════ VISION ═════════ */}
        <section className="py-16 px-4">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <p
              className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#0EA5E9] to-[#10B981] bg-clip-text text-transparent"
              style={{ fontFamily: "'Sora', system-ui" }}
            >
              Isto é só o começo.
            </p>
          </motion.div>
        </section>

        {/* ═════════ TESTEMUNHOS ═════════ */}
        <section className="py-20 sm:py-28 px-4">
          <motion.div
            className="max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <div className="text-center mb-14">
              <h2
                className="text-3xl sm:text-4xl font-bold mb-3"
                style={{ fontFamily: "'Sora', system-ui" }}
              >
                O que dizem os{" "}
                <span className="bg-gradient-to-r from-[#0EA5E9] to-[#10B981] bg-clip-text text-transparent">
                  utilizadores
                </span>
              </h2>
            </div>

            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {testimonials.map((t) => (
                <motion.div key={t.name} variants={cardVariants}>
                  <Glass className="p-6 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #0EA5E9, #10B981)" }}
                      >
                        {t.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-[#0F172A]">{t.name}</p>
                        <p className="text-xs text-[#64748B]">{t.role}</p>
                      </div>
                    </div>
                    <p className="text-sm text-[#64748B] leading-relaxed italic flex-1">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </Glass>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ═════════ CONTACTO ═════════ */}
        <section id="contacto" className="py-20 sm:py-28 px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <div className="text-center mb-14">
              <h2
                className="text-3xl sm:text-4xl font-bold mb-3"
                style={{ fontFamily: "'Sora', system-ui" }}
              >
                Vamos{" "}
                <span className="bg-gradient-to-r from-[#0EA5E9] to-[#10B981] bg-clip-text text-transparent">
                  conversar
                </span>
                ?
              </h2>
              <p className="text-[#64748B]">Respondo sempre em menos de 24h.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact links */}
              <div className="space-y-4">
                {[
                  { icon: "📧", label: "Email", value: "jaime@descomplicai.pt", href: "mailto:jaime@descomplicai.pt" },
                  { icon: "💬", label: "WhatsApp", value: "Enviar mensagem", href: "#" },
                  { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/jaime", href: "#" },
                ].map((c) => (
                  <a key={c.label} href={c.href}>
                    <Glass className="p-4 flex items-center gap-4 hover:shadow-md hover:scale-[1.02] transition-all">
                      <span className="text-2xl">{c.icon}</span>
                      <div>
                        <p className="text-xs text-[#64748B]">{c.label}</p>
                        <p className="font-semibold text-sm text-[#0F172A]">{c.value}</p>
                      </div>
                    </Glass>
                  </a>
                ))}
              </div>

              {/* Contact form (visual only) */}
              <Glass className="p-6">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="space-y-4"
                >
                  <div>
                    <label className="text-xs font-medium text-[#64748B] mb-1 block">
                      Nome
                    </label>
                    <input
                      type="text"
                      placeholder="O teu nome"
                      className="w-full px-4 py-3 rounded-xl bg-white/50 border border-[rgba(14,165,233,0.15)] text-sm outline-none focus:ring-2 focus:ring-[#0EA5E9]/30 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#64748B] mb-1 block">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="o-teu@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/50 border border-[rgba(14,165,233,0.15)] text-sm outline-none focus:ring-2 focus:ring-[#0EA5E9]/30 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#64748B] mb-1 block">
                      Mensagem
                    </label>
                    <textarea
                      rows={4}
                      placeholder="A tua mensagem..."
                      className="w-full px-4 py-3 rounded-xl bg-white/50 border border-[rgba(14,165,233,0.15)] text-sm outline-none focus:ring-2 focus:ring-[#0EA5E9]/30 transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 rounded-full text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer"
                    style={{ background: "linear-gradient(135deg, #0EA5E9, #10B981)" }}
                  >
                    Enviar mensagem
                  </button>
                </form>
              </Glass>
            </div>
          </motion.div>
        </section>

        {/* ═════════ FOOTER ═════════ */}
        <footer className="border-t border-[rgba(14,165,233,0.1)] py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-8 mb-10">
              {/* Brand */}
              <div>
                <p
                  className="text-xl font-bold mb-2"
                  style={{ fontFamily: "'Sora', system-ui" }}
                >
                  descomplica<span className="text-[#0EA5E9]">i</span>
                </p>
                <p className="text-sm text-[#64748B]">
                  Construir para todos. Simplificar o complexo. Tornar a tecnologia
                  acessível.
                </p>
              </div>

              {/* Nav */}
              <div>
                <p className="font-semibold text-sm mb-3 text-[#0F172A]">Navegação</p>
                <div className="space-y-2">
                  {navLinks.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => scrollTo(l.id)}
                      className="block text-sm text-[#64748B] hover:text-[#0EA5E9] transition-colors cursor-pointer"
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Social */}
              <div>
                <p className="font-semibold text-sm mb-3 text-[#0F172A]">Redes</p>
                <div className="flex gap-3">
                  {["GitHub", "LinkedIn", "Twitter"].map((s) => (
                    <a
                      key={s}
                      href="#"
                      className="px-3 py-1.5 rounded-full bg-white/50 border border-[rgba(14,165,233,0.1)] text-xs text-[#64748B] hover:text-[#0EA5E9] hover:bg-white transition-all"
                    >
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-[rgba(14,165,233,0.1)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-sm text-[#64748B]">
                Feito com ❤️ e muitas linhas de código
              </p>
              <p className="text-xs text-[#64748B]">
                &copy; 2026 Descomplicai. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Global animation keyframes */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.2; }
          100% { transform: scale(1.1); opacity: 0.3; }
        }
      `}</style>
    </>
  );
}
