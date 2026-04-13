"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import {
  getProjectsByFilter,
  projectCount,
  projectFilters,
  projectTaxonomyById,
  showcaseCategoryCount,
  type Project,
  type ProjectFilterId,
  type ProjectFilterGroup,
  type ProjectFormat,
  type ProjectId,
  type ProjectSector,
  type PortfolioTrack,
} from "@/lib/projects";

const INITIAL_VISIBLE_COUNT = 12;
const LOAD_MORE_STEP = 12;

const filterGroupContent: Record<Exclude<ProjectFilterGroup, "all">, { label: string; description: string }> = {
  sector: {
    label: "Por setor",
    description: "Mantem a leitura atual por industria e tipo de negocio.",
  },
  discipline: {
    label: "Por disciplina",
    description: "Agrupa trabalho interativo, conceptual e mais exploratorio.",
  },
};

const trackLabels: Record<PortfolioTrack, string> = {
  client: "Cliente",
  concept: "Conceito",
  lab: "Lab",
  internal: "Interno",
};

const sectorLabels: Record<ProjectSector, string> = {
  hospitality: "Hospitalidade",
  wine_tourism: "Vinho e enoturismo",
  healthcare: "Saude",
  fitness_wellness: "Fitness e bem-estar",
  local_services: "Servicos locais",
  beauty_personal_care: "Beleza e cuidado pessoal",
  personal_brand: "Marca pessoal",
  education: "Educacao",
  developer_tools: "Developer tools",
  creative_tech: "Creative tech",
};

const formatLabels: Record<ProjectFormat, string> = {
  website: "Website",
  multi_page_site: "Site multi-pagina",
  pwa: "PWA",
  portfolio: "Portfolio",
  design_system: "Design system",
  tool: "Ferramenta",
  simulator: "Simulador",
  game: "Jogo",
  storytelling: "Storytelling",
  interactive_experience: "Experiencia interativa",
};

const trackOrder: PortfolioTrack[] = ["client", "concept", "lab", "internal"];
const sectorOrder: ProjectSector[] = [
  "hospitality",
  "wine_tourism",
  "healthcare",
  "fitness_wellness",
  "local_services",
  "beauty_personal_care",
  "personal_brand",
  "education",
  "developer_tools",
  "creative_tech",
];
const formatOrder: ProjectFormat[] = [
  "website",
  "multi_page_site",
  "pwa",
  "portfolio",
  "design_system",
  "tool",
  "simulator",
  "game",
  "storytelling",
  "interactive_experience",
];

type SummaryItem = {
  id: string;
  label: string;
  count: number;
};

function getProjectTaxonomy(project: Project) {
  return projectTaxonomyById[project.id as ProjectId];
}

function buildSummary<T extends string>(values: readonly T[], labels: Record<T, string>, order: readonly T[]) {
  const counts = new Map<T, number>();

  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return order
    .map((value) => ({
      id: value,
      label: labels[value],
      count: counts.get(value) ?? 0,
    }))
    .filter((item) => item.count > 0);
}

