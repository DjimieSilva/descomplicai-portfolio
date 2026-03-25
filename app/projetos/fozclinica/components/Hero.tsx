"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, ChevronDown, Heart, Shield, Star } from "lucide-react";

const PHONE = "+351918338954";
const PHONE_DISPLAY = "+351 918 338 954";
const WHATSAPP_URL = `https://wa.me/${PHONE}?text=Olá%2C%20gostaria%20de%20marcar%20uma%20consulta%20na%20Fozclinica.`;

const stats = [
  { value: "4", label: "Especialidades", icon: Heart },
  { value: "100%", label: "Foco no Doente", icon: Shield },
  { value: "5★", label: "Avaliação", icon: Star },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Gradient orbs */}
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #0D9488, transparent)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #FB7185, transparent)" }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.1, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-6 md:px-12 py-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" fill="white" />
          </div>
          <div>
            <span className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: "var(--font-plus-jakarta-sans, sans-serif)" }}>
              Foz<span className="text-teal-400">clinica</span>
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:flex items-center gap-6 text-sm text-white/70"
        >
          <a href="#especialidades" className="hover:text-white transition-colors">Especialidades</a>
          <a href="#sobre" className="hover:text-white transition-colors">Sobre Nós</a>
          <a href="#equipa" className="hover:text-white transition-colors">Equipa</a>
          <a href="#contacto" className="hover:text-white transition-colors">Contacto</a>
          <a
            href={`tel:${PHONE}`}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
          >
            <Phone className="w-4 h-4" />
            {PHONE_DISPLAY}
          </a>
        </motion.div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-500/30 text-teal-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
        >
          <MapPin className="w-3.5 h-3.5" />
          Figueira da Foz · Rua Bartolomeu Dias 63
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 max-w-5xl"
          style={{ fontFamily: "var(--font-plus-jakarta-sans, sans-serif)" }}
        >
          A sua saúde,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
            toda no mesmo lugar
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg md:text-xl text-white/70 max-w-2xl mb-10 leading-relaxed"
        >
          Centro multidisciplinar de saúde e bem-estar. Medicina dentária, podologia, psicologia e reabilitação física — profissionais especializados, cuidado integral, numa única clínica.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-8 py-4 rounded-full text-base transition-all hover:shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5"
          >
            <Phone className="w-4 h-4" />
            Marcar Consulta
          </a>
          <a
            href="#especialidades"
            className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium px-8 py-4 rounded-full text-base transition-all hover:-translate-y-0.5"
          >
            Ver Especialidades
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <stat.icon className="w-5 h-5 text-teal-400 mb-1" />
              <span className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-plus-jakarta-sans, sans-serif)" }}>
                {stat.value}
              </span>
              <span className="text-sm text-white/50">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="relative z-10 flex justify-center pb-8"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <a href="#sobre" className="text-white/40 hover:text-white/70 transition-colors">
          <ChevronDown className="w-6 h-6" />
        </a>
      </motion.div>
    </section>
  );
}
