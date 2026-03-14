"use client";

import "./editorial.css";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════ */

const navLinks = [
  { label: "Servicos", href: "#servicos" },
  { label: "Projetos", href: "#projetos" },
  { label: "Contacto", href: "#contacto" },
] as const;

const services = [
  {
    number: "01",
    title: "Presenca Digital",
    description:
      "Websites e apps que contam a historia do seu negocio. Do conceito ao lancamento.",
  },
  {
    number: "02",
    title: "Inteligencia Artificial",
    description:
      "Agentes e automacoes que trabalham pelo seu negocio. Sempre ligados, sempre a aprender.",
  },
  {
    number: "03",
    title: "Mentoria & Formacao",
    description:
      "Sessoes individuais para dominar as ferramentas do futuro. Ao seu ritmo.",
  },
];

const projects = [
  {
    title: "BFITFAM",
    category: "Fitness",
    description: "Personal training platform",
    gradient: "from-amber-200/40 via-orange-100/30 to-rose-100/20",
  },
  {
    title: "Tas-ca Dentro",
    category: "Restauracao",
    description: "Gastrobar website",
    gradient: "from-stone-200/50 via-amber-100/30 to-yellow-50/20",
  },
  {
    title: "Futuro Portfolio",
    category: "Criativo",
    description: "3D portfolio experience",
    gradient: "from-slate-200/40 via-indigo-100/20 to-violet-50/20",
  },
  {
    title: "Seeds",
    category: "Criativo",
    description: "Storytelling parallax site",
    gradient: "from-emerald-100/30 via-teal-50/20 to-lime-50/20",
  },
  {
    title: "PossiblAI",
    category: "Inteligencia Artificial",
    description: "AI charity livestream",
    gradient: "from-sky-100/30 via-blue-50/20 to-indigo-50/20",
  },
  {
    title: "Ondas Academy",
    category: "Desporto",
    description: "Surf school website",
    gradient: "from-cyan-100/30 via-sky-50/20 to-blue-50/10",
  },
];

const contactLinks = [
  {
    label: "geral@descomplicai.pt",
    href: "mailto:geral@descomplicai.pt",
  },
  {
    label: "+351 934 035 971",
    href: "https://wa.me/351934035971",
  },
  {
    label: "@descomplicai.pt",
    href: "https://instagram.com/descomplicai.pt",
  },
];

/* ═══════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════════ */

const heroFadeUp = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

const menuVariants = {
  closed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
  open: {
    height: "auto" as const,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

const contactFadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay: i * 0.12,
    },
  }),
};

const scaleIn = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay: 0.3,
    },
  },
};

/* ═══════════════════════════════════════════════════
   INLINE FONTS
   ═══════════════════════════════════════════════════ */

const displayFont = { fontFamily: "'Playfair Display', serif" };
const bodyFont = { fontFamily: "'Inter', sans-serif" };

/* ═══════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════ */

function EditorialDivider({ delay = 0 }: { delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="flex justify-center py-2">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        className="h-px w-full origin-center"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #8a8578 50%, transparent 100%)",
        }}
      />
    </div>
  );
}

function ServiceItem({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const delay = index * 0.15;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="grid grid-cols-1 gap-4 py-10 md:grid-cols-[auto_1fr] md:gap-12 md:py-14"
    >
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 0.3, y: 0 } : { opacity: 0, y: 20 }}
        transition={{
          duration: 0.9,
          delay: delay + 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="select-none leading-none"
        style={{
          ...displayFont,
          fontSize: "clamp(3rem, 8vw, 6rem)",
          color: "#8a8578",
          letterSpacing: "-0.02em",
        }}
      >
        {service.number}
      </motion.span>

      <div className="flex flex-col justify-center gap-3 md:gap-4">
        <h3
          className="leading-tight"
          style={{
            ...displayFont,
            fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
            color: "#1a1a1a",
            letterSpacing: "-0.01em",
          }}
        >
          {service.title}
        </h3>

        <p
          className="max-w-lg leading-relaxed"
          style={{
            ...bodyFont,
            fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)",
            color: "#8a8578",
            fontWeight: 300,
          }}
        >
          {service.description}
        </p>

        <motion.a
          href="#contacto"
          className="group mt-2 inline-flex items-center gap-1.5 self-start"
          style={{
            ...bodyFont,
            fontSize: "0.85rem",
            color: "#1a1a1a",
            letterSpacing: "0.04em",
            textTransform: "uppercase" as const,
            minHeight: "44px",
            display: "inline-flex",
            alignItems: "center",
          }}
          whileHover={{ x: 2 }}
          transition={{ duration: 0.2 }}
        >
          <span>Saber mais</span>
          <motion.span
            className="inline-block"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.span>
        </motion.a>
      </div>
    </motion.article>
  );
}

