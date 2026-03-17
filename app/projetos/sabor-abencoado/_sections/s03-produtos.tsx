"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════
   PRODUCT DATA
   ═══════════════════════════════════════════════ */

type Product = {
  id: string;
  name: string;
  category: "paes" | "doces";
  emoji: string;
  description: string;
  popular?: boolean;
};

const PRODUCTS: Product[] = [
  {
    id: "pao-chourico",
    name: "Pão com Chouriço",
    category: "paes",
    emoji: "🥖",
    description:
      "O clássico português — massa caseira recheada com chouriço fumado, crocante por fora, macio por dentro",
    popular: true,
  },
  {
    id: "pao-caseiro",
    name: "Pão Caseiro",
    category: "paes",
    emoji: "🍞",
    description:
      "Pão tradicional de fermentação lenta, crosta dourada e miolo fofo. O sabor da avó.",
    popular: true,
  },
  {
    id: "pao-queijo-fiambre",
    name: "Pão com Queijo e Fiambre",
    category: "paes",
    emoji: "🧀",
    description:
      "Pão recheado com queijo derretido e fiambre — perfeito para o lanche ou pequeno-almoço",
  },
  {
    id: "tarte-nata",
    name: "Tarte de Pastel de Nata",
    category: "doces",
    emoji: "🍮",
    description:
      "A doçura do pastel de nata numa tarte generosa — creme cremoso com canela e massa folhada",
    popular: true,
  },
  {
    id: "bolos-caseiros",
    name: "Bolos Caseiros",
    category: "doces",
    emoji: "🎂",
    description:
      "Bolos de aniversário, chocolate, cenoura, limão — feitos por encomenda com todo o carinho",
  },
  {
    id: "bolo-pote",
    name: "Bolo de Pote",
    category: "doces",
    emoji: "🍰",
    description:
      "Porções individuais em frasco — chocolate, morango, natas. Práticos e irresistíveis",
  },
  {
    id: "pudins",
    name: "Pudins",
    category: "doces",
    emoji: "🍮",
    description:
      "Pudim caseiro de ovos, o rei da sobremesa portuguesa. Suave, cremoso, com caramelo dourado",
    popular: true,
  },
];

/* ═══════════════════════════════════════════════
   HELPERS & CONSTANTS
   ═══════════════════════════════════════════════ */

type FilterType = "todos" | "paes" | "doces";

const FILTERS: { key: FilterType; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "paes", label: "Pães 🥖" },
  { key: "doces", label: "Doces 🍰" },
];

const WHATSAPP_BASE = "https://wa.me/351914882047?text=";

function buildWhatsAppLink(productName: string) {
  return `${WHATSAPP_BASE}${encodeURIComponent(`Olá! Gostaria de encomendar: ${productName}`)}`;
}

/* ═══════════════════════════════════════════════
   ANIMATIONS
   ═══════════════════════════════════════════════ */

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: { duration: 0.25 },
  },
};

/* ═══════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════ */

