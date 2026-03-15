"use client";

import { useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

/* ═══════════════════════════════════════════════
   Data
   ═══════════════════════════════════════════════ */

const NAV_LINKS = [
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Cidades", href: "#cidades" },
  { label: "Tour Típico", href: "#tour" },
  { label: "Petiscos", href: "#petiscos" },
  { label: "Preços", href: "#precos" },
  { label: "FAQ", href: "#faq" },
  { label: "Reservar", href: "#reservar" },
];

const STEPS = [
  {
    emoji: "\uD83E\uDD1D",
    title: "Juntamo-nos",
    desc: "Encontramo-nos no ponto de encontro no centro da cidade. O teu guia local está à espera com um sorriso.",
  },
  {
    emoji: "\uD83D\uDEB6",
    title: "Caminhamos",
    desc: "Percorremos ruas e becos que até os locais não conhecem. História, curiosidades e muita boa disposição.",
  },
  {
    emoji: "\uD83C\uDF77",
    title: "Provamos",
    desc: "Paramos em tascas autênticas para provar vinhos locais e petiscos que a tua avó aprovaria.",
  },
  {
    emoji: "\uD83D\uDD01",
    title: "Repetimos",
    desc: "Mais uma tasca, mais um vinho, mais um petisco. E assim até ao fim da noite (ou até não aguentares mais).",
  },
];

const CITIES = [
  {
    name: "Porto",
    region: "Norte",
    emoji: "\uD83C\uDF09",
    desc: "Das caves de Gaia às tascas da Ribeira. Francesinha não incluída (mas o guia sabe onde ir depois).",
    highlights: ["Vinho verde na fonte", "Tripas à moda", "Porto tawny com queijada"],
    tours: "Clássico + Completo",
    img: "/wine-images/petiscos-bar.jpg",
  },
  {
    name: "Lisboa",
    region: "Centro",
    emoji: "\uD83D\uDE83",
    desc: "Do Bairro Alto à Mouraria, pelos becos que o GPS não encontra. Ginjinha obrigatória.",
    highlights: ["Ginjinha no balcão", "Sardinha fumada na Graça", "Vinho do Dão numa tasca de 1923"],
    tours: "Clássico + Completo + Privado",
    img: "/wine-images/petiscos-group.jpg",
  },
  {
    name: "Braga",
    region: "Minho",
    emoji: "\u26EA",
    desc: "A cidade mais jovem do país, com as tascas mais antigas. Vinho verde como manda a tradição.",
    highlights: ["Vinho verde da sub-região", "Rojões com sarrabulho", "Pudim Abade de Priscos"],
    tours: "Clássico + Completo",
    img: "/wine-images/petiscos-tapas.jpg",
  },
  {
    name: "Évora",
    region: "Alentejo",
    emoji: "\uD83C\uDFDB\uFE0F",
    desc: "Cidade-museu com as melhores tascas do Alentejo. Aqui o vinho é forte e os petiscos são generosos.",
    highlights: ["Vinho do Alentejo", "Migas com carne de porco", "Queijo de Nisa"],
    tours: "Clássico + Privado",
    img: "/wine-images/petiscos-cheese.jpg",
  },
  {
    name: "Faro",
    region: "Algarve",
    emoji: "\u2600\uFE0F",
    desc: "O Algarve que os turistas não conhecem. Mariscos, cataplanas e vinhos surpreendentes.",
    highlights: ["Cataplana de amêijoas", "Vinho do Algarve", "Figos com amêndoa"],
    tours: "Clássico (verão)",
    img: "/wine-images/petiscos-drinks.jpg",
  },
];

const TIMELINE = [
  {
    time: "18:30",
    title: "Ponto de Encontro",
    desc: "O teu guia espera-te no centro histórico. Breve introdução e apresentações do grupo.",
    emoji: "\uD83D\uDCCD",
  },
  {
    time: "18:45",
    title: "Tasca 1 — Petiscos & Vinho Verde",
    desc: "Primeira paragem: pataniscas de bacalhau, azeitonas temperadas, e um copo de vinho verde fresco. O aperitivo perfeito.",
    emoji: "\uD83E\uDDC0",
  },
  {
    time: "19:30",
    title: "Tasca 2 — Queijos & Tinto",
    desc: "Tábua de queijos portugueses (Serra, Nisa, Azeitão) com pão quente e um tinto do Douro encorpado.",
    emoji: "\uD83C\uDF77",
  },
  {
    time: "20:15",
    title: "Tasca 3 — Enchidos & Reserva",
    desc: "Chouriço assado na telha, presunto de porco preto, alheira de Mirandela. Acompanhado de um reserva selecionado.",
    emoji: "\uD83C\uDF56",
  },
  {
    time: "21:00",
    title: "Tasca 4 — Doce & Moscatel",
    desc: "Pastel de nata acabado de fazer, queijadas e um copo de moscatel de Setúbal para fechar em beleza.",
    emoji: "\uD83C\uDF6E",
  },
  {
    time: "21:30+",
    title: "Bar Crawl Opcional",
    desc: "Para quem quer continuar a noite! O guia sugere os melhores bares da zona. A festa continua!",
    emoji: "\uD83C\uDF89",
  },
];

const PETISCOS = [
  { emoji: "\uD83D\uDC1F", name: "Pataniscas", desc: "Bacalhau frito dourado" },
  { emoji: "\uD83D\uDD25", name: "Pica-pau", desc: "Carne com pickles" },
  { emoji: "\uD83C\uDF2D", name: "Alheira", desc: "Enchido de Mirandela" },
  { emoji: "\uD83E\uDDC0", name: "Queijo da Serra", desc: "Cremoso e intenso" },
  { emoji: "\uD83C\uDF56", name: "Presunto", desc: "Porco preto alentejano" },
  { emoji: "\uD83E\uDD50", name: "Pastel de Nata", desc: "Ainda quente do forno" },
  { emoji: "\uD83E\uDD5C", name: "Tremoços", desc: "O snack de balcão" },
  { emoji: "\uD83E\uDD6B", name: "Chouriço Assado", desc: "Flambado na telha" },
];

const FAMILY_FEATURES = [
  {
    emoji: "\uD83E\uDDD2",
    title: "Menu Kids",
    desc: "Petiscos adaptados e sumo de fruta natural em cada paragem.",
  },
  {
    emoji: "\uD83C\uDFAF",
    title: "Atividades pelo Caminho",
    desc: "Caça ao tesouro pelas ruas, quiz sobre a cidade, e muitas curiosidades.",
  },
  {
    emoji: "\uD83D\uDC76",
    title: "Ritmo Familiar",
    desc: "Paragens mais longas, sem pressas. Carrinho de bebé? Sem problema.",
  },
  {
    emoji: "\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC66",
    title: "Todos Bem-vindos",
    desc: "Dos 3 aos 93 anos. A mesa portuguesa é para toda a gente.",
  },
];

const GALLERY_IMAGES = [
  { src: "/wine-images/petiscos-tapas.jpg", alt: "Petiscos variados numa tasca portuguesa" },
  { src: "/wine-images/petiscos-bar.jpg", alt: "Bar tradicional português com vinhos" },
  { src: "/wine-images/petiscos-group.jpg", alt: "Grupo a provar petiscos e vinhos" },
  { src: "/wine-images/petiscos-cheese.jpg", alt: "Tábua de queijos portugueses" },
  { src: "/wine-images/petiscos-drinks.jpg", alt: "Copos de vinho tinto e branco" },
  { src: "/wine-images/petiscos-food2.jpg", alt: "Petiscos tradicionais portugueses" },
];

const TESTIMONIALS = [
  {
    quote: "A melhor noite que tivemos no Porto! O guia levou-nos a sítios que nunca teríamos encontrado sozinhos.",
    author: "Ana & Pedro",
    origin: "Lisboa",
    tour: "Porto Completo",
  },
  {
    quote: "We booked for our hen party and it was AMAZING. So much fun, so much food, so much wine!",
    author: "Sarah",
    origin: "London",
    tour: "Lisboa Privado",
  },
  {
    quote: "Levámos os miúdos e eles adoraram! Comeram mais petiscos que nós. Já querem voltar.",
    author: "Família Santos",
    origin: "Coimbra",
    tour: "Braga Clássico",
  },
  {
    quote: "Eu pensava que conhecia Lisboa. Estava enganado. Tascas incríveis que não sabia que existiam!",
    author: "Miguel",
    origin: "Lisboa",
    tour: "Lisboa Completo",
  },
  {
    quote: "The wine was fantastic and the food... oh the food! Best experience in Portugal by far.",
    author: "Hans & Brigitte",
    origin: "Berlin",
    tour: "Porto Clássico",
  },
  {
    quote: "Perfeito para team building! A equipa toda se divertiu e ainda descobrimos a cidade. Top!",
    author: "Joana",
    origin: "Porto (empresa)",
    tour: "Porto Privado",
  },
];

const PRICING = [
  {
    name: "Clássico",
    price: "25",
    per: "por pessoa",
    featured: false,
    features: [
      "2 horas de tour",
      "4 paragens em tascas",
      "4 provas de vinho",
      "4 petiscos incluídos",
      "Guia local bilingue",
      "Grupos até 12 pessoas",
      "Disponível aos sábados",
    ],
  },
  {
    name: "Completo",
    price: "40",
    per: "por pessoa",
    featured: true,
    features: [
      "3 horas de tour",
      "6 paragens em tascas",
      "6 provas de vinho",
      "8 petiscos incluídos",
      "Ginjinha de despedida",
      "Guia local bilingue",
      "Grupos até 10 pessoas",
      "Sextas e sábados",
    ],
  },
  {
    name: "Privado",
    price: "55",
    per: "por pessoa (min. 4)",
    featured: false,
    features: [
      "Horário à tua escolha",
      "Rota personalizada",
      "Guia exclusivo",
      "Até 8 paragens",
      "Vinhos premium",
      "Perfeito para grupos",
      "Aniversários & despedidas",
    ],
  },
];

const FAQ_ITEMS = [
  {
    q: "E se chover?",
    a: "O tour acontece chuva ou sol! Boa parte do percurso é em tascas cobertas, por isso o vinho e os petiscos estão sempre secos. Em caso de chuva forte, ajustamos o percurso para maximizar os espaços interiores. Só cancelamos em casos extremos (e aí remarcamos sem custo).",
  },
  {
    q: "Em que línguas são os tours?",
    a: "Todos os nossos guias falam português e inglês. Para grupos privados, também temos guias que falam espanhol, francês e alemão. Basta indicar a preferência na reserva.",
  },
  {
    q: "Posso levar crianças?",
    a: "Claro que sim! As crianças comem petiscos adaptados e bebem sumo de fruta natural. Em cada paragem há mesa reservada para famílias. Crianças até 10 anos não pagam no Tour Clássico.",
  },
  {
    q: "Tenho restrições alimentares ou alergias. É possível adaptar?",
    a: "Sim! Avisem-nos na reserva e adaptamos o percurso. Temos opções vegetarianas, sem glúten e sem lactose em quase todas as paragens. Alergias graves devem ser comunicadas com antecedência.",
  },
  {
    q: "O tour é acessível a pessoas com mobilidade reduzida?",
    a: "Os percursos incluem ruas de calçada e por vezes escadas. Para pessoas com mobilidade reduzida, temos rotas alternativas mais planas. Contactem-nos para discutirmos a melhor opção.",
  },
  {
    q: "Qual o tamanho dos grupos?",
    a: "O Tour Clássico tem até 12 pessoas, o Completo até 10, e o Privado é exclusivo para o vosso grupo (mínimo 4 pessoas). Queremos que seja intimista, não uma excursão!",
  },
  {
    q: "Como reservo?",
    a: "Reserva diretamente pelo WhatsApp ou email. Confirmamos em menos de 2 horas. Pagamento no dia do tour (dinheiro ou MB Way) ou por transferência antecipada.",
  },
  {
    q: "Posso cancelar?",
    a: "Cancelamento gratuito até 48 horas antes do tour. Cancelamentos com menos de 48 horas: remarcamos para outra data sem custo adicional. No-shows não são reembolsados.",
  },
];

/* ═══════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════ */

function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);
  return scrolled;
}

