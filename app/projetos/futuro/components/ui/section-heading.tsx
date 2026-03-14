"use client";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  dark?: boolean;
  align?: "left" | "center";
}

export function SectionHeading({
  label,
  title,
  description,
  dark = false,
  align = "left",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${align === "center" ? "text-center" : ""}`}
    >
      <span
        className="font-mono text-[11px] uppercase tracking-[0.2em]"
        style={{ color: "var(--accent)" }}
      >
        {label}
      </span>
      <h2
        className="mt-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
        style={{ color: dark ? "#ffffff" : "var(--text-primary)" }}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 max-w-2xl text-lg leading-relaxed ${align === "center" ? "mx-auto" : ""}`}
          style={{
            color: dark ? "rgba(255,255,255,0.6)" : "var(--text-secondary)",
          }}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
