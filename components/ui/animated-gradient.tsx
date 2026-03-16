"use client";

import React from "react";
import { cn } from "@/lib/utils";

type AnimatedGradientProps = {
  colors?: [string, string, string];
  className?: string;
  animate?: boolean;
};

export function AnimatedGradient({
  colors = ["#3b82f6", "#8b5cf6", "#06b6d4"],
  className,
  animate = true,
}: AnimatedGradientProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0",
        animate && "animate-[mesh-shift_20s_ease-in-out_infinite]",
        className
      )}
      style={{
        opacity: 0.06,
        backgroundImage: [
          `radial-gradient(ellipse at 20% 50%, ${colors[0]}, transparent 60%)`,
          `radial-gradient(ellipse at 80% 20%, ${colors[1]}, transparent 60%)`,
          `radial-gradient(ellipse at 50% 80%, ${colors[2]}, transparent 60%)`,
        ].join(", "),
        backgroundSize: "200% 200%",
      }}
      aria-hidden="true"
    />
  );
}
