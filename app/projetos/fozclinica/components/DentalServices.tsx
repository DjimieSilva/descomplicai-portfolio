"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Smile, Shield, Sparkles, Baby, Scissors, Eye } from "lucide-react";

const dentalAreas = [
  {
    icon: Shield,
    title: "Prevenção e Higiene",
    color: "#0D9488",
    services: [
      "Consulta de medicina dentária geral",
      "Higiene oral profissional",
      "Destartarização e polimento",
      "Aplicação de selantes de fissuras",
      "Radiografias periapicais e panorâmicas",
      "Aconselhamento nutricional oral",
    ],
  },
  {
    icon: Sparkles,
    title: "Estética Dentária",
    color: "#6366F1",
    services: [
      "Branqueamento dentário (laser e domiciliar)",
      "Facetas em cerâmica e composite",
      "Veneers ultra-finos",
      "Restaurações estéticas em composite",
      "Gengivoplastia e remodelação do sorriso",
      "Mock-up e design do sorriso digital",
    ],
  },
  {
    icon: Smile,
    title: "Implantologia e Próteses",
    color: "#FB7185",
    services: [
      "Implantes dentários de titânio",
      "Coroas sobre implante",
      "Reabilitação total com implantes",
      "Prótese fixa e removível",
      "Prótese sobre implante (overdenture)",
      "Regeneração óssea guiada",
    ],
  },
  {
    icon: Eye,
    title: "Ortodontia",
    color: "#F59E0B",
    services: [
      "Aparelho fixo metálico e estético",
      "Alinhadores transparentes (Invisalign®)",
      "Ortodontia interceptiva (crianças)",
      "Contenção fixa e removível",
      "Ortopedia funcional dos maxilares",
      "Ortodontia cirúrgica",
    ],
  },
  {
    icon: Baby,
    title: "Odontopediatria",
    color: "#10B981",
    services: [
      "Primeira consulta dentária infantil",
      "Dentição de leite — tratamento e extração",
      "Selantes de fissuras preventivos",
      "Fluoretos tópicos",
      "Consulta de hábitos deletérios",
      "Acompanhamento do crescimento facial",
    ],
  },
  {
    icon: Scissors,
    title: "Cirurgia Oral",
    color: "#8B5CF6",
    services: [
      "Extração de dentes do siso",
      "Cirurgia de dentes inclusos",
      "Apicectomia",
      "Frenectomia",
      "Biópsias orais",
      "Alveoloplastia pré-protética",
    ],
  },
];

export function DentalServices() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="dentaria" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center mx-auto mb-4">
            <Smile className="w-7 h-7 text-teal-600" />
          </div>
          <span className="inline-block bg-teal-50 text-teal-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-teal-200">
            Medicina Dentária
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-slate-800 mb-4"
            style={{ fontFamily: "var(--font-plus-jakarta-sans, sans-serif)" }}
          >
            O seu sorriso em boas mãos
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Da higiene de rotina à reabilitação oral completa — a nossa clínica dentária tem soluções para cada etapa da vida do seu sorriso.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dentalAreas.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${area.color}15` }}
              >
                <area.icon className="w-5 h-5" style={{ color: area.color }} />
              </div>
              <h3
                className="font-bold text-slate-800 mb-4 text-base"
                style={{ fontFamily: "var(--font-plus-jakarta-sans, sans-serif)" }}
              >
                {area.title}
              </h3>
              <ul className="space-y-2">
                {area.services.map((service) => (
                  <li key={service} className="flex items-start gap-2 text-sm text-slate-500">
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: area.color }}
                    />
                    {service}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-block bg-teal-50 border border-teal-200 rounded-2xl px-8 py-6">
            <p className="text-teal-800 font-semibold mb-2">Tem dúvidas sobre algum tratamento?</p>
            <p className="text-teal-600 text-sm mb-4">A nossa equipa esclarece todas as suas questões antes de qualquer procedimento.</p>
            <a
              href="https://wa.me/351918338954?text=Olá%2C%20tenho%20dúvidas%20sobre%20tratamento%20dentário."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
            >
              Falar com a nossa equipa
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
