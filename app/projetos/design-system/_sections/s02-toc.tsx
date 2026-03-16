"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { Spotlight } from "@/components/ui/spotlight";
import { StaggerContainer } from "@/components/ui/stagger-container";
import { DotGrid } from "@/components/ui/dot-grid";

/* ------------------------------------------------------------------ */
/*  Chapter data                                                       */
/* ------------------------------------------------------------------ */
type Chapter = {
  number: number;
  title: string;
  description: string;
  category: string;
  color: string;
  hoverBorder: string;
  hoverShadow: string;
  badge: string;
};

const chapters: Chapter[] = [
  {
    number: 1,
    title: "Filosofia",
    description: "Os principios que guiam cada decisao",
    category: "Fundacao",
    color: "text-blue-500",
    hoverBorder: "rgba(59,130,246,0.3)",
    hoverShadow: "rgba(59,130,246,0.08)",
    badge: "bg-blue-50 text-blue-600",
  },
  {
    number: 2,
    title: "A Stack",
    description: "Porque GSAP, Lenis e Framer Motion",
    category: "Fundacao",
    color: "text-blue-500",
    hoverBorder: "rgba(59,130,246,0.3)",
    hoverShadow: "rgba(59,130,246,0.08)",
    badge: "bg-blue-50 text-blue-600",
  },
  {
    number: 3,
    title: "Smooth Scroll",
    description: "Como o Lenis transforma a experiencia",
    category: "Fundacao",
    color: "text-blue-500",
    hoverBorder: "rgba(59,130,246,0.3)",
    hoverShadow: "rgba(59,130,246,0.08)",
    badge: "bg-blue-50 text-blue-600",
  },
  {
    number: 4,
    title: "Glassmorphism",
    description: "A ciencia do vidro digital",
    category: "Efeitos",
    color: "text-purple-500",
    hoverBorder: "rgba(168,85,247,0.3)",
    hoverShadow: "rgba(168,85,247,0.08)",
    badge: "bg-purple-50 text-purple-600",
  },
  {
    number: 5,
    title: "Spotlight & Glow",
    description: "Fisica do tracking de cursor",
    category: "Efeitos",
    color: "text-purple-500",
    hoverBorder: "rgba(168,85,247,0.3)",
    hoverShadow: "rgba(168,85,247,0.08)",
    badge: "bg-purple-50 text-purple-600",
  },
  {
    number: 6,
    title: "Tipografia",
    description: "Animacoes que dao vida ao texto",
    category: "Tipografia",
    color: "text-cyan-500",
    hoverBorder: "rgba(6,182,212,0.3)",
    hoverShadow: "rgba(6,182,212,0.08)",
    badge: "bg-cyan-50 text-cyan-600",
  },
  {
    number: 7,
    title: "Parallax",
    description: "Profundidade e percepcao 3D",
    category: "Scroll",
    color: "text-green-500",
    hoverBorder: "rgba(34,197,94,0.3)",
    hoverShadow: "rgba(34,197,94,0.08)",
    badge: "bg-green-50 text-green-600",
  },
  {
    number: 8,
    title: "Spring Physics",
    description: "Constantes, amortecimento e naturalidade",
    category: "Fisica",
    color: "text-amber-500",
    hoverBorder: "rgba(245,158,11,0.3)",
    hoverShadow: "rgba(245,158,11,0.08)",
    badge: "bg-amber-50 text-amber-600",
  },
  {
    number: 9,
    title: "Campos Magneticos",
    description: "Interacao e Lei de Fitts",
    category: "Interacao",
    color: "text-pink-500",
    hoverBorder: "rgba(236,72,153,0.3)",
    hoverShadow: "rgba(236,72,153,0.08)",
    badge: "bg-pink-50 text-pink-600",
  },
  {
    number: 10,
    title: "Composicao",
    description: "Construir o complexo a partir do simples",
    category: "Patterns",
    color: "text-indigo-500",
    hoverBorder: "rgba(99,102,241,0.3)",
    hoverShadow: "rgba(99,102,241,0.08)",
    badge: "bg-indigo-50 text-indigo-600",
  },
  {
    number: 11,
    title: "Acessibilidade",
    description: "Inclusivo por design, nao por obrigacao",
    category: "Qualidade",
    color: "text-emerald-500",
    hoverBorder: "rgba(16,185,129,0.3)",
    hoverShadow: "rgba(16,185,129,0.08)",
    badge: "bg-emerald-50 text-emerald-600",
  },
  {
    number: 12,
    title: "Performance",
    description: "Budgets, metricas e 60fps",
    category: "Qualidade",
    color: "text-emerald-500",
    hoverBorder: "rgba(16,185,129,0.3)",
    hoverShadow: "rgba(16,185,129,0.08)",
    badge: "bg-emerald-50 text-emerald-600",
  },
  {
    number: 13,
    title: "Catalogo",
    description: "Os 15 componentes em detalhe",
    category: "Referencia",
    color: "text-slate-500",
    hoverBorder: "rgba(100,116,139,0.3)",
    hoverShadow: "rgba(100,116,139,0.08)",
    badge: "bg-slate-100 text-slate-600",
  },
  {
    number: 14,
    title: "Playground",
    description: "Componha e experimente em tempo real",
    category: "Interativo",
    color: "text-red-500",
    hoverBorder: "rgba(239,68,68,0.3)",
    hoverShadow: "rgba(239,68,68,0.08)",
    badge: "bg-red-50 text-red-600",
  },
  {
    number: 15,
    title: "Gradientes",
    description: "Mesh gradients e paletas animadas",
    category: "Visual",
    color: "text-orange-500",
    hoverBorder: "rgba(249,115,22,0.3)",
    hoverShadow: "rgba(249,115,22,0.08)",
    badge: "bg-orange-50 text-orange-600",
  },
  {
    number: 16,
    title: "Stagger & Entrada",
    description: "Coreografia de elementos",
    category: "Animacao",
    color: "text-violet-500",
    hoverBorder: "rgba(139,92,246,0.3)",
    hoverShadow: "rgba(139,92,246,0.08)",
    badge: "bg-violet-50 text-violet-600",
  },
];

