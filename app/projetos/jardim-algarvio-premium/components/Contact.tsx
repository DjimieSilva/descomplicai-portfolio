"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, MessageCircle, MapPin, Send } from "lucide-react";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    tipo: "",
    mensagem: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Static site — form would be handled by external service
  };

  const inputStyles: React.CSSProperties = {
    background: "rgba(245,240,232,0.05)",
    border: "1px solid rgba(201,169,110,0.2)",
    borderRadius: "4px",
    color: "#F5F0E8",
    fontFamily: "var(--font-inter)",
    fontSize: "0.875rem",
  };

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 px-6 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #1A1A18 0%, #2A2821 50%, #1A1A18 100%)",
      }}
      id="contacto"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12" style={{ background: "#C9A96E" }} />
            <span
              className="text-xs tracking-[0.4em] uppercase"
              style={{ color: "#C9A96E", fontFamily: "var(--font-inter)" }}
            >
              Contacto
            </span>
            <div className="h-px w-12" style={{ background: "#C9A96E" }} />
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            style={{ fontFamily: "var(--font-playfair)", color: "#F5F0E8" }}
          >
            Transforme o Seu{" "}
            <span style={{ color: "#C9A96E" }}>Espa&ccedil;o Exterior</span>
          </h2>
          <p
            className="text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: "rgba(245,240,232,0.6)" }}
          >
            Agende uma consulta gratuita e descubra como podemos dar vida ao jardim
            dos seus sonhos no Algarve.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left: Form (3 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="nome"
                    className="block text-xs tracking-wider uppercase mb-2"
                    style={{ color: "rgba(245,240,232,0.5)" }}
                  >
                    Nome
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    className="w-full px-4 py-3 outline-none transition-colors duration-300 focus:border-[#C9A96E]"
                    style={inputStyles}
                    placeholder="O seu nome"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs tracking-wider uppercase mb-2"
                    style={{ color: "rgba(245,240,232,0.5)" }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 outline-none transition-colors duration-300 focus:border-[#C9A96E]"
                    style={inputStyles}
                    placeholder="email@exemplo.pt"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="telefone"
                    className="block text-xs tracking-wider uppercase mb-2"
                    style={{ color: "rgba(245,240,232,0.5)" }}
                  >
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 outline-none transition-colors duration-300 focus:border-[#C9A96E]"
                    style={inputStyles}
                    placeholder="+351 9XX XXX XXX"
                  />
                </div>
                <div>
                  <label
                    htmlFor="tipo"
                    className="block text-xs tracking-wider uppercase mb-2"
                    style={{ color: "rgba(245,240,232,0.5)" }}
                  >
                    Tipo de Projeto
                  </label>
                  <select
                    id="tipo"
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    className="w-full px-4 py-3 outline-none transition-colors duration-300 focus:border-[#C9A96E] appearance-none"
                    style={{
                      ...inputStyles,
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4 L6 8 L10 4' fill='none' stroke='%23C9A96E' stroke-width='1.5'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 12px center",
                    }}
                  >
                    <option value="" style={{ background: "#2A2821" }}>
                      Selecione...
                    </option>
                    <option value="residencial" style={{ background: "#2A2821" }}>
                      Jardim Residencial
                    </option>
                    <option value="comercial" style={{ background: "#2A2821" }}>
                      Espa&ccedil;o Comercial
                    </option>
                    <option value="resort" style={{ background: "#2A2821" }}>
                      Resort / Hotel
                    </option>
                    <option value="manutencao" style={{ background: "#2A2821" }}>
                      Manuten&ccedil;&atilde;o
                    </option>
                    <option value="outro" style={{ background: "#2A2821" }}>
                      Outro
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="mensagem"
                  className="block text-xs tracking-wider uppercase mb-2"
                  style={{ color: "rgba(245,240,232,0.5)" }}
                >
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 outline-none transition-colors duration-300 focus:border-[#C9A96E] resize-none"
                  style={inputStyles}
                  placeholder="Descreva o seu projeto ou as suas necessidades..."
                  required
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-3 px-10 py-4 text-sm tracking-[0.2em] uppercase font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{
                  background: "#C9A96E",
                  color: "#1A1A18",
                  fontFamily: "var(--font-inter)",
                  borderRadius: "4px",
                }}
              >
                <Send size={16} />
                Solicitar Consulta
              </button>
            </form>
          </motion.div>

          {/* Right: Contact info (2 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3
                className="text-xl font-bold mb-6"
                style={{ fontFamily: "var(--font-playfair)", color: "#F5F0E8" }}
              >
                Fale Connosco
              </h3>
              <div className="space-y-5">
                <a
                  href="tel:+351912345678"
                  className="flex items-center gap-4 group"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:bg-[rgba(201,169,110,0.15)]"
                    style={{ background: "rgba(201,169,110,0.08)" }}
                  >
                    <Phone size={18} style={{ color: "#C9A96E" }} />
                  </div>
                  <div>
                    <div
                      className="text-xs tracking-wider uppercase mb-1"
                      style={{ color: "rgba(245,240,232,0.4)" }}
                    >
                      Telefone
                    </div>
                    <div style={{ color: "#F5F0E8" }}>+351 912 345 678</div>
                  </div>
                </a>

                <a
                  href="mailto:info@jardimalgarvio.pt"
                  className="flex items-center gap-4 group"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:bg-[rgba(201,169,110,0.15)]"
                    style={{ background: "rgba(201,169,110,0.08)" }}
                  >
                    <Mail size={18} style={{ color: "#C9A96E" }} />
                  </div>
                  <div>
                    <div
                      className="text-xs tracking-wider uppercase mb-1"
                      style={{ color: "rgba(245,240,232,0.4)" }}
                    >
                      Email
                    </div>
                    <div style={{ color: "#F5F0E8" }}>info@jardimalgarvio.pt</div>
                  </div>
                </a>

                <a
                  href="https://wa.me/351912345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:bg-[rgba(201,169,110,0.15)]"
                    style={{ background: "rgba(201,169,110,0.08)" }}
                  >
                    <MessageCircle size={18} style={{ color: "#C9A96E" }} />
                  </div>
                  <div>
                    <div
                      className="text-xs tracking-wider uppercase mb-1"
                      style={{ color: "rgba(245,240,232,0.4)" }}
                    >
                      WhatsApp
                    </div>
                    <div style={{ color: "#F5F0E8" }}>+351 912 345 678</div>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(201,169,110,0.08)" }}
                  >
                    <MapPin size={18} style={{ color: "#C9A96E" }} />
                  </div>
                  <div>
                    <div
                      className="text-xs tracking-wider uppercase mb-1"
                      style={{ color: "rgba(245,240,232,0.4)" }}
                    >
                      Morada
                    </div>
                    <div style={{ color: "#F5F0E8" }}>
                      Est&uacute;dio JardimAlgarvio<br />
                      Faro, Algarve
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Business hours */}
            <div
              className="p-6"
              style={{
                background: "rgba(201,169,110,0.05)",
                border: "1px solid rgba(201,169,110,0.15)",
                borderRadius: "4px",
              }}
            >
              <h4
                className="text-sm font-bold mb-4 tracking-wider uppercase"
                style={{ color: "#C9A96E" }}
              >
                Hor&aacute;rio de Atendimento
              </h4>
              <div
                className="space-y-2 text-sm"
                style={{ color: "rgba(245,240,232,0.6)" }}
              >
                <div className="flex justify-between">
                  <span>Segunda a Sexta</span>
                  <span style={{ color: "#F5F0E8" }}>9:00 &ndash; 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>S&aacute;bado</span>
                  <span style={{ color: "#F5F0E8" }}>9:00 &ndash; 13:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingo</span>
                  <span style={{ color: "rgba(245,240,232,0.4)" }}>Encerrado</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
