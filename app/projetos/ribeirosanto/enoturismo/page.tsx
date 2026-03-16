"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Euro,
  Users,
  Wine,
  MapPin,
  Car,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  Star,
  Mountain,
  Building,
  Waves,
  ChevronDown,
  Globe,
  Accessibility,
  ParkingCircle,
  TreePine,
  GraduationCap,
  Grape,
  Store,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

/* ─── Animation Variants ─── */

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.15,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

/* ─── Data: Experiences ─── */

const EXPERIENCES = [
  {
    id: "classica",
    title: "Visita & Prova Clássica",
    duration: "~1h30",
    price: "€15",
    priceNote: "/pessoa",
    includes: [
      "Visita guiada à adega e vinhas",
      "Prova comentada de 3 vinhos (Malvasia Fina & Encruzado, Encruzado, Tinto)",
      "Tábua de queijos regionais",
    ],
    idealFor: "Casais, pequenos grupos",
    schedule: "Sábados e domingos, 10h30 e 15h00",
    highlight: false,
    seasonal: false,
  },
  {
    id: "premium",
    title: "Prova Premium",
    duration: "~2h",
    price: "€35",
    priceNote: "/pessoa",
    includes: [
      "Visita completa à Quinta e adega",
      "Prova de 5 vinhos incluindo Vinha da Neve e Grande Escolha",
      "Harmonização com produtos regionais do Dão (queijo da Serra, enchidos, pão de centeio)",
    ],
    idealFor: "Enófilos, grupos premium",
    schedule: "Com marcação prévia",
    highlight: false,
    seasonal: false,
  },
  {
    id: "vindima",
    title: "Experiência Vindima",
    duration: "~4h (manhã inteira)",
    price: "€50",
    priceNote: "/pessoa",
    includes: [
      "Participação na vindima manual",
      "Almoço na vinha com produtos locais",
      "Prova de mostos e vinhos",
      "Garrafa personalizada para levar",
    ],
    idealFor: "Famílias, team buildings",
    schedule: "Setembro – Outubro (época de vindima)",
    highlight: false,
    seasonal: true,
  },
  {
    id: "masterclass",
    title: "Masterclass do Dão",
    duration: "~3h",
    price: "€75",
    priceNote: "/pessoa (min. 4 pessoas)",
    includes: [
      "Workshop com o enólogo Carlos Lucas",
      "Prova técnica de toda a gama Ribeiro Santo (8 vinhos)",
      "Análise sensorial guiada",
      "Certificado de participação",
    ],
    idealFor: "Profissionais, entusiastas sérios",
    schedule: "Com marcação prévia",
    highlight: true,
    seasonal: false,
  },
];

/* ─── Data: Journey Steps ─── */

const JOURNEY_STEPS = [
  {
    number: 1,
    title: "Acolhimento",
    description:
      "Recebemo-lo com um copo de espumante Blanc de Noirs na nossa sala de provas",
    icon: Sparkles,
  },
  {
    number: 2,
    title: "Vinha",
    description:
      "Passeio entre as vinhas de Encruzado e Touriga Nacional, com vista para a Serra da Estrela",
    icon: Grape,
  },
  {
    number: 3,
    title: "Adega",
    description:
      "Visita à adega moderna onde nascem os nossos vinhos. Barricas de carvalho francês, cubas de inox",
    icon: Wine,
  },
  {
    number: 4,
    title: "Prova",
    description:
      "Prova comentada pelo enólogo, com harmonizações regionais cuidadosamente selecionadas",
    icon: Star,
  },
  {
    number: 5,
    title: "Loja",
    description:
      "Na nossa loja, leve para casa os seus vinhos favoritos a preços de produtor",
    icon: Store,
  },
];

/* ─── Data: Region Highlights ─── */

