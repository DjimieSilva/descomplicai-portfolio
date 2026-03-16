"use client";

const ROW1_ITEMS = [
  "NEXT.JS 16",
  "REACT 19",
  "TYPESCRIPT",
  "GSAP",
  "LENIS",
  "FRAMER MOTION",
  "TAILWIND V4",
  "SHARP",
];

const ROW2_ITEMS = [
  "SCROLL TRIGGER",
  "SPRING PHYSICS",
  "GLASSMORPHISM",
  "PARALLAX",
  "INTERSECTION OBSERVER",
  "60FPS",
  "ZERO ANY",
  "RAF LOOP",
];

function buildMarqueeText(items: string[], separator = " ◆ ") {
  return items.join(separator) + separator;
}

export function MarqueeSection() {
  const row1Text = buildMarqueeText(ROW1_ITEMS);
  const row2Text = buildMarqueeText(ROW2_ITEMS);

  return (
    <section className="relative w-full bg-slate-950 py-16 overflow-hidden border-t border-b border-white/5">
      {/* Left fade overlay */}
      <div className="absolute left-0 top-0 bottom-0 w-32 sm:w-48 z-10 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none" />
      {/* Right fade overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-32 sm:w-48 z-10 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none" />

      <div className="flex flex-col gap-8">
        {/* Row 1 — moves left */}
        <div className="relative whitespace-nowrap">
          <div
            className="inline-block text-5xl sm:text-7xl lg:text-8xl font-black text-white/[0.06] uppercase tracking-wider"
            style={{
              animation: "marquee-left 30s linear infinite",
              willChange: "transform",
            }}
          >
            <span>{row1Text}</span>
            <span>{row1Text}</span>
          </div>
        </div>

        {/* Row 2 — moves right */}
        <div className="relative whitespace-nowrap">
          <div
            className="inline-block text-3xl sm:text-5xl lg:text-6xl font-black text-white/[0.04] uppercase tracking-wider"
            style={{
              animation: "marquee-right 35s linear infinite",
              willChange: "transform",
            }}
          >
            <span>{row2Text}</span>
            <span>{row2Text}</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-right {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
