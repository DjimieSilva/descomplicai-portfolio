"use client";

import { motion, type Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

const testimonials = [
  {
    name: "Maria João Pereira",
    location: "Figueira da Foz",
    treatment: "Implantologia",
    text: "Após anos com um dente em falta, finalmente tomei a decisão de fazer o implante. O Dr. Rodrigo explicou tudo com calma, o procedimento foi muito menos assustador do que eu pensava e o resultado é completamente natural. Não consigo distinguir do dente original. Recomendo a toda a gente!",
    stars: 5,
    date: "Março 2025",
    initial: "MJ",
  },
  {
    name: "Carlos Alberto Silva",
    location: "Coimbra",
    treatment: "Ortodontia (Alinhadores)",
    text: "Fiz o tratamento de alinhadores com a Dra. Ana Sofia e fiquei impressionado com a precisão do plano de tratamento. Em 14 meses os meus dentes estão completamente alinhados. Ninguém se apercebeu que eu usava aparelho. A atenção ao detalhe e o acompanhamento foram excepcionais.",
    stars: 5,
    date: "Fevereiro 2025",
    initial: "CA",
  },
  {
    name: "Sofia Ramos",
    location: "Figueira da Foz",
    treatment: "Estética Facial (Botox)",
    text: "Vim para o branqueamento e saí a saber que o Dr. Miguel também faz botox. Fiz os dois tratamentos e a diferença é incrível — parece que rejuvenesci 10 anos! O resultado é completamente natural, sem aquele aspecto 'exagerado' que eu tanto temia. Já trouxe a minha mãe e a minha irmã.",
    stars: 5,
    date: "Janeiro 2025",
    initial: "SR",
  },
  {
    name: "António Figueiredo",
    location: "Montemor-o-Velho",
    treatment: "Reabilitação Oral Completa",
    text: "Fiz uma reabilitação oral completa com próteses sobre implantes. O facto de terem laboratório próprio fez toda a diferença — as próteses ficaram prontas muito mais depressa e os ajustes foram feitos na hora. O sorriso que tenho hoje não tem preço. Valeu cada cêntimo investido.",
    stars: 5,
    date: "Dezembro 2024",
    initial: "AF",
  },
  {
    name: "Beatriz Loureiro",
    location: "Leiria",
    treatment: "Endodontia",
    text: "Tinha um enorme medo de tratamentos de canal. A Dra. Inês foi absolutamente fantástica — explicou cada passo, a anestesia foi perfeita e não senti rigorosamente nada. Saí da clínica sem dores e o dente ficou salvo. Não havia razão para tanto medo todos estes anos!",
    stars: 5,
    date: "Novembro 2024",
    initial: "BL",
  },
];

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const t = testimonials[current];

  return (
    <section id="testemunhos" ref={ref} className="bg-[#0A1628] py-28 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 text-[#C8A55A] text-xs tracking-[0.3em] uppercase font-semibold mb-4"
          >
            <span className="w-8 h-[1px] bg-[#C8A55A]" />
            Testemunhos
            <span className="w-8 h-[1px] bg-[#C8A55A]" />
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-serif text-4xl lg:text-5xl text-white leading-tight"
          >
            O que dizem os{" "}
            <span className="text-[#C8A55A] italic">nossos pacientes</span>
          </motion.h2>
        </motion.div>

        {/* Main testimonial carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="relative"
        >
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Large featured testimonial */}
            <div className="lg:col-span-2">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white/5 border border-white/10 p-10 relative"
              >
                {/* Quote icon */}
                <div className="absolute top-8 right-8">
                  <Quote size={48} className="text-[#C8A55A]/20" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={18} className="text-[#C8A55A] fill-[#C8A55A]" />
                  ))}
                </div>

                {/* Treatment badge */}
                <span className="inline-block bg-[#C8A55A]/15 text-[#C8A55A] text-xs font-semibold tracking-widest uppercase px-3 py-1 mb-6">
                  {t.treatment}
                </span>

                {/* Quote text */}
                <p className="text-white/80 text-xl leading-relaxed italic mb-8 font-serif">
                  "{t.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C8A55A] to-[#a87e3a] flex items-center justify-center">
                    <span className="text-white font-serif font-bold text-sm">{t.initial}</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">{t.name}</div>
                    <div className="text-white/40 text-sm">{t.location} · {t.date}</div>
                  </div>
                </div>
              </motion.div>

              {/* Navigation */}
              <div className="flex items-center gap-4 mt-6">
                <button
                  onClick={prev}
                  className="w-12 h-12 border border-white/20 hover:border-[#C8A55A] flex items-center justify-center text-white hover:text-[#C8A55A] transition-all duration-200"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={next}
                  className="w-12 h-12 border border-white/20 hover:border-[#C8A55A] flex items-center justify-center text-white hover:text-[#C8A55A] transition-all duration-200"
                >
                  <ChevronRight size={20} />
                </button>
                <div className="flex gap-2 ml-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`transition-all duration-300 ${
                        i === current
                          ? "w-8 h-2 bg-[#C8A55A]"
                          : "w-2 h-2 bg-white/20 hover:bg-white/40"
                      } rounded-full`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Side: mini testimonials */}
            <div className="space-y-4 hidden lg:block">
              {testimonials
                .filter((_, i) => i !== current)
                .slice(0, 3)
                .map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setCurrent(testimonials.indexOf(item))}
                    className="w-full text-left p-5 bg-white/3 hover:bg-white/8 border border-white/8 hover:border-[#C8A55A]/30 transition-all duration-200 group"
                  >
                    <div className="flex gap-1 mb-2">
                      {Array.from({ length: item.stars }).map((_, i) => (
                        <Star key={i} size={10} className="text-[#C8A55A] fill-[#C8A55A]" />
                      ))}
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed line-clamp-3 italic group-hover:text-white/80 transition-colors">
                      "{item.text}"
                    </p>
                    <div className="mt-3 text-white/40 text-xs font-semibold">{item.name}</div>
                  </button>
                ))}
            </div>
          </div>
        </motion.div>

        {/* Rating summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-12 pt-12 border-t border-white/10"
        >
          <div className="text-center">
            <div className="font-serif text-5xl text-[#C8A55A] font-bold">4.9</div>
            <div className="flex gap-1 justify-center my-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className="text-[#C8A55A] fill-[#C8A55A]" />
              ))}
            </div>
            <div className="text-white/40 text-xs uppercase tracking-wider">Google Reviews</div>
          </div>
          <div className="w-[1px] h-16 bg-white/10 hidden md:block" />
          <div className="text-center">
            <div className="font-serif text-5xl text-[#C8A55A] font-bold">+320</div>
            <div className="text-white/40 text-xs uppercase tracking-wider mt-2">Avaliações verificadas</div>
          </div>
          <div className="w-[1px] h-16 bg-white/10 hidden md:block" />
          <div className="text-center">
            <div className="font-serif text-5xl text-[#C8A55A] font-bold">98%</div>
            <div className="text-white/40 text-xs uppercase tracking-wider mt-2">Recomendariam a clínica</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