const REGION_HIGHLIGHTS = [
  {
    name: "Serra da Estrela",
    distance: "30 min",
    category: "Montanha, queijo, neve",
    icon: Mountain,
  },
  {
    name: "Viseu",
    distance: "20 min",
    category: "Cidade histórica, gastronomia",
    icon: Building,
  },
  {
    name: "Termas de São Pedro do Sul",
    distance: "25 min",
    category: "Bem-estar, termalismo",
    icon: Waves,
  },
  {
    name: "Coimbra",
    distance: "45 min",
    category: "Universidade, fado, história",
    icon: GraduationCap,
  },
  {
    name: "Buçaco",
    distance: "40 min",
    category: "Mata nacional, palace hotel",
    icon: TreePine,
  },
];

/* ─── Data: Practical Info ─── */

const PRACTICAL_INFO = [
  {
    title: "Localização",
    description: "Quinta do Ribeiro Santo, Carregal do Sal, 3430-XXX",
    icon: MapPin,
  },
  {
    title: "Horários",
    description: "Seg-Sex 9h-18h, Sáb 10h-17h, Dom com marcação",
    icon: Clock,
  },
  {
    title: "Como Chegar",
    description: "A25 saída Carregal do Sal, 5 min até à Quinta",
    icon: Car,
  },
  {
    title: "Estacionamento",
    description: "Gratuito na Quinta",
    icon: ParkingCircle,
  },
  {
    title: "Acessibilidade",
    description: "Adega acessível, vinhas com percurso adaptado",
    icon: Accessibility,
  },
  {
    title: "Idiomas",
    description: "Português, Inglês, Espanhol",
    icon: Globe,
  },
];

/* ─── Data: Testimonials ─── */

const TESTIMONIALS = [
  {
    quote:
      "Uma experiência inesquecível. O Carlos recebeu-nos pessoalmente e a prova do Vinha da Neve foi o ponto alto. Voltaremos!",
    author: "Maria S.",
    location: "Lisboa",
    stars: 5,
  },
  {
    quote:
      "Fizemos a experiência da vindima com a família. As crianças adoraram e o almoço na vinha foi espetacular.",
    author: "João R.",
    location: "Porto",
    stars: 5,
  },
  {
    quote:
      "A masterclass é obrigatória para quem gosta de vinho. Aprendi mais em 3 horas do que em anos de provas.",
    author: "Thomas M.",
    location: "London",
    stars: 5,
  },
];

/* ═══════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════ */

