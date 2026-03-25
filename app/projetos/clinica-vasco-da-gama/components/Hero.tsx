"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Phone, Calendar, ChevronDown, MapPin } from "lucide-react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
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
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(10,22,40,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(200,165,90,0.15)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex flex-col">
            <span className="text-white font-serif text-xl font-bold tracking-wide leading-tight">
              Clínica Vasco da Gama
            </span>
            <span className="text-[#C8A55A] text-[10px] tracking-[0.25em] uppercase">
              Medicina Dentária
            </span>
          </div>

          {/* Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {[
              ["Sobre", "sobre"],
              ["Serviços", "servicos"],
              ["Equipa", "equipa"],
              ["Testemunhos", "testemunhos"],
              ["Contacto", "contacto"],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="text-white/80 hover:text-[#C8A55A] text-sm tracking-wide transition-colors duration-200 uppercase font-medium"
              >
                {label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="tel:+351233433720"
            className="hidden lg:flex items-center gap-2 bg-[#C8A55A] hover:bg-[#b8924a] text-[#0A1628] px-5 py-2.5 rounded-sm font-semibold text-sm tracking-wide transition-all duration-200"
          >
            <Phone size={14} />
            233 433 720
          </a>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-[#0A1628]">
        {/* Background pattern */}
        <motion.div style={{ y }} className="absolute inset-0">
          {/* Deep gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#0d1f3a] to-[#061020]" />

          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(#C8A55A 1px, transparent 1px), linear-gradient(90deg, #C8A55A 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          />

          {/* Radial glow */}
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[#C8A55A]/5 blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-900/20 blur-[100px]" />
        </motion.div>

        {/* Gold decorative line */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#C8A55A]/60 to-transparent" />

        <motion.div
          style={{ opacity }}
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-20"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left content */}
            <div>
              {/* Location badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="inline-flex items-center gap-2 border border-[#C8A55A]/30 bg-[#C8A55A]/10 px-4 py-2 rounded-sm mb-8"
              >
                <MapPin size={12} className="text-[#C8A55A]" />
                <span className="text-[#C8A55A] text-xs tracking-[0.2em] uppercase font-medium">
                  Figueira da Foz · Desde 2003
                </span>
              </motion.div>

              {/* Main heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="font-serif text-5xl lg:text-7xl text-white leading-[1.05] mb-6"
              >
                Excelência em{" "}
                <span className="relative inline-block">
                  <span className="text-[#C8A55A]">Medicina</span>
                </span>{" "}
                <br />
                <span className="text-[#C8A55A]">Dentária</span>
              </motion.h1>

              {/* Gold divider */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 80, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="h-[2px] bg-gradient-to-r from-[#C8A55A] to-transparent mb-6"
              />

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-white/70 text-lg leading-relaxed max-w-lg mb-10"
              >
                Laboratório de próteses próprio, tecnologia de ponta e uma equipa dedicada ao seu sorriso.
                Mais de 20 anos de confiança na Figueira da Foz.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <button
                  onClick={() => scrollToSection("contacto")}
                  className="inline-flex items-center gap-2 bg-[#C8A55A] hover:bg-[#b8924a] text-[#0A1628] px-8 py-4 font-bold text-sm tracking-widest uppercase transition-all duration-300 group"
                >
                  <Calendar size={16} />
                  Marcar Consulta
                </button>
                <button
                  onClick={() => scrollToSection("servicos")}
                  className="inline-flex items-center gap-2 border border-white/30 hover:border-[#C8A55A] text-white hover:text-[#C8A55A] px-8 py-4 font-semibold text-sm tracking-widest uppercase transition-all duration-300"
                >
                  Ver Serviços
                </button>
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                className="flex gap-10 mt-14 pt-10 border-t border-white/10"
              >
                {[
                  { value: "+20", label: "Anos de Experiência" },
                  { value: "+8000", label: "Pacientes Satisfeitos" },
                  { value: "Lab.", label: "Próprio de Próteses" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-[#C8A55A] font-serif text-3xl font-bold">{stat.value}</div>
                    <div className="text-white/50 text-xs tracking-wide uppercase mt-1">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: visual element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="hidden lg:flex flex-col items-center justify-center"
            >
              {/* Decorative circle frame */}
              <div className="relative w-[480px] h-[480px]">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border border-[#C8A55A]/20" />
                <div className="absolute inset-4 rounded-full border border-[#C8A55A]/10" />

                {/* Main circle */}
                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-[#0d2040] to-[#0A1628] border border-[#C8A55A]/30 flex items-center justify-center overflow-hidden">
                  {/* Tooth SVG illustration */}
                  <div className="text-center p-8">
                    <svg viewBox="0 0 200 220" className="w-48 h-48 mx-auto mb-4" fill="none">
                      <path
                        d="M100 10 C60 10, 30 40, 30 75 C30 95, 38 110, 45 125 C52 140, 55 155, 55 170 C55 185, 62 195, 70 195 C78 195, 82 185, 85 170 C88 155, 92 145, 100 145 C108 145, 112 155, 115 170 C118 185, 122 195, 130 195 C138 195, 145 185, 145 170 C145 155, 148 140, 155 125 C162 110, 170 95, 170 75 C170 40, 140 10, 100 10Z"
                        fill="rgba(200,165,90,0.08)"
                        stroke="#C8A55A"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M75 35 C60 45, 50 60, 50 78"
                        stroke="rgba(200,165,90,0.4)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <circle cx="100" cy="75" r="2" fill="#C8A55A" opacity="0.6" />
                    </svg>
                    <p className="text-[#C8A55A] font-serif text-lg font-semibold">Clínica Vasco da Gama</p>
                    <p className="text-white/40 text-xs tracking-widest uppercase mt-1">Medicina Dentária</p>
                  </div>
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#C8A55A] text-[#0A1628] px-4 py-2 rounded-sm text-xs font-bold tracking-wide"
                >
                  Laboratório Próprio
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: [0.45, 0, 0.55, 1], delay: 0.5 }}
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#0d2040] border border-[#C8A55A]/40 text-white px-4 py-2 rounded-sm text-xs font-semibold tracking-wide"
                >
                  ★ Clínica Premium
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
          <span className="text-[10px] tracking-[0.3em] uppercase">Descubra mais</span>
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
