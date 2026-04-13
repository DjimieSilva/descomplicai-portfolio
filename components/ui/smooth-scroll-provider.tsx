"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type Lenis from "lenis";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScrollProvider({
  children,
  enabled = true,
}: {
  children: ReactNode;
  enabled?: boolean;
}) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animationFrameId = 0;
    let isDisposed = false;

    async function setupLenis() {
      const { default: LenisConstructor } = await import("lenis");
      if (isDisposed) return;

      const lenis = new LenisConstructor({
        duration: 1.05,
        smoothWheel: true,
        touchMultiplier: 1.2,
      });

      setLenisInstance(lenis);

      const raf = (time: number) => {
        lenis.raf(time);
        animationFrameId = window.requestAnimationFrame(raf);
      };

      animationFrameId = window.requestAnimationFrame(raf);
    }

    void setupLenis();

    return () => {
      isDisposed = true;
      window.cancelAnimationFrame(animationFrameId);
      setLenisInstance((current) => {
        current?.destroy();
        return null;
      });
    };
  }, [enabled]);

  return (
    <LenisContext.Provider value={lenisInstance}>
      {children}
    </LenisContext.Provider>
  );
}
