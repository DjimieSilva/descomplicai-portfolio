"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Chef() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#1C1917] py-24 md:py-36 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">

          {/* Portrait placeholder — editorial square */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5"
          >
            <div className="relative aspect-[3/4] max-w-sm mx-auto md:mx-0 overflow-hidden">
              {/* Portrait simulation */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#3d2e1a] via-[#2a1f0e] to-[#1C1917]" />
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  backgroundSize: "128px",
                }}
              />
              {/* Name overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#1C1917] to-transparent">
                <p className="font-['Playfair_Display'] text-[#FAF9F6] text-2xl font-light">Ricardo Matos</p>
                <p className="text-[#92702B] text-xs tracking-[0.25em] uppercase font-['Libre_Franklin'] mt-1">Chef Executivo</p>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-[#92702B]/60 text-xs tracking-[0.4em] uppercase font-['Libre_Franklin'] mb-5"
            >
              O Chef
            </motion.p>

            <div className="overflow-hidden mb-6">
              <motion.h2
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                className="font-['Playfair_Display'] text-[#FAF9F6] text-4xl md:text-5xl font-light leading-tight"
              >
                Raízes na costa,<br />
                <em>olhos no mundo</em>
              </motion.h2>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              style={{ originX: 0 }}
              className="h-px w-12 bg-[#92702B] mb-8"
            />

            <div className="space-y-5">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-[#D4C5A9]/70 text-base leading-relaxed font-['Libre_Franklin'] font-light"
              >
                Ricardo Matos nasceu em Buarcos, a dois passos do mar. Estudou em Lisboa, passou pelas cozinhas do Porto e de Bordéus, e voltou. Sempre soube que voltaria.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-[#D4C5A9]/70 text-base leading-relaxed font-['Libre_Franklin'] font-light"
              >
                A sua cozinha é uma conversa entre a tradição portuguesa e a técnica contemporânea. Sem excessos. Sem artifícios. O ingrediente certo, no momento certo.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-[#D4C5A9]/70 text-base leading-relaxed font-['Libre_Franklin'] font-light"
              >
                No SAND, conhece os pescadores pelo nome. Sabe que o polvo de terça-feira veio de um barco que partiu na segunda. Isso, acredita ele, sente-se no prato.
              </motion.p>
            </div>

            {/* Quotes */}
            <motion.blockquote
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.9 }}
              className="mt-10 pl-5 border-l border-[#92702B] italic font-['Playfair_Display'] text-[#D4C5A9]/60 text-lg leading-relaxed"
            >
              "A melhor cozinha é a que não precisa de se explicar."
            </motion.blockquote>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
