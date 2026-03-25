"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, MapPin, Clock, Star } from "lucide-react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient mesh */}
      <div className="absolute inset-0 bg-[#111827]">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #2563EB 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -50, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-[15%] right-[8%] w-24 h-24 border border-[#2563EB]/30 rounded-2xl rotate-12"
        animate={{ rotate: [12, 25, 12], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[20%] left-[5%] w-16 h-16 border border-[#06B6D4]/30 rounded-full"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute top-[40%] left-[3%] w-2 h-32 bg-gradient-to-b from-[#2563EB] to-transparent rounded-full opacity-40"
        animate={{ scaleY: [1, 1.5, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
        style={{ y, opacity }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-[#2563EB]/40 bg-[#2563EB]/10 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse" />
          <span className="text-sm font-medium text-[#06B6D4] font-[family-name:var(--font-inter-uc)]">
            Figueira da Foz · Clínica Médica e Dentária
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-[family-name:var(--font-space-grotesk)] leading-[0.95] tracking-tight mb-6"
        >
          <span className="text-white">O seu sorriso</span>
          <br />
          <span className="bg-gradient-to-r from-[#2563EB] via-[#06B6D4] to-[#2563EB] bg-clip-text text-transparent bg-size-200 animate-gradient">
            sem compromissos
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-[family-name:var(--font-inter-uc)] leading-relaxed"
        >
          Medicina dentária de excelência com tecnologia de ponta.
          <br className="hidden sm:block" />
          Cuidados de saúde oral quando precisa — todos os dias.
        </motion.p>

        {/* 7-day banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="inline-block mb-10"
        >
          <div className="relative px-6 py-4 rounded-2xl border border-[#06B6D4]/50 bg-gradient-to-r from-[#06B6D4]/10 to-[#2563EB]/10 backdrop-blur-sm">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#06B6D4]/5 to-[#2563EB]/5" />
            <div className="relative flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#06B6D4] shrink-0" />
              <p className="text-base sm:text-lg font-bold font-[family-name:var(--font-space-grotesk)] text-white">
                Abertos{" "}
                <span className="text-[#06B6D4]">7 Dias por Semana</span>
                {" "}— Incluindo{" "}
                <span className="text-[#2563EB]">Domingos e Feriados</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
        >
          <a
            href="#contacto"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold font-[family-name:var(--font-space-grotesk)] text-white overflow-hidden transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #2563EB, #06B6D4)" }}
          >
            <span className="relative z-10">Marcar Consulta</span>
            <motion.span
              className="relative z-10"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
          </a>
          <a
            href="#servicos"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold font-[family-name:var(--font-space-grotesk)] text-white border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
          >
            Os Nossos Serviços
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-6 sm:gap-10"
        >
          {[
            { icon: Star, value: "5.0", label: "Avaliação Google" },
            { icon: Clock, value: "7/7", label: "Dias por Semana" },
            { icon: MapPin, value: "Figueira da Foz", label: "Localização" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2563EB]/20 flex items-center justify-center border border-[#2563EB]/30">
                <Icon className="w-5 h-5 text-[#2563EB]" />
              </div>
              <div className="text-left">
                <p className="text-white font-bold font-[family-name:var(--font-space-grotesk)] text-lg leading-none">
                  {value}
                </p>
                <p className="text-gray-500 text-xs font-[family-name:var(--font-inter-uc)] mt-0.5">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        initial={{ opacity: 0 }}
        style={{ opacity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-600 font-[family-name:var(--font-inter-uc)] tracking-widest uppercase">
            Scroll
          </span>
          <ChevronDown className="w-5 h-5 text-gray-600" />
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 4s ease infinite;
          background-size: 200% 200%;
        }
        .bg-size-200 {
          background-size: 200% 200%;
        }
      `}</style>
    </section>
  );
}
