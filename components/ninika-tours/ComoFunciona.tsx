"use client";

import { motion } from "framer-motion";
import { STEPS } from "./data";

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
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="nk-section">
      <div className="nk-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
        >
          <p className="nk-section-label">Como Funciona</p>
          <div className="nk-gold-line" />
          <h2 className="nk-section-title">Do clique à primeira prova</h2>
          <p className="nk-section-subtitle">Quatro passos simples. Zero complicações.</p>
        </motion.div>

        <motion.div
          className="nk-steps"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {STEPS.map((step) => (
            <motion.div key={step.number} className="nk-step" variants={fadeInUp}>
              <div className="nk-step-number">{step.number}</div>
              <div>
                <h3 className="nk-step-title">{step.emoji} {step.title}</h3>
                <p className="nk-step-desc">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
