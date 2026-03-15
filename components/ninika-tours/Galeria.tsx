"use client";

import { motion } from "framer-motion";
import { GALLERY } from "./data";

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

const GALLERY_IMAGES: Record<string, string> = {
  g1: '/ninika-images/biscoitos.jpg',
  g2: '/ninika-images/vineyard-sunset.jpg',
  g3: '/ninika-images/petiscos.jpg',
  g4: '/ninika-images/walking-tour.jpg',
  g5: '/ninika-images/gastronomy.jpg',
  g6: '/ninika-images/cellar.jpg',
  g7: '/ninika-images/angra.jpg',
  g8: '/ninika-images/cheese.jpg',
};

export default function Galeria() {
  return (
    <section id="galeria" className="nk-section">
      <div className="nk-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
        >
          <p className="nk-section-label">Galeria</p>
          <div className="nk-gold-line" />
          <h2 className="nk-section-title">Momentos que ficam</h2>
        </motion.div>

        <motion.div
          className="nk-gallery-grid"
          style={{ marginTop: "2rem" }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {GALLERY.map((item) => {
            const imgSrc = GALLERY_IMAGES[item.id];
            return (
              <motion.div
                key={item.id}
                className={`nk-gallery-item ${item.aspectRatio}`}
                variants={scaleIn}
              >
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt={item.alt}
                    className="nk-gallery-img"
                    loading="lazy"
                  />
                ) : (
                  <div className="nk-gallery-placeholder">{item.placeholder}</div>
                )}
                <div className="nk-gallery-overlay">
                  <span className="nk-gallery-caption">{item.alt}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
