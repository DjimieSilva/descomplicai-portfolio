"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, Clock, CheckCircle } from "lucide-react";

const horarios = [
  { dia: "Segunda-feira", hora: "Encerrado" },
  { dia: "Terça a Sexta", hora: "12h00 – 15h30 | 19h00 – 22h30" },
  { dia: "Sábado", hora: "12h00 – 16h00 | 19h00 – 23h00" },
  { dia: "Domingo", hora: "12h00 – 16h00" },
];

export default function Reservations() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    email: "",
    data: "",
    hora: "",
    pessoas: "2",
    observacoes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    "w-full bg-white/5 border border-[#D4A574]/20 rounded-sm px-4 py-3 text-[#FFF1E6] placeholder-[#FFF1E6]/25 text-sm focus:outline-none focus:border-[#D4A574]/60 transition-colors";

  return (
    <section ref={ref} id="reservas" className="bg-[#FFF1E6] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[#E63946]/70 text-xs tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            Reservas
          </p>
          <h2
            className="text-[#1D3557] text-[clamp(2.5rem,6vw,5rem)] leading-tight font-light"
            style={{ fontFamily: "var(--font-newsreader), serif" }}
          >
            Reserve a sua{" "}
            <span className="italic text-[#E63946]">Mesa</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="w-20 h-px bg-[#D4A574] mx-auto mt-8"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Contact info */}
            <div className="space-y-6 mb-10">
              <a
                href="tel:+351233000000"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-full bg-[#E63946]/10 flex items-center justify-center group-hover:bg-[#E63946]/20 transition-colors">
                  <Phone className="w-5 h-5 text-[#E63946]" />
                </div>
                <div>
                  <p className="text-[#1D3557]/45 text-xs tracking-[0.2em] uppercase mb-0.5"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                    Telefone / Reservas
                  </p>
                  <p
                    className="text-[#1D3557] text-lg font-light group-hover:text-[#E63946] transition-colors"
                    style={{ fontFamily: "var(--font-newsreader), serif" }}
                  >
                    +351 233 000 000
                  </p>
                </div>
              </a>

              <a
                href="mailto:reservas@rosaameliafigueira.pt"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-full bg-[#D4A574]/10 flex items-center justify-center group-hover:bg-[#D4A574]/20 transition-colors">
                  <Mail className="w-5 h-5 text-[#D4A574]" />
                </div>
                <div>
                  <p className="text-[#1D3557]/45 text-xs tracking-[0.2em] uppercase mb-0.5"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                    Email
                  </p>
                  <p
                    className="text-[#1D3557] text-base font-light group-hover:text-[#D4A574] transition-colors"
                    style={{ fontFamily: "var(--font-newsreader), serif" }}
                  >
                    reservas@rosaameliafigueira.pt
                  </p>
                </div>
              </a>
            </div>

            {/* Horários */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <Clock className="w-4 h-4 text-[#D4A574]" />
                <h3
                  className="text-[#1D3557] text-lg font-light"
                  style={{ fontFamily: "var(--font-newsreader), serif" }}
                >
                  Horário de Funcionamento
                </h3>
              </div>
              <div className="divide-y divide-[#D4A574]/15">
                {horarios.map((h) => (
                  <div key={h.dia} className="flex justify-between items-center py-3">
                    <span className="text-[#1D3557]/65 text-sm">{h.dia}</span>
                    <span
                      className={`text-sm font-light ${
                        h.hora === "Encerrado" ? "text-[#E63946]/60" : "text-[#1D3557]"
                      }`}
                      style={{ fontFamily: "var(--font-newsreader), serif" }}
                    >
                      {h.hora}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Note */}
            <div className="mt-8 p-5 bg-[#1D3557]/5 border border-[#1D3557]/10 rounded-sm">
              <p className="text-[#1D3557]/70 text-sm leading-relaxed">
                <span className="font-medium text-[#1D3557]">Nota importante:</span> Para grupos
                de mais de 6 pessoas, lagosta ou marisco em grande quantidade, pedimos reserva
                com pelo menos 24h de antecedência.
              </p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-[#1D3557] p-8 rounded-sm">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-14 h-14 text-[#D4A574] mx-auto mb-5" />
                  <h3
                    className="text-[#FFF1E6] text-2xl font-light mb-3"
                    style={{ fontFamily: "var(--font-newsreader), serif" }}
                  >
                    Pedido Enviado!
                  </h3>
                  <p className="text-[#FFF1E6]/60 text-sm leading-relaxed">
                    Entraremos em contacto em breve para confirmar a sua reserva.
                    Obrigado por escolher a Marisqueira Rosa Amélia.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[#D4A574]/70 text-xs tracking-[0.2em] uppercase block mb-2"
                        style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="O seu nome"
                        value={form.nome}
                        onChange={(e) => setForm({ ...form, nome: e.target.value })}
                        className={inputClass}
                        style={{ fontFamily: "var(--font-inter), sans-serif" }}
                      />
                    </div>
                    <div>
                      <label className="text-[#D4A574]/70 text-xs tracking-[0.2em] uppercase block mb-2"
                        style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                        Telefone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+351 9XX XXX XXX"
                        value={form.telefone}
                        onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                        className={inputClass}
                        style={{ fontFamily: "var(--font-inter), sans-serif" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[#D4A574]/70 text-xs tracking-[0.2em] uppercase block mb-2"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="email@exemplo.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass}
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[#D4A574]/70 text-xs tracking-[0.2em] uppercase block mb-2"
                        style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                        Data *
                      </label>
                      <input
                        type="date"
                        required
                        value={form.data}
                        onChange={(e) => setForm({ ...form, data: e.target.value })}
                        className={inputClass}
                        style={{ fontFamily: "var(--font-inter), sans-serif" }}
                      />
                    </div>
                    <div>
                      <label className="text-[#D4A574]/70 text-xs tracking-[0.2em] uppercase block mb-2"
                        style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                        Hora *
                      </label>
                      <select
                        required
                        value={form.hora}
                        onChange={(e) => setForm({ ...form, hora: e.target.value })}
                        className={inputClass}
                        style={{ fontFamily: "var(--font-inter), sans-serif" }}
                      >
                        <option value="">Hora</option>
                        <option>12h00</option>
                        <option>12h30</option>
                        <option>13h00</option>
                        <option>13h30</option>
                        <option>14h00</option>
                        <option>14h30</option>
                        <option>19h00</option>
                        <option>19h30</option>
                        <option>20h00</option>
                        <option>20h30</option>
                        <option>21h00</option>
                        <option>21h30</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[#D4A574]/70 text-xs tracking-[0.2em] uppercase block mb-2"
                        style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                        Pessoas *
                      </label>
                      <select
                        required
                        value={form.pessoas}
                        onChange={(e) => setForm({ ...form, pessoas: e.target.value })}
                        className={inputClass}
                        style={{ fontFamily: "var(--font-inter), sans-serif" }}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                          <option key={n}>{n}</option>
                        ))}
                        <option value="+10">+10</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[#D4A574]/70 text-xs tracking-[0.2em] uppercase block mb-2"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                      Observações / Pedidos Especiais
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Alergias, pedidos especiais (lagosta, etc.)..."
                      value={form.observacoes}
                      onChange={(e) => setForm({ ...form, observacoes: e.target.value })}
                      className={`${inputClass} resize-none`}
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#E63946] text-white text-sm tracking-[0.2em] uppercase hover:bg-[#E63946]/90 transition-colors rounded-sm mt-2"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Confirmar Reserva
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
