"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

/* ─────────────────── DATA ─────────────────── */

type Project = {
  id: string;
  title: string;
  category: string;
  type: string;
  description: string;
  gradient: string;
  emoji: string;
  status: "live" | "dev";
};

const PROJECTS: Project[] = [
  { id: "bfitfam", title: "BFITFAM", category: "fitness", type: "Website + PWA", description: "Plataforma de personal training com app de treinos interativa e tracking de progresso", gradient: "from-blue-600 to-cyan-500", emoji: "💪", status: "live" },
  { id: "tasca-dentro", title: "Tás-cá Dentro", category: "restaurant", type: "Website", description: "Gastrobar de cozinha de autor com carta de vinhos premium e música ao vivo", gradient: "from-amber-600 to-orange-400", emoji: "🍷", status: "dev" },
  { id: "mar-brasa", title: "Mar & Brasa", category: "restaurant", type: "Website", description: "Restaurante de marisco e grelhados — cataplana, peixe fresco, tradição", gradient: "from-orange-500 to-red-500", emoji: "🦐", status: "dev" },
  { id: "bella-clinica", title: "Bella Clínica", category: "health", type: "Website", description: "Clínica estética premium — tratamentos faciais, corporais e anti-aging", gradient: "from-pink-500 to-rose-400", emoji: "✨", status: "dev" },
  { id: "costa-dourada", title: "Costa Dourada", category: "realestate", type: "Website", description: "Imobiliária com 500+ vendidos — listagens, serviços financeiros, testemunhos", gradient: "from-emerald-500 to-teal-400", emoji: "🏠", status: "dev" },
  { id: "ondas-academy", title: "Ondas Academy", category: "sports", type: "Website", description: "Escola de surf em Buarcos — pacotes de aulas para todos os níveis", gradient: "from-cyan-500 to-blue-400", emoji: "🏄", status: "dev" },
  { id: "pao-da-serra", title: "Pão da Serra", category: "food", type: "Website", description: "Padaria artesanal familiar — pão de massa mãe desde 2010", gradient: "from-yellow-600 to-amber-500", emoji: "🍞", status: "dev" },
  { id: "descomplicai", title: "Descomplicai", category: "saas", type: "Web Platform", description: "Plataforma educativa — IA acessível para pessoas e empresas", gradient: "from-blue-600 to-indigo-500", emoji: "🎓", status: "dev" },
  { id: "figueira-print", title: "Figueira Print CRM", category: "saas", type: "Dashboard CRM", description: "Sistema de gestão de clientes para gráfica com Supabase backend", gradient: "from-red-500 to-rose-500", emoji: "🖨️", status: "dev" },
  { id: "futuro", title: "Futuro Portfolio", category: "creative", type: "3D Experience", description: "Portfolio pessoal com Three.js — 'O Futuro é Humano'", gradient: "from-violet-500 to-purple-500", emoji: "🌍", status: "live" },
  { id: "seeds", title: "Seeds", category: "creative", type: "Storytelling Site", description: "A Gift to Humanity — parallax storytelling sobre plantar quando ninguém está a ver", gradient: "from-green-500 to-emerald-400", emoji: "🌱", status: "dev" },
  { id: "pitch-hub", title: "Pitch Hub", category: "business", type: "Sales Tool", description: "Demos ao vivo para pitches — Figueira Print, Sorri Dente e mais", gradient: "from-blue-500 to-indigo-500", emoji: "📊", status: "dev" },
  { id: "brocode", title: "BroCode Showcase", category: "business", type: "Interactive Cards", description: "7 project cards interativos — overview de capacidades", gradient: "from-indigo-500 to-blue-500", emoji: "💡", status: "dev" },
  { id: "brocode-ai", title: "BroCode AI", category: "ai", type: "AI Platform", description: "Soluções IA municipais — ROI simulator, proposta piloto Olhão", gradient: "from-purple-600 to-violet-500", emoji: "🤖", status: "dev" },
  { id: "mylo-experience", title: "MYLO Experience", category: "creative", type: "3D Interactive", description: "Experiência 3D interativa com Three.js — identidade MYLO", gradient: "from-cyan-500 to-teal-400", emoji: "🎭", status: "live" },
  { id: "possiblai", title: "PossiblAI", category: "ai", type: "Charity Livestream", description: "Two AI souls. One mission. End suffering. — Livestream Twitch", gradient: "from-pink-500 to-purple-500", emoji: "💜", status: "live" },
  { id: "image-gen", title: "Image Generator", category: "ai", type: "AI Tool", description: "Gerador de imagens IA via Puter.js — múltiplos estilos e categorias", gradient: "from-teal-500 to-cyan-400", emoji: "🎨", status: "live" },
  { id: "descomplicai-brutalist", title: "Descomplicai Brutalist", category: "creative", type: "Redesign Concept", description: "Versão brutalist dark do site Descomplicai — terminal UI, glitch effects, monospace", gradient: "from-gray-700 to-black", emoji: "🖤", status: "live" },
  { id: "descomplicai-editorial", title: "Descomplicai Editorial", category: "creative", type: "Redesign Concept", description: "Versão editorial premium do site Descomplicai — magazine layout, Playfair Display, cream", gradient: "from-amber-200 to-orange-100", emoji: "📰", status: "live" },
  { id: "vindima-selvagem", title: "Vindima Selvagem", category: "food", type: "Wine Experience", description: "Experiência de vindima participativa no Douro — colha as suas uvas, pise a pé, prove vinhos DOC", gradient: "from-amber-700 to-orange-500", emoji: "🍇", status: "live" },
  { id: "quintas-estrelas", title: "Quintas & Estrelas", category: "food", type: "Wine Experience", description: "Estadias em quintas vinícolas com jantares sob as estrelas — glamping, gastronomia, vindima", gradient: "from-indigo-900 to-amber-700", emoji: "✨", status: "live" },
  { id: "rota-dos-vinhos", title: "Rota dos Vinhos", category: "food", type: "Wine Experience", description: "Rotas turísticas guiadas pelas 6 regiões vinícolas de Portugal — acessível e solar", gradient: "from-blue-500 to-green-400", emoji: "🌞", status: "live" },
  { id: "vinho-na-rua", title: "Vinho na Rua", category: "food", type: "Wine Experience", description: "Walking tours de vinho e petiscos por Porto, Lisboa, Braga, Évora e Faro — casual e divertido", gradient: "from-red-800 to-yellow-600", emoji: "🍷", status: "live" },
  { id: "ninika-tours", title: "NinikaTours", category: "food", type: "Wine & Gastro Platform", description: "Experiências de vinho vulcânico e gastronomia açoriana na Ilha Terceira — lead capture + booking", gradient: "from-indigo-950 to-red-900", emoji: "🌋", status: "live" },
  { id: "design-system", title: "Design System", category: "creative", type: "UI Component Library", description: "15 componentes premium — glassmorphism, parallax, smooth scroll, text animations e mais", gradient: "from-blue-600 to-violet-500", emoji: "🧩", status: "live" },
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

/* ─────────────────── PROJECT CARD ─────────────────── */

const CLICKABLE_IDS = ["bfitfam", "tasca-dentro", "futuro", "ondas-academy", "seeds", "descomplicai-brutalist", "descomplicai-editorial", "vindima-selvagem", "quintas-estrelas", "rota-dos-vinhos", "vinho-na-rua", "ninika-tours", "design-system"];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isClickable = CLICKABLE_IDS.includes(project.id);

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      layout
      className={`group relative rounded-2xl bg-white border border-slate-200/80 overflow-hidden hover:shadow-lg hover:shadow-blue-500/[0.04] hover:border-blue-200/60 transition-all duration-400 ${isClickable ? "cursor-pointer" : ""}`}
    >
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
        {isClickable && (
          <div className="flex items-center gap-1 text-xs font-medium text-blue-600">
            Ver projeto <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        )}
      </div>
    </motion.div>
  );

  if (isClickable) {
    return <Link key={project.id} href={`/projetos/${project.id}`}>{content}</Link>;
  }
  return content;
}

