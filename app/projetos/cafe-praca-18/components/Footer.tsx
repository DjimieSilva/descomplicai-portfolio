"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Coffee, Instagram, Facebook, MapPin, Clock, Phone } from "lucide-react";

const quickLinks = [
  { label: "Sobre Nós", href: "#about" },
  { label: "Ementa", href: "#menu" },
  { label: "Especialidades", href: "#specialties" },
  { label: "Esplanada", href: "#terrace" },
  { label: "Avaliações", href: "#reviews" },
  { label: "Localização", href: "#location" },
];

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
];

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <footer
      ref={ref}
      style={{ backgroundColor: "#2A0E10", color: "#E8D5B7" }}
    >
      {/* Top section */}
      <div className="px-6 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="md:col-span-2"
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-sm flex items-center justify-center"
                  style={{ backgroundColor: "rgba(181,166,66,0.15)" }}
                >
                  <Coffee className="w-5 h-5" style={{ color: "#B5A642" }} />
                </div>
                <div>
                  <div
                    className="text-lg font-bold leading-tight"
                    style={{
                      fontFamily: "var(--font-domine), serif",
                      color: "#E8D5B7",
                    }}
                  >
                    Café Praça 18
                  </div>
                  <div
                    className="text-xs tracking-widest uppercase"
                    style={{ color: "rgba(181,166,66,0.6)" }}
                  >
                    Figueira da Foz
                  </div>
                </div>
              </div>

              <p
                className="text-sm leading-relaxed mb-6 max-w-sm"
                style={{ color: "rgba(232,213,183,0.55)" }}
              >
                O coração da Figueira da Foz. Avaliado 9.6/10 pelos nossos
                clientes. Pequenos-almoços, almoços e momentos de café para toda
                a gente.
              </p>

              {/* Social */}
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-9 h-9 flex items-center justify-center rounded-sm transition-all duration-200 hover:brightness-125"
                      style={{
                        backgroundColor: "rgba(181,166,66,0.12)",
                        color: "#B5A642",
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </motion.div>

            {/* Quick links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h4
                className="text-xs font-semibold tracking-widest uppercase mb-5"
                style={{ color: "rgba(181,166,66,0.6)" }}
              >
                Navegação
              </h4>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors duration-200 hover:text-amber-300"
                      style={{ color: "rgba(232,213,183,0.6)" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <h4
                className="text-xs font-semibold tracking-widest uppercase mb-5"
                style={{ color: "rgba(181,166,66,0.6)" }}
              >
                Contacto
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                    style={{ color: "#B5A642" }}
                  />
                  <div>
                    <div
                      className="text-sm"
                      style={{ color: "rgba(232,213,183,0.7)" }}
                    >
                      Praça General Freire de Andrade 18
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "rgba(232,213,183,0.4)" }}
                    >
                      3080-058 Figueira da Foz
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: "#B5A642" }}
                  />
                  <span
                    className="text-sm"
                    style={{ color: "rgba(232,213,183,0.7)" }}
                  >
                    +351 914 418 757
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                    style={{ color: "#B5A642" }}
                  />
                  <div>
                    <div
                      className="text-sm"
                      style={{ color: "rgba(232,213,183,0.7)" }}
                    >
                      Seg–Sex: 07:30–19:00
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "rgba(232,213,183,0.4)" }}
                    >
                      Sáb–Dom: 08:00–20:00 / 15:00
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        className="mx-6 md:mx-auto md:max-w-6xl h-px"
        style={{ backgroundColor: "rgba(181,166,66,0.1)" }}
      />

      {/* Bottom bar */}
      <div className="px-6 py-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-center md:text-left"
            style={{ color: "rgba(232,213,183,0.3)" }}
          >
            © {new Date().getFullYear()} Café Praça 18. Todos os direitos reservados.
          </p>
          <p className="text-xs" style={{ color: "rgba(232,213,183,0.2)" }}>
            Website por{" "}
            <a
              href="https://descomplicai.pt"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-300 transition-colors"
              style={{ color: "rgba(181,166,66,0.4)" }}
            >
              Descomplicai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
