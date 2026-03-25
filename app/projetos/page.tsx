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
  // ═══ EXISTENTES (17 originais) ═══
  { id: "bfitfam", title: "BFITFAM", category: "fitness", type: "Website + PWA", description: "Plataforma de personal training com app de treinos interativa e tracking de progresso", gradient: "from-blue-600 to-cyan-500", emoji: "💪", status: "live" },
  { id: "tasca-dentro", title: "Tás-cá Dentro", category: "restaurant", type: "Website", description: "Gastrobar de cozinha de autor com carta de vinhos premium e música ao vivo", gradient: "from-amber-600 to-orange-400", emoji: "🍷", status: "live" },
  { id: "ondas-academy", title: "Ondas Academy", category: "sports", type: "Website", description: "Escola de surf em Buarcos — pacotes de aulas para todos os níveis", gradient: "from-cyan-500 to-blue-400", emoji: "🏄", status: "live" },
  { id: "futuro", title: "Futuro Portfolio", category: "creative", type: "3D Experience", description: "Portfolio pessoal com Three.js — 'O Futuro é Humano'", gradient: "from-violet-500 to-purple-500", emoji: "🌍", status: "live" },
  { id: "seeds", title: "Seeds", category: "creative", type: "Storytelling Site", description: "A Gift to Humanity — parallax storytelling sobre plantar quando ninguém está a ver", gradient: "from-green-500 to-emerald-400", emoji: "🌱", status: "live" },
  { id: "descomplicai-brutalist", title: "Descomplicai Brutalist", category: "creative", type: "Redesign Concept", description: "Versão brutalist dark do site Descomplicai — terminal UI, glitch effects, monospace", gradient: "from-gray-700 to-black", emoji: "🖤", status: "live" },
  { id: "descomplicai-editorial", title: "Descomplicai Editorial", category: "creative", type: "Redesign Concept", description: "Versão editorial premium do site Descomplicai — magazine layout, Playfair Display, cream", gradient: "from-amber-200 to-orange-100", emoji: "📰", status: "live" },
  { id: "vindima-selvagem", title: "Vindima Selvagem", category: "food", type: "Wine Experience", description: "Experiência de vindima participativa no Douro — colha as suas uvas, pise a pé, prove vinhos DOC", gradient: "from-amber-700 to-orange-500", emoji: "🍇", status: "live" },
  { id: "quintas-estrelas", title: "Quintas & Estrelas", category: "food", type: "Wine Experience", description: "Estadias em quintas vinícolas com jantares sob as estrelas — glamping, gastronomia, vindima", gradient: "from-indigo-900 to-amber-700", emoji: "✨", status: "live" },
  { id: "rota-dos-vinhos", title: "Rota dos Vinhos", category: "food", type: "Wine Experience", description: "Rotas turísticas guiadas pelas 6 regiões vinícolas de Portugal — acessível e solar", gradient: "from-blue-500 to-green-400", emoji: "🌞", status: "live" },
  { id: "vinho-na-rua", title: "Vinho na Rua", category: "food", type: "Wine Experience", description: "Walking tours de vinho e petiscos por Porto, Lisboa, Braga, Évora e Faro — casual e divertido", gradient: "from-red-800 to-yellow-600", emoji: "🍷", status: "live" },
  { id: "ninika-tours", title: "NinikaTours", category: "food", type: "Wine & Gastro Platform", description: "Experiências de vinho vulcânico e gastronomia açoriana na Ilha Terceira — lead capture + booking", gradient: "from-indigo-950 to-red-900", emoji: "🌋", status: "live" },
  { id: "design-system", title: "Design System", category: "creative", type: "UI Component Library", description: "15 componentes premium — glassmorphism, parallax, smooth scroll, text animations e mais", gradient: "from-blue-600 to-violet-500", emoji: "🧩", status: "live" },
  { id: "meiocheio", title: "MeioCheio", category: "restaurant", type: "Wine Bar Website", description: "Wine bar & petiscos em Figueira da Foz — carta de vinhos, experiências, reservas via WhatsApp", gradient: "from-red-900 to-amber-600", emoji: "🍷", status: "live" },
  { id: "ribeirosanto", title: "Ribeiro Santo", category: "restaurant", type: "Wine Estate Website", description: "Quinta vinícola no Dão — vinhos premiados, enoturismo, 8 páginas com história, catálogo e experiências", gradient: "from-[#722F37] to-[#C9A96E]", emoji: "🍇", status: "live" },
  { id: "sabor-abencoado", title: "Sabor Abençoado", category: "restaurant", type: "Pastry Takeaway", description: "Padaria caseira em Olhão — bolos, pães artesanais e pudins com entrega ao domicílio via WhatsApp", gradient: "from-amber-200 to-pink-200", emoji: "🧁", status: "live" },
  { id: "rabbit-hole", title: "The Infinite Corridor", category: "creative", type: "Interactive Experience", description: "Experiência imersiva de mistério — 79 páginas, 11 secções, puzzles, narrativa não-linear e segredos escondidos", gradient: "from-amber-900 to-slate-900", emoji: "🕳️", status: "live" },

  // ═══ NOVOS — RESTAURANTES (16) ═══
  { id: "bijou-restaurante", title: "Bijou Restaurante", category: "restaurant", type: "Fine Dining", description: "Restaurante de cozinha de autor com menu de degustação, carta de vinhos premium e ambiente intimista", gradient: "from-[#4A3728] to-[#CFB53B]", emoji: "🍽️", status: "live" },
  { id: "cacarola", title: "Caçarola", category: "restaurant", type: "Comfort Food", description: "Restaurante tradicional português com cozinha caseira, petiscos e ambiente familiar em Figueira da Foz", gradient: "from-amber-800 to-orange-500", emoji: "🥘", status: "live" },
  { id: "cacarola-dois", title: "Caçarola Dois", category: "restaurant", type: "Seafood & Market", description: "Segundo espaço Caçarola com mercado de frescos, wine bar e menu sazonal de marisco", gradient: "from-teal-700 to-amber-500", emoji: "🦐", status: "live" },
  { id: "cafe-praca-18", title: "Café Praça 18", category: "restaurant", type: "Café & Terrace", description: "Café icónico na praça central — pequeno-almoço, brunch, cocktails e esplanada com vista", gradient: "from-yellow-600 to-amber-400", emoji: "☕", status: "live" },
  { id: "casa-dos-papagaios", title: "Casa dos Papagaios", category: "restaurant", type: "Traditional Restaurant", description: "Restaurante tradicional com cozinha regional, ambiente rústico e pratos de forno a lenha", gradient: "from-green-700 to-lime-500", emoji: "🦜", status: "live" },
  { id: "cataventos", title: "Cataventos", category: "restaurant", type: "Beach Bar", description: "Beach bar e restaurante à beira-mar — cocktails, petiscos de praia e sunset sessions", gradient: "from-sky-400 to-orange-300", emoji: "🌊", status: "live" },
  { id: "maregrafo", title: "Marégrafo", category: "restaurant", type: "Seafood Restaurant", description: "Restaurante de marisco fresco junto ao porto — peixe do dia, cataplanas e vista oceano", gradient: "from-blue-800 to-cyan-400", emoji: "🐟", status: "live" },
  { id: "marisqueira-rosa-amelia", title: "Marisqueira Rosa Amélia", category: "restaurant", type: "Seafood House", description: "Marisqueira tradicional com marisco fresco, lagosta e arroz de tamboril — referência local", gradient: "from-rose-700 to-pink-400", emoji: "🦞", status: "live" },
  { id: "mesa-dos-amigos", title: "Mesa dos Amigos", category: "restaurant", type: "Social Dining", description: "Restaurante de partilha com mesa comunitária, tapas portuguesas e noites temáticas", gradient: "from-orange-600 to-red-400", emoji: "🤝", status: "live" },
  { id: "nalu-cabedelo", title: "Nalu Cabedelo", category: "restaurant", type: "Surf Café", description: "Café de praia em Cabedelo — açaí bowls, smoothies, tacos de peixe e vibe surf relaxada", gradient: "from-teal-400 to-blue-300", emoji: "🏄‍♂️", status: "live" },
  { id: "o-picadeiro", title: "O Picadeiro", category: "restaurant", type: "Grill House", description: "Churrasqueira e grill house com carnes maturadas, espetadas e picanha na brasa", gradient: "from-red-800 to-amber-600", emoji: "🥩", status: "live" },
  { id: "pe-na-areia", title: "Pé na Areia", category: "restaurant", type: "Beach Restaurant", description: "Restaurante pé na areia com peixe grelhado, sangria e ambiente descontraído junto ao mar", gradient: "from-amber-300 to-sky-300", emoji: "👣", status: "live" },
  { id: "pe-no-bairro", title: "Pé no Bairro", category: "restaurant", type: "Neighborhood Bar", description: "Bar de bairro com cocktails artesanais, petiscos criativos e música ao vivo", gradient: "from-slate-700 to-amber-500", emoji: "🏘️", status: "live" },
  { id: "quinta-da-salmanha", title: "Quinta da Salmanha", category: "restaurant", type: "Rural Estate", description: "Quinta rural com restaurante de cozinha regional, vinhos da casa e eventos ao ar livre", gradient: "from-green-800 to-amber-400", emoji: "🏡", status: "live" },
  { id: "sand-murtinheira", title: "Sand Murtinheira", category: "restaurant", type: "Beach Lounge", description: "Beach lounge na Praia da Murtinheira — cocktails, sushi, DJ sets e pôr-do-sol", gradient: "from-amber-400 to-rose-300", emoji: "🌅", status: "live" },
  { id: "tasca-da-praia", title: "Tasca da Praia", category: "restaurant", type: "Seaside Tavern", description: "Tasca à beira-mar com petiscos, vinho verde e marisco fresco em ambiente informal", gradient: "from-blue-600 to-amber-400", emoji: "⚓", status: "live" },

  // ═══ NOVOS — CLÍNICAS (8) ═══
  { id: "alba-saude-dentaria", title: "Alba Saúde Dentária", category: "health", type: "Dental Clinic", description: "Clínica dentária moderna com estética dental, ortodontia invisível e branqueamento premium", gradient: "from-sky-400 to-teal-300", emoji: "🦷", status: "live" },
  { id: "clinica-dentaria-quiaios", title: "Clínica Dentária de Quiaios", category: "health", type: "Dental Clinic", description: "Clínica familiar em Quiaios com tratamentos acessíveis e atendimento personalizado", gradient: "from-blue-400 to-sky-300", emoji: "🏥", status: "live" },
  { id: "clinica-tamargueira", title: "Clínica Tamargueira", category: "health", type: "Dental Implants", description: "Referência em implantologia na região — tecnologia de ponta e equipa especializada", gradient: "from-blue-800 to-blue-500", emoji: "🔬", status: "live" },
  { id: "clinica-vasco-da-gama", title: "Clínica Vasco da Gama", category: "health", type: "Premium Dental", description: "Clínica dentária de luxo com tratamentos premium, estética e design gold & navy", gradient: "from-[#0A1628] to-[#C9A84C]", emoji: "👑", status: "live" },
  { id: "dentalkid", title: "DentalKid", category: "health", type: "Pediatric Dental", description: "Clínica dentária pediátrica com ambiente lúdico, equipa especializada em crianças", gradient: "from-pink-400 to-purple-400", emoji: "🧒", status: "live" },
  { id: "fozclinica", title: "FozClínica", category: "health", type: "Medical Clinic", description: "Clínica médica multidisciplinar na Figueira da Foz — medicina geral, especialidades e exames", gradient: "from-teal-600 to-emerald-400", emoji: "🏨", status: "live" },
  { id: "premium-clinica-dentaria", title: "Premium Clínica Dentária", category: "health", type: "Preventive Dental", description: "Clínica focada em prevenção com design minimalista — check-ups, limpezas e planos de saúde oral", gradient: "from-emerald-700 to-emerald-400", emoji: "🌿", status: "live" },
  { id: "upconcept-clinica", title: "UpConcept Clínica", category: "health", type: "Modern Clinic", description: "Clínica ultra-moderna aberta 7 dias — design contemporâneo, múltiplas especialidades", gradient: "from-blue-700 to-cyan-400", emoji: "⚡", status: "live" },
];

