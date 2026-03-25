"use client";

import { motion, type Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, MapPin, Clock, Send, CheckCircle, Facebook } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

const hours = [
  { day: "Segunda-feira", time: "09:00 – 19:00" },
  { day: "Terça-feira", time: "09:00 – 19:00" },
  { day: "Quarta-feira", time: "09:00 – 19:00" },
  { day: "Quinta-feira", time: "09:00 – 19:00" },
  { day: "Sexta-feira", time: "09:00 – 19:00" },
  { day: "Sábado", time: "09:00 – 13:00" },
  { day: "Domingo", time: "Encerrado" },
];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission (static site)
    setTimeout(() => {
      setSent(true);
      setLoading(false);
    }, 1500);
  };

  const today = new Date().getDay(); // 0 = Sunday, 6 = Saturday

  return (
    <section id="contacto" ref={ref} className="bg-[#0A1628] py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 text-[#C8A55A] text-xs tracking-[0.3em] uppercase font-semibold mb-4"
          >
            <span className="w-8 h-[1px] bg-[#C8A55A]" />
            Contacte-nos
            <span className="w-8 h-[1px] bg-[#C8A55A]" />
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-serif text-4xl lg:text-5xl text-white leading-tight mb-6"
          >
            Marque a sua{" "}
            <span className="text-[#C8A55A] italic">consulta hoje</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
            Dê o primeiro passo para o sorriso que sempre desejou. A nossa equipa responde em menos de 24 horas.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left: contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Phone */}
            <div className="bg-white/5 border border-white/10 p-6 hover:border-[#C8A55A]/30 transition-colors group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C8A55A]/15 flex items-center justify-center shrink-0 group-hover:bg-[#C8A55A]/25 transition-colors">
                  <Phone size={20} className="text-[#C8A55A]" />
                </div>
                <div>
                  <div className="text-white/50 text-xs uppercase tracking-widest mb-1">Telefone</div>
                  <a
                    href="tel:+351233433720"
                    className="text-white font-serif text-xl font-semibold hover:text-[#C8A55A] transition-colors"
                  >
                    233 433 720
                  </a>
                  <div className="text-white/40 text-xs mt-1">Chamada para rede fixa nacional</div>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white/5 border border-white/10 p-6 hover:border-[#C8A55A]/30 transition-colors group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C8A55A]/15 flex items-center justify-center shrink-0 group-hover:bg-[#C8A55A]/25 transition-colors">
                  <MapPin size={20} className="text-[#C8A55A]" />
                </div>
                <div>
                  <div className="text-white/50 text-xs uppercase tracking-widest mb-1">Morada</div>
                  <div className="text-white font-semibold">R. Vasco da Gama 93</div>
                  <div className="text-white/70">3080-001 Figueira da Foz</div>
                  <a
                    href="https://maps.google.com/?q=Rua+Vasco+da+Gama+93+Figueira+da+Foz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C8A55A] text-xs mt-2 inline-block hover:underline"
                  >
                    Ver no Google Maps →
                  </a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white/5 border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-[#C8A55A]/15 flex items-center justify-center">
                  <Clock size={16} className="text-[#C8A55A]" />
                </div>
                <div className="text-white/50 text-xs uppercase tracking-widest">Horário</div>
              </div>
              <div className="space-y-2">
                {hours.map((h, i) => {
                  const isToday = (i === 0 && today === 1) ||
                    (i === 1 && today === 2) ||
                    (i === 2 && today === 3) ||
                    (i === 3 && today === 4) ||
                    (i === 4 && today === 5) ||
                    (i === 5 && today === 6) ||
                    (i === 6 && today === 0);
                  return (
                    <div
                      key={h.day}
                      className={`flex items-center justify-between text-sm py-1 ${
                        isToday ? "text-[#C8A55A] font-semibold" : ""
                      }`}
                    >
                      <span className={isToday ? "text-[#C8A55A]" : "text-white/50"}>
                        {h.day}
                        {isToday && (
                          <span className="ml-2 text-[10px] bg-[#C8A55A]/20 text-[#C8A55A] px-1.5 py-0.5 rounded-sm uppercase tracking-wide">
                            Hoje
                          </span>
                        )}
                      </span>
                      <span className={h.time === "Encerrado" ? "text-white/30" : isToday ? "text-[#C8A55A]" : "text-white/70"}>
                        {h.time}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#1877F2]/15 border border-[#1877F2]/30 hover:border-[#1877F2]/60 p-4 transition-colors group"
            >
              <Facebook size={20} className="text-[#1877F2]" />
              <div>
                <div className="text-white text-sm font-semibold">Siga-nos no Facebook</div>
                <div className="text-white/40 text-xs">Novidades e promoções exclusivas</div>
              </div>
              <span className="ml-auto text-[#1877F2] group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="lg:col-span-3"
          >
            <div className="bg-white/5 border border-white/10 p-8 lg:p-10">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-20 h-20 bg-[#C8A55A]/15 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={40} className="text-[#C8A55A]" />
                  </div>
                  <h3 className="font-serif text-white text-2xl font-bold mb-3">
                    Pedido enviado com sucesso!
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    A nossa equipa entrará em contacto consigo em menos de 24 horas úteis para
                    confirmar a sua consulta.
                  </p>
                  <div className="mt-6 text-[#C8A55A] text-sm font-semibold">
                    Em caso de urgência: 233 433 720
                  </div>
                </motion.div>
              ) : (
                <>
                  <h3 className="font-serif text-white text-2xl font-bold mb-2">
                    Pedido de Marcação
                  </h3>
                  <p className="text-white/50 text-sm mb-8">
                    Preencha o formulário e entraremos em contacto para confirmar a disponibilidade.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">
                          Nome Completo *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="O seu nome"
                          className="w-full bg-white/8 border border-white/15 focus:border-[#C8A55A] text-white placeholder-white/30 px-4 py-3 text-sm outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">
                          Telefone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="+351 9XX XXX XXX"
                          className="w-full bg-white/8 border border-white/15 focus:border-[#C8A55A] text-white placeholder-white/30 px-4 py-3 text-sm outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="email@exemplo.pt"
                        className="w-full bg-white/8 border border-white/15 focus:border-[#C8A55A] text-white placeholder-white/30 px-4 py-3 text-sm outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">
                        Serviço de Interesse
                      </label>
                      <select
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="w-full bg-[#0d1f3a] border border-white/15 focus:border-[#C8A55A] text-white px-4 py-3 text-sm outline-none transition-colors"
                      >
                        <option value="">Seleccione um serviço</option>
                        <option>Implantologia</option>
                        <option>Ortodontia</option>
                        <option>Branqueamento Dentário</option>
                        <option>Próteses Dentárias</option>
                        <option>Endodontia (Tratamento de Canal)</option>
                        <option>Cirurgia Oral</option>
                        <option>Estética Facial (Botox/Fillers)</option>
                        <option>Higiene Oral / Destartarização</option>
                        <option>Consulta de Avaliação</option>
                        <option>Outro</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">
                        Mensagem / Informações Adicionais
                      </label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        rows={4}
                        placeholder="Descreva brevemente o que pretende ou partilhe alguma informação relevante sobre o seu caso..."
                        className="w-full bg-white/8 border border-white/15 focus:border-[#C8A55A] text-white placeholder-white/30 px-4 py-3 text-sm outline-none transition-colors resize-none"
                      />
                    </div>

                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="gdpr"
                        required
                        className="mt-1 accent-[#C8A55A]"
                      />
                      <label htmlFor="gdpr" className="text-white/40 text-xs leading-relaxed">
                        Declaro que li e aceito a{" "}
                        <span className="text-[#C8A55A] underline cursor-pointer">
                          Política de Privacidade
                        </span>{" "}
                        e consinto que os meus dados sejam utilizados para marcação de consulta,
                        em conformidade com o RGPD.
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-3 bg-[#C8A55A] hover:bg-[#b8924a] disabled:opacity-70 text-[#0A1628] font-bold py-4 text-sm tracking-widest uppercase transition-all duration-300"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-[#0A1628]/30 border-t-[#0A1628] rounded-full animate-spin" />
                          A enviar...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Enviar Pedido de Marcação
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Map placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-10 bg-white/5 border border-white/10 h-64 flex items-center justify-center relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d1f3a] to-[#0A1628]" />
          {/* Subtle map grid lines */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(#C8A55A 1px, transparent 1px), linear-gradient(90deg, #C8A55A 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative text-center">
            <MapPin size={32} className="text-[#C8A55A] mx-auto mb-3" />
            <div className="text-white font-serif text-lg font-semibold">R. Vasco da Gama 93, Figueira da Foz</div>
            <a
              href="https://maps.google.com/?q=Rua+Vasco+da+Gama+93+Figueira+da+Foz"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-[#C8A55A] text-sm hover:underline"
            >
              Abrir no Google Maps →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
