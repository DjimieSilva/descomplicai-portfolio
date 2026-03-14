"use client";

import { cn } from "@/lib/utils";

interface ShimmerButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  shimmerColor?: string;
  bgColor?: string;
}

export function ShimmerButton({
  children,
  href,
  className,
  shimmerColor = "rgba(255,255,255,0.2)",
  bgColor = "#25D366",
}: ShimmerButtonProps) {
  const Comp = href ? "a" : "button";
  return (
    <Comp
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl",
        className
      )}
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="absolute inset-0 animate-shimmer"
        style={{
          backgroundImage: `linear-gradient(110deg, transparent 25%, ${shimmerColor} 50%, transparent 75%)`,
          backgroundSize: "200% 100%",
        }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Comp>
  );
}
