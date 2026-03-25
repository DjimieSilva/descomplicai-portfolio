"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Facebook, Heart } from "lucide-react";

const navLinks = [
  { label: "Sobre Nós", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Porquê Nós", href: "#porquenos" },
  { label: "Equipa", href: "#equipa" },
  { label: "Testemunhos", href: "#testemunhos" },
  { label: "Localização", href: "#localizacao" },
  { label: "Contacto", href: "#contacto" },
];

export default function Footer() {
  return (
    <footer className="bg-[#3D2B1F] text-white" aria-label="Rodapé">
      {/* Top CTA band */}
      <div className="bg-[#C2703B]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p
              className="text-xl font-extrabold text-white leading-snug"
              style={{ fontFamily: "'Nunito Sans', sans-serif" }}
            >
              Pronto para cuidar do seu sorriso?
            </p>
            <p className="text-white/80 text-sm mt-0.5">
              Ligue-nos e marque a sua consulta hoje mesmo.
            </p>
          </div>
          <a
            href="tel:934868049"
            className="flex items-center gap-2 bg-white text-[#C2703B] font-bold px-7 py-3.5 rounded-2xl hover:bg-[#FFF0E0] transition-colors shrink-0 shadow-md"
          >
            <Phone className="w-4 h-4" />
            934 868 049
          </a>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              {/* Logo mark */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#C2703B] flex items-center justify-center">
                  <svg viewBox="0 0 32 32" className="w-6 h-6" aria-hidden="true">
                    <path
                      d="M8,8 C6,8 4,10 4,13 C4,16 5,19 7,22 C8,24 9,26 11,26 C12,26 13,24 13.5,22 C14,20 14,18 16,18 C18,18 18,20 18.5,22 C19,24 20,26 21,26 C23,26 24,24 25,22 C27,19 28,16 28,13 C28,10 26,8 24,8 C22,8 21,9 19.5,9 C18,9 17,8 16,8 C15,8 14,9 12.5,9 C11,9 10,8 8,8 Z"
                      fill="white"
                      fillOpacity="0.9"
                    />
                  </svg>
                </div>
                <div>
                  <div
                    className="font-extrabold text-white text-sm leading-none"
                    style={{ fontFamily: "'Nunito Sans', sans-serif" }}
                  >
                    Clínica Médico Dentária
                  </div>
                  <div className="text-[#C2703B] text-xs font-bold leading-none mt-0.5">
                    de Quiaios
                  </div>
                </div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              A clínica dentária da comunidade de Quiaios. Tratamos de si
              como família, com qualidade, proximidade e cuidado pessoal.
            </p>
            <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
              <MapPin className="w-4 h-4 text-[#C2703B] shrink-0" />
              <span>Largo de S. Sebastião, Quiaios</span>
            </div>
            <div className="flex items-center gap-2 text-white/60 text-sm mb-5">
              <Phone className="w-4 h-4 text-[#C2703B] shrink-0" />
              <a href="tel:934868049" className="hover:text-white transition-colors">
                934 868 049
              </a>
            </div>

            {/* Social */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
              aria-label="Siga-nos no Facebook"
            >
              <Facebook className="w-4 h-4" />
              <span>Facebook</span>
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h3
              className="font-bold text-white text-sm uppercase tracking-wider mb-4"
              style={{ fontFamily: "'Nunito Sans', sans-serif" }}
            >
              Navegação
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3
              className="font-bold text-white text-sm uppercase tracking-wider mb-4"
              style={{ fontFamily: "'Nunito Sans', sans-serif" }}
            >
              Horário
            </h3>
            <div className="space-y-2.5">
              {[
                { days: "Segunda–Sexta", hours: "09h00–19h00" },
                { days: "Sábado", hours: "09h00–13h00" },
                { days: "Domingo", hours: "Encerrado" },
                { days: "Feriados", hours: "Encerrado" },
              ].map((s, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">{s.days}</span>
                  <span
                    className={`text-sm font-semibold ${
                      s.hours === "Encerrado" ? "text-white/30" : "text-white"
                    }`}
                  >
                    {s.hours}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-[#C2703B]/15 border border-[#C2703B]/30 rounded-xl p-4">
              <p className="text-sm text-white/80 leading-relaxed">
                <span className="font-bold text-[#C2703B]">Urgências:</span>{" "}
                Em caso de urgência dentária, ligue para{" "}
                <a
                  href="tel:934868049"
                  className="font-bold text-white hover:text-[#C2703B] transition-colors"
                >
                  934 868 049
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            © 2025 Clínica Médico Dentária de Quiaios. Todos os direitos
            reservados.
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-white/40 text-xs flex items-center gap-1"
          >
            Feito com{" "}
            <Heart className="w-3 h-3 text-[#C2703B] inline" />{" "}
            por{" "}
            <a
              href="/"
              className="text-[#C2703B] hover:text-white transition-colors font-medium"
            >
              Descomplicai
            </a>
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
