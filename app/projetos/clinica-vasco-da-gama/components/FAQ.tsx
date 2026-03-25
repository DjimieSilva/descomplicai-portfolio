"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

const faqs = [
  {
    q: "Quanto custa um implante dentário na Clínica Vasco da Gama?",
    a: "O custo de um implante dentário varia consoante o caso clínico específico. Em geral, inclui o implante de titânio, a coroa protética (produzida no nosso laboratório próprio) e as consultas de acompanhamento. Oferecemos uma consulta de avaliação gratuita onde lhe fornecemos um orçamento detalhado e transparente. Disponibilizamos também opções de pagamento faseado sem juros em parcerias com entidades financeiras.",
  },
  {
    q: "A clínica trabalha com a ADSE e outros subsistemas de saúde?",
    a: "Sim, somos convencionados com a ADSE, CGD Saúde, Médis, Multicare e outros subsistemas de saúde. Aceitamos também seguros dentários de diversas seguradoras. Recomendamos que contacte a sua seguradora previamente para confirmar as coberturas disponíveis, mas a nossa equipa administrativa está sempre disponível para ajudar a esclarecer dúvidas sobre comparticipações.",
  },
  {
    q: "O tratamento de canal (endodontia) é doloroso?",
    a: "Não, com as técnicas actuais e uma anestesia local eficaz, o tratamento endodôntico é praticamente indolor. Muitos dos nossos pacientes ficam surpreendidos com o conforto do procedimento. A Dra. Inês Carvalho, especializada em endodontia, utiliza sistemas rotativos de nova geração que tornam o tratamento mais rápido e preciso. Para pacientes com ansiedade dentária, dispomos de sedação consciente.",
  },
  {
    q: "Qual é a diferença entre branqueamento em consultório e domiciliário?",
    a: "O branqueamento em consultório é realizado na clínica numa sessão de cerca de 90 minutos, com gel de alta concentração activado por luz LED, obtendo resultados imediatos de 6 a 8 tons mais claro. O branqueamento domiciliário utiliza goteiras personalizadas e gel de concentração mais baixa, aplicado durante 2 a 4 horas por dia ao longo de 2 a 3 semanas. Muitas vezes combinamos ambos para resultados óptimos e mais duradouros.",
  },
  {
    q: "Como funciona o processo para obter uma prótese no laboratório próprio?",
    a: "O nosso laboratório integrado simplifica todo o processo. Após a impressão digital (scanner intraoral) ou física dos seus dentes, o registo é enviado directamente ao nosso técnico de prótese, que trabalha no mesmo espaço. O técnico colabora estreitamente com o médico dentista para garantir ajuste perfeito e estética natural. Normalmente as coroas e pontes ficam prontas em 5 a 7 dias úteis — contra os 10 a 15 dias habituais com laboratórios externos. Qualquer ajuste é efectuado na hora.",
  },
  {
    q: "Os tratamentos de botox e preenchimentos são seguros e podem ser feitos num dentista?",
    a: "Absolutamente. Os médicos dentistas são os profissionais de saúde com mais vasta formação em anatomia facial, especialmente na região oro-facial. Na verdade, são uns dos melhores especialistas para realizar este tipo de tratamentos. Na Clínica Vasco da Gama, os médicos responsáveis pela medicina estética têm formação específica e certificada em injecções de toxina botulínica (botox) e ácido hialurónico, utilizando apenas produtos certificados pela Infarmed.",
  },
];

export function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" ref={ref} className="bg-[#F5F0E8] py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Left: heading */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            className="lg:col-span-2"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 text-[#C8A55A] text-xs tracking-[0.3em] uppercase font-semibold mb-4"
            >
              <span className="w-8 h-[1px] bg-[#C8A55A]" />
              Perguntas Frequentes
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="font-serif text-4xl lg:text-5xl text-[#0A1628] leading-tight mb-6"
            >
              Tem{" "}
              <span className="text-[#C8A55A] italic">dúvidas?</span>{" "}
              Temos respostas.
            </motion.h2>

            <motion.div variants={fadeUp} className="w-12 h-[2px] bg-[#C8A55A] mb-8" />

            <motion.p variants={fadeUp} className="text-[#0A1628]/60 leading-relaxed mb-8">
              Reunimos as questões mais frequentes dos nossos pacientes. Se não encontrar o que
              procura, entre em contacto connosco — teremos todo o gosto em ajudar.
            </motion.p>

            <motion.a
              variants={fadeUp}
              href="tel:+351233433720"
              className="inline-flex items-center gap-3 bg-[#0A1628] hover:bg-[#0d1f3a] text-white px-6 py-3 text-sm font-semibold tracking-widest uppercase transition-all duration-300 group"
            >
              <span>233 433 720</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </motion.a>
          </motion.div>

          {/* Right: FAQ accordion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="lg:col-span-3 space-y-3"
          >
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-[#0A1628]/12 bg-white overflow-hidden"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left group"
                >
                  <span
                    className={`font-serif text-base font-semibold leading-snug transition-colors ${
                      open === i ? "text-[#C8A55A]" : "text-[#0A1628] group-hover:text-[#C8A55A]"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <div
                    className={`shrink-0 w-8 h-8 rounded-sm flex items-center justify-center transition-all duration-300 ${
                      open === i ? "bg-[#C8A55A] text-[#0A1628]" : "bg-[#0A1628]/8 text-[#0A1628]"
                    }`}
                  >
                    {open === i ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.45, 0, 0.55, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0">
                        <div className="w-full h-[1px] bg-[#0A1628]/8 mb-4" />
                        <p className="text-[#0A1628]/65 leading-relaxed text-sm">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
