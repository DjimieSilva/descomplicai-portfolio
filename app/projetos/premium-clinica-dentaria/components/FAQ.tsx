"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Com que frequência devo ir ao dentista mesmo sem ter dores?",
    answer:
      "Para adultos saudáveis, recomendamos consultas de higiene e check-up a cada 6 meses. Para crianças e pacientes sénior, ou aqueles com maior risco de cáries ou doença periodontal, pode ser necessário cada 3–4 meses. A ausência de dor não significa ausência de problemas — muitas patologias orais evoluem silenciosamente.",
  },
  {
    question: "O que é exatamente uma consulta de prevenção?",
    answer:
      "Uma consulta de prevenção inclui limpeza profissional (detartragem e polimento), avaliação de cáries, rastreio periodontal, instrução de higiene personalizada e, quando indicado, aplicação de flúor ou selantes. É a base do nosso programa e a forma mais eficaz de manter a saúde oral a longo prazo.",
  },
  {
    question: "A partir de que idade devo trazer o meu filho ao dentista?",
    answer:
      "Recomendamos a primeira visita por volta dos 12 meses ou quando surgem os primeiros dentes, e não mais tarde do que os 3 anos. A primeira consulta é essencial para familiarizar a criança com o ambiente, avaliar o desenvolvimento e ensinar os pais a limpar os dentes dos mais pequenos corretamente.",
  },
  {
    question: "Os implantes dentários são para toda a vida?",
    answer:
      "Com os cuidados adequados, os implantes podem durar décadas — muitas vezes toda a vida. A chave é uma boa higiene diária, visitas regulares de manutenção e não fumar. Antes de colocar implantes, fazemos sempre uma avaliação completa óssea e de saúde geral para garantir o sucesso a longo prazo.",
  },
  {
    question: "O branqueamento dentário é seguro?",
    answer:
      "Sim, quando realizado ou supervisionado por um médico dentista. O branqueamento clínico utiliza géis de peróxido em concentrações controladas, com proteção dos tecidos moles. Fazemos sempre uma avaliação prévia para confirmar que o paciente é candidato e que não tem cáries ou problemas gengivais activos.",
  },
  {
    question: "Que diferença faz uma clínica focada em prevenção?",
    answer:
      "Uma clínica focada em prevenção investe mais tempo em consultas de rastreio, educação do paciente e detecção precoce. O resultado é que os nossos pacientes em programa de prevenção têm, em média, significativamente menos tratamentos curativos ao longo dos anos — menos custos, menos procedimentos e uma experiência muito mais positiva.",
  },
  {
    question: "Aceitam seguros de saúde?",
    answer:
      "Trabalhamos com as principais seguradoras e subsistemas de saúde presentes em Portugal. Aconselhamos sempre a confirmar a cobertura específica antes da consulta. A nossa equipa administrativa ajuda-o a perceber exatamente o que está coberto pelo seu plano.",
  },
  {
    question: "Como posso marcar consulta?",
    answer:
      "Pode marcar consulta por telefone, WhatsApp ou através do formulário nesta página. Respondemos em menos de 2 horas em dias úteis. Para urgências, disponibilizamos sempre um slot no próprio dia ou no dia seguinte.",
  },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="border border-[#D1FAE5] rounded-2xl overflow-hidden"
    >
      <button
        className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-[#D1FAE5]/20 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-base font-semibold text-[#064E3B]" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-[#6B8F71]" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <p className="text-[#064E3B]/65 leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="faq"
      ref={ref}
      className="py-24 md:py-32 bg-white"
      aria-labelledby="faq-heading"
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:sticky lg:top-8 self-start"
          >
            <div className="inline-flex items-center gap-2 bg-[#D1FAE5] rounded-full px-4 py-1.5 mb-6">
              <HelpCircle className="w-3.5 h-3.5 text-[#064E3B]" />
              <span className="text-xs font-semibold text-[#064E3B] uppercase tracking-wider">
                Perguntas Frequentes
              </span>
            </div>
            <h2
              id="faq-heading"
              className="text-3xl md:text-4xl font-bold text-[#064E3B] leading-tight mb-6"
              style={{ fontFamily: "var(--font-sora), sans-serif" }}
            >
              Tem dúvidas?{" "}
              <span className="text-[#6B8F71]">Temos respostas</span>
            </h2>
            <p className="text-[#064E3B]/60 leading-relaxed mb-8">
              Estas são as perguntas que mais ouvimos. Se a sua dúvida não estiver aqui, entre em contacto — respondemos sempre com muito gosto.
            </p>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 bg-[#064E3B] text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#065f46] transition-colors"
            >
              Falar com a equipa
            </a>
          </motion.div>

          {/* Right: FAQs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-3"
          >
            {faqs.map((faq, index) => (
              <FAQItem key={faq.question} faq={faq} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
