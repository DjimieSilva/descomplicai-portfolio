"use client";

import { motion, type Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

const cases = [
  {
    label: "Implantologia",
    beforeLabel: "Antes",
    afterLabel: "Após implante",
    desc: "Substituição de dente ausente por implante de titânio com coroa de cerâmica.",
    beforeColor: "from-[#8B7355] to-[#6B5B3E]",
    afterColor: "from-[#f0e8d8] to-[#e8dcc8]",
  },
  {
    label: "Ortodontia",
    beforeLabel: "Antes",
    afterLabel: "Após 18 meses",
    desc: "Correção de apinhamento dentário severo com alinhadores transparentes.",
    beforeColor: "from-[#7a8a6a] to-[#5a6a4a]",
    afterColor: "from-[#e8f0e0] to-[#d0e0c0]",
  },
  {
    label: "Reabilitação Oral",
    beforeLabel: "Antes",
    afterLabel: "Após reabilitação",
    desc: "Reabilitação oral completa com 6 implantes e prótese fixa de zircónia.",
    beforeColor: "from-[#8a6a5a] to-[#6a4a3a]",
    afterColor: "from-[#f5ede8] to-[#ead8d0]",
  },
  {
    label: "Branqueamento",
    beforeLabel: "Tom A3",
    afterLabel: "Tom B1",
    desc: "Branqueamento profissional com sistema LED em consultório — 8 tons mais claro.",
    beforeColor: "from-[#b8a878] to-[#988858]",
    afterColor: "from-[#f8f4ec] to-[#f0ebe0]",
  },
  {
    label: "Estética Facial",
    beforeLabel: "Antes",
    afterLabel: "Após botox",
    desc: "Suavização de rugas de expressão com toxina botulínica em testa e glabela.",
    beforeColor: "from-[#7a6a8a] to-[#5a4a6a]",
    afterColor: "from-[#ece8f0] to-[#ddd8e8]",
  },
  {
    label: "Facetas Cerâmicas",
    beforeLabel: "Antes",
    afterLabel: "Após facetas",
    desc: "Aplicação de 8 facetas de cerâmica ultrafina para sorriso Hollywood.",
    beforeColor: "from-[#9a8a7a] to-[#7a6a5a]",
    afterColor: "from-[#faf7f2] to-[#f2ece4]",
  },
];

function ToothShape({ colorClass, label }: { colorClass: string; label: string }) {
  return (
    <div className={`h-full bg-gradient-to-br ${colorClass} flex flex-col items-center justify-center relative overflow-hidden`}>
      {/* Subtle tooth silhouette */}
      <svg viewBox="0 0 100 120" className="w-16 h-20 opacity-20" fill="white">
        <path d="M50 5 C30 5, 15 20, 15 38 C15 50, 20 58, 24 67 C28 76, 30 85, 30 93 C30 102, 34 108, 40 108 C46 108, 48 102, 50 93 C52 102, 54 108, 60 108 C66 108, 70 102, 70 93 C70 85, 72 76, 76 67 C80 58, 85 50, 85 38 C85 20, 70 5, 50 5Z" />
      </svg>
      <span className="absolute bottom-3 left-0 right-0 text-center text-white/80 text-xs font-semibold tracking-widest uppercase">
        {label}
      </span>
    </div>
  );
}

export function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="galeria" ref={ref} className="bg-[#F5F0E8] py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6"
        >
          <div>
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 text-[#C8A55A] text-xs tracking-[0.3em] uppercase font-semibold mb-4"
            >
              <span className="w-8 h-[1px] bg-[#C8A55A]" />
              Casos Clínicos
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="font-serif text-4xl lg:text-5xl text-[#0A1628] leading-tight"
            >
              Resultados que{" "}
              <span className="text-[#C8A55A] italic">falam por si</span>
            </motion.h2>
          </div>

          <motion.p
            variants={fadeUp}
            className="text-[#0A1628]/60 max-w-md text-sm leading-relaxed lg:text-right"
          >
            Antes e depois de casos reais tratados na nossa clínica. Cada caso é único e os resultados
            individuais podem variar. Imagens ilustrativas — casos reais disponíveis em consulta.
          </motion.p>
        </motion.div>

        {/* Gallery grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {cases.map((item, i) => (
            <motion.div
              key={item.label}
              variants={fadeUp}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden bg-white border border-[#0A1628]/8 hover:border-[#C8A55A]/40 transition-all duration-300 hover:shadow-lg">
                {/* Before/After split */}
                <div className="relative h-52 overflow-hidden">
                  <div className="flex h-full">
                    <div className="w-1/2 h-full">
                      <ToothShape colorClass={item.beforeColor} label={item.beforeLabel} />
                    </div>
                    <div className="w-1/2 h-full">
                      <ToothShape colorClass={item.afterColor} label={item.afterLabel} />
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-white z-10" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full z-20 flex items-center justify-center shadow-md">
                    <ArrowRight size={14} className="text-[#0A1628]" />
                  </div>

                  {/* Category label */}
                  <div className="absolute top-3 left-3 bg-[#0A1628]/80 backdrop-blur-sm text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1">
                    {item.label}
                  </div>
                </div>

                {/* Description */}
                <div className="p-4">
                  <p className="text-[#0A1628]/65 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center text-[#0A1628]/40 text-xs mt-8 max-w-2xl mx-auto"
        >
          As imagens apresentadas são representativas e ilustrativas. Os resultados reais de casos
          tratados na clínica estão disponíveis para consulta presencial, sempre com o consentimento
          dos pacientes e em conformidade com o Regulamento Geral de Protecção de Dados (RGPD).
        </motion.p>
      </div>
    </section>
  );
}
