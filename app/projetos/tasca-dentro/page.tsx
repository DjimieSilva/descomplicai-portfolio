"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Clock,
  Star,
  UtensilsCrossed,
  Wine,
  Flame,
  ChevronDown,
  MessageCircle,
  ArrowRight,
  Facebook,
  Instagram,
  Music,
  Dog,
} from "lucide-react";

import { FloatingNav } from "@/components/shared-ui/floating-nav";
import { Marquee } from "@/components/shared-ui/marquee";
import { ShimmerButton } from "@/components/shared-ui/shimmer-button";
import { SpotlightCard } from "@/components/shared-ui/spotlight-card";
import { AnimatedCounter } from "@/components/shared-ui/animated-counter";
import { TestimonialCards } from "@/components/shared-ui/testimonial-cards";
import { TextReveal } from "@/components/shared-ui/text-reveal";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const WHATSAPP_URL =
  "https://wa.me/351233425389?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20uma%20reserva%20no%20T%C3%A1s-c%C3%A1%20Dentro";

const NAV_ITEMS = [
  { label: "Conceito", href: "#conceito" },
  { label: "Ementa", href: "#ementa" },
  { label: "Experiência", href: "#experiencia" },
  { label: "Reservar", href: "#reservar" },
];

const MARQUEE_ITEMS = [
  "Gastronomia de Autor",
  "Vinhos Seleccionados",
  "Produtos Locais",
  "Peixe Fresco",
  "Carnes Maturadas",
  "Sobremesas Artesanais",
  "Marisco da Costa",
  "Buarcos",
  "Música ao Vivo",
  "Pet Friendly",
  "Prato do Dia 13€",
];

const MENU_HIGHLIGHTS = [
  {
    category: "Mar",
    icon: "🐙",
    title: "Polvo Crocante",
    description:
      "Polvo grelhado na perfeição, estaladiço por fora e tenro por dentro. Acompanhado de batata a murro e azeite da região.",
    image:
      "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=600&q=80",
    tag: "Favorito",
  },
  {
    category: "Terra",
    icon: "🥩",
    title: "Entrecôte Suculento",
    description:
      "Carne maturada grelhada na brasa, com batata crocante feita na hora. Cozinhado na perfeição, segundo os nossos clientes.",
    image:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&q=80",
    tag: "Assinatura",
  },
  {
    category: "Autor",
    icon: "🍷",
    title: "Magret de Pato",
    description:
      "Pato confitado com fatia de laranja caramelizada e redução de Porto. Uma viagem de sabores que é marca da casa.",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
    tag: "Chef",
  },
];

const STATS = [
  { target: 4, suffix: ".7", label: "Google Reviews (369+)" },
  { target: 2, suffix: "o", label: "Melhor de Buarcos" },
  { target: 13, suffix: "€", label: "Prato do Dia Completo" },
  { target: 30, suffix: "+", label: "Rótulos de Vinho" },
];

const TESTIMONIALS = [
  {
    name: "Cliente Satisfeito",
    role: "Google Reviews",
    content:
      "Comida excelente, porções generosas e a preços justos. O polvo crocante e o entrecôte são de outro nível. O chef vem pessoalmente à mesa ver se está tudo bem. Voltamos sempre!",
    rating: 5,
  },
  {
    name: "Visitante da Figueira",
    role: "TripAdvisor",
    content:
      "O melhor restaurante que encontrámos em Buarcos. Ambiente intimista, decoração moderna e comida de autor com raízes tradicionais. O prato do dia a 13€ é imbatível.",
    rating: 5,
  },
  {
    name: "Casal Local",
    role: "Restaurant Guru",
    content:
      "Adoramos o Tás-cá Dentro. O Zé é super atencioso e faz-nos sentir em casa. As amêijoas ao alho e o camarão são divinos. Aos sábados com música ao vivo é perfeito.",
    rating: 5,
  },
];

