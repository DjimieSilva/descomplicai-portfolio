"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Clock, Sunset, Wind } from "lucide-react";

const moments = [
  {
    time: "12h — 16h",
    title: "Almoço com Brisa",
    desc: "O momento mais tranquilo do dia. Almoço tardio, luz alta, o oceano a poucos metros.",
    icon: Wind,
    color: "#0E7490",
  },
  {
    time: "17h — 20h",
    title: "A Hora Dourada",
    desc: "O espetáculo natural mais extraordinário: o sol desce sobre o Atlântico enquanto janta.",
    icon: Sunset,
    color: "#F97316",
  },
  {
    time: "20h — 23h",
    title: "Noite de Mar",
    desc: "As estrelas sobre Figueira, o som das ondas, cocktails e conversas que não têm pressa.",
    icon: Clock,
    color: "#DDB892",
  },
];

export default function SunsetExperience() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"],
  });
  const sunY = useTransform(scrollYProgress, [0, 1], ["-5%", "15%"]);
  const skyOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.7, 0.3]);

  return (
    <section
      ref={ref}
      id="experiencia"
      className="py-24 md:py-36 relative overflow-hidden"
      style={{ backgroundColor: "#0d0b08" }}
    >
      {/* Parallax sunset sky */}
      <div ref={scrollRef} className="absolute inset-0 pointer-events-none">
        <motion.div style={{ y: sunY, opacity: skyOpacity }} className="absolute inset-0">
          {/* Sunset gradient layers */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#F97316]/12 via-[#DDB892]/6 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0E7490]/8 to-transparent" />
          {/* Sun orb */}
          <div
            className="absolute top-8 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full opacity-8"
            style={{
              background: "radial-gradient(circle, #F97316 0%, #DDB892 40%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p
            className="text-[#F97316]/60 text-xs tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Experiência
          </p>
          <h2
            className="text-[#FAF8F4] text-4xl md:text-6xl font-light mb-6"
            style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 200 }}
          >
            O Pôr do Sol{" "}
            <span className="text-[#F97316] italic" style={{ fontWeight: 300 }}>
              mais belo
            </span>{" "}
            do país
          </h2>
          <p className="text-[#9A8C72] text-base max-w-xl mx-auto leading-relaxed">
            Sentar à mesa no Pé na Areia é assistir a um espetáculo irrepetível.
            Cada pôr do sol é diferente — e o melhor lugar para o ver é ao nosso lado.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#0E7490]/40 via-[#F97316]/50 to-[#DDB892]/40 origin-top hidden md:block"
            style={{ transform: "translateX(-50%)" }}
          />

          <div className="space-y-10 md:space-y-0">
            {moments.map((moment, i) => {
              const Icon = moment.icon;
              const isRight = i % 2 === 0;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isRight ? -40 : 40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.2 }}
                  className={`md:grid md:grid-cols-2 md:gap-12 items-center ${
                    !isRight ? "md:[&>*:first-child]:order-last" : ""
                  } md:mb-16`}
                >
                  {/* Content */}
                  <div
                    className={`p-7 border rounded-2xl bg-[#1a1410]/70 ${
                      isRight ? "md:text-right" : "md:text-left"
                    }`}
                    style={{ borderColor: `${moment.color}20` }}
                  >
                    <div
                      className={`text-[10px] tracking-[0.35em] uppercase mb-3 flex items-center gap-2 ${
                        isRight ? "md:justify-end" : "md:justify-start"
                      }`}
                      style={{ color: moment.color, fontFamily: "'Manrope', sans-serif" }}
                    >
                      <Clock className="w-3 h-3" />
                      {moment.time}
                    </div>
                    <h3
                      className="text-[#FAF8F4] text-xl font-medium mb-3"
                      style={{ fontFamily: "'Manrope', sans-serif" }}
                    >
                      {moment.title}
                    </h3>
                    <p className="text-[#9A8C72] text-sm leading-relaxed">{moment.desc}</p>
                  </div>

                  {/* Icon circle (center node) */}
                  <div className={`hidden md:flex ${isRight ? "justify-start" : "justify-end"} relative`}>
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center border relative z-10"
                      style={{
                        backgroundColor: `${moment.color}15`,
                        borderColor: `${moment.color}40`,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: moment.color }} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-20 text-center"
        >
          <p
            className="text-[#DDB892]/60 text-sm tracking-widest uppercase mb-3"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Reserve a sua mesa com vista
          </p>
          <p className="text-[#9A8C72] text-sm max-w-sm mx-auto">
            Mesas ao pôr do sol têm disponibilidade limitada.
            Recomendamos reserva com antecedência.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
