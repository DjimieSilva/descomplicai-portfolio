"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type ParallaxSectionProps = {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "vertical" | "horizontal";
};

export function ParallaxSection({
  children,
  className,
  speed = 0.3,
  direction = "vertical",
}: ParallaxSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !innerRef.current) return;

      let effectiveSpeed = speed;

      // Halve speed on touch/coarse-pointer devices for performance
      if (window.matchMedia("(pointer: coarse)").matches) {
        effectiveSpeed = speed * 0.5;
      }

      const distance = effectiveSpeed * 100; // percentage of viewport height

      const prop = direction === "vertical" ? "yPercent" : "xPercent";

      gsap.fromTo(
        innerRef.current,
        { [prop]: -distance },
        {
          [prop]: distance,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={cn("overflow-hidden", className)}>
      <div ref={innerRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
