"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo, useState, useEffect } from "react";
import {
  Dumbbell,
  Monitor,
  Apple,
  MapPin,
  MessageCircle,
  Phone,
  Instagram,
  ChevronDown,
  ArrowRight,
  Star,
  Users,
  Target,
  Zap,
  Clock,
  CheckCircle,
  Play,
  Heart,
  Trophy,
  Flame,
  Globe,
  ArrowUp,
} from "lucide-react";

import { useI18n } from "./lib/i18n";
import { trackEvent } from "./components/meta-pixel";
import { FloatingNav } from "./components/ui/floating-nav";
import { Marquee } from "./components/ui/marquee";
import { ShimmerButton } from "./components/ui/shimmer-button";
import { SpotlightCard } from "./components/ui/spotlight-card";
import { AnimatedCounter } from "./components/ui/animated-counter";
import { TestimonialCards } from "./components/ui/testimonial-cards";
import { TextReveal } from "./components/ui/text-reveal";

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

function handleWhatsAppClick(source: string) {
  trackEvent("Lead", {
    content_name: "WhatsApp Contact",
    content_category: "Personal Training",
    source,
  });
}

/* ------------------------------------------------------------------ */
/*  COMPONENTS                                                         */
/* ------------------------------------------------------------------ */

function WhatsAppFloat({ whatsappUrl }: { whatsappUrl: string }) {
  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => handleWhatsAppClick("floating_button")}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 transition-transform hover:scale-110"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, type: "spring" }}
      aria-label="WhatsApp"
    >
      <MessageCircle className="h-7 w-7 text-white" fill="white" />
    </motion.a>
  );
}

function LanguageSwitcher() {
  const { locale, toggleLocale, t } = useI18n();
  return (
    <button
      onClick={toggleLocale}
      className="fixed top-4 right-4 z-[60] flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/70 backdrop-blur-md transition-all hover:bg-white/20 hover:text-white"
      aria-label="Switch language"
    >
      <Globe className="h-3.5 w-3.5" />
      {t("lang.switch")}
    </button>
  );
}

