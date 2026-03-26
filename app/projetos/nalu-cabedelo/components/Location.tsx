"use client";

import { motion } from "framer-motion";
import { MapPin, Car, Bus, Bike, Navigation } from "lucide-react";

const howToGet = [
  {
    icon: Car,
    title: "De Carro",
    description:
      "A10 → A17 → IC1 Figueira da Foz. Sai na Gala e segue para Cabedelo. Parque de estacionamento gratuito junto à praia.",
    color: "#FF6B35",
  },
  {
    icon: Bus,
    title: "De Autocarro",
    description:
      "Linha 1 da AVIC desde o centro da Figueira da Foz. Paragem 'Praia de Cabedelo' — 5 minutos a pé do NALU.",
    color: "#0077B6",
  },
  {
    icon: Bike,
    title: "De Bicicleta",
    description:
      "Ciclovia ao longo do Rio Mondego desde o centro da cidade. Estacionamento de bicicletas disponível no local.",
    color: "#2D6A4F",
  },
  {
    icon: Navigation,
    title: "GPS",
    description:
      "Pesquisa 'NALU Cabedelo' ou usa as coordenadas: 40.1394° N, 8.8647° W. Abre no Google Maps.",
    color: "#FFD700",
  },
];

export default function Location() {
  return (
    <section
      id="location"
      className="relative py-24 md:py-32 bg-[#0D1F3C] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#0077B6]/8 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[#0077B6] text-sm font-bold tracking-[0.3em] uppercase mb-4 block">
            Localização
          </span>
          <h2
            className="text-4xl md:text-6xl font-black text-white mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Encontra-nos
            <br />
            <span className="text-[#0077B6]">na Praia</span>
          </h2>
          <p className="text-white/60 text-base max-w-xl mx-auto">
            No coração da Praia de Cabedelo, com vista para o oceano. Impossível
            não encontrar — segue o som das ondas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Map embed placeholder */}
            <div
              className="relative w-full h-[350px] rounded-3xl overflow-hidden border border-white/10"
              style={{
                background:
                  "linear-gradient(135deg, #0A1628 0%, #0D3050 50%, #0A1628 100%)",
              }}
            >
              {/* Decorative map-like content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  {/* Simulated map UI */}
                  <div className="relative">
                    {/* Ocean waves */}
                    <div className="absolute inset-0 overflow-hidden rounded-full w-48 h-48 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-[#0077B6]/20" />

                    {/* Pin */}
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,107,53,0.5)] mb-2">
                        <MapPin size={28} className="text-white" />
                      </div>
                      <div
                        className="w-4 h-4 bg-[#FF6B35] rotate-45 -mt-2"
                        style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
                      />
                    </motion.div>

                    <div className="mt-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3">
                      <p className="text-white font-bold text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        NALU · Praia de Cabedelo
                      </p>
                      <p className="text-white/60 text-xs">Figueira da Foz, Portugal</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative grid lines */}
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                backgroundSize: "40px 40px"
              }} />
            </div>

            {/* Open in Maps button */}
            <motion.a
              href="https://maps.google.com/?q=Praia+de+Cabedelo+Figueira+da+Foz"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center justify-center gap-2 mt-4 w-full bg-[#0077B6]/20 hover:bg-[#0077B6]/30 border border-[#0077B6]/30 text-white font-semibold py-3 rounded-2xl transition-all duration-300"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <Navigation size={16} />
              Abrir no Google Maps
            </motion.a>
          </motion.div>

          {/* How to get there */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            {/* Address card */}
            <div className="p-5 rounded-2xl bg-[#FF6B35]/10 border border-[#FF6B35]/20 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="text-[#FF6B35] shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="text-white font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Rua Domingos São Marcos Laureano, 2
                  </p>
                  <p className="text-white/60 text-sm">3090-661 Figueira da Foz (Cabedelo)</p>
                  <p className="text-white/60 text-sm">Portugal</p>
                </div>
              </div>
            </div>

            {howToGet.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 hover:border-white/20 transition-colors group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${method.color}20` }}
                  >
                    <Icon size={18} style={{ color: method.color }} />
                  </div>
                  <div>
                    <h3
                      className="text-white font-bold text-sm mb-1"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {method.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {method.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
