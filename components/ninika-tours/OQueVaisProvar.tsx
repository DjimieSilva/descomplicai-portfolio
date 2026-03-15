"use client";

import { motion } from "framer-motion";
import { PETISCOS } from "./data";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function OQueVaisProvar() {
  return (
    <section id="o-que-provar" className="nk-section nk-dark">
      <div className="nk-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
        >
          <p className="nk-section-label">O Que Vais Provar</p>
          <div className="nk-gold-line" />
          <h2 className="nk-section-title">Sabores que não encontras em mais lado nenhum</h2>
        </motion.div>

        <div className="nk-scroll-x" style={{ marginTop: "2rem" }}>
          {PETISCOS.map((p) => (
            <div key={p.id} className="nk-petisco-card">
              <div className="nk-petisco-emoji" aria-hidden="true">{p.emoji}</div>
              <h3 className="nk-petisco-name">{p.name}</h3>
              <p className="nk-petisco-desc">{p.description}</p>
              <span className="nk-petisco-category">{p.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
