"use client";

import { useState, useEffect, useCallback } from "react";

const colorGroups = [
  {
    label: "Primarias",
    colors: [
      { name: "Blue", hex: "#3B82F6" },
      { name: "Purple", hex: "#A855F7" },
      { name: "Cyan", hex: "#06B6D4" },
      { name: "Emerald", hex: "#10B981" },
      { name: "Amber", hex: "#F59E0B" },
    ],
  },
  {
    label: "Neutras",
    colors: [
      { name: "Slate 50", hex: "#F8FAFC" },
      { name: "Slate 100", hex: "#F1F5F9" },
      { name: "Slate 400", hex: "#94A3B8" },
      { name: "Slate 700", hex: "#334155" },
      { name: "Slate 950", hex: "#020617" },
    ],
  },
  {
    label: "Semanticas",
    colors: [
      { name: "Success", hex: "#22C55E" },
      { name: "Warning", hex: "#EAB308" },
      { name: "Error", hex: "#EF4444" },
      { name: "Info", hex: "#3B82F6" },
    ],
  },
];

export function ColorPaletteSection() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  useEffect(() => {
    if (!copiedColor) return;
    const timer = setTimeout(() => setCopiedColor(null), 2000);
    return () => clearTimeout(timer);
  }, [copiedColor]);

  const handleCopy = useCallback(async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedColor(hex);
    } catch {
      setCopiedColor(hex);
    }
  }, []);

  return (
    <section className="bg-slate-950 py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="font-mono uppercase text-[10px] tracking-[0.3em] text-slate-500 mb-4">
          Design Tokens
        </p>
        <h2 className="text-4xl font-bold text-white mb-4">A Paleta de Cores</h2>
        <p className="text-slate-400 mb-12">
          Clica numa cor para copiar o codigo.
        </p>

        <div className="space-y-12">
          {colorGroups.map((group) => (
            <div key={group.label}>
              <p className="font-mono uppercase text-[10px] tracking-[0.2em] text-slate-500 mb-4">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-6">
                {group.colors.map((color) => (
                  <div
                    key={color.hex + color.name}
                    className="flex flex-col items-center gap-2"
                  >
                    <button
                      data-hover
                      onClick={() => handleCopy(color.hex)}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl cursor-pointer hover:scale-110 transition-transform duration-200 border border-white/5"
                      style={{ backgroundColor: color.hex }}
                      aria-label={`Copiar ${color.name} ${color.hex}`}
                    />
                    <span className="text-[10px] text-slate-400">
                      {color.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {color.hex}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {copiedColor && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-white text-slate-900 rounded-full px-4 py-2 shadow-lg text-sm font-mono animate-in fade-in">
          Copiado: {copiedColor}
        </div>
      )}
    </section>
  );
}
