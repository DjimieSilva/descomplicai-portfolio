"use client";

import { motion } from "framer-motion";
import { Leaf, ArrowRight, CheckCircle } from "lucide-react";

const badges = [
  "+500 Clientes",
  "15 Anos Experiência",
  "Todo o Algarve",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold"
              style={{ backgroundColor: "#DCFCE7", color: "#15803D" }}
            >
              <Leaf className="h-4 w-4" />
              Jardinagem Profissional no Algarve
            </span>

            {/* H1 */}
            <h1
              className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-jakarta), sans-serif", color: "#1F2937" }}
            >
              Cuidamos do Seu Jardim Como Se Fosse Nosso
            </h1>

            {/* Subtitle */}
            <p className="mt-5 max-w-lg text-lg leading-relaxed" style={{ color: "#6B7280" }}>
              Serviço completo de jardinagem e manutenção em todo o Algarve.
              Orçamento grátis em 24 horas.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-base font-semibold text-white transition-colors"
                style={{ backgroundColor: "#16A34A" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#15803D")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#16A34A")}
              >
                Pedir Orçamento Grátis
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="#servicos"
                className="inline-flex items-center gap-2 rounded-xl border-2 px-7 py-3.5 text-base font-semibold transition-colors"
                style={{ borderColor: "#16A34A", color: "#16A34A" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#DCFCE7";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                Ver Serviços
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap gap-4 sm:gap-6">
              {badges.map((b) => (
                <span
                  key={b}
                  className="flex items-center gap-1.5 text-sm font-medium"
                  style={{ color: "#15803D" }}
                >
                  <CheckCircle className="h-4 w-4" />
                  {b}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — decorative */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div
              className="aspect-square w-full max-w-lg mx-auto rounded-3xl"
              style={{
                background:
                  "linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 30%, #86EFAC 60%, #4ADE80 100%)",
              }}
            >
              {/* Garden-themed SVG pattern */}
              <svg
                viewBox="0 0 400 400"
                className="h-full w-full p-8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Large leaf */}
                <path
                  d="M200 60 C240 100, 310 140, 300 220 C290 300, 220 340, 200 340 C180 340, 110 300, 100 220 C90 140, 160 100, 200 60Z"
                  fill="#16A34A"
                  opacity="0.3"
                />
                <path
                  d="M200 60 L200 340"
                  stroke="#15803D"
                  strokeWidth="2"
                  opacity="0.4"
                />
                {/* Veins */}
                <path d="M200 120 L150 180" stroke="#15803D" strokeWidth="1.5" opacity="0.3" />
                <path d="M200 120 L250 180" stroke="#15803D" strokeWidth="1.5" opacity="0.3" />
                <path d="M200 180 L130 240" stroke="#15803D" strokeWidth="1.5" opacity="0.3" />
                <path d="M200 180 L270 240" stroke="#15803D" strokeWidth="1.5" opacity="0.3" />
                <path d="M200 240 L150 290" stroke="#15803D" strokeWidth="1.5" opacity="0.3" />
                <path d="M200 240 L250 290" stroke="#15803D" strokeWidth="1.5" opacity="0.3" />

                {/* Small decorative leaves */}
                <circle cx="80" cy="80" r="20" fill="#22C55E" opacity="0.25" />
                <circle cx="320" cy="90" r="16" fill="#22C55E" opacity="0.2" />
                <circle cx="340" cy="300" r="24" fill="#22C55E" opacity="0.2" />
                <circle cx="60" cy="310" r="18" fill="#22C55E" opacity="0.25" />

                {/* Flowers */}
                <circle cx="100" cy="160" r="8" fill="#FBBF24" opacity="0.5" />
                <circle cx="300" cy="180" r="6" fill="#FBBF24" opacity="0.4" />
                <circle cx="130" cy="320" r="7" fill="#FBBF24" opacity="0.45" />
                <circle cx="280" cy="330" r="5" fill="#FBBF24" opacity="0.4" />

                {/* Sun */}
                <circle cx="320" cy="60" r="30" fill="#FBBF24" opacity="0.3" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
