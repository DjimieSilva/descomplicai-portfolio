"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const navLinks = [
    { label: "Projetos", href: "#projetos" },
    { label: "Processo", href: "#processo" },
    { label: "Testemunhos", href: "#testemunhos" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <footer ref={ref} className="relative pt-16 pb-8 px-6" style={{ background: "#1A1A18" }}>
      {/* Olive branch border SVG at top */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden" style={{ height: "60px" }}>
        <svg
          viewBox="0 0 1440 60"
          className="w-full h-full"
          preserveAspectRatio="none"
          fill="none"
        >
          {/* Long horizontal olive branch */}
          <path
            d="M0 30 C200 28 400 32 720 30 C1040 28 1240 32 1440 30"
            stroke="#C9A96E"
            strokeWidth="1"
            opacity="0.3"
          />
          {/* Leaves along the branch */}
          <ellipse cx="120" cy="28" rx="14" ry="5" stroke="#C9A96E" strokeWidth="0.8" opacity="0.2" transform="rotate(-15 120 28)" />
          <ellipse cx="280" cy="32" rx="14" ry="5" stroke="#C9A96E" strokeWidth="0.8" opacity="0.2" transform="rotate(10 280 32)" />
          <ellipse cx="450" cy="28" rx="12" ry="4" stroke="#C9A96E" strokeWidth="0.8" opacity="0.2" transform="rotate(-20 450 28)" />
          <ellipse cx="620" cy="31" rx="14" ry="5" stroke="#C9A96E" strokeWidth="0.8" opacity="0.2" transform="rotate(12 620 31)" />
          <ellipse cx="780" cy="29" rx="12" ry="4" stroke="#C9A96E" strokeWidth="0.8" opacity="0.2" transform="rotate(-8 780 29)" />
          <ellipse cx="950" cy="31" rx="14" ry="5" stroke="#C9A96E" strokeWidth="0.8" opacity="0.2" transform="rotate(15 950 31)" />
          <ellipse cx="1120" cy="28" rx="12" ry="4" stroke="#C9A96E" strokeWidth="0.8" opacity="0.2" transform="rotate(-12 1120 28)" />
          <ellipse cx="1300" cy="31" rx="14" ry="5" stroke="#C9A96E" strokeWidth="0.8" opacity="0.2" transform="rotate(10 1300 31)" />
          {/* Small olives */}
          <circle cx="200" cy="30" r="3" stroke="#C9A96E" strokeWidth="0.6" opacity="0.15" />
          <circle cx="540" cy="30" r="3" stroke="#C9A96E" strokeWidth="0.6" opacity="0.15" />
          <circle cx="860" cy="30" r="3" stroke="#C9A96E" strokeWidth="0.6" opacity="0.15" />
          <circle cx="1200" cy="30" r="3" stroke="#C9A96E" strokeWidth="0.6" opacity="0.15" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center text-center mb-12"
        >
          {/* Company name */}
          <h2
            className="text-3xl md:text-4xl font-bold mb-2"
            style={{ fontFamily: "var(--font-playfair)", color: "#F5F0E8" }}
          >
            Jardim<span style={{ color: "#C9A96E" }}>Algarvio</span>
          </h2>
          <p
            className="text-xs tracking-[0.3em] uppercase mb-8"
            style={{ color: "rgba(245,240,232,0.4)" }}
          >
            Paisagismo de Autor
          </p>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm tracking-wider uppercase transition-colors duration-300 hover:text-[#C9A96E]"
                style={{ color: "rgba(245,240,232,0.6)", fontFamily: "var(--font-inter)" }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social links */}
          <div className="flex items-center gap-4 mb-8">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[rgba(201,169,110,0.15)] hover:scale-110"
              style={{ border: "1px solid rgba(201,169,110,0.2)" }}
              aria-label="Instagram"
            >
              <Instagram size={18} style={{ color: "#C9A96E" }} />
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[rgba(201,169,110,0.15)] hover:scale-110"
              style={{ border: "1px solid rgba(201,169,110,0.2)" }}
              aria-label="Pinterest"
            >
              {/* Pinterest icon (not in lucide-react, using custom SVG) */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C9A96E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 12 C8 6 16 6 16 12 C16 18 12 22 10 22" />
                <path d="M12 12 L8 22" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[rgba(201,169,110,0.15)] hover:scale-110"
              style={{ border: "1px solid rgba(201,169,110,0.2)" }}
              aria-label="LinkedIn"
            >
              <Linkedin size={18} style={{ color: "#C9A96E" }} />
            </a>
          </div>

          {/* Contact quick info */}
          <div
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-sm mb-10"
            style={{ color: "rgba(245,240,232,0.5)" }}
          >
            <a
              href="tel:+351912345678"
              className="transition-colors duration-300 hover:text-[#C9A96E]"
            >
              +351 912 345 678
            </a>
            <span className="hidden sm:block" style={{ color: "rgba(201,169,110,0.3)" }}>
              |
            </span>
            <a
              href="mailto:info@jardimalgarvio.pt"
              className="transition-colors duration-300 hover:text-[#C9A96E]"
            >
              info@jardimalgarvio.pt
            </a>
          </div>
        </motion.div>

        {/* Gold line separator */}
        <div
          className="h-px mb-6"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(201,169,110,0.3) 30%, rgba(201,169,110,0.3) 70%, transparent)",
          }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p style={{ color: "rgba(245,240,232,0.3)" }}>
            &copy; {new Date().getFullYear()} JardimAlgarvio. Todos os direitos reservados.
          </p>
          <p style={{ color: "rgba(245,240,232,0.3)" }}>
            Desenvolvido por{" "}
            <a
              href="https://descomplicai.pt"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-[#C9A96E]"
              style={{ color: "#C9A96E" }}
            >
              Descomplicai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
