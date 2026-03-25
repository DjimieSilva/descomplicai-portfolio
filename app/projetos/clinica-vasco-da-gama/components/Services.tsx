"use client";

import { motion, type Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Stethoscope,
  Smile,
  Sparkles,
  Wrench,
  Zap,
  Scissors,
  Star,
  Heart,
} from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const services = [
  {
    icon: Stethoscope,
    title: "Implantologia",
    shortDesc: "Substitua dentes em falta com implantes de titânio de última geração.",
    longDesc:
      "Os implantes dentários são a solução mais natural e duradoura para substituir dentes perdidos. Utilizamos implantes de titânio de marcas líderes mundiais, com taxa de sucesso superior a 98%. O procedimento é realizado sob anestesia local e o resultado é estético e funcional.",
    tag: "Mais Procurado",
    tagColor: "bg-[#C8A55A] text-[#0A1628]",
  },
  {
    icon: Smile,
    title: "Ortodontia",
    shortDesc: "Aparelhos fixos, removíveis e alinhadores invisíveis para todas as idades.",
    longDesc:
      "Da ortodontia convencional com brackets metálicos ou cerâmicos, aos modernos alinhadores transparentes — oferecemos soluções para crianças, adolescentes e adultos. Trabalhamos com sistemas de alinhadores de última geração para resultados precisos e confortáveis.",
    tag: "Para todas as idades",
    tagColor: "bg-[#0A1628]/10 text-[#0A1628]",
  },
  {
    icon: Sparkles,
    title: "Branqueamento",
    shortDesc: "Clareamento profissional até 8 tons mais branco com resultados imediatos.",
    longDesc:
      "O nosso sistema de branqueamento profissional garante resultados visíveis desde a primeira sessão. Oferecemos branqueamento em consultório com luz LED e branqueamento domiciliário com goteiras personalizadas. Resultados duradouros e seguros, acompanhados por um especialista.",
    tag: null,
    tagColor: "",
  },
  {
    icon: Wrench,
    title: "Próteses Dentárias",
    shortDesc: "Laboratório próprio — próteses fixas, removíveis e sobre implantes.",
    longDesc:
      "Com o nosso laboratório de próteses integrado, produzimos coroas, pontes, próteses parciais e totais com controlo de qualidade total. A proximidade com o técnico de prótese garante ajustes rápidos e resultados estéticos superiores, com prazos mais curtos e custos competitivos.",
    tag: "Laboratório Próprio",
    tagColor: "bg-[#C8A55A] text-[#0A1628]",
  },
  {
    icon: Zap,
    title: "Endodontia",
    shortDesc: "Tratamentos de canal com tecnologia rotativa — sem dor, sem ansiedade.",
    longDesc:
      "O tratamento endodôntico (tratamento de canal) preserva o dente natural e elimina a infeção. Utilizamos sistemas rotativos de nova geração e magnificação óptica para máxima precisão. O procedimento é realizado sob anestesia eficaz, tornando-o praticamente indolor.",
    tag: null,
    tagColor: "",
  },
  {
    icon: Scissors,
    title: "Cirurgia Oral",
    shortDesc: "Extrações, incluindo sisos, e cirurgias complexas com sedação consciente.",
    longDesc:
      "A nossa equipa de cirurgia oral realiza desde extrações simples a procedimentos mais complexos como a remoção de sisos inclusos, cirurgias pré-implantares e regeneração óssea. Dispomos de sedação consciente para pacientes ansiosos, garantindo total conforto.",
    tag: null,
    tagColor: "",
  },
  {
    icon: Star,
    title: "Estética Facial",
    shortDesc: "Botox e preenchimentos por médico dentista especializado em estética facial.",
    longDesc:
      "A medicina dentária e a estética facial estão intrinsecamente ligadas — ambas moldam o rosto e o sorriso. Os nossos médicos dentistas são formados em injeções de toxina botulínica e ácido hialurónico, corrigindo rugas de expressão e restaurando volumes faciais de forma natural e segura.",
    tag: "Exclusivo",
    tagColor: "bg-purple-100 text-purple-800",
  },
  {
    icon: Heart,
    title: "Higiene Oral",
    shortDesc: "Destartarização, polimento e plano de higiene individualizado.",
    longDesc:
      "A prevenção é o melhor tratamento. As nossas consultas de higiene oral incluem destartarização ultrassónica, polimento, aplicação de flúor e uma análise completa do risco de cárie e doença periodontal. Cada paciente recebe um programa de higiene personalizado.",
    tag: null,
    tagColor: "",
  },
];

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="servicos" ref={ref} className="bg-[#0A1628] py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 text-[#C8A55A] text-xs tracking-[0.3em] uppercase font-semibold mb-4"
          >
            <span className="w-8 h-[1px] bg-[#C8A55A]" />
            Os Nossos Serviços
            <span className="w-8 h-[1px] bg-[#C8A55A]" />
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-serif text-4xl lg:text-5xl text-white leading-tight mb-6"
          >
            Cuidados completos para{" "}
            <span className="text-[#C8A55A] italic">o seu sorriso</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Da prevenção à reabilitação completa, oferecemos uma gama abrangente de tratamentos
            dentários e estéticos sob o mesmo tecto.
          </motion.p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {services.map((service, i) => {
            const Icon = service.icon;
            const isActive = active === i;

            return (
              <motion.div
                key={service.title}
                variants={fadeUp}
                onClick={() => setActive(isActive ? null : i)}
                className="relative group cursor-pointer"
              >
                <div
                  className={`h-full p-6 border transition-all duration-300 ${
                    isActive
                      ? "bg-[#C8A55A] border-[#C8A55A] text-[#0A1628]"
                      : "bg-white/5 border-white/10 hover:border-[#C8A55A]/50 hover:bg-white/8"
                  }`}
                >
                  {/* Tag */}
                  {service.tag && (
                    <span
                      className={`inline-block text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 mb-4 ${
                        isActive ? "bg-[#0A1628]/20 text-[#0A1628]" : service.tagColor
                      }`}
                    >
                      {service.tag}
                    </span>
                  )}

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-sm flex items-center justify-center mb-4 transition-colors ${
                      isActive ? "bg-[#0A1628]/20" : "bg-[#C8A55A]/10 group-hover:bg-[#C8A55A]/20"
                    }`}
                  >
                    <Icon
                      size={22}
                      className={isActive ? "text-[#0A1628]" : "text-[#C8A55A]"}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-serif text-xl font-bold mb-3 ${
                      isActive ? "text-[#0A1628]" : "text-white"
                    }`}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-sm leading-relaxed ${
                      isActive ? "text-[#0A1628]/80" : "text-white/50"
                    }`}
                  >
                    {isActive ? service.longDesc : service.shortDesc}
                  </p>

                  {/* Expand indicator */}
                  <div
                    className={`mt-4 text-xs font-semibold tracking-widest uppercase ${
                      isActive ? "text-[#0A1628]/60" : "text-[#C8A55A]/60"
                    }`}
                  >
                    {isActive ? "Fechar ↑" : "Saber mais ↓"}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-14"
        >
          <p className="text-white/50 mb-6 text-sm">
            Não encontrou o que procura? Contacte-nos para uma avaliação personalizada.
          </p>
          <a
            href="#contacto"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 border border-[#C8A55A] text-[#C8A55A] hover:bg-[#C8A55A] hover:text-[#0A1628] px-8 py-3 text-sm font-semibold tracking-widest uppercase transition-all duration-300"
          >
            Agendar Avaliação Gratuita
          </a>
        </motion.div>
      </div>
    </section>
  );
}
