"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Data ─── */

const navLinks = [
  { label: "Regiões", href: "#regioes" },
  { label: "Galeria", href: "#galeria" },
  { label: "Tours", href: "#experiencias" },
  { label: "Guias", href: "#guias" },
  { label: "FAQ", href: "#faq" },
  { label: "Reservar", href: "#reservar" },
];

const regions = [
  {
    name: "Douro",
    tagline: "O berço do vinho do Porto e Património Mundial da UNESCO",
    emoji: "\u{1F3D4}\uFE0F",
    grad: "rota-grad-douro",
    grape: "Touriga Nacional, Touriga Franca, Tinta Roriz",
    bestTime: "Setembro-outubro (vindimas) ou abril-junho",
    unique: "Região vinícola demarcada mais antiga do mundo (1756)",
    quintas: "Quinta da Pacheca, Quinta do Crasto, Quinta de La Rosa",
  },
  {
    name: "Vinho Verde",
    tagline: "Frescura atlântica do Minho",
    emoji: "\u{1F30A}",
    grad: "rota-grad-verdes",
    grape: "Alvarinho, Loureiro, Trajadura",
    bestTime: "Maio a setembro (dias longos e festas populares)",
    unique: "A maior região vinícola de Portugal em área",
    quintas: "Quinta de Soalheiro, Quinta do Ameal, Paço de Calheiros",
  },
  {
    name: "Alentejo",
    tagline: "Planícies douradas, sobreiros centenários e vinhos generosos",
    emoji: "\u2600\uFE0F",
    grad: "rota-grad-alentejo",
    grape: "Aragonez, Trincadeira, Antão Vaz",
    bestTime: "Março-junho ou setembro-novembro",
    unique: "70+ vinícolas abertas a visitantes, 8 sub-regiões",
    quintas: "Herdade do Esporão, Adega da Cartuxa, Herdade das Servas",
  },
  {
    name: "Dão",
    tagline: "Elegância serrana entre granito e pinheiros",
    emoji: "\u{1F33F}",
    grad: "rota-grad-dao",
    grape: "Touriga Nacional, Encruzado, Alfrocheiro",
    bestTime: "Maio a outubro (cores magníficas no outono)",
    unique: "Terra natal da Touriga Nacional, vinhos comparados a Borgonha",
    quintas: "Casa da Insua, Quinta da Taboadella, Quinta dos Roques",
  },
  {
    name: "Bairrada",
    tagline: "Terra da Baga, do espumante e do leitão",
    emoji: "\u{1F942}",
    grad: "rota-grad-bairrada",
    grape: "Baga, Maria Gomes, Bical",
    bestTime: "Abril a outubro (vindima tardia em outubro)",
    unique: "Pátria do espumante português, método clássico de excelência",
    quintas: "Quinta do Encontro, Luís Pato, Caves São João",
  },
  {
    name: "Lisboa",
    tagline: "Vinhos com brisa atlântica às portas da capital",
    emoji: "\u{1F307}",
    grad: "rota-grad-lisboa",
    grape: "Arinto, Castelão, Moscatel de Setúbal",
    bestTime: "Abril a novembro (clima ameno quase todo o ano)",
    unique: "Vinhas sobre areia em Colares -- caso único no mundo",
    quintas: "Quinta de Chocapalha, José Maria da Fonseca, Quinta de Sant'Ana",
  },
];

const galleryItems = [
  { src: "/wine-images/rota-hero.jpg", caption: "Vista panorâmica dos socalcos do Douro" },
  { src: "/wine-images/rota-vineyard.jpg", caption: "Vinhas entre colinas e quintas centenárias" },
  { src: "/wine-images/rota-cellar.jpg", caption: "Adegas históricas com séculos de tradição" },
  { src: "/wine-images/rota-glasses.jpg", caption: "Provas comentadas com os melhores vinhos" },
  { src: "/wine-images/rota-food.jpg", caption: "Gastronomia regional harmonizada com vinho" },
  { src: "/wine-images/rota-landscape.jpg", caption: "Paisagens de tirar o fôlego em cada região" },
];

