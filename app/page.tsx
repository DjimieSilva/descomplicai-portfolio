"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Palette,
  Globe,
  Bot,
  Sparkles,
  Mail,
  ChevronDown,
  Rocket,
  MessageCircle,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";

/* ─────────────────── PROJECTS DATA ─────────────────── */

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
];

/* ─────────────────── FEATURED (homepage preview) ─────────────────── */

const FEATURED_IDS = ["bfitfam", "tasca-dentro", "futuro", "seeds", "possiblai", "ondas-academy"];
const FEATURED_PROJECTS = PROJECTS.filter((p) => FEATURED_IDS.includes(p.id));

/* ─────────────────── SERVICES ─────────────────── */

const SERVICES = [
  { icon: Globe, title: "Presença Digital", desc: "Websites, apps e plataformas que representam o teu negócio online", color: "text-blue-600 bg-blue-50" },
  { icon: Bot, title: "IA & Automação", desc: "Estrutura e automação com inteligência artificial para escalar o teu negócio", color: "text-emerald-600 bg-emerald-50" },
  { icon: GraduationCap, title: "Mentoria & Formação 1:1", desc: "Acompanhamento personalizado para ti ou a tua equipa dominar ferramentas de IA", color: "text-violet-600 bg-violet-50" },
];

/* ─────────────────── FLOATING ELEMENT ─────────────────── */

function FloatingEl({ delay = 0, duration = 4, className = "", children }: { delay?: number; duration?: number; className?: string; children: React.ReactNode }) {
  return (
    <div className={`absolute ${className}`} style={{ animation: `float ${duration}s ease-in-out ${delay}s infinite` }}>
      {children}
    </div>
  );
}

/* ─────────────────── PREVIEW CARD ─────────────────── */

function PreviewCard({ project, index }: { project: Project; index: number }) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group relative rounded-2xl bg-white border border-slate-200/80 overflow-hidden hover:shadow-lg hover:shadow-blue-500/[0.04] hover:border-blue-200/60 transition-all duration-400"
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
        {project.id === "bfitfam" && (
          <div className="flex items-center gap-1 text-xs font-medium text-blue-600">
            Ver projeto <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        )}
      </div>
    </motion.div>
  );

  if (project.id === "bfitfam") {
    return <Link key={project.id} href="/projetos/bfitfam">{content}</Link>;
  }
  return content;
}

/* ─────────────────── PAGE ─────────────────── */

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-[#fafaf9]">
      {/* ─── NAV ─── */}
      <nav className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-bold text-lg gradient-text">descomplicai</span>
          <div className="hidden sm:flex items-center gap-6 text-sm text-slate-500">
            <Link href="/projetos" className="hover:text-blue-600 transition-colors">Projetos</Link>
            <a href="#services" className="hover:text-blue-600 transition-colors">Serviços</a>
            <a href="#contact" className="hover:text-blue-600 transition-colors">Contacto</a>
          </div>
          <a href="#contact" className="px-4 py-1.5 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
            Falar connosco
          </a>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden pt-24 sm:pt-14">
        <FloatingEl delay={0} duration={5} className="top-24 left-[10%] opacity-30">
          <div className="w-48 h-48 bg-gradient-to-br from-blue-300 to-indigo-300 rounded-full blur-3xl" />
        </FloatingEl>
        <FloatingEl delay={1.5} duration={6} className="top-40 right-[15%] opacity-20">
          <div className="w-56 h-56 bg-gradient-to-br from-violet-300 to-pink-300 rounded-full blur-3xl" />
        </FloatingEl>
        <FloatingEl delay={3} duration={7} className="bottom-32 left-[30%] opacity-20">
          <div className="w-40 h-40 bg-gradient-to-br from-cyan-300 to-blue-300 rounded-full blur-3xl" />
        </FloatingEl>
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
            <Link href="/projetos" className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all">
              Ver projetos <ChevronDown className="w-4 h-4" />
            </Link>
            <a href="#contact" className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-slate-700 font-medium text-sm border border-slate-200 hover:border-blue-200 hover:text-blue-700 transition-all">
              Falar connosco <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 max-w-2xl w-full">
          {[
            { value: "100+", label: "Projetos" },
            { value: "24/7", label: "Agentes" },
            { value: "7+", label: "Indústrias" },
            { value: "∞", label: "Criatividade infinita" },
          ].map((s) => (
            <div key={s.label} className="p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-100 shadow-sm text-center">
              <div className="text-2xl font-bold gradient-text">{s.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="px-6 py-24 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">O que fazemos</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-12">Serviços</h2>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-4">
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

      {/* ─── FEATURED PROJECTS ─── */}
      <section id="work" className="px-6 py-24 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Portfolio</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8">Projetos em destaque</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURED_PROJECTS.map((project, i) => (
            <PreviewCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            href="/projetos"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-slate-700 font-medium text-sm border border-slate-200 hover:border-blue-200 hover:text-blue-700 hover:shadow-md transition-all"
          >
            Ver todos os projetos <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
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
              <a href="https://wa.me/351934035971" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-slate-700 font-medium text-sm border border-slate-200 hover:border-blue-200 hover:text-blue-700 transition-all">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="px-6 py-8 text-center border-t border-slate-100">
        <p className="text-xs text-slate-400">&copy; 2026 Descomplicai — IA sem complexidade</p>
      </footer>
    </main>
  );
}
