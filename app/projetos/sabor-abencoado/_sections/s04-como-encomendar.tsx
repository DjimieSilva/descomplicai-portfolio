"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, ChevronRight } from "lucide-react";

/* ─── Data ─── */

const steps = [
  {
    num: 1,
    emoji: "📱",
    title: "Fale Connosco",
    desc: "Envie-nos uma mensagem pelo WhatsApp com o que deseja",
  },
  {
    num: 2,
    emoji: "📋",
    title: "Escolha e Confirme",
    desc: "Confirmamos disponibilidade, preço e data de entrega",
  },
  {
    num: 3,
    emoji: "🚗",
    title: "Receba em Casa",
    desc: "Entregamos na sua porta, fresquinho e com amor",
  },
];

const trustBadges = [
  { emoji: "🏠", label: "100% Caseiro" },
  { emoji: "📍", label: "Olhão" },
  { emoji: "🗓", label: "Seg a Sex" },
];

const WHATSAPP_URL =
  "https://wa.me/351914882047?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20uma%20encomenda";

/* ─── Animation Variants ─── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

/* ─── Component ─── */

export function ComoEncomendarSection() {
  return (
    <section
      className="relative overflow-hidden py-20 px-6 md:py-28"
      style={{
        background: "linear-gradient(180deg, #FFF8F0 0%, #EAF2FA 60%, #A8C8E0 100%)",
      }}
    >
      {/* Decorative cloud shapes */}
      <div className="pointer-events-none absolute top-0 left-0 w-full">
        <svg viewBox="0 0 1440 80" className="w-full block" preserveAspectRatio="none">
          <path
            d="M0,40 Q180,0 360,40 T720,40 T1080,40 T1440,40 V0 H0 Z"
            fill="#FFF8F0"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* ─── Header ─── */}
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}

        >
          <h2
            className="mb-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
            style={{ color: "#1B5E5E", fontFamily: "serif" }}
          >
            Como Encomendar
          </h2>
          <p className="text-lg md:text-xl" style={{ color: "#2D2D2D" }}>
            Simples como deve ser ✨
          </p>
        </motion.div>

        {/* ─── Steps ─── */}
        <div className="relative mb-20">
          {/* Dotted connector line (desktop) */}
          <div
            className="absolute top-12 left-[calc(16.67%+24px)] hidden h-0.5 md:block"
            style={{
              width: "calc(66.66% - 48px)",
              backgroundImage:
                "repeating-linear-gradient(90deg, #C9A050 0, #C9A050 8px, transparent 8px, transparent 16px)",
            }}
          />

          {/* Dotted connector line (mobile — vertical) */}
          <div
            className="absolute top-12 left-8 block h-[calc(100%-48px)] w-0.5 md:hidden"
            style={{
              backgroundImage:
                "repeating-linear-gradient(180deg, #C9A050 0, #C9A050 8px, transparent 8px, transparent 16px)",
            }}
          />

          <div className="grid gap-12 md:grid-cols-3 md:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                className="relative flex gap-5 md:flex-col md:items-center md:text-center md:gap-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}

              >
                {/* Numbered circle */}
                <div
                  className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl font-bold text-white shadow-lg"
                  style={{ backgroundColor: "#1B5E5E" }}
                >
                  <span className="text-2xl">{step.num}</span>
                </div>

                <div>
                  <h3
                    className="mb-1 text-lg font-semibold md:text-xl"
                    style={{ color: "#1B5E5E" }}
                  >
                    {step.emoji} {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed md:text-base" style={{ color: "#2D2D2D" }}>
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── WhatsApp CTA ─── */}
        <motion.div
          className="mx-auto mb-16 max-w-lg rounded-3xl p-8 text-center shadow-2xl md:p-12"
          style={{ backgroundColor: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={scaleIn}
        >
          <p
            className="mb-2 text-2xl font-bold md:text-3xl"
            style={{ color: "#1B5E5E", fontFamily: "serif" }}
          >
            Pronto para encomendar?
          </p>

          <p className="mb-8 text-sm" style={{ color: "#2D2D2D" }}>
            É só clicar e falar connosco!
          </p>

          {/* Main WhatsApp button */}
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mb-6 inline-flex items-center gap-3 rounded-full px-8 py-4 text-lg font-bold text-white shadow-xl transition-shadow hover:shadow-2xl md:px-10 md:py-5 md:text-xl"
            style={{ backgroundColor: "#25D366" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <MessageCircle className="h-6 w-6 md:h-7 md:w-7" />
            Enviar Mensagem pelo WhatsApp
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />

            {/* Pulse ring */}
            <span
              className="absolute inset-0 animate-ping rounded-full opacity-20"
              style={{ backgroundColor: "#25D366" }}
            />
          </motion.a>

          <p className="flex items-center justify-center gap-2 text-sm" style={{ color: "#2D2D2D" }}>
            <Phone className="h-4 w-4" style={{ color: "#C9A050" }} />
            Ou ligue: 914 882 047 / 932 642 860
          </p>
        </motion.div>

        {/* ─── Trust Badges ─── */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}

        >
          {trustBadges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium shadow-sm"
              style={{ backgroundColor: "rgba(255,255,255,0.7)", color: "#1B5E5E" }}
            >
              <span className="text-lg">{badge.emoji}</span>
              {badge.label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
