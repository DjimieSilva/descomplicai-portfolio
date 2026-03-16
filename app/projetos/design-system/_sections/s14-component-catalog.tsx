"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlowCard } from "@/components/ui/glow-card";
import { StaggerContainer } from "@/components/ui/stagger-container";
import { AnimatedGradient } from "@/components/ui/animated-gradient";

/* ---------- types ---------- */

type Category = "visual" | "interactive" | "typography" | "layout";
type Filter = "all" | Category;

interface PropDef {
  name: string;
  type: string;
  default: string;
  description: string;
}

interface ComponentEntry {
  name: string;
  category: Category;
  description: string;
  icon: string;
  color: string;
  props: PropDef[];
  dependencies: string[];
  fileSize: string;
}

/* ---------- data ---------- */

const components: ComponentEntry[] = [
  {
    name: "ScrollProgress",
    category: "layout",
    description:
      "Barra de progresso fixa no topo que acompanha o scroll da pagina. Feedback visual instantaneo.",
    icon: "▓",
    color: "#3b82f6",
    props: [
      { name: "color", type: "string", default: '"#3b82f6"', description: "Cor da barra de progresso" },
    ],
    dependencies: ["framer-motion"],
    fileSize: "~0.6KB",
  },
  {
    name: "GrainOverlay",
    category: "visual",
    description:
      "Textura granulada em SVG puro sobre qualquer seccao. Adiciona profundidade cinematografica.",
    icon: "░",
    color: "#a855f7",
    props: [
      { name: "opacity", type: "number", default: "0.03", description: "Intensidade do ruido" },
    ],
    dependencies: [],
    fileSize: "~0.4KB",
  },
  {
    name: "CursorFollower",
    category: "interactive",
    description:
      "Circulo animado que segue o cursor com physics de spring. Dica visual de interactividade.",
    icon: "◎",
    color: "#ec4899",
    props: [],
    dependencies: ["framer-motion"],
    fileSize: "~0.9KB",
  },
  {
    name: "AnimatedGradient",
    category: "visual",
    description:
      "Gradiente CSS animado em loop infinito. Zero dependencias, performance maxima.",
    icon: "◆",
    color: "#f59e0b",
    props: [
      { name: "colors", type: "[string, string, string]", default: "—", description: "Trio de cores do gradiente" },
      { name: "className", type: "string", default: '""', description: "Classes CSS adicionais" },
    ],
    dependencies: [],
    fileSize: "~0.3KB",
  },
  {
    name: "DotGrid",
    category: "visual",
    description:
      "Grelha de pontos em background puro CSS. Pattern subtil para seccoes de conteudo.",
    icon: "⋮",
    color: "#06b6d4",
    props: [
      { name: "opacity", type: "number", default: "0.15", description: "Opacidade da grelha" },
      { name: "color", type: "string", default: '"currentColor"', description: "Cor dos pontos" },
      { name: "size", type: "number", default: "24", description: "Espacamento entre pontos" },
      { name: "dotSize", type: "number", default: "1", description: "Tamanho de cada ponto" },
    ],
    dependencies: [],
    fileSize: "~0.3KB",
  },
  {
    name: "BlurText",
    category: "typography",
    description:
      "Texto que emerge de um blur com animacao por palavras ou letras. Impacto dramatico garantido.",
    icon: "Aa",
    color: "#8b5cf6",
    props: [
      { name: "text", type: "string", default: "—", description: "Texto a animar" },
      { name: "as", type: "ElementType", default: '"p"', description: "Tag HTML a renderizar" },
      { name: "className", type: "string", default: '""', description: "Classes CSS" },
      { name: "gradient", type: "boolean", default: "false", description: "Aplica gradiente ao texto" },
      { name: "animateBy", type: '"words" | "letters"', default: '"words"', description: "Unidade de animacao" },
      { name: "delay", type: "number", default: "0.05", description: "Delay entre unidades" },
      { name: "once", type: "boolean", default: "true", description: "Anima apenas uma vez" },
    ],
    dependencies: ["framer-motion"],
    fileSize: "~1.2KB",
  },
  {
    name: "TextScramble",
    category: "typography",
    description:
      "Efeito de scramble/decode estilo terminal. Vanilla JS puro, zero dependencias externas.",
    icon: "▌",
    color: "#10b981",
    props: [
      { name: "text", type: "string", default: "—", description: "Texto final a revelar" },
      { name: "as", type: "ElementType", default: '"span"', description: "Tag HTML a renderizar" },
      { name: "className", type: "string", default: '""', description: "Classes CSS" },
      { name: "speed", type: "number", default: "50", description: "Velocidade em ms por frame" },
      { name: "once", type: "boolean", default: "true", description: "Anima apenas uma vez" },
    ],
    dependencies: [],
    fileSize: "~0.8KB",
  },
  {
    name: "SectionHeading",
    category: "typography",
    description:
      "Header de seccao com label, titulo e descricao. Suporta modo dark e animacao de entrada.",
    icon: "H1",
    color: "#6366f1",
    props: [
      { name: "label", type: "string", default: "—", description: "Label superior em mono" },
      { name: "title", type: "string", default: "—", description: "Titulo principal" },
      { name: "description", type: "string", default: "—", description: "Paragrafo descritivo" },
      { name: "dark", type: "boolean", default: "false", description: "Modo escuro" },
    ],
    dependencies: [],
    fileSize: "~0.7KB",
  },
  {
    name: "GlassCard",
    category: "visual",
    description:
      "Card com efeito glassmorphism. Backdrop-blur, borda translucida e hover state elegante.",
    icon: "◻",
    color: "#0ea5e9",
    props: [
      { name: "className", type: "string", default: '""', description: "Classes CSS adicionais" },
      { name: "hover", type: "boolean", default: "true", description: "Ativa hover lift" },
      { name: "blur", type: "number", default: "12", description: "Intensidade do blur em px" },
      { name: "as", type: "ElementType", default: '"div"', description: "Tag HTML" },
    ],
    dependencies: ["framer-motion"],
    fileSize: "~0.9KB",
  },
  {
    name: "Spotlight",
    category: "visual",
    description:
      "Spotlight radial que segue o cursor dentro do container. useSpring para suavidade maxima.",
    icon: "☀",
    color: "#eab308",
    props: [
      { name: "size", type: "number", default: "400", description: "Diametro do spotlight em px" },
      { name: "className", type: "string", default: '""', description: "Classes CSS" },
    ],
    dependencies: ["framer-motion"],
    fileSize: "~0.7KB",
  },
  {
    name: "GlowCard",
    category: "interactive",
    description:
      "Card com glow dinamico na borda e sombra. CSS transitions puras, zero JS de animacao.",
    icon: "✦",
    color: "#2563eb",
    props: [
      { name: "glowColor", type: "string", default: '"rgba(37,99,235,0.15)"', description: "Cor do glow" },
      { name: "className", type: "string", default: '""', description: "Classes CSS" },
    ],
    dependencies: [],
    fileSize: "~0.5KB",
  },
  {
    name: "MagneticButton",
    category: "interactive",
    description:
      "Botao com efeito magnetico — atrai-se ao cursor quando proximo. Micro-interacao premium.",
    icon: "⊕",
    color: "#f43f5e",
    props: [
      { name: "className", type: "string", default: '""', description: "Classes CSS" },
      { name: "strength", type: "number", default: "30", description: "Forca de atracao em px" },
      { name: "href", type: "string", default: "undefined", description: "Link opcional" },
    ],
    dependencies: ["framer-motion"],
    fileSize: "~1.0KB",
  },
  {
    name: "ParallaxSection",
    category: "layout",
    description:
      "Seccao com parallax scroll controlado por GSAP. Profundidade visual entre camadas.",
    icon: "⇅",
    color: "#14b8a6",
    props: [
      { name: "speed", type: "number", default: "0.5", description: "Velocidade relativa do parallax" },
      { name: "className", type: "string", default: '""', description: "Classes CSS" },
    ],
    dependencies: ["gsap", "@gsap/react"],
    fileSize: "~0.8KB",
  },
  {
    name: "StaggerContainer",
    category: "layout",
    description:
      "Container que anima filhos em sequencia staggered. Entrada coordenada e elegante.",
    icon: "⊞",
    color: "#7c3aed",
    props: [
      { name: "className", type: "string", default: '""', description: "Classes CSS" },
      { name: "direction", type: '"up"|"down"|"left"|"right"', default: '"up"', description: "Direcao da entrada" },
      { name: "staggerDelay", type: "number", default: "0.1", description: "Delay entre filhos" },
      { name: "once", type: "boolean", default: "true", description: "Anima apenas uma vez" },
    ],
    dependencies: ["framer-motion"],
    fileSize: "~1.0KB",
  },
  {
    name: "SmoothScrollProvider",
    category: "layout",
    description:
      "Provider global de smooth scroll via Lenis + GSAP. Envolve toda a app para scroll suave.",
    icon: "⤓",
    color: "#059669",
    props: [
      { name: "children", type: "ReactNode", default: "—", description: "Conteudo da aplicacao" },
    ],
    dependencies: ["lenis", "gsap"],
    fileSize: "~1.8KB",
  },
];

