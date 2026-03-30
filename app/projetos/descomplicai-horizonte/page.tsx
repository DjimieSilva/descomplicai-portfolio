"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring, type MotionValue } from "framer-motion";

/* ─────────────────────────── DATA ─────────────────────────── */

const CATEGORIES = [
  { emoji: "🍽️", name: "Restaurantes", count: 17, projects: ["Bijou", "Caçarola", "Tasca da Praia", "Marisqueira Rosa Amélia"] },
  { emoji: "🏥", name: "Saúde", count: 9, projects: ["Clínica Tamargueira", "DentalKid", "Premium Clínica", "FozClínica"] },
  { emoji: "🛠️", name: "Ferramentas", count: 29, projects: ["JSON Formatter", "Regex Tester", "Password Generator", "Calculator"] },
  { emoji: "🍷", name: "Vinho & Gastronomia", count: 7, projects: ["Rota dos Vinhos", "Vindima Selvagem", "Vinho na Rua", "Meio Cheio"] },
  { emoji: "🎨", name: "Criativo", count: 6, projects: ["Generative Art", "CSS Art Gallery", "Pixel Art", "Drawing Canvas"] },
  { emoji: "💪", name: "Fitness", count: 1, projects: ["BFitFam"] },
  { emoji: "🎮", name: "Jogos", count: 5, projects: ["Chess", "Snake Game", "Memory Game", "RPG Chronicle"] },
  { emoji: "✨", name: "Interativo", count: 30, projects: ["Fractal Explorer", "Solar System", "Aurora Borealis", "Particle Sim"] },
  { emoji: "🚀", name: "Plataformas", count: 3, projects: ["Design System", "Portfolio Builder", "Synth"] },
];

