"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Smile, Footprints, Brain, Activity } from "lucide-react";

const team = [
  {
    name: "Dr.ª Ana Rodrigues",
    role: "Médica Dentista",
    specialty: "Medicina Dentária",
    specialtyId: "dentaria",
    color: "#0D9488",
    bgColor: "#CCFBF1",
    icon: Smile,
    credential: "Cédula OMD · N.º 12345",
    bio: "Especializada em reabilitação oral e estética dentária, com formação avançada em implantologia. Mais de 10 anos a transformar sorrisos na Figueira da Foz.",
    initials: "AR",
  },
  {
    name: "Dr. Tiago Ferreira",
    role: "Médico Dentista",
    specialty: "Medicina Dentária",
    specialtyId: "dentaria",
    color: "#0D9488",
    bgColor: "#CCFBF1",
    icon: Smile,
    credential: "Cédula OMD · N.º 23456",
    bio: "Com especialização em ortodontia e odontopediatria, acompanha famílias inteiras — desde os primeiros dentinhos até ao sorriso adulto perfeito.",
    initials: "TF",
  },
  {
    name: "Dr.ª Catarina Sousa",
    role: "Podologista",
    specialty: "Podologia",
    specialtyId: "podologia",
    color: "#6366F1",
    bgColor: "#EEF2FF",
    icon: Footprints,
    credential: "Licenciada em Podologia · ULSF",
    bio: "Especialista em biomecânica do pé e pé diabético. Dedica-se à avaliação funcional e à criação de palmilhas personalizadas para cada doente.",
    initials: "CS",
  },
  {
    name: "Dr. Paulo Mendes",
    role: "Psicólogo Clínico",
    specialty: "Psicologia",
    specialtyId: "psicologia",
    color: "#F59E0B",
    bgColor: "#FFFBEB",
    icon: Brain,
    credential: "Cédula OPP · N.º 56789",
    bio: "Psicólogo clínico e psicoterapeuta com abordagem cognitivo-comportamental. Especializado em ansiedade, depressão e psicologia infantil.",
    initials: "PM",
  },
  {
    name: "Dr.ª Inês Carvalho",
    role: "Fisioterapeuta",
    specialty: "Reabilitação Física",
    specialtyId: "reabilitacao",
    color: "#FB7185",
    bgColor: "#FFF1F2",
    icon: Activity,
    credential: "Licenciada em Fisioterapia · ESTESC",
    bio: "Fisioterapeuta com especialização em ortopedia e fisioterapia desportiva. Trabalha com atletas e população geral para recuperação funcional eficaz.",
    initials: "IC",
  },
  {
    name: "Dr. Rui Lopes",
    role: "Fisioterapeuta",
    specialty: "Reabilitação Física",
    specialtyId: "reabilitacao",
    color: "#FB7185",
    bgColor: "#FFF1F2",
    icon: Activity,
    credential: "Licenciado em Fisioterapia · UC",
    bio: "Especializado em reabilitação neurológica e pilates clínico. Desenvolve programas de exercício terapêutico personalizados para cada doente.",
    initials: "RL",
  },
];

export function Team() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="equipa" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-teal-50 text-teal-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-teal-200">
            A nossa equipa
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-slate-800 mb-4"
            style={{ fontFamily: "var(--font-plus-jakarta-sans, sans-serif)" }}
          >
            Profissionais dedicados à sua saúde
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            A nossa equipa multidisciplinar é formada por profissionais de saúde certificados, em constante formação e comprometidos com o seu bem-estar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Avatar */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold flex-shrink-0"
                  style={{ backgroundColor: member.bgColor, color: member.color, fontFamily: "var(--font-plus-jakarta-sans, sans-serif)" }}
                >
                  {member.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className="font-bold text-slate-800 text-base truncate"
                    style={{ fontFamily: "var(--font-plus-jakarta-sans, sans-serif)" }}
                  >
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium" style={{ color: member.color }}>
                    {member.role}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{member.credential}</p>
                </div>
              </div>

              {/* Specialty badge */}
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4"
                style={{ backgroundColor: member.bgColor, color: member.color }}
              >
                <member.icon className="w-3 h-3" />
                {member.specialty}
              </div>

              {/* Bio */}
              <p className="text-sm text-slate-500 leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>

        {/* Join the team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-block bg-slate-50 border border-slate-200 rounded-2xl px-8 py-6 max-w-lg">
            <p className="text-slate-700 font-semibold mb-1">Quer integrar a nossa equipa?</p>
            <p className="text-slate-500 text-sm mb-4">Estamos sempre à procura de profissionais de saúde comprometidos e apaixonados pela sua área.</p>
            <a
              href="mailto:info@fozclinica.pt"
              className="inline-flex items-center gap-2 text-teal-700 font-semibold text-sm hover:text-teal-600 transition-colors"
            >
              Envie o seu currículo →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
