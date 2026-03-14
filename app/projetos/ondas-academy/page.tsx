"use client";

import { motion } from "framer-motion";
import {
  Waves,
  Sun,
  Users,
  Award,
  Clock,
  Phone,
  MapPin,
  Mail,
  Instagram,
  Facebook,
  ChevronDown,
  Shield,
  Sparkles,
  Star,
  ArrowRight,
} from "lucide-react";

import { FloatingNav } from "@/components/shared-ui/floating-nav";
import { Marquee } from "@/components/shared-ui/marquee";
import { ShimmerButton } from "@/components/shared-ui/shimmer-button";
import { SpotlightCard } from "@/components/shared-ui/spotlight-card";
import { AnimatedCounter } from "@/components/shared-ui/animated-counter";
import { TestimonialCards } from "@/components/shared-ui/testimonial-cards";
import { TextReveal } from "@/components/shared-ui/text-reveal";

/* ─── Constants ─── */

const WHATSAPP_URL =
  "https://wa.me/351912345679?text=Ol%C3%A1!%20Quero%20marcar%20uma%20aula%20de%20surf%20na%20Ondas%20Academy";

const TEAL = "#0891B2";
const DEEP_BLUE = "#1E3A5F";

const NAV_ITEMS = [
  { label: "Aulas", href: "#aulas" },
  { label: "Pacotes", href: "#pacotes" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contacto", href: "#contacto" },
];

const MARQUEE_ITEMS = [
  "Surfing",
  "Bodyboard",
  "SUP",
  "Aulas Privadas",
  "Grupos",
  "Material Incluído",
  "Instrutores Certificados",
  "Figueira da Foz",
];

const PACKAGES = [
  {
    title: "Aula Experimental",
    subtitle: "Primeira onda garantida",
    duration: "1h30",
    price: 25,
    features: [
      "Material completo incluído",
      "Instrutor dedicado",
      "Seguro desportivo",
      "Fotos da sessão",
    ],
    icon: Sparkles,
    popular: false,
  },
  {
    title: "Pack Iniciante",
    subtitle: "O mais popular",
    duration: "5 aulas",
    price: 100,
    pricePerClass: 20,
    features: [
      "Tudo da Aula Experimental",
      "Progressao garantida",
      "Video-analise técnica",
      "Certificado Ondas Academy",
    ],
    icon: Award,
    popular: true,
  },
  {
    title: "Pack Avançado",
    subtitle: "Domina as ondas",
    duration: "10 aulas",
    price: 180,
    pricePerClass: 18,
    features: [
      "Tudo do Pack Iniciante",
      "Selecao de ondas avancada",
      "Manobras e duck-dive",
      "Acesso a grupo VIP WhatsApp",
    ],
    icon: Waves,
    popular: false,
  },
];

const STATS = [
  { target: 500, suffix: "+", label: "Alunos" },
  { target: 8, suffix: " Anos", label: "Experiência" },
  { target: 4.9, suffix: "/5", label: "Rating" },
  { target: 3, suffix: "", label: "Instrutores Certificados" },
];

const TESTIMONIALS = [
  {
    name: "Maria Santos",
    role: "Estudante de Surf - Coimbra",
    content:
      "Nunca pensei que conseguisse ficar de pe na prancha na primeira aula! O instrutor foi super paciente e as ondas da Figueira são perfeitas para aprender. Ja marquei o pack completo!",
    rating: 5,
  },
  {
    name: "Tomas Ferreira",
    role: "Surfista Intermedio - Lisboa",
    content:
      "Vim passar ferias a Figueira e decidi experimentar. A equipa e super profissional e as condições da Praia de Buarcos são incriveis. Recomendo a 100%!",
    rating: 5,
  },
  {
    name: "Ana & Pedro",
    role: "Aula em Casal - Porto",
    content:
      "Fizemos a aula experimental como atividade de casal e adoramos! O ambiente e super descontraido e divertido. Voltaremos com certeza no próximo verao!",
    rating: 5,
  },
];

const ABOUT_FEATURES = [
  {
    icon: Waves,
    title: "Ondas Perfeitas",
    desc: "A Figueira da Foz tem uma das melhores ondas da Europa para iniciantes e intermedios. Aguas calmas e consistentes todo o ano.",
  },
  {
    icon: Shield,
    title: "Instrutores ISA",
    desc: "Todos os nossos instrutores são certificados pela International Surfing Association com formação em primeiros socorros.",
  },
  {
    icon: Users,
    title: "Grupos Pequenos",
    desc: "Máximo de 6 alunos por instrutor para garantir atenção personalizada e segurança máxima em cada sessão.",
  },
  {
    icon: Sun,
    title: "Todo o Ano",
    desc: "Operamos 12 meses por ano. Fatos de neoprene premium incluídos para surfar com conforto em qualquer estação.",
  },
];

/* ─── Decorative Wave SVG ─── */

function WaveDivider({ flip = false, color = "#ffffff" }: { flip?: boolean; color?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${flip ? "rotate-180" : ""}`}>
      <svg
        viewBox="0 0 1440 120"
        className="relative block w-full"
        preserveAspectRatio="none"
        style={{ height: "60px" }}
      >
        <path
          d="M0,64 C360,120 720,0 1080,64 C1260,96 1380,80 1440,64 L1440,120 L0,120 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

/* ─── Page ─── */

export default function OndasAcademyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* ── Navigation ── */}
      <FloatingNav
        brand="Ondas Academy"
        items={NAV_ITEMS}
        ctaLabel="Marcar Aula"
        ctaHref={WHATSAPP_URL}
        brandColor={TEAL}
        ctaColor={TEAL}
      />

      {/* ── Hero ── */}
      <section
        id="aulas"
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
        style={{
          background: `linear-gradient(135deg, ${DEEP_BLUE} 0%, #0e4a6e 30%, ${TEAL} 70%, #06b6d4 100%)`,
        }}
      >
        {/* Animated background circles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -left-32 -top-32 h-96 w-96 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #06b6d4, transparent)" }}
            animate={{ scale: [1, 1.3, 1], x: [0, 40, 0], y: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-48 -right-32 h-[500px] w-[500px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #22d3ee, transparent)" }}
            animate={{ scale: [1.2, 1, 1.2], x: [0, -50, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full opacity-[0.07]"
            style={{ background: "radial-gradient(circle, #ffffff, transparent)" }}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Floating decorative emojis */}
        <motion.span
          className="absolute left-[10%] top-[20%] text-5xl select-none"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          🌊
        </motion.span>
        <motion.span
          className="absolute right-[12%] top-[25%] text-4xl select-none"
          animate={{ y: [0, -15, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          🏄
        </motion.span>
        <motion.span
          className="absolute bottom-[25%] left-[15%] text-4xl select-none"
          animate={{ y: [0, -18, 0], rotate: [0, 12, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          ☀️
        </motion.span>
        <motion.span
          className="absolute bottom-[20%] right-[10%] text-5xl select-none"
          animate={{ y: [0, -22, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          🐚
        </motion.span>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-cyan-100 backdrop-blur-sm"
          >
            <Waves className="h-4 w-4" />
            Escola de Surf em Figueira da Foz
          </motion.div>

          <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight text-white md:text-7xl">
            <TextReveal text="Aprende a Surfar" className="justify-center" />
            <br />
            <TextReveal
              text="na Figueira"
              className="justify-center text-cyan-300"
              delay={0.4}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-cyan-100/90 md:text-xl"
          >
            As melhores ondas de Portugal esperam por ti. Instrutores certificados,
            material premium e a energia única da costa da Figueira da Foz.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <ShimmerButton
              href={WHATSAPP_URL}
              bgColor={TEAL}
              shimmerColor="rgba(255,255,255,0.25)"
              className="text-lg px-10 py-5"
            >
              <Phone className="h-5 w-5" />
              Marcar Aula Agora
            </ShimmerButton>
            <a
              href="#pacotes"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/50"
            >
              Ver Pacotes
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-6 w-6 text-white/50" />
        </motion.div>

        <WaveDivider color="#ffffff" />
      </section>

      {/* ── Marquee Band ── */}
      <section className="bg-white py-6">
        <Marquee
          items={MARQUEE_ITEMS}
          separator="🌊"
          speed={20}
          className="text-lg font-bold uppercase tracking-widest"
          />
        <Marquee
          items={MARQUEE_ITEMS}
          separator="🏄"
          speed={25}
          reverse
          className="mt-3 text-sm font-medium uppercase tracking-widest text-neutral-400"
        />
      </section>

      {/* ── Packages ── */}
      <section id="pacotes" className="bg-neutral-50 py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <span
              className="mb-3 inline-block text-sm font-bold uppercase tracking-widest"
              style={{ color: TEAL }}
            >
              Pacotes
            </span>
            <h2 className="text-4xl font-bold text-neutral-900 md:text-5xl">
              Escolhe o teu plano
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-neutral-500">
              Do primeiro contacto com o mar ate ao dominio total das ondas.
              Material incluído em todos os pacotes.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {PACKAGES.map((pkg, i) => {
              const Icon = pkg.icon;
              return (
                <motion.div
                  key={pkg.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  <SpotlightCard
                    spotlightColor="rgba(8,145,178,0.15)"
                    className={`relative h-full ${pkg.popular ? "border-cyan-300 ring-2 ring-cyan-200/50" : ""}`}
                  >
                    {pkg.popular && (
                      <div
                        className="absolute -top-px left-1/2 -translate-x-1/2 rounded-b-lg px-4 py-1 text-xs font-bold uppercase tracking-wider text-white"
                        style={{ backgroundColor: TEAL }}
                      >
                        Mais Popular
                      </div>
                    )}
                    <div className="p-8">
                      <div
                        className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl"
                        style={{ backgroundColor: `${TEAL}15` }}
                      >
                        <Icon className="h-7 w-7" style={{ color: TEAL }} />
                      </div>
                      <h3 className="text-2xl font-bold text-neutral-900">{pkg.title}</h3>
                      <p className="mt-1 text-sm text-neutral-500">{pkg.subtitle}</p>

                      <div className="my-6 flex items-baseline gap-1">
                        <span className="text-5xl font-extrabold text-neutral-900">
                          {pkg.price}€
                        </span>
                        <span className="text-neutral-400">/ {pkg.duration}</span>
                      </div>
                      {pkg.pricePerClass && (
                        <p className="mb-4 -mt-4 text-sm font-medium" style={{ color: TEAL }}>
                          {pkg.pricePerClass}€ por aula
                        </p>
                      )}

                      <ul className="mb-8 space-y-3">
                        {pkg.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-3 text-sm text-neutral-600">
                            <svg
                              className="mt-0.5 h-5 w-5 shrink-0"
                              style={{ color: TEAL }}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2.5}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            {feat}
                          </li>
                        ))}
                      </ul>

                      <ShimmerButton
                        href={WHATSAPP_URL}
                        bgColor={pkg.popular ? TEAL : DEEP_BLUE}
                        shimmerColor="rgba(255,255,255,0.2)"
                        className="w-full justify-center text-sm"
                      >
                        <Phone className="h-4 w-4" />
                        Reservar via WhatsApp
                      </ShimmerButton>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="relative overflow-hidden py-20 px-6" style={{ backgroundColor: DEEP_BLUE }}>
        {/* Decorative circles */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute -right-20 -top-20 h-60 w-60 rounded-full opacity-10"
            style={{ background: `radial-gradient(circle, ${TEAL}, transparent)` }}
          />
          <div
            className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full opacity-10"
            style={{ background: `radial-gradient(circle, #06b6d4, transparent)` }}
          />
        </div>

        <div className="relative z-10 mx-auto grid max-w-5xl grid-cols-2 gap-10 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-extrabold text-white md:text-5xl">
                <AnimatedCounter
                  target={stat.target}
                  suffix={stat.suffix}
                  duration={2500}
                />
              </div>
              <p className="mt-2 text-sm font-medium text-cyan-200/80">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── About ── */}
      <section id="sobre" className="bg-white py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <span
              className="mb-3 inline-block text-sm font-bold uppercase tracking-widest"
              style={{ color: TEAL }}
            >
              Porquê Nós
            </span>
            <h2 className="text-4xl font-bold text-neutral-900 md:text-5xl">
              A tua escola de surf na Figueira
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-neutral-500">
              Desde 2018 a transformar principiantes em surfistas. Na Praia de Buarcos,
              com as melhores condições de Portugal para aprender a surfar.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {ABOUT_FEATURES.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group flex gap-5 rounded-2xl border border-neutral-100 bg-neutral-50/50 p-6 transition-all duration-300 hover:bg-white hover:shadow-md hover:border-neutral-200"
                >
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${TEAL}12` }}
                  >
                    <Icon className="h-7 w-7" style={{ color: TEAL }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900">{feat.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-500">{feat.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Beach highlight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 overflow-hidden rounded-3xl"
            style={{
              background: `linear-gradient(135deg, ${DEEP_BLUE}, ${TEAL})`,
            }}
          >
            <div className="flex flex-col items-center gap-8 p-10 text-center md:p-16">
              <span className="text-6xl">🌊</span>
              <div>
                <h3 className="text-3xl font-bold text-white md:text-4xl">
                  Praia de Buarcos
                </h3>
                <p className="mx-auto mt-4 max-w-xl text-cyan-100/90">
                  Ondas consistentes, fundo de areia seguro e água cristalina.
                  A Praia de Buarcos é reconhecida como um dos melhores spots
                  para aprender surf em toda a costa portuguesa.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                {["Fundo de Areia", "Água Cristalina", "Ondas Consistentes", "Sem Correntes Perigosas"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-neutral-50">
        <TestimonialCards
          testimonials={TESTIMONIALS}
          title="O que dizem os nossos alunos"
          subtitle="Centenas de surfistas comecaram aqui a sua jornada"
          accentColor={TEAL}
        />
      </section>

      {/* ── Final CTA ── */}
      <section className="relative overflow-hidden py-28 px-6">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${DEEP_BLUE} 0%, ${TEAL} 100%)`,
          }}
        />
        {/* Animated bg elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute left-[10%] top-[10%] h-64 w-64 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #22d3ee, transparent)" }}
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 7, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-[5%] right-[5%] h-80 w-80 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #06b6d4, transparent)" }}
            animate={{ scale: [1.3, 1, 1.3] }}
            transition={{ duration: 9, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-6 inline-block text-6xl"
          >
            🏄‍♂️
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold text-white md:text-6xl"
          >
            Apanha a tua
            <br />
            <span className="text-cyan-300">primeira onda</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-lg text-cyan-100/90"
          >
            Marca a tua aula experimental por apenas 25€.
            Material incluído, instrutor dedicado e muita diversao garantida.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-10"
          >
            <ShimmerButton
              href={WHATSAPP_URL}
              bgColor="#ffffff"
              shimmerColor={`${TEAL}40`}
              className="text-lg px-12 py-5"
            >
              <span style={{ color: DEEP_BLUE }} className="flex items-center gap-2 font-bold">
                <Phone className="h-5 w-5" />
                Reservar no WhatsApp
              </span>
            </ShimmerButton>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer id="contacto" className="bg-neutral-950 px-6 py-16 text-neutral-400">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-3">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold text-white">
                Ondas <span style={{ color: TEAL }}>Academy</span>
              </h3>
              <p className="mt-3 text-sm leading-relaxed">
                A tua escola de surf na Figueira da Foz. Desde 2018 a ensinar
                a arte de surfar com paixão e profissionalismo.
              </p>
              <div className="mt-6 flex gap-4">
                <a
                  href="https://instagram.com/ondas.academy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 transition-colors hover:bg-neutral-700"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5 text-neutral-300" />
                </a>
                <a
                  href="https://facebook.com/ondas.academy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 transition-colors hover:bg-neutral-700"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5 text-neutral-300" />
                </a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-neutral-200">
                Contacto
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 shrink-0" style={{ color: TEAL }} />
                  Praia de Buarcos, Figueira da Foz
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0" style={{ color: TEAL }} />
                  <a href="tel:+351912345679" className="transition-colors hover:text-white">
                    +351 912 345 679
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0" style={{ color: TEAL }} />
                  <a href="mailto:info@ondas-academy.pt" className="transition-colors hover:text-white">
                    info@ondas-academy.pt
                  </a>
                </li>
              </ul>
            </div>

            {/* Hours */}
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-neutral-200">
                Horário
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <Clock className="h-4 w-4 shrink-0" style={{ color: TEAL }} />
                  <div>
                    <p className="text-neutral-300">Verao (Jun-Set)</p>
                    <p>Todos os dias, 8h - 20h</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="h-4 w-4 shrink-0" style={{ color: TEAL }} />
                  <div>
                    <p className="text-neutral-300">Inverno (Out-Mai)</p>
                    <p>Seg-Sab, 9h - 18h</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-8 md:flex-row">
            <p className="text-xs text-neutral-500">
              &copy; {new Date().getFullYear()} Ondas Academy. Todos os direitos reservados.
            </p>
            <p className="text-xs text-neutral-600">
              Feito com 🌊 na Figueira da Foz
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
