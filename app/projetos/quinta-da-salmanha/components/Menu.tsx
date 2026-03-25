"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

type Tab = "tradicional" | "buffet" | "eventos";

const menus: Record<Tab, { category: string; items: { name: string; desc: string; price?: string }[] }[]> = {
  tradicional: [
    {
      category: "Entradas",
      items: [
        { name: "Açorda de Marisco", desc: "Pão alentejano, camarão e berbigão, coentros frescos", price: "9,50€" },
        { name: "Alheira de Caça Grelhada", desc: "Servida com ovo estrelado e batata a murro", price: "8,00€" },
        { name: "Queijo da Serra com Mel", desc: "Queijo curado da Serra da Estrela, mel de rosmaninho", price: "7,50€" },
      ],
    },
    {
      category: "Pratos Principais",
      items: [
        { name: "Bacalhau à Quinta", desc: "Bacalhau no forno com batata-doce, cebola caramelizada e azeitonas", price: "18,50€" },
        { name: "Leitão à Bairrada", desc: "Leitão assado em forno de lenha, acompanhado de batata frita e laranja", price: "19,00€" },
        { name: "Cozido à Portuguesa", desc: "Cozido completo com carnes, enchidos, legumes e grão", price: "16,50€" },
        { name: "Borrego Assado", desc: "Borrego da serra assado lentamente com alecrim e alho", price: "20,00€" },
      ],
    },
    {
      category: "Sobremesas",
      items: [
        { name: "Arroz-doce da Quinta", desc: "Receita tradicional com canela e limão", price: "4,00€" },
        { name: "Leite-creme Brûlée", desc: "Caramelizado na hora, com raspa de laranja", price: "4,50€" },
        { name: "Bolo de Mel com Nozes", desc: "Mel da região, nozes tostadas, especiarias", price: "5,00€" },
      ],
    },
  ],
  buffet: [
    {
      category: "Buffet Frio",
      items: [
        { name: "Mesa de Enchidos e Queijos", desc: "Presunto, chouriço, farinheira, queijo da Serra e manchego" },
        { name: "Saladas Frescas", desc: "Salada de tomate com orégãos, coleslaw, salada mista da horta" },
        { name: "Acepipes e Patés", desc: "Paté de sardinha, paté de atum, azeitonas temperadas" },
      ],
    },
    {
      category: "Buffet Quente",
      items: [
        { name: "Prato do Dia Rotativo", desc: "Altera diariamente: bacalhau, carne, frango ou peixe fresco" },
        { name: "Sopa Caseira", desc: "Sopas tradicionais portuguesas feitas de manhã" },
        { name: "Guarnições Variadas", desc: "Arroz malandro, batata assada, legumes salteados, esparregado" },
      ],
    },
    {
      category: "Doces e Bebidas",
      items: [
        { name: "Mesa de Sobremesas", desc: "Arroz-doce, tarte de natas, fruta da época, doçaria conventual" },
        { name: "Bebidas Incluídas", desc: "Água, refrigerante, vinho da casa (tinto ou branco)" },
      ],
    },
  ],
  eventos: [
    {
      category: "Menu Casamento — Jantar",
      items: [
        { name: "Cocktail de Boas-Vindas", desc: "Canapés, espumante da Bairrada, sumos naturais", price: "por convidado" },
        { name: "Menu de Degustação", desc: "6 momentos: entrada, sopa, peixe, pré-main, carne, sobremesa", price: "Consulte-nos" },
        { name: "Bolo de Casamento", desc: "Personalizado pelo pasteleiro da casa" },
      ],
    },
    {
      category: "Menu Corporativo",
      items: [
        { name: "Coffee Break", desc: "Café, chá, sumos, bolos e salgados artesanais", price: "6,50€/pax" },
        { name: "Almoço Executivo", desc: "Entrada, prato principal, sobremesa e café", price: "18,00€/pax" },
        { name: "Jantar de Gala", desc: "Menu de 4 pratos com maridagem de vinhos", price: "Consulte-nos" },
      ],
    },
    {
      category: "Menu Celebrações",
      items: [
        { name: "Almoço de Família", desc: "Menu completo para grupos a partir de 20 pax", price: "22,00€/pax" },
        { name: "Baptizado / Comunhão", desc: "Menu adaptado com opção infantil e bolo incluído", price: "Consulte-nos" },
      ],
    },
  ],
};

const tabLabels: { key: Tab; label: string }[] = [
  { key: "tradicional", label: "À Carta" },
  { key: "buffet", label: "Buffet Diário" },
  { key: "eventos", label: "Eventos" },
];

export default function Menu() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<Tab>("tradicional");

  return (
    <section
      ref={ref}
      id="ementa"
      className="py-24 md:py-36 relative overflow-hidden"
      style={{ background: "#FEFCE8" }}
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-12"
        >
          <p
            className="text-xs tracking-[0.45em] uppercase mb-4"
            style={{ color: "#722F37", fontFamily: "var(--font-inter)" }}
          >
            Ementa
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-libre-caslon)", color: "#3D2B1F" }}
          >
            O Que Servimos
          </h2>
          <div className="w-16 h-[2px] mx-auto" style={{ background: "#C4A55A" }} />
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center gap-2 mb-12"
        >
          {tabLabels.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className="px-6 py-2.5 text-sm tracking-wide transition-all duration-300"
              style={{
                fontFamily: "var(--font-inter)",
                background: activeTab === t.key ? "#722F37" : "transparent",
                color: activeTab === t.key ? "#FEFCE8" : "#5C4A3A",
                border: `1px solid ${activeTab === t.key ? "#722F37" : "rgba(168,162,158,0.4)"}`,
              }}
            >
              {t.label}
            </button>
          ))}
        </motion.div>

        {/* Menu content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-10"
        >
          {menus[activeTab].map((section) => (
            <div key={section.category}>
              <div className="flex items-center gap-4 mb-5">
                <h3
                  className="text-sm tracking-[0.35em] uppercase whitespace-nowrap"
                  style={{ color: "#556B2F", fontFamily: "var(--font-inter)", fontWeight: 500 }}
                >
                  {section.category}
                </h3>
                <div className="h-px flex-1" style={{ background: "rgba(168,162,158,0.35)" }} />
              </div>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-start justify-between gap-6 py-4 border-b"
                    style={{ borderColor: "rgba(168,162,158,0.2)" }}
                  >
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-semibold mb-1"
                        style={{
                          fontFamily: "var(--font-libre-caslon)",
                          color: "#3D2B1F",
                          fontSize: "1.05rem",
                        }}
                      >
                        {item.name}
                      </p>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "#A8A29E", fontFamily: "var(--font-inter)", fontStyle: "italic" }}
                      >
                        {item.desc}
                      </p>
                    </div>
                    {item.price && (
                      <span
                        className="text-sm font-medium flex-shrink-0"
                        style={{ color: "#722F37", fontFamily: "var(--font-inter)" }}
                      >
                        {item.price}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-10 text-sm"
          style={{ color: "#A8A29E", fontFamily: "var(--font-inter)", fontStyle: "italic" }}
        >
          Preços incluem IVA à taxa em vigor. Ementa sujeita a alterações sazonais.
        </motion.p>
      </div>
    </section>
  );
}
