"use client";

import React from "react";
import { cn } from "@/lib/utils";

type GrainOverlayProps = {
  opacity?: number;
  className?: string;
};

export function GrainOverlay({ opacity = 0.015, className }: GrainOverlayProps) {
  return (
    <div
      className={cn("pointer-events-none fixed inset-0", className)}
      style={{
        zIndex: 9999,
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
      }}
      aria-hidden="true"
    />
  );
}
