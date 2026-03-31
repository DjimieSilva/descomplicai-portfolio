"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */

const PROJECTS = [
  { name: "Caçarola", emoji: "🍲", cat: "Restaurantes", desc: "Menu digital para restaurante tradicional" },
  { name: "Mesa dos Amigos", emoji: "🍽️", cat: "Restaurantes", desc: "Presença online para tasca portuguesa" },
  { name: "Sabor Abençoado", emoji: "🙏", cat: "Restaurantes", desc: "Site para restaurante de comida caseira" },
  { name: "Tasca da Praia", emoji: "🏖️", cat: "Restaurantes", desc: "Landing page para restaurante costeiro" },
  { name: "Tasca Dentro", emoji: "🍷", cat: "Restaurantes", desc: "Menu e reservas para tasca urbana" },
  { name: "Zeff Pizza", emoji: "🍕", cat: "Restaurantes", desc: "Pizzaria artesanal com pedidos online" },
  { name: "Marisqueira Rosa Amélia", emoji: "🦐", cat: "Restaurantes", desc: "Marisqueira com ementa e galeria" },
  { name: "Pé na Areia", emoji: "👣", cat: "Restaurantes", desc: "Restaurante de praia com vibe descontraída" },
  { name: "Café Praça 18", emoji: "☕", cat: "Restaurantes", desc: "Café e petiscos no centro da cidade" },
  { name: "Meio Cheio", emoji: "🥂", cat: "Restaurantes", desc: "Bar de vinhos com carta interativa" },
  { name: "Bijou", emoji: "💎", cat: "Restaurantes", desc: "Restaurante premium com reservas online" },
  { name: "O Picadeiro", emoji: "🎪", cat: "Restaurantes", desc: "Restaurante temático com experiência imersiva" },
  { name: "Ribeiro Santo", emoji: "🏔️", cat: "Vinho & Gastronomia", desc: "Adega e enoturismo no Douro" },
  { name: "Rota dos Vinhos", emoji: "🗺️", cat: "Vinho & Gastronomia", desc: "Guia interativo de rotas vinícolas" },
  { name: "Vindima Selvagem", emoji: "🍇", cat: "Vinho & Gastronomia", desc: "Experiência de vindima artesanal" },
  { name: "Vinho na Rua", emoji: "🍾", cat: "Vinho & Gastronomia", desc: "Festival de vinho com mapa de bancas" },
  { name: "Quintas Estrelas", emoji: "⭐", cat: "Vinho & Gastronomia", desc: "Diretório de quintas vitivinícolas" },
  { name: "Alba Saúde Dentária", emoji: "🦷", cat: "Saúde", desc: "Clínica dentária com marcações online" },
  { name: "Clínica Dentária Quiaios", emoji: "😁", cat: "Saúde", desc: "Clínica dentária familiar" },
  { name: "Clínica Tamargueira", emoji: "🏥", cat: "Saúde", desc: "Clínica multidisciplinar" },
  { name: "Clínica Vasco da Gama", emoji: "⚕️", cat: "Saúde", desc: "Centro médico com agendamento digital" },
  { name: "DentalKid", emoji: "👶", cat: "Saúde", desc: "Clínica dentária pediátrica" },
  { name: "Premium Clínica", emoji: "✨", cat: "Saúde", desc: "Clínica premium com telemedicina" },
  { name: "FozClínica", emoji: "🌊", cat: "Saúde", desc: "Clínica na Foz com vista mar" },
  { name: "UpConcept Clínica", emoji: "🔬", cat: "Saúde", desc: "Clínica de conceito moderno" },
  { name: "BFitFam", emoji: "💪", cat: "Saúde", desc: "Plataforma de fitness familiar" },
  { name: "Calculator", emoji: "🧮", cat: "Ferramentas", desc: "Calculadora científica no browser" },
  { name: "JSON Formatter", emoji: "📋", cat: "Ferramentas", desc: "Formatador e validador de JSON" },
  { name: "Regex Tester", emoji: "🔍", cat: "Ferramentas", desc: "Tester de expressões regulares" },
  { name: "Password Generator", emoji: "🔐", cat: "Ferramentas", desc: "Gerador de passwords seguras" },
  { name: "Unit Converter", emoji: "📏", cat: "Ferramentas", desc: "Conversor universal de unidades" },
  { name: "Markdown Editor", emoji: "📝", cat: "Ferramentas", desc: "Editor Markdown com pré-visualização" },
  { name: "Text Analyzer", emoji: "📊", cat: "Ferramentas", desc: "Análise de texto com métricas" },
  { name: "BMI Calculator", emoji: "⚖️", cat: "Ferramentas", desc: "Calculadora de índice de massa corporal" },
  { name: "Pomodoro", emoji: "🍅", cat: "Ferramentas", desc: "Timer Pomodoro com estatísticas" },
  { name: "Todo Kanban", emoji: "📌", cat: "Ferramentas", desc: "Quadro Kanban para gestão de tarefas" },
  { name: "World Clock", emoji: "🕐", cat: "Ferramentas", desc: "Relógio mundial com fusos horários" },
  { name: "Countdown", emoji: "⏳", cat: "Ferramentas", desc: "Countdown personalizável para eventos" },
  { name: "Habit Tracker", emoji: "✅", cat: "Ferramentas", desc: "Rastreador de hábitos diários" },
  { name: "Recipe Finder", emoji: "🍳", cat: "Ferramentas", desc: "Buscador de receitas por ingredientes" },
  { name: "Gradient Maker", emoji: "🌈", cat: "Criativo", desc: "Gerador de gradientes CSS" },
  { name: "Color Palette Generator", emoji: "🎨", cat: "Criativo", desc: "Gerador de paletas de cores harmónicas" },
  { name: "CSS Playground", emoji: "🎭", cat: "Criativo", desc: "Playground interativo de CSS" },
  { name: "CSS Art Gallery", emoji: "🖼️", cat: "Criativo", desc: "Galeria de arte feita com CSS puro" },
  { name: "Pixel Art", emoji: "👾", cat: "Criativo", desc: "Editor de pixel art no browser" },
  { name: "Drawing Canvas", emoji: "🖌️", cat: "Criativo", desc: "Canvas de desenho com ferramentas" },
  { name: "Photo Filters", emoji: "📸", cat: "Criativo", desc: "Filtros fotográficos em tempo real" },
  { name: "Generative Art", emoji: "🌀", cat: "Criativo", desc: "Arte generativa com algoritmos" },
  { name: "Music Visualizer", emoji: "🎵", cat: "Criativo", desc: "Visualizador de música com WebAudio" },
  { name: "Color Theory", emoji: "🔵", cat: "Criativo", desc: "Guia interativo de teoria das cores" },
  { name: "Design System", emoji: "🧩", cat: "Criativo", desc: "Kit de design system reutilizável" },
  { name: "Chess", emoji: "♟️", cat: "Jogos", desc: "Jogo de xadrez completo no browser" },
  { name: "Snake Game", emoji: "🐍", cat: "Jogos", desc: "Jogo da cobra clássico reimaginado" },
  { name: "Memory Game", emoji: "🧠", cat: "Jogos", desc: "Jogo de memória com níveis" },
  { name: "Maze Solver", emoji: "🏁", cat: "Jogos", desc: "Gerador e resolvedor de labirintos" },
  { name: "RPG Quest", emoji: "⚔️", cat: "Jogos", desc: "Aventura RPG baseada em texto" },
  { name: "RPG Chronicle", emoji: "📜", cat: "Jogos", desc: "Gestor de campanhas RPG" },
  { name: "Quiz Portugal", emoji: "🇵🇹", cat: "Jogos", desc: "Quiz sobre cultura portuguesa" },
  { name: "Decision Wheel", emoji: "🎡", cat: "Jogos", desc: "Roda de decisões aleatórias" },
  { name: "Typing Speed Test", emoji: "⌨️", cat: "Jogos", desc: "Teste de velocidade de digitação" },
  { name: "Flashcards", emoji: "🃏", cat: "Jogos", desc: "Sistema de flashcards espaçadas" },
  { name: "Solar System", emoji: "🪐", cat: "Interativo", desc: "Modelo interativo do sistema solar" },
  { name: "Globe Explorer", emoji: "🌍", cat: "Interativo", desc: "Explorador do globo terrestre 3D" },
  { name: "Periodic Table", emoji: "⚗️", cat: "Interativo", desc: "Tabela periódica interativa" },
  { name: "Fractal Explorer", emoji: "🔷", cat: "Interativo", desc: "Explorador de fractais com zoom infinito" },
  { name: "Particle Sim", emoji: "✨", cat: "Interativo", desc: "Simulação de partículas com física" },
  { name: "Sorting Visualizer", emoji: "📶", cat: "Interativo", desc: "Visualizador de algoritmos de ordenação" },
  { name: "Aurora Borealis", emoji: "🌌", cat: "Interativo", desc: "Simulação de aurora boreal" },
  { name: "Morse Code", emoji: "📡", cat: "Interativo", desc: "Tradutor de código Morse interativo" },
  { name: "Breathing Exercise", emoji: "🧘", cat: "Interativo", desc: "Exercícios de respiração guiados" },
  { name: "Weather Mood", emoji: "🌤️", cat: "Interativo", desc: "Mood board baseado no clima" },
  { name: "Mapa Portugal", emoji: "🗺️", cat: "Interativo", desc: "Mapa interativo de Portugal" },
  { name: "Synth", emoji: "🎹", cat: "Interativo", desc: "Sintetizador de som no browser" },
  { name: "Drum Machine", emoji: "🥁", cat: "Interativo", desc: "Máquina de ritmos interativa" },
  { name: "Music Box", emoji: "🎶", cat: "Interativo", desc: "Caixa de música programável" },
  { name: "Music Theory", emoji: "🎼", cat: "Interativo", desc: "Guia de teoria musical interativo" },
  { name: "Guitar Tuner", emoji: "🎸", cat: "Interativo", desc: "Afinador de guitarra com microfone" },
  { name: "Mood Journal", emoji: "📓", cat: "Interativo", desc: "Diário de humor com visualizações" },
  { name: "Color Blindness Sim", emoji: "👁️", cat: "Interativo", desc: "Simulador de daltonismo" },
  { name: "Emoji Mixer", emoji: "😎", cat: "Interativo", desc: "Misturador criativo de emojis" },
  { name: "Nalu Cabedelo", emoji: "🏄", cat: "Outros", desc: "Escola de surf no Cabedelo" },
  { name: "Ninika Tours", emoji: "🚐", cat: "Outros", desc: "Turismo de aventura em Portugal" },
  { name: "Ondas Academy", emoji: "🌊", cat: "Outros", desc: "Academia de desportos aquáticos" },
  { name: "Sand Murtinheira", emoji: "🏝️", cat: "Outros", desc: "Alojamento na praia da Murtinheira" },
  { name: "Quinta da Salmanha", emoji: "🏡", cat: "Outros", desc: "Turismo rural no interior" },
  { name: "Cataventos", emoji: "🪁", cat: "Outros", desc: "Loja de artesanato e brinquedos" },
  { name: "Futuro", emoji: "🚀", cat: "Outros", desc: "Plataforma de inovação" },
  { name: "Maregrafo", emoji: "🌡️", cat: "Outros", desc: "Monitor de marés em tempo real" },
  { name: "AI Chat Sim", emoji: "🤖", cat: "Ferramentas", desc: "Simulador de conversas com IA" },
  { name: "Portfolio Builder", emoji: "💼", cat: "Ferramentas", desc: "Gerador de portfólios profissionais" },
  { name: "Rabbit Hole", emoji: "🐇", cat: "Interativo", desc: "Explorador de curiosidades encadeadas" },
  { name: "Seeds", emoji: "🌱", cat: "Outros", desc: "Esta página — o jardim digital" },
];

