"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    category: "Sobre o Procedimento",
    questions: [
      {
        q: "Os implantes dentários doem?",
        a: "O procedimento cirúrgico é realizado sob anestesia local, pelo que durante a cirurgia não sente dor. No pós-operatório, é normal algum desconforto e inchaço nos primeiros 2-3 dias, controlado com medicação adequada. A grande maioria dos pacientes fica surpreendida com o baixo nível de desconforto.",
      },
      {
        q: "Quanto tempo dura todo o processo de implante?",
        a: "O processo completo dura tipicamente entre 3 a 6 meses, dependendo da necessidade de enxertos ósseos e da velocidade de osseointegração de cada paciente. A cirurgia em si dura entre 30 a 90 minutos. Em casos selecionados, é possível colocar uma coroa provisória no próprio dia da cirurgia.",
      },
      {
        q: "O implante pode ser rejeitado pelo meu organismo?",
        a: "O titânio grau médico utilizado nos implantes é biocompatível e raramente provoca rejeição. A taxa de sucesso dos implantes dentários modernos situa-se entre 95-98%. A falha de um implante está geralmente associada a fatores como tabagismo, diabetes não controlada ou higiene inadequada — aspetos que discutimos e gerimos na consulta de avaliação.",
      },
      {
        q: "Preciso de anestesia geral para colocar implantes?",
        a: "Na grande maioria dos casos não. Utilizamos anestesia local de alta eficácia, que adormece completamente a zona sem necessidade de sedação geral. Para casos de ansiedade elevada, oferecemos sedação consciente inalatória (óxido nitroso) que torna o procedimento completamente confortável.",
      },
    ],
  },
  {
    category: "Sobre os Resultados",
    questions: [
      {
        q: "Quanto tempo duram os implantes dentários?",
        a: "Um implante dentário bem colocado e com manutenção adequada pode durar a vida toda. O implante de titânio tem uma longevidade praticamente ilimitada. A coroa cerâmica pode necessitar de substituição após 15-20 anos, dependendo do uso e higiene. Com as consultas de manutenção periódicas, asseguramos a longevidade máxima do investimento.",
      },
      {
        q: "O resultado final parece natural?",
        a: "Sim. As coroas em cerâmica zircónia que utilizamos imitam com extrema fidelidade a cor, translucidez e forma dos dentes naturais. Utilizamos técnicas de design digital do sorriso para planear previamente o resultado estético, garantindo harmonia com os dentes existentes e as proporções do rosto.",
      },
      {
        q: "Posso comer normalmente com implantes?",
        a: "Sim, após a cicatrização completa pode comer praticamente tudo normalmente. Os implantes funcionam como dentes naturais — pode morder, mastigar e sorrir com total confiança. Durante o período de osseointegração (3-4 meses), há algumas restrições alimentares temporárias que serão indicadas pela equipa.",
      },
    ],
  },
  {
    category: "Sobre Custos e Acesso",
    questions: [
      {
        q: "Qual é o custo de um implante dentário?",
        a: "O preço varia conforme a complexidade do caso, número de implantes e tipo de coroa. Um implante unitário completo (implante + coroa) parte de 1.200€. Para casos complexos ou reabilitações totais, elaboramos um orçamento personalizado após a avaliação. Oferecemos planos de pagamento sem juros.",
      },
      {
        q: "Os implantes são comparticipados pelo SNS ou subsistemas?",
        a: "O SNS não comparticipa implantes dentários. Contudo, muitos subsistemas de saúde (ADSE, PT ACS, SAMS, etc.) comparticipam parte dos custos — verifique as condições do seu. Temos convenção com vários subsistemas e emitimos toda a documentação necessária para reembolso.",
      },
      {
        q: "Que documentação preciso para a primeira consulta?",
        a: "Para a primeira consulta não é necessária documentação específica. Se já tiver radiografias recentes ou outros exames dentários, pode trazer — poderá evitar repetição de exames. Peça ao seu médico de família ou dentista anterior o historial clínico relevante.",
      },
      {
        q: "A consulta de avaliação tem algum custo?",
        a: "Não. Oferecemos a consulta inicial de avaliação de implantologia sem qualquer custo. Nessa consulta, o médico avalia a sua situação, explica as opções de tratamento e apresenta um orçamento detalhado e transparente. Sem pressões nem compromissos.",
      },
    ],
  },
];

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section id="faq" ref={ref} className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-[#1E40AF] text-sm font-semibold uppercase tracking-widest mb-4"
          >
            Dúvidas Frequentes
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-[#111827] font-[family-name:var(--font-sora)] mb-4"
          >
            Tudo o Que Precisa
            <br />
            <span className="text-[#1E40AF]">de Saber</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#374151] text-lg max-w-xl mx-auto"
          >
            Respondemos às questões mais comuns sobre implantologia. Mais dúvidas?
            Contacte-nos sem compromisso.
          </motion.p>
        </div>

        {/* FAQ by category */}
        <div className="space-y-10">
          {faqs.map((section, sectionIndex) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + sectionIndex * 0.1 }}
            >
              <h3 className="text-sm font-bold text-[#1E40AF] uppercase tracking-widest mb-4">
                {section.category}
              </h3>
              <div className="space-y-3">
                {section.questions.map((item, i) => {
                  const id = `${sectionIndex}-${i}`;
                  const isOpen = openItems.has(id);
                  return (
                    <div
                      key={id}
                      className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                        isOpen ? "border-[#1E40AF]/30 shadow-sm" : "border-[#E5E7EB]"
                      }`}
                    >
                      <button
                        onClick={() => toggle(id)}
                        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-[#F8FAFF] transition-colors duration-200"
                        aria-expanded={isOpen}
                      >
                        <span className="font-semibold text-[#111827] text-sm md:text-base">
                          {item.q}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-[#1E40AF] flex-shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-5 pb-5 text-[#374151] text-sm leading-relaxed border-t border-[#E5E7EB] pt-4">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-14 text-center p-8 bg-[#F8FAFF] border border-[#DBEAFE] rounded-2xl"
        >
          <p className="text-[#374151] mb-4">
            Não encontrou a resposta à sua dúvida?
          </p>
          <a
            href="#contacto"
            className="inline-block bg-[#1E40AF] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1D4ED8] transition-colors duration-200"
          >
            Fale Connosco
          </a>
        </motion.div>
      </div>
    </section>
  );
}
