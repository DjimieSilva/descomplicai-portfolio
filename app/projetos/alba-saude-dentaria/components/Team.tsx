"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";

const doctors = [
  {
    name: "Dra. Ana Luísa Ferreira",
    role: "Directora Clínica",
    specialty: "Implantologia e Cirurgia Oral",
    credentials: ["OMD 23456", "Mestre em Implantologia — Universidade de Coimbra", "Formação em Implantologia Avançada — Barcelona"],
    experience: "18 anos",
    focus: "Especialista em reabilitação oral complexa e cirurgia implantológica. Responsável pela supervisão clínica geral e pelos protocolos de qualidade da Alba Saúde Dentária.",
  },
  {
    name: "Dr. Pedro Nunes",
    role: "Médico Dentista",
    specialty: "Cirurgia Oral e Bloco Operatório",
    credentials: ["OMD 31204", "Especialista em Cirurgia Oral", "Formação em Sedação Consciente — Lisboa"],
    experience: "14 anos",
    focus: "Responsável pelas intervenções cirúrgicas de maior complexidade, incluindo cirurgia de bloco operatório, extracções de sisos e ressecções apicais.",
  },
  {
    name: "Dra. Sofia Rodrigues",
    role: "Médica Dentista",
    specialty: "Ortodontia e Ortopedia Dentofacial",
    credentials: ["OMD 28891", "Pós-graduação em Ortodontia — FMUP", "Certificação em Alinhadores Invisíveis"],
    experience: "11 anos",
    focus: "Tratamento ortodôntico de crianças e adultos. Especialista em aparelhos fixos, funcionais e sistemas de alinhadores transparentes.",
  },
  {
    name: "Dr. João Cardoso",
    role: "Médico Dentista",
    specialty: "Periodontologia e Saúde Gengival",
    credentials: ["OMD 34567", "Mestre em Periodontologia — UCP", "Formação em Regeneração Óssea Guiada"],
    experience: "10 anos",
    focus: "Diagnóstico e tratamento especializado da doença periodontal, cirurgia gengival estética e regeneração de tecidos de suporte dentário.",
  },
  {
    name: "Dra. Inês Marques",
    role: "Médica Dentista",
    specialty: "Odontopediatria e Prevenção",
    credentials: ["OMD 40123", "Especialista em Odontopediatria — Universidade de Lisboa", "Formação em Pediatria Comportamental"],
    experience: "8 anos",
    focus: "Cuidados dentários especializados para bebés, crianças e adolescentes. Ambiente clínico adaptado para minimizar a ansiedade e promover hábitos saudáveis.",
  },
  {
    name: "Dr. Rui Almeida",
    role: "Médico Dentista",
    specialty: "Estética Dentária e Reabilitação",
    credentials: ["OMD 37890", "Pós-graduação em Estética Dentária — CESPU", "Certificado em Design Digital do Sorriso"],
    experience: "9 anos",
    focus: "Transformação estética do sorriso com tecnologia digital. Especialista em facetas, mock-up digital, branqueamento profissional e reabilitação estético-funcional.",
  },
];

export function Team() {
  return (
    <section id="equipa" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-[#B8860B] text-xs tracking-[0.3em] uppercase font-semibold mb-3">
            Os Nossos Clínicos
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="text-[#1E3A5F] font-bold text-4xl lg:text-5xl leading-tight"
              style={{ fontFamily: "Epilogue, sans-serif" }}
            >
              Uma Equipa de
              <br />
              6+ Especialistas
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed max-w-md">
              Cada médico da nossa equipa possui formação pós-graduada na sua área de especialização. Juntos, cobrem todas as valências da medicina dentária moderna.
            </p>
          </div>
          <div className="mt-8 h-px bg-gradient-to-r from-[#B8860B]/50 via-[#B8860B]/15 to-transparent" />
        </motion.div>

        {/* Doctors grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, i) => (
            <motion.div
              key={doctor.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.12 }}
              className="group border border-[#E2E8F0] hover:border-[#1E3A5F]/25 hover:shadow-xl hover:shadow-[#1E3A5F]/5 transition-all duration-400 bg-white"
            >
              {/* Doctor header */}
              <div className="bg-gradient-to-br from-[#1E3A5F] to-[#162d4a] p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#B8860B] to-transparent" />
                <div
                  className="absolute -right-4 -top-4 w-24 h-24 rounded-full border border-[#94A3B8]/10 opacity-30"
                />
                <div
                  className="absolute -right-8 -top-8 w-32 h-32 rounded-full border border-[#B8860B]/10 opacity-20"
                />

                {/* Avatar placeholder */}
                <div className="w-16 h-16 rounded-full bg-[#B8860B]/20 border-2 border-[#B8860B]/40 flex items-center justify-center mb-4">
                  <span
                    className="text-[#B8860B] font-bold text-lg"
                    style={{ fontFamily: "Epilogue, sans-serif" }}
                  >
                    {doctor.name.split(" ").slice(1, 2)[0]?.[0] ?? "D"}
                    {doctor.name.split(" ").slice(-1)[0]?.[0] ?? ""}
                  </span>
                </div>

                <h3
                  className="text-white font-bold text-lg leading-snug"
                  style={{ fontFamily: "Epilogue, sans-serif" }}
                >
                  {doctor.name}
                </h3>
                <p className="text-[#B8860B] text-xs tracking-wide font-semibold mt-1">{doctor.role}</p>
                <p className="text-white/55 text-xs mt-0.5">{doctor.specialty}</p>
              </div>

              {/* Doctor body */}
              <div className="p-6">
                <p className="text-[#94A3B8] text-sm leading-relaxed mb-5">
                  {doctor.focus}
                </p>

                {/* Experience tag */}
                <div className="flex items-center gap-2 mb-4">
                  <Award size={14} className="text-[#B8860B]" />
                  <span className="text-[#1E3A5F] text-xs font-semibold">{doctor.experience} de experiência</span>
                </div>

                {/* Credentials */}
                <div className="space-y-1.5">
                  {doctor.credentials.map((cred) => (
                    <div key={cred} className="flex items-start gap-2">
                      <GraduationCap size={12} className="text-[#94A3B8] mt-0.5 flex-shrink-0" />
                      <span className="text-[#94A3B8] text-xs">{cred}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-[#94A3B8] text-sm max-w-2xl mx-auto">
            A nossa equipa é complementada por assistentes dentários certificados, higienistas orais e pessoal administrativo especializado em gestão clínica e apoio ao paciente.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
