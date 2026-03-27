"use client";

import { motion } from "framer-motion";
import { Phone, Mail, Clock, MessageCircle } from "lucide-react";

const contactItems = [
  {
    icon: Phone,
    label: "Telefone",
    value: "+351 912 345 678",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+351 912 345 678",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@jardimalgarvio.pt",
  },
  {
    icon: Clock,
    label: "Horário",
    value: "Seg-Sex 8h-18h, Sáb 8h-13h",
  },
];

function ContactItemIllustration({ index }: { index: number }) {
  const illustrations = [
    // Phone - small vine
    <svg key="0" viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path d="M4 20 C6 16, 8 12, 12 10 C16 8, 18 6, 20 4" stroke="#8BA888" strokeWidth="0.8" />
      <path d="M8 14 C6 12, 4 12, 5 14" fill="#8BA888" fillOpacity={0.4} />
      <path d="M14 10 C16 8, 18 8, 17 10" fill="#8BA888" fillOpacity={0.4} />
    </svg>,
    // WhatsApp - leaf
    <svg key="1" viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path d="M12 4 C18 8, 20 14, 16 20 C12 22, 6 18, 4 12 C2 6, 6 2, 12 4Z" fill="#8BA888" fillOpacity={0.2} />
      <path d="M12 4 C12 10, 12 16, 12 22" stroke="#8BA888" strokeWidth="0.6" />
    </svg>,
    // Email - flower (precomputed coords to avoid hydration mismatch)
    <svg key="2" viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <circle cx="12" cy="12" r="3" fill="#C2703E" fillOpacity={0.3} />
      <ellipse cx="18" cy="12" rx="3" ry="2" fill="#C2703E" fillOpacity={0.2} transform="rotate(0 18 12)" />
      <ellipse cx="13.85" cy="17.71" rx="3" ry="2" fill="#C2703E" fillOpacity={0.2} transform="rotate(72 13.85 17.71)" />
      <ellipse cx="7.15" cy="15.71" rx="3" ry="2" fill="#C2703E" fillOpacity={0.2} transform="rotate(144 7.15 15.71)" />
      <ellipse cx="7.15" cy="8.29" rx="3" ry="2" fill="#C2703E" fillOpacity={0.2} transform="rotate(216 7.15 8.29)" />
      <ellipse cx="13.85" cy="6.29" rx="3" ry="2" fill="#C2703E" fillOpacity={0.2} transform="rotate(288 13.85 6.29)" />
    </svg>,
    // Clock - sun-like
    <svg key="3" viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <circle cx="12" cy="12" r="6" stroke="#8BA888" strokeWidth="0.8" fill="#8BA888" fillOpacity={0.1} />
      <path d="M12 8 L12 12 L15 14" stroke="#8BA888" strokeWidth="0.8" strokeLinecap="round" />
    </svg>,
  ];
  return illustrations[index] || null;
}

