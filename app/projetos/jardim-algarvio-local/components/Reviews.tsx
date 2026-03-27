"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    text: "Excelente serviço! O jardim ficou impecável. Equipa pontual e profissional. Recomendo a 100%.",
    name: "Maria Santos",
    location: "Albufeira",
  },
  {
    text: "Contratámos o plano Profissional e estamos muito satisfeitos. O jardim nunca esteve tão bonito.",
    name: "João e Ana Ferreira",
    location: "Vilamoura",
  },
  {
    text: "Resolveram o problema da rega que tínhamos há meses. Muito competentes e preço justo.",
    name: "Carlos Mendes",
    location: "Faro",
  },
  {
    text: "A poda das oliveiras ficou perfeita. Profissionais e cuidadosos. Voltarei a chamar.",
    name: "Teresa Almeida",
    location: "Tavira",
  },
  {
    text: "Fizeram a limpeza do terreno num dia. Trabalho rápido e organizado. Cinco estrelas!",
    name: "Rui Gonçalves",
    location: "Lagos",
  },
  {
    text: "O melhor serviço de jardinagem que já tive no Algarve. Jardim sempre impecável.",
    name: "Sandra Costa",
    location: "Loulé",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current" style={{ color: "#FBBF24" }} />
      ))}
    </div>
  );
}

export default function Reviews() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 sm:py-24" style={{ backgroundColor: "#F8FAF7" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <Star className="h-8 w-8 fill-current" style={{ color: "#FBBF24" }} />
            <span
              className="text-5xl font-extrabold"
              style={{ fontFamily: "var(--font-jakarta), sans-serif", color: "#1F2937" }}
            >
              4.9
            </span>
          </div>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-current" style={{ color: "#FBBF24" }} />
            ))}
          </div>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            com 127 avaliações
          </p>
          <h2
            className="mt-4 text-3xl font-bold sm:text-4xl"
            style={{ fontFamily: "var(--font-jakarta), sans-serif", color: "#1F2937" }}
          >
            O Que Dizem os Nossos Clientes
          </h2>
        </motion.div>

        {/* Horizontal scroll */}
        <div
          ref={ref}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
          style={{ scrollbarWidth: "thin" }}
        >
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              className="min-w-[300px] max-w-[340px] flex-shrink-0 snap-start rounded-2xl border p-6 flex flex-col"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Stars />
              <p className="mt-4 flex-1 text-sm leading-relaxed" style={{ color: "#1F2937" }}>
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#1F2937" }}>
                    {r.name}
                  </p>
                  <p className="text-xs" style={{ color: "#6B7280" }}>
                    {r.location}
                  </p>
                </div>
                {/* Google icon */}
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.76h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
