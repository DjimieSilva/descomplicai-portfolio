"use client";
import { useEffect, useRef, useState, useMemo, type ElementType } from "react";
import { cn } from "@/lib/utils";

interface BlurTextProps {
  text: string;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  delay?: number;
  gradient?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  once?: boolean;
  threshold?: number;
}

export function BlurText({
  text,
  className,
  animateBy = "words",
  direction = "bottom",
  delay = 0,
  gradient = false,
  as: Tag = "p",
  once = true,
  threshold = 0.1,
}: BlurTextProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [once, threshold]);

  const segments = useMemo(
    () => (animateBy === "words" ? text.split(" ") : text.split("")),
    [text, animateBy]
  );

  const translateValue = direction === "top" ? "-24px" : "24px";
  const staggerMs = animateBy === "words" ? 80 : 30;

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement & HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>}
      className={cn("flex flex-wrap", className)}
    >
      {segments.map((segment, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            filter: inView ? "blur(0px)" : "blur(12px)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : `translateY(${translateValue})`,
            transition: `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay + i * staggerMs}ms`,
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
          {segment === " " ? "\u00A0" : segment}
          {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}
