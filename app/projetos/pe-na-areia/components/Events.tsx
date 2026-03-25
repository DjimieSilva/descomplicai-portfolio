"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Users, Sparkles, Music } from "lucide-react";

const eventTypes = [
  {
    icon: Heart,
    title: "Casamentos na Praia",
    subtitle: "Cerimónias & Recepções",
    desc: "O cenário mais romântico de Portugal. Casamentos com os pés na areia, ao som do oceano, com o pôr do sol como pano de fundo.",
    capacity: "Até 200 convidados",
    features: ["Cerimónia na praia", "Decoração personalizada", "Ementa exclusiva", "Alojamento próximo"],
    color: "#F97316",
    featured: true,
  },
  {
    icon: Users,
    title: "Eventos Corporativos",
    subtitle: "Jantares & Team Building",
    desc: "Impressione os seus clientes ou celebre com a sua equipa num ambiente único. O mar como cenário, a excelência como garantia.",
    capacity: "10 a 120 pessoas",
    features: ["Espaço exclusivo", "Catering personalizado", "A/V disponível", "Estacionamento"],
    color: "#0E7490",
    featured: false,
  },
  {
    icon: Sparkles,
    title: "Celebrações Privadas",
    subtitle: "Aniversários & Comemorações",
    desc: "Aniversários de anos, noivados, batizados ou qualquer momento que mereça ser celebrado de forma extraordinária.",
    capacity: "10 a 80 pessoas",
    features: ["Decoração temática", "Bolo personalizado", "Cocktail de boas-vindas", "Fotografia"],
    color: "#DDB892",
    featured: false,
  },
  {
    icon: Music,
    title: "Festas & Noites de Verão",
    subtitle: "Música ao Vivo & DJs",
    desc: "As melhores noites de verão da Figueira. Música ao vivo ou DJ, cocktails na areia, e uma multidão que sabe celebrar.",
    capacity: "Até 300 pessoas",
    features: ["Palco na praia", "Sistema de som", "Bar completo", "Catering"],
    color: "#9A8C72",
    featured: false,
  },
];

export default function Events() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="eventos" className="py-24 md:py-32 bg-[#1a1410] relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F97316]/30 to-transparent" />

      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "150px",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p
            className="text-[#F97316]/60 text-xs tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Eventos Privados
          </p>
          <h2
            className="text-[#FAF8F4] text-4xl md:text-6xl font-light mb-6"
            style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 200 }}
          >
            Celebre{" "}
            <span className="text-[#F97316] italic" style={{ fontWeight: 300 }}>
              à beira-mar
            </span>
          </h2>
          <p className="text-[#9A8C72] text-base max-w-xl mx-auto leading-relaxed">
            O Pé na Areia transforma-se no cenário perfeito para os momentos mais
            importantes da sua vida. Da cerimónia mais íntima ao evento mais grandioso.
          </p>
        </motion.div>

        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {eventTypes.map((event, i) => {
            const Icon = event.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
                className={`group relative p-8 rounded-2xl border overflow-hidden transition-all duration-500 ${
                  event.featured
                    ? "border-[#F97316]/30 bg-gradient-to-br from-[#F97316]/8 to-[#1a1410]"
                    : "border-[#DDB892]/8 bg-[#DDB892]/2 hover:border-[#DDB892]/20"
                }`}
              >
                {event.featured && (
                  <div className="absolute top-4 right-4 text-[9px] tracking-[0.25em] uppercase text-[#F97316] border border-[#F97316]/30 rounded-full px-2 py-0.5">
                    Popular
                  </div>
                )}

                {/* Glow background */}
                <div
                  className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                  style={{ backgroundColor: event.color, filter: "blur(30px)" }}
                />

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${event.color}15` }}
                >
                  <Icon className="w-5 h-5" style={{ color: event.color }} />
                </div>

                {/* Subtitle */}
                <p
                  className="text-[10px] tracking-[0.3em] uppercase mb-2 opacity-60"
                  style={{ color: event.color, fontFamily: "'Manrope', sans-serif" }}
                >
                  {event.subtitle}
                </p>

                {/* Title */}
                <h3
                  className="text-[#FAF8F4] text-xl font-medium mb-3"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {event.title}
                </h3>

                {/* Description */}
                <p className="text-[#9A8C72] text-sm leading-relaxed mb-5">
                  {event.desc}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {event.features.map((f, j) => (
                    <span
                      key={j}
                      className="text-[10px] px-2.5 py-1 rounded-full border"
                      style={{
                        color: `${event.color}80`,
                        borderColor: `${event.color}20`,
                        backgroundColor: `${event.color}08`,
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* Capacity */}
                <div className="flex items-center gap-2">
                  <div className="w-4 h-px" style={{ backgroundColor: event.color, opacity: 0.4 }} />
                  <span className="text-[#9A8C72]/60 text-xs" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    {event.capacity}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-14 text-center p-10 border border-[#F97316]/15 rounded-2xl bg-gradient-to-br from-[#F97316]/5 to-transparent"
        >
          <p
            className="text-[#F97316]/70 text-xs tracking-[0.35em] uppercase mb-3"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Consulte disponibilidade
          </p>
          <h3
            className="text-[#FAF8F4] text-2xl font-light mb-3"
            style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 300 }}
          >
            Vamos criar algo{" "}
            <span className="text-[#F97316] italic">inesquecível</span> juntos
          </h3>
          <p className="text-[#9A8C72] text-sm max-w-md mx-auto">
            A nossa equipa de eventos está disponível para criar uma proposta
            personalizada para o seu momento especial.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
