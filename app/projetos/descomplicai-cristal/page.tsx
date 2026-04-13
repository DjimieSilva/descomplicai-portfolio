"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function DescomplicaiCristalPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e8f4f8] via-[#d0e8f2] to-[#f0f7ff]" />

      {/* Crystal facet overlays */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "conic-gradient(from 120deg at 35% 40%, transparent 0deg, rgba(147,197,253,0.3) 60deg, transparent 120deg, rgba(186,230,253,0.2) 200deg, transparent 280deg)",
        }}
      />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "conic-gradient(from 240deg at 65% 55%, transparent 0deg, rgba(165,180,252,0.25) 80deg, transparent 160deg, rgba(199,210,254,0.2) 260deg, transparent 340deg)",
        }}
      />

      {/* Light refraction lines */}
      <div className="absolute inset-0 overflow-hidden">
        {mounted &&
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-gradient-to-r from-transparent via-white/40 to-transparent"
              style={{
                width: `${200 + i * 80}px`,
                height: "1px",
                top: `${15 + i * 14}%`,
                left: `${10 + i * 8}%`,
                transform: `rotate(${-15 + i * 7}deg)`,
                opacity: 0.3 + i * 0.05,
                animation: `shimmer ${3 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
      </div>

      {/* Floating crystal shards */}
      <div className="absolute inset-0 overflow-hidden">
        {mounted &&
          Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                width: `${20 + i * 10}px`,
                height: `${30 + i * 12}px`,
                top: `${10 + Math.random() * 80}%`,
                left: `${5 + Math.random() * 90}%`,
                background: `linear-gradient(${45 + i * 30}deg, rgba(147,197,253,0.15), rgba(199,210,254,0.1))`,
                clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
                animation: `float-crystal ${5 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.7}s`,
              }}
            />
          ))}
      </div>

      {/* Content */}
      <div
        className={`relative z-10 text-center px-6 transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="text-blue-400/60 text-sm tracking-[0.3em] uppercase mb-4 font-light">
          Descomplicai
        </p>

        <h1
          className="text-7xl md:text-9xl font-extralight tracking-tight mb-6"
          style={{
            background: "linear-gradient(135deg, #93c5fd, #818cf8, #c7d2fe)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Cristal
        </h1>

        <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent mx-auto mb-6" />

        <p className="text-slate-500 text-xl font-light tracking-wide mb-2">
          Em breve
        </p>
        <p className="text-slate-400 text-sm max-w-md mx-auto mb-12 leading-relaxed">
          Formas geometricas, reflexos de luz e paleta gelada.
          Clareza e precisao a tomar forma.
        </p>

        <Link
          href="/projetos"
          className="inline-flex items-center gap-2 text-blue-400/70 hover:text-blue-500 transition-colors text-sm tracking-wide group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">&larr;</span>
          Voltar aos projetos
        </Link>
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes shimmer {
          0%, 100% { opacity: 0.2; transform: translateX(-10px) rotate(var(--tw-rotate, 0deg)); }
          50% { opacity: 0.5; transform: translateX(10px) rotate(var(--tw-rotate, 0deg)); }
        }
        @keyframes float-crystal {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
      `}</style>
    </div>
  );
}
