"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  {
    value: "15",
    label: "Componentes",
    sublabel: "Prontos para producao",
    accent: "blue",
    borderClass: "border-blue-500/20",
    borderHoverClass: "hover:border-blue-500/40",
    textClass: "text-blue-600",
  },
  {
    value: "5,677",
    label: "Linhas de Codigo",
    sublabel: "TypeScript puro",
    accent: "purple",
    borderClass: "border-purple-500/20",
    borderHoverClass: "hover:border-purple-500/40",
    textClass: "text-purple-600",
  },
  {
    value: "12.9",
    label: "KB Total",
    sublabel: "Gzipped",
    accent: "cyan",
    borderClass: "border-cyan-500/20",
    borderHoverClass: "hover:border-cyan-500/40",
    textClass: "text-cyan-600",
  },
  {
    value: "60",
    label: "FPS",
    sublabel: "Garantidos",
    accent: "emerald",
    borderClass: "border-emerald-500/20",
    borderHoverClass: "hover:border-emerald-500/40",
    textClass: "text-emerald-600",
  },
];

function OdometerDigit({
  target,
  animate,
  delay,
}: {
  target: string;
  animate: boolean;
  delay: number;
}) {
  const isNumeric = !isNaN(Number(target));
  const digitHeight = 72; // matches text-5xl/text-6xl roughly

  if (!isNumeric) {
    // Static character (comma, period)
    return (
      <span className="inline-block text-5xl sm:text-6xl font-bold leading-none">
        {target}
      </span>
    );
  }

  const targetNum = Number(target);

  return (
    <div
      className="inline-block overflow-hidden relative"
      style={{ height: digitHeight, width: "0.6em" }}
    >
      <div
        className="transition-transform"
        style={{
          transform: animate
            ? `translateY(-${targetNum * digitHeight}px)`
            : `translateY(0px)`,
          transitionDuration: "1200ms",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: `${delay}ms`,
        }}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            className="text-5xl sm:text-6xl font-bold leading-none flex items-center justify-center"
            style={{ height: digitHeight }}
          >
            {i}
          </div>
        ))}
      </div>
    </div>
  );
}

function OdometerValue({
  value,
  animate,
  colorClass,
}: {
  value: string;
  animate: boolean;
  colorClass: string;
}) {
  const chars = value.split("");

  return (
    <div className={`flex items-center justify-center ${colorClass}`}>
      {chars.map((char, i) => (
        <OdometerDigit
          key={`${i}-${char}`}
          target={char}
          animate={animate}
          delay={i * 50}
        />
      ))}
    </div>
  );
}

export function OdometerStatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-white py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-slate-900 text-center mb-16">
          O Sistema em Numeros
        </h2>

        <div
          ref={sectionRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`rounded-2xl border-2 ${stat.borderClass} ${stat.borderHoverClass} p-8 text-center transition-colors duration-300`}
            >
              <OdometerValue
                value={stat.value}
                animate={animate}
                colorClass={stat.textClass}
              />
              <p className="text-slate-600 font-medium mt-4 text-lg">
                {stat.label}
              </p>
              <p className="text-sm text-slate-400 mt-1">{stat.sublabel}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
