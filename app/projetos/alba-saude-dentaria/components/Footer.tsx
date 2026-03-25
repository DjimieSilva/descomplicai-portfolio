"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Mail, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0e1f35] text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-5">
                <h3
                  className="text-white font-bold text-2xl leading-tight mb-1"
                  style={{ fontFamily: "Epilogue, sans-serif" }}
                >
                  Alba Saúde Dentária
                </h3>
                <p className="text-[#B8860B] text-xs tracking-[0.2em] uppercase font-semibold">
                  Centro de Saúde Dentária com Bloco Operatório
                </p>
              </div>

              <div className="h-px bg-gradient-to-r from-[#B8860B]/40 to-transparent mb-5" />

              <p className="text-white/50 text-sm leading-relaxed max-w-sm mb-6">
                O maior e mais completo centro de medicina dentária da Figueira da Foz. 6+ médicos especialistas, bloco operatório certificado e acordos com os principais subsistemas de saúde.
              </p>

              {/* Contact block */}
              <div className="space-y-3">
                <a href="tel:+351233403600" className="flex items-center gap-3 text-white/70 hover:text-[#B8860B] transition-colors duration-200 text-sm">
                  <Phone size={14} className="text-[#B8860B] flex-shrink-0" />
                  233 403 600
                </a>
                <div className="flex items-start gap-3 text-white/70 text-sm">
                  <MapPin size={14} className="text-[#B8860B] flex-shrink-0 mt-0.5" />
                  Rua Miguel Bombarda 66, Figueira da Foz
                </div>
                <a href="mailto:geral@albasaudedentaria.pt" className="flex items-center gap-3 text-white/70 hover:text-[#B8860B] transition-colors duration-200 text-sm">
                  <Mail size={14} className="text-[#B8860B] flex-shrink-0" />
                  geral@albasaudedentaria.pt
                </a>
              </div>
            </motion.div>
          </div>

          {/* Especialidades */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4
                className="text-white font-bold text-sm tracking-[0.12em] uppercase mb-5"
                style={{ fontFamily: "Epilogue, sans-serif" }}
              >
                Especialidades
              </h4>
              <ul className="space-y-2.5">
                {[
                  "Implantologia",
                  "Cirurgia Oral",
                  "Ortodontia",
                  "Periodontologia",
                  "Estética Dentária",
                  "Odontopediatria",
                  "Endodontia",
                  "Prótese Dentária",
                ].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection("servicos")}
                      className="text-white/50 hover:text-white/80 text-sm transition-colors duration-200 text-left flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#B8860B]/50 flex-shrink-0" />
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Informações */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4
                className="text-white font-bold text-sm tracking-[0.12em] uppercase mb-5"
                style={{ fontFamily: "Epilogue, sans-serif" }}
              >
                Informações
              </h4>
              <ul className="space-y-2.5 mb-8">
                {[
                  { label: "Sobre a Clínica", id: "sobre" },
                  { label: "A Nossa Equipa", id: "equipa" },
                  { label: "Tecnologia", id: "tecnologia" },
                  { label: "Convenções e Seguros", id: "seguros" },
                  { label: "FAQ", id: "faq" },
                  { label: "Contactos", id: "contacto" },
                ].map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="text-white/50 hover:text-white/80 text-sm transition-colors duration-200 text-left flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#B8860B]/50 flex-shrink-0" />
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Hours summary */}
              <div className="border-t border-white/10 pt-5">
                <p className="text-white/30 text-xs tracking-[0.15em] uppercase mb-3">Horário</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/50">Seg – Sex</span>
                    <span className="text-white/70 font-semibold">08:30 – 20:00</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-white/50">Sábado</span>
                    <span className="text-white/70 font-semibold">09:00 – 13:00</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs text-center sm:text-left">
            © 2025 Alba Saúde Dentária. Todos os direitos reservados.
            {" "}·{" "}
            <span className="text-white/20">Rua Miguel Bombarda 66, Figueira da Foz</span>
          </p>

          <div className="flex items-center gap-4">
            <span className="text-white/20 text-xs">OMD • Ordem dos Médicos Dentistas</span>
            <button
              onClick={scrollToTop}
              className="w-9 h-9 border border-white/15 hover:border-[#B8860B]/50 hover:bg-[#B8860B]/10 flex items-center justify-center transition-all duration-300 group"
              aria-label="Voltar ao topo"
            >
              <ArrowUp size={14} className="text-white/40 group-hover:text-[#B8860B] transition-colors duration-300" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
