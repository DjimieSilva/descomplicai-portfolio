"use client";

import { motion, type Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, FlaskConical, Clock, Shield } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const pillars = [
  {
    icon: FlaskConical,
    title: "Laboratório Próprio",
    desc: "O nosso laboratório de próteses integrado garante peças com qualidade superior e prazos mais curtos, sem intermediários.",
  },
  {
    icon: Award,
    title: "Mais de 20 Anos",
    desc: "Duas décadas de experiência clínica ao serviço das famílias da Figueira da Foz e região, com uma reputação construída caso a caso.",
  },
  {
    icon: Shield,
    title: "Tecnologia Avançada",
    desc: "Equipamentos de última geração — radiografia digital, scanner intraoral e sistema CAD/CAM — para diagnósticos precisos e tratamentos minimamente invasivos.",
  },
  {
    icon: Clock,
    title: "Atendimento Personalizado",
    desc: "Cada paciente é único. Desenvolvemos planos de tratamento individualizados, sempre com transparência total sobre custos e procedimentos.",
  },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre" ref={ref} className="bg-[#F5F0E8] py-28 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: text content */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={fadeUp} className="mb-4">
              <span className="inline-flex items-center gap-2 text-[#C8A55A] text-xs tracking-[0.3em] uppercase font-semibold">
                <span className="w-8 h-[1px] bg-[#C8A55A]" />
                Sobre Nós
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-serif text-4xl lg:text-5xl text-[#0A1628] leading-tight mb-6"
            >
              Uma Clínica construída sobre{" "}
              <span className="text-[#C8A55A] italic">confiança</span> e excelência
            </motion.h2>

            <motion.div variants={fadeUp} className="w-16 h-[2px] bg-[#C8A55A] mb-8" />

            <motion.p
              variants={fadeUp}
              className="text-[#0A1628]/70 text-lg leading-relaxed mb-6"
            >
              Fundada em 2003 pelo Dr. Rodrigo Vasconcelos, a Clínica Vasco da Gama nasceu com uma missão clara: democratizar o acesso a cuidados dentários de excelência na Figueira da Foz, sem prescindir da sofisticação e da qualidade que cada sorriso merece.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-[#0A1628]/70 text-lg leading-relaxed mb-10"
            >
              O que nos distingue é a nossa filosofia integrativa: tratamos cada paciente de forma holística, combinando medicina dentária convencional com técnicas de estética facial. O nosso laboratório próprio de próteses é uma raridade na região e garante resultados sem precedentes em termos de estética e funcionalidade.
            </motion.p>

            <motion.a
              variants={fadeUp}
              href="#contacto"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-3 bg-[#0A1628] hover:bg-[#0d1f3a] text-white px-8 py-4 font-semibold text-sm tracking-widest uppercase transition-all duration-300 group"
            >
              Conheça-nos Pessoalmente
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </motion.a>
          </motion.div>

          {/* Right: pillars grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  variants={fadeUp}
                  className="bg-white p-6 border-l-2 border-[#C8A55A] shadow-sm hover:shadow-md transition-shadow duration-300 group"
                >
                  <div className="w-10 h-10 bg-[#C8A55A]/10 rounded-sm flex items-center justify-center mb-4 group-hover:bg-[#C8A55A]/20 transition-colors">
                    <Icon size={20} className="text-[#C8A55A]" />
                  </div>
                  <h3 className="font-serif text-[#0A1628] font-bold text-lg mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-[#0A1628]/60 text-sm leading-relaxed">{pillar.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom: accreditations bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-20 pt-10 border-t border-[#0A1628]/10 flex flex-wrap items-center justify-between gap-8"
        >
          <div className="text-[#0A1628]/50 text-sm tracking-wide">
            Membro da Ordem dos Médicos Dentistas · Certificação ISO 9001
          </div>
          <div className="flex items-center gap-6">
            {["SNS Convencionado", "ADSE", "CGD Saúde", "Médis"].map((partner) => (
              <span
                key={partner}
                className="text-[#0A1628]/40 text-xs font-semibold tracking-widest uppercase border border-[#0A1628]/20 px-3 py-1"
              >
                {partner}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
