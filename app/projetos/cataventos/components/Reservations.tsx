"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, Clock, Users, CalendarDays, CheckCircle } from "lucide-react";

const schedules = [
  { day: "Terça a Sexta", lunch: "12h30 – 15h00", dinner: "19h30 – 22h30" },
  { day: "Sábado", lunch: "12h30 – 15h30", dinner: "19h30 – 23h00" },
  { day: "Domingo", lunch: "12h30 – 15h30", dinner: "Fechado" },
  { day: "Segunda", lunch: "Fechado", dinner: "Fechado" },
];

export default function Reservations() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    notes: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Static site — show confirmation without backend
    setSubmitted(true);
  }

  return (
    <section ref={ref} id="reservas" className="py-24 bg-[#FFFDF7] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1E293B]/10 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-[#F59E0B]" />
            <CalendarDays className="w-5 h-5 text-[#B45309]" />
            <div className="h-px w-8 bg-[#F59E0B]" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#1E293B] mb-4"
            style={{ fontFamily: "'Work Sans', sans-serif" }}
          >
            Reservas
          </h2>
          <p className="text-[#1E293B]/60 text-lg max-w-xl mx-auto">
            Reserve a sua mesa e prepare-se para uma experiência gastronómica inesquecível.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left — contact & schedule */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Contact */}
            <div>
              <h3
                className="text-lg font-bold text-[#1E293B] mb-4"
                style={{ fontFamily: "'Work Sans', sans-serif" }}
              >
                Contacto Direto
              </h3>
              <div className="space-y-4">
                <a
                  href="tel:+351233097374"
                  className="flex items-center gap-4 p-4 border border-[#1E293B]/10 rounded-sm hover:border-[#F59E0B]/40 hover:bg-[#F59E0B]/5 transition-all group"
                >
                  <div className="w-10 h-10 rounded-sm bg-[#F59E0B]/10 flex items-center justify-center text-[#B45309] group-hover:bg-[#F59E0B]/20">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[#1E293B]/50 text-xs uppercase tracking-wider mb-0.5">Telefone</div>
                    <div className="text-[#1E293B] font-semibold">+351 233 097 374</div>
                  </div>
                </a>
                <a
                  href="mailto:cataventos.ff@gmail.com"
                  className="flex items-center gap-4 p-4 border border-[#1E293B]/10 rounded-sm hover:border-[#F59E0B]/40 hover:bg-[#F59E0B]/5 transition-all group"
                >
                  <div className="w-10 h-10 rounded-sm bg-[#F59E0B]/10 flex items-center justify-center text-[#B45309] group-hover:bg-[#F59E0B]/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[#1E293B]/50 text-xs uppercase tracking-wider mb-0.5">Email</div>
                    <div className="text-[#1E293B] font-semibold">cataventos.ff@gmail.com</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Schedules */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-[#B45309]" />
                <h3
                  className="text-lg font-bold text-[#1E293B]"
                  style={{ fontFamily: "'Work Sans', sans-serif" }}
                >
                  Horários
                </h3>
              </div>
              <div className="space-y-2">
                {schedules.map((s) => (
                  <div
                    key={s.day}
                    className="p-4 border border-[#1E293B]/8 rounded-sm bg-white/60"
                  >
                    <div className="font-semibold text-[#1E293B] text-sm mb-2">{s.day}</div>
                    <div className="flex gap-4 text-xs text-[#1E293B]/55">
                      <div>
                        <span className="uppercase tracking-wider text-[#1E293B]/35">Almoço </span>
                        <span className={s.lunch === "Fechado" ? "text-[#B45309]" : ""}>{s.lunch}</span>
                      </div>
                      <div>
                        <span className="uppercase tracking-wider text-[#1E293B]/35">Jantar </span>
                        <span className={s.dinner === "Fechado" ? "text-[#B45309]" : ""}>{s.dinner}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Groups note */}
            <div className="flex items-start gap-3 p-4 bg-[#F59E0B]/8 border border-[#F59E0B]/20 rounded-sm">
              <Users className="w-5 h-5 text-[#B45309] flex-shrink-0 mt-0.5" />
              <p className="text-[#1E293B]/70 text-sm leading-relaxed">
                Para grupos de 8 ou mais pessoas, contacte-nos diretamente para garantir disponibilidade
                e personalizar a sua experiência.
              </p>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-10 border border-[#F59E0B]/30 rounded-sm bg-[#F59E0B]/5"
              >
                <CheckCircle className="w-16 h-16 text-[#B45309] mb-4" />
                <h3
                  className="text-2xl font-bold text-[#1E293B] mb-2"
                  style={{ fontFamily: "'Work Sans', sans-serif" }}
                >
                  Pedido Enviado!
                </h3>
                <p className="text-[#1E293B]/60 max-w-sm">
                  Recebemos o seu pedido de reserva. Entraremos em contacto em breve para confirmar
                  a disponibilidade. Obrigado por escolher o Cataventos.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-[#B45309] text-sm font-medium underline underline-offset-4 hover:text-[#1E293B] transition-colors"
                >
                  Fazer nova reserva
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[#1E293B]/70 text-xs font-semibold uppercase tracking-wider mb-2">
                      Nome *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="O seu nome"
                      className="w-full px-4 py-3 border border-[#1E293B]/15 rounded-sm bg-white text-[#1E293B] placeholder-[#1E293B]/30 focus:outline-none focus:border-[#F59E0B]/60 focus:ring-1 focus:ring-[#F59E0B]/30 transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1E293B]/70 text-xs font-semibold uppercase tracking-wider mb-2">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="+351 9XX XXX XXX"
                      className="w-full px-4 py-3 border border-[#1E293B]/15 rounded-sm bg-white text-[#1E293B] placeholder-[#1E293B]/30 focus:outline-none focus:border-[#F59E0B]/60 focus:ring-1 focus:ring-[#F59E0B]/30 transition-all text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#1E293B]/70 text-xs font-semibold uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="o.seu@email.pt"
                    className="w-full px-4 py-3 border border-[#1E293B]/15 rounded-sm bg-white text-[#1E293B] placeholder-[#1E293B]/30 focus:outline-none focus:border-[#F59E0B]/60 focus:ring-1 focus:ring-[#F59E0B]/30 transition-all text-sm"
                  />
                </div>

                <div className="grid sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-[#1E293B]/70 text-xs font-semibold uppercase tracking-wider mb-2">
                      Data *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-[#1E293B]/15 rounded-sm bg-white text-[#1E293B] focus:outline-none focus:border-[#F59E0B]/60 focus:ring-1 focus:ring-[#F59E0B]/30 transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1E293B]/70 text-xs font-semibold uppercase tracking-wider mb-2">
                      Hora *
                    </label>
                    <select
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-[#1E293B]/15 rounded-sm bg-white text-[#1E293B] focus:outline-none focus:border-[#F59E0B]/60 focus:ring-1 focus:ring-[#F59E0B]/30 transition-all text-sm"
                    >
                      <option value="">Selecione</option>
                      <optgroup label="Almoço">
                        <option value="12:30">12h30</option>
                        <option value="13:00">13h00</option>
                        <option value="13:30">13h30</option>
                        <option value="14:00">14h00</option>
                      </optgroup>
                      <optgroup label="Jantar">
                        <option value="19:30">19h30</option>
                        <option value="20:00">20h00</option>
                        <option value="20:30">20h30</option>
                        <option value="21:00">21h00</option>
                        <option value="21:30">21h30</option>
                      </optgroup>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#1E293B]/70 text-xs font-semibold uppercase tracking-wider mb-2">
                      Pessoas *
                    </label>
                    <select
                      name="guests"
                      value={form.guests}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#1E293B]/15 rounded-sm bg-white text-[#1E293B] focus:outline-none focus:border-[#F59E0B]/60 focus:ring-1 focus:ring-[#F59E0B]/30 transition-all text-sm"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={String(n)}>
                          {n} {n === 1 ? "pessoa" : "pessoas"}
                        </option>
                      ))}
                      <option value="9+">9+ pessoas</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#1E293B]/70 text-xs font-semibold uppercase tracking-wider mb-2">
                    Observações
                  </label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Alergias, ocasião especial, preferências de mesa..."
                    className="w-full px-4 py-3 border border-[#1E293B]/15 rounded-sm bg-white text-[#1E293B] placeholder-[#1E293B]/30 focus:outline-none focus:border-[#F59E0B]/60 focus:ring-1 focus:ring-[#F59E0B]/30 transition-all text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1E293B] hover:bg-[#F59E0B] text-[#FFFDF7] hover:text-[#1E293B] font-semibold py-4 px-8 rounded-sm transition-all duration-300 tracking-wide text-sm uppercase"
                >
                  Enviar Pedido de Reserva
                </button>

                <p className="text-[#1E293B]/40 text-xs text-center">
                  A reserva está sujeita a confirmação. Responderemos em até 24 horas.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
