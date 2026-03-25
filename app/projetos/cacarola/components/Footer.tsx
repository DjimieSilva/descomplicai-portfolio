"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="pt-16 pb-8 px-6 relative overflow-hidden"
      style={{ background: "#451A03" }}
    >
      {/* Background azulejo pattern */}
      <div className="absolute inset-0 opacity-[0.06]">
        <svg viewBox="0 0 600 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="footer-az" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <rect x="2" y="2" width="76" height="76" fill="none" stroke="#FFFBEB" strokeWidth="1.5" />
              <rect x="10" y="10" width="60" height="60" fill="none" stroke="#FFFBEB" strokeWidth="0.5" />
              <circle cx="40" cy="40" r="14" fill="none" stroke="#FFFBEB" strokeWidth="0.8" />
              <path d="M40 22 L40 58 M22 40 L58 40" stroke="#FFFBEB" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-az)" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-2"
          >
            {/* Clay pot icon */}
            <div className="flex items-center gap-3 mb-5">
              <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
                <path
                  d="M8 22 Q4 20 4 16 Q4 10 14 10 Q24 10 24 16 Q24 20 20 22Z"
                  fill="none"
                  stroke="#FDE68A"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path d="M9 10 Q9 6 14 6 Q19 6 19 10" fill="none" stroke="#FDE68A" strokeWidth="1.5" />
                <path d="M11 6 Q10 2 14 2 Q18 2 17 6" fill="none" stroke="#FDE68A" strokeWidth="1" strokeDasharray="2 1" />
                <path d="M8 22 L8 24 Q8 25 9 25 L19 25 Q20 25 20 24 L20 22" fill="none" stroke="#FDE68A" strokeWidth="1.5" />
              </svg>
              <h2
                className="text-3xl font-bold"
                style={{ fontFamily: "var(--font-source-serif-4)", color: "#FFFBEB" }}
              >
                Caçarola
              </h2>
            </div>

            <p
              className="text-xs tracking-[0.35em] uppercase mb-5"
              style={{ color: "#FDE68A", fontFamily: "var(--font-inter)" }}
            >
              Cozinha Portuguesa de Tradição
            </p>

            <p
              className="text-sm leading-relaxed mb-6 max-w-xs"
              style={{ color: "rgba(255,251,235,0.65)", fontFamily: "var(--font-inter)" }}
            >
              Dois espaços, uma só tradição. A cozinha que te lembra de casa,
              em Figueira da Foz, com os mesmos sabores de sempre.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook, label: "Facebook" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: "rgba(255,251,235,0.1)",
                    border: "1px solid rgba(255,251,235,0.15)",
                  }}
                >
                  <Icon size={15} style={{ color: "#FDE68A" }} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Caçarola 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <h4
              className="text-sm font-bold mb-5 tracking-wide uppercase"
              style={{ color: "#FDE68A", fontFamily: "var(--font-inter)" }}
            >
              Caçarola
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin size={13} className="flex-shrink-0 mt-0.5" style={{ color: "#FDE68A" }} />
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "rgba(255,251,235,0.65)", fontFamily: "var(--font-inter)" }}
                >
                  Rua da Tradição, 12<br />
                  Figueira da Foz, 3080
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} style={{ color: "#FDE68A" }} />
                <a
                  href="tel:+351233000001"
                  className="text-xs hover:text-[#FDE68A] transition-colors"
                  style={{ color: "rgba(255,251,235,0.65)", fontFamily: "var(--font-inter)" }}
                >
                  +351 233 000 001
                </a>
              </div>
              <p
                className="text-xs mt-3 leading-relaxed"
                style={{ color: "rgba(255,251,235,0.45)", fontFamily: "var(--font-inter)" }}
              >
                Ter – Sex: 12h–15h · 19h–22h30<br />
                Sáb: 12h–15h30 · 19h–23h<br />
                Dom: 12h–15h30
              </p>
            </div>
          </motion.div>

          {/* Caçarola 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <h4
              className="text-sm font-bold mb-5 tracking-wide uppercase"
              style={{ color: "#FDE68A", fontFamily: "var(--font-inter)" }}
            >
              Caçarola Dois
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin size={13} className="flex-shrink-0 mt-0.5" style={{ color: "#FDE68A" }} />
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "rgba(255,251,235,0.65)", fontFamily: "var(--font-inter)" }}
                >
                  Rua do Sabor, 45<br />
                  Figueira da Foz, 3080
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} style={{ color: "#FDE68A" }} />
                <a
                  href="tel:+351233000002"
                  className="text-xs hover:text-[#FDE68A] transition-colors"
                  style={{ color: "rgba(255,251,235,0.65)", fontFamily: "var(--font-inter)" }}
                >
                  +351 233 000 002
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} style={{ color: "#FDE68A" }} />
                <a
                  href="mailto:reservas@cacarola.pt"
                  className="text-xs hover:text-[#FDE68A] transition-colors"
                  style={{ color: "rgba(255,251,235,0.65)", fontFamily: "var(--font-inter)" }}
                >
                  reservas@cacarola.pt
                </a>
              </div>
              <p
                className="text-xs mt-3 leading-relaxed"
                style={{ color: "rgba(255,251,235,0.45)", fontFamily: "var(--font-inter)" }}
              >
                Ter – Sex: 12h–15h · 19h–22h30<br />
                Sáb: 12h–16h · 19h–23h<br />
                Dom: 12h–16h
              </p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-8"
          style={{ background: "rgba(253,230,138,0.15)" }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-xs"
            style={{ color: "rgba(255,251,235,0.35)", fontFamily: "var(--font-inter)" }}
          >
            © {new Date().getFullYear()} Caçarola & Caçarola Dois · Figueira da Foz · Todos os direitos reservados
          </p>
          <div className="flex items-center gap-1">
            <p
              className="text-xs"
              style={{ color: "rgba(255,251,235,0.35)", fontFamily: "var(--font-inter)" }}
            >
              Website por
            </p>
            <a
              href="/"
              className="text-xs hover:text-[#FDE68A] transition-colors"
              style={{ color: "rgba(255,251,235,0.5)", fontFamily: "var(--font-inter)" }}
            >
              Descomplicai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
