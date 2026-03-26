"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Facebook, MapPin, Clock, Send, CheckCircle } from "lucide-react";

const contactInfo = [
  {
    icon: Facebook,
    label: "Facebook",
    value: "Contacte via Facebook",
    href: "https://www.facebook.com/premiumclinicadentaria",
    description: "Envie mensagem pelo Facebook",
  },
  {
    icon: MapPin,
    label: "Morada",
    value: "Figueira da Foz",
    href: "https://maps.google.com/?q=Figueira+da+Foz",
    description: "Figueira da Foz, Portugal",
  },
  {
    icon: Clock,
    label: "Horário",
    value: "Seg–Sáb",
    href: undefined,
    description: "Segunda a Sexta: 9h–19h · Sábado: 9h–13h",
  },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
    preferredTime: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      id="contacto"
      ref={ref}
      className="py-24 md:py-32 bg-[#FEFCE8]"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#D1FAE5] rounded-full px-4 py-1.5 mb-6">
            <Send className="w-3.5 h-3.5 text-[#064E3B]" />
            <span className="text-xs font-semibold text-[#064E3B] uppercase tracking-wider">
              Contacto
            </span>
          </div>
          <h2
            id="contact-heading"
            className="text-3xl md:text-5xl font-bold text-[#064E3B] leading-tight mb-4"
            style={{ fontFamily: "var(--font-sora), sans-serif" }}
          >
            Marque a sua{" "}
            <span className="text-[#6B8F71]">primeira consulta</span>
          </h2>
          <p className="text-lg text-[#064E3B]/60 leading-relaxed">
            O primeiro passo para um sorriso mais saudável começa aqui. Contacte-nos e responderemos em menos de 2 horas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            {contactInfo.map((item) => {
              const Icon = item.icon;
              const content = (
                <div className="bg-white rounded-2xl p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-[#D1FAE5] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#064E3B]" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#6B8F71] uppercase tracking-wide mb-0.5">
                      {item.label}
                    </div>
                    <div className="text-base font-semibold text-[#064E3B]">{item.value}</div>
                    <div className="text-sm text-[#064E3B]/55">{item.description}</div>
                  </div>
                </div>
              );

              return item.href ? (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}

            {/* Facebook note */}
            <div className="bg-[#064E3B] rounded-2xl p-5 text-white">
              <p className="text-sm font-medium mb-1">Siga-nos no Facebook</p>
              <p className="text-xs text-white/65 mb-3">
                Dicas de saúde oral, novidades e promoções exclusivas para os nossos seguidores.
              </p>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
              >
                Premium Clínica Médica e Dentária →
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-3xl p-8 md:p-10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 bg-[#D1FAE5] rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-[#064E3B]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#064E3B] mb-3" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
                    Pedido enviado!
                  </h3>
                  <p className="text-[#064E3B]/60 max-w-sm">
                    Recebemos o seu pedido e entraremos em contacto em menos de 2 horas. Obrigado pela confiança!
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <h3 className="text-xl font-bold text-[#064E3B] mb-6" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
                    Pedido de Consulta
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[#064E3B] mb-1.5">
                        Nome <span className="text-[#6B8F71]">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="O seu nome"
                        className="w-full border border-[#D1FAE5] rounded-xl px-4 py-3 text-sm text-[#064E3B] placeholder-[#064E3B]/30 focus:outline-none focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B] transition-colors bg-[#FEFCE8]/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-[#064E3B] mb-1.5">
                        Telefone <span className="text-[#6B8F71]">*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+351 9XX XXX XXX"
                        className="w-full border border-[#D1FAE5] rounded-xl px-4 py-3 text-sm text-[#064E3B] placeholder-[#064E3B]/30 focus:outline-none focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B] transition-colors bg-[#FEFCE8]/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#064E3B] mb-1.5">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="email@exemplo.pt"
                      className="w-full border border-[#D1FAE5] rounded-xl px-4 py-3 text-sm text-[#064E3B] placeholder-[#064E3B]/30 focus:outline-none focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B] transition-colors bg-[#FEFCE8]/50"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-[#064E3B] mb-1.5">
                        Serviço pretendido
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className="w-full border border-[#D1FAE5] rounded-xl px-4 py-3 text-sm text-[#064E3B] focus:outline-none focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B] transition-colors bg-[#FEFCE8]/50"
                      >
                        <option value="">Seleccionar...</option>
                        <option>Prevenção e Higiene Oral</option>
                        <option>Dentisteria</option>
                        <option>Endodontia</option>
                        <option>Prótese</option>
                        <option>Implantologia</option>
                        <option>Ortodontia</option>
                        <option>Estética Dentária</option>
                        <option>Odontopediatria</option>
                        <option>Outro / Não sei ainda</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="preferredTime" className="block text-sm font-medium text-[#064E3B] mb-1.5">
                        Preferência de horário
                      </label>
                      <select
                        id="preferredTime"
                        name="preferredTime"
                        value={form.preferredTime}
                        onChange={handleChange}
                        className="w-full border border-[#D1FAE5] rounded-xl px-4 py-3 text-sm text-[#064E3B] focus:outline-none focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B] transition-colors bg-[#FEFCE8]/50"
                      >
                        <option value="">Indiferente</option>
                        <option>Manhã (9h–12h)</option>
                        <option>Tarde (12h–17h)</option>
                        <option>Final de tarde (17h–19h)</option>
                        <option>Sábado de manhã</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#064E3B] mb-1.5">
                      Mensagem (opcional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Diga-nos mais sobre o que precisa ou coloque as suas dúvidas..."
                      className="w-full border border-[#D1FAE5] rounded-xl px-4 py-3 text-sm text-[#064E3B] placeholder-[#064E3B]/30 focus:outline-none focus:ring-2 focus:ring-[#064E3B]/20 focus:border-[#064E3B] transition-colors bg-[#FEFCE8]/50 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#064E3B] text-white py-4 rounded-2xl text-base font-semibold hover:bg-[#065f46] transition-all hover:shadow-xl hover:shadow-[#064E3B]/20 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Enviar Pedido de Consulta
                  </button>
                  <p className="text-xs text-[#064E3B]/40 text-center">
                    Os seus dados são tratados de acordo com a nossa política de privacidade e o RGPD.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
