"use client";

import "./brutalist.css";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

// ═══════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════

const NAV_LINKS = [
  { label: "SERVIÇOS", href: "#servicos" },
  { label: "PROJETOS", href: "#projetos" },
  { label: "CONTACTO", href: "#contacto" },
];

const TITLE_LINES = ["CONSTRUÍMOS", "O FUTURO", "DIGITAL."];
const SUBTITLE = "> descomplicamos tecnologia para o seu negócio_";

const STATS = [
  { value: "100+", label: "PROJETOS" },
  { value: "24/7", label: "AGENTES" },
  { value: "7+", label: "INDÚSTRIAS" },
];

const services = [
  {
    filename: "presenca-digital.exe",
    title: "Presença Digital",
    description:
      "Criamos a sua presença online do zero — design, desenvolvimento e lançamento.",
    tags: ["websites", "apps", "branding", "UI/UX", "lançamento"],
  },
  {
    filename: "ia-automacao.sh",
    title: "IA & Automação",
    description:
      "Agentes que trabalham 24/7 pelo seu negócio enquanto você descansa.",
    tags: ["chatbots", "agentes IA", "automação", "workflows", "integrações"],
  },
  {
    filename: "mentoria.cfg",
    title: "Mentoria 1:1",
    description:
      "Aprenda a usar IA no seu negócio com acompanhamento direto.",
    tags: ["formação", "IA aplicada", "tech", "1-on-1", "personalizada"],
  },
];

const projects = [
  {
    num: "01",
    title: "BFITFAM",
    category: "FITNESS",
    description: "Plataforma de treino personalizado com tracking integrado",
    emoji: "\u{1F4AA}",
    href: "#",
  },
  {
    num: "02",
    title: "Tás-cá Dentro",
    category: "RESTAURANT",
    description: "Website para gastrobar com reservas e menu digital",
    emoji: "\u{1F377}",
    href: "#",
  },
  {
    num: "03",
    title: "Futuro Portfolio",
    category: "CREATIVE",
    description: "Experiência 3D imersiva para portfólio pessoal",
    emoji: "\u{1F30D}",
    href: "#",
  },
  {
    num: "04",
    title: "Seeds",
    category: "CREATIVE",
    description: "Site parallax com storytelling visual e animações scroll",
    emoji: "\u{1F331}",
    href: "#",
  },
  {
    num: "05",
    title: "PossiblAI",
    category: "AI",
    description: "Livestream de caridade com IA generativa em tempo real",
    emoji: "\u{1F49C}",
    href: "#",
  },
  {
    num: "06",
    title: "Ondas Academy",
    category: "SPORTS",
    description: "Website para escola de surf com booking online",
    emoji: "\u{1F3C4}",
    href: "#",
  },
] as const;

const contactMethods = [
  {
    label: "> email:",
    value: "geral@descomplicai.pt",
    href: "mailto:geral@descomplicai.pt",
  },
  {
    label: "> whatsapp:",
    value: "+351 934 035 971",
    href: "https://wa.me/351934035971",
  },
  {
    label: "> instagram:",
    value: "@descomplicai.pt",
    href: "https://instagram.com/descomplicai.pt",
  },
];

// ═══════════════════════════════════════════════
// FONT STYLES
// ═══════════════════════════════════════════════

const monoFont = { fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace" };
const sansFont = { fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif" };
const displayFont = { fontFamily: "'Space Grotesk', system-ui, sans-serif" };

// ═══════════════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════════════

function useTypingEffect(text: string, speed: number, startDelay: number, enabled: boolean) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setDisplayed("");
      setDone(false);
      return;
    }

    let timeout: NodeJS.Timeout;
    let charIndex = 0;

    const delayTimeout = setTimeout(() => {
      const type = () => {
        if (charIndex <= text.length) {
          setDisplayed(text.slice(0, charIndex));
          charIndex++;
          if (charIndex <= text.length) {
            timeout = setTimeout(type, speed);
          } else {
            setDone(true);
          }
        }
      };
      type();
    }, startDelay);

    return () => {
      clearTimeout(delayTimeout);
      clearTimeout(timeout);
    };
  }, [text, speed, startDelay, enabled]);

  return { displayed, done };
}

// ═══════════════════════════════════════════════
// HERO COMPONENT (with Nav)
// ═══════════════════════════════════════════════