const steps = [
  {
    icon: "\u{1F5D3}\uFE0F",
    title: "Escolha a Região",
    desc: "Selecione uma das 6 regiões vinícolas de Portugal ou peça-nos uma sugestão",
    color: "#2563EB",
  },
  {
    icon: "\u{1F4C5}",
    title: "Marque a Data",
    desc: "Tours disponíveis de quinta a domingo. Reservas com 48h de antecedência",
    color: "#F59E0B",
  },
  {
    icon: "\u{1F377}",
    title: "Aproveite",
    desc: "Transporte, guia-sommelier, provas, almoço e seguro -- tudo incluído",
    color: "#16A34A",
  },
];

const experiences = [
  {
    title: "Rota Familiar",
    subtitle: "Meio dia para toda a família",
    price: "\u20AC65",
    unit: "/adulto",
    familyPrice: "\u20AC150 (2 adultos + 2 crianças)",
    tags: ["4-5 horas", "Crianças bem-vindas", "Lanche regional"],
    border: "rota-border-verdes",
    priceColor: "bg-cyan-100 text-cyan-700",
    desc: "Passeio pelas vinhas, prova de vinhos para adultos, sumos e jogos para crianças, piquenique no jardim da quinta.",
    popular: false,
  },
  {
    title: "Rota Clássica",
    subtitle: "A essência do enoturismo num só dia",
    price: "\u20AC135",
    unit: "/pessoa",
    familyPrice: "Grupos 4-6: \u20AC115/pp | 7-8: \u20AC99/pp",
    tags: ["8-9 horas", "2 quintas", "Almoço completo", "8-10 vinhos"],
    border: "rota-border-douro",
    priceColor: "bg-orange-100 text-orange-700",
    desc: "Visita a duas quintas, prova de 8-10 vinhos incluindo reservas, almoço regional e estrada panorâmica.",
    popular: true,
  },
  {
    title: "Rota Premium",
    subtitle: "2 dias de imersão completa",
    price: "\u20AC395",
    unit: "/pessoa",
    familyPrice: "Inclui 1 noite em quinta + jantar de degustação",
    tags: ["2 dias", "3 quintas", "15-20 vinhos", "Workshop blending"],
    border: "rota-border-alentejo",
    priceColor: "bg-yellow-100 text-yellow-700",
    desc: "Dormir numa quinta, jantar de 5 pratos harmonizados, prova vertical e criar o seu próprio blend.",
    popular: false,
  },
  {
    title: "Rota dos Sabores",
    subtitle: "Gastronomia + vinho, prato a prato",
    price: "\u20AC155",
    unit: "/pessoa",
    familyPrice: "Grupos 4-6: \u20AC135/pp | 7-10: \u20AC119/pp",
    tags: ["7-8 horas", "Workshop cozinha", "Prova de azeite", "Cesto regional"],
    border: "rota-border-bairrada",
    priceColor: "bg-pink-100 text-pink-700",
    desc: "Workshop de cozinha regional, almoço de harmonização, visita a queijaria artesanal e prova de azeites.",
    popular: false,
  },
  {
    title: "Rota Aventura",
    subtitle: "Caminhada + vinho entre vinhas",
    price: "\u20AC95",
    unit: "/pessoa",
    familyPrice: "Grupos 6-8: \u20AC79/pp | 9-12: \u20AC69/pp",
    tags: ["7-8 horas", "8-12 km trilho", "Piquenique vinícola", "4-5 vinhos"],
    border: "rota-border-dao",
    priceColor: "bg-green-100 text-green-700",
    desc: "Caminhada guiada pelos socalcos do Douro, piquenique com enchidos e queijo, prova na quinta.",
    popular: false,
  },
  {
    title: "Team Building Vinícola",
    subtitle: "Para empresas e grupos corporativos",
    price: "\u20AC75",
    unit: "/pessoa",
    familyPrice: "10-20 pessoas, meio dia | Dia inteiro: \u20AC130/pp",
    tags: ["10-60 pessoas", "Workshop blending", "Prova às cegas", "Competição"],
    border: "rota-border-lisboa",
    priceColor: "bg-red-100 text-red-700",
    desc: "Workshop de blending em equipa, prova às cegas competitiva, vindima em equipa e jantar de grupo.",
    popular: false,
  },
];

