"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#FFF8F0]">
      {/* Background decorative elements evoking Quiaios dunes & nature */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Sky gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#E8F4E8]/40 via-[#FFF8F0] to-[#FFF8F0]" />

        {/* Dune silhouette SVG */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,160 C200,80 400,200 600,140 C800,80 1000,180 1200,120 C1350,75 1400,100 1440,90 L1440,220 L0,220 Z"
            fill="#C2703B"
            fillOpacity="0.08"
          />
          <path
            d="M0,190 C300,130 500,210 750,170 C950,140 1100,200 1440,160 L1440,220 L0,220 Z"
            fill="#5F7A3A"
            fillOpacity="0.07"
          />
        </svg>

        {/* Circular warm blob top right */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, #C2703B 0%, transparent 70%)",
          }}
        />

        {/* Small olive blob bottom left */}
        <div
          className="absolute bottom-20 -left-16 w-64 h-64 rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, #5F7A3A 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
        {/* Location pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white border border-[#C2703B]/20 rounded-full px-4 py-2 mb-8 shadow-sm"
        >
          <MapPin className="w-4 h-4 text-[#C2703B]" />
          <span className="text-sm font-medium text-[#8B6F47]">
            Quiaios, Figueira da Foz
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-[#3D2B1F]"
          style={{ fontFamily: "'Nunito Sans', sans-serif" }}
        >
          A Sua Clínica Dentária
          <br />
          <span className="text-[#C2703B]">em Quiaios</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-xl text-[#8B6F47] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Tratamos de si como família. Cuidados dentários de qualidade,
          num ambiente acolhedor, no coração da nossa vila.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <a
            href="tel:934868049"
            className="flex items-center gap-3 bg-[#C2703B] hover:bg-[#A85E2E] text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 text-base"
          >
            <Phone className="w-5 h-5" />
            934 868 049
          </a>
          <a
            href="#servicos"
            className="flex items-center gap-3 bg-white hover:bg-[#FFF0E0] text-[#C2703B] font-bold px-8 py-4 rounded-2xl border-2 border-[#C2703B]/30 hover:border-[#C2703B] transition-all duration-200 text-base"
          >
            Ver Serviços
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-8 text-[#8B6F47]"
        >
          {[
            { value: "20+", label: "Anos ao serviço" },
            { value: "2.000+", label: "Famílias atendidas" },
            { value: "10 min", label: "da Figueira da Foz" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div
                className="text-2xl font-extrabold text-[#C2703B]"
                style={{ fontFamily: "'Nunito Sans', sans-serif" }}
              >
                {stat.value}
              </div>
              <div className="text-sm font-medium mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#C2703B]/60"
      >
        <span className="text-xs font-medium tracking-wide uppercase">
          Saiba mais
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
