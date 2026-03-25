"use client";

import { Heart, Phone, MapPin, Facebook, MessageCircle, Mail } from "lucide-react";

const PHONE = "+351918338954";
const PHONE_DISPLAY = "+351 918 338 954";
const WHATSAPP_URL = `https://wa.me/${PHONE}?text=Olá%2C%20gostaria%20de%20marcar%20uma%20consulta%20na%20Fozclinica.`;

const specialties = [
  { name: "Medicina Dentária", href: "#dentaria" },
  { name: "Podologia", href: "#bem-estar" },
  { name: "Psicologia", href: "#bem-estar" },
  { name: "Reabilitação Física", href: "#bem-estar" },
];

const links = [
  { name: "Sobre Nós", href: "#sobre" },
  { name: "Especialidades", href: "#especialidades" },
  { name: "Equipa", href: "#equipa" },
  { name: "Testemunhos", href: "#testemunhos" },
  { name: "FAQ", href: "#faq" },
  { name: "Contacto", href: "#contacto" },
];

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" fill="white" />
              </div>
              <span
                className="text-white font-bold text-xl"
                style={{ fontFamily: "var(--font-plus-jakarta-sans, sans-serif)" }}
              >
                Foz<span className="text-teal-400">clinica</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Centro multidisciplinar de saúde e bem-estar na Figueira da Foz. Medicina dentária, podologia, psicologia e reabilitação física num só lugar.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com/fozclinica"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-teal-500 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-green-500 rounded-lg flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="mailto:info@fozclinica.pt"
                className="w-9 h-9 bg-white/10 hover:bg-teal-500 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Specialties */}
          <div>
            <h4
              className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-5"
            >
              Especialidades
            </h4>
            <ul className="space-y-3">
              {specialties.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    className="text-slate-400 hover:text-teal-400 text-sm transition-colors"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4
              className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-5"
            >
              Navegação
            </h4>
            <ul className="space-y-3">
              {links.map((l) => (
                <li key={l.name}>
                  <a
                    href={l.href}
                    className="text-slate-400 hover:text-teal-400 text-sm transition-colors"
                  >
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-5"
            >
              Contacto
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${PHONE}`}
                  className="flex items-start gap-3 text-slate-400 hover:text-teal-400 transition-colors group"
                >
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:text-teal-400" />
                  <span className="text-sm">{PHONE_DISPLAY}</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@fozclinica.pt"
                  className="flex items-start gap-3 text-slate-400 hover:text-teal-400 transition-colors group"
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:text-teal-400" />
                  <span className="text-sm">info@fozclinica.pt</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-slate-400">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    Rua Bartolomeu Dias 63<br />
                    3080 Figueira da Foz
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Fozclinica · Centro de Saúde e Bem-Estar · Figueira da Foz
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">
              Política de Privacidade
            </a>
            <span className="text-slate-700">·</span>
            <a href="#" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">
              Termos de Uso
            </a>
            <span className="text-slate-700">·</span>
            <a href="#" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">
              Livro de Reclamações
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
