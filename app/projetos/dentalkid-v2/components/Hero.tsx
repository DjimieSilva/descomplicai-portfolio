"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Phone, MapPin, Star } from "lucide-react";

const floatVariants: Variants = {
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const bounceIn: Variants = {
  hidden: { opacity: 0, scale: 0.5, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: i * 0.1,
    },
  }),
};

const slideUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25,
      delay: i * 0.15,
    },
  }),
};

function ToothSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M40 5 C20 5, 8 20, 8 35 C8 50, 12 58, 16 65 C20 72, 22 85, 28 90 C32 94, 36 92, 40 85 C44 92, 48 94, 52 90 C58 85, 60 72, 64 65 C68 58, 72 50, 72 35 C72 20, 60 5, 40 5Z"
        fill="currentColor"
      />
      <path
        d="M28 20 C28 20, 35 25, 40 20 C45 15, 52 20, 52 20"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.4"
        fill="none"
      />
    </svg>
  );
}

function StarBurst({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M30 5 L33 25 L53 25 L37 37 L43 57 L30 45 L17 57 L23 37 L7 25 L27 25Z"
        fill="currentColor"
      />
    </svg>
  );
}

function BubbleCircle({
  size,
  color,
  style,
}: {
  size: number;
  color: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className="absolute rounded-full opacity-20"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        ...style,
      }}
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.15, 0.25, 0.15],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 2,
      }}
    />
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-sky-500 via-cyan-500 to-green-500 overflow-hidden flex items-center">
      {/* Decorative background bubbles */}
      <BubbleCircle size={300} color="#06B6D4" style={{ top: -80, right: -80 }} />
      <BubbleCircle size={200} color="#84CC16" style={{ bottom: 50, left: -60 }} />
      <BubbleCircle size={150} color="#22C55E" style={{ top: 100, left: "30%" }} />
      <BubbleCircle size={100} color="#14B8A6" style={{ bottom: 150, right: "20%" }} />

      {/* Floating decorative teeth */}
      <motion.div
        className="absolute top-16 right-16 text-lime-300 opacity-30 hidden md:block"
        variants={floatVariants}
        animate="animate"
      >
        <ToothSVG className="w-20 h-20" />
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-12 text-green-300 opacity-30 hidden md:block"
        variants={floatVariants}
        animate="animate"
        style={{ animationDelay: "1s" }}
      >
        <ToothSVG className="w-14 h-14" />
      </motion.div>

      {/* Floating stars */}
      <motion.div
        className="absolute top-32 left-1/4 text-lime-300 opacity-60 hidden md:block"
        animate={{ rotate: [0, 20, -20, 0], y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <StarBurst className="w-8 h-8" />
      </motion.div>
      <motion.div
        className="absolute bottom-40 right-1/3 text-lime-200 opacity-50"
        animate={{ rotate: [0, -15, 15, 0], y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <StarBurst className="w-6 h-6" />
      </motion.div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <div>
            {/* Badge */}
            <motion.div
              custom={0}
              variants={bounceIn}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 bg-lime-400 text-sky-900 px-4 py-2 rounded-full font-bold text-sm mb-6 shadow-lg"
            >
              <span className="text-lg">🦷</span>
              O Dentista das Crianças
              <span className="text-lg">✨</span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              custom={1}
              variants={slideUp}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              Sorrisos
              <span className="block text-lime-300 drop-shadow-lg">
                Felizes! 😁
              </span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={slideUp}
              initial="hidden"
              animate="visible"
              className="text-xl text-sky-100 mb-4 leading-relaxed max-w-lg"
            >
              A clínica dentária em Figueira da Foz onde as crianças{" "}
              <strong className="text-lime-300">adoram ir ao dentista</strong>.
              Cuidamos dos sorrisos dos 0 aos 17 anos — com muita diversão!
            </motion.p>

            <motion.div
              custom={3}
              variants={slideUp}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-2 mb-8"
            >
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-lime-400 fill-lime-400"
                  />
                ))}
              </div>
              <span className="text-sky-100 text-sm font-medium">
                +500 famílias felizes em Figueira da Foz
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              custom={4}
              variants={slideUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="tel:+351233000000"
                className="group inline-flex items-center justify-center gap-3 bg-lime-400 hover:bg-lime-300 text-sky-900 font-black px-8 py-4 rounded-full text-lg shadow-xl hover:shadow-lime-400/40 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Phone className="w-5 h-5" />
                Marcar Consulta
              </a>
              <a
                href="#localizacoes"
                className="inline-flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-full text-lg border-2 border-white/40 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <MapPin className="w-5 h-5" />
                As Nossas Clínicas
              </a>
            </motion.div>

            {/* Location pills */}
            <motion.div
              custom={5}
              variants={slideUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-3 mt-8"
            >
              {["📍 Buarcos", "📍 Tavarede"].map((loc) => (
                <span
                  key={loc}
                  className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/30"
                >
                  {loc}
                </span>
              ))}
              <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/30">
                🕐 Seg–Sex: 9h–19h
              </span>
            </motion.div>
          </div>

          {/* Right: Hero illustration */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 20, delay: 0.3 }}
            className="flex justify-center items-center relative"
          >
            {/* Big decorative tooth */}
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, 3, -3, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                {/* Main circle background */}
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-full border-4 border-white/40 shadow-2xl" />

                {/* Central tooth icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-9xl mb-2 drop-shadow-lg">🦷</div>
                    <p className="text-white font-black text-xl drop-shadow">
                      Dentalkid
                    </p>
                    <p className="text-lime-300 font-bold text-sm">
                      Clínica Dentária
                    </p>
                  </div>
                </div>

                {/* Orbiting emoji badges */}
                {[
                  { emoji: "😄", angle: 0, color: "#06B6D4" },
                  { emoji: "⭐", angle: 90, color: "#84CC16" },
                  { emoji: "🎉", angle: 180, color: "#22C55E" },
                  { emoji: "💎", angle: 270, color: "#14B8A6" },
                ].map(({ emoji, angle, color }) => {
                  const rad = (angle * Math.PI) / 180;
                  const r = 130;
                  const x = 50 + (r / 2) * Math.cos(rad);
                  const y = 50 + (r / 2) * Math.sin(rad);
                  return (
                    <motion.div
                      key={angle}
                      className="absolute w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg border-2 border-white/50"
                      style={{
                        backgroundColor: color,
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 3 + angle / 100,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {emoji}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-sm font-medium">Descobre mais</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
