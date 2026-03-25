"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Phone, Calendar, ChevronDown, MapPin, Shield, Award, Users } from "lucide-react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Sticky Header */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(30,58,95,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(184,134,11,0.2)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex flex-col">
            <span className="text-white font-bold text-xl tracking-wide leading-tight" style={{ fontFamily: "Epilogue, sans-serif" }}>
              Alba Saúde Dentária
            </span>
            <span className="text-[#B8860B] text-[10px] tracking-[0.22em] uppercase font-medium">
              Centro de Excelência · Figueira da Foz
            </span>
          </div>

          {/* Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {[
              ["Sobre", "sobre"],
              ["Serviços", "servicos"],
              ["Equipa", "equipa"],
              ["Tecnologia", "tecnologia"],
              ["Seguros", "seguros"],
              ["Contacto", "contacto"],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="text-white/80 hover:text-[#B8860B] text-sm tracking-wide transition-colors duration-200 uppercase font-medium"
              >
                {label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="tel:+351233403600"
            className="hidden lg:flex items-center gap-2 bg-[#B8860B] hover:bg-[#a07609] text-white px-5 py-2.5 font-semibold text-sm tracking-wide transition-all duration-200"
          >
            <Phone size={14} />
            233 403 600
          </a>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-[#1E3A5F]">
        <motion.div style={{ y }} className="absolute inset-0">
          {/* Deep institutional gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A5F] via-[#162d4a] to-[#0e1f35]" />

          {/* Subtle grid — corporate feel */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(#94A3B8 1px, transparent 1px), linear-gradient(90deg, #94A3B8 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Radial glows */}
          <div className="absolute top-1/3 right-1/4 w-[700px] h-[700px] rounded-full bg-[#B8860B]/8 blur-[140px]" />
          <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-[#94A3B8]/10 blur-[120px]" />
        </motion.div>

        {/* Left institutional accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-transparent via-[#B8860B]/70 to-transparent" />

        <motion.div
          style={{ opacity }}
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-24"
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[82vh]">
            {/* Left content */}
            <div>
              {/* Institutional badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="inline-flex items-center gap-2 border border-[#B8860B]/40 bg-[#B8860B]/10 px-4 py-2 mb-8"
              >
                <MapPin size={12} className="text-[#B8860B]" />
                <span className="text-[#B8860B] text-xs tracking-[0.2em] uppercase font-semibold">
                  Rua Miguel Bombarda 66 · Figueira da Foz
                </span>
              </motion.div>

              {/* Main heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="font-bold text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.05] mb-4"
                style={{ fontFamily: "Epilogue, sans-serif" }}
              >
                Centro de{" "}
                <span className="text-[#B8860B]">Excelência</span>
                <br />
                em Saúde{" "}
                <span className="text-[#94A3B8]">Dentária</span>
              </motion.h1>

              {/* Gold divider */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 100, opacity: 1 }}
                transition={{ delay: 0.65, duration: 0.8 }}
                className="h-[3px] bg-gradient-to-r from-[#B8860B] to-transparent mb-6"
              />

              {/* Subtitle — key differentiator */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-white/70 text-lg leading-relaxed max-w-lg mb-3"
              >
                O maior centro de saúde dentária da Figueira da Foz. Com mais de 6 médicos especializados,{" "}
                <strong className="text-white/90">bloco operatório próprio</strong> e instalações de referência nacional.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.6 }}
                className="text-[#B8860B]/90 text-sm font-semibold tracking-wide uppercase mb-10"
              >
                Centro de Saúde Dentária com Bloco Operatório
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.6 }}
                className="flex flex-wrap gap-4 mb-14"
              >
                <button
                  onClick={() => scrollToSection("contacto")}
                  className="inline-flex items-center gap-2 bg-[#B8860B] hover:bg-[#a07609] text-white px-8 py-4 font-bold text-sm tracking-widest uppercase transition-all duration-300"
                >
                  <Calendar size={16} />
                  Marcar Consulta
                </button>
                <a
                  href="tel:+351233403600"
                  className="inline-flex items-center gap-2 border border-white/30 hover:border-[#B8860B] text-white hover:text-[#B8860B] px-8 py-4 font-semibold text-sm tracking-widest uppercase transition-all duration-300"
                >
                  <Phone size={16} />
                  233 403 600
                </a>
              </motion.div>

              {/* Institutional trust indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                className="flex flex-wrap gap-6 pt-8 border-t border-white/10"
              >
                {[
                  { icon: Users, value: "6+", label: "Médicos Especialistas" },
                  { icon: Award, value: "Bloco", label: "Operatório Próprio" },
                  { icon: Shield, value: "ADSE", label: "e Principais Seguros" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-sm bg-[#B8860B]/15 border border-[#B8860B]/30 flex items-center justify-center">
                      <item.icon size={18} className="text-[#B8860B]" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm" style={{ fontFamily: "Epilogue, sans-serif" }}>{item.value}</div>
                      <div className="text-white/50 text-xs tracking-wide">{item.label}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: institutional visual */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="hidden lg:flex flex-col gap-5"
            >
              {/* Main institutional card */}
              <div className="relative bg-gradient-to-br from-[#162d4a] to-[#0e1f35] border border-[#94A3B8]/20 p-8">
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B8860B] via-[#B8860B]/50 to-transparent" />

                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-[#B8860B] text-xs tracking-[0.2em] uppercase font-semibold mb-1">Credenciais</p>
                    <h3 className="text-white font-bold text-lg" style={{ fontFamily: "Epilogue, sans-serif" }}>
                      Alba Saúde Dentária
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#B8860B]/20 border border-[#B8860B]/40 flex items-center justify-center">
                    <Award size={22} className="text-[#B8860B]" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { value: "6+", label: "Médicos" },
                    { value: "15+", label: "Anos" },
                    { value: "1", label: "Bloco Op." },
                  ].map((s) => (
                    <div key={s.label} className="text-center p-3 bg-[#1E3A5F]/60 border border-[#94A3B8]/10">
                      <div className="text-[#B8860B] font-bold text-2xl" style={{ fontFamily: "Epilogue, sans-serif" }}>{s.value}</div>
                      <div className="text-white/50 text-xs mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  {[
                    "Implantologia Avançada",
                    "Cirurgia Oral com Sedação",
                    "Ortodontia & Ortopedia",
                    "Estética Dentária Digital",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-white/60 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Secondary cards row */}
              <div className="grid grid-cols-2 gap-5">
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-[#B8860B] p-5 text-center"
                >
                  <div className="text-white/90 text-xs tracking-[0.15em] uppercase font-semibold mb-1">Bloco Operatório</div>
                  <div className="text-white font-bold text-sm" style={{ fontFamily: "Epilogue, sans-serif" }}>
                    Cirurgia em ambiente hospitalar
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="bg-[#162d4a] border border-[#94A3B8]/20 p-5 text-center"
                >
                  <div className="text-[#94A3B8] text-xs tracking-[0.15em] uppercase font-semibold mb-1">Acordos</div>
                  <div className="text-white font-bold text-sm" style={{ fontFamily: "Epilogue, sans-serif" }}>
                    ADSE · Multicare · Médis
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">Conheça o Centro</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
