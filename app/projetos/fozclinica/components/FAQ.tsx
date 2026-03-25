"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Como posso marcar uma consulta na Fozclinica?",
    answer:
      "Pode marcar consulta através do nosso número de telefone (+351 918 338 954), por WhatsApp ou pessoalmente na nossa clínica em Rua Bartolomeu Dias 63, Figueira da Foz. Respondemos a todas as solicitações com a maior brevidade possível.",
  },
  {
    question: "A Fozclinica tem convenções com seguros de saúde?",
    answer:
      "Sim, trabalhamos com os principais sistemas de saúde e seguradoras. Contacte-nos para confirmar se a sua seguradora ou subsistema tem convenção connosco. Aceitamos também pagamento particular com diferentes modalidades.",
  },
  {
    question: "Qual é o horário de funcionamento da clínica?",
    answer:
      "Estamos abertos de segunda a sexta das 9h às 19h, e aos sábados das 9h às 13h. Para urgências fora de horário em medicina dentária, disponibilizamos contacto de emergência para os nossos doentes.",
  },
  {
    question: "Posso tratar várias especialidades na mesma clínica?",
    answer:
      "Sim, e essa é uma das grandes vantagens da Fozclinica! Por sermos um centro multidisciplinar, pode tratar medicina dentária, podologia, psicologia e reabilitação física no mesmo espaço. Os nossos especialistas comunicam entre si para um acompanhamento mais coordenado.",
  },
  {
    question: "A clínica tem estacionamento próximo?",
    answer:
      "Sim, existem várias zonas de estacionamento nas imediações da Rua Bartolomeu Dias. A clínica é de fácil acesso a pé a partir do centro da Figueira da Foz, e também está servida por transportes públicos.",
  },
  {
    question: "É necessário algum exame prévio para a primeira consulta?",
    answer:
      "Para a maioria das especialidades não é necessário trazer exames na primeira consulta — o nosso profissional de saúde fará a avaliação inicial. No entanto, se tiver radiografias, análises ou relatórios recentes relevantes, não deixe de os trazer.",
  },
  {
    question: "Atendem crianças em todas as especialidades?",
    answer:
      "Sim! Temos profissionais com formação específica para o atendimento pediátrico em medicina dentária (odontopediatria), psicologia infantil e fisioterapia pediátrica. O conforto e bem-estar das crianças é uma prioridade para a nossa equipa.",
  },
  {
    question: "Qual o tempo de espera habitual para uma consulta?",
    answer:
      "Na Fozclinica esforçamo-nos para ter tempos de espera reduzidos. Na maioria das situações conseguimos marcação em menos de uma semana. Em casos urgentes de medicina dentária ou psicologia, tentamos acomodar o doente o mais rapidamente possível.",
  },
  {
    question: "As consultas de psicologia são confidenciais?",
    answer:
      "Absolutamente. Todas as consultas de psicologia são estritamente confidenciais, ao abrigo do sigilo profissional e do Código Deontológico da Ordem dos Psicólogos Portugueses. A sua privacidade é inviolável.",
  },
  {
    question: "Fazem orçamentos gratuitos em medicina dentária?",
    answer:
      "Sim. A primeira consulta de medicina dentária inclui avaliação clínica e apresentação de um plano de tratamento com orçamento detalhado e sem compromisso. Acreditamos que o doente deve ter toda a informação antes de decidir.",
  },
];

function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="border border-slate-200 rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-slate-50 transition-colors"
        aria-expanded={open}
      >
        <span
          className="font-semibold text-slate-800 pr-4 text-sm md:text-base"
          style={{ fontFamily: "var(--font-plus-jakarta-sans, sans-serif)" }}
        >
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-slate-400" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-sm text-slate-500 leading-relaxed bg-white border-t border-slate-100">
              <div className="pt-4">{faq.answer}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="py-24 bg-white" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-teal-50 text-teal-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-teal-200">
            Perguntas Frequentes
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-slate-800 mb-4"
            style={{ fontFamily: "var(--font-plus-jakarta-sans, sans-serif)" }}
          >
            Tem alguma dúvida?
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Reunimos as perguntas que nos chegam mais frequentemente. Se não encontrar a resposta aqui, contacte-nos diretamente.
          </p>
        </motion.div>

        {isInView && (
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={faq.question} faq={faq} index={i} />
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-500 text-sm mb-4">Ainda tem dúvidas? A nossa equipa está aqui para ajudar.</p>
          <a
            href="https://wa.me/351918338954?text=Olá%2C%20tenho%20uma%20dúvida%20sobre%20a%20Fozclinica."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-full text-sm transition-all hover:shadow-lg"
          >
            Falar connosco via WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
