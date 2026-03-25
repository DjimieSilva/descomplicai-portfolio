"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const categories = ["Entradas", "Peixe & Mar", "Carne & Terra", "Sobremesas"] as const;
type Category = typeof categories[number];

const menuItems: Record<Category, { name: string; description: string; price: string; tag?: string }[]> = {
  "Entradas": [
    {
      name: "Amêijoas à Bulhão Pato",
      description: "Amêijoas da Ria de Aveiro, alho, coentros frescos e azeite virgem extra da Beira Interior",
      price: "€ 14",
      tag: "Clássico",
    },
    {
      name: "Percebes do Atlântico",
      description: "Percebes frescos apanhados na costa da Figueira, sal marinho e limão",
      price: "€ 18",
    },
    {
      name: "Ceviche de Linguado",
      description: "Linguado selvagem, leite de tigre de citrinos, jalapeño e coentros",
      price: "€ 16",
      tag: "Chef",
    },
    {
      name: "Croquetes de Bacalhau",
      description: "Bacalhau do Porto, batata de Trás-os-Montes e maionese de açafrão",
      price: "€ 12",
    },
    {
      name: "Tártaro de Atum Rabilho",
      description: "Atum rabilho do Atlântico, alcaparras, mostarda antiga e ovas de salmão",
      price: "€ 17",
    },
    {
      name: "Gazpacho de Tomate da Horta",
      description: "Tomate heirloom biológico, pepino, pimento vermelho e manjericão",
      price: "€ 10",
    },
  ],
  "Peixe & Mar": [
    {
      name: "Arroz de Marisco",
      description: "Lagostim, camarão tigre, mexilhão e amêijoa, arroz malandrinho e salsa",
      price: "€ 28",
      tag: "Assinatura",
    },
    {
      name: "Polvo Grelhado",
      description: "Polvo da costa, batata-doce assada, paprika fumada e azeite de alecrim",
      price: "€ 22",
    },
    {
      name: "Robalo no Sal",
      description: "Robalo selvagem em crosta de sal marinho e ervas, batata a murro e salsa verde",
      price: "€ 28",
    },
    {
      name: "Bacalhau à Brás",
      description: "Lombo de bacalhau premium, batata palha fina, ovos caipira e azeitonas de Elvas",
      price: "€ 24",
      tag: "Clássico",
    },
    {
      name: "Linguado Meunière",
      description: "Linguado do dia, manteiga avelã, alcaparras fritas e espargos brancos",
      price: "€ 26",
    },
    {
      name: "Caldeirada de Peixes da Costa",
      description: "Pescada, raia e safio com batata, cebola, pimento e açafrão da Murtosa",
      price: "€ 25",
    },
  ],
  "Carne & Terra": [
    {
      name: "Lombo de Vitela da Serra",
      description: "Vitela da Serra da Estrela, molho de vinho tinto do Dão, puré de raíz aipo e cogumelos silvestres",
      price: "€ 32",
      tag: "Chef",
    },
    {
      name: "Cabrito Assado no Forno",
      description: "Cabrito da Beira, alho, louro, banha de porco preto e batata assada",
      price: "€ 30",
    },
    {
      name: "Secretos de Porco Preto",
      description: "Secretos de porco preto alentejano, pimento assado, salsa de amêijoas e batata frita",
      price: "€ 29",
    },
    {
      name: "Perdiz à Convento de Alcântara",
      description: "Perdiz estufada com trufas negras, foie gras e vinho do Porto",
      price: "€ 35",
      tag: "Sazonal",
    },
  ],
  "Sobremesas": [
    {
      name: "Pastel de Nata Desconstruído",
      description: "Creme de ovos com canela e limão, pasta filo crocante e sorvete de baunilha bourbon",
      price: "€ 9",
      tag: "Clássico",
    },
    {
      name: "Arroz Doce da Avó",
      description: "Arroz carolino, leite de vaca, raspas de limão e canela do Ceilão",
      price: "€ 8",
    },
    {
      name: "Mousse de Chocolate Negro",
      description: "Chocolate 72% São Tomé, flor de sal de Aveiro e azeite virgem extra",
      price: "€ 9",
    },
    {
      name: "Leite-Creme Brûlé",
      description: "Creme de gemas com casca de laranja, açúcar caramelizado na hora",
      price: "€ 8",
    },
    {
      name: "Seleção de Queijos Portugueses",
      description: "Serra da Estrela, Azeitão DOP e Queijo de Cabra do Alentejo, figo e mel",
      price: "€ 14",
    },
  ],
};

const tagColors: Record<string, string> = {
  "Clássico": "border-[#92702B]/50 text-[#92702B]",
  "Chef": "border-[#1C1917]/30 text-[#1C1917]/60",
  "Assinatura": "border-[#92702B] text-[#92702B] bg-[#92702B]/5",
  "Sazonal": "border-[#1C1917]/20 text-[#1C1917]/50",
};

export default function Menu() {
  const [active, setActive] = useState<Category>("Entradas");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="ementa" className="bg-[#1C1917] py-24 md:py-36 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-[#92702B]/60 text-xs tracking-[0.4em] uppercase font-['Libre_Franklin'] mb-4"
          >
            Ementa
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="overflow-hidden"
          >
            <h2 className="font-['Playfair_Display'] text-[#FAF9F6] text-4xl md:text-5xl font-light">
              Sabores do Atlântico
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[#D4C5A9]/50 text-sm font-['Libre_Franklin'] mt-4 max-w-lg mx-auto leading-relaxed"
          >
            A ementa muda com as estações e com o que o mar oferece. Os preços não incluem IVA.
          </motion.p>
        </div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="flex flex-wrap justify-center gap-1 mb-14"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2.5 text-xs tracking-[0.2em] uppercase font-['Libre_Franklin'] transition-all duration-300 border ${
                active === cat
                  ? "border-[#92702B] text-[#92702B] bg-[#92702B]/8"
                  : "border-[#FAF9F6]/10 text-[#D4C5A9]/50 hover:border-[#D4C5A9]/30 hover:text-[#D4C5A9]/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Menu items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="space-y-0"
          >
            {menuItems[active].map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-start justify-between py-6 border-b border-[#FAF9F6]/8 gap-6 group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                    <h3 className="font-['Playfair_Display'] text-[#FAF9F6] text-lg font-light group-hover:text-[#D4C5A9] transition-colors">
                      {item.name}
                    </h3>
                    {item.tag && (
                      <span className={`text-[10px] tracking-[0.2em] uppercase border px-2 py-0.5 font-['Libre_Franklin'] ${tagColors[item.tag] ?? ""}`}>
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-[#D4C5A9]/50 text-sm leading-relaxed font-['Libre_Franklin'] font-light">
                    {item.description}
                  </p>
                </div>
                <div className="shrink-0 pt-0.5">
                  <span className="font-['Playfair_Display'] text-[#92702B] text-lg font-light">{item.price}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Allergen note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-[#D4C5A9]/30 text-xs font-['Libre_Franklin'] mt-10 text-center"
        >
          Informe-nos de alergias ou intolerâncias alimentares. Trabalhamos com fornecedores locais — alguns pratos podem variar consoante a disponibilidade sazonal.
        </motion.p>
      </div>
    </section>
  );
}
