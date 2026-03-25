"use client";

import { motion } from "framer-motion";
import { Calendar, Music, Sunset, Users, Camera, Waves } from "lucide-react";

const events = [
  {
    icon: Sunset,
    title: "Sunset Sessions",
    schedule: "Sexta e Sábado · 19h–22h",
    description:
      "O nosso evento mais icónico. DJs locais a tocar enquanto o sol se despede do oceano. Cocktails especiais, ambiente inesquecível.",
    color: "#FF6B35",
    bg: "rgba(255,107,53,0.1)",
    badge: "Toda a semana",
  },
  {
    icon: Music,
    title: "Live Music",
    schedule: "Domingos · 16h–19h",
    description:
      "Artistas portugueses ao vivo. Acústico, jazz, indie — cada domingo é uma surpresa diferente. Música ao vivo com alma.",
    color: "#0077B6",
    bg: "rgba(0,119,182,0.1)",
    badge: "Domingo",
  },
  {
    icon: Waves,
    title: "Surf & Brunch",
    schedule: "Sábados · 10h–13h",
    description:
      "Sessão de surf para iniciantes seguida de brunch na esplanada. Parceria com escola de surf local. Vagas limitadas.",
    color: "#2D6A4F",
    bg: "rgba(45,106,79,0.1)",
    badge: "Sábado",
  },
  {
    icon: Users,
    title: "NALU Night",
    schedule: "Última Sexta do Mês",
    description:
      "A noite grande do NALU. DJ set até às 2h, cocktails de autor e a melhor festa da Figueira da Foz.",
    color: "#9B5DE5",
    bg: "rgba(155,93,229,0.1)",
    badge: "Mensal",
  },
  {
    icon: Camera,
    title: "Golden Hour Club",
    schedule: "Terça a Quinta · 17h–18h",
    description:
      "Vem fotografar o pôr do sol mais bonito de Portugal. Partilha nas redes e recebe um drink de oferta.",
    color: "#FFD700",
    bg: "rgba(255,215,0,0.1)",
    badge: "Diário",
  },
  {
    icon: Calendar,
    title: "Eventos Privados",
    schedule: "Mediante Reserva",
    description:
      "Aniversários, despedidas de solteiro, eventos corporativos. O NALU é o cenário perfeito para a tua celebração.",
    color: "#F4E4C1",
    bg: "rgba(244,228,193,0.08)",
    badge: "Personalizado",
  },
];

export default function Events() {
  return (
    <section
      id="events"
      className="relative py-24 md:py-32 bg-[#0A1628] overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FF6B35]/5 rounded-full blur-[150px]" />
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
          <span className="text-[#FF6B35] text-sm font-bold tracking-[0.3em] uppercase mb-4 block">
            Agenda
          </span>
          <h2
            className="text-4xl md:text-6xl font-black text-white mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Noites que
            <br />
            <span className="text-[#FF6B35]">Não Esqueces</span>
          </h2>
          <p className="text-white/60 text-base max-w-xl mx-auto">
            Da manhã ao pôr do sol, passando pela noite. Há sempre um motivo para
            voltar ao NALU.
          </p>
        </motion.div>

        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => {
            const Icon = event.icon;
            return (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                style={{ background: event.bg }}
              >
                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full border"
                    style={{
                      color: event.color,
                      borderColor: `${event.color}40`,
                      background: `${event.color}15`,
                    }}
                  >
                    {event.badge}
                  </span>
                </div>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${event.color}20` }}
                >
                  <Icon size={24} style={{ color: event.color }} />
                </div>

                {/* Content */}
                <h3
                  className="text-white font-black text-lg mb-1 group-hover:text-[#FF6B35] transition-colors"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {event.title}
                </h3>
                <p
                  className="text-xs font-semibold mb-3 tracking-wide"
                  style={{ color: event.color }}
                >
                  {event.schedule}
                </p>
                <p className="text-white/60 text-sm leading-relaxed">
                  {event.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-white/50 text-sm mb-4">
            Segue-nos para não perderes nenhum evento
          </p>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#1877F2]/20 hover:bg-[#1877F2]/30 border border-[#1877F2]/30 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            NALU no Facebook
          </a>
        </motion.div>
      </div>
    </section>
  );
}
