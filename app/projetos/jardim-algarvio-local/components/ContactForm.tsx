"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, MessageCircle, Mail, Clock, MapPin, Send } from "lucide-react";

const serviceOptions = [
  "Manutenção Regular",
  "Corte de Relva",
  "Sistema de Rega",
  "Poda de Árvores",
  "Limpeza de Terreno",
  "Design de Jardim",
  "Outro",
];

const sizeOptions = [
  "Até 100m²",
  "100-300m²",
  "300-500m²",
  "500-1000m²",
  "+1000m²",
];

const contactInfo = [
  { icon: Phone, label: "Telefone", value: "+351 912 345 678", href: "tel:+351912345678" },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+351 912 345 678",
    href: "https://wa.me/351912345678",
  },
  { icon: Mail, label: "Email", value: "info@jardimalgarvio.pt", href: "mailto:info@jardimalgarvio.pt" },
  { icon: Clock, label: "Horário", value: "Seg-Sex 8h-18h, Sáb 8h-13h" },
  { icon: MapPin, label: "Morada", value: "Faro, Algarve" },
];

export default function ContactForm() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contacto" className="py-20 sm:py-24" style={{ backgroundColor: "#F8FAF7" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold"
            style={{ backgroundColor: "#DCFCE7", color: "#15803D" }}
          >
            <Mail className="h-4 w-4" />
            Contacte-nos
          </span>
          <h2
            className="mt-4 text-3xl font-bold sm:text-4xl"
            style={{ fontFamily: "var(--font-jakarta), sans-serif", color: "#1F2937" }}
          >
            Peça o Seu Orçamento Grátis
          </h2>
          <p className="mt-3 text-base max-w-2xl mx-auto" style={{ color: "#6B7280" }}>
            Preencha o formulário ou contacte-nos diretamente. Respondemos em 24 horas.
          </p>
        </div>

        <motion.div
          ref={ref}
          className="grid gap-10 lg:grid-cols-5"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Form — 3 cols */}
          <div className="lg:col-span-3">
            <form
              className="rounded-2xl border p-6 sm:p-8 space-y-5"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              {submitted ? (
                <div className="text-center py-10">
                  <div
                    className="mx-auto flex h-14 w-14 items-center justify-center rounded-full mb-4"
                    style={{ backgroundColor: "#DCFCE7" }}
                  >
                    <Send className="h-6 w-6" style={{ color: "#16A34A" }} />
                  </div>
                  <h3
                    className="text-xl font-bold"
                    style={{ fontFamily: "var(--font-jakarta), sans-serif", color: "#1F2937" }}
                  >
                    Mensagem Enviada!
                  </h3>
                  <p className="mt-2 text-sm" style={{ color: "#6B7280" }}>
                    Entraremos em contacto dentro de 24 horas.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: "#1F2937" }}>
                        Nome *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="O seu nome"
                        className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]"
                        style={{ borderColor: "#E5E7EB" }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: "#1F2937" }}>
                        Telefone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+351 900 000 000"
                        className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]"
                        style={{ borderColor: "#E5E7EB" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "#1F2937" }}>
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="email@exemplo.pt"
                      className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]"
                      style={{ borderColor: "#E5E7EB" }}
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: "#1F2937" }}>
                        Serviço pretendido
                      </label>
                      <select
                        className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] bg-white"
                        style={{ borderColor: "#E5E7EB", color: "#1F2937" }}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Selecionar serviço
                        </option>
                        {serviceOptions.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: "#1F2937" }}>
                        Tamanho do jardim
                      </label>
                      <select
                        className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] bg-white"
                        style={{ borderColor: "#E5E7EB", color: "#1F2937" }}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Selecionar tamanho
                        </option>
                        {sizeOptions.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "#1F2937" }}>
                      Mensagem
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Descreva o que precisa..."
                      className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] resize-none"
                      style={{ borderColor: "#E5E7EB" }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl py-3.5 text-base font-semibold text-white transition-colors flex items-center justify-center gap-2"
                    style={{ backgroundColor: "#16A34A" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#15803D")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#16A34A")}
                  >
                    <Send className="h-4 w-4" />
                    Enviar Pedido de Orçamento
                  </button>

                  <p className="text-center text-xs" style={{ color: "#6B7280" }}>
                    Respondemos em 24 horas. Orçamento sem compromisso.
                  </p>
                </>
              )}
            </form>
          </div>

          {/* Info cards — 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {contactInfo.map((c) => {
              const Icon = c.icon;
              const inner = (
                <>
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: "#DCFCE7" }}
                  >
                    <Icon className="h-5 w-5" style={{ color: "#16A34A" }} />
                  </div>
                  <div>
                    <p className="text-xs font-medium" style={{ color: "#6B7280" }}>
                      {c.label}
                    </p>
                    <p className="text-sm font-semibold" style={{ color: "#1F2937" }}>
                      {c.value}
                    </p>
                  </div>
                </>
              );

              const cls = "flex items-start gap-4 rounded-xl border p-5 transition-shadow hover:shadow-md";
              const sty = { backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" } as const;

              return c.href ? (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={cls}
                  style={sty}
                >
                  {inner}
                </a>
              ) : (
                <div key={c.label} className={cls} style={sty}>
                  {inner}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
