"use client";
import { useEffect, useRef, useState, useMemo } from "react";

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  gradient?: boolean;
}

export function BlurText({
  text,
  delay = 50,
  animateBy = "words",
  direction = "top",
  className = "",
  gradient = false,
}: BlurTextProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const segments = useMemo(
    () => (animateBy === "words" ? text.split(" ") : text.split("")),
    [text, animateBy]
  );

  return (
    <div ref={ref} className={`flex flex-wrap ${className}`}>
      {segments.map((segment, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            filter: inView ? "blur(0px)" : "blur(12px)",
            opacity: inView ? 1 : 0,
            transform: inView
              ? "translateY(0)"
              : `translateY(${direction === "top" ? "-24px" : "24px"})`,
            transition: `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * delay}ms`,
            ...(gradient
              ? {
                  background:
                    "linear-gradient(135deg, #2563eb 0%, #3b82f6 40%, #7c3aed 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }
              : {}),
          }}
        >
          {segment}
          {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </div>
  );
}
