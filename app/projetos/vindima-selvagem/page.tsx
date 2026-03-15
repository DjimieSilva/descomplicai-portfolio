"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ─── Data ─── */

const NAV_LINKS = [
  { label: "A Experiência", href: "#experiencia" },
  { label: "Galeria", href: "#inclui" },
  { label: "Reservar", href: "#reservar" },
];

const TIMELINE = [
  {
    time: "08:00",
    title: "Chegada à Quinta & Boas-vindas",
    desc: "Recepção com um copo de espumante na varanda com vista para o Douro.",
    emoji: "🥂",
  },
  {
    time: "09:30",
    title: "Vindima nas Vinhas",
    desc: "Apanha de uvas lado a lado com os vindimadores, aprendendo sobre castas e terroir.",
    emoji: "🍇",
  },
  {
    time: "12:30",
    title: "Almoço Regional",
    desc: "Mesa posta entre as vinhas com pratos tradicionais e vinhos da casa.",
    emoji: "🍽️",
  },
  {
    time: "14:30",
    title: "Pisa a Pé",
    desc: "A tradição milenar de pisar as uvas no lagar de granito, ao som de música popular.",
    emoji: "🦶",
  },
  {
    time: "16:00",
    title: "Prova de Vinhos",
    desc: "Degustação guiada de 5 vinhos DOC Douro com o enólogo da quinta.",
    emoji: "🍷",
  },
  {
    time: "18:00",
    title: "Pôr-do-Sol no Terraço",
    desc: "Encerramento com um copo de vinho do Porto e a paisagem dourada do vale.",
    emoji: "🌅",
  },
];

const FEATURES = [
  { emoji: "🚌", title: "Transporte desde o Porto" },
  { emoji: "👨‍🌾", title: "Vindima guiada por enólogo" },
  { emoji: "🥘", title: "Almoço regional completo" },
  { emoji: "🍷", title: "Prova de 5 vinhos DOC Douro" },
  { emoji: "🏷️", title: "Garrafa personalizada para levar" },
  { emoji: "📸", title: "Fotografias profissionais" },
];

const TESTIMONIALS = [
  {
    quote: "Foi a experiência mais autêntica que tivemos em Portugal.",
    author: "Maria & João, Lisboa",
  },
  {
    quote: "Os miúdos adoraram pisar as uvas! Memórias para a vida.",
    author: "Sophie, Paris",
  },
  {
    quote: "O almoço na vinha foi de outro mundo. Voltaremos!",
    author: "Carlos, São Paulo",
  },
];

/* ─── Helpers ─── */

function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Page ─── */

export default function VindimaSelvagem() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ────── NAV ────── */}
      <nav className={`vindima-nav ${scrolled ? "scrolled" : ""}`}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <a
            href="#"
            className="vindima-nav-logo"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Vindima Selvagem
          </a>

          {/* Desktop links */}
          <div
            style={{ display: "flex", gap: 24, alignItems: "center" }}
            className="hidden md:flex"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="vindima-nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Hamburger */}
          <button
            className={`vindima-hamburger md:hidden ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="vindima-mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ────── HERO ────── */}
      <section className="vindima-hero">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Colha as suas próprias uvas no coração do Douro
        </motion.h1>

        <motion.p
          className="vindima-hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Uma experiência autêntica de vindima tradicional
        </motion.p>

        <motion.div
          className="vindima-hero-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <span>6h de experiência</span>
          <span>·</span>
          <span>Até 12 pessoas</span>
          <span>·</span>
          <span>Set — Nov</span>
        </motion.div>

        <div className="vindima-scroll-indicator">
          <span>Explorar</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M10 4 L10 16 M5 11 L10 16 L15 11" />
          </svg>
        </div>
      </section>

      {/* ────── A EXPERIÊNCIA (Timeline) ────── */}
      <section id="experiencia">
        <FadeIn>
          <h2 className="vindima-section-title">
            A <span>Experiência</span>
          </h2>
        </FadeIn>

        <div className="vindima-timeline">
          {TIMELINE.map((item, i) => (
            <FadeIn key={item.time} delay={i * 0.1}>
              <div className="vindima-timeline-item">
                <div className="vindima-timeline-dot" />
                <div className="vindima-timeline-time">
                  {item.emoji} {item.time}
                </div>
                <div className="vindima-timeline-title">{item.title}</div>
                <div className="vindima-timeline-desc">{item.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ────── O QUE INCLUI ────── */}
      <section
        id="inclui"
        style={{ background: "white" }}
      >
        <FadeIn>
          <h2 className="vindima-section-title">
            O que <span>Inclui</span>
          </h2>
        </FadeIn>

        <div className="vindima-features-grid">
          {FEATURES.map((feat, i) => (
            <FadeIn key={feat.title} delay={i * 0.08}>
              <div className="vindima-feature-card">
                <span className="vindima-feature-card-emoji">{feat.emoji}</span>
                <span className="vindima-feature-card-title">{feat.title}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ────── TESTEMUNHOS ────── */}
      <section className="vindima-testimonials">
        <FadeIn>
          <h2 className="vindima-section-title">
            O que <span>Dizem</span>
          </h2>
        </FadeIn>

        <div style={{ position: "relative", minHeight: 200 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              className="vindima-testimonial-card"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <p className="vindima-testimonial-quote">
                {TESTIMONIALS[activeTestimonial].quote}
              </p>
              <p className="vindima-testimonial-author">
                — {TESTIMONIALS[activeTestimonial].author}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="vindima-dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={`vindima-dot ${i === activeTestimonial ? "active" : ""}`}
              onClick={() => setActiveTestimonial(i)}
              aria-label={`Testemunho ${i + 1}`}
            >
              <span />
            </button>
          ))}
        </div>
      </section>

      {/* ────── RESERVAR / CTA ────── */}
      <section id="reservar" className="vindima-cta">
        <FadeIn>
          <h2 className="vindima-section-title">
            Reserve a sua <span>Vindima</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="vindima-price">A partir de €89/pessoa</div>
          <p className="vindima-price-note">
            Grupos de 4-12 pessoas · Setembro a Novembro
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <a
            href="https://wa.me/351934035971"
            target="_blank"
            rel="noopener noreferrer"
            className="vindima-whatsapp-btn"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Reservar via WhatsApp
          </a>
        </FadeIn>
      </section>

      {/* ────── FOOTER ────── */}
      <footer className="vindima-footer">
        <div className="vindima-footer-logo">Vindima Selvagem</div>
        <p>Uma experiência Descomplicai</p>
        <p style={{ marginTop: 16 }}>
          &copy; {new Date().getFullYear()} Vindima Selvagem. Todos os direitos
          reservados.
        </p>
      </footer>
    </>
  );
}