const guides = [
  {
    name: "João Pereira",
    role: "Fundador e Diretor",
    bio: "Nasceu nas vinhas de Sabrosa, no Douro. 15 anos de experiência em turismo. Certificação WSET Level 3.",
    langs: ["Português", "Inglês", "Espanhol"],
    color: "#2563eb",
    initials: "JP",
  },
  {
    name: "Tiago Nogueira",
    role: "Sommelier Principal",
    bio: "Sommelier certificado (Court of Master Sommeliers), WSET Level 3 Distinction. Estagiou na Borgonha.",
    langs: ["Português", "Inglês", "Francês", "Espanhol"],
    color: "#7c3aed",
    initials: "TN",
  },
  {
    name: "Sofia Barros",
    role: "Guia de Enoturismo e Natureza",
    bio: "Bióloga de formação, amante de vinhos. Guia os trilhos da Rota Aventura com paixão pela biodiversidade.",
    langs: ["Português", "Inglês"],
    color: "#16a34a",
    initials: "SB",
  },
  {
    name: "Miguel Azevedo",
    role: "Guia de Familias e Grupos",
    bio: "Formação em animação sociocultural. O favorito das crianças -- ninguém sai sem pés roxos e um sorriso.",
    langs: ["Português", "Inglês", "Espanhol"],
    color: "#f59e0b",
    initials: "MA",
  },
];

const testimonials = [
  {
    text: "Levámos os nossos dois filhos (7 e 10 anos) e o guia Miguel foi espetacular com as crianças, que adoraram pisar as uvas. O piquenique no jardim da quinta foi o ponto alto. Já estamos a planear voltar!",
    author: "Ana e Ricardo Ferreira",
    meta: "Lisboa \u2022 Rota Familiar (Vinho Verde)",
    rating: 5,
  },
  {
    text: "Somos um casal inglês apaixonado por vinhos e já fizemos tours em França e Itália. O Douro superou tudo. A guia Sofia explicou tudo com paixão e bom humor. O vinho do Porto de 1985 -- nunca vou esquecer.",
    author: "James e Sarah Mitchell",
    meta: "Londres \u2022 Rota Clássica (Douro)",
    rating: 5,
  },
  {
    text: "Reservei a Rota Premium para celebrar 25 anos de casados. Dormir numa quinta no Douro, jantar com harmonização de 5 pratos, criar o nosso próprio blend... foi tudo perfeito.",
    author: "Carlos Mendonça",
    meta: "Porto \u2022 Rota Premium (Douro)",
    rating: 5,
  },
  {
    text: "Organizámos o team building da empresa (22 pessoas) e foi um sucesso. A competição de blending gerou muita risada. Até o nosso diretor acabou a dizer que o Encruzado do Dão era brutal!",
    author: "Margarida Santos",
    meta: "Diretora de RH \u2022 Rota Corporativa (Dão)",
    rating: 5,
  },
  {
    text: "Viemos do Brasil e foi o ponto alto da viagem. A herdade era lindíssima, o Pera-Manca era divino, e o ensopado de borrego no almoço... que saudade já tenho! Recomendo a todos os brasileiros.",
    author: "Fernanda e Marcos Ribeiro",
    meta: "São Paulo \u2022 Rota Clássica (Alentejo)",
    rating: 5,
  },
];

