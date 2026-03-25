"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Coffee, Sunrise, Sun, Cookie } from "lucide-react";

type MenuItem = { name: string; description: string; price: string };

type MenuCategory = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  items: MenuItem[];
};

const categories: MenuCategory[] = [
  {
    id: "breakfast",
    label: "Pequeno-Almoço",
    icon: Sunrise,
    items: [
      {
        name: "Tosta Mista",
        description: "Pão de forma tostado, queijo e fiambre",
        price: "€4.00",
      },
      {
        name: "Tosta de Frango",
        description: "Frango desfiado, alface, tomate, maionese",
        price: "€5.50",
      },
      {
        name: "Tosta Especial",
        description: "Queijo derretido, presunto e tomate seco",
        price: "€6.00",
      },
      {
        name: "Ovos Mexidos",
        description: "Ovos mexidos cremosos com tosta e manteiga",
        price: "€6.00",
      },
      {
        name: "Ovos Escalfados",
        description: "Dois ovos escalfados, espinafres salteados e torrada",
        price: "€7.50",
      },
      {
        name: "Ovos Beneditos",
        description: "Ovos escalfados, bacon crocante e molho holandês",
        price: "€9.50",
      },
      {
        name: "Pequeno-Almoço Completo",
        description: "Café, sumo, tosta, manteiga e compota",
        price: "€8.00",
      },
    ],
  },
  {
    id: "lunch",
    label: "Almoço",
    icon: Sun,
    items: [
      {
        name: "Prato do Dia",
        description: "Sugestão diária do chef com sopa e bebida incluída",
        price: "€8.50–€10.00",
      },
      {
        name: "Bacalhau à Brás",
        description: "Bacalhau desfiado, batata palha, ovos e azeitonas",
        price: "€12.00",
      },
      {
        name: "Frango Grelhado",
        description: "Meia frango grelhada com batata frita e salada",
        price: "€10.50",
      },
      {
        name: "Petisco de Alheira",
        description: "Alheira grelhada com ovo estrelado e pão alentejano",
        price: "€9.00",
      },
      {
        name: "Petisco de Queijo",
        description: "Queijo da Serra curado, compota de figo e nozes",
        price: "€7.00",
      },
      {
        name: "Petisco de Enchidos",
        description: "Chouriço assado, paio, morcela e pão caseiro",
        price: "€11.00",
      },
      {
        name: "Sandes de Pernil",
        description: "Pernil assado, pão rústico, alface e tomate",
        price: "€7.50",
      },
    ],
  },
  {
    id: "snacks",
    label: "Snacks & Petiscos",
    icon: Cookie,
    items: [
      {
        name: "Rissóis de Camarão",
        description: "Dois rissóis crocantes com recheio de camarão",
        price: "€3.50",
      },
      {
        name: "Bolinhos de Bacalhau",
        description: "Três bolinhos tradicionais com maionese de ervas",
        price: "€4.50",
      },
      {
        name: "Croquetes",
        description: "Croquetes de carne caseiros, estaladiços",
        price: "€3.00",
      },
      {
        name: "Bruschetta",
        description: "Pão tostado com tomate, manjericão e azeite",
        price: "€4.00",
      },
      {
        name: "Sandes de Atum",
        description: "Atum, cebola, pimento e maionese",
        price: "€4.50",
      },
      {
        name: "Mini Bifanas",
        description: "Duas mini bifanas no pão com mostarda",
        price: "€5.00",
      },
    ],
  },
  {
    id: "pastry",
    label: "Pastelaria & Café",
    icon: Coffee,
    items: [
      {
        name: "Pastel de Nata",
        description: "O clássico português, acabado de fazer",
        price: "€1.50",
      },
      {
        name: "Croissant",
        description: "Croissant amanteigado, simples ou com manteiga",
        price: "€1.80",
      },
      {
        name: "Queijada",
        description: "Queijada tradicional de requeijão",
        price: "€1.60",
      },
      {
        name: "Bolo de Arroz",
        description: "Fofinho, estaladiço por fora, macio por dentro",
        price: "€1.20",
      },
      {
        name: "Bica / Expresso",
        description: "Blend premium, extracção perfeita",
        price: "€0.80",
      },
      {
        name: "Galão / Meia de Leite",
        description: "Café com leite cremoso, temperatura ideal",
        price: "€1.50",
      },
      {
        name: "Cappuccino",
        description: "Espresso duplo com leite vaporizado e espuma densa",
        price: "€2.20",
      },
    ],
  },
];

export default function Menu() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState("breakfast");

  const activeCategory = categories.find((c) => c.id === active)!;

  return (
    <section
      ref={ref}
      id="menu"
      className="py-24 md:py-32 px-6"
      style={{ backgroundColor: "#E8D5B7" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-3 mb-6"
            style={{ color: "#B5A642" }}
          >
            <div className="w-8 h-px" style={{ backgroundColor: "#B5A642" }} />
            <span className="text-xs font-semibold tracking-widest uppercase">
              Ementa
            </span>
            <div className="w-8 h-px" style={{ backgroundColor: "#B5A642" }} />
          </div>

          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{
              fontFamily: "var(--font-domine), serif",
              color: "#3C1518",
            }}
          >
            O Que Servimos
          </h2>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center mb-12"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold tracking-wide transition-all duration-300"
                style={{
                  backgroundColor:
                    active === cat.id ? "#3C1518" : "rgba(60,21,24,0.08)",
                  color: active === cat.id ? "#E8D5B7" : "#3C1518",
                  borderRadius: "2px",
                }}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        {/* Menu Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 gap-4"
          >
            {activeCategory.items.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="flex items-start justify-between gap-4 p-5"
                style={{
                  backgroundColor: "rgba(255,248,240,0.8)",
                  borderBottom: "1px solid rgba(60,21,24,0.1)",
                }}
              >
                <div className="flex-1">
                  <div
                    className="font-semibold mb-1"
                    style={{
                      fontFamily: "var(--font-domine), serif",
                      color: "#3C1518",
                    }}
                  >
                    {item.name}
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: "rgba(60,21,24,0.6)" }}
                  >
                    {item.description}
                  </div>
                </div>
                <div
                  className="font-bold text-sm whitespace-nowrap"
                  style={{ color: "#B5A642" }}
                >
                  {item.price}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-sm mt-10"
          style={{ color: "rgba(60,21,24,0.5)" }}
        >
          Ementa sujeita a alterações sazonais. Preços incluem IVA à taxa legal
          em vigor.
        </motion.p>
      </div>
    </section>
  );
}
