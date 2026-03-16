"use client";

import { useState, useRef, useEffect } from "react";

const faqItems = [
  {
    question: "Posso usar estes componentes no meu projecto?",
    answer:
      "Sim. Todos os 15 componentes sao independentes e podem ser copiados directamente. Nenhum tem dependencias internas — apenas React, Framer Motion e GSAP.",
  },
  {
    question: "Funciona com Next.js App Router?",
    answer:
      "Todos os componentes usam 'use client' e sao compativeis com Next.js 13+, incluindo React Server Components. Basta importar e usar.",
  },
  {
    question: "Como funciona o smooth scroll?",
    answer:
      "O Lenis intercepta eventos de scroll nativos e interpola a posicao com easing custom. Sincroniza com o GSAP via gsap.ticker para manter tudo a 60fps.",
  },
  {
    question: "E acessivel?",
    answer:
      "Sim. Todos os componentes respeitam prefers-reduced-motion, tem touch targets de 44px minimo, e suportam navegacao por teclado. O CursorFollower so aparece em dispositivos com hover.",
  },
  {
    question: "Qual e o impacto no bundle size?",
    answer:
      "O design system completo pesa ~12.9KB gzipped. Cada componente e tree-shakeable — importas apenas o que usas.",
  },
  {
    question: "Posso customizar as cores?",
    answer:
      "Todos os componentes aceitam className e props de cor. GlowCard aceita qualquer cor rgba, Spotlight aceita classes Tailwind de gradiente, e AnimatedGradient aceita um array de 3 cores.",
  },
  {
    question: "Preciso do GSAP para tudo?",
    answer:
      "Nao. Apenas ParallaxSection e SmoothScrollProvider usam GSAP. Os restantes 13 componentes funcionam apenas com Framer Motion ou vanilla CSS.",
  },
  {
    question: "Como instalo?",
    answer:
      "npm install gsap @gsap/react lenis framer-motion. Copia os componentes de components/ui/ para o teu projecto. Pronto.",
  },
];

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div className="border-b border-slate-800 py-6">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center text-left group"
        aria-expanded={isOpen}
      >
        <span
          className={`text-lg font-medium transition-colors ${
            isOpen ? "text-blue-400" : "text-white group-hover:text-blue-400"
          }`}
        >
          {question}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`flex-shrink-0 ml-4 text-slate-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div
        style={{
          maxHeight: isOpen ? `${height}px` : "0px",
          opacity: isOpen ? 1 : 0,
          transition:
            "max-height 500ms cubic-bezier(0.16, 1, 0.3, 1), opacity 500ms cubic-bezier(0.16, 1, 0.3, 1)",
          overflow: "hidden",
        }}
      >
        <div ref={contentRef}>
          <p className="text-slate-400 text-base leading-relaxed pt-4">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function AccordionFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="bg-slate-950 py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-4">
          Perguntas Frequentes
        </h2>
        <p className="text-slate-400 text-center mb-16">
          Tudo o que precisas de saber sobre o Design System.
        </p>
        <div>
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
