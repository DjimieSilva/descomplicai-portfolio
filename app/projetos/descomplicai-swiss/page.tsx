"use client";

import { Inter } from "next/font/google";
import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

// ─── CONSTANTS ──────────────────────────────────────────────────────────────

const STATS = [
  { value: "160+", label: "Projetos Entregues" },
  { value: "36", label: "Ferramentas Ativas" },
  { value: "24h", label: "Resposta Garantida" },
  { value: "2024", label: "Ano de Fundação" },
];

const SERVICES = [
  {
    num: "01",
    title: "Websites & Aplicações",
    desc: "Design limpo, performance técnica. Do briefing ao live em dias. Sem compromissos desnecessários.",
  },
  {
    num: "02",
    title: "Agentes de Inteligência Artificial",
    desc: "Sistemas autónomos que qualificam leads, respondem a clientes e automatizam processos repetitivos.",
  },
  {
    num: "03",
    title: "E-commerce & Conversão",
    desc: "Lojas online otimizadas para vender. Catálogo, checkout, recuperação de carrinho, analytics.",
  },
  {
    num: "04",
    title: "Estratégia de Conteúdo",
    desc: "Copy, SEO, redes sociais. Gerado com IA, refinado com experiência humana e métricas reais.",
  },
];

const PROJECTS = [
  { name: "Clínica Vasco da Gama", category: "Healthcare", year: "2024", status: true },
  { name: "Ondas Academy", category: "Sports", year: "2024", status: true },
  { name: "Zeff Pizza", category: "Restaurant", year: "2024", status: true },
  { name: "BFITFAM", category: "Fitness", year: "2024", status: true },
  { name: "Jardim Algarvio", category: "Services", year: "2024", status: true },
  { name: "Ribeiro Santo", category: "Wine & Food", year: "2024", status: true },
];

// ─── COMPONENT ──────────────────────────────────────────────────────────────

