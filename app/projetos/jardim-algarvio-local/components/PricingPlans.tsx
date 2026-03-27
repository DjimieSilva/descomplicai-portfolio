"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, MessageCircle } from "lucide-react";

interface Plan {
  name: string;
  price: string;
  period: string;
  features: string[];
  ideal: string;
  highlighted?: boolean;
}

const plans: Plan[] = [
  {
    name: "Básico",
    price: "89",
    period: "/mês",
    ideal: "Jardins até 200m²",
    features: [
      "Visitas quinzenais",
      "Corte de relva",
      "Aparação de sebes",
      "Rega manual",
    ],
  },
  {
    name: "Profissional",
    price: "149",
    period: "/mês",
    ideal: "Jardins até 500m²",
    highlighted: true,
    features: [
      "Visitas semanais",
      "Tudo do plano Básico",
      "Verificação do sistema de rega",
      "Adubação sazonal",
      "Controlo de pragas básico",
    ],
  },
  {
    name: "Premium",
    price: "249",
    period: "/mês",
    ideal: "Jardins até 1000m²",
    features: [
      "2 visitas semanais",
      "Tudo do plano Profissional",
      "Poda de árvores (trimestral)",
      "Tratamento fitossanitário",
      "Consultoria de design",
      "Relatório mensal",
    ],
  },
];

export default function PricingPlans() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="precos" className="py-20 sm:py-24" style={{ backgroundColor: "#F8FAF7" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <span
            className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold"
            style={{ backgroundColor: "#DCFCE7", color: "#15803D" }}
          >
            Planos de Manutenção
          </span>
          <h2
            className="mt-4 text-3xl font-bold sm:text-4xl"
            style={{ fontFamily: "var(--font-jakarta), sans-serif", color: "#1F2937" }}
          >
            Escolha o Plano Ideal para o Seu Jardim
          </h2>
          <p className="mt-3 text-base max-w-2xl mx-auto" style={{ color: "#6B7280" }}>
            Planos flexíveis adaptados ao tamanho do seu espaço verde. Sem fidelização.
          </p>
        </div>

        {/* Cards */}
        <div ref={ref} className="grid gap-8 md:grid-cols-3 items-stretch">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              className={`relative rounded-2xl border p-8 flex flex-col ${
                p.highlighted ? "md:-my-4 md:py-12 shadow-xl" : "shadow-sm"
              }`}
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: p.highlighted ? "#16A34A" : "#E5E7EB",
                borderWidth: p.highlighted ? "2px" : "1px",
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              {/* Popular badge */}
              {p.highlighted && (
                <span
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold text-white"
                  style={{ backgroundColor: "#EA580C" }}
                >
                  Mais Popular
                </span>
              )}

              <h3
                className="text-xl font-bold"
                style={{ fontFamily: "var(--font-jakarta), sans-serif", color: "#1F2937" }}
              >
                {p.name}
              </h3>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold" style={{ color: "#16A34A" }}>
                  €{p.price}
                </span>
                <span className="text-base" style={{ color: "#6B7280" }}>
                  {p.period}
                </span>
              </div>

              <p
                className="mt-2 text-sm font-medium"
                style={{ color: "#6B7280" }}
              >
                Ideal para: {p.ideal}
              </p>

              <hr className="my-6" style={{ borderColor: "#E5E7EB" }} />

              <ul className="flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm" style={{ color: "#1F2937" }}>
                    <Check className="h-5 w-5 shrink-0 mt-0.5" style={{ color: "#16A34A" }} />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="https://wa.me/351912345678?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20o%20plano%20"
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-colors ${
                  p.highlighted ? "text-white" : ""
                }`}
                style={{
                  backgroundColor: p.highlighted ? "#16A34A" : "transparent",
                  borderWidth: p.highlighted ? "0" : "2px",
                  borderColor: "#16A34A",
                  color: p.highlighted ? "#FFFFFF" : "#16A34A",
                }}
                onMouseEnter={(e) => {
                  if (p.highlighted) {
                    e.currentTarget.style.backgroundColor = "#15803D";
                  } else {
                    e.currentTarget.style.backgroundColor = "#DCFCE7";
                  }
                }}
                onMouseLeave={(e) => {
                  if (p.highlighted) {
                    e.currentTarget.style.backgroundColor = "#16A34A";
                  } else {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                <MessageCircle className="h-4 w-4" />
                Pedir Orçamento
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
