"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

type MenuCategory = "entradas" | "pratos" | "sobremesas" | "degustacao";

interface MenuItem {
  name: string;
  description: string;
  price: string;
  highlight?: boolean;
  badge?: string;
}

const menuData: Record<MenuCategory, { label: string; items: MenuItem[] }> = {
  entradas: {
    label: "Entradas",
    items: [
      {
        name: "Ameijoas à Bulhão Pato",
        description:
          "Ameijoas da Ria de Aveiro, azeite virgem extra, alho laminado, coentros frescos, vinho verde",
        price: "€ 16",
        highlight: true,
        badge: "Clássico",
      },
      {
        name: "Ceviche de Linguado",
        description:
          "Linguado selvagem, leite de tigre de citrinos, coentros, malagueta, cebola roxa, batata-doce",
        price: "€ 18",
      },
      {
        name: "Foie Gras com Compota de Figo",
        description:
          "Foie gras mi-cuit, compota de figo da Cova da Beira, brioche artesanal, flor de sal",
        price: "€ 17",
        highlight: true,
        badge: "Chef",
      },
      {
        name: "Sopa de Peixe da Costa",
        description:
          "Caldo de peixe lentamente reduzido, peixe branco sazonado, croutons de pão de centeio",
        price: "€ 12",
      },
      {
        name: "Polvo Grelhado sobre Puré de Grão",
        description:
          "Polvo de anzol galego, puré aveludado de grão-de-bico, azeite verde, pimentão assado",
        price: "€ 15",
      },
      {
        name: "Presunto de Barrancos com Queijo Amarelo",
        description:
          "Presunto DOP, queijo curado da Serra da Estrela, mel de urze, nozes, figos secos",
        price: "€ 14",
      },
      {
        name: "Ovo Perfeito com Trufa Negra",
        description:
          "Ovo cozinhado a 63°C, espuma de batata trufada, trufa negra de Bragança, crocante de toucinho",
        price: "€ 13",
      },
      {
        name: "Bacalhau em Brandade",
        description:
          "Bacalhau da Islândia, azeite de Trás-os-Montes, batata fumada, ovas de lombo, torrada de pão alentejano",
        price: "€ 15",
      },
    ],
  },
  pratos: {
    label: "Pratos Principais",
    items: [
      {
        name: "Bacalhau à Brás Contemporâneo",
        description:
          "Bacalhau desfiado em palha de batata, ovos mexidos suaves, azeitonas Galega, salsa frita, presunto",
        price: "€ 28",
        highlight: true,
        badge: "Ícone",
      },
      {
        name: "Robalo Selvagem ao Sal",
        description:
          "Robalo do Atlântico, crosta de sal grosso, puré de couve-flor trufado, legumes de época, beurre blanc de limão",
        price: "€ 32",
        highlight: true,
        badge: "Recomendado",
      },
      {
        name: "Arroz de Lingueirão e Berbigão",
        description:
          "Arroz carolino seco, lingueirão e berbigão da Costa da Caparica, bisque de marisco, coentros",
        price: "€ 29",
      },
      {
        name: "Leitão à Bairrada Confitado",
        description:
          "Pernil de leitão confitado 12h, pele crocante, molho do assado, batata assada em banha, laranja",
        price: "€ 26",
      },
      {
        name: "Lombo de Vitela com Açorda",
        description:
          "Lombo de vitela alentejana, açorda de pão alentejano, espargos verdes, jus de vitela com Porto",
        price: "€ 31",
        highlight: true,
        badge: "Chef",
      },
      {
        name: "Cabrito Assado em Forno a Lenha",
        description:
          "Cabrito da Serra da Estrela, assado lentamente, batata a murro, alho confitado, ervas aromáticas",
        price: "€ 27",
      },
      {
        name: "Linguado Meunière com Alcaparras",
        description:
          "Linguado local, manteiga de ervas, alcaparras de Mazagão, batata vapor, salada de agrião",
        price: "€ 30",
      },
      {
        name: "Presa de Porco Preto com Migas",
        description:
          "Presa de porco preto alentejano, migas de pão, amêijoas salteadas, reduçao de vinho do Alentejo",
        price: "€ 25",
      },
      {
        name: "Risotto de Cogumelos Silvestres",
        description:
          "Arroz arbóreo, cogumelos Portobello e ostra, Parmigiano 24 meses, trufa de verão, ervas frescas",
        price: "€ 22",
      },
      {
        name: "Tamboril com Açafrão e Amêijoas",
        description:
          "Tamboril do Atlântico, caldo com açafrão da Murtosa, amêijoas, batata nova, pão rústico",
        price: "€ 30",
      },
    ],
  },
  sobremesas: {
    label: "Sobremesas",
    items: [
      {
        name: "Pastel de Nata Desconstruído",
        description:
          "Creme de pasteleiro com canela, caramelo salgado, massa folhada crocante, sorvete de baunilha Bourbon",
        price: "€ 9",
        highlight: true,
        badge: "Ícone",
      },
      {
        name: "Leite Creme com Laranja do Algarve",
        description:
          "Leite creme queimado com soplete, gel de laranja, crocante de amêndoa, sorbet de citrinos",
        price: "€ 8",
      },
      {
        name: "Mousse de Chocolate 72%",
        description:
          "Chocolate negro de origem São Tomé, feuilletine de avelã, espuma de whisky Tawny Port, framboesas",
        price: "€ 10",
      },
      {
        name: "Tarte Tatin de Maçã Reineta",
        description:
          "Maçã Reineta do Douro, caramelo à manteiga, gelado de baunilha, chantilly suave",
        price: "€ 9",
      },
      {
        name: "Pudim Abade de Priscos",
        description:
          "Pudim conventual, redução de vinho do Porto Vintage, raspas de laranja, amêndoa laminada torrada",
        price: "€ 9",
        highlight: true,
        badge: "Tradicional",
      },
      {
        name: "Seleção de Queijos Portugueses",
        description:
          "Queijo da Serra, Évora, Azeitão e São Jorge, mel de lavanda, frutos secos, geleia de marmelo",
        price: "€ 14",
      },
    ],
  },
  degustacao: {
    label: "Menu Degustação",
    items: [
      {
        name: "Menu Primavera · 5 Momentos",
        description:
          "Amuse-bouche · Entrada · Intermédio · Prato principal · Sobremesa. Produtos da época, terroir português, criatividade do Chef",
        price: "€ 45",
        badge: "Primavera",
      },
      {
        name: "Menu Atlântico · 7 Momentos",
        description:
          "Uma viagem pelo oceano português: ostras, bacalhau, tamboril, polvo e robalo. Com harmonização de vinhos verdes e brancos do Alentejo opcional",
        price: "€ 65",
        highlight: true,
        badge: "Signature",
      },
      {
        name: "Menu Terra e Mar · 6 Momentos",
        description:
          "O encontro do interior com o litoral: presunto, ameijoas, leitão, linguado. Para dois ou mais, harmonização opcional",
        price: "€ 55",
        badge: "Recomendado",
      },
      {
        name: "Harmonização de Vinhos",
        description:
          "Seleção de 5 vinhos portugueses a complementar o seu menu degustação. Curada pelo nosso sommelier",
        price: "€ 30",
        badge: "Por pessoa",
      },
    ],
  },
};

