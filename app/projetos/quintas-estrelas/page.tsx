"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

/* ─── Data ─── */

const NAV_LINKS = [
  { label: "Experiência", href: "#experiencia" },
  { label: "Alojamento", href: "#alojamento" },
  { label: "Quintas", href: "#quintas" },
  { label: "Famílias", href: "#familias" },
  { label: "Preços", href: "#precos" },
  { label: "FAQ", href: "#faq" },
];

const EXPERIENCE_ITEMS = [
  {
    emoji: "\u{1F305}",
    title: "Acordar entre Vinhas",
    desc: "Abre a janela e respira o aroma das vinhas ao amanhecer. Sem alarmes, sem pressa — só o canto dos pássaros.",
  },
  {
    emoji: "\u{1F373}",
    title: "Aulas de Cozinha",
    desc: "Aprende a cozinhar pratos tradicionais com ingredientes frescos da horta da quinta e o chef residente.",
  },
  {
    emoji: "\u{2B50}",
    title: "Jantares sob Estrelas",
    desc: "Mesa comprida ao ar livre, entre vinhas, com vinhos do produtor e um astrónomo que te guia pelo céu.",
  },
  {
    emoji: "\u{1F347}",
    title: "Pisa de Uvas para Miúdos",
    desc: "Os mais novos adoram: pés descalços, uvas a rebentar e gargalhadas que ecoam pelo vale inteiro.",
  },
];

const ACCOMMODATIONS = [
  {
    title: "Glamping nas Vinhas",
    tag: "Natureza",
    desc: "Tendas de luxo com cama king-size, casa de banho privativa e varanda com vista para as vinhas. Conforto e natureza em perfeita harmonia.",
    img: "/wine-images/glamping-room.jpg",
  },
  {
    title: "Suítes-Barril",
    tag: "Icónico",
    desc: "Durma dentro de um barril de vinho gigante, reconvertido com todo o conforto moderno. Uma experiência única no mundo.",
    img: "/wine-images/vindima-barrel.jpg",
  },
  {
    title: "Quartos na Quinta",
    tag: "Tradição",
    desc: "Quartos em casas de pedra centenárias, restauradas com carinho. Tetos de vigas, paredes de granito e roupa de cama de linho.",
    img: "/wine-images/glamping-sunrise.jpg",
  },
];

const ACTIVITIES = [
  {
    emoji: "\u{1F9D8}",
    title: "Yoga ao Nascer do Sol",
    desc: "Sessão suave entre as vinhas ao amanhecer",
  },
  {
    emoji: "\u{1F373}",
    title: "Aula de Cozinha",
    desc: "Cozinha com produtos da horta da quinta",
  },
  {
    emoji: "\u{1F377}",
    title: "Prova de Vinhos",
    desc: "Degustação guiada com o produtor",
  },
  {
    emoji: "\u{1F52D}",
    title: "Observação de Estrelas",
    desc: "Jantar + sessão com astrónomo local",
  },
  {
    emoji: "\u{1F6B6}",
    title: "Passeio pelas Vinhas",
    desc: "Caminhada guiada ao entardecer",
  },
  {
    emoji: "\u{1F9B6}",
    title: "Pisa de Uvas",
    desc: "Tradição milenar para toda a família",
  },
  {
    emoji: "\u{1F3A8}",
    title: "Pintura de Azulejos",
    desc: "Workshop criativo para miúdos e graúdos",
  },
  {
    emoji: "\u{1F3CA}",
    title: "Piscina & Relax",
    desc: "Mergulho com vista para as vinhas",
  },
];

const QUINTAS = [
  {
    name: "Quinta do Vale Estrelado",
    region: "Douro",
    desc: "Uma quinta familiar desde 1892, com 12 hectares de vinha em socalcos e vista sobre o rio. Alojamento em casas de pedra restauradas.",
    specialty: "Touriga Nacional e azeite biológico",
    features: ["Vista rio", "Casas de pedra", "Vindima Set-Out"],
    img: "/wine-images/vindima-vineyard.jpg",
  },
  {
    name: "Herdade da Lua Cheia",
    region: "Alentejo",
    desc: "Planícies douradas, oliveiras centenárias e um céu imenso que, à noite, se transforma no melhor planetário natural de Portugal.",
    specialty: "Antão Vaz e Trincadeira",
    features: ["Piscina natural", "Glamping", "Cavalos"],
    img: "/wine-images/glamping-hero.jpg",
  },
  {
    name: "Quinta das Brumas",
    region: "Dão",
    desc: "Rodeada de pinheiros e granito, esta quinta de montanha oferece manhãs de neblina mágica e noites frescas perfeitas para estrelas.",
    specialty: "Encruzado e Touriga Nacional",
    features: ["Montanha", "Aulas cozinha", "Trilhos"],
    img: "/wine-images/vindima-sunset.jpg",
  },
];

