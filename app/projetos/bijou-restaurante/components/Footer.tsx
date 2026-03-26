"use client";

import { motion } from "framer-motion";
import { Facebook, Phone, MapPin, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "#1A0F0A" }}
    >
      {/* Top decorative border */}
      <div
        className="h-px"
        style={{ background: "linear-gradient(90deg, transparent, #CFB53B, transparent)" }}
      />

      {/* Main footer content */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Brand */}
          <div>
            <div className="mb-4">
              {/* Logo mark */}
              <p
                className="text-4xl font-bold mb-1"
                style={{ fontFamily: "var(--font-eb-garamond)", color: "#FFFFF0" }}
              >
                Bijou
              </p>
              <p
                className="text-xs tracking-[0.3em] uppercase mb-3"
                style={{ color: "#CFB53B", fontFamily: "var(--font-source-sans-3)" }}
              >
                Restaurante · Est. 1912
              </p>
              <div className="h-px w-12" style={{ background: "#CFB53B" }} />
            </div>
            <p
              className="text-sm leading-relaxed mt-4"
              style={{ color: "rgba(255,255,240,0.5)", fontFamily: "var(--font-source-sans-3)" }}
            >
              Mais de 110 anos de tradição gastronómica portuguesa no coração
              da Figueira da Foz. Quatro gerações de uma família dedicadas à
              preservação da nossa cozinha e da nossa história.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <p
              className="text-xs tracking-[0.3em] uppercase mb-5"
              style={{ color: "#CFB53B", fontFamily: "var(--font-source-sans-3)" }}
            >
              Navegação
            </p>
            <nav className="space-y-3">
              {[
                { label: "A Nossa História", href: "#historia" },
                { label: "Filosofia", href: "#filosofia" },
                { label: "Ementa", href: "#menu" },
                { label: "Carta de Vinhos", href: "#adega" },
                { label: "Galeria", href: "#galeria" },
                { label: "Tradição", href: "#tradicao" },
                { label: "Reservas", href: "#reservas" },
                { label: "Localização", href: "#localizacao" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block text-sm transition-colors hover:text-[#CFB53B]"
                  style={{ color: "rgba(255,255,240,0.5)", fontFamily: "var(--font-source-sans-3)" }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div>
            <p
              className="text-xs tracking-[0.3em] uppercase mb-5"
              style={{ color: "#CFB53B", fontFamily: "var(--font-source-sans-3)" }}
            >
              Contacto
            </p>
            <div className="space-y-4">
              <a
                href="tel:+351233434447"
                className="flex items-center gap-3 text-sm group"
                style={{ color: "rgba(255,255,240,0.5)", fontFamily: "var(--font-source-sans-3)" }}
              >
                <Phone size={14} style={{ color: "#CFB53B" }} />
                <span className="group-hover:text-[#CFB53B] transition-colors">233 434 447</span>
              </a>
              <div
                className="flex items-start gap-3 text-sm"
                style={{ color: "rgba(255,255,240,0.5)", fontFamily: "var(--font-source-sans-3)" }}
              >
                <MapPin size={14} style={{ color: "#CFB53B", flexShrink: 0, marginTop: 2 }} />
                <span>
                  Rua Cândido dos Reis 101, 3080-166 Figueira da Foz
                </span>
              </div>
              <a
                href="https://facebook.com/bijourestaurante"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm group"
                style={{ color: "rgba(255,255,240,0.5)", fontFamily: "var(--font-source-sans-3)" }}
              >
                <Facebook size={14} style={{ color: "#CFB53B" }} />
                <span className="group-hover:text-[#CFB53B] transition-colors">
                  facebook.com/bijourestaurante
                </span>
              </a>
            </div>

            {/* Hours summary */}
            <div
              className="mt-6 p-4 border"
              style={{ borderColor: "rgba(207,181,59,0.15)" }}
            >
              <p
                className="text-xs tracking-widest uppercase mb-2"
                style={{ color: "#CFB53B", fontFamily: "var(--font-source-sans-3)" }}
              >
                Horário
              </p>
              <p
                className="text-xs"
                style={{ color: "rgba(255,255,240,0.5)", fontFamily: "var(--font-source-sans-3)", lineHeight: 1.8 }}
              >
                Ter – Qui: 12h–15h · 19h–22h30
                <br />
                Sex: 12h–15h · 19h–23h
                <br />
                Sáb: 12h–15h30 · 19h–23h
                <br />
                Dom: 12h–15h30
                <br />
                Segunda: Encerrado
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-8"
          style={{ background: "rgba(207,181,59,0.1)" }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-center"
            style={{ color: "rgba(255,255,240,0.3)", fontFamily: "var(--font-source-sans-3)" }}
          >
            © 2024 Bijou Restaurante · Figueira da Foz · Est. 1912 · Todos os direitos reservados
          </p>

          <div className="flex items-center gap-6">
            <p
              className="text-xs"
              style={{ color: "rgba(255,255,240,0.2)", fontFamily: "var(--font-source-sans-3)" }}
            >
              Website por{" "}
              <a
                href="https://descomplicai.pt"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#CFB53B] transition-colors"
                style={{ color: "rgba(255,255,240,0.4)" }}
              >
                Descomplicai
              </a>
            </p>

            <button
              onClick={scrollToTop}
              className="w-9 h-9 flex items-center justify-center border transition-all hover:scale-110"
              style={{ borderColor: "rgba(207,181,59,0.3)", background: "transparent" }}
              aria-label="Voltar ao topo"
            >
              <ArrowUp size={16} style={{ color: "#CFB53B" }} />
            </button>
          </div>
        </div>
      </div>

      {/* Background ornament */}
      <div className="absolute bottom-0 right-0 opacity-3 pointer-events-none select-none">
        <p
          className="text-[12rem] font-bold leading-none"
          style={{ fontFamily: "var(--font-eb-garamond)", color: "#CFB53B", opacity: 0.04 }}
        >
          1912
        </p>
      </div>
    </footer>
  );
}