const filters: { key: Filter; label: string; count: number }[] = [
  { key: "all", label: "Todos", count: 15 },
  { key: "visual", label: "Visual", count: 5 },
  { key: "interactive", label: "Interativo", count: 3 },
  { key: "typography", label: "Tipografia", count: 3 },
  { key: "layout", label: "Layout", count: 4 },
];

const categoryLabels: Record<Category, string> = {
  visual: "Visual",
  interactive: "Interativo",
  typography: "Tipografia",
  layout: "Layout",
};

const categoryColors: Record<Category, string> = {
  visual: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  interactive: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  typography: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  layout: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
};

/* ---------- helpers ---------- */

function toKebab(name: string): string {
  return name
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase();
}

/* ---------- component ---------- */

export function ComponentCatalogSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const filtered = components.filter((c) => {
    const matchesFilter =
      activeFilter === "all" || c.category === activeFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  return (
    <section className="relative bg-slate-950 py-32 px-6 overflow-hidden">
      <AnimatedGradient
        colors={["#0f172a", "#1e1b4b", "#0f172a"]}
        className="absolute inset-0 opacity-40"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* heading */}
        <SectionHeading
          dark
          label="Capitulo 13"
          title="Catalogo de Componentes"
          description="O indice completo do design system. Pesquisavel, filtravel e com documentacao inline."
        />

        {/* search + filters */}
        <div className="mb-10 flex flex-col items-center gap-5">
          {/* search input */}
          <div className="relative w-full max-w-md">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
              ⌕
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar componentes..."
              className="w-full rounded-xl border border-slate-700/60 bg-slate-900/80 py-3 pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-500 outline-none transition-colors focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 backdrop-blur-sm"
            />
          </div>

          {/* filter buttons */}
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                data-hover
                onClick={() => setActiveFilter(f.key)}
                className={`rounded-lg px-4 py-2 text-xs font-medium tracking-wide transition-all ${
                  activeFilter === f.key
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                    : "bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-700/40"
                }`}
              >
                {f.label} ({f.count})
              </button>
            ))}
          </div>
        </div>

        {/* grid */}
        <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((comp) => (
            <GlowCard
              key={comp.name}
              glowColor={comp.color + "33"}
              className="bg-slate-900/70 backdrop-blur-sm flex flex-col"
              data-hover
            >
              {/* header row */}
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-sm font-bold"
                  style={{ backgroundColor: comp.color + "1a", color: comp.color }}
                >
                  {comp.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-mono text-sm font-bold text-white leading-tight">
                    {comp.name}
                  </h3>
                  <span
                    className={`mt-1 inline-block rounded-full border px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider ${categoryColors[comp.category]}`}
                  >
                    {categoryLabels[comp.category]}
                  </span>
                </div>
              </div>

              {/* description */}
              <p className="text-sm leading-relaxed text-slate-400 mb-4">
                {comp.description}
              </p>

              {/* props */}
              {comp.props.length > 0 && (
                <div className="mb-4">
                  <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Props
                  </p>
                  <div className="space-y-1">
                    {comp.props.map((p) => (
                      <div
                        key={p.name}
                        className="flex items-baseline gap-1.5 text-[10px]"
                      >
                        <span className="font-mono font-semibold text-blue-400">
                          {p.name}
                        </span>
                        <span className="font-mono text-slate-600">:</span>
                        <span className="font-mono text-amber-400/80 truncate">
                          {p.type}
                        </span>
                        {p.default !== "—" && (
                          <span className="font-mono text-slate-600 truncate">
                            = {p.default}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* footer: deps + file size */}
              <div className="mt-auto flex items-center justify-between gap-2 border-t border-slate-800/60 pt-3">
                <div className="flex flex-wrap gap-1">
                  {comp.dependencies.length > 0 ? (
                    comp.dependencies.map((dep) => (
                      <span
                        key={dep}
                        className="rounded bg-slate-800 px-1.5 py-0.5 text-[9px] font-mono text-slate-400 border border-slate-700/40"
                      >
                        {dep}
                      </span>
                    ))
                  ) : (
                    <span className="rounded bg-emerald-900/30 px-1.5 py-0.5 text-[9px] font-mono text-emerald-400 border border-emerald-700/30">
                      zero deps
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-mono text-slate-600 flex-shrink-0">
                  {comp.fileSize}
                </span>
              </div>

              {/* import path */}
              <div className="mt-2 rounded bg-slate-950/60 px-2 py-1">
                <code className="text-[9px] font-mono text-slate-500 select-all">
                  @/components/ui/{toKebab(comp.name)}
                </code>
              </div>
            </GlowCard>
          ))}
        </StaggerContainer>

        {/* empty state */}
        {filtered.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-slate-500 text-sm">
              Nenhum componente encontrado para &ldquo;{searchQuery}&rdquo;
            </p>
          </div>
        )}

        {/* summary stats */}
        <div className="mt-16 text-center">
          <p className="font-mono text-xs text-slate-500 tracking-wide">
            15 componentes &middot; ~12.9KB total &middot; 100% TypeScript &middot; 0 any
          </p>
        </div>
      </div>
    </section>
  );
}
