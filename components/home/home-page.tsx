import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  ChevronDown,
  Code2,
  Globe,
  GraduationCap,
  Mail,
  MessageCircle,
  Palette,
  Rocket,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  featuredProjects,
  liveProjectCount,
  projectCount,
  projectPreviewImages,
  showcaseCategoryCount,
  type Project,
} from "@/lib/projects";

const proofPoints = [
  { value: String(liveProjectCount), label: "projetos publicados" },
  { value: String(showcaseCategoryCount), label: "áreas com trabalho real" },
  { value: "Website -> PWA", label: "formatos entregues" },
  { value: "PT -> mundo", label: "escala de atuação" },
] as const;

const sectorTags = [
  "Restauração",
  "Saúde",
  "Vinho & enoturismo",
  "Serviços locais",
  "Experiências interativas",
] as const;

type ServiceCardRecord = {
  title: string;
  description: string;
  icon: LucideIcon;
  ctaHref: string;
  ctaLabel: string;
  proof: readonly string[];
  surfaceClassName: string;
  badgeClassName: string;
  iconClassName: string;
  spanClassName: string;
};

const serviceCards: readonly ServiceCardRecord[] = [
  {
    title: "Presença digital",
    description:
      "Websites, páginas de campanha e produtos digitais que mostram o teu trabalho com clareza e rapidez.",
    icon: Globe,
    ctaHref: "#work",
    ctaLabel: "Ver provas",
    proof: [`${projectCount} projetos já no portfólio`, "Landing pages, sites multi-page e PWAs"],
    surfaceClassName:
      "md:col-span-3 bg-gradient-to-br from-blue-50 via-white to-indigo-50 hover:border-blue-200/80 hover:shadow-blue-500/[0.08]",
    badgeClassName: "bg-blue-50 border-blue-100 text-blue-700",
    iconClassName:
      "bg-gradient-to-br from-blue-500 to-indigo-500 shadow-blue-500/25",
    spanClassName: "border-blue-100 bg-blue-50 text-blue-700",
  },
  {
    title: "IA & automação",
    description:
      "Fluxos, assistentes e sistemas práticos para libertar tempo e reduzir trabalho repetitivo sem barulho desnecessário.",
    icon: Bot,
    ctaHref: "#contact",
    ctaLabel: "Falar sobre IA",
    proof: ["Operações repetitivas mais leves", "Integrações e automações orientadas a resultado"],
    surfaceClassName:
      "md:col-span-2 bg-gradient-to-br from-emerald-50 via-white to-teal-50 hover:border-emerald-200/80 hover:shadow-emerald-500/[0.08]",
    badgeClassName: "bg-emerald-50 border-emerald-100 text-emerald-700",
    iconClassName:
      "bg-gradient-to-br from-emerald-500 to-teal-500 shadow-emerald-500/25",
    spanClassName: "border-emerald-100 bg-emerald-50 text-emerald-700",
  },
  {
    title: "Mentoria & formação",
    description:
      "Sessões 1:1 ou com equipa para adotar ferramentas novas, clarificar processos e ganhar autonomia rapidamente.",
    icon: GraduationCap,
    ctaHref: "#contact",
    ctaLabel: "Marcar conversa",
    proof: ["Acompanhamento prático, não teórico", "Foco em adoção real e uso diário"],
    surfaceClassName:
      "md:col-span-5 bg-gradient-to-r from-violet-50 via-white to-purple-50 hover:border-violet-200/80 hover:shadow-violet-500/[0.08]",
    badgeClassName: "bg-violet-50 border-violet-100 text-violet-700",
    iconClassName:
      "bg-gradient-to-br from-violet-500 to-purple-500 shadow-violet-500/25",
    spanClassName: "border-violet-100 bg-violet-50 text-violet-700",
  },
] as const;

function FloatingEl({
  delay = 0,
  duration = 4,
  className = "",
  children,
}: {
  delay?: number;
  duration?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`absolute ${className}`}
      style={{ animation: `float ${duration}s ease-in-out ${delay}s infinite` }}
    >
      {children}
    </div>
  );
}

