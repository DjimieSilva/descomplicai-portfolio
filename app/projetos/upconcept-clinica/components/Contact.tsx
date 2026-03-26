"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Facebook,
  Send,
  CheckCircle,
} from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    label: "Telefone",
    value: "+351 233 109 109",
    href: "tel:+351233109109",
    color: "#2563EB",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+351 233 109 109",
    href: "https://wa.me/351233109109?text=Olá,%20gostaria%20de%20marcar%20uma%20consulta%20na%20Upconcept.",
    color: "#22c55e",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "geral@upconcept.pt",
    href: "mailto:geral@upconcept.pt",
    color: "#06B6D4",
  },
  {
    icon: MapPin,
    label: "Morada",
    value: "Lugar 4 Caminhos, Loja 1, C.C. E.Leclerc, Figueira da Foz",
    href: "https://maps.google.com/?q=Lugar+4+Caminhos+Centro+Comercial+Leclerc+Figueira+da+Foz",
    color: "#2563EB",
  },
  {
    icon: Facebook,
    label: "Facebook",
    value: "Upconcept — Clínica Médica e Dentária",
    href: "https://facebook.com/upconcept",
    color: "#1877F2",
  },
  {
    icon: Clock,
    label: "Horário",
    value: "Abertos 7 dias / semana — incluindo feriados",
    href: "#horarios",
    color: "#06B6D4",
  },
];

const services_list = [
  "Medicina Dentária Geral",
  "Implantes Dentários",
  "Ortodontia",
  "Estética Dentária",
  "Cirurgia Oral",
  "Endodontia",
  "Periodontia",
  "Prótese Dentária",
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selectedService, setSelectedService] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Static site — simulate submission
    setSubmitted(true);
  };

  return (
    <section id="contacto" ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#0D1421]">
        <motion.div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #2563EB 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full opacity-08"
          style={{ background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 13, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-[#2563EB]/40 bg-[#2563EB]/10"
          >
            <Send className="w-4 h-4 text-[#2563EB]" />
            <span className="text-sm font-medium text-[#2563EB] font-[family-name:var(--font-inter-uc)]">
              Contacte-nos
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] text-white mb-4"
          >
            Marque a sua consulta
            <br />
            <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
              qualquer dia da semana
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto font-[family-name:var(--font-inter-uc)]"
          >
            Estamos disponíveis 7 dias por semana para responder às suas questões e
            agendar a sua consulta. Contacte-nos pela forma que preferir.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-white font-bold font-[family-name:var(--font-space-grotesk)] text-2xl mb-8">
              Fale connosco
            </h3>

            <div className="space-y-4 mb-10">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.35 + index * 0.08 }}
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:border-opacity-60 hover:bg-white/8 transition-all duration-200 group"
                  style={{ "--hover-border-color": item.color } as React.CSSProperties}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                    style={{
                      background: `${item.color}20`,
                      border: `1px solid ${item.color}40`,
                    }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-[family-name:var(--font-inter-uc)] mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-white font-medium font-[family-name:var(--font-inter-uc)] text-sm">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/351233109109?text=Olá,%20gostaria%20de%20marcar%20uma%20consulta%20na%20Upconcept."
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl font-bold font-[family-name:var(--font-space-grotesk)] text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-green-900/30"
              style={{ background: "linear-gradient(135deg, #16a34a, #15803d)" }}
            >
              <MessageCircle className="w-5 h-5" />
              Marcar via WhatsApp — Resposta Imediata
            </motion.a>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-white font-bold font-[family-name:var(--font-space-grotesk)] text-2xl mb-8">
              Pedido de marcação
            </h3>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center h-80 p-8 rounded-2xl border border-[#22c55e]/30 bg-[#22c55e]/10"
              >
                <CheckCircle className="w-16 h-16 text-[#22c55e] mb-4" />
                <h4 className="text-white font-bold font-[family-name:var(--font-space-grotesk)] text-xl mb-2">
                  Pedido Enviado!
                </h4>
                <p className="text-gray-400 font-[family-name:var(--font-inter-uc)]">
                  Entraremos em contacto em breve para confirmar a sua consulta.
                  Lembre-se: estamos disponíveis todos os dias, incluindo fins de semana e feriados.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name + Phone */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm font-[family-name:var(--font-inter-uc)] mb-2">
                      Nome completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="O seu nome"
                      className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-white placeholder-gray-600 font-[family-name:var(--font-inter-uc)] text-sm focus:outline-none focus:border-[#2563EB]/60 focus:bg-[#2563EB]/5 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm font-[family-name:var(--font-inter-uc)] mb-2">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+351 9XX XXX XXX"
                      className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-white placeholder-gray-600 font-[family-name:var(--font-inter-uc)] text-sm focus:outline-none focus:border-[#2563EB]/60 focus:bg-[#2563EB]/5 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-400 text-sm font-[family-name:var(--font-inter-uc)] mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="o.seu@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-white placeholder-gray-600 font-[family-name:var(--font-inter-uc)] text-sm focus:outline-none focus:border-[#2563EB]/60 focus:bg-[#2563EB]/5 transition-all duration-200"
                  />
                </div>

                {/* Service */}
                <div>
                  <label className="block text-gray-400 text-sm font-[family-name:var(--font-inter-uc)] mb-2">
                    Serviço pretendido
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-white/15 bg-[#111827] text-white font-[family-name:var(--font-inter-uc)] text-sm focus:outline-none focus:border-[#2563EB]/60 transition-all duration-200"
                  >
                    <option value="">Selecione um serviço</option>
                    {services_list.map((s) => (
                      <option key={s} value={s} className="bg-[#111827]">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-gray-400 text-sm font-[family-name:var(--font-inter-uc)] mb-2">
                    Mensagem adicional
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Descreva o motivo da consulta ou coloque as suas dúvidas..."
                    className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-white placeholder-gray-600 font-[family-name:var(--font-inter-uc)] text-sm focus:outline-none focus:border-[#2563EB]/60 focus:bg-[#2563EB]/5 transition-all duration-200 resize-none"
                  />
                </div>

                {/* Reminder */}
                <div className="flex items-center gap-2 text-sm text-gray-500 font-[family-name:var(--font-inter-uc)]">
                  <Clock className="w-4 h-4 text-[#06B6D4] shrink-0" />
                  <span>
                    Pode marcar para qualquer dia, incluindo{" "}
                    <span className="text-[#06B6D4] font-medium">domingos e feriados</span>
                  </span>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl font-bold font-[family-name:var(--font-space-grotesk)] text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#2563EB]/30 flex items-center justify-center gap-2"
                  style={{ background: "linear-gradient(135deg, #2563EB, #06B6D4)" }}
                >
                  <Send className="w-4 h-4" />
                  Enviar Pedido de Marcação
                </button>

                <p className="text-xs text-gray-600 font-[family-name:var(--font-inter-uc)] text-center">
                  Os seus dados são tratados com confidencialidade, em conformidade com o RGPD.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
