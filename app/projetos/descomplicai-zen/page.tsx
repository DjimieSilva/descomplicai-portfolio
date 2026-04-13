"use client";

import { Crimson_Pro, Noto_Sans } from "next/font/google";
import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

// ─── PALETTE ────────────────────────────────────────────────────────────────

const C = {
  paper: "#F6F4F0",
  ink: "#1A1A1A",
  charcoal: "#2C2C2C",
  red: "#C41E3A",
  beige: "#D4C5A9",
  stone: "#8B8680",
  cream: "#FAF8F4",
  lightBeige: "#EDE8DF",
};

// ─── CONSTANTS ──────────────────────────────────────────────────────────────

const PHILOSOPHY = [
  {
    kanji: "間",
    romaji: "ma",
    meaning: "espaço",
    desc: "O espaço entre as coisas não é vazio — é respiração. Nos nossos websites, cada elemento tem espaço para existir.",
  },
  {
    kanji: "侘寂",
    romaji: "wabi-sabi",
    meaning: "imperfeição",
    desc: "A beleza no imperfeito, no transitório. Design que não pretende ser perfeito, apenas verdadeiro e humano.",
  },
  {
    kanji: "道",
    romaji: "dō",
    meaning: "caminho",
    desc: "O processo é tão valioso quanto o destino. Trabalhamos contigo em cada passo, com atenção e intenção.",
  },
];

const PROJECTS = [
  {
    title: "Clínica Vasco da Gama",
    category: "Saúde",
    desc: "Presença digital que transmite confiança e excelência médica.",
    year: "2024",
  },
  {
    title: "Ondas Academy",
    category: "Desporto",
    desc: "A escola de surf que encontra o seu ritmo no design como na água.",
    year: "2024",
  },
  {
    title: "Ribeiro Santo",
    category: "Enoturismo",
    desc: "Vinhos com história. Um site que honra a tradição da Quinta.",
    year: "2024",
  },
];

const BLOG_POSTS = [
  { date: "12 Abr 2025", title: "A arte do design lento num mundo de scroll infinito" },
  { date: "28 Mar 2025", title: "Porque os melhores websites parecem invisíveis" },
  { date: "14 Mar 2025", title: "IA como ferramenta de escuta, não apenas de produção" },
];

// ─── COMPONENT ──────────────────────────────────────────────────────────────

