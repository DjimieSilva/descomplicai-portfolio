"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Wine,
  MapPin,
  Clock,
  Phone,
  ChevronDown,
  Star,
  Calendar,
  Users,
  Euro,
  Instagram,
  Facebook,
  MessageCircle,
  Menu,
  X,
  Grape,
  Leaf,
  Heart,
} from "lucide-react";
import "./meiocheio.css";

/* ================================================================
   CONSTANTS & DATA
   ================================================================ */

const WHATSAPP_URL =
  "https://wa.me/351934035971?text=Ol%C3%A1!%20Gostaria%20de%20reservar%20uma%20mesa%20no%20Meio%20Cheio";

const NAV_ITEMS = [
  { label: "Sobre", href: "#sobre" },
  { label: "Carta", href: "#carta" },
  { label: "Petiscos", href: "#petiscos" },
  { label: "Experiencias", href: "#experiencias" },
  { label: "Galeria", href: "#galeria" },
  { label: "Horario", href: "#horario" },
  { label: "Reservar", href: WHATSAPP_URL },
];

type WineCategory = "tintos" | "brancos" | "roses" | "naturais" | "espumantes";

interface WineItem {
  name: string;
  region: string;
  grape: string;
  glass: string;
  bottle: string;
  note: string;
}

const WINE_CATEGORIES: { key: WineCategory; label: string }[] = [
  { key: "tintos", label: "Tintos" },
  { key: "brancos", label: "Brancos" },
  { key: "roses", label: "Roses" },
  { key: "naturais", label: "Naturais" },
  { key: "espumantes", label: "Espumantes" },
];

