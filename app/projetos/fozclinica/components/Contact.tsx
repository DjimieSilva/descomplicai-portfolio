"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Facebook,
  Mail,
  ChevronRight,
} from "lucide-react";

const PHONE = "+351918338954";
const PHONE_DISPLAY = "+351 918 338 954";
const WHATSAPP_URL = `https://wa.me/${PHONE}?text=Olá%2C%20gostaria%20de%20marcar%20uma%20consulta%20na%20Fozclinica.`;

const schedule = [
  { day: "Segunda a Sexta", hours: "09h00 – 19h00" },
  { day: "Sábado", hours: "09h00 – 13h00" },
  { day: "Domingo e Feriados", hours: "Encerrado" },
];

const specialtyContacts = [
  { name: "Medicina Dentária", color: "#0D9488" },
  { name: "Podologia", color: "#6366F1" },
  { name: "Psicologia", color: "#F59E0B" },
  { name: "Reabilitação Física", color: "#FB7185" },
];

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contacto" className="py-24 bg-slate-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-teal-50 text-teal-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-teal-200">
            Contacto
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-slate-800 mb-4"
            style={{ fontFamily: "var(--font-plus-jakarta-sans, sans-serif)" }}
          >
            Estamos aqui para si
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Marque a sua consulta ou esclareça as suas dúvidas. A nossa equipa responde com a máxima brevidade.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Contact cards */}
          <div className="lg:col-span-1 space-y-4">
            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
            >
              <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center mb-4">
                <Phone className="w-5 h-5 text-teal-600" />
              </div>
              <h3 className="font-bold text-slate-800 mb-1" style={{ fontFamily: "var(--font-plus-jakarta-sans, sans-serif)" }}>
                Telefone
              </h3>
              <a
                href={`tel:${PHONE}`}
                className="text-teal-600 font-semibold hover:text-teal-500 transition-colors"
              >
                {PHONE_DISPLAY}
              </a>
              <p className="text-xs text-slate-400 mt-1">Chamada para rede móvel nacional</p>
            </motion.div>

            {/* WhatsApp */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
            >
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                <MessageCircle className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-bold text-slate-800 mb-1" style={{ fontFamily: "var(--font-plus-jakarta-sans, sans-serif)" }}>
                WhatsApp
              </h3>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 font-semibold hover:text-green-500 transition-colors"
              >
                Enviar mensagem
              </a>
              <p className="text-xs text-slate-400 mt-1">Resposta rápida e conveniente</p>
            </motion.div>

            {/* Address */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
            >
              <div className="w-10 h-10 bg-coral-50 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="font-bold text-slate-800 mb-1" style={{ fontFamily: "var(--font-plus-jakarta-sans, sans-serif)" }}>
                Morada
              </h3>
              <p className="text-slate-600 text-sm">
                Rua Bartolomeu Dias 63<br />
                3080 Figueira da Foz
              </p>
              <a
                href="https://maps.google.com/?q=Rua+Bartolomeu+Dias+63,+Figueira+da+Foz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-teal-600 hover:text-teal-500 font-semibold mt-2 inline-flex items-center gap-1 transition-colors"
              >
                Ver no mapa <ChevronRight className="w-3 h-3" />
              </a>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
            >
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
                <Mail className="w-5 h-5 text-indigo-500" />
              </div>
              <h3 className="font-bold text-slate-800 mb-1" style={{ fontFamily: "var(--font-plus-jakarta-sans, sans-serif)" }}>
                Email
              </h3>
              <a
                href="mailto:info@fozclinica.pt"
                className="text-indigo-600 font-semibold hover:text-indigo-500 transition-colors text-sm"
              >
                info@fozclinica.pt
              </a>
              <p className="text-xs text-slate-400 mt-1">Resposta em 24h úteis</p>
            </motion.div>

            {/* Facebook */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
            >
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                <Facebook className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-800 mb-1" style={{ fontFamily: "var(--font-plus-jakarta-sans, sans-serif)" }}>
                Facebook
              </h3>
              <a
                href="https://facebook.com/fozclinica"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-semibold hover:text-blue-500 transition-colors text-sm"
              >
                @fozclinica
              </a>
              <p className="text-xs text-slate-400 mt-1">Siga-nos para novidades</p>
            </motion.div>
          </div>

          {/* Right: Schedule + map + specialty quick links */}
          <div className="lg:col-span-2 space-y-6">
            {/* Schedule */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-teal-600" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg" style={{ fontFamily: "var(--font-plus-jakarta-sans, sans-serif)" }}>
                  Horário de Funcionamento
                </h3>
              </div>
              <div className="space-y-3">
                {schedule.map((s) => (
                  <div key={s.day} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                    <span className="text-sm text-slate-600 font-medium">{s.day}</span>
                    <span
                      className={`text-sm font-semibold ${
                        s.hours === "Encerrado" ? "text-slate-400" : "text-teal-600"
                      }`}
                    >
                      {s.hours}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Book by specialty */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm"
            >
              <h3 className="font-bold text-slate-800 text-lg mb-6" style={{ fontFamily: "var(--font-plus-jakarta-sans, sans-serif)" }}>
                Marcar por especialidade
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {specialtyContacts.map((s) => (
                  <a
                    key={s.name}
                    href={`https://wa.me/351918338954?text=Olá%2C%20gostaria%20de%20marcar%20uma%20consulta%20de%20${encodeURIComponent(s.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: s.color }}
                      />
                      <span className="text-sm font-medium text-slate-700">{s.name}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Map embed placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm"
            >
              <div className="h-64 bg-gradient-to-br from-teal-100 to-cyan-100 flex flex-col items-center justify-center relative">
                <MapPin className="w-10 h-10 text-teal-600 mb-3" />
                <p className="font-bold text-slate-700 text-center" style={{ fontFamily: "var(--font-plus-jakarta-sans, sans-serif)" }}>
                  Rua Bartolomeu Dias 63
                </p>
                <p className="text-slate-500 text-sm">3080 Figueira da Foz</p>
                <a
                  href="https://maps.google.com/?q=Rua+Bartolomeu+Dias+63,+Figueira+da+Foz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  Abrir no Google Maps
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-teal-600 to-teal-500 rounded-3xl p-10 text-center text-white"
        >
          <h3
            className="text-2xl md:text-3xl font-bold mb-3"
            style={{ fontFamily: "var(--font-plus-jakarta-sans, sans-serif)" }}
          >
            Pronto para cuidar da sua saúde?
          </h3>
          <p className="text-teal-100 mb-8 max-w-xl mx-auto">
            A sua primeira consulta é o primeiro passo para uma saúde melhor. Ligue-nos ou envie uma mensagem — estamos aqui para ajudar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${PHONE}`}
              className="flex items-center justify-center gap-2 bg-white text-teal-700 font-semibold px-8 py-4 rounded-full text-sm hover:bg-teal-50 transition-colors hover:shadow-lg"
            >
              <Phone className="w-4 h-4" />
              {PHONE_DISPLAY}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-teal-700/50 hover:bg-teal-700 border border-white/20 text-white font-semibold px-8 py-4 rounded-full text-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Marcar via WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
