"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Bot,
  BarChart3,
  Mail,
  Globe,
  Sparkles,
  Palette,
  ExternalLink,
} from "lucide-react";
import { SectionHeading } from "./ui/section-heading";
import { Spotlight } from "./ui/spotlight";

interface Project {
  title: string;
  description: string;
  tags: string[];
  icon: React.ElementType;
  gradient: string;
  span: string;
}

const projects: Project[] = [
  {
    title: "MYLO Experience",
    description:
      "Showcase interativo do assistente AI pessoal. React 19 + Three.js + Framer Motion.",
    tags: ["React 19", "Three.js", "AI"],
    icon: Bot,
    gradient: "from-blue-500/15 to-indigo-500/10",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Pitch Hub",
    description:
      "9 paginas demo para clientes. Cada uma personalizada para o prospect.",
    tags: ["HTML/CSS/JS", "Sales", "Demo"],
    icon: BarChart3,
    gradient: "from-violet-500/15 to-purple-500/10",
    span: "md:col-span-1",
  },
  {
    title: "Email Engine",
    description:
      "Templates MJML + Brevo. Automacao de emails para outreach.",
    tags: ["MJML", "Brevo", "Node.js"],
    icon: Mail,
    gradient: "from-cyan-500/15 to-blue-500/10",
    span: "md:col-span-1",
  },
  {
    title: "CRM Dashboard",
    description:
      "Pipeline de vendas para municipios. Lead tracking, deals, follow-ups automaticos.",
    tags: ["FastAPI", "Pipeline", "CRM"],
    icon: BarChart3,
    gradient: "from-emerald-500/15 to-green-500/10",
    span: "md:col-span-1",
  },
  {
    title: "Integration Hub",
    description:
      "Dashboard central + API REST. Orquestra 30+ agentes, task queue, memory search.",
    tags: ["Node.js", "Zero Deps", "API"],
    icon: Globe,
    gradient: "from-blue-500/15 to-sky-500/10",
    span: "md:col-span-1",
  },
  {
    title: "Chrysaid & Promethea",
    description:
      "AI charity livestream com personagens 3D. Kokoro TTS, Live2D, OBS integration.",
    tags: ["Next.js", "TTS", "Streaming"],
    icon: Sparkles,
    gradient: "from-rose-500/15 to-pink-500/10",
    span: "md:col-span-2",
  },
  {
    title: "Descomplicai",
    description:
      "Website institucional. Next.js 16, React 19, Tailwind 4, Framer Motion. Phase 1 completa.",
    tags: ["Next.js 16", "Tailwind 4", "Framer Motion"],
    icon: Palette,
    gradient: "from-indigo-500/15 to-violet-500/10",
    span: "md:col-span-2",
  },
];

export function Projects() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const shape1Y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      id="projetos"
      ref={ref}
      className="relative overflow-hidden px-6 py-32 md:py-44"
    >
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -z-10 dot-grid opacity-20"
      />

      <motion.div
        style={{ y: shape1Y, background: "rgba(37,99,235,0.05)" }}
        className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full blur-[150px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading
          label="03 — Arsenal"
          title="15 apps em 10 dias."
          description="Velocidade com proposito. Cada projeto resolve um problema real."
        />

        <div className="grid auto-rows-[minmax(260px,auto)] gap-4 md:grid-cols-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 hover:shadow-[0_12px_40px_rgba(37,99,235,0.1)] ${project.span}`}
              style={{
                borderColor: "var(--border)",
                background: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              <Spotlight
                size={350}
                className="from-blue-100 via-blue-200 to-indigo-200"
              />

              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
              />

              <div className="relative z-10 flex h-full flex-col justify-between p-8">
                <div>
                  <div className="mb-6 flex items-start justify-between">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{ background: "var(--accent-dim)" }}
                    >
                      <project.icon
                        className="h-5 w-5 transition-colors duration-300"
                        style={{ color: "var(--accent)" }}
                      />
                    </div>
                    <ExternalLink
                      className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:opacity-100"
                      style={{ color: "var(--text-muted)" }}
                    />
                  </div>
                  <h3
                    className="mb-3 text-lg font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border px-3 py-1 font-mono text-[10px] transition-colors duration-300"
                      style={{
                        borderColor: "var(--border)",
                        background: "rgba(255,255,255,0.6)",
                        color: "var(--text-muted)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