const EXPERIENCE_ITEMS = [
  {
    icon: UtensilsCrossed,
    title: "Cozinha de Autor",
    description:
      "Tradição portuguesa reinventada com técnicas contemporâneas. O chef vem pessoalmente à sua mesa.",
  },
  {
    icon: Wine,
    title: "Carta de Vinhos",
    description:
      "30+ rótulos nacionais, do Douro ao Alentejo, com sugestões de harmonização para cada prato.",
  },
  {
    icon: Music,
    title: "Música ao Vivo",
    description:
      "Aos sábados, jante com música ao vivo. Um ambiente intimista com decoração moderna e acolhedora.",
  },
  {
    icon: Dog,
    title: "Pet Friendly",
    description:
      "O seu companheiro de quatro patas é bem-vindo. Acessibilidade completa e esplanada disponível.",
  },
];

const OPENING_HOURS = [
  { day: "Segunda a Sábado", lunch: "12:00–15:00", dinner: "19:00–00:00" },
  { day: "Domingo", lunch: "Encerrado", dinner: "Encerrado" },
];

/* ------------------------------------------------------------------ */
/*  ANIMATION VARIANTS                                                 */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function TascaDentroPage() {
  return (
    <main className="relative bg-[#FFFBF5] text-[#2C1810]">
      {/* ---- NAV ---- */}
      <FloatingNav
        brand="Tás-cá Dentro"
        items={NAV_ITEMS}
        ctaLabel="Reservar Mesa"
        ctaHref={WHATSAPP_URL}
        brandColor="#2B4C7E"
        ctaColor="#1E3A5F"
      />

      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        {/* Background image with LIGHT overlay */}
        <div className="absolute inset-0">
          <img
            src="/tasca-hero.png"
            alt="Interior do Tás-cá Dentro"
            className="h-full w-full object-cover object-bottom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2C1810]/75 via-[#2C1810]/65 to-[#FFFBF5]" />
        </div>

        {/* Warm decorative glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3A6EA5]/15 blur-[150px]" />
          <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-[#1E3A5F]/8 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full bg-black/30 px-5 py-2 backdrop-blur-md shadow-sm"
          >
            <Flame className="h-4 w-4 text-white" />
            <span className="text-sm font-medium text-white/90">
              Gastro Club &middot; Buarcos, Figueira da Foz
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-white md:text-7xl lg:text-8xl">
            <TextReveal text="Tás-cá Dentro" />
          </h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mx-auto mt-6 max-w-xl text-xl font-light leading-relaxed text-white/70 md:text-2xl"
          >
            Onde a tradição portuguesa encontra a cozinha de autor.
            <span className="block mt-2 text-white text-lg">
              Sabores da costa, alma de gastro club.
            </span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <ShimmerButton
              href={WHATSAPP_URL}
              bgColor="#1E3A5F"
              shimmerColor="rgba(212,160,86,0.3)"
              className="text-base"
            >
              <MessageCircle className="h-5 w-5" />
              Reservar Mesa
            </ShimmerButton>

            <a
              href="#ementa"
              className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/20 hover:shadow-md"
            >
              Explorar Ementa
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-6 w-6 text-[#2B4C7E]/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/*  MARQUEE                                                     */}
      {/* ============================================================ */}
      <div className="border-y border-[#3A6EA5]/10 bg-[#FAF6F0] py-5">
        <Marquee
          items={MARQUEE_ITEMS}
          separator="&middot;"
          speed={30}
          className="text-sm font-semibold uppercase tracking-[0.25em] text-[#2B4C7E]/50"
        />
      </div>

      {/* ============================================================ */}
      {/*  CONCEPT                                                     */}
      {/* ============================================================ */}
      <section
        id="conceito"
        className="scroll-mt-24 relative overflow-hidden bg-[#FFFBF5] py-28 px-6"
      >
        {/* Subtle glow */}
        <div className="pointer-events-none absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-[#3A6EA5]/8 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="mb-16 max-w-2xl"
          >
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-[0.25em] text-[#2B4C7E]">
              O Conceito
            </span>
            <h2 className="text-4xl font-bold leading-tight text-[#2C1810] md:text-5xl">
              Gastronomia com{" "}
              <span className="text-[#2B4C7E]">alma</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[#5C3D2E]/60">
              No coração de Buarcos, entre o mar e a tradição, criámos um espaço
              onde cada prato conta uma história. Ingredientes da costa,
              técnicas de autor e a paixão de quem vive para a cozinha
              portuguesa. Aqui, estás sempre em casa.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {EXPERIENCE_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  custom={i}
                  className="group rounded-2xl border border-[#3A6EA5]/10 bg-white/70 p-7 shadow-sm transition-all duration-500 hover:border-[#3A6EA5]/30 hover:bg-white hover:shadow-lg hover:shadow-[#3A6EA5]/5"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#3A6EA5]/10 transition-all duration-500 group-hover:bg-[#1E3A5F] group-hover:text-white">
                    <Icon className="h-6 w-6 text-[#2B4C7E] transition-colors duration-500 group-hover:text-white" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-[#2C1810]">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#5C3D2E]/50">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  MENU HIGHLIGHTS                                             */}
      {/* ============================================================ */}
      <section id="ementa" className="scroll-mt-24 bg-[#FAF6F0] py-28 px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="mb-16 text-center"
          >
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-[0.25em] text-[#2B4C7E]">
              A Ementa
            </span>
            <h2 className="text-4xl font-bold text-[#2C1810] md:text-5xl">
              Pratos de Assinatura
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#5C3D2E]/50">
              Uma seleção dos pratos que fazem do Tás-cá Dentro uma referência
              gastronómica na costa de Figueira da Foz.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="grid gap-8 md:grid-cols-3"
          >
            {MENU_HIGHLIGHTS.map((dish, i) => (
              <motion.div key={dish.title} variants={fadeUp} custom={i}>
                <SpotlightCard
                  spotlightColor="rgba(212,160,86,0.12)"
                  className="group cursor-pointer overflow-hidden bg-white"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={dish.image}
                      alt={dish.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Category badge */}
                    <span className="absolute left-4 top-4 rounded-full bg-[#1E3A5F] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
                      {dish.tag}
                    </span>
                    {/* Category icon */}
                    <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-lg backdrop-blur-md shadow-sm">
                      {dish.icon}
                    </div>
                    {/* Gradient overlay */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#2B4C7E]/60">
                      {dish.category}
                    </span>
                    <h3 className="mt-1 text-xl font-bold text-[#2C1810]">
                      {dish.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#5C3D2E]/50">
                      {dish.description}
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-14 text-center"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-[#3A6EA5]/30 bg-[#3A6EA5]/5 px-8 py-4 text-sm font-semibold text-[#2B4C7E] transition-all duration-300 hover:border-[#3A6EA5]/60 hover:bg-[#3A6EA5]/10 hover:shadow-md"
            >
              Pedir Ementa Completa via WhatsApp
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  STATS                                                       */}
      {/* ============================================================ */}
      <section
        id="experiencia"
        className="scroll-mt-24 relative overflow-hidden bg-[#2C1810] py-24 px-6"
      >
        {/* Decorative glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3A6EA5]/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="mb-14 text-center"
          >
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-[0.25em] text-[#3A6EA5]">
              A Experiência
            </span>
            <h2 className="text-4xl font-bold text-white md:text-5xl">
              Os números contam a história
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-white md:text-5xl">
                  <AnimatedCounter
                    target={s.target}
                    suffix={s.suffix}
                    className="tabular-nums"
                  />
                </div>
                <p className="mt-2 text-sm font-medium text-white/50">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TESTIMONIALS                                                */}
      {/* ============================================================ */}
      <section className="bg-[#FFFBF5]">
        <TestimonialCards
          testimonials={TESTIMONIALS}
          title="O que dizem de nós"
          subtitle="Histórias de quem passou pela nossa mesa"
          accentColor="#2B4C7E"
        />
      </section>

      {/* ============================================================ */}
      {/*  CTA FINAL — RESERVAR                                        */}
      {/* ============================================================ */}
      <section
        id="reservar"
        className="scroll-mt-24 relative overflow-hidden bg-[#FAF6F0] py-28 px-6"
      >
        {/* Decorative elements */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-[#3A6EA5]/10 blur-[100px]" />
          <div className="absolute right-0 bottom-0 h-[300px] w-[300px] rounded-full bg-[#1E3A5F]/5 blur-[80px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <UtensilsCrossed className="mx-auto mb-6 h-10 w-10 text-[#2B4C7E]/60" />
            <h2 className="text-4xl font-bold text-[#2C1810] md:text-5xl">
              A mesa está posta
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-[#5C3D2E]/50">
              Reserve a sua experiência gastronómica no Tás-cá Dentro. Ligue,
              envie mensagem ou apareça. Aqui, está sempre em casa.
            </p>

            {/* Info pills */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#3A6EA5]/20 bg-white/70 px-4 py-2 text-sm text-[#5C3D2E]/60 shadow-sm">
                <Clock className="h-4 w-4 text-[#2B4C7E]" />
                Seg–Sáb: 12h–15h / 19h–00h
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#3A6EA5]/20 bg-white/70 px-4 py-2 text-sm text-[#5C3D2E]/60 shadow-sm">
                <Star className="h-4 w-4 text-[#2B4C7E]" />
                ~23–30&euro; por pessoa
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#3A6EA5]/20 bg-white/70 px-4 py-2 text-sm text-[#5C3D2E]/60 shadow-sm">
                <Dog className="h-4 w-4 text-[#2B4C7E]" />
                Pet Friendly
              </div>
            </div>

            <div className="mt-10">
              <ShimmerButton
                href={WHATSAPP_URL}
                bgColor="#1E3A5F"
                shimmerColor="rgba(212,160,86,0.3)"
                className="text-base"
              >
                <MessageCircle className="h-5 w-5" />
                Reservar via WhatsApp
              </ShimmerButton>
            </div>

            <a
              href="tel:+351233425389"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#5C3D2E]/40 transition-colors hover:text-[#2B4C7E]"
            >
              <Phone className="h-4 w-4" />
              Ou ligue: +351 233 425 389
            </a>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FOOTER                                                      */}
      {/* ============================================================ */}
      <footer className="border-t border-[#3A6EA5]/10 bg-[#2C1810] py-16 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-3">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold text-[#3A6EA5]">
                Tás-cá Dentro
              </h3>
              <p className="mt-1 text-sm font-medium text-white/30">
                Gastro Club
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/40">
                Cozinha de autor com alma portuguesa, no coração de Buarcos.
                Desde o primeiro prato ao último copo de vinho, uma experiência
                para recordar.
              </p>
            </div>

            {/* Address & Hours */}
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/60">
                Morada & Horário
              </h4>
              <address className="space-y-3 text-sm not-italic text-white/40">
                <p className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#3A6EA5]" />
                  <span>
                    Rua dos Pescadores, 84A
                    <br />
                    3080-331 Buarcos, Figueira da Foz
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#3A6EA5]" />
                  <span>
                    Seg–Sáb: 12:00–15:00 / 19:00–00:00
                    <br />
                    Domingo: Encerrado
                  </span>
                </p>
              </address>
            </div>

            {/* Contacts */}
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/60">
                Contactos
              </h4>
              <div className="space-y-3 text-sm text-white/40">
                <a
                  href="tel:+351233425389"
                  className="flex items-center gap-2 transition-colors hover:text-[#3A6EA5]"
                >
                  <Phone className="h-4 w-4 text-[#3A6EA5]" />
                  +351 233 425 389
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-[#3A6EA5]"
                >
                  <MessageCircle className="h-4 w-4 text-[#3A6EA5]" />
                  WhatsApp
                </a>
                <a
                  href="https://www.instagram.com/tascadentro_gastroclub/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-[#3A6EA5]"
                >
                  <Instagram className="h-4 w-4 text-[#3A6EA5]" />
                  @tascadentro_gastroclub
                </a>
                <a
                  href="https://www.facebook.com/TascaDentroGastroClub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-[#3A6EA5]"
                >
                  <Facebook className="h-4 w-4 text-[#3A6EA5]" />
                  Facebook
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
            <p className="text-xs text-white/30">
              &copy; {new Date().getFullYear()} Tás-cá Dentro Gastro Club.
              Todos os direitos reservados.
            </p>
            <p className="text-xs text-white/30">
              Buarcos, Figueira da Foz &middot; Portugal
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
