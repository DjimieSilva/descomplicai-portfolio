"use client";

import { motion } from "framer-motion";
import { ZONES } from "./data";

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
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function AIlha() {
  return (
    <section id="a-ilha" className="nk-section">
      <div className="nk-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
        >
          <p className="nk-section-label">A Ilha</p>
          <div className="nk-gold-line" />
          <h2 className="nk-section-title">
            Três zonas, uma ilha inesquecível
          </h2>
          <p className="nk-section-subtitle">
            A Terceira é uma ilha de contrastes. Do basalto negro dos Biscoitos
            às ruas coloridas de Angra, cada zona tem a sua personalidade, os
            seus sabores e as suas histórias.
          </p>
        </motion.div>

        <motion.div
          className="nk-zones-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {ZONES.map((zone) => (
            <motion.div
              key={zone.id}
              className="nk-zone-card"
              variants={scaleIn}
            >
              <div className="nk-zone-emoji" aria-hidden="true">
                {zone.emoji}
              </div>
              <h3 className="nk-zone-name">{zone.name}</h3>
              <p className="nk-zone-desc">{zone.description}</p>
              <div className="nk-zone-tags">
                {zone.highlights.map((h) => (
                  <span key={h} className="nk-zone-tag">
                    {h}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
