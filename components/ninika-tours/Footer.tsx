"use client";

import { motion } from "framer-motion";
import { NAV_LINKS } from "./data";

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

export default function Footer() {
  return (
    <footer className="nk-footer">
      <div className="nk-container">
        <motion.div
          className="nk-footer-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeInUp}>
            <div className="nk-footer-logo">NinikaTours</div>
            <p className="nk-footer-desc">
              Experiências de vinho vulcânico e gastronomia açoriana na Ilha Terceira, Açores.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h4 className="nk-footer-heading">Navegação</h4>
            <ul className="nk-footer-links">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h4 className="nk-footer-heading">Experiências</h4>
            <ul className="nk-footer-links">
              <li><a href="#experiencias">Rota do Verdelho</a></li>
              <li><a href="#experiencias">Tasquinha a Tasquinha</a></li>
              <li><a href="#experiencias">Vulcão no Copo</a></li>
              <li><a href="#experiencias">Do Mar à Mesa</a></li>
              <li><a href="#experiencias">Espírito Santo à Mesa</a></li>
              <li><a href="#experiencias">Sunset & Sip</a></li>
            </ul>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h4 className="nk-footer-heading">Contacto</h4>
            <ul className="nk-footer-links">
              <li><a href="mailto:info@ninikatours.com">info@ninikatours.com</a></li>
              <li><span aria-label="WhatsApp em atualização">WhatsApp em atualização</span></li>
              <li><a href="https://instagram.com/ninikatours" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </motion.div>
        </motion.div>

        <div className="nk-footer-bottom">
          <p>&copy; {new Date().getFullYear()} NinikaTours. Todos os direitos reservados.</p>
          <p className="nk-footer-credit">
            Criado por{" "}
            <a href="https://descomplicai.pt" target="_blank" rel="noopener noreferrer">Descomplicai</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