const FAMILY_ACTIVITIES = [
  { emoji: "\u{1F9B6}", text: "Pisar uvas nos lagares tradicionais" },
  { emoji: "\u{1F9C3}", text: "Fazer sumo de uva fresco" },
  { emoji: "\u{1F3A8}", text: "Pintar azulejos com motivos da vinha" },
  { emoji: "\u{1F35E}", text: "Fazer pão no forno a lenha" },
  { emoji: "\u{1F5FA}", text: "Caça ao tesouro pelas vinhas" },
  { emoji: "\u{1F69C}", text: "Passeio de trator pela quinta" },
];

const GALLERY_IMAGES = [
  { src: "/wine-images/glamping-hero.jpg", alt: "Vista panorâmica da quinta" },
  { src: "/wine-images/glamping-room.jpg", alt: "Alojamento glamping" },
  { src: "/wine-images/glamping-cooking.jpg", alt: "Aula de cozinha", tall: true },
  { src: "/wine-images/glamping-dinner.jpg", alt: "Jantar sob as estrelas" },
  { src: "/wine-images/glamping-food.jpg", alt: "Gastronomia local" },
  { src: "/wine-images/glamping-sunrise.jpg", alt: "Amanhecer nas vinhas", tall: true },
  { src: "/wine-images/vindima-vineyard.jpg", alt: "Vinhas do Douro" },
  { src: "/wine-images/vindima-sunset.jpg", alt: "Pôr-do-sol na vinha" },
];

const TESTIMONIALS = [
  {
    quote:
      "O jantar sob as estrelas foi o momento mais mágico da nossa vida em família. Os miúdos ainda falam disso todos os dias.",
    author: "Ana & Pedro",
    detail: "Família com 2 filhos, Lisboa — Quinta do Vale Estrelado",
  },
  {
    quote:
      "Acordar dentro de um barril de vinho com vista para as vinhas do Douro... não há hotel de 5 estrelas que se compare.",
    author: "Mariana Santos",
    detail: "Casal, Porto — Imersão 2 noites",
  },
  {
    quote:
      "As crianças pisaram uvas, fizeram pão, pintaram azulejos — e nós tivemos tempo para relaxar e provar vinhos fantásticos.",
    author: "Sofia & Tiago",
    detail: "Família com 3 filhos, Braga — Vindima 3 noites",
  },
  {
    quote:
      "A Herdade da Lua Cheia é simplesmente extraordinária. O céu estrelado do Alentejo, o silêncio, a comida... perfeição.",
    author: "Rui Oliveira",
    detail: "Grupo de amigos, Faro — Escapadinha",
  },
  {
    quote:
      "Viemos de Paris e foi a experiência mais autêntica que tivemos em Portugal. Os produtores tratam-nos como família.",
    author: "Claire & Jean",
    detail: "Casal francês — Imersão 2 noites, Douro",
  },
];

const PRICING = [
  {
    name: "Escapadinha",
    duration: "1 noite",
    price: "150",
    features: [
      "Alojamento na quinta",
      "Pequeno-almoço com produtos locais",
      "Prova de vinhos comentada",
      "Jantar com o produtor",
      "Passeio livre pelas vinhas",
    ],
  },
  {
    name: "Imersão",
    duration: "2 noites",
    price: "350",
    featured: true,
    features: [
      "Tudo da Escapadinha",
      "Aula de cozinha na quinta",
      "Visita guiada às vinhas",
      "Jantar sob as estrelas com astrónomo",
      "Yoga ao nascer do sol",
      "Piscina & áreas de lazer",
    ],
  },
  {
    name: "Vindima",
    duration: "3 noites (Set-Out)",
    price: "500",
    features: [
      "Tudo da Imersão",
      "Participação na vindima real",
      "Pisa de uvas no lagar",
      "Workshop de blend personalizado",
      "Certificado de vindimeiro",
      "Garrafa personalizada para levar",
    ],
  },
];

