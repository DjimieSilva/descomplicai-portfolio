"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone, Mail, Facebook, Navigation } from "lucide-react";

export default function Location() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="localizacao"
      className="py-24 px-6"
      style={{ background: "#FAF7F0" }}
    >
      <div ref={ref} className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p
            className="text-xs tracking-[0.4em] uppercase mb-4"
            style={{ color: "#CFB53B", fontFamily: "var(--font-source-sans-3)" }}
          >
            Onde Estamos
          </p>
          <h2
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: "var(--font-eb-garamond)", color: "#4A3728" }}
          >
            No Coração da
            <br />
            <em>Figueira da Foz</em>
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-20" style={{ background: "#CFB53B" }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#CFB53B" }} />
            <div className="h-px w-20" style={{ background: "#CFB53B" }} />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Map placeholder + address */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Map placeholder */}
            <div
              className="relative w-full mb-6 overflow-hidden"
              style={{ height: "300px", background: "#E8E0D5" }}
            >
              {/* Styled map placeholder */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div
                  className="w-16 h-16 flex items-center justify-center mb-3"
                  style={{ background: "#800020" }}
                >
                  <MapPin size={28} color="#FFFFF0" />
                </div>
                <p
                  className="text-sm font-semibold mb-1"
                  style={{ fontFamily: "var(--font-eb-garamond)", color: "#4A3728", fontSize: "1.1rem" }}
                >
                  Bijou Restaurante
                </p>
                <p
                  className="text-xs text-center px-4"
                  style={{ color: "#8B6E5A", fontFamily: "var(--font-source-sans-3)" }}
                >
                  Rua da República, 42
                  <br />
                  3080-159 Figueira da Foz
                </p>
              </div>
              {/* Vintage map grid overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: "linear-gradient(#4A3728 1px, transparent 1px), linear-gradient(90deg, #4A3728 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              {/* Corner decorations */}
              <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2" style={{ borderColor: "#CFB53B" }} />
              <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2" style={{ borderColor: "#CFB53B" }} />
              <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2" style={{ borderColor: "#CFB53B" }} />
              <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2" style={{ borderColor: "#CFB53B" }} />
            </div>

            <a
              href="https://maps.google.com/?q=Figueira+da+Foz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 text-sm tracking-widest uppercase transition-all hover:scale-[1.02]"
              style={{
                background: "#4A3728",
                color: "#CFB53B",
                fontFamily: "var(--font-source-sans-3)",
              }}
            >
              <Navigation size={14} />
              Abrir no Google Maps
            </a>
          </motion.div>

          {/* Right: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Address */}
            <div
              className="p-6 border"
              style={{ borderColor: "rgba(74,55,40,0.15)", background: "white" }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(128,0,32,0.08)" }}
                >
                  <MapPin size={18} style={{ color: "#800020" }} />
                </div>
                <div>
                  <p
                    className="text-xs tracking-widest uppercase mb-2"
                    style={{ color: "#CFB53B", fontFamily: "var(--font-source-sans-3)" }}
                  >
                    Morada
                  </p>
                  <p
                    className="text-base font-semibold"
                    style={{ fontFamily: "var(--font-eb-garamond)", color: "#4A3728" }}
                  >
                    Rua da República, 42
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "#6B5344", fontFamily: "var(--font-source-sans-3)" }}
                  >
                    3080-159 Figueira da Foz
                    <br />
                    Coimbra, Portugal
                  </p>
                  <p
                    className="text-xs mt-2 italic"
                    style={{ color: "#8B6E5A", fontFamily: "var(--font-eb-garamond)" }}
                  >
                    No centro histórico, a 2 minutos da Praia
                  </p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div
              className="p-6 border"
              style={{ borderColor: "rgba(74,55,40,0.15)", background: "white" }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(128,0,32,0.08)" }}
                >
                  <Phone size={18} style={{ color: "#800020" }} />
                </div>
                <div>
                  <p
                    className="text-xs tracking-widest uppercase mb-2"
                    style={{ color: "#CFB53B", fontFamily: "var(--font-source-sans-3)" }}
                  >
                    Telefone & Reservas
                  </p>
                  <a
                    href="tel:+351239000000"
                    className="text-xl font-bold hover:text-[#800020] transition-colors"
                    style={{ fontFamily: "var(--font-eb-garamond)", color: "#4A3728" }}
                  >
                    239 000 000
                  </a>
                  <p
                    className="text-sm mt-1"
                    style={{ color: "#6B5344", fontFamily: "var(--font-source-sans-3)" }}
                  >
                    Terça a Domingo · 10:00 – 22:00
                  </p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div
              className="p-6 border"
              style={{ borderColor: "rgba(74,55,40,0.15)", background: "white" }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(128,0,32,0.08)" }}
                >
                  <Mail size={18} style={{ color: "#800020" }} />
                </div>
                <div>
                  <p
                    className="text-xs tracking-widest uppercase mb-2"
                    style={{ color: "#CFB53B", fontFamily: "var(--font-source-sans-3)" }}
                  >
                    Email
                  </p>
                  <a
                    href="mailto:reservas@bijourestaurante.pt"
                    className="text-base font-medium hover:text-[#800020] transition-colors"
                    style={{ fontFamily: "var(--font-source-sans-3)", color: "#4A3728" }}
                  >
                    reservas@bijourestaurante.pt
                  </a>
                </div>
              </div>
            </div>

            {/* Facebook */}
            <div
              className="p-6 border"
              style={{ borderColor: "rgba(74,55,40,0.15)", background: "white" }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(128,0,32,0.08)" }}
                >
                  <Facebook size={18} style={{ color: "#800020" }} />
                </div>
                <div>
                  <p
                    className="text-xs tracking-widest uppercase mb-2"
                    style={{ color: "#CFB53B", fontFamily: "var(--font-source-sans-3)" }}
                  >
                    Facebook
                  </p>
                  <a
                    href="https://facebook.com/bijourestaurante"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-medium hover:text-[#800020] transition-colors"
                    style={{ fontFamily: "var(--font-source-sans-3)", color: "#4A3728" }}
                  >
                    /bijourestaurante
                  </a>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "#8B6E5A", fontFamily: "var(--font-source-sans-3)" }}
                  >
                    Siga-nos para novidades e eventos especiais
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
