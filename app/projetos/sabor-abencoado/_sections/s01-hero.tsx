"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MapPin, ChevronDown, MessageCircle } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Floating decorative element                                        */
/* ------------------------------------------------------------------ */
function FloatingEmoji({
  emoji,
  delay,
  duration,
  x,
  y,
  size,
}: {
  emoji: string;
  delay: number;
  duration: number;
  x: string;
  y: string;
  size: string;
}) {
  return (
    <motion.span
      className="absolute pointer-events-none select-none"
      style={{ left: x, top: y, fontSize: size }}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [20, -10, -20, -30],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: delay * 0.5,
        ease: "easeInOut",
      }}
    >
      {emoji}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*  Cloud shape (CSS only)                                             */
/* ------------------------------------------------------------------ */
function CloudShape({ className }: { className?: string }) {
  return (
    <div
      className={`absolute rounded-full opacity-30 ${className ?? ""}`}
      style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  HeroSection                                                        */
/* ------------------------------------------------------------------ */
export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const floatingElements = [
    { emoji: "⭐", delay: 0, duration: 6, x: "8%", y: "15%", size: "1.5rem" },
    { emoji: "🌙", delay: 1.2, duration: 7, x: "85%", y: "10%", size: "1.8rem" },
    { emoji: "💕", delay: 0.6, duration: 5.5, x: "75%", y: "65%", size: "1.4rem" },
    { emoji: "⭐", delay: 2.0, duration: 6.5, x: "15%", y: "70%", size: "1.2rem" },
    { emoji: "🌙", delay: 1.8, duration: 7.5, x: "50%", y: "8%", size: "1.3rem" },
    { emoji: "💕", delay: 0.3, duration: 6, x: "90%", y: "40%", size: "1.6rem" },
    { emoji: "⭐", delay: 2.5, duration: 5, x: "25%", y: "45%", size: "1.1rem" },
    { emoji: "🌙", delay: 1.0, duration: 8, x: "5%", y: "50%", size: "1.5rem" },
  ];

  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden px-6 py-16 md:px-12 lg:px-20"
      style={{
        minHeight: "100vh",
        backgroundColor: "#FFF8F0",
        /* Cloud-shaped bottom edge */
        clipPath:
          "polygon(0 0, 100% 0, 100% 92%, 85% 96%, 70% 93%, 55% 98%, 40% 94%, 25% 97%, 10% 93%, 0 96%)",
      }}
    >
      {/* ---- Subtle floating cloud shapes ---- */}
      <CloudShape className="w-64 h-32 -top-10 -left-16 blur-3xl" />
      <CloudShape className="w-80 h-40 top-1/4 -right-20 blur-3xl" />
      <CloudShape className="w-48 h-24 bottom-1/3 left-1/4 blur-2xl" />
      <CloudShape className="w-72 h-36 top-1/2 right-1/3 blur-3xl opacity-20" />

      {/* ---- Floating decorative emojis ---- */}
      <AnimatePresence>
        {mounted &&
          floatingElements.map((el, i) => (
            <FloatingEmoji key={i} {...el} />
          ))}
      </AnimatePresence>

      {/* ---- Main content ---- */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
        {/* Location badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 mb-8 text-sm font-medium"
          style={{
            backgroundColor: "rgba(27, 94, 94, 0.08)",
            color: "#1B5E5E",
          }}
        >
          <MapPin size={14} />
          <span>Olhão</span>
        </motion.div>

        {/* Business name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4"
          style={{ color: "#1B5E5E" }}
        >
          Sabor Abençoado
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="text-sm md:text-base font-semibold uppercase mb-6"
          style={{
            color: "#C9A050",
            letterSpacing: "0.25em",
          }}
        >
          Pastry Takeaway
        </motion.p>

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="w-24 h-px mb-6"
          style={{ backgroundColor: "#C9A050" }}
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="text-lg md:text-xl lg:text-2xl mb-10 font-light"
          style={{ color: "#2D2D2D" }}
        >
          Bolos e pães caseiros feitos com amor ❤️
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/351914882047?text=Olá! Gostaria de fazer uma encomenda"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] w-full sm:w-auto"
            style={{
              backgroundColor: "#1B5E5E",
            }}
          >
            <MessageCircle size={20} />
            <span>Encomendar pelo WhatsApp</span>
          </a>

          {/* Phone CTA */}
          <a
            href="tel:+351914882047"
            className="inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-base font-semibold shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.03] active:scale-[0.98] w-full sm:w-auto"
            style={{
              backgroundColor: "transparent",
              color: "#1B5E5E",
              border: "2px solid #1B5E5E",
            }}
          >
            <Phone size={18} />
            <span>Ligar</span>
          </a>
        </motion.div>
      </div>

      {/* ---- Scroll indicator ---- */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span
          className="text-xs font-medium uppercase"
          style={{ color: "#C9A050", letterSpacing: "0.15em" }}
        >
          Explorar
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={22} style={{ color: "#C9A050" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
