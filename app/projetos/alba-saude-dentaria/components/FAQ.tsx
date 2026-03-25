"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "A Alba Saúde Dentária aceita a minha ADSE?",
    answer:
      "Sim, somos convencionados com a ADSE e processamos diretamente os seus tratamentos com o subsistema. Na sua primeira consulta, basta apresentar o cartão de beneficiário e o número de utente. Para tratamentos mais complexos, podemos ajudá-lo a pedir autorização prévia à ADSE. Aceitamos também Multicare, Médis, AdvanceCare, DKV, SAMS, IASFA e mais de 12 convenções.",
  },
  {
    question: "O que é o bloco operatório e quando é necessário?",
    answer:
      "O nosso bloco operatório é uma sala cirúrgica certificada, equipada ao nível de um bloco hospitalar, com monitorização contínua do paciente e equipamento de suporte vital. É indicado para cirurgias orais de maior complexidade — extração de sisos inclusos, implantologia avançada, enxertos ósseos, cirurgia periodontal extensa e casos que beneficiam de sedação consciente. Realizamos os procedimentos em regime ambulatório, sem necessidade de internamento.",
  },
  {
    question: "É possível fazer o tratamento com sedação?",
    answer:
      "Sim. Oferecemos sedação consciente (inalatória com óxido nitroso ou intravenosa) para pacientes com ansiedade dentária elevada ou para cirurgias longas e complexas. A sedação consciente mantém o paciente relaxado e colaborante, sem perda total de consciência. O procedimento é realizado em bloco operatório, com acompanhamento médico constante. Pode marcar uma consulta de avaliação para discutir a opção mais adequada.",
  },
  {
    question: "Como posso marcar uma consulta de urgência?",
    answer:
      "Em caso de urgência dentária — dor aguda, traumatismo, fratura ou infeção — deverá ligar para o 233 403 600. Graças à nossa equipa alargada, conseguimos normalmente dar resposta no próprio dia ou no dia seguinte. Não deixe a dor sem tratamento: quanto mais cedo for tratada, mais simples e económica é a solução.",
  },
  {
    question: "Quanto tempo dura o tratamento de implantes?",
    answer:
      "O tempo varia consoante o caso clínico. Em situações simples, com osso suficiente, pode optar-se por carga imediata — o implante e a coroa provisória colocam-se na mesma sessão. Nos casos padrão, o implante é colocado e aguardam-se 3 a 6 meses de osseointegração antes da coroa definitiva. Em casos que exijam enxerto ósseo, o processo pode levar 6 a 12 meses. O Dr. Pedro e a Dra. Ana Luísa apresentarão o plano detalhado na consulta inicial.",
  },
  {
    question: "A clínica tem estacionamento e como chego?",
    answer:
      "Estamos localizados na Rua Miguel Bombarda 66, em plena zona central da Figueira da Foz. Existem lugares de estacionamento nas imediações, incluindo a Avenida de Sá Carneiro e a Avenida 25 de Abril. A clínica é acessível a pessoas com mobilidade reduzida. De transporte público, a linha de autocarro central passa a poucos metros da entrada.",
  },
  {
    question: "Que opções de pagamento existem?",
    answer:
      "Aceitamos numerário, multibanco, transferência bancária e pagamento direto por subsistema/seguro para os tratamentos cobertos. Para tratamentos de maior valor não cobertos por seguro, disponibilizamos planos de financiamento em prestações mensais sem juros. Fornecemos sempre orçamento detalhado antes de iniciar qualquer tratamento.",
  },
  {
    question: "A clínica trata crianças?",
    answer:
      "Sim, a nossa Dra. Inês Marques é especialista em odontopediatria e trata crianças desde os primeiros dentes de leite. Dispomos de um ambiente adaptado ao público infantil — materiais e espaço concebidos para reduzir a ansiedade. Recomendamos a primeira consulta por volta dos 2-3 anos de idade, para avaliação e educação para a saúde oral.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="text-[#B8860B] text-xs tracking-[0.3em] uppercase font-semibold mb-3">
            Perguntas Frequentes
          </p>
          <h2
            className="text-[#1E3A5F] font-bold text-4xl lg:text-5xl leading-tight"
            style={{ fontFamily: "Epilogue, sans-serif" }}
          >
            Tem Dúvidas?
          </h2>
          <p className="text-[#94A3B8] text-base mt-4 max-w-lg mx-auto">
            Respondemos às questões mais comuns. Se não encontrar a resposta, ligue-nos — estamos sempre disponíveis para ajudar.
          </p>
        </motion.div>

        {/* FAQ list */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`border transition-all duration-300 ${
                openIndex === i
                  ? "border-[#1E3A5F]/30 bg-white shadow-md shadow-[#1E3A5F]/5"
                  : "border-[#E2E8F0] bg-white hover:border-[#1E3A5F]/20"
              }`}
            >
              <button
                className="w-full flex items-center justify-between gap-4 p-6 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span
                  className="text-[#1E3A5F] font-semibold text-base leading-snug"
                  style={{ fontFamily: "Epilogue, sans-serif" }}
                >
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center border transition-all duration-300 ${
                  openIndex === i
                    ? "bg-[#B8860B] border-[#B8860B] text-white"
                    : "border-[#E2E8F0] text-[#94A3B8] hover:border-[#1E3A5F]/30 hover:text-[#1E3A5F]"
                }`}>
                  {openIndex === i ? <Minus size={14} /> : <Plus size={14} />}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <div className="h-px bg-[#E2E8F0] mb-4" />
                      <p className="text-[#94A3B8] text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-[#94A3B8] text-sm mb-4">
            Não encontrou resposta à sua dúvida?
          </p>
          <a
            href="tel:+351233403600"
            className="inline-flex items-center gap-2 bg-[#1E3A5F] hover:bg-[#162d4a] text-white px-8 py-4 font-bold text-sm tracking-widest uppercase transition-all duration-300"
          >
            Fale Connosco
          </a>
        </motion.div>
      </div>
    </section>
  );
}
