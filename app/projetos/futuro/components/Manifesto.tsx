"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, Zap, Brain, Code, Globe, Shield } from "lucide-react";
import { Spotlight } from "./ui/spotlight";

const values = [
  {
    icon: Heart,
    title: "Humanos Primeiro",
    description: "A tecnologia serve as pessoas, nunca o contrario.",
    color: "blue",
  },
  {
    icon: Zap,
    title: "Good Enough Now",
    description: "Good enough now > perfect later. Velocidade com proposito.",
    color: "purple",
  },
  {
    icon: Brain,
    title: "Jack of All Trades",
    description: "Versatilidade como superpoder. Solucionador, nao especialista.",
    color: "blue",
  },
];

const skills = [
  { icon: Code, label: "React / Next.js / TypeScript" },
  { icon: Brain, label: "AI Agents & Orchestration" },
  { icon: Globe, label: "Infra: Docker, VPS, Systemd" },
  { icon: Shield, label: "Memory & Vector Search" },
];

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const shape1Y = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const shape2Y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="manifesto"
      ref={ref}
      className="relative overflow-hidden px-6 py-32 md:py-44"
    >
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -z-10 dot-grid opacity-25"
      />

      <motion.div
        style={{ y: shape1Y, background: "rgba(37,99,235,0.06)" }}
        className="absolute -right-32 top-20 h-[500px] w-[500px] rounded-full blur-[120px]"
      />
      <motion.div
        style={{ y: shape2Y, background: "rgba(124,58,237,0.05)" }}
        className="absolute -left-32 bottom-20 h-[400px] w-[400px] rounded-full blur-[100px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span
            className="font-mono text-[11px] uppercase tracking-[0.2em]"
            style={{ color: "var(--accent)" }}
          >
            01 — Identidade
          </span>
          <h2
            className="mt-4 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl"
            style={{ color: "var(--text-primary)" }}
          >
            Builder por natureza.
          </h2>
          <p
            className="mt-6 max-w-xl text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            24 anos, Algarve. MSc Computer Science pelo IST. Construo desde apps
            a ecossistemas inteiros de AI.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="flex flex-col justify-between gap-10">
            <motion.blockquote
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl font-light italic leading-snug md:text-4xl"
              style={{ color: "var(--text-muted)" }}
            >
              &ldquo;Keep building.{" "}
              <span className="gradient-text not-italic font-semibold">
                Share Love.
              </span>
              &rdquo;
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-2xl border p-6"
              style={{
                borderColor: "var(--border)",
                background: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              <p
                className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em]"
                style={{ color: "var(--text-muted)" }}
              >
                Stack
              </p>
              <div className="flex flex-col gap-4">
                {skills.map((skill) => (
                  <div key={skill.label} className="flex items-center gap-3">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-lg"
                      style={{ background: "var(--accent-dim)" }}
                    >
                      <skill.icon
                        className="h-3.5 w-3.5"
                        style={{ color: "var(--accent)" }}
                      />
                    </div>
                    <span
                      className="font-mono text-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {skill.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col gap-4">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(37,99,235,0.08)]"
                style={{
                  borderColor: "var(--border)",
                  background: "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                }}
              >
                <Spotlight
                  size={200}
                  className={
                    value.color === "purple"
                      ? "from-purple-200 via-purple-300 to-purple-400"
                      : "from-blue-200 via-blue-300 to-blue-400"
                  }
                />
                <div className="relative z-10 flex items-start gap-4">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      background:
                        value.color === "purple"
                          ? "var(--secondary-dim)"
                          : "var(--accent-dim)",
                    }}
                  >
                    <value.icon
                      className="h-5 w-5"
                      style={{
                        color:
                          value.color === "purple"
                            ? "var(--secondary)"
                            : "var(--accent)",
                      }}
                    />
                  </div>
                  <div>
                    <h3
                      className="mb-1.5 font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {value.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