const FAQ_ITEMS = [
  {
    q: "Posso levar crianças?",
    a: "Claro que sim! As quintas têm atividades dedicadas para crianças de todas as idades: pisa de uvas, pintura de azulejos, caça ao tesouro e muito mais. Os mais novos são sempre bem-vindos.",
  },
  {
    q: "O que está incluído no preço?",
    a: "Cada pacote inclui alojamento, refeições (conforme o plano), atividades guiadas e prova de vinhos. Tudo detalhado na secção de preços. Sem custos escondidos.",
  },
  {
    q: "Como chego às quintas?",
    a: "Enviamos indicações detalhadas após a reserva. A maioria das quintas tem estacionamento gratuito. Podemos ajudar a organizar transfers desde Porto, Lisboa ou o aeroporto mais próximo (custo adicional).",
  },
  {
    q: "Posso visitar sem pernoitar?",
    a: "De momento, as nossas experiências incluem sempre alojamento. É isso que as torna especiais — viver a quinta por completo, do amanhecer ao céu estrelado.",
  },
  {
    q: "Há opções para vegetarianos ou alergias?",
    a: "Sim! Todas as quintas acomodam dietas vegetarianas, veganas e alergias alimentares. Basta indicar na reserva e os chefs adaptam o menu com produtos da horta.",
  },
  {
    q: "As experiências decorrem todo o ano?",
    a: "Sim, cada estação tem o seu encanto: floração na primavera, vindima no outono, poda no inverno. O pacote Vindima é exclusivo de setembro e outubro.",
  },
  {
    q: "Qual é a política de cancelamento?",
    a: "Cancelamento gratuito até 7 dias antes. Entre 3-7 dias, reembolso de 50%. Com menos de 3 dias de antecedência, sem reembolso mas pode reagendar.",
  },
  {
    q: "Preciso de saber alguma coisa sobre vinhos?",
    a: "Nada! Os produtores explicam tudo de forma simples e acolhedora. Não há jargão nem snobismo — só paixão genuína pelo que fazem. Venham como estão.",
  },
];

/* ─── Helpers ─── */

function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      className={`qe-section ${className}`}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
    >
      <div className="qe-container">{children}</div>
    </motion.section>
  );
}

/* ─── Component ─── */

