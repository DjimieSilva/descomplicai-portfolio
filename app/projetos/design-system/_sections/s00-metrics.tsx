"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedGradient } from "@/components/ui/animated-gradient";

/* ─── Animated Counter Hook ─── */

function useAnimatedCounter(
  target: number,
  duration = 2000,
  startOnView = true
) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startOnView, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const startTime = performance.now();

    function easeOutCubic(t: number): number {
      return 1 - Math.pow(1 - t, 3);
    }

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      setCount(Math.round(easedProgress * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [hasStarted, target, duration]);

  return { count, ref };
}

/* ─── Counter Data ─── */

interface CounterItem {
  target: number;
  suffix?: string;
  label: string;
  sublabel: string;
}

const counters: CounterItem[] = [
  { target: 15, label: "Componentes", sublabel: "Prontos a usar" },
  { target: 16, label: "Capitulos", sublabel: "Masterclass completa" },
  { target: 847, label: "Linhas de Codigo", sublabel: "TypeScript puro" },
  {
    target: 60,
    suffix: "fps",
    label: "Performance",
    sublabel: "Consistente",
  },
];

/* ─── Counter Card ─── */

function CounterCard({ item }: { item: CounterItem }) {
  const { count, ref } = useAnimatedCounter(item.target, 2000);

  return (
    <div ref={ref} className="text-center">
      <p className="text-5xl font-bold tabular-nums text-white sm:text-6xl lg:text-7xl">
        {count}
        {item.suffix && (
          <span className="text-blue-400">{item.suffix}</span>
        )}
      </p>
      <p className="mt-3 text-sm font-medium text-slate-300">{item.label}</p>
      <p className="mt-1 text-sm text-slate-500">{item.sublabel}</p>
    </div>
  );
}

/* ─── MetricsSection ─── */

export function MetricsSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-28 px-6">
      <AnimatedGradient />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading
          dark
          label="Em Numeros"
          title="Construido Para Performance"
          description="Cada decisao de design foi tomada com a performance em mente."
        />

        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {counters.map((item) => (
            <CounterCard key={item.label} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
