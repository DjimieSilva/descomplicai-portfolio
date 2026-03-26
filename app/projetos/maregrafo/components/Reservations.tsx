"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, MessageCircle, Calendar, Clock, Users, CheckCircle } from "lucide-react";

const timeSlots = [
  "12h00", "12h30", "13h00", "13h30",
  "19h30", "20h00", "20h30", "21h00",
];

const partySizes = ["1–2", "3–4", "5–6", "7–8", "9+"];

export default function Reservations() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [partySize, setPartySize] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleWhatsApp() {
    const msg = encodeURIComponent(
      `Olá! Gostaria de reservar uma mesa no Marégrafo.\n\nNome: ${name}\nData: ${date}\nHora: ${time}\nPessoas: ${partySize}\nTelefone: ${phone}${notes ? `\nNota: ${notes}` : ""}`
    );
    window.open(`https://wa.me/351233433150?text=${msg}`, "_blank");
    setSubmitted(true);
  }

  return (
    <section
      ref={ref}
      id="reservas"
      className="py-24 px-6 md:px-12 overflow-hidden"
      style={{ backgroundColor: "#F8F9FA" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-5"
            style={{ backgroundColor: "#B8E0D2", color: "#003049" }}
          >
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-semibold">Reservas</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-5"
            style={{ fontFamily: "Lexend, sans-serif", color: "#003049" }}
          >
            Reserve a sua mesa
          </h2>
          <p className="text-lg max-w-xl mx-auto leading-relaxed" style={{ color: "#4a6070" }}>
            Garanta uma mesa com vista mar. Aceitamos reservas por telefone,
            WhatsApp ou diretamente em baixo.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-10">
          {/* Left: contact quick access */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="md:col-span-2 space-y-5"
          >
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: "#003049" }}
            >
              <h3
                className="text-white font-bold text-lg mb-4"
                style={{ fontFamily: "Lexend, sans-serif" }}
              >
                Contactos diretos
              </h3>
              <div className="space-y-4">
                <a
                  href="tel:+351233433150"
                  className="flex items-center gap-3 text-[#B8E0D2] hover:text-white transition-colors"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(184,224,210,0.15)" }}
                  >
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Telefone</p>
                    <p className="text-[#B8E0D2]/70 text-xs">+351 233 433 150</p>
                  </div>
                </a>
                <a
                  href="mailto:rmanof@gmail.com"
                  className="flex items-center gap-3 text-[#B8E0D2] hover:text-white transition-colors"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(184,224,210,0.15)" }}
                  >
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Email</p>
                    <p className="text-[#B8E0D2]/70 text-xs">rmanof@gmail.com</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Horário */}
            <div
              className="rounded-2xl p-6"
              style={{ border: "1.5px solid #B8E0D2" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5" style={{ color: "#003049" }} />
                <h3
                  className="font-bold"
                  style={{ fontFamily: "Lexend, sans-serif", color: "#003049" }}
                >
                  Horário
                </h3>
              </div>
              <div className="space-y-2 text-sm" style={{ color: "#4a6070" }}>
                <div className="flex justify-between">
                  <span>Segunda-feira</span>
                  <span className="font-medium" style={{ color: "#D4A574" }}>Encerrado</span>
                </div>
                <div className="flex justify-between">
                  <span>Terça a Sexta</span>
                  <span>12h–15h · 19h–22h</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábado</span>
                  <span>12h–15h30 · 19h–22h30</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingo</span>
                  <span>12h–16h</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: reservation form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="md:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full rounded-3xl p-10 flex flex-col items-center justify-center text-center"
                style={{ backgroundColor: "white", border: "1.5px solid #B8E0D2" }}
              >
                <CheckCircle className="w-16 h-16 mb-6" style={{ color: "#003049" }} />
                <h3
                  className="text-2xl font-bold mb-3"
                  style={{ fontFamily: "Lexend, sans-serif", color: "#003049" }}
                >
                  Pedido enviado!
                </h3>
                <p style={{ color: "#4a6070" }}>
                  Recebemos o seu pedido de reserva via WhatsApp. Confirmaremos
                  em breve. Até já no Marégrafo!
                </p>
              </motion.div>
            ) : (
              <div
                className="rounded-3xl p-7 space-y-5"
                style={{ backgroundColor: "white", border: "1.5px solid #e8f0f5" }}
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "#003049" }}>
                      Nome *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="O seu nome"
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                      style={{
                        border: "1.5px solid #e8f0f5",
                        color: "#003049",
                        backgroundColor: "#F8F9FA",
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "#003049" }}>
                      Telemóvel *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+351 9XX XXX XXX"
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                      style={{
                        border: "1.5px solid #e8f0f5",
                        color: "#003049",
                        backgroundColor: "#F8F9FA",
                      }}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "#003049" }}>
                      Data *
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                      style={{
                        border: "1.5px solid #e8f0f5",
                        color: "#003049",
                        backgroundColor: "#F8F9FA",
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "#003049" }}>
                      Hora
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {timeSlots.slice(0, 4).map((t) => (
                        <button
                          key={t}
                          onClick={() => setTime(t)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                          style={
                            time === t
                              ? { backgroundColor: "#003049", color: "white" }
                              : { backgroundColor: "#F8F9FA", color: "#003049", border: "1px solid #e8f0f5" }
                          }
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {timeSlots.slice(4).map((t) => (
                        <button
                          key={t}
                          onClick={() => setTime(t)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                          style={
                            time === t
                              ? { backgroundColor: "#003049", color: "white" }
                              : { backgroundColor: "#F8F9FA", color: "#003049", border: "1px solid #e8f0f5" }
                          }
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Party size */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#003049" }}>
                    <Users className="w-4 h-4 inline mr-1" />
                    Número de pessoas
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {partySizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setPartySize(s)}
                        className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                        style={
                          partySize === s
                            ? { backgroundColor: "#003049", color: "white" }
                            : { backgroundColor: "#F8F9FA", color: "#003049", border: "1px solid #e8f0f5" }
                        }
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "#003049" }}>
                    Observações (opcional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Alergias, ocasião especial, preferência de mesa..."
                    rows={3}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none"
                    style={{
                      border: "1.5px solid #e8f0f5",
                      color: "#003049",
                      backgroundColor: "#F8F9FA",
                    }}
                  />
                </div>

                {/* Submit */}
                <button
                  onClick={handleWhatsApp}
                  disabled={!name || !phone || !date}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{ backgroundColor: "#25D366" }}
                >
                  <MessageCircle className="w-5 h-5" />
                  Enviar reserva via WhatsApp
                </button>

                <p className="text-center text-xs" style={{ color: "#4a6070" }}>
                  Será redirecionado para o WhatsApp com a sua reserva já preenchida.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
