"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Phone, MapPin, ChevronDown, Leaf } from "lucide-react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#FEFCE8]"
      aria-label="Secção principal"
    >
      {/* Background organic shapes */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[60%] h-[70%] bg-[#D1FAE5]/60 rounded-bl-[120px] md:rounded-bl-[200px]" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-[#D1FAE5]/30 rounded-tr-[100px]" />
        <motion.div
          className="absolute top-32 right-16 w-24 h-24 bg-[#6B8F71]/15 rounded-full"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 right-32 w-16 h-16 bg-[#064E3B]/10 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-[15%] w-10 h-10 bg-[#6B8F71]/20 rounded-full"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-[#064E3B] rounded-full flex items-center justify-center">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-[#064E3B] text-sm md:text-base tracking-tight">
            Premium<span className="text-[#6B8F71] font-light"> Clínica</span>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden md:flex items-center gap-8"
        >
          {["Filosofia", "Serviços", "Prevenção", "Equipa", "Contacto"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace("ç", "c").replace("ã", "a")}`}
              className="text-sm text-[#064E3B]/70 hover:text-[#064E3B] transition-colors font-medium"
            >
              {item}
            </a>
          ))}
        </motion.div>

        <motion.a
          href="tel:+351233000000"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-2 bg-[#064E3B] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#065f46] transition-colors"
          aria-label="Ligar para a clínica"
        >
          <Phone className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Marcar Consulta</span>
        </motion.a>
      </nav>

      {/* Main content */}
      <motion.div style={{ opacity }} className="relative z-10 container mx-auto px-6 md:px-12 pt-24 pb-16">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-flex items-center gap-2 bg-[#D1FAE5] border border-[#6B8F71]/30 rounded-full px-4 py-1.5 mb-8"
          >
            <div className="w-1.5 h-1.5 bg-[#064E3B] rounded-full" />
            <span className="text-xs font-semibold text-[#064E3B] uppercase tracking-wider">
              Figueira da Foz · Clínica de Prevenção
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#064E3B] leading-tight mb-6"
            style={{ fontFamily: "var(--font-sora), sans-serif" }}
          >
            Prevenir é o{" "}
            <span className="relative inline-block">
              Melhor
              <motion.span
                className="absolute bottom-1 left-0 right-0 h-3 bg-[#D1FAE5] -z-10 rounded"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                style={{ originX: 0 }}
              />
            </span>{" "}
            Tratamento
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="text-lg md:text-xl text-[#064E3B]/65 max-w-xl mb-10 leading-relaxed"
          >
            Na Premium, acreditamos que a saúde oral começa muito antes de surgir qualquer problema.
            Cuidamos do seu sorriso de forma holística — com prevenção, atenção e carinho.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <a
              href="#prevencao"
              className="inline-flex items-center justify-center gap-2 bg-[#064E3B] text-white px-8 py-4 rounded-2xl text-base font-semibold hover:bg-[#065f46] transition-all hover:shadow-xl hover:shadow-[#064E3B]/20 hover:-translate-y-0.5"
            >
              <Leaf className="w-4 h-4" />
              Ver Programa de Prevenção
            </a>
            <a
              href="#servicos"
              className="inline-flex items-center justify-center gap-2 bg-white border border-[#6B8F71]/40 text-[#064E3B] px-8 py-4 rounded-2xl text-base font-semibold hover:bg-[#D1FAE5]/50 transition-all"
            >
              Todos os Serviços
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="flex flex-wrap items-center gap-6 text-sm text-[#064E3B]/60"
          >
            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-[#D1FAE5] border-2 border-white flex items-center justify-center text-[8px]">
                    {["😊", "🦷", "💚", "🌿", "✨"][i]}
                  </div>
                ))}
              </div>
              <span className="font-medium text-[#064E3B]">+1.200 pacientes</span> satisfeitos
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#6B8F71]" />
              <span>Figueira da Foz</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-[#6B8F71] rounded-full animate-pulse" />
              <span>Consultas disponíveis</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#064E3B]/40"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xs font-medium tracking-widest uppercase">Explorar</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
}