function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [line1Done, setLine1Done] = useState(false);
  const [line2Done, setLine2Done] = useState(false);
  const [line3Done, setLine3Done] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScrollToProjects = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("projetos");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const typing1 = useTypingEffect(TITLE_LINES[0], 60, 400, mounted);
  useEffect(() => { if (typing1.done) setLine1Done(true); }, [typing1.done]);

  const typing2 = useTypingEffect(TITLE_LINES[1], 60, 0, line1Done);
  useEffect(() => { if (typing2.done) setLine2Done(true); }, [typing2.done]);

  const typing3 = useTypingEffect(TITLE_LINES[2], 60, 0, line2Done);
  useEffect(() => { if (typing3.done) setLine3Done(true); }, [typing3.done]);

  const subtitleTyping = useTypingEffect(SUBTITLE, 30, 200, line3Done);

  return (
    <>
      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/80 backdrop-blur-md border-b border-white/10"
            : "bg-transparent border-b border-[#222]"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-5 h-14 md:h-16">
          <a
            href="/projetos/descomplicai-brutalist"
            className="text-sm md:text-base text-white tracking-wider select-none"
            style={monoFont}
            aria-label="Descomplicai - Página inicial"
          >
            DESCOMPLICAI
            <span
              className="text-white"
              style={{ animation: "blink 1s step-end infinite" }}
            >
              _
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-gray-400 tracking-widest hover:text-white transition-colors duration-200 relative group"
                style={monoFont}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </div>

          <button
            className="md:hidden flex items-center justify-center w-11 h-11 -mr-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-white" strokeWidth={1.5} />
            ) : (
              <Menu className="w-6 h-6 text-white" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-10">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl text-white tracking-[0.3em] active:text-gray-400 transition-colors min-h-[44px] flex items-center"
                  style={monoFont}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-12 text-xs text-gray-600"
              style={monoFont}
            >
              $ cd /descomplicai
              <span style={{ animation: "blink 1s step-end infinite" }}>_</span>
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <main
        className="relative flex flex-col justify-center items-start px-5 md:px-12 lg:px-20 overflow-hidden"
        style={{ minHeight: "100svh", background: "#000" }}
      >
        {/* SVG Grain Noise Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{ opacity: 0.03 }}
        >
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <filter id="grain">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.65"
                numOctaves={3}
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grain)" />
          </svg>
        </div>

        {/* Scanline Effect */}
        <div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{ overflow: "hidden" }}
        >
          <div
            className="absolute left-0 right-0 h-px bg-white/5"
            style={{
              animation: "scanline 8s linear infinite",
              boxShadow: "0 0 20px 4px rgba(255,255,255,0.02)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-5xl pt-20 md:pt-24">
          <h1 className="select-none">
            {[typing1, typing2, typing3].map((typing, i) => (
              <span
                key={i}
                className="block font-bold text-white leading-[1.05] tracking-tight"
                style={{
                  fontSize: "clamp(2rem, 8vw, 5rem)",
                  ...displayFont,
                  minHeight: "1.1em",
                }}
              >
                {typing.displayed}
                {mounted &&
                  !typing.done &&
                  typing.displayed.length > 0 && (
                    <span
                      className="text-white"
                      style={{ animation: "blink 0.7s step-end infinite" }}
                    >
                      |
                    </span>
                  )}
                {mounted &&
                  typing.displayed.length === 0 &&
                  ((i === 0 && !line1Done) ||
                    (i === 1 && line1Done && !line2Done) ||
                    (i === 2 && line2Done && !line3Done)) && (
                    <span
                      className="text-white"
                      style={{ animation: "blink 0.7s step-end infinite" }}
                    >
                      |
                    </span>
                  )}
              </span>
            ))}
          </h1>

          <div
            className="mt-5 md:mt-8 text-gray-400 text-xs md:text-sm"
            style={{ minHeight: "1.5em", ...monoFont }}
          >
            {subtitleTyping.displayed}
            {mounted && !subtitleTyping.done && line3Done && (
              <span style={{ animation: "blink 0.7s step-end infinite" }}>|</span>
            )}
            {subtitleTyping.done && (
              <span style={{ animation: "blink 1s step-end infinite" }}>_</span>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: subtitleTyping.done ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 md:mt-10"
          >
            <a
              href="#projetos"
              onClick={handleScrollToProjects}
              className="inline-flex items-center text-sm md:text-base text-gray-500 hover:text-white active:text-white transition-colors duration-200 group min-h-[44px]"
              style={monoFont}
              aria-label="Ver projetos"
            >
              <span className="text-gray-600 mr-2">$</span>
              <span className="relative">
                ver_projetos
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full group-active:w-full" />
              </span>
              <span
                className="ml-1 text-gray-600"
                style={{ animation: "blink 1s step-end infinite" }}
              >
                _
              </span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: subtitleTyping.done ? 1 : 0,
              y: subtitleTyping.done ? 0 : 20,
            }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 md:mt-16 flex flex-col md:flex-row gap-4 md:gap-12"
          >
            {STATS.map((stat, i) => (
              <div
                key={i}
                className="flex items-center gap-3 md:gap-2 text-gray-500"
                style={monoFont}
              >
                <span className="text-white text-sm md:text-base font-semibold tracking-wide">
                  {stat.value}
                </span>
                <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: subtitleTyping.done ? 1 : 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown
              className="w-5 h-5 text-gray-600"
              strokeWidth={1}
              aria-hidden="true"
            />
          </motion.div>
        </motion.div>
      </main>
    </>
  );
}

// ═══════════════════════════════════════════════
// SERVICES COMPONENT
// ═══════════════════════════════════════════════

function BlinkingUnderscore() {
  return (
    <motion.span
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.7, repeat: Infinity, repeatType: "reverse" }}
      className="inline-block"
    >
      _
    </motion.span>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isActive, setIsActive] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onHoverStart={() => setIsActive(true)}
      onHoverEnd={() => setIsActive(false)}
      onTapStart={() => setIsActive(true)}
      onTap={() => setTimeout(() => setIsActive(false), 600)}
      className="group relative"
    >
      <motion.div
        className="relative px-5 py-6 md:px-8 md:py-8"
        animate={
          isActive
            ? {
                x: [0, -2, 3, -1, 0],
                transition: { duration: 0.3 },
              }
            : {}
        }
      >
        <motion.div
          className="absolute left-0 top-0 h-full w-[2px]"
          animate={{
            backgroundColor: isActive
              ? ["#ffffff", "#a0a0a0", "#ffffff"]
              : "#ffffff",
            boxShadow: isActive
              ? [
                  "0 0 8px rgba(255,255,255,0.6)",
                  "0 0 16px rgba(255,255,255,0.9)",
                  "0 0 8px rgba(255,255,255,0.6)",
                ]
              : "0 0 0px rgba(255,255,255,0)",
          }}
          transition={{
            duration: 1,
            repeat: isActive ? Infinity : 0,
            repeatType: "reverse",
          }}
        />

        <p
          className="mb-3 text-[0.7rem] tracking-wider text-gray-500 md:text-xs"
          style={monoFont}
        >
          <span className="text-gray-600">./</span>
          {service.filename}
        </p>

        <motion.h3
          className="mb-3 text-xl font-bold tracking-tight text-white md:text-2xl"
          style={sansFont}
          animate={{ x: isActive ? 4 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {service.title}
        </motion.h3>

        <p
          className="mb-4 text-[0.8rem] leading-relaxed text-gray-400 md:text-[0.85rem]"
          style={monoFont}
        >
          {service.description}
        </p>

        <div className="mb-5 flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block border border-gray-700 bg-gray-900/50 px-2 py-1 text-[0.65rem] text-gray-400 md:text-[0.7rem]"
              style={monoFont}
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          className="flex min-h-[44px] items-center text-[0.8rem] tracking-wider text-white transition-colors hover:text-gray-300 md:text-sm"
          style={monoFont}
        >
          <span className="text-gray-500">&gt;&nbsp;</span>
          INICIAR
          <BlinkingUnderscore />
        </button>
      </motion.div>
    </motion.div>
  );
}

function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleInView = useInView(sectionRef, { once: true, margin: "-30px" });

  return (
    <section
      id="servicos"
      ref={sectionRef}
      className="relative w-full bg-black px-4 py-16 md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10 md:mb-14"
        >
          <p
            className="mb-2 text-sm text-gray-500 md:text-base"
            style={monoFont}
          >
            $ ls ./serviços/
          </p>
          <motion.div
            initial={{ width: 0 }}
            animate={titleInView ? { width: "100%" } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-[1px] bg-gray-800"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-2 text-[0.7rem] text-gray-600 md:text-xs"
            style={monoFont}
          >
            3 ficheiros encontrados
          </motion.p>
        </motion.div>

        <div className="flex flex-col">
          {services.map((service, i) => (
            <div key={service.filename}>
              <ServiceCard service={service} index={i} />
              {i < services.length - 1 && (
                <div className="mx-5 border-t border-dashed border-gray-800 md:mx-8" />
              )}
            </div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-10 text-[0.65rem] text-gray-700 md:mt-14 md:text-xs"
          style={monoFont}
        >
          <span className="text-gray-600">$</span> _
        </motion.p>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// PROJECTS COMPONENT
// ═══════════════════════════════════════════════

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
    >
      <a
        href={project.href}
        className="group relative block overflow-hidden rounded-none border border-[#1a1a1a] bg-[#0a0a0a] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white md:p-6"
      >
        <span
          className="pointer-events-none absolute right-4 top-4 select-none text-4xl opacity-[0.15] transition-opacity duration-300 group-hover:opacity-[0.25] md:text-5xl"
          aria-hidden="true"
        >
          {project.emoji}
        </span>

        <span className="text-xs text-gray-600" style={monoFont}>
          {project.num}/
        </span>

        <h3
          className="relative mt-2 text-xl font-bold tracking-tight text-white md:text-2xl"
          style={displayFont}
        >
          <span className="relative inline-block">
            {project.title}
            <span
              className="pointer-events-none absolute inset-0 hidden text-white group-hover:inline-block"
              style={{ animation: "glitch-1 0.4s linear" }}
              aria-hidden="true"
            >
              {project.title}
            </span>
            <span
              className="pointer-events-none absolute inset-0 hidden text-white group-hover:inline-block"
              style={{ animation: "glitch-2 0.4s linear" }}
              aria-hidden="true"
            >
              {project.title}
            </span>
          </span>
        </h3>

        <span
          className="mt-3 inline-block border border-[#333] px-2 py-0.5 text-[10px] uppercase tracking-widest text-gray-400"
          style={monoFont}
        >
          {project.category}
        </span>

        <p
          className="mt-3 line-clamp-1 text-xs leading-relaxed text-gray-400 md:text-sm"
          style={monoFont}
        >
          {project.description}
        </p>

        <div
          className="mt-4 flex min-h-[44px] items-center text-xs text-gray-500 transition-colors duration-200 group-hover:text-white"
          style={monoFont}
        >
          <span>$ open</span>
          <span className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-1">
            &rarr;
          </span>
        </div>
      </a>
    </motion.div>
  );
}

function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="projetos"
      ref={sectionRef}
      className="relative bg-black px-4 py-16 md:px-8 md:py-24 lg:px-16"
    >
      <div className="mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs text-gray-500 md:text-sm"
          style={monoFont}
        >
          $ find ./projetos/ -type d | head -6
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl"
          style={displayFont}
        >
          PROJETOS SELECIONADOS
        </motion.h2>

        <div className="mt-8 grid grid-cols-1 gap-3 md:mt-12 md:grid-cols-2 md:gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.num} project={project} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between md:mt-12"
        >
          <p className="text-xs text-gray-600" style={monoFont}>
            $ echo &apos;16 projetos no total&apos;
          </p>
          <a
            href="#"
            className="group inline-flex min-h-[44px] items-center text-sm text-gray-400 transition-colors duration-200 hover:text-white"
            style={monoFont}
          >
            VER TODOS
            <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// CONTACT COMPONENT
// ═══════════════════════════════════════════════

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const lineVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

function Contact() {
  return (
    <>
      <section
        id="contacto"
        className="relative bg-black px-5 pt-24 pb-16 sm:px-8 md:px-16 lg:px-24"
      >
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-sm text-gray-500 sm:text-base"
          style={monoFont}
        >
          $ ./contacto.sh
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10"
        >
          <h2
            className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl"
            style={displayFont}
          >
            VAMOS CONSTRUIR
          </h2>
          <div className="my-4 h-px w-16 bg-white" />
          <h2
            className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl"
            style={displayFont}
          >
            JUNTOS.
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mb-12 flex flex-col gap-1"
        >
          {contactMethods.map((method) => (
            <motion.a
              key={method.href}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={lineVariants}
              className="group flex min-h-[44px] w-full items-center rounded px-2 py-3 text-sm text-gray-400 transition-colors hover:bg-white/5 hover:text-white sm:text-base"
              style={monoFont}
            >
              <span className="text-gray-600">{method.label}</span>
              <span className="ml-2 text-gray-300 transition-colors group-hover:text-white">
                {method.value}
              </span>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <a
            href="https://wa.me/351934035971"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center border border-white px-6 py-3 text-sm text-white transition-colors duration-200 hover:bg-white hover:text-black sm:text-base"
            style={monoFont}
          >
            $ iniciar_conversa
          </a>
        </motion.div>
      </section>

      <footer className="border-t border-[#222] bg-black px-5 py-6 sm:px-8 md:px-16 lg:px-24">
        <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-xs text-gray-600" style={monoFont}>
            &copy; 2026 DESCOMPLICAI
          </p>
          <p className="text-xs text-gray-600" style={monoFont}>
            FEITO COM OBSESS&Atilde;O
          </p>
        </div>
      </footer>
    </>
  );
}

// ═══════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════

export default function DescomplicaiBrutalistPage() {
  return (
    <div className="brutalist-root">
      <Hero />
      <Services />
      <Projects />
      <Contact />
    </div>
  );
}
