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

          {/* Right — hero image */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative w-full max-w-lg mx-auto rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/images/jardim/jardim-local-hero.png"
                alt="Jardineiro profissional a cuidar de um jardim no Algarve"
                className="w-full h-auto object-cover aspect-[4/3]"
                loading="eager"
              />
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: "linear-gradient(180deg, transparent 60%, rgba(22,163,74,0.1) 100%)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
