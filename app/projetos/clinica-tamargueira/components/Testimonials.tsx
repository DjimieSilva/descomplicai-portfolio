"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Maria J.",
    age: "54 anos",
    treatment: "All-on-4 — Arcada Completa",
    rating: 5,
    text: "Depois de anos com dentes em mau estado, decidi fazer os implantes. Confesso que tinha muito medo, mas o Dr. Paulo explicou tudo ao pormenor. Entrei numa segunda-feira e na terça-feira já tinha dentes fixos. Um ano depois continuo radiante com o resultado. Nunca pensei que fosse possível!",
    date: "Janeiro 2025",
  },
  {
    name: "António F.",
    age: "38 anos",
    treatment: "Implante Unitário — Incisivo",
    rating: 5,
    text: "Parti um dente da frente num acidente e fiquei destroçado. A equipa da Tamargueira foi excecional. A Dra. Inês fez um trabalho incrível com a coroa cerâmica — ninguém consegue distinguir do dente natural. Recomendo a toda a gente.",
    date: "Outubro 2024",
  },
  {
    name: "Conceição M.",
    age: "61 anos",
    treatment: "3 Implantes + Prótese Parcial Fixa",
    rating: 5,
    text: "Tinha fobia de dentistas desde nova, mas aqui senti-me sempre em segurança. Eram tão pacientes com as minhas perguntas e medos. O resultado final superou todas as expectativas. Finalmente consigo comer o que quero sem dores ou desconforto.",
    date: "Março 2024",
  },
  {
    name: "Ricardo S.",
    age: "45 anos",
    treatment: "Implantes Múltiplos + Branqueamento",
    rating: 5,
    text: "A precisão e profissionalismo desta clínica é de outro nível. Utilizaram guia cirúrgica digital para os meus implantes — fiquei impressionado com o processo. Cada consulta foi marcada pela pontualidade e atenção ao detalhe. Vale bem cada cêntimo investido.",
    date: "Julho 2024",
  },
  {
    name: "Laura B.",
    age: "29 anos",
    treatment: "Implante + Facetas de Porcelana",
    rating: 5,
    text: "Tratei de um implante e aproveitei para fazer facetas nos dentes do lado. A Dra. Inês tem um olho clínico incrível para a estética. O design do meu sorriso ficou perfeito — natural, proporcional e iluminado. Estou muito feliz com a decisão.",
    date: "Novembro 2024",
  },
  {
    name: "Carlos P.",
    age: "67 anos",
    treatment: "All-on-6 — Arcada Inferior",
    rating: 5,
    text: "Tinha uma prótese removível há 10 anos que nunca me deixou confortável. O All-on-6 mudou completamente a minha vida. Comer, falar, rir — tudo ficou normal de novo. A equipa foi fantástica do início ao fim do processo.",
    date: "Agosto 2024",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testemunhos" ref={ref} className="py-24 bg-[#0F2361]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-[#60A5FA] text-sm font-semibold uppercase tracking-widest mb-4"
          >
            Testemunhos
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white font-[family-name:var(--font-sora)] mb-4"
          >
            O Que Dizem
            <br />
            <span className="text-[#60A5FA]">Os Nossos Pacientes</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#BFDBFE] text-lg max-w-xl mx-auto"
          >
            Mais de 1500 pacientes tratados. Estas são as histórias que nos motivam.
          </motion.p>
        </div>

        {/* Rating summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <div className="text-center">
            <p className="text-5xl font-bold text-white font-[family-name:var(--font-sora)]">5.0</p>
            <div className="flex gap-1 justify-center my-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-[#F59E0B]" fill="#F59E0B" />
              ))}
            </div>
            <p className="text-[#93C5FD] text-sm">Classificação média</p>
          </div>
          <div className="w-px h-16 bg-[#1E40AF]" />
          <div className="text-center">
            <p className="text-5xl font-bold text-white font-[family-name:var(--font-sora)]">98%</p>
            <p className="text-[#93C5FD] text-sm mt-1">Recomendariam a clínica</p>
          </div>
          <div className="w-px h-16 bg-[#1E40AF]" />
          <div className="text-center">
            <p className="text-5xl font-bold text-white font-[family-name:var(--font-sora)]">+1500</p>
            <p className="text-[#93C5FD] text-sm mt-1">Pacientes tratados</p>
          </div>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="bg-[#1E40AF]/30 border border-[#1E40AF]/50 rounded-2xl p-6 hover:bg-[#1E40AF]/40 transition-all duration-300"
            >
              <Quote className="w-6 h-6 text-[#60A5FA] mb-4 opacity-60" />
              <p className="text-[#DBEAFE] text-sm leading-relaxed mb-5">
                "{testimonial.text}"
              </p>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-[#F59E0B]" fill="#F59E0B" />
                ))}
              </div>
              <div className="border-t border-[#1E40AF]/50 pt-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-[#93C5FD] text-xs">{testimonial.age}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#60A5FA] text-xs font-medium">{testimonial.treatment}</p>
                  <p className="text-[#4B6FA8] text-xs">{testimonial.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
