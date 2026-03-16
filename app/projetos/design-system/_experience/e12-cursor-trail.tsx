"use client";

import { useEffect, useRef, useState } from "react";

interface Point {
  x: number;
  y: number;
}

const MAX_DOTS = 14;
const LERP_FACTOR = 0.3;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function CursorTrail() {
  const [isDesktop, setIsDesktop] = useState(false);
  const positionsRef = useRef<Point[]>([]);
  const displayRef = useRef<Point[]>(
    Array.from({ length: MAX_DOTS }, () => ({ x: -100, y: -100 }))
  );
  const rafRef = useRef<number>(0);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    setIsDesktop(mq.matches);

    function onChange(e: MediaQueryListEvent) {
      setIsDesktop(e.matches);
    }

    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    function handleMouseMove(e: MouseEvent) {
      const pos = { x: e.clientX, y: e.clientY };
      positionsRef.current.unshift(pos);
      if (positionsRef.current.length > MAX_DOTS) {
        positionsRef.current.length = MAX_DOTS;
      }
    }

    function animate() {
      const positions = positionsRef.current;
      const display = displayRef.current;

      if (positions.length > 0) {
        // The lead dot lerps toward the actual cursor
        display[0] = {
          x: lerp(display[0].x, positions[0].x, LERP_FACTOR),
          y: lerp(display[0].y, positions[0].y, LERP_FACTOR),
        };

        // Each subsequent dot lerps toward the one ahead of it
        for (let i = 1; i < MAX_DOTS; i++) {
          display[i] = {
            x: lerp(display[i].x, display[i - 1].x, LERP_FACTOR),
            y: lerp(display[i].y, display[i - 1].y, LERP_FACTOR),
          };
        }

        // Apply transforms directly to DOM nodes for performance
        for (let i = 0; i < MAX_DOTS; i++) {
          const el = dotsRef.current[i];
          if (el) {
            el.style.transform = `translate(${display[i].x}px, ${display[i].y}px) translate(-50%, -50%)`;
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div className="fixed inset-0 z-30 pointer-events-none overflow-hidden">
      {Array.from({ length: MAX_DOTS }, (_, i) => {
        // Dot 0 (newest): 6px, opacity 0.4
        // Last dot: 2px, opacity 0.05
        const t = i / (MAX_DOTS - 1);
        const size = 6 - t * 4; // 6 -> 2
        const opacity = 0.4 - t * 0.35; // 0.4 -> 0.05

        return (
          <div
            key={i}
            ref={(el) => {
              dotsRef.current[i] = el;
            }}
            className="absolute left-0 top-0 rounded-full bg-blue-500"
            style={{
              width: size,
              height: size,
              opacity,
              willChange: "transform",
              transform: "translate(-100px, -100px)",
            }}
          />
        );
      })}
    </div>
  );
}
