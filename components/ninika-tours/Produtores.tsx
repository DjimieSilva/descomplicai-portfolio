"use client";

import { motion } from "framer-motion";
import { PRODUCERS } from "./data";

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Produtores() {
  return (
    <section id="produtores" className="nk-section">
      <div className="nk-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
        >
          <p className="nk-section-label">Produtores</p>
          <div className="nk-gold-line" />
          <h2 className="nk-section-title">As mãos por trás do vinho</h2>
          <p className="nk-section-subtitle">
            Conhece os produtores que fazem nascer vinho vulcânico de uma das regiões mais improváveis do mundo.
          </p>
        </motion.div>

        <motion.div
          className="nk-producer-banner"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          style={{ marginTop: "2rem", marginBottom: "2rem" }}
        >
          <div style={{
            position: "relative",
            borderRadius: "12px",
            overflow: "hidden",
            height: "220px",
          }}>
            <img
              src="/ninika-images/producer-vineyard.jpg"
              alt="Produtor na vinha dos Biscoitos"
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, rgba(26, 26, 46, 0.7), transparent)",
              display: "flex",
              alignItems: "center",
              padding: "2rem",
            }}>
              <p style={{
                fontFamily: "var(--nk-font-display)",
                fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
                fontWeight: 700,
                color: "var(--nk-white)",
                maxWidth: "360px",
                lineHeight: 1.3,
              }}>
                Vinhos de vulcão,<br />feitos por quem conhece cada cepa.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="nk-producer-grid"
          style={{ marginTop: "0" }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {PRODUCERS.map((p) => (
            <motion.div key={p.id} className="nk-producer-card" variants={scaleIn}>
              <div className="nk-producer-emoji" aria-hidden="true">{p.emoji}</div>
              <h3 className="nk-producer-name">{p.name}</h3>
              <p className="nk-producer-location">{p.location}{p.founded ? ` · Est. ${p.founded}` : ""}</p>
              <p className="nk-producer-desc">{p.description}</p>
              <p className="nk-producer-specialty">{p.specialty}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
