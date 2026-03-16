"use client";

import { useRef, useEffect, useState } from "react";

export function ScrollTextFillSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    function handleScroll() {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;

      // Progress goes from 0 (section top enters viewport bottom)
      // to 1 (section bottom leaves viewport top)
      const totalTravel = sectionHeight + viewportHeight;
      const traveled = viewportHeight - rect.top;
      const raw = traveled / totalTravel;
      setProgress(Math.min(1, Math.max(0, raw * 2.5)));
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const clipRight = Math.max(0, 100 - progress * 100);
  const paragraphOpacity = progress > 0.7 ? (progress - 0.7) / 0.3 : 0;

  const lines = [
    "Cada pixel tem",
    "um propósito.",
    "Cada animação",
    "conta uma história.",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-slate-950 py-40 px-6"
      style={{ minHeight: "200vh" }}
    >
      <div
        className="sticky flex flex-col items-center justify-center"
        style={{ top: 0, height: "100vh" }}
      >
        <div className="relative max-w-5xl mx-auto text-center">
          {/* Back layer — dark, barely visible */}
          <div aria-hidden="true" className="select-none">
            {lines.map((line, i) => (
              <p
                key={i}
                className="text-4xl sm:text-6xl lg:text-7xl font-bold text-slate-800 leading-tight"
              >
                {line}
              </p>
            ))}
          </div>

          {/* Front layer — gradient, revealed by clip-path */}
          <div
            aria-hidden="true"
            className="absolute inset-0 select-none"
            style={{
              clipPath: `inset(0 ${clipRight}% 0 0)`,
            }}
          >
            {lines.map((line, i) => (
              <p
                key={i}
                className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Paragraph that fades in near the end */}
        <p
          className="mt-12 text-slate-400 text-lg text-center max-w-2xl mx-auto transition-opacity duration-300"
          style={{ opacity: paragraphOpacity }}
        >
          15 componentes construídos com intenção. Nenhum efeito gratuito.
          Nenhuma animação sem razão. Este é o design system que transforma
          interfaces em experiências.
        </p>
      </div>
    </section>
  );
}
