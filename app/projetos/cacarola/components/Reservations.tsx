"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, MessageCircle, Users, Calendar } from "lucide-react";

const restaurants = [
  { id: "cacola-1", name: "Caçarola (Original)", phone: "+351 233 424 861" },
  { id: "cacola-2", name: "Caçarola Dois", phone: "+351 233 426 930" },
];

export default function Reservations() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selectedRestaurant, setSelectedRestaurant] = useState("cacola-1");

  const selected = restaurants.find((r) => r.id === selectedRestaurant)!;

  return (
    <section
      id="reservas"
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: "#FFFBEB" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.04]">
        <svg viewBox="0 0 800 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="reserve-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect x="5" y="5" width="90" height="90" fill="none" stroke="#7C2D12" strokeWidth="1" />
              <circle cx="50" cy="50" r="20" fill="none" stroke="#7C2D12" strokeWidth="0.8" />
              <path d="M50 25 L50 75 M25 50 L75 50" stroke="#7C2D12" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#reserve-pattern)" />
        </svg>
      </div>

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p
            className="text-xs tracking-[0.45em] uppercase mb-4"
            style={{ color: "#C2410C", fontFamily: "var(--font-inter)" }}
          >
            Reservas
          </p>
          <h2
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: "var(--font-source-serif-4)", color: "#7C2D12" }}
          >
            Reserve a Sua Mesa
          </h2>
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: "#78350F", fontFamily: "var(--font-inter)" }}
          >
            Para garantir a melhor experiência, recomendamos reserva prévia.
            Aceitamos grupos e ocasiões especiais em ambos os espaços.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left: contact options */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Restaurant selector */}
            <p
              className="text-xs tracking-[0.3em] uppercase font-semibold mb-3"
              style={{ color: "#C2410C", fontFamily: "var(--font-inter)" }}
            >
              Escolha o Espaço
            </p>
            <div className="flex gap-3 mb-8">
              {restaurants.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRestaurant(r.id)}
                  className="flex-1 py-3 px-4 text-sm font-medium transition-all duration-200"
                  style={{
                    background: selectedRestaurant === r.id ? "#C2410C" : "transparent",
                    color: selectedRestaurant === r.id ? "#FFFBEB" : "#92400E",
                    border: "1.5px solid",
                    borderColor: selectedRestaurant === r.id ? "#C2410C" : "rgba(146,64,14,0.3)",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  {r.name}
                </button>
              ))}
            </div>

            {/* Contact methods */}
            <div className="space-y-4">
              {[
                {
                  icon: Phone,
                  label: "Telefone",
                  value: selected.phone,
                  sub: "Seg – Dom · 10h00 – 22h00",
                  href: `tel:${selected.phone.replace(/\s/g, "")}`,
                },
                {
                  icon: Mail,
                  label: "E-mail",
                  value: "geral@cacarola1.com",
                  sub: "Resposta em menos de 24 horas",
                  href: "mailto:geral@cacarola1.com",
                },
                {
                  icon: MessageCircle,
                  label: "WhatsApp",
                  value: selected.phone,
                  sub: "Mensagem direta — resposta rápida",
                  href: `https://wa.me/${selected.phone.replace(/[+\s]/g, "")}`,
                },
              ].map((contact) => {
                const Icon = contact.icon;
                return (
                  <a
                    key={contact.label}
                    href={contact.href}
                    className="flex items-start gap-4 p-4 group transition-all duration-200 hover:scale-[1.01]"
                    style={{
                      background: "#FEF3C7",
                      border: "1px solid rgba(194,65,12,0.15)",
                    }}
                  >
                    <div
                      className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(194,65,12,0.1)" }}
                    >
                      <Icon size={18} style={{ color: "#C2410C" }} />
                    </div>
                    <div>
                      <p
                        className="text-xs tracking-wider uppercase font-semibold mb-0.5"
                        style={{ color: "#C2410C", fontFamily: "var(--font-inter)" }}
                      >
                        {contact.label}
                      </p>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "#7C2D12", fontFamily: "var(--font-inter)" }}
                      >
                        {contact.value}
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "#92400E", fontFamily: "var(--font-inter)" }}
                      >
                        {contact.sub}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Right: info panels */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-5"
          >
            {/* Groups & events */}
            <div
              className="p-6"
              style={{
                background: "linear-gradient(135deg, #7C2D12, #C2410C)",
                color: "#FFFBEB",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Users size={20} style={{ color: "#FDE68A" }} />
                <h4
                  className="text-base font-bold"
                  style={{ fontFamily: "var(--font-source-serif-4)", color: "#FFFBEB" }}
                >
                  Grupos e Eventos
                </h4>
              </div>
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: "rgba(255,251,235,0.85)", fontFamily: "var(--font-inter)" }}
              >
                Para grupos de 10 ou mais pessoas, entre em contacto direto para
                definir ementa, horário e condições especiais. O Caçarola Dois
                dispõe de sala privada para eventos até 60 pessoas.
              </p>
              <a
                href="mailto:geral@cacarola1.com"
                className="text-xs tracking-widest uppercase font-semibold underline"
                style={{ color: "#FDE68A", fontFamily: "var(--font-inter)" }}
              >
                geral@cacarola1.com
              </a>
            </div>

            {/* Booking tips */}
            <div
              className="p-6"
              style={{
                background: "#FEF3C7",
                border: "1px solid rgba(194,65,12,0.2)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Calendar size={18} style={{ color: "#C2410C" }} />
                <h4
                  className="text-sm font-bold tracking-wide uppercase"
                  style={{ color: "#C2410C", fontFamily: "var(--font-inter)" }}
                >
                  A Saber
                </h4>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Reservas disponíveis com até 30 dias de antecedência",
                  "Ao fim de semana recomendamos reservar com 3-4 dias",
                  "Para almoços de 2ª a 6ª, aceitamos reservas no próprio dia",
                  "Confirmação por telefone ou e-mail no prazo de 24h",
                  "Cancelamentos aceites até 2 horas antes da reserva",
                ].map((tip, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: "#78350F", fontFamily: "var(--font-inter)" }}
                  >
                    <span
                      className="flex-shrink-0 w-4 h-4 mt-0.5 flex items-center justify-center text-xs font-bold"
                      style={{ color: "#C2410C" }}
                    >
                      ·
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
