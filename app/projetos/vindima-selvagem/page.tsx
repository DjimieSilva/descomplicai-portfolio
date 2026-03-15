"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

/* ─── Data ─── */

const NAV_LINKS = [
  { label: "A Quinta", href: "#quinta" },
  { label: "A Experiencia", href: "#experiencia" },
  { label: "Galeria", href: "#galeria" },
  { label: "Equipa", href: "#equipa" },
  { label: "FAQ", href: "#faq" },
  { label: "Pacotes", href: "#pacotes" },
  { label: "Reservar", href: "#reservar" },
];

const TRUST_BADGES = [
  { icon: "500+", label: "Participantes" },
  { icon: "4.9", label: "Google Reviews" },
  { icon: "2019", label: "Desde" },
  { icon: "UNESCO", label: "Patrimonio Mundial" },
];

const TIMELINE = [
  {
    time: "06:30",
    title: "O Despertar do Vale",
    desc: "O sol toca os socalcos do Douro. A encosta acende-se em tons de dourado e ambar. O ar carrega o cheiro da terra humedecida pelo orvalho.",
    emoji: "\u2600\uFE0F",
    image: "/wine-images/vindima-vineyard.jpg",
  },
  {
    time: "07:00",
    title: "Pequeno-Almoco na Quinta",
    desc: "Mesa posta debaixo da parreira. Pao de centeio do forno a lenha, queijo da serra, mel de rosmaninho, figos maduros. Cafe forte e cheiro a lenha.",
    emoji: "\u2615",
    image: "/wine-images/vindima-food.jpg",
  },
  {
    time: "08:00",
    title: "A Vindima",
    desc: "Descemos para os socalcos. Touriga Nacional, Touriga Franca, Tinta Roriz, Tinta Barroca. Cortamos cachos, enchemos cestos de vime. O sol aquece, as maos ficam roxas de mosto.",
    emoji: "\uD83C\uDF47",
    image: "/wine-images/vindima-grapes.jpg",
  },
  {
    time: "11:00",
    title: "A Pisa das Uvas",
    desc: "O lagar de granito centenario espera. Descalcamos, arregacamos as calcas e entramos. Ha musica ao vivo, um acordeao toca melodias durienses. O mosto que pisamos vai realmente fermentar.",
    emoji: "\uD83E\uDDB6",
    image: "/wine-images/vindima-barrel.jpg",
  },
  {
    time: "12:30",
    title: "Almoco da Vindima",
    desc: "Mesa grande a sombra com vista para o rio. Chourico na brasa, caldo verde, cabrito assado no forno a lenha com batatas a murro, bolo de noz. Vinho tinto da casa.",
    emoji: "\uD83C\uDF7D\uFE0F",
    image: "/wine-images/vindima-food.jpg",
  },
  {
    time: "14:30",
    title: "Visita a Adega & Prova",
    desc: "Barricas de carvalho frances em silencio. Provamos 4 a 5 vinhos, aprendemos a girar o copo, a distinguir um Douro jovem de uma Reserva. Sumo de uva para criancas.",
    emoji: "\uD83C\uDF77",
    image: "/wine-images/vindima-tasting.jpg",
  },
  {
    time: "17:00",
    title: "A Hora Dourada",
    desc: "O vale transforma-se. Porto tawny com queijos curados e frutos secos, sentados nos muros de xisto, com os pes a balancar sobre o vale.",
    emoji: "\uD83C\uDF05",
    image: "/wine-images/vindima-sunset.jpg",
  },
  {
    time: "18:30",
    title: "Despedida",
    desc: "Abracos demorados, promessas de voltar. Cada participante leva um saco de serapilheira com vinho, mel e uma foto polaroid. E as maos ainda roxas.",
    emoji: "\uD83D\uDC9C",
    image: "/wine-images/vindima-vineyard.jpg",
  },
];