/* ═══════════════════════════════════════════════════
   HERO SECTION (with Nav)
   ═══════════════════════════════════════════════════ */

function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, 600], [0, -60]);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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
    <>
      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "backdrop-blur-md" : "bg-transparent"
        }`}
        style={scrolled ? { backgroundColor: "rgba(245, 240, 235, 0.8)" } : {}}
      >
        <div className="mx-auto flex items-center justify-between px-6 py-5 max-w-6xl">
          <a
            href="#"
            className="italic text-xl tracking-tight select-none"
            style={{ ...displayFont, color: "#1a1a1a" }}
          >
            descomplicai
          </a>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-light tracking-wide transition-colors duration-300 hover:text-[#1a1a1a]"
                style={{ ...bodyFont, color: "#8a8578" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden relative w-11 h-11 flex flex-col items-center justify-center gap-[7px]"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            <motion.span
              className="block w-6 h-px origin-center"
              style={{ backgroundColor: "#1a1a1a" }}
              animate={
                menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            />
            <motion.span
              className="block w-6 h-px origin-center"
              style={{ backgroundColor: "#1a1a1a" }}
              animate={
                menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="md:hidden overflow-hidden backdrop-blur-md"
              style={{ backgroundColor: "rgba(245, 240, 235, 0.95)" }}
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="flex flex-col items-center gap-8 py-12 px-6">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="italic text-2xl tracking-tight"
                    style={{ ...displayFont, color: "#1a1a1a" }}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.1 + i * 0.08, duration: 0.4 },
                    }}
                    exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO */}
      <section
        className="relative flex flex-col items-center justify-center min-h-svh px-6 overflow-hidden"
        style={{ backgroundColor: "#f5f0eb" }}
      >
        <motion.div
          className="flex flex-col items-center text-center"
          style={{ y: titleY }}
        >
          <h1 className="flex flex-col items-center leading-[1.05]">
            <motion.span
              className="italic font-normal mb-2 md:mb-3"
              style={{
                ...displayFont,
                fontSize: "clamp(1.1rem, 4vw, 1.8rem)",
                color: "#8a8578",
              }}
              variants={heroFadeUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
            >
              Construimos
            </motion.span>

            <motion.span
              className="font-medium"
              style={{
                ...displayFont,
                fontSize: "clamp(3rem, 12vw, 8rem)",
                lineHeight: 1,
                color: "#1a1a1a",
              }}
              variants={heroFadeUp}
              initial="hidden"
              animate="visible"
              custom={0.3}
            >
              o futuro
            </motion.span>

            <motion.span
              className="font-medium"
              style={{
                ...displayFont,
                fontSize: "clamp(3rem, 12vw, 8rem)",
                lineHeight: 1,
                color: "#1a1a1a",
              }}
              variants={heroFadeUp}
              initial="hidden"
              animate="visible"
              custom={0.5}
            >
              digital.
            </motion.span>
          </h1>

          <motion.p
            className="mt-8 md:mt-10 font-light max-w-md leading-relaxed"
            style={{
              ...bodyFont,
              fontSize: "clamp(0.9rem, 2.5vw, 1.05rem)",
              color: "#8a8578",
            }}
            variants={heroFadeUp}
            initial="hidden"
            animate="visible"
            custom={0.8}
          >
            Estudio de presenca digital, inteligencia artificial e mentoria para
            negocios que querem mais.
          </motion.p>

          <motion.div
            className="mt-8 md:mt-10 w-[60px] h-px"
            style={{ backgroundColor: "rgba(138, 133, 120, 0.4)" }}
            variants={heroFadeUp}
            initial="hidden"
            animate="visible"
            custom={1.0}
          />

          <motion.p
            className="mt-8 md:mt-10 font-light text-xs tracking-[0.2em] uppercase text-center leading-relaxed"
            style={{ ...bodyFont, color: "#8a8578" }}
            variants={heroFadeUp}
            initial="hidden"
            animate="visible"
            custom={1.2}
          >
            100+ projetos &middot; 7+ industrias &middot; Desde 2023
          </motion.p>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <motion.div
            className="w-px"
            style={{ backgroundColor: "rgba(138, 133, 120, 0.5)" }}
            initial={{ height: 0 }}
            animate={{ height: 40 }}
            transition={{
              delay: 2.0,
              duration: 1.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          />
        </motion.div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════════
   SERVICES SECTION
   ═══════════════════════════════════════════════════ */

function ServicesSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-50px" });

  return (
    <section
      id="servicos"
      className="px-6 py-20 md:px-12 md:py-28 lg:px-20"
      style={{ backgroundColor: "#f5f0eb" }}
    >
      <div className="mx-auto max-w-3xl">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <h2
            style={{
              ...displayFont,
              fontStyle: "italic",
              fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
              color: "#1a1a1a",
              letterSpacing: "0.02em",
            }}
          >
            Servicos
          </h2>
        </motion.div>

        <EditorialDivider delay={0.2} />

        {services.map((service, index) => (
          <div key={service.number}>
            <ServiceItem service={service} index={index} />
            {index < services.length - 1 && (
              <EditorialDivider delay={index * 0.15 + 0.3} />
            )}
          </div>
        ))}

        <EditorialDivider delay={0.6} />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   PROJECTS SECTION
   ═══════════════════════════════════════════════════ */

function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.scrollWidth / projects.length;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(index, projects.length - 1));
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section
      id="projetos"
      ref={sectionRef}
      className="py-20 md:py-32"
      style={{ backgroundColor: "#f5f0eb" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="px-6 md:px-12 lg:px-16 mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.05] tracking-[-0.02em]"
              style={{ ...displayFont, color: "#1a1a1a" }}
            >
              Trabalhos
              <br />
              <span className="italic">Selecionados</span>
            </h2>

            <div
              className="mt-6 mb-6 w-16 md:w-24"
              style={{
                height: "1px",
                backgroundColor: "#8a8578",
                opacity: 0.4,
              }}
            />

            <p
              className="text-sm md:text-base font-light tracking-wide"
              style={{ ...bodyFont, color: "#8a8578" }}
            >
              Uma selecao dos nossos projetos recentes
            </p>
          </motion.div>
        </div>

        {/* Mobile: Horizontal Scroll */}
        <div className="md:hidden">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-8 scrollbar-hide"
            style={{
              paddingLeft: "24px",
              paddingRight: "24px",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="snap-center shrink-0 group"
                style={{ minWidth: "85vw" }}
              >
                <div
                  className="relative overflow-hidden rounded-2xl h-full flex flex-col"
                  style={{
                    backgroundColor: "#ede8e2",
                    aspectRatio: "3 / 4",
                  }}
                >
                  <div
                    className={`flex-1 bg-gradient-to-br ${project.gradient} relative`}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(ellipse at 30% 40%, rgba(200, 185, 165, 0.15) 0%, transparent 70%)",
                      }}
                    />
                    <div
                      className="absolute bottom-0 left-0 right-0 h-32"
                      style={{
                        background:
                          "linear-gradient(to top, #ede8e2, transparent)",
                      }}
                    />
                  </div>

                  <div className="p-6 pt-0 relative z-10 -mt-8">
                    <p
                      className="text-[10px] uppercase tracking-[0.2em] mb-2"
                      style={{ ...bodyFont, color: "#8a8578" }}
                    >
                      {project.category}
                    </p>
                    <div className="flex items-end justify-between">
                      <h3
                        className="text-2xl font-light"
                        style={{ ...displayFont, color: "#1a1a1a" }}
                      >
                        {project.title}
                      </h3>
                      <span
                        className="text-lg mb-0.5"
                        style={{ color: "#8a8578" }}
                      >
                        &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-2">
            {projects.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to project ${i + 1}`}
                className="transition-all duration-300"
                style={{
                  width: activeIndex === i ? "20px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  backgroundColor:
                    activeIndex === i ? "#1a1a1a" : "rgba(138, 133, 120, 0.3)",
                }}
                onClick={() => {
                  const container = scrollRef.current;
                  if (!container) return;
                  const cardWidth = container.scrollWidth / projects.length;
                  container.scrollTo({
                    left: cardWidth * i,
                    behavior: "smooth",
                  });
                }}
              />
            ))}
          </div>
        </div>

        {/* Desktop: 2-Column Grid */}
        <div className="hidden md:grid grid-cols-2 gap-6 lg:gap-8 px-12 lg:px-16">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="group cursor-pointer"
              style={{
                marginTop: i % 2 === 1 ? "3rem" : "0",
              }}
            >
              <div
                className="relative overflow-hidden rounded-2xl transition-all duration-500 ease-out group-hover:-translate-y-1"
                style={{
                  backgroundColor: "#ede8e2",
                  aspectRatio: i % 3 === 0 ? "3 / 4" : "4 / 5",
                  boxShadow: "0 0 0 rgba(0,0,0,0)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 20px 60px -12px rgba(26, 26, 26, 0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 0 0 rgba(0,0,0,0)";
                }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse at 30% 40%, rgba(200, 185, 165, 0.12) 0%, transparent 70%)",
                    }}
                  />
                </div>

                <div
                  className="absolute bottom-0 left-0 right-0 h-44"
                  style={{
                    background:
                      "linear-gradient(to top, #ede8e2, transparent)",
                  }}
                />

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p
                    className="text-[10px] uppercase tracking-[0.2em] mb-3"
                    style={{ ...bodyFont, color: "#8a8578" }}
                  >
                    {project.category}
                  </p>
                  <div className="flex items-end justify-between">
                    <h3
                      className="text-2xl lg:text-3xl font-light"
                      style={{ ...displayFont, color: "#1a1a1a" }}
                    >
                      {project.title}
                    </h3>
                    <span
                      className="text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ color: "#8a8578" }}
                    >
                      &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* "Ver todos" Link */}
        <motion.div
          className="text-center mt-14 md:mt-20 px-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm tracking-wide transition-all duration-300 hover:gap-3"
            style={{
              ...bodyFont,
              color: "#1a1a1a",
              borderBottom: "1px solid rgba(26, 26, 26, 0.2)",
              paddingBottom: "4px",
            }}
          >
            Ver todos os 16 projetos
            <span className="text-base">&rarr;</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   CONTACT SECTION
   ═══════════════════════════════════════════════════ */

