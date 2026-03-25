"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Facebook, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0A1A4A] text-[#BFDBFE]">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <span className="text-[#1E40AF] font-bold text-sm font-[family-name:var(--font-sora)]">CT</span>
              </div>
              <div>
                <p className="text-white font-bold font-[family-name:var(--font-sora)]">Clínica Dentária Tamargueira</p>
                <p className="text-[#93C5FD] text-xs">Especialistas em Implantologia</p>
              </div>
            </div>
            <p className="text-[#93C5FD] text-sm leading-relaxed mb-6 max-w-sm">
              Especialistas em Implantologia e Reabilitação Oral em Figueira da Foz.
              Mais de 15 anos a transformar sorrisos com tecnologia, experiência e cuidado humano.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook da Clínica Dentária Tamargueira"
                className="w-9 h-9 bg-[#1E40AF]/50 rounded-lg flex items-center justify-center hover:bg-[#1877F2] transition-colors duration-200"
              >
                <Facebook className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold font-[family-name:var(--font-sora)] mb-4 text-sm uppercase tracking-wider">
              Tratamentos
            </h4>
            <ul className="space-y-2.5">
              {[
                "Implante Unitário",
                "Implantes Múltiplos",
                "All-on-4 / All-on-6",
                "Reabilitação Oral",
                "Estética Dentária",
                "Manutenção de Implantes",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#serviços"
                    className="text-[#93C5FD] hover:text-white text-sm transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-white font-semibold font-[family-name:var(--font-sora)] mb-4 text-sm uppercase tracking-wider">
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#60A5FA] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#93C5FD] text-sm">Rua da Tamargueira</p>
                  <p className="text-[#93C5FD] text-sm">Figueira da Foz</p>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#60A5FA] flex-shrink-0" />
                <a href="tel:+351239000000" className="text-[#93C5FD] hover:text-white text-sm transition-colors duration-200">
                  +351 239 000 000
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <a
                href="#contacto"
                className="inline-block bg-[#1E40AF] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1D4ED8] transition-colors duration-200 font-[family-name:var(--font-sora)]"
              >
                Marcar Consulta
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1E40AF]/40 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#4B6FA8] text-sm">
            © {new Date().getFullYear()} Clínica Dentária Tamargueira — Todos os direitos reservados.
          </p>
          <p className="text-[#4B6FA8] text-xs flex items-center gap-1">
            Website desenvolvido com{" "}
            <Heart className="w-3 h-3 text-[#60A5FA]" fill="#60A5FA" />{" "}
            pela{" "}
            <a
              href="/"
              className="text-[#60A5FA] hover:text-white transition-colors duration-200"
            >
              Descomplicai
            </a>
          </p>
        </div>

        {/* OMD Disclaimer */}
        <div className="mt-6 border-t border-[#1E3A7A]/30 pt-6">
          <p className="text-[#4B6FA8] text-xs leading-relaxed max-w-3xl">
            <strong className="text-[#6B8EC6]">Aviso Legal:</strong> As informações presentes neste website têm carácter informativo e não substituem uma consulta médica presencial. Os resultados dos tratamentos podem variar. Todos os médicos são registados na Ordem dos Médicos Dentistas de Portugal.
          </p>
        </div>
      </div>
    </footer>
  );
}
