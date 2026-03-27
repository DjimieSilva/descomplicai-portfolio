"use client";

import { Leaf, Phone, Mail, MessageCircle, Clock } from "lucide-react";

const services = [
  "Manutenção de Jardins",
  "Corte de Relva e Sebes",
  "Sistemas de Rega",
  "Poda de Árvores",
  "Limpeza de Terrenos",
  "Plantação e Design",
];

const areas = [
  "Faro",
  "Albufeira",
  "Loulé",
  "Lagos",
  "Portimão",
  "Tavira",
  "Olhão",
  "Vilamoura",
  "Quarteira",
  "Silves",
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#15803D" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-6 w-6 text-white" />
              <span
                className="text-xl font-bold text-white"
                style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
              >
                JardimAlgarvio
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              Serviço profissional de jardinagem e manutenção de espaços verdes em todo o Algarve.
              Mais de 15 anos de experiência a cuidar dos jardins da região.
            </p>
            <p className="mt-4 text-xs text-white/50">NIF: 500 000 000</p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wide">
              Serviços
            </h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <a
                    href="#servicos"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wide">
              Áreas
            </h4>
            <ul className="space-y-2.5">
              {areas.map((a) => (
                <li key={a}>
                  <a
                    href="#areas"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {a}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wide">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-white/60" />
                <a href="tel:+351912345678" className="text-sm text-white/70 hover:text-white transition-colors">
                  +351 912 345 678
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-white/60" />
                <a href="mailto:info@jardimalgarvio.pt" className="text-sm text-white/70 hover:text-white transition-colors">
                  info@jardimalgarvio.pt
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-white/60" />
                <a
                  href="https://wa.me/351912345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-white/60" />
                <span className="text-sm text-white/70">Seg-Sex 8h-18h, Sáb 8h-13h</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} JardimAlgarvio. Todos os direitos reservados.
          </p>
          <p className="text-xs text-white/50">
            Desenvolvido por{" "}
            <a
              href="https://descomplicai.pt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white underline transition-colors"
            >
              Descomplicai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
