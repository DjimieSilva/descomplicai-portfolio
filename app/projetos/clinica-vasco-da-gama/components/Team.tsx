"use client";

import { motion, type Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const team = [
  {
    name: "Dr. Rodrigo Vasconcelos",
    role: "Fundador & Director Clínico",
    specialty: "Implantologia · Reabilitação Oral",
    bio: "Licenciado pela Faculdade de Medicina Dentária da Universidade de Coimbra, com pós-graduação em Implantologia pela Universidade de Barcelona. Fundou a clínica em 2003 e é reconhecido como um dos especialistas de referência na região centro.",
    credentials: ["OMD nº 4821", "Pós-grad. Implantologia — UAB", "Membro ITI"],
    initial: "RV",
    color: "from-[#C8A55A] to-[#a87e3a]",
  },
  {
    name: "Dra. Ana Sofia Monteiro",
    role: "Especialista em Ortodontia",
    specialty: "Ortodontia · Oclusão",
    bio: "Especialista em Ortodontia pela Universidade do Porto, com formação avançada em sistemas de alinhadores invisíveis. Trata pacientes de todas as idades, com especial foco na ortodontia intercetiva em crianças e adultos.",
    credentials: ["OMD nº 7153", "Especialista Ortodontia — UP", "Cert. Invisalign Platinum"],
    initial: "AM",
    color: "from-[#1a3a5c] to-[#0A1628]",
  },
  {
    name: "Dr. Miguel Ferreira",
    role: "Médico Dentista & Esteta Facial",
    specialty: "Estética Dental · Botox · Fillers",
    bio: "Licenciado pela Universidade de Lisboa, com formação especializada em medicina estética facial. É o responsável pelos tratamentos de toxina botulínica e preenchimentos, combinando a expertise médica com um olhar artístico apurado.",
    credentials: ["OMD nº 9247", "Cert. Medicina Estética — ISML", "Formação Allergan"],
    initial: "MF",
    color: "from-[#2d4a6e] to-[#1a3050]",
  },
  {
    name: "Dra. Inês Carvalho",
    role: "Endodontia & Cirurgia Oral",
    specialty: "Endodontia · Cirurgia",
    bio: "Pós-graduada em Endodontia pela Faculdade de Medicina Dentária de Lisboa, utiliza sistemas rotativos de última geração e magnificação por microscópio para os casos mais complexos. Especialista em remoção de sisos e cirurgias pré-implantares.",
    credentials: ["OMD nº 8934", "Pós-grad. Endodontia — FMDUL", "Certificação SEDO"],
    initial: "IC",
    color: "from-[#3d5a3e] to-[#2a4030]",
  },
];

export function Team() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="equipa" ref={ref} className="bg-[#F5F0E8] py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl mb-16"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 text-[#C8A55A] text-xs tracking-[0.3em] uppercase font-semibold mb-4"
          >
            <span className="w-8 h-[1px] bg-[#C8A55A]" />
            A Nossa Equipa
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-serif text-4xl lg:text-5xl text-[#0A1628] leading-tight mb-6"
          >
            Especialistas dedicados{" "}
            <span className="text-[#C8A55A] italic">ao seu sorriso</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-[#0A1628]/65 text-lg leading-relaxed">
            A nossa equipa reúne dentistas com formação de excelência nas melhores universidades
            portuguesas e europeias, em constante actualização científica.
          </motion.p>
        </motion.div>

        {/* Team grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {team.map((member) => (
            <motion.div
              key={member.name}
              variants={fadeUp}
              className="group bg-white overflow-hidden hover:shadow-xl transition-all duration-500"
            >
              {/* Avatar */}
              <div className={`h-48 bg-gradient-to-br ${member.color} flex items-center justify-center relative overflow-hidden`}>
                <span className="font-serif text-5xl text-white/30 select-none">{member.initial}</span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                {/* Specialty badge */}
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="bg-white/15 backdrop-blur-sm text-white text-[10px] tracking-wider uppercase px-2 py-1 border border-white/20 inline-block">
                    {member.specialty}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-[#0A1628] font-bold text-xl mb-1">{member.name}</h3>
                <p className="text-[#C8A55A] text-xs font-semibold tracking-widest uppercase mb-4">
                  {member.role}
                </p>

                <p className="text-[#0A1628]/60 text-sm leading-relaxed mb-5">{member.bio}</p>

                {/* Credentials */}
                <div className="border-t border-[#0A1628]/10 pt-4 space-y-1.5">
                  {member.credentials.map((cred) => (
                    <div key={cred} className="flex items-center gap-2">
                      <GraduationCap size={12} className="text-[#C8A55A] shrink-0" />
                      <span className="text-[#0A1628]/50 text-xs">{cred}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-14 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-white border border-[#C8A55A]/30 px-6 py-3">
            <Award size={18} className="text-[#C8A55A]" />
            <span className="text-[#0A1628]/70 text-sm">
              Toda a nossa equipa é membro activo da Ordem dos Médicos Dentistas e actualiza os seus
              conhecimentos anualmente em congressos nacionais e internacionais.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
