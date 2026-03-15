"use client";

import { motion } from "framer-motion";
import { EXPERIENCES } from "./data";

const EXP_IMAGES: Record<string, string> = {
  "rota-verdelho": "/ninika-images/rota-verdelho.jpg",
  "tasquinha": "/ninika-images/tasquinha.jpg",
  "vulcao-copo": "/ninika-images/vulcao-copo.jpg",
  "mar-mesa": "/ninika-images/mar-mesa.jpg",
  "espirito-santo": "/ninika-images/espirito-santo.jpg",
  "sunset-sip": "/ninika-images/sunset-sip.jpg",
};

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Experiencias() {
  return (
    <section
      id="experiencias"
      className="nk-section"
      style={{ background: "var(--nk-gray-100)" }}
    >
      <div className="nk-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
        >
          <p className="nk-section-label">Experiências</p>
          <div className="nk-gold-line" />
          <h2 className="nk-section-title">Seis formas de viver a Terceira</h2>
          <p className="nk-section-subtitle">
            Cada experiência é um caminho diferente pela ilha. Escolhe a tua e descomplica.
          </p>
        </motion.div>

        <motion.div
          className="nk-exp-grid"
          style={{ marginTop: "2rem" }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {EXPERIENCES.map((exp) => (
            <motion.div key={exp.id} className="nk-exp-card" variants={fadeInUp}>
              {EXP_IMAGES[exp.id] && (
                <div className="nk-exp-thumb">
                  <img
                    src={EXP_IMAGES[exp.id]}
                    alt={exp.name}
                    loading="lazy"
                  />
                </div>
              )}
              {exp.badge && <span className="nk-badge">{exp.badge}</span>}
              <div className="nk-exp-emoji" aria-hidden="true">{exp.emoji}</div>
              <h3 className="nk-exp-name">{exp.name}</h3>
              <p className="nk-exp-tagline">{exp.tagline}</p>
              <p className="nk-exp-desc">{exp.description}</p>
              <div className="nk-exp-meta">
                <span>⏱ {exp.duration}</span>
                <span>👥 {exp.groupSize}</span>
              </div>
              <div className="nk-exp-price">{exp.price}</div>
              {exp.priceNote && (
                <p style={{ fontSize: "0.75rem", color: "var(--nk-gray-400)", marginTop: "0.25rem", paddingLeft: "1.5rem", paddingRight: "1.5rem", paddingBottom: "1.5rem" }}>
                  {exp.priceNote}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