const WINES: Record<WineCategory, WineItem[]> = {
  tintos: [
    { name: "Quinta do Crasto Reserva", region: "Douro", grape: "Touriga Nacional, Tinta Roriz", glass: "6.50", bottle: "28", note: "Encorpado, notas de amora e especiarias, taninos elegantes" },
    { name: "Herdade do Esporao Reserva", region: "Alentejo", grape: "Aragonez, Trincadeira", glass: "7.00", bottle: "32", note: "Fruta madura, toque de baunilha e chocolate negro" },
    { name: "Dao Sul Cabriz Colheita Seleccionada", region: "Dao", grape: "Touriga Nacional, Alfrocheiro", glass: "5.50", bottle: "22", note: "Elegante, frutos vermelhos, final longo e mineral" },
    { name: "Luis Pato Vinhas Velhas", region: "Bairrada", grape: "Baga", glass: "8.00", bottle: "38", note: "Complexo, cerejas negras, acidez vibrante, grande estrutura" },
    { name: "Quinta da Pellada Primus", region: "Dao", grape: "Touriga Nacional", glass: "9.50", bottle: "45", note: "Profundo, violetas e frutos silvestres, taninos aveludados" },
  ],
  brancos: [
    { name: "Soalheiro Alvarinho", region: "Vinhos Verdes", grape: "Alvarinho", glass: "6.00", bottle: "26", note: "Fresco e citrico, notas de pessego e flor de laranjeira" },
    { name: "Quinta dos Carvalhais Encruzado", region: "Dao", grape: "Encruzado", glass: "7.50", bottle: "34", note: "Mineral, elegante, toques de frutos tropicais e mel" },
    { name: "Niepoort Rotulo", region: "Douro", grape: "Codega, Rabigato, Viosinho", glass: "5.00", bottle: "20", note: "Leve e fresco, citrinos, perfeito para petiscos" },
    { name: "Herdade do Rocim Amphora", region: "Alentejo", grape: "Antao Vaz", glass: "8.50", bottle: "40", note: "Fermentado em talha, textura unica, notas de mel e ervas" },
    { name: "Anselmo Mendes Contacto", region: "Vinhos Verdes", grape: "Alvarinho", glass: "6.50", bottle: "28", note: "Cremoso, acidez equilibrada, final persistente" },
  ],
  roses: [
    { name: "Esporao Bico Amarelo Rose", region: "Vinhos Verdes", grape: "Padeiro, Vinhao", glass: "4.50", bottle: "18", note: "Leve, refrescante, frutos vermelhos delicados" },
    { name: "Quinta de Chocapalha Rose", region: "Lisboa", grape: "Touriga Nacional, Tinta Roriz", glass: "5.00", bottle: "20", note: "Vibrante, morangos silvestres, final seco e elegante" },
    { name: "Mateus Rose Premium", region: "Douro", grape: "Baga, Rufete", glass: "4.00", bottle: "16", note: "O classico reinventado, leve frisante, perfeito ao por-do-sol" },
    { name: "Quinta do Ameal Rose", region: "Vinhos Verdes", grape: "Espadeiro", glass: "6.00", bottle: "24", note: "Delicado, petalas de rosa, acidez cristalina" },
  ],
  naturais: [
    { name: "Aphros Ten", region: "Vinhos Verdes", grape: "Loureiro", glass: "7.00", bottle: "30", note: "Biodinamico, fresco, citrico, com personalidade unica" },
    { name: "Conceito Bastardo", region: "Douro", grape: "Bastardo", glass: "8.00", bottle: "36", note: "Sem sulfitos, fruta pura, selvagem e honesto" },
    { name: "Folias de Baco Uivo Curtimenta", region: "Douro", grape: "Rabigato", glass: "9.00", bottle: "42", note: "Laranja/amber, macerado, complexo, notas de damasco seco" },
    { name: "Rita Ferreira Nat Cool", region: "Lisboa", grape: "Castelao", glass: "5.50", bottle: "22", note: "Descomplicado, levissimo, para beber sem pensar muito" },
    { name: "Vale da Capucha Fossil", region: "Lisboa", grape: "Arinto", glass: "7.50", bottle: "34", note: "Minimo de intervencao, salinidade atlantica, vivo" },
  ],
  espumantes: [
    { name: "Luis Pato Espumante Baga", region: "Bairrada", grape: "Baga", glass: "7.50", bottle: "35", note: "Metodo classico, bolha fina, notas de brioche e maca verde" },
    { name: "Murganheira Czar Cuvee", region: "Tavora-Varosa", grape: "Malvasia Fina, Cerceal", glass: "8.50", bottle: "40", note: "36 meses de estagio, cremoso, toasty, elegante" },
    { name: "Soalheiro Espumante Bruto", region: "Vinhos Verdes", grape: "Alvarinho", glass: "7.00", bottle: "30", note: "Fresco, bolhas persistentes, citrinos e flores brancas" },
    { name: "Caves Sao Joao Bruto Natural", region: "Bairrada", grape: "Maria Gomes, Bical", glass: "6.50", bottle: "28", note: "Classico portugues, levedo, amendoa, final seco" },
  ],
};

const PETISCOS = [
  { name: "Tabua de Queijos", price: "14", desc: "Seleccao de queijos portugueses: Serra da Estrela, Azeitao, Sao Jorge e Nisa, com mel e nozes" },
  { name: "Presunto Iberico", price: "18", desc: "Cortado a mao, 36 meses de cura, com regueifa torrada e azeite DOP" },
  { name: "Polvo a Lagareiro", price: "16", desc: "Tentaculo grelhado na brasa, batata a murro, azeite virgem extra do Alentejo" },
  { name: "Pataniscas de Bacalhau", price: "10", desc: "Receita da avo, crocantes por fora, macias por dentro, com arroz de feijao" },
  { name: "Cogumelos Salteados", price: "9", desc: "Mistura de cogumelos selvagens com alho, salsa e um toque de vinho branco" },
  { name: "Bruschetta de Tomate", price: "8", desc: "Tomate da horta, manjericao fresco, queijo de cabra e reducao de balsamico" },
  { name: "Alheira Frita", price: "11", desc: "Alheira de Mirandela, frita em azeite, com ovo estrelado e grelos salteados" },
  { name: "Conservas Premium", price: "12", desc: "Seleccao de conservas portuguesas: sardinha, atum, cavala, com pao rustico" },
];

