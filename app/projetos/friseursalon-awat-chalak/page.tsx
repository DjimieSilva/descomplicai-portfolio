"use client";

import { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   LANGUAGE SYSTEM
   ═══════════════════════════════════════════════════════════ */

type Lang = "de" | "en";

interface LanguageContextType {
  lang: Lang;
  toggle: () => void;
  t: (deOrObj: string | { de: string; en: string }, en?: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "de",
  toggle: () => {},
  t: (deOrObj) => (typeof deOrObj === "string" ? deOrObj : deOrObj.de),
});

function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("de");
  const toggle = () => setLang((l) => (l === "de" ? "en" : "de"));
  const t = (deOrObj: string | { de: string; en: string }, en?: string) => {
    if (typeof deOrObj === "object") return lang === "de" ? deOrObj.de : deOrObj.en;
    return lang === "de" ? deOrObj : (en ?? deOrObj);
  };
  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

function useLanguage() {
  return useContext(LanguageContext);
}

/* ═══════════════════════════════════════════════════════════
   LENIS PROVIDER
   ═══════════════════════════════════════════════════════════ */

function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as unknown as gsap.TickerCallback);
    };
  }, []);

  return <>{children}</>;
}

/* ═══════════════════════════════════════════════════════════
   GRAIN OVERLAY
   ═══════════════════════════════════════════════════════════ */

function GrainOverlay() {
  return <div className="awat-grain-overlay" aria-hidden="true" />;
}

/* ═══════════════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════════════ */

const navLinks = [
  { de: "Leistungen", en: "Services", href: "#servicos" },
  { de: "Team", en: "Team", href: "#equipa" },
  { de: "Galerie", en: "Gallery", href: "#galeria" },
  { de: "Termin", en: "Book", href: "#marcar" },
];

