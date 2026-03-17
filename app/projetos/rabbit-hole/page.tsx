"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Eye, BookOpen, FlaskConical, Compass, TreePine, Star, Lock, Mail, Archive, ChevronDown, ExternalLink } from "lucide-react";

/* ═══════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════ */

const SECTIONS = [
  { icon: BookOpen, name: "Library", pages: 11, description: "7 livros publicados, secção restrita, páginas desaparecidas", color: "#c8a97e" },
  { icon: FlaskConical, name: "Laboratory", pages: 10, description: "6 experiências — as últimas 3 mostram anomalias inexplicáveis", color: "#00a651" },
  { icon: Compass, name: "Corridor", pages: 8, description: "Um corredor infinito e cíclico — a sala 01 é indistinguível da 08", color: "#7ea9c8" },
  { icon: ChevronDown, name: "Basement", pages: 8, description: "Descida por 6 níveis de pedra até à câmara mais profunda", color: "#8b5e3c" },
  { icon: TreePine, name: "Garden", pages: 6, description: "Um jardim plantado em 2019 — as plantas contêm algo quase textual", color: "#a0d4a0" },
  { icon: Star, name: "Observatory", pages: 6, description: "Estrelas em posições impossíveis — coordenadas que não existem", color: "#c8a97e" },
  { icon: Lock, name: "Cipher", pages: 5, description: "Mensagens codificadas em ROT13 — o objectivo nunca foi esconder", color: "#d4a0a0" },
  { icon: Mail, name: "Letters", pages: 6, description: "Cartas para ninguém, cartas queimadas, uma resposta de origem desconhecida", color: "#a0b4c8" },
  { icon: Archive, name: "Archive", pages: 10, description: "Ficheiros classificados, recortes de 1947, uma pessoa desaparecida", color: "#c8b8a0" },
  { icon: Eye, name: "Hidden", pages: 5, description: "Páginas secretas para exploradores profundos — o fim é o início", color: "#e8c87e" },
];

const TIMELINE = [
  { year: "1994", event: "Nasce Chen Jiang em Xangai" },
  { year: "2019", event: "Começa a construir o website e planta o jardim" },
  { year: "2020", event: "Observa estrelas em posições impossíveis" },
  { year: "2021", event: "Desaparece. O servidor continua activo." },
  { year: "???", event: "Alguém ainda paga a conta do servidor." },
];

/* ═══════════════════════════════════════════════
   AMBIENT FOG COMPONENT
   ═══════════════════════════════════════════════ */