const EXPERIENCES = [
  {
    icon: "🍷",
    title: "Prova de Vinhos",
    desc: "Uma viagem pelos vinhos portugueses, guiada pelo nosso sommelier. 6 vinhos, 6 historias, muita conversa.",
    when: "Sabados, 16h00",
    people: "Max. 12 pessoas",
    price: "35 por pessoa",
  },
  {
    icon: "🌿",
    title: "Noites de Vinho Natural",
    desc: "Uma vez por mes, dedicamos a noite aos vinhos naturais. Produtores convidados, petiscos especiais e zero pretensismo.",
    when: "Ultima sexta do mes, 20h00",
    people: "Max. 30 pessoas",
    price: "25 por pessoa",
  },
  {
    icon: "🍽️",
    title: "Jantares Vinicolas",
    desc: "Menu de 5 pratos harmonizados com vinhos de uma regiao especifica. Uma experiencia completa para os sentidos.",
    when: "1o sabado do mes, 20h00",
    people: "Max. 20 pessoas",
    price: "55 por pessoa",
  },
];

const GALLERY_ITEMS = [
  { label: "A nossa cave", gradient: "linear-gradient(135deg, #5C1A1B, #3E1112)" },
  { label: "Noite de prova", gradient: "linear-gradient(135deg, #1C1C1C, #5C1A1B)" },
  { label: "Petiscos da casa", gradient: "linear-gradient(135deg, #B47B5C, #5C1A1B)" },
  { label: "Ambiente intimo", gradient: "linear-gradient(135deg, #C9A96E, #3E1112)" },
  { label: "Seleccao natural", gradient: "linear-gradient(135deg, #3E1112, #C9A96E)" },
  { label: "Detalhes que importam", gradient: "linear-gradient(135deg, #5C1A1B, #B47B5C)" },
  { label: "Vinhos a espera", gradient: "linear-gradient(135deg, #1C1C1C, #B47B5C)" },
  { label: "Figueira da Foz", gradient: "linear-gradient(135deg, #C9A96E, #5C1A1B)" },
];

const TESTIMONIALS = [
  {
    text: "O melhor sitio para beber vinho na Figueira. Ambiente descontraido, carta incrivel e o sommelier sabe mesmo do que fala. Ja e a nossa segunda casa.",
    author: "Maria Fernandes",
    location: "Figueira da Foz",
    stars: 5,
  },
  {
    text: "Fomos a uma noite de vinho natural e ficamos viciados. Os produtores que trazem sao fantasticos e os petiscos sao de outro nivel. Voltamos sempre!",
    author: "Joao e Ana",
    location: "Coimbra",
    stars: 5,
  },
  {
    text: "Descobrimos o Meio Cheio por acaso e foi a melhor surpresa das ferias. A tabua de queijos com um copo de Encruzado do Dao... perfeicao.",
    author: "Pierre Dubois",
    location: "Lyon, Franca",
    stars: 5,
  },
  {
    text: "Fiz aqui o jantar vinicola do Alentejo e foi uma das melhores experiencias gastronomicas que tive em Portugal. Parabens a toda a equipa.",
    author: "Ricardo Lopes",
    location: "Lisboa",
    stars: 5,
  },
];

const FAQS = [
  {
    q: "Preciso de reserva?",
    a: "Recomendamos reserva, especialmente ao fim-de-semana e para grupos de 4 ou mais pessoas. Pode reservar pelo WhatsApp ou por telefone. Se vier sozinho ou a dois durante a semana, normalmente ha lugar sem reserva.",
  },
  {
    q: "Fazem eventos privados?",
    a: "Sim! Temos um espaco reservado que acomoda ate 20 pessoas para jantares privados, provas de vinho corporativas ou celebracoes. Entre em contacto connosco para um orcamento personalizado.",
  },
  {
    q: "Como escolhem os vinhos?",
    a: "Trabalhamos directamente com pequenos produtores portugueses. O nosso sommelier visita as quintas regularmente e selecciona vinhos que contem uma historia. Privilegiamos producao sustentavel e vinhos de terroir.",
  },
  {
    q: "Tem opcoes para quem nao bebe vinho?",
    a: "Claro! Temos cervejas artesanais portuguesas, cocktails de autor, sumos naturais e uma seleccao de chas. E a nossa agua e sempre da serra.",
  },
  {
    q: "O menu muda regularmente?",
    a: "Os petiscos mudam sazonalmente para acompanhar os melhores produtos de cada epoca. A carta de vinhos e actualizada mensalmente, com novidades que vamos descobrindo nas nossas viagens pelo pais.",
  },
  {
    q: "Tem estacionamento?",
    a: "Nao temos estacionamento proprio, mas ha estacionamento gratuito na Rua da Esperanca e ruas adjacentes. Ao fim-de-semana, o parque do mercado municipal tambem e uma boa opcao a 3 minutos a pe.",
  },
];

