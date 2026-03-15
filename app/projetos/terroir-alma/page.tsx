"use client";

import { useState, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

/* ────────────────────────────────────────────
   Terroir & Alma — Retiros Imersivos
   ──────────────────────────────────────────── */

// ── Fade-in on scroll wrapper ──
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Data ──

const NAV_LINKS = [
  { label: "Filosofia", href: "#filosofia" },
  { label: "O Retiro", href: "#retiro" },
  { label: "Produtores", href: "#produtores" },
  { label: "Reservar", href: "#reservar" },
];

const TIMELINE = [
  {
    day: "01",
    title: "Chegada & Terra",
    text: "Chegada à quinta do produtor. Tour pelas vinhas, explicação dos solos e castas. Jantar de boas-vindas com vinhos da casa e cozinha local.",
  },
  {
    day: "02",
    title: "Trabalho & Alma",
    text: "Dia completo na adega: vindima sazonal ou trabalho de cave. Almoço nas vinhas. Tarde: masterclass privada com o enólogo. Jantar de autor.",
  },
  {
    day: "03",
    title: "Partilha & Memória",
    text: "Manhã: prova vertical de 3 colheitas. Almoço de despedida. Cada convidado leva uma garrafa assinada pelo produtor.",
  },
];

const PRODUTORES = [
  {
    name: "Ana Moreira",
    location: "Quinta da Ribeira, Douro",
    bio: "4ª geração. Vinhas velhas de 80 anos. Vinificação natural sem intervenção.",
    vinho: "Ribeira Ancestral 2019",
  },
  {
    name: "Miguel Santos",
    location: "Herdade do Monte, Alentejo",
    bio: "Ex-engenheiro que trocou Lisboa pela terra. Biodinâmico desde 2015.",
    vinho: "Monte Selvagem 2020",
  },
  {
    name: "Francisca & Tomás",
    location: "Casa da Encosta, Dão",
    bio: "Casal jovem. Castas esquecidas. Micro-produções de 500 garrafas.",
    vinho: "Encosta Secreta 2021",
  },
];

const TESTEMUNHOS = [
  {
    quote:
      "Três dias que mudaram a forma como olho para um copo de vinho.",
    author: "Inês",
    detail: "Arquiteta, Porto",
  },
  {
    quote:
      "O Miguel mostrou-nos que fazer vinho é um ato de fé. Voltámos diferentes.",
    author: "Thomas & Clara",
    detail: "Berlim",
  },
  {
    quote:
      "A Francisca tem 28 anos e faz o melhor vinho que já provei.",
    author: "Ricardo",
    detail: "Sommelier, Lisboa",
  },
];

const RETIROS = [
  {
    dates: "15–17 Abril",
    producer: "Ana Moreira",
    region: "Douro",
    price: "€890/pessoa",
  },
  {
    dates: "22–24 Maio",
    producer: "Miguel Santos",
    region: "Alentejo",
    price: "€790/pessoa",
  },
  {
    dates: "12–14 Junho",
    producer: "Francisca & Tomás",
    region: "Dão",
    price: "€850/pessoa",
  },
];

// ── Page Component ──

export default function TerroirAlmaPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const { scrollYProgress } = useScroll();
  const heroTitleY = useTransform(scrollYProgress, [0, 0.15], [0, -60]);
  const scrollIndicatorHeight = useTransform(
    scrollYProgress,
    [0, 0.08],
    ["40px", "80px"]
  );

  // Nav scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollTo = useCallback(
    (href: string) => {
      setMenuOpen(false);
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    },
    []
  );

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(
      () => setActiveTestimonial((p) => (p + 1) % TESTEMUNHOS.length),
      6000
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* ═══════ NAV ═══════ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "terroir-nav-solid" : ""
        }`}
      >
        <div className="mx-auto flex items-center justify-between px-5 py-4 max-w-6xl md:px-8">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-['Playfair_Display'] italic text-lg md:text-xl tracking-wide"
            style={{ color: "var(--charcoal)" }}
          >
            terroir &amp; alma
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-xs font-medium tracking-[0.15em] uppercase hover:opacity-60 transition-opacity"
                style={{ color: "var(--charcoal)" }}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden flex flex-col justify-center items-center w-11 h-11 gap-[5px]"
            aria-label="Menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[1.5px] origin-center"
              style={{ backgroundColor: "var(--charcoal)" }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-[1.5px]"
              style={{ backgroundColor: "var(--charcoal)" }}
            />
            <motion.span
              animate={
                menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }
              }
              className="block w-5 h-[1.5px] origin-center"
              style={{ backgroundColor: "var(--charcoal)" }}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="terroir-menu-overlay fixed inset-0 top-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
            >
              {NAV_LINKS.map((l, i) => (
                <motion.button
                  key={l.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => scrollTo(l.href)}
                  className="font-['Playfair_Display'] italic text-2xl"
                  style={{ color: "var(--charcoal)" }}
                >
                  {l.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-5 pt-20 pb-12 overflow-hidden">
        {/* Decorative sage circle */}
        <div
          className="terroir-float absolute top-16 right-6 md:top-20 md:right-16 w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full opacity-20"
          style={{ backgroundColor: "var(--sage)" }}
        />

        <motion.div
          style={{ y: heroTitleY }}
          className="text-center max-w-3xl mx-auto"
        >
          <Reveal>
            <h1 className="font-['Playfair_Display'] text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-6">
              Onde o vinho
              <br />
              <span className="italic" style={{ color: "var(--wine)" }}>
                encontra a alma
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-sm md:text-base font-light leading-relaxed max-w-md mx-auto opacity-70 mb-8">
              Retiros imersivos de 3 dias com os produtores que estão a mudar
              o vinho português
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="terroir-divider mx-auto" />
          </Reveal>

          <Reveal delay={0.35}>
            <p className="terroir-stats mt-8">
              3 DIAS · 1 PRODUTOR · 5 VINHAS · ∞ HISTÓRIAS
            </p>
          </Reveal>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{ height: scrollIndicatorHeight }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[1px] opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.2 }}
        >
          <div
            className="w-full h-full"
            style={{ backgroundColor: "var(--charcoal)" }}
          />
        </motion.div>
      </section>

      {/* ═══════ FILOSOFIA ═══════ */}
      <section id="filosofia" className="px-5 py-20 md:py-32 md:px-8">
        <div className="max-w-5xl mx-auto md:grid md:grid-cols-5 md:gap-16">
          {/* Left col */}
          <div className="md:col-span-2 mb-10 md:mb-0">
            <Reveal>
              <p className="terroir-label">A Nossa Filosofia</p>
              <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl leading-tight">
                Não vendemos vinhos.
                <br />
                <span className="italic" style={{ color: "var(--wine)" }}>
                  Vendemos encontros.
                </span>
              </h2>
            </Reveal>
          </div>

          {/* Right col */}
          <div className="md:col-span-3">
            <Reveal delay={0.1}>
              <p className="mb-6 text-sm md:text-base leading-[1.8] opacity-80">
                Acreditamos que um vinho conta uma história. E que essa
                história só se entende quando se pisa a terra de onde nasce,
                quando se olha nos olhos de quem o faz, quando se sente o
                vento que moldou as uvas.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mb-10 text-sm md:text-base leading-[1.8] opacity-80">
                Cada retiro é uma imersão total: três dias a viver com um
                produtor, a trabalhar na vinha, a cozinhar com ingredientes
                da terra, a provar vinhos que nunca chegarão às prateleiras.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <blockquote className="terroir-pullquote">
                &ldquo;Um vinho conta uma história. E essa história só se
                entende na terra.&rdquo;
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════ O RETIRO — Timeline ═══════ */}
      <section
        id="retiro"
        className="px-5 py-20 md:py-32 md:px-8"
        style={{ backgroundColor: "rgba(156,175,136,0.06)" }}
      >
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="terroir-label text-center">O Retiro</p>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-center mb-16 md:mb-24">
              Três dias que mudam{" "}
              <span className="italic" style={{ color: "var(--wine)" }}>
                tudo
              </span>
            </h2>
          </Reveal>

          <div className="space-y-16 md:space-y-0">
            {TIMELINE.map((item, i) => (
              <Reveal key={item.day} delay={i * 0.1}>
                <div
                  className={`md:grid md:grid-cols-2 md:gap-16 md:items-center ${
                    i > 0 ? "md:mt-20" : ""
                  }`}
                >
                  {/* Day number */}
                  <div
                    className={`mb-4 md:mb-0 ${
                      i % 2 === 1 ? "md:order-2" : ""
                    }`}
                  >
                    <span
                      className="font-['Playfair_Display'] text-6xl md:text-8xl font-light block"
                      style={{ color: "var(--wine)", opacity: 0.25 }}
                    >
                      {item.day}
                    </span>
                  </div>

                  {/* Content */}
                  <div className={i % 2 === 1 ? "md:order-1" : ""}>
                    <h3
                      className="font-['Playfair_Display'] italic text-xl md:text-2xl mb-3"
                      style={{ color: "var(--charcoal)" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base leading-[1.8] opacity-70">
                      {item.text}
                    </p>
                    <div className="terroir-divider terroir-divider--wine mt-6" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PRODUTORES ═══════ */}
      <section id="produtores" className="px-5 py-20 md:py-32 md:px-8">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="terroir-label text-center">Produtores</p>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-center mb-16">
              Quem faz o{" "}
              <span className="italic" style={{ color: "var(--wine)" }}>
                vinho
              </span>
            </h2>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-3">
            {PRODUTORES.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.12}>
                <div className="terroir-card rounded-sm p-6 md:p-8 h-full flex flex-col">
                  {/* Decorative gradient placeholder */}
                  <div
                    className="w-full h-40 md:h-48 rounded-sm mb-6"
                    style={{
                      background: `linear-gradient(135deg, var(--sage-light), var(--wine-light))`,
                    }}
                  />

                  <h3
                    className="font-['Playfair_Display'] text-xl mb-1"
                    style={{ color: "var(--wine)" }}
                  >
                    {p.name}
                  </h3>
                  <p
                    className="text-xs font-medium tracking-[0.12em] uppercase mb-4"
                    style={{ color: "var(--sage)" }}
                  >
                    {p.location}
                  </p>
                  <p className="text-sm leading-[1.7] opacity-70 mb-4 flex-1">
                    {p.bio}
                  </p>
                  <div className="terroir-divider" />
                  <p className="text-xs tracking-[0.08em] uppercase opacity-50">
                    Vinho signature
                  </p>
                  <p className="font-['Playfair_Display'] italic text-sm mt-1">
                    {p.vinho}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TESTEMUNHOS ═══════ */}
      <section
        className="px-5 py-20 md:py-32 md:px-8"
        style={{ backgroundColor: "rgba(156,175,136,0.06)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="terroir-label">Testemunhos</p>
          </Reveal>

          <div className="relative min-h-[200px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <p className="font-['Playfair_Display'] italic text-xl md:text-3xl leading-snug mb-6">
                  &ldquo;{TESTEMUNHOS[activeTestimonial].quote}&rdquo;
                </p>
                <p className="text-xs tracking-[0.15em] uppercase opacity-60">
                  {TESTEMUNHOS[activeTestimonial].author}
                  <span className="mx-2">·</span>
                  {TESTEMUNHOS[activeTestimonial].detail}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-1 mt-8">
            {TESTEMUNHOS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`terroir-dot ${
                  i === activeTestimonial ? "terroir-dot--active" : ""
                }`}
                aria-label={`Testemunho ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ RESERVAR / CTA ═══════ */}
      <section id="reservar" className="px-5 py-20 md:py-32 md:px-8">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="terroir-label text-center">Reservar</p>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-center mb-16">
              Próximos{" "}
              <span className="italic" style={{ color: "var(--wine)" }}>
                Retiros
              </span>
            </h2>
          </Reveal>

          <div className="space-y-4 mb-12">
            {RETIROS.map((r, i) => (
              <Reveal key={r.dates} delay={i * 0.1}>
                <div className="terroir-card rounded-sm p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-['Playfair_Display'] text-lg md:text-xl mb-1">
                      {r.dates}
                    </p>
                    <p className="text-xs tracking-[0.1em] uppercase opacity-60">
                      {r.producer}{" "}
                      <span className="mx-1">·</span>{" "}
                      <span style={{ color: "var(--sage)" }}>{r.region}</span>
                    </p>
                  </div>
                  <p
                    className="font-['Playfair_Display'] text-lg md:text-xl"
                    style={{ color: "var(--wine)" }}
                  >
                    {r.price}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <p className="text-center text-xs md:text-sm leading-relaxed opacity-60 mb-10 max-w-md mx-auto">
              Inclui: alojamento, todas as refeições, vinhos, workshops,
              garrafa assinada pelo produtor
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="text-center">
              <a
                href="https://wa.me/351934035971"
                target="_blank"
                rel="noopener noreferrer"
                className="terroir-cta inline-flex"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="shrink-0"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Reservar via WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="px-5 py-12 md:py-16 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div
            className="w-full h-[1px] mb-10 opacity-10"
            style={{ backgroundColor: "var(--charcoal)" }}
          />

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p
                className="font-['Playfair_Display'] italic text-lg mb-1"
                style={{ color: "var(--charcoal)" }}
              >
                terroir &amp; alma
              </p>
              <p className="text-xs tracking-[0.1em] uppercase opacity-40">
                Uma experiência Descomplicai
              </p>
            </div>

            <div className="flex gap-6">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className="text-xs tracking-[0.1em] uppercase opacity-50 hover:opacity-100 transition-opacity"
                  style={{ color: "var(--charcoal)" }}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <div
            className="w-full h-[1px] mt-10 opacity-10"
            style={{ backgroundColor: "var(--charcoal)" }}
          />

          <p className="text-center text-[10px] tracking-[0.15em] uppercase opacity-30 mt-6">
            &copy; 2026 Terroir &amp; Alma. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </>
  );
}