const CATEGORIES = [
  { name: "Restaurantes", emoji: "🍽️", count: 12 },
  { name: "Saúde", emoji: "🏥", count: 9 },
  { name: "Ferramentas", emoji: "🛠️", count: 16 },
  { name: "Vinho & Gastronomia", emoji: "🍷", count: 5 },
  { name: "Criativo", emoji: "🎨", count: 11 },
  { name: "Jogos", emoji: "🎮", count: 10 },
  { name: "Interativo", emoji: "✨", count: 18 },
];


/* ─────────────────────────────────────────────
   ANIMATED SECTION WRAPPER
   ───────────────────────────────────────────── */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   COUNTER ANIMATION
   ───────────────────────────────────────────── */

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
   ───────────────────────────────────────────── */

export default function SementePage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filteredProjects =
    activeFilter === "Todos"
      ? PROJECTS
      : PROJECTS.filter((p) => p.cat === activeFilter);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
  };

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Inter', sans-serif; color: #1E293B; background: #F0FDF4; overflow-x: hidden; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }

        @keyframes sway {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes grow-up {
          from { transform: scaleY(0); opacity: 0; }
          to { transform: scaleY(1); opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulse-soft {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes bounce-down {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        @keyframes leaf-float {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-30px) rotate(15deg); opacity: 0; }
        }
      `}</style>

      <div style={{ background: "linear-gradient(180deg, #F0FDF4 0%, #FEFCE8 100%)", minHeight: "100vh" }}>

        {/* ═══════════════════════════════════════
            1. NAVBAR
           ═══════════════════════════════════════ */}
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
            backdropFilter: scrolled ? "blur(12px)" : "none",
            borderBottom: scrolled ? "1px solid rgba(5,150,105,0.12)" : "none",
            transition: "all 0.3s ease",
            padding: scrolled ? "12px 0" : "20px 0",
          }}
        >
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* Logo */}
            <button onClick={() => scrollTo("hero")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 24, height: 24, borderRadius: "50%", background: "linear-gradient(135deg, #4ADE80, #059669)", display: "inline-block", flexShrink: 0 }} />
              <span className="font-serif" style={{ fontSize: 22, fontWeight: 700, color: "#1E293B", letterSpacing: -0.5 }}>
                descomplicai
              </span>
            </button>

            {/* Desktop Links */}
            <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="nav-desktop">
              {[
                ["História", "historia"],
                ["Projetos", "jardim"],
                ["Impacto", "impacto"],
                ["Apoiar", "apoiar"],
              ].map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 15,
                    fontWeight: 500,
                    color: "#64748B",
                    transition: "color 0.2s",
                    fontFamily: "'Inter', sans-serif",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#059669")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#64748B")}
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("apoiar")}
                style={{
                  background: "#059669",
                  color: "white",
                  border: "none",
                  borderRadius: 999,
                  padding: "10px 24px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.2s, transform 0.2s",
                  fontFamily: "'Inter', sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#047857";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#059669";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Fazer parte
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8 }}
              className="nav-mobile-toggle"
            >
              <div style={{ width: 24, height: 2, background: "#1E293B", marginBottom: 6, transition: "all 0.3s", transform: mobileMenu ? "rotate(45deg) translateY(8px)" : "none" }} />
              <div style={{ width: 24, height: 2, background: "#1E293B", marginBottom: 6, opacity: mobileMenu ? 0 : 1, transition: "opacity 0.3s" }} />
              <div style={{ width: 24, height: 2, background: "#1E293B", transition: "all 0.3s", transform: mobileMenu ? "rotate(-45deg) translateY(-8px)" : "none" }} />
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenu && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={{ background: "white", borderTop: "1px solid rgba(5,150,105,0.12)", overflow: "hidden" }}
              >
                <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
                  {[["História", "historia"], ["Projetos", "jardim"], ["Impacto", "impacto"], ["Apoiar", "apoiar"]].map(([label, id]) => (
                    <button key={id} onClick={() => scrollTo(id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, fontWeight: 500, color: "#1E293B", textAlign: "left", fontFamily: "'Inter', sans-serif" }}>
                      {label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Responsive styles */}
        <style>{`
          @media (min-width: 769px) {
            .nav-mobile-toggle { display: none !important; }
          }
          @media (max-width: 768px) {
            .nav-desktop { display: none !important; }
            .nav-mobile-toggle { display: block !important; }
          }
        `}</style>

        {/* ═══════════════════════════════════════
            2. HERO
           ═══════════════════════════════════════ */}
        <section
          id="hero"
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "120px 24px 80px",
            position: "relative",
            textAlign: "center",
          }}
        >
          {/* CSS Plant Illustration */}
          <div style={{ position: "absolute", bottom: 80, right: "10%", opacity: 0.15, pointerEvents: "none" }}>
            <div style={{ width: 4, height: 180, background: "#059669", borderRadius: 2, margin: "0 auto", transformOrigin: "bottom", animation: "sway 4s ease-in-out infinite" }}>
              {/* Leaves */}
              <div style={{ position: "absolute", top: 30, left: -20, width: 40, height: 20, borderRadius: "50% 0", background: "#4ADE80", transform: "rotate(-30deg)" }} />
              <div style={{ position: "absolute", top: 70, right: -20, width: 40, height: 20, borderRadius: "0 50%", background: "#4ADE80", transform: "rotate(30deg)" }} />
              <div style={{ position: "absolute", top: 110, left: -16, width: 32, height: 16, borderRadius: "50% 0", background: "#4ADE80", transform: "rotate(-20deg)" }} />
            </div>
            {/* Earth */}
            <div style={{ width: 60, height: 30, borderRadius: "0 0 50% 50%", background: "#92400E", margin: "-2px auto 0", opacity: 0.5 }} />
          </div>

          {/* Floating seed shapes */}
          {[
            { top: "15%", left: "8%", size: 12, delay: 0 },
            { top: "25%", right: "12%", size: 8, delay: 1 },
            { top: "60%", left: "15%", size: 10, delay: 2 },
            { top: "70%", right: "20%", size: 6, delay: 0.5 },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: s.top,
                left: s.left,
                right: (s as any).right,
                width: s.size,
                height: s.size,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #4ADE80, #059669)",
                opacity: 0.3,
                animation: `float 3s ease-in-out ${s.delay}s infinite`,
                pointerEvents: "none",
              }}
            />
          ))}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ maxWidth: 900 }}
          >
            <span style={{ display: "inline-block", fontSize: 14, fontWeight: 600, color: "#059669", letterSpacing: 3, textTransform: "uppercase", marginBottom: 32, fontFamily: "'Inter', sans-serif" }}>
              descomplicai semente
            </span>

            <h1 className="font-serif" style={{ fontSize: "clamp(42px, 8vw, 96px)", fontWeight: 700, lineHeight: 1.05, color: "#1E293B", letterSpacing: -2, marginBottom: 32 }}>
              Olha o que estou
              <br />
              a{" "}
              <span style={{ color: "#059669", fontStyle: "italic" }}>plantar. Vem.</span>
            </h1>

            <p style={{ fontSize: "clamp(18px, 2.5vw, 24px)", lineHeight: 1.6, color: "#64748B", maxWidth: 600, margin: "0 auto 48px", fontWeight: 300 }}>
              110+ projetos gratuitos. Cada um uma semente.
              <br />
              Isto é só o começo.
            </p>

            <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={() => scrollTo("jardim")}
                style={{
                  background: "none",
                  border: "2px solid #059669",
                  borderRadius: 999,
                  padding: "14px 32px",
                  cursor: "pointer",
                  fontSize: 16,
                  color: "#059669",
                  fontWeight: 600,
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#059669";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "none";
                  e.currentTarget.style.color = "#059669";
                }}
              >
                Explorar
              </button>
              <button
                onClick={() => scrollTo("apoiar")}
                style={{
                  background: "#059669",
                  color: "white",
                  border: "none",
                  borderRadius: 999,
                  padding: "14px 32px",
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontFamily: "'Inter', sans-serif",
                  boxShadow: "0 4px 20px rgba(5,150,105,0.25)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#047857";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 24px rgba(5,150,105,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#059669";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(5,150,105,0.25)";
                }}
              >
                Fazer parte
              </button>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", animation: "bounce-down 2s ease-in-out infinite" }}>
            <div style={{ width: 24, height: 40, borderRadius: 12, border: "2px solid rgba(5,150,105,0.3)", display: "flex", justifyContent: "center", paddingTop: 8 }}>
              <div style={{ width: 4, height: 8, borderRadius: 2, background: "#059669", animation: "pulse-soft 2s ease-in-out infinite" }} />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            3. A HISTÓRIA
           ═══════════════════════════════════════ */}
        <section id="historia" style={{ maxWidth: 800, margin: "0 auto", padding: "120px 24px" }}>
          <Reveal>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#059669", letterSpacing: 3, textTransform: "uppercase" }}>A História</span>
          </Reveal>

          {/* Chapter 1 */}
          <Reveal delay={0.1}>
            <div style={{ marginTop: 80 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#D97706", letterSpacing: 2, textTransform: "uppercase" }}>Capítulo I</span>
              <h2 className="font-serif" style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 700, lineHeight: 1.15, color: "#1E293B", marginTop: 16, marginBottom: 32, letterSpacing: -1 }}>
                Começou com uma pergunta
              </h2>
              <blockquote style={{ borderLeft: "3px solid #059669", paddingLeft: 32, margin: "40px 0" }}>
                <p className="font-serif" style={{ fontSize: "clamp(22px, 3.5vw, 32px)", fontStyle: "italic", lineHeight: 1.5, color: "#1E293B", fontWeight: 400 }}>
                  &ldquo;E se pudesse construir coisas úteis para todos, sem pensar em dinheiro?&rdquo;
                </p>
              </blockquote>
              <p style={{ fontSize: 17, lineHeight: 1.8, color: "#64748B", maxWidth: 600 }}>
                Era uma ideia simples. Talvez ingénua. Mas era genuína. O Jaime sempre quis construir
                — não para vender, mas para resolver. Cada problema encontrado era um convite. Cada
                solução, um presente para quem precisasse.
              </p>
            </div>
          </Reveal>

          {/* Chapter 2 */}
          <Reveal delay={0.1}>
            <div style={{ marginTop: 120 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#D97706", letterSpacing: 2, textTransform: "uppercase" }}>Capítulo II</span>
              <h2 className="font-serif" style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 700, lineHeight: 1.15, color: "#1E293B", marginTop: 16, marginBottom: 32, letterSpacing: -1 }}>
                110 sementes plantadas
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.8, color: "#64748B", maxWidth: 600, marginBottom: 48 }}>
                Cada projeto nasceu de um problema real. Cada solução é gratuita. De restaurantes
                que precisavam de presença online a ferramentas que todos podiam usar — o jardim
                cresceu, semente a semente.
              </p>

              {/* Scattered seed emojis */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 48 }}>
                {PROJECTS.slice(0, 40).map((p, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.02, duration: 0.3 }}
                    style={{ fontSize: 20, cursor: "default" }}
                    title={p.name}
                  >
                    {p.emoji}
                  </motion.span>
                ))}
              </div>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, textAlign: "center" }}>
                {[
                  { n: "110+", label: "projetos" },
                  { n: "10", label: "categorias" },
                  { n: "0€", label: "cobrado" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-serif" style={{ fontSize: 36, fontWeight: 700, color: "#059669" }}>{s.n}</div>
                    <div style={{ fontSize: 14, color: "#64748B", marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Chapter 3 */}
          <Reveal delay={0.1}>
            <div style={{ marginTop: 120 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#D97706", letterSpacing: 2, textTransform: "uppercase" }}>Capítulo III</span>
              <h2 className="font-serif" style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 700, lineHeight: 1.15, color: "#1E293B", marginTop: 16, marginBottom: 32, letterSpacing: -1 }}>
                O jardim cresceu
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.8, color: "#64748B", maxWidth: 600, marginBottom: 48 }}>
                Restaurantes encontraram clientes. Clínicas ganharam presença. Estudantes aprenderam.
                Cada semente plantada deu frutos — às vezes inesperados, sempre gratificantes.
              </p>

              {/* Testimonials */}
              <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                {[
                  { quote: "O nosso restaurante duplicou as reservas desde que temos o site. E não pagámos nada.", author: "— Dona Rosa, Marisqueira Rosa Amélia" },
                  { quote: "Os pacientes encontram-nos no Google agora. Antes, era só passa-a-palavra.", author: "— Dr. Martins, Clínica Quiaios" },
                  { quote: "Usei o gerador de paletas de cores no meu projeto de faculdade. Nota 19.", author: "— Ana, estudante de Design" },
                ].map((t, i) => (
                  <div key={i} style={{ background: "white", borderRadius: 16, padding: "32px 36px", borderLeft: "3px solid #0D9488", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
                    <p className="font-serif" style={{ fontSize: 18, fontStyle: "italic", lineHeight: 1.6, color: "#1E293B", marginBottom: 12 }}>
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <p style={{ fontSize: 14, color: "#64748B" }}>{t.author}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Chapter 4 */}
          <Reveal delay={0.1}>
            <div style={{ marginTop: 120 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#D97706", letterSpacing: 2, textTransform: "uppercase" }}>Capítulo IV</span>
              <h2 className="font-serif" style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 700, lineHeight: 1.15, color: "#1E293B", marginTop: 16, marginBottom: 32, letterSpacing: -1 }}>
                Mas precisa de cuidado
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.8, color: "#64748B", maxWidth: 600 }}>
                Servidores custam dinheiro. Domínios precisam de renovação. O tempo investido
                é real. Para continuar a plantar, para que este jardim continue a crescer e a
                dar frutos para todos — preciso da vossa ajuda.
              </p>
              <blockquote style={{ borderLeft: "3px solid #D97706", paddingLeft: 32, margin: "40px 0" }}>
                <p className="font-serif" style={{ fontSize: "clamp(20px, 3vw, 28px)", fontStyle: "italic", lineHeight: 1.5, color: "#1E293B", fontWeight: 400 }}>
                  &ldquo;Um jardim não cresce sozinho. Precisa de quem regue.&rdquo;
                </p>
              </blockquote>
            </div>
          </Reveal>
        </section>

        {/* ═══════════════════════════════════════
            4. PROJETOS — O JARDIM
           ═══════════════════════════════════════ */}
        <section id="jardim" style={{ padding: "120px 24px", maxWidth: 1280, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#059669", letterSpacing: 3, textTransform: "uppercase" }}>Projetos</span>
              <h2 className="font-serif" style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 700, lineHeight: 1.1, color: "#1E293B", marginTop: 16, letterSpacing: -2 }}>
                O Jardim
              </h2>
              <div style={{ width: 80, height: 3, background: "linear-gradient(90deg, #059669, #0D9488)", margin: "24px auto 0", borderRadius: 2 }} />
            </div>
          </Reveal>

          {/* Garden Grid — Featured Projects */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 20,
          }}>
            {PROJECTS.slice(0, 20).map((p, i) => (
              <Reveal key={p.name} delay={i * 0.03}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 8px 32px rgba(5,150,105,0.12)" }}
                  style={{
                    background: "white",
                    borderRadius: 16,
                    padding: "28px 24px",
                    borderLeft: "3px solid rgba(5,150,105,0.2)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                    cursor: "pointer",
                    transition: "border-color 0.3s",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderLeftColor = "#059669")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderLeftColor = "rgba(5,150,105,0.2)")}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                    <span style={{ fontSize: 28 }}>{p.emoji}</span>
                    <div>
                      <h3 className="font-serif" style={{ fontSize: 18, fontWeight: 600, color: "#1E293B", marginBottom: 4 }}>{p.name}</h3>
                      <span style={{ fontSize: 12, fontWeight: 500, color: "#059669", background: "rgba(5,150,105,0.08)", padding: "2px 10px", borderRadius: 999 }}>
                        {p.cat}
                      </span>
                    </div>
                  </div>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: "#64748B" }}>{p.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div style={{ textAlign: "center", marginTop: 48 }}>
              <button
                onClick={() => scrollTo("todos-projetos")}
                style={{
                  background: "none",
                  border: "2px solid #059669",
                  borderRadius: 999,
                  padding: "12px 32px",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#059669",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontFamily: "'Inter', sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#059669";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "none";
                  e.currentTarget.style.color = "#059669";
                }}
              >
                Ver todos os 110+ projetos →
              </button>
            </div>
          </Reveal>
        </section>

        {/* ═══════════════════════════════════════
            5. CATEGORIAS — RAMOS DO JARDIM
           ═══════════════════════════════════════ */}
        <section style={{ padding: "80px 24px 120px", maxWidth: 900, margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: 64 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#059669", letterSpacing: 3, textTransform: "uppercase" }}>Categorias</span>
              <h2 className="font-serif" style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, lineHeight: 1.1, color: "#1E293B", marginTop: 16, letterSpacing: -1.5 }}>
                Ramos do jardim
              </h2>
            </div>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {CATEGORIES.map((cat, i) => (
              <Reveal key={cat.name} delay={i * 0.05}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  padding: "20px 24px",
                  background: "white",
                  borderRadius: 16,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
                  flexWrap: "wrap",
                }}>
                  <span style={{ fontSize: 32 }}>{cat.emoji}</span>
                  <div style={{ flex: 1, minWidth: 150 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 600, color: "#1E293B" }}>{cat.name}</h3>
                    <p style={{ fontSize: 13, color: "#64748B" }}>{cat.count} projetos</p>
                  </div>
                  {/* Mini project squares */}
                  <div style={{ display: "flex", gap: 8 }}>
                    {PROJECTS.filter((p) => p.cat === cat.name)
                      .slice(0, 4)
                      .map((p, j) => (
                        <div
                          key={j}
                          title={p.name}
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 10,
                            background: `linear-gradient(135deg, ${j % 2 === 0 ? "#D1FAE5, #A7F3D0" : "#CCFBF1, #99F6E4"})`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 18,
                          }}
                        >
                          {p.emoji}
                        </div>
                      ))}
                  </div>
                  <button
                    onClick={() => {
                      setActiveFilter(cat.name);
                      scrollTo("todos-projetos");
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#059669",
                      fontFamily: "'Inter', sans-serif",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Ver todos →
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════
            6. TODOS OS PROJETOS
           ═══════════════════════════════════════ */}
        <section id="todos-projetos" style={{ padding: "120px 24px", maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: 48 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#059669", letterSpacing: 3, textTransform: "uppercase" }}>Catálogo Completo</span>
              <h2 className="font-serif" style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, lineHeight: 1.1, color: "#1E293B", marginTop: 16, letterSpacing: -1.5 }}>
                Cada semente conta
              </h2>
            </div>
          </Reveal>

          {/* Filters */}
          <Reveal>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
              {["Todos", ...CATEGORIES.map((c) => c.name)].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  style={{
                    background: activeFilter === cat ? "#059669" : "white",
                    color: activeFilter === cat ? "white" : "#64748B",
                    border: `1px solid ${activeFilter === cat ? "#059669" : "rgba(5,150,105,0.2)"}`,
                    borderRadius: 999,
                    padding: "8px 20px",
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Project List */}
          <div style={{ border: "1px solid rgba(5,150,105,0.12)", borderRadius: 16, overflow: "hidden" }}>
            {filteredProjects.map((p, i) => (
              <motion.div
                key={p.name}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "48px 2fr 1fr",
                  gap: 16,
                  alignItems: "center",
                  padding: "14px 24px",
                  background: i % 2 === 0 ? "white" : "rgba(240,253,244,0.5)",
                  borderBottom: i < filteredProjects.length - 1 ? "1px solid rgba(5,150,105,0.08)" : "none",
                  fontSize: 14,
                }}
              >
                <span style={{ color: "#CBD5E1", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                  {String(i + 1).padStart(3, "0")}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 18 }}>{p.emoji}</span>
                  <span style={{ fontWeight: 500, color: "#1E293B" }}>{p.name}</span>
                </div>
                <span style={{ fontSize: 12, color: "#059669", fontWeight: 500 }}>{p.cat}</span>
              </motion.div>
            ))}
          </div>

          <style>{`
            @media (max-width: 640px) {
              #todos-projetos [style*="grid-template-columns: 48px 2fr 1fr"] {
                grid-template-columns: 32px 1fr !important;
              }
              #todos-projetos [style*="grid-template-columns: 48px 2fr 1fr"] > :last-child {
                display: none;
              }
            }
          `}</style>
        </section>

        {/* ═══════════════════════════════════════
            7. IMPACTO
           ═══════════════════════════════════════ */}
        <section id="impacto" style={{ padding: "120px 24px", background: "linear-gradient(180deg, rgba(240,253,244,0) 0%, rgba(240,253,244,0.8) 50%, rgba(240,253,244,0) 100%)" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
            <Reveal>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#059669", letterSpacing: 3, textTransform: "uppercase" }}>Impacto</span>
              <h2 className="font-serif" style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, lineHeight: 1.1, color: "#1E293B", marginTop: 16, letterSpacing: -1.5, marginBottom: 80 }}>
                O que estas sementes produziram
              </h2>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "64px 40px" }}>
              {[
                { value: 17, suffix: "", label: "restaurantes com presença digital" },
                { value: 9, suffix: "", label: "clínicas acessíveis online" },
                { value: 40, suffix: "+", label: "ferramentas gratuitas para todos" },
                { value: 0, suffix: "€", label: "cobrado por qualquer projeto" },
              ].map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.1}>
                  <div>
                    <div className="font-serif" style={{ fontSize: "clamp(48px, 8vw, 80px)", fontWeight: 700, color: "#059669", lineHeight: 1 }}>
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <p style={{ fontSize: 16, color: "#64748B", marginTop: 12, lineHeight: 1.5 }}>{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <style>{`
            @media (max-width: 480px) {
              #impacto + div, section:has(> div > [style*="grid-template-columns: repeat(2"]) {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
        </section>

        {/* ═══════════════════════════════════════
            8. COMO APOIAR — REGA O JARDIM
           ═══════════════════════════════════════ */}
        <section id="apoiar" style={{ padding: "120px 24px", maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#D97706", letterSpacing: 3, textTransform: "uppercase" }}>FAZER PARTE</span>
              <h2 className="font-serif" style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 700, lineHeight: 1.1, color: "#1E293B", marginTop: 16, letterSpacing: -2 }}>
                Vem para a viagem
              </h2>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {/* Tier 1 — Estrela */}
            <Reveal delay={0}>
              <div style={{
                background: "white",
                borderRadius: 20,
                padding: "36px 28px",
                border: "1px solid rgba(5,150,105,0.12)",
                boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>⭐</div>
                <h3 className="font-serif" style={{ fontSize: 24, fontWeight: 700, color: "#1E293B", marginBottom: 4 }}>
                  Estrela
                </h3>
                <p style={{ fontSize: 14, color: "#D97706", fontWeight: 600, marginBottom: 20 }}>5€/mês</p>
                <ul style={{ listStyle: "none", padding: 0, flex: 1 }}>
                  {[
                    "Nome no muro de apoiantes",
                    "Acesso ao diário de desenvolvimento",
                    "Badge exclusivo de apoiante",
                  ].map((item) => (
                    <li key={item} style={{ fontSize: 15, color: "#64748B", lineHeight: 1.6, marginBottom: 12, paddingLeft: 24, position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: "#D97706" }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <button style={{
                  width: "100%",
                  marginTop: 24,
                  background: "rgba(217,119,6,0.08)",
                  color: "#D97706",
                  border: "none",
                  borderRadius: 12,
                  padding: "14px",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.2s",
                  fontFamily: "'Inter', sans-serif",
                }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(217,119,6,0.15)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(217,119,6,0.08)")}
                >
                  Juntar-me como Estrela
                </button>
              </div>
            </Reveal>

            {/* Tier 2 — Sol */}
            <Reveal delay={0.1}>
              <div style={{
                background: "white",
                borderRadius: 20,
                padding: "36px 28px",
                border: "2px solid #D97706",
                boxShadow: "0 4px 24px rgba(217,119,6,0.15)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}>
                <div style={{
                  position: "absolute",
                  top: -12,
                  right: 20,
                  background: "#D97706",
                  color: "white",
                  fontSize: 12,
                  fontWeight: 600,
                  padding: "4px 14px",
                  borderRadius: 999,
                }}>
                  Popular
                </div>
                <div style={{ fontSize: 40, marginBottom: 16 }}>☀️</div>
                <h3 className="font-serif" style={{ fontSize: 24, fontWeight: 700, color: "#1E293B", marginBottom: 4 }}>
                  Sol
                </h3>
                <p style={{ fontSize: 14, color: "#D97706", fontWeight: 600, marginBottom: 20 }}>15€/mês</p>
                <ul style={{ listStyle: "none", padding: 0, flex: 1 }}>
                  {[
                    "Tudo do Estrela, mais:",
                    "Acesso antecipado a novos projetos",
                    "Sugestao de projetos prioritarios",
                    "Canal exclusivo de comunicacao",
                  ].map((item) => (
                    <li key={item} style={{ fontSize: 15, color: "#64748B", lineHeight: 1.6, marginBottom: 12, paddingLeft: 24, position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: "#D97706" }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <button style={{
                  width: "100%",
                  marginTop: 24,
                  background: "#D97706",
                  color: "white",
                  border: "none",
                  borderRadius: 12,
                  padding: "14px",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontFamily: "'Inter', sans-serif",
                  boxShadow: "0 4px 16px rgba(217,119,6,0.25)",
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#B45309";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#D97706";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Juntar-me como Sol
                </button>
              </div>
            </Reveal>

            {/* Tier 3 — Horizonte */}
            <Reveal delay={0.2}>
              <div style={{
                background: "linear-gradient(135deg, white, #FEFCE8)",
                borderRadius: 20,
                padding: "36px 28px",
                border: "1px solid rgba(5,150,105,0.2)",
                boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>🌅</div>
                <h3 className="font-serif" style={{ fontSize: 24, fontWeight: 700, color: "#1E293B", marginBottom: 4 }}>
                  Horizonte
                </h3>
                <p style={{ fontSize: 14, color: "#059669", fontWeight: 600, marginBottom: 20 }}>30€/mês</p>
                <ul style={{ listStyle: "none", padding: 0, flex: 1 }}>
                  {[
                    "Tudo do Sol, mais:",
                    "Sessao mensal 1:1 comigo",
                    "Credito especial nos projetos",
                    "Influencia direta no roadmap",
                  ].map((item) => (
                    <li key={item} style={{ fontSize: 15, color: "#64748B", lineHeight: 1.6, marginBottom: 12, paddingLeft: 24, position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: "#059669" }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <button style={{
                  width: "100%",
                  marginTop: 24,
                  background: "#059669",
                  color: "white",
                  border: "none",
                  borderRadius: 12,
                  padding: "14px",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontFamily: "'Inter', sans-serif",
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#047857";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#059669";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Juntar-me como Horizonte
                </button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            9. PULL QUOTE
           ═══════════════════════════════════════ */}
        <section style={{ padding: "120px 24px", background: "rgba(240,253,244,0.6)" }}>
          <Reveal>
            <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
              <blockquote>
                <p className="font-serif" style={{
                  fontSize: "clamp(24px, 4vw, 40px)",
                  fontStyle: "italic",
                  lineHeight: 1.5,
                  color: "#1E293B",
                  fontWeight: 400,
                  marginBottom: 32,
                }}>
                  &ldquo;A melhor coisa que construí hoje vai ajudar alguém que nunca vou conhecer.&rdquo;
                </p>
                <footer style={{ fontSize: 14, color: "#64748B", fontWeight: 500 }}>
                  — Jaime Silva
                </footer>
              </blockquote>
            </div>
          </Reveal>
        </section>

        {/* ═══════════════════════════════════════
            10. VISION
           ═══════════════════════════════════════ */}
        <section style={{ padding: "80px 24px" }}>
          <Reveal>
            <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
              <h2 className="font-serif" style={{
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 700,
                lineHeight: 1.1,
                color: "#059669",
                letterSpacing: -1.5,
              }}>
                Isto é só o começo.
              </h2>
            </div>
          </Reveal>
        </section>

        {/* ═══════════════════════════════════════
            11. CONTACTO
           ═══════════════════════════════════════ */}
        <section id="contacto" style={{ padding: "120px 24px", maxWidth: 800, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#059669", letterSpacing: 3, textTransform: "uppercase" }}>Contacto</span>
              <h2 className="font-serif" style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, lineHeight: 1.1, color: "#1E293B", marginTop: 16, letterSpacing: -1.5 }}>
                Uma conversa começa com uma semente
              </h2>
              <p style={{ fontSize: 16, color: "#64748B", marginTop: 16 }}>
                Cada mensagem é lida. Cada ideia é considerada.
              </p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
            {/* Contact Links */}
            <Reveal>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { icon: "✉️", label: "Email", value: "jaime@descomplicai.pt", href: "mailto:jaime@descomplicai.pt" },
                  { icon: "💬", label: "WhatsApp", value: "Enviar mensagem", href: "#" },
                  { icon: "🔗", label: "LinkedIn", value: "Jaime Silva", href: "#" },
                  { icon: "🐙", label: "GitHub", value: "github.com/jaime", href: "#" },
                ].map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      padding: "16px 20px",
                      background: "white",
                      borderRadius: 14,
                      border: "1px solid rgba(5,150,105,0.1)",
                      textDecoration: "none",
                      color: "#1E293B",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#059669";
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(5,150,105,0.1)";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <span style={{ fontSize: 24 }}>{c.icon}</span>
                    <div>
                      <div style={{ fontSize: 13, color: "#64748B" }}>{c.label}</div>
                      <div style={{ fontSize: 15, fontWeight: 500 }}>{c.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </Reveal>

            {/* Contact Form */}
            <Reveal delay={0.1}>
              <form
                onSubmit={(e) => e.preventDefault()}
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <input
                  type="text"
                  placeholder="O teu nome"
                  style={{
                    width: "100%",
                    padding: "14px 18px",
                    borderRadius: 12,
                    border: "1px solid rgba(5,150,105,0.15)",
                    background: "white",
                    fontSize: 15,
                    color: "#1E293B",
                    outline: "none",
                    fontFamily: "'Inter', sans-serif",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#059669")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(5,150,105,0.15)")}
                />
                <input
                  type="email"
                  placeholder="O teu email"
                  style={{
                    width: "100%",
                    padding: "14px 18px",
                    borderRadius: 12,
                    border: "1px solid rgba(5,150,105,0.15)",
                    background: "white",
                    fontSize: 15,
                    color: "#1E293B",
                    outline: "none",
                    fontFamily: "'Inter', sans-serif",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#059669")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(5,150,105,0.15)")}
                />
                <textarea
                  placeholder="A tua mensagem ou ideia..."
                  rows={5}
                  style={{
                    width: "100%",
                    padding: "14px 18px",
                    borderRadius: 12,
                    border: "1px solid rgba(5,150,105,0.15)",
                    background: "white",
                    fontSize: 15,
                    color: "#1E293B",
                    outline: "none",
                    fontFamily: "'Inter', sans-serif",
                    resize: "vertical",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#059669")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(5,150,105,0.15)")}
                />
                <button
                  type="submit"
                  style={{
                    background: "#059669",
                    color: "white",
                    border: "none",
                    borderRadius: 12,
                    padding: "14px",
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    fontFamily: "'Inter', sans-serif",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#047857")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#059669")}
                >
                  Enviar mensagem 🌱
                </button>
              </form>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            12. FOOTER
           ═══════════════════════════════════════ */}
        <footer style={{
          padding: "60px 24px 40px",
          borderTop: "1px solid rgba(5,150,105,0.1)",
          background: "rgba(255,255,255,0.5)",
        }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 32,
              marginBottom: 40,
            }}>
              {/* Logo + tagline */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <span style={{ width: 20, height: 20, borderRadius: "50%", background: "linear-gradient(135deg, #4ADE80, #059669)", display: "inline-block" }} />
                  <span className="font-serif" style={{ fontSize: 20, fontWeight: 700, color: "#1E293B" }}>descomplicai</span>
                </div>
                <p style={{ fontSize: 14, color: "#64748B", maxWidth: 300, lineHeight: 1.6 }}>
                  Feito com cuidado, como tudo o que construo.
                </p>
              </div>

              {/* Nav links */}
              <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                {[
                  ["História", "historia"],
                  ["O Jardim", "jardim"],
                  ["Impacto", "impacto"],
                  ["Apoiar", "apoiar"],
                  ["Contacto", "contacto"],
                ].map(([label, id]) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 14,
                      color: "#64748B",
                      fontFamily: "'Inter', sans-serif",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#059669")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#64748B")}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom bar */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 24,
              borderTop: "1px solid rgba(5,150,105,0.08)",
              flexWrap: "wrap",
              gap: 16,
            }}>
              <p style={{ fontSize: 13, color: "#94A3B8" }}>
                &copy; 2026 descomplicai. Todos os projetos, para todos.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 13, color: "#94A3B8" }}>Plantado com</span>
                <span style={{ animation: "float 3s ease-in-out infinite", display: "inline-block" }}>🌱</span>
                <span style={{ fontSize: 13, color: "#94A3B8" }}>em Portugal</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