function AmbientFog() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-[0.04]"
          style={{
            width: `${300 + i * 200}px`,
            height: `${300 + i * 200}px`,
            background: `radial-gradient(circle, ${i % 2 === 0 ? "#c8a97e" : "#7ea9c8"} 0%, transparent 70%)`,
            top: `${15 + i * 20}%`,
            left: `${10 + i * 15}%`,
            animation: `drift${i % 2 === 0 ? "1" : "2"} ${18 + i * 4}s ease-in-out infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes drift1 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(60px, -40px) scale(1.15); } }
        @keyframes drift2 { 0%, 100% { transform: translate(0, 0) scale(1.1); } 50% { transform: translate(-50px, 30px) scale(0.9); } }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   FLICKERING TEXT
   ═══════════════════════════════════════════════ */

function FlickerText({ text, className = "" }: { text: string; className?: string }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.92) {
        setVisible(false);
        setTimeout(() => setVisible(true), 80 + Math.random() * 120);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={className} style={{ opacity: visible ? 1 : 0.15, transition: "opacity 0.05s" }}>
      {text}
    </span>
  );
}

/* ═══════════════════════════════════════════════
   ORB COMPONENT (from original site)
   ═══════════════════════════════════════════════ */

function Orb() {
  return (
    <div className="relative w-32 h-32 mx-auto my-12">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle at 40% 40%, #c8a97e 0%, #5a4a32 40%, #1a1510 70%, transparent 100%)",
          animation: "pulse 4s ease-in-out infinite",
          boxShadow: "0 0 60px 20px rgba(200, 169, 126, 0.15)",
        }}
      />
      <div
        className="absolute inset-4 rounded-full"
        style={{
          background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.15) 0%, transparent 60%)",
        }}
      />
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.08); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   TYPEWRITER HOOK
   ═══════════════════════════════════════════════ */

function useTypewriter(text: string, speed = 45, delay = 1500) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;
    const timeout = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(timeout);
  }, [displayed, started, text, speed]);

  return displayed;
}

/* ═══════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════ */

export default function RabbitHolePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.08], [0, -60]);

  const hiddenMessage = useTypewriter(
    "the corridor has been running since 2019. the server bill is still being paid. nobody knows by whom.",
    35,
    3000
  );

  return (
    <div ref={containerRef} className="relative min-h-screen" style={{ background: "#0a0a0f", color: "#c8a97e" }}>
      <AmbientFog />

      {/* ─── Nav ─── */}
      <nav className="fixed top-0 w-full z-50 px-4 sm:px-8 py-4 flex items-center justify-between" style={{ background: "linear-gradient(180deg, rgba(10,10,15,0.9) 0%, transparent 100%)" }}>
        <Link href="/projetos" className="flex items-center gap-2 text-sm tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity" style={{ color: "#c8a97e" }}>
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>
        <span className="text-xs tracking-[0.3em] uppercase opacity-30 hidden sm:block" style={{ fontFamily: "Georgia, serif" }}>
          Prof. Chen Jiang &middot; 2019&ndash;2021
        </span>
      </nav>

      {/* ═══════════════════════════════════════════════
          1. HERO — The Orb
          ═══════════════════════════════════════════════ */}
      <motion.section
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative min-h-[85svh] md:min-h-screen flex flex-col items-center justify-center px-6 text-center z-10"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 0.5, duration: 2 }}
          className="text-xs tracking-[0.5em] uppercase mb-6"
          style={{ fontFamily: "'Courier New', monospace" }}
        >
          You found something
        </motion.p>

        <Orb />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="text-4xl sm:text-5xl md:text-7xl font-light tracking-tight mb-4"
          style={{ fontFamily: "Georgia, serif", color: "#f5e6c8" }}
        >
          <FlickerText text="The Infinite Corridor" />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 2, duration: 1.5 }}
          className="text-sm sm:text-base tracking-[0.15em] max-w-md mx-auto mb-12"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Uma experiência imersiva de mistério digital.
          <br />
          79 páginas. 11 secções. Segredos escondidos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <a
            href="https://djimiesilva.github.io/rabbit-hole/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-8 py-3 rounded-full border transition-all duration-500 hover:scale-105"
            style={{
              borderColor: "rgba(200, 169, 126, 0.3)",
              background: "rgba(200, 169, 126, 0.05)",
              color: "#c8a97e",
            }}
          >
            <span className="text-sm tracking-[0.2em] uppercase" style={{ fontFamily: "'Courier New', monospace" }}>
              Entrar no Corredor
            </span>
            <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
          </a>
          <span className="text-xs opacity-30 tracking-widest">SCROLL PARA EXPLORAR</span>
        </motion.div>

        {/* Hidden selectable message — homage to original */}
        <p
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] max-w-sm text-center select-text"
          style={{ color: "rgba(200, 169, 126, 0.04)", fontFamily: "'Courier New', monospace" }}
        >
          {hiddenMessage}
        </p>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          2. ABOUT — The Story
          ═══════════════════════════════════════════════ */}
      <section className="relative z-10 px-6 py-24 sm:py-32 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <p
            className="text-xs tracking-[0.4em] uppercase mb-6 opacity-40"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            Case #J-2021-09
          </p>

          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-light mb-8 leading-relaxed"
            style={{ fontFamily: "Georgia, serif", color: "#f5e6c8" }}
          >
            A Prof. Chen Jiang era uma semioticista teórica.
            <br />
            <span className="opacity-50">Em 2021, desapareceu.</span>
          </h2>

          <div className="space-y-6 text-sm sm:text-base leading-relaxed opacity-70" style={{ fontFamily: "Georgia, serif" }}>
            <p>
              Deixou para trás um website — uma rede de 79 páginas sobre corredores,
              significado e recursão. Uma biblioteca com livros que ela escreveu. Um
              laboratório com experiências que desafiam a lógica. Um jardim onde
              as plantas contêm algo que é &ldquo;quase texto&rdquo;.
            </p>
            <p>
              O servidor continua activo. Alguém ainda paga a conta.
              Ninguém sabe quem.
            </p>
            <p className="opacity-50 text-xs" style={{ fontFamily: "'Courier New', monospace" }}>
              &ldquo;Ela nunca desapareceu. Ela chegou. O corredor era o destino.&rdquo;
            </p>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════
          3. TIMELINE
          ═══════════════════════════════════════════════ */}
      <section className="relative z-10 px-6 py-16 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative pl-8 border-l border-[rgba(200,169,126,0.15)]">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="relative mb-8 last:mb-0"
              >
                <div
                  className="absolute -left-[41px] w-3 h-3 rounded-full border-2"
                  style={{
                    borderColor: item.year === "???" ? "#7ea9c8" : "#c8a97e",
                    background: item.year === "???" ? "rgba(126, 169, 200, 0.3)" : "rgba(200, 169, 126, 0.3)",
                  }}
                />
                <span
                  className="text-xs tracking-[0.3em] uppercase block mb-1"
                  style={{
                    fontFamily: "'Courier New', monospace",
                    color: item.year === "???" ? "#7ea9c8" : "#c8a97e",
                    opacity: 0.6,
                  }}
                >
                  {item.year}
                </span>
                <p className="text-sm sm:text-base opacity-70" style={{ fontFamily: "Georgia, serif" }}>
                  {item.event}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════
          4. SECTIONS MAP
          ═══════════════════════════════════════════════ */}
      <section className="relative z-10 px-6 py-24 sm:py-32">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p
              className="text-xs tracking-[0.4em] uppercase mb-4 opacity-40"
              style={{ fontFamily: "'Courier New', monospace" }}
            >
              Mapa da Experiência
            </p>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-light"
              style={{ fontFamily: "Georgia, serif", color: "#f5e6c8" }}
            >
              11 Espaços. 79 Páginas.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SECTIONS.map((section, i) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  className="group relative rounded-2xl p-5 sm:p-6 border transition-all duration-500 hover:border-opacity-40"
                  style={{
                    background: "rgba(200, 169, 126, 0.03)",
                    borderColor: "rgba(200, 169, 126, 0.08)",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity"
                      style={{ background: `${section.color}15` }}
                    >
                      <Icon size={18} style={{ color: section.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3
                          className="text-base sm:text-lg font-light"
                          style={{ fontFamily: "Georgia, serif", color: "#f5e6c8" }}
                        >
                          {section.name}
                        </h3>
                        <span
                          className="text-xs opacity-30"
                          style={{ fontFamily: "'Courier New', monospace" }}
                        >
                          {section.pages}p
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm opacity-50 leading-relaxed" style={{ fontFamily: "Georgia, serif" }}>
                        {section.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Total counter */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-center mt-12"
          >
            <span className="text-xs tracking-[0.3em] uppercase opacity-30" style={{ fontFamily: "'Courier New', monospace" }}>
              + 3 páginas raiz &middot; total: 79 ficheiros HTML
            </span>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          5. THEMES — What this explores
          ═══════════════════════════════════════════════ */}
      <section className="relative z-10 px-6 py-24 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p
            className="text-xs tracking-[0.4em] uppercase mb-6 opacity-40"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            Temas
          </p>

          <div className="space-y-8">
            {[
              {
                title: "Corredores como Espaço Metafísico",
                text: "Um corredor não é uma sala nem uma transição — é um processo transformativo. Seguir um corredor transforma quem o percorre.",
              },
              {
                title: "Recursão",
                text: "Todo o significado, quando seguido até à sua origem, regressa ao procurador. O procurador é o significado.",
              },
              {
                title: "Significado Não-Linear",
                text: "O website força o leitor a navegar, descodificar e reconstruir a verdade — tal como a consciência reconstrói a realidade.",
              },
              {
                title: "Desaparecimento como Chegada",
                text: "O desaparecimento de Jiang é a sua chegada. O corredor era o destino desde o início.",
              },
            ].map((theme, i) => (
              <motion.div
                key={theme.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <h3
                  className="text-lg sm:text-xl font-light mb-2"
                  style={{ fontFamily: "Georgia, serif", color: "#f5e6c8" }}
                >
                  {theme.title}
                </h3>
                <p className="text-sm opacity-50 leading-relaxed" style={{ fontFamily: "Georgia, serif" }}>
                  {theme.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════
          6. TECH SPECS
          ═══════════════════════════════════════════════ */}
      <section className="relative z-10 px-6 py-16 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl p-6 sm:p-8 border"
          style={{
            background: "rgba(200, 169, 126, 0.02)",
            borderColor: "rgba(200, 169, 126, 0.08)",
          }}
        >
          <p
            className="text-xs tracking-[0.4em] uppercase mb-6 opacity-40"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            Especificações Técnicas
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {[
              { label: "Ficheiros", value: "79 HTML" },
              { label: "Secções", value: "11" },
              { label: "Framework", value: "Nenhum" },
              { label: "Backend", value: "Nenhum" },
              { label: "Estado", value: "localStorage" },
              { label: "Deploy", value: "GitHub Pages" },
            ].map((spec) => (
              <div key={spec.label}>
                <p className="text-xs opacity-30 mb-1" style={{ fontFamily: "'Courier New', monospace" }}>
                  {spec.label}
                </p>
                <p className="text-sm" style={{ fontFamily: "Georgia, serif", color: "#f5e6c8" }}>
                  {spec.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t" style={{ borderColor: "rgba(200, 169, 126, 0.08)" }}>
            <p className="text-xs opacity-40 leading-relaxed" style={{ fontFamily: "'Courier New', monospace" }}>
              100% HTML estático, CSS inline, JavaScript vanilla mínimo.
              Efeitos de nevoeiro, perspectiva 3D SVG, orbs pulsantes,
              texturas de pedra e papel. Zero dependências externas.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════
          7. CTA — Enter
          ═══════════════════════════════════════════════ */}
      <section className="relative z-10 px-6 py-24 sm:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <Orb />

          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-light mb-4"
            style={{ fontFamily: "Georgia, serif", color: "#f5e6c8" }}
          >
            Pronto para entrar?
          </h2>

          <p className="text-sm opacity-50 mb-8 max-w-md mx-auto" style={{ fontFamily: "Georgia, serif" }}>
            O corredor está à sua espera.
            <br />
            A questão não é se vai encontrar algo.
            <br />
            <span className="opacity-60">A questão é se algo o vai encontrar a si.</span>
          </p>

          <a
            href="https://djimiesilva.github.io/rabbit-hole/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-10 py-4 rounded-full border transition-all duration-700 hover:scale-105"
            style={{
              borderColor: "rgba(200, 169, 126, 0.4)",
              background: "rgba(200, 169, 126, 0.08)",
              color: "#f5e6c8",
            }}
          >
            <span className="text-sm tracking-[0.25em] uppercase" style={{ fontFamily: "'Courier New', monospace" }}>
              Entrar no Corredor
            </span>
            <ExternalLink className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
          </a>
        </motion.div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="relative z-10 px-6 py-12 text-center border-t" style={{ borderColor: "rgba(200, 169, 126, 0.06)" }}>
        <p className="text-xs opacity-20 mb-2" style={{ fontFamily: "'Courier New', monospace" }}>
          Construído por{" "}
          <Link href="/" className="underline hover:opacity-60 transition-opacity">
            Descomplicai
          </Link>
        </p>
        <p className="text-[10px] opacity-10" style={{ fontFamily: "'Courier New', monospace" }}>
          &ldquo;A corridor without terminus is not a corridor at all — it is a philosophy.&rdquo;
        </p>
      </footer>
    </div>
  );
}
