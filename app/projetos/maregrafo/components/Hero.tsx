"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone, ChevronDown, Anchor } from "lucide-react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: "#003049" }}
    >
      {/* Ocean gradient background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #001f30 0%, #003049 35%, #004d6b 65%, #006080 100%)",
          }}
        />
        {/* Wave pattern SVG */}
        <motion.div style={{ y }} className="absolute inset-0 opacity-20">
          <svg
            className="absolute bottom-0 w-full"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            style={{ height: "40%" }}
          >
            <path
              fill="#B8E0D2"
              fillOpacity="0.3"
              d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,234.7C672,245,768,235,864,213.3C960,192,1056,160,1152,165.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
            <path
              fill="#B8E0D2"
              fillOpacity="0.15"
              d="M0,288L48,272C96,256,192,224,288,218.7C384,213,480,235,576,245.3C672,256,768,256,864,240C960,224,1056,192,1152,186.7C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </motion.div>
        {/* Stars/light particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              backgroundColor: "#B8E0D2",
              top: `${Math.random() * 50}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-20 flex items-center justify-between px-6 py-5 md:px-12"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#D4A574" }}
          >
            <Anchor className="w-5 h-5 text-white" />
          </div>
          <div>
            <p
              className="text-white font-bold text-lg leading-tight"
              style={{ fontFamily: "Lexend, sans-serif" }}
            >
              Marégrafo
            </p>
            <p className="text-[#B8E0D2] text-xs">Buarcos · Figueira da Foz</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-7">
          {[
            ["A Nossa História", "#historia"],
            ["Ementa", "#ementa"],
            ["Vista Mar", "#vista"],
            ["Reservas", "#reservas"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-[#B8E0D2] hover:text-white text-sm font-medium transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>

        <a
          href="tel:+351233000000"
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200"
          style={{ backgroundColor: "#D4A574", color: "white" }}
        >
          <Phone className="w-4 h-4" />
          <span className="hidden sm:inline">Reservar Mesa</span>
        </a>
      </motion.nav>

      {/* Hero content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-16 md:py-24"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 border rounded-full px-4 py-2 mb-8"
          style={{
            backgroundColor: "rgba(184, 224, 210, 0.1)",
            borderColor: "rgba(184, 224, 210, 0.3)",
          }}
        >
          <MapPin className="w-4 h-4 text-[#B8E0D2]" />
          <span className="text-[#B8E0D2] text-sm font-medium">
            Vila piscatória de Buarcos · Vista Atlântico
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight max-w-4xl mb-4"
          style={{ fontFamily: "Lexend, sans-serif" }}
        >
          Do Mar
          <br />
          <span style={{ color: "#B8E0D2" }}>Para a Mesa</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-lg md:text-xl text-[#B8E0D2]/80 max-w-2xl mb-10 leading-relaxed"
        >
          Marisco fresco, peixe do dia e vistas únicas sobre o Atlântico.
          <br className="hidden md:block" />
          Em Buarcos, onde o oceano dita o menu.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#reservas"
            className="px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 shadow-lg"
            style={{ backgroundColor: "#D4A574" }}
          >
            Reservar Mesa
          </a>
          <a
            href="#ementa"
            className="px-8 py-4 rounded-full font-semibold border transition-all duration-300 hover:scale-105"
            style={{
              borderColor: "#B8E0D2",
              color: "#B8E0D2",
              backgroundColor: "transparent",
            }}
          >
            Ver Ementa
          </a>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap justify-center gap-6 mt-14"
        >
          {[
            { value: "30+", label: "Anos de tradição" },
            { value: "4.8★", label: "Avaliação Google" },
            { value: "Diário", label: "Peixe fresco" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "Lexend, sans-serif" }}
              >
                {value}
              </p>
              <p className="text-[#B8E0D2]/70 text-xs mt-1">{label}</p>
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
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-[#B8E0D2]/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
