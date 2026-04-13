"use client";

import { Space_Grotesk } from "next/font/google";
import { useState } from "react";
import {
  Globe,
  Zap,
  ShoppingCart,
  MessageSquare,
  ArrowRight,
  Menu,
  X,
  Bot,
  Code2,
  Layers,
  TrendingUp,
} from "lucide-react";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// ─── CONSTANTS ──────────────────────────────────────────────────────────────

const NAV_LINKS = ["Serviços", "Projetos", "Processo", "Contacto"];

const STATS = [
  { value: "160+", label: "Projetos" },
  { value: "36", label: "Ferramentas" },
  { value: "100%", label: "IA-Powered" },
  { value: "PT", label: "Made in Portugal" },
];

const SERVICES = [
  {
    icon: Globe,
    title: "Websites",
    subtitle: "Que convertem.",
    desc: "Design brutal, performance técnica, resultados reais. Do briefing ao live em dias.",
    color: "#4ECDC4",
  },
  {
    icon: Bot,
    title: "Agentes IA",
    subtitle: "Trabalham 24/7.",
    desc: "Automação inteligente que responde, qualifica e converte leads enquanto dormes.",
    color: "#FFD60A",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    subtitle: "Vende mais.",
    desc: "Lojas online otimizadas com IA — catálogo, checkout, recuperação de carrinho.",
    color: "#FF6B6B",
  },
  {
    icon: MessageSquare,
    title: "Conteúdo IA",
    subtitle: "Escala a marca.",
    desc: "Copy, SEO, redes sociais — gerado com IA e refinado pela experiência humana.",
    color: "#C8FF00",
  },
];

const PROJECTS = [
  {
    emoji: "🦷",
    category: "SAÚDE",
    title: "Clínica Vasco da Gama",
    desc: "Site premium para clínica dentária — dark luxury, gold & navy, booking integrado.",
    tag: "Healthcare",
  },
  {
    emoji: "🏄",
    category: "DESPORTO",
    title: "Ondas Academy",
    desc: "Escola de surf em Buarcos — pacotes de aulas, galeria, sistema de reservas.",
    tag: "Sports",
  },
  {
    emoji: "🍕",
    category: "RESTAURAÇÃO",
    title: "Zeff Pizza",
    desc: "Três conceitos radicalmente diferentes para a mesma marca — pirate, sun, artisan.",
    tag: "Restaurant",
  },
];

// ─── STYLES ─────────────────────────────────────────────────────────────────

const NEO = {
  border: "3px solid #000",
  shadow: "4px 4px 0 #000",
  shadowHover: "6px 6px 0 #000",
  shadowInset: "inset 2px 2px 0 #000",
  radius: "0",
};

// ─── COMPONENT ──────────────────────────────────────────────────────────────

