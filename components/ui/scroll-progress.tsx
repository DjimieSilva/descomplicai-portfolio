"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type ScrollProgressProps = {
  color?: string;
  height?: number;
  className?: string;
  zIndex?: number;
};

export function ScrollProgress({
  color = "linear-gradient(to right, #2563eb, #7c3aed)",
  height = 3,
  className,
  zIndex = 50,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={cn(className)}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height,
        zIndex,
        background: color,
        scaleX,
        transformOrigin: "0%",
      }}
    />
  );
}
