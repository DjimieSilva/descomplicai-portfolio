"use client";

import { motion } from "framer-motion";
import {
  Sprout,
  TrendingUp,
  Leaf,
  Shield,
  Eye,
  Heart,
  ChevronDown,
  ArrowRight,
  Coins,
  BarChart3,
  Target,
  Clock,
} from "lucide-react";

/* ─── Constants ─── */

const EMERALD = "#059669";
const DARK_GREEN = "#064e3b";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" as const },
  }),
};

const STEPS = [
  {
    icon: Sprout,
    title: "Planta",
    description:
      "Comeca com apenas 1\u20AC. Escolhe onde investir e planta a tua primeira semente financeira.",
    step: "01",
  },
  {
    icon: TrendingUp,
    title: "Cresce",
    description:
      "Acompanha o crescimento do teu investimento em tempo real. Sem surpresas, sem letras pequenas.",
    step: "02",
  },
  {
    icon: Leaf,
    title: "Colhe",
    description:
      "Levanta os teus ganhos quando quiseres. Sem taxas escondidas, sem periodos de bloqueio.",
    step: "03",
  },
];

const FEATURES = [
  {
    icon: Coins,
    title: "Acessivel",
    description:
      "Investimentos a partir de 1\u20AC. Sem montantes minimos absurdos. Porque todos merecem fazer o dinheiro crescer.",
    gradient: "from-emerald-400 to-green-500",
  },
  {
    icon: Eye,
    title: "Transparente",
    description:
      "Zero taxas escondidas. Ve exatamente para onde vai cada centimo. Relatorios claros e em linguagem simples.",
    gradient: "from-green-400 to-teal-500",
  },
  {
    icon: Heart,
    title: "Sustentavel",
    description:
      "Investe em projetos com impacto positivo. O teu dinheiro cresce enquanto ajuda o planeta a respirar.",
    gradient: "from-teal-400 to-emerald-500",
  },
  {
    icon: Shield,
    title: "Seguro",
    description:
      "Regulado pelo Banco de Portugal. Os teus investimentos estao protegidos com as melhores praticas de seguranca.",
    gradient: "from-emerald-500 to-green-600",
  },
  {
    icon: BarChart3,
    title: "Inteligente",
    description:
      "Algoritmos que aprendem contigo. Sugestoes personalizadas baseadas nos teus objetivos e perfil de risco.",
    gradient: "from-green-500 to-teal-600",
  },
  {
    icon: Target,
    title: "Com Proposito",
    description:
      "Define objetivos claros — uma viagem, um curso, um fundo de emergencia. Acompanha o progresso visualmente.",
    gradient: "from-teal-500 to-emerald-600",
  },
];

/* ─── Leaf SVG Divider ─── */

