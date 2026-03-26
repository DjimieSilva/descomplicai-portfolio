"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    category: "Primeira visita",
    emoji: "🌟",
    items: [
      {
        q: "Quando devo levar o meu filho ao dentista pela primeira vez?",
        a: "A primeira consulta deve ser feita quando o primeiro dentinho de leite aparecer — normalmente por volta dos 6 meses. Caso isso não aconteça até ao primeiro aniversário, leve-o mesmo assim. Quanto mais cedo começarmos, mais fácil é criar hábitos saudáveis e evitar problemas futuros.",
      },
      {
        q: "O meu filho vai ter medo? O que posso fazer para ajudar?",
        a: "É completamente normal que as crianças (e os pais!) sintam algum nervosismo. A nossa abordagem 'diz-não-ao-medo' começa antes da consulta: fala com o teu filho sobre a visita de forma positiva, evita palavras como 'dor' ou 'injeção'. Na clínica, o dentista apresenta todos os instrumentos como 'amigos especiais' antes de qualquer exame.",
      },
      {
        q: "Posso entrar na consulta com o meu filho?",
        a: "Absolutamente! Na primeira consulta e sempre que o teu filho precisar, podes estar presente. Na Dentalkid, não há segredos. Acreditamos que a presença dos pais é muitas vezes reconfortante para as crianças — e para os pais também!",
      },
    ],
  },
  {
    category: "Tratamentos",
    emoji: "🦷",
    items: [
      {
        q: "Os dentes de leite também precisam de tratamento? Vão cair na mesma...",
        a: "Sim! Os dentes de leite são fundamentais por vários motivos: servem de guia para os dentes definitivos, são essenciais para a fala e alimentação, e uma cárie nos dentes de leite pode afetar o dente definitivo que está a formar-se por baixo. Uma cárie não tratada também causa dor e pode causar infeção.",
      },
      {
        q: "A partir de que idade se pode colocar aparelho?",
        a: "A avaliação ortodôntica deve começar por volta dos 6–7 anos, quando os primeiros dentes definitivos aparecem. O tratamento em si, dependendo do caso, pode começar nessa altura (aparelhos removíveis ou ortopédicos) ou aguardar pelos 11–13 anos para aparelhos fixos. Cada caso é diferente e avaliamos individualmente.",
      },
      {
        q: "O meu filho tem muito medo de agulhas. Conseguem tratar sem anestesia?",
        a: "Compreendemos este medo! Antes de qualquer anestesia, aplicamos um gel tópico com sabor (morango ou tutti-frutti) que adormece a gengiva. A injeção fica praticamente imperceptível. Além disso, para casos de ansiedade elevada, oferecemos sedação com óxido nitroso (gás do riso) — completamente seguro e muito eficaz.",
      },
      {
        q: "O branqueamento dentário é seguro para adolescentes?",
        a: "Branqueamentos realizados sem supervisão médica podem ser prejudiciais para dentes jovens. Na Dentalkid, avaliamos cada caso individualmente e recomendamos branqueamento supervisionado apenas a partir dos 16 anos, quando os dentes estão mais maduros. A segurança vem sempre em primeiro lugar.",
      },
    ],
  },
  {
    category: "Logística e pagamentos",
    emoji: "💡",
    items: [
      {
        q: "Aceitam o subsistema de saúde/seguro?",
        a: "Trabalhamos com os principais subsistemas de saúde e seguros dentários. Contacte-nos para confirmar se o seu plano de saúde específico é aceite nas nossas clínicas. Temos também planos de pagamento flexíveis para tratamentos mais extensos.",
      },
      {
        q: "Com quanto tempo de antecedência devo marcar consulta?",
        a: "Para consultas de rotina, recomendamos marcar com 1–2 semanas de antecedência. Para urgências, tentamos sempre receber o seu filho no próprio dia ou no dia seguinte. Não deixe o seu filho com dor — ligue-nos e encontramos uma solução.",
      },
      {
        q: "E se a consulta for tarde demais e o meu filho adormecer?",
        a: "Acontece! Temos sempre bolachas e sumo de fruta na receção para uma pequena merenda antes da consulta. E as nossas consultas são desenhadas para ser eficientes — em 45–60 minutos concluímos a primeira visita completa.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden hover:border-purple-200 transition-colors duration-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 p-5 text-left hover:bg-purple-50 transition-colors duration-200"
      >
        <span className="font-bold text-gray-900 text-sm leading-relaxed">{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="shrink-0 mt-0.5"
        >
          <ChevronDown className="w-5 h-5 text-purple-500" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 bg-gradient-to-b from-purple-50 to-white" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            ❓ Perguntas Frequentes
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black text-purple-900 mb-6"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            As dúvidas{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
              que toda a gente tem
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Reunimos as perguntas que os pais nos fazem com mais frequência.
            Não encontras a tua resposta? Liga-nos!
          </p>
        </motion.div>

        <div className="space-y-10">
          {faqs.map((cat, catIdx) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 25,
                delay: catIdx * 0.15,
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{cat.emoji}</span>
                <h3
                  className="text-xl font-black text-purple-900"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  {cat.category}
                </h3>
              </div>
              <div className="space-y-3">
                {cat.items.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Still have questions? */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 25 }}
          className="mt-16 text-center bg-purple-700 rounded-3xl p-8 text-white"
        >
          <p className="text-2xl font-black mb-2" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Ainda tens dúvidas? 🤔
          </p>
          <p className="text-purple-200 mb-6">
            A nossa equipa responde a todas as perguntas — por telefone, WhatsApp ou
            e-mail.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+351233000001"
              className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-black px-8 py-4 rounded-full text-base shadow-xl hover:shadow-yellow-400/30 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              📞 Ligar agora
            </a>
            <a
              href="https://wa.me/351233429538"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-black px-8 py-4 rounded-full text-base shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
            >
              💬 WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
