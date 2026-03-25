"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function Reservations() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    data: "",
    hora: "",
    pessoas: "2",
    ocasiao: "",
    notas: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    "w-full bg-transparent border border-[#FAF9F6]/15 text-[#FAF9F6] placeholder-[#D4C5A9]/30 px-4 py-3.5 text-sm font-['Libre_Franklin'] focus:outline-none focus:border-[#92702B] transition-colors duration-300 appearance-none";
  const labelClass = "block text-[#D4C5A9]/50 text-xs tracking-[0.2em] uppercase font-['Libre_Franklin'] mb-2";

  return (
    <section ref={ref} id="reservas" className="bg-[#FAF9F6] py-24 md:py-36 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-[#92702B]/60 text-xs tracking-[0.4em] uppercase font-['Libre_Franklin'] mb-4"
          >
            Reservas
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-['Playfair_Display'] text-[#1C1917] text-4xl md:text-5xl font-light"
            >
              Reserve a sua mesa
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-[#1C1917]/50 text-sm font-['Libre_Franklin'] mt-4 max-w-md mx-auto leading-relaxed"
          >
            Recomendamos reserva com pelo menos 48 horas de antecedência. Para grupos acima de 8 pessoas, contacte-nos diretamente.
          </motion.p>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {submitted ? (
            <div className="text-center py-16 border border-[#1C1917]/10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <CheckCircle className="w-12 h-12 text-[#92702B] mx-auto mb-6" />
                <h3 className="font-['Playfair_Display'] text-[#1C1917] text-2xl font-light mb-3">
                  Pedido recebido
                </h3>
                <p className="text-[#1C1917]/60 text-sm font-['Libre_Franklin'] max-w-sm mx-auto leading-relaxed">
                  Entraremos em contacto nas próximas horas para confirmar a sua reserva. Aguardamo-lo no SAND.
                </p>
              </motion.div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="border border-[#1C1917]/10 p-8 md:p-12 space-y-6"
            >
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Nome completo *</label>
                  <input
                    type="text"
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    required
                    placeholder="O seu nome"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="email@exemplo.com"
                    className={inputClass}
                    style={{ colorScheme: "light" }}
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Telefone</label>
                  <input
                    type="tel"
                    name="telefone"
                    value={form.telefone}
                    onChange={handleChange}
                    placeholder="+351 9__ ___ ___"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Nº de pessoas *</label>
                  <select
                    name="pessoas"
                    value={form.pessoas}
                    onChange={handleChange}
                    required
                    className={inputClass + " cursor-pointer"}
                    style={{ colorScheme: "light" }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n} className="bg-[#FAF9F6] text-[#1C1917]">
                        {n} {n === 1 ? "pessoa" : "pessoas"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Data *</label>
                  <input
                    type="date"
                    name="data"
                    value={form.data}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    style={{ colorScheme: "light" }}
                  />
                </div>
                <div>
                  <label className={labelClass}>Hora preferida *</label>
                  <select
                    name="hora"
                    value={form.hora}
                    onChange={handleChange}
                    required
                    className={inputClass + " cursor-pointer"}
                    style={{ colorScheme: "light" }}
                  >
                    <option value="" className="bg-[#FAF9F6] text-[#1C1917]">Selecionar hora</option>
                    {["19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"].map((h) => (
                      <option key={h} value={h} className="bg-[#FAF9F6] text-[#1C1917]">{h}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Ocasião */}
              <div>
                <label className={labelClass}>Ocasião especial</label>
                <select
                  name="ocasiao"
                  value={form.ocasiao}
                  onChange={handleChange}
                  className={inputClass + " cursor-pointer"}
                  style={{ colorScheme: "light" }}
                >
                  <option value="" className="bg-[#FAF9F6] text-[#1C1917]">Nenhuma em particular</option>
                  {["Aniversário", "Proposta de casamento", "Aniversário de casamento", "Jantar de negócios", "Celebração"].map((o) => (
                    <option key={o} value={o} className="bg-[#FAF9F6] text-[#1C1917]">{o}</option>
                  ))}
                </select>
              </div>

              {/* Notas */}
              <div>
                <label className={labelClass}>Notas adicionais</label>
                <textarea
                  name="notas"
                  value={form.notas}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Alergias, preferências ou pedidos especiais..."
                  className={inputClass + " resize-none"}
                />
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="group w-full md:w-auto flex items-center justify-center gap-3 bg-[#1C1917] text-[#FAF9F6] px-10 py-4 text-xs tracking-[0.3em] uppercase font-['Libre_Franklin'] hover:bg-[#92702B] transition-all duration-400"
                >
                  <span>Solicitar Reserva</span>
                  <Send className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          )}
        </motion.div>

      </div>
    </section>
  );
}
