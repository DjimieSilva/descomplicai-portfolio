"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface TextScrambleProps {
  text: string;
  className?: string;
  speed?: number;
  charset?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  once?: boolean;
}

export function TextScramble({
  text,
  className,
  speed = 30,
  charset = "!<>-_\\/[]{}—=+*^?#________",
  as: Tag = "span",
  once = true,
}: TextScrambleProps) {
  const [display, setDisplay] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const hasTriggered = useRef(false);

  const scramble = useCallback(() => {
    const length = text.length;
    let resolvedCount = 0;
    let frameId: number;
    let lastTime = 0;

    const chars = charset;
    const randomChar = () => chars[Math.floor(Math.random() * chars.length)];

    const step = (time: number) => {
      if (time - lastTime >= speed) {
        lastTime = time;
        resolvedCount++;
      }

      let result = "";
      for (let i = 0; i < length; i++) {
        if (i < resolvedCount) {
          result += text[i];
        } else {
          result += randomChar();
        }
      }

      setDisplay(result);

      if (resolvedCount >= length) {
        setDisplay(text);
        setIsComplete(true);
        return;
      }

      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [text, speed, charset]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (once && hasTriggered.current) return;
          hasTriggered.current = true;
          setIsComplete(false);
          const cleanup = scramble();
          if (once) observer.unobserve(el);
          return cleanup;
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [scramble, once]);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement & HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>}
      className={cn(
        !isComplete && "font-mono",
        className
      )}
      aria-label={text}
    >
      {display || "\u00A0"}
    </Tag>
  );
}