const FEATURES = [
  { emoji: "\uD83D\uDC68\u200D\uD83C\uDF3E", title: "Vindima guiada por enologo" },
  { emoji: "\uD83E\uDDB6", title: "Pisa no lagar de granito centenario" },
  { emoji: "\uD83C\uDF56", title: "Almoco regional a lenha" },
  { emoji: "\uD83C\uDF77", title: "Prova de 5 vinhos DOC Douro" },
  { emoji: "\uD83C\uDFF7\uFE0F", title: "Garrafa personalizada" },
  { emoji: "\uD83D\uDCF8", title: "Foto polaroid do grupo" },
  { emoji: "\uD83E\uDDBA", title: "Kit do vindimador (avental, luvas, chapeu)" },
  { emoji: "\uD83C\uDF0D", title: "Guia bilingue PT/EN/FR/ES" },
  { emoji: "\uD83D\uDEE1\uFE0F", title: "Seguro de atividade incluido" },
];

const FAMILY_ACTIVITIES = [
  { emoji: "\u2702\uFE0F", title: "Tesouras adaptadas", desc: "Criancas 6+ usam tesouras de ponta redonda e mola suave para vindimar a serio." },
  { emoji: "\uD83D\uDC63", title: "Pisa para miudos", desc: "O lagar tem menos de 50cm de profundidade. Seguro e divertido para todas as idades." },
  { emoji: "\uD83D\uDDFA\uFE0F", title: "Caca ao Cacho", desc: "Jogo de orientacao na vinha. As criancas exploram e aprendem sobre castas." },
  { emoji: "\uD83C\uDFA8", title: "Pintura com mosto", desc: "Arte natural com sumo de uva. As maos ficam roxas, as memorias ficam para sempre." },
  { emoji: "\uD83D\uDC68\u200D\uD83C\uDF73", title: "Cozinhar com o Ti Quim", desc: "Amassar pao, descascar fruta. As criancas adoram ajudar na cozinha." },
  { emoji: "\uD83D\uDC76", title: "Espaco bebe", desc: "Muda-fraldas, microondas, sombra. Carrinhos todo-o-terreno disponiveis." },
];

const TESTIMONIALS = [
  {
    quote: "Viemos com tres filhos -- 5, 8 e 12 anos -- e foi o melhor dia das ferias. O Manuel de 5 anos nao queria sair do lagar. A Carolina quer estudar enologia. O almoco foi de chorar.",
    author: "Ana e Pedro Sousa",
    location: "Lisboa",
    date: "Setembro 2025",
    stars: 5,
  },
  {
    quote: "Cresci a vindimar em Sabrosa com o meu avo. Pensava que essas vindimas ja nao existiam. A minha mulher, que nunca tinha vindimado, chorou de emocao.",
    author: "Antonio Ferreira",
    location: "Porto",
    date: "Setembro 2024",
    stars: 5,
  },
  {
    quote: "Viemos seis amigos para celebrar os 40 anos do Tiago. A pisa foi hilariante, o almoco memoravel. A garrafa com o nosso rotulo? Guardada para o proximo aniversario.",
    author: "Marta Pinto",
    location: "Braga",
    date: "Setembro 2025",
    stars: 5,
  },
  {
    quote: "Os meus filhos finalmente perceberam de onde vem o vinho do avo. Pisaram uvas, comeram com as maos, dormiram no carro a regressar. Perfeito.",
    author: "Sofia e Laurent Dupont-Almeida",
    location: "Lyon / Viseu",
    date: "Setembro 2025",
    stars: 5,
  },
  {
    quote: "Incluimos a Vindima Selvagem na lua-de-mel e foi a melhor decisao. O cabrito assado no forno a lenha e inesquecivel. Levamos vinho, mel e memorias para a vida.",
    author: "Camila e Rafael Santos",
    location: "Sao Paulo",
    date: "Outubro 2024",
    stars: 5,
  },
  {
    quote: "A minha filha de 15 anos achou que ia ser uma seca. Ao fim de meia hora, estava a fazer reels no lagar. Momento mae-filha perfeito.",
    author: "Carla Mendes",
    location: "Coimbra",
    date: "Setembro 2025",
    stars: 5,
  },
];

