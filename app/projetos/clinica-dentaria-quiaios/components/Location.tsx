"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Car, Clock, Phone, Navigation } from "lucide-react";

const directions = [
  {
    from: "Figueira da Foz (centro)",
    duration: "10 min",
    distance: "8 km",
    route:
      "Tome a EN109 em direção a Norte. Em Alhadas, siga a sinalização para Quiaios. A clínica fica no Largo de S. Sebastião, no centro da vila.",
  },
  {
    from: "Coimbra",
    duration: "35 min",
    distance: "48 km",
    route:
      "A1 / IC2 até Figueira da Foz, depois EN109 Norte até Alhadas e siga para Quiaios.",
  },
  {
    from: "Leiria",
    duration: "45 min",
    distance: "60 km",
    route:
      "A17 / EN109 em direção à Figueira da Foz. Antes de entrar na cidade, desvie para Quiaios pela Senda.",
  },
];

const schedule = [
  { days: "Segunda a Sexta", hours: "09h00 – 19h00" },
  { days: "Sábado", hours: "09h00 – 13h00" },
  { days: "Domingo e Feriados", hours: "Encerrado" },
];

export default function Location() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="localizacao"
      ref={ref}
      className="py-20 lg:py-28 bg-[#FFF8F0]"
      aria-label="Localização e contactos"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-sm font-bold tracking-widest uppercase text-[#C2703B] mb-4">
            Localização
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-[#3D2B1F] leading-tight mb-4"
            style={{ fontFamily: "'Nunito Sans', sans-serif" }}
          >
            Fácil de encontrar,
            <br />no coração de Quiaios
          </h2>
          <p className="text-[#8B6F47] text-lg max-w-xl mx-auto leading-relaxed">
            Estamos no Largo de S. Sebastião, a referência central da nossa
            vila. Há estacionamento gratuito mesmo à porta.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: info cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="space-y-5"
          >
            {/* Address card */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8D5C0] shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#C2703B]/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-[#C2703B]" />
                </div>
                <div>
                  <h3
                    className="font-bold text-[#3D2B1F] text-lg mb-1"
                    style={{ fontFamily: "'Nunito Sans', sans-serif" }}
                  >
                    Morada
                  </h3>
                  <p className="text-[#8B6F47] text-sm leading-relaxed">
                    Largo de S. Sebastião
                    <br />
                    Quiaios, Figueira da Foz
                    <br />
                    Portugal
                  </p>
                  <a
                    href="https://maps.google.com/?q=Quiaios,Figueira+da+Foz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#C2703B] text-sm font-semibold mt-3 hover:underline"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    Abrir no Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Phone card */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8D5C0] shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#C2703B]/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-[#C2703B]" />
                </div>
                <div>
                  <h3
                    className="font-bold text-[#3D2B1F] text-lg mb-1"
                    style={{ fontFamily: "'Nunito Sans', sans-serif" }}
                  >
                    Contacto
                  </h3>
                  <a
                    href="tel:934868049"
                    className="text-[#C2703B] font-bold text-xl hover:underline"
                  >
                    934 868 049
                  </a>
                  <p className="text-[#8B6F47] text-xs mt-1">
                    Chamada para rede móvel nacional
                  </p>
                </div>
              </div>
            </div>

            {/* Schedule card */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8D5C0] shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#C2703B]/10 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-[#C2703B]" />
                </div>
                <div className="flex-1">
                  <h3
                    className="font-bold text-[#3D2B1F] text-lg mb-3"
                    style={{ fontFamily: "'Nunito Sans', sans-serif" }}
                  >
                    Horário
                  </h3>
                  <div className="space-y-2">
                    {schedule.map((s, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <span className="text-sm text-[#8B6F47]">{s.days}</span>
                        <span
                          className={`text-sm font-semibold ${
                            s.hours === "Encerrado"
                              ? "text-[#B0B0B0]"
                              : "text-[#3D2B1F]"
                          }`}
                        >
                          {s.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: directions + map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="space-y-5"
          >
            {/* Directions */}
            <div className="bg-white rounded-2xl border border-[#E8D5C0] shadow-sm overflow-hidden">
              <div className="flex items-center gap-3 p-5 border-b border-[#E8D5C0]">
                <Car className="w-5 h-5 text-[#C2703B]" />
                <h3
                  className="font-bold text-[#3D2B1F]"
                  style={{ fontFamily: "'Nunito Sans', sans-serif" }}
                >
                  Como Chegar
                </h3>
              </div>
              <div className="divide-y divide-[#F5EAE0]">
                {directions.map((dir, i) => (
                  <div key={i} className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-[#3D2B1F] text-sm">
                        Desde {dir.from}
                      </span>
                      <div className="flex items-center gap-3 text-xs text-[#8B6F47]">
                        <span className="font-bold text-[#C2703B]">
                          {dir.duration}
                        </span>
                        <span>•</span>
                        <span>{dir.distance}</span>
                      </div>
                    </div>
                    <p className="text-sm text-[#8B6F47] leading-relaxed">
                      {dir.route}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Map embed placeholder (styled) */}
            <div className="bg-white rounded-2xl border border-[#E8D5C0] shadow-sm overflow-hidden">
              <iframe
                title="Localização da Clínica em Quiaios"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.0!2d-8.8!3d40.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd22f5b0a1e3a4e7%3A0x123!2sQuiaios%2C+Figueira+da+Foz!5e0!3m2!1spt!2spt!4v1234567890"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
              <div className="p-4 bg-[#FFF8F0] flex items-center justify-between">
                <span className="text-xs text-[#8B6F47] font-medium">
                  Largo de S. Sebastião, Quiaios
                </span>
                <a
                  href="https://maps.google.com/?q=Quiaios,Figueira+da+Foz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#C2703B] hover:underline flex items-center gap-1"
                >
                  <Navigation className="w-3 h-3" />
                  Navegar
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
