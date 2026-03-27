"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "Quanto custa a manutenção de um jardim?",
    a: "Depende do tamanho e frequência. Planos a partir de €89/mês para jardins até 200m². Peça um orçamento gratuito para um valor personalizado.",
  },
  {
    q: "Com que frequência devem ser feitas as manutenções?",
    a: "Recomendamos visitas semanais no verão e quinzenais no inverno. O clima do Algarve exige atenção especial nos meses quentes.",
  },
  {
    q: "Que serviços estão incluídos na manutenção?",
    a: "Corte de relva, aparação de sebes, rega, adubação, controlo de pragas e limpeza geral. Os serviços variam conforme o plano escolhido.",
  },
  {
    q: "Fazem serviços pontuais ou só planos mensais?",
    a: "Fazemos ambos! Serviços pontuais como limpeza de terrenos, poda de árvores ou instalação de rega. Sem compromisso.",
  },
  {
    q: "Trabalham em todo o Algarve?",
    a: "Sim, cobrimos todo o Algarve, de Lagos a Vila Real de Santo António. As nossas equipas estão distribuídas por toda a região.",
  },
  {
    q: "Como posso pedir um orçamento?",
    a: "Contacte-nos por WhatsApp, telefone ou formulário. Respondemos em 24 horas com um orçamento gratuito e sem compromisso.",
  },
  {
    q: "Que garantias oferecem?",
    a: "Todos os nossos serviços incluem garantia de satisfação. Se não ficar satisfeito, voltamos sem custo adicional.",
  },
  {
    q: "Aceitam que forma de pagamento?",
    a: "Transferência bancária, MB Way, e multibanco. Para planos mensais, débito direto com desconto de 5%.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-20 sm:py-24" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold"
            style={{ backgroundColor: "#DCFCE7", color: "#15803D" }}
          >
            <HelpCircle className="h-4 w-4" />
            Perguntas Frequentes
          </span>
          <h2
            className="mt-4 text-3xl font-bold sm:text-4xl"
            style={{ fontFamily: "var(--font-jakarta), sans-serif", color: "#1F2937" }}
          >
            Dúvidas Comuns
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="rounded-xl border overflow-hidden"
                style={{ borderColor: isOpen ? "#16A34A" : "#E5E7EB" }}
              >
                <button
                  className="flex w-full items-center justify-between px-6 py-4 text-left"
                  style={{ backgroundColor: isOpen ? "#F0FDF4" : "#FFFFFF" }}
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span
                    className="text-base font-semibold pr-4"
                    style={{ color: "#1F2937" }}
                  >
                    {f.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                  >
                    <ChevronDown className="h-5 w-5" style={{ color: "#16A34A" }} />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
