"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, GraduationCap, Star } from "lucide-react";

const team = [
  {
    name: "Dr. André Marques",
    role: "Médico Dentista — Diretor Clínico",
    specialties: ["Implantologia Avançada", "Cirurgia Oral", "Reabilitação Total"],
    education: "Faculdade de Medicina Dentária, Universidade de Coimbra",
    experience: "12 anos de experiência",
    initials: "AM",
    color: "#2563EB",
    bio: "Especialista em implantologia e reabilitação oral complexa. Formação avançada em implantes imediatos e técnicas de regeneração óssea guiada.",
  },
  {
    name: "Dra. Beatriz Costa",
    role: "Médica Dentista — Ortodontia",
    specialties: ["Ortodontia Invisível", "Ortodontia Funcional", "Estética Dentária"],
    education: "Faculdade de Medicina, Universidade do Porto",
    experience: "9 anos de experiência",
    initials: "BC",
    color: "#06B6D4",
    bio: "Especialista em ortodontia com formação em sistemas de alinhadores invisíveis Invisalign e tratamentos ortopédicos em crianças e adultos.",
  },
  {
    name: "Dr. Ricardo Ferreira",
    role: "Médico Dentista — Endodontia",
    specialties: ["Endodontia Rotacional", "Tratamento de Canal", "Microscopia Clínica"],
    education: "Faculdade de Medicina Dentária, Universidade de Lisboa",
    experience: "8 anos de experiência",
    initials: "RF",
    color: "#2563EB",
    bio: "Endodontista com formação em microscopia operatória e sistemas de instrumentação mecanizada de última geração para maior precisão e conforto.",
  },
  {
    name: "Dra. Sofia Nunes",
    role: "Médica Dentista — Periodontia",
    specialties: ["Periodontia Cirúrgica", "Estética Gengival", "Manutenção Periodontal"],
    education: "Faculdade de Medicina Dentária, Universidade do Porto",
    experience: "7 anos de experiência",
    initials: "SN",
    color: "#06B6D4",
    bio: "Especialista em doenças periodontais e estética gengival. Formação em técnicas de regeneração tecidual guiada e tratamentos minimamente invasivos.",
  },
];

export default function Team() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="equipa" ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#111827]">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>
      <motion.div
        className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #2563EB 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-[#2563EB]/40 bg-[#2563EB]/10"
          >
            <Award className="w-4 h-4 text-[#2563EB]" />
            <span className="text-sm font-medium text-[#2563EB] font-[family-name:var(--font-inter-uc)]">
              A Nossa Equipa
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] text-white mb-4"
          >
            Especialistas dedicados
            <br />
            <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
              ao seu sorriso
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto font-[family-name:var(--font-inter-uc)]"
          >
            Uma equipa multidisciplinar com formação avançada e anos de experiência clínica.
            Comprometidos com a excelência e a constante atualização científica.
          </motion.p>
        </div>

        {/* Team grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-opacity-60 transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(ellipse at top, ${member.color}15 0%, transparent 60%)`,
                }}
              />

              {/* Top accent line */}
              <div
                className="h-0.5 w-full"
                style={{
                  background: `linear-gradient(90deg, ${member.color}, transparent)`,
                }}
              />

              <div className="relative z-10 p-6">
                {/* Avatar */}
                <div className="relative w-16 h-16 mb-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold font-[family-name:var(--font-space-grotesk)] text-white"
                    style={{
                      background: `linear-gradient(135deg, ${member.color}40, ${member.color}20)`,
                      border: `2px solid ${member.color}50`,
                    }}
                  >
                    {member.initials}
                  </div>
                  <div
                    className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-[#111827] flex items-center justify-center"
                    style={{ background: member.color }}
                  >
                    <Star className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>

                {/* Name & role */}
                <h3 className="text-white font-bold font-[family-name:var(--font-space-grotesk)] text-base leading-tight mb-1">
                  {member.name}
                </h3>
                <p
                  className="text-xs font-medium font-[family-name:var(--font-inter-uc)] mb-3 leading-tight"
                  style={{ color: member.color }}
                >
                  {member.role}
                </p>

                {/* Bio */}
                <p className="text-gray-500 text-xs font-[family-name:var(--font-inter-uc)] leading-relaxed mb-4">
                  {member.bio}
                </p>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {member.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="text-xs px-2 py-0.5 rounded-full font-[family-name:var(--font-inter-uc)]"
                      style={{
                        background: `${member.color}15`,
                        color: member.color,
                        border: `1px solid ${member.color}30`,
                      }}
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Education & experience */}
                <div className="space-y-2 pt-3 border-t border-white/10">
                  <div className="flex items-start gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-gray-500 shrink-0 mt-0.5" />
                    <p className="text-gray-500 text-xs font-[family-name:var(--font-inter-uc)] leading-tight">
                      {member.education}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                    <p className="text-gray-500 text-xs font-[family-name:var(--font-inter-uc)]">
                      {member.experience}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12 text-center p-8 rounded-3xl border border-[#2563EB]/20 bg-gradient-to-r from-[#2563EB]/10 to-[#06B6D4]/10"
        >
          <h3 className="text-white font-bold font-[family-name:var(--font-space-grotesk)] text-2xl mb-3">
            Toda a equipa ao seu dispor — 7 dias por semana
          </h3>
          <p className="text-gray-400 font-[family-name:var(--font-inter-uc)] mb-6 max-w-xl mx-auto">
            Os nossos especialistas estão disponíveis para si ao longo de toda a semana.
            Marque a sua consulta no dia que for mais conveniente.
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold font-[family-name:var(--font-space-grotesk)] text-white transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #2563EB, #06B6D4)" }}
          >
            Escolher o Meu Especialista
          </a>
        </motion.div>
      </div>
    </section>
  );
}