/* ─────────────────── PAGE ─────────────────── */

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

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
          <Link href="/" className="font-bold text-lg gradient-text">descomplicai</Link>
          <div className="hidden sm:flex items-center gap-6 text-sm text-slate-500">
            <Link href="/projetos" className="text-blue-600 font-medium">Projetos</Link>
            <Link href="/#services" className="hover:text-blue-600 transition-colors">Serviços</Link>
            <Link href="/#contact" className="hover:text-blue-600 transition-colors">Contacto</Link>
          </div>
          <Link href="/#contact" className="px-4 py-1.5 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
            Falar connosco
          </Link>
        </div>
      </nav>

      {/* ─── HEADER ─── */}
      <section className="pt-28 pb-8 px-6 max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-blue-600 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Portfolio</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Todos os Projetos</h1>
          <p className="text-slate-500 max-w-xl">
            {PROJECTS.length} projetos em {CATEGORIES.filter(c => c.id !== "all" && c.count > 0).length}+ indústrias. Transparência total sobre o estado de cada um.
          </p>
        </motion.div>
      </section>

      {/* ─── FILTERS + GRID ─── */}
      <section className="px-6 pb-24 max-w-6xl mx-auto">
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

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="px-6 py-8 text-center border-t border-slate-100">
        <p className="text-xs text-slate-400">&copy; 2026 Descomplicai — IA sem complexidade</p>
      </footer>
    </main>
  );
}
