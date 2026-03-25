"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Leaf } from "lucide-react";

type Season = "primavera" | "verao" | "outono" | "inverno";

const seasons: { key: Season; label: string; emoji: string }[] = [
  { key: "primavera", label: "Primavera", emoji: "🌿" },
  { key: "verao", label: "Verão", emoji: "☀️" },
  { key: "outono", label: "Outono", emoji: "🍂" },
  { key: "inverno", label: "Inverno", emoji: "❄️" },
];

type Course = {
  name: string;
  description: string;
  price: string;
  highlight?: boolean;
};

type MenuData = {
  [K in Season]: {
    entradas: Course[];
    principais: Course[];
    sobremesas: Course[];
  };
};

const menuData: MenuData = {
  primavera: {
    entradas: [
      {
        name: "Salada de Espargos com Ovo Perfeito",
        description: "Espargos da época, ovo a 63°C, redução de vinagre balsâmico e flor de sal",
        price: "12€",
      },
      {
        name: "Carpaccio de Polvo",
        description: "Polvo marinado, azeite de ervas, limão e azeitonas da Beira",
        price: "14€",
        highlight: true,
      },
      {
        name: "Caldo Verde Desconstruído",
        description: "Caldo de couve e chouriço, creme suave de batata, chouriço crocante",
        price: "10€",
      },
    ],
    principais: [
      {
        name: "Bacalhau à Brás da Primavera",
        description: "Bacalhau desfiado, ovos, batata palha, azeitonas, com legumes da época",
        price: "26€",
        highlight: true,
      },
      {
        name: "Lombinho de Vitela com Ervilhas",
        description: "Vitela maturada, ervilhas frescas, cogumelos silvestres, molho de menta",
        price: "28€",
      },
      {
        name: "Peixe do Dia ao Sal",
        description: "Peixe fresco do mercado local, cozido no sal, azeite virgem e limão",
        price: "30€",
      },
    ],
    sobremesas: [
      {
        name: "Tarte de Morango com Creme de Baunilha",
        description: "Morangos portugueses, creme pâtissier, base amanteigada",
        price: "8€",
        highlight: true,
      },
      {
        name: "Leite Creme com Compota de Laranja",
        description: "Receita tradicional, açúcar queimado na hora, compota de laranja do Algarve",
        price: "7€",
      },
    ],
  },
  verao: {
    entradas: [
      {
        name: "Gazpacho Alentejano com Camarão",
        description: "Tomate e pepino maduros, camarão grelhado, pimentos assados",
        price: "11€",
      },
      {
        name: "Polvo Grelhado com Batata a Murro",
        description: "Polvo da costa, batata assada no forno, azeite e pimentão",
        price: "16€",
        highlight: true,
      },
      {
        name: "Queijo da Serra com Mel e Nozes",
        description: "Queijo curado da Serra da Estrela, mel de urze, nozes tostadas",
        price: "11€",
      },
    ],
    principais: [
      {
        name: "Robalo Grelhado com Legumes de Verão",
        description: "Robalo selvagem, tomate cherry, beringela, courgette, azeite aromatizado",
        price: "32€",
        highlight: true,
      },
      {
        name: "Arroz de Lingueirão",
        description: "Lingueirão fresco, arroz carolino, coentros, caldo caseiro",
        price: "28€",
      },
      {
        name: "Frango do Campo Assado",
        description: "Frango criado ao ar livre, alho, limão e ervas aromáticas frescas",
        price: "22€",
      },
    ],
    sobremesas: [
      {
        name: "Semifrio de Figo e Amêndoa",
        description: "Figos do Algarve, amêndoa torrada, creme leve de baunilha",
        price: "8€",
        highlight: true,
      },
      {
        name: "Mousse de Chocolate Negro com Framboesa",
        description: "Chocolate 70%, framboesas frescas, flor de sal",
        price: "7€",
      },
    ],
  },
  outono: {
    entradas: [
      {
        name: "Sopa de Castanha e Cogumelos",
        description: "Castanha portuguesa, cogumelos silvestres, creme suave e trufa",
        price: "10€",
      },
      {
        name: "Presunto Ibérico com Figos",
        description: "Presunto de bolota, figos maduros, rúcula e azeite extra virgem",
        price: "15€",
        highlight: true,
      },
      {
        name: "Farinheira com Ovo Escalfado",
        description: "Farinheira grelhada, ovo escalfado, caldo de legumes",
        price: "11€",
      },
    ],
    principais: [
      {
        name: "Bacalhau com Broa e Grelos",
        description: "Lombo de bacalhau, crosta de broa de milho, grelos salteados e azeite de alho",
        price: "27€",
        highlight: true,
      },
      {
        name: "Cabrito Assado no Forno",
        description: "Cabrito da Beira, assado lentamente, batata a murro e vinho tinto",
        price: "30€",
      },
      {
        name: "Risotto de Cogumelos Silvestres",
        description: "Cogumelos da época, queijo da Serra, azeite e salsa",
        price: "22€",
      },
    ],
    sobremesas: [
      {
        name: "Pudim de Abóbora com Canela",
        description: "Abóbora assada, açúcar mascavado, canela e nozes",
        price: "7€",
        highlight: true,
      },
      {
        name: "Tarte de Maçã com Sorvete de Caramelo",
        description: "Maçã da Beira Alta, massa folhada, sorvete artesanal",
        price: "8€",
      },
    ],
  },
  inverno: {
    entradas: [
      {
        name: "Caldo Verde Tradicional",
        description: "Couve galega, chouriço fumado, batata e azeite verde",
        price: "9€",
      },
      {
        name: "Alheira de Caça Grelhada",
        description: "Alheira artesanal de caça, salada de escarola e pimentão assado",
        price: "13€",
        highlight: true,
      },
      {
        name: "Sopa de Grão com Espinafres",
        description: "Grão português, espinafres, azeite e cominhos",
        price: "9€",
      },
    ],
    principais: [
      {
        name: "Bacalhau à Lagareiro",
        description: "Lombos de bacalhau, batatas ao murro, alho, azeite generoso e cebola",
        price: "26€",
        highlight: true,
      },
      {
        name: "Chanfana de Cabra",
        description: "Cabra velha, vinho tinto da Bairrada, marinada e assada em cântaro",
        price: "24€",
      },
      {
        name: "Cozido à Portuguesa",
        description: "Carnes e legumes da época, enchidos artesanais, arroz e couve",
        price: "28€",
      },
    ],
    sobremesas: [
      {
        name: "Rabanadas com Doce de Abóbora",
        description: "Rabanadas tradicionais, canela, açúcar e doce de abóbora caseiro",
        price: "7€",
        highlight: true,
      },
      {
        name: "Bolo de Mel da Madeira",
        description: "Receita centenária, mel de cana, especiarias e nozes",
        price: "7€",
      },
    ],
  },
};