const HOURS = [
  { day: "Segunda", hours: "Encerrado" },
  { day: "Terca a Quinta", hours: "17h00 - 23h00" },
  { day: "Sexta", hours: "17h00 - 00h30" },
  { day: "Sabado", hours: "15h00 - 00h30" },
  { day: "Domingo", hours: "15h00 - 22h00" },
];

/* ================================================================
   COMPONENTS
   ================================================================ */

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
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Navbar ──────────────────────────────────────────────────── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav className={`mc-nav ${scrolled ? "mc-nav--scrolled" : ""}`}>
        <div className="mc-nav-inner">
          <a href="#" className="mc-nav-logo">meiocheio</a>
          <ul className="mc-nav-links">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="mc-nav-link"
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            className="mc-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {menuOpen ? <X size={24} color="#FAF5EF" /> : <Menu size={24} color="#FAF5EF" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mc-mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="mc-mobile-link"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setMenuOpen(false)}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Hero ────────────────────────────────────────────────────── */

function Hero() {
  const words = ["Meio", "Cheio"];
  return (
    <section className="mc-hero mc-noise">
      <span className="mc-hero-glass" style={{ top: "20%", left: "10%" }}>🍷</span>
      <span className="mc-hero-glass" style={{ top: "60%", right: "8%", fontSize: "4rem" }}>🍷</span>
      <span className="mc-hero-glass" style={{ bottom: "15%", left: "20%", fontSize: "3rem" }}>🥂</span>
      <span className="mc-hero-glass" style={{ top: "30%", right: "20%", fontSize: "2.5rem" }}>🍇</span>

      <h1 className="mc-hero-title">
        {words.map((word, i) => (
          <motion.span
            key={word}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 + i * 0.2, ease: "easeOut" }}
            style={{ display: "inline-block", marginRight: i === 0 ? "0.3em" : 0 }}
          >
            {word}
          </motion.span>
        ))}
      </h1>

      <motion.p
        className="mc-hero-tagline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        Onde cada copo conta uma historia
      </motion.p>

      <motion.div
        className="mc-hero-ctas"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <a href="#carta" className="mc-btn mc-btn--gold">
          <Wine size={18} /> Ver a Carta
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mc-btn mc-btn--outline"
        >
          <MessageCircle size={18} /> Reservar Mesa
        </a>
      </motion.div>
    </section>
  );
}

/* ── About ───────────────────────────────────────────────────── */

