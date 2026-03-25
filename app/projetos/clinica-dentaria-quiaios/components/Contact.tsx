"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, MessageCircle, Facebook, Clock, CheckCircle } from "lucide-react";

const contactMethods = [
  {
    icon: Phone,
    title: "Telefone",
    detail: "934 868 049",
    description: "A forma mais rápida de marcar consulta",
    href: "tel:934868049",
    cta: "Ligar agora",
    color: "#C2703B",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    detail: "934 868 049",
    description: "Envie mensagem a qualquer hora do dia",
    href: "https://wa.me/351934868049?text=Olá%2C+gostaria+de+marcar+uma+consulta+na+Clínica+Dentária+de+Quiaios.",
    cta: "Enviar mensagem",
    color: "#25D366",
  },
  {
    icon: Facebook,
    title: "Facebook",
    detail: "Clínica Dentária de Quiaios",
    description: "Siga-nos e fique a par das novidades",
    href: "https://facebook.com",
    cta: "Ver página",
    color: "#1877F2",
  },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Static site — open WhatsApp with form data
    const msg = encodeURIComponent(
      `Pedido de marcação\nNome: ${formState.name}\nTelefone: ${formState.phone}\nServiço: ${formState.service || "Não especificado"}\nMensagem: ${formState.message || "—"}`
    );
    window.open(`https://wa.me/351934868049?text=${msg}`, "_blank");
    setSubmitted(true);
  }

  return (
    <section
      id="contacto"
      ref={ref}
      className="py-20 lg:py-28 bg-white"
      aria-label="Marcar consulta"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-sm font-bold tracking-widest uppercase text-[#C2703B] mb-4">
            Marcar Consulta
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-[#3D2B1F] leading-tight mb-4"
            style={{ fontFamily: "'Nunito Sans', sans-serif" }}
          >
            Entre em contacto
            <br />connosco hoje
          </h2>
          <p className="text-[#8B6F47] text-lg max-w-xl mx-auto leading-relaxed">
            Marque a sua consulta por telefone, WhatsApp ou preencha o
            formulário — respondemos sempre com a maior brevidade.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left: contact methods + hours */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="lg:col-span-2 space-y-5"
          >
            {contactMethods.map((method, i) => {
              const Icon = method.icon;
              return (
                <a
                  key={i}
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    method.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="flex items-start gap-4 bg-[#FFF8F0] hover:bg-[#FFF0E0] rounded-2xl p-5 border border-[#E8D5C0] hover:border-[#C2703B]/40 transition-all duration-150 group"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${method.color}18` }}
                  >
                    <Icon
                      className="w-6 h-6"
                      style={{ color: method.color }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[#3D2B1F] text-sm mb-0.5">
                      {method.title}
                    </div>
                    <div
                      className="font-semibold text-base truncate"
                      style={{ color: method.color }}
                    >
                      {method.detail}
                    </div>
                    <div className="text-xs text-[#8B6F47] mt-0.5">
                      {method.description}
                    </div>
                  </div>
                  <span
                    className="text-xs font-bold shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: method.color }}
                  >
                    {method.cta} →
                  </span>
                </a>
              );
            })}

            {/* Quick hours reminder */}
            <div className="flex items-start gap-3 bg-[#5F7A3A]/8 rounded-2xl p-4 border border-[#5F7A3A]/20">
              <Clock className="w-5 h-5 text-[#5F7A3A] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-[#3D2B1F] mb-1">
                  Horário de atendimento
                </p>
                <p className="text-xs text-[#8B6F47] leading-relaxed">
                  Seg–Sex: 09h00–19h00
                  <br />
                  Sáb: 09h00–13h00
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-[#FFF8F0] rounded-3xl p-7 sm:p-9 border border-[#E8D5C0]">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-4 py-10 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#C2703B]/10 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-[#C2703B]" />
                  </div>
                  <h3
                    className="text-xl font-extrabold text-[#3D2B1F]"
                    style={{ fontFamily: "'Nunito Sans', sans-serif" }}
                  >
                    Mensagem enviada!
                  </h3>
                  <p className="text-[#8B6F47] text-sm max-w-xs">
                    O seu pedido foi enviado via WhatsApp. Entraremos em
                    contacto muito em breve.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-sm text-[#C2703B] font-semibold hover:underline"
                  >
                    Enviar outro pedido
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h3
                    className="font-extrabold text-[#3D2B1F] text-xl mb-6"
                    style={{ fontFamily: "'Nunito Sans', sans-serif" }}
                  >
                    Pedido de marcação
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-[#3D2B1F] mb-1.5"
                      >
                        Nome *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="O seu nome"
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full bg-white border border-[#E8D5C0] rounded-xl px-4 py-3 text-[#3D2B1F] placeholder:text-[#C0A888] focus:outline-none focus:border-[#C2703B] focus:ring-1 focus:ring-[#C2703B] text-sm transition"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-[#3D2B1F] mb-1.5"
                      >
                        Telefone *
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="9XX XXX XXX"
                        value={formState.phone}
                        onChange={handleChange}
                        className="w-full bg-white border border-[#E8D5C0] rounded-xl px-4 py-3 text-[#3D2B1F] placeholder:text-[#C0A888] focus:outline-none focus:border-[#C2703B] focus:ring-1 focus:ring-[#C2703B] text-sm transition"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="service"
                      className="block text-sm font-semibold text-[#3D2B1F] mb-1.5"
                    >
                      Serviço pretendido
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formState.service}
                      onChange={handleChange}
                      className="w-full bg-white border border-[#E8D5C0] rounded-xl px-4 py-3 text-[#3D2B1F] focus:outline-none focus:border-[#C2703B] focus:ring-1 focus:ring-[#C2703B] text-sm transition appearance-none"
                    >
                      <option value="">Selecione um serviço (opcional)</option>
                      <option>Consulta de rotina</option>
                      <option>Tratamento de canal</option>
                      <option>Branqueamento dentário</option>
                      <option>Odontopediatria</option>
                      <option>Ortodontia</option>
                      <option>Implante dentário</option>
                      <option>Urgência</option>
                      <option>Outro</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-[#3D2B1F] mb-1.5"
                    >
                      Mensagem / Disponibilidade
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      placeholder="Indique a sua disponibilidade horária ou deixe uma nota..."
                      value={formState.message}
                      onChange={handleChange}
                      className="w-full bg-white border border-[#E8D5C0] rounded-xl px-4 py-3 text-[#3D2B1F] placeholder:text-[#C0A888] focus:outline-none focus:border-[#C2703B] focus:ring-1 focus:ring-[#C2703B] text-sm transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#C2703B] hover:bg-[#A85E2E] text-white font-bold py-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 text-base"
                  >
                    Enviar pedido via WhatsApp
                  </button>

                  <p className="text-xs text-[#8B6F47] text-center mt-3">
                    O formulário abre o WhatsApp com a sua mensagem pré-preenchida.
                    Não guardamos dados pessoais.
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