export function ProdutosSection() {
  const [filter, setFilter] = useState<FilterType>("todos");

  const filtered =
    filter === "todos"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === filter);

  return (
    <section
      id="produtos"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FFF8F0 0%, #F0E0CC 100%)" }}
    >
      {/* ── Decorative background blobs ── */}
      <div
        className="absolute top-20 -left-32 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "#E8A0B0" }}
      />
      <div
        className="absolute bottom-20 -right-32 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "#C9A050" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* ═══════════════ SECTION HEADER ═══════════════ */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="text-3xl md:text-5xl lg:text-6xl font-light mb-4"
            style={{
              fontFamily: "var(--font-playfair, Georgia, serif)",
              color: "#1B5E5E",
            }}
          >
            Os Nossos Sabores
          </h2>
          <p className="text-base md:text-lg max-w-md mx-auto" style={{ color: "#2D2D2D" }}>
            Cada receita conta uma história de amor
          </p>

          {/* Cloud divider */}
          <div className="flex justify-center mt-6">
            <svg
              width="120"
              height="24"
              viewBox="0 0 120 24"
              fill="none"
              className="opacity-30"
            >
              <ellipse cx="20" cy="16" rx="18" ry="8" fill="#C9A050" />
              <ellipse cx="50" cy="12" rx="22" ry="11" fill="#C9A050" />
              <ellipse cx="80" cy="14" rx="20" ry="9" fill="#C9A050" />
              <ellipse cx="105" cy="16" rx="15" ry="7" fill="#C9A050" />
            </svg>
          </div>
        </motion.div>

        {/* ═══════════════ FILTER TABS ═══════════════ */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div
            className="inline-flex items-center gap-1 p-1.5 rounded-full"
            style={{ background: "rgba(27, 94, 94, 0.08)" }}
          >
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className="relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
                style={{
                  color:
                    filter === f.key ? "#FFFFFF" : "#1B5E5E",
                }}
              >
                {filter === f.key && (
                  <motion.span
                    layoutId="produtos-filter-active"
                    className="absolute inset-0 rounded-full shadow-md"
                    style={{
                      background: "linear-gradient(135deg, #1B5E5E, #164a4a)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* ═══════════════ PRODUCT GRID ═══════════════ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                custom={i}
                variants={cardVariants}
                className="group relative flex flex-col rounded-3xl border-2 bg-white p-5 md:p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-default"
                style={{
                  borderColor: "rgba(201, 160, 80, 0.15)",
                }}
                whileHover={{
                  borderColor: "rgba(201, 160, 80, 0.5)",
                }}
              >
                {/* Popular badge */}
                {product.popular && (
                  <span
                    className="absolute -top-2.5 right-4 inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase shadow-sm"
                    style={{
                      background: "linear-gradient(135deg, #C9A050, #d4b060)",
                      color: "#FFFFFF",
                    }}
                  >
                    <span>&#11088;</span> Popular
                  </span>
                )}

                {/* Emoji */}
                <div className="flex justify-center mb-4 mt-1">
                  <motion.span
                    className="text-[64px] leading-none select-none inline-block"
                    animate={{
                      y: [0, -6, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3,
                    }}
                  >
                    {product.emoji}
                  </motion.span>
                </div>

                {/* Product name */}
                <h3
                  className="text-base md:text-lg font-medium text-center mb-2 leading-snug"
                  style={{
                    fontFamily: "var(--font-playfair, Georgia, serif)",
                    color: "#1B5E5E",
                  }}
                >
                  {product.name}
                </h3>

                {/* Description */}
                <p
                  className="text-xs md:text-sm text-center leading-relaxed mb-5 flex-1"
                  style={{ color: "#2D2D2D", opacity: 0.7 }}
                >
                  {product.description}
                </p>

                {/* Encomendar button */}
                <a
                  href={buildWhatsAppLink(product.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-md"
                  style={{
                    background: "linear-gradient(135deg, #1B5E5E, #164a4a)",
                    color: "#FFFFFF",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="shrink-0"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Encomendar
                </a>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ═══════════════ BOTTOM CTA ═══════════════ */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div
            className="inline-block rounded-2xl px-8 py-6 md:px-12 md:py-8"
            style={{
              background: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(201, 160, 80, 0.2)",
            }}
          >
            <p
              className="text-lg md:text-xl font-light mb-4"
              style={{
                fontFamily: "var(--font-playfair, Georgia, serif)",
                color: "#1B5E5E",
              }}
            >
              Não encontrou o que procura? Fale connosco!
            </p>
            <p
              className="text-sm mb-5 max-w-md mx-auto"
              style={{ color: "#2D2D2D", opacity: 0.6 }}
            >
              Fazemos encomendas personalizadas para festas, eventos e momentos especiais.
            </p>
            <a
              href="https://wa.me/351914882047?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20os%20vossos%20produtos."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #C9A050, #b8903f)",
                color: "#FFFFFF",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Falar no WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
