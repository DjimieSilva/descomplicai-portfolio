"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award, User } from "lucide-react";

const team = [
  {
    name: "Dr. Paulo Mendes",
    role: "Diretor Clínico — Especialista em Implantologia",
    credentials: [
      "Licenciatura em Medicina Dentária pela Universidade de Coimbra",
      "Mestrado em Implantologia Oral — Universidade de Barcelona",
      "Membro da Sociedade Portuguesa de Implantologia",
      "Formação avançada em Implantologia Guiada Digital",
    ],
    bio: "Com mais de 15 anos dedicados à implantologia, o Dr. Paulo Mendes é reconhecido na região Centro pela sua abordagem meticulosa e resultados clínicos consistentes. Formação complementar em carga imediata e regeneração óssea guiada.",
    specialties: ["Implantologia Guiada", "All-on-4/6", "Regeneração Óssea"],
  },
  {
    name: "Dra. Inês Figueiredo",
    role: "Médica Dentista — Reabilitação Oral e Estética",
    credentials: [
      "Licenciatura em Medicina Dentária pela Faculdade de Medicina Dentária do Porto",
      "Formação em Reabilitação Oral Estética — Madrid",
      "Curso avançado em Design Digital do Sorriso",
      "Membro da Ordem dos Médicos Dentistas",
    ],
    bio: "A Dra. Inês é responsável pela reabilitação protética e estética dentária, trabalhando em estreita colaboração com o Dr. Paulo para garantir resultados funcionais e estéticos de excelência em cada caso.",
    specialties: ["Prótese sobre Implantes", "Facetas Cerâmicas", "Design do Sorriso"],
  },
  {
    name: "Filipa Rodrigues",
    role: "Higienista Oral — Especialista em Manutenção Peri-implantar",
    credentials: [
      "Licenciatura em Higiene Oral pela ESTSP",
      "Formação especializada em manutenção de implantes",
      "Curso de motivação e instrução de higiene oral",
    ],
    bio: "A Filipa assegura o acompanhamento de todos os pacientes com implantes, realizando manutenções periódicas especializadas e educação para a saúde oral, fundamentais para a longevidade dos tratamentos.",
    specialties: ["Higiene Peri-implantar", "Destartarização", "Educação para a Saúde"],
  },
];

export default function Team() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="equipa" ref={ref} className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-[#1E40AF] text-sm font-semibold uppercase tracking-widest mb-4"
          >
            A Nossa Equipa
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-[#111827] font-[family-name:var(--font-sora)] mb-4"
          >
            Especialistas ao
            <br />
            <span className="text-[#1E40AF]">Seu Serviço</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#374151] text-lg max-w-2xl mx-auto"
          >
            Uma equipa clínica coesa, com formação avançada e foco total em proporcionar
            os melhores resultados em implantologia e reabilitação oral.
          </motion.p>
        </div>

        {/* Team grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              className="bg-[#F8FAFF] border border-[#E5E7EB] rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Photo placeholder */}
              <div className="h-48 bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex items-center justify-center relative">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-white/70" />
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold text-lg font-[family-name:var(--font-sora)] leading-tight">{member.name}</p>
                  <p className="text-[#BFDBFE] text-xs leading-tight">{member.role.split(" — ")[0]}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-[#1E40AF] text-xs font-semibold uppercase tracking-wider mb-1">
                  {member.role.split(" — ")[1]}
                </p>
                <p className="text-[#374151] text-sm leading-relaxed mb-5">
                  {member.bio}
                </p>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {member.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="bg-[#DBEAFE] text-[#1E40AF] text-xs font-medium px-2.5 py-1 rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Credentials */}
                <div className="border-t border-[#E5E7EB] pt-4">
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-[#374151] mb-3">
                    <GraduationCap className="w-3.5 h-3.5 text-[#1E40AF]" />
                    Formação
                  </p>
                  <ul className="space-y-1.5">
                    {member.credentials.slice(0, 3).map((cred) => (
                      <li key={cred} className="flex items-start gap-2 text-xs text-[#6B7280]">
                        <Award className="w-3 h-3 text-[#9CA3AF] flex-shrink-0 mt-0.5" />
                        {cred}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* OMD note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 text-center bg-[#F8FAFF] border border-[#DBEAFE] rounded-xl p-6"
        >
          <p className="text-[#374151] text-sm">
            <span className="font-semibold text-[#1E40AF]">Todos os médicos dentistas são membros da Ordem dos Médicos Dentistas (OMD)</span>
            {" "}— garantia de formação, ética e qualidade clínica regulada em Portugal.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
