"use client";

import React, { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

type GlowCardProps = {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  as?: "div" | "article";
} & React.HTMLAttributes<HTMLElement>;

export function GlowCard({
  children,
  className,
  glowColor = "rgba(37,99,235,0.15)",
  as: Tag = "div",
  ...props
}: GlowCardProps) {
  const [hovered, setHovered] = useState(false);

  const onEnter = useCallback(() => setHovered(true), []);
  const onLeave = useCallback(() => setHovered(false), []);

  return (
    <Tag
      className={cn(
        "relative p-6",
        className
      )}
      style={{
        borderRadius: "var(--ds-radius-md, 1rem)",
        border: "1px solid",
        borderColor: hovered ? glowColor : "rgba(15,23,42,0.08)",
        boxShadow: hovered
          ? `0 0 60px ${glowColor}, 0 0 20px ${glowColor}`
          : "none",
        transition: "box-shadow 0.35s ease, border-color 0.35s ease",
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      {...props}
    >
      {children}
    </Tag>
  );
}
