"use client";

import { motion, useInView } from "framer-motion";
import { Mail, Phone, Clock, Users, CalendarDays } from "lucide-react";
import { useRef, useState } from "react";

const hours = [
  { day: "Segunda-feira", lunch: "Encerrado", dinner: "Encerrado", closed: true },
  { day: "Terca a Quinta", lunch: "12:00 - 15:00", dinner: "19:00 - 22:30", closed: false },
  { day: "Sexta-feira", lunch: "12:00 - 15:00", dinner: "19:00 - 23:00", closed: false },
  { day: "Sabado", lunch: "12:00 - 15:30", dinner: "19:00 - 23:00", closed: false },
  { day: "Domingo", lunch: "12:00 - 15:30", dinner: "Encerrado", closed: false },
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

  const reservationSummary = [
    "Pedido de reserva - Bijou Restaurante",
    `Nome: ${formData.name}`,
    `Telefone: ${formData.phone}`,
    `Data: ${formData.date}`,
    `Hora: ${formData.time}`,
    `Pessoas: ${formData.guests}`,
    `Notas: ${formData.notes || "-"}`,
    "",
    "A reserva so fica enviada depois de confirmar a mensagem no canal escolhido.",
  ].join("\n");

  const whatsappUrl = `https://wa.me/351233434447?text=${encodeURIComponent(reservationSummary)}`;
  const mailtoUrl = `mailto:geral@bijourestaurante.pt?subject=${encodeURIComponent("Pedido de reserva - Bijou Restaurante")}&body=${encodeURIComponent(reservationSummary)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
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
      className="relative overflow-hidden px-6 py-24"
      style={{ background: "#2C1810" }}
    >
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 opacity-5">
        <svg viewBox="0 0 300 800" className="h-full w-full" fill="none">
          <path d="M150 0 Q250 200 150 400 Q50 600 150 800" stroke="#CFB53B" strokeWidth="1" />
          <path d="M200 0 Q300 200 200 400 Q100 600 200 800" stroke="#CFB53B" strokeWidth="0.5" />
        </svg>
      </div>

      <div ref={ref} className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p
            className="mb-4 text-xs uppercase tracking-[0.4em]"
            style={{ color: "#CFB53B", fontFamily: "var(--font-source-sans-3)" }}
          >
            Reserve a sua Mesa
          </p>
          <h2
            className="mb-4 text-5xl font-bold md:text-6xl"
            style={{ fontFamily: "var(--font-eb-garamond)", color: "#FFFFF0" }}
          >
            Venha Sentar-se
            <br />
            <em>a Nossa Mesa</em>
          </h2>
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="h-px w-20" style={{ background: "rgba(207,181,59,0.4)" }} />
            <div className="h-1.5 w-1.5 rounded-full" style={{ background: "#CFB53B" }} />
            <div className="h-px w-20" style={{ background: "rgba(207,181,59,0.4)" }} />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <a
              href="tel:+351233434447"
              className="mb-8 flex items-center gap-4 p-5 transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "#800020",
                border: "1px solid rgba(207,181,59,0.3)",
              }}
            >
              <div
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center"
                style={{ background: "rgba(255,255,240,0.1)" }}
              >
                <Phone size={22} style={{ color: "#CFB53B" }} />
              </div>
              <div>
                <p
                  className="mb-1 text-xs uppercase tracking-widest"
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

            <div className="mb-8 space-y-4">
              <div className="flex items-start gap-3">
                <Users size={18} style={{ color: "#CFB53B", flexShrink: 0, marginTop: 2 }} />
                <div>
                  <p
                    className="mb-1 text-sm font-semibold"
                    style={{ color: "#FFFFF0", fontFamily: "var(--font-source-sans-3)" }}
                  >
                    Grupos & Eventos Privados
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "rgba(255,255,240,0.6)", fontFamily: "var(--font-source-sans-3)" }}
                  >
                    Disponiveis para jantares privados, celebracoes de aniversario e eventos
                    empresariais. Contacte-nos para orcamento.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CalendarDays
                  size={18}
                  style={{ color: "#CFB53B", flexShrink: 0, marginTop: 2 }}
                />
                <div>
                  <p
                    className="mb-1 text-sm font-semibold"
                    style={{ color: "#FFFFF0", fontFamily: "var(--font-source-sans-3)" }}
                  >
                    Cabrito com Antecedencia
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "rgba(255,255,240,0.6)", fontFamily: "var(--font-source-sans-3)" }}
                  >
                    O cabrito assado no forno requer encomenda com 24 horas de antecedencia.
                    Mencione na reserva.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="border p-6"
              style={{ borderColor: "rgba(207,181,59,0.2)", background: "rgba(255,255,240,0.03)" }}
            >
              <div className="mb-4 flex items-center gap-2">
                <Clock size={16} style={{ color: "#CFB53B" }} />
                <p
                  className="text-xs uppercase tracking-[0.3em]"
                  style={{ color: "#CFB53B", fontFamily: "var(--font-source-sans-3)" }}
                >
                  Horario de Funcionamento
                </p>
              </div>
              <div className="space-y-2">
                {hours.map((hour) => (
                  <div
                    key={hour.day}
                    className="flex items-center justify-between border-b py-1 text-sm"
                    style={{ borderColor: "rgba(207,181,59,0.08)" }}
                  >
                    <span
                      style={{
                        color: hour.closed ? "rgba(255,255,240,0.3)" : "rgba(255,255,240,0.75)",
                        fontFamily: "var(--font-source-sans-3)",
                      }}
                    >
                      {hour.day}
                    </span>
                    {hour.closed ? (
                      <span
                        className="text-xs"
                        style={{
                          color: "rgba(255,255,240,0.3)",
                          fontFamily: "var(--font-source-sans-3)",
                        }}
                      >
                        Encerrado
                      </span>
                    ) : (
                      <div className="text-right">
                        <p style={{ color: "#CFB53B", fontFamily: "var(--font-source-sans-3)" }}>
                          {hour.lunch}
                        </p>
                        {hour.dinner !== "Encerrado" && (
                          <p style={{ color: "#CFB53B", fontFamily: "var(--font-source-sans-3)" }}>
                            {hour.dinner}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-full flex-col items-center justify-center border p-8 text-center"
                role="status"
                aria-live="polite"
                aria-atomic="true"
                style={{ borderColor: "rgba(207,181,59,0.3)", background: "rgba(255,255,240,0.03)" }}
              >
                <div
                  className="mb-6 flex h-16 w-16 items-center justify-center"
                  style={{ background: "#800020" }}
                >
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="#CFB53B">
                    <path
                      d="M5 15L12 22L25 8"
                      stroke="#CFB53B"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3
                  className="mb-3 text-3xl font-bold"
                  style={{ fontFamily: "var(--font-eb-garamond)", color: "#FFFFF0" }}
                >
                  Pedido Aberto no WhatsApp
                </h3>
                <p
                  className="max-w-md text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,240,0.7)", fontFamily: "var(--font-source-sans-3)" }}
                >
                  Abrimos uma mensagem com os dados da reserva, mas o pedido so segue quando o
                  confirmar e enviar no canal escolhido.
                </p>
                <div className="mt-6 grid w-full max-w-md gap-3 sm:grid-cols-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-3 text-xs font-medium uppercase tracking-widest transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      background: "#800020",
                      color: "#FFFFF0",
                      fontFamily: "var(--font-source-sans-3)",
                    }}
                    aria-label="Abrir o WhatsApp com o pedido de reserva preparado"
                  >
                    Abrir WhatsApp
                  </a>
                  <a
                    href={mailtoUrl}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-medium uppercase tracking-widest transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      border: "1px solid rgba(207,181,59,0.35)",
                      color: "#FFFFF0",
                      fontFamily: "var(--font-source-sans-3)",
                    }}
                    aria-label="Abrir um email com o pedido de reserva preparado"
                  >
                    <Mail size={14} />
                    Enviar Email
                  </a>
                  <a
                    href="tel:+351233434447"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-medium uppercase tracking-widest transition-all duration-300 hover:scale-[1.02] sm:col-span-2"
                    style={{
                      border: "1px solid rgba(255,255,240,0.16)",
                      color: "rgba(255,255,240,0.85)",
                      fontFamily: "var(--font-source-sans-3)",
                    }}
                    aria-label="Ligar para o restaurante para confirmar a reserva"
                  >
                    <Phone size={14} />
                    Ligar para Confirmar
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-5 text-xs uppercase tracking-[0.25em]"
                  style={{ color: "#CFB53B", fontFamily: "var(--font-source-sans-3)" }}
                >
                  Editar pedido
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label style={labelStyle} className="mb-2 block">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 text-sm transition-colors focus:border-[#CFB53B]"
                    style={inputStyle}
                    placeholder="O seu nome"
                  />
                </div>
                <div>
                  <label style={labelStyle} className="mb-2 block">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 text-sm transition-colors focus:border-[#CFB53B]"
                    style={inputStyle}
                    placeholder="9XX XXX XXX"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label style={labelStyle} className="mb-2 block">
                      Data
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 text-sm transition-colors focus:border-[#CFB53B]"
                      style={{ ...inputStyle, colorScheme: "dark" }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle} className="mb-2 block">
                      Hora
                    </label>
                    <select
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-4 py-3 text-sm transition-colors focus:border-[#CFB53B]"
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
                  <label style={labelStyle} className="mb-2 block">
                    Numero de Pessoas
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-4 py-3 text-sm transition-colors focus:border-[#CFB53B]"
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
                  <label style={labelStyle} className="mb-2 block">
                    Observacoes (opcional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full resize-none px-4 py-3 text-sm transition-colors focus:border-[#CFB53B]"
                    style={inputStyle}
                    placeholder="Alergias, preferencias, datas especiais..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 text-sm font-medium uppercase tracking-widest transition-all duration-300 hover:scale-[1.02]"
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
                  Este botao abre um rascunho de mensagem. A reserva so e enviada depois de a rever
                  e confirmar no WhatsApp ou por email.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