const CATEGORIES = [
  { id: "all", label: "Todos", count: PROJECTS.length },
  { id: "restaurant", label: "Restauração", count: 0 },
  { id: "health", label: "Saúde", count: 0 },
  { id: "food", label: "Vinho & Gastronomia", count: 0 },
  { id: "creative", label: "Criativo & 3D", count: 0 },
  { id: "fitness", label: "Fitness & Desporto", count: 0 },
];

// Count per category
CATEGORIES.forEach((c) => {
  if (c.id !== "all") {
    c.count = PROJECTS.filter((p) => {
      if (c.id === "restaurant") return p.category === "restaurant";
      if (c.id === "health") return p.category === "health";
      if (c.id === "food") return p.category === "food";
      if (c.id === "creative") return p.category === "creative";
      if (c.id === "fitness") return ["fitness", "sports"].includes(p.category);
      return p.category === c.id;
    }).length;
  }
});

/* ─────────────────── PROJECT CARD ─────────────────── */

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      layout
      className="group relative rounded-2xl bg-white border border-slate-200/80 overflow-hidden hover:shadow-lg hover:shadow-blue-500/[0.04] hover:border-blue-200/60 transition-all duration-400 cursor-pointer"
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
        <div className="flex items-center gap-1 text-xs font-medium text-blue-600">
          Ver projeto <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </motion.div>
  );

  return <Link key={project.id} href={`/projetos/${project.id}`}>{content}</Link>;
}

/* ─────────────────── PAGE ─────────────────── */

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = activeCategory === "all" ? PROJECTS : PROJECTS.filter((p) => {
    if (activeCategory === "restaurant") return p.category === "restaurant";
    if (activeCategory === "health") return p.category === "health";
    if (activeCategory === "food") return p.category === "food";
    if (activeCategory === "creative") return p.category === "creative";
    if (activeCategory === "fitness") return ["fitness", "sports"].includes(p.category);
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
            {PROJECTS.length} projetos em {CATEGORIES.filter(c => c.id !== "all" && c.count > 0).length} categorias. Restaurantes, clínicas, experiências de vinho, apps e muito mais.
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