export default function DescomplicaiZen() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);

  return (
    <div
      style={{
        background: C.paper,
        color: C.ink,
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* ── NAV ── */}
      <nav
        style={{
          borderBottom: `1px solid ${C.beige}`,
          position: "sticky",
          top: 0,
          background: C.paper,
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 48px",
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo — lowercase serif */}
          <a
            href="/"
            className={crimsonPro.className}
            style={{
              fontSize: 22,
              fontWeight: 400,
              fontStyle: "italic",
              letterSpacing: "0.02em",
              textDecoration: "none",
              color: C.ink,
            }}
          >
            descomplicai
          </a>

          {/* Desktop nav */}
          <div
            className="hidden md:flex"
            style={{ gap: 40, alignItems: "center" }}
          >
            {["Serviços", "Projetos", "Escritos", "Contacto"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className={notoSans.className}
                style={{
                  fontSize: 11,
                  fontWeight: 400,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  textDecoration: "none",
                  color: C.stone,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = C.ink)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = C.stone)}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: C.ink,
              padding: 4,
            }}
            aria-label="Menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {menuOpen && (
          <div
            style={{
              borderTop: `1px solid ${C.beige}`,
              padding: "20px 48px",
              display: "flex",
              flexDirection: "column",
              gap: 20,
              background: C.paper,
            }}
          >
            {["Serviços", "Projetos", "Escritos", "Contacto"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className={notoSans.className}
                style={{
                  fontSize: 11,
                  fontWeight: 400,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  textDecoration: "none",
                  color: C.stone,
                  paddingBottom: 12,
                  borderBottom: `1px solid ${C.lightBeige}`,
                }}
              >
                {link}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section
        style={{
          padding: "140px 48px 120px",
          borderBottom: `1px solid ${C.beige}`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative kanji background */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            right: "-40px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "clamp(180px, 25vw, 320px)",
            color: C.lightBeige,
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
          }}
          className={crimsonPro.className}
        >
          静
        </div>

        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Small label */}
          <p
            className={notoSans.className}
            style={{
              fontSize: 11,
              fontWeight: 400,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: C.stone,
              marginBottom: 48,
            }}
          >
            Tecnologia · Intenção · Portugal
          </p>

          {/* Main headline */}
          <h1
            className={crimsonPro.className}
            style={{
              fontSize: "clamp(52px, 8vw, 108px)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              maxWidth: 700,
              marginBottom: 56,
            }}
          >
            Simplicidade{" "}
            <em
              style={{
                fontStyle: "italic",
                color: C.red,
                fontWeight: 300,
              }}
            >
              como prática.
            </em>
          </h1>

          {/* Description */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              alignItems: "start",
            }}
            className="grid-cols-1 md:grid-cols-2"
          >
            <p
              className={notoSans.className}
              style={{
                fontSize: 17,
                fontWeight: 300,
                lineHeight: 1.9,
                color: C.charcoal,
                maxWidth: 480,
              }}
            >
              Construímos a presença digital de negócios com atenção
              e intenção. Cada projeto recebe o tempo que merece —
              nem mais, nem menos.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20, paddingTop: 4 }}>
              <a
                href="#contacto"
                className={notoSans.className}
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  textDecoration: "none",
                  color: C.ink,
                  borderBottom: `1px solid ${C.ink}`,
                  paddingBottom: 4,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  width: "fit-content",
                  transition: "color 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = C.red;
                  (e.currentTarget as HTMLElement).style.borderColor = C.red;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = C.ink;
                  (e.currentTarget as HTMLElement).style.borderColor = C.ink;
                }}
              >
                Iniciar conversa <ArrowRight size={14} />
              </a>
              <a
                href="#projetos"
                className={notoSans.className}
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  textDecoration: "none",
                  color: C.stone,
                  borderBottom: `1px solid ${C.beige}`,
                  paddingBottom: 4,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  width: "fit-content",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = C.ink)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = C.stone)}
              >
                Ver projetos
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY STRIP ── */}
      <section
        style={{
          background: C.lightBeige,
          borderBottom: `1px solid ${C.beige}`,
          padding: "80px 48px",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p
            className={notoSans.className}
            style={{
              fontSize: 11,
              fontWeight: 400,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: C.stone,
              marginBottom: 56,
            }}
          >
            Filosofia
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 0,
              borderTop: `1px solid ${C.beige}`,
            }}
            className="grid-cols-1 md:grid-cols-3"
          >
            {PHILOSOPHY.map((item, i) => (
              <div
                key={item.kanji}
                style={{
                  padding: "48px 40px",
                  borderRight: i < 2 ? `1px solid ${C.beige}` : "none",
                  borderBottom: `1px solid ${C.beige}`,
                }}
              >
                {/* Kanji */}
                <div
                  className={crimsonPro.className}
                  style={{
                    fontSize: 64,
                    fontWeight: 300,
                    lineHeight: 1,
                    color: C.red,
                    marginBottom: 8,
                  }}
                >
                  {item.kanji}
                </div>

                {/* Romaji + meaning */}
                <div style={{ display: "flex", gap: 12, alignItems: "baseline", marginBottom: 20 }}>
                  <span
                    className={notoSans.className}
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      color: C.stone,
                    }}
                  >
                    {item.romaji}
                  </span>
                  <span
                    className={crimsonPro.className}
                    style={{
                      fontSize: 14,
                      fontStyle: "italic",
                      color: C.stone,
                    }}
                  >
                    — {item.meaning}
                  </span>
                </div>

                {/* Description */}
                <p
                  className={notoSans.className}
                  style={{
                    fontSize: 14,
                    fontWeight: 300,
                    lineHeight: 1.8,
                    color: C.charcoal,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section
        id="servicos"
        style={{
          padding: "120px 48px",
          borderBottom: `1px solid ${C.beige}`,
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "200px 1fr",
              gap: 80,
              marginBottom: 80,
            }}
          >
            <p
              className={notoSans.className}
              style={{
                fontSize: 11,
                fontWeight: 400,
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: C.stone,
                paddingTop: 8,
              }}
            >
              O que fazemos
            </p>
            <h2
              className={crimsonPro.className}
              style={{
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 300,
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
              }}
            >
              Construímos com o que é necessário —{" "}
              <em style={{ color: C.red }}>nada mais.</em>
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { label: "Websites & Aplicações", desc: "Design com intenção. Código que respeita o visitante." },
              { label: "Inteligência Artificial", desc: "Automação que liberta tempo para o que realmente importa." },
              { label: "E-commerce", desc: "Lojas pensadas para a experiência humana da compra." },
              { label: "Conteúdo & Estratégia", desc: "Palavras com propósito. Mensagens que chegam onde devem." },
            ].map((svc, i) => (
              <div
                key={svc.label}
                style={{
                  borderTop: i === 0 ? `1px solid ${C.beige}` : "none",
                  borderBottom: `1px solid ${C.beige}`,
                  padding: "36px 0",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 80,
                  alignItems: "center",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = C.cream)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
              >
                <h3
                  className={crimsonPro.className}
                  style={{
                    fontSize: 24,
                    fontWeight: 400,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {svc.label}
                </h3>
                <p
                  className={notoSans.className}
                  style={{
                    fontSize: 14,
                    fontWeight: 300,
                    color: C.stone,
                    lineHeight: 1.7,
                  }}
                >
                  {svc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section
        id="projetos"
        style={{
          padding: "120px 48px",
          background: C.cream,
          borderBottom: `1px solid ${C.beige}`,
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p
            className={notoSans.className}
            style={{
              fontSize: 11,
              fontWeight: 400,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: C.stone,
              marginBottom: 80,
            }}
          >
            Projetos
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 32,
            }}
            className="grid-cols-1 md:grid-cols-3"
          >
            {PROJECTS.map((proj, i) => (
              <div
                key={proj.title}
                onMouseEnter={() => setHoveredProject(i)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{
                  border: `1px solid ${hoveredProject === i ? C.beige : "transparent"}`,
                  padding: 32,
                  transition: "border-color 0.3s, background 0.3s",
                  background: hoveredProject === i ? C.paper : "transparent",
                }}
              >
                {/* Year */}
                <p
                  className={notoSans.className}
                  style={{
                    fontSize: 11,
                    fontWeight: 400,
                    letterSpacing: "0.1em",
                    color: C.stone,
                    marginBottom: 24,
                  }}
                >
                  {proj.year}
                </p>

                {/* Category */}
                <p
                  className={notoSans.className}
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: C.red,
                    marginBottom: 12,
                  }}
                >
                  {proj.category}
                </p>

                {/* Title */}
                <h3
                  className={crimsonPro.className}
                  style={{
                    fontSize: 24,
                    fontWeight: 400,
                    lineHeight: 1.2,
                    marginBottom: 16,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {proj.title}
                </h3>

                {/* Description */}
                <p
                  className={notoSans.className}
                  style={{
                    fontSize: 13,
                    fontWeight: 300,
                    color: C.stone,
                    lineHeight: 1.8,
                    marginBottom: 24,
                  }}
                >
                  {proj.desc}
                </p>

                {/* Link */}
                <a
                  href="#"
                  className={notoSans.className}
                  style={{
                    fontSize: 11,
                    fontWeight: 400,
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    textDecoration: "none",
                    color: hoveredProject === i ? C.ink : C.stone,
                    borderBottom: `1px solid ${hoveredProject === i ? C.ink : C.beige}`,
                    paddingBottom: 2,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                >
                  Ver projeto <ArrowRight size={12} />
                </a>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 64, paddingTop: 40, borderTop: `1px solid ${C.beige}` }}>
            <a
              href="/"
              className={notoSans.className}
              style={{
                fontSize: 12,
                fontWeight: 400,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                textDecoration: "none",
                color: C.stone,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = C.ink)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = C.stone)}
            >
              Todos os projetos (160+) <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ── BLOG ── */}
      <section
        id="escritos"
        style={{
          padding: "120px 48px",
          borderBottom: `1px solid ${C.beige}`,
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p
            className={notoSans.className}
            style={{
              fontSize: 11,
              fontWeight: 400,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: C.stone,
              marginBottom: 64,
            }}
          >
            Escritos recentes
          </p>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {BLOG_POSTS.map((post, i) => (
              <a
                key={post.title}
                href="#"
                onMouseEnter={() => setHoveredPost(i)}
                onMouseLeave={() => setHoveredPost(null)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "160px 1fr",
                  gap: 40,
                  padding: "28px 0",
                  borderTop: i === 0 ? `1px solid ${C.beige}` : "none",
                  borderBottom: `1px solid ${C.beige}`,
                  textDecoration: "none",
                  alignItems: "center",
                  transition: "background 0.2s",
                  background: hoveredPost === i ? C.cream : "transparent",
                  paddingLeft: hoveredPost === i ? 16 : 0,
                }}
              >
                <span
                  className={notoSans.className}
                  style={{
                    fontSize: 12,
                    fontWeight: 300,
                    color: C.stone,
                    letterSpacing: "0.05em",
                  }}
                >
                  {post.date}
                </span>
                <span
                  className={crimsonPro.className}
                  style={{
                    fontSize: 20,
                    fontWeight: 400,
                    color: hoveredPost === i ? C.red : C.ink,
                    transition: "color 0.2s",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {post.title}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        id="contacto"
        style={{
          padding: "140px 48px",
          borderBottom: `1px solid ${C.beige}`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative kanji */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: "-20px",
            bottom: "-40px",
            fontSize: "clamp(160px, 22vw, 280px)",
            color: C.lightBeige,
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
            fontFamily: "serif",
          }}
        >
          縁
        </div>

        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <p
            className={notoSans.className}
            style={{
              fontSize: 11,
              fontWeight: 400,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: C.stone,
              marginBottom: 48,
            }}
          >
            Contacto
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              alignItems: "center",
            }}
            className="grid-cols-1 md:grid-cols-2"
          >
            <div>
              <h2
                className={crimsonPro.className}
                style={{
                  fontSize: "clamp(36px, 5vw, 72px)",
                  fontWeight: 300,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  marginBottom: 32,
                }}
              >
                Tem um projeto{" "}
                <em style={{ color: C.red }}>em mente?</em>
              </h2>
              <p
                className={notoSans.className}
                style={{
                  fontSize: 15,
                  fontWeight: 300,
                  color: C.stone,
                  lineHeight: 1.9,
                  maxWidth: 380,
                }}
              >
                Não precisamos de reuniões longas para começar.
                Uma mensagem é suficiente. Respondemos com atenção.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <a
                href="mailto:hello@descomplicai.pt"
                className={notoSans.className}
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  textDecoration: "none",
                  color: C.ink,
                  border: `1px solid ${C.beige}`,
                  padding: "20px 32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = C.ink;
                  (e.currentTarget as HTMLElement).style.background = C.ink;
                  (e.currentTarget as HTMLElement).style.color = C.paper;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = C.beige;
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = C.ink;
                }}
              >
                Enviar email
                <ArrowRight size={14} />
              </a>

              <div
                style={{
                  padding: "24px 0",
                  borderTop: `1px solid ${C.lightBeige}`,
                  borderBottom: `1px solid ${C.lightBeige}`,
                }}
              >
                <p
                  className={notoSans.className}
                  style={{
                    fontSize: 12,
                    color: C.stone,
                    lineHeight: 2,
                    fontWeight: 300,
                  }}
                >
                  hello@descomplicai.pt
                  <br />
                  Portugal · Resposta em 24 horas
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          background: C.paper,
          padding: "56px 48px",
          borderTop: `1px solid ${C.beige}`,
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: 80,
            marginBottom: 48,
          }}
          className="grid-cols-1 md:grid-cols-3"
        >
          <div>
            <a
              href="/"
              className={crimsonPro.className}
              style={{
                fontSize: 20,
                fontWeight: 400,
                fontStyle: "italic",
                textDecoration: "none",
                color: C.ink,
                display: "block",
                marginBottom: 20,
              }}
            >
              descomplicai
            </a>
            <p
              className={notoSans.className}
              style={{
                fontSize: 13,
                fontWeight: 300,
                color: C.stone,
                lineHeight: 1.9,
                maxWidth: 280,
              }}
            >
              Agência de tecnologia e IA.
              <br />
              Feita com atenção, em Portugal.
            </p>
          </div>

          <div>
            <p
              className={notoSans.className}
              style={{
                fontSize: 10,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: C.stone,
                marginBottom: 24,
              }}
            >
              Serviços
            </p>
            {["Websites", "Agentes IA", "E-commerce", "Conteúdo"].map((item) => (
              <a
                key={item}
                href="#"
                className={notoSans.className}
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 300,
                  color: C.stone,
                  textDecoration: "none",
                  marginBottom: 12,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = C.ink)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = C.stone)}
              >
                {item}
              </a>
            ))}
          </div>

          <div>
            <p
              className={notoSans.className}
              style={{
                fontSize: 10,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: C.stone,
                marginBottom: 24,
              }}
            >
              Contacto
            </p>
            <p
              className={notoSans.className}
              style={{
                fontSize: 13,
                fontWeight: 300,
                color: C.stone,
                lineHeight: 2,
              }}
            >
              hello@descomplicai.pt
              <br />
              Portugal
            </p>
          </div>
        </div>

        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            borderTop: `1px solid ${C.lightBeige}`,
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <span
            className={notoSans.className}
            style={{ fontSize: 11, color: C.stone, fontWeight: 300, letterSpacing: "0.05em" }}
          >
            © 2025 Descomplicai
          </span>
          <span
            className={crimsonPro.className}
            style={{
              fontSize: 13,
              fontStyle: "italic",
              color: C.beige,
            }}
          >
            Portugal · Feito com atenção
          </span>
        </div>
      </footer>
    </div>
  );
}