function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggle, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 1.5, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 opacity-0 ${
        scrolled
          ? "bg-[#1C1C1C]/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <a
          href="#"
          className="font-[var(--awat-font-heading)] text-2xl lg:text-3xl tracking-[0.2em] text-[#F5F5F0] hover:text-[#C17F59] transition-colors"
        >
          {"AWAT & CHALAK".split("").map((letter, i) => (
            <span
              key={i}
              className="inline-block transition-transform duration-300 hover:text-[#C17F59]"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-[var(--awat-font-body)] text-sm tracking-widest uppercase text-[#F5F5F0]/70 hover:text-[#C17F59] transition-colors duration-300"
            >
              {t(link.de, link.en)}
            </a>
          ))}
          <button
            type="button"
            onClick={toggle}
            className="ml-2 px-3 py-1 rounded-full border border-[#C17F59]/40 font-[var(--awat-font-body)] text-xs tracking-widest uppercase text-[#F5F5F0]/70 hover:text-[#C17F59] hover:border-[#C17F59] transition-all duration-300"
          >
            {lang === "de" ? "EN" : "DE"}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span
            className={`block w-6 h-0.5 bg-[#F5F5F0] transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#F5F5F0] transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#F5F5F0] transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#1C1C1C]/98 backdrop-blur-md transition-all duration-500 overflow-hidden ${
          menuOpen ? "max-h-80 border-b border-[#C17F59]/20" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center py-6 gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-[var(--awat-font-body)] text-sm tracking-widest uppercase text-[#F5F5F0]/70 hover:text-[#C17F59] transition-colors"
            >
              {t(link.de, link.en)}
            </a>
          ))}
          <button
            type="button"
            onClick={toggle}
            className="px-3 py-1 rounded-full border border-[#C17F59]/40 font-[var(--awat-font-body)] text-xs tracking-widest uppercase text-[#F5F5F0]/70 hover:text-[#C17F59] hover:border-[#C17F59] transition-all duration-300"
          >
            {lang === "de" ? "EN" : "DE"}
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════ */

const TITLE = "AWAT & CHALAK";

function Hero() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(lettersRef.current.filter(Boolean), {
        opacity: 0,
        y: 60,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.3,
      });

      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 1.2,
        ease: "power2.out",
      });

      gsap.from(scrollHintRef.current, {
        opacity: 0,
        duration: 1,
        delay: 2,
      });

      gsap.to(scrollHintRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "power1.inOut",
        delay: 2,
      });

      const splitTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=60%",
          scrub: 1,
          pin: true,
          pinSpacing: true,
        },
      });

      splitTl.to(leftPanelRef.current, { xPercent: -100, ease: "none" }, 0);
      splitTl.to(rightPanelRef.current, { xPercent: 100, ease: "none" }, 0);

      splitTl.to(
        [...lettersRef.current.filter(Boolean), subtitleRef.current, scrollHintRef.current],
        { opacity: 0, duration: 0.3 },
        0
      );

      gsap.to(videoContainerRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      <div ref={videoContainerRef} className="absolute inset-0 w-full h-full">
        <img
          src="/awat-chalak/hero1.jpg"
          alt="Friseursalon Awat & Chalak"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        />
        {/* Dark overlay for text readability */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(28,28,28,0.6) 0%, rgba(28,28,28,0.8) 100%)",
          zIndex: 1,
        }} />
      </div>

      <div ref={leftPanelRef} className="absolute inset-y-0 left-0 w-1/2 z-20 bg-[#1C1C1C]">
        <div className="absolute top-0 right-0 w-px h-full bg-[#C17F59]/30" />
      </div>

      <div ref={rightPanelRef} className="absolute inset-y-0 right-0 w-1/2 z-20 bg-[#1C1C1C]">
        <div className="absolute top-0 left-0 w-px h-full bg-[#C17F59]/30" />
      </div>

      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none">
        <h1 className="flex items-center justify-center flex-wrap">
          {TITLE.split("").map((letter, i) => (
            <span
              key={i}
              ref={(el) => { lettersRef.current[i] = el; }}
              className={`font-[var(--awat-font-heading)] text-[3rem] sm:text-[5rem] md:text-[8rem] lg:text-[10rem] leading-none tracking-[0.1em] text-[#F5F5F0] select-none inline-block ${letter === " " ? "w-[0.3em]" : ""}`}
              style={{ textShadow: "0 0 80px rgba(193,127,89,0.3)" }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </h1>

        <p
          ref={subtitleRef}
          className="mt-4 md:mt-6 font-[var(--awat-font-body)] text-sm md:text-base tracking-[0.3em] uppercase text-[#F5F5F0]/70"
        >
          {t("Ihr Friseur in Heilbronn seit 2007", "Your barber in Heilbronn since 2007")}
        </p>

        <div ref={scrollHintRef} className="absolute bottom-10 flex flex-col items-center gap-2">
          <span className="font-[var(--awat-font-body)] text-xs tracking-widest uppercase text-[#F5F5F0]/40">
            {t("Entdecken", "Discover")}
          </span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[#C17F59]/60">
            <path d="M10 4v12M4 12l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SERVICES
   ═══════════════════════════════════════════════════════════ */

const services = [
  { name: { de: "Herrenhaarschnitt", en: "Men's Haircut" }, price: "ab \u20AC13", desc: { de: "Pr\u00E4ziser Schnitt mit Maschine oder Schere", en: "Precise cut with machine or scissors" }, icon: "scissors" },
  { name: { de: "Bartrasur", en: "Beard Shave" }, price: "\u20AC10", desc: { de: "Traditionelle Rasur mit hei\u00DFem Handtuch", en: "Traditional shave with hot towel" }, icon: "razor" },
  { name: { de: "Waschen & Schneiden", en: "Wash & Cut" }, price: "\u20AC16", desc: { de: "Haarw\u00E4sche und professioneller Schnitt", en: "Hair wash and professional cut" }, icon: "wash" },
  { name: { de: "Augenbrauen", en: "Eyebrows" }, price: "\u20AC7", desc: { de: "Perfekt geformte Augenbrauen", en: "Perfectly shaped eyebrows" }, icon: "eyebrow" },
  { name: { de: "Premium Styling", en: "Premium Styling" }, price: "ab \u20AC25", desc: { de: "F\u00E4rben, Str\u00E4hnchen und individuelles Styling", en: "Coloring, highlights and custom styling" }, icon: "style" },
];

function ServiceIcon({ type }: { type: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    scissors: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M10 10l20 20M30 10L10 30M8 8a4 4 0 110-8 4 4 0 010 8zM8 40a4 4 0 110-8 4 4 0 010 8z" stroke="#C17F59" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    razor: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="8" y="12" width="24" height="16" rx="2" stroke="#C17F59" strokeWidth="1.5" />
        <line x1="20" y1="12" x2="20" y2="28" stroke="#C17F59" strokeWidth="1.5" />
      </svg>
    ),
    wash: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M10 28c2-4 4-8 10-8s8 4 10 8" stroke="#C17F59" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 14c0-3 3-6 6-6s6 3 6 6" stroke="#C17F59" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M20 20v-6" stroke="#C17F59" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="32" r="1.5" fill="#C17F59" />
        <circle cx="24" cy="32" r="1.5" fill="#C17F59" />
      </svg>
    ),
    eyebrow: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M8 18c4-6 12-8 24-4" stroke="#C17F59" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="20" cy="24" r="3" stroke="#C17F59" strokeWidth="1.5" />
        <circle cx="20" cy="24" r="1" fill="#C17F59" />
      </svg>
    ),
    style: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M20 6l4 8 9 1.5-6.5 6.5L28 31l-8-4-8 4 1.5-9L7 15.5 16 14l4-8z" stroke="#C17F59" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  };

  return <div className="mb-6">{iconMap[type] || iconMap.scissors}</div>;
}

function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      gsap.from(titleRef.current, {
        opacity: 0,
        y: 40,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      });

      const getScrollAmount = () => {
        return -(track.scrollWidth - window.innerWidth);
      };

      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          scale: 0.9,
          opacity: 0.5,
          y: 30,
          duration: 0.6,
          delay: i * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="servicos" className="relative overflow-hidden">
      <div className="pt-20 pb-12 px-6 lg:px-16">
        <h2
          ref={titleRef}
          className="font-[var(--awat-font-heading)] text-5xl md:text-7xl lg:text-8xl tracking-[0.1em] text-[#F5F5F0] text-center"
        >
          {t("LEISTUNGEN", "SERVICES")}
        </h2>
        <div className="w-24 h-px bg-[#C17F59] mx-auto mt-6" />
      </div>

      <div
        ref={trackRef}
        className="flex items-stretch gap-8 pl-8 lg:pl-16 pr-[40vw] pb-20 pt-8"
      >
        {services.map((service, i) => (
          <div
            key={service.name.de}
            ref={(el) => { cardsRef.current[i] = el; }}
            className="group relative flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[30vw] min-h-[400px] bg-[#2D2D2D] border border-[#C17F59]/20 rounded-sm p-8 lg:p-10 flex flex-col justify-between transition-all duration-500 hover:border-[#C17F59]/60 hover:shadow-[0_0_40px_rgba(193,127,89,0.15)]"
          >
            <span className="absolute top-6 right-6 font-[var(--awat-font-heading)] text-6xl text-[#C17F59]/10 select-none">
              0{i + 1}
            </span>

            <div>
              <ServiceIcon type={service.icon} />
              <h3 className="font-[var(--awat-font-heading)] text-3xl md:text-4xl tracking-[0.1em] text-[#F5F5F0] mb-4">
                {t(service.name.de, service.name.en)}
              </h3>
              <p className="font-[var(--awat-font-body)] text-[#F5F5F0]/60 text-base leading-relaxed max-w-xs">
                {t(service.desc.de, service.desc.en)}
              </p>
            </div>

            <div className="mt-8 flex items-end justify-between">
              <span className="font-[var(--awat-font-heading)] text-5xl md:text-6xl text-[#C17F59]">
                {service.price}
              </span>
              <div className="w-12 h-px bg-[#C17F59]/40 group-hover:w-20 transition-all duration-500" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   BARBERS
   ═══════════════════════════════════════════════════════════ */

const barbers = [
  {
    name: "Awat",
    image: "/awat-chalak/barber-awat.jpg",
    role: { de: "Inhaber & Friseur", en: "Owner & Barber" },
    description: {
      de: "Awat gr\u00FCndete den Salon 2007 in Heilbronn. Seine Leidenschaft f\u00FCr klassische Herrenhaarschnitte und Bartpflege hat den Salon zu einer festen Gr\u00F6\u00DFe in der Stadt gemacht.",
      en: "Awat founded the salon in 2007 in Heilbronn. His passion for classic men's haircuts and beard care has made the salon a fixture in the city.",
    },
  },
  {
    name: "Chalak",
    image: "/awat-chalak/barber-chalak.jpg",
    role: { de: "Meisterfriseur", en: "Master Barber" },
    description: {
      de: "Mit \u00FCber 15 Jahren Erfahrung ist Chalak Spezialist f\u00FCr kreative Frisuren, Flechtarbeiten und moderne Schnitte. Seine Pr\u00E4zision und Kreativit\u00E4t machen jeden Besuch einzigartig.",
      en: "With over 15 years of experience, Chalak specializes in creative hairstyles, braiding and modern cuts. His precision and creativity make every visit unique.",
    },
  },
];

function Barbers() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const profilesRef = useRef<(HTMLDivElement | null)[]>([]);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          end: "top 60%",
          scrub: 1,
        },
      });

      profilesRef.current.forEach((profile, i) => {
        if (!profile) return;

        const image = imagesRef.current[i];
        const line = linesRef.current[i];

        if (image) {
          gsap.fromTo(
            image,
            { y: -80 },
            {
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: profile,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        const textElements = profile.querySelectorAll(".barber-text");
        gsap.from(textElements, {
          x: 100,
          opacity: 0,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: profile,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });

        if (line) {
          gsap.from(line, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: profile,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="equipa" className="relative py-24 md:py-32 lg:py-40 bg-[#1C1C1C]">
      <div className="text-center mb-16 md:mb-24 px-6">
        <h2
          ref={titleRef}
          className="font-[var(--awat-font-heading)] text-5xl md:text-7xl lg:text-8xl tracking-[0.1em] text-[#F5F5F0]"
        >
          {t({ de: "UNSER TEAM", en: "OUR TEAM" })}
        </h2>
        <div className="w-24 h-px bg-[#C17F59] mx-auto mt-6" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-24 md:space-y-32">
        {barbers.map((barber, i) => (
          <div
            key={barber.name}
            ref={(el) => { profilesRef.current[i] = el; }}
            className={`flex flex-col gap-8 lg:gap-12 ${
              i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } items-center`}
          >
            <div className="relative w-full lg:w-1/2 overflow-hidden">
              <div
                ref={(el) => { imagesRef.current[i] = el; }}
                className="w-full aspect-[3/4] rounded-sm relative overflow-hidden"
              >
                <img
                  src={barber.image}
                  alt={barber.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-[#C17F59]/40" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-[#C17F59]/40" />
              </div>
            </div>

            <div className={`w-full lg:w-1/2 ${i % 2 === 0 ? "lg:pl-8" : "lg:pr-8"}`}>
              <p className="barber-text font-[var(--awat-font-body)] text-[#C17F59] text-sm tracking-[0.3em] uppercase mb-3">
                {t(barber.role)}
              </p>
              <h3 className="barber-text font-[var(--awat-font-heading)] text-4xl md:text-5xl lg:text-6xl tracking-[0.1em] text-[#F5F5F0] mb-6">
                {barber.name}
              </h3>
              <div
                ref={(el) => { linesRef.current[i] = el; }}
                className="w-16 h-px bg-[#C17F59] mb-6"
              />
              <p className="barber-text font-[var(--awat-font-body)] text-[#F5F5F0]/60 text-lg leading-relaxed max-w-md">
                {t(barber.description)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   GALLERY
   ═══════════════════════════════════════════════════════════ */

const galleryItems = [
  { image: "/awat-chalak/gallery-1.jpg", label: { de: "Lockenschnitt", en: "Curly Cut" }, span: "row" },
  { image: "/awat-chalak/gallery-2.jpg", label: { de: "Fade Schnitt", en: "Fade Cut" }, span: "col" },
  { image: "/awat-chalak/gallery-3.jpg", label: { de: "Clean Fade", en: "Clean Fade" }, span: "normal" },
  { image: "/awat-chalak/gallery-4.jpg", label: { de: "Flechtfrisur", en: "Braided Style" }, span: "col" },
  { image: "/awat-chalak/gallery-5.jpg", label: { de: "Bartpflege", en: "Beard Grooming" }, span: "normal" },
  { image: "/awat-chalak/gallery-6.jpg", label: { de: "Pr\u00E4zisionsschnitt", en: "Precision Cut" }, span: "row" },
  { image: "/awat-chalak/gallery-7.jpg", label: { de: "Moderner Stil", en: "Modern Style" }, span: "normal" },
];

function getSpanClass(span: string) {
  switch (span) {
    case "row": return "col-span-1 sm:col-span-2 row-span-1";
    case "col": return "col-span-1 row-span-2";
    default: return "col-span-1 row-span-1";
  }
}

function Gallery() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          end: "top 60%",
          scrub: 1,
        },
      });

      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.from(item, {
          scale: 0.85,
          opacity: 0,
          rotation: 2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="galeria" className="relative py-24 md:py-32 lg:py-40 bg-[#2D2D2D]">
      <div className="text-center mb-16 md:mb-24 px-6">
        <h2
          ref={titleRef}
          className="font-[var(--awat-font-heading)] text-5xl md:text-7xl lg:text-8xl tracking-[0.1em] text-[#F5F5F0]"
        >
          {t({ de: "GALERIE", en: "GALLERY" })}
        </h2>
        <div className="w-24 h-px bg-[#C17F59] mx-auto mt-6" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]">
          {galleryItems.map((item, i) => (
            <div
              key={t(item.label)}
              ref={(el) => { itemsRef.current[i] = el; }}
              className={`${getSpanClass(item.span)} group relative overflow-hidden rounded-sm cursor-pointer`}
            >
              <img
                src={item.image}
                alt={t(item.label)}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#C17F59]/50 transition-colors duration-500 rounded-sm z-10" />
              <div className="absolute inset-0 flex items-end p-6 z-20">
                <span className="font-[var(--awat-font-body)] text-sm tracking-widest uppercase text-[#F5F5F0]/0 group-hover:text-[#F5F5F0]/80 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  {t(item.label)}
                </span>
              </div>
              <div className="absolute top-4 right-4 z-10">
                <span className="font-[var(--awat-font-heading)] text-3xl text-[#F5F5F0]/5 group-hover:text-[#F5F5F0]/10 transition-colors duration-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   BOOK NOW
   ═══════════════════════════════════════════════════════════ */

function BookNow() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".awat-book-content > *", {
        y: 40, opacity: 0, duration: 0.8,
        stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="marcar" style={{
      background: "#1C1C1C",
      padding: "120px 24px",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: 80, height: 2, background: "linear-gradient(90deg, transparent, #C17F59, transparent)",
      }} />

      <div className="awat-book-content" style={{
        maxWidth: 800, margin: "0 auto", textAlign: "center",
      }}>
        <h2 style={{
          fontFamily: "var(--awat-font-heading)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
          color: "#F5F5F0", letterSpacing: "0.05em", marginBottom: 16,
        }}>
          {t("TERMIN VEREINBAREN", "BOOK YOUR APPOINTMENT")}
        </h2>

        <p style={{
          color: "#C17F59", fontSize: "1.1rem", marginBottom: 48,
          maxWidth: 500, margin: "0 auto 48px",
        }}>
          {t("Kein Termin n\u00F6tig \u2014 einfach vorbeikommen. Oder rufen Sie uns an.", "No appointment needed \u2014 just walk in. Or give us a call.")}
        </p>

        <div className="awat-hours-grid">
          <div style={{
            background: "rgba(193,127,89,0.08)", borderRadius: 12, padding: "20px 16px",
            border: "1px solid rgba(193,127,89,0.15)",
          }}>
            <p style={{ color: "#C17F59", fontSize: 13, letterSpacing: "0.1em", marginBottom: 8 }}>
              {t("MO \u2014 FR", "MON \u2014 FRI")}
            </p>
            <p style={{ color: "#F5F5F0", fontFamily: "var(--awat-font-heading)", fontSize: "1.5rem" }}>
              10:00 \u2014 19:00
            </p>
          </div>
          <div style={{
            background: "rgba(193,127,89,0.08)", borderRadius: 12, padding: "20px 16px",
            border: "1px solid rgba(193,127,89,0.15)",
          }}>
            <p style={{ color: "#C17F59", fontSize: 13, letterSpacing: "0.1em", marginBottom: 8 }}>
              {t("SAMSTAG", "SATURDAY")}
            </p>
            <p style={{ color: "#F5F5F0", fontFamily: "var(--awat-font-heading)", fontSize: "1.5rem" }}>
              10:00 \u2014 18:00
            </p>
          </div>
        </div>

        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 16, marginBottom: 48,
        }}>
          <a href="tel:+4971312066991" style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            background: "#C17F59", color: "#1C1C1C", padding: "16px 40px",
            borderRadius: 8, fontFamily: "var(--awat-font-heading)", fontSize: "1.2rem",
            letterSpacing: "0.05em", textDecoration: "none",
            transition: "transform 0.3s, box-shadow 0.3s",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(193,127,89,0.3)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            {t("JETZT ANRUFEN", "CALL NOW")}
          </a>

          <a href="https://wa.me/4917662095949" target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            border: "1px solid rgba(193,127,89,0.4)", color: "#C17F59",
            padding: "14px 36px", borderRadius: 8,
            fontFamily: "var(--awat-font-heading)", fontSize: "1.1rem",
            letterSpacing: "0.05em", textDecoration: "none",
            transition: "all 0.3s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(193,127,89,0.1)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = ""; }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.124 1.526 5.857L0 24l6.335-1.652A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-1.875 0-3.63-.507-5.143-1.387l-.363-.217-3.764.987.999-3.657-.239-.379A9.709 9.709 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>
            WHATSAPP
          </a>
        </div>

        <a href="https://maps.google.com/?q=Allee+64+74072+Heilbronn" target="_blank" rel="noopener noreferrer" style={{
          color: "rgba(245,245,240,0.5)", fontSize: "0.9rem", textDecoration: "none",
          transition: "color 0.3s", display: "block",
        }}
        onMouseEnter={e => e.currentTarget.style.color = "#C17F59"}
        onMouseLeave={e => e.currentTarget.style.color = "rgba(245,245,240,0.5)"}
        >
          Allee 64, 74072 Heilbronn
        </a>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════ */

function Footer() {
  const { t } = useLanguage();
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(footerRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#1C1C1C] border-t border-[#C17F59]/10 py-12 md:py-16"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          <span className="font-[var(--awat-font-heading)] text-xl tracking-[0.2em] text-[#F5F5F0]/60">
            AWAT & CHALAK
          </span>

          <p className="font-[var(--awat-font-body)] text-[#F5F5F0]/30 text-sm tracking-wide italic">
            {t("Ihr Stil. Unser Handwerk.", "Your style. Our craft.")}
          </p>

          <div className="flex items-center gap-6 flex-wrap justify-center">
            <a
              href="https://www.instagram.com/awat_und_chalak_friseursalon"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#F5F5F0]/40 hover:text-[#C17F59] transition-colors duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
              <span className="font-[var(--awat-font-body)] text-sm tracking-wide">
                @awat_und_chalak_friseursalon
              </span>
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=100052215741641"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#F5F5F0]/40 hover:text-[#C17F59] transition-colors duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <span className="font-[var(--awat-font-body)] text-sm tracking-wide">Facebook</span>
            </a>

            <a
              href="https://www.tiktok.com/@friseur_awat_chalak"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#F5F5F0]/40 hover:text-[#C17F59] transition-colors duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.83 4.83 0 0 1-1-.15z" />
              </svg>
              <span className="font-[var(--awat-font-body)] text-sm tracking-wide">TikTok</span>
            </a>
          </div>

          <div className="w-12 h-px bg-[#C17F59]/20 mt-2" />

          <p className="font-[var(--awat-font-body)] text-[#F5F5F0]/20 text-xs tracking-wide">
            {t("\u00A9 2026 Awat & Chalak. Alle Rechte vorbehalten.", "\u00A9 2026 Awat & Chalak. All rights reserved.")}
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════ */

export default function FriseursalonAwatChalakPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto:wght@300;400;500;700&display=swap');

        :root {
          --awat-font-heading: 'Bebas Neue', sans-serif;
          --awat-font-body: 'Roboto', sans-serif;
        }

        /* Scope styles to this page */
        .awat-page {
          background-color: #1C1C1C;
          color: #F5F5F0;
          font-family: var(--awat-font-body), sans-serif;
          overflow-x: hidden;
        }

        /* Lenis smooth scroll */
        html.lenis, html.lenis body {
          height: auto;
        }

        .lenis.lenis-smooth {
          scroll-behavior: auto !important;
        }

        .lenis.lenis-smooth [data-lenis-prevent] {
          overscroll-behavior: contain;
        }

        .lenis.lenis-stopped {
          overflow: hidden;
        }

        .lenis.lenis-scrolling iframe {
          pointer-events: none;
        }

        /* Grain overlay */
        .awat-grain-overlay {
          position: fixed;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          z-index: 9999;
          pointer-events: none;
          opacity: 0.04;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 128px 128px;
        }

        /* Selection color */
        .awat-page ::selection {
          background-color: #C17F59;
          color: #1C1C1C;
        }

        /* Scrollbar styling */
        .awat-page ::-webkit-scrollbar {
          width: 6px;
        }

        .awat-page ::-webkit-scrollbar-track {
          background: #1C1C1C;
        }

        .awat-page ::-webkit-scrollbar-thumb {
          background: #C17F59;
          border-radius: 3px;
        }

        .awat-page ::-webkit-scrollbar-thumb:hover {
          background: #8B5E3C;
        }

        /* Hide horizontal scrollbar */
        .awat-page .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .awat-page .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        /* BookNow hours grid responsive */
        .awat-hours-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          max-width: 400px;
          margin: 0 auto 48px;
        }
        @media (max-width: 400px) {
          .awat-hours-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="awat-page">
        <LanguageProvider>
          <LenisProvider>
            <GrainOverlay />
            <Navbar />
            <Hero />
            <Services />
            <Barbers />
            <Gallery />
            <BookNow />
            <Footer />
          </LenisProvider>
        </LanguageProvider>
      </div>
    </>
  );
}
