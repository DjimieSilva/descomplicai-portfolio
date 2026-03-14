"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { BlurText } from "./ui/blur-text";
import { SplineScene } from "./ui/splite";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 mesh-gradient" />
        <div className="absolute inset-0 dot-grid opacity-40" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.12, scale: 1 }}
        transition={{ duration: 3 }}
        className="absolute top-10 -left-20 h-[500px] w-[500px] rounded-full blur-[180px]"
        style={{ background: "var(--accent)" }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.08, scale: 1 }}
        transition={{ duration: 3, delay: 0.4 }}
        className="absolute -bottom-20 -right-20 h-[600px] w-[600px] rounded-full blur-[200px]"
        style={{ background: "var(--secondary)" }}
      />

      {/* 3D Spline scene */}
      <div className="absolute inset-0 z-0 opacity-60">
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <span
            className="inline-flex items-center gap-2.5 rounded-full border px-5 py-2 font-mono text-xs"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-secondary)",
              background: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full animate-pulse"
              style={{ background: "var(--accent)" }}
            />
            Builder &middot; AI Architect &middot; 24
          </span>
        </motion.div>

        <div className="space-y-1">
          <BlurText
            text="JAIME"
            delay={80}
            animateBy="letters"
            direction="top"
            className="justify-center text-[clamp(4.5rem,14vw,11rem)] font-bold leading-[0.9] tracking-tighter"
          />
          <BlurText
            text="SILVA"
            delay={80}
            animateBy="letters"
            direction="bottom"
            gradient
            className="justify-center text-[clamp(4.5rem,14vw,11rem)] font-bold leading-[0.9] tracking-tighter"
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mx-auto mt-10 max-w-md font-mono text-sm leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          Construo sistemas de AI que libertam pessoas
          <br />
          para focarem no que realmente importa.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="mt-12 flex items-center justify-center gap-4"
        >
          <a
            href="#projetos"
            className="rounded-full px-7 py-3 text-sm font-medium text-white transition-all duration-300 hover:shadow-[0_0_40px_-5px_rgba(37,99,235,0.5)]"
            style={{ background: "var(--accent)" }}
          >
            Ver Projetos
          </a>
          <a
            href="#manifesto"
            className="rounded-full border px-7 py-3 text-sm font-medium transition-all duration-300 hover:text-[#2563eb]"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-secondary)",
              background: "rgba(255,255,255,0.5)",
              backdropFilter: "blur(8px)",
            }}
          >
            Quem Sou
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown
            className="h-5 w-5"
            style={{ color: "var(--text-muted)" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
