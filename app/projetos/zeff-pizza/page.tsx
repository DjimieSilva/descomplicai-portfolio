"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

/* ─────────────────── DATA ─────────────────── */

const CONCEPTS = [
  {
    id: "A",
    name: "Pirate Tavern",
    tagline: "O espírito rebelde do porto de Figueira",
    description:
      "Uma identidade visual que evoca as tascas marítimas do século XVIII. Madeiras escuras, brasas, o cheiro a mar e a pimenta. Design sombrio e imersivo para uma pizzaria com personalidade forte — para quem quer que a experiência comece antes de entrar.",
    palette: ["#0D1117", "#D4652A", "#F0E6D3", "#8B0000"],
    paletteNames: ["Obsidian", "Ember", "Parchment", "Blood"],
    gradientFrom: "#0D1117",
    gradientTo: "#8B0000",
    gradientVia: "#D4652A",
    typography: "Cinzel + Crimson Text",
    typographyNote: "Serifado clássico com peso histórico",
    mood: ["Dark", "Bold", "Histórico", "Imersivo"],
    highlight: "Fundo escuro como carvão, detalhes a brasa — comunica exclusividade e atitude.",
  },
  {
    id: "B",
    name: "Figueira Sun",
    tagline: "A luz e o calor da costa atlântica",
    description:
      "Inspirado nas cores da Figueira da Foz — areia branca, céu atlântico, o laranja do sol no horizonte. Vibração mediterrânica com energia de praia. Para atrair turistas e locais que querem uma experiência alegre, aberta e com sabor a verão.",
    palette: ["#FFF9F0", "#D4652A", "#1B6B93", "#E8A946"],
    paletteNames: ["Areia", "Laranja Sol", "Atlântico", "Ouro"],
    gradientFrom: "#1B6B93",
    gradientTo: "#E8A946",
    gradientVia: "#D4652A",
    typography: "Nunito + Lato",
    typographyNote: "Sans-serif arredondado, amigável e acessível",
    mood: ["Vibrante", "Solar", "Acolhedor", "Atlântico"],
    highlight: "Fundo creme-areia com acentos azul-oceano — fresco, convidativo, único na zona.",
  },
  {
    id: "C",
    name: "Roman Artisan",
    tagline: "A tradição romana com artesanato moderno",
    description:
      "O conceito mais limpo e premium. Inspirado nas pizzerias artesanais de Roma — massas de longa fermentação, ingredientes simples e perfeitos, apresentação minimalista. Design editorial, espaço branco, tipografia refinada para um posicionamento de qualidade.",
    palette: ["#FAFAF7", "#8B7355", "#6B6B6B", "#E5E0D8"],
    paletteNames: ["Off-white", "Terra", "Grafite", "Linho"],
    gradientFrom: "#FAFAF7",
    gradientTo: "#E5E0D8",
    gradientVia: "#8B7355",
    typography: "Playfair Display + Source Sans",
    typographyNote: "Contraste serifado-sans para elegância editorial",
    mood: ["Minimalista", "Premium", "Artesanal", "Editorial"],
    highlight: "Brancos sujos e terras naturais — comunica qualidade sem precisar de gritar.",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Pesquisa & Briefing",
    description:
      "Conversámos com o Amir sobre a sua visão, o público-alvo e o posicionamento desejado. Analisámos a concorrência local e as melhores pizzerias do país.",
  },
  {
    step: "02",
    title: "3 Conceitos Distintos",
    description:
      "Desenvolvemos três direções criativas completamente diferentes — cada uma com paleta, tipografia, tom de voz e layout próprios. Sem meio-termos.",
  },
  {
    step: "03",
    title: "Cliente Escolhe",
    description:
      "O Amir vê os três conceitos em detalhe e escolhe o que melhor representa a Zeff Pizza. A partir daí, desenvolvemos o site completo nessa direção.",
  },
];

/* ─────────────────── SUB-COMPONENTS ─────────────────── */

function ColorSwatch({ color, name }: { color: string; name: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="w-10 h-10 rounded-full shadow-inner border border-white/20"
        style={{ backgroundColor: color }}
      />
      <span className="text-[10px] font-mono opacity-60">{name}</span>
    </div>
  );
}

function ConceptCard({ concept, index }: { concept: (typeof CONCEPTS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const isDark = concept.id === "A";
  const isLight = concept.id === "C";
  const textColor = isDark ? "text-white" : isLight ? "text-slate-800" : "text-white";
  const subTextColor = isDark ? "text-white/60" : isLight ? "text-slate-500" : "text-white/70";
  const tagBg = isDark ? "bg-white/10 text-white/80" : isLight ? "bg-slate-100 text-slate-600" : "bg-white/20 text-white/90";
  const dividerColor = isDark ? "bg-white/20" : isLight ? "bg-slate-200" : "bg-white/30";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="rounded-3xl overflow-hidden shadow-xl"
      style={{
        background: `linear-gradient(135deg, ${concept.gradientFrom}, ${concept.gradientVia}, ${concept.gradientTo})`,
      }}
    >
      {/* Card Header */}
      <div className="p-8 sm:p-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <span className={`text-xs font-mono font-bold tracking-widest uppercase ${subTextColor} mb-2 block`}>
              Conceito {concept.id}
            </span>
            <h3 className={`text-3xl sm:text-4xl font-bold tracking-tight ${textColor}`}>
              {concept.name}
            </h3>
            <p className={`mt-1.5 text-sm ${subTextColor}`}>{concept.tagline}</p>
          </div>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${tagBg}`}>
            {concept.id === "A" ? "⚓" : concept.id === "B" ? "☀️" : "🏛️"}
          </div>
        </div>

        {/* Palette */}
        <div className="flex items-center gap-6 mb-8">
          {concept.palette.map((color, i) => (
            <ColorSwatch key={color} color={color} name={concept.paletteNames[i]} />
          ))}
        </div>

        {/* Description */}
        <p className={`text-base leading-relaxed ${subTextColor} mb-6 max-w-2xl`}>
          {concept.description}
        </p>

        <div className={`h-px ${dividerColor} mb-6`} />

        {/* Typography + Mood row */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <span className={`text-[10px] font-mono uppercase tracking-widest ${subTextColor} block mb-1.5`}>
              Tipografia
            </span>
            <p className={`font-semibold ${textColor}`}>{concept.typography}</p>
            <p className={`text-sm ${subTextColor}`}>{concept.typographyNote}</p>
          </div>
          <div>
            <span className={`text-[10px] font-mono uppercase tracking-widest ${subTextColor} block mb-1.5`}>
              Mood
            </span>
            <div className="flex flex-wrap gap-2">
              {concept.mood.map((tag) => (
                <span key={tag} className={`text-xs px-2.5 py-1 rounded-full ${tagBg}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer — highlight */}
      <div
        className={`px-8 sm:px-10 py-5 border-t ${dividerColor}`}
        style={{ backgroundColor: isDark ? "rgba(0,0,0,0.3)" : isLight ? "rgba(0,0,0,0.04)" : "rgba(0,0,0,0.15)" }}
      >
        <p className={`text-sm italic ${subTextColor}`}>
          {concept.highlight}
        </p>
      </div>
    </motion.div>
  );
}

