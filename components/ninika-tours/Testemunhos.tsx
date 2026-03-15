"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS } from "./data";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Testemunhos() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [paused, next]);

  const t = TESTIMONIALS[active];

  return (
    <section
      id="testemunhos"
      className="nk-section nk-dark"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="nk-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          style={{ textAlign: "center" }}
        >
          <p className="nk-section-label">Testemunhos</p>
          <div className="nk-gold-line" style={{ margin: "0 auto 1.5rem" }} />
          <h2 className="nk-section-title">O que dizem de nós</h2>
        </motion.div>

        <div style={{ marginTop: "2rem" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              className="nk-testimonial-card"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="nk-testimonial-stars" aria-label={`${t.rating} estrelas`}>
                {"★".repeat(t.rating)}
              </div>
              <p className="nk-testimonial-text">&ldquo;{t.text}&rdquo;</p>
              <p className="nk-testimonial-author">{t.name}</p>
              <p className="nk-testimonial-origin">{t.origin}</p>
              <p className="nk-testimonial-experience">{t.experience}</p>
            </motion.div>
          </AnimatePresence>

          <div className="nk-testimonial-dots">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                className={`nk-testimonial-dot ${i === active ? "active" : ""}`}
                onClick={() => setActive(i)}
                aria-label={`Ver testemunho ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