const FEATURED_PROJECTS = [
  { name: "Bijou Restaurante", emoji: "🍷", category: "Restaurantes", type: "Website", description: "Website de fine dining com estética minimalista e elegante. Cada detalhe pensado para transmitir a experiência gastronómica.", gradient: "linear-gradient(135deg, #c084fc 0%, #818cf8 100%)" },
  { name: "Chess", emoji: "♟️", category: "Jogos", type: "Aplicação", description: "Implementação completa de xadrez com IA adversária, validação de movimentos e interface intuitiva.", gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" },
  { name: "Fractal Explorer", emoji: "🌀", category: "Interativo", type: "Experiência", description: "Explorador de fractais Mandelbrot e Julia com zoom infinito, paletas dinâmicas e renderização em tempo real.", gradient: "linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)" },
  { name: "Solar System", emoji: "🪐", category: "Interativo", type: "Experiência", description: "Explorador interativo do sistema solar com órbitas precisas, informações detalhadas e escala realista.", gradient: "linear-gradient(135deg, #1e1b4b 0%, #6366f1 100%)" },
  { name: "Generative Art", emoji: "🎨", category: "Criativo", type: "Ferramenta", description: "8 algoritmos generativos diferentes — de flow fields a partículas — cada um cria arte única e irrepetível.", gradient: "linear-gradient(135deg, #f472b6 0%, #c084fc 100%)" },
  { name: "BFitFam", emoji: "💪", category: "Fitness", type: "Plataforma", description: "Plataforma completa de fitness com treinos personalizados, tracking de progresso e comunidade.", gradient: "linear-gradient(135deg, #f97316 0%, #ef4444 100%)" },
  { name: "Periodic Table", emoji: "⚛️", category: "Interativo", type: "Educação", description: "Tabela periódica interativa com 118 elementos, propriedades detalhadas e visualizações atómicas.", gradient: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)" },
  { name: "RPG Chronicle", emoji: "⚔️", category: "Jogos", type: "Experiência", description: "Aventura RPG épica com 8 capítulos, 50+ quests, sistema de combate e narrativa envolvente.", gradient: "linear-gradient(135deg, #ef4444 0%, #f97316 100%)" },
  { name: "Synth", emoji: "🎹", category: "Plataformas", type: "Ferramenta", description: "Sintetizador polifónico no browser com osciladores, filtros, envelopes e efeitos em tempo real.", gradient: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)" },
  { name: "Design System", emoji: "🧩", category: "Plataformas", type: "Ferramenta", description: "Sistema de design completo com 15 componentes reutilizáveis, tokens e documentação interativa.", gradient: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)" },
];

const ALL_PROJECTS = [
  { name: "Bijou Restaurante", emoji: "🍷", category: "Restaurantes", gradient: "linear-gradient(135deg, #c084fc, #818cf8)" },
  { name: "Caçarola", emoji: "🍲", category: "Restaurantes", gradient: "linear-gradient(135deg, #f97316, #ef4444)" },
  { name: "Caçarola Dois", emoji: "🍳", category: "Restaurantes", gradient: "linear-gradient(135deg, #f97316, #f59e0b)" },
  { name: "Café Praça 18", emoji: "☕", category: "Restaurantes", gradient: "linear-gradient(135deg, #92400e, #f59e0b)" },
  { name: "Casa dos Papagaios", emoji: "🦜", category: "Restaurantes", gradient: "linear-gradient(135deg, #16a34a, #4ade80)" },
  { name: "Cataventos", emoji: "🌬️", category: "Restaurantes", gradient: "linear-gradient(135deg, #0ea5e9, #38bdf8)" },
  { name: "Marisqueira Rosa Amélia", emoji: "🦐", category: "Restaurantes", gradient: "linear-gradient(135deg, #f43f5e, #fb923c)" },
  { name: "Maregrafo", emoji: "🌊", category: "Restaurantes", gradient: "linear-gradient(135deg, #0284c7, #22d3ee)" },
  { name: "Meio Cheio", emoji: "🍷", category: "Vinho & Gastronomia", gradient: "linear-gradient(135deg, #7c3aed, #a78bfa)" },
  { name: "Mesa dos Amigos", emoji: "🤝", category: "Restaurantes", gradient: "linear-gradient(135deg, #ea580c, #f97316)" },
  { name: "Nalu Cabedelo", emoji: "🏄", category: "Restaurantes", gradient: "linear-gradient(135deg, #0891b2, #67e8f9)" },
  { name: "O Picadeiro", emoji: "🎪", category: "Restaurantes", gradient: "linear-gradient(135deg, #dc2626, #f97316)" },
  { name: "Pé na Areia", emoji: "🏖️", category: "Restaurantes", gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)" },
  { name: "Pé no Bairro", emoji: "🏘️", category: "Restaurantes", gradient: "linear-gradient(135deg, #b45309, #f59e0b)" },
  { name: "Ribeirosanto", emoji: "🏛️", category: "Restaurantes", gradient: "linear-gradient(135deg, #1e3a5f, #3b82f6)" },
  { name: "Sabor Abençoado", emoji: "🙏", category: "Restaurantes", gradient: "linear-gradient(135deg, #a16207, #fbbf24)" },
  { name: "Tasca da Praia", emoji: "🐚", category: "Restaurantes", gradient: "linear-gradient(135deg, #0d9488, #5eead4)" },
  { name: "Tasca Dentro", emoji: "🍴", category: "Restaurantes", gradient: "linear-gradient(135deg, #b91c1c, #ef4444)" },
  { name: "Zeff Pizza", emoji: "🍕", category: "Restaurantes", gradient: "linear-gradient(135deg, #dc2626, #f97316)" },
  { name: "Ninika Tours", emoji: "✈️", category: "Restaurantes", gradient: "linear-gradient(135deg, #2563eb, #60a5fa)" },
  { name: "Sand Murtinheira", emoji: "🏝️", category: "Restaurantes", gradient: "linear-gradient(135deg, #d97706, #fcd34d)" },
  { name: "Quintas Estrelas", emoji: "⭐", category: "Restaurantes", gradient: "linear-gradient(135deg, #854d0e, #fbbf24)" },
  { name: "Quinta da Salmanha", emoji: "🌿", category: "Restaurantes", gradient: "linear-gradient(135deg, #15803d, #86efac)" },
  { name: "Alba Saúde Dentária", emoji: "🦷", category: "Saúde", gradient: "linear-gradient(135deg, #0ea5e9, #7dd3fc)" },
  { name: "Clínica Dentária Quiaios", emoji: "🏥", category: "Saúde", gradient: "linear-gradient(135deg, #2563eb, #93c5fd)" },
  { name: "Clínica Tamargueira", emoji: "💊", category: "Saúde", gradient: "linear-gradient(135deg, #0d9488, #5eead4)" },
  { name: "Clínica Vasco da Gama", emoji: "⚕️", category: "Saúde", gradient: "linear-gradient(135deg, #1d4ed8, #60a5fa)" },
  { name: "DentalKid", emoji: "🧒", category: "Saúde", gradient: "linear-gradient(135deg, #8b5cf6, #c084fc)" },
  { name: "DentalKid v2", emoji: "😁", category: "Saúde", gradient: "linear-gradient(135deg, #a855f7, #d8b4fe)" },
  { name: "FozClínica", emoji: "🏨", category: "Saúde", gradient: "linear-gradient(135deg, #0891b2, #67e8f9)" },
  { name: "Premium Clínica Dentária", emoji: "👑", category: "Saúde", gradient: "linear-gradient(135deg, #b45309, #fcd34d)" },
  { name: "UpConcept Clínica", emoji: "💎", category: "Saúde", gradient: "linear-gradient(135deg, #4f46e5, #818cf8)" },
  { name: "Rota dos Vinhos", emoji: "🍇", category: "Vinho & Gastronomia", gradient: "linear-gradient(135deg, #7c2d12, #dc2626)" },
  { name: "Vindima Selvagem", emoji: "🌾", category: "Vinho & Gastronomia", gradient: "linear-gradient(135deg, #854d0e, #f59e0b)" },
  { name: "Vinho na Rua", emoji: "🥂", category: "Vinho & Gastronomia", gradient: "linear-gradient(135deg, #9f1239, #f43f5e)" },
  { name: "Ondas Academy", emoji: "🌊", category: "Vinho & Gastronomia", gradient: "linear-gradient(135deg, #0369a1, #38bdf8)" },
  { name: "Chess", emoji: "♟️", category: "Jogos", gradient: "linear-gradient(135deg, #1e1b4b, #6366f1)" },
  { name: "Snake Game", emoji: "🐍", category: "Jogos", gradient: "linear-gradient(135deg, #15803d, #4ade80)" },
  { name: "Memory Game", emoji: "🧠", category: "Jogos", gradient: "linear-gradient(135deg, #7c3aed, #c084fc)" },
  { name: "RPG Chronicle", emoji: "⚔️", category: "Jogos", gradient: "linear-gradient(135deg, #ef4444, #f97316)" },
  { name: "RPG Quest", emoji: "🗡️", category: "Jogos", gradient: "linear-gradient(135deg, #b91c1c, #f59e0b)" },
  { name: "Fractal Explorer", emoji: "🌀", category: "Interativo", gradient: "linear-gradient(135deg, #06b6d4, #8b5cf6)" },
  { name: "Solar System", emoji: "🪐", category: "Interativo", gradient: "linear-gradient(135deg, #1e1b4b, #6366f1)" },
  { name: "Aurora Borealis", emoji: "🌌", category: "Interativo", gradient: "linear-gradient(135deg, #065f46, #34d399)" },
  { name: "Particle Sim", emoji: "✨", category: "Interativo", gradient: "linear-gradient(135deg, #4f46e5, #c084fc)" },
  { name: "Globe Explorer", emoji: "🌍", category: "Interativo", gradient: "linear-gradient(135deg, #1d4ed8, #22d3ee)" },
  { name: "Color Theory", emoji: "🎨", category: "Interativo", gradient: "linear-gradient(135deg, #ec4899, #f59e0b)" },
  { name: "Color Blindness Sim", emoji: "👁️", category: "Interativo", gradient: "linear-gradient(135deg, #6366f1, #a78bfa)" },
  { name: "Music Visualizer", emoji: "🎵", category: "Interativo", gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)" },
  { name: "Music Theory", emoji: "🎼", category: "Interativo", gradient: "linear-gradient(135deg, #7c3aed, #f472b6)" },
  { name: "Music Box", emoji: "🎶", category: "Interativo", gradient: "linear-gradient(135deg, #a855f7, #f9a8d4)" },
  { name: "Breathing Exercise", emoji: "🧘", category: "Interativo", gradient: "linear-gradient(135deg, #0d9488, #a7f3d0)" },
  { name: "Countdown", emoji: "⏱️", category: "Interativo", gradient: "linear-gradient(135deg, #dc2626, #f97316)" },
  { name: "Morse Code", emoji: "📡", category: "Interativo", gradient: "linear-gradient(135deg, #1e3a5f, #60a5fa)" },
  { name: "Sorting Visualizer", emoji: "📊", category: "Interativo", gradient: "linear-gradient(135deg, #059669, #34d399)" },
  { name: "Maze Solver", emoji: "🏁", category: "Interativo", gradient: "linear-gradient(135deg, #7c2d12, #f97316)" },
  { name: "Typing Speed Test", emoji: "⌨️", category: "Interativo", gradient: "linear-gradient(135deg, #4338ca, #818cf8)" },
  { name: "Weather Mood", emoji: "🌤️", category: "Interativo", gradient: "linear-gradient(135deg, #0284c7, #fbbf24)" },
  { name: "World Clock", emoji: "🕐", category: "Interativo", gradient: "linear-gradient(135deg, #1e1b4b, #818cf8)" },
  { name: "Decision Wheel", emoji: "🎯", category: "Interativo", gradient: "linear-gradient(135deg, #dc2626, #f59e0b)" },
  { name: "Drum Machine", emoji: "🥁", category: "Interativo", gradient: "linear-gradient(135deg, #9f1239, #f43f5e)" },
  { name: "Emoji Mixer", emoji: "😎", category: "Interativo", gradient: "linear-gradient(135deg, #f59e0b, #ec4899)" },
  { name: "Mood Journal", emoji: "📔", category: "Interativo", gradient: "linear-gradient(135deg, #8b5cf6, #fbbf24)" },
  { name: "Habit Tracker", emoji: "📋", category: "Interativo", gradient: "linear-gradient(135deg, #059669, #a7f3d0)" },
  { name: "Pomodoro", emoji: "🍅", category: "Interativo", gradient: "linear-gradient(135deg, #dc2626, #ef4444)" },
  { name: "Flashcards", emoji: "📚", category: "Interativo", gradient: "linear-gradient(135deg, #2563eb, #7dd3fc)" },
  { name: "Quiz Portugal", emoji: "🇵🇹", category: "Interativo", gradient: "linear-gradient(135deg, #dc2626, #16a34a)" },
  { name: "Mapa Portugal", emoji: "🗺️", category: "Interativo", gradient: "linear-gradient(135deg, #1e40af, #60a5fa)" },
  { name: "Photo Filters", emoji: "📸", category: "Interativo", gradient: "linear-gradient(135deg, #ec4899, #8b5cf6)" },
  { name: "Rabbit Hole", emoji: "🐇", category: "Interativo", gradient: "linear-gradient(135deg, #4f46e5, #a78bfa)" },
  { name: "Seeds", emoji: "🌱", category: "Interativo", gradient: "linear-gradient(135deg, #15803d, #86efac)" },
  { name: "Futuro", emoji: "🔮", category: "Interativo", gradient: "linear-gradient(135deg, #6d28d9, #c084fc)" },
  { name: "Generative Art", emoji: "🎨", category: "Criativo", gradient: "linear-gradient(135deg, #f472b6, #c084fc)" },
  { name: "CSS Art Gallery", emoji: "🖼️", category: "Criativo", gradient: "linear-gradient(135deg, #8b5cf6, #06b6d4)" },
  { name: "Pixel Art", emoji: "👾", category: "Criativo", gradient: "linear-gradient(135deg, #6366f1, #ec4899)" },
  { name: "Drawing Canvas", emoji: "✏️", category: "Criativo", gradient: "linear-gradient(135deg, #f59e0b, #ef4444)" },
  { name: "CSS Playground", emoji: "🎭", category: "Criativo", gradient: "linear-gradient(135deg, #0ea5e9, #8b5cf6)" },
  { name: "Guitar Tuner", emoji: "🎸", category: "Criativo", gradient: "linear-gradient(135deg, #92400e, #f59e0b)" },
  { name: "BFitFam", emoji: "💪", category: "Fitness", gradient: "linear-gradient(135deg, #f97316, #ef4444)" },
  { name: "JSON Formatter", emoji: "📝", category: "Ferramentas", gradient: "linear-gradient(135deg, #059669, #34d399)" },
  { name: "Regex Tester", emoji: "🔍", category: "Ferramentas", gradient: "linear-gradient(135deg, #7c3aed, #a78bfa)" },
  { name: "Password Generator", emoji: "🔐", category: "Ferramentas", gradient: "linear-gradient(135deg, #dc2626, #f97316)" },
  { name: "Calculator", emoji: "🧮", category: "Ferramentas", gradient: "linear-gradient(135deg, #1d4ed8, #60a5fa)" },
  { name: "Unit Converter", emoji: "📐", category: "Ferramentas", gradient: "linear-gradient(135deg, #0891b2, #67e8f9)" },
  { name: "BMI Calculator", emoji: "⚖️", category: "Ferramentas", gradient: "linear-gradient(135deg, #16a34a, #86efac)" },
  { name: "Color Palette Generator", emoji: "🌈", category: "Ferramentas", gradient: "linear-gradient(135deg, #ec4899, #f59e0b)" },
  { name: "Gradient Maker", emoji: "🎨", category: "Ferramentas", gradient: "linear-gradient(135deg, #6366f1, #ec4899)" },
  { name: "Markdown Editor", emoji: "📄", category: "Ferramentas", gradient: "linear-gradient(135deg, #1e40af, #93c5fd)" },
  { name: "Text Analyzer", emoji: "📊", category: "Ferramentas", gradient: "linear-gradient(135deg, #4f46e5, #818cf8)" },
  { name: "Todo Kanban", emoji: "📌", category: "Ferramentas", gradient: "linear-gradient(135deg, #0ea5e9, #38bdf8)" },
  { name: "Recipe Finder", emoji: "👨‍🍳", category: "Ferramentas", gradient: "linear-gradient(135deg, #ea580c, #fb923c)" },
  { name: "Periodic Table", emoji: "⚛️", category: "Interativo", gradient: "linear-gradient(135deg, #10b981, #06b6d4)" },
  { name: "AI Chat Sim", emoji: "🤖", category: "Ferramentas", gradient: "linear-gradient(135deg, #6366f1, #a78bfa)" },
  { name: "Design System", emoji: "🧩", category: "Plataformas", gradient: "linear-gradient(135deg, #6366f1, #06b6d4)" },
  { name: "Portfolio Builder", emoji: "🏗️", category: "Plataformas", gradient: "linear-gradient(135deg, #4f46e5, #818cf8)" },
  { name: "Synth", emoji: "🎹", category: "Plataformas", gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)" },
  { name: "Jaime Silva", emoji: "👨‍💻", category: "Plataformas", gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)" },
];

const FAQ_DATA = [
  { q: "Porque não cobrar pelos projetos?", a: "Acredito que a tecnologia deve ser acessível a todos. Muitos negócios locais — restaurantes, clínicas, pequenas empresas — não têm orçamento para presença digital. Se posso ajudar, porque não o fazer? O valor que recebo é ver o impacto real na vida das pessoas." },
  { q: "Como é financiado atualmente?", a: "Honestamente, com poupanças pessoais e muito tempo. Cada domínio, cada servidor, cada hora de desenvolvimento sai do meu bolso. É sustentável? Não para sempre. É por isso que o Horizonte existe — para que a comunidade possa ajudar a manter isto vivo." },
  { q: "Posso sugerir um projeto?", a: "Claro que sim! Adoro receber ideias. Os apoiantes do plano Horizonte têm prioridade, mas todas as sugestões são bem-vindas. Às vezes, a melhor ideia vem de quem menos esperas." },
  { q: "Os projetos vão ter anúncios?", a: "Nunca. Ponto final. Os projetos são livres de anúncios, tracking invasivo e paywalls. Essa é uma promessa que faço e que nunca vou quebrar. A confiança dos utilizadores vale mais do que qualquer receita publicitária." },
  { q: "Como posso ajudar sem dinheiro?", a: "Partilha os projetos! Fala sobre eles, dá feedback, usa-os no dia a dia. Cada pessoa que descobre uma das ferramentas e a acha útil é uma vitória. O boca-a-boca é o marketing mais poderoso que existe." },
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

function FloatingShape({ style, mouseX, mouseY, depth }: {
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
        y: [0, -15, 0, 10, 0],
        rotate: [0, 5, -3, 7, 0],
      }}
      transition={{
        duration: 8 + depth * 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/* ─────────────────────────── MAIN COMPONENT ─────────────────────────── */

export default function HorizontePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [visibleCount, setVisibleCount] = useState(24);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
  const heroParallax = useTransform(scrollYProgress, [0, 0.3], [0, -120]);
  const midParallax = useTransform(scrollYProgress, [0, 0.3], [0, -60]);

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

  /* Filtered projects */
  const filteredProjects = useMemo(() => {
    if (activeCategory === "Todos") return ALL_PROJECTS;
    return ALL_PROJECTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const loadMore = () => setVisibleCount(prev => Math.min(prev + 24, filteredProjects.length));

  useEffect(() => { setVisibleCount(24); }, [activeCategory]);

  const navLinks = ["Missão", "Projectos", "Impacto", "Apoiar"];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Inter', sans-serif; color: #1E1B4B; overflow-x: hidden; }
        ::selection { background: #c7d2fe; color: #1E1B4B; }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #EFF6FF 0%, #F5F3FF 35%, #FFF7ED 70%, #F5F3FF 100%)",
      }}>

        {/* ═══════════════ NAVBAR ═══════════════ */}
        <motion.nav
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
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 4px 30px rgba(99, 102, 241, 0.1), 0 1px 3px rgba(0,0,0,0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "1px solid rgba(255,255,255,0.5)",
          }}
        >
          {/* Logo */}
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 20, cursor: "pointer" }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            descomplic
            <span style={{
              background: "linear-gradient(135deg, #f97316, #f59e0b, #fbbf24)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>ai</span>
          </div>

          {/* Desktop Links */}
          <div style={{ display: "flex", gap: 28, alignItems: "center" }} className="nav-desktop">
            <style>{`
              @media (max-width: 768px) { .nav-desktop { display: none !important; } }
              @media (min-width: 769px) { .nav-mobile-btn { display: none !important; } }
            `}</style>
            {navLinks.map(link => (
              <button key={link} onClick={() => scrollTo(link.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500,
                  color: "#4b5563", transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#6366F1")}
                onMouseLeave={e => (e.currentTarget.style.color = "#4b5563")}
              >
                {link}
              </button>
            ))}
            <button
              onClick={() => scrollTo("apoiar")}
              style={{
                background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                color: "white",
                border: "none",
                borderRadius: 9999,
                padding: "8px 20px",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                transition: "transform 0.2s, box-shadow 0.2s",
                boxShadow: "0 2px 10px rgba(99, 102, 241, 0.3)",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(99, 102, 241, 0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 2px 10px rgba(99, 102, 241, 0.3)"; }}
            >
              Apoiar
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button className="nav-mobile-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              width: 32, height: 32, display: "flex", flexDirection: "column",
              justifyContent: "center", alignItems: "center", gap: 5,
            }}
          >
            <motion.span animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 7 : 0 }}
              style={{ display: "block", width: 20, height: 2, background: "#1E1B4B", borderRadius: 2 }} />
            <motion.span animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
              style={{ display: "block", width: 20, height: 2, background: "#1E1B4B", borderRadius: 2 }} />
            <motion.span animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -7 : 0 }}
              style={{ display: "block", width: 20, height: 2, background: "#1E1B4B", borderRadius: 2 }} />
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
                background: "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)",
                borderRadius: 24, padding: "24px 32px",
                boxShadow: "0 10px 40px rgba(99, 102, 241, 0.15)",
                display: "flex", flexDirection: "column", gap: 16,
              }}
            >
              {navLinks.map(link => (
                <button key={link} onClick={() => scrollTo(link.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    fontSize: 18, fontWeight: 600, color: "#1E1B4B",
                    fontFamily: "'Plus Jakarta Sans', sans-serif", textAlign: "left",
                    padding: "8px 0", borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  {link}
                </button>
              ))}
              <button onClick={() => scrollTo("apoiar")}
                style={{
                  background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                  color: "white", border: "none", borderRadius: 9999,
                  padding: "12px 24px", fontSize: 16, fontWeight: 600,
                  cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif",
                  marginTop: 8,
                }}
              >
                Apoiar
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══════════════ HERO ═══════════════ */}
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
          {/* Background gradient layer */}
          <motion.div style={{
            position: "absolute", inset: 0, zIndex: 0, y: heroParallax,
            background: "linear-gradient(180deg, #dbeafe 0%, #ede9fe 40%, #fef3c7 80%, #fce7f3 100%)",
          }} />

          {/* Floating shapes — middle layer */}
          <motion.div style={{ position: "absolute", inset: 0, zIndex: 1, y: midParallax }}>
            <FloatingShape mouseX={mouseX} mouseY={mouseY} depth={1.2}
              style={{ top: "15%", left: "8%", width: 80, height: 80, background: "rgba(147, 197, 253, 0.35)", filter: "blur(1px)" }} />
            <FloatingShape mouseX={mouseX} mouseY={mouseY} depth={0.8}
              style={{ top: "25%", right: "12%", width: 120, height: 120, background: "rgba(196, 181, 253, 0.3)", filter: "blur(2px)" }} />
            <FloatingShape mouseX={mouseX} mouseY={mouseY} depth={1.5}
              style={{ bottom: "20%", left: "15%", width: 60, height: 60, background: "rgba(251, 207, 232, 0.4)", borderRadius: "30%" }} />
            <FloatingShape mouseX={mouseX} mouseY={mouseY} depth={0.6}
              style={{ top: "60%", right: "20%", width: 100, height: 100, background: "rgba(253, 186, 116, 0.3)", filter: "blur(1px)" }} />
            <FloatingShape mouseX={mouseX} mouseY={mouseY} depth={1.0}
              style={{ top: "10%", left: "45%", width: 50, height: 50, background: "rgba(99, 102, 241, 0.15)", borderRadius: "20%" }} />
            <FloatingShape mouseX={mouseX} mouseY={mouseY} depth={1.8}
              style={{ bottom: "30%", right: "8%", width: 70, height: 70, background: "rgba(249, 115, 22, 0.2)" }} />
            <FloatingShape mouseX={mouseX} mouseY={mouseY} depth={0.4}
              style={{ top: "40%", left: "5%", width: 40, height: 40, background: "rgba(167, 139, 250, 0.3)", borderRadius: "40%" }} />
            <FloatingShape mouseX={mouseX} mouseY={mouseY} depth={1.3}
              style={{ bottom: "10%", left: "50%", width: 90, height: 90, background: "rgba(147, 197, 253, 0.2)", filter: "blur(3px)" }} />
          </motion.div>

          {/* Content — front layer */}
          <motion.div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 900, margin: "0 auto" }}>
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
                color: "#1E1B4B",
                marginBottom: 24,
              }}
            >
              O futuro é{" "}
              <span style={{
                background: "linear-gradient(135deg, #6366F1, #8B5CF6, #F97316)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 4s linear infinite",
              }}>
                para todos.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                fontWeight: 700,
                color: "#4338ca",
                marginBottom: 16,
              }}
            >
              110+ projetos. Zero custos. Todo o impacto.
            </motion.p>

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
              Construo ferramentas, websites e experiências porque acredito que a tecnologia deve ser livre.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}
            >
              <button
                onClick={() => scrollTo("projectos")}
                style={{
                  background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                  color: "white",
                  border: "none",
                  borderRadius: 9999,
                  padding: "14px 32px",
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  boxShadow: "0 4px 20px rgba(99, 102, 241, 0.35)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px) scale(1.03)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(99, 102, 241, 0.45)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(99, 102, 241, 0.35)"; }}
              >
                Explorar projetos
              </button>
              <button
                onClick={() => scrollTo("apoiar")}
                style={{
                  background: "transparent",
                  color: "#6366F1",
                  border: "2px solid #6366F1",
                  borderRadius: 9999,
                  padding: "12px 30px",
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "#6366F1"; e.currentTarget.style.color = "white"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#6366F1"; }}
              >
                Apoiar a visão
              </button>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
              zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
            }}
          >
            <span style={{ fontSize: 12, color: "#6B7280", letterSpacing: 2, textTransform: "uppercase" }}>Explorar</span>
            <div style={{ width: 1, height: 30, background: "linear-gradient(to bottom, #6B7280, transparent)" }} />
          </motion.div>
        </section>

        {/* ═══════════════ MISSÃO ═══════════════ */}
        <section id="missao" style={{
          padding: "120px 24px",
          maxWidth: 1200,
          margin: "0 auto",
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
          }} className="mission-grid">
            <style>{`
              @media (max-width: 768px) {
                .mission-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
              }
            `}</style>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 800,
                marginBottom: 24,
                color: "#1E1B4B",
                lineHeight: 1.2,
              }}>
                Porquê fazer tudo{" "}
                <span style={{
                  background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>de graça?</span>
              </h2>

              <p style={{
                fontSize: 18,
                lineHeight: 1.8,
                color: "#4b5563",
                marginBottom: 32,
              }}>
                Não quero construir para lucrar. Quero construir porque resolver problemas é o que me faz feliz. Cada pessoa que usa uma das minhas ferramentas sem pagar é uma vitória.
              </p>

              <div style={{
                borderLeft: "3px solid #8B5CF6",
                paddingLeft: 20,
                fontStyle: "italic",
                fontSize: 17,
                color: "#6366F1",
                lineHeight: 1.6,
              }}>
                "A melhor coisa que construí hoje vai ajudar alguém que nunca vou conhecer."
              </div>
            </motion.div>

            {/* Counter visual */}
            <motion.div
              ref={missionRef}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 48,
                borderRadius: 32,
                background: "linear-gradient(135deg, rgba(99,102,241,0.05), rgba(139,92,246,0.08))",
                border: "1px solid rgba(99,102,241,0.1)",
              }}
            >
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(5rem, 12vw, 8rem)",
                fontWeight: 900,
                background: "linear-gradient(135deg, #6366F1, #8B5CF6, #F97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1,
              }}>
                {missionCount}+
              </div>
              <p style={{
                fontSize: 18,
                fontWeight: 600,
                color: "#6B7280",
                marginTop: 12,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>
                projetos lançados gratuitamente
              </p>
              <div style={{
                display: "flex",
                gap: 8,
                marginTop: 24,
                flexWrap: "wrap",
                justifyContent: "center",
              }}>
                {["🍽️", "🏥", "🛠️", "🎮", "✨", "🎨", "💪", "🚀", "🍷"].map((e, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i, type: "spring" }}
                    style={{ fontSize: 28 }}
                  >
                    {e}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════ PROJETOS EM DESTAQUE ═══════════════ */}
        <section id="projectos" style={{ padding: "80px 24px 120px", maxWidth: 1200, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: 64 }}
          >
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              color: "#1E1B4B",
              marginBottom: 12,
            }}>
              O que já construí
            </h2>
            <p style={{ fontSize: 18, color: "#6B7280" }}>
              Projetos em destaque — cada um com uma história
            </p>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {FEATURED_PROJECTS.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                style={{
                  borderRadius: 24,
                  overflow: "hidden",
                  background: "white",
                  boxShadow: "0 4px 30px rgba(99, 102, 241, 0.08), 0 1px 3px rgba(0,0,0,0.04)",
                  border: "1px solid rgba(99, 102, 241, 0.06)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  cursor: "pointer",
                }}
                whileHover={{ y: -4, boxShadow: "0 12px 50px rgba(99, 102, 241, 0.15)" }}
              >
                <div style={{ display: "flex", alignItems: "stretch", minHeight: 180 }} className="featured-card">
                  <style>{`
                    @media (max-width: 640px) {
                      .featured-card { flex-direction: column !important; }
                      .featured-card-gradient { min-height: 100px !important; min-width: 100% !important; }
                    }
                  `}</style>

                  {/* Gradient side */}
                  <div className="featured-card-gradient" style={{
                    minWidth: 200,
                    background: project.gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}>
                    <span style={{
                      fontSize: 64,
                      filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.2))",
                      zIndex: 1,
                    }}>
                      {project.emoji}
                    </span>
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 70%)",
                    }} />
                  </div>

                  {/* Info */}
                  <div style={{ padding: "28px 36px", display: "flex", flexDirection: "column", justifyContent: "center", flex: 1 }}>
                    <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                      <span style={{
                        fontSize: 11,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: 1.2,
                        color: "#8B5CF6",
                        background: "rgba(139, 92, 246, 0.08)",
                        padding: "3px 10px",
                        borderRadius: 9999,
                      }}>
                        {project.category}
                      </span>
                      <span style={{
                        fontSize: 11,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: 1.2,
                        color: "#6366F1",
                        background: "rgba(99, 102, 241, 0.08)",
                        padding: "3px 10px",
                        borderRadius: 9999,
                      }}>
                        {project.type}
                      </span>
                    </div>
                    <h3 style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
                      fontWeight: 800,
                      color: "#1E1B4B",
                      marginBottom: 8,
                    }}>
                      {project.name}
                    </h3>
                    <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.6, marginBottom: 16 }}>
                      {project.description}
                    </p>
                    <span style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#6366F1",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}>
                      Explorar <span style={{ transition: "transform 0.2s" }}>→</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════════════ TODAS AS CATEGORIAS ═══════════════ */}
        <section style={{
          padding: "100px 24px",
          background: "linear-gradient(180deg, rgba(99,102,241,0.03) 0%, rgba(139,92,246,0.05) 100%)",
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{ textAlign: "center", marginBottom: 56 }}
            >
              <h2 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 800,
                color: "#1E1B4B",
                marginBottom: 12,
              }}>
                Um universo de{" "}
                <span style={{
                  background: "linear-gradient(135deg, #8B5CF6, #F97316)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>projectos</span>
              </h2>
            </motion.div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 20,
            }}>
              {CATEGORIES.map((cat, i) => (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  whileHover={{ y: -6, boxShadow: "0 12px 40px rgba(99, 102, 241, 0.12)" }}
                  style={{
                    background: "rgba(255,255,255,0.8)",
                    backdropFilter: "blur(10px)",
                    borderRadius: 20,
                    padding: "24px 20px",
                    border: "1px solid rgba(99, 102, 241, 0.08)",
                    boxShadow: "0 2px 16px rgba(99, 102, 241, 0.06)",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onClick={() => { setActiveCategory(cat.name); scrollTo("todos-projetos"); }}
                >
                  {/* Gradient bottom border */}
                  <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: "linear-gradient(90deg, #6366F1, #8B5CF6, #F97316)",
                    opacity: 0.6,
                    transition: "height 0.3s, opacity 0.3s",
                  }} />

                  <span style={{ fontSize: 40, display: "block", marginBottom: 12 }}>{cat.emoji}</span>
                  <h3 style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: 16,
                    color: "#1E1B4B",
                    marginBottom: 6,
                  }}>
                    {cat.name}
                  </h3>
                  <span style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#8B5CF6",
                    background: "rgba(139, 92, 246, 0.1)",
                    padding: "2px 10px",
                    borderRadius: 9999,
                    display: "inline-block",
                    marginBottom: 12,
                  }}>
                    {cat.count} projetos
                  </span>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {cat.projects.map(p => (
                      <span key={p} style={{ fontSize: 13, color: "#6B7280" }}>{p}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ TODOS OS PROJETOS ═══════════════ */}
        <section id="todos-projetos" style={{ padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: 40 }}
          >
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              color: "#1E1B4B",
              marginBottom: 12,
            }}>
              110+ projetos, cada um com uma{" "}
              <span style={{
                background: "linear-gradient(135deg, #6366F1, #F97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>história</span>
            </h2>
          </motion.div>

          {/* Category filter bar */}
          <div style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: 48,
            position: "sticky",
            top: 80,
            zIndex: 50,
            padding: "12px 0",
            background: "linear-gradient(180deg, rgba(245,243,255,0.95) 0%, rgba(245,243,255,0.8) 100%)",
            backdropFilter: "blur(10px)",
            borderRadius: 16,
          }}>
            {["Todos", ...CATEGORIES.map(c => c.name)].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "8px 18px",
                  borderRadius: 9999,
                  border: "none",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.2s",
                  background: activeCategory === cat
                    ? "linear-gradient(135deg, #6366F1, #8B5CF6)"
                    : "rgba(99, 102, 241, 0.06)",
                  color: activeCategory === cat ? "white" : "#6B7280",
                  boxShadow: activeCategory === cat
                    ? "0 2px 12px rgba(99, 102, 241, 0.3)"
                    : "none",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 20,
          }}>
            <AnimatePresence mode="popLayout">
              {filteredProjects.slice(0, visibleCount).map((project, i) => (
                <motion.div
                  key={project.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, delay: i * 0.02 }}
                  whileHover={{ scale: 1.03, boxShadow: "0 12px 40px rgba(99, 102, 241, 0.12)" }}
                  style={{
                    background: "white",
                    borderRadius: 20,
                    overflow: "hidden",
                    boxShadow: "0 2px 16px rgba(99, 102, 241, 0.06)",
                    border: "1px solid rgba(99, 102, 241, 0.06)",
                    cursor: "pointer",
                    transition: "box-shadow 0.3s",
                    position: "relative",
                  }}
                >
                  {/* Top gradient strip */}
                  <div style={{
                    height: 4,
                    background: project.gradient,
                    transition: "height 0.3s",
                  }} />
                  <div style={{ padding: "20px 20px 24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                      <span style={{ fontSize: 32 }}>{project.emoji}</span>
                      <div>
                        <h3 style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontWeight: 700,
                          fontSize: 15,
                          color: "#1E1B4B",
                        }}>
                          {project.name}
                        </h3>
                        <span style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: "#8B5CF6",
                          background: "rgba(139, 92, 246, 0.08)",
                          padding: "2px 8px",
                          borderRadius: 9999,
                        }}>
                          {project.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Load more */}
          {visibleCount < filteredProjects.length && (
            <div style={{ textAlign: "center", marginTop: 48 }}>
              <button
                onClick={loadMore}
                style={{
                  background: "rgba(99, 102, 241, 0.06)",
                  color: "#6366F1",
                  border: "2px solid rgba(99, 102, 241, 0.15)",
                  borderRadius: 9999,
                  padding: "12px 32px",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "#6366F1"; e.currentTarget.style.color = "white"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(99, 102, 241, 0.06)"; e.currentTarget.style.color = "#6366F1"; }}
              >
                Carregar mais ({filteredProjects.length - visibleCount} restantes)
              </button>
            </div>
          )}
        </section>

        {/* ═══════════════ IMPACTO ═══════════════ */}
        <section id="impacto" ref={impactRef} style={{
          padding: "120px 24px",
          background: "linear-gradient(135deg, #FFF7ED 0%, #FAF5FF 50%, #EFF6FF 100%)",
        }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 800,
                color: "#1E1B4B",
                marginBottom: 64,
              }}
            >
              Números que{" "}
              <span style={{
                background: "linear-gradient(135deg, #F97316, #8B5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>importam</span>
            </motion.h2>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 40,
            }}>
              {[
                { value: `${c1}+`, label: "Projectos criados" },
                { value: `${c2}`, label: "Restaurantes digitalizados" },
                { value: `${c3}`, label: "Clínicas com website" },
                { value: `${c4}+`, label: "Ferramentas gratuitas" },
                { value: "0\u20AC", label: "Cobrado a utilizadores" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  style={{ textAlign: "center" }}
                >
                  <div style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "clamp(2.5rem, 6vw, 4rem)",
                    fontWeight: 900,
                    background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    lineHeight: 1.1,
                    marginBottom: 8,
                  }}>
                    {stat.value}
                  </div>
                  <p style={{ fontSize: 15, color: "#6B7280", fontWeight: 500 }}>{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ COMO APOIAR ═══════════════ */}
        <section id="apoiar" style={{ padding: "120px 24px", maxWidth: 1100, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: 64 }}
          >
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              color: "#1E1B4B",
              marginBottom: 12,
            }}>
              Junta-te ao{" "}
              <span style={{
                background: "linear-gradient(135deg, #F97316, #8B5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>horizonte</span>
            </h2>
            <p style={{ fontSize: 18, color: "#6B7280", maxWidth: 600, margin: "0 auto" }}>
              Cada contribuição mantém os projetos vivos e gratuitos para todos
            </p>
          </motion.div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
            alignItems: "stretch",
          }}>
            {/* Estrela */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -6 }}
              style={{
                background: "white",
                borderRadius: 24,
                padding: "36px 28px",
                boxShadow: "0 4px 24px rgba(99, 102, 241, 0.08)",
                border: "1px solid rgba(99, 102, 241, 0.08)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span style={{ fontSize: 48, marginBottom: 16 }}>⭐</span>
              <h3 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 24,
                fontWeight: 800,
                color: "#1E1B4B",
                marginBottom: 4,
              }}>Estrela</h3>
              <p style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#8B5CF6",
                marginBottom: 20,
              }}>Gratuito</p>
              <ul style={{ listStyle: "none", padding: 0, marginBottom: 24, flex: 1 }}>
                {["Partilha nas redes sociais", "Dá feedback nos projetos", "Usa as ferramentas no dia a dia", "Sugere melhorias"].map(item => (
                  <li key={item} style={{
                    fontSize: 15,
                    color: "#4b5563",
                    padding: "6px 0",
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                  }}>
                    <span style={{ color: "#8B5CF6", fontWeight: 700 }}>+</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button style={{
                background: "rgba(99, 102, 241, 0.06)",
                color: "#6366F1",
                border: "2px solid rgba(99, 102, 241, 0.15)",
                borderRadius: 9999,
                padding: "12px 24px",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                width: "100%",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "#6366F1"; e.currentTarget.style.color = "white"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(99, 102, 241, 0.06)"; e.currentTarget.style.color = "#6366F1"; }}
              >
                Começar a apoiar
              </button>
            </motion.div>

            {/* Sol */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -6 }}
              style={{
                background: "white",
                borderRadius: 24,
                padding: "36px 28px",
                boxShadow: "0 6px 32px rgba(139, 92, 246, 0.12)",
                border: "1px solid rgba(139, 92, 246, 0.12)",
                display: "flex",
                flexDirection: "column",
                transform: "scale(1.02)",
              }}
            >
              <span style={{ fontSize: 48, marginBottom: 16 }}>☀️</span>
              <h3 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 24,
                fontWeight: 800,
                color: "#1E1B4B",
                marginBottom: 4,
              }}>Sol</h3>
              <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 20 }}>
                <span style={{
                  background: "linear-gradient(135deg, #F97316, #8B5CF6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>5€ uma vez</span>
              </p>
              <ul style={{ listStyle: "none", padding: 0, marginBottom: 24, flex: 1 }}>
                {["Contribuição para servidores", "Ajuda com domínios e hosting", "Nome no mural de apoiantes", "Tudo do plano Estrela"].map(item => (
                  <li key={item} style={{
                    fontSize: 15,
                    color: "#4b5563",
                    padding: "6px 0",
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                  }}>
                    <span style={{ color: "#F97316", fontWeight: 700 }}>+</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button style={{
                background: "linear-gradient(135deg, #F97316, #f59e0b)",
                color: "white",
                border: "none",
                borderRadius: 9999,
                padding: "12px 24px",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                width: "100%",
                boxShadow: "0 4px 16px rgba(249, 115, 22, 0.3)",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(249, 115, 22, 0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(249, 115, 22, 0.3)"; }}
              >
                Contribuir 5€
              </button>
            </motion.div>

            {/* Horizonte */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -6 }}
              style={{
                background: "white",
                borderRadius: 24,
                padding: "36px 28px",
                boxShadow: "0 8px 40px rgba(99, 102, 241, 0.15)",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Animated gradient border */}
              <div style={{
                position: "absolute",
                inset: 0,
                borderRadius: 24,
                padding: 2,
                background: "linear-gradient(135deg, #6366F1, #8B5CF6, #F97316, #ec4899, #6366F1)",
                backgroundSize: "300% 300%",
                animation: "gradientShift 4s ease infinite",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                pointerEvents: "none",
              }} />

              <span style={{ fontSize: 48, marginBottom: 16 }}>🌅</span>
              <h3 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 24,
                fontWeight: 800,
                color: "#1E1B4B",
                marginBottom: 4,
              }}>Horizonte</h3>
              <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 20 }}>
                <span style={{
                  background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>15€+/mês</span>
              </p>
              <ul style={{ listStyle: "none", padding: 0, marginBottom: 24, flex: 1 }}>
                {[
                  "Apoio mensal sustentável",
                  "Input direto em novos projetos",
                  "Agradecimento público no site",
                  "Acesso prioritário a novidades",
                  "Tudo dos planos anteriores",
                ].map(item => (
                  <li key={item} style={{
                    fontSize: 15,
                    color: "#4b5563",
                    padding: "6px 0",
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                  }}>
                    <span style={{
                      background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: 700,
                    }}>+</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button style={{
                background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                color: "white",
                border: "none",
                borderRadius: 9999,
                padding: "14px 24px",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                width: "100%",
                boxShadow: "0 4px 20px rgba(99, 102, 241, 0.35)",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(99, 102, 241, 0.45)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(99, 102, 241, 0.35)"; }}
              >
                Apoiar mensalmente
              </button>
            </motion.div>
          </div>

          {/* Message below */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              textAlign: "center",
              maxWidth: 700,
              margin: "48px auto 0",
              fontSize: 16,
              color: "#6B7280",
              lineHeight: 1.7,
              fontStyle: "italic",
            }}
          >
            Cada contribuição, por mais pequena, faz diferença. Mas se não puderes apoiar financeiramente, usar e partilhar os projetos já é enorme.
          </motion.p>
        </section>

        {/* ═══════════════ PERGUNTAS ═══════════════ */}
        <section style={{
          padding: "120px 24px",
          background: "linear-gradient(180deg, rgba(139,92,246,0.03), rgba(99,102,241,0.05))",
        }}>
          <div style={{ maxWidth: 780, margin: "0 auto" }}>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 800,
                color: "#1E1B4B",
                textAlign: "center",
                marginBottom: 48,
              }}
            >
              Perguntas frequentes
            </motion.h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {FAQ_DATA.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  style={{
                    background: "white",
                    borderRadius: 16,
                    overflow: "hidden",
                    boxShadow: "0 2px 12px rgba(99, 102, 241, 0.05)",
                    border: `1px solid ${openFaq === i ? "rgba(99, 102, 241, 0.15)" : "rgba(99, 102, 241, 0.06)"}`,
                    transition: "border-color 0.3s",
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: "100%",
                      padding: "20px 24px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      textAlign: "left",
                    }}
                  >
                    <span style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#1E1B4B",
                    }}>
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ fontSize: 18, color: "#8B5CF6", flexShrink: 0, marginLeft: 16 }}
                    >
                      ▼
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: "hidden" }}
                      >
                        <p style={{
                          padding: "0 24px 20px",
                          fontSize: 15,
                          color: "#6B7280",
                          lineHeight: 1.7,
                        }}>
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ VISÃO ═══════════════ */}
        <section style={{
          padding: "140px 24px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Soft background glow */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 1 }}
          >
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)",
              fontWeight: 600,
              color: "#1E1B4B",
              lineHeight: 1.6,
              marginBottom: 32,
            }}>
              Imagina um mundo onde qualquer pessoa pode ter um{" "}
              <span style={{
                background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 800,
              }}>website profissional</span>
              . Onde ferramentas úteis são{" "}
              <span style={{
                background: "linear-gradient(135deg, #F97316, #f59e0b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 800,
              }}>gratuitas</span>
              . Onde a tecnologia não é um{" "}
              <span style={{
                background: "linear-gradient(135deg, #ec4899, #8B5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 800,
              }}>luxo</span>.
            </p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
                fontWeight: 900,
                background: "linear-gradient(135deg, #6366F1, #8B5CF6, #F97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1.3,
              }}
            >
              Esse é o horizonte para onde caminho.
            </motion.p>
          </motion.div>
        </section>

        {/* ═══════════════ CONTACTO ═══════════════ */}
        <section id="contacto" style={{
          padding: "120px 24px",
          background: "linear-gradient(180deg, rgba(99,102,241,0.03), rgba(249,115,22,0.04))",
        }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{ textAlign: "center", marginBottom: 48 }}
            >
              <h2 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 800,
                color: "#1E1B4B",
                marginBottom: 12,
              }}>
                O horizonte começa com uma{" "}
                <span style={{
                  background: "linear-gradient(135deg, #6366F1, #F97316)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>conversa</span>
              </h2>
              <p style={{ fontSize: 16, color: "#6B7280" }}>Todas as mensagens recebem resposta.</p>
            </motion.div>

            {/* Contact buttons */}
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
              {[
                { icon: "✉️", label: "Email", color: "#6366F1" },
                { icon: "💬", label: "WhatsApp", color: "#25D366" },
                { icon: "🔗", label: "LinkedIn", color: "#0A66C2" },
              ].map(item => (
                <motion.button
                  key={item.label}
                  whileHover={{ y: -3, boxShadow: `0 8px 24px ${item.color}22` }}
                  style={{
                    background: "white",
                    border: `2px solid ${item.color}20`,
                    borderRadius: 16,
                    padding: "16px 28px",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    cursor: "pointer",
                    fontSize: 15,
                    fontWeight: 600,
                    color: item.color,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                    transition: "all 0.2s",
                  }}
                >
                  <span style={{ fontSize: 22 }}>{item.icon}</span>
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Contact form (visual only) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                background: "white",
                borderRadius: 24,
                padding: "36px 32px",
                boxShadow: "0 4px 30px rgba(99, 102, 241, 0.08)",
                border: "1px solid rgba(99, 102, 241, 0.06)",
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="form-grid">
                <style>{`@media (max-width: 640px) { .form-grid { grid-template-columns: 1fr !important; } }`}</style>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#4b5563", display: "block", marginBottom: 6 }}>Nome</label>
                  <input
                    type="text"
                    placeholder="O teu nome"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: 12,
                      border: "1.5px solid #e5e7eb",
                      fontSize: 15,
                      fontFamily: "'Inter', sans-serif",
                      outline: "none",
                      transition: "border-color 0.2s",
                      background: "#fafafe",
                    }}
                    onFocus={e => e.currentTarget.style.borderColor = "#8B5CF6"}
                    onBlur={e => e.currentTarget.style.borderColor = "#e5e7eb"}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#4b5563", display: "block", marginBottom: 6 }}>Email</label>
                  <input
                    type="email"
                    placeholder="email@exemplo.pt"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: 12,
                      border: "1.5px solid #e5e7eb",
                      fontSize: 15,
                      fontFamily: "'Inter', sans-serif",
                      outline: "none",
                      transition: "border-color 0.2s",
                      background: "#fafafe",
                    }}
                    onFocus={e => e.currentTarget.style.borderColor = "#8B5CF6"}
                    onBlur={e => e.currentTarget.style.borderColor = "#e5e7eb"}
                  />
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#4b5563", display: "block", marginBottom: 6 }}>Mensagem</label>
                <textarea
                  rows={4}
                  placeholder="A tua mensagem..."
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: 12,
                    border: "1.5px solid #e5e7eb",
                    fontSize: 15,
                    fontFamily: "'Inter', sans-serif",
                    outline: "none",
                    resize: "vertical",
                    transition: "border-color 0.2s",
                    background: "#fafafe",
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = "#8B5CF6"}
                  onBlur={e => e.currentTarget.style.borderColor = "#e5e7eb"}
                />
              </div>
              <button style={{
                background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                color: "white",
                border: "none",
                borderRadius: 9999,
                padding: "14px 36px",
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                boxShadow: "0 4px 16px rgba(99, 102, 241, 0.3)",
                transition: "all 0.2s",
                width: "100%",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(99, 102, 241, 0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(99, 102, 241, 0.3)"; }}
              >
                Enviar mensagem
              </button>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════ FOOTER ═══════════════ */}
        <footer style={{
          padding: "80px 24px 40px",
          background: "linear-gradient(180deg, #EFF6FF, #ede9fe, #fef3c7)",
        }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr",
              gap: 48,
              marginBottom: 48,
            }} className="footer-grid">
              <style>{`@media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; } }`}</style>

              {/* Brand */}
              <div>
                <div style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: 24,
                  marginBottom: 12,
                }}>
                  descomplic
                  <span style={{
                    background: "linear-gradient(135deg, #f97316, #f59e0b, #fbbf24)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>ai</span>
                </div>
                <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.7, maxWidth: 320 }}>
                  Construir tecnologia gratuita para todos. 110+ projetos e a contar.
                </p>
              </div>

              {/* Links */}
              <div>
                <h4 style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  color: "#1E1B4B",
                  marginBottom: 16,
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                }}>
                  Links
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {["Missão", "Projectos", "Impacto", "Apoiar", "Contacto"].map(link => (
                    <button
                      key={link}
                      onClick={() => scrollTo(link.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: 14,
                        color: "#6B7280",
                        textAlign: "left",
                        padding: 0,
                        fontFamily: "'Inter', sans-serif",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = "#6366F1"}
                      onMouseLeave={e => e.currentTarget.style.color = "#6B7280"}
                    >
                      {link}
                    </button>
                  ))}
                </div>
              </div>

              {/* Social */}
              <div>
                <h4 style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  color: "#1E1B4B",
                  marginBottom: 16,
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                }}>
                  Social
                </h4>
                <div style={{ display: "flex", gap: 12 }}>
                  {[
                    { icon: "🐙", label: "GitHub" },
                    { icon: "🔗", label: "LinkedIn" },
                    { icon: "📸", label: "Instagram" },
                  ].map(s => (
                    <div
                      key={s.label}
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: "rgba(99, 102, 241, 0.06)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20,
                        cursor: "pointer",
                        transition: "all 0.2s",
                        border: "1px solid rgba(99, 102, 241, 0.08)",
                      }}
                      title={s.label}
                    >
                      {s.icon}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div style={{
              borderTop: "1px solid rgba(99, 102, 241, 0.1)",
              paddingTop: 24,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
            }}>
              <p style={{ fontSize: 14, color: "#6B7280" }}>
                Feito com ❤️ para todos
              </p>
              <p style={{ fontSize: 14, color: "#6B7280" }}>
                © 2026 Descomplicai — Construir para o bem.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
