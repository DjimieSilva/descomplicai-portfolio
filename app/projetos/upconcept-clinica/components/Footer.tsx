"use client";

import { motion } from "framer-motion";
import { Clock, Phone, MapPin, Facebook, Heart, ArrowUp } from "lucide-react";

const navLinks = [
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Tecnologia", href: "#tecnologia" },
  { label: "Equipa", href: "#equipa" },
  { label: "Horários", href: "#horarios" },
  { label: "Testemunhos", href: "#testemunhos" },
  { label: "Contacto", href: "#contacto" },
];

const services = [
  "Medicina Dentária Geral",
  "Implantes Dentários",
  "Ortodontia",
  "Estética Dentária",
  "Cirurgia Oral",
  "Endodontia",
  "Periodontia",
  "Prótese Dentária",
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#080E18] border-t border-white/10 overflow-hidden">
      {/* Top gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #2563EB, #06B6D4, transparent)" }}
      />

      {/* Background elements */}
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #2563EB, transparent)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Main footer content */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white font-[family-name:var(--font-space-grotesk)] text-base"
                style={{ background: "linear-gradient(135deg, #2563EB, #06B6D4)" }}
              >
                UC
              </div>
              <div>
                <p className="text-white font-bold font-[family-name:var(--font-space-grotesk)] text-sm leading-none">
                  Upconcept
                </p>
                <p className="text-gray-500 text-xs font-[family-name:var(--font-inter-uc)]">
                  Clínica Médica e Dentária
                </p>
              </div>
            </div>

            <p className="text-gray-500 text-sm font-[family-name:var(--font-inter-uc)] leading-relaxed mb-6">
              Medicina dentária de excelência na Figueira da Foz. Os únicos abertos 7 dias por
              semana, incluindo domingos e feriados.
            </p>

            {/* 7-day badge */}
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-[#06B6D4]/30 bg-[#06B6D4]/10">
              <Clock className="w-4 h-4 text-[#06B6D4]" />
              <span className="text-xs font-bold text-[#06B6D4] font-[family-name:var(--font-space-grotesk)]">
                7 Dias / Semana
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold font-[family-name:var(--font-space-grotesk)] mb-4 text-sm">
              Navegação
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-500 hover:text-[#06B6D4] text-sm font-[family-name:var(--font-inter-uc)] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold font-[family-name:var(--font-space-grotesk)] mb-4 text-sm">
              Especialidades
            </h4>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#servicos"
                    className="text-gray-500 hover:text-[#06B6D4] text-sm font-[family-name:var(--font-inter-uc)] transition-colors duration-200"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold font-[family-name:var(--font-space-grotesk)] mb-4 text-sm">
              Contactos
            </h4>
            <div className="space-y-3">
              <a
                href="tel:+351233109109"
                className="flex items-start gap-3 text-gray-500 hover:text-[#06B6D4] transition-colors duration-200 group"
              >
                <Phone className="w-4 h-4 shrink-0 mt-0.5 group-hover:text-[#2563EB]" />
                <span className="text-sm font-[family-name:var(--font-inter-uc)]">
                  +351 233 109 109
                </span>
              </a>

              <a
                href="https://maps.google.com/?q=Lugar+4+Caminhos+Centro+Comercial+Leclerc+Figueira+da+Foz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-gray-500 hover:text-[#06B6D4] transition-colors duration-200 group"
              >
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 group-hover:text-[#2563EB]" />
                <span className="text-sm font-[family-name:var(--font-inter-uc)]">
                  Lugar 4 Caminhos, Loja 1
                  <br />
                  C.C. E.Leclerc, 3080-510 Figueira da Foz
                </span>
              </a>

              <a
                href="https://facebook.com/upconcept"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-500 hover:text-[#1877F2] transition-colors duration-200 group"
              >
                <Facebook className="w-4 h-4 group-hover:text-[#1877F2]" />
                <span className="text-sm font-[family-name:var(--font-inter-uc)]">
                  /upconcept
                </span>
              </a>

              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-xs text-gray-600 font-[family-name:var(--font-inter-uc)] mb-1">
                  Horário
                </p>
                <p className="text-sm text-gray-500 font-[family-name:var(--font-inter-uc)]">
                  Seg–Sex: 09:00–19:30
                </p>
                <p className="text-sm text-gray-500 font-[family-name:var(--font-inter-uc)]">
                  Sábado: 09:00–17:00
                </p>
                <p className="text-sm font-medium font-[family-name:var(--font-inter-uc)] text-[#06B6D4]">
                  Domingo: 09:00–13:00 ✓
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
          <p className="text-gray-600 text-sm font-[family-name:var(--font-inter-uc)] text-center sm:text-left">
            © {new Date().getFullYear()} Upconcept — Clínica Médica e Dentária. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-4">
            <p className="text-gray-600 text-xs font-[family-name:var(--font-inter-uc)] flex items-center gap-1.5">
              Desenvolvido com{" "}
              <Heart className="w-3 h-3 text-[#2563EB] fill-[#2563EB]" />
              {" "}por{" "}
              <a
                href="https://descomplicai.pt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2563EB] hover:text-[#06B6D4] transition-colors duration-200 font-medium"
              >
                Descomplicai
              </a>
            </p>

            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg border border-white/20 bg-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-all duration-200"
              aria-label="Voltar ao topo"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