const faqs = [
  {
    q: "O transporte está incluído?",
    a: "Sim. Fazemos recolha no seu hotel, alojamento local ou num ponto central da cidade. No Porto: Avenida dos Aliados ou hotel. Em Lisboa: Praça do Comércio ou hotel. Carrinhas Mercedes com ar condicionado, wifi e água.",
  },
  {
    q: "Posso ir com criancas?",
    a: "Claro! A Rota Familiar foi desenhada para famílias com crianças de todas as idades. Temos cadeirinhas na carrinha, sumos de uva naturais, bolachas e atividades para os mais pequenos. Nas outras rotas, consulte-nos.",
  },
  {
    q: "É preciso perceber de vinhos para participar?",
    a: "De maneira nenhuma! Os nossos guias adaptam a linguagem a cada grupo. Explicamos tudo de forma simples, sem jargão. O objetivo é sempre divertir e dar prazer -- não examinar.",
  },
  {
    q: "Qual é a política de cancelamento?",
    a: "Cancelamento gratuito até 48 horas antes. Entre 24 e 48 horas, reembolsamos 50%. Com menos de 24 horas, pode remarcar para outra data. Em caso de mau tempo severo, remarcamos sem custo.",
  },
  {
    q: "As rotas funcionam com chuva?",
    a: "Sim! O enoturismo é maioritariamente em ambientes interiores (adegas, salas de prova, restaurantes). Apenas a Rota Aventura pode ser reagendada em caso de chuva intensa.",
  },
  {
    q: "Quantas pessoas cabem em cada grupo?",
    a: "As nossas carrinhas levam até 8 pessoas. Para grupos maiores, utilizamos autocarros ou múltiplas carrinhas. Grupos de 2 a 60 pessoas são bem-vindos. Tours privados a partir de 2 pessoas.",
  },
  {
    q: "As rotas são acessíveis a pessoas com mobilidade reduzida?",
    a: "Trabalhamos para tornar as experiências acessíveis a todos. Temos quintas parceiras com acessos adaptados e carrinhas com espaço para cadeira de rodas dobrável. Informe-nos ao reservar.",
  },
  {
    q: "Aceitam restrições alimentares?",
    a: "Sim. Vegetarianos, veganos, celíacos, intolerantes a lactose -- todos os restaurantes parceiros estão preparados. Opções halal e kosher mediante aviso prévio. Basta informar ao reservar.",
  },
];

const pricingData = [
  { name: "Rota Familiar", duration: "4-5h", meals: "Lanche", wineries: 1, tastings: "3-4", price: "\u20AC65/adulto" },
  { name: "Rota Clássica", duration: "8-9h", meals: "Almoço", wineries: 2, tastings: "8-10", price: "\u20AC135/pp" },
  { name: "Rota Premium", duration: "2 dias", meals: "Jantar + Almoço", wineries: 3, tastings: "15-20", price: "\u20AC395/pp" },
  { name: "Rota dos Sabores", duration: "7-8h", meals: "Almoço harmonizado", wineries: 1, tastings: "4-5", price: "\u20AC155/pp" },
  { name: "Rota Aventura", duration: "7-8h", meals: "Piquenique", wineries: 1, tastings: "4-5", price: "\u20AC95/pp" },
];

const floatingEmojis: { emoji: string; top: string; left?: string; right?: string; delay: number }[] = [
  { emoji: "\u{1F347}", top: "18%", left: "8%", delay: 0 },
  { emoji: "\u{1F377}", top: "30%", right: "6%", delay: 0.5 },
  { emoji: "\u{1F33F}", top: "60%", left: "5%", delay: 1 },
  { emoji: "\u{1F31E}", top: "70%", right: "10%", delay: 1.5 },
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
          {open ? "\u2212" : "+"}
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

function RegionCard({
  region,
  index,
}: {
  region: (typeof regions)[0];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
      className={`${region.grad} rounded-3xl p-8 text-white flex flex-col justify-between min-h-[260px] w-[85vw] max-w-[340px] md:w-[300px] cursor-pointer`}
      onClick={() => setExpanded(!expanded)}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setExpanded(!expanded);
        }
      }}
    >
      <span className="text-5xl mb-4 block">{region.emoji}</span>
      <div>
        <h3 className="text-2xl font-extrabold mb-1">{region.name}</h3>
        <p className="text-white/80 text-sm mb-3">{region.tagline}</p>
        <span className="text-sm font-bold opacity-90">
          {expanded ? "Fechar \u2191" : "Saber mais \u2193"}
        </span>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <ul className="rota-region-details">
                <li>
                  <strong>Castas:</strong> {region.grape}
                </li>
                <li>
                  <strong>Melhor época:</strong> {region.bestTime}
                </li>
                <li>
                  <strong>Destaque:</strong> {region.unique}
                </li>
                <li>
                  <strong>Quintas:</strong> {region.quintas}
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─── Page ─── */