export default function DescomplicaiSwiss() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className={inter.className}
      style={{
        background: "#FFFFFF",
        color: "#000000",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* ── NAV ── */}
      <nav
        style={{
          borderBottom: "1px solid #E0E0E0",
          position: "sticky",
          top: 0,
          background: "#FFFFFF",
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 40px",
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <a
            href="/"
            style={{
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              textDecoration: "none",
              color: "#000",
            }}
          >
            Descomplicai
          </a>

          {/* Desktop nav */}
          <div
            className="hidden md:flex"
            style={{ gap: 32, alignItems: "center" }}
          >
            {["Serviços", "Projetos", "Processo", "Contacto"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  textDecoration: "none",
                  color: "#999",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#000")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#999")}
              >
                {link}
              </a>
            ))}
            <a
              href="#contacto"
              style={{
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                textDecoration: "none",
                color: "#FFFFFF",
                background: "#FF0000",
                padding: "8px 20px",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#CC0000")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#FF0000")}
            >
              Contacto
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#000",
              padding: 4,
            }}
            aria-label="Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <div
            style={{
              borderTop: "1px solid #E0E0E0",
              padding: "16px 40px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {["Serviços", "Projetos", "Processo", "Contacto"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  textDecoration: "none",
                  color: "#000",
                  paddingBottom: 8,
                  borderBottom: "1px solid #E0E0E0",
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
          borderBottom: "1px solid #E0E0E0",
          padding: "96px 40px",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "end",
          }}
          className="grid-cols-1 md:grid-cols-2"
        >
          {/* Left: massive headline */}
          <div>
            <h1
              style={{
                fontSize: "clamp(56px, 8vw, 104px)",
                fontWeight: 900,
                lineHeight: 0.92,
                letterSpacing: "-0.04em",
                marginBottom: 0,
              }}
            >
              Websites
              <br />
              que{" "}
              <span style={{ color: "#FF0000" }}>funcionam.</span>
            </h1>
          </div>

          {/* Right: description */}
          <div style={{ paddingBottom: 8 }}>
            <p
              style={{
                fontSize: 18,
                fontWeight: 300,
                lineHeight: 1.7,
                color: "#333",
                marginBottom: 40,
                maxWidth: 440,
              }}
            >
              Construímos a presença digital de negócios portugueses.
              Com tecnologia atual, design que converte e IA integrada
              desde o primeiro dia.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a
                href="#contacto"
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  textDecoration: "none",
                  color: "#FFFFFF",
                  background: "#000",
                  padding: "14px 28px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#FF0000")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#000")}
              >
                Começar <ArrowRight size={16} />
              </a>
              <a
                href="#projetos"
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  textDecoration: "none",
                  color: "#000",
                  border: "1px solid #000",
                  padding: "14px 28px",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#000";
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "#000";
                }}
              >
                Portfolio
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section
        style={{
          borderBottom: "1px solid #E0E0E0",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
          className="grid-cols-2 md:grid-cols-4"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                padding: "40px",
                borderRight: i < 3 ? "1px solid #E0E0E0" : "none",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#999",
                  marginBottom: 12,
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontSize: "clamp(32px, 4vw, 48px)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  color: "#000",
                }}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section
        id="servicos"
        style={{
          padding: "96px 40px",
          borderBottom: "1px solid #E0E0E0",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Section label */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 3fr",
              gap: 80,
              marginBottom: 64,
              alignItems: "end",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#999",
                }}
              >
                Serviços
              </span>
            </div>
            <div>
              <h2
                style={{
                  fontSize: "clamp(28px, 4vw, 48px)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                }}
              >
                O que construímos para o teu negócio crescer.
              </h2>
            </div>
          </div>

          {/* Services list */}
          {SERVICES.map((svc, i) => (
            <div
              key={svc.num}
              style={{
                borderTop: "1px solid #E0E0E0",
                padding: "32px 0",
                display: "grid",
                gridTemplateColumns: "80px 1fr 1fr",
                gap: 40,
                alignItems: "start",
                borderBottom: i === SERVICES.length - 1 ? "1px solid #E0E0E0" : "none",
              }}
              className="grid-cols-1 md:grid-cols-3"
            >
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  color: "#E0E0E0",
                  lineHeight: 1,
                }}
              >
                {svc.num}
              </div>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                }}
              >
                {svc.title}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 300,
                  color: "#555",
                  lineHeight: 1.7,
                }}
              >
                {svc.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROJECTS TABLE ── */}
      <section
        id="projetos"
        style={{
          padding: "96px 40px",
          borderBottom: "1px solid #E0E0E0",
          background: "#FAFAFA",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 3fr",
              gap: 80,
              marginBottom: 64,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#999",
              }}
            >
              Portfolio
            </span>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Projetos selecionados.
            </h2>
          </div>

          {/* Table header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 160px 80px 80px",
              gap: 24,
              paddingBottom: 12,
              borderBottom: "1px solid #000",
              marginBottom: 0,
            }}
          >
            {["Projeto", "Categoria", "Ano", "Estado"].map((h) => (
              <span
                key={h}
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#999",
                }}
              >
                {h}
              </span>
            ))}
          </div>

          {/* Table rows */}
          {PROJECTS.map((proj) => (
            <div
              key={proj.name}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 160px 80px 80px",
                gap: 24,
                padding: "20px 0",
                borderBottom: "1px solid #E0E0E0",
                alignItems: "center",
                transition: "background 0.1s",
                cursor: "default",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#F0F0F0")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
            >
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                }}
              >
                {proj.name}
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: "#999",
                  fontWeight: 400,
                }}
              >
                {proj.category}
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: "#999",
                  fontWeight: 400,
                }}
              >
                {proj.year}
              </span>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: proj.status ? "#00CC44" : "#CC0000",
                }}
                title={proj.status ? "Live" : "Offline"}
              />
            </div>
          ))}

          <div style={{ marginTop: 40 }}>
            <a
              href="/"
              style={{
                fontSize: 13,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                textDecoration: "none",
                color: "#000",
                borderBottom: "2px solid #000",
                paddingBottom: 2,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "color 0.15s, border-color 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#FF0000";
                (e.currentTarget as HTMLElement).style.borderColor = "#FF0000";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#000";
                (e.currentTarget as HTMLElement).style.borderColor = "#000";
              }}
            >
              Ver todos os projetos <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section
        id="processo"
        style={{
          padding: "96px 40px",
          borderBottom: "1px solid #E0E0E0",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 3fr",
              gap: 80,
              marginBottom: 64,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#999",
              }}
            >
              Processo
            </span>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Do briefing ao live em dias,
              <span style={{ color: "#FF0000" }}> não meses.</span>
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              borderTop: "1px solid #E0E0E0",
            }}
            className="grid-cols-2 md:grid-cols-4"
          >
            {[
              { n: "01", label: "Briefing", desc: "Ouvimos o teu negócio. Percebemos os objetivos e o público." },
              { n: "02", label: "Design", desc: "Wireframe e visual em dias. Feedback rápido e iteração contínua." },
              { n: "03", label: "Build", desc: "Desenvolvimento com IA. Qualidade técnica, performance garantida." },
              { n: "04", label: "Launch", desc: "Entrega, treino e suporte. O projeto cresce contigo." },
            ].map((step, i) => (
              <div
                key={step.n}
                style={{
                  padding: "40px 32px",
                  borderRight: i < 3 ? "1px solid #E0E0E0" : "none",
                  borderBottom: "1px solid #E0E0E0",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "#999",
                    marginBottom: 24,
                  }}
                >
                  {step.n}
                </div>
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    marginBottom: 16,
                  }}
                >
                  {step.label}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 300,
                    color: "#555",
                    lineHeight: 1.7,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        id="contacto"
        style={{
          background: "#000",
          padding: "96px 40px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "#666",
              marginBottom: 32,
            }}
          >
            Contacto
          </p>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              color: "#FFF",
              marginBottom: 24,
            }}
          >
            Vamos construir
            <br />
            <span style={{ color: "#FF0000" }}>o teu projeto.</span>
          </h2>
          <p
            style={{
              fontSize: 16,
              fontWeight: 300,
              color: "#666",
              marginBottom: 48,
              lineHeight: 1.7,
            }}
          >
            Resposta em 24 horas.
            <br />
            Orçamento sempre gratuito.
          </p>
          <a
            href="mailto:hello@descomplicai.pt"
            style={{
              fontSize: 13,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              textDecoration: "none",
              color: "#000",
              background: "#FFFFFF",
              padding: "16px 40px",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              transition: "background 0.15s, color 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#FF0000";
              (e.currentTarget as HTMLElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#fff";
              (e.currentTarget as HTMLElement).style.color = "#000";
            }}
          >
            Enviar Mensagem <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          background: "#000",
          borderTop: "1px solid #222",
          padding: "48px 40px",
          color: "#FFF",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: 80,
            marginBottom: 48,
          }}
          className="grid-cols-1 md:grid-cols-3"
        >
          <div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                marginBottom: 16,
              }}
            >
              Descomplicai
            </div>
            <p
              style={{
                fontSize: 13,
                fontWeight: 300,
                color: "#666",
                lineHeight: 1.8,
                maxWidth: 300,
              }}
            >
              Agência portuguesa de tecnologia e inteligência artificial.
              Construímos o presente digital para o futuro do teu negócio.
            </p>
          </div>

          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#666",
                marginBottom: 20,
              }}
            >
              Serviços
            </div>
            {["Websites", "Agentes IA", "E-commerce", "Conteúdo"].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 300,
                  color: "#999",
                  textDecoration: "none",
                  marginBottom: 10,
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#999")}
              >
                {item}
              </a>
            ))}
          </div>

          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#666",
                marginBottom: 20,
              }}
            >
              Contacto
            </div>
            <p
              style={{
                fontSize: 13,
                fontWeight: 300,
                color: "#999",
                lineHeight: 2,
              }}
            >
              hello@descomplicai.pt
              <br />
              Portugal
              <br />
              +351 000 000 000
            </p>
          </div>
        </div>

        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            borderTop: "1px solid #222",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 11, color: "#444", letterSpacing: "0.05em" }}>
            © 2025 Descomplicai
          </span>
          <span style={{ fontSize: 11, color: "#333", letterSpacing: "0.05em" }}>
            Conceito: Swiss International Style
          </span>
        </div>
      </footer>
    </div>
  );
}