const TEAM = [
  {
    name: "Manuel Queiroz",
    role: "Enologo & Co-Fundador",
    bio: "Nascido em Sabrosa, no coracao do Douro. Formado em Enologia pela UTAD, trabalhou na Quinta do Crasto e Quinta do Vallado. Tem as maos calejadas de quem trabalha a terra e paciencia infinita para explicar a diferenca entre Touriga Nacional e Touriga Franca.",
    emoji: "\uD83C\uDF47",
  },
  {
    name: "Ines Ribeiro",
    role: "Guia & Co-Fundadora",
    bio: "Nasceu no Pinhao, cresceu a ouvir historias de vindimas do avo. Fundou a Vindima Selvagem para dar as pessoas o Douro verdadeiro. E a primeira a meter os pes no lagar e a ultima a sair. Fala PT, EN, FR e ES.",
    emoji: "\uD83C\uDF1F",
  },
  {
    name: 'Joaquim "Ti Quim" Moreira',
    role: "Chef",
    bio: "62 anos, cozinha desde os 14. Nunca frequentou escola de culinaria -- aprendeu com a mae. Cozinha exclusivamente a lenha, usa so produtos locais. O seu cabrito assado e lendario. Quando lhe perguntam o segredo: \"Tempo e paciencia.\"",
    emoji: "\uD83D\uDC68\u200D\uD83C\uDF73",
  },
];

const CALENDAR = [
  { period: "25-31 Agosto", status: "Pre-temporada", desc: "Castas precoces (Tinta Barroca). Grupos reduzidos.", color: "#D4944A" },
  { period: "1-15 Setembro", status: "Alta temporada", desc: "Pico da vindima. Touriga Nacional e Touriga Franca. Reserva antecipada obrigatoria.", color: "#C4704B" },
  { period: "16-30 Setembro", status: "Alta temporada", desc: "Tinta Roriz e Tinta Cao. Temperaturas amenas. Excelente para familias.", color: "#C4704B" },
  { period: "1-15 Outubro", status: "Final de temporada", desc: "Ultimas colheitas. Castas tardias. Cores de outono.", color: "#8a9f55" },
  { period: "16-31 Outubro", status: "Pos-temporada", desc: "Disponibilidade limitada. Ideal para quem quer evitar multidoes.", color: "#6B7F3B" },
];

const FAQ_DATA = [
  {
    q: "A vindima e a serio ou e uma simulacao?",
    a: "E completamente real. As uvas que colhe vao para o lagar. O mosto que pisa vai fermentar. Nada e cenografico. Trabalhamos com quintas reais em producao ativa.",
  },
  {
    q: "Preciso de ter experiencia em vindima?",
    a: "Absolutamente nao. A maioria dos participantes nunca tocou numa videira. O enologo e os guias ensinam tudo, passo a passo, com paciencia e boa disposicao.",
  },
  {
    q: "A partir de que idade as criancas podem participar?",
    a: "A partir dos 3 anos. Criancas entre 3 e 6 participam na apanha com cestos adaptados e na pisa. Com mais de 6 anos podem usar tesouras de vindima adaptadas. Criancas ate 3 anos nao pagam. Dos 4 aos 12 pagam 50%.",
  },
  {
    q: "Que roupas devo vestir?",
    a: "Roupa confortavel que possa sujar. Calcas que possa arregacar para a pisa. Calcado fechado e confortavel. Chapeu e protecao solar. Nos fornecemos aventais e luvas.",
  },
  {
    q: "Tem opcoes para vegetarianos ou alergias?",
    a: "Sim. Informem-nos com 48 horas de antecedencia. Opcoes vegetarianas incluem legumes grelhados, migas de broa com grelos, arroz de cogumelos. Para alergias (gluten, lactose, frutos secos), temos alternativas.",
  },
  {
    q: "E se chover?",
    a: "A vindima faz-se com sol ou chuva -- como sempre se fez. Temos capas de chuva para todos. As atividades indoor (prova, workshop, almoco) decorrem em espaco coberto. Em condicoes meteorologicas extremas, reagendamos sem custo.",
  },
  {
    q: "Ha estacionamento?",
    a: "Sim, gratuito e privativo, com capacidade para 25 viaturas. Para o pacote Premium, transporte de ida e volta do Porto esta incluido.",
  },
  {
    q: "E acessivel a pessoas com mobilidade reduzida?",
    a: "As areas de prova, almoco e lagar sao acessiveis. As vinhas em socalcos tem acessos limitados. Contactem-nos para avaliarmos caso a caso -- encontramos sempre uma solucao.",
  },
];