export default function DescomplicaiNeobrutalism() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <div
      className={spaceGrotesk.className}
      style={{ background: "#FFFEF0", minHeight: "100vh", overflowX: "hidden" }}
    >
      {/* ── NAV ── */}
      <nav
        style={{
          background: "#FFD60A",
          borderBottom: NEO.border,
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
            }}
          >
            DESCOMPLICAI
          </span>

          {/* Desktop links */}
          <div
            className="hidden md:flex"
            style={{ gap: 8 }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                style={{
                  padding: "8px 16px",
                  border: NEO.border,
                  boxShadow: "2px 2px 0 #000",
                  background: "#000",
                  color: "#FFD60A",
                  fontWeight: 700,
                  fontSize: 13,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  textDecoration: "none",
                  transition: "transform 0.1s, box-shadow 0.1s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translate(-2px,-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "4px 4px 0 #000";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "2px 2px 0 #000";
                }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* CTA button */}
          <a
            href="#contacto"
            className="hidden md:flex"
            style={{
              padding: "10px 20px",
              background: "#FF6B6B",
              border: NEO.border,
              boxShadow: NEO.shadow,
              fontWeight: 700,
              fontSize: 14,
              textTransform: "uppercase",
              textDecoration: "none",
              color: "#000",
              letterSpacing: "0.05em",
              transition: "transform 0.1s, box-shadow 0.1s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translate(-2px,-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "6px 6px 0 #000";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
              (e.currentTarget as HTMLElement).style.boxShadow = NEO.shadow;
            }}
          >
            Falar Agora →
          </a>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "transparent", border: "none", cursor: "pointer", padding: 4 }}
            aria-label="Menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div
            style={{
              borderTop: NEO.border,
              background: "#FFD60A",
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "12px 16px",
                  border: NEO.border,
                  boxShadow: NEO.shadow,
                  background: "#000",
                  color: "#FFD60A",
                  fontWeight: 700,
                  fontSize: 14,
                  textTransform: "uppercase",
                  textDecoration: "none",
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
          background: "#4ECDC4",
          borderBottom: NEO.border,
          padding: "80px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background pattern */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.04) 20px, rgba(0,0,0,0.04) 22px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-block",
              background: "#FFD60A",
              border: NEO.border,
              boxShadow: NEO.shadow,
              padding: "6px 16px",
              marginBottom: 32,
              fontWeight: 700,
              fontSize: 13,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            🚀 Agência de Tecnologia + IA
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: "clamp(48px, 8vw, 96px)",
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              maxWidth: 900,
              marginBottom: 32,
            }}
          >
            IA SEM COMPLEXIDADE.{" "}
            <br />
            COM{" "}
            <span
              style={{
                background: "#FF6B6B",
                border: NEO.border,
                boxShadow: NEO.shadow,
                padding: "0 8px",
                display: "inline-block",
                transform: "rotate(-1deg)",
              }}
            >
              REAIS.
            </span>{" "}
            <br />
            RESULTADOS.
          </h1>

          {/* Subheadline */}
          <p
            style={{
              fontSize: "clamp(18px, 2.5vw, 24px)",
              fontWeight: 500,
              maxWidth: 600,
              lineHeight: 1.4,
              marginBottom: 48,
              background: "#FFFEF0",
              border: NEO.border,
              boxShadow: NEO.shadow,
              padding: "16px 24px",
              display: "inline-block",
            }}
          >
            Transformamos negócios portugueses com websites,
            agentes IA e automação. Sem bullshit, com resultados.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a
              href="#contacto"
              style={{
                padding: "16px 32px",
                background: "#000",
                color: "#FFD60A",
                border: NEO.border,
                boxShadow: NEO.shadow,
                fontWeight: 700,
                fontSize: 16,
                textTransform: "uppercase",
                textDecoration: "none",
                letterSpacing: "0.05em",
                transition: "transform 0.1s, box-shadow 0.1s",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translate(-3px,-3px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "7px 7px 0 #FF6B6B";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
                (e.currentTarget as HTMLElement).style.boxShadow = NEO.shadow;
              }}
            >
              Começar Projeto <ArrowRight size={20} />
            </a>
            <a
              href="#projetos"
              style={{
                padding: "16px 32px",
                background: "#FFFEF0",
                color: "#000",
                border: NEO.border,
                boxShadow: NEO.shadow,
                fontWeight: 700,
                fontSize: 16,
                textTransform: "uppercase",
                textDecoration: "none",
                letterSpacing: "0.05em",
                transition: "transform 0.1s, box-shadow 0.1s",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translate(-3px,-3px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "7px 7px 0 #4ECDC4";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
                (e.currentTarget as HTMLElement).style.boxShadow = NEO.shadow;
              }}
            >
              Ver Projetos
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section
        style={{
          background: "#000",
          borderBottom: NEO.border,
          padding: "24px",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 24,
          }}
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              style={{
                textAlign: "center",
                padding: "16px 8px",
                borderRight: "1px solid #333",
              }}
            >
              <div
                style={{
                  color: "#FFD60A",
                  fontSize: "clamp(28px, 4vw, 42px)",
                  fontWeight: 700,
                  lineHeight: 1,
                  marginBottom: 6,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  color: "#999",
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontWeight: 600,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section
        id="servicos"
        style={{
          padding: "80px 24px",
          background: "#FFFEF0",
          borderBottom: NEO.border,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Section header */}
          <div style={{ marginBottom: 48 }}>
            <div
              style={{
                display: "inline-block",
                background: "#FF6B6B",
                border: NEO.border,
                boxShadow: NEO.shadow,
                padding: "4px 16px",
                fontWeight: 700,
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: 16,
              }}
            >
              O que fazemos
            </div>
            <h2
              style={{
                fontSize: "clamp(32px, 5vw, 56px)",
                fontWeight: 700,
                lineHeight: 1,
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
              }}
            >
              SERVIÇOS QUE{" "}
              <span
                style={{
                  background: "#FFD60A",
                  border: NEO.border,
                  padding: "0 8px",
                  display: "inline-block",
                  transform: "rotate(1deg)",
                }}
              >
                FUNCIONAM
              </span>
            </h2>
          </div>

          {/* Service cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            {SERVICES.map((svc, i) => {
              const Icon = svc.icon;
              const isHovered = hoveredService === i;
              return (
                <div
                  key={svc.title}
                  onMouseEnter={() => setHoveredService(i)}
                  onMouseLeave={() => setHoveredService(null)}
                  style={{
                    border: NEO.border,
                    boxShadow: isHovered ? NEO.shadowHover : NEO.shadow,
                    transform: isHovered ? "translate(-2px,-2px)" : "translate(0,0)",
                    transition: "transform 0.15s, box-shadow 0.15s",
                    background: isHovered ? svc.color : "#FFFEF0",
                    padding: 28,
                    cursor: "default",
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      background: svc.color,
                      border: NEO.border,
                      boxShadow: "3px 3px 0 #000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 20,
                    }}
                  >
                    <Icon size={28} strokeWidth={2.5} />
                  </div>
                  <h3
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      marginBottom: 4,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {svc.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      marginBottom: 12,
                      color: "#555",
                    }}
                  >
                    {svc.subtitle}
                  </p>
                  <p
                    style={{
                      fontSize: 14,
                      lineHeight: 1.6,
                      color: "#333",
                    }}
                  >
                    {svc.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      <section
        id="projetos"
        style={{
          padding: "80px 24px",
          background: "#F0F0FF",
          borderBottom: NEO.border,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 48 }}>
            <div
              style={{
                display: "inline-block",
                background: "#4ECDC4",
                border: NEO.border,
                boxShadow: NEO.shadow,
                padding: "4px 16px",
                fontWeight: 700,
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: 16,
              }}
            >
              Portfolio
            </div>
            <h2
              style={{
                fontSize: "clamp(32px, 5vw, 56px)",
                fontWeight: 700,
                lineHeight: 1,
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
              }}
            >
              PROJETOS EM{" "}
              <span
                style={{
                  background: "#000",
                  color: "#C8FF00",
                  border: NEO.border,
                  padding: "0 8px",
                  display: "inline-block",
                }}
              >
                DESTAQUE
              </span>
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 24,
            }}
          >
            {PROJECTS.map((proj, i) => {
              const isHovered = hoveredProject === i;
              return (
                <div
                  key={proj.title}
                  onMouseEnter={() => setHoveredProject(i)}
                  onMouseLeave={() => setHoveredProject(null)}
                  style={{
                    border: NEO.border,
                    boxShadow: isHovered ? NEO.shadowHover : NEO.shadow,
                    transform: isHovered ? "translate(-2px,-2px)" : "translate(0,0)",
                    transition: "transform 0.15s, box-shadow 0.15s",
                    background: "#FFFEF0",
                    overflow: "hidden",
                  }}
                >
                  {/* Emoji header */}
                  <div
                    style={{
                      background: "#FFD60A",
                      borderBottom: NEO.border,
                      padding: "20px 24px",
                      fontSize: 48,
                    }}
                  >
                    {proj.emoji}
                  </div>
                  <div style={{ padding: 24 }}>
                    <div
                      style={{
                        display: "inline-block",
                        background: "#FF6B6B",
                        border: "2px solid #000",
                        boxShadow: "2px 2px 0 #000",
                        padding: "2px 10px",
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        marginBottom: 12,
                      }}
                    >
                      {proj.category}
                    </div>
                    <h3
                      style={{
                        fontSize: 20,
                        fontWeight: 700,
                        marginBottom: 8,
                        lineHeight: 1.2,
                      }}
                    >
                      {proj.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 14,
                        lineHeight: 1.6,
                        color: "#444",
                        marginBottom: 16,
                      }}
                    >
                      {proj.desc}
                    </p>
                    <div
                      style={{
                        display: "inline-block",
                        background: "#4ECDC4",
                        border: "2px solid #000",
                        padding: "4px 12px",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {proj.tag}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 48, textAlign: "center" }}>
            <a
              href="/"
              style={{
                padding: "16px 40px",
                background: "#000",
                color: "#FFD60A",
                border: NEO.border,
                boxShadow: NEO.shadow,
                fontWeight: 700,
                fontSize: 16,
                textTransform: "uppercase",
                textDecoration: "none",
                letterSpacing: "0.05em",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "transform 0.1s, box-shadow 0.1s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translate(-3px,-3px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "7px 7px 0 #FFD60A";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
                (e.currentTarget as HTMLElement).style.boxShadow = NEO.shadow;
              }}
            >
              Ver Todos os 160+ Projetos <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section
        id="processo"
        style={{
          padding: "80px 24px",
          background: "#FFFEF0",
          borderBottom: NEO.border,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 48 }}>
            <div
              style={{
                display: "inline-block",
                background: "#C8FF00",
                border: NEO.border,
                boxShadow: NEO.shadow,
                padding: "4px 16px",
                fontWeight: 700,
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: 16,
              }}
            >
              Como trabalhamos
            </div>
            <h2
              style={{
                fontSize: "clamp(32px, 5vw, 56px)",
                fontWeight: 700,
                lineHeight: 1,
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
              }}
            >
              DO BRIEFING AO{" "}
              <span
                style={{
                  background: "#4ECDC4",
                  border: NEO.border,
                  padding: "0 8px",
                  display: "inline-block",
                  transform: "rotate(-0.5deg)",
                }}
              >
                LIVE
              </span>{" "}
              EM DIAS
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 0,
            }}
          >
            {[
              { step: "01", icon: MessageSquare, label: "Briefing", desc: "Ouvimos o problema. Percebemos o negócio." },
              { step: "02", icon: Layers, label: "Design", desc: "Protótipo rápido. Feedback imediato." },
              { step: "03", icon: Code2, label: "Build", desc: "Desenvolvimento ágil com IA integrada." },
              { step: "04", icon: TrendingUp, label: "Launch", desc: "Live, optimizado e a converter." },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  style={{
                    border: NEO.border,
                    borderLeft: i === 0 ? NEO.border : "none",
                    padding: 32,
                    background: i % 2 === 0 ? "#FFFEF0" : "#FFD60A",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      fontSize: 48,
                      fontWeight: 700,
                      color: i % 2 === 0 ? "#FFD60A" : "#000",
                      lineHeight: 1,
                      marginBottom: 16,
                      WebkitTextStroke: i % 2 === 0 ? "2px #000" : "none",
                    }}
                  >
                    {step.step}
                  </div>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      border: NEO.border,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#000",
                      marginBottom: 16,
                    }}
                  >
                    <Icon size={22} color="#FFD60A" />
                  </div>
                  <h3
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    {step.label}
                  </h3>
                  <p style={{ fontSize: 14, lineHeight: 1.5, color: "#444" }}>{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        id="contacto"
        style={{
          background: "#FF6B6B",
          borderBottom: NEO.border,
          padding: "80px 24px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(0,0,0,0.03) 20px, rgba(0,0,0,0.03) 22px)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "inline-block",
              background: "#FFD60A",
              border: NEO.border,
              boxShadow: NEO.shadow,
              padding: "4px 16px",
              fontWeight: 700,
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 24,
            }}
          >
            Vamos falar
          </div>
          <h2
            style={{
              fontSize: "clamp(32px, 6vw, 72px)",
              fontWeight: 700,
              lineHeight: 1,
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
              marginBottom: 24,
            }}
          >
            VAMOS DESCOMPLICAR
            <br />
            O TEU{" "}
            <span
              style={{
                background: "#000",
                color: "#FFD60A",
                border: NEO.border,
                boxShadow: NEO.shadow,
                padding: "0 12px",
                display: "inline-block",
                transform: "rotate(-1.5deg)",
              }}
            >
              NEGÓCIO?
            </span>
          </h2>
          <p
            style={{
              fontSize: 18,
              fontWeight: 500,
              marginBottom: 40,
              maxWidth: 480,
              margin: "0 auto 40px",
              lineHeight: 1.5,
            }}
          >
            Resposta em 24h. Orçamento gratuito. Sem compromisso.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="mailto:hello@descomplicai.pt"
              style={{
                padding: "18px 40px",
                background: "#000",
                color: "#FFD60A",
                border: NEO.border,
                boxShadow: NEO.shadow,
                fontWeight: 700,
                fontSize: 16,
                textTransform: "uppercase",
                textDecoration: "none",
                letterSpacing: "0.05em",
                transition: "transform 0.1s, box-shadow 0.1s",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translate(-3px,-3px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "7px 7px 0 #FFD60A";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
                (e.currentTarget as HTMLElement).style.boxShadow = NEO.shadow;
              }}
            >
              Enviar Email <ArrowRight size={20} />
            </a>
            <a
              href="https://wa.me/351000000000"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "18px 40px",
                background: "#FFFEF0",
                color: "#000",
                border: NEO.border,
                boxShadow: NEO.shadow,
                fontWeight: 700,
                fontSize: 16,
                textTransform: "uppercase",
                textDecoration: "none",
                letterSpacing: "0.05em",
                transition: "transform 0.1s, box-shadow 0.1s",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translate(-3px,-3px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "7px 7px 0 #000";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
                (e.currentTarget as HTMLElement).style.boxShadow = NEO.shadow;
              }}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          background: "#000",
          padding: "48px 24px",
          color: "#fff",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 40,
          }}
        >
          <div>
            <div
              style={{
                display: "inline-block",
                background: "#FFD60A",
                color: "#000",
                border: "3px solid #FFD60A",
                padding: "6px 16px",
                fontWeight: 700,
                fontSize: 18,
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
                marginBottom: 16,
              }}
            >
              DESCOMPLICAI
            </div>
            <p style={{ fontSize: 14, color: "#999", lineHeight: 1.6 }}>
              Tecnologia que funciona.
              <br />
              IA que trabalha por ti.
            </p>
          </div>

          <div>
            <h4
              style={{
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#FFD60A",
                marginBottom: 16,
                borderBottom: "1px solid #333",
                paddingBottom: 8,
              }}
            >
              Serviços
            </h4>
            {["Websites", "Agentes IA", "E-commerce", "Conteúdo"].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  display: "block",
                  color: "#ccc",
                  textDecoration: "none",
                  fontSize: 14,
                  marginBottom: 8,
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#FFD60A")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#ccc")}
              >
                {item}
              </a>
            ))}
          </div>

          <div>
            <h4
              style={{
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#FF6B6B",
                marginBottom: 16,
                borderBottom: "1px solid #333",
                paddingBottom: 8,
              }}
            >
              Contacto
            </h4>
            <p style={{ fontSize: 14, color: "#ccc", lineHeight: 1.8 }}>
              hello@descomplicai.pt
              <br />
              Portugal
              <br />
              WhatsApp disponível
            </p>
          </div>
        </div>

        <div
          style={{
            maxWidth: 1200,
            margin: "32px auto 0",
            borderTop: "1px solid #333",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <p style={{ fontSize: 12, color: "#666" }}>
            © 2025 Descomplicai. Todos os direitos reservados.
          </p>
          <p style={{ fontSize: 12, color: "#444" }}>Conceito: Neobrutalism Design System</p>
        </div>
      </footer>
    </div>
  );
}