export default function RotaDosVinhosPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ════════ NAV ════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-5 h-16">
          <a href="#" className="text-xl font-extrabold text-blue-600">
            Rota dos Vinhos
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
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
                {navLinks.map((link) => (
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
        {/* Background image */}
        <div className="rota-hero-bg" aria-hidden="true">
          <img
            src="/wine-images/rota-hero.jpg"
            alt=""
            loading="eager"
          />
        </div>
        <div className="rota-hero-overlay" aria-hidden="true" />

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
            Rotas guiadas pelas melhores regiões vinícolas portuguesas.
            Para famílias, casais, amigos e grupos.
          </p>

          {/* Pill badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              "\u{1F377} 6 Regiões",
              "\u{1F690} Transporte incluído",
              "\u{1F468}\u200D\u{1F373} Almoço regional",
              "\u{1F4F8} Guia-sommelier",
            ].map((badge) => (
              <span key={badge} className="rota-badge">
                {badge}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <a
              href="#experiencias"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-4 rounded-full transition-colors min-h-[52px] shadow-lg shadow-blue-600/25"
            >
              Ver Tours →
            </a>
            <a
              href="https://wa.me/351934035971"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-4 rounded-full transition-colors min-h-[52px] shadow-lg shadow-green-600/25"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>

          {/* Stats */}
          <div className="rota-stats">
            <div className="rota-stat">
              <span className="rota-stat-number">3000+</span>
              <span className="rota-stat-label">Visitantes/ano</span>
            </div>
            <div className="rota-stat">
              <span className="rota-stat-number">6</span>
              <span className="rota-stat-label">Regiões</span>
            </div>
            <div className="rota-stat">
              <span className="rota-stat-number">98%</span>
              <span className="rota-stat-label">Recomendam</span>
            </div>
            <div className="rota-stat">
              <span className="rota-stat-number">2018</span>
              <span className="rota-stat-label">Desde</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ════════ REGIOES ════════ */}
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
            Toque num cartão para descobrir castas, quintas e a melhor época para visitar
          </motion.p>
        </div>

        <div className="rota-snap-x rota-hide-scrollbar pl-5 md:pl-[max(1.25rem,calc((100%-72rem)/2+1.25rem))]">
          {regions.map((r, i) => (
            <RegionCard key={r.name} region={r} index={i} />
          ))}
        </div>
      </section>

      {/* ════════ PHOTO GALLERY ════════ */}
      <section id="galeria" className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-5">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-3"
          >
            Galeria
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="text-slate-500 text-center mb-8 max-w-md mx-auto"
          >
            Momentos reais das nossas rotas
          </motion.p>
        </div>

        <div className="rota-gallery-scroll pl-5 md:pl-[max(1.25rem,calc((100%-72rem)/2+1.25rem))]">
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="rota-gallery-item"
            >
              <img
                src={item.src}
                alt={item.caption}
                loading="lazy"
              />
              <div className="rota-gallery-caption">{item.caption}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════ COMO FUNCIONA ════════ */}
      <section className="py-16">
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
                <p className="text-slate-500 text-sm max-w-[260px]">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ EXPERIENCIAS / TOURS ════════ */}
      <section id="experiencias" className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-5">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-3"
          >
            Tours e Experiências
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="text-slate-500 text-center mb-10 max-w-md mx-auto"
          >
            5 rotas únicas + opções corporativas. Escolha a sua aventura vinícola.
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
                className={`bg-white rounded-2xl p-6 shadow-sm ${exp.border} relative`}
              >
                {exp.popular && (
                  <span className="rota-popular-badge absolute top-4 right-4">
                    Mais Popular
                  </span>
                )}
                <div className="mb-2">
                  <h3 className="font-extrabold text-slate-900 text-lg">
                    {exp.title}
                  </h3>
                  <p className="text-slate-500 text-sm">{exp.subtitle}</p>
                </div>
                <p className="text-slate-600 text-sm mb-3 leading-relaxed">
                  {exp.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span
                    className={`${exp.priceColor} text-sm font-bold px-3 py-1 rounded-full whitespace-nowrap`}
                  >
                    {exp.price}
                    <span className="font-normal">{exp.unit}</span>
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-4">{exp.familyPrice}</p>
                <a
                  href="https://wa.me/351934035971"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors min-h-[44px]"
                >
                  Reservar →
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ MEET THE GUIDES ════════ */}
      <section id="guias" className="py-16">
        <div className="max-w-5xl mx-auto px-5">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-3"
          >
            Conheça os Nossos Guias
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="text-slate-500 text-center mb-10 max-w-md mx-auto"
          >
            Sommeliers certificados, apaixonados por vinho e por pessoas
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {guides.map((guide, i) => (
              <motion.div
                key={guide.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="rota-guide-card"
              >
                <div
                  className="rota-guide-avatar"
                  style={{ backgroundColor: guide.color }}
                >
                  {guide.initials}
                </div>
                <div className="rota-guide-name">{guide.name}</div>
                <div className="rota-guide-role">{guide.role}</div>
                <p className="rota-guide-bio">{guide.bio}</p>
                <div className="rota-guide-langs">
                  {guide.langs.map((lang) => (
                    <span key={lang} className="rota-guide-lang">
                      {lang}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ TESTIMONIALS ════════ */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-5">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-3"
          >
            O Que Dizem os Nossos Clientes
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="text-slate-500 text-center mb-10 max-w-md mx-auto"
          >
            Mais de 3.000 visitantes felizes e a contar
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.author}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="rota-testimonial-card"
              >
                <div className="rota-stars">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <span key={s}>{"\u2605"}</span>
                  ))}
                </div>
                <p className="rota-testimonial-text">&ldquo;{t.text}&rdquo;</p>
                <div className="rota-testimonial-author">{t.author}</div>
                <div className="rota-testimonial-meta">{t.meta}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ GROUP & PRIVATE ════════ */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-5">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-3"
          >
            Grupos e Eventos Privados
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="text-slate-500 text-center mb-10 max-w-md mx-auto"
          >
            De 2 a 60 pessoas. Tours privados, team buildings e celebrações especiais.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                icon: "\u{1F3E2}",
                title: "Team Building",
                desc: "Workshop de blending em equipa, prova às cegas competitiva, vindima em equipa, pisa de uvas. 10 a 60 pessoas, meio dia ou dia inteiro.",
                price: "Desde \u20AC65/pessoa",
              },
              {
                icon: "\u{1F389}",
                title: "Despedidas de Solteiro/a",
                desc: "Espumante de boas-vindas, prova animada com jogos e desafios, almoço ou jantar de grupo e surpresa para o/a noivo/a.",
                price: "Desde \u20AC89/pessoa (min. 8)",
              },
              {
                icon: "\u{1F382}",
                title: "Aniversários e Celebrações",
                desc: "Aniversários, bodas de ouro, reuniões familiares em quintas vinícolas. Decoração temática e menu personalizado.",
                price: "Orçamento sob consulta",
              },
              {
                icon: "\u{1F464}",
                title: "Tours Privados",
                desc: "Qualquer rota pode ser privada. Guia exclusivo, itinerário à medida, horários flexíveis. Perfeito para casais e pequenos grupos.",
                price: "Desde 2 pessoas",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="rota-group-card"
              >
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <h3 className="font-extrabold text-slate-900 text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                  {item.desc}
                </p>
                <span className="text-sm font-bold text-blue-600">
                  {item.price}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ PRACTICAL INFO ════════ */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-5">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-3"
          >
            Informações Práticas
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="text-slate-500 text-center mb-10 max-w-md mx-auto"
          >
            Tudo o que precisa de saber antes do tour
          </motion.p>

          <img
            src="/wine-images/rota-landscape.jpg"
            alt="Paisagem vinícola portuguesa"
            className="rota-section-image"
            loading="lazy"
          />

          <div className="rota-info-grid">
            {[
              {
                icon: "\u{1F4CD}",
                title: "Pontos de Recolha",
                text: "Porto: Av. dos Aliados ou hotel. Lisboa: Praça do Comércio ou hotel. Braga, Guimarães, Coimbra, Évora: centro da cidade ou hotel.",
              },
              {
                icon: "\u{1F690}",
                title: "Frota",
                text: "Mercedes Vito (8 lugares), Classe V premium (7 lugares, couro), Sprinter (16 lugares). Todas com ar condicionado, wifi e água.",
              },
              {
                icon: "\u{1F455}",
                title: "O Que Vestir",
                text: "Roupa confortável, sapatos fechados. Casaco leve (adegas a 12-15\u00B0C). Chapéu e óculos de sol no verão. Evitar perfumes fortes.",
              },
              {
                icon: "\u{1F476}",
                title: "Famílias com Crianças",
                text: "Cadeirinhas de bebé grátis (Grupo 0+, 1 e 2/3). Sumos de uva, bolachas e atividades para crianças incluídas na Rota Familiar.",
              },
              {
                icon: "\u267F",
                title: "Acessibilidade",
                text: "Quintas com acessos adaptados, carrinhas com espaço para cadeira de rodas, percursos em piso regular. Provas adaptadas para deficiência visual.",
              },
              {
                icon: "\u{1F4B3}",
                title: "Pagamentos",
                text: "Multibanco, MBWay, cartão (Visa/Mastercard), transferência, PayPal. Pagamento na reserva ou no dia. Cancelamento grátis até 48h antes.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="rota-info-item"
              >
                <div className="rota-info-icon">{item.icon}</div>
                <h3 className="rota-info-title">{item.title}</h3>
                <p className="rota-info-text">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ FAQ ════════ */}
      <section id="faq" className="py-16">
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

      {/* ════════ PRICING TABLE ════════ */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-5">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-3"
          >
            Comparar Rotas
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="text-slate-500 text-center mb-10 max-w-md mx-auto"
          >
            Encontre o tour perfeito para si
          </motion.p>

          {/* Desktop table */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="hidden md:block"
          >
            <table className="rota-pricing-table">
              <thead>
                <tr>
                  <th>Rota</th>
                  <th>Duração</th>
                  <th>Refeições</th>
                  <th>Quintas</th>
                  <th>Provas</th>
                  <th>Preço</th>
                </tr>
              </thead>
              <tbody>
                {pricingData.map((row) => (
                  <tr key={row.name}>
                    <td className="font-bold text-slate-900">{row.name}</td>
                    <td>{row.duration}</td>
                    <td>{row.meals}</td>
                    <td>{row.wineries}</td>
                    <td>{row.tastings}</td>
                    <td className="font-bold text-blue-600">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Mobile cards */}
          <div className="md:hidden flex flex-col gap-4">
            {pricingData.map((row, i) => (
              <motion.div
                key={row.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className={`rota-pricing-card ${row.name === "Rota Clássica" ? "rota-pricing-card-popular" : ""}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-extrabold text-slate-900">{row.name}</h3>
                  <span className="font-bold text-blue-600 text-lg">{row.price}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-slate-400 text-xs">Duração</span>
                    <p className="text-slate-700 font-medium">{row.duration}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs">Refeições</span>
                    <p className="text-slate-700 font-medium">{row.meals}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs">Quintas</span>
                    <p className="text-slate-700 font-medium">{row.wineries}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs">Provas</span>
                    <p className="text-slate-700 font-medium">{row.tastings}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ CTA / RESERVAR ════════ */}
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
            Reserve o seu tour e descubra o melhor dos vinhos portugueses.
            Resposta em menos de 2 horas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <a
              href="https://wa.me/351934035971"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-white text-blue-700 font-bold text-lg px-8 py-4 rounded-full hover:bg-blue-50 transition-colors min-h-[52px] shadow-lg"
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
            <a
              href="mailto:reservas@rotadosvinhos.pt"
              className="inline-flex items-center justify-center gap-2 bg-blue-500/30 text-white font-bold text-lg px-8 py-4 rounded-full hover:bg-blue-500/50 transition-colors min-h-[52px] border border-white/20"
            >
              Enviar E-mail
            </a>
          </div>

          <p className="text-blue-200 text-sm font-medium mb-2">
            Desconto de 10% para grupos de 6+
          </p>
          <p className="text-blue-300 text-xs">
            reservas@rotadosvinhos.pt | +351 934 035 971
          </p>
        </motion.div>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-5xl mx-auto px-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <span className="text-xl font-extrabold text-blue-600">
              Rota dos Vinhos
            </span>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              {navLinks.map((link) => (
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

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              "3000+ visitantes",
              "98% recomendam",
              "Guias certificados WSET",
              "Seguro incluído",
            ].map((badge) => (
              <span
                key={badge}
                className="text-xs bg-slate-100 text-slate-500 px-3 py-1.5 rounded-full font-medium"
              >
                {badge}
              </span>
            ))}
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
              &copy; {new Date().getFullYear()} Rota dos Vinhos. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