/* reusable scroll-triggered wrapper */
function Reveal({
  children,
  delay = 0,
  y = 30,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function BounceReveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: 0.5,
        delay,
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Components
   ═══════════════════════════════════════════════ */

/* ── Nav ── */

function Nav() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <>
      <nav className={`rua-nav ${scrolled ? "rua-nav--scrolled" : ""}`}>
        <a href="#" className="rua-nav-logo" onClick={close}>
          Vinho na <span>Rua</span>
        </a>
        <ul className="rua-nav-links">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
        <button
          className={`rua-hamburger ${open ? "rua-hamburger--open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="rua-mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {NAV_LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={close}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                {l.label}
              </motion.a>
            ))}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.4 }}
              style={{ fontSize: "0.9rem", marginTop: "1rem" }}
            >
              Bebe. Come. Descomplica.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Hero ── */

function Hero() {
  return (
    <section className="rua-hero">
      <motion.div
        className="rua-hero-badge"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <span>\uD83C\uDF77</span> Tours de vinho e petiscos
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Bebe. Come.
        <br />
        <span>Descomplica.</span>
      </motion.h1>

      <motion.p
        className="rua-hero-sub"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        Walking tours casuais de vinho e petiscos pelas ruas de Portugal.
        Sem formalidade. Só sabor.
      </motion.p>

      <motion.div
        className="rua-hero-stats"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        {[
          { value: "5", label: "Cidades", emoji: "\uD83C\uDFD9\uFE0F" },
          { value: "3+", label: "Horas", emoji: "\u23F0" },
          { value: "6", label: "Paragens", emoji: "\uD83D\uDCCD" },
        ].map((s) => (
          <div className="rua-hero-stat" key={s.label}>
            <span className="rua-hero-stat-value">
              {s.emoji} {s.value}
            </span>
            <span className="rua-hero-stat-label">{s.label}</span>
          </div>
        ))}
      </motion.div>

      <motion.a
        href="#reservar"
        className="rua-hero-cta"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        Ver Tours \uD83D\uDC49
      </motion.a>
    </section>
  );
}

/* ── How It Works ── */

function HowItWorks() {
  return (
    <section className="rua-section" id="como-funciona">
      <Reveal>
        <h2 className="rua-section-title">Como Funciona \uD83E\uDD37</h2>
        <p className="rua-section-subtitle">
          É simples como abrir uma garrafa. Sem complicações, sem planos
          rígidos. Só boa disposição.
        </p>
      </Reveal>

      <div className="rua-steps">
        {STEPS.map((s, i) => (
          <BounceReveal key={s.title} delay={i * 0.1}>
            <div className="rua-step">
              <div className="rua-step-num">{i + 1}</div>
              <span className="rua-step-emoji">{s.emoji}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </BounceReveal>
        ))}
      </div>
    </section>
  );
}

/* ── Cities ── */

function Cities() {
  return (
    <section className="rua-section rua-section--cream" id="cidades">
      <Reveal>
        <h2 className="rua-section-title">As Cidades \uD83C\uDFD9\uFE0F</h2>
        <p className="rua-section-subtitle">
          Cinco cidades, cinco personalidades. A mesma vibe casual e
          descomplicada em cada uma.
        </p>
      </Reveal>

      <div className="rua-cities">
        {CITIES.map((c, i) => (
          <Reveal key={c.name} delay={i * 0.08}>
            <div className="rua-city-card">
              <div className="rua-city-img">
                <Image
                  src={c.img}
                  alt={`Tour de vinho em ${c.name}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
                <span className="rua-city-tag">
                  {c.emoji} {c.region}
                </span>
              </div>
              <div className="rua-city-body">
                <h3>
                  {c.name}
                  <span>{c.tours}</span>
                </h3>
                <p className="rua-city-desc">{c.desc}</p>
                <div className="rua-city-highlights">
                  {c.highlights.map((h) => (
                    <span key={h}>{h}</span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── Typical Tour Timeline ── */

function TypicalTour() {
  return (
    <section
      className="rua-section rua-section--full rua-section--wine"
      id="tour"
    >
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 1.25rem" }}>
        <Reveal>
          <h2 className="rua-section-title">Um Tour Típico \uD83C\uDF1C</h2>
          <p className="rua-section-subtitle">
            Um exemplo de como é uma noite connosco. Cada cidade tem o seu
            percurso único, mas a magia é sempre a mesma.
          </p>
        </Reveal>

        <div className="rua-timeline">
          {TIMELINE.map((t, i) => (
            <Reveal key={t.time} delay={i * 0.08} y={20}>
              <div className="rua-timeline-item">
                <div className="rua-timeline-dot" />
                <span className="rua-timeline-time">
                  {t.emoji} {t.time}
                </span>
                <h4>{t.title}</h4>
                <p>{t.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── What You'll Taste ── */

function WhatYoullTaste() {
  return (
    <section className="rua-section" id="petiscos">
      <Reveal>
        <h2 className="rua-section-title">O Que Vais Provar \uD83E\uDD24</h2>
        <p className="rua-section-subtitle">
          Petiscos tradicionais portugueses que fazem qualquer tasca cheirar a
          casa. Muda com a estação, mas o sabor é sempre honesto.
        </p>
      </Reveal>

      <div className="rua-taste-grid">
        {PETISCOS.map((p, i) => (
          <BounceReveal key={p.name} delay={i * 0.06}>
            <div className="rua-taste-card">
              <span className="rua-taste-emoji">{p.emoji}</span>
              <h4>{p.name}</h4>
              <p>{p.desc}</p>
            </div>
          </BounceReveal>
        ))}
      </div>
    </section>
  );
}

/* ── For Families ── */

function ForFamilies() {
  return (
    <section className="rua-section" id="familias">
      <Reveal>
        <div className="rua-families">
          <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "0.75rem" }}>
            \uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC66
          </span>
          <h3>Para Famílias</h3>
          <p>
            O vinho é para quem gosta de viver bem. E isso inclui toda a gente.
            Os miúdos comem petiscos como gente grande e bebem sumo de fruta
            natural. Os avós têm mesa garantida em cada paragem. Pessoas que
            &quot;não percebem de vinho&quot;? Perfeito &mdash; nós explicamos
            tudo sem complicar.
          </p>

          <div className="rua-families-features">
            {FAMILY_FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08}>
                <div className="rua-families-feat">
                  <span className="rua-families-feat-icon">{f.emoji}</span>
                  <div>
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ── Gallery ── */

function Gallery() {
  return (
    <section className="rua-section rua-section--full" id="galeria">
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <h2 className="rua-section-title" style={{ padding: "0 1.25rem" }}>
            Galeria \uD83D\uDCF8
          </h2>
          <p
            className="rua-section-subtitle"
            style={{ padding: "0 1.25rem" }}
          >
            Momentos reais das nossas noites pelas ruas de Portugal.
          </p>
        </Reveal>

        <div className="rua-gallery-grid">
          {GALLERY_IMAGES.map((img, i) => (
            <Reveal key={img.src} delay={i * 0.06}>
              <div className="rua-gallery-item">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials ── */

function TestimonialsSection() {
  return (
    <section className="rua-section rua-section--cream" id="testemunhos">
      <Reveal>
        <h2 className="rua-section-title">O Que Dizem \u2B50</h2>
        <p className="rua-section-subtitle">
          Palavras de quem já caminhou, provou e repetiu.
        </p>
      </Reveal>

      <div className="rua-testimonials">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.author} delay={i * 0.07}>
            <div className="rua-testimonial">
              <span className="rua-testimonial-stars">
                \u2605\u2605\u2605\u2605\u2605
              </span>
              <p>&ldquo;{t.quote}&rdquo;</p>
              <div className="rua-testimonial-author">
                {t.author}
                <span>
                  &mdash; {t.origin} | {t.tour}
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── Pricing ── */

function PricingSection() {
  return (
    <section className="rua-section" id="precos">
      <Reveal>
        <h2 className="rua-section-title">Preços \uD83C\uDFF7\uFE0F</h2>
        <p className="rua-section-subtitle">
          Sem surpresas. O preço inclui tudo: guia, vinhos, petiscos e boa
          disposição.
        </p>
      </Reveal>

      <div className="rua-pricing">
        {PRICING.map((p, i) => (
          <BounceReveal key={p.name} delay={i * 0.1}>
            <div
              className={`rua-price-card ${
                p.featured ? "rua-price-card--featured" : ""
              }`}
            >
              {p.featured && (
                <span className="rua-price-badge">Mais Popular</span>
              )}
              <h3>{p.name}</h3>
              <span className="rua-price-amount">&euro;{p.price}</span>
              <span className="rua-price-per">{p.per}</span>
              <ul className="rua-price-features">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a
                href="https://wa.me/351934035971"
                target="_blank"
                rel="noopener noreferrer"
                className={`rua-price-cta ${
                  p.featured
                    ? "rua-price-cta--primary"
                    : "rua-price-cta--secondary"
                }`}
              >
                Reservar {p.name}
              </a>
            </div>
          </BounceReveal>
        ))}
      </div>
    </section>
  );
}

/* ── FAQ ── */

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="rua-section rua-section--cream" id="faq">
      <Reveal>
        <h2 className="rua-section-title">Perguntas Frequentes \uD83E\uDD14</h2>
        <p className="rua-section-subtitle">
          Tudo o que precisas de saber antes de reservar.
        </p>
      </Reveal>

      <div className="rua-faq-list">
        {FAQ_ITEMS.map((faq, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="rua-faq-item">
              <button
                className="rua-faq-q"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                aria-expanded={openIdx === i}
              >
                {faq.q}
                <span
                  className={`rua-faq-chevron ${
                    openIdx === i ? "rua-faq-chevron--open" : ""
                  }`}
                >
                  \u25BC
                </span>
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="rua-faq-a">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── CTA ── */

function CTASection() {
  return (
    <section className="rua-cta-section" id="reservar">
      <Reveal>
        <span
          style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}
        >
          \uD83C\uDF77
        </span>
        <h2>Vamos Sair?</h2>
        <p>
          Escolhe a tua cidade, junta os amigos (ou a família!), e
          reserva a tua noite de vinho e petiscos. A rua está a chamar.
        </p>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="rua-cta-buttons">
          <motion.a
            href="https://wa.me/351934035971"
            target="_blank"
            rel="noopener noreferrer"
            className="rua-cta-wa"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            \uD83D\uDCF2 Reservar por WhatsApp
          </motion.a>

          <motion.a
            href="mailto:info@descomplicai.com"
            className="rua-cta-email"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            \u2709\uFE0F Enviar Email
          </motion.a>
        </div>
      </Reveal>
    </section>
  );
}

/* ── Footer ── */

function Footer() {
  return (
    <footer className="rua-footer">
      <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.8)", marginBottom: "0.5rem" }}>
        <strong>Vinho na Rua</strong> &mdash; Bebe. Come. Descomplica.
      </p>
      <p>
        Uma experiência{" "}
        <a href="/" target="_blank" rel="noopener noreferrer">
          Descomplicai
        </a>
      </p>
      <p style={{ marginTop: "0.75rem" }}>
        &copy; {new Date().getFullYear()} Vinho na Rua. Todos os direitos
        reservados.
      </p>
    </footer>
  );
}

/* ═══════════════════════════════════════════════
   Page
   ═══════════════════════════════════════════════ */

export default function VinhoNaRuaPage() {
  return (
    <>
      <Nav />
      <Hero />
      <HowItWorks />
      <Cities />
      <TypicalTour />
      <WhatYoullTaste />
      <ForFamilies />
      <Gallery />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </>
  );
}
