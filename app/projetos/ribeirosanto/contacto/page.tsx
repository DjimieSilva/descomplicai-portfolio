"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Car,
  MessageCircle,
  Store,
  Globe,
  Wine,
  Building2,
  UtensilsCrossed,
  Send,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

/* ═══════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════ */

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

/* ═══════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════ */

const CONTACT_CARDS = [
  {
    icon: MapPin,
    title: "Morada",
    lines: ["Quinta do Ribeiro Santo", "Carregal do Sal", "3430-XXX, Portugal"],
  },
  {
    icon: Phone,
    title: "Telefone & Email",
    lines: ["+351 232 960 XXX", "info@ribeirosanto.pt"],
    links: [
      { href: "tel:+351232960000", label: "+351 232 960 XXX" },
      { href: "mailto:info@ribeirosanto.pt", label: "info@ribeirosanto.pt" },
    ],
  },
  {
    icon: Clock,
    title: "Horário",
    lines: [
      "Seg - Sex: 9h — 18h",
      "Sábado: 10h — 17h",
      "Domingo: com marcação prévia",
    ],
  },
];

const ROUTES = [
  {
    from: "De Lisboa",
    description: "A1 Norte → A25 direção Viseu → Saída Carregal do Sal",
    time: "~2h45",
  },
  {
    from: "Do Porto",
    description: "A1 Sul → A25 → Saída Carregal do Sal",
    time: "~1h45",
  },
  {
    from: "De Coimbra",
    description: "IC2/A14 → A25 → Saída Carregal do Sal",
    time: "~45min",
  },
];

const SUBJECTS = [
  "Reserva Enoturismo",
  "Encomenda de Vinhos",
  "Distribuição/Parceria",
  "Imprensa",
  "Outro",
];

const WHERE_TO_BUY = [
  {
    icon: Store,
    title: "Loja do Produtor",
    description:
      "Visite a nossa loja na Quinta. Preços de produtor, toda a gama disponível.",
    cta: null,
  },
  {
    icon: Globe,
    title: "Online",
    description: "Disponível nas melhores plataformas de vinho online.",
    cta: [
      { label: "Vinha.pt", href: "https://www.vinha.pt" },
      { label: "Portugal Vineyards", href: "https://www.portugalvineyards.com" },
    ],
  },
  {
    icon: Wine,
    title: "Garrafeiras",
    description:
      "Disponível em garrafeiras selecionadas em todo o país, incluindo a Garrafeira Nacional e garrafeiras regionais.",
    cta: null,
  },
  {
    icon: Building2,
    title: "Internacional",
    description:
      "The Wine Society (UK) e mercados selecionados na Europa e além.",
    cta: null,
  },
  {
    icon: UtensilsCrossed,
    title: "Restauração",
    description:
      "Para incluir os nossos vinhos na sua carta, contacte-nos diretamente para condições especiais.",
    cta: null,
  },
];

/* ═══════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════ */

