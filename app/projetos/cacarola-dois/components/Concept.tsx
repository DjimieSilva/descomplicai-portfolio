"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Fish, Anchor, Leaf } from "lucide-react";

const pillars = [
  {
    icon: Fish,
    title: "Pesca Local",
    description:
      "Trabalhamos exclusivamente com pescadores locais da Figueira da Foz. O peixe chega à nossa cozinha nas primeiras horas da manhã, garantindo a frescura máxima em cada prato.",
  },
  {
    icon: Anchor,
    title: "Técnica Contemporânea",
    description:
      "Receitas tradicionais portuguesas reimaginadas com técnicas modernas. Ceviches, tartares e preparações cuidadas que respeitam o produto sem o mascarar.",
  },
  {
    icon: Leaf,
    title: "Sazonalidade",
    description:
      "A ementa muda com as estações e com o que o mar tem para oferecer. Não há receitas fixas — há ingredientes de qualidade e criatividade na cozinha.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: "easeOut" as const },
  }),
};

export default function Concept() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-[#F1F5F9] py-24 sm:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-[family-name:var(--font-inter)] text-[#0369A1] text-xs tracking-[0.35em] uppercase mb-4"
        >
          O Conceito
        </motion.p>

        {/* Main statement */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-[family-name:var(--font-hanken)] font-black text-[clamp(2.2rem,5vw,4rem)] leading-[1] tracking-tight text-[#0C2340]"
          >
            O Segundo Capítulo
            <br />
            <span className="text-[#0369A1]">da Caçarola</span>
            <br />
            <span className="text-[#FB923C]">— Dedicado ao Mar</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="space-y-5"
          >
            <p className="font-[family-name:var(--font-inter)] text-[#475569] text-lg leading-relaxed">
              A Caçarola é, há anos, uma referência em Figueira da Foz. Com o
              Caçarola Dois, demos o próximo passo: um espaço inteiramente
              dedicado ao mar e aos frutos do oceano atlântico que nos rodeia.
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[#475569] text-base leading-relaxed">
              Mais contemporâneo, mais focado, sem nunca perder a alma que
              tornou a Caçarola num lugar especial. Um restaurante onde o
              produto é o protagonista e a cozinha, o palco.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-3">
                <div className="w-8 h-0.5 bg-[#FB923C]" />
                <span className="font-[family-name:var(--font-hanken)] text-[#0369A1] font-semibold text-sm tracking-wide">
                  Frescura. Técnica. Sabor.
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Three pillars */}
        <div className="grid sm:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              custom={i}
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-[#E2E8F0]"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0369A1]/10 flex items-center justify-center mb-5 group-hover:bg-[#0369A1]/20 transition-colors duration-200">
                <pillar.icon size={22} className="text-[#0369A1]" />
              </div>
              <h3 className="font-[family-name:var(--font-hanken)] font-bold text-[#0C2340] text-lg mb-3">
                {pillar.title}
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-[#475569] text-sm leading-relaxed">
                {pillar.description}
              </p>
              <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-[#FB923C] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
