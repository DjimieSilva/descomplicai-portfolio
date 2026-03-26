"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Facebook, Heart } from "lucide-react";

const quickLinks = [
  { label: "Sobre Nós", href: "#sobre" },
  { label: "Para os Pais", href: "#para-pais" },
  { label: "Serviços", href: "#servicos" },
  { label: "Por Faixa Etária", href: "#faixas-etarias" },
  { label: "Primeira Visita", href: "#primeira-visita" },
  { label: "Testemunhos", href: "#testemunhos" },
  { label: "Localizações", href: "#localizacoes" },
  { label: "FAQ", href: "#faq" },
  { label: "Contacto", href: "#contacto" },
];

export default function Footer() {
  return (
    <footer className="bg-sky-950 text-white">
      {/* Top CTA bar */}
      <div className="bg-gradient-to-r from-lime-400 to-green-400 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p
              className="text-sky-900 font-black text-lg text-center sm:text-left"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              🦷 Primeira consulta gratuita para novos pacientes!
            </p>
            <a
              href="tel:+351233429538"
              className="shrink-0 bg-sky-900 hover:bg-sky-800 text-white font-black px-6 py-2 rounded-full text-sm transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Marcar agora →
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🦷</span>
              <div>
                <p
                  className="text-xl font-black text-white"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  Dentalkid
                </p>
                <p className="text-sky-300 text-xs">Clínica Dentária</p>
              </div>
            </div>
            <p className="text-sky-300 text-sm leading-relaxed mb-6">
              O dentista das crianças em Figueira da Foz. Especialistas em
              odontopediatria desde bebés até aos 17 anos.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com/dentalkid"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-sky-800 hover:bg-blue-600 flex items-center justify-center transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/351233429538"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-sky-800 hover:bg-green-500 flex items-center justify-center transition-colors duration-200 text-sm"
                aria-label="WhatsApp"
              >
                💬
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p
              className="font-black text-white text-sm mb-4 uppercase tracking-wider"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              Navegação
            </p>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sky-300 hover:text-lime-400 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Buarcos */}
          <div>
            <p
              className="font-black text-white text-sm mb-4 uppercase tracking-wider"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              🏖️ Buarcos
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sky-300 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-lime-400" />
                <span>Rua Joaquim Sotto Mayor 120<br />Loja 11/2, 3080-300 Figueira da Foz</span>
              </div>
              <div className="flex items-center gap-2 text-sky-300 text-sm">
                <Phone className="w-4 h-4 shrink-0 text-lime-400" />
                <a
                  href="tel:+351233429538"
                  className="hover:text-lime-400 transition-colors"
                >
                  +351 233 429 538
                </a>
              </div>
              <div className="flex items-start gap-2 text-sky-300 text-sm">
                <Clock className="w-4 h-4 mt-0.5 shrink-0 text-lime-400" />
                <span>Seg–Sex: 9h–19h<br />Sáb: 9h–13h</span>
              </div>
            </div>
          </div>

          {/* Tavarede */}
          <div>
            <p
              className="font-black text-white text-sm mb-4 uppercase tracking-wider"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              🌿 Tavarede
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sky-300 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-cyan-400" />
                <span>Rua Joaquim Sotto Mayor 120<br />Loja 11/2, 3080-300 Figueira da Foz</span>
              </div>
              <div className="flex items-center gap-2 text-sky-300 text-sm">
                <Phone className="w-4 h-4 shrink-0 text-cyan-400" />
                <a
                  href="tel:+351233429538"
                  className="hover:text-cyan-400 transition-colors"
                >
                  +351 233 429 538
                </a>
              </div>
              <div className="flex items-start gap-2 text-sky-300 text-sm">
                <Clock className="w-4 h-4 mt-0.5 shrink-0 text-cyan-400" />
                <span>Seg–Sex: 9h–19h<br />Sáb: 9h–13h</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-sky-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sky-400 text-xs text-center sm:text-left">
            © 2024 Dentalkid — Clínica Dentária. Todos os direitos reservados.
            <br className="sm:hidden" />
            {" "}Membro da OMD
          </p>
          <p className="text-sky-500 text-xs flex items-center gap-1">
            Feito com <Heart className="w-3 h-3 text-green-400 fill-green-400" /> para as crianças de Figueira da Foz
          </p>
        </div>
      </div>
    </footer>
  );
}
