"use client";

import { motion, useInView } from "framer-motion";
import { CheckCircle, Clock, Mail, Phone } from "lucide-react";
import { useRef, useState } from "react";

const horarios = [
  { dia: "Segunda-feira", hora: "Encerrado" },
  { dia: "Terca a Sexta", hora: "12h00 - 15h30 | 19h00 - 22h30" },
  { dia: "Sabado", hora: "12h00 - 16h00 | 19h00 - 23h00" },
  { dia: "Domingo", hora: "12h00 - 16h00" },
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

  const reservationSummary = [
    `Nome: ${form.nome}`,
    `Telefone: ${form.telefone}`,
    `Email: ${form.email || "-"}`,
    `Data: ${form.data}`,
    `Hora: ${form.hora}`,
    `Pessoas: ${form.pessoas}`,
    `Observacoes: ${form.observacoes || "-"}`,
    "",
    "A reserva so fica enviada depois de confirmar o email ou ligar para o restaurante.",
  ].join("\n");

  const mailtoUrl = `mailto:verdadeira.ra@gmail.com?subject=${encodeURIComponent("Pedido de reserva - Marisqueira Rosa Amelia")}&body=${encodeURIComponent(reservationSummary)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  const inputClass =
    "w-full rounded-sm border border-[#D4A574]/20 bg-white/5 px-4 py-3 text-sm text-[#FFF1E6] placeholder-[#FFF1E6]/25 transition-colors focus:border-[#D4A574]/60 focus:outline-none";

  return (
    <section ref={ref} id="reservas" className="bg-[#FFF1E6] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p
            className="mb-4 text-xs uppercase tracking-[0.4em] text-[#E63946]/70"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Reservas
          </p>
          <h2
            className="text-[clamp(2.5rem,6vw,5rem)] font-light leading-tight text-[#1D3557]"
            style={{ fontFamily: "var(--font-newsreader), serif" }}
          >
            Reserve a sua <span className="italic text-[#E63946]">Mesa</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="mx-auto mt-8 h-px w-20 bg-[#D4A574]"
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="mb-10 space-y-6">
              <a href="tel:+351233412288" className="group flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E63946]/10 transition-colors group-hover:bg-[#E63946]/20">
                  <Phone className="h-5 w-5 text-[#E63946]" />
                </div>
                <div>
                  <p
                    className="mb-0.5 text-xs uppercase tracking-[0.2em] text-[#1D3557]/45"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Telefone / Reservas
                  </p>
                  <p
                    className="text-lg font-light text-[#1D3557] transition-colors group-hover:text-[#E63946]"
                    style={{ fontFamily: "var(--font-newsreader), serif" }}
                  >
                    +351 233 412 288
                  </p>
                </div>
              </a>

              <a href="mailto:verdadeira.ra@gmail.com" className="group flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D4A574]/10 transition-colors group-hover:bg-[#D4A574]/20">
                  <Mail className="h-5 w-5 text-[#D4A574]" />
                </div>
                <div>
                  <p
                    className="mb-0.5 text-xs uppercase tracking-[0.2em] text-[#1D3557]/45"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Email
                  </p>
                  <p
                    className="text-base font-light text-[#1D3557] transition-colors group-hover:text-[#D4A574]"
                    style={{ fontFamily: "var(--font-newsreader), serif" }}
                  >
                    verdadeira.ra@gmail.com
                  </p>
                </div>
              </a>
            </div>

            <div>
              <div className="mb-5 flex items-center gap-3">
                <Clock className="h-4 w-4 text-[#D4A574]" />
                <h3
                  className="text-lg font-light text-[#1D3557]"
                  style={{ fontFamily: "var(--font-newsreader), serif" }}
                >
                  Horario de Funcionamento
                </h3>
              </div>
              <div className="divide-y divide-[#D4A574]/15">
                {horarios.map((horario) => (
                  <div key={horario.dia} className="flex items-center justify-between py-3">
                    <span className="text-sm text-[#1D3557]/65">{horario.dia}</span>
                    <span
                      className={`text-sm font-light ${
                        horario.hora === "Encerrado" ? "text-[#E63946]/60" : "text-[#1D3557]"
                      }`}
                      style={{ fontFamily: "var(--font-newsreader), serif" }}
                    >
                      {horario.hora}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-sm border border-[#1D3557]/10 bg-[#1D3557]/5 p-5">
              <p className="text-sm leading-relaxed text-[#1D3557]/70">
                <span className="font-medium text-[#1D3557]">Nota importante:</span> Para grupos
                de mais de 6 pessoas, lagosta ou marisco em grande quantidade, pedimos reserva com
                pelo menos 24h de antecedencia.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="rounded-sm bg-[#1D3557] p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <CheckCircle className="mx-auto mb-5 h-14 w-14 text-[#D4A574]" />
                  <h3
                    className="mb-3 text-2xl font-light text-[#FFF1E6]"
                    style={{ fontFamily: "var(--font-newsreader), serif" }}
                  >
                    Rascunho Aberto no Email
                  </h3>
                  <p className="mx-auto max-w-md text-sm leading-relaxed text-[#FFF1E6]/60">
                    Abrimos um email com os dados da reserva. O pedido so segue depois de o rever,
                    enviar no email ou ligar para confirmar diretamente com o restaurante.
                  </p>
                  <div className="mx-auto mt-6 grid max-w-md gap-3 sm:grid-cols-2">
                    <a
                      href={mailtoUrl}
                      className="inline-flex items-center justify-center gap-2 rounded-sm border border-[#D4A574]/35 px-4 py-3 text-xs uppercase tracking-[0.2em] text-[#FFF1E6] transition-colors hover:border-[#D4A574]/60 hover:text-white"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                      aria-label="Abrir o email com o pedido de reserva preparado"
                    >
                      <Mail className="h-4 w-4" />
                      Abrir Email
                    </a>
                    <a
                      href="tel:+351233412288"
                      className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#E63946] px-4 py-3 text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#E63946]/90"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                      aria-label="Ligar para o restaurante e confirmar a reserva"
                    >
                      <Phone className="h-4 w-4" />
                      Ligar Agora
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-5 text-xs uppercase tracking-[0.2em] text-[#D4A574] transition-colors hover:text-[#FFF1E6]"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Editar pedido
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        className="mb-2 block text-xs uppercase tracking-[0.2em] text-[#D4A574]/70"
                        style={{ fontFamily: "var(--font-inter), sans-serif" }}
                      >
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
                      <label
                        className="mb-2 block text-xs uppercase tracking-[0.2em] text-[#D4A574]/70"
                        style={{ fontFamily: "var(--font-inter), sans-serif" }}
                      >
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
                    <label
                      className="mb-2 block text-xs uppercase tracking-[0.2em] text-[#D4A574]/70"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
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

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label
                        className="mb-2 block text-xs uppercase tracking-[0.2em] text-[#D4A574]/70"
                        style={{ fontFamily: "var(--font-inter), sans-serif" }}
                      >
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
                      <label
                        className="mb-2 block text-xs uppercase tracking-[0.2em] text-[#D4A574]/70"
                        style={{ fontFamily: "var(--font-inter), sans-serif" }}
                      >
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
                      <label
                        className="mb-2 block text-xs uppercase tracking-[0.2em] text-[#D4A574]/70"
                        style={{ fontFamily: "var(--font-inter), sans-serif" }}
                      >
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
                    <label
                      className="mb-2 block text-xs uppercase tracking-[0.2em] text-[#D4A574]/70"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      Observacoes / Pedidos Especiais
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
                    className="mt-2 w-full rounded-sm bg-[#E63946] py-4 text-sm uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#E63946]/90"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Abrir Pedido no Email
                  </button>
                  <p
                    className="text-center text-xs leading-relaxed text-[#FFF1E6]/55"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Este botao abre um email com os dados da reserva. O envio final depende da sua
                    confirmacao no email ou por telefone.
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
