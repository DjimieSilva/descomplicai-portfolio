"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Calendar, Clock, Users, Phone } from "lucide-react";

export default function Reservations() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      ref={ref}
      id="reservas"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#1C1412" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg viewBox="0 0 1200 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="res-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M60 10 Q80 40 60 60 Q40 40 60 10Z" fill="none" stroke="#991B1B" strokeWidth="1.5" />
              <path d="M60 60 Q80 80 60 110 Q40 80 60 60Z" fill="none" stroke="#991B1B" strokeWidth="1.5" />
              <path d="M10 60 Q40 40 60 60 Q40 80 10 60Z" fill="none" stroke="#991B1B" strokeWidth="1.5" />
              <path d="M60 60 Q80 40 110 60 Q80 80 60 60Z" fill="none" stroke="#991B1B" strokeWidth="1.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#res-pattern)" />
        </svg>
      </div>

      <div className="relative max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px flex-1 max-w-20" style={{ background: "rgba(234,179,8,0.4)" }} />
            <span
              className="text-xs tracking-[0.4em] uppercase"
              style={{ color: "#EAB308", fontFamily: "var(--font-sora)" }}
            >
              Reservas
            </span>
            <div className="h-px flex-1 max-w-20" style={{ background: "rgba(234,179,8,0.4)" }} />
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-sora)", color: "#F5F0E8" }}
          >
            Reserve a Sua Mesa
          </h2>
          <p style={{ color: "rgba(245,240,232,0.6)" }} className="max-w-lg mx-auto">
            Garanta a sua experiência Thai na Figueira da Foz. Recomendamos reserva
            com antecedência, especialmente ao fim de semana.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-10 items-start">
          {/* Info sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="md:col-span-2 space-y-6"
          >
            {[
              {
                icon: <Clock size={20} />,
                title: "Horário",
                lines: [
                  "Ter – Sex: 12h30 – 15h00",
                  "Ter – Sex: 19h00 – 23h00",
                  "Sáb – Dom: 12h30 – 23h00",
                  "Segunda: Encerrado",
                ],
                color: "#EAB308",
              },
              {
                icon: <Phone size={20} />,
                title: "Contacto Direto",
                lines: ["(+351) 233 XXX XXX", "Whatsapp disponível"],
                color: "#EC4899",
              },
              {
                icon: <Users size={20} />,
                title: "Grupos",
                lines: ["Para grupos acima de 8 pessoas", "contacte-nos diretamente"],
                color: "#059669",
              },
            ].map((info) => (
              <div
                key={info.title}
                className="flex gap-4 p-4 rounded-xl"
                style={{
                  background: "rgba(245,240,232,0.04)",
                  border: `1px solid ${info.color}20`,
                }}
              >
                <div
                  className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: `${info.color}15`, color: info.color }}
                >
                  {info.icon}
                </div>
                <div>
                  <h3
                    className="font-semibold text-sm mb-1.5"
                    style={{ color: "#F5F0E8", fontFamily: "var(--font-sora)" }}
                  >
                    {info.title}
                  </h3>
                  {info.lines.map((line) => (
                    <p
                      key={line}
                      className="text-sm"
                      style={{ color: "rgba(245,240,232,0.6)" }}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="md:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16 px-8 rounded-xl"
                style={{
                  background: "rgba(5,150,105,0.08)",
                  border: "1px solid rgba(5,150,105,0.3)",
                }}
              >
                <div className="text-5xl mb-4">🙏</div>
                <h3
                  className="text-2xl font-bold mb-2"
                  style={{ color: "#F5F0E8", fontFamily: "var(--font-sora)" }}
                >
                  Obrigado, {formState.name}!
                </h3>
                <p style={{ color: "rgba(245,240,232,0.7)" }}>
                  A sua reserva foi recebida. Entraremos em contacto em breve para confirmação.
                </p>
                <p className="mt-3 text-sm" style={{ color: "#059669" }}>
                  Khob khun kha 🙏 — Obrigado em Thai
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-8 rounded-xl space-y-5"
                style={{
                  background: "rgba(245,240,232,0.04)",
                  border: "1px solid rgba(245,240,232,0.1)",
                }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-xs uppercase tracking-wider mb-2"
                      style={{ color: "rgba(245,240,232,0.5)", fontFamily: "var(--font-sora)" }}
                    >
                      Nome
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      placeholder="O seu nome"
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                      style={{
                        background: "rgba(245,240,232,0.07)",
                        border: "1px solid rgba(245,240,232,0.12)",
                        color: "#F5F0E8",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs uppercase tracking-wider mb-2"
                      style={{ color: "rgba(245,240,232,0.5)", fontFamily: "var(--font-sora)" }}
                    >
                      Telefone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      required
                      placeholder="9XX XXX XXX"
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                      style={{
                        background: "rgba(245,240,232,0.07)",
                        border: "1px solid rgba(245,240,232,0.12)",
                        color: "#F5F0E8",
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-xs uppercase tracking-wider mb-2"
                      style={{ color: "rgba(245,240,232,0.5)", fontFamily: "var(--font-sora)" }}
                    >
                      <Calendar size={12} className="inline mr-1" />
                      Data
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formState.date}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                      style={{
                        background: "rgba(245,240,232,0.07)",
                        border: "1px solid rgba(245,240,232,0.12)",
                        color: "#F5F0E8",
                        colorScheme: "dark",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs uppercase tracking-wider mb-2"
                      style={{ color: "rgba(245,240,232,0.5)", fontFamily: "var(--font-sora)" }}
                    >
                      <Clock size={12} className="inline mr-1" />
                      Hora
                    </label>
                    <select
                      name="time"
                      value={formState.time}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                      style={{
                        background: "rgba(245,240,232,0.07)",
                        border: "1px solid rgba(245,240,232,0.12)",
                        color: "#F5F0E8",
                      }}
                    >
                      <option value="" style={{ background: "#292524" }}>Selecionar</option>
                      {["12:30", "13:00", "13:30", "14:00", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"].map(
                        (t) => (
                          <option key={t} value={t} style={{ background: "#292524" }}>
                            {t}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    className="block text-xs uppercase tracking-wider mb-2"
                    style={{ color: "rgba(245,240,232,0.5)", fontFamily: "var(--font-sora)" }}
                  >
                    <Users size={12} className="inline mr-1" />
                    Número de Pessoas
                  </label>
                  <select
                    name="guests"
                    value={formState.guests}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                    style={{
                      background: "rgba(245,240,232,0.07)",
                      border: "1px solid rgba(245,240,232,0.12)",
                      color: "#F5F0E8",
                    }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n} style={{ background: "#292524" }}>
                        {n} {n === 1 ? "Pessoa" : "Pessoas"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    className="block text-xs uppercase tracking-wider mb-2"
                    style={{ color: "rgba(245,240,232,0.5)", fontFamily: "var(--font-sora)" }}
                  >
                    Notas / Alergias
                  </label>
                  <textarea
                    name="notes"
                    value={formState.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Alergias alimentares, ocasião especial, pedidos especiais..."
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none"
                    style={{
                      background: "rgba(245,240,232,0.07)",
                      border: "1px solid rgba(245,240,232,0.12)",
                      color: "#F5F0E8",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-lg text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #991B1B, #7f1515)",
                    color: "#F5F0E8",
                    fontFamily: "var(--font-sora)",
                    boxShadow: "0 4px 20px rgba(153,27,27,0.3)",
                  }}
                >
                  Confirmar Reserva
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
