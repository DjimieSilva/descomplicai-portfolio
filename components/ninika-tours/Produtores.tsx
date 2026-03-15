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
          className="nk-producer-grid"
          style={{ marginTop: "2rem" }}
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
