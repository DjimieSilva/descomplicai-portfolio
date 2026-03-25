"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedNumber({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCurrent(target);
        clearInterval(timer);
      } else {
        setCurrent(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {prefix}{current}{suffix}
    </span>
  );
}

const stats = [
  {
    value: 6,
    suffix: "+",
    label: "Médicos Especialistas",
    description: "Equipa multidisciplinar de dentistas com formação avançada em diferentes especialidades.",
  },
  {
    value: 15,
    suffix: "+",
    label: "Anos de Atividade",
    description: "Uma década e meia ao serviço da saúde oral da comunidade da Figueira da Foz.",
  },
  {
    value: 1,
    suffix: "",
    label: "Bloco Operatório",
    description: "O único centro dentário da região com bloco operatório certificado para cirurgias complexas.",
  },
  {
    value: 10000,
    suffix: "+",
    label: "Pacientes Acompanhados",
    description: "Milhares de famílias confiam na Alba Saúde Dentária para a sua saúde oral.",
  },
  {
    value: 8,
    suffix: "",
    label: "Especialidades",
    description: "Da prevenção à cirurgia oral complexa — todas as valências sob o mesmo tecto.",
  },
  {
    value: 12,
    suffix: "+",
    label: "Acordos de Saúde",
    description: "Parcerias com os principais subsistemas e seguradoras de saúde nacionais.",
  },
];

export function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-[#1E3A5F] py-20 relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#94A3B8 1px, transparent 1px), linear-gradient(90deg, #94A3B8 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B8860B]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B8860B]/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[#B8860B] text-xs tracking-[0.3em] uppercase font-semibold mb-3">
            Escala e Capacidade
          </p>
          <h2 className="text-white font-bold text-3xl lg:text-4xl" style={{ fontFamily: "Epilogue, sans-serif" }}>
            O Maior Centro Dentário da Região
          </h2>
        </motion.div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-[#94A3B8]/10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#1E3A5F] p-6 text-center group hover:bg-[#162d4a] transition-colors duration-300"
            >
              <div
                className="text-[#B8860B] font-bold text-4xl mb-2 tabular-nums"
                style={{ fontFamily: "Epilogue, sans-serif" }}
              >
                {inView ? (
                  <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                ) : (
                  <span>0{stat.suffix}</span>
                )}
              </div>
              <div className="text-white/90 font-semibold text-sm mb-2 leading-tight" style={{ fontFamily: "Epilogue, sans-serif" }}>
                {stat.label}
              </div>
              <div className="text-white/40 text-xs leading-relaxed hidden lg:block">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
