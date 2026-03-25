"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Mail, Calendar, ArrowRight } from "lucide-react";

const hours = [
  { day: "Segunda a Sexta", time: "08:30 – 20:00" },
  { day: "Sábado", time: "09:00 – 13:00" },
  { day: "Domingo e Feriados", time: "Fechado" },
];

export function Contact() {
  return (
    <section id="contacto" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-[#B8860B] text-xs tracking-[0.3em] uppercase font-semibold mb-3">
            Localização e Contactos
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="text-[#1E3A5F] font-bold text-4xl lg:text-5xl leading-tight"
              style={{ fontFamily: "Epilogue, sans-serif" }}
            >
              Estamos Prontos
              <br />
              para o Receber
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed max-w-md">
              Marque a sua consulta por telefone ou passe pelas nossas instalações. A nossa equipa recepciona-o com a atenção que merece.
            </p>
          </div>
          <div className="mt-8 h-px bg-gradient-to-r from-[#B8860B]/50 via-[#B8860B]/15 to-transparent" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: contact info */}
          <div className="space-y-8">
            {/* Phone CTA — primary */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#1E3A5F] p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B8860B] to-transparent" />
              <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-[#B8860B]/8 blur-[50px]" />

              <div className="relative">
                <p className="text-[#B8860B] text-xs tracking-[0.2em] uppercase font-semibold mb-3">
                  Marcações e Informações
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[#B8860B]/20 border border-[#B8860B]/40 flex items-center justify-center">
                    <Phone size={22} className="text-[#B8860B]" />
                  </div>
                  <div>
                    <a
                      href="tel:+351233403600"
                      className="text-white font-bold text-3xl hover:text-[#B8860B] transition-colors duration-200"
                      style={{ fontFamily: "Epilogue, sans-serif" }}
                    >
                      233 403 600
                    </a>
                    <p className="text-white/50 text-sm">Chamada para rede fixa nacional</p>
                  </div>
                </div>
                <a
                  href="tel:+351233403600"
                  className="inline-flex items-center gap-2 bg-[#B8860B] hover:bg-[#a07609] text-white px-6 py-3 font-bold text-sm tracking-widest uppercase transition-all duration-300"
                >
                  <Calendar size={15} />
                  Marcar Consulta
                  <ArrowRight size={15} />
                </a>
              </div>
            </motion.div>

            {/* Address */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex gap-5 p-6 border border-[#E2E8F0] hover:border-[#1E3A5F]/20 transition-colors duration-300"
            >
              <div className="w-12 h-12 bg-[#1E3A5F]/6 border border-[#1E3A5F]/12 flex items-center justify-center flex-shrink-0">
                <MapPin size={20} className="text-[#1E3A5F]" />
              </div>
              <div>
                <h3
                  className="text-[#1E3A5F] font-bold text-base mb-1"
                  style={{ fontFamily: "Epilogue, sans-serif" }}
                >
                  Morada
                </h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed">
                  Rua Miguel Bombarda 66<br />
                  3080 — Figueira da Foz<br />
                  Portugal
                </p>
                <a
                  href="https://maps.google.com/?q=Rua+Miguel+Bombarda+66+Figueira+da+Foz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#B8860B] text-xs font-semibold tracking-wide mt-2 hover:underline"
                >
                  Ver no Google Maps
                  <ArrowRight size={11} />
                </a>
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 border border-[#E2E8F0] hover:border-[#1E3A5F]/20 transition-colors duration-300"
            >
              <div className="flex gap-5 mb-5">
                <div className="w-12 h-12 bg-[#1E3A5F]/6 border border-[#1E3A5F]/12 flex items-center justify-center flex-shrink-0">
                  <Clock size={20} className="text-[#1E3A5F]" />
                </div>
                <div>
                  <h3
                    className="text-[#1E3A5F] font-bold text-base"
                    style={{ fontFamily: "Epilogue, sans-serif" }}
                  >
                    Horário de Funcionamento
                  </h3>
                  <p className="text-[#94A3B8] text-xs">Horário alargado para a sua comodidade</p>
                </div>
              </div>
              <div className="space-y-2">
                {hours.map((h) => (
                  <div key={h.day} className="flex items-center justify-between py-2 border-b border-[#F1F5F9] last:border-0">
                    <span className="text-[#1E3A5F]/70 text-sm">{h.day}</span>
                    <span
                      className={`text-sm font-semibold ${
                        h.day === "Domingo e Feriados"
                          ? "text-[#94A3B8]"
                          : "text-[#1E3A5F]"
                      }`}
                      style={{ fontFamily: "Epilogue, sans-serif" }}
                    >
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex gap-5 p-6 border border-[#E2E8F0] hover:border-[#1E3A5F]/20 transition-colors duration-300"
            >
              <div className="w-12 h-12 bg-[#1E3A5F]/6 border border-[#1E3A5F]/12 flex items-center justify-center flex-shrink-0">
                <Mail size={20} className="text-[#1E3A5F]" />
              </div>
              <div>
                <h3
                  className="text-[#1E3A5F] font-bold text-base mb-1"
                  style={{ fontFamily: "Epilogue, sans-serif" }}
                >
                  Email
                </h3>
                <a
                  href="mailto:geral@albasaudedentaria.pt"
                  className="text-[#94A3B8] text-sm hover:text-[#B8860B] transition-colors duration-200"
                >
                  geral@albasaudedentaria.pt
                </a>
                <p className="text-[#94A3B8] text-xs mt-1">
                  Resposta em 24 horas úteis (preferir telefone para urgências)
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right: map embed placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Map area */}
            <div className="relative h-[460px] bg-[#F1F5F9] border border-[#E2E8F0] overflow-hidden">
              <iframe
                title="Localização Alba Saúde Dentária"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3030.0!2d-8.857!3d40.151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sRua%20Miguel%20Bombarda%2066%2C%20Figueira%20da%20Foz!5e0!3m2!1spt!2spt!4v1700000000000!5m2!1spt!2spt"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(20%) contrast(1.1)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Overlay card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm border border-[#E2E8F0] p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#1E3A5F] flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-[#B8860B]" />
                  </div>
                  <div>
                    <div
                      className="text-[#1E3A5F] font-bold text-sm"
                      style={{ fontFamily: "Epilogue, sans-serif" }}
                    >
                      Alba Saúde Dentária
                    </div>
                    <div className="text-[#94A3B8] text-xs">
                      Rua Miguel Bombarda 66, Figueira da Foz
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Urgency note */}
            <div className="mt-5 p-5 bg-[#1E3A5F]/5 border border-[#1E3A5F]/12">
              <p className="text-[#1E3A5F] font-semibold text-sm mb-1" style={{ fontFamily: "Epilogue, sans-serif" }}>
                Urgência Dentária?
              </p>
              <p className="text-[#94A3B8] text-xs leading-relaxed mb-3">
                Para situações de dor aguda, traumatismo ou infeção, ligue diretamente. A nossa equipa dará prioridade ao seu atendimento.
              </p>
              <a
                href="tel:+351233403600"
                className="inline-flex items-center gap-2 text-[#B8860B] font-bold text-sm hover:underline"
              >
                <Phone size={14} />
                233 403 600
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
