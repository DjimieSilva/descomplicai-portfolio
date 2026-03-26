"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Ana Sofia Ferreira",
    role: "Mãe da Beatriz, 5 anos",
    avatar: "👩",
    stars: 5,
    text: "A minha filha tinha um medo enorme do dentista. Depois da primeira visita ao Dentalkid, passou a pedir para ir ao dentista! A Dra. Rita é incrível com as crianças. Recomendo a todas as famílias!",
    location: "Buarcos",
    highlight: "passou a pedir para ir ao dentista",
  },
  {
    name: "Carlos Mendes",
    role: "Pai do Miguel, 9 anos",
    avatar: "👨",
    stars: 5,
    text: "O meu filho precisou de aparelho e eu estava preocupado com a reação dele. O dentista explicou tudo com calma, deixou o Miguel escolher a cor do aparelho e agora ele anda orgulhoso! Serviço excecional.",
    location: "Tavarede",
    highlight: "anda orgulhoso",
  },
  {
    name: "Margarida Lopes",
    role: "Mãe da Inês, 3 anos",
    avatar: "👩‍🦱",
    stars: 5,
    text: "Levei a minha filha de 3 anos pela primeira vez. Estava com muito receio mas a equipa foi absolutamente fantástica. Transformaram o exame numa brincadeira. Saímos as duas a sorrir!",
    location: "Buarcos",
    highlight: "Saímos as duas a sorrir",
  },
  {
    name: "Pedro Costa",
    role: "Pai do Tomás, 14 anos",
    avatar: "👨‍🦳",
    stars: 5,
    text: "O Tomás fez o tratamento de ortodontia completo aqui. A equipa acompanhou-nos durante dois anos com muita dedicação e profissionalismo. O resultado ficou perfeito. Ficámos muito satisfeitos!",
    location: "Tavarede",
    highlight: "O resultado ficou perfeito",
  },
  {
    name: "Joana Rodrigues",
    role: "Mãe do Rodrigo, 7 anos",
    avatar: "👩‍🦰",
    stars: 5,
    text: "Finalmente uma clínica que percebe de crianças! A sala de espera é fantástica com tablets e jogos, as consultas são sempre à hora marcada e o Rodrigo sai sempre feliz. Dentalkid é o melhor!",
    location: "Buarcos",
    highlight: "Dentalkid é o melhor",
  },
  {
    name: "Filipa Santos",
    role: "Mãe da Leonor, 11 anos",
    avatar: "👩‍🦱",
    stars: 5,
    text: "A Leonor tinha uma cárie grande e eu estava a adiar porque sabia que ia ser difícil. No Dentalkid foi tudo tão natural e tranquilo que nem ela nem eu nos apercebemos quando acabou. Fantástico!",
    location: "Tavarede",
    highlight: "nem ela nem eu nos apercebemos quando acabou",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const visibleCount = 3;
  const visible = testimonials.slice(current, current + visibleCount);
  const wrapped =
    visible.length < visibleCount
      ? [...visible, ...testimonials.slice(0, visibleCount - visible.length)]
      : visible;

  return (
    <section className="py-24 bg-white" id="testemunhos">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-lime-100 text-lime-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            ⭐ O que dizem as famílias
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black text-sky-900 mb-6"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Pais que{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-green-500">
              confiam em nós
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Mais de 500 famílias em Figueira da Foz já viveram a experiência Dentalkid.
            Vê o que dizem sobre nós.
          </p>
        </motion.div>

        {/* Desktop: 3 cards */}
        <div className="hidden md:block">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {wrapped.map((t, idx) => (
              <motion.div
                key={`${t.name}-${current}-${idx}`}
                initial={{ opacity: 0, y: 30, scale: 0.93 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25, delay: idx * 0.08 }}
                className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-lime-400 fill-lime-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-1">
                  "
                  {t.text.split(t.highlight).map((part, i) => (
                    <span key={i}>
                      {part}
                      {i === 0 && (
                        <strong className="text-sky-700">{t.highlight}</strong>
                      )}
                    </span>
                  ))}
                  "
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-xl">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                  <span className="ml-auto text-xs bg-sky-50 text-sky-600 px-2 py-1 rounded-full font-medium">
                    📍 {t.location}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-700 flex items-center justify-center transition-colors duration-200 hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="w-2 h-2 rounded-full transition-all duration-200"
                  style={{
                    backgroundColor: i === current ? "#0EA5E9" : "#BAE6FD",
                    width: i === current ? 20 : 8,
                  }}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-700 flex items-center justify-center transition-colors duration-200 hover:scale-110 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile: single card */}
        <div className="md:hidden">
          <motion.div
            key={`mobile-${current}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white rounded-3xl p-6 shadow-md border border-gray-100"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(testimonials[current].stars)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-lime-400 fill-lime-400" />
              ))}
            </div>
            <p className="text-gray-700 text-base leading-relaxed mb-4">
              "{testimonials[current].text}"
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-xl">
                {testimonials[current].avatar}
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">{testimonials[current].name}</p>
                <p className="text-gray-500 text-xs">{testimonials[current].role}</p>
              </div>
            </div>
          </motion.div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-700 flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-500">
              {current + 1} / {testimonials.length}
            </span>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-700 flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
