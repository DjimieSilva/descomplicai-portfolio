"use client";

import { motion } from "framer-motion";
import { AUDIENCES } from "./data";

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

export default function ParaQuem() {
  return (
    <section id="para-quem" className="nk-section" style={{ background: "var(--nk-gray-100)" }}>
      <div className="nk-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
        >
          <p className="nk-section-label">Para Quem</p>
          <div className="nk-gold-line" />
          <h2 className="nk-section-title">Experiências para todos</h2>
          <p className="nk-section-subtitle">
            Quer venhas em família, a dois, com colegas ou amigos — temos a experiência certa para ti.
          </p>
        </motion.div>

        <motion.div
          className="nk-audience-grid"
          style={{ marginTop: "2rem" }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {AUDIENCES.map((a) => (
            <motion.div key={a.id} className="nk-audience-card" variants={fadeInUp}>
              <div className="nk-audience-emoji" aria-hidden="true">{a.emoji}</div>
              <h3 className="nk-audience-title">{a.title}</h3>
              <p className="nk-audience-desc">{a.description}</p>
              <ul className="nk-audience-highlights">
                {a.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
