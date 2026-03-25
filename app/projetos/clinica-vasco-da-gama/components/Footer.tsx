"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, MapPin, Facebook, ArrowUp } from "lucide-react";

const services = [
  "Implantologia",
  "Ortodontia",
  "Branqueamento Dentário",
  "Próteses Dentárias",
  "Endodontia",
  "Cirurgia Oral",
  "Estética Facial",
  "Higiene Oral",
];

const quickLinks = [
  ["Sobre Nós", "sobre"],
  ["Serviços", "servicos"],
  ["A Nossa Equipa", "equipa"],
  ["Testemunhos", "testemunhos"],
  ["FAQ", "faq"],
  ["Contacto", "contacto"],
];

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer ref={ref} className="bg-[#060e1c] border-t border-white/5">
      {/* Top footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="font-serif text-white text-2xl font-bold">Clínica Vasco da Gama</div>
              <div className="text-[#C8A55A] text-[10px] tracking-[0.3em] uppercase mt-1">
                Medicina Dentária
              </div>
            </div>

            <div className="w-10 h-[1px] bg-[#C8A55A]/50 mb-6" />

            <p className="text-white/45 text-sm leading-relaxed mb-6">
              Referência em medicina dentária premium na Figueira da Foz desde 2003. Laboratório de
              próteses próprio, tecnologia avançada e uma equipa ao serviço do seu sorriso.
            </p>

            <div className="space-y-3">
              <a
                href="tel:+351233433720"
                className="flex items-center gap-2 text-white/60 hover:text-[#C8A55A] text-sm transition-colors group"
              >
                <Phone size={14} className="text-[#C8A55A]" />
                +351 233 433 720
              </a>
              <div className="flex items-start gap-2 text-white/60 text-sm">
                <MapPin size={14} className="text-[#C8A55A] shrink-0 mt-0.5" />
                <span>R. Vasco da Gama 93<br />3080-001 Figueira da Foz</span>
              </div>
            </div>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-white/40 hover:text-[#1877F2] text-sm transition-colors group"
            >
              <Facebook size={18} />
              <span>Facebook</span>
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-[#C8A55A]" />
              Navegação
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(([label, id]) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="text-white/50 hover:text-[#C8A55A] text-sm transition-colors duration-200 text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-[#C8A55A]" />
              Serviços
            </h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollTo("servicos")}
                    className="text-white/50 hover:text-[#C8A55A] text-sm transition-colors duration-200 text-left"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours + CTA */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-[#C8A55A]" />
              Horário
            </h4>
            <div className="space-y-2 mb-8">
              {[
                ["Segunda a Sexta", "09:00 – 19:00"],
                ["Sábado", "09:00 – 13:00"],
                ["Domingo", "Encerrado"],
              ].map(([day, time]) => (
                <div key={day} className="flex justify-between gap-4 text-sm">
                  <span className="text-white/50">{day}</span>
                  <span className={time === "Encerrado" ? "text-white/25" : "text-white/70"}>{time}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollTo("contacto")}
              className="w-full bg-[#C8A55A] hover:bg-[#b8924a] text-[#0A1628] py-3 text-xs font-bold tracking-widest uppercase transition-all duration-300"
            >
              Marcar Consulta
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white/30 text-xs text-center md:text-left">
            © {new Date().getFullYear()} Clínica Vasco da Gama. Todos os direitos reservados.
            <span className="mx-2">·</span>
            <span>Membro da Ordem dos Médicos Dentistas</span>
          </div>

          <div className="flex items-center gap-6 text-white/30 text-xs">
            <span className="cursor-pointer hover:text-[#C8A55A] transition-colors">Política de Privacidade</span>
            <span className="cursor-pointer hover:text-[#C8A55A] transition-colors">Política de Cookies</span>
            <span className="cursor-pointer hover:text-[#C8A55A] transition-colors">Livro de Reclamações</span>
          </div>

          <button
            onClick={scrollToTop}
            className="w-9 h-9 border border-white/15 hover:border-[#C8A55A] flex items-center justify-center text-white/40 hover:text-[#C8A55A] transition-all duration-200"
            aria-label="Voltar ao topo"
          >
            <ArrowUp size={14} />
          </button>
        </div>

        {/* Built by Descomplicai */}
        <div className="border-t border-white/5 py-3 text-center">
          <p className="text-white/20 text-[10px] tracking-widest uppercase">
            Website desenvolvido por{" "}
            <a href="/" className="text-[#C8A55A]/50 hover:text-[#C8A55A] transition-colors">
              Descomplicai
            </a>{" "}
            · Web Agency
          </p>
        </div>
      </div>
    </footer>
  );
}
