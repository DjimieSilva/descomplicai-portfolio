"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, MessageSquare, Clock, MapPin, Mail } from "lucide-react";

const contactMethods = [
  {
    icon: Phone,
    title: "Telefone",
    desc: "Liga diretamente para a clínica que preferes",
    items: [
      { label: "Geral", value: "+351 233 429 538", href: "tel:+351233429538" },
    ],
    color: "#0EA5E9",
    bg: "#F0F9FF",
    emoji: "📞",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp",
    desc: "Envia mensagem e responde-te rapidamente",
    items: [
      {
        label: "Geral",
        value: "Chat WhatsApp",
        href: "https://wa.me/351233429538?text=Olá!%20Gostaria%20de%20marcar%20uma%20consulta.",
      },
    ],
    color: "#22C55E",
    bg: "#F0FDF4",
    emoji: "💬",
  },
  {
    icon: Mail,
    title: "E-mail",
    desc: "Para questões não urgentes ou orçamentos",
    items: [
      { label: "Geral", value: "dentalkid@ccdo-dentistas.pt", href: "mailto:dentalkid@ccdo-dentistas.pt" },
    ],
    color: "#14B8A6",
    bg: "#F0FDFA",
    emoji: "📧",
  },
  {
    icon: Clock,
    title: "Horário de Atendimento",
    desc: "Quando podes contactar-nos",
    items: [
      { label: "Segunda–Sexta", value: "9h00–19h00" },
      { label: "Sábado", value: "9h00–13h00" },
      { label: "Urgências", value: "Sempre que precisares" },
    ],
    color: "#84CC16",
    bg: "#F7FEE7",
    emoji: "🕐",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "buarcos",
    age: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Olá! Quero marcar uma consulta.\n\nNome: ${form.name}\nTelefone: ${form.phone}\nClínica: ${form.location}\nIdade da criança: ${form.age} anos\nMensagem: ${form.message || "Sem mensagem adicional"}`
    );
    const phone = "351233429538";
    window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section className="py-24 bg-white" id="contacto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            📞 Contacto
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black text-sky-900 mb-6"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Marca a tua{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-sky-500">
              primeira consulta!
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            O primeiro passo para um sorriso saudável é simples — contacta-nos.
            Respondemos sempre no próprio dia.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact methods */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="lg:col-span-2 space-y-4"
          >
            {contactMethods.map((method) => (
              <div
                key={method.title}
                className="rounded-2xl p-5 border border-gray-100"
                style={{ backgroundColor: method.bg }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{method.emoji}</span>
                  <div>
                    <p
                      className="font-black text-gray-900 text-sm"
                      style={{ fontFamily: "'Nunito', sans-serif" }}
                    >
                      {method.title}
                    </p>
                    <p className="text-gray-500 text-xs">{method.desc}</p>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {method.items.map((item) => (
                    <div
                      key={item.label}
                      className="flex justify-between items-center"
                    >
                      <span className="text-xs text-gray-500">{item.label}</span>
                      {"href" in item ? (
                        <a
                          href={item.href}
                          target={
                            item.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            item.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="text-xs font-bold hover:underline"
                          style={{ color: method.color }}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span
                          className="text-xs font-bold"
                          style={{ color: method.color }}
                        >
                          {item.value}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Quick booking form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="bg-gradient-to-br from-sky-50 to-green-50 rounded-3xl p-8 border border-sky-100">
              {!submitted ? (
                <>
                  <h3
                    className="text-2xl font-black text-sky-900 mb-2"
                    style={{ fontFamily: "'Nunito', sans-serif" }}
                  >
                    Pré-marcação rápida 🚀
                  </h3>
                  <p className="text-gray-600 text-sm mb-6">
                    Preenche o formulário e enviamos a confirmação pelo WhatsApp
                    em menos de 30 minutos durante o horário de atendimento.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">
                          Nome do pai/mãe *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          placeholder="Ana Silva"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-sm transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">
                          Telemóvel *
                        </label>
                        <input
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) =>
                            setForm({ ...form, phone: e.target.value })
                          }
                          placeholder="+351 9XX XXX XXX"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-sm transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">
                          Clínica preferida
                        </label>
                        <select
                          value={form.location}
                          onChange={(e) =>
                            setForm({ ...form, location: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-sm transition-all"
                        >
                          <option value="buarcos">📍 Buarcos</option>
                          <option value="tavarede">📍 Tavarede</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">
                          Idade da criança
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="17"
                          value={form.age}
                          onChange={(e) =>
                            setForm({ ...form, age: e.target.value })
                          }
                          placeholder="Ex: 7"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-sm transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">
                        Mensagem (opcional)
                      </label>
                      <textarea
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        placeholder="Ex: 'É a primeira visita', 'O meu filho tem medo de agulhas'..."
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent text-sm transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white font-black py-4 px-8 rounded-2xl text-base shadow-lg hover:shadow-sky-500/40 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Enviar pelo WhatsApp 💬
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                      Ao submeter, será redirecionado para o WhatsApp com a
                      mensagem pré-preenchida.
                    </p>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="text-center py-10"
                >
                  <div className="text-6xl mb-4">🎉</div>
                  <h3
                    className="text-2xl font-black text-sky-900 mb-2"
                    style={{ fontFamily: "'Nunito', sans-serif" }}
                  >
                    Obrigado!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    O WhatsApp foi aberto com a tua mensagem. Enviamo-la e a nossa
                    equipa responde rapidamente!
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-sky-600 text-sm font-semibold underline"
                  >
                    Enviar outra mensagem
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
