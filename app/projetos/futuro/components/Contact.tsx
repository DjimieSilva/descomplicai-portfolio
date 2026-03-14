"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, MessageSquare, ArrowUpRight } from "lucide-react";

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const shape1Y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const shape2Y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      id="contacto"
      ref={ref}
      className="relative overflow-hidden px-6 py-32 md:py-44"
    >
      <motion.div
        style={{ y: shape1Y, background: "rgba(37,99,235,0.07)" }}
        className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full blur-[180px]"
      />
      <motion.div
        style={{ y: shape2Y, background: "rgba(124,58,237,0.06)" }}
        className="absolute -right-20 bottom-0 h-[400px] w-[400px] rounded-full blur-[150px]"
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span
            className="font-mono text-[11px] uppercase tracking-[0.2em]"
            style={{ color: "var(--accent)" }}
          >
            04 — Contacto
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 text-5xl font-bold leading-tight tracking-tight md:text-7xl lg:text-8xl"
          style={{ color: "var(--text-primary)" }}
        >
          Vamos <span className="gradient-text">construir</span>
          <br />
          algo juntos?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-14 max-w-lg text-lg leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          Projetos de AI, automacao, ou web. Se tens uma ideia, provavelmente
          consigo construi-la.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <a
            href="mailto:jaime@example.com"
            className="group inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:shadow-[0_0_60px_-8px_rgba(37,99,235,0.5)]"
            style={{ background: "var(--accent)" }}
          >
            <Mail className="h-4 w-4" />
            Envia um Email
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <a
            href="https://t.me/jaimessilva"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border px-8 py-4 text-sm font-medium transition-all duration-300 hover:text-[#2563eb]"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-secondary)",
              background: "rgba(255,255,255,0.5)",
              backdropFilter: "blur(8px)",
            }}
          >
            <MessageSquare className="h-4 w-4" />
            Fala no Telegram
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-32 border-t pt-8"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <span
              className="font-mono text-[11px]"
              style={{ color: "var(--text-muted)" }}
            >
              Jaime Silva &copy; 2026
            </span>
            <span
              className="font-mono text-[11px]"
              style={{ color: "var(--text-muted)" }}
            >
              Next.js &middot; Tailwind &middot; Framer Motion
            </span>
            <span
              className="font-mono text-[11px]"
              style={{ color: "var(--text-muted)" }}
            >
              Fuzeta, Algarve
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
