"use client";

import React from "react";
import { cn } from "@/lib/utils";

type DotGridProps = {
  size?: number;
  dotSize?: number;
  opacity?: number;
  color?: string;
  className?: string;
};

export function DotGrid({
  size = 24,
  dotSize = 1,
  opacity = 0.07,
  color = "rgb(15,23,42)",
  className,
}: DotGridProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        opacity,
        backgroundImage: `radial-gradient(circle, ${color} ${dotSize}px, transparent ${dotSize}px)`,
        backgroundSize: `${size}px ${size}px`,
      }}
      aria-hidden="true"
    />
  );
}
