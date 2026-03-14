"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  separator?: string;
  className?: string;
  speed?: number;
  reverse?: boolean;
}

export function Marquee({ items, separator = "✦", className, speed = 30, reverse = false }: MarqueeProps) {
  const content = items.join(` ${separator} `) + ` ${separator} `;
  return (
    <div className={cn("relative overflow-hidden whitespace-nowrap", className)}>
      <div
        className="inline-flex animate-marquee"
        style={{
          ["--duration" as string]: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <span className="px-2">{content}</span>
        <span className="px-2">{content}</span>
      </div>
    </div>
  );
}
