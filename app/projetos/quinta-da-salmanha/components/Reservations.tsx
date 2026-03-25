"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Calendar, Users, Phone, Mail, MessageSquare, CheckCircle } from "lucide-react";

type FormType = "mesa" | "evento";

export default function Reservations() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formType, setFormType] = useState<FormType>("mesa");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      ref={ref}
      id="reservas"
      className="py-24 md:py-36 relative overflow-hidden"
      style={{ background: "#FEFCE8" }}
    >
      {/* Subtle vine pattern */}
      <div
        className="absolute right-0 top-0 bottom-0 w-2 md:w-3"
        style={{ background: "linear-gradient(180deg, #556B2F, #722F37 50%, #C4A55A)" }}
      />

      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
          >
            <p
              className="text-xs tracking-[0.45em] uppercase mb-4"
              style={{ color: "#556B2F", fontFamily: "var(--font-inter)" }}
            >
              Reservas
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              style={{ fontFamily: "var(--font-libre-caslon)", color: "#3D2B1F" }}
            >
              Reserve a sua
              <br />
              <em style={{ color: "#722F37" }}>experiência</em>
            </h2>
            <div className="w-16 h-[2px] mb-8" style={{ background: "#C4A55A" }} />

            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "#5C4A3A", fontFamily: "var(--font-inter)", fontWeight: 300 }}
            >
              Planeie a sua visita à Quinta da Salmanha. Para reservas de mesa, basta preencher
              o formulário. Para eventos especiais, a nossa equipa entrará em contacto para
              preparar uma proposta personalizada.
            </p>

            {/* Contact methods */}
            <div className="space-y-4">
              <a
                href="tel:+351239000000"
                className="flex items-center gap-4 group"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ background: "#722F37" }}
                >
                  <Phone size={15} color="#FEFCE8" />
                </div>
                <div>
                  <p className="text-xs tracking-wide uppercase" style={{ color: "#A8A29E", fontFamily: "var(--font-inter)" }}>
                    Telefone
                  </p>
                  <p className="font-medium" style={{ color: "#3D2B1F", fontFamily: "var(--font-inter)" }}>
                    +351 239 000 000
                  </p>
                </div>
              </a>

              <a
                href="mailto:reservas@quintadasalmanha.pt"
                className="flex items-center gap-4 group"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ background: "#556B2F" }}
                >
                  <Mail size={15} color="#FEFCE8" />
                </div>
                <div>
                  <p className="text-xs tracking-wide uppercase" style={{ color: "#A8A29E", fontFamily: "var(--font-inter)" }}>
                    Email
                  </p>
                  <p className="font-medium" style={{ color: "#3D2B1F", fontFamily: "var(--font-inter)" }}>
                    reservas@quintadasalmanha.pt
                  </p>
                </div>
              </a>
            </div>

            {/* Hours */}
            <div
              className="mt-10 p-6 rounded-sm"
              style={{ background: "rgba(168,162,158,0.12)", border: "1px solid rgba(168,162,158,0.25)" }}
            >
              <p
                className="text-xs tracking-[0.4em] uppercase mb-4"
                style={{ color: "#556B2F", fontFamily: "var(--font-inter)" }}
              >
                Horário
              </p>
              {[
                { days: "Segunda a Sexta", hours: "12h00 — 15h30" },
                { days: "Sábado e Domingo", hours: "12h00 — 16h00" },
                { days: "Eventos Nocturnos", hours: "A partir das 19h30" },
              ].map((h) => (
                <div key={h.days} className="flex justify-between items-center mb-3 last:mb-0">
                  <span className="text-sm" style={{ color: "#5C4A3A", fontFamily: "var(--font-inter)", fontWeight: 300 }}>
                    {h.days}
                  </span>
                  <span className="text-sm font-medium" style={{ color: "#3D2B1F", fontFamily: "var(--font-inter)" }}>
                    {h.hours}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <CheckCircle size={56} style={{ color: "#556B2F" }} className="mb-6" />
                <h3
                  className="text-3xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-libre-caslon)", color: "#3D2B1F" }}
                >
                  Pedido Recebido!
                </h3>
                <p
                  className="text-base leading-relaxed max-w-sm"
                  style={{ color: "#5C4A3A", fontFamily: "var(--font-inter)", fontWeight: 300 }}
                >
                  Entraremos em contacto em breve para confirmar a sua reserva.
                  Obrigado por escolher a Quinta da Salmanha.
                </p>
              </motion.div>
            ) : (
              <div
                className="p-8 rounded-sm"
                style={{
                  background: "white",
                  boxShadow: "0 8px 40px rgba(61,43,31,0.1)",
                  border: "1px solid rgba(168,162,158,0.2)",
                }}
              >
                {/* Toggle */}
                <div className="flex gap-2 mb-8">
                  {(["mesa", "evento"] as FormType[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setFormType(t)}
                      className="flex-1 py-2.5 text-sm transition-all duration-300"
                      style={{
                        fontFamily: "var(--font-inter)",
                        background: formType === t ? "#722F37" : "transparent",
                        color: formType === t ? "#FEFCE8" : "#5C4A3A",
                        border: `1px solid ${formType === t ? "#722F37" : "rgba(168,162,158,0.4)"}`,
                      }}
                    >
                      {t === "mesa" ? "Reservar Mesa" : "Evento Especial"}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label
                      className="block text-xs tracking-wide uppercase mb-2"
                      style={{ color: "#A8A29E", fontFamily: "var(--font-inter)" }}
                    >
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#722F37]"
                      style={{
                        fontFamily: "var(--font-inter)",
                        color: "#3D2B1F",
                        background: "#FEFCE8",
                        border: "1px solid rgba(168,162,158,0.4)",
                      }}
                      placeholder="O seu nome"
                    />
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-xs tracking-wide uppercase mb-2"
                        style={{ color: "#A8A29E", fontFamily: "var(--font-inter)" }}
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#722F37]"
                        style={{
                          fontFamily: "var(--font-inter)",
                          color: "#3D2B1F",
                          background: "#FEFCE8",
                          border: "1px solid rgba(168,162,158,0.4)",
                        }}
                        placeholder="email@exemplo.pt"
                      />
                    </div>
                    <div>
                      <label
                        className="block text-xs tracking-wide uppercase mb-2"
                        style={{ color: "#A8A29E", fontFamily: "var(--font-inter)" }}
                      >
                        Telefone
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#722F37]"
                        style={{
                          fontFamily: "var(--font-inter)",
                          color: "#3D2B1F",
                          background: "#FEFCE8",
                          border: "1px solid rgba(168,162,158,0.4)",
                        }}
                        placeholder="9XX XXX XXX"
                      />
                    </div>
                  </div>

                  {/* Date + Guests */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-xs tracking-wide uppercase mb-2"
                        style={{ color: "#A8A29E", fontFamily: "var(--font-inter)" }}
                      >
                        <Calendar size={11} className="inline mr-1" />
                        Data *
                      </label>
                      <input
                        type="date"
                        required
                        className="w-full px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#722F37]"
                        style={{
                          fontFamily: "var(--font-inter)",
                          color: "#3D2B1F",
                          background: "#FEFCE8",
                          border: "1px solid rgba(168,162,158,0.4)",
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-xs tracking-wide uppercase mb-2"
                        style={{ color: "#A8A29E", fontFamily: "var(--font-inter)" }}
                      >
                        <Users size={11} className="inline mr-1" />
                        Pessoas *
                      </label>
                      <select
                        required
                        className="w-full px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#722F37]"
                        style={{
                          fontFamily: "var(--font-inter)",
                          color: "#3D2B1F",
                          background: "#FEFCE8",
                          border: "1px solid rgba(168,162,158,0.4)",
                        }}
                      >
                        <option value="">Seleccione</option>
                        {formType === "mesa"
                          ? ["1-2", "3-4", "5-6", "7-10", "+10"].map((n) => <option key={n}>{n} pessoas</option>)
                          : ["20-50", "51-100", "101-150", "151-200", "+200"].map((n) => <option key={n}>{n} pessoas</option>)
                        }
                      </select>
                    </div>
                  </div>

                  {/* Event type (only for events) */}
                  {formType === "evento" && (
                    <div>
                      <label
                        className="block text-xs tracking-wide uppercase mb-2"
                        style={{ color: "#A8A29E", fontFamily: "var(--font-inter)" }}
                      >
                        Tipo de Evento *
                      </label>
                      <select
                        required
                        className="w-full px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#722F37]"
                        style={{
                          fontFamily: "var(--font-inter)",
                          color: "#3D2B1F",
                          background: "#FEFCE8",
                          border: "1px solid rgba(168,162,158,0.4)",
                        }}
                      >
                        <option value="">Seleccione o evento</option>
                        <option>Casamento</option>
                        <option>Baptizado / Comunhão</option>
                        <option>Aniversário</option>
                        <option>Evento Corporativo</option>
                        <option>Outro</option>
                      </select>
                    </div>
                  )}

                  {/* Message */}
                  <div>
                    <label
                      className="block text-xs tracking-wide uppercase mb-2"
                      style={{ color: "#A8A29E", fontFamily: "var(--font-inter)" }}
                    >
                      <MessageSquare size={11} className="inline mr-1" />
                      Notas / Pedidos Especiais
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#722F37] resize-none"
                      style={{
                        fontFamily: "var(--font-inter)",
                        color: "#3D2B1F",
                        background: "#FEFCE8",
                        border: "1px solid rgba(168,162,158,0.4)",
                      }}
                      placeholder="Alergias, preferências, ocasião especial..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 text-sm tracking-[0.25em] uppercase font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                    style={{
                      background: "#722F37",
                      color: "#FEFCE8",
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    {formType === "mesa" ? "Confirmar Reserva" : "Solicitar Proposta"}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
