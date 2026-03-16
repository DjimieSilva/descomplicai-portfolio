"use client";

import { useEffect, useState } from "react";

export function ProgressRing() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const maxScroll = docHeight - winHeight;

      if (maxScroll <= 0) {
        setProgress(0);
        setVisible(false);
        return;
      }

      const pct = Math.min(100, Math.max(0, (scrollTop / maxScroll) * 100));
      setProgress(pct);
      setVisible(scrollTop > 100);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      className="fixed bottom-6 right-6 z-40 transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }}
    >
      <div className="relative flex items-center justify-center rounded-full bg-white/5 backdrop-blur-sm">
        <svg width={48} height={48} viewBox="0 0 48 48" className="rotate-[-90deg]">
          <defs>
            <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>

          {/* Background circle */}
          <circle
            cx={24}
            cy={24}
            r={radius}
            fill="none"
            strokeWidth={3}
            className="stroke-slate-200/20"
          />

          {/* Progress circle */}
          <circle
            cx={24}
            cy={24}
            r={radius}
            fill="none"
            strokeWidth={3}
            strokeLinecap="round"
            stroke="url(#progress-gradient)"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.15s ease-out" }}
          />
        </svg>

        {/* Percentage text */}
        <span className="absolute text-[10px] font-mono font-bold text-slate-400 select-none">
          {Math.round(progress)}
        </span>
      </div>
    </div>
  );
}
