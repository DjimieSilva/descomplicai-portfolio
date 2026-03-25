"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Heart } from "lucide-react";

const team = [
  {
    name: "Dra. Ana Lopes",
    role: "Médica Dentista — Clínica Geral e Endodontia",
    bio: "Formada pela Faculdade de Medicina Dentária da Universidade de Lisboa, com mais de 15 anos de experiência. Cresceu perto de Quiaios e voltou para servir a comunidade que conhece.",
    tags: ["Endodontia", "Clínica Geral", "Prevenção"],
    initials: "AL",
    color: "#C2703B",
  },
  {
    name: "Dr. Miguel Ferreira",
    role: "Médico Dentista — Ortodontia e Implantologia",
    bio: "Especialista em ortodontia e implantes, com pós-graduação em Implantologia Oral. Acredita que um sorriso saudável transforma a vida de qualquer pessoa, independentemente da idade.",
    tags: ["Ortodontia", "Implantes", "Cirurgia"],
    initials: "MF",
    color: "#5F7A3A",
  },
  {
    name: "Dra. Sofia Nunes",
    role: "Médica Dentista — Odontopediatria",
    bio: "Especialista em saúde oral infantil, com formação em odontopediatria. A sua paciência e simpatia fazem das visitas ao dentista uma experiência positiva para os mais pequenos.",
    tags: ["Crianças", "Prevenção", "Selantes"],
    initials: "SN",
    color: "#8B6F47",
  },
];

export default function Team() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="equipa"
      ref={ref}
      className="py-20 lg:py-28 bg-[#FFF8F0]"
      aria-label="A nossa equipa"
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
            A Nossa Equipa
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-[#3D2B1F] leading-tight mb-4"
            style={{ fontFamily: "'Nunito Sans', sans-serif" }}
          >
            Profissionais com alma,
            <br />raízes na comunidade
          </h2>
          <p className="text-[#8B6F47] text-lg max-w-xl mx-auto leading-relaxed">
            A nossa equipa combina formação de excelência com uma ligação
            genuína à terra e às suas gentes.
          </p>
        </motion.div>

        {/* Team cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {team.map((member, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="bg-white rounded-3xl overflow-hidden border border-[#E8D5C0] hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              {/* Avatar area */}
              <div
                className="h-36 relative flex items-end justify-start px-6 pb-0"
                style={{
                  background: `linear-gradient(135deg, ${member.color}22, ${member.color}0A)`,
                }}
              >
                {/* Decorative circles */}
                <div
                  className="absolute top-4 right-6 w-16 h-16 rounded-full opacity-10"
                  style={{ backgroundColor: member.color }}
                />
                <div
                  className="absolute top-8 right-14 w-8 h-8 rounded-full opacity-15"
                  style={{ backgroundColor: member.color }}
                />

                {/* Initials avatar */}
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-extrabold shadow-md translate-y-10 border-4 border-white"
                  style={{
                    backgroundColor: member.color,
                    fontFamily: "'Nunito Sans', sans-serif",
                  }}
                >
                  {member.initials}
                </div>
              </div>

              {/* Content */}
              <div className="pt-12 px-6 pb-6">
                <h3
                  className="text-xl font-extrabold text-[#3D2B1F] mb-0.5"
                  style={{ fontFamily: "'Nunito Sans', sans-serif" }}
                >
                  {member.name}
                </h3>
                <div className="flex items-center gap-1.5 mb-4">
                  <GraduationCap className="w-3.5 h-3.5 text-[#C2703B] shrink-0" />
                  <p className="text-xs font-semibold text-[#C2703B] leading-snug">
                    {member.role}
                  </p>
                </div>
                <p className="text-sm text-[#8B6F47] leading-relaxed mb-5">
                  {member.bio}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {member.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="text-xs font-semibold rounded-full px-3 py-1 border"
                      style={{
                        color: member.color,
                        borderColor: `${member.color}30`,
                        backgroundColor: `${member.color}10`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 text-center flex items-center justify-center gap-2 text-[#8B6F47]"
        >
          <Heart className="w-4 h-4 text-[#C2703B]" />
          <p className="text-sm">
            A nossa equipa de assistentes dentárias garante que cada visita
            é tranquila e acolhedora.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
