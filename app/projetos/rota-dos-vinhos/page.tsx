"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Data ─── */

const regions = [
  {
    name: "Douro",
    tagline: "O berço do vinho do Porto",
    emoji: "🏔️",
    grad: "rota-grad-douro",
  },
  {
    name: "Alentejo",
    tagline: "Planícies douradas, vinhos robustos",
    emoji: "☀️",
    grad: "rota-grad-alentejo",
  },
  {
    name: "Dão",
    tagline: "O elegante coração de Portugal",
    emoji: "🌿",
    grad: "rota-grad-dao",
  },
  {
    name: "Bairrada",
    tagline: "Espumantes e tradição",
    emoji: "🥂",
    grad: "rota-grad-bairrada",
  },
  {
    name: "Vinhos Verdes",
    tagline: "Frescura atlântica do Minho",
    emoji: "🌊",
    grad: "rota-grad-verdes",
  },
  {
    name: "Lisboa",
    tagline: "A capital encontra a vinha",
    emoji: "🌇",
    grad: "rota-grad-lisboa",
  },
];

const steps = [
  {
    icon: "🗓️",
    title: "Escolha a Região",
    desc: "Selecione uma das 6 regiões vinícolas",
    color: "#2563EB",
  },
  {
    icon: "📅",
    title: "Marque a Data",
    desc: "Tours disponíveis de quinta a domingo",
    color: "#F59E0B",
  },
  {
    icon: "🍷",
    title: "Aproveite",
    desc: "Transporte, guia, provas e almoço incluídos",
    color: "#16A34A",
  },
];

const experiences = [
  {
    title: "Tour do Douro Clássico",
    price: "€49",
    unit: "/pessoa",
    tags: ["Full day", "3 quintas", "Almoço"],
    border: "rota-border-douro",
    priceColor: "bg-orange-100 text-orange-700",
  },
  {
    title: "Vinhos Verdes & Minho",
    price: "€39",
    unit: "/pessoa",
    tags: ["Half day", "2 adegas", "Petiscos"],
    border: "rota-border-verdes",
    priceColor: "bg-cyan-100 text-cyan-700",
  },
  {
    title: "Alentejo Premium",
    price: "€69",
    unit: "/pessoa",
    tags: ["Full day", "4 herdades", "Almoço gourmet"],
    border: "rota-border-alentejo",
    priceColor: "bg-yellow-100 text-yellow-700",
  },
  {
    title: "Bairrada & Espumantes",
    price: "€45",
    unit: "/pessoa",
    tags: ["Half day", "Caves", "Prova de espumantes"],
    border: "rota-border-bairrada",
    priceColor: "bg-pink-100 text-pink-700",
  },
  {
    title: "Dão Secreto",
    price: "€55",
    unit: "/pessoa",
    tags: ["Full day", "3 quintas", "Almoço típico"],
    border: "rota-border-dao",
    priceColor: "bg-green-100 text-green-700",
  },
  {
    title: "Lisboa Wine & Food",
    price: "€59",
    unit: "/pessoa",
    tags: ["Half day", "3 produtores", "Tapas"],
    border: "rota-border-lisboa",
    priceColor: "bg-red-100 text-red-700",
  },
];

const faqs = [
  {
    q: "O transporte está incluído?",
    a: "Sim, fazemos pickup no centro do Porto ou Lisboa, dependendo da rota escolhida.",
  },
  {
    q: "Posso ir com crianças?",
    a: "Sim, temos atividades adaptadas para menores. As crianças podem participar nas visitas e desfrutar de sumos de uva e almoço.",
  },
  {
    q: "Quanto tempo demora?",
    a: "Depende do tour: Half day dura cerca de 4 horas, Full day cerca de 8 horas.",
  },
  {
    q: "O almoço está incluído?",
    a: "Sim, em todos os tours full day o almoço regional está incluído. Nos half day incluímos petiscos ou tapas.",
  },
  {
    q: "Posso cancelar?",
    a: "Cancelamento grátis até 48 horas antes da data do tour. Após esse prazo, aplicam-se as condições gerais.",
  },
];