function SectionHeading({
  id,
  eyebrow,
  title,
  description,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-600">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
      >
        {title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
        {description}
      </p>
    </div>
  );
}

function FeaturedProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const previewImage =
    projectPreviewImages[project.id as keyof typeof projectPreviewImages];
  const descriptionId = `${project.id}-description`;

  return (
    <li className="h-full">
      <Link
        href={`/projetos/${project.id}`}
        aria-describedby={descriptionId}
        className="group block h-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 hover:border-blue-200/80 hover:shadow-lg hover:shadow-blue-500/[0.05]"
      >
        <article className="flex h-full flex-col">
          {previewImage ? (
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
              <Image
                src={previewImage}
                alt={`Preview de ${project.title}`}
                fill
                priority={index < 2}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/15 to-transparent" />
            </div>
          ) : (
            <div
              className={`relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br ${project.gradient}`}
            >
              <div
                className="absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/35" />
              <div className="absolute left-3 top-3">
                <span className="rounded-full border border-white/25 bg-white/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/90 backdrop-blur-sm">
                  {project.type}
                </span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="select-none text-5xl drop-shadow-lg"
                  style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.25))" }}
                >
                  {project.emoji}
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent px-4 py-3">
                <p className="text-sm font-semibold text-white drop-shadow">
                  {project.title}
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-1 flex-col p-5">
            <div className="mb-3 flex items-start justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <span className="text-xl" aria-hidden="true">
                  {project.emoji}
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900 transition-colors group-hover:text-blue-700">
                    {project.title}
                  </h3>
                  <p className="text-[11px] font-mono text-slate-500">
                    {project.type}
                  </p>
                </div>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                  project.status === "live"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {project.status === "live" ? "Live" : "Em curso"}
              </span>
            </div>

            <p
              id={descriptionId}
              className="line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600"
            >
              {project.description}
            </p>

            <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-700">
              Ver projeto
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </div>
        </article>
      </Link>
    </li>
  );
}

function ServiceCard({
  title,
  description,
  icon: Icon,
  ctaHref,
  ctaLabel,
  proof,
  surfaceClassName,
  badgeClassName,
  iconClassName,
  spanClassName,
}: ServiceCardRecord) {
  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-slate-200/70 p-8 transition-all duration-300 hover:shadow-xl ${surfaceClassName}`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative z-10 flex h-full flex-col">
        <span
          className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${badgeClassName}`}
        >
          Serviço
        </span>
        <div
          className={`mt-6 flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg ${iconClassName}`}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="mt-6 text-xl font-bold text-slate-900 sm:text-2xl">
          {title}
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
          {description}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {proof.map((item) => (
            <span
              key={item}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${spanClassName}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {item}
            </span>
          ))}
        </div>
        <a
          href={ctaHref}
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors hover:text-blue-700"
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}