/* ─────────────────── PAGE ─────────────────── */

export default function ZeffPizzaPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const processInView = useInView(processRef, { once: true, margin: "-80px" });

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      {/* ─── NAV ─── */}
      <nav className="fixed top-0 w-full z-40 bg-black/60 backdrop-blur-md border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg text-white/90 hover:text-white transition-colors">
            descomplicai
          </Link>
          <Link
            href="/projetos"
            className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Projetos
          </Link>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,101,42,0.18) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="text-6xl sm:text-7xl mb-6">🍕</div>
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-orange-400/80 mb-4">
              Portfolio · Restauração
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-4">
              Zeff Pizza
            </h1>
            <p className="text-lg sm:text-xl text-white/50 font-light">
              3 Conceitos · 1 Pizzaria · Figueira da Foz
            </p>
          </motion.div>

          {/* Client info bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-14 mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 sm:p-8"
          >
            <p className="text-xs font-mono uppercase tracking-widest text-orange-400/70 mb-4">
              Sobre o Cliente
            </p>
            <div className="grid sm:grid-cols-3 gap-6 text-sm">
              <div>
                <span className="text-white/40 block text-[11px] uppercase tracking-wider mb-1">Proprietário</span>
                <span className="text-white/90 font-medium">Amir Soliman</span>
              </div>
              <div>
                <span className="text-white/40 block text-[11px] uppercase tracking-wider mb-1">Morada</span>
                <span className="text-white/90 font-medium">Rua Poeta Acácio Antunes 1/A</span>
              </div>
              <div>
                <span className="text-white/40 block text-[11px] uppercase tracking-wider mb-1">Especialidade</span>
                <span className="text-white/90 font-medium">Pizzas romanas artesanais</span>
              </div>
            </div>
            <div className="mt-5 pt-5 border-t border-white/10">
              <p className="text-white/50 text-sm leading-relaxed">
                A Zeff Pizza chegou a Figueira da Foz com uma proposta diferente: massas de longa fermentação, ingredientes cuidados e o método romano de pizza em bandeja. O desafio foi criar uma identidade digital que refletisse essa qualidade artesanal.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── CONCEPTS INTRO ─── */}
      <section className="px-6 pb-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-orange-400/70 mb-3">
            A Abordagem
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Um cliente. Três propostas.
          </h2>
          <p className="text-white/50 max-w-xl mx-auto leading-relaxed">
            Em vez de um único caminho, apresentámos três direções criativas completamente distintas. Paletas diferentes, tipografias diferentes, histórias diferentes — para que o Amir escolha com convicção.
          </p>
        </motion.div>

        {/* Concept Cards Stack */}
        <div className="flex flex-col gap-8">
          {CONCEPTS.map((concept, i) => (
            <ConceptCard key={concept.id} concept={concept} index={i} />
          ))}
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section ref={processRef} className="px-6 py-24 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={processInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-orange-400/70 mb-3">
            Metodologia
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">Como Fizemos</h2>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6">
          {PROCESS_STEPS.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              animate={processInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-7 hover:bg-white/8 transition-colors"
            >
              <span className="text-4xl font-black text-orange-500/30 block mb-4 font-mono">
                {s.step}
              </span>
              <h3 className="font-bold text-lg mb-2 text-white/90">{s.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={processInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-7 flex flex-col sm:flex-row items-start sm:items-center gap-5"
        >
          <div className="text-3xl">💡</div>
          <div>
            <p className="font-semibold text-white/90 mb-1">
              Porquê 3 conceitos?
            </p>
            <p className="text-sm text-white/50 leading-relaxed">
              Oferecer apenas um caminho é apostar que adivinhamos o que o cliente quer. Três conceitos eliminam o ruído — o cliente vê opções reais, reage visualmente e escolhe com a barriga. O resultado final é sempre mais fiel à visão do negócio.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="px-6 py-10 border-t border-white/10 text-center">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/projetos"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Ver todos os projetos
          </Link>
          <p className="text-xs text-white/25">
            &copy; 2026 Descomplicai — Figueira da Foz
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-1.5 text-sm text-orange-400 hover:text-orange-300 transition-colors font-medium"
          >
            Quero um site assim
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </footer>
    </main>
  );
}