function LeafDivider() {
  return (
    <div className="w-full overflow-hidden leading-none">
      <svg
        viewBox="0 0 1440 120"
        className="relative block w-full"
        preserveAspectRatio="none"
        style={{ height: "60px" }}
      >
        <path
          d="M0,40 C240,100 480,0 720,60 C960,120 1200,20 1440,80 L1440,120 L0,120 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

/* ─── Floating Seed Particle ─── */

function FloatingSeed({
  className,
  delay = 0,
  duration = 6,
}: {
  className: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={`absolute rounded-full opacity-20 ${className}`}
      style={{
        background:
          "radial-gradient(circle, rgba(16, 185, 129, 0.6), transparent)",
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

/* ─── Page ─── */

export default function SeedsPage() {
  return (
    <main className="min-h-screen bg-[#f0fdf4] selection:bg-emerald-200">
      {/* ── Hero ── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        {/* Background gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(145deg, ${DARK_GREEN} 0%, #065f46 25%, ${EMERALD} 55%, #10b981 85%, #34d399 100%)`,
          }}
        />

        {/* Animated background elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <FloatingSeed className="h-96 w-96 -left-20 -top-20" duration={8} />
          <FloatingSeed
            className="h-[500px] w-[500px] -bottom-32 -right-20"
            delay={2}
            duration={10}
          />
          <FloatingSeed
            className="h-72 w-72 left-1/3 top-1/4"
            delay={1}
            duration={7}
          />
          <FloatingSeed
            className="h-48 w-48 right-1/4 bottom-1/3"
            delay={3}
            duration={9}
          />
        </div>

        {/* Floating decorative emojis */}
        <motion.span
          className="absolute left-[8%] top-[18%] select-none text-5xl opacity-60"
          animate={{ y: [0, -20, 0], rotate: [0, 10, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          🌱
        </motion.span>
        <motion.span
          className="absolute right-[10%] top-[22%] select-none text-4xl opacity-50"
          animate={{ y: [0, -15, 0], rotate: [0, -8, 5, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          🌿
        </motion.span>
        <motion.span
          className="absolute bottom-[28%] left-[12%] select-none text-4xl opacity-50"
          animate={{ y: [0, -18, 0], rotate: [0, 12, -6, 0] }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          🍀
        </motion.span>
        <motion.span
          className="absolute bottom-[22%] right-[8%] select-none text-5xl opacity-60"
          animate={{ y: [0, -22, 0], rotate: [0, -10, 8, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        >
          🌳
        </motion.span>

        {/* Hero content */}
        <div className="relative z-10 mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-emerald-100 backdrop-blur-sm"
          >
            <Sprout className="h-4 w-4" />
            Microinvestimentos com Proposito
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="mb-2 text-6xl font-extrabold tracking-tight text-white md:text-8xl">
              Seeds
              <span className="ml-3 inline-block animate-bounce text-5xl md:text-7xl">
                🌱
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mx-auto mb-4 max-w-2xl text-2xl font-light leading-relaxed text-emerald-100/90 md:text-3xl"
          >
            Plantar sementes financeiras
            <br />
            <span className="font-semibold text-white">
              que crescem contigo.
            </span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mx-auto mb-10 max-w-xl text-base text-emerald-200/70 md:text-lg"
          >
            A plataforma de microinvestimentos que torna o investimento
            acessivel, transparente e sustentavel. A partir de 1&#8364;.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <a
              href="#como-funciona"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-emerald-800 shadow-lg shadow-emerald-900/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-emerald-900/40"
            >
              Saber Mais
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#brevemente"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/10"
            >
              <Clock className="h-4 w-4" />
              Brevemente
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-6 w-6 text-white/50" />
        </motion.div>

        {/* Wave divider */}
        <div className="absolute inset-x-0 bottom-0 text-[#f0fdf4]">
          <LeafDivider />
        </div>
      </section>

      {/* ── How it Works ── */}
      <section
        id="como-funciona"
        className="relative bg-[#f0fdf4] px-6 py-24"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-16 text-center"
          >
            <span className="mb-3 inline-block text-sm font-bold uppercase tracking-widest text-emerald-600">
              Como Funciona
            </span>
            <h2 className="text-4xl font-bold text-neutral-900 md:text-5xl">
              Simples como plantar uma{" "}
              <span className="text-emerald-600">semente</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-neutral-500">
              Tres passos. Sem complicacoes. Sem burocracia. O teu dinheiro a
              crescer enquanto vives a tua vida.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  variants={fadeUp}
                  className="group relative"
                >
                  {/* Connector line between steps */}
                  {i < STEPS.length - 1 && (
                    <div className="absolute right-0 top-1/2 hidden h-px w-8 translate-x-full bg-gradient-to-r from-emerald-300 to-transparent md:block" />
                  )}

                  <div className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-white/70 p-8 backdrop-blur-sm transition-all duration-300 hover:border-emerald-200 hover:bg-white hover:shadow-xl hover:shadow-emerald-100/50">
                    {/* Step number */}
                    <span className="absolute right-6 top-6 text-6xl font-black text-emerald-50 transition-colors group-hover:text-emerald-100">
                      {step.step}
                    </span>

                    <div className="relative z-10">
                      <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-7 w-7 text-emerald-600" />
                      </div>
                      <h3 className="mb-3 text-2xl font-bold text-neutral-900">
                        {step.title}
                      </h3>
                      <p className="leading-relaxed text-neutral-500">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Stats Band ── */}
      <section
        className="relative overflow-hidden px-6 py-20"
        style={{
          background: `linear-gradient(135deg, ${DARK_GREEN}, ${EMERALD})`,
        }}
      >
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute -right-20 -top-20 h-60 w-60 rounded-full opacity-10"
            style={{
              background: "radial-gradient(circle, #34d399, transparent)",
            }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full opacity-10"
            style={{
              background: "radial-gradient(circle, #6ee7b7, transparent)",
            }}
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 mx-auto grid max-w-5xl grid-cols-2 gap-10 md:grid-cols-4">
          {[
            { value: "1\u20AC", label: "Investimento Minimo" },
            { value: "0%", label: "Taxas Escondidas" },
            { value: "24/7", label: "Acesso ao Teu Dinheiro" },
            { value: "100%", label: "Transparente" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-extrabold text-white md:text-5xl">
                {stat.value}
              </div>
              <p className="mt-2 text-sm font-medium text-emerald-200/80">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="funcionalidades" className="bg-white px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-16 text-center"
          >
            <span className="mb-3 inline-block text-sm font-bold uppercase tracking-widest text-emerald-600">
              Funcionalidades
            </span>
            <h2 className="text-4xl font-bold text-neutral-900 md:text-5xl">
              Investir nunca foi tao{" "}
              <span className="text-emerald-600">simples</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-neutral-500">
              Desenhado para quem acredita que o futuro financeiro se constroi
              com pequenos passos consistentes.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  variants={fadeUp}
                  className="group relative overflow-hidden rounded-3xl border border-neutral-100 bg-neutral-50/50 p-8 transition-all duration-300 hover:border-emerald-200 hover:bg-white hover:shadow-xl hover:shadow-emerald-50"
                >
                  {/* Glassmorphism hover effect */}
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-100 to-green-50 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60" />

                  <div className="relative z-10">
                    <div
                      className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-neutral-900">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-neutral-500">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Quote / Philosophy ── */}
      <section className="relative overflow-hidden bg-[#f0fdf4] px-6 py-24">
        <div className="pointer-events-none absolute inset-0">
          <FloatingSeed
            className="left-[5%] top-[10%] h-64 w-64"
            delay={1}
            duration={9}
          />
          <FloatingSeed
            className="bottom-[15%] right-[10%] h-48 w-48"
            delay={2}
            duration={7}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 mx-auto max-w-3xl text-center"
        >
          <span className="mb-6 inline-block text-6xl">🌱</span>
          <blockquote className="text-3xl font-light leading-relaxed text-neutral-800 md:text-4xl">
            &ldquo;Grandes fortunas comecaram com{" "}
            <span className="font-bold text-emerald-600">
              pequenas sementes.
            </span>
            &rdquo;
          </blockquote>
          <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
          <p className="mt-4 text-sm text-neutral-400">Filosofia Seeds</p>
        </motion.div>
      </section>

      {/* ── CTA / Coming Soon ── */}
      <section
        id="brevemente"
        className="relative overflow-hidden px-6 py-28"
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(145deg, ${DARK_GREEN} 0%, #065f46 40%, ${EMERALD} 100%)`,
          }}
        />

        {/* Animated bg elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute left-[10%] top-[10%] h-64 w-64 rounded-full opacity-10"
            style={{
              background: "radial-gradient(circle, #34d399, transparent)",
            }}
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 7, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-[5%] right-[5%] h-80 w-80 rounded-full opacity-10"
            style={{
              background: "radial-gradient(circle, #6ee7b7, transparent)",
            }}
            animate={{ scale: [1.3, 1, 1.3] }}
            transition={{ duration: 9, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-6 inline-block text-7xl"
          >
            🌱
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-5 py-2 text-sm font-medium text-emerald-200 backdrop-blur-sm"
          >
            <Clock className="h-4 w-4" />
            Em Desenvolvimento
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-extrabold text-white md:text-6xl"
          >
            Brevemente
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-lg text-emerald-100/80"
          >
            Estamos a preparar o solo para que possas plantar as tuas primeiras
            sementes. Uma plataforma pensada para tornar o investimento
            acessivel a todos os portugueses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-10 flex flex-col items-center gap-4"
          >
            <div className="flex flex-wrap items-center justify-center gap-4">
              {["Microinvestimentos", "Impacto Social", "Open Source"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-emerald-100 backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-neutral-950 px-6 py-12 text-neutral-400">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center gap-6 text-center">
            {/* Brand */}
            <div>
              <h3 className="flex items-center justify-center gap-2 text-2xl font-bold text-white">
                <Sprout className="h-6 w-6 text-emerald-400" />
                Seeds
              </h3>
              <p className="mt-2 text-sm text-neutral-500">
                Microinvestimentos com Proposito
              </p>
            </div>

            {/* Divider */}
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />

            {/* Bottom */}
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs text-neutral-600">
                &copy; {new Date().getFullYear()} Seeds. Todos os direitos
                reservados.
              </p>
              <p className="text-xs text-neutral-700">
                Feito com 🌱 em Portugal
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
