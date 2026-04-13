"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function DescomplicaiAuroraPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* Background gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#1a1040] to-[#0d2937]" />

      {/* Aurora shimmer layers */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 120% 60% at 30% 20%, rgba(72, 209, 204, 0.3) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 100% 50% at 70% 30%, rgba(138, 43, 226, 0.35) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 40%, rgba(0, 255, 180, 0.25) 0%, transparent 50%)",
        }}
      />

      {/* Subtle star dots */}
      <div className="absolute inset-0 overflow-hidden">
        {mounted &&
          Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.3 + Math.random() * 0.5,
                animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
      </div>

      {/* Animated aurora band */}
      <div
        className="absolute top-0 left-0 right-0 h-[60%] opacity-20"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(0,255,180,0.15) 30%, rgba(72,209,204,0.2) 50%, rgba(138,43,226,0.15) 70%, transparent 100%)",
          animation: mounted ? "aurora-sway 8s ease-in-out infinite" : "none",
        }}
      />

      {/* Content */}
      <div
        className={`relative z-10 text-center px-6 transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="text-teal-300/60 text-sm tracking-[0.3em] uppercase mb-4 font-light">
          Descomplicai
        </p>

        <h1
          className="text-7xl md:text-9xl font-extralight tracking-tight mb-6"
          style={{
            background: "linear-gradient(135deg, #48d1cc, #a78bfa, #00ffb4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Aurora
        </h1>

        <div className="w-24 h-px bg-gradient-to-r from-transparent via-teal-400/50 to-transparent mx-auto mb-6" />

        <p className="text-white/50 text-xl font-light tracking-wide mb-2">
          Em breve
        </p>
        <p className="text-white/30 text-sm max-w-md mx-auto mb-12 leading-relaxed">
          Luzes do norte, gradientes etéreos e transições suaves.
          Uma nova visão está a ganhar forma.
        </p>

        <Link
          href="/projetos"
          className="inline-flex items-center gap-2 text-teal-300/70 hover:text-teal-200 transition-colors text-sm tracking-wide group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">&larr;</span>
          Voltar aos projetos
        </Link>
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes aurora-sway {
          0%, 100% { transform: translateX(-5%) skewX(-2deg); }
          50% { transform: translateX(5%) skewX(2deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