/* ------------------------------------------------------------------ */
/*  ChapterCard                                                        */
/* ------------------------------------------------------------------ */
function ChapterCard({ chapter }: { chapter: Chapter }) {
  const [hovered, setHovered] = useState(false);

  return (
    <GlassCard
      hover={false}
      className="relative cursor-default transition-all duration-300"
      style={{
        borderColor: hovered ? chapter.hoverBorder : undefined,
        boxShadow: hovered
          ? `0 8px 32px ${chapter.hoverShadow}, 0 0 0 1px ${chapter.hoverBorder}`
          : undefined,
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-hover
    >
      <Spotlight size={160} className="from-slate-200/40 via-slate-100/20 to-transparent" />

      {/* chapter number */}
      <span className={`text-3xl font-bold ${chapter.color}`}>
        {String(chapter.number).padStart(2, "0")}
      </span>

      {/* title */}
      <h3 className="mt-2 text-sm font-semibold text-slate-900">
        {chapter.title}
      </h3>

      {/* description */}
      <p className="mt-1 text-xs leading-relaxed text-slate-500">
        {chapter.description}
      </p>

      {/* category badge */}
      <span
        className={`mt-3 inline-block rounded-full px-2.5 py-0.5 text-[9px] font-medium uppercase tracking-wider ${chapter.badge}`}
      >
        {chapter.category}
      </span>
    </GlassCard>
  );
}

/* ================================================================== */
/*  TableOfContentsSection                                             */
/* ================================================================== */
export function TableOfContentsSection() {
  return (
    <section id="indice" className="relative bg-white py-32 px-6 overflow-hidden">
      {/* subtle background texture */}
      <DotGrid size={28} dotSize={1} opacity={0.03} color="rgb(15,23,42)" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading
          label="Indice"
          title="16 Capitulos. Uma Jornada."
          description="Do porqu\u00ea ao como \u2014 cada capitulo constroi sobre o anterior."
        />

        <StaggerContainer
          staggerDelay={0.03}
          direction="up"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {chapters.map((chapter) => (
            <ChapterCard key={chapter.number} chapter={chapter} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
