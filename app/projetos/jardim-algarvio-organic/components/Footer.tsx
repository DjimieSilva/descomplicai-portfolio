"use client";

import { motion } from "framer-motion";

const navLinks = [
  { label: "A Nossa História", href: "#historia" },
  { label: "Jardins", href: "#jardins" },
  { label: "Serviços Sazonais", href: "#servicos" },
  { label: "Dicas", href: "#dicas" },
  { label: "Equipa", href: "#equipa" },
  { label: "Contacto", href: "#contacto" },
];

const socialLinks = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Pinterest", href: "#" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#2E7D32" }}>
      {/* Top botanical vine border */}
      <div className="w-full overflow-hidden">
        <svg
          viewBox="0 0 1200 40"
          fill="none"
          className="w-full"
          style={{ height: "40px" }}
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Continuous vine */}
          <path
            d="M0 20 C50 18, 100 22, 150 20 S250 22, 300 20 S400 18, 450 20 S550 22, 600 20 S700 18, 750 20 S850 22, 900 20 S1000 18, 1050 20 S1150 22, 1200 20"
            stroke="#FBF1E0"
            strokeWidth="1"
            strokeOpacity={0.3}
            fill="none"
          />
          {/* Leaves along the vine */}
          {[100, 200, 350, 500, 650, 800, 950, 1100].map((x, i) => (
            <path
              key={i}
              d={
                i % 2 === 0
                  ? `M${x} 20 C${x - 6} 14, ${x - 12} 13, ${x - 10} 17 C${x - 8} 21, ${x - 3} 22, ${x} 20Z`
                  : `M${x} 20 C${x + 6} 26, ${x + 12} 27, ${x + 10} 23 C${x + 8} 19, ${x + 3} 18, ${x} 20Z`
              }
              fill="#FBF1E0"
              fillOpacity={0.15}
            />
          ))}
          {/* Small berries */}
          {[150, 450, 750, 1050].map((x, i) => (
            <circle
              key={`berry-${i}`}
              cx={x}
              cy={i % 2 === 0 ? 17 : 23}
              r="2"
              fill="#FBF1E0"
              fillOpacity={0.2}
            />
          ))}
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand column */}
          <div>
            <h3
              className="text-2xl mb-3"
              style={{
                fontFamily: "var(--font-libre-caslon), serif",
                fontStyle: "italic",
                color: "#FBF1E0",
              }}
            >
              JardimAlgarvio
            </h3>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{
                fontFamily: "var(--font-newsreader), serif",
                fontStyle: "italic",
                color: "#FBF1E0",
                opacity: 0.7,
              }}
            >
              Onde a natureza encontra o design
            </p>
            {/* Social links as leaf-shaped buttons */}
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="flex items-center justify-center text-xs font-semibold px-4 py-2"
                  style={{
                    color: "#2E7D32",
                    backgroundColor: "rgba(253,246,236,0.9)",
                    borderRadius: "50% 10% 50% 10%",
                    fontFamily: "var(--font-source-sans), sans-serif",
                  }}
                  whileHover={{
                    scale: 1.08,
                    backgroundColor: "rgba(253,246,236,1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav links column */}
          <div>
            <h4
              className="text-sm font-semibold mb-4 uppercase tracking-wider"
              style={{
                fontFamily: "var(--font-source-sans), sans-serif",
                color: "#FBF1E0",
                opacity: 0.5,
              }}
            >
              Navegação
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-opacity duration-200 hover:opacity-100"
                    style={{
                      fontFamily: "var(--font-source-sans), sans-serif",
                      color: "#FBF1E0",
                      opacity: 0.7,
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4
              className="text-sm font-semibold mb-4 uppercase tracking-wider"
              style={{
                fontFamily: "var(--font-source-sans), sans-serif",
                color: "#FBF1E0",
                opacity: 0.5,
              }}
            >
              Contacto
            </h4>
            <ul className="space-y-3">
              <li
                className="text-sm"
                style={{
                  fontFamily: "var(--font-source-sans), sans-serif",
                  color: "#FBF1E0",
                  opacity: 0.7,
                }}
              >
                +351 912 345 678
              </li>
              <li
                className="text-sm"
                style={{
                  fontFamily: "var(--font-source-sans), sans-serif",
                  color: "#FBF1E0",
                  opacity: 0.7,
                }}
              >
                info@jardimalgarvio.pt
              </li>
              <li
                className="text-sm"
                style={{
                  fontFamily: "var(--font-source-sans), sans-serif",
                  color: "#FBF1E0",
                  opacity: 0.7,
                }}
              >
                Rua das Oliveiras, 42
                <br />
                8000-123 Faro, Algarve
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            borderTop: "1px solid rgba(253,246,236,0.1)",
          }}
        >
          <p
            className="text-xs"
            style={{
              fontFamily: "var(--font-source-sans), sans-serif",
              color: "#FBF1E0",
              opacity: 0.5,
            }}
          >
            &copy; {new Date().getFullYear()} JardimAlgarvio. Todos os direitos reservados.
          </p>
          <p
            className="text-xs"
            style={{
              fontFamily: "var(--font-source-sans), sans-serif",
              color: "#FBF1E0",
              opacity: 0.5,
            }}
          >
            Desenvolvido com 🌿 por{" "}
            <a
              href="https://descomplicai.pt"
              className="underline hover:opacity-100 transition-opacity"
              style={{ color: "#FBF1E0", opacity: 0.8 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Descomplicai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
