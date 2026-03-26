"use client";

import { motion } from "framer-motion";
import { Leaf, MapPin, Facebook, ArrowUp } from "lucide-react";

const services = [
  "Prevenção e Higiene Oral",
  "Dentisteria",
  "Endodontia",
  "Prótese",
  "Implantologia",
  "Ortodontia",
  "Estética Dentária",
  "Odontopediatria",
];

const navLinks = [
  { label: "Filosofia", href: "#filosofia" },
  { label: "Serviços", href: "#servicos" },
  { label: "Programa de Prevenção", href: "#prevencao" },
  { label: "Equipa", href: "#equipa" },
  { label: "Testemunhos", href: "#testemunhos" },
  { label: "FAQ", href: "#faq" },
  { label: "Contacto", href: "#contacto" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#064E3B] text-white" aria-label="Rodapé">
      {/* Main footer */}
      <div className="container mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 bg-[#D1FAE5] rounded-full flex items-center justify-center">
                <Leaf className="w-4.5 h-4.5 text-[#064E3B]" />
              </div>
              <div>
                <div className="font-bold text-white leading-tight" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
                  Premium
                </div>
                <div className="text-xs text-[#D1FAE5]/70">Clínica Médica e Dentária</div>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Especialistas em prevenção e saúde oral holística. Prevenir é o melhor tratamento — na Figueira da Foz desde sempre.
            </p>

            {/* Social */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              aria-label="Facebook da Premium Clínica"
            >
              <Facebook className="w-4 h-4" />
              Siga-nos no Facebook
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#D1FAE5] mb-6">
              Navegação
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#D1FAE5] mb-6">
              Serviços
            </h3>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#servicos"
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#D1FAE5] mb-6">
              Contacto
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://www.facebook.com/premiumclinicadentaria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group"
                  aria-label="Facebook da clínica"
                >
                  <Facebook className="w-4 h-4 text-[#6B8F71] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-white/80 group-hover:text-white transition-colors">
                      Contacte via Facebook
                    </div>
                    <div className="text-xs text-white/45">Envie mensagem pelo Facebook</div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=Figueira+da+Foz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group"
                  aria-label="Morada da clínica"
                >
                  <MapPin className="w-4 h-4 text-[#6B8F71] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-white/80 group-hover:text-white transition-colors">
                      Figueira da Foz
                    </div>
                    <div className="text-xs text-white/45">Portugal</div>
                  </div>
                </a>
              </li>
            </ul>

            {/* Prevention highlight */}
            <div className="mt-8 bg-[#D1FAE5]/10 border border-[#D1FAE5]/20 rounded-2xl p-4">
              <p className="text-xs font-semibold text-[#D1FAE5] mb-1">Programa de Prevenção</p>
              <p className="text-xs text-white/55 leading-relaxed">
                Inscreva-se e receba lembretes automáticos para as suas consultas de rotina.
              </p>
              <a
                href="#prevencao"
                className="inline-block mt-2 text-xs font-semibold text-[#D1FAE5] hover:text-white transition-colors"
              >
                Saber mais →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-xs text-white/40">
            <span>© 2025 Premium — Clínica Médica e Dentária. Todos os direitos reservados.</span>
            <span className="hidden sm:inline">·</span>
            <span>Membro da OMD</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              Termos de Uso
            </a>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
              aria-label="Voltar ao topo"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Descomplicai credit */}
      <div className="bg-black/20">
        <div className="container mx-auto px-6 md:px-12 py-3 text-center">
          <p className="text-xs text-white/30">
            Website desenvolvido por{" "}
            <a
              href="https://descomplicai.pt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white/80 transition-colors font-medium"
            >
              Descomplicai
            </a>{" "}
            · IA sem complexidade, com resultados reais
          </p>
        </div>
      </div>
    </footer>
  );
}
