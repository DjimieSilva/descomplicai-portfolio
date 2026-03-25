"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const categories = [
  {
    id: "pratos",
    label: "Pratos Principais",
    items: [
      {
        name: "Cozido à Portuguesa",
        desc: "Carnes variadas, enchidos, legumes e grão, cozinhados lentamente. O prato mais português de todos.",
        price: "€14",
        tag: "Especialidade da Casa",
      },
      {
        name: "Bacalhau à Brás",
        desc: "Bacalhau desfiado com batata palha, ovos mexidos e azeitonas. Receita clássica, preparada com bacalhau do Porto.",
        price: "€13",
        tag: "Favorito",
      },
      {
        name: "Feijoada à Portuguesa",
        desc: "Feijão encarnado com carnes de porco, entrecosto e chouriço. Reconfortante, farta e feita com alma.",
        price: "€12",
        tag: null,
      },
      {
        name: "Leitão à Bairrada",
        desc: "Leitão assado no forno de lenha com pele estaladiça. Receita tradicional da nossa região.",
        price: "€15",
        tag: "Sazonal",
      },
      {
        name: "Arroz de Pato",
        desc: "Pato confitado com arroz no forno, encrostado e dourado. O domingo em cada garfada.",
        price: "€13",
        tag: null,
      },
      {
        name: "Açorda de Mariscos",
        desc: "Pão de aldeia com camarão, berbigão e coentros frescos. Sabor a mar da nossa costa.",
        price: "€14",
        tag: null,
      },
    ],
  },
  {
    id: "sopas",
    label: "Sopas & Entradas",
    items: [
      {
        name: "Caldo Verde",
        desc: "Sopa de couve galega com chouriço e batata. Simples, honesta e deliciosa.",
        price: "€4",
        tag: "Clássico",
      },
      {
        name: "Sopa de Grão com Espinafres",
        desc: "Grão de bico com espinafres frescos e azeite da casa. Servida com broa de milho.",
        price: "€4",
        tag: null,
      },
      {
        name: "Pataniscas de Bacalhau",
        desc: "Pataniscas estaladiças com arroz de feijão. Petisco clássico da tasca portuguesa.",
        price: "€7",
        tag: "Para Partilhar",
      },
      {
        name: "Rissóis de Camarão",
        desc: "Feitos em casa, fritos a horas. Recheio cremoso de camarão com bechamel.",
        price: "€6",
        tag: null,
      },
      {
        name: "Alheiras Grelhadas",
        desc: "Alheiras de caça do Nordeste Transmontano, grelhadas e servidas com grelos salteados.",
        price: "€8",
        tag: null,
      },
    ],
  },
  {
    id: "sobremesas",
    label: "Sobremesas",
    items: [
      {
        name: "Arroz Doce da Casa",
        desc: "Com canela e limão, feito todos os dias de manhã. A sobremesa que fecha qualquer refeição.",
        price: "€3.50",
        tag: "Feito em Casa",
      },
      {
        name: "Pudim Abade de Priscos",
        desc: "Pudim de toucinho com calda de caramelo. Receita conventual transmontana.",
        price: "€4",
        tag: null,
      },
      {
        name: "Rabanadas",
        desc: "Rabanadas de pão caseiro fritas com açúcar e canela. Memória de natal todo o ano.",
        price: "€4",
        tag: null,
      },
      {
        name: "Tarte de Amêndoa",
        desc: "Tarte fina de amêndoa torrada com mel de urze. Servida morna com gelado de baunilha.",
        price: "€4.50",
        tag: null,
      },
    ],
  },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("pratos");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const currentItems =
    categories.find((c) => c.id === activeCategory)?.items ?? [];

  return (
    <section
      id="ementa"
      className="py-24 px-6"
      style={{ background: "#FEF3C7" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p
            className="text-xs tracking-[0.45em] uppercase mb-4"
            style={{ color: "#C2410C", fontFamily: "var(--font-inter)" }}
          >
            Ementa
          </p>
          <h2
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: "var(--font-source-serif-4)", color: "#7C2D12" }}
          >
            A Nossa Cozinha
          </h2>
          <p
            className="text-base max-w-xl mx-auto leading-relaxed"
            style={{ color: "#78350F", fontFamily: "var(--font-inter)" }}
          >
            Pratos confecionados diariamente com ingredientes frescos. Ementa
            sujeita a alterações sazonais — pergunta sempre o prato do dia.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="px-5 py-2.5 text-xs tracking-widest uppercase font-semibold transition-all duration-300"
              style={{
                background: activeCategory === cat.id ? "#C2410C" : "transparent",
                color: activeCategory === cat.id ? "#FFFBEB" : "#92400E",
                border: "1.5px solid",
                borderColor: activeCategory === cat.id ? "#C2410C" : "rgba(146,64,14,0.35)",
                fontFamily: "var(--font-inter)",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu items grid */}
        <div className="grid md:grid-cols-2 gap-0">
          {currentItems.map((item, i) => {
            const itemRef = useRef(null);
            const itemInView = useInView(itemRef, { once: true, margin: "-40px" });
            return (
              <motion.div
                key={item.name}
                ref={itemRef}
                initial={{ opacity: 0, y: 20 }}
                animate={itemInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex justify-between items-start gap-4 py-6 px-4"
                style={{
                  borderBottom: "1px solid rgba(146,64,14,0.12)",
                  borderRight:
                    i % 2 === 0 ? "1px solid rgba(146,64,14,0.12)" : "none",
                }}
              >
                <div className="flex-1">
                  <div className="flex items-start gap-2 mb-1">
                    <h4
                      className="text-base font-bold leading-tight"
                      style={{
                        fontFamily: "var(--font-source-serif-4)",
                        color: "#7C2D12",
                      }}
                    >
                      {item.name}
                    </h4>
                    {item.tag && (
                      <span
                        className="text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5 flex-shrink-0 mt-0.5"
                        style={{
                          background: "rgba(194,65,12,0.12)",
                          color: "#C2410C",
                          border: "1px solid rgba(194,65,12,0.25)",
                          fontFamily: "var(--font-inter)",
                        }}
                      >
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#78350F", fontFamily: "var(--font-inter)" }}
                  >
                    {item.desc}
                  </p>
                </div>
                <span
                  className="text-base font-bold flex-shrink-0"
                  style={{
                    fontFamily: "var(--font-source-serif-4)",
                    color: "#C2410C",
                  }}
                >
                  {item.price}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center text-xs mt-10"
          style={{ color: "#92400E", fontFamily: "var(--font-inter)" }}
        >
          Preços com IVA incluído · Informamos sobre alergénios — basta perguntar ·
          Ementa disponível nos dois espaços
        </motion.p>
      </div>
    </section>
  );
}
