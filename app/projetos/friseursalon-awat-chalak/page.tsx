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
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-14 lg:h-20">
        {/* Logo */}
        <a
          href="#"
          className="font-[var(--awat-font-heading)] text-base sm:text-xl lg:text-3xl tracking-[0.1em] lg:tracking-[0.2em] text-[#F5F5F0] hover:text-[#C17F59] transition-colors"
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

  return (
    <section className="relative min-h-[80svh] sm:min-h-svh h-screen w-full overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
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

      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center pointer-events-none">
        <h1 className="flex items-center justify-center flex-wrap">
          {TITLE.split("").map((letter, i) => (
            <span
              key={i}
              className={`font-[var(--awat-font-heading)] text-[1.8rem] sm:text-[3rem] md:text-[5rem] lg:text-[8rem] leading-none tracking-[0.05em] sm:tracking-[0.1em] text-[#F5F5F0] select-none inline-block ${letter === " " ? "w-[0.3em]" : ""}`}
              style={{ textShadow: "0 0 80px rgba(193,127,89,0.3)" }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </h1>

        <p
          className="mt-3 md:mt-6 font-[var(--awat-font-body)] text-xs sm:text-sm md:text-base tracking-[0.15em] sm:tracking-[0.3em] uppercase text-[#F5F5F0]/70"
        >
          {t("Ihr Friseur in Heilbronn seit 2007", "Your barber in Heilbronn since 2007")}
        </p>

        <div className="absolute bottom-6 sm:bottom-10 flex flex-col items-center gap-1.5 sm:gap-2">
          <span className="font-[var(--awat-font-body)] text-[10px] sm:text-xs tracking-widest uppercase text-[#F5F5F0]/40">
            {t("Entdecken", "Discover")}
          </span>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="sm:w-5 sm:h-5 text-[#C17F59]/60">
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

const serviceGroups = [
  {
    title: { de: "Herren", en: "Men" },
    services: [
      {
        name: { de: "Haarschneiden", en: "Haircut" },
        price: "16 €",
      },
      {
        name: { de: "Maschinenschnitt", en: "Machine Cut" },
        price: "14 €",
      },
      {
        name: { de: "Zero", en: "Zero Cut" },
        price: "18 €",
      },
      {
        name: { de: "Doppelt Zero", en: "Double Zero Cut" },
        price: "20 €",
      },
      {
        name: { de: "Augenbrauen - Kontur - Bart Stylen", en: "Eyebrows - Contour - Beard Styling" },
        price: "10 €",
      },
      {
        name: { de: "Bart Rasur", en: "Beard Shave" },
        price: "12 €",
      },
      {
        name: { de: "Waschen", en: "Wash" },
        price: "4 €",
      },
      {
        name: { de: "Heißwachs ( Pro Stelle 2 €)", en: "Hot Wax (2 € Per Area)" },
        price: "10 €",
      },
      {
        name: { de: "Kinder", en: "Kids Cut" },
        price: "12 €",
      },
      {
        name: { de: "Kinder Zero", en: "Kids Zero Cut" },
        price: "14 €",
      },
      {
        name: { de: "Awat & Chalak Paket", en: "Awat & Chalak Package" },
        price: "40 €",
      },
    ],
  },
  {
    title: { de: "Frauen:", en: "Women" },
    services: [
      {
        name: { de: "Haarschnitt", en: "Haircut" },
        price: "20 €",
      },
      {
        name: { de: "Haarentfernung im Gesicht", en: "Facial Hair Removal" },
        price: "12 €",
      },
    ],
  },
];

function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-row", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="servicos" style={{ background: "#1C1C1C", padding: "60px 16px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <h2
          className="font-[var(--awat-font-heading)]"
          style={{
            fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
            color: "#F5F5F0",
            textAlign: "center",
            letterSpacing: "0.1em",
            marginBottom: 8,
          }}
        >
          {t("LEISTUNGEN", "SERVICES")}
        </h2>
        <div style={{ width: 60, height: 1, background: "#C17F59", margin: "0 auto 40px" }} />

        {/* Price list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {serviceGroups.map((group) => (
            <div key={group.title.de}>
              <h3
                className="font-[var(--awat-font-heading)]"
                style={{
                  fontSize: "clamp(1rem, 3vw, 1.25rem)",
                  color: "#C17F59",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                {t(group.title.de, group.title.en)}
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {group.services.map((service, i) => (
                  <div
                    key={`${group.title.de}-${service.name.de}`}
                    className="service-row"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "18px 0",
                      borderBottom: i < group.services.length - 1 ? "1px solid rgba(193,127,89,0.12)" : "none",
                      gap: 12,
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4
                        className="font-[var(--awat-font-heading)]"
                        style={{
                          fontSize: "clamp(1rem, 3vw, 1.4rem)",
                          color: "#F5F5F0",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {t(service.name.de, service.name.en)}
                      </h4>
                    </div>

                    <div style={{
                      flex: "0 0 auto",
                      width: 40,
                      borderBottom: "1px dotted rgba(193,127,89,0.3)",
                      alignSelf: "center",
                    }} />

                    <span
                      className="font-[var(--awat-font-heading)]"
                      style={{
                        fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
                        color: "#C17F59",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      {service.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
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
  },
  {
    name: "Ranj",
    image: "/awat-chalak/barber-ranj.jpeg",
  },
  {
    name: "Rani",
    image: "/awat-chalak/barber-rani.jpeg",
  },
  {
    name: "San",
    image: "/awat-chalak/barber-san.jpeg",
  },
  {
    name: "Karam",
    image: "/awat-chalak/barber-karam.jpeg",
  },
  {
    name: "Goran",
    image: "/awat-chalak/barber-goran.jpeg",
  },
];

function Barbers() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.08,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="equipa" className="relative py-12 sm:py-24 md:py-32 lg:py-40 bg-[#1C1C1C]">
      <div className="text-center mb-10 sm:mb-16 md:mb-24 px-4 sm:px-6">
        <h2
          ref={titleRef}
          className="awat-section-title font-[var(--awat-font-heading)] text-3xl md:text-5xl lg:text-7xl tracking-[0.05em] sm:tracking-[0.1em] text-[#F5F5F0]"
        >
          {t({ de: "UNSER TEAM", en: "OUR TEAM" })}
        </h2>
        <div className="w-24 h-px bg-[#C17F59] mx-auto mt-6" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 md:gap-6">
          {barbers.map((barber, i) => (
            <div
              key={barber.name}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group overflow-hidden rounded-sm border border-[#C17F59]/10 bg-[#2D2D2D]"
            >
              <div className="relative overflow-hidden">
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <img
                    src={barber.image}
                    alt={barber.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/65 via-transparent to-transparent" />
                  <div className="absolute left-3 top-3 h-6 w-6 border-l border-t border-[#C17F59]/40" />
                  <div className="absolute bottom-3 right-3 h-6 w-6 border-b border-r border-[#C17F59]/40" />
                </div>
              </div>
              <div className="px-3 py-4 text-center sm:px-4 sm:py-5">
                <h3 className="font-[var(--awat-font-heading)] text-2xl tracking-[0.12em] text-[#F5F5F0] sm:text-3xl">
                  {barber.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   GALLERY
   ═══════════════════════════════════════════════════════════ */

const galleryItems = [
  { image: "/awat-chalak/gallery-1.jpg", label: { de: "Salonmoment", en: "Salon Moment" }, className: "sm:col-span-2 lg:col-span-2 aspect-[16/10]" },
  { image: "/awat-chalak/gallery-2.jpg", label: { de: "Fade Schnitt", en: "Fade Cut" }, className: "aspect-[4/5]" },
  { image: "/awat-chalak/gallery-3.jpg", label: { de: "Clean Fade", en: "Clean Fade" }, className: "aspect-[4/5]" },
  { image: "/awat-chalak/gallery-4.jpg", label: { de: "Braids & Styling", en: "Braids & Styling" }, className: "aspect-[4/5]" },
  { image: "/awat-chalak/gallery-5.jpg", label: { de: "Bartpflege", en: "Beard Grooming" }, className: "sm:col-span-2 lg:col-span-1 aspect-[16/10] lg:aspect-[4/5]" },
  { image: "/awat-chalak/gallery-6.jpg", label: { de: "Präzisionsschnitt", en: "Precision Cut" }, className: "aspect-[4/5]" },
  { image: "/awat-chalak/gallery-7.jpg", label: { de: "Moderner Stil", en: "Modern Style" }, className: "aspect-[4/5]" },
  { image: "/awat-chalak/barber-goran.jpeg", label: { de: "Goran", en: "Goran" }, className: "sm:col-span-2 lg:col-span-2 aspect-[16/10]" },
];

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
    <section ref={sectionRef} id="galeria" className="relative py-12 sm:py-24 md:py-32 lg:py-40 bg-[#2D2D2D]">
      <div className="text-center mb-10 sm:mb-16 md:mb-24 px-4 sm:px-6">
        <h2
          ref={titleRef}
          className="awat-section-title font-[var(--awat-font-heading)] text-3xl md:text-5xl lg:text-7xl tracking-[0.05em] sm:tracking-[0.1em] text-[#F5F5F0]"
        >
          {t({ de: "GALERIE", en: "GALLERY" })}
        </h2>
        <div className="w-24 h-px bg-[#C17F59] mx-auto mt-6" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {galleryItems.map((item, i) => (
            <div
              key={t(item.label)}
              ref={(el) => { itemsRef.current[i] = el; }}
              className={`${item.className} group relative overflow-hidden rounded-sm`}
            >
              <img
                src={item.image}
                alt={t(item.label)}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#C17F59]/50 transition-colors duration-500 rounded-sm z-10" />
              <div className="absolute inset-0 flex items-end p-4 sm:p-6 z-20">
                <span className="font-[var(--awat-font-body)] text-sm tracking-widest uppercase text-[#F5F5F0]/80 sm:text-[#F5F5F0]/0 sm:group-hover:text-[#F5F5F0]/80 transition-all duration-500 translate-y-0 sm:translate-y-4 sm:group-hover:translate-y-0">
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
    <section ref={sectionRef} id="marcar" className="awat-book-section" style={{
      background: "#1C1C1C",
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
          {t("Kein Termin n\u00F6tig — einfach vorbeikommen. Oder rufen Sie uns an.", "No appointment needed — just walk in. Or give us a call.")}
        </p>

        <div className="awat-hours-grid">
          <div style={{
            background: "rgba(193,127,89,0.08)", borderRadius: 12, padding: "20px 16px",
            border: "1px solid rgba(193,127,89,0.15)",
          }}>
            <p style={{ color: "#C17F59", fontSize: 13, letterSpacing: "0.1em", marginBottom: 8 }}>
              {t("MO — FR", "MON — FRI")}
            </p>
            <p style={{ color: "#F5F5F0", fontFamily: "var(--awat-font-heading)", fontSize: "1.5rem" }}>
              09:00 — 19:00
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
              09:00 — 18:00
            </p>
          </div>
        </div>

        <div className="awat-book-buttons" style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 16, marginBottom: 48,
        }}>
          <a href="tel:+4971312066991" className="awat-book-btn" style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 12,
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

          <a href="https://wa.me/4917662095949" target="_blank" rel="noopener noreferrer" className="awat-book-btn" style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 12,
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
      className="relative bg-[#1C1C1C] border-t border-[#C17F59]/10 py-8 md:py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          <span className="font-[var(--awat-font-heading)] text-xl md:text-2xl tracking-[0.2em] text-[#F5F5F0]/60">
            AWAT & CHALAK
          </span>

          <p className="font-[var(--awat-font-body)] text-[#F5F5F0]/30 text-sm tracking-wide italic">
            {t("Ihr Stil. Unser Handwerk.", "Your style. Our craft.")}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 flex-wrap justify-center">
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

        /* BookNow section responsive padding */
        .awat-book-section {
          padding: 60px 16px;
        }
        @media (min-width: 640px) {
          .awat-book-section {
            padding: 120px 24px;
          }
        }

        /* Mobile section title clamp + buttons */
        @media (max-width: 640px) {
          .awat-section-title {
            font-size: clamp(2rem, 8vw, 3.5rem) !important;
          }
          .awat-book-btn {
            width: 100% !important;
            max-width: 100%;
            box-sizing: border-box;
          }
          .awat-book-buttons {
            width: 100%;
            align-items: stretch !important;
          }
        }
      `}</style>

      <div className="awat-page" style={{ overflowX: "hidden", maxWidth: "100vw" }}>
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