const PRICING = [
  {
    name: "Familiar",
    price: 79,
    tagline: "Perfeito para uma manha em familia",
    duration: "6 horas (08:00 - 14:00)",
    features: [
      "Pequeno-almoco na quinta",
      "Briefing com enologo",
      "2 horas de vindima real",
      "Pisa no lagar de granito",
      "Almoco tradicional completo",
      "1 copo de vinho por adulto",
      "Sumo de uva para criancas",
      "Kit do vindimador",
      "Foto polaroid",
    ],
    highlight: false,
  },
  {
    name: "Completa",
    price: 129,
    tagline: "O dia inteiro como um vindimador do Douro",
    duration: "Dia inteiro (07:30 - 18:30)",
    features: [
      "Tudo do pacote Familiar",
      "3 horas de vindima (mais castas)",
      "Pausa da manha com snacks",
      "Prova comentada de 5 vinhos",
      "Workshop de vinificacao",
      "Hora Dourada: Porto ao por do sol",
      "1 garrafa rotulada com o seu nome",
      "1 frasco de mel de rosmaninho",
      "Saco de serapilheira com brindes",
    ],
    highlight: true,
  },
  {
    name: "Premium",
    price: 249,
    tagline: "Do amanhecer ao amanhecer",
    duration: "2 dias / 1 noite",
    features: [
      "Tudo do pacote Completa",
      "Transporte privado do Porto",
      "1 noite em quinta (vista Douro)",
      "Jantar vinico 5 pratos",
      "Passeio ao nascer do sol",
      "Visita a 2a quinta parceira",
      "Prova vertical de 3 colheitas",
      "2 garrafas (Reserva + Porto)",
      "Kit completo de oferta",
    ],
    highlight: false,
  },
];

const GALLERY_IMAGES = [
  { src: "/wine-images/vindima-hero.jpg", alt: "Socalcos do Douro ao amanhecer" },
  { src: "/wine-images/vindima-grapes.jpg", alt: "Cachos de Touriga Nacional" },
  { src: "/wine-images/vindima-vineyard.jpg", alt: "Vindimadores nos socalcos" },
  { src: "/wine-images/vindima-barrel.jpg", alt: "Barricas na adega" },
  { src: "/wine-images/vindima-tasting.jpg", alt: "Prova de vinhos na adega" },
  { src: "/wine-images/vindima-food.jpg", alt: "Mesa da vindima com cabrito" },
  { src: "/wine-images/vindima-sunset.jpg", alt: "Por do sol sobre o Douro" },
];

/* ─── Helpers ─── */

