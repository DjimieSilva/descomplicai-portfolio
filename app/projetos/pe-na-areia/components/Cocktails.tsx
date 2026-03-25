"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const cocktails = [
  {
    name: "Oceano Atlântico",
    base: "Gin Azul",
    ingredients: "Gin, blue curaçao, água tónica premium, casca de limão, flor de sal",
    profile: "Fresco · Cítrico · Salino",
    price: "12",
    featured: true,
  },
  {
    name: "Pôr do Sol da Foz",
    base: "Rum & Laranja",
    ingredients: "Rum branco, sumo de laranja fresco, grenadine, espuma de coco",
    profile: "Doce · Tropical · Vibrante",
    price: "11",
    featured: false,
  },
  {
    name: "Brisa da Costa",
    base: "Vodka",
    ingredients: "Vodka, licor de framboesa, sumo de cranberry, lima, hortelã",
    profile: "Refrescante · Frutado · Leve",
    price: "11",
    featured: false,
  },
  {
    name: "Areia Dourada",
    base: "Whisky",
    ingredients: "Bourbon, mel de laranjeira, sumo de limão, ginger beer, canela",
    profile: "Quente · Mel · Especiado",
    price: "13",
    featured: false,
  },
  {
    name: "Marés de Verão",
    base: "Aperol",
    ingredients: "Aperol, prosecco, água com gás, fatia de laranja, folha de alecrim",
    profile: "Amargo · Efervescente · Vivo",
    price: "10",
    featured: false,
  },
  {
    name: "Néctar do Mar",
    base: "Espumante",
    ingredients: "Espumante português, elderflower, pepino, limão, menta fresca",
    profile: "Elegante · Floral · Delicado",
    price: "13",
    featured: true,
  },
];

export default function Cocktails() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="cocktails" className="py-24 md:py-32 bg-[#0f0d0a] relative overflow-hidden">
      {/* Ocean teal accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0E7490]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0E7490]/5 via-transparent to-[#F97316]/5 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p
            className="text-[#0E7490]/70 text-xs tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Bar de Praia
          </p>
          <h2
            className="text-[#FAF8F4] text-4xl md:text-6xl font-light mb-4"
            style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 200 }}
          >
            Cocktails{" "}
            <span className="text-[#F97316] italic" style={{ fontWeight: 300 }}>
              &amp; Bebidas
            </span>
          </h2>
          <p className="text-[#9A8C72] text-sm max-w-md mx-auto">
            Criações exclusivas inspiradas no oceano e no sol da Figueira. Cada
            copo é uma viagem sensorial.
          </p>
        </motion.div>

        {/* Cocktails grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cocktails.map((cocktail, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className={`group relative p-6 rounded-2xl border transition-all duration-500 overflow-hidden ${
                cocktail.featured
                  ? "border-[#F97316]/30 bg-gradient-to-br from-[#F97316]/8 to-[#DDB892]/5"
                  : "border-[#0E7490]/15 bg-[#0E7490]/3 hover:border-[#0E7490]/30"
              }`}
            >
              {cocktail.featured && (
                <div className="absolute top-4 right-4 text-[9px] tracking-[0.25em] uppercase text-[#F97316] border border-[#F97316]/30 rounded-full px-2 py-0.5">
                  Assinatura
                </div>
              )}

              {/* Decorative circle */}
              <div
                className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                style={{ backgroundColor: cocktail.featured ? "#F97316" : "#0E7490" }}
              />

              {/* Base spirit */}
              <div
                className="text-[10px] tracking-[0.3em] uppercase mb-4 opacity-60"
                style={{
                  color: cocktail.featured ? "#F97316" : "#0E7490",
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                {cocktail.base}
              </div>

              {/* Name */}
              <h3
                className="text-[#FAF8F4] text-lg font-medium mb-2 leading-tight"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                {cocktail.name}
              </h3>

              {/* Profile tags */}
              <p
                className="text-[#DDB892]/50 text-[11px] italic mb-4"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                {cocktail.profile}
              </p>

              {/* Ingredients */}
              <p className="text-[#9A8C72] text-xs leading-relaxed mb-5">
                {cocktail.ingredients}
              </p>

              {/* Price */}
              <div className="flex items-end justify-between">
                <div
                  className="w-8 h-px"
                  style={{ backgroundColor: cocktail.featured ? "#F97316" : "#0E7490", opacity: 0.5 }}
                />
                <span
                  className="text-[#DDB892] text-xl font-light"
                  style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 300 }}
                >
                  {cocktail.price}€
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Wines note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-14 p-8 border border-[#DDB892]/15 rounded-2xl bg-[#DDB892]/4 text-center"
        >
          <p
            className="text-[#DDB892]/70 text-xs tracking-[0.3em] uppercase mb-3"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Carta de Vinhos
          </p>
          <p className="text-[#9A8C72] text-sm max-w-lg mx-auto leading-relaxed">
            Seleção exclusiva de vinhos portugueses, com particular destaque para
            os bairradas, vinhos verdes e espumantes regionais. Mais de 60
            referências nacionais e internacionais, maridadas pelo nosso sommelier.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
