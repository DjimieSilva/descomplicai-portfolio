"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, MessageCircle, ExternalLink } from "lucide-react";
import Link from "next/link";

/* ─── Animation Variants ─── */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ─── Floating Stars Data ─── */

const stars = [
  { char: "⭐", left: "8%", bottom: "12%", size: "text-sm" },
  { char: "🌙", left: "85%", bottom: "18%", size: "text-xl" },
  { char: "✨", left: "20%", bottom: "6%", size: "text-xs" },
  { char: "⭐", left: "70%", bottom: "8%", size: "text-sm" },
  { char: "✨", left: "50%", bottom: "14%", size: "text-xs" },
  { char: "🌙", left: "35%", bottom: "4%", size: "text-base" },
];

/* ─── Component ─── */

export function FooterSection() {
  return (
    <footer className="relative overflow-x-hidden" style={{ backgroundColor: "#F0E0CC" }}>
      {/* Cloud-shaped top edge */}
      <div className="pointer-events-none absolute -top-1 left-0 w-full">
        <svg
          viewBox="0 0 1440 100"
          className="block w-full"
          preserveAspectRatio="none"
          style={{ height: "40px" }}
        >
          <path
            d="M0,100 Q120,20 240,60 Q360,100 480,50 Q600,0 720,50 Q840,100 960,50 Q1080,0 1200,60 Q1320,100 1440,40 V0 H0 Z"
            fill="#A8C8E0"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-10 pb-6 md:pt-20 md:pb-8">
        {/* ─── Logo ─── */}
        <motion.div
          className="mb-6 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}

        >
          <h2
            className="text-3xl font-bold tracking-tight md:text-4xl"
            style={{ color: "#1B5E5E", fontFamily: "serif" }}
          >
            Sabor Abençoado
          </h2>
          <p
            className="mt-1 text-sm font-medium uppercase tracking-widest md:text-base"
            style={{ color: "#C9A050" }}
          >
            Pastry Takeaway
          </p>
        </motion.div>

        {/* ─── Contact Info ─── */}
        <motion.div
          className="mb-6 flex flex-col items-center gap-3 text-sm md:flex-row md:justify-center md:gap-8 md:text-base"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}

        >
          <span className="flex items-center gap-2" style={{ color: "#2D2D2D" }}>
            <MapPin className="h-4 w-4" style={{ color: "#C9A050" }} />
            Olhão, Portugal
          </span>
          <span className="flex items-center gap-2" style={{ color: "#2D2D2D" }}>
            <Phone className="h-4 w-4" style={{ color: "#C9A050" }} />
            914 882 047 / 932 642 860
          </span>
          <span className="flex items-center gap-2" style={{ color: "#2D2D2D" }}>
            <Clock className="h-4 w-4" style={{ color: "#C9A050" }} />
            Segunda a Sexta
          </span>
        </motion.div>

        {/* ─── WhatsApp + Divider + Copyright ─── */}
        <div className="mt-4 flex flex-col items-center gap-4">
          <motion.a
            href="https://wa.me/351914882047?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20uma%20encomenda"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full text-white shadow-md transition-shadow hover:shadow-lg"
            style={{ backgroundColor: "#25D366" }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            aria-label="WhatsApp"
          >
            <MessageCircle className="h-5 w-5" />
          </motion.a>
          <div
            className="h-px w-24"
            style={{ background: "linear-gradient(90deg, transparent, #C9A050, transparent)" }}
          />
          <div className="text-center text-xs leading-relaxed" style={{ color: "#2D2D2D" }}>
          <p className="mb-1">
            &copy; 2025 Sabor Abençoado — Feito com ❤️ em Olhão
          </p>
          <p className="flex items-center justify-center gap-1">
            Site por{" "}
            <Link
              href="/"
              className="inline-flex items-center gap-0.5 font-medium underline decoration-dotted underline-offset-2 transition-colors hover:opacity-70"
              style={{ color: "#1B5E5E" }}
            >
              Descomplicai
              <ExternalLink className="h-3 w-3" />
            </Link>
          </p>
          </div>
        </div>
      </div>

      {/* ─── Floating Stars & Moon ─── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {stars.map((star, i) => (
          <motion.span
            key={i}
            className={`absolute ${star.size}`}
            style={{ left: star.left, bottom: star.bottom }}
            animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 3 + i * 0.7, ease: "easeInOut" as const }}
          >
            {star.char}
          </motion.span>
        ))}
      </div>
    </footer>
  );
}
