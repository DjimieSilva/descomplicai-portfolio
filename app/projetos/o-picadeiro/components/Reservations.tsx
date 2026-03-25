"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, Clock, CheckCircle } from "lucide-react";

const timeSlots = [
  "12:30", "13:00", "13:30", "14:00",
  "19:00", "19:30", "20:00", "20:30", "21:00", "21:30",
];

const partyOptions = ["1–2 pessoas", "3–4 pessoas", "5–6 pessoas", "7–8 pessoas", "9+ pessoas"];

export default function Reservations() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    party: "",
    occasion: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    "w-full bg-transparent border-b border-[#FFFBEB]/20 py-3 text-[#FFFBEB] placeholder-[#FFFBEB]/30 text-sm focus:outline-none focus:border-[#B87333] transition-colors duration-200";
  const labelClass = "block text-xs tracking-[0.2em] uppercase text-[#FFFBEB]/50 mb-2";

  return (
    <section ref={ref} id="reservas" className="py-24 md:py-32 px-6 bg-[#1B4332]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Left: info panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-8 bg-[#B87333]" />
              <span
                className="text-[#B87333] text-xs tracking-[0.3em] uppercase"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Reservas
              </span>
            </div>

            <h2
              className="text-4xl md:text-5xl font-light text-[#FFFBEB] mb-6 leading-tight"
              style={{ fontFamily: "var(--font-literata)" }}
            >
              Reserve a Sua{" "}
              <span className="italic text-[#B87333]">Mesa</span>
            </h2>

            <p
              className="text-[#FFFBEB]/60 leading-relaxed mb-12"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Recomendamos reserva antecipada, especialmente aos fins de semana e
              feriados. Respondemos a todas as reservas no próprio dia.
            </p>

            {/* Contact info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-[#B87333]/40 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#B87333]" />
                </div>
                <div>
                  <p
                    className="text-xs tracking-[0.2em] uppercase text-[#FFFBEB]/40 mb-1"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Telefone
                  </p>
                  <a
                    href="tel:+351233420000"
                    className="text-[#FFFBEB] hover:text-[#B87333] transition-colors"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    +351 233 420 000
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-[#B87333]/40 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#B87333]" />
                </div>
                <div>
                  <p
                    className="text-xs tracking-[0.2em] uppercase text-[#FFFBEB]/40 mb-1"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Email
                  </p>
                  <a
                    href="mailto:reservas@opicadeiro.pt"
                    className="text-[#FFFBEB] hover:text-[#B87333] transition-colors"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    reservas@opicadeiro.pt
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-[#B87333]/40 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-[#B87333]" />
                </div>
                <div>
                  <p
                    className="text-xs tracking-[0.2em] uppercase text-[#FFFBEB]/40 mb-1"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Horário
                  </p>
                  <div style={{ fontFamily: "var(--font-inter)" }}>
                    <p className="text-[#FFFBEB] text-sm">
                      Almoço: Ter–Dom · 12:30–15:00
                    </p>
                    <p className="text-[#FFFBEB] text-sm">
                      Jantar: Ter–Sáb · 19:00–22:30
                    </p>
                    <p className="text-[#FFFBEB]/40 text-xs mt-1">
                      Encerrado às segundas-feiras
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cancellation policy */}
            <div className="mt-12 p-5 border border-[#FFFBEB]/10">
              <p
                className="text-xs text-[#FFFBEB]/40 leading-relaxed"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <span className="text-[#B87333] uppercase tracking-wide">Política de Cancelamento:</span>{" "}
                Aceitamos cancelamentos até 24 horas antes sem qualquer custo.
                Para grupos a partir de 8 pessoas, pedimos 48 horas de antecedência.
              </p>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-20"
              >
                <div className="w-16 h-16 border border-[#B87333] flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8 text-[#B87333]" />
                </div>
                <h3
                  className="text-3xl font-light text-[#FFFBEB] mb-4"
                  style={{ fontFamily: "var(--font-literata)" }}
                >
                  Pedido Recebido!
                </h3>
                <p
                  className="text-[#FFFBEB]/60 max-w-sm"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Confirmamos a sua reserva por email e telefone dentro de algumas horas.
                  Aguardamos a sua visita com prazer.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className={labelClass} htmlFor="name" style={{ fontFamily: "var(--font-inter)" }}>
                      Nome Completo *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="O seu nome"
                      className={inputClass}
                      style={{ fontFamily: "var(--font-inter)" }}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="phone" style={{ fontFamily: "var(--font-inter)" }}>
                      Telefone *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+351 9xx xxx xxx"
                      className={inputClass}
                      style={{ fontFamily: "var(--font-inter)" }}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className={labelClass} htmlFor="email" style={{ fontFamily: "var(--font-inter)" }}>
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="o.seu@email.pt"
                    className={inputClass}
                    style={{ fontFamily: "var(--font-inter)" }}
                  />
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <label className={labelClass} htmlFor="date" style={{ fontFamily: "var(--font-inter)" }}>
                      Data *
                    </label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      required
                      value={form.date}
                      onChange={handleChange}
                      className={inputClass + " [color-scheme:dark]"}
                      style={{ fontFamily: "var(--font-inter)" }}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="time" style={{ fontFamily: "var(--font-inter)" }}>
                      Hora *
                    </label>
                    <select
                      id="time"
                      name="time"
                      required
                      value={form.time}
                      onChange={handleChange}
                      className={inputClass + " bg-[#1B4332] cursor-pointer"}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      <option value="" disabled>Seleccionar</option>
                      <optgroup label="Almoço">
                        {timeSlots.slice(0, 4).map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Jantar">
                        {timeSlots.slice(4).map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="party" style={{ fontFamily: "var(--font-inter)" }}>
                      Nº Pessoas *
                    </label>
                    <select
                      id="party"
                      name="party"
                      required
                      value={form.party}
                      onChange={handleChange}
                      className={inputClass + " bg-[#1B4332] cursor-pointer"}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      <option value="" disabled>Seleccionar</option>
                      {partyOptions.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Occasion */}
                <div>
                  <label className={labelClass} htmlFor="occasion" style={{ fontFamily: "var(--font-inter)" }}>
                    Ocasião (opcional)
                  </label>
                  <select
                    id="occasion"
                    name="occasion"
                    value={form.occasion}
                    onChange={handleChange}
                    className={inputClass + " bg-[#1B4332] cursor-pointer"}
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    <option value="">Refeição habitual</option>
                    <option>Aniversário</option>
                    <option>Casamento / Noivado</option>
                    <option>Evento Corporativo</option>
                    <option>Celebração Familiar</option>
                    <option>Outro</option>
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <label className={labelClass} htmlFor="notes" style={{ fontFamily: "var(--font-inter)" }}>
                    Notas / Alergias
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Intolerâncias, preferências ou pedidos especiais..."
                    className={inputClass + " resize-none"}
                    style={{ fontFamily: "var(--font-inter)" }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="group w-full bg-[#B87333] text-[#FFFBEB] py-4 text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#FFFBEB] hover:text-[#1B4332] flex items-center justify-center gap-3"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Confirmar Reserva
                  <span className="w-4 h-px bg-current transition-all duration-300 group-hover:w-6" />
                </button>

                <p
                  className="text-center text-xs text-[#FFFBEB]/30"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Os seus dados são utilizados exclusivamente para a gestão da reserva
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