function SummaryList({ title, items }: { title: string; items: SummaryItem[] }) {
  if (items.length === 0) return null;

  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{title}</h3>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item.id}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700"
          >
            {item.label}
            <span className="text-[10px] text-slate-500">{item.count}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const taxonomy = getProjectTaxonomy(project);
  const primarySector = taxonomy.sectors[0];
  const primaryFormat = taxonomy.formats[0];
  const variantLabel =
    taxonomy.variantKind === "variant"
      ? taxonomy.variantLabel ?? "Variante"
      : taxonomy.variantKind === "collection"
        ? "Colecao"
        : null;

  return (
    <li className="h-full">
      <Link
        href={`/projetos/${project.id}`}
        className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafaf9]"
      >
        <article className="relative h-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-blue-200/60 group-hover:shadow-lg group-hover:shadow-blue-500/[0.04]">
          <div className={`h-1 w-full bg-gradient-to-r ${project.gradient} opacity-70 transition-opacity group-hover:opacity-100`} />
          <div className="p-5">
            <div className="mb-3 flex items-start justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <span className="text-xl" aria-hidden="true">
                  {project.emoji}
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900 transition-colors group-hover:text-blue-700">{project.title}</h3>
                  <span className="text-[11px] font-mono text-slate-500">{project.type}</span>
                </div>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                  project.status === "live" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                }`}
              >
                {project.status === "live" ? "● Live" : "● Dev"}
              </span>
            </div>
            <div className="mb-3 flex flex-wrap gap-1.5">
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                {trackLabels[taxonomy.track]}
              </span>
              {primarySector ? (
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-medium text-blue-700">
                  {sectorLabels[primarySector]}
                </span>
              ) : null}
              {primaryFormat ? (
                <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-medium text-amber-700">
                  {formatLabels[primaryFormat]}
                </span>
              ) : null}
              {variantLabel ? (
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-700">
                  {variantLabel}
                </span>
              ) : null}
            </div>
            <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-slate-600">{project.description}</p>
            <div className="flex items-center gap-1 text-xs font-medium text-blue-600">
              Ver projeto
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </div>
        </article>
      </Link>
    </li>
  );
}

/* ─────────────────── PAGE ─────────────────── */

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<ProjectFilterId>("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const filteredProjects = getProjectsByFilter(activeCategory);
  const filteredProjectTaxonomy = filteredProjects.map((project) => getProjectTaxonomy(project));
  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMoreProjects = visibleProjects.length < filteredProjects.length;
  const activeFilter = projectFilters.find((filter) => filter.id === activeCategory) ?? projectFilters[0];
  const activeTrackSummary = buildSummary(
    filteredProjectTaxonomy.map((taxonomy) => taxonomy.track),
    trackLabels,
    trackOrder,
  );
  const activeSectorSummary = buildSummary(
    filteredProjectTaxonomy.flatMap((taxonomy) => taxonomy.sectors),
    sectorLabels,
    sectorOrder,
  ).slice(0, 4);
  const activeFormatSummary = buildSummary(
    filteredProjectTaxonomy.flatMap((taxonomy) => taxonomy.formats),
    formatLabels,
    formatOrder,
  ).slice(0, 4);
  const allFilter = projectFilters.find((filter) => filter.group === "all");
  const groupedFilters = (["sector", "discipline"] as const).map((group) => ({
    group,
    label: filterGroupContent[group].label,
    description: filterGroupContent[group].description,
    filters: projectFilters.filter((filter) => filter.group === group && filter.count > 0),
  }));

  function handleFilterChange(categoryId: ProjectFilterId) {
    setActiveCategory(categoryId);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }

  return (
    <main className="min-h-screen bg-[#fafaf9]">
      <a href="#projects-status" className="skip-link">
        Saltar para a lista de projetos
      </a>
      {/* ─── NAV ─── */}
      <nav className="fixed top-0 z-40 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link
            href="/"
            className="font-bold text-lg gradient-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            descomplicai
          </Link>
          <div className="hidden items-center gap-6 text-sm text-slate-600 sm:flex">
            <Link
              href="/projetos"
              className="font-medium text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              Projetos
            </Link>
            <Link
              href="/#services"
              className="transition-colors hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              Serviços
            </Link>
            <Link
              href="/#contact"
              className="transition-colors hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              Contacto
            </Link>
          </div>
          <Link
            href="/#contact"
            className="rounded-full bg-blue-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            Falar connosco
          </Link>
        </div>
      </nav>

      {/* ─── HEADER ─── */}
      <section className="mx-auto max-w-6xl px-6 pb-8 pt-28">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-600 transition-colors hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafaf9]"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Link>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-600">Portfolio</p>
          <h1 className="mb-3 text-3xl font-bold text-slate-900 sm:text-4xl">Todos os Projetos</h1>
          <p className="max-w-2xl text-slate-600">
            {projectCount} projetos em {showcaseCategoryCount} categorias. Restaurantes, clínicas, experiências de vinho,
            apps e muito mais.
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500">
            A navegação continua compatível com os filtros atuais, mas a página já começa a expor a taxonomia nova com
            pistas de track, setor, formato e variantes diretamente no catálogo.
          </p>
        </motion.div>
      </section>

      {/* ─── FILTERS + GRID ─── */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p id="projects-status" role="status" aria-live="polite" className="text-sm text-slate-500">
            Mostrando <span className="font-medium text-slate-700">{visibleProjects.length}</span> de{" "}
            <span className="font-medium text-slate-700">{filteredProjects.length}</span> projetos
            {activeFilter.id !== "all" ? (
              <>
                {" "}
                em <span className="font-medium text-slate-700">{activeFilter.label.toLowerCase()}</span>
              </>
            ) : null}
          </p>
          <p className="text-xs text-slate-400">Carregamento progressivo para manter a página fluida.</p>
        </div>

        <div className="mb-8 grid gap-4 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.9fr)]">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/40">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Leitura atual</p>
                <h2 className="mt-1 text-lg font-semibold text-slate-900">Filtros herdados, catálogo mais claro</h2>
              </div>
              {allFilter ? (
                <button
                  key={allFilter.id}
                  type="button"
                  aria-controls="projects-grid"
                  aria-pressed={activeCategory === allFilter.id}
                  onClick={() => handleFilterChange(allFilter.id)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                    activeCategory === allFilter.id
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700"
                  }`}
                >
                  {allFilter.label}
                  <span className={`ml-0.5 text-[10px] ${activeCategory === allFilter.id ? "text-blue-100" : "text-slate-500"}`}>
                    {allFilter.count}
                  </span>
                </button>
              ) : null}
            </div>

            <p className="mb-4 max-w-3xl text-sm leading-relaxed text-slate-600">
              {activeFilter.description} Os filtros continuam a usar a estrutura pública atual para não partir a
              navegação, enquanto os cartões e o resumo ao lado já mostram a próxima camada de organização.
            </p>

            <div className="space-y-4" aria-label="Filtrar projetos">
              {groupedFilters.map((group) => (
                <fieldset key={group.group} className="rounded-2xl border border-slate-200/70 bg-slate-50/60 p-4">
                  <legend className="px-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {group.label}
                  </legend>
                  <p className="mb-3 text-sm text-slate-600">{group.description}</p>
                  <div className="flex flex-wrap gap-2" role="group" aria-label={group.label}>
                    {group.filters.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        aria-controls="projects-grid"
                        aria-pressed={activeCategory === cat.id}
                        onClick={() => handleFilterChange(cat.id)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 ${
                          activeCategory === cat.id
                            ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                            : "border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700"
                        }`}
                      >
                        {cat.label}
                        <span className={`ml-0.5 text-[10px] ${activeCategory === cat.id ? "text-blue-100" : "text-slate-500"}`}>
                          {cat.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </fieldset>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-5 shadow-sm shadow-slate-200/40">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Nova taxonomia</p>
            <h2 className="mt-1 text-lg font-semibold text-slate-900">Sinais já visíveis no catálogo</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Esta seleção ainda respeita a estrutura antiga, mas já expõe como os projetos se distribuem por track,
              setor e formato.
            </p>
            <div className="mt-5 space-y-4">
              <SummaryList title="Tracks presentes" items={activeTrackSummary} />
              <SummaryList title="Setores em destaque" items={activeSectorSummary} />
              <SummaryList title="Formatos em destaque" items={activeFormatSummary} />
            </div>
          </aside>
        </div>

        <ul id="projects-grid" role="list" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </ul>

        {hasMoreProjects ? (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((current) => current + LOAD_MORE_STEP)}
              className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafaf9]"
            >
              Mostrar mais {Math.min(LOAD_MORE_STEP, filteredProjects.length - visibleProjects.length)} projetos
            </button>
          </div>
        ) : null}
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-slate-100 px-6 py-8 text-center">
        <p className="text-xs text-slate-500">&copy; 2026 Descomplicai — IA sem complexidade</p>
      </footer>
    </main>
  );
}
