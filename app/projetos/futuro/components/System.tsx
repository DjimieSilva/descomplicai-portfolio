"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Bot,
  Database,
  MessageSquare,
  Activity,
  Cpu,
  Network,
  Brain,
} from "lucide-react";
import { SectionHeading } from "./ui/section-heading";
import { AnimatedCounter } from "./ui/animated-counter";
import {
  RadialOrbitalTimeline,
  type TimelineItem,
} from "./ui/radial-orbital-timeline";

const stats = [
  { value: 30, suffix: "+", label: "AI Agents", icon: Bot },
  { value: 177, suffix: "", label: "Obsidian Notes", icon: Database },
  { value: 15, suffix: "", label: "Apps em 10 Dias", icon: Cpu },
  { value: 9, suffix: "", label: "Real-time Hooks", icon: Activity },
];

const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "MYLO",
    date: "24/7",
    content:
      "AI pessoal no Telegram. Claude Opus com memoria persistente e 9 hooks em tempo real.",
    category: "Core",
    icon: MessageSquare,
    relatedIds: [3, 4],
    status: "completed",
    energy: 95,
  },
  {
    id: 2,
    title: "Claude Code",
    date: "Daily",
    content:
      "CLI que constroi, deploya, executa. Projetos grandes, codigo, sistemas inteiros.",
    category: "Builder",
    icon: Cpu,
    relatedIds: [4],
    status: "completed",
    energy: 90,
  },
  {
    id: 3,
    title: "Memory API",
    date: "Active",
    content:
      "ChromaDB + embeddings + graph. Busca semantica, clusters, pulse de vitalidade.",
    category: "Knowledge",
    icon: Database,
    relatedIds: [1, 4, 5],
    status: "in-progress",
    energy: 75,
  },
  {
    id: 4,
    title: "Hub",
    date: "24/7",
    content:
      "Task queue, API REST, dashboard. Orquestra tudo entre MYLO, Claude Code e 30+ agentes.",
    category: "Infra",
    icon: Network,
    relatedIds: [1, 2, 3],
    status: "completed",
    energy: 85,
  },
  {
    id: 5,
    title: "Brain",
    date: "Growing",
    content:
      "177+ notas interligadas. Knowledge graph pessoal, templates, e daily reviews.",
    category: "Knowledge",
    icon: Brain,
    relatedIds: [3],
    status: "in-progress",
    energy: 70,
  },
  {
    id: 6,
    title: "Infra",
    date: "24/7",
    content:
      "2 VPS Hetzner. Docker, Systemd, Tailscale VPN. Infra de producao sempre ativa.",
    category: "Infra",
    icon: Activity,
    relatedIds: [1, 4],
    status: "completed",
    energy: 88,
  },
];

export function System() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const shape1Y = useTransform(scrollYProgress, [0, 1], [140, -140]);
  const shape2Y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      id="sistema"
      ref={ref}
      className="relative overflow-hidden bg-slate-900 px-6 py-32 md:py-44"
    >
      <motion.div
        style={{ y: shape1Y }}
        className="absolute -right-40 top-20 h-[600px] w-[600px] rounded-full bg-blue-600/[0.08] blur-[150px]"
      />
      <motion.div
        style={{ y: shape2Y }}
        className="absolute -left-40 bottom-20 h-[500px] w-[500px] rounded-full bg-violet-600/[0.07] blur-[130px]"
      />

      <div className="pointer-events-none absolute right-0 top-0 select-none font-bold text-[20rem] leading-none text-white/[0.02]">
        02
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading
          dark
          label="02 — O Sistema"
          title="AI pessoal, operacional."
          description="Um ecossistema completo de AI que gere, coordena, lembra e executa."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex flex-wrap gap-3"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3"
            >
              <stat.icon
                className="h-4 w-4"
                style={{ color: "var(--accent)" }}
              />
              <span className="text-2xl font-bold text-white">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  duration={1500}
                />
              </span>
              <span className="font-mono text-[11px] text-white/40">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-12 overflow-hidden rounded-3xl border border-white/10"
        >
          <RadialOrbitalTimeline timelineData={timelineData} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 py-4"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
          </span>
          <span className="font-mono text-[11px] text-white/50">
            Sistema operacional 24/7 &middot; VPS1 Hetzner &middot; 2 CPU, 8GB
            RAM &middot; Tailscale VPN
          </span>
        </motion.div>
      </div>
    </section>
  );
}