const categories: MenuCategory[] = ["entradas", "pratos", "sobremesas", "degustacao"];

export default function Menu() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState<MenuCategory>("pratos");

  return (
    <section ref={ref} id="ementa" className="py-24 md:py-32 px-6 bg-[#FFFBEB]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-8 bg-[#B87333]" />
            <span
              className="text-[#B87333] text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Ementa Sazonal
            </span>
            <div className="h-px w-8 bg-[#B87333]" />
          </div>

          <h2
            className="text-4xl md:text-5xl font-light text-[#292524] mb-4"
            style={{ fontFamily: "var(--font-literata)" }}
          >
            A Nossa{" "}
            <span className="italic text-[#1B4332]">Ementa</span>
          </h2>

          <p
            className="text-[#292524]/60 max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Interpretações contemporâneas da cozinha portuguesa, com ingredientes
            sazonais dos melhores produtores nacionais.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-6 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
                active === cat
                  ? "bg-[#1B4332] text-[#FFFBEB]"
                  : "border border-[#292524]/20 text-[#292524]/60 hover:border-[#1B4332] hover:text-[#1B4332]"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {menuData[cat].label}
            </button>
          ))}
        </motion.div>

        {/* Menu items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-0"
          >
            {menuData[active].items.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="group py-6 px-6 border-b border-[#292524]/10 last:border-b-0 md:even:border-l md:even:border-[#292524]/10 hover:bg-[#1B4332]/5 transition-colors duration-200"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-start gap-3 flex-1">
                    <h3
                      className={`text-base font-medium leading-snug ${
                        item.highlight ? "text-[#1B4332]" : "text-[#292524]"
                      }`}
                      style={{ fontFamily: "var(--font-literata)" }}
                    >
                      {item.name}
                    </h3>
                    {item.badge && (
                      <span
                        className="shrink-0 text-[10px] tracking-[0.15em] uppercase px-2 py-0.5 bg-[#B87333]/15 text-[#B87333] border border-[#B87333]/30"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span
                    className="shrink-0 text-[#B87333] font-medium text-sm"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {item.price}
                  </span>
                </div>
                <p
                  className="text-sm text-[#292524]/55 leading-relaxed"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-10 text-xs text-[#292524]/40 tracking-wide"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Preços incluem IVA à taxa legal em vigor · A ementa altera consoante a disponibilidade sazonal ·
          Informe-nos de alergias ou intolerâncias alimentares
        </motion.p>
      </div>
    </section>
  );
}