function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 left-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white/60 transition-all hover:bg-white/20 hover:text-white"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-4 w-4" />
    </motion.button>
  );
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  return (
    <motion.details
      className="group rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-lg font-medium text-white list-none">
        {q}
        <ChevronDown className="h-5 w-5 shrink-0 text-[#0066FF] transition-transform duration-300 group-open:rotate-180" />
      </summary>
      <div className="px-6 pb-5 text-white/60 leading-relaxed">{a}</div>
    </motion.details>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function BFITFAMPage() {
  const { t, locale } = useI18n();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const WHATSAPP_URL = useMemo(
    () =>
      `https://wa.me/351934035971?text=${encodeURIComponent(t("whatsapp.message"))}`,
    [t]
  );

  const NAV_ITEMS = useMemo(
    () => [
      { label: t("nav.about"), href: "#sobre" },
      { label: t("nav.services"), href: "#servicos" },
      { label: t("nav.pricing"), href: "#precos" },
      { label: t("nav.results"), href: "#resultados" },
      { label: t("nav.start"), href: "#comecar" },
    ],
    [t]
  );

  const MARQUEE_ITEMS = useMemo(
    () => [
      t("marquee.treino"),
      t("marquee.coaching"),
      t("marquee.nutricao"),
      t("marquee.locais"),
      t("marquee.resultados"),
      t("marquee.comunidade"),
      t("marquee.foco"),
      t("marquee.transforma"),
    ],
    [t]
  );

  const SERVICES = useMemo(
    () => [
      {
        icon: Dumbbell,
        title: t("service.1.title"),
        description: t("service.1.desc"),
        features: [t("service.1.f1"), t("service.1.f2"), t("service.1.f3")],
      },
      {
        icon: Monitor,
        title: t("service.2.title"),
        description: t("service.2.desc"),
        features: [t("service.2.f1"), t("service.2.f2"), t("service.2.f3")],
      },
      {
        icon: MapPin,
        title: t("service.3.title"),
        description: t("service.3.desc"),
        features: [t("service.3.f1"), t("service.3.f2"), t("service.3.f3")],
      },
      {
        icon: Apple,
        title: t("service.4.title"),
        description: t("service.4.desc"),
        features: [t("service.4.f1"), t("service.4.f2"), t("service.4.f3")],
      },
    ],
    [t]
  );

  const PRICING = useMemo(
    () => [
      {
        name: t("plan.1.name"),
        price: "10",
        period: locale === "pt" ? "por aula" : "per session",
        description: t("plan.1.desc"),
        features: [t("plan.1.f1"), t("plan.1.f2"), t("plan.1.f3"), t("plan.1.f4")],
        cta: t("plan.1.cta"),
        popular: false,
      },
      {
        name: t("plan.2.name"),
        price: "80",
        period: locale === "pt" ? "por mês" : "per month",
        description: t("plan.2.desc"),
        features: [
          t("plan.2.f1"),
          t("plan.2.f2"),
          t("plan.2.f3"),
          t("plan.2.f4"),
          t("plan.2.f5"),
          t("plan.2.f6"),
        ],
        cta: t("plan.2.cta"),
        popular: true,
      },
      {
        name: t("plan.3.name"),
        price: "Custom",
        period: locale === "pt" ? "personalizado" : "custom",
        description: t("plan.3.desc"),
        features: [
          t("plan.3.f1"),
          t("plan.3.f2"),
          t("plan.3.f3"),
          t("plan.3.f4"),
          t("plan.3.f5"),
          t("plan.3.f6"),
        ],
        cta: t("plan.3.cta"),
        popular: false,
      },
    ],
    [t, locale]
  );

  const TESTIMONIALS = useMemo(
    () => [
      {
        name: "Raquel Florêncio",
        content: t("testimonial.1.content"),
        role: t("testimonial.1.role"),
        rating: 5,
      },
      {
        name: "Luís Andrade",
        content: t("testimonial.2.content"),
        role: t("testimonial.2.role"),
        rating: 5,
      },
      {
        name: "Ana Martins",
        content: t("testimonial.3.content"),
        role: t("testimonial.3.role"),
        rating: 5,
      },
    ],
    [t]
  );

  const STATS = useMemo(
    () => [
      { value: 200, suffix: "+", label: t("stat.1") },
      { value: 5, suffix: locale === "pt" ? " anos" : " years", label: t("stat.2") },
      { value: 98, suffix: "%", label: t("stat.3") },
      { value: 100, suffix: "%", label: t("stat.4") },
    ],
    [t, locale]
  );

  const FAQ_DATA = useMemo(
    () => [
      { q: t("faq.1.q"), a: t("faq.1.a") },
      { q: t("faq.2.q"), a: t("faq.2.a") },
      { q: t("faq.3.q"), a: t("faq.3.a") },
      { q: t("faq.4.q"), a: t("faq.4.a") },
      { q: t("faq.5.q"), a: t("faq.5.a") },
      { q: t("faq.6.q"), a: t("faq.6.a") },
    ],
    [t]
  );

  return (
    <>
      <FloatingNav
        items={NAV_ITEMS}
        brand="BFITFAM"
        ctaLabel={t("nav.start")}
        ctaHref={WHATSAPP_URL}
        brandColor="#0066FF"
        ctaColor="#0066FF"
      />
      {/* Skip to content (a11y) */}
      <a
        href="#sobre"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[70] focus:rounded-lg focus:bg-[#0066FF] focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <WhatsAppFloat whatsappUrl={WHATSAPP_URL} />
      <ScrollToTop />
      <LanguageSwitcher />

      {/* ========== HERO ========== */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A0A0A]"
      >
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img
            src="/gym-bg.png"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/80 via-[#0A0A0A]/60 to-[#0A0A0A]" />
        </motion.div>

        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0066FF]/10 blur-[150px]" />

        <motion.div
          className="relative z-10 mx-auto max-w-5xl px-6 text-center"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            className="mb-8 mt-[30px] inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 backdrop-blur-md md:mt-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Flame className="h-4 w-4 text-[#FF6B35]" />
            <span className="text-sm font-medium text-white/80">
              {t("hero.badge")}
            </span>
          </motion.div>

          <motion.h1
            className="mb-6 text-5xl font-black tracking-tight text-white sm:text-7xl lg:text-8xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="bfit-gradient-text">BFITFAM</span>
          </motion.h1>

          <motion.p
            className="mb-4 text-xl text-white/70 sm:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {t("hero.tagline")}
          </motion.p>

          <motion.p
            className="mx-auto mb-10 max-w-2xl text-base text-white/50 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <div onClick={() => handleWhatsAppClick("hero_cta")}>
              <ShimmerButton
                href={WHATSAPP_URL}
                className="bg-[#0066FF] text-white shadow-lg shadow-[#0066FF]/25"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                {t("hero.cta")}
              </ShimmerButton>
            </div>

            <a
              href="#servicos"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10"
            >
              {t("hero.services")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>

          <motion.div
            className="mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <ChevronDown className="mx-auto h-6 w-6 animate-bounce text-white/30" />
          </motion.div>
        </motion.div>
      </section>

      {/* ========== MARQUEE ========== */}
      <div className="border-y border-white/5 bg-[#0A0A0A] py-5">
        <Marquee items={MARQUEE_ITEMS} separator="·" speed={35} />
      </div>

      {/* ========== ABOUT ========== */}
      <section id="sobre" className="relative overflow-hidden bg-[#0A0A0A] py-28 px-6">
        <div className="pointer-events-none absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-[#00D4AA]/5 blur-[120px]" />

        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative overflow-hidden rounded-3xl">
                <img
                  src="/trainer.png"
                  alt="Personal trainer coaching"
                  loading="lazy"
                  className="h-[500px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent" />
              </div>
              <motion.div
                className="absolute -bottom-6 right-2 sm:-right-6 rounded-2xl bfit-glass px-6 py-4"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0066FF]/20">
                    <Trophy className="h-6 w-6 text-[#0066FF]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">5+</p>
                    <p className="text-sm text-white/50">{t("about.years")}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-[0.25em] text-[#0066FF]">
                {t("about.label")}
              </span>
              <h2 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
                {t("about.title1")}{" "}
                <span className="bfit-gradient-text">{t("about.title2")}</span>
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-white/60">
                <p>{t("about.p1")}</p>
                <p>{t("about.p2")}</p>
                <p className="text-white/80 font-medium">{t("about.p3")}</p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                {[
                  { icon: Target, text: t("about.tag1") },
                  { icon: Heart, text: t("about.tag2") },
                  { icon: Zap, text: t("about.tag3") },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70"
                  >
                    <Icon className="h-4 w-4 text-[#0066FF]" />
                    {text}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== SERVICES ========== */}
      <section id="servicos" className="relative overflow-hidden bg-[#0A0A0A] py-28 px-6">
        <div className="pointer-events-none absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-[#0066FF]/5 blur-[120px]" />

        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-[0.25em] text-[#0066FF]">
              {t("services.label")}
            </span>
            <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
              {t("services.title1")}{" "}
              <span className="bfit-gradient-text">{t("services.title2")}</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/50">
              {t("services.subtitle")}
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2">
            {SERVICES.map((service) => (
              <SpotlightCard key={service.title}>
                <div className="p-8">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0066FF]/10">
                    <service.icon className="h-7 w-7 text-[#0066FF]" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-[#0A0A0A]">
                    {service.title}
                  </h3>
                  <p className="mb-5 text-[#0A0A0A]/60 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#0066FF]/5 px-3 py-1 text-xs font-medium text-[#0066FF]"
                      >
                        <CheckCircle className="h-3 w-3" />
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* ========== STATS ========== */}
      <section className="border-y border-white/5 bg-[#0066FF]/5 py-20 px-6">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <AnimatedCounter
                target={stat.value}
                suffix={stat.suffix}
                className="text-4xl font-black text-white sm:text-5xl"
              />
              <p className="mt-2 text-sm text-white/50">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========== PRICING ========== */}
      <section id="precos" className="relative overflow-hidden bg-[#0A0A0A] py-28 px-6">
        <div className="pointer-events-none absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-[#FF6B35]/5 blur-[120px]" />

        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-[0.25em] text-[#0066FF]">
              {t("pricing.label")}
            </span>
            <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
              {t("pricing.title1")}{" "}
              <span className="bfit-gradient-text">{t("pricing.title2")}</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/50">
              {t("pricing.subtitle")}
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-3">
            {PRICING.map((plan, i) => (
              <motion.div
                key={plan.name}
                className={`relative rounded-3xl border p-8 transition-all duration-500 ${
                  plan.popular
                    ? "border-[#0066FF]/40 bg-[#0066FF]/5 shadow-lg shadow-[#0066FF]/10"
                    : "border-white/10 bg-white/[0.02]"
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#0066FF] px-4 py-1 text-xs font-bold text-white">
                    {t("pricing.popular")}
                  </div>
                )}

                <h3 className="mb-1 text-xl font-bold text-white">
                  {plan.name}
                </h3>
                <p className="mb-6 text-sm text-white/40">{plan.description}</p>

                <div className="mb-6">
                  {plan.price === "Custom" ? (
                    <span className="text-3xl font-black text-white">
                      {t("plan.3.price")}
                    </span>
                  ) : (
                    <>
                      <span className="text-5xl font-black text-white">
                        {plan.price}€
                      </span>
                      <span className="ml-2 text-white/40">{plan.period}</span>
                    </>
                  )}
                </div>

                <ul className="mb-8 space-y-3">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 text-sm text-white/60"
                    >
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#00D4AA]" />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    handleWhatsAppClick(
                      `pricing_${plan.name.toLowerCase().replace(/\s+/g, "_")}`
                    )
                  }
                  className={`block w-full rounded-xl py-3.5 text-center text-sm font-bold transition-all ${
                    plan.popular
                      ? "bg-[#0066FF] text-white shadow-lg shadow-[#0066FF]/25 hover:bg-[#0055DD]"
                      : "border border-white/20 bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  {plan.cta}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section id="resultados" className="bg-[#0A0A0A] py-28 px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-[0.25em] text-[#0066FF]">
              {t("testimonials.label")}
            </span>
            <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
              {t("testimonials.title1")}{" "}
              <span className="bfit-gradient-text">FAM</span>{" "}
              {t("testimonials.title2")}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/50">
              {t("testimonials.subtitle")}
            </p>
          </motion.div>

          <TestimonialCards
            testimonials={TESTIMONIALS}
            accentColor="#0066FF"
          />
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section className="bg-[#0A0A0A] py-28 px-6">
        <div className="mx-auto max-w-3xl">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-[0.25em] text-[#0066FF]">
              {t("faq.label")}
            </span>
            <h2 className="mb-4 text-4xl font-bold text-white">
              {t("faq.title")}
            </h2>
          </motion.div>

          <div className="space-y-3">
            {FAQ_DATA.map((faq, i) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section
        id="comecar"
        className="relative overflow-hidden bg-[#0066FF] py-24 px-6"
      >
        <div className="pointer-events-none absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1600&q=60')] bg-cover bg-center opacity-10" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0066FF] via-[#0066FF]/90 to-[#0055DD]" />

        <motion.div
          className="relative mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-4xl font-black text-white sm:text-5xl">
            {t("cta.title")}
          </h2>
          <p className="mb-8 text-xl text-white/80">{t("cta.subtitle")}</p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleWhatsAppClick("cta_section")}
              className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-lg font-bold text-[#0066FF] shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
            >
              <MessageCircle className="h-5 w-5" />
              {t("cta.whatsapp")}
            </a>
            <a
              href="tel:+351963209209"
              onClick={() =>
                trackEvent("Contact", {
                  content_name: "Phone Call",
                  source: "cta_section",
                })
              }
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 text-sm font-semibold text-white transition-all hover:border-white/60 hover:bg-white/10"
            >
              <Phone className="h-4 w-4" />
              +351 963 209 209
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {t("cta.response")}
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              {t("cta.nocommit")}
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              {t("cta.free")}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="border-t border-white/5 bg-[#050505] py-16 px-6">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-3">
          <div>
            <h3 className="mb-2 text-2xl font-black bfit-gradient-text">BFITFAM</h3>
            <p className="mb-1 text-sm text-white/30">
              {t("hero.tagline")}
            </p>
            <p className="mt-4 text-sm text-white/40 leading-relaxed">
              {t("footer.desc")}
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/50">
              {t("footer.nav")}
            </h4>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-white/40 transition-colors hover:text-[#0066FF]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/50">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+351963209209"
                  onClick={() =>
                    trackEvent("Contact", {
                      content_name: "Phone Call",
                      source: "footer",
                    })
                  }
                  className="flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-[#0066FF]"
                >
                  <Phone className="h-4 w-4 text-[#0066FF]" />
                  +351 963 209 209
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleWhatsAppClick("footer")}
                  className="flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-[#0066FF]"
                >
                  <MessageCircle className="h-4 w-4 text-[#0066FF]" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/bfitfam_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-[#0066FF]"
                >
                  <Instagram className="h-4 w-4 text-[#0066FF]" />
                  @bfitfam_
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-6xl border-t border-white/5 pt-8 text-center text-xs text-white/20">
          © {new Date().getFullYear()} BFITFAM. {t("footer.rights")}
        </div>
      </footer>
    </>
  );
}
