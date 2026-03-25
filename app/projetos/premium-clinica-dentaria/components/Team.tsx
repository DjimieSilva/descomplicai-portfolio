"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { Users, GraduationCap, Award } from "lucide-react";

const team = [
  {
    name: "Dra. Sofia Martins",
    role: "Directora Clínica · Medicina Dentária",
    specialty: "Endodontia e Dentisteria Estética",
    bio: "Licenciada pela Faculdade de Medicina Dentária da Universidade de Coimbra, com pós-graduação em Endodontia. Mais de 15 anos de experiência clínica e uma paixão genuína pela prevenção.",
    initials: "SM",
    color: "bg-[#064E3B]",
    credentials: ["FMDUP", "Pós-Graduação Endodontia", "Membro da OMD"],
  },
  {
    name: "Dr. Rui Fonseca",
    role: "Médico Dentista",
    specialty: "Implantologia e Cirurgia Oral",
    bio: "Especialista em implantologia oral com formação avançada em Espanha e Itália. Realiza desde implantes unitários a reabilitações totais com planeamento digital.",
    initials: "RF",
    color: "bg-[#6B8F71]",
    credentials: ["FMDUP", "MBA Gestão Saúde", "Cursos ITI"],
  },
  {
    name: "Dra. Ana Carvalho",
    role: "Médica Dentista",
    specialty: "Ortodontia e Odontopediatria",
    bio: "Dedicada às crianças e ao alinhamento dentário desde sempre. Criou o protocolo de consultas pediátricas sem stresse que é hoje o orgulho da clínica.",
    initials: "AC",
    color: "bg-[#D1FAE5]",
    textColor: "text-[#064E3B]",
    credentials: ["FMDUL", "Pós-Graduação Ortodontia", "Formação Invisalign"],
  },
  {
    name: "Dra. Margarida Sousa",
    role: "Higienista Oral",
    specialty: "Prevenção e Periodontologia",
    bio: "Coração e alma do nosso programa de prevenção. Com uma abordagem empática e educativa, transforma cada consulta de higiene numa experiência positiva.",
    initials: "MS",
    color: "bg-[#FEFCE8]",
    textColor: "text-[#064E3B]",
    credentials: ["Escola Superior de Saúde", "Formação Periodontologia", "Instrutora de Higiene"],
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function Team() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="equipa"
      ref={ref}
      className="py-24 md:py-32 bg-[#FEFCE8]"
      aria-labelledby="team-heading"
    >
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#D1FAE5] rounded-full px-4 py-1.5 mb-6">
            <Users className="w-3.5 h-3.5 text-[#064E3B]" />
            <span className="text-xs font-semibold text-[#064E3B] uppercase tracking-wider">
              A Nossa Equipa
            </span>
          </div>
          <h2
            id="team-heading"
            className="text-3xl md:text-5xl font-bold text-[#064E3B] leading-tight mb-4"
            style={{ fontFamily: "var(--font-sora), sans-serif" }}
          >
            Pessoas que cuidam{" "}
            <span className="text-[#6B8F71]">com dedicação</span>
          </h2>
          <p className="text-lg text-[#064E3B]/60 leading-relaxed">
            A nossa equipa combina experiência técnica com empatia genuína. Aqui não é apenas um dentista — é uma relação de confiança que se constrói ao longo dos anos.
          </p>
        </motion.div>

        {/* Team grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {team.map((member) => (
            <motion.div
              key={member.name}
              variants={cardVariants}
              className="group"
            >
              <div className="bg-white rounded-3xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Avatar area */}
                <div className={`${member.color} h-40 flex items-end justify-start p-6 relative overflow-hidden`}>
                  <div className="absolute top-4 right-4 opacity-20">
                    <div className="w-16 h-16 rounded-full border-2 border-current" />
                  </div>
                  <div className={`text-4xl font-bold ${member.textColor || "text-white"} font-[family-name:var(--font-sora)]`}>
                    {member.initials}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-base font-bold text-[#064E3B] mb-0.5" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
                    {member.name}
                  </h3>
                  <p className="text-xs text-[#6B8F71] font-medium mb-1">{member.role}</p>
                  <div className="inline-block bg-[#D1FAE5] text-[#064E3B] text-xs font-semibold px-2.5 py-1 rounded-full mb-4">
                    {member.specialty}
                  </div>
                  <p className="text-sm text-[#064E3B]/60 leading-relaxed mb-4">
                    {member.bio}
                  </p>

                  {/* Credentials */}
                  <div className="border-t border-[#D1FAE5] pt-4">
                    <div className="flex items-center gap-1.5 mb-2">
                      <GraduationCap className="w-3.5 h-3.5 text-[#6B8F71]" />
                      <span className="text-xs font-semibold text-[#064E3B]/60 uppercase tracking-wide">Formação</span>
                    </div>
                    <ul className="space-y-1">
                      {member.credentials.map((cred) => (
                        <li key={cred} className="flex items-center gap-1.5 text-xs text-[#064E3B]/55">
                          <Award className="w-3 h-3 text-[#6B8F71] flex-shrink-0" />
                          {cred}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="text-center text-sm text-[#064E3B]/50 mt-10"
        >
          Toda a equipa é membro activo da Ordem dos Médicos Dentistas e mantém formação contínua certificada.
        </motion.p>
      </div>
    </section>
  );
}