const floatingEmojis = [
  { emoji: "🍇", top: "18%", left: "8%", delay: 0 },
  { emoji: "🍷", top: "30%", right: "6%", delay: 0.5 },
  { emoji: "🌿", top: "60%", left: "5%", delay: 1 },
  { emoji: "🌞", top: "70%", right: "10%", delay: 1.5 },
];

/* ─── Animations ─── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

/* ─── Components ─── */

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 px-1 text-left min-h-[56px] cursor-pointer"
        aria-expanded={open}
      >
        <span className="font-semibold text-slate-800 text-base pr-4">
          {q}
        </span>
        <span className="text-2xl text-blue-600 flex-shrink-0 leading-none">
          {open ? "−" : "+"}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 px-1 text-slate-600 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Page ─── */

export default function RotaDosVinhosPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Google Font */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      {/* ════════ NAV ════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-5 h-16">
          <a href="#" className="text-xl font-extrabold text-blue-600">
            Rota dos Vinhos 🍇
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Regiões", href: "#regioes" },
              { label: "Experiências", href: "#experiencias" },
              { label: "Reservar", href: "#reservar" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 hover:after:w-full after:h-[3px] after:bg-gradient-to-r after:from-blue-500 after:to-amber-400 after:transition-all after:duration-300 after:rounded-full"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-[5px] p-2 min-w-[44px] min-h-[44px] items-center justify-center cursor-pointer"
            aria-label="Menu"
          >
            <span
              className={`block w-6 h-[2.5px] bg-slate-700 rounded transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-[7.5px]" : ""}`}
            />
            <span
              className={`block w-6 h-[2.5px] bg-slate-700 rounded transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-[2.5px] bg-slate-700 rounded transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7.5px]" : ""}`}
            />
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden bg-white border-t border-slate-100"
            >
              <div className="flex flex-col px-5 py-4 gap-1">
                {[
                  { label: "Regiões", href: "#regioes" },
                  { label: "Experiências", href: "#experiencias" },
                  { label: "Reservar", href: "#reservar" },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="py-3 text-base font-semibold text-slate-700 hover:text-blue-600 transition-colors min-h-[44px] flex items-center"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ════════ HERO ════════ */}
      <section className="relative pt-28 pb-20 px-5 text-center overflow-hidden">
        {/* Floating emojis */}
        {floatingEmojis.map((e, i) => (
          <span
            key={i}
            className={`absolute text-3xl md:text-4xl opacity-20 pointer-events-none rota-float ${i === 1 ? "rota-float-delay-1" : i === 2 ? "rota-float-delay-2" : i === 3 ? "rota-float-delay-3" : ""}`}
            style={{ top: e.top, left: e.left, right: e.right } as React.CSSProperties}
            aria-hidden="true"
          >
            {e.emoji}
          </span>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto relative z-10"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
            Descubra Portugal,{" "}
            <span className="text-blue-600">um copo de cada vez</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto">
            Rotas guiadas pelas melhores regiões vinícolas portuguesas
          </p>

          {/* Pill badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              "🍷 6 Regiões",
              "🚐 Transporte incluído",
              "👨‍🍳 Almoço regional",
              "📸 Guia local",
            ].map((badge) => (
              <span key={badge} className="rota-badge">
                {badge}
              </span>
            ))}
          </div>

          <a
            href="#regioes"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-4 rounded-full transition-colors min-h-[52px] shadow-lg shadow-blue-600/25"
          >
            Explorar Rotas →
          </a>
        </motion.div>
      </section>

      {/* ════════ REGIÕES ════════ */}
      <section id="regioes" className="py-16">
        <div className="max-w-6xl mx-auto px-5">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-3"
          >
            Regiões Vinícolas
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="text-slate-500 text-center mb-8 max-w-md mx-auto"
          >
            Deslize para explorar as 6 regiões disponíveis
          </motion.p>
        </div>

        <div className="rota-snap-x rota-hide-scrollbar pl-5 md:pl-[max(1.25rem,calc((100%-72rem)/2+1.25rem))]">
          {regions.map((r, i) => (
            <motion.div
              key={r.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className={`${r.grad} rounded-3xl p-8 text-white flex flex-col justify-between min-h-[260px] w-[85vw] max-w-[340px] md:w-[300px]`}
            >
              <span className="text-5xl mb-4 block">{r.emoji}</span>
              <div>
                <h3 className="text-2xl font-extrabold mb-1">{r.name}</h3>
                <p className="text-white/80 text-sm mb-4">{r.tagline}</p>
                <span className="text-sm font-bold opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
                  Explorar →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════ COMO FUNCIONA ════════ */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-5">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-12"
          >
            Como Funciona
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative">
            {/* Dashed connector line (desktop only) */}
            <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-[2px] border-t-2 border-dashed border-slate-300" />

            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="flex flex-col items-center text-center relative z-10"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-4 shadow-md"
                  style={{ backgroundColor: step.color + "18" }}
                >
                  <span>{step.icon}</span>
                </div>
                <span
                  className="text-xs font-bold mb-2 px-3 py-1 rounded-full text-white"
                  style={{ backgroundColor: step.color }}
                >
                  Passo {i + 1}
                </span>
                <h3 className="font-extrabold text-slate-900 text-lg mb-1">
                  {step.title}
                </h3>
                <p className="text-slate-500 text-sm max-w-[240px]">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ EXPERIÊNCIAS ════════ */}
      <section id="experiencias" className="py-16">
        <div className="max-w-5xl mx-auto px-5">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-3"
          >
            Experiências
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="text-slate-500 text-center mb-10 max-w-md mx-auto"
          >
            Escolha o tour perfeito para si
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow ${exp.border}`}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <h3 className="font-extrabold text-slate-900 text-lg">
                    {exp.title}
                  </h3>
                  <span
                    className={`${exp.priceColor} text-sm font-bold px-3 py-1 rounded-full whitespace-nowrap`}
                  >
                    {exp.price}
                    <span className="font-normal">{exp.unit}</span>
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href="#reservar"
                  className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors min-h-[44px]"
                >
                  Reservar →
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ FAQ ════════ */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-2xl mx-auto px-5">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-10"
          >
            Perguntas Frequentes
          </motion.h2>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
          >
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════ RESERVAR / CTA ════════ */}
      <section
        id="reservar"
        className="py-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white text-center"
      >
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="max-w-xl mx-auto px-5"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Pronto para a aventura?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Reserve o seu tour e descubra o melhor dos vinhos portugueses
          </p>

          <a
            href="https://wa.me/351934035971"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-blue-700 font-bold text-lg px-8 py-4 rounded-full hover:bg-blue-50 transition-colors min-h-[52px] shadow-lg mb-6"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-green-600"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Reservar via WhatsApp
          </a>

          <p className="text-blue-200 text-sm font-medium">
            🎉 Desconto de 10% para grupos de 6+
          </p>
        </motion.div>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-5xl mx-auto px-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <span className="text-xl font-extrabold text-blue-600">
              Rota dos Vinhos 🍇
            </span>
            <div className="flex items-center gap-6">
              {[
                { label: "Regiões", href: "#regioes" },
                { label: "Experiências", href: "#experiencias" },
                { label: "Reservar", href: "#reservar" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-600 hover:text-blue-600 transition-colors font-medium min-h-[44px] flex items-center"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-sm text-slate-400">
              Uma experiência{" "}
              <a
                href="/"
                className="text-blue-500 hover:text-blue-600 font-semibold transition-colors"
              >
                Descomplicai
              </a>
            </p>
            <p className="text-xs text-slate-300">
              © {new Date().getFullYear()} Rota dos Vinhos. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
