"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════
   DESCOMPLICAI ORGANIC — Nature-Inspired Design Variation
   Tons terrosos, formas curvas SVG, texturas naturais, botanico e humano
   ═══════════════════════════════════════════════════════════════ */

/* ─── Color Palette ─── */
const colors = {
  forest: "#2D5016",
  forestLight: "#3A6B1E",
  clay: "#B85C38",
  sage: "#87A878",
  sageMuted: "#9DB88F",
  sand: "#F5F0E8",
  warmWhite: "#FEFBF4",
  terracotta: "#C67B5C",
  terracottaLight: "#D4916F",
  moss: "#4A6741",
  cream: "#FDF8EF",
  bark: "#5C3D2E",
  olive: "#6B7F3B",
  wheat: "#E8DCC8",
  parchment: "#F0E6D3",
};

/* ─── SVG Wave Dividers — 7 unique organic curves ─── */
function WaveDivider1({ fill = colors.sand, className = "" }: { fill?: string; className?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${className}`}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[60px] md:h-[80px] lg:h-[120px] block">
        <path
          d="M0,40 C180,80 360,10 540,50 C720,90 900,20 1080,60 C1200,80 1350,30 1440,50 L1440,120 L0,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

function WaveDivider2({ fill = colors.warmWhite, className = "" }: { fill?: string; className?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${className}`}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[60px] md:h-[80px] lg:h-[120px] block">
        <path
          d="M0,80 C240,20 480,100 720,40 C960,0 1200,80 1440,30 L1440,120 L0,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

function WaveDivider3({ fill = colors.cream, className = "" }: { fill?: string; className?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${className}`}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[60px] md:h-[80px] lg:h-[120px] block">
        <path
          d="M0,60 C120,90 240,20 480,70 C720,110 960,30 1200,80 C1320,100 1400,40 1440,60 L1440,120 L0,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

function WaveDivider4({ fill = colors.parchment, className = "" }: { fill?: string; className?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${className}`}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[60px] md:h-[80px] lg:h-[120px] block">
        <path
          d="M0,30 C360,100 720,0 1080,70 C1260,100 1380,20 1440,40 L1440,120 L0,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

function WaveDivider5({ fill = colors.sand, className = "" }: { fill?: string; className?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${className}`}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[60px] md:h-[80px] lg:h-[120px] block">
        <path
          d="M0,50 C200,10 400,90 600,30 C800,0 1000,80 1200,40 C1350,20 1420,70 1440,50 L1440,120 L0,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

function WaveDivider6({ fill = colors.warmWhite, className = "" }: { fill?: string; className?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${className}`}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[60px] md:h-[80px] lg:h-[120px] block">
        <path
          d="M0,70 C180,30 360,90 540,40 C720,10 900,80 1080,50 C1260,20 1380,70 1440,40 L1440,120 L0,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

function WaveDivider7({ fill = colors.cream, className = "" }: { fill?: string; className?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${className}`}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[60px] md:h-[80px] lg:h-[120px] block">
        <path
          d="M0,90 C240,40 480,80 720,20 C960,0 1200,60 1440,30 L1440,120 L0,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

/* ─── SVG Botanical Icons ─── */
function LeafIcon({ size = 24, color = colors.forest, className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M17 8C8 10 5.9 16.1 3.8 19.5M17 8C17 8 20 3 12 2C4 1 2 6 2 6C2 6 6 6 17 8Z"
        fill={color}
        opacity={0.2}
      />
      <path
        d="M17 8C8 10 5.9 16.1 3.8 19.5M17 8C17 8 20 3 12 2C4 1 2 6 2 6C2 6 6 6 17 8Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path d="M10 10C8 13 6 16 4 19" stroke={color} strokeWidth={1} strokeLinecap="round" opacity={0.5} />
    </svg>
  );
}

function LeafIcon2({ size = 24, color = colors.sage, className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 22V8M12 8C12 8 6 2 2 4C2 4 4 10 12 8ZM12 8C12 8 18 2 22 4C22 4 20 10 12 8Z"
        fill={color}
        opacity={0.15}
      />
      <path
        d="M12 22V8M12 8C12 8 6 2 2 4C2 4 4 10 12 8ZM12 8C12 8 18 2 22 4C22 4 20 10 12 8Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LeafIcon3({ size = 24, color = colors.olive, className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <ellipse cx="12" cy="9" rx="5" ry="8" transform="rotate(-30 12 9)" fill={color} opacity={0.15} />
      <ellipse cx="12" cy="9" rx="5" ry="8" transform="rotate(-30 12 9)" stroke={color} strokeWidth={1.5} />
      <path d="M12 17V23" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M9 12L12 9L15 6" stroke={color} strokeWidth={1} strokeLinecap="round" opacity={0.4} />
    </svg>
  );
}

function BranchIcon({ size = 24, color = colors.forest, className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 22V4" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M12 8L7 4" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M12 12L17 8" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M12 16L7 13" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <circle cx="7" cy="4" r="1.5" fill={color} opacity={0.3} />
      <circle cx="17" cy="8" r="1.5" fill={color} opacity={0.3} />
      <circle cx="7" cy="13" r="1.5" fill={color} opacity={0.3} />
    </svg>
  );
}

function SunIcon({ size = 24, color = colors.clay, className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="5" fill={color} opacity={0.15} />
      <circle cx="12" cy="12" r="5" stroke={color} strokeWidth={1.5} />
      <path d="M12 2V5M12 19V22M2 12H5M19 12H22M4.93 4.93L7.05 7.05M16.95 16.95L19.07 19.07M4.93 19.07L7.05 16.95M16.95 7.05L19.07 4.93" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  );
}

function WaterIcon({ size = 24, color = colors.sage, className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 2C12 2 5 10 5 15C5 18.87 8.13 22 12 22C15.87 22 19 18.87 19 15C19 10 12 2 12 2Z"
        fill={color}
        opacity={0.15}
      />
      <path
        d="M12 2C12 2 5 10 5 15C5 18.87 8.13 22 12 22C15.87 22 19 18.87 19 15C19 10 12 2 12 2Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 16C9 17.66 10.34 19 12 19" stroke={color} strokeWidth={1.5} strokeLinecap="round" opacity={0.5} />
    </svg>
  );
}

function RootIcon({ size = 48, color = colors.bark, className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M24 4V20" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <path d="M24 20C24 20 20 28 16 36" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <path d="M24 20C24 20 28 28 32 36" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <path d="M24 20C24 20 24 30 24 40" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <path d="M20 28C20 28 16 30 12 32" stroke={color} strokeWidth={1.5} strokeLinecap="round" opacity={0.5} />
      <path d="M28 28C28 28 32 30 36 32" stroke={color} strokeWidth={1.5} strokeLinecap="round" opacity={0.5} />
    </svg>
  );
}

function TreeIcon({ size = 48, color = colors.forest, className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M24 44V24" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <path
        d="M24 6C24 6 10 16 10 24C10 31.73 16.27 38 24 38C31.73 38 38 31.73 38 24C38 16 24 6 24 6Z"
        fill={color}
        opacity={0.15}
      />
      <path
        d="M24 6C24 6 10 16 10 24C10 31.73 16.27 38 24 38C31.73 38 38 31.73 38 24C38 16 24 6 24 6Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M18 30L24 24L30 30" stroke={color} strokeWidth={1.5} strokeLinecap="round" opacity={0.3} />
      <path d="M20 26L24 22L28 26" stroke={color} strokeWidth={1.5} strokeLinecap="round" opacity={0.2} />
    </svg>
  );
}

function SeedIcon({ size = 48, color = colors.clay, className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <ellipse cx="24" cy="30" rx="8" ry="12" fill={color} opacity={0.15} />
      <ellipse cx="24" cy="30" rx="8" ry="12" stroke={color} strokeWidth={2} />
      <path d="M24 18V6" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <path d="M24 6C24 6 20 10 18 14" stroke={color} strokeWidth={1.5} strokeLinecap="round" opacity={0.5} />
      <path d="M24 6C24 6 28 10 30 14" stroke={color} strokeWidth={1.5} strokeLinecap="round" opacity={0.5} />
    </svg>
  );
}

function SproutIcon({ size = 48, color = colors.moss, className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M24 44V20" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <path
        d="M24 20C24 20 16 14 16 8C16 8 20 6 24 12C28 6 32 8 32 8C32 14 24 20 24 20Z"
        fill={color}
        opacity={0.2}
      />
      <path
        d="M24 20C24 20 16 14 16 8C16 8 20 6 24 12C28 6 32 8 32 8C32 14 24 20 24 20Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M24 36C24 36 18 32 14 36" stroke={color} strokeWidth={1.5} strokeLinecap="round" opacity={0.5} />
      <path d="M24 30C24 30 30 26 34 30" stroke={color} strokeWidth={1.5} strokeLinecap="round" opacity={0.5} />
    </svg>
  );
}

function FruitIcon({ size = 48, color = colors.terracotta, className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="28" r="14" fill={color} opacity={0.15} />
      <circle cx="24" cy="28" r="14" stroke={color} strokeWidth={2} />
      <path d="M24 14V8" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <path d="M24 8C24 8 20 4 16 6" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M24 8C24 8 28 4 32 6" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M18 24C18 24 20 32 24 34" stroke={color} strokeWidth={1.5} strokeLinecap="round" opacity={0.3} />
    </svg>
  );
}

/* ─── Floating Leaf Component ─── */
function FloatingLeaf({ index }: { index: number }) {
  const variants = [
    { path: "M8 2C8 2 2 8 4 14C6 20 12 18 14 12C16 6 8 2 8 2Z", w: 16, h: 20 },
    { path: "M6 2C6 2 1 6 3 12C5 18 10 16 11 10C12 4 6 2 6 2Z", w: 14, h: 18 },
    { path: "M10 2C10 2 3 10 6 16C9 22 16 18 17 10C18 4 10 2 10 2Z", w: 20, h: 22 },
    { path: "M7 1C7 1 2 5 3 10C4 15 9 14 10 9C11 4 7 1 7 1Z", w: 12, h: 16 },
    { path: "M9 2C9 2 3 8 5 14C7 20 13 17 14 11C15 5 9 2 9 2Z", w: 16, h: 20 },
    { path: "M5 1C5 1 1 4 2 8C3 12 7 11 8 7C9 3 5 1 5 1Z", w: 10, h: 13 },
  ];
  const leaf = variants[index % variants.length];
  const leafColors = [colors.sage, colors.forest, colors.moss, colors.olive, colors.sageMuted, colors.forestLight];
  const color = leafColors[index % leafColors.length];
  const animName = `leafFloat${(index % 3) + 1}`;
  const delay = index * 2.5;
  const duration = 10 + (index % 5) * 2;
  const leftPos = 5 + (index * 17) % 90;
  const size = 0.6 + (index % 4) * 0.2;

  return (
    <div
      className="absolute pointer-events-none opacity-40"
      style={{
        left: `${leftPos}%`,
        top: "-40px",
        animation: `${animName} ${duration}s ease-in-out ${delay}s infinite`,
        transform: `scale(${size})`,
      }}
    >
      <svg width={leaf.w} height={leaf.h} viewBox={`0 0 ${leaf.w} ${leaf.h}`} fill="none">
        <path d={leaf.path} fill={color} opacity={0.6} />
        <path d={leaf.path} stroke={color} strokeWidth={0.8} />
      </svg>
    </div>
  );
}

/* ─── Hero Branch Decoration ─── */
function HeroBranchLeft() {
  return (
    <svg
      className="absolute left-0 top-1/4 w-[120px] md:w-[200px] lg:w-[280px] h-auto opacity-20"
      viewBox="0 0 200 400"
      fill="none"
    >
      <path
        d="M0,200 Q30,180 50,160 Q70,140 60,100 Q50,60 70,30 Q80,10 90,0"
        stroke={colors.forest}
        strokeWidth={3}
        strokeLinecap="round"
        className="animate-branchGrow"
        style={{ strokeDasharray: 600, strokeDashoffset: 600 }}
      />
      <path d="M50,160 Q30,140 10,130" stroke={colors.sage} strokeWidth={2} strokeLinecap="round" opacity={0.6} />
      <path d="M60,100 Q40,90 20,95" stroke={colors.sage} strokeWidth={2} strokeLinecap="round" opacity={0.6} />
      <path d="M70,30 Q50,25 35,35" stroke={colors.sage} strokeWidth={2} strokeLinecap="round" opacity={0.6} />
      <ellipse cx="10" cy="130" rx="8" ry="12" transform="rotate(-20 10 130)" fill={colors.sage} opacity={0.2} />
      <ellipse cx="20" cy="95" rx="7" ry="10" transform="rotate(10 20 95)" fill={colors.sage} opacity={0.2} />
      <ellipse cx="35" cy="35" rx="6" ry="9" transform="rotate(-15 35 35)" fill={colors.sage} opacity={0.2} />
      <path
        d="M0,300 Q40,280 60,250 Q80,220 70,180"
        stroke={colors.moss}
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.4}
      />
      <ellipse cx="60" cy="250" rx="6" ry="9" transform="rotate(20 60 250)" fill={colors.moss} opacity={0.15} />
    </svg>
  );
}

function HeroBranchRight() {
  return (
    <svg
      className="absolute right-0 top-1/3 w-[120px] md:w-[200px] lg:w-[280px] h-auto opacity-20 scale-x-[-1]"
      viewBox="0 0 200 400"
      fill="none"
    >
      <path
        d="M0,200 Q30,180 50,160 Q70,140 60,100 Q50,60 70,30 Q80,10 90,0"
        stroke={colors.forest}
        strokeWidth={3}
        strokeLinecap="round"
        className="animate-branchGrow"
        style={{ strokeDasharray: 600, strokeDashoffset: 600, animationDelay: "0.5s" }}
      />
      <path d="M50,160 Q30,140 10,130" stroke={colors.sage} strokeWidth={2} strokeLinecap="round" opacity={0.6} />
      <path d="M60,100 Q40,90 20,95" stroke={colors.sage} strokeWidth={2} strokeLinecap="round" opacity={0.6} />
      <ellipse cx="10" cy="130" rx="8" ry="12" transform="rotate(-20 10 130)" fill={colors.sage} opacity={0.2} />
      <ellipse cx="20" cy="95" rx="7" ry="10" transform="rotate(10 20 95)" fill={colors.sage} opacity={0.2} />
      <path
        d="M0,320 Q50,300 70,270 Q90,240 80,200"
        stroke={colors.olive}
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.3}
      />
    </svg>
  );
}

/* ─── Intersection Observer Hook ─── */
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(node);
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ─── Animated Counter Hook ─── */
function useCounter(end: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let frame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [end, duration, start]);

  return count;
}

/* ─── Stat Card Component ─── */
function StatCard({ value, suffix, label, icon, delay }: { value: number; suffix: string; label: string; icon: React.ReactNode; delay: number }) {
  const { ref, inView } = useInView(0.3);
  const count = useCounter(value, 2000, inView);

  return (
    <div
      ref={ref}
      className="relative group"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`,
      }}
    >
      <div
        className="relative p-8 md:p-10 text-center transition-all duration-700"
        style={{
          background: colors.warmWhite,
          borderRadius: "42% 58% 40% 60% / 55% 45% 55% 45%",
          boxShadow: "0 4px 30px rgba(45, 80, 22, 0.08)",
          animation: inView ? `blobMorph ${8 + delay * 2}s ease-in-out infinite` : "none",
        }}
      >
        <div className="flex justify-center mb-4 transition-transform duration-500 group-hover:scale-110">
          {icon}
        </div>
        <div
          className="text-4xl md:text-5xl font-bold mb-2"
          style={{ color: colors.forest, fontFamily: "var(--font-newsreader), Georgia, serif" }}
        >
          {count}{suffix}
        </div>
        <div
          className="text-sm md:text-base tracking-wide uppercase"
          style={{ color: colors.moss, fontFamily: "var(--font-lora), Georgia, serif", letterSpacing: "0.1em" }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}

/* ─── Service Card Component ─── */
function ServiceCard({ icon, title, description, delay }: { icon: React.ReactNode; title: string; description: string; delay: number }) {
  const { ref, inView } = useInView(0.2);

  return (
    <div
      ref={ref}
      className="group cursor-default"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`,
      }}
    >
      <div
        className="relative p-8 md:p-10 h-full transition-all duration-500 hover:shadow-xl"
        style={{
          background: colors.warmWhite,
          borderRadius: "24px",
          border: `2px solid ${colors.wheat}`,
          boxShadow: "0 2px 20px rgba(45, 80, 22, 0.05)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = colors.terracotta;
          (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = colors.wheat;
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        }}
      >
        <div className="mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
          {icon}
        </div>
        <h3
          className="text-xl md:text-2xl font-semibold mb-3"
          style={{ color: colors.forest, fontFamily: "var(--font-newsreader), Georgia, serif" }}
        >
          {title}
        </h3>
        <p
          className="text-base leading-relaxed"
          style={{ color: colors.moss, fontFamily: "var(--font-lora), Georgia, serif" }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

/* ─── Project Card Component ─── */
function ProjectCard({
  name,
  type,
  description,
  large = false,
  delay,
}: {
  name: string;
  type: string;
  description: string;
  large?: boolean;
  delay: number;
}) {
  const { ref, inView } = useInView(0.2);

  return (
    <div
      ref={ref}
      className={`group cursor-default ${large ? "md:col-span-2 md:row-span-2" : ""}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
        transition: `all 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`,
      }}
    >
      <div
        className="relative h-full overflow-hidden transition-all duration-500 group-hover:shadow-2xl"
        style={{
          borderRadius: "24px",
          background: `linear-gradient(135deg, ${colors.forest}10, ${colors.sage}20)`,
          border: `2px solid ${colors.sage}40`,
          minHeight: large ? "360px" : "240px",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1)";
        }}
      >
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background: `linear-gradient(160deg, ${colors.forest}E6 0%, ${colors.sage}CC 50%, ${colors.moss}B3 100%)`,
            borderRadius: "24px",
          }}
        />

        {/* Decorative leaf */}
        <div className="absolute top-4 right-4 opacity-20 transition-all duration-700 group-hover:opacity-40 group-hover:rotate-12">
          <LeafIcon size={large ? 48 : 32} color={colors.warmWhite} />
        </div>

        {/* Content */}
        <div className="relative z-10 p-8 md:p-10 flex flex-col justify-end h-full">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 w-fit"
            style={{
              background: `${colors.terracotta}CC`,
              color: colors.warmWhite,
              fontFamily: "var(--font-lora), Georgia, serif",
            }}
          >
            {type}
          </span>
          <h3
            className={`font-bold mb-3 ${large ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"}`}
            style={{
              color: colors.warmWhite,
              fontFamily: "var(--font-newsreader), Georgia, serif",
            }}
          >
            {name}
          </h3>
          <p
            className="text-sm md:text-base leading-relaxed"
            style={{
              color: `${colors.warmWhite}CC`,
              fontFamily: "var(--font-lora), Georgia, serif",
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Timeline Step Component ─── */
function TimelineStep({
  icon,
  title,
  description,
  index,
  isLast,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  isLast: boolean;
}) {
  const { ref, inView } = useInView(0.3);

  return (
    <div ref={ref} className="relative flex gap-6 md:gap-10">
      {/* Vertical line */}
      {!isLast && (
        <div
          className="absolute left-[27px] md:left-[31px] top-[64px] bottom-0 w-[3px]"
          style={{
            background: `linear-gradient(to bottom, ${colors.forest}40, ${colors.sage}20)`,
            transform: inView ? "scaleY(1)" : "scaleY(0)",
            transformOrigin: "top",
            transition: `transform 1s ease-out ${index * 0.3 + 0.5}s`,
          }}
        />
      )}

      {/* Node */}
      <div
        className="relative z-10 flex-shrink-0 flex items-center justify-center w-[56px] h-[56px] md:w-[64px] md:h-[64px] rounded-full transition-all duration-700"
        style={{
          background: inView ? colors.forest : colors.wheat,
          boxShadow: inView ? `0 0 0 8px ${colors.forest}15, 0 4px 20px ${colors.forest}20` : "none",
          transform: inView ? "scale(1)" : "scale(0.5)",
          transition: `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.3}s`,
        }}
      >
        <div style={{ filter: "brightness(0) invert(1)" }}>{icon}</div>
      </div>

      {/* Content */}
      <div
        className="flex-1 pb-12 md:pb-16"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateX(0)" : "translateX(20px)",
          transition: `all 0.8s ease-out ${index * 0.3 + 0.2}s`,
        }}
      >
        <h3
          className="text-xl md:text-2xl font-bold mb-2"
          style={{ color: colors.forest, fontFamily: "var(--font-newsreader), Georgia, serif" }}
        >
          {title}
        </h3>
        <p
          className="text-base md:text-lg leading-relaxed"
          style={{ color: colors.moss, fontFamily: "var(--font-lora), Georgia, serif" }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

/* ─── Value Card Component ─── */
function ValueCard({ icon, title, description, delay }: { icon: React.ReactNode; title: string; description: string; delay: number }) {
  const { ref, inView } = useInView(0.2);

  return (
    <div
      ref={ref}
      className="group"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`,
      }}
    >
      <div
        className="relative p-8 md:p-12 text-center transition-all duration-500 group-hover:shadow-lg overflow-hidden"
        style={{
          background: `linear-gradient(145deg, ${colors.warmWhite}, ${colors.parchment})`,
          borderRadius: "24px",
          border: `1px solid ${colors.wheat}`,
        }}
      >
        {/* Subtle background decoration */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 70%, ${colors.forest} 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />

        <div className="relative z-10">
          <div className="flex justify-center mb-6 transition-transform duration-700 group-hover:scale-110">
            {icon}
          </div>
          <h3
            className="text-2xl md:text-3xl font-bold mb-4"
            style={{ color: colors.forest, fontFamily: "var(--font-newsreader), Georgia, serif" }}
          >
            {title}
          </h3>
          <p
            className="text-base md:text-lg leading-relaxed max-w-sm mx-auto"
            style={{ color: colors.moss, fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function DescomplicaiOrganic() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /* Scroll listener for navbar shadow */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  /* Section refs for smooth scroll */
  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
    }
  }, []);

  const navLinks = [
    { label: "Missao", id: "mission" },
    { label: "Servicos", id: "services" },
    { label: "Projetos", id: "projects" },
    { label: "Processo", id: "process" },
    { label: "Valores", id: "values" },
    { label: "Contacto", id: "cta" },
  ];

  /* ─── Hero section inView ─── */
  const heroRef = useInView(0.1);
  const missionRef = useInView(0.15);

  return (
    <>
      {/* ─── Global Styles ─── */}
      <style jsx global>{`
        @keyframes leafFloat1 {
          0% { transform: translateY(-40px) rotate(0deg) translateX(0); opacity: 0; }
          10% { opacity: 0.4; }
          50% { transform: translateY(50vh) rotate(180deg) translateX(80px); opacity: 0.3; }
          90% { opacity: 0.1; }
          100% { transform: translateY(105vh) rotate(360deg) translateX(-30px); opacity: 0; }
        }
        @keyframes leafFloat2 {
          0% { transform: translateY(-40px) rotate(0deg) translateX(0); opacity: 0; }
          10% { opacity: 0.35; }
          50% { transform: translateY(55vh) rotate(-150deg) translateX(-60px); opacity: 0.25; }
          90% { opacity: 0.1; }
          100% { transform: translateY(105vh) rotate(-320deg) translateX(50px); opacity: 0; }
        }
        @keyframes leafFloat3 {
          0% { transform: translateY(-40px) rotate(0deg) translateX(0); opacity: 0; }
          10% { opacity: 0.3; }
          40% { transform: translateY(40vh) rotate(120deg) translateX(40px); }
          70% { transform: translateY(70vh) rotate(240deg) translateX(-50px); opacity: 0.2; }
          100% { transform: translateY(105vh) rotate(400deg) translateX(20px); opacity: 0; }
        }
        @keyframes branchGrow {
          0% { stroke-dashoffset: 600; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-branchGrow {
          animation: branchGrow 3s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blobMorph {
          0%, 100% { border-radius: 42% 58% 40% 60% / 55% 45% 55% 45%; }
          25% { border-radius: 52% 48% 55% 45% / 45% 55% 48% 52%; }
          50% { border-radius: 45% 55% 48% 52% / 52% 48% 45% 55%; }
          75% { border-radius: 55% 45% 42% 58% / 48% 52% 55% 45%; }
        }
        @keyframes organicPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        @keyframes rootGrow {
          from { stroke-dashoffset: 200; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes waveFlow {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-10px); }
        }
        @keyframes gentleSway {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes textReveal {
          from { opacity: 0; transform: translateY(20px) rotateX(10deg); }
          to { opacity: 1; transform: translateY(0) rotateX(0deg); }
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.5); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes subtleFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        /* Scrollbar styling */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: ${colors.sand}; }
        ::-webkit-scrollbar-thumb { background: ${colors.sage}; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: ${colors.forest}; }

        /* Selection color */
        ::selection { background: ${colors.sage}40; color: ${colors.forest}; }
      `}</style>

      <div style={{ background: colors.sand, minHeight: "100vh", overflowX: "hidden" }}>

        {/* ══════════════════════════════════════════════
            1. NAVBAR
            ══════════════════════════════════════════════ */}
        <nav
          className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
          style={{
            background: scrolled ? `${colors.warmWhite}F2` : `${colors.warmWhite}CC`,
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: scrolled
              ? `0 4px 30px ${colors.forest}10, 0 1px 3px ${colors.forest}08`
              : "none",
            borderBottom: scrolled ? `1px solid ${colors.wheat}` : "1px solid transparent",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Logo */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-2 group"
              >
                <LeafIcon size={28} color={colors.forest} className="transition-transform duration-500 group-hover:rotate-12" />
                <span
                  className="text-xl md:text-2xl font-light tracking-tight"
                  style={{
                    color: colors.forest,
                    fontFamily: "var(--font-newsreader), Georgia, serif",
                  }}
                >
                  descomplicai
                </span>
              </button>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="relative text-sm tracking-wide transition-colors duration-300 hover:opacity-100 opacity-70 group"
                    style={{
                      color: colors.forest,
                      fontFamily: "var(--font-lora), Georgia, serif",
                    }}
                  >
                    {link.label}
                    <span
                      className="absolute -bottom-1 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full"
                      style={{ background: colors.terracotta }}
                    />
                  </button>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden flex flex-col gap-1.5 p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <span
                  className="block w-6 h-[2px] transition-all duration-300"
                  style={{
                    background: colors.forest,
                    transform: mobileMenuOpen ? "rotate(45deg) translateY(5px)" : "none",
                  }}
                />
                <span
                  className="block w-6 h-[2px] transition-all duration-300"
                  style={{
                    background: colors.forest,
                    opacity: mobileMenuOpen ? 0 : 1,
                  }}
                />
                <span
                  className="block w-6 h-[2px] transition-all duration-300"
                  style={{
                    background: colors.forest,
                    transform: mobileMenuOpen ? "rotate(-45deg) translateY(-5px)" : "none",
                  }}
                />
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <div
            className="md:hidden overflow-hidden transition-all duration-500"
            style={{
              maxHeight: mobileMenuOpen ? "400px" : "0",
              opacity: mobileMenuOpen ? 1 : 0,
              background: colors.warmWhite,
              borderTop: mobileMenuOpen ? `1px solid ${colors.wheat}` : "none",
            }}
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left text-base py-2 transition-colors duration-300"
                  style={{
                    color: colors.forest,
                    fontFamily: "var(--font-lora), Georgia, serif",
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* ══════════════════════════════════════════════
            2. HERO
            ══════════════════════════════════════════════ */}
        <section
          className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
          style={{ background: colors.warmWhite }}
        >
          {/* Floating Leaves */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <FloatingLeaf key={i} index={i} />
          ))}

          {/* Branch Decorations */}
          <HeroBranchLeft />
          <HeroBranchRight />

          {/* Subtle texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.015] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, ${colors.forest} 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />

          {/* Hero Content */}
          <div
            ref={heroRef.ref}
            className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center"
          >
            {/* Tag */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: `${colors.sage}20`,
                border: `1px solid ${colors.sage}40`,
                opacity: heroRef.inView ? 1 : 0,
                transform: heroRef.inView ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.8s ease-out 0.2s",
              }}
            >
              <LeafIcon2 size={16} color={colors.forest} />
              <span
                className="text-sm tracking-wider uppercase"
                style={{
                  color: colors.forest,
                  fontFamily: "var(--font-lora), Georgia, serif",
                }}
              >
                Cultivamos presenca digital
              </span>
            </div>

            {/* Main Heading */}
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-8"
              style={{
                color: colors.forest,
                fontFamily: "var(--font-newsreader), Georgia, serif",
                opacity: heroRef.inView ? 1 : 0,
                transform: heroRef.inView ? "translateY(0)" : "translateY(30px)",
                transition: "all 1s ease-out 0.4s",
              }}
            >
              Tecnologia que{" "}
              <span
                className="relative inline-block"
                style={{
                  background: `linear-gradient(135deg, ${colors.forest}, ${colors.sage})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                cresce
                {/* Underline decoration */}
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                  preserveAspectRatio="none"
                  style={{ height: "12px" }}
                >
                  <path
                    d="M2,8 Q50,2 100,7 Q150,12 198,5"
                    stroke={colors.terracotta}
                    strokeWidth={3}
                    strokeLinecap="round"
                    fill="none"
                    opacity={0.6}
                  />
                </svg>
              </span>{" "}
              contigo.
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed"
              style={{
                color: colors.moss,
                fontFamily: "var(--font-lora), Georgia, serif",
                fontStyle: "italic",
                opacity: heroRef.inView ? 1 : 0,
                transform: heroRef.inView ? "translateY(0)" : "translateY(20px)",
                transition: "all 1s ease-out 0.6s",
              }}
            >
              Websites artesanais, inteligencia artificial acessivel e branding
              que respira. Tudo feito a mao, para pessoas reais.
            </p>

            {/* Buttons */}
            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              style={{
                opacity: heroRef.inView ? 1 : 0,
                transform: heroRef.inView ? "translateY(0)" : "translateY(20px)",
                transition: "all 1s ease-out 0.8s",
              }}
            >
              <button
                onClick={() => scrollToSection("cta")}
                className="px-8 py-4 text-base font-medium transition-all duration-500 hover:shadow-lg"
                style={{
                  background: colors.forest,
                  color: colors.warmWhite,
                  borderRadius: "16px",
                  fontFamily: "var(--font-lora), Georgia, serif",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = colors.forestLight;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = colors.forest;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                Vamos conversar
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="px-8 py-4 text-base font-medium transition-all duration-500"
                style={{
                  background: "transparent",
                  color: colors.terracotta,
                  borderRadius: "16px",
                  border: `2px solid ${colors.terracotta}`,
                  fontFamily: "var(--font-lora), Georgia, serif",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = `${colors.terracotta}10`;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                Ver servicos
              </button>
            </div>

            {/* Scroll indicator */}
            <div
              className="mt-16 flex flex-col items-center gap-2"
              style={{
                opacity: heroRef.inView ? 0.5 : 0,
                transition: "opacity 1s ease-out 1.2s",
                animation: "subtleFloat 3s ease-in-out infinite",
              }}
            >
              <span
                className="text-xs uppercase tracking-widest"
                style={{ color: colors.moss, fontFamily: "var(--font-lora), Georgia, serif" }}
              >
                Descobre mais
              </span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 5V19M12 19L6 13M12 19L18 13" stroke={colors.moss} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </section>

        {/* Wave Divider: Hero → Mission */}
        <WaveDivider1 fill={colors.sand} />

        {/* ══════════════════════════════════════════════
            3. MISSION / STORY
            ══════════════════════════════════════════════ */}
        <section
          id="mission"
          className="relative py-20 md:py-32"
          style={{ background: colors.sand }}
        >
          {/* Dot pattern background */}
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, ${colors.forest} 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />

          <div ref={missionRef.ref} className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
              {/* Left: Pull Quote */}
              <div
                style={{
                  opacity: missionRef.inView ? 1 : 0,
                  transform: missionRef.inView ? "translateX(0)" : "translateX(-40px)",
                  transition: "all 1s ease-out 0.2s",
                }}
              >
                <div className="relative">
                  {/* Decorative quote mark */}
                  <span
                    className="absolute -top-8 -left-4 text-[120px] md:text-[160px] leading-none pointer-events-none select-none"
                    style={{
                      color: colors.sage,
                      opacity: 0.15,
                      fontFamily: "var(--font-newsreader), Georgia, serif",
                    }}
                  >
                    &ldquo;
                  </span>

                  <blockquote
                    className="relative text-3xl md:text-4xl lg:text-5xl leading-tight font-light"
                    style={{
                      color: colors.forest,
                      fontFamily: "var(--font-newsreader), Georgia, serif",
                      fontStyle: "italic",
                    }}
                  >
                    Acreditamos que a tecnologia deve ser tao natural quanto respirar.
                  </blockquote>

                  {/* Attribution line */}
                  <div className="mt-8 flex items-center gap-3">
                    <div
                      className="w-12 h-[2px]"
                      style={{ background: colors.terracotta }}
                    />
                    <span
                      className="text-sm uppercase tracking-widest"
                      style={{
                        color: colors.terracotta,
                        fontFamily: "var(--font-lora), Georgia, serif",
                      }}
                    >
                      A nossa filosofia
                    </span>
                  </div>
                </div>

                <p
                  className="mt-8 text-base md:text-lg leading-relaxed"
                  style={{
                    color: colors.moss,
                    fontFamily: "var(--font-lora), Georgia, serif",
                  }}
                >
                  Nascemos da vontade de simplificar. Cada projeto e uma semente
                  que plantamos com cuidado — desde a primeira conversa ate ao ultimo
                  pixel. Sem complicacoes, sem jargao. So resultados que crescem.
                </p>
              </div>

              {/* Right: Organic Shape Image Placeholder */}
              <div
                className="relative"
                style={{
                  opacity: missionRef.inView ? 1 : 0,
                  transform: missionRef.inView ? "translateX(0)" : "translateX(40px)",
                  transition: "all 1s ease-out 0.4s",
                }}
              >
                <div
                  className="relative w-full aspect-square max-w-md mx-auto overflow-hidden"
                  style={{
                    clipPath: "polygon(25% 0%, 80% 5%, 100% 30%, 95% 75%, 70% 100%, 20% 95%, 0% 70%, 5% 25%)",
                  }}
                >
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${colors.sage}40, ${colors.forest}20, ${colors.olive}30)`,
                    }}
                  >
                    {/* Botanical illustration placeholder */}
                    <div className="relative">
                      <TreeIcon size={120} color={colors.forest} />
                      <div className="absolute -top-4 -right-8" style={{ animation: "gentleSway 4s ease-in-out infinite" }}>
                        <LeafIcon size={32} color={colors.sage} />
                      </div>
                      <div className="absolute -bottom-2 -left-6" style={{ animation: "gentleSway 5s ease-in-out infinite 1s" }}>
                        <LeafIcon2 size={28} color={colors.olive} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating accent circles */}
                <div
                  className="absolute -top-4 -right-4 w-16 h-16 rounded-full"
                  style={{
                    background: `${colors.terracotta}15`,
                    animation: "subtleFloat 6s ease-in-out infinite",
                  }}
                />
                <div
                  className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full"
                  style={{
                    background: `${colors.sage}10`,
                    animation: "subtleFloat 7s ease-in-out infinite 2s",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Wave Divider: Mission → Stats */}
        <WaveDivider2 fill={colors.warmWhite} />

        {/* ══════════════════════════════════════════════
            4. STATS
            ══════════════════════════════════════════════ */}
        <section className="relative py-20 md:py-32" style={{ background: colors.warmWhite }}>
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16 md:mb-20">
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                style={{
                  color: colors.forest,
                  fontFamily: "var(--font-newsreader), Georgia, serif",
                }}
              >
                Numeros que falam
              </h2>
              <p
                className="text-base md:text-lg max-w-lg mx-auto"
                style={{
                  color: colors.moss,
                  fontFamily: "var(--font-lora), Georgia, serif",
                }}
              >
                Cada numero conta uma historia de compromisso e proximidade.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <StatCard
                value={160}
                suffix="+"
                label="Projetos"
                icon={<LeafIcon size={36} color={colors.forest} />}
                delay={0}
              />
              <StatCard
                value={36}
                suffix=""
                label="Ferramentas"
                icon={<BranchIcon size={36} color={colors.sage} />}
                delay={0.15}
              />
              <StatCard
                value={6}
                suffix=""
                label="Regioes"
                icon={<SunIcon size={36} color={colors.clay} />}
                delay={0.3}
              />
              <StatCard
                value={100}
                suffix="%"
                label="Portugues"
                icon={<LeafIcon3 size={36} color={colors.olive} />}
                delay={0.45}
              />
            </div>
          </div>
        </section>

        {/* Wave Divider: Stats → Services */}
        <WaveDivider3 fill={colors.cream} />

        {/* ══════════════════════════════════════════════
            5. SERVICES
            ══════════════════════════════════════════════ */}
        <section
          id="services"
          className="relative py-20 md:py-32"
          style={{ background: colors.cream }}
        >
          {/* Subtle organic texture */}
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232D5016' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16 md:mb-20">
              <div className="flex justify-center mb-4">
                <LeafIcon2 size={32} color={colors.forest} />
              </div>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                style={{
                  color: colors.forest,
                  fontFamily: "var(--font-newsreader), Georgia, serif",
                }}
              >
                O que cultivamos
              </h2>
              <p
                className="text-base md:text-lg max-w-lg mx-auto"
                style={{
                  color: colors.moss,
                  fontFamily: "var(--font-lora), Georgia, serif",
                }}
              >
                Servicos pensados para crescer, nao para complicar.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <ServiceCard
                icon={<LeafIcon size={40} color={colors.forest} />}
                title="Websites Artesanais"
                description="Sites feitos a mao, com atencao ao detalhe. Design unico, codigo limpo, performance impecavel. Cada pixel tem proposito."
                delay={0}
              />
              <ServiceCard
                icon={<SunIcon size={40} color={colors.clay} />}
                title="IA Natural"
                description="Inteligencia artificial que nao assusta. Chatbots, automacoes e ferramentas inteligentes — tudo explicado em portugues simples."
                delay={0.15}
              />
              <ServiceCard
                icon={<BranchIcon size={40} color={colors.sage} />}
                title="Branding Organico"
                description="Identidades visuais que respiram. Logos, paletas, tipografia e guias de marca que contam a tua historia de forma autentica."
                delay={0.3}
              />
              <ServiceCard
                icon={<WaterIcon size={40} color={colors.sage} />}
                title="Marketing Sustentavel"
                description="Estrategias que crescem no tempo. SEO, conteudo, redes sociais e campanhas com resultados reais, nao metricas vazias."
                delay={0.45}
              />
            </div>
          </div>
        </section>

        {/* Wave Divider: Services → Projects */}
        <WaveDivider4 fill={colors.parchment} />

        {/* ══════════════════════════════════════════════
            6. FEATURED PROJECTS
            ══════════════════════════════════════════════ */}
        <section
          id="projects"
          className="relative py-20 md:py-32"
          style={{ background: colors.parchment }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16 md:mb-20">
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                style={{
                  color: colors.forest,
                  fontFamily: "var(--font-newsreader), Georgia, serif",
                }}
              >
                Projetos em flor
              </h2>
              <p
                className="text-base md:text-lg max-w-lg mx-auto"
                style={{
                  color: colors.moss,
                  fontFamily: "var(--font-lora), Georgia, serif",
                }}
              >
                Cada projeto comecou como uma ideia. Estes ja deram fruto.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8 auto-rows-auto">
              <ProjectCard
                name="Ribeiro Santo"
                type="Enoturismo"
                description="Quinta vinicola no Dao — vinhos premiados, visitas guiadas e experiencias de vindima. 8 paginas de historia e sabor."
                large={true}
                delay={0}
              />
              <ProjectCard
                name="BFitFam"
                type="Fitness"
                description="Plataforma de personal training com app de treinos interativa e tracking de progresso. Saude que se move."
                delay={0.2}
              />
              <ProjectCard
                name="NinikaTours"
                type="Gastronomia"
                description="Experiencias de vinho vulcanico e gastronomia acoriana na Ilha Terceira. Sabores da terra ao prato."
                delay={0.35}
              />
            </div>
          </div>
        </section>

        {/* Wave Divider: Projects → Process */}
        <WaveDivider5 fill={colors.sand} />

        {/* ══════════════════════════════════════════════
            7. PROCESS — From Seed to Harvest
            ══════════════════════════════════════════════ */}
        <section
          id="process"
          className="relative py-20 md:py-32"
          style={{ background: colors.sand }}
        >
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16 md:mb-20">
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                style={{
                  color: colors.forest,
                  fontFamily: "var(--font-newsreader), Georgia, serif",
                }}
              >
                Da semente a colheita
              </h2>
              <p
                className="text-base md:text-lg max-w-lg mx-auto"
                style={{
                  color: colors.moss,
                  fontFamily: "var(--font-lora), Georgia, serif",
                }}
              >
                Um processo organico, com o ritmo certo para cada fase.
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              <TimelineStep
                icon={<SeedIcon size={28} color={colors.warmWhite} />}
                title="Semente"
                description="Tudo comeca com uma conversa. Ouvimos a tua ideia, entendemos o teu mundo e plantamos juntos a primeira semente do projeto."
                index={0}
                isLast={false}
              />
              <TimelineStep
                icon={<RootIcon size={28} color={colors.warmWhite} />}
                title="Raiz"
                description="Pesquisa, estrategia e arquitectura. Construimos as fundacoes solidas — wireframes, conteudo, estrutura tecnica. Raizes fortes dao arvores saudaveis."
                index={1}
                isLast={false}
              />
              <TimelineStep
                icon={<SproutIcon size={28} color={colors.warmWhite} />}
                title="Crescimento"
                description="Design, desenvolvimento e iteracao. Aqui o projeto ganha forma — cada detalhe e regado com atencao, cada funcionalidade testada ao sol."
                index={2}
                isLast={false}
              />
              <TimelineStep
                icon={<FruitIcon size={28} color={colors.warmWhite} />}
                title="Colheita"
                description="Lancamento, otimizacao e entrega. O projeto esta pronto para o mundo. Mas nao acaba aqui — continuamos a cuidar, a podar, a fazer crescer."
                index={3}
                isLast={true}
              />
            </div>
          </div>
        </section>

        {/* Wave Divider: Process → Values */}
        <WaveDivider6 fill={colors.warmWhite} />

        {/* ══════════════════════════════════════════════
            8. VALUES
            ══════════════════════════════════════════════ */}
        <section
          id="values"
          className="relative py-20 md:py-32"
          style={{ background: colors.warmWhite }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16 md:mb-20">
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                style={{
                  color: colors.forest,
                  fontFamily: "var(--font-newsreader), Georgia, serif",
                }}
              >
                As nossas raizes
              </h2>
              <p
                className="text-base md:text-lg max-w-lg mx-auto"
                style={{
                  color: colors.moss,
                  fontFamily: "var(--font-lora), Georgia, serif",
                }}
              >
                Tres principios que guiam tudo o que fazemos.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              <ValueCard
                icon={<RootIcon size={64} color={colors.bark} />}
                title="Transparencia"
                description="Sem letras pequenas, sem surpresas. Cada decisao e partilhada, cada custo e claro. Raizes visiveis dao confianca."
                delay={0}
              />
              <ValueCard
                icon={<LeafIcon size={64} color={colors.forest} />}
                title="Simplicidade"
                description="Complicar e facil. Simplificar e arte. Tiramos o ruido e ficamos com o essencial — tecnologia que qualquer pessoa entende."
                delay={0.15}
              />
              <ValueCard
                icon={<TreeIcon size={64} color={colors.forest} />}
                title="Comunidade"
                description="Nao somos fornecedores, somos parceiros. Crescemos com quem confia em nos e devolvemos a comunidade o que recebemos."
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* Wave Divider: Values → CTA */}
        <WaveDivider7 fill={colors.sage} className="opacity-30" />

        {/* ══════════════════════════════════════════════
            9. CTA
            ══════════════════════════════════════════════ */}
        <section
          id="cta"
          className="relative py-24 md:py-36 overflow-hidden"
          style={{
            background: `linear-gradient(160deg, ${colors.sage}30, ${colors.forest}15, ${colors.sage}20)`,
          }}
        >
          {/* Background botanical pattern */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 opacity-10">
              <LeafIcon size={80} color={colors.forest} />
            </div>
            <div className="absolute bottom-10 right-10 opacity-10" style={{ transform: "rotate(180deg)" }}>
              <LeafIcon2 size={60} color={colors.forest} />
            </div>
            <div className="absolute top-1/2 left-1/4 opacity-5">
              <TreeIcon size={100} color={colors.forest} />
            </div>
            <div className="absolute bottom-1/4 right-1/3 opacity-5" style={{ animation: "gentleSway 8s ease-in-out infinite" }}>
              <BranchIcon size={60} color={colors.forest} />
            </div>
          </div>

          <CtaContent scrollToSection={scrollToSection} />
        </section>

        {/* ══════════════════════════════════════════════
            10. FOOTER
            ══════════════════════════════════════════════ */}
        <footer
          className="relative py-16 md:py-20"
          style={{
            background: colors.sand,
            borderTop: `1px solid ${colors.wheat}`,
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-12 md:gap-16 mb-12">
              {/* Col 1: Brand */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <LeafIcon size={24} color={colors.forest} />
                  <span
                    className="text-xl font-light"
                    style={{
                      color: colors.forest,
                      fontFamily: "var(--font-newsreader), Georgia, serif",
                    }}
                  >
                    descomplicai
                  </span>
                </div>
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{
                    color: colors.moss,
                    fontFamily: "var(--font-lora), Georgia, serif",
                  }}
                >
                  Cultivamos presenca digital para pessoas e empresas em Portugal.
                  Tecnologia acessivel, design humano, resultados reais.
                </p>
                {/* Botanical accent */}
                <div className="flex items-center gap-2 opacity-40">
                  <LeafIcon3 size={16} color={colors.olive} />
                  <LeafIcon size={14} color={colors.sage} />
                  <LeafIcon2 size={16} color={colors.moss} />
                </div>
              </div>

              {/* Col 2: Links */}
              <div>
                <h4
                  className="text-sm uppercase tracking-widest mb-4"
                  style={{
                    color: colors.forest,
                    fontFamily: "var(--font-lora), Georgia, serif",
                  }}
                >
                  Navegar
                </h4>
                <div className="flex flex-col gap-3">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => scrollToSection(link.id)}
                      className="text-left text-sm transition-colors duration-300 hover:opacity-100 opacity-60"
                      style={{
                        color: colors.forest,
                        fontFamily: "var(--font-lora), Georgia, serif",
                      }}
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Col 3: Contact */}
              <div>
                <h4
                  className="text-sm uppercase tracking-widest mb-4"
                  style={{
                    color: colors.forest,
                    fontFamily: "var(--font-lora), Georgia, serif",
                  }}
                >
                  Contacto
                </h4>
                <div className="flex flex-col gap-3">
                  <a
                    href="mailto:geral@descomplicai.pt"
                    className="text-sm transition-colors duration-300 hover:opacity-100 opacity-60"
                    style={{
                      color: colors.forest,
                      fontFamily: "var(--font-lora), Georgia, serif",
                    }}
                  >
                    geral@descomplicai.pt
                  </a>
                  <a
                    href="https://descomplicai.pt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-colors duration-300 hover:opacity-100 opacity-60"
                    style={{
                      color: colors.forest,
                      fontFamily: "var(--font-lora), Georgia, serif",
                    }}
                  >
                    descomplicai.pt
                  </a>
                  <span
                    className="text-sm opacity-60"
                    style={{
                      color: colors.forest,
                      fontFamily: "var(--font-lora), Georgia, serif",
                    }}
                  >
                    Figueira da Foz, Portugal
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div
              className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
              style={{ borderTop: `1px solid ${colors.wheat}` }}
            >
              <p
                className="text-xs opacity-50"
                style={{
                  color: colors.forest,
                  fontFamily: "var(--font-lora), Georgia, serif",
                }}
              >
                &copy; {new Date().getFullYear()} Descomplicai. Todos os direitos reservados.
              </p>
              <div className="flex items-center gap-2 text-xs opacity-40" style={{ color: colors.forest }}>
                <span style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
                  Portugal &middot; Cultivado com cuidado
                </span>
                <LeafIcon size={14} color={colors.forest} />
              </div>
            </div>
          </div>
        </footer>

        {/* ─── Back to Portfolio Link ─── */}
        <div
          className="py-6 text-center"
          style={{ background: colors.parchment }}
        >
          <Link
            href="/projetos"
            className="inline-flex items-center gap-2 text-sm transition-all duration-300 hover:gap-3"
            style={{
              color: colors.forest,
              fontFamily: "var(--font-lora), Georgia, serif",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Voltar ao portfolio
          </Link>
        </div>
      </div>
    </>
  );
}

/* ─── CTA Content (separated to use hooks) ─── */
function CtaContent({ scrollToSection }: { scrollToSection: (id: string) => void }) {
  const { ref, inView } = useInView(0.2);

  return (
    <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
      <h2
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
        style={{
          color: colors.forest,
          fontFamily: "var(--font-newsreader), Georgia, serif",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s ease-out",
        }}
      >
        Vamos plantar algo{" "}
        <span style={{ color: colors.terracotta }}>juntos</span>?
      </h2>

      <p
        className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        style={{
          color: colors.moss,
          fontFamily: "var(--font-lora), Georgia, serif",
          fontStyle: "italic",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: "all 1s ease-out 0.2s",
        }}
      >
        Tens uma ideia? Um projeto? Uma vontade? Fala connosco — sem
        compromisso, sem complicacoes. So uma conversa honesta sobre o
        que podemos construir juntos.
      </p>

      <div
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: "all 1s ease-out 0.4s",
        }}
      >
        <a
          href="mailto:geral@descomplicai.pt"
          className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium transition-all duration-500 hover:shadow-lg"
          style={{
            background: colors.forest,
            color: colors.warmWhite,
            borderRadius: "60px",
            fontFamily: "var(--font-lora), Georgia, serif",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = colors.forestLight;
            (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = colors.forest;
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 3H15C15.825 3 16.5 3.675 16.5 4.5V13.5C16.5 14.325 15.825 15 15 15H3C2.175 15 1.5 14.325 1.5 13.5V4.5C1.5 3.675 2.175 3 3 3Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16.5 4.5L9 9.75L1.5 4.5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Enviar email
        </a>
        <a
          href="https://descomplicai.pt"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium transition-all duration-500"
          style={{
            background: "transparent",
            color: colors.forest,
            borderRadius: "60px",
            border: `2px solid ${colors.forest}40`,
            fontFamily: "var(--font-lora), Georgia, serif",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = `${colors.forest}08`;
            (e.currentTarget as HTMLElement).style.borderColor = colors.forest;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.borderColor = `${colors.forest}40`;
          }}
        >
          Visitar site
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      {/* Contact details */}
      <div
        className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm"
        style={{
          opacity: inView ? 0.6 : 0,
          transition: "opacity 1s ease-out 0.6s",
          color: colors.moss,
          fontFamily: "var(--font-lora), Georgia, serif",
        }}
      >
        <span>geral@descomplicai.pt</span>
        <span className="hidden sm:inline">&middot;</span>
        <span>descomplicai.pt</span>
        <span className="hidden sm:inline">&middot;</span>
        <span>Figueira da Foz, Portugal</span>
      </div>
    </div>
  );
}
