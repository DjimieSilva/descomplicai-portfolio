"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef } from "react";
import { CheckCircle, Phone, Clock, Award, ShieldCheck, Users } from "lucide-react";

const reassurances = [
  {
    icon: ShieldCheck,
    color: "#7C3AED",
    title: "Técnicas sem dor",
    desc: "Utilizamos os mais modernos protocolos de anestesia e sedação para garantir que o teu filho não sente dor.",
  },
  {
    icon: Clock,
    color: "#38BDF8",
    title: "Consultas sem espera",
    desc: "Respeitamos o tempo das famílias. As consultas começam à hora marcada — sempre.",
  },
  {
    icon: Award,
    color: "#FBBF24",
    title: "Equipa especializada",
    desc: "A nossa equipa tem formação específica em odontopediatria e psicologia infantil.",
  },
  {
    icon: Users,
    color: "#34D399",
    title: "Pais sempre presentes",
    desc: "Podes entrar na consulta com o teu filho sempre que quiseres. Sem segredos.",
  },
  {
    icon: Phone,
    color: "#F472B6",
    title: "Apoio 24/7 por WhatsApp",
    desc: "Dúvidas depois da consulta? Envia mensagem e a nossa equipa responde rapidamente.",
  },
  {
    icon: CheckCircle,
    color: "#7C3AED",
    title: "Plano de saúde oral",
    desc: "Criamos um plano personalizado para cada criança — desde a primeira dentição à ortodontia.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 250, damping: 22 },
  },
};

export default function ForParents() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="py-24 bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 relative overflow-hidden"
      id="para-pais"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 text-white/5 text-[200px] font-black select-none">
          🦷
        </div>
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-purple-700/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-blue-600/20 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-yellow-400 text-purple-900 px-4 py-2 rounded-full text-sm font-black mb-4">
            👨‍👩‍👧 Para os Pais
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black text-white mb-6"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            A sua tranquilidade é{" "}
            <span className="text-yellow-300">a nossa prioridade</span>
          </h2>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto leading-relaxed">
            Sabemos que deixar o vosso filho numa cadeira de dentista pode causar
            ansiedade. Aqui está o que fazemos para que todos — pais e filhos —
            saiam a sorrir.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reassurances.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                transition: { type: "spring", stiffness: 400, damping: 17 },
              }}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-colors duration-300"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                style={{ backgroundColor: item.color }}
              >
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3
                className="text-lg font-black text-white mb-2"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                {item.title}
              </h3>
              <p className="text-purple-200 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <div className="text-5xl">🤝</div>
            <div className="text-left">
              <p className="text-white font-black text-xl mb-1" style={{ fontFamily: "'Nunito', sans-serif" }}>
                Consulta de diagnóstico gratuita
              </p>
              <p className="text-purple-200 text-sm">
                Para novos pacientes — avaliação oral completa sem compromisso
              </p>
            </div>
            <a
              href="tel:+351233000000"
              className="shrink-0 bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-black px-8 py-4 rounded-full text-base shadow-xl hover:shadow-yellow-400/30 transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              Ligar agora
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
