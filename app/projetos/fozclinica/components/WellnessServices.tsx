"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Footprints, Brain, Activity, ChevronRight } from "lucide-react";

const wellnessAreas = [
  {
    id: "podologia",
    icon: Footprints,
    title: "Podologia",
    tagline: "Cuide dos seus pés, cuide da sua mobilidade",
    color: "#6366F1",
    bgColor: "#EEF2FF",
    description:
      "A podologia é a especialidade médica dedicada ao diagnóstico, tratamento e prevenção das patologias do pé. Uma abordagem preventiva pode evitar complicações sérias, especialmente em doentes diabéticos e idosos.",
    services: [
      {
        name: "Quiropodologia",
        desc: "Tratamento de calos, calosidades e hiperqueratoses",
      },
      {
        name: "Onicocriptose",
        desc: "Tratamento conservador e cirúrgico de unhas encravadas",
      },
      {
        name: "Pé diabético",
        desc: "Vigilância, prevenção e tratamento de lesões no pé diabético",
      },
      {
        name: "Ortopodologia",
        desc: "Palmilhas personalizadas para correção biomecânica",
      },
      {
        name: "Patologia ungueal",
        desc: "Onicomicose, onicogrifose e outras alterações das unhas",
      },
      {
        name: "Biomecânica",
        desc: "Avaliação da marcha e análise postural",
      },
    ],
  },
  {
    id: "psicologia",
    icon: Brain,
    title: "Psicologia",
    tagline: "A sua mente merece atenção especializada",
    color: "#F59E0B",
    bgColor: "#FFFBEB",
    description:
      "A saúde mental é parte inseparável do bem-estar. Os nossos psicólogos clínicos trabalham com rigor científico e empatia, criando um espaço seguro para explorar, compreender e transformar os desafios emocionais e comportamentais.",
    services: [
      {
        name: "Avaliação psicológica",
        desc: "Diagnóstico e elaboração de relatórios psicológicos",
      },
      {
        name: "Psicoterapia individual",
        desc: "Acompanhamento regular para adultos e adolescentes",
      },
      {
        name: "Psicologia infantil",
        desc: "Dificuldades de aprendizagem, PHDA e comportamento",
      },
      {
        name: "Ansiedade e depressão",
        desc: "Terapia cognitivo-comportamental baseada em evidência",
      },
      {
        name: "Gestão de stress",
        desc: "Técnicas de mindfulness e regulação emocional",
      },
      {
        name: "Apoio em crises",
        desc: "Luto, trauma, separações e transições de vida",
      },
    ],
  },
  {
    id: "reabilitacao",
    icon: Activity,
    title: "Reabilitação Física",
    tagline: "Recupere o movimento, viva melhor",
    color: "#FB7185",
    bgColor: "#FFF1F2",
    description:
      "A fisioterapia e reabilitação física tratam as disfunções do movimento humano. A nossa equipa utiliza técnicas manuais, eletroterapia e exercício terapêutico para reduzir a dor, recuperar a função e prevenir novas lesões.",
    services: [
      {
        name: "Fisioterapia músculo-esquelética",
        desc: "Lombalgia, cervicalgia, tendinites e dores articulares",
      },
      {
        name: "Reabilitação pós-cirúrgica",
        desc: "Joelho, ombro, coluna e outras cirurgias ortopédicas",
      },
      {
        name: "Fisioterapia desportiva",
        desc: "Tratamento e prevenção de lesões em atletas",
      },
      {
        name: "Terapia manual",
        desc: "Mobilização articular, manipulação e técnicas de tecidos moles",
      },
      {
        name: "Electroterapia",
        desc: "TENS, ultrassom terapêutico, laser e ondas de choque",
      },
      {
        name: "Pilates clínico",
        desc: "Exercício terapêutico orientado e personalizado",
      },
    ],
  },
];

export function WellnessServices() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="bem-estar" className="py-24 bg-slate-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-teal-50 text-teal-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-teal-200">
            Bem-estar integral
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-slate-800 mb-4"
            style={{ fontFamily: "var(--font-plus-jakarta-sans, sans-serif)" }}
          >
            Saúde do corpo e da mente
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            As nossas especialidades de bem-estar complementam a medicina dentária para uma abordagem verdadeiramente holística da saúde.
          </p>
        </motion.div>

        <div className="space-y-12">
          {wellnessAreas.map((area, idx) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-5 ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                {/* Left: info */}
                <div
                  className="lg:col-span-2 p-8 md:p-10 flex flex-col justify-center"
                  style={{ backgroundColor: area.bgColor }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white/70 shadow-sm"
                  >
                    <area.icon className="w-7 h-7" style={{ color: area.color }} />
                  </div>
                  <h3
                    className="text-2xl font-bold text-slate-800 mb-2"
                    style={{ fontFamily: "var(--font-plus-jakarta-sans, sans-serif)" }}
                  >
                    {area.title}
                  </h3>
                  <p className="text-sm font-semibold mb-4" style={{ color: area.color }}>
                    {area.tagline}
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{area.description}</p>
                  <a
                    href={`https://wa.me/351918338954?text=Olá%2C%20gostaria%20de%20marcar%20uma%20consulta%20de%20${encodeURIComponent(area.title)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-all hover:shadow-lg hover:-translate-y-0.5 w-fit"
                    style={{ backgroundColor: area.color }}
                  >
                    Marcar Consulta
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Right: services grid */}
                <div className="lg:col-span-3 p-8 md:p-10">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">
                    Tratamentos e serviços
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {area.services.map((service) => (
                      <div
                        key={service.name}
                        className="group p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all"
                      >
                        <div className="flex items-start gap-2.5">
                          <div
                            className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                            style={{ backgroundColor: area.color }}
                          />
                          <div>
                            <p className="text-sm font-semibold text-slate-700 mb-0.5">{service.name}</p>
                            <p className="text-xs text-slate-400 leading-relaxed">{service.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
