"use client";

import { motion } from "framer-motion";
import { PRICING } from "./data";

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

export default function Precos() {
  return (
    <section id="precos" className="nk-section">
      <div className="nk-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          style={{ textAlign: "center" }}
        >
          <p className="nk-section-label">Preços</p>
          <div className="nk-gold-line" style={{ margin: "0 auto 1.5rem" }} />
          <h2 className="nk-section-title">Escolhe a tua experiência</h2>
          <p className="nk-section-subtitle" style={{ margin: "0 auto" }}>
            Todos os preços incluem guia, degustações e seguro de actividade.
          </p>
        </motion.div>

        <motion.div
          className="nk-pricing-grid"
          style={{ marginTop: "2.5rem" }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {PRICING.map((tier) => (
            <motion.div
              key={tier.id}
              className={`nk-pricing-card ${tier.highlighted ? "featured" : ""}`}
              variants={fadeInUp}
            >
              {tier.badge && <span className="nk-pricing-badge">{tier.badge}</span>}
              <h3 className="nk-pricing-name">{tier.name}</h3>
              <div className="nk-pricing-price">{tier.price}</div>
              {tier.priceUnit && <p className="nk-pricing-unit">{tier.priceUnit}</p>}
              <p className="nk-pricing-desc">{tier.description}</p>
              <ul className="nk-pricing-features">
                {tier.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a href="#reservar" className="nk-btn nk-btn-primary" style={{ width: "100%" }}>
                {tier.cta}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