export function HomePage() {
  return (
    <>
      <a href="#content" className="skip-link">
        Saltar para o conteúdo
      </a>

      <main id="content" tabIndex={-1} className="min-h-screen bg-[#fafaf9]">
        <nav
          aria-label="Navegação principal"
          className="fixed top-0 z-40 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-md"
        >
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
            <Link href="/" className="font-bold text-lg gradient-text">
              descomplicai
            </Link>
            <div className="hidden items-center gap-6 text-sm text-slate-600 sm:flex">
              <a href="#work" className="transition-colors hover:text-blue-700">
                Projetos
              </a>
              <a
                href="#services"
                className="transition-colors hover:text-blue-700"
              >
                Serviços
              </a>
              <a
                href="#contact"
                className="transition-colors hover:text-blue-700"
              >
                Contacto
              </a>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-500/15 transition-all hover:bg-blue-700 hover:shadow-blue-500/25"
            >
              Falar connosco
            </a>
          </div>
        </nav>

        <section className="relative overflow-hidden px-6 pb-16 pt-28 text-center sm:pt-24">
          <FloatingEl delay={0} duration={5} className="left-[8%] top-28 opacity-30">
            <div className="h-48 w-48 rounded-full bg-gradient-to-br from-blue-300 to-indigo-300 blur-3xl" />
          </FloatingEl>
          <FloatingEl delay={1.5} duration={6} className="right-[14%] top-36 opacity-20">
            <div className="h-56 w-56 rounded-full bg-gradient-to-br from-violet-300 to-pink-300 blur-3xl" />
          </FloatingEl>
          <FloatingEl delay={3} duration={7} className="bottom-16 left-[28%] opacity-20">
            <div className="h-40 w-40 rounded-full bg-gradient-to-br from-cyan-300 to-blue-300 blur-3xl" />
          </FloatingEl>
          <FloatingEl delay={0.5} duration={3.5} className="right-[22%] top-40 hidden lg:block">
            <div className="rounded-xl border border-slate-100 bg-white/90 p-3 shadow-md backdrop-blur-sm">
              <Code2 className="h-6 w-6 text-blue-600" />
            </div>
          </FloatingEl>
          <FloatingEl delay={1.5} duration={4.5} className="left-[12%] top-[34%] hidden lg:block">
            <div className="rounded-xl border border-slate-100 bg-white/90 p-3 shadow-md backdrop-blur-sm">
              <Palette className="h-6 w-6 text-violet-600" />
            </div>
          </FloatingEl>
          <FloatingEl delay={2.5} duration={5.5} className="bottom-[22%] right-[10%] hidden lg:block">
            <div className="rounded-xl border border-slate-100 bg-white/90 p-3 shadow-md backdrop-blur-sm">
              <Rocket className="h-6 w-6 text-pink-600" />
            </div>
          </FloatingEl>

          <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-5xl flex-col items-center justify-center">
            <div
              className="animate-fade-in-up rounded-full border border-slate-200 bg-white/85 px-4 py-1.5 text-sm text-slate-700 shadow-sm backdrop-blur-sm"
              style={{ animationDelay: "40ms" }}
            >
              <span className="inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                IA sem complexidade. Trabalho real, visível e entregue.
              </span>
            </div>

            <h1
              className="animate-fade-in-up mt-8 text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
              style={{ animationDelay: "120ms" }}
            >
              Websites, apps e IA
              <br />
              <span className="gradient-text">para negócios sem ruído</span>
            </h1>

            <p
              className="animate-fade-in-up mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-600 sm:text-xl"
              style={{ animationDelay: "220ms" }}
            >
              Criamos presença digital, experiências interativas e automações
              para restauração, saúde, vinho e serviços locais. Tudo com foco
              em clareza, velocidade e uma presença que o cliente percebe logo.
            </p>

            <ul
              className="animate-fade-in-up mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-2"
              style={{ animationDelay: "280ms" }}
              aria-label="Setores com trabalho publicado"
            >
              {sectorTags.map((sector) => (
                <li key={sector}>
                  <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm backdrop-blur-sm">
                    {sector}
                  </span>
                </li>
              ))}
            </ul>

            <div
              className="animate-fade-in-up mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
              style={{ animationDelay: "340ms" }}
            >
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700 hover:shadow-blue-500/30"
              >
                Explorar projetos
                <ChevronDown className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3 text-sm font-medium text-slate-700 transition-all hover:border-blue-200 hover:text-blue-700"
              >
                Falar connosco
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <ul
              className="animate-fade-in-up mt-16 grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4"
              style={{ animationDelay: "420ms" }}
              aria-label="Prova social e posicionamento"
            >
              {proofPoints.map((point) => (
                <li
                  key={point.label}
                  className="rounded-2xl border border-slate-200/70 bg-white/75 p-4 text-left shadow-sm backdrop-blur-sm"
                >
                  <p className="text-2xl font-bold gradient-text">{point.value}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    {point.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="work"
          data-anchor-section
          aria-labelledby="featured-projects-title"
          className="mx-auto max-w-6xl px-6 py-24"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              id="featured-projects-title"
              eyebrow="Portfolio"
              title="Projetos em destaque"
              description={`Uma seleção rápida para veres o tipo de trabalho que já está publicado. São ${liveProjectCount} projetos ao vivo, distribuídos por ${showcaseCategoryCount} áreas.`}
            />
            <Link
              href="/projetos"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors hover:text-blue-700"
            >
              Ver todos os projetos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <FeaturedProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </ul>
        </section>

        <section
          id="services"
          data-anchor-section
          aria-labelledby="services-title"
          className="mx-auto max-w-6xl px-6 py-24"
        >
          <SectionHeading
            id="services-title"
            eyebrow="Serviços"
            title="Do conceito ao lançamento, sem complicar"
            description="Ajudamos a clarificar a oferta, dar-lhe forma digital e colocar tudo a funcionar com mais ritmo e menos fricção."
          />

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-5">
            {serviceCards.map((card) => (
              <ServiceCard key={card.title} {...card} />
            ))}
          </div>
        </section>

        <section
          id="contact"
          data-anchor-section
          aria-labelledby="contact-title"
          className="mx-auto max-w-6xl px-6 py-24"
        >
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-8 text-center shadow-sm sm:p-16">
            <div className="absolute left-1/2 top-0 h-[200px] w-[400px] -translate-x-1/2 rounded-full bg-blue-500/[0.05] blur-[80px]" />
            <div className="relative z-10 mx-auto max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-600">
                Contacto
              </p>
              <h2
                id="contact-title"
                className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
              >
                Vamos pôr o próximo projeto a mexer?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                Se já tens ideia, marca ou problema para resolver, falamos
                contigo e alinhamos a melhor próxima jogada sem conversa
                circular.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="mailto:equipa@descomplicai.pt"
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700"
                >
                  <Mail className="h-4 w-4" />
                  equipa@descomplicai.pt
                </a>
                <a
                  href="https://wa.me/351934035971"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Abrir conversa no WhatsApp"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3 text-sm font-medium text-slate-700 transition-all hover:border-blue-200 hover:text-blue-700"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-slate-200/70 px-6 py-8 text-center">
          <p className="text-xs text-slate-500">
            &copy; 2026 Descomplicai - IA sem complexidade
          </p>
        </footer>
      </main>
    </>
  );
}
