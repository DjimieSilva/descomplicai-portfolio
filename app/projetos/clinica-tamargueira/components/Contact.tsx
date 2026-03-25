"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Facebook,
  Mail,
  CheckCircle,
} from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    label: "Morada",
    value: "Rua da Tamargueira, Figueira da Foz",
    sub: "Estacionamento disponível",
  },
  {
    icon: Phone,
    label: "Telefone",
    value: "+351 239 000 000",
    sub: "Chamada para rede fixa nacional",
  },
  {
    icon: Clock,
    label: "Horário",
    value: "Seg–Sex: 9h–19h",
    sub: "Sáb: 9h–13h (marcação prévia)",
  },
  {
    icon: Mail,
    label: "Email",
    value: "geral@tamargueira.pt",
    sub: "Respondemos em 24 horas",
  },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contacto" ref={ref} className="py-24 bg-[#F8FAFF]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-[#1E40AF] text-sm font-semibold uppercase tracking-widest mb-4"
          >
            Contacto
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-[#111827] font-[family-name:var(--font-sora)] mb-4"
          >
            Comece o Seu Tratamento
            <br />
            <span className="text-[#1E40AF]">Hoje Mesmo</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#374151] text-lg max-w-xl mx-auto"
          >
            Agende a sua consulta de avaliação gratuita. Sem compromissos, sem pressões.
            Apenas informação clara e honesta sobre o seu caso.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left — form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white border border-[#E5E7EB] rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-[#111827] font-[family-name:var(--font-sora)] mb-2">
              Peça a Sua Consulta Gratuita
            </h3>
            <p className="text-[#6B7280] text-sm mb-6">
              Preencha os dados abaixo e entraremos em contacto em menos de 24 horas.
            </p>

            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">
                    Nome *
                  </label>
                  <input
                    type="text"
                    placeholder="O seu nome"
                    className="w-full border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/30 focus:border-[#1E40AF] transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">
                    Apelido *
                  </label>
                  <input
                    type="text"
                    placeholder="O seu apelido"
                    className="w-full border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/30 focus:border-[#1E40AF] transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1.5">
                  Telemóvel / Telefone *
                </label>
                <input
                  type="tel"
                  placeholder="+351 9XX XXX XXX"
                  className="w-full border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/30 focus:border-[#1E40AF] transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="o.seu@email.pt"
                  className="w-full border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/30 focus:border-[#1E40AF] transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1.5">
                  Motivo da consulta
                </label>
                <select className="w-full border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/30 focus:border-[#1E40AF] transition-all duration-200 bg-white">
                  <option value="">Selecione uma opção</option>
                  <option value="single">Implante de um dente</option>
                  <option value="multiple">Vários implantes</option>
                  <option value="allon4">All-on-4 / All-on-6</option>
                  <option value="info">Informação / orçamento</option>
                  <option value="other">Outro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1.5">
                  Mensagem (opcional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Descreva brevemente a sua situação ou dúvida..."
                  className="w-full border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/30 focus:border-[#1E40AF] transition-all duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#1E40AF] text-white py-4 rounded-xl font-bold text-base hover:bg-[#1D4ED8] transition-colors duration-200 font-[family-name:var(--font-sora)]"
              >
                Solicitar Consulta Gratuita
              </button>

              <p className="text-[#9CA3AF] text-xs text-center">
                Ao submeter, aceita a nossa política de privacidade. Os seus dados não serão partilhados.
              </p>
            </form>
          </motion.div>

          {/* Right — info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col gap-6"
          >
            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/351239000000?text=Olá!%20Gostaria%20de%20marcar%20uma%20consulta%20de%20avaliação%20de%20implantes."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-[#25D366] text-white rounded-2xl p-5 hover:bg-[#1ea952] transition-colors duration-200 shadow-lg"
            >
              <MessageCircle className="w-8 h-8 flex-shrink-0" />
              <div>
                <p className="font-bold font-[family-name:var(--font-sora)]">WhatsApp — Resposta Imediata</p>
                <p className="text-green-100 text-sm">Fale connosco agora pelo WhatsApp</p>
              </div>
            </a>

            {/* Contact details */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-5">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#DBEAFE] rounded-xl flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-5 h-5 text-[#1E40AF]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-0.5">{info.label}</p>
                    <p className="font-semibold text-[#111827] text-sm">{info.value}</p>
                    <p className="text-[#6B7280] text-xs">{info.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Facebook */}
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-[#1877F2] text-white rounded-2xl p-5 hover:bg-[#1565c0] transition-colors duration-200"
            >
              <Facebook className="w-7 h-7 flex-shrink-0" />
              <div>
                <p className="font-bold font-[family-name:var(--font-sora)]">Siga-nos no Facebook</p>
                <p className="text-blue-200 text-sm">Dicas, novidades e casos clínicos</p>
              </div>
            </a>

            {/* Guarantee badges */}
            <div className="grid grid-cols-2 gap-3">
              {[
                "Consulta de avaliação gratuita",
                "Orçamento transparente",
                "Sem pressão de vendas",
                "Resposta em 24 horas",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-3">
                  <CheckCircle className="w-4 h-4 text-[#16A34A] flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-[#374151] font-medium leading-tight">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
