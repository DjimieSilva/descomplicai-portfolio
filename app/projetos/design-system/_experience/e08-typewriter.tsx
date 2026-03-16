"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface TerminalLine {
  text: string;
  color: string;
  className?: string;
}

const commandLines: TerminalLine[] = [
  { text: "$ npx create-design-system", color: "text-green-400" },
  {
    text: "\u2192 Installing GSAP, Lenis, Framer Motion...",
    color: "text-slate-300",
  },
  { text: "\u2192 Creating 15 components...", color: "text-slate-300" },
  {
    text: "\u2192 Configuring ScrollTrigger...",
    color: "text-slate-300",
  },
  {
    text: "\u2192 Running performance audit...",
    color: "text-slate-300",
  },
  {
    text: "\u2713 All components < 2KB gzipped",
    color: "text-green-400",
  },
  {
    text: "\u2713 60fps across all animations",
    color: "text-green-400",
  },
  { text: "\u2713 Zero TypeScript errors", color: "text-green-400" },
  {
    text: "$ echo 'Design System ready.'",
    color: "text-white",
  },
  {
    text: "Design System ready.",
    color: "text-cyan-400",
    className: "font-bold text-base",
  },
];

export function TypewriterSection() {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [lines, setLines] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<NodeJS.Timeout | null>(null);

  // IntersectionObserver to start typing when in view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          setIsTyping(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  // Typewriter logic
  useEffect(() => {
    if (!isTyping) return;
    if (currentLineIndex >= commandLines.length) {
      setIsTyping(false);
      return;
    }

    const currentLine = commandLines[currentLineIndex];

    if (currentCharIndex < currentLine.text.length) {
      typingRef.current = setTimeout(() => {
        setCurrentCharIndex((prev) => prev + 1);
      }, 40);
    } else {
      // Line complete — push to completed lines and move to next
      typingRef.current = setTimeout(() => {
        setLines((prev) => [...prev, currentLine.text]);
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 300);
    }

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [isTyping, currentLineIndex, currentCharIndex]);

  const isFinished = currentLineIndex >= commandLines.length;
  const currentText =
    !isFinished && hasStarted
      ? commandLines[currentLineIndex].text.slice(0, currentCharIndex)
      : "";

  return (
    <section ref={sectionRef} className="bg-[#fafaf9] py-32 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Terminal window */}
        <div className="rounded-2xl bg-slate-900 overflow-hidden shadow-2xl">
          {/* Top bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/60 border-b border-slate-700/50">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-3 text-slate-500 text-xs">terminal</span>
          </div>

          {/* Terminal body */}
          <div className="p-8 font-mono text-sm text-slate-300 min-h-[360px]">
            {/* Completed lines */}
            {lines.map((line, i) => {
              const config = commandLines[i];
              return (
                <div
                  key={i}
                  className={`${config.color} ${config.className || ""} leading-relaxed`}
                >
                  {line}
                </div>
              );
            })}

            {/* Currently typing line */}
            {!isFinished && hasStarted && (
              <div
                className={`${commandLines[currentLineIndex].color} ${commandLines[currentLineIndex].className || ""} leading-relaxed`}
              >
                {currentText}
                <span className="inline-block w-[2px] h-[1em] bg-current ml-[1px] align-middle animate-blink" />
              </div>
            )}

            {/* Blinking cursor after finish */}
            {isFinished && (
              <div className="leading-relaxed">
                <span className="inline-block w-[2px] h-[1em] bg-slate-300 ml-[1px] align-middle animate-blink" />
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </section>
  );
}
