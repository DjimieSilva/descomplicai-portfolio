"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Smile, Footprints, Brain, Activity, ChevronRight } from "lucide-react";

const specialties = [
  {
    id: "dentaria",
    icon: Smile,
    label: "Medicina Dentária",
    color: "#0D9488",
    bgColor: "#CCFBF1",
    tagline: "Um sorriso saudável para toda a vida",
    description:
      "A nossa equipa de medicina dentária oferece cuidados completos para todas as idades — desde a primeira consulta infantil até ao implante ou tratamento estético mais complexo. Utilizamos tecnologia de diagnóstico avançada e materiais de alta qualidade.",
    services: [
      "Consulta de medicina dentária geral",
      "Higiene oral e destartarização",
      "Dentisteria (obturações e restaurações)",
      "Endodontia (tratamento de canais)",
      "Implantologia e reabilitação oral",
      "Ortodontia (aparelhos fixos e alinhadores)",
      "Próteses dentárias fixas e removíveis",
      "Branqueamento dentário",
      "Cirurgia oral (extração de sisos)",
      "Odontopediatria (crianças)",
      "Periodontologia (tratamento das gengivas)",
      "Estética dentária (facetas e veneers)",
    ],
  },
  {
    id: "podologia",
    icon: Footprints,
    label: "Podologia",
    color: "#6366F1",
    bgColor: "#EEF2FF",
    tagline: "Cuide dos seus pés, cuide da sua saúde",
    description:
      "Os pés são a base de tudo. O nosso podologista avalia, diagnostica e trata alterações do pé e do tornozelo, desde as mais simples às mais complexas, com uma abordagem preventiva e terapêutica integrada.",
    services: [
      "Consulta de podologia geral",
      "Tratamento de calos e calosidades",
      "Tratamento de unhas encravadas",
      "Pé diabético — prevenção e tratamento",
      "Ortopodologia e palmilhas personalizadas",
      "Verrucas plantares",
      "Micose das unhas (onicomicose)",
      "Avaliação biomecânica da marcha",
      "Patologias desportivas do pé",
      "Fascite plantar e esporão calcâneo",
      "Cuidados geriátricos do pé",
      "Quiropodologia e cuidados gerais",
    ],
  },
  {
    id: "psicologia",
    icon: Brain,
    label: "Psicologia",
    color: "#F59E0B",
    bgColor: "#FFFBEB",
    tagline: "A sua mente merece o mesmo cuidado",
    description:
      "O acompanhamento psicológico é uma área essencial do bem-estar integral. Os nossos psicólogos trabalham com adultos, jovens e crianças, oferecendo um espaço seguro e confidencial para o desenvolvimento pessoal e tratamento de perturbações.",
    services: [
      "Avaliação e diagnóstico psicológico",
      "Psicoterapia individual (adultos e adolescentes)",
      "Psicologia infantil e consulta de desenvolvimento",
      "Terapia cognitivo-comportamental (TCC)",
      "Apoio em ansiedade e ataques de pânico",
      "Tratamento de depressão",
      "Perturbação obsessivo-compulsiva (POC)",
      "Dificuldades de aprendizagem e PHDA",
      "Aconselhamento e gestão de stress",
      "Apoio em luto e crises de vida",
      "Psicologia forense e relatórios periciais",
      "Orientação vocacional e profissional",
    ],
  },
  {
    id: "reabilitacao",
    icon: Activity,
    label: "Reabilitação Física",
    color: "#FB7185",
    bgColor: "#FFF1F2",
    tagline: "Recupere o seu movimento, retome a sua vida",
    description:
      "A nossa equipa de reabilitação física e fisioterapia trata lesões agudas e crónicas, prepara atletas e acompanha processos de recuperação pós-cirúrgica. O objetivo é devolver a mobilidade, reduzir a dor e prevenir recidivas.",
    services: [
      "Avaliação funcional e biomecânica",
      "Fisioterapia músculo-esquelética",
      "Reabilitação pós-operatória",
      "Tratamento de lombalgias e cervicalgias",
      "Lesões desportivas",
      "Electroterapia (TENS, ultrassom, laser)",
      "Terapia manual e mobilização articular",
      "Drenagem linfática manual",
      "Reabilitação neurológica",
      "Osteoporose e prevenção de quedas",
      "Hidroterapia e exercício terapêutico",
      "Pilates clínico e reabilitação ativa",
    ],
  },
];

export function Specialties() {
  const [active, setActive] = useState(specialties[0].id);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const current = specialties.find((s) => s.id === active)!;

  return (
    <section id="especialidades" className="py-24 bg-slate-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-teal-50 text-teal-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-teal-200">
            As nossas especialidades
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-slate-800 mb-4"
            style={{ fontFamily: "var(--font-plus-jakarta-sans, sans-serif)" }}
          >
            Saúde a 360°
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Quatro especialidades complementares num só espaço, para cuidar de si de forma integral e eficiente.
          </p>
        </motion.div>

        {/* Tab buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {specialties.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold border transition-all duration-300 ${
                active === s.id
                  ? "text-white shadow-lg"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
              style={
                active === s.id
                  ? { backgroundColor: s.color, borderColor: s.color }
                  : {}
              }
            >
              <s.icon className="w-4 h-4" />
              {s.label}
            </button>
          ))}
        </motion.div>

        {/* Active specialty panel */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-8"
        >
          {/* Left info */}
          <div className="lg:col-span-2 flex flex-col justify-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
              style={{ backgroundColor: current.bgColor }}
            >
              <current.icon className="w-8 h-8" style={{ color: current.color }} />
            </div>
            <h3
              className="text-2xl md:text-3xl font-bold text-slate-800 mb-3"
              style={{ fontFamily: "var(--font-plus-jakarta-sans, sans-serif)" }}
            >
              {current.label}
            </h3>
            <p className="text-base font-semibold mb-4" style={{ color: current.color }}>
              "{current.tagline}"
            </p>
            <p className="text-slate-500 leading-relaxed mb-8 text-sm">
              {current.description}
            </p>
            <a
              href={`https://wa.me/351918338954?text=Olá%2C%20gostaria%20de%20marcar%20uma%20consulta%20de%20${encodeURIComponent(current.label)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-full text-sm transition-all hover:shadow-lg hover:-translate-y-0.5 w-fit"
              style={{ backgroundColor: current.color }}
            >
              Marcar Consulta
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Right services list */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
              <h4
                className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6"
              >
                Serviços disponíveis
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {current.services.map((service, i) => (
                  <motion.div
                    key={service}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                  >
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: current.color }}
                    />
                    <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">
                      {service}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