const courseLabels: { [key: string]: string } = {
  entradas: "Entradas",
  principais: "Pratos Principais",
  sobremesas: "Sobremesas",
};

export default function Menu() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeSeason, setActiveSeason] = useState<Season>("outono");

  const currentMenu = menuData[activeSeason];

  return (
    <section ref={ref} id="ementa" className="py-24 bg-[#FFFDF7] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1E293B]/10 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-[#F59E0B]" />
            <Leaf className="w-5 h-5 text-[#B45309]" />
            <div className="h-px w-8 bg-[#F59E0B]" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#1E293B] mb-4"
            style={{ fontFamily: "'Work Sans', sans-serif" }}
          >
            Ementa Sazonal
          </h2>
          <p className="text-[#1E293B]/60 text-lg max-w-xl mx-auto">
            A nossa cozinha acompanha as estações. Ingredientes frescos, sabores autênticos, sempre
            a evoluir com a natureza portuguesa.
          </p>
        </motion.div>

        {/* Season tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {seasons.map((season) => (
            <button
              key={season.key}
              onClick={() => setActiveSeason(season.key)}
              className={`px-6 py-2.5 rounded-sm text-sm font-medium tracking-wide uppercase transition-all duration-300 ${
                activeSeason === season.key
                  ? "bg-[#1E293B] text-[#F59E0B] border border-[#1E293B]"
                  : "border border-[#1E293B]/20 text-[#1E293B]/60 hover:border-[#1E293B]/50 hover:text-[#1E293B]"
              }`}
            >
              {season.label}
            </button>
          ))}
        </motion.div>

        {/* Menu courses */}
        <motion.div
          key={activeSeason}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-12"
        >
          {(Object.entries(currentMenu) as [string, Course[]][]).map(([course, items], courseIdx) => (
            <div key={course}>
              <div className="flex items-center gap-4 mb-6">
                <h3
                  className="text-xl font-bold text-[#1E293B] tracking-wide"
                  style={{ fontFamily: "'Work Sans', sans-serif" }}
                >
                  {courseLabels[course]}
                </h3>
                <div className="flex-1 h-px bg-[#1E293B]/10" />
              </div>
              <div className="space-y-4">
                {items.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                    className={`flex items-start justify-between gap-6 p-5 rounded-sm transition-all ${
                      item.highlight
                        ? "bg-[#F59E0B]/8 border border-[#F59E0B]/20"
                        : "bg-white/50 border border-[#1E293B]/5 hover:border-[#1E293B]/15"
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-[#1E293B] text-base">{item.name}</h4>
                        {item.highlight && (
                          <span className="text-[#F59E0B] text-xs font-medium border border-[#F59E0B]/40 px-2 py-0.5 rounded-sm tracking-wider uppercase">
                            Destaque
                          </span>
                        )}
                      </div>
                      <p className="text-[#1E293B]/55 text-sm leading-relaxed">{item.description}</p>
                    </div>
                    <div className="flex-shrink-0 text-[#B45309] font-bold text-base">{item.price}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-[#1E293B]/40 text-sm mt-12 italic"
        >
          Ementa sujeita a alterações consoante a disponibilidade sazonal dos produtos. Alergénios disponíveis a pedido.
        </motion.p>
      </div>
    </section>
  );
}
