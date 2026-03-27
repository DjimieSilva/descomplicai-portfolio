"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 px-6 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #1A1A18 0%, #2A2821 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left: Text content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {/* Section kicker */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12" style={{ background: "#C9A96E" }} />
            <span
              className="text-xs tracking-[0.4em] uppercase"
              style={{ color: "#C9A96E", fontFamily: "var(--font-inter)" }}
            >
              Filosofia
            </span>
          </div>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8"
            style={{ fontFamily: "var(--font-playfair)", color: "#F5F0E8" }}
          >
            A Arte de<br />
            <span style={{ color: "#C9A96E" }}>Projetar Jardins</span>
          </h2>

          <div className="space-y-6" style={{ color: "rgba(245,240,232,0.8)" }}>
            <p className="text-base md:text-lg leading-relaxed">
              No JardimAlgarvio, cada projeto nasce da escuta atenta do terreno e da luz.
              Trabalhamos com a natureza, nunca contra ela &mdash; respeitando o clima
              &uacute;nico do Algarve e a sabedoria das plantas que aqui prosperam h&aacute;
              mil&eacute;nios.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              As nossas cria&ccedil;&otilde;es celebram esp&eacute;cies nativas e
              mediterr&acirc;nicas: o <em style={{ color: "#C9A96E" }}>alecrim</em> que
              perfuma o ar, a <em style={{ color: "#C9A96E" }}>alfazema</em> que atrai
              polinizadores, a <em style={{ color: "#C9A96E" }}>oliveira</em> centenária
              que conta hist&oacute;rias, e a <em style={{ color: "#C9A96E" }}>alfarrobeira</em>{" "}
              que define a paisagem algarvia.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              Cada jardim &eacute; um ecossistema equilibrado &mdash; com sistemas de rega
              inteligentes que conservam &aacute;gua, pavimentos perme&aacute;veis que respeitam
              o solo e uma paleta bot&acirc;nica que floresce em harmonia com as esta&ccedil;&otilde;es.
            </p>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-3 gap-6 mt-10 pt-10"
            style={{ borderTop: "1px solid rgba(201,169,110,0.2)" }}
          >
            {[
              { number: "15+", label: "Anos de Experiência" },
              { number: "200+", label: "Projetos Realizados" },
              { number: "98%", label: "Clientes Satisfeitos" },
            ].map((stat, i) => (
              <div key={i} className="text-center lg:text-left">
                <div
                  className="text-3xl md:text-4xl font-bold mb-1"
                  style={{ fontFamily: "var(--font-playfair)", color: "#C9A96E" }}
                >
                  {stat.number}
                </div>
                <div
                  className="text-xs tracking-wider uppercase"
                  style={{ color: "rgba(245,240,232,0.5)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Decorative SVG olive tree illustration */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          className="flex items-center justify-center"
        >
          <svg
            viewBox="0 0 500 600"
            className="w-full max-w-md lg:max-w-lg"
            fill="none"
          >
            {/* Ground line */}
            <ellipse cx="250" cy="560" rx="180" ry="15" fill="rgba(201,169,110,0.08)" />

            {/* Trunk */}
            <path
              d="M240 560 C238 520 225 460 230 400 C235 340 232 300 240 260 C245 230 250 200 255 180"
              stroke="#C9A96E"
              strokeWidth="3"
              fill="none"
              opacity="0.6"
            />
            <path
              d="M260 560 C262 520 270 460 268 400 C265 340 268 300 262 260 C258 230 254 200 252 180"
              stroke="#C9A96E"
              strokeWidth="3"
              fill="none"
              opacity="0.6"
            />
            {/* Trunk texture */}
            <path
              d="M245 500 C250 490 255 480 252 470"
              stroke="#C9A96E"
              strokeWidth="1"
              opacity="0.3"
            />
            <path
              d="M255 440 C250 430 248 420 252 410"
              stroke="#C9A96E"
              strokeWidth="1"
              opacity="0.3"
            />

            {/* Main branches */}
            <path
              d="M250 200 C220 170 170 140 120 120"
              stroke="#C9A96E"
              strokeWidth="2.5"
              opacity="0.5"
            />
            <path
              d="M250 200 C280 170 330 140 380 125"
              stroke="#C9A96E"
              strokeWidth="2.5"
              opacity="0.5"
            />
            <path
              d="M245 240 C210 210 160 200 110 200"
              stroke="#C9A96E"
              strokeWidth="2"
              opacity="0.4"
            />
            <path
              d="M258 230 C290 200 340 195 390 200"
              stroke="#C9A96E"
              strokeWidth="2"
              opacity="0.4"
            />
            <path
              d="M250 180 C250 150 240 110 230 70"
              stroke="#C9A96E"
              strokeWidth="2"
              opacity="0.5"
            />
            <path
              d="M252 175 C260 140 270 100 280 65"
              stroke="#C9A96E"
              strokeWidth="1.5"
              opacity="0.4"
            />

            {/* Leaf clusters - using ellipses */}
            {/* Top cluster */}
            <ellipse cx="230" cy="65" rx="35" ry="25" fill="#3D5A3E" opacity="0.3" />
            <ellipse cx="280" cy="60" rx="30" ry="22" fill="#5A7D5C" opacity="0.25" />
            <ellipse cx="255" cy="50" rx="28" ry="20" fill="#3D5A3E" opacity="0.35" />

            {/* Left clusters */}
            <ellipse cx="120" cy="115" rx="40" ry="28" fill="#3D5A3E" opacity="0.3" />
            <ellipse cx="95" cy="108" rx="32" ry="22" fill="#5A7D5C" opacity="0.25" />
            <ellipse cx="140" cy="100" rx="30" ry="20" fill="#3D5A3E" opacity="0.2" />
            <ellipse cx="110" cy="195" rx="38" ry="26" fill="#5A7D5C" opacity="0.28" />
            <ellipse cx="85" cy="188" rx="28" ry="20" fill="#3D5A3E" opacity="0.22" />

            {/* Right clusters */}
            <ellipse cx="380" cy="120" rx="40" ry="28" fill="#3D5A3E" opacity="0.3" />
            <ellipse cx="405" cy="113" rx="32" ry="22" fill="#5A7D5C" opacity="0.25" />
            <ellipse cx="360" cy="105" rx="30" ry="20" fill="#3D5A3E" opacity="0.2" />
            <ellipse cx="390" cy="195" rx="38" ry="26" fill="#5A7D5C" opacity="0.28" />
            <ellipse cx="415" cy="190" rx="28" ry="20" fill="#3D5A3E" opacity="0.22" />

            {/* Individual olive leaf details */}
            <ellipse cx="150" cy="130" rx="14" ry="5" fill="none" stroke="#C9A96E" strokeWidth="0.8" opacity="0.4" transform="rotate(-20 150 130)" />
            <ellipse cx="170" cy="110" rx="14" ry="5" fill="none" stroke="#C9A96E" strokeWidth="0.8" opacity="0.4" transform="rotate(-35 170 110)" />
            <ellipse cx="340" cy="130" rx="14" ry="5" fill="none" stroke="#C9A96E" strokeWidth="0.8" opacity="0.4" transform="rotate(20 340 130)" />
            <ellipse cx="320" cy="110" rx="14" ry="5" fill="none" stroke="#C9A96E" strokeWidth="0.8" opacity="0.4" transform="rotate(35 320 110)" />
            <ellipse cx="240" cy="75" rx="12" ry="4" fill="none" stroke="#C9A96E" strokeWidth="0.8" opacity="0.4" transform="rotate(-10 240 75)" />
            <ellipse cx="270" cy="72" rx="12" ry="4" fill="none" stroke="#C9A96E" strokeWidth="0.8" opacity="0.4" transform="rotate(15 270 72)" />

            {/* Olives */}
            <circle cx="135" cy="125" r="5" fill="#C9A96E" opacity="0.2" />
            <circle cx="135" cy="125" r="5" stroke="#C9A96E" strokeWidth="0.8" fill="none" opacity="0.4" />
            <circle cx="365" cy="128" r="5" fill="#C9A96E" opacity="0.2" />
            <circle cx="365" cy="128" r="5" stroke="#C9A96E" strokeWidth="0.8" fill="none" opacity="0.4" />
            <circle cx="250" cy="60" r="4" fill="#C9A96E" opacity="0.2" />
            <circle cx="250" cy="60" r="4" stroke="#C9A96E" strokeWidth="0.8" fill="none" opacity="0.4" />
            <circle cx="100" cy="200" r="4" fill="#C9A96E" opacity="0.2" />
            <circle cx="100" cy="200" r="4" stroke="#C9A96E" strokeWidth="0.8" fill="none" opacity="0.4" />
            <circle cx="400" cy="198" r="4" fill="#C9A96E" opacity="0.2" />
            <circle cx="400" cy="198" r="4" stroke="#C9A96E" strokeWidth="0.8" fill="none" opacity="0.4" />

            {/* Root suggestions */}
            <path
              d="M235 560 C220 575 200 580 180 578"
              stroke="#C9A96E"
              strokeWidth="1.5"
              opacity="0.2"
            />
            <path
              d="M265 560 C280 575 300 580 320 578"
              stroke="#C9A96E"
              strokeWidth="1.5"
              opacity="0.2"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
