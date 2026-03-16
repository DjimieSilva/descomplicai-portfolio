"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type CursorFollowerProps = {
  size?: number;
  className?: string;
};

const springConfig = { stiffness: 200, damping: 25, mass: 0.5 };

export function CursorFollower({ size = 32, className }: CursorFollowerProps) {
  const [canHover, setCanHover] = useState(false);
  const [visible, setVisible] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    setCanHover(mq.matches);

    const onChange = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!canHover) return;

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleEnter = () => setVisible(true);
    const handleLeave = () => setVisible(false);

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest?.("[data-hover]")) {
        setExpanded(true);
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest?.("[data-hover]")) {
        setExpanded(false);
      }
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseenter", handleEnter);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseenter", handleEnter);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [canHover, cursorX, cursorY]);

  if (!canHover) return null;

  const outerSize = expanded ? size * 1.8 : size;
  const dotSize = 6;

  return (
    <>
      {/* Outer circle — spring-delayed */}
      <motion.div
        className={cn("pointer-events-none fixed top-0 left-0 z-[9999] rounded-full", className)}
        style={{
          x: springX,
          y: springY,
          width: outerSize,
          height: outerSize,
          translateX: "-50%",
          translateY: "-50%",
          background: "white",
          mixBlendMode: "difference",
          opacity: visible ? 1 : 0,
          transition: "width 0.2s, height 0.2s, opacity 0.2s",
        }}
      />

      {/* Inner dot — follows instantly */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          width: dotSize,
          height: dotSize,
          translateX: "-50%",
          translateY: "-50%",
          background: "white",
          mixBlendMode: "difference",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.2s",
        }}
      />
    </>
  );
}