function ContactSection() {
  return (
    <>
      <section
        id="contacto"
        className="px-6 pt-24 pb-16 md:px-12 lg:px-24 lg:pt-36 lg:pb-24"
        style={{ backgroundColor: "#1a1a1a" }}
      >
        <div className="mx-auto max-w-3xl">
          <motion.p
            variants={contactFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={0}
            className="italic text-3xl md:text-4xl lg:text-5xl leading-tight"
            style={{ ...displayFont, color: "#8a8578" }}
          >
            Vamos
          </motion.p>

          <motion.h2
            variants={contactFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={1}
            className="text-5xl md:text-6xl lg:text-7xl leading-[1.1] mt-1"
            style={{ ...displayFont, color: "#f5f0eb" }}
          >
            conversar.
          </motion.h2>

          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mx-auto mt-12 mb-14 h-px w-[60px] origin-center md:mx-0"
            style={{ backgroundColor: "#f5f0eb" }}
          />

          <nav className="flex flex-col items-center gap-6 md:items-start">
            {contactLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={
                  link.href.startsWith("mailto")
                    ? undefined
                    : "noopener noreferrer"
                }
                variants={contactFadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                custom={i + 2}
                className="block w-full text-center md:text-left min-h-[44px] flex items-center justify-center md:justify-start font-light text-lg md:text-xl tracking-wide transition-colors duration-300 hover:text-[#f5f0eb]"
                style={{ ...bodyFont, color: "#8a8578" }}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          <motion.div
            variants={contactFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={5}
            className="mt-14 flex justify-center md:justify-start"
          >
            <a
              href="https://wa.me/351934035971"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-h-[52px] px-10 py-3 font-light text-base tracking-widest uppercase border rounded-none transition-all duration-400 hover:bg-[#f5f0eb] hover:text-[#1a1a1a]"
              style={{
                ...bodyFont,
                color: "#f5f0eb",
                borderColor: "#f5f0eb",
                transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              Iniciar conversa&ensp;&rarr;
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-6 pb-10 md:px-12 lg:px-24"
        style={{ backgroundColor: "#1a1a1a" }}
      >
        <div className="mx-auto max-w-3xl">
          <div
            className="mb-8 h-px w-full"
            style={{ backgroundColor: "#8a8578", opacity: 0.2 }}
          />

          <div className="flex flex-col items-center gap-2 text-center md:flex-row md:justify-between md:text-left">
            <p
              className="font-light text-xs tracking-wide"
              style={{ ...bodyFont, color: "#8a8578" }}
            >
              &copy; 2026 Descomplicai
            </p>
            <p
              className="font-light text-xs tracking-wide"
              style={{ ...bodyFont, color: "#8a8578" }}
            >
              Est&uacute;dio de presen&ccedil;a digital
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════ */

export default function DescomplicaiEditorialPage() {
  return (
    <div className="editorial-root">
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
