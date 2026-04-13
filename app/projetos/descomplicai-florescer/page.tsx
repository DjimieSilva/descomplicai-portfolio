"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function DescomplicaiFlorescerPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const petals = [
    { top: "12%", left: "15%", size: 18, rotation: 30, delay: 0 },
    { top: "25%", left: "78%", size: 14, rotation: 120, delay: 0.5 },
    { top: "60%", left: "8%", size: 16, rotation: 200, delay: 1.0 },
    { top: "45%", left: "85%", size: 20, rotation: 70, delay: 1.5 },
    { top: "75%", left: "65%", size: 12, rotation: 310, delay: 0.8 },
    { top: "18%", left: "52%", size: 15, rotation: 160, delay: 1.2 },
    { top: "82%", left: "30%", size: 17, rotation: 250, delay: 0.3 },
    { top: "38%", left: "35%", size: 13, rotation: 90, delay: 1.8 },
    { top: "55%", left: "50%", size: 11, rotation: 45, delay: 0.6 },
    { top: "70%", left: "18%", size: 19, rotation: 180, delay: 1.4 },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fdf2f8] via-[#fce7f3] to-[#ecfdf5]" />

      {/* Soft organic blobs */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 25% 35%, rgba(251,146,186,0.3) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-25"
        style={{
          background:
            "radial-gradient(ellipse 45% 45% at 75% 60%, rgba(134,239,172,0.3) 0%, transparent 70%)",
        }}
      />

      {/* Floating petals */}
      <div className="absolute inset-0 overflow-hidden">
        {mounted &&
          petals.map((petal, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                top: petal.top,
                left: petal.left,
                width: `${petal.size}px`,
                height: `${petal.size * 1.4}px`,
                background: `linear-gradient(${petal.rotation}deg, rgba(251,146,186,0.25), rgba(253,186,210,0.15))`,
                borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                animation: `float-petal ${4 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${petal.delay}s`,
                transform: `rotate(${petal.rotation}deg)`,
              }}
            />
          ))}
      </div>

      {/* Subtle vine lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d="M 0 80 Q 25 70, 50 75 T 100 65"
          fill="none"
          stroke="#86efac"
          strokeWidth="0.3"
        />
        <path
          d="M 0 90 Q 30 82, 60 85 T 100 78"
          fill="none"
          stroke="#86efac"
          strokeWidth="0.2"
        />
      </svg>

      {/* Content */}
      <div
        className={`relative z-10 text-center px-6 transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="text-pink-400/60 text-sm tracking-[0.3em] uppercase mb-4 font-light">
          Descomplicai
        </p>

        <h1
          className="text-7xl md:text-9xl font-extralight tracking-tight mb-6"
          style={{
            background: "linear-gradient(135deg, #f9a8d4, #86efac, #a7f3d0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Florescer
        </h1>

        <div className="w-24 h-px bg-gradient-to-r from-transparent via-pink-300/50 to-transparent mx-auto mb-6" />

        <p className="text-slate-500 text-xl font-light tracking-wide mb-2">
          Em breve
        </p>
        <p className="text-slate-400 text-sm max-w-md mx-auto mb-12 leading-relaxed">
          Botanico, petalas e crescimento organico.
          Algo bonito esta a desabrochar.
        </p>

        <Link
          href="/projetos"
          className="inline-flex items-center gap-2 text-pink-400/70 hover:text-pink-500 transition-colors text-sm tracking-wide group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">&larr;</span>
          Voltar aos projetos
        </Link>
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes float-petal {
          0%, 100% { transform: translateY(0px) rotate(var(--tw-rotate, 0deg)); }
          50% { transform: translateY(-12px) rotate(calc(var(--tw-rotate, 0deg) + 10deg)); }
        }
      `}</style>
    </div>
  );
}
