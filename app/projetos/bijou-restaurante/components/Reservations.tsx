"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Clock, Users, CalendarDays } from "lucide-react";

const hours = [
  { day: "Segunda-feira", lunch: "Encerrado", dinner: "Encerrado", closed: true },
  { day: "Terça a Quinta", lunch: "12:00 – 15:00", dinner: "19:00 – 22:30", closed: false },
  { day: "Sexta-feira", lunch: "12:00 – 15:00", dinner: "19:00 – 23:00", closed: false },
  { day: "Sábado", lunch: "12:00 – 15:30", dinner: "19:00 – 23:00", closed: false },
  { day: "Domingo", lunch: "12:00 – 15:30", dinner: "Encerrado", closed: false },
];

export default function Reservations() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Static site: open WhatsApp or mailto
    const msg = `Pedido de reserva — Bijou Restaurante%0ANome: ${formData.name}%0ATelefone: ${formData.phone}%0AData: ${formData.date}%0AHora: ${formData.time}%0APessoas: ${formData.guests}%0ANotas: ${formData.notes}`;
    window.open(`https://wa.me/351233434447?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  const inputStyle = {
    background: "rgba(255,255,240,0.08)",
    border: "1px solid rgba(207,181,59,0.25)",
    color: "#FFFFF0",
    fontFamily: "var(--font-source-sans-3)",
    outline: "none",
  };

  const labelStyle = {
    color: "rgba(207,181,59,0.8)",
    fontFamily: "var(--font-source-sans-3)",
    fontSize: "0.7rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
  };

  return (
    <section
      id="reservas"
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: "#2C1810" }}
    >
      {/* Background ornament */}
      <div className="absolute right-0 top-0 w-1/3 h-full opacity-5 pointer-events-none">
        <svg viewBox="0 0 300 800" className="w-full h-full" fill="none">
          <path d="M150 0 Q250 200 150 400 Q50 600 150 800" stroke="#CFB53B" strokeWidth="1" />
          <path d="M200 0 Q300 200 200 400 Q100 600 200 800" stroke="#CFB53B" strokeWidth="0.5" />
        </svg>
      </div>

      <div ref={ref} className="relative max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p
            className="text-xs tracking-[0.4em] uppercase mb-4"
            style={{ color: "#CFB53B", fontFamily: "var(--font-source-sans-3)" }}
          >
            Reserve a sua Mesa
          </p>
          <h2
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: "var(--font-eb-garamond)", color: "#FFFFF0" }}
          >
            Venha Sentar-se
            <br />
            <em>à Nossa Mesa</em>
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-20" style={{ background: "rgba(207,181,59,0.4)" }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#CFB53B" }} />
            <div className="h-px w-20" style={{ background: "rgba(207,181,59,0.4)" }} />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Phone CTA */}
            <a
              href="tel:+351233434447"
              className="flex items-center gap-4 p-5 mb-8 transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "#800020",
                border: "1px solid rgba(207,181,59,0.3)",
              }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(255,255,240,0.1)" }}
              >
                <Phone size={22} style={{ color: "#CFB53B" }} />
              </div>
              <div>
                <p
                  className="text-xs tracking-widest uppercase mb-1"
                  style={{ color: "rgba(255,255,240,0.6)", fontFamily: "var(--font-source-sans-3)" }}
                >
                  Reservas por Telefone
                </p>
                <p
                  className="text-2xl font-bold"
                  style={{ fontFamily: "var(--font-eb-garamond)", color: "#FFFFF0" }}
                >
                  233 434 447
                </p>
              </div>
            </a>

            {/* Info cards */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Users size={18} style={{ color: "#CFB53B", flexShrink: 0, marginTop: 2 }} />
                <div>
                  <p
                    className="text-sm font-semibold mb-1"
                    style={{ color: "#FFFFF0", fontFamily: "var(--font-source-sans-3)" }}
                  >
                    Grupos & Eventos Privados
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "rgba(255,255,240,0.6)", fontFamily: "var(--font-source-sans-3)" }}
                  >
                    Disponíveis para jantares privados, celebrações de aniversário e eventos empresariais.
                    Contacte-nos para orçamento.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CalendarDays size={18} style={{ color: "#CFB53B", flexShrink: 0, marginTop: 2 }} />
                <div>
                  <p
                    className="text-sm font-semibold mb-1"
                    style={{ color: "#FFFFF0", fontFamily: "var(--font-source-sans-3)" }}
                  >
                    Cabrito com Antecedência
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "rgba(255,255,240,0.6)", fontFamily: "var(--font-source-sans-3)" }}
                  >
                    O cabrito assado no forno requer encomenda com 24 horas de antecedência.
                    Mencione na reserva.
                  </p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div
              className="p-6 border"
              style={{ borderColor: "rgba(207,181,59,0.2)", background: "rgba(255,255,240,0.03)" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Clock size={16} style={{ color: "#CFB53B" }} />
                <p
                  className="text-xs tracking-[0.3em] uppercase"
                  style={{ color: "#CFB53B", fontFamily: "var(--font-source-sans-3)" }}
                >
                  Horário de Funcionamento
                </p>
              </div>
              <div className="space-y-2">
                {hours.map((h) => (
                  <div
                    key={h.day}
                    className="flex justify-between items-center text-sm py-1 border-b"
                    style={{ borderColor: "rgba(207,181,59,0.08)" }}
                  >
                    <span
                      style={{
                        color: h.closed ? "rgba(255,255,240,0.3)" : "rgba(255,255,240,0.75)",
                        fontFamily: "var(--font-source-sans-3)",
                      }}
                    >
                      {h.day}
                    </span>
                    {h.closed ? (
                      <span
                        className="text-xs"
                        style={{ color: "rgba(255,255,240,0.3)", fontFamily: "var(--font-source-sans-3)" }}
                      >
                        Encerrado
                      </span>
                    ) : (
                      <div className="text-right">
                        <p style={{ color: "#CFB53B", fontFamily: "var(--font-source-sans-3)" }}>
                          {h.lunch}
                        </p>
                        {h.dinner !== "Encerrado" && (
                          <p style={{ color: "#CFB53B", fontFamily: "var(--font-source-sans-3)" }}>
                            {h.dinner}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-8 border"
                style={{ borderColor: "rgba(207,181,59,0.3)", background: "rgba(255,255,240,0.03)" }}
              >
                <div
                  className="w-16 h-16 flex items-center justify-center mb-6"
                  style={{ background: "#800020" }}
                >
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="#CFB53B">
                    <path d="M5 15L12 22L25 8" stroke="#CFB53B" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3
                  className="text-3xl font-bold mb-3"
                  style={{ fontFamily: "var(--font-eb-garamond)", color: "#FFFFF0" }}
                >
                  Pedido Enviado!
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,240,0.7)", fontFamily: "var(--font-source-sans-3)" }}
                >
                  Recebemos o seu pedido de reserva via WhatsApp.
                  Entraremos em contacto para confirmação em breve.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label style={labelStyle} className="block mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 text-sm focus:border-[#CFB53B] transition-colors"
                    style={inputStyle}
                    placeholder="O seu nome"
                  />
                </div>
                <div>
                  <label style={labelStyle} className="block mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 text-sm focus:border-[#CFB53B] transition-colors"
                    style={inputStyle}
                    placeholder="9XX XXX XXX"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label style={labelStyle} className="block mb-2">
                      Data
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 text-sm focus:border-[#CFB53B] transition-colors"
                      style={{ ...inputStyle, colorScheme: "dark" }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle} className="block mb-2">
                      Hora
                    </label>
                    <select
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-4 py-3 text-sm focus:border-[#CFB53B] transition-colors"
                      style={inputStyle}
                    >
                      <option value="">Escolher</option>
                      <option value="12:00">12:00</option>
                      <option value="12:30">12:30</option>
                      <option value="13:00">13:00</option>
                      <option value="13:30">13:30</option>
                      <option value="14:00">14:00</option>
                      <option value="19:00">19:00</option>
                      <option value="19:30">19:30</option>
                      <option value="20:00">20:00</option>
                      <option value="20:30">20:30</option>
                      <option value="21:00">21:00</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label style={labelStyle} className="block mb-2">
                    Número de Pessoas
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-4 py-3 text-sm focus:border-[#CFB53B] transition-colors"
                    style={inputStyle}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "pessoa" : "pessoas"}
                      </option>
                    ))}
                    <option value="9+">9+ pessoas (grupo)</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle} className="block mb-2">
                    Observações (opcional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 text-sm focus:border-[#CFB53B] transition-colors resize-none"
                    style={inputStyle}
                    placeholder="Alergias, preferências, datas especiais..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 text-sm tracking-widest uppercase font-medium transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: "#800020",
                    color: "#FFFFF0",
                    fontFamily: "var(--font-source-sans-3)",
                  }}
                >
                  Solicitar Reserva via WhatsApp
                </button>
                <p
                  className="text-center text-xs"
                  style={{ color: "rgba(255,255,240,0.4)", fontFamily: "var(--font-source-sans-3)" }}
                >
                  Confirmaremos a sua reserva por telefone
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