export default function ContactoPage() {
  /* ── Form State ── */
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    mensagem: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ nome: "", email: "", telefone: "", assunto: "", mensagem: "" });
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterSubmitted(true);
    setNewsletterEmail("");
    setTimeout(() => setNewsletterSubmitted(false), 5000);
  };

  return (
    <>
      {/* ═══════════════════════════════════════════
          1. HERO
          ═══════════════════════════════════════════ */}
      <section
        style={{ backgroundColor: "var(--rs-cream)" }}
        className="relative overflow-hidden"
      >
        {/* Decorative grain */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          }}
        />

        <div className="mx-auto max-w-6xl px-6 pt-40 pb-24 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-4 text-sm font-medium uppercase tracking-[0.25em]"
            style={{ color: "var(--rs-burgundy)" }}
          >
            Fale Connosco
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="mb-6 text-5xl font-bold leading-tight md:text-7xl"
            style={{
              fontFamily: "var(--rs-font-serif)",
              color: "var(--rs-dark)",
            }}
          >
            Contacto
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mx-auto max-w-lg text-lg"
            style={{ color: "var(--rs-stone)" }}
          >
            Estamos à sua espera no coração do Dão
          </motion.p>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mx-auto mt-10 h-px w-24"
            style={{ backgroundColor: "var(--rs-gold)" }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          2. CONTACT INFO — 3-column grid
          ═══════════════════════════════════════════ */}
      <section style={{ backgroundColor: "var(--rs-white)" }} className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-8 md:grid-cols-3"
          >
            {CONTACT_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                variants={fadeInUp}
                custom={i}
                className="group rounded-xl p-8 text-center transition-shadow duration-300 hover:shadow-lg"
                style={{
                  backgroundColor: "var(--rs-cream)",
                  border: "1px solid var(--rs-cream-dark)",
                }}
              >
                <div
                  className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full transition-colors duration-300"
                  style={{
                    backgroundColor: "var(--rs-burgundy)",
                    color: "var(--rs-cream)",
                  }}
                >
                  <card.icon size={24} />
                </div>
                <h3
                  className="mb-4 text-lg font-semibold uppercase tracking-wider"
                  style={{
                    fontFamily: "var(--rs-font-serif)",
                    color: "var(--rs-dark)",
                  }}
                >
                  {card.title}
                </h3>
                <div className="space-y-1">
                  {card.links
                    ? card.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          className="block text-sm transition-colors duration-200 hover:underline"
                          style={{ color: "var(--rs-burgundy)" }}
                        >
                          {link.label}
                        </a>
                      ))
                    : card.lines.map((line) => (
                        <p
                          key={line}
                          className="text-sm"
                          style={{ color: "var(--rs-stone)" }}
                        >
                          {line}
                        </p>
                      ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. MAP SECTION
          ═══════════════════════════════════════════ */}
      <section style={{ backgroundColor: "var(--rs-cream)" }} className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeIn}
            className="mb-16 text-center"
          >
            <h2
              className="mb-4 text-3xl font-bold md:text-4xl"
              style={{
                fontFamily: "var(--rs-font-serif)",
                color: "var(--rs-dark)",
              }}
            >
              Como Chegar
            </h2>
            <p className="mx-auto max-w-lg text-base" style={{ color: "var(--rs-stone)" }}>
              No coração da Região Demarcada do Dão, a poucos minutos da autoestrada A25
            </p>
          </motion.div>

          {/* Stylized Map */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeIn}
            className="mb-16 overflow-hidden rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, var(--rs-dark) 0%, var(--rs-dark-soft) 50%, #3a2a24 100%)",
            }}
          >
            <div className="relative flex min-h-[360px] items-center justify-center p-10">
              {/* Topographic lines decoration */}
              <div className="pointer-events-none absolute inset-0 opacity-10">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full border"
                    style={{
                      borderColor: "var(--rs-gold)",
                      width: `${180 + i * 60}px`,
                      height: `${120 + i * 40}px`,
                      top: `${50 - i * 3}%`,
                      left: `${50 - i * 3}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                ))}
              </div>

              {/* Map content */}
              <div className="relative z-10 text-center">
                {/* Pin */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.3,
                  }}
                  className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
                  style={{ backgroundColor: "var(--rs-burgundy)" }}
                >
                  <MapPin size={28} style={{ color: "var(--rs-cream)" }} />
                </motion.div>

                <h3
                  className="mb-2 text-2xl font-bold"
                  style={{
                    fontFamily: "var(--rs-font-serif)",
                    color: "var(--rs-cream)",
                  }}
                >
                  Quinta do Ribeiro Santo
                </h3>
                <p
                  className="mb-1 text-sm font-medium uppercase tracking-widest"
                  style={{ color: "var(--rs-gold)" }}
                >
                  Região do Dão
                </p>
                <p className="mb-6 text-xs" style={{ color: "var(--rs-stone-light)" }}>
                  40.3586° N, 7.9914° W
                </p>

                {/* Distance labels */}
                <div className="flex flex-wrap justify-center gap-4">
                  {[
                    { city: "Viseu", dist: "20km" },
                    { city: "Serra da Estrela", dist: "30km" },
                    { city: "Coimbra", dist: "45km" },
                  ].map((item) => (
                    <span
                      key={item.city}
                      className="rounded-full px-4 py-1.5 text-xs font-medium"
                      style={{
                        backgroundColor: "rgba(201, 169, 110, 0.15)",
                        color: "var(--rs-gold-light)",
                        border: "1px solid rgba(201, 169, 110, 0.25)",
                      }}
                    >
                      {item.city} — {item.dist}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Driving Routes */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-6 md:grid-cols-3"
          >
            {ROUTES.map((route, i) => (
              <motion.div
                key={route.from}
                variants={fadeInUp}
                custom={i}
                className="rounded-xl p-6 transition-shadow duration-300 hover:shadow-md"
                style={{
                  backgroundColor: "var(--rs-white)",
                  border: "1px solid var(--rs-cream-dark)",
                }}
              >
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: "var(--rs-burgundy)",
                      color: "var(--rs-cream)",
                    }}
                  >
                    <Car size={18} />
                  </div>
                  <div>
                    <h4
                      className="text-sm font-bold"
                      style={{ color: "var(--rs-dark)" }}
                    >
                      {route.from}
                    </h4>
                    <span
                      className="text-xs font-semibold"
                      style={{ color: "var(--rs-burgundy)" }}
                    >
                      {route.time}
                    </span>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--rs-stone)" }}>
                  {route.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4. CONTACT FORM
          ═══════════════════════════════════════════ */}
      <section style={{ backgroundColor: "var(--rs-white)" }} className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeIn}
            className="mb-12 text-center"
          >
            <h2
              className="mb-4 text-3xl font-bold md:text-4xl"
              style={{
                fontFamily: "var(--rs-font-serif)",
                color: "var(--rs-dark)",
              }}
            >
              Envie-nos uma Mensagem
            </h2>
            <p className="mx-auto max-w-md text-base" style={{ color: "var(--rs-stone)" }}>
              Preencha o formulário abaixo e entraremos em contacto consigo brevemente
            </p>
          </motion.div>

          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeIn}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Nome + Email row */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="nome"
                  className="mb-2 block text-sm font-medium"
                  style={{ color: "var(--rs-dark)" }}
                >
                  Nome <span style={{ color: "var(--rs-burgundy)" }}>*</span>
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  required
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="O seu nome"
                  className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2"
                  style={{
                    backgroundColor: "var(--rs-cream)",
                    border: "1px solid var(--rs-cream-dark)",
                    color: "var(--rs-dark)",
                    // @ts-expect-error CSS custom property in focus
                    "--tw-ring-color": "var(--rs-burgundy)",
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                  style={{ color: "var(--rs-dark)" }}
                >
                  Email <span style={{ color: "var(--rs-burgundy)" }}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@exemplo.pt"
                  className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2"
                  style={{
                    backgroundColor: "var(--rs-cream)",
                    border: "1px solid var(--rs-cream-dark)",
                    color: "var(--rs-dark)",
                  }}
                />
              </div>
            </div>

            {/* Telefone + Assunto row */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="telefone"
                  className="mb-2 block text-sm font-medium"
                  style={{ color: "var(--rs-dark)" }}
                >
                  Telefone
                </label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="+351 900 000 000"
                  className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2"
                  style={{
                    backgroundColor: "var(--rs-cream)",
                    border: "1px solid var(--rs-cream-dark)",
                    color: "var(--rs-dark)",
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="assunto"
                  className="mb-2 block text-sm font-medium"
                  style={{ color: "var(--rs-dark)" }}
                >
                  Assunto <span style={{ color: "var(--rs-burgundy)" }}>*</span>
                </label>
                <select
                  id="assunto"
                  name="assunto"
                  required
                  value={formData.assunto}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-lg px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2"
                  style={{
                    backgroundColor: "var(--rs-cream)",
                    border: "1px solid var(--rs-cream-dark)",
                    color: formData.assunto ? "var(--rs-dark)" : "var(--rs-stone-light)",
                  }}
                >
                  <option value="" disabled>
                    Selecione um assunto
                  </option>
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mensagem */}
            <div>
              <label
                htmlFor="mensagem"
                className="mb-2 block text-sm font-medium"
                style={{ color: "var(--rs-dark)" }}
              >
                Mensagem <span style={{ color: "var(--rs-burgundy)" }}>*</span>
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                required
                rows={6}
                value={formData.mensagem}
                onChange={handleChange}
                placeholder="Como podemos ajudar?"
                className="w-full resize-none rounded-lg px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2"
                style={{
                  backgroundColor: "var(--rs-cream)",
                  border: "1px solid var(--rs-cream-dark)",
                  color: "var(--rs-dark)",
                }}
              />
            </div>

            {/* Submit */}
            <div className="text-center">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg px-10 py-4 text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
                style={{
                  backgroundColor: "var(--rs-burgundy)",
                  color: "var(--rs-cream)",
                }}
              >
                <Send size={16} />
                Enviar Mensagem
              </button>
            </div>

            {/* Success message */}
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-lg p-4 text-center text-sm font-medium"
                style={{
                  backgroundColor: "rgba(114, 47, 55, 0.08)",
                  color: "var(--rs-burgundy)",
                  border: "1px solid rgba(114, 47, 55, 0.2)",
                }}
              >
                Obrigado! Responderemos em menos de 24 horas.
              </motion.div>
            )}
          </motion.form>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. WHATSAPP CTA
          ═══════════════════════════════════════════ */}
      <section
        className="py-20"
        style={{
          background:
            "linear-gradient(135deg, #128C7E 0%, #25D366 50%, #128C7E 100%)",
        }}
      >
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeIn}
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <MessageCircle size={36} className="text-white" />
            </div>

            <h2
              className="mb-4 text-3xl font-bold text-white md:text-4xl"
              style={{ fontFamily: "var(--rs-font-serif)" }}
            >
              Prefere WhatsApp?
            </h2>

            <p className="mx-auto mb-8 max-w-md text-base text-white/90">
              Resposta rápida — normalmente em menos de 1 hora
            </p>

            <a
              href="https://wa.me/351912345678"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-white px-10 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-[0.98]"
              style={{ color: "#25D366" }}
            >
              <MessageCircle size={20} />
              Enviar Mensagem no WhatsApp
            </a>

            <p className="mt-6 text-sm text-white/70">
              +351 912 345 678
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          6. WHERE TO BUY
          ═══════════════════════════════════════════ */}
      <section style={{ backgroundColor: "var(--rs-cream)" }} className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeIn}
            className="mb-16 text-center"
          >
            <p
              className="mb-3 text-sm font-medium uppercase tracking-[0.25em]"
              style={{ color: "var(--rs-burgundy)" }}
            >
              Distribuição
            </p>
            <h2
              className="mb-4 text-3xl font-bold md:text-4xl"
              style={{
                fontFamily: "var(--rs-font-serif)",
                color: "var(--rs-dark)",
              }}
            >
              Onde Encontrar os Nossos Vinhos
            </h2>
            <div
              className="mx-auto mt-6 h-px w-16"
              style={{ backgroundColor: "var(--rs-gold)" }}
            />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {WHERE_TO_BUY.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                custom={i}
                className="group rounded-xl p-7 transition-all duration-300 hover:shadow-lg"
                style={{
                  backgroundColor: "var(--rs-white)",
                  border: "1px solid var(--rs-cream-dark)",
                }}
              >
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg transition-colors duration-300"
                  style={{
                    backgroundColor: "rgba(114, 47, 55, 0.08)",
                    color: "var(--rs-burgundy)",
                  }}
                >
                  <item.icon size={22} />
                </div>

                <h3
                  className="mb-2 text-base font-bold"
                  style={{
                    fontFamily: "var(--rs-font-serif)",
                    color: "var(--rs-dark)",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  className="mb-4 text-sm leading-relaxed"
                  style={{ color: "var(--rs-stone)" }}
                >
                  {item.description}
                </p>

                {item.cta && (
                  <div className="flex flex-wrap gap-3">
                    {item.cta.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-colors duration-200"
                        style={{ color: "var(--rs-burgundy)" }}
                      >
                        {link.label}
                        <ArrowRight size={12} />
                      </a>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          7. NEWSLETTER
          ═══════════════════════════════════════════ */}
      <section
        className="py-20"
        style={{ backgroundColor: "var(--rs-dark)" }}
      >
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeIn}
          >
            <h2
              className="mb-4 text-3xl font-bold md:text-4xl"
              style={{
                fontFamily: "var(--rs-font-serif)",
                color: "var(--rs-cream)",
              }}
            >
              Fique a Par das Novidades
            </h2>

            <p className="mx-auto mb-8 max-w-md text-base" style={{ color: "var(--rs-stone-light)" }}>
              Receba notícias sobre novas colheitas, eventos e ofertas exclusivas
            </p>

            <form
              onSubmit={handleNewsletter}
              className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="O seu email"
                className="flex-1 rounded-lg px-5 py-3.5 text-sm outline-none transition-all duration-200 focus:ring-2"
                style={{
                  backgroundColor: "var(--rs-dark-soft)",
                  border: "1px solid rgba(201, 169, 110, 0.2)",
                  color: "var(--rs-cream)",
                }}
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg px-8 py-3.5 text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  backgroundColor: "var(--rs-burgundy)",
                  color: "var(--rs-cream)",
                }}
              >
                Subscrever
                <ArrowRight size={14} />
              </button>
            </form>

            {newsletterSubmitted && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-sm"
                style={{ color: "var(--rs-gold)" }}
              >
                Subscrição confirmada! Obrigado.
              </motion.p>
            )}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          8. COMPANY INFO — Legal footer
          ═══════════════════════════════════════════ */}
      <section
        className="py-10"
        style={{
          backgroundColor: "var(--rs-cream)",
          borderTop: "1px solid var(--rs-cream-dark)",
        }}
      >
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="mb-1 text-xs" style={{ color: "var(--rs-stone-light)" }}>
            Magnum — Carlos Lucas Vinhos, Lda. &middot; NIF: XXX XXX XXX
          </p>
          <p className="mb-3 text-xs" style={{ color: "var(--rs-stone-light)" }}>
            Carregal do Sal, Portugal
          </p>
          <p
            className="text-xs italic"
            style={{ color: "var(--rs-stone)" }}
          >
            Beba com moderação
          </p>
        </div>
      </section>
    </>
  );
}
