"use client";

import { motion } from "framer-motion";
import { Phone, Facebook, Instagram, MessageCircle, Mail, Clock } from "lucide-react";

const contactMethods = [
  {
    icon: Phone,
    title: "Telefone",
    value: "+351 233 000 000",
    sub: "Seg–Dom · 10h–22h",
    href: "tel:+351233000000",
    color: "#2D6A4F",
    bg: "rgba(45,106,79,0.1)",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+351 910 000 000",
    sub: "Resposta rápida garantida",
    href: "https://wa.me/351910000000",
    color: "#25D366",
    bg: "rgba(37,211,102,0.1)",
  },
  {
    icon: Mail,
    title: "Email",
    value: "geral@nalucabedelo.pt",
    sub: "Reservas e eventos privados",
    href: "mailto:geral@nalucabedelo.pt",
    color: "#FF6B35",
    bg: "rgba(255,107,53,0.1)",
  },
  {
    icon: Facebook,
    title: "Facebook",
    value: "NALU Cabedelo",
    sub: "Segue-nos para novidades",
    href: "https://facebook.com",
    color: "#1877F2",
    bg: "rgba(24,119,242,0.1)",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 bg-[#0A1628] overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF6B35]/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[#2D6A4F] text-sm font-bold tracking-[0.3em] uppercase mb-4 block">
            Contacto
          </span>
          <h2
            className="text-4xl md:text-6xl font-black text-white mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Fala
            <br />
            <span className="text-[#2D6A4F]">Connosco</span>
          </h2>
          <p className="text-white/60 text-base max-w-xl mx-auto">
            Para reservas, eventos privados ou simplesmente para dizeres olá.
            Estamos sempre disponíveis.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact methods */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.a
                  key={method.title}
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 p-5 rounded-2xl border border-white/10 transition-all duration-300 hover:border-white/20 group block"
                  style={{ background: method.bg }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${method.color}20` }}
                  >
                    <Icon size={22} style={{ color: method.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-0.5">
                      {method.title}
                    </p>
                    <p
                      className="text-white font-bold text-base group-hover:text-[#FF6B35] transition-colors"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {method.value}
                    </p>
                    <p className="text-white/40 text-xs">{method.sub}</p>
                  </div>
                  <div
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: method.color }}
                  >
                    →
                  </div>
                </motion.a>
              );
            })}
          </motion.div>

          {/* Reservation form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="p-8 rounded-3xl border border-white/10"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,119,182,0.08) 0%, rgba(13,31,60,0.5) 100%)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Clock size={20} className="text-[#FF6B35]" />
              <h3
                className="text-white font-black text-xl"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Fazer Reserva
              </h3>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2 block">
                    Nome
                  </label>
                  <input
                    type="text"
                    placeholder="O teu nome"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#FF6B35]/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2 block">
                    Telemóvel
                  </label>
                  <input
                    type="tel"
                    placeholder="+351 9XX XXX XXX"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#FF6B35]/50 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2 block">
                    Data
                  </label>
                  <input
                    type="date"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF6B35]/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2 block">
                    Pessoas
                  </label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF6B35]/50 transition-colors">
                    <option value="" className="bg-[#0A1628]">Quantas?</option>
                    <option value="1-2" className="bg-[#0A1628]">1-2 pessoas</option>
                    <option value="3-5" className="bg-[#0A1628]">3-5 pessoas</option>
                    <option value="6-10" className="bg-[#0A1628]">6-10 pessoas</option>
                    <option value="10+" className="bg-[#0A1628]">10+ pessoas</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2 block">
                  Notas (opcional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Alergénios, ocasião especial, preferências..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#FF6B35]/50 transition-colors resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-[#FF6B35] hover:bg-[#e55a24] text-white font-bold py-4 rounded-xl transition-colors text-base shadow-[0_0_20px_rgba(255,107,53,0.3)]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Enviar Pedido
              </motion.button>

              <p className="text-white/30 text-xs text-center">
                Responderemos em menos de 2 horas nos horários de funcionamento.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