export default function Contact() {
  return (
    <section className="py-24 px-4" style={{ backgroundColor: "#FDF6EC" }}>
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2
          className="text-4xl md:text-5xl mb-4"
          style={{
            fontFamily: "var(--font-libre-caslon), serif",
            color: "#4A5D23",
          }}
        >
          Vamos Criar o Seu Jardim
        </h2>
        <p
          className="text-lg max-w-lg mx-auto"
          style={{
            fontFamily: "var(--font-newsreader), serif",
            fontStyle: "italic",
            color: "#8BA888",
          }}
        >
          Entre em contacto e transforme o seu espaço
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form */}
        <motion.div
          className="p-8 md:p-10"
          style={{
            backgroundColor: "#E8DCC8",
            borderRadius: "32px",
            boxShadow: "0 4px 20px rgba(92,64,51,0.08)",
          }}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{
                  fontFamily: "var(--font-source-sans), sans-serif",
                  color: "#4A5D23",
                }}
              >
                Nome
              </label>
              <input
                type="text"
                placeholder="O seu nome"
                className="w-full px-5 py-3 outline-none transition-all duration-300"
                style={{
                  backgroundColor: "#FDF6EC",
                  borderRadius: "16px",
                  border: "1px solid rgba(74,93,35,0.15)",
                  fontFamily: "var(--font-source-sans), sans-serif",
                  color: "#5C4033",
                }}
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{
                  fontFamily: "var(--font-source-sans), sans-serif",
                  color: "#4A5D23",
                }}
              >
                Email
              </label>
              <input
                type="email"
                placeholder="o.seu@email.pt"
                className="w-full px-5 py-3 outline-none transition-all duration-300 focus:ring-2"
                style={{
                  backgroundColor: "#FDF6EC",
                  borderRadius: "16px",
                  border: "1px solid rgba(74,93,35,0.15)",
                  fontFamily: "var(--font-source-sans), sans-serif",
                  color: "#5C4033",
                }}
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{
                  fontFamily: "var(--font-source-sans), sans-serif",
                  color: "#4A5D23",
                }}
              >
                Telefone
              </label>
              <input
                type="tel"
                placeholder="+351 9XX XXX XXX"
                className="w-full px-5 py-3 outline-none transition-all duration-300 focus:ring-2"
                style={{
                  backgroundColor: "#FDF6EC",
                  borderRadius: "16px",
                  border: "1px solid rgba(74,93,35,0.15)",
                  fontFamily: "var(--font-source-sans), sans-serif",
                  color: "#5C4033",
                }}
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{
                  fontFamily: "var(--font-source-sans), sans-serif",
                  color: "#4A5D23",
                }}
              >
                Mensagem
              </label>
              <textarea
                rows={4}
                placeholder="Conte-nos sobre o jardim dos seus sonhos..."
                className="w-full px-5 py-3 outline-none transition-all duration-300 focus:ring-2 resize-none"
                style={{
                  backgroundColor: "#FDF6EC",
                  borderRadius: "16px",
                  border: "1px solid rgba(74,93,35,0.15)",
                  fontFamily: "var(--font-source-sans), sans-serif",
                  color: "#5C4033",
                }}
              />
            </div>
            <motion.button
              type="submit"
              className="w-full py-4 text-base font-semibold transition-all duration-300"
              style={{
                backgroundColor: "#C2703E",
                color: "#FDF6EC",
                borderRadius: "9999px",
                fontFamily: "var(--font-source-sans), sans-serif",
              }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 8px 30px rgba(194,112,62,0.3)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              Enviar Mensagem
            </motion.button>
          </form>
        </motion.div>

        {/* Right side: Map + Contact info */}
        <motion.div
          className="flex flex-col gap-8"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Illustrated Algarve map */}
          <div
            className="p-6 flex items-center justify-center"
            style={{
              backgroundColor: "#E8DCC8",
              borderRadius: "24px",
            }}
          >
            <svg
              viewBox="0 0 400 200"
              fill="none"
              className="w-full max-w-sm"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Algarve coastline - hand-drawn style */}
              <path
                d="M20 120 C40 118, 60 125, 80 122 C100 119, 120 130, 140 126 C160 122, 180 128, 200 124 C220 120, 240 126, 260 122 C280 118, 300 124, 320 120 C340 116, 360 122, 380 118"
                stroke="#4A5D23"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              {/* Land area */}
              <path
                d="M20 120 C40 118, 60 125, 80 122 C100 119, 120 130, 140 126 C160 122, 180 128, 200 124 C220 120, 240 126, 260 122 C280 118, 300 124, 320 120 C340 116, 360 122, 380 118 L380 60 L20 60 Z"
                fill="#4A5D23"
                fillOpacity={0.06}
              />
              {/* Water area */}
              <path
                d="M20 120 C40 118, 60 125, 80 122 C100 119, 120 130, 140 126 C160 122, 180 128, 200 124 C220 120, 240 126, 260 122 C280 118, 300 124, 320 120 C340 116, 360 122, 380 118 L380 180 L20 180 Z"
                fill="#B8D4E3"
                fillOpacity={0.1}
              />
              {/* Water waves */}
              <path
                d="M40 145 C55 143, 70 147, 85 145 C100 143, 115 147, 130 145"
                stroke="#B8D4E3"
                strokeWidth="0.8"
                strokeOpacity={0.4}
                fill="none"
              />
              <path
                d="M200 155 C215 153, 230 157, 245 155 C260 153, 275 157, 290 155"
                stroke="#B8D4E3"
                strokeWidth="0.8"
                strokeOpacity={0.4}
                fill="none"
              />

              {/* City markers */}
              {/* Faro - main */}
              <circle cx="240" cy="100" r="5" fill="#C2703E" fillOpacity={0.6} />
              <circle cx="240" cy="100" r="8" stroke="#C2703E" strokeWidth="1" strokeOpacity={0.3} fill="none" />
              <text x="240" y="92" textAnchor="middle" fontSize="10" fill="#4A5D23" fontWeight="600" style={{ fontFamily: "var(--font-source-sans)" }}>
                Faro
              </text>

              {/* Albufeira */}
              <circle cx="160" cy="108" r="3" fill="#4A5D23" fillOpacity={0.5} />
              <text x="160" y="100" textAnchor="middle" fontSize="8" fill="#5C4033" fillOpacity={0.7}>
                Albufeira
              </text>

              {/* Lagos */}
              <circle cx="80" cy="110" r="3" fill="#4A5D23" fillOpacity={0.5} />
              <text x="80" y="102" textAnchor="middle" fontSize="8" fill="#5C4033" fillOpacity={0.7}>
                Lagos
              </text>

              {/* Tavira */}
              <circle cx="320" cy="105" r="3" fill="#4A5D23" fillOpacity={0.5} />
              <text x="320" y="97" textAnchor="middle" fontSize="8" fill="#5C4033" fillOpacity={0.7}>
                Tavira
              </text>

              {/* Loulé */}
              <circle cx="210" cy="85" r="3" fill="#4A5D23" fillOpacity={0.5} />
              <text x="210" y="78" textAnchor="middle" fontSize="8" fill="#5C4033" fillOpacity={0.7}>
                Loulé
              </text>

              {/* Small decorative elements */}
              {/* Tree near Loulé */}
              <path d="M190 80 L190 86 M188 82 L190 80 L192 82" stroke="#6B8F3C" strokeWidth="0.8" />
              {/* Tree near Lagos */}
              <path d="M65 105 L65 111 M63 107 L65 105 L67 107" stroke="#6B8F3C" strokeWidth="0.8" />

              {/* "ALGARVE" text */}
              <text
                x="200"
                y="170"
                textAnchor="middle"
                fontSize="12"
                fill="#B8D4E3"
                fillOpacity={0.5}
                letterSpacing="4"
                style={{ fontFamily: "var(--font-libre-caslon)" }}
              >
                ALGARVE
              </text>
            </svg>
          </div>

          {/* Contact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.label}
                  className="p-5 flex items-start gap-4"
                  style={{
                    backgroundColor: "#E8DCC8",
                    borderRadius: "20px",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "rgba(74,93,35,0.1)" }}
                    >
                      <IconComponent size={18} style={{ color: "#4A5D23" }} />
                    </div>
                    <ContactItemIllustration index={index} />
                  </div>
                  <div>
                    <p
                      className="text-xs font-semibold mb-1"
                      style={{
                        fontFamily: "var(--font-source-sans), sans-serif",
                        color: "#8BA888",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="text-sm font-semibold"
                      style={{
                        fontFamily: "var(--font-source-sans), sans-serif",
                        color: "#5C4033",
                      }}
                    >
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
