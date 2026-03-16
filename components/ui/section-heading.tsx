"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  dark?: boolean;
  align?: "center" | "left";
  animate?: boolean;
  className?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  dark = false,
  align = "center",
  animate = true,
  className,
}: SectionHeadingProps) {
  const Wrapper = animate ? motion.div : "div";

  const motionProps = animate
    ? {
        initial: { opacity: 0, y: 30 } as const,
        whileInView: { opacity: 1, y: 0 } as const,
        viewport: { once: true, margin: "-80px" as const },
        transition: { duration: 0.6 },
      }
    : {};

  return (
    <Wrapper
      {...motionProps}
      className={cn(
        "mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {label && (
        <span
          className="font-mono text-[11px] uppercase tracking-[0.2em]"
          style={{ color: dark ? "rgba(255,255,255,0.5)" : "var(--accent, #3b82f6)" }}
        >
          {label}
        </span>
      )}
      <h2
        className="mt-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
        style={{ color: dark ? "#ffffff" : "var(--text-primary, #0a0a0a)" }}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 max-w-2xl text-lg leading-relaxed",
            align === "center" && "mx-auto"
          )}
          style={{
            color: dark ? "rgba(255,255,255,0.6)" : "var(--text-secondary, #6b7280)",
          }}
        >
          {description}
        </p>
      )}
    </Wrapper>
  );
}
