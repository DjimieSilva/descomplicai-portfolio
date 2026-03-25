"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Phone, MapPin, ChevronDown, Shield, Award, Clock } from "lucide-react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col overflow-hidden bg-[#0F2361]">
      {/* Background geometric pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E40AF] via-[#0F2361] to-[#0A1A4A]" />
        <motion.div
          style={{ y }}
          className="absolute inset-0 opacity-10"
        >
          {/* Grid pattern */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(219,234,254,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(219,234,254,0.3) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </motion.div>
        {/* Decorative circles */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#1E40AF] opacity-20 blur-3xl" />
        <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full bg-[#3B82F6] opacity-10 blur-3xl" />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 flex items-center justify-between px-6 py-5 md:px-12"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="text-[#1E40AF] font-bold text-sm font-[family-name:var(--font-sora)]">CT</span>
          </div>
          <div>
            <p className="text-white font-semibold text-sm font-[family-name:var(--font-sora)] leading-tight">Clínica Dentária</p>
            <p className="text-[#DBEAFE] text-xs font-[family-name:var(--font-sora)]">Tamargueira</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["Implantologia", "Serviços", "Equipa", "Contacto"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[#DBEAFE] hover:text-white text-sm font-medium transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </div>
        <a
          href="tel:+351239000000"
          className="flex items-center gap-2 bg-white text-[#1E40AF] px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#DBEAFE] transition-colors duration-200"
        >
          <Phone className="w-4 h-4" />
          <span className="hidden sm:inline">Marcar Consulta</span>
        </a>
      </motion.nav>

      {/* Hero content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-16 md:py-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-[#1E40AF]/60 border border-[#3B82F6]/40 rounded-full px-4 py-2 mb-8"
        >
          <Shield className="w-4 h-4 text-[#93C5FD]" />
          <span className="text-[#DBEAFE] text-sm font-medium">Especialistas em Implantologia desde 2008</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-[family-name:var(--font-sora)] leading-tight max-w-4xl mb-6"
        >
          Recupere o Sorriso
          <br />
          <span className="text-[#60A5FA]">com Confiança</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-[#BFDBFE] text-lg md:text-xl max-w-2xl mb-4 leading-relaxed"
        >
          Especialistas em Implantologia e Reabilitação Oral em Figueira da Foz.
          <br className="hidden md:block" />
          Tecnologia de ponta, resultados permanentes.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex items-center gap-2 text-[#93C5FD] text-sm mb-10"
        >
          <MapPin className="w-4 h-4" />
          Figueira da Foz, Portugal
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <a
            href="#contacto"
            className="bg-white text-[#1E40AF] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#DBEAFE] transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 font-[family-name:var(--font-sora)]"
          >
            Marcar Consulta Gratuita
          </a>
          <a
            href="#implantologia"
            className="border-2 border-[#3B82F6] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#1E40AF]/40 transition-all duration-200 font-[family-name:var(--font-sora)]"
          >
            Ver Processo de Implante
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="grid grid-cols-3 gap-6 md:gap-12 max-w-2xl"
        >
          {[
            { icon: Award, value: "+1500", label: "Implantes Colocados" },
            { icon: Clock, value: "15+", label: "Anos de Experiência" },
            { icon: Shield, value: "98%", label: "Taxa de Sucesso" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <Icon className="w-5 h-5 text-[#60A5FA] mb-1" />
              <span className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-sora)]">{value}</span>
              <span className="text-[#93C5FD] text-xs md:text-sm text-center leading-tight">{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative z-10 flex justify-center pb-8"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-[#60A5FA]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
