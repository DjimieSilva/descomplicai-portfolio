"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  blur?: number;
  as?: "div" | "article" | "section";
} & Omit<HTMLMotionProps<"div">, "as">;

export function GlassCard({
  children,
  className,
  hover = true,
  blur = 20,
  as: Tag = "div",
  ...props
}: GlassCardProps) {
  const Component = motion.create(Tag);

  return (
    <Component
      className={cn(
        "rounded-2xl p-6 transition-colors duration-300",
        className
      )}
      style={{
        backdropFilter: `blur(${blur}px) saturate(180%)`,
        WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
        background: "rgba(255,255,255,0.6)",
        border: "1px solid rgba(15,23,42,0.06)",
      }}
      whileHover={
        hover
          ? {
              y: -4,
              background: "rgba(255,255,255,0.75)",
              borderColor: "rgba(59,130,246,0.12)",
              boxShadow:
                "0 20px 40px -12px rgba(15,23,42,0.1), 0 4px 12px -2px rgba(15,23,42,0.05)",
            }
          : undefined
      }
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      {...props}
    >
      {children}
    </Component>
  );
}
