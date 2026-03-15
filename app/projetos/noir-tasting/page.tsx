"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";

/* ───────────────────── DATA ───────────────────── */

const NAV_LINKS = [
  { label: "A Prova", href: "#prova" },
  { label: "Vinhos", href: "#vinhos" },
  { label: "Reservar", href: "#reservar" },
];

const STEPS = [
  {
    num: "01",
    title: "Receção",
    desc: "Champagne de boas-vindas à entrada da cave",
  },
  {
    num: "02",
    title: "A Cave",
    desc: "Visita guiada pelos corredores centenários",
  },
  {
    num: "03",
    title: "A Prova Negra",
    desc: "5 vinhos premium, olhos vendados, apenas os sentidos",
  },
  {
    num: "04",
    title: "O Sommelier",
    desc: "Revelação e análise com sommelier certificado",
  },
  {
    num: "05",
    title: "O Brinde",
    desc: "Porto Vintage para fechar a noite",
  },
];

const WINES = [
  { name: "Barca Velha 2011", tag: "O lendário" },
  { name: "Pêra-Manca Tinto 2015", tag: "O nobre alentejano" },
  { name: "Chryseia 2018", tag: "A fusão perfeita" },
  { name: "Niepoort Charme 2017", tag: "O rebelde do Douro" },
  { name: "Mouchão Tonel 3-4 2016", tag: "A essência do Alentejo" },
  { name: "Quinta do Noval Nacional 2003", tag: "O Porto supremo" },
];

const PRICING = [
  {
    tier: "Clássica",
    price: "€150",
    unit: "/pessoa",
    features: [
      "Prova de 5 vinhos selecionados",
      "Visita guiada",
      "Tábua de queijos artesanais",
    ],
    capacity: "Até 8 pessoas",
  },
  {
    tier: "Reserva",
    price: "€350",
    unit: "/pessoa",
    features: [
      "Vinhos raros e vintage",
      "Sommelier dedicado",
      "Jantar privado na cave",
      "Oferta de garrafa vintage",
    ],
    capacity: "Até 4 pessoas · Verdadeiramente exclusivo",
  },
];

/* ───────────────────── PARTICLES ───────────────── */

function Particles() {
  return (
    <>
      {[
        { top: "15%", left: "10%" },
        { top: "45%", left: "85%" },
        { top: "70%", left: "25%" },
        { top: "30%", left: "65%" },
      ].map((pos, i) => (
        <div
          key={i}
          className="particle"
          style={{ top: pos.top, left: pos.left }}
        />
      ))}
    </>
  );
}

/* ───────────────────── SECTION WRAPPER ───────────── */

function FadeInSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ───────────────────── NAV ──────────────────────── */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#C9A84C]/30"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-16">
        <a
          href="#"
          className="text-2xl font-semibold tracking-[0.3em] text-[#F8F5F0]"
          style={{ fontFamily: "var(--font-cormorant), serif" }}
        >
          NOIR
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm tracking-wider text-[#F8F5F0]/70 hover:text-[#C9A84C] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-[5px] p-3 -mr-3"
          aria-label="Menu"
        >
          <span
            className={`block w-6 h-[1.5px] bg-[#C9A84C] transition-transform duration-300 ${
              menuOpen ? "rotate-45 translate-y-[6.5px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-[#C9A84C] transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-[#C9A84C] transition-transform duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#0A0A0A]/95 backdrop-blur-lg border-t border-[#C9A84C]/20 px-5 pb-8 pt-4"
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block py-4 text-lg tracking-wider text-[#F8F5F0]/80 active:text-[#C9A84C] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ───────────────────── HERO ─────────────────────── */

function Hero() {
  const heroTitle = "Uma Prova. Uma Cave. Uma Noite Inesquecível.".split(" ");

  return (
    <section className="relative min-h-dvh flex flex-col items-center justify-center px-5 text-center">
      {/* Radial glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 40%, rgba(114,47,55,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight">
          {heroTitle.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.3em]"
              initial={{ filter: "blur(12px)", opacity: 0 }}
              animate={{ filter: "blur(0px)", opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.4 + i * 0.15,
                ease: "easeOut",
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="mt-6 text-base sm:text-lg text-[#C9A84C] font-light tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          Provas privadas em caves centenárias do Porto
        </motion.p>

        <motion.div
          className="gold-line mx-auto mt-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 2.3 }}
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
      >
        <svg
          width="20"
          height="30"
          viewBox="0 0 20 30"
          fill="none"
          className="mx-auto"
        >
          <rect
            x="1"
            y="1"
            width="18"
            height="28"
            rx="9"
            stroke="#C9A84C"
            strokeWidth="1.5"
          />
          <motion.circle
            cx="10"
            cy="10"
            r="2.5"
            fill="#C9A84C"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
    </section>
  );
}

/* ───────────────────── A PROVA ──────────────────── */

function AProva() {
  return (
    <section id="prova" className="py-20 sm:py-28 px-5">
      <div className="max-w-2xl mx-auto">
        <FadeInSection>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-center mb-4">
            A Prova
          </h2>
          <div className="gold-line mx-auto mb-16" />
        </FadeInSection>

        <div className="flex flex-col items-center">
          {STEPS.map((step, i) => (
            <div key={step.num} className="flex flex-col items-center w-full">
              <FadeInSection
                delay={i * 0.12}
                className="flex flex-col items-center text-center w-full"
              >
                <span className="text-5xl sm:text-6xl font-light text-[#C9A84C]/30">
                  {step.num}
                </span>
                <h3 className="text-xl sm:text-2xl font-medium mt-2 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-[#F8F5F0]/60 font-light max-w-md">
                  {step.desc}
                </p>
              </FadeInSection>
              {i < STEPS.length - 1 && (
                <div className="step-connector my-4" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── VINHOS ────────────────────── */

function Vinhos() {
  return (
    <section id="vinhos" className="py-20 sm:py-28 px-5">
      <div className="max-w-6xl mx-auto">
        <FadeInSection>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-center mb-4">
            Vinhos Exclusivos
          </h2>
          <div className="gold-line mx-auto mb-12" />
        </FadeInSection>

        <div className="wine-scroll px-1">
          {WINES.map((wine, i) => (
            <FadeInSection key={wine.name} delay={i * 0.08}>
              <div className="glass-card w-[260px] sm:w-[280px] p-6 flex flex-col min-h-[180px]">
                {/* Wine glass icon via gradient */}
                <div
                  className="w-8 h-8 rounded-full mb-4 flex-shrink-0"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, #722F37, #3a1118)",
                  }}
                />
                <h3 className="text-lg font-medium mb-1">{wine.name}</h3>
                <p className="text-sm text-[#C9A84C] font-light italic">
                  {wine.tag}
                </p>
                <div className="mt-auto pt-4">
                  <div className="w-8 h-[1px] bg-[#C9A84C]/40" />
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── PRICING ───────────────────── */

function Pricing() {
  return (
    <section className="py-20 sm:py-28 px-5">
      <div className="max-w-4xl mx-auto">
        <FadeInSection>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-center mb-4">
            Experiências
          </h2>
          <div className="gold-line mx-auto mb-12" />
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRICING.map((plan, i) => (
            <FadeInSection key={plan.tier} delay={i * 0.15}>
              <div className="glass-card-gold p-8 flex flex-col h-full">
                <h3 className="text-2xl sm:text-3xl font-light mb-1">
                  {plan.tier}
                </h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl sm:text-4xl font-light text-[#C9A84C]">
                    {plan.price}
                  </span>
                  <span className="text-sm text-[#F8F5F0]/50">{plan.unit}</span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 text-sm sm:text-base text-[#F8F5F0]/70 font-light"
                    >
                      <span className="text-[#C9A84C] mt-0.5 flex-shrink-0">
                        &#x2022;
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <p className="text-xs text-[#F8F5F0]/40 mb-5">
                  {plan.capacity}
                </p>

                <a
                  href="https://wa.me/351934035971"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-4 border border-[#C9A84C]/40 text-[#C9A84C] text-sm tracking-wider rounded-lg active:bg-[#C9A84C]/10 transition-colors min-h-[48px] flex items-center justify-center"
                >
                  RESERVAR
                </a>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── CONTACT ───────────────────── */

function Contact() {
  return (
    <section
      id="reservar"
      className="py-20 sm:py-28 px-5 relative"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-xl mx-auto text-center">
        <FadeInSection>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4">
            Reservar
          </h2>
          <div className="gold-line mx-auto mb-10" />
        </FadeInSection>

        <FadeInSection delay={0.15}>
          <p className="text-[#F8F5F0]/60 font-light mb-10 text-sm sm:text-base">
            Reservas apenas por convite ou marcação
          </p>
        </FadeInSection>

        <FadeInSection delay={0.25}>
          <div className="space-y-4 mb-10">
            <a
              href="mailto:noir@descomplicai.pt"
              className="glass-card block py-4 px-6 text-center text-[#F8F5F0]/80 text-sm sm:text-base active:bg-white/5 transition-colors min-h-[48px]"
            >
              noir@descomplicai.pt
            </a>
            <a
              href="https://wa.me/351934035971"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card-gold block py-4 px-6 text-center text-[#C9A84C] text-sm sm:text-base active:bg-[#C9A84C]/5 transition-colors min-h-[48px] gold-glow"
            >
              WhatsApp — Marcar Prova
            </a>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.35}>
          <p className="text-xs sm:text-sm text-[#F8F5F0]/40 font-light">
            Disponível Quinta a Sábado &middot; Máximo 8 pessoas por sessão
          </p>
        </FadeInSection>
      </div>
    </section>
  );
}

/* ───────────────────── FOOTER ────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-5">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-4 text-center">
        <span
          className="text-xl tracking-[0.3em] text-[#F8F5F0]/60"
          style={{ fontFamily: "var(--font-cormorant), serif" }}
        >
          NOIR
        </span>
        <p className="text-xs text-[#F8F5F0]/30 font-light">
          Uma experiência Descomplicai
        </p>
        <p className="text-xs text-[#F8F5F0]/20 font-light">
          &copy; {new Date().getFullYear()} Noir Tasting. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}

/* ───────────────────── PAGE ─────────────────────── */

export default function NoirTastingPage() {
  return (
    <>
      <Particles />
      <Nav />
      <Hero />
      <AProva />
      <Vinhos />
      <Pricing />
      <Contact />
      <Footer />
    </>
  );
}
