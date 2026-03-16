"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";

function useMagnetic(maxDisplacement = 15, radius = 100) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < radius) {
        const strength = (radius - distance) / radius;
        setOffset({
          x: distX * strength * (maxDisplacement / radius) * 2,
          y: distY * strength * (maxDisplacement / radius) * 2,
        });
      } else {
        setOffset({ x: 0, y: 0 });
      }
    },
    [maxDisplacement, radius]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setOffset({ x: 0, y: 0 });
  }, []);

  return { ref, offset, isHovered, handleMouseMove, handleMouseEnter, handleMouseLeave };
}

export function MagneticCtaSection() {
  const primary = useMagnetic(15, 100);
  const secondary = useMagnetic(15, 100);

  return (
    <section className="relative overflow-hidden bg-slate-950 px-6 py-40">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="absolute h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-3xl"
          style={{
            animation: "magneticPulse1 4s ease-in-out infinite",
          }}
        />
        <div
          className="absolute h-[600px] w-[600px] translate-x-32 translate-y-16 rounded-full blur-3xl"
          style={{
            backgroundColor: "rgba(168, 85, 247, 0.08)",
            animation: "magneticPulse2 5s ease-in-out infinite",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-bold text-white sm:text-6xl">
          Pronto para comecar?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-lg text-slate-400">
          O design system esta pronto para o teu proximo projecto.
        </p>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          {/* Primary */}
          <div
            ref={primary.ref}
            onMouseMove={primary.handleMouseMove}
            onMouseEnter={primary.handleMouseEnter}
            onMouseLeave={primary.handleMouseLeave}
            className="cursor-pointer"
            style={{
              transform: `translate(${primary.offset.x}px, ${primary.offset.y}px)`,
              transition: "transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
            }}
          >
            <Link
              href="/projetos/design-system"
              className="inline-block rounded-full bg-white px-10 py-5 text-lg font-bold text-slate-900 shadow-2xl shadow-white/10"
              style={{
                boxShadow: primary.isHovered
                  ? "0 0 40px rgba(255,255,255,0.2), 0 25px 50px -12px rgba(255,255,255,0.1)"
                  : "0 25px 50px -12px rgba(255,255,255,0.1)",
                transition: "box-shadow 0.3s ease",
              }}
            >
              Explorar Documentacao
            </Link>
          </div>

          {/* Secondary */}
          <div
            ref={secondary.ref}
            onMouseMove={secondary.handleMouseMove}
            onMouseEnter={secondary.handleMouseEnter}
            onMouseLeave={secondary.handleMouseLeave}
            className="cursor-pointer"
            style={{
              transform: `translate(${secondary.offset.x}px, ${secondary.offset.y}px)`,
              transition: "transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
            }}
          >
            <Link
              href="/projetos"
              className="inline-block rounded-full border-2 px-10 py-5 text-lg font-medium text-white"
              style={{
                borderColor: secondary.isHovered
                  ? "rgba(255,255,255,0.4)"
                  : "rgba(255,255,255,0.2)",
                transition: "border-color 0.3s ease",
              }}
            >
              Ver Projetos
            </Link>
          </div>
        </div>

        {/* Stats */}
        <p className="mt-8 font-mono text-xs text-slate-600">
          15 componentes · 12.9KB · 100% TypeScript · 60fps
        </p>

        {/* Copyright */}
        <p className="mt-16 text-xs text-slate-700">© 2026 Descomplicai</p>
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes magneticPulse1 {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.3);
          }
        }
        @keyframes magneticPulse2 {
          0%,
          100% {
            transform: translate(8rem, 4rem) scale(1.1);
          }
          50% {
            transform: translate(8rem, 4rem) scale(1.4);
          }
        }
      `}</style>
    </section>
  );
}