function About() {
  return (
    <section className="mc-section" id="sobre">
      <div className="mc-container">
        <FadeIn>
          <div className="mc-about-grid">
            <div className="mc-about-text">
              <h2 className="mc-section-title">Sobre Nos</h2>
              <p className="mc-section-subtitle">Mais do que um bar. Um estado de espirito.</p>
              <p>
                Acreditamos que um copo meio cheio e um convite para descobrir mais. Vinhos
                portugueses, escolhidos com cuidado, servidos com alma. Nao somos um sitio para
                impressionar — somos um sitio para saborear.
              </p>
              <p>
                Nascemos da paixao por vinhos honestos e pela vontade de criar um espaco onde toda a
                gente se sinta em casa. Na nossa cave, o pretensismo fica a porta e o que conta e o
                que esta no copo e na boa companhia.
              </p>
              <div className="mc-about-values">
                <span className="mc-about-value"><Leaf size={16} /> Vinhos Naturais</span>
                <span className="mc-about-value"><Grape size={16} /> Produtores Locais</span>
                <span className="mc-about-value"><Heart size={16} /> Sem Pretensismo</span>
              </div>
            </div>

            <div className="mc-wine-visual">
              <div className="mc-wine-ring" />
              <div className="mc-wine-ring" />
              <div className="mc-wine-ring" />
              <div className="mc-wine-glass">
                <div className="mc-wine-glass-bowl" />
                <div className="mc-wine-glass-stem" />
                <div className="mc-wine-glass-base" />
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── Wine Menu ───────────────────────────────────────────────── */

function WineMenu() {
  const [active, setActive] = useState<WineCategory>("tintos");

  return (
    <section className="mc-section" id="carta" style={{ background: "rgba(0,0,0,0.2)" }}>
      <div className="mc-container">
        <FadeIn>
          <h2 className="mc-section-title" style={{ textAlign: "center" }}>Carta de Vinhos</h2>
          <p className="mc-section-subtitle" style={{ textAlign: "center" }}>
            Seleccionados a dedo. Servidos com historia.
          </p>
          <div className="mc-divider" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mc-tabs">
            {WINE_CATEGORIES.map(({ key, label }) => (
              <button
                key={key}
                className={`mc-tab ${active === key ? "mc-tab--active" : ""}`}
                onClick={() => setActive(key)}
              >
                {label}
              </button>
            ))}
          </div>
        </FadeIn>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="mc-wines-grid"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {WINES[active].map((wine, i) => (
              <FadeIn key={wine.name} delay={i * 0.06}>
                <div className="mc-wine-card">
                  <div>
                    <div className="mc-wine-name">{wine.name}</div>
                    <div className="mc-wine-meta">
                      {wine.region} &middot; {wine.grape}
                    </div>
                    <div className="mc-wine-note">{wine.note}</div>
                  </div>
                  <div className="mc-wine-prices">
                    <div>
                      <span className="mc-wine-price">{wine.glass}&euro;</span>
                      <div className="mc-wine-price-label">copo</div>
                    </div>
                    <div>
                      <span className="mc-wine-price">{wine.bottle}&euro;</span>
                      <div className="mc-wine-price-label">garrafa</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ── Petiscos ────────────────────────────────────────────────── */

function Petiscos() {
  return (
    <section className="mc-section" id="petiscos">
      <div className="mc-container">
        <FadeIn>
          <h2 className="mc-section-title" style={{ textAlign: "center" }}>Petiscos</h2>
          <p className="mc-section-subtitle" style={{ textAlign: "center" }}>
            Para acompanhar o vinho. Ou o vinho para acompanhar eles.
          </p>
          <div className="mc-divider" />
        </FadeIn>

        <div className="mc-petiscos-grid">
          {PETISCOS.map((item, i) => (
            <FadeIn key={item.name} delay={i * 0.06}>
              <div className="mc-petisco-card">
                <div className="mc-petisco-header">
                  <span className="mc-petisco-name">{item.name}</span>
                  <span className="mc-petisco-price">{item.price}&euro;</span>
                </div>
                <p className="mc-petisco-desc">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Experiences ─────────────────────────────────────────────── */

function Experiences() {
  return (
    <section
      className="mc-section"
      id="experiencias"
      style={{ background: "rgba(0,0,0,0.2)" }}
    >
      <div className="mc-container">
        <FadeIn>
          <h2 className="mc-section-title" style={{ textAlign: "center" }}>Experiencias</h2>
          <p className="mc-section-subtitle" style={{ textAlign: "center" }}>
            Mais do que beber vinho. Viver o vinho.
          </p>
          <div className="mc-divider" />
        </FadeIn>

        <div className="mc-exp-grid">
          {EXPERIENCES.map((exp, i) => (
            <FadeIn key={exp.title} delay={i * 0.1}>
              <div className="mc-exp-card">
                <div className="mc-exp-icon">{exp.icon}</div>
                <h3 className="mc-exp-title">{exp.title}</h3>
                <p className="mc-exp-desc">{exp.desc}</p>
                <div className="mc-exp-detail"><Calendar size={14} /> {exp.when}</div>
                <div className="mc-exp-detail"><Users size={14} /> {exp.people}</div>
                <div className="mc-exp-detail"><Euro size={14} /> {exp.price}</div>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mc-btn mc-btn--whatsapp"
                  style={{ marginTop: "1rem", width: "100%", justifyContent: "center" }}
                >
                  <MessageCircle size={16} /> Reservar
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Gallery ─────────────────────────────────────────────────── */

function Gallery() {
  return (
    <section className="mc-section" id="galeria">
      <div className="mc-container">
        <FadeIn>
          <h2 className="mc-section-title" style={{ textAlign: "center" }}>Galeria</h2>
          <p className="mc-section-subtitle" style={{ textAlign: "center" }}>
            Momentos que se saboreiam.
          </p>
          <div className="mc-divider" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mc-gallery-grid">
            {GALLERY_ITEMS.map((item) => (
              <div key={item.label} className="mc-gallery-item">
                <div className="mc-gallery-bg" style={{ background: item.gradient }} />
                <div className="mc-gallery-overlay">
                  <span className="mc-gallery-label">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── Testimonials ────────────────────────────────────────────── */

function Testimonials() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [next]);

  const t = TESTIMONIALS[current];

  return (
    <section className="mc-section" style={{ background: "rgba(0,0,0,0.2)" }}>
      <div className="mc-container">
        <FadeIn>
          <h2 className="mc-section-title" style={{ textAlign: "center" }}>
            O Que Dizem
          </h2>
          <div className="mc-divider" />
        </FadeIn>

        <div className="mc-testimonials-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="mc-testimonial"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mc-testimonial-stars">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} size={16} fill="#C9A96E" stroke="#C9A96E" />
                ))}
              </div>
              <p className="mc-testimonial-text">&ldquo;{t.text}&rdquo;</p>
              <div className="mc-testimonial-author">{t.author}</div>
              <div className="mc-testimonial-loc">{t.location}</div>
            </motion.div>
          </AnimatePresence>

          <div className="mc-dots">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                className={`mc-dot ${i === current ? "mc-dot--active" : ""}`}
                onClick={() => {
                  setCurrent(i);
                  if (timerRef.current) clearInterval(timerRef.current);
                  timerRef.current = setInterval(next, 5000);
                }}
                aria-label={`Testemunho ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Schedule & Location ─────────────────────────────────────── */

function ScheduleLocation() {
  return (
    <section className="mc-section" id="horario">
      <div className="mc-container">
        <FadeIn>
          <h2 className="mc-section-title" style={{ textAlign: "center" }}>
            Horario &amp; Localizacao
          </h2>
          <p className="mc-section-subtitle" style={{ textAlign: "center" }}>
            Venha visitar-nos. O copo esta a sua espera.
          </p>
          <div className="mc-divider" />
        </FadeIn>

        <div className="mc-info-grid">
          <FadeIn delay={0.1}>
            <div>
              <h3 style={{ fontFamily: "var(--mc-serif)", color: "var(--mc-gold)", marginBottom: "1rem", fontSize: "1.3rem" }}>
                <Clock size={18} style={{ verticalAlign: "middle", marginRight: "0.5rem" }} />
                Horario
              </h3>
              <table className="mc-hours-table">
                <tbody>
                  {HOURS.map(({ day, hours }) => (
                    <tr key={day}>
                      <td>{day}</td>
                      <td>{hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ marginTop: "2rem" }}>
                <h3 style={{ fontFamily: "var(--mc-serif)", color: "var(--mc-gold)", marginBottom: "0.75rem", fontSize: "1.3rem" }}>
                  <Phone size={18} style={{ verticalAlign: "middle", marginRight: "0.5rem" }} />
                  Contactos
                </h3>
                <p style={{ color: "rgba(250,245,239,0.7)", fontSize: "0.95rem", lineHeight: 2 }}>
                  Tel: +351 934 035 971<br />
                  Email: ola@meiocheio.pt
                </p>
              </div>

              <div style={{ marginTop: "1.5rem" }}>
                <h3 style={{ fontFamily: "var(--mc-serif)", color: "var(--mc-gold)", marginBottom: "0.75rem", fontSize: "1.3rem" }}>
                  Como Chegar
                </h3>
                <p style={{ color: "rgba(250,245,239,0.6)", fontSize: "0.9rem", lineHeight: 1.8 }}>
                  Estamos no coracao da Figueira da Foz, a 2 minutos da Praia da Claridade.
                  Venha pela Rua da Esperanca — o nome ja diz tudo. Estacionamento gratuito
                  nas ruas adjacentes.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mc-map-placeholder">
              <MapPin size={40} className="mc-map-pin" style={{ color: "var(--mc-gold)" }} />
              <div className="mc-map-address">
                <strong style={{ color: "var(--mc-cream)" }}>Meio Cheio</strong><br />
                Rua da Esperanca 42<br />
                3080-159 Figueira da Foz<br />
                Portugal
              </div>
              <a
                href="https://maps.google.com/?q=Rua+da+Esperanca+42+Figueira+da+Foz"
                target="_blank"
                rel="noopener noreferrer"
                className="mc-btn mc-btn--outline"
                style={{ marginTop: "0.5rem", fontSize: "0.85rem", padding: "0.6rem 1.2rem" }}
              >
                <MapPin size={14} /> Ver no Google Maps
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ─────────────────────────────────────────────────────── */

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mc-faq-item">
      <button className="mc-faq-question" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <ChevronDown size={18} className={`mc-faq-chevron ${open ? "mc-faq-chevron--open" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="mc-faq-answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQ() {
  return (
    <section className="mc-section" style={{ background: "rgba(0,0,0,0.2)" }}>
      <div className="mc-container">
        <FadeIn>
          <h2 className="mc-section-title" style={{ textAlign: "center" }}>
            Perguntas Frequentes
          </h2>
          <div className="mc-divider" />
        </FadeIn>

        <div className="mc-faq-list">
          {FAQS.map((faq, i) => (
            <FadeIn key={faq.q} delay={i * 0.06}>
              <FAQItem q={faq.q} a={faq.a} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="mc-footer">
      <div className="mc-container">
        <div className="mc-footer-grid">
          <div>
            <div className="mc-footer-brand">meiocheio</div>
            <p className="mc-footer-tagline">O copo esta sempre meio cheio.</p>
            <div className="mc-social-links">
              <a href="#" className="mc-social-link" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="mc-social-link" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mc-social-link"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mc-footer-heading">Navegacao</h4>
            <ul className="mc-footer-links">
              {NAV_ITEMS.slice(0, -1).map((item) => (
                <li key={item.label}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mc-footer-heading">Newsletter</h4>
            <p style={{ fontSize: "0.85rem", color: "rgba(250,245,239,0.5)", marginBottom: "0.75rem" }}>
              Receba novidades, eventos e sugestoes de vinho.
            </p>
            <div className="mc-newsletter">
              <input
                type="email"
                placeholder="O seu email"
                className="mc-newsletter-input"
                aria-label="Email para newsletter"
              />
              <button className="mc-newsletter-btn">Subscrever</button>
            </div>
          </div>
        </div>

        <div className="mc-footer-bottom">
          <span>&copy; {new Date().getFullYear()} Meio Cheio. Todos os direitos reservados.</span>
          <span>Beba com moderacao. O copo meio cheio tambem precisa de pausa.</span>
        </div>
      </div>
    </footer>
  );
}

/* ── Floating WhatsApp Button ────────────────────────────────── */

function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mc-whatsapp-float"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle size={26} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

/* ================================================================
   PAGE
   ================================================================ */

export default function MeioCheioPage() {
  return (
    <div className="mc-page">
      <Navbar />
      <Hero />
      <About />
      <WineMenu />
      <Petiscos />
      <Experiences />
      <Gallery />
      <Testimonials />
      <ScheduleLocation />
      <FAQ />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
