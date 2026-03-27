"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Scissors, TreePine, Droplets, TreeDeciduous, Shovel, Flower2 } from "lucide-react";

const services = [
  {
    icon: Scissors,
    title: "Manutenção de Jardins",
    desc: "Cuidado regular do seu jardim incluindo rega, adubação e controlo fitossanitário. Planos semanais ou quinzenais.",
  },
  {
    icon: TreePine,
    title: "Corte de Relva e Sebes",
    desc: "Corte profissional de relva, aparação de sebes e bordaduras. Equipamento especializado para todo o tipo de jardins.",
  },
  {
    icon: Droplets,
    title: "Sistemas de Rega",
    desc: "Instalação e manutenção de sistemas de rega automática. Eficiência hídrica adaptada ao clima algarvio.",
  },
  {
    icon: TreeDeciduous,
    title: "Poda de Árvores",
    desc: "Poda de formação e manutenção de árvores e arbustos. Técnicas certificadas e seguras.",
  },
  {
    icon: Shovel,
    title: "Limpeza de Terrenos",
    desc: "Limpeza completa de terrenos, remoção de entulho vegetal e preparação para novos projetos.",
  },
  {
    icon: Flower2,
    title: "Plantação e Design",
    desc: "Seleção e plantação de espécies adaptadas ao Algarve. Projetos de jardim personalizados.",
  },
];

export default function ServicesGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="servicos" className="py-20 sm:py-24" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <span
            className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold"
            style={{ backgroundColor: "#DCFCE7", color: "#15803D" }}
          >
            Os Nossos Serviços
          </span>
          <h2
            className="mt-4 text-3xl font-bold sm:text-4xl"
            style={{ fontFamily: "var(--font-jakarta), sans-serif", color: "#1F2937" }}
          >
            Soluções Completas para o Seu Jardim
          </h2>
          <p className="mt-3 text-base max-w-2xl mx-auto" style={{ color: "#6B7280" }}>
            Da manutenção regular à criação de novos espaços verdes, temos o serviço certo para si.
          </p>
        </div>

        {/* Grid */}
        <div ref={ref} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                className="group rounded-2xl border p-6 transition-shadow hover:shadow-lg"
                style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "#DCFCE7" }}
                >
                  <Icon className="h-6 w-6" style={{ color: "#16A34A" }} />
                </div>
                <h3
                  className="mt-4 text-lg font-bold"
                  style={{ fontFamily: "var(--font-jakarta), sans-serif", color: "#1F2937" }}
                >
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                  {s.desc}
                </p>
                <a
                  href="#contacto"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold transition-colors"
                  style={{ color: "#16A34A" }}
                >
                  Saber Mais
                  <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