function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function FadeIn({
  children,
  delay = 0,
  className = "",
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
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <div className="vindima-stars" aria-label={`${count} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < count ? "#E8C547" : "#ccc", fontSize: "1.1rem" }}>
          {"\u2605"}
        </span>
      ))}
    </div>
  );
}

const WHATSAPP_SVG = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/* ─── Page ─── */

export default function VindimaSelvagem() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ────── 1. NAV ────── */}
      <nav className={`vindima-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="vindima-nav-inner">
          <a
            href="#"
            className="vindima-nav-logo"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Vindima Selvagem
          </a>

          <div className="vindima-nav-links hidden md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="vindima-nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            className={`vindima-hamburger md:hidden ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="vindima-mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ────── 2. HERO ────── */}
      <section className="vindima-hero">
        <div className="vindima-hero-bg">
          <Image
            src="/wine-images/vindima-hero.jpg"
            alt="Socalcos do Douro ao amanhecer"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div className="vindima-hero-overlay" />
        </div>

        {/* Floating vineyard emojis */}
        <div className="vindima-hero-floats">
          <span className="vindima-float" style={{ left: "8%", top: "15%", animationDelay: "0s" }}>🍇</span>
          <span className="vindima-float" style={{ right: "10%", top: "20%", animationDelay: "1.5s" }}>🍂</span>
          <span className="vindima-float" style={{ left: "15%", bottom: "25%", animationDelay: "3s" }}>🌿</span>
          <span className="vindima-float" style={{ right: "12%", bottom: "30%", animationDelay: "2s" }}>🍷</span>
        </div>

        {/* Badge */}
        <motion.div
          className="vindima-hero-badge"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span>🌍</span> Uma das experiências mais autênticas do Douro
        </motion.div>

        {/* Title with word-by-word reveal */}
        <div className="vindima-hero-title-group">
          <motion.span
            className="vindima-hero-title-line vindima-hero-title-accent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Mãos na terra.
          </motion.span>
          <motion.span
            className="vindima-hero-title-line"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Pés no lagar.
          </motion.span>
          <motion.span
            className="vindima-hero-title-line vindima-hero-title-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            Coração no Douro.
          </motion.span>
        </div>

        <motion.div
          className="vindima-hero-divider"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        />

        <motion.p
          className="vindima-hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          A vindima como ela sempre foi — real, crua, inesquecível.
          <br />
          Venha vindimar connosco nos socalcos do Douro.
        </motion.p>

        <motion.div
          className="vindima-trust-badges"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          {TRUST_BADGES.map((badge) => (
            <div key={badge.label} className="vindima-trust-badge">
              <span className="vindima-trust-badge-icon">{badge.icon}</span>
              <span className="vindima-trust-badge-label">{badge.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="vindima-hero-ctas"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <a
            href="#reservar"
            className="vindima-hero-cta"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#reservar");
            }}
          >
            Reservar a minha vindima
          </a>
          <a
            href="#experiencia"
            className="vindima-hero-cta-secondary"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#experiencia");
            }}
          >
            Ver o dia completo ↓
          </a>
        </motion.div>

        <motion.div
          className="vindima-scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <span>Explorar</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M10 4 L10 16 M5 11 L10 16 L15 11" />
          </svg>
        </motion.div>
      </section>

      {/* ────── 3. ABOUT THE QUINTA ────── */}
      <section id="quinta" className="vindima-quinta">
        <FadeIn>
          <h2 className="vindima-section-title">
            A <span>Quinta</span>
          </h2>
        </FadeIn>

        <div className="vindima-quinta-grid">
          <FadeIn delay={0.1} className="vindima-quinta-image">
            <Image
              src="/wine-images/vindima-vineyard.jpg"
              alt="Quinta da Serenidade no Douro"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover", borderRadius: 12 }}
            />
          </FadeIn>
          <FadeIn delay={0.2} className="vindima-quinta-text">
            <h3>Quinta da Serenidade -- Cima Corgo</h3>
            <p>
              Localizada entre Peso da Regua e o Pinhao, esta quinta familiar de 25 hectares esta
              nas margens do Douro ha quatro geracoes. Vinhas velhas de Touriga Nacional plantadas
              em socalcos de xisto a mais de 400 metros de altitude.
            </p>
            <p>
              Adega modernizada que respeita metodos tradicionais. Lagar de granito centenario
              ainda em uso. Patrimonio Mundial da UNESCO.
            </p>
            <div className="vindima-quinta-castas">
              <span>Touriga Nacional</span>
              <span>Touriga Franca</span>
              <span>Tinta Roriz</span>
              <span>Tinta Barroca</span>
            </div>
            <p className="vindima-quinta-producao">
              Douro DOC tinto e branco &middot; Porto Vintage &middot; Porto Tawny
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ────── 4. TIMELINE ────── */}
      <section id="experiencia" style={{ background: "white" }}>
        <FadeIn>
          <h2 className="vindima-section-title">
            A <span>Experiencia</span> -- Do Amanhecer ao Por do Sol
          </h2>
        </FadeIn>

        <div className="vindima-timeline">
          {TIMELINE.map((item, i) => (
            <FadeIn key={item.time} delay={i * 0.08}>
              <div className="vindima-timeline-item">
                <div className="vindima-timeline-dot" />
                <div className="vindima-timeline-time">
                  {item.emoji} {item.time}
                </div>
                <div className="vindima-timeline-title">{item.title}</div>
                <div className="vindima-timeline-desc">{item.desc}</div>
                <div className="vindima-timeline-image">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    style={{ objectFit: "cover", borderRadius: 8 }}
                  />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ────── 5. PHOTO GALLERY ────── */}
      <section id="galeria">
        <FadeIn>
          <h2 className="vindima-section-title">
            <span>Galeria</span>
          </h2>
        </FadeIn>

        <div className="vindima-gallery">
          {GALLERY_IMAGES.map((img, i) => (
            <FadeIn key={img.src} delay={i * 0.06} className={`vindima-gallery-item ${i === 0 ? "vindima-gallery-large" : ""}`}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ────── 6. WHAT'S INCLUDED + FAMILY CORNER ────── */}
      <section id="inclui" style={{ background: "white" }}>
        <FadeIn>
          <h2 className="vindima-section-title">
            O que <span>Inclui</span>
          </h2>
        </FadeIn>

        <div className="vindima-features-grid">
          {FEATURES.map((feat, i) => (
            <FadeIn key={feat.title} delay={i * 0.06}>
              <div className="vindima-feature-card">
                <span className="vindima-feature-card-emoji">{feat.emoji}</span>
                <span className="vindima-feature-card-title">{feat.title}</span>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Family Corner */}
        <FadeIn>
          <div className="vindima-family-corner">
            <h3 className="vindima-family-title">
              {"\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC66"} Cantinho da Familia
            </h3>
            <p className="vindima-family-subtitle">
              Dos 3 aos 93 anos, ha lugar para todos. As criancas nao sao toleradas -- sao bem-vindas.
            </p>
            <div className="vindima-family-grid">
              {FAMILY_ACTIVITIES.map((act, i) => (
                <FadeIn key={act.title} delay={i * 0.06}>
                  <div className="vindima-family-card">
                    <span className="vindima-family-emoji">{act.emoji}</span>
                    <strong>{act.title}</strong>
                    <p>{act.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ────── 7. TESTIMONIALS ────── */}
      <section className="vindima-testimonials">
        <FadeIn>
          <h2 className="vindima-section-title">
            O que <span>Dizem</span>
          </h2>
          <div className="vindima-google-badge">
            {"\u2605"} 4.9 no Google &middot; 200+ avaliacoes
          </div>
        </FadeIn>

        <div style={{ position: "relative", minHeight: 240 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              className="vindima-testimonial-card"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <Stars count={TESTIMONIALS[activeTestimonial].stars} />
              <p className="vindima-testimonial-quote">
                {TESTIMONIALS[activeTestimonial].quote}
              </p>
              <p className="vindima-testimonial-author">
                -- {TESTIMONIALS[activeTestimonial].author},{" "}
                {TESTIMONIALS[activeTestimonial].location}
              </p>
              <p className="vindima-testimonial-date">
                {TESTIMONIALS[activeTestimonial].date}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="vindima-dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={`vindima-dot ${i === activeTestimonial ? "active" : ""}`}
              onClick={() => setActiveTestimonial(i)}
              aria-label={`Testemunho ${i + 1}`}
            >
              <span />
            </button>
          ))}
        </div>
      </section>

      {/* ────── 8. TEAM ────── */}
      <section id="equipa" style={{ background: "white" }}>
        <FadeIn>
          <h2 className="vindima-section-title">
            A Nossa <span>Equipa</span>
          </h2>
        </FadeIn>

        <div className="vindima-team-grid">
          {TEAM.map((member, i) => (
            <FadeIn key={member.name} delay={i * 0.1}>
              <div className="vindima-team-card">
                <div className="vindima-team-avatar">{member.emoji}</div>
                <h3>{member.name}</h3>
                <p className="vindima-team-role">{member.role}</p>
                <p className="vindima-team-bio">{member.bio}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ────── 9. SEASONAL CALENDAR ────── */}
      <section id="calendario">
        <FadeIn>
          <h2 className="vindima-section-title">
            Calendario <span>Sazonal</span>
          </h2>
        </FadeIn>

        <div className="vindima-calendar">
          {CALENDAR.map((item, i) => (
            <FadeIn key={item.period} delay={i * 0.08}>
              <div className="vindima-calendar-item" style={{ borderLeftColor: item.color }}>
                <div className="vindima-calendar-period">{item.period}</div>
                <div className="vindima-calendar-status" style={{ color: item.color }}>{item.status}</div>
                <div className="vindima-calendar-desc">{item.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="vindima-offseason">
            <h3>Fora da Vindima</h3>
            <div className="vindima-offseason-grid">
              <div><strong>Nov-Dez:</strong> Prova do Vinho Novo + Cozido a portuguesa</div>
              <div><strong>Jan-Fev:</strong> Poda de Inverno. Paisagem dramatica.</div>
              <div><strong>Mar-Abr:</strong> Despertar da Vinha. Passeios entre vinhas floridas.</div>
              <div><strong>Mai-Jun:</strong> Florescencia. Workshop de biodiversidade.</div>
              <div><strong>Jul-Ago:</strong> Pintor da uva. Provas de verao. Noites na quinta.</div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ────── 10. FAQ ────── */}
      <section id="faq" style={{ background: "white" }}>
        <FadeIn>
          <h2 className="vindima-section-title">
            Perguntas <span>Frequentes</span>
          </h2>
        </FadeIn>

        <div className="vindima-faq-list">
          {FAQ_DATA.map((item, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="vindima-faq-item">
                <button
                  className={`vindima-faq-question ${openFaq === i ? "open" : ""}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{item.q}</span>
                  <span className="vindima-faq-icon">{openFaq === i ? "\u2212" : "+"}</span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      className="vindima-faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ────── 11. PRICING ────── */}
      <section id="pacotes">
        <FadeIn>
          <h2 className="vindima-section-title">
            <span>Pacotes</span> & Precos
          </h2>
        </FadeIn>

        <div className="vindima-pricing-grid">
          {PRICING.map((tier, i) => (
            <FadeIn key={tier.name} delay={i * 0.1}>
              <div className={`vindima-pricing-card ${tier.highlight ? "vindima-pricing-highlight" : ""}`}>
                {tier.highlight && <div className="vindima-pricing-badge">Mais popular</div>}
                <h3>{tier.name}</h3>
                <div className="vindima-pricing-price">
                  <span className="vindima-pricing-currency">{"\u20AC"}</span>
                  <span className="vindima-pricing-amount">{tier.price}</span>
                  <span className="vindima-pricing-per">/adulto</span>
                </div>
                <p className="vindima-pricing-tagline">{tier.tagline}</p>
                <p className="vindima-pricing-duration">{tier.duration}</p>
                <ul>
                  {tier.features.map((f) => (
                    <li key={f}>{"\u2713"} {f}</li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/351934035971"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vindima-pricing-cta"
                >
                  Reservar {tier.name}
                </a>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="vindima-pricing-discounts">
            <p><strong>Descontos:</strong> Criancas ate 3 anos gratuito &middot; 4-12 anos 50% &middot; Grupos 10+ pessoas 10% &middot; Reserva antecipada (3+ meses) 5% &middot; Repetentes 10%</p>
          </div>
        </FadeIn>
      </section>

      {/* ────── 12. CTA ────── */}
      <section id="reservar" className="vindima-cta">
        <FadeIn>
          <h2 className="vindima-section-title">
            Setembro esta a chegar.{"\n"}As uvas <span>esperam por si</span>.
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="vindima-cta-text">
            Cada vindima e unica. Cada ano, a terra da uvas diferentes.
            Cada grupo escreve uma historia nova nos socalcos. Este ano, a historia pode ser a sua.
          </p>
        </FadeIn>

        <FadeIn delay={0.25}>
          <div className="vindima-cta-buttons">
            <a
              href="https://wa.me/351934035971"
              target="_blank"
              rel="noopener noreferrer"
              className="vindima-whatsapp-btn"
            >
              {WHATSAPP_SVG}
              Reservar via WhatsApp
            </a>
            <a
              href="mailto:reservas@vindimaselvagem.pt"
              className="vindima-email-btn"
            >
              {"\u2709\uFE0F"} reservas@vindimaselvagem.pt
            </a>
          </div>
        </FadeIn>
      </section>

      {/* ────── 13. FOOTER ────── */}
      <footer className="vindima-footer">
        <div className="vindima-footer-logo">Vindima Selvagem</div>
        <p>Uma experiencia Descomplicai</p>
        <div className="vindima-footer-links">
          <a href="https://www.instagram.com/vindimaselvagem" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
          <span>&middot;</span>
          <a href="https://www.facebook.com/vindimaselvagem" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a>
          <span>&middot;</span>
          <a href="https://wa.me/351934035971" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">WhatsApp</a>
        </div>
        <p className="vindima-footer-address">
          Quinta da Serenidade, Pinhao &middot; Douro, Portugal
        </p>
        <p style={{ marginTop: 16 }}>
          &copy; {new Date().getFullYear()} Vindima Selvagem. Todos os direitos reservados.
        </p>
      </footer>
    </>
  );
}