export default function EnoturismoPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <div className="bg-[#1C1210] text-white overflow-x-hidden">
      {/* ══════════════════════════════════════════
          1. HERO — Inviting opening
          ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background: dark-to-wine gradient */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#1C1210]" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 90% 70% at 50% 35%, rgba(114,47,55,0.5) 0%, rgba(28,18,16,0) 65%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(28,18,16,0.3) 0%, transparent 30%, transparent 60%, rgba(28,18,16,0.8) 100%)",
            }}
          />
          {/* Morning mist simulation */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              background:
                "radial-gradient(ellipse 100% 40% at 50% 70%, rgba(255,255,255,0.15) 0%, transparent 70%)",
            }}
          />
          {/* Subtle texture */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'1\' cy=\'1\' r=\'1\' fill=\'white\'/%3E%3C/svg%3E")',
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Floating atmospheric elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [0, -15, 0], opacity: [0.06, 0.12, 0.06] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(114,47,55,0.2) 0%, transparent 70%)",
            }}
          />
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [0.04, 0.09, 0.04] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute top-[30%] right-[15%] w-48 h-48 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(196,168,130,0.15) 0%, transparent 70%)",
            }}
          />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-[25%] left-[20%] w-32 h-32 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-6"
          >
            {/* Pre-heading */}
            <motion.p
              variants={fadeInUp}
              custom={0}
              className="text-amber-400/80 tracking-[0.35em] uppercase text-xs md:text-sm font-light"
            >
              Enoturismo · Ribeiro Santo
            </motion.p>

            {/* Main heading */}
            <motion.h1
              variants={fadeInUp}
              custom={1}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.05] tracking-tight"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Viva o <span className="text-[#C4A882]">Dão</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              custom={2}
              className="text-lg md:text-xl lg:text-2xl text-neutral-300 font-light max-w-2xl mx-auto"
            >
              Uma experiência sensorial no coração de Portugal
            </motion.p>

            {/* Decorative line */}
            <motion.div
              variants={fadeInUp}
              custom={3}
              className="flex items-center justify-center gap-3 pt-2"
            >
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#722F37]" />
              <Wine size={18} className="text-[#722F37]" />
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#722F37]" />
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={fadeInUp} custom={4} className="pt-6">
              <a
                href="https://wa.me/351912345678"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#722F37] text-white px-10 py-4 rounded-full font-medium text-lg hover:bg-[#8e3a44] transition-all duration-300 shadow-lg hover:shadow-[0_8px_32px_-8px_rgba(114,47,55,0.5)] hover:-translate-y-0.5"
              >
                <Wine size={20} />
                Reservar Experiência
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-neutral-500">
            Explorar
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ChevronDown size={20} className="text-neutral-500" />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          2. EXPERIENCES — 4 tourism packages
          ══════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6 bg-[#1A0F0D]">
        {/* Dot grid background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative max-w-6xl mx-auto">
          {/* Section heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeInUp}
              custom={0}
              className="text-[#C4A882] tracking-[0.3em] uppercase text-xs mb-4"
            >
              O Que Oferecemos
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-3xl md:text-4xl lg:text-5xl font-light"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Experiências
            </motion.h2>
          </motion.div>

          {/* Cards grid */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {EXPERIENCES.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className={`group relative bg-gradient-to-b from-[#261A17] to-[#1C1210] rounded-2xl p-8 transition-all duration-500 hover:shadow-[0_20px_60px_-12px_rgba(114,47,55,0.3)] ${
                  exp.highlight
                    ? "border-2 border-[#C4A882]/40 hover:border-[#C4A882]/70"
                    : "border border-white/5 hover:border-[#722F37]/30"
                }`}
              >
                {/* Highlight badge */}
                {exp.highlight && (
                  <div className="absolute -top-3 left-8 bg-gradient-to-r from-[#C4A882] to-[#dbc08a] text-[#1C1210] text-xs font-bold tracking-wider uppercase px-4 py-1 rounded-full">
                    Recomendado
                  </div>
                )}

                {/* Seasonal badge */}
                {exp.seasonal && (
                  <div className="absolute -top-3 left-8 bg-[#722F37] text-white text-xs font-medium tracking-wider uppercase px-4 py-1 rounded-full">
                    Sazonal
                  </div>
                )}

                {/* Header: title + meta */}
                <div className="mb-6">
                  <h3
                    className="text-xl md:text-2xl font-light mb-3"
                    style={{
                      fontFamily: "'Georgia', 'Times New Roman', serif",
                    }}
                  >
                    {exp.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={14} className="text-[#C4A882]" />
                      {exp.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Euro size={14} className="text-[#C4A882]" />
                      <span className="text-white font-medium text-lg">
                        {exp.price}
                      </span>
                      <span className="text-neutral-500">{exp.priceNote}</span>
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-white/5 mb-6" />

                {/* Inclusions */}
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-widest text-[#C4A882]/70 mb-3">
                    Inclui
                  </p>
                  <ul className="space-y-2.5">
                    {exp.includes.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2.5 text-sm text-neutral-300 leading-relaxed"
                      >
                        <Wine
                          size={13}
                          className="text-[#722F37] shrink-0 mt-0.5"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Meta info */}
                <div className="space-y-2 mb-8">
                  <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <Users size={13} className="text-[#C4A882]/50" />
                    <span>
                      Ideal para:{" "}
                      <span className="text-neutral-400">{exp.idealFor}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <Calendar size={13} className="text-[#C4A882]/50" />
                    <span>
                      <span className="text-neutral-400">{exp.schedule}</span>
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href="https://wa.me/351912345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    exp.highlight
                      ? "bg-gradient-to-r from-[#C4A882] to-[#dbc08a] text-[#1C1210] hover:shadow-[0_4px_20px_-4px_rgba(196,168,130,0.4)]"
                      : "bg-[#722F37] text-white hover:bg-[#8e3a44] hover:shadow-[0_4px_20px_-4px_rgba(114,47,55,0.4)]"
                  }`}
                >
                  <MessageCircle size={16} />
                  Reservar
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. WHAT TO EXPECT — Journey walkthrough
          ══════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #1C1210 0%, #2A1518 50%, #1C1210 100%)",
          }}
        />

        <div className="relative max-w-5xl mx-auto">
          {/* Section heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.p
              variants={fadeInUp}
              custom={0}
              className="text-[#C4A882] tracking-[0.3em] uppercase text-xs mb-4"
            >
              A Sua Visita
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-3xl md:text-4xl lg:text-5xl font-light"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              O Que Esperar
            </motion.h2>
          </motion.div>

          {/* Steps */}
          <div className="relative">
            {/* Connecting vertical line (desktop) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#722F37]/40 to-transparent -translate-x-1/2" />

            <div className="space-y-12 md:space-y-0">
              {JOURNEY_STEPS.map((step, i) => {
                const Icon = step.icon;
                const isEven = i % 2 === 0;

                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, delay: i * 0.1 }}
                    className={`relative md:flex md:items-center md:gap-8 ${
                      isEven ? "md:flex-row" : "md:flex-row-reverse"
                    } md:mb-16 last:md:mb-0`}
                  >
                    {/* Content card */}
                    <div
                      className={`flex-1 ${
                        isEven ? "md:text-right" : "md:text-left"
                      }`}
                    >
                      <div
                        className={`bg-[#261A17]/60 rounded-2xl p-6 md:p-8 border border-white/5 ${
                          isEven ? "md:ml-auto" : "md:mr-auto"
                        } md:max-w-md`}
                      >
                        <h3
                          className="text-lg md:text-xl font-light mb-2 text-[#C4A882]"
                          style={{
                            fontFamily: "'Georgia', 'Times New Roman', serif",
                          }}
                        >
                          {step.title}
                        </h3>
                        <p className="text-neutral-400 text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Center number/icon node */}
                    <div className="hidden md:flex items-center justify-center z-10">
                      <div className="relative w-16 h-16 rounded-full bg-[#722F37] border-4 border-[#1C1210] flex items-center justify-center shadow-[0_0_24px_-4px_rgba(114,47,55,0.5)]">
                        <Icon size={22} className="text-[#C4A882]" />
                        <span className="absolute -bottom-6 text-xs text-neutral-500 font-mono">
                          {String(step.number).padStart(2, "0")}
                        </span>
                      </div>
                    </div>

                    {/* Mobile number indicator */}
                    <div className="flex md:hidden items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-[#722F37] flex items-center justify-center shrink-0">
                        <Icon size={16} className="text-[#C4A882]" />
                      </div>
                      <span className="text-xs text-neutral-500 font-mono">
                        Passo {String(step.number).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Spacer for opposite side */}
                    <div className="hidden md:block flex-1" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. REGION HIGHLIGHTS — Nearby attractions
          ══════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6 bg-[#FAF7F2] text-[#2A1F1B]">
        <div className="max-w-6xl mx-auto">
          {/* Section heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeInUp}
              custom={0}
              className="text-[#722F37] tracking-[0.3em] uppercase text-xs mb-4 font-medium"
            >
              Explore os Arredores
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-3xl md:text-4xl lg:text-5xl font-light"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Descubra a Região
            </motion.h2>
          </motion.div>

          {/* Attractions grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {REGION_HIGHLIGHTS.map((place, i) => {
              const Icon = place.icon;
              return (
                <motion.div
                  key={place.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                  className="group bg-white rounded-2xl p-6 border border-neutral-200/60 hover:border-[#722F37]/20 transition-all duration-300 hover:shadow-[0_12px_40px_-12px_rgba(114,47,55,0.15)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#722F37]/10 flex items-center justify-center shrink-0 group-hover:bg-[#722F37]/15 transition-colors duration-300">
                      <Icon size={22} className="text-[#722F37]" />
                    </div>
                    <div>
                      <h3
                        className="text-lg font-medium mb-1"
                        style={{
                          fontFamily: "'Georgia', 'Times New Roman', serif",
                        }}
                      >
                        {place.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Car size={12} className="text-[#722F37]/60" />
                        <span className="text-xs text-[#722F37] font-medium">
                          {place.distance}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-500 leading-relaxed">
                        {place.category}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. PRACTICAL INFO — Details grid
          ══════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6 bg-[#1A0F0D]">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative max-w-6xl mx-auto">
          {/* Section heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeInUp}
              custom={0}
              className="text-[#C4A882] tracking-[0.3em] uppercase text-xs mb-4"
            >
              Planeie a Sua Visita
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-3xl md:text-4xl lg:text-5xl font-light"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Informações Práticas
            </motion.h2>
          </motion.div>

          {/* Info cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRACTICAL_INFO.map((info, i) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="bg-[#261A17]/60 rounded-xl p-6 border border-white/5"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#722F37]/20 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-[#C4A882]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-[#C4A882] mb-1 tracking-wide uppercase">
                        {info.title}
                      </h3>
                      <p className="text-sm text-neutral-400 leading-relaxed">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. TESTIMONIALS — Visitor reviews
          ══════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #1C1210 0%, #231517 50%, #1C1210 100%)",
          }}
        />

        <div className="relative max-w-5xl mx-auto">
          {/* Section heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeInUp}
              custom={0}
              className="text-[#C4A882] tracking-[0.3em] uppercase text-xs mb-4"
            >
              Testemunhos
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-3xl md:text-4xl lg:text-5xl font-light"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              O Que Dizem os Nossos Visitantes
            </motion.h2>
          </motion.div>

          {/* Testimonial cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, i) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="bg-[#261A17]/60 rounded-2xl p-8 border border-white/5 hover:border-[#C4A882]/15 transition-all duration-300"
              >
                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-5">
                  {Array.from({ length: testimonial.stars }, (_, j) => (
                    <Star
                      key={j}
                      size={16}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-neutral-300 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full bg-[#722F37]/30 flex items-center justify-center">
                    <span className="text-[#C4A882] text-sm font-medium">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {testimonial.author}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. BOOKING CTA — Final call-to-action
          ══════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        {/* Burgundy background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, #3A1520 0%, #722F37 40%, #4A1F28 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'1\' cy=\'1\' r=\'0.8\' fill=\'white\'/%3E%3C/svg%3E")',
            backgroundSize: "40px 40px",
          }}
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="relative max-w-3xl mx-auto text-center space-y-8"
        >
          <motion.p
            variants={fadeInUp}
            custom={0}
            className="text-white/60 tracking-[0.3em] uppercase text-xs"
          >
            Reservas
          </motion.p>

          <motion.h2
            variants={fadeInUp}
            custom={1}
            className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Reserve a Sua{" "}
            <span className="text-[#C4A882]">Experiência</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            custom={2}
            className="text-white/70 leading-relaxed max-w-xl mx-auto"
          >
            Para reservar, contacte-nos por WhatsApp ou email. Respondemos em
            menos de 24 horas.
          </motion.p>

          {/* Contact buttons */}
          <motion.div
            variants={fadeInUp}
            custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            {/* WhatsApp - prominent green */}
            <a
              href="https://wa.me/351912345678"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-[#20BD5A] transition-all duration-300 shadow-lg hover:shadow-[0_8px_32px_-8px_rgba(37,211,102,0.4)] hover:-translate-y-0.5"
            >
              <MessageCircle size={22} />
              WhatsApp
            </a>

            {/* Email */}
            <a
              href="mailto:info@ribeirosanto.pt"
              className="inline-flex items-center gap-2.5 bg-transparent text-white border border-white/30 px-8 py-4 rounded-full font-medium hover:bg-white/10 hover:border-white/50 transition-all duration-300"
            >
              <Mail size={18} />
              info@ribeirosanto.pt
            </a>
          </motion.div>

          {/* Phone */}
          <motion.div
            variants={fadeInUp}
            custom={4}
            className="flex items-center justify-center gap-2 text-[#C4A882]/80 text-sm"
          >
            <Phone size={14} />
            <span>+351 232 XXX XXX</span>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
