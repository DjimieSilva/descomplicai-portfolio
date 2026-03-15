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
            height: "160px",
            maxWidth: "720px",
            margin: "0 auto",
          }}>
            <img
              src="/ninika-images/families.jpg"
              alt="Experiência de vinho em grupo"
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
              background: "linear-gradient(to top, rgba(114, 47, 55, 0.6), rgba(26, 26, 46, 0.3))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5rem",
            }}>
              <p style={{
                fontFamily: "var(--nk-font-display)",
                fontSize: "clamp(1rem, 2.5vw, 1.35rem)",
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--nk-white)",
                textAlign: "center",
                maxWidth: "480px",
                lineHeight: 1.5,
              }}>
                &ldquo;Sem formalidades, sem julgamentos. Apenas tu, vinho vulcânico e a melhor gastronomia da Terceira.&rdquo;
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="nk-pricing-grid"
          style={{ marginTop: "0" }}
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
