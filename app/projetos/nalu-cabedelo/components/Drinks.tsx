"use client";

import { motion } from "framer-motion";

type Drink = {
  name: string;
  description: string;
  price: string;
  badge?: string;
};

const cocktails: Drink[] = [
  {
    name: "NALU Sunset",
    description: "Rum branco, sumo de maracujá, coco, grenadine e gelo",
    price: "€10",
    badge: "Assinatura",
  },
  {
    name: "Cabedelo Mule",
    description: "Vodka, ginger beer, lima, pepino e hortelã",
    price: "€9",
    badge: "Favorito",
  },
  {
    name: "Tropical Storm",
    description: "Gin, água tónica, manga, lima e pimenta rosa",
    price: "€10",
  },
  {
    name: "Coral Reef",
    description: "Tequila, blue curaçao, limão, xarope de agave e sal de coco",
    price: "€11",
    badge: "Instagramável",
  },
  {
    name: "Mojito da Praia",
    description: "Rum, hortelã, lima, açúcar e água com gás",
    price: "€9",
  },
  {
    name: "Piña Colada",
    description: "Rum de coco, sumo de ananás, creme de coco e gelo picado",
    price: "€10",
  },
  {
    name: "Spritz Atlântico",
    description: "Aperol, prosecco, água com gás, laranja e azeitonas",
    price: "€9",
  },
  {
    name: "Virgin Nalu",
    description: "Sumo de manga, coco, lima e ginger ale — sem álcool",
    price: "€6",
    badge: "Sem álcool",
  },
];

const beers: Drink[] = [
  {
    name: "Super Bock",
    description: "Caneca 50cl ou Garrafa 33cl",
    price: "€3 / €2.5",
  },
  {
    name: "Sagres",
    description: "Caneca 50cl ou Garrafa 33cl",
    price: "€3 / €2.5",
  },
  {
    name: "Corona",
    description: "Garrafa 33cl com limão",
    price: "€4",
    badge: "Praia Vibe",
  },
  {
    name: "Cerveja Artesanal",
    description: "Rotação semanal de cervejarias portuguesas",
    price: "€5",
    badge: "Local",
  },
  {
    name: "Radler Limão",
    description: "Mistura de cerveja com limonada — refrescante",
    price: "€3.5",
  },
];

const wines: Drink[] = [
  { name: "Vinho Verde Branco", description: "Copo 15cl — Leve e fresco", price: "€4" },
  { name: "Vinho Rosé", description: "Copo 15cl — Frutado e suave", price: "€4.5", badge: "Verão" },
  { name: "Vinho Tinto", description: "Copo 15cl — Seleção do mês", price: "€4" },
  { name: "Prosecco", description: "Copo 15cl — Brinde perfeito", price: "€5" },
];

const softDrinks: Drink[] = [
  { name: "Água", description: "Garrafa 33cl ou 75cl", price: "€1.5 / €2.5" },
  { name: "Refrigerantes", description: "Coca-cola, 7UP, Fanta, Sprite", price: "€2.5" },
  { name: "Sumo Natural", description: "Laranja ou Limão — espremido na hora", price: "€3.5" },
  { name: "Smoothie do Dia", description: "Frutas frescas batidas com leite de coco", price: "€5" },
  { name: "Café Espresso", description: "Delta Cafés, curto ou cheio", price: "€1" },
  { name: "Iced Coffee", description: "Café gelado, leite e xarope de baunilha", price: "€3" },
];

const SectionTitle = ({ title, sub }: { title: string; sub: string }) => (
  <div className="mb-8">
    <h3
      className="text-2xl md:text-3xl font-black text-white mb-1"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {title}
    </h3>
    <p className="text-white/40 text-sm">{sub}</p>
    <div className="mt-3 h-0.5 w-12 bg-[#FF6B35] rounded-full" />
  </div>
);

const DrinkCard = ({ drink, index }: { drink: Drink; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    className="flex items-start justify-between gap-4 py-4 border-b border-white/10 last:border-0 group hover:border-white/20 transition-colors"
  >
    <div>
      <div className="flex items-center gap-2 mb-1 flex-wrap">
        <span
          className="text-white font-semibold text-sm group-hover:text-[#FF6B35] transition-colors"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {drink.name}
        </span>
        {drink.badge && (
          <span className="bg-[#0077B6]/20 text-[#0077B6] text-xs font-bold px-2 py-0.5 rounded-full border border-[#0077B6]/30">
            {drink.badge}
          </span>
        )}
      </div>
      <p className="text-white/40 text-xs">{drink.description}</p>
    </div>
    <span
      className="text-[#FF6B35] font-black text-base shrink-0"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {drink.price}
    </span>
  </motion.div>
);

export default function Drinks() {
  return (
    <section
      id="drinks"
      className="relative py-24 md:py-32 bg-[#0D1F3C] overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#0077B6]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-[#FF6B35]/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[#0077B6] text-sm font-bold tracking-[0.3em] uppercase mb-4 block">
            Bar
          </span>
          <h2
            className="text-4xl md:text-6xl font-black text-white mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            O Bar do
            <br />
            <span className="text-[#0077B6]">Pôr do Sol</span>
          </h2>
          <p className="text-white/60 text-base max-w-xl mx-auto">
            Cocktails artesanais, cerveja gelada e os melhores sumos naturais.
            Tudo o que precisas para aproveitar o dia.
          </p>
        </motion.div>

        {/* Cocktails highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 p-8 rounded-3xl border border-[#FF6B35]/20"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,107,53,0.08) 0%, rgba(0,119,182,0.08) 100%)",
          }}
        >
          <SectionTitle title="🍹 Cocktails" sub="Criações artesanais do nosso bartender" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y-0">
            {cocktails.map((drink, i) => (
              <DrinkCard key={drink.name} drink={drink} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Beer, Wine, Soft Drinks grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Beer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="p-6 rounded-2xl border border-white/10 bg-white/5"
          >
            <SectionTitle title="🍺 Cervejas" sub="Nacionais e artesanais" />
            {beers.map((drink, i) => (
              <DrinkCard key={drink.name} drink={drink} index={i} />
            ))}
          </motion.div>

          {/* Wine */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="p-6 rounded-2xl border border-white/10 bg-white/5"
          >
            <SectionTitle title="🍷 Vinhos" sub="Seleção portuguesa" />
            {wines.map((drink, i) => (
              <DrinkCard key={drink.name} drink={drink} index={i} />
            ))}
          </motion.div>

          {/* Soft Drinks */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="p-6 rounded-2xl border border-white/10 bg-white/5"
          >
            <SectionTitle title="🥤 Sem Álcool" sub="Para toda a família" />
            {softDrinks.map((drink, i) => (
              <DrinkCard key={drink.name} drink={drink} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