export default function QuintasEstrelas() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* ── Nav ── */}
      <nav className={`qe-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="qe-nav-logo">
          Quintas <span>&</span> Estrelas
        </div>
        <ul className="qe-nav-links">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
        <a href="#reservar" className="qe-nav-cta" style={{ display: scrolled ? "flex" : "none" }}>
          Reservar
        </a>
        <button
          className="qe-hamburger"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="qe-mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              className="qe-mobile-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Fechar menu"
            >
              &times;
            </button>
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            ))}
            <a
              href="#reservar"
              className="qe-btn-primary"
              onClick={() => setMenuOpen(false)}
            >
              Reservar
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero ── */}
      <section className="qe-hero">
        <div className="qe-hero-bg">
          <Image
            src="/wine-images/glamping-hero.jpg"
            alt="Vinhas ao entardecer"
            fill
            priority
            style={{ objectFit: "cover" }}
          />
          <div className="qe-hero-overlay" />
        </div>
        <motion.div
          className="qe-hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="qe-hero-badge">Quintas & Estrelas</div>
          <h1>
            Durma entre vinhas.
            <br />
            Acorde com <em>estrelas</em>.
          </h1>
          <p className="qe-hero-sub">
            Escapadelas em quintas vínicas portuguesas para toda a família.
            Alojamento único, gastronomia local e noites de estrelas.
          </p>
          <div className="qe-hero-stats">
            <div className="qe-hero-stat">
              <span className="qe-hero-stat-value">3</span>
              <span className="qe-hero-stat-label">Quintas</span>
            </div>
            <div className="qe-hero-stat">
              <span className="qe-hero-stat-value">3</span>
              <span className="qe-hero-stat-label">Regiões</span>
            </div>
            <div className="qe-hero-stat">
              <span className="qe-hero-stat-value">365</span>
              <span className="qe-hero-stat-label">Dias por ano</span>
            </div>
          </div>
          <div className="qe-hero-ctas">
            <a href="#quintas" className="qe-btn-primary">
              Descobrir Quintas
            </a>
            <a href="#precos" className="qe-btn-secondary">
              Ver Preços
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── The Experience ── */}
      <Section id="experiencia">
        <motion.span className="qe-section-badge" variants={fadeUp}>
          A Experiência
        </motion.span>
        <motion.h2 className="qe-section-title" variants={fadeUp}>
          Não é um hotel. Não é turismo.
          <br />
          É viver Portugal como ele realmente é.
        </motion.h2>
        <motion.p className="qe-section-desc" variants={fadeUp}>
          Imagina acordar ao som dos pássaros, abrir a janela e ver vinhas até onde a vista
          alcança. Imagina os teus filhos a pisar uvas com os pés descalços, a rir sem parar.
          Imagina um jantar longo, sob um céu carregado de estrelas.
        </motion.p>
        <motion.div className="qe-exp-grid" variants={stagger}>
          {EXPERIENCE_ITEMS.map((item) => (
            <motion.div key={item.title} className="qe-exp-card" variants={fadeUp}>
              <div className="qe-exp-icon">{item.emoji}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ── Accommodations ── */}
      <Section id="alojamento" className="qe-section-dark">
        <motion.span className="qe-section-badge" variants={fadeUp}>
          Alojamento
        </motion.span>
        <motion.h2 className="qe-section-title" variants={fadeUp}>
          Onde cada noite é diferente
        </motion.h2>
        <motion.p className="qe-section-desc" variants={fadeUp}>
          De glamping entre vinhas a suítes dentro de barris de vinho gigantes — cada
          alojamento conta uma história e faz parte da experiência.
        </motion.p>
        <motion.div className="qe-accom-grid" variants={stagger}>
          {ACCOMMODATIONS.map((a) => (
            <motion.div key={a.title} className="qe-accom-card" variants={fadeUp}>
              <Image
                src={a.img}
                alt={a.title}
                width={400}
                height={200}
                className="qe-accom-img"
              />
              <div className="qe-accom-body">
                <span className="qe-accom-tag">{a.tag}</span>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ── Activities ── */}
      <Section id="atividades">
        <motion.span className="qe-section-badge" variants={fadeUp}>
          Atividades
        </motion.span>
        <motion.h2 className="qe-section-title" variants={fadeUp}>
          De manhã cedo ao céu estrelado
        </motion.h2>
        <motion.p className="qe-section-desc" variants={fadeUp}>
          Cada dia na quinta é diferente. Escolhe o que te apetece — ou não escolhas nada e
          deixa-te levar.
        </motion.p>
        <motion.div className="qe-act-grid" variants={stagger}>
          {ACTIVITIES.map((a) => (
            <motion.div key={a.title} className="qe-act-card" variants={fadeUp}>
              <div className="qe-act-emoji">{a.emoji}</div>
              <h4>{a.title}</h4>
              <p>{a.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ── The Quintas ── */}
      <Section id="quintas" className="qe-section-alt">
        <motion.span className="qe-section-badge" variants={fadeUp}>
          As Quintas
        </motion.span>
        <motion.h2 className="qe-section-title" variants={fadeUp}>
          Cada quinta tem a sua história
        </motion.h2>
        <motion.p className="qe-section-desc" variants={fadeUp}>
          Quintas reais, geridas por famílias com gerações de história. Não é franchising — é
          autenticidade.
        </motion.p>
        <motion.div className="qe-quintas-grid" variants={stagger}>
          {QUINTAS.map((q) => (
            <motion.div key={q.name} className="qe-quinta-card" variants={fadeUp}>
              <Image
                src={q.img}
                alt={q.name}
                width={600}
                height={180}
                className="qe-quinta-img"
              />
              <div className="qe-quinta-body">
                <span className="qe-quinta-region">{q.region}</span>
                <h3>{q.name}</h3>
                <p>{q.desc}</p>
                <p style={{ fontSize: "0.82rem", fontStyle: "italic", color: "#c4775a" }}>
                  Especialidade: {q.specialty}
                </p>
                <div className="qe-quinta-features">
                  {q.features.map((f) => (
                    <span key={f} className="qe-quinta-feat">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ── For Families ── */}
      <Section id="familias" className="qe-section-dark">
        <motion.span className="qe-section-badge" variants={fadeUp}>
          Para Famílias
        </motion.span>
        <motion.h2 className="qe-section-title" variants={fadeUp}>
          Os mais novos são as nossas estrelas
        </motion.h2>
        <motion.div className="qe-families-content" variants={stagger}>
          <motion.div className="qe-families-text" variants={fadeUp}>
            <h3>Enquanto os pais provam vinhos, os pequenos exploram</h3>
            <p>
              As crianças têm um mundo para descobrir: pisar uvas nos lagares tradicionais,
              fazer sumo de uva fresco, pintar azulejos com motivos da vinha, fazer pão no
              forno a lenha, e encontrar tesouros escondidos nas vinhas. Ao jantar,
              sentamo-nos todos à mesma mesa — porque as melhores memórias são as que se
              fazem em família.
            </p>
            <ul className="qe-families-list">
              {FAMILY_ACTIVITIES.map((a) => (
                <li key={a.text}>
                  <span>{a.emoji}</span> {a.text}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Image
              src="/wine-images/glamping-cooking.jpg"
              alt="Família na quinta"
              width={500}
              height={260}
              className="qe-families-img"
            />
          </motion.div>
        </motion.div>
      </Section>

      {/* ── Photo Gallery ── */}
      <Section id="galeria">
        <motion.span className="qe-section-badge" variants={fadeUp}>
          Galeria
        </motion.span>
        <motion.h2 className="qe-section-title" variants={fadeUp}>
          Momentos que ficam
        </motion.h2>
        <motion.div className="qe-gallery-grid" variants={stagger}>
          {GALLERY_IMAGES.map((img) => (
            <motion.div
              key={img.src}
              className={`qe-gallery-item ${img.tall ? "tall" : ""}`}
              variants={fadeUp}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={400}
                height={img.tall ? 440 : 220}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ── Testimonials ── */}
      <Section id="testemunhos" className="qe-section-dark">
        <motion.span className="qe-section-badge" variants={fadeUp}>
          Testemunhos
        </motion.span>
        <motion.h2 className="qe-section-title" variants={fadeUp}>
          O que dizem de nós
        </motion.h2>
        <motion.div className="qe-test-grid" variants={stagger}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} className="qe-test-card" variants={fadeUp}>
              <div className="qe-test-stars">
                {"\u2605\u2605\u2605\u2605\u2605"}
              </div>
              <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="qe-test-author">{t.author}</div>
              <div className="qe-test-detail">{t.detail}</div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ── Pricing ── */}
      <Section id="precos">
        <motion.span className="qe-section-badge" variants={fadeUp}>
          Pacotes & Preços
        </motion.span>
        <motion.h2 className="qe-section-title" variants={fadeUp}>
          Escolhe a tua escapadela
        </motion.h2>
        <motion.p className="qe-section-desc" variants={fadeUp}>
          Pacotes completos com alojamento, refeições e atividades. Sem custos escondidos, sem
          stress de planeamento.
        </motion.p>
        <motion.div className="qe-pricing-grid" variants={stagger}>
          {PRICING.map((p) => (
            <motion.div
              key={p.name}
              className={`qe-price-card ${p.featured ? "featured" : ""}`}
              variants={fadeUp}
            >
              {p.featured && (
                <div className="qe-price-popular">Mais Popular</div>
              )}
              <div style={{ paddingTop: p.featured ? "20px" : "0" }}>
                <h3>{p.name}</h3>
                <div className="qe-price-duration">{p.duration}</div>
                <div className="qe-price-amount">&euro;{p.price}</div>
                <div className="qe-price-per">por pessoa</div>
                <ul className="qe-price-features">
                  {p.features.map((f) => (
                    <li key={f}>
                      <span className="qe-price-check">{"\u2713"}</span> {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/351934035971"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="qe-price-btn"
                >
                  Reservar {p.name}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ── FAQ ── */}
      <Section id="faq" className="qe-section-alt">
        <motion.span className="qe-section-badge" variants={fadeUp}>
          Perguntas Frequentes
        </motion.span>
        <motion.h2 className="qe-section-title" variants={fadeUp}>
          Alguma dúvida?
        </motion.h2>
        <motion.div className="qe-faq-list" variants={stagger}>
          {FAQ_ITEMS.map((item, i) => (
            <motion.div key={i} className="qe-faq-item" variants={fadeUp}>
              <button
                className="qe-faq-q"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
              >
                {item.q}
                <span className={`qe-faq-arrow ${openFaq === i ? "open" : ""}`}>
                  {"\u25BC"}
                </span>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="qe-faq-a">{item.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ── CTA ── */}
      <section className="qe-cta-section" id="reservar">
        <motion.div
          className="qe-container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Pronto para dormir entre vinhas?</h2>
          <p>
            Fale connosco para reservar a sua escapadela. Respondemos em menos de 24 horas.
          </p>
          <div className="qe-cta-buttons">
            <a
              href="https://wa.me/351934035971"
              target="_blank"
              rel="noopener noreferrer"
              className="qe-cta-whatsapp"
            >
              WhatsApp
            </a>
            <a
              href="mailto:hello@descomplicai.com"
              className="qe-cta-email"
            >
              Email
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="qe-footer">
        <div className="qe-footer-brand">
          Quintas & Estrelas — Durma entre vinhas. Acorde com estrelas.
        </div>
        <p>
          Uma experiência{" "}
          <a href="/" target="_blank" rel="noopener noreferrer">
            Descomplicai
          </a>
        </p>
        <p>&copy; {new Date().getFullYear()} Quintas & Estrelas. Todos os direitos reservados.</p>
      </footer>
    </>
  );
}
