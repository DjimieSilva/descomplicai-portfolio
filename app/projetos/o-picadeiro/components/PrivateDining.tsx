"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Gift, Briefcase, Heart } from "lucide-react";

const occasions = [
  {
    icon: Heart,
    title: "Casamentos & Noivados",
    description:
      "Da proposta íntima ao jantar de ensaio, criamos o cenário perfeito para os momentos mais importantes. Menu personalizado, decoração floral, serviço exclusivo.",
    detail: "Até 80 pessoas · Menu a partir de €55/pessoa",
  },
  {
    icon: Briefcase,
    title: "Eventos Corporativos",
    description:
      "Jantares de negócios, apresentações a clientes, team buildings gastronómicos. Ambiente de prestígio que impressiona e facilita o sucesso das suas reuniões.",
    detail: "Sala privada até 12 pessoas · AV disponível",
  },
  {
    icon: Gift,
    title: "Celebrações Especiais",
    description:
      "Aniversários, batizados, comunhões. Cada evento é tratado com dedicação total — desde a ementa até à decoração da mesa e ao bolo de celebração.",
    detail: "Grupos de 8 a 80 pessoas",
  },
  {
    icon: Users,
    title: "Jantares de Grupo",
    description:
      "Para grupos de amigos ou família, oferecemos menus fixos com ótima relação qualidade-preço, sem perder o padrão O Picadeiro que os nossos convidados esperam.",
    detail: "A partir de 10 pessoas · Menu executivo disponível",
  },
];

export default function PrivateDining() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 bg-[#FFFBEB]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-8 bg-[#B87333]" />
              <span
                className="text-[#B87333] text-xs tracking-[0.3em] uppercase"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Eventos Privados
              </span>
            </div>

            <h2
              className="text-4xl md:text-5xl font-light text-[#292524] mb-6 leading-tight"
              style={{ fontFamily: "var(--font-literata)" }}
            >
              Momentos{" "}
              <span className="italic text-[#1B4332]">Inesquecíveis</span>
            </h2>

            <p
              className="text-[#292524]/65 leading-relaxed mb-8 text-lg"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Transformamos a sua ocasião especial numa experiência única. A nossa
              equipa dedica-se inteiramente a cada detalhe — da ementa à ambientação —
              para que não tenha de se preocupar com nada além de desfrutar.
            </p>

            {/* Highlights */}
            <div className="space-y-3 mb-10">
              {[
                "Ementa personalizada com o Chef",
                "Serviço dedicado e discreto",
                "Seleção de vinhos com o Sommelier",
                "Decoração floral a pedido",
                "Bolo de celebração incluído em eventos especiais",
                "Estacionamento reservado para o grupo",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-[#B87333] shrink-0" />
                  <p
                    className="text-sm text-[#292524]/65"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="#reservas"
              className="group inline-flex items-center gap-3 bg-[#1B4332] text-[#FFFBEB] px-8 py-4 text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:bg-[#B87333]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Pedir Proposta
              <span className="w-4 h-px bg-current transition-all duration-300 group-hover:w-6" />
            </a>
          </motion.div>

          {/* Right: occasion cards */}
          <div className="space-y-4">
            {occasions.map((occasion, i) => {
              const Icon = occasion.icon;
              return (
                <motion.div
                  key={occasion.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.1 + 0.2 }}
                  className="group p-6 border border-[#292524]/10 hover:border-[#1B4332] transition-all duration-300 hover:shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-[#B87333]/30 flex items-center justify-center shrink-0 group-hover:border-[#B87333] transition-colors">
                      <Icon className="w-4 h-4 text-[#B87333]" />
                    </div>
                    <div className="flex-1">
                      <h3
                        className="text-base font-medium text-[#292524] mb-2"
                        style={{ fontFamily: "var(--font-literata)" }}
                      >
                        {occasion.title}
                      </h3>
                      <p
                        className="text-sm text-[#292524]/60 leading-relaxed mb-3"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {occasion.description}
                      </p>
                      <p
                        className="text-xs tracking-wide text-[#B87333]"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {occasion.detail}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
