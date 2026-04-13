"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { EXPERIENCE_OPTIONS, GROUP_SIZE_OPTIONS } from "./data";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

type FormState = "idle" | "submitting" | "success";

export default function LeadCapture() {
  const [state, setState] = useState<FormState>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("submitting");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const subject = encodeURIComponent("Pedido de experiência - NinikaTours");
    const body = encodeURIComponent(
      [
        `Nome: ${data.nome ?? "-"}`,
        `Email: ${data.email ?? "-"}`,
        `Data de chegada: ${data.dataChegada ?? "-"}`,
        `Data de partida: ${data.dataPartida ?? "-"}`,
        `Experiência: ${data.experiencia ?? "-"}`,
        `Tamanho do grupo: ${data.tamanhoGrupo ?? "-"}`,
        `Mensagem: ${data.mensagem ?? "-"}`,
        "",
        "Pedido sujeito a confirmação por email.",
      ].join("\n")
    );

    window.location.href = `mailto:info@ninikatours.com?subject=${subject}&body=${body}`;
    setState("success");
  };

  return (
    <section id="reservar" className="nk-section nk-dark nk-grain" style={{ position: "relative" }}>
      <div className="nk-container" style={{ position: "relative", zIndex: 10 }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          style={{ textAlign: "center" }}
        >
          <p className="nk-section-label">Reservar</p>
          <div className="nk-gold-line" style={{ margin: "0 auto 1.5rem" }} />
          <h2 className="nk-section-title">Pronto para descobrir a Terceira?</h2>
          <p className="nk-section-subtitle" style={{ margin: "0 auto 2rem" }}>
            Preenche o formulário e respondemos em menos de 24 horas.
          </p>
        </motion.div>

        {state === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: "center", padding: "2rem 0" }}
          >
            <p style={{
              fontSize: "1.25rem",
              color: "var(--nk-gold)",
              marginBottom: "1rem",
              fontFamily: "var(--nk-font-display)",
              fontWeight: 700,
            }}>
              Rascunho de email preparado.
            </p>
            <p style={{ fontSize: "0.95rem", color: "var(--nk-gray-300)", marginBottom: "1rem" }}>
              O teu pedido ficou pronto para revisão e envio por email. A reserva só fica confirmada depois de receberes resposta.
            </p>
            <button onClick={() => setState("idle")} className="nk-btn nk-btn-secondary">
              Editar pedido
            </button>
          </motion.div>
        ) : (
          <motion.form
            className="nk-lead-form"
            onSubmit={handleSubmit}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div>
              <label htmlFor="nk-nome" className="nk-label">Nome *</label>
              <input id="nk-nome" name="nome" type="text" required minLength={2} autoComplete="name" className="nk-input" placeholder="O teu nome" />
            </div>

            <div>
              <label htmlFor="nk-email" className="nk-label">Email *</label>
              <input id="nk-email" name="email" type="email" required autoComplete="email" className="nk-input" placeholder="email@exemplo.com" />
            </div>

            <div className="nk-date-row">
              <div>
                <label htmlFor="nk-chegada" className="nk-label">Data de Chegada</label>
                <input id="nk-chegada" name="dataChegada" type="date" className="nk-input" />
              </div>
              <div>
                <label htmlFor="nk-partida" className="nk-label">Data de Partida</label>
                <input id="nk-partida" name="dataPartida" type="date" className="nk-input" />
              </div>
            </div>

            <div>
              <label htmlFor="nk-experiencia" className="nk-label">Experiência</label>
              <select id="nk-experiencia" name="experiencia" className="nk-select" defaultValue="">
                <option value="" disabled>Escolhe uma experiência</option>
                {EXPERIENCE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="nk-grupo" className="nk-label">Tamanho do Grupo</label>
              <select id="nk-grupo" name="tamanhoGrupo" className="nk-select" defaultValue="">
                <option value="" disabled>Quantas pessoas?</option>
                {GROUP_SIZE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="nk-mensagem" className="nk-label">Mensagem</label>
              <textarea id="nk-mensagem" name="mensagem" className="nk-textarea" maxLength={500} placeholder="Diz-nos o que procuras, datas flexíveis, alergias, ocasião especial..." />
            </div>

            <button type="submit" className="nk-btn nk-btn-primary" disabled={state === "submitting"} style={{ width: "100%" }}>
              {state === "submitting" ? "A preparar..." : "Abrir Pedido no Email"}
            </button>

            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <p style={{ fontSize: "0.875rem", color: "var(--nk-gray-400)", marginBottom: "0.75rem" }}>
                Preferes falar directamente?
              </p>
              <a href="mailto:info@ninikatours.com" className="nk-btn nk-btn-whatsapp">
                Enviar Email
              </a>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
