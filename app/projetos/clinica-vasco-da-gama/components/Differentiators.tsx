"use client";

import { motion, type Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FlaskConical, Sparkles, ScanLine, Heart, Clock, Shield } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export function Differentiators() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#0A1628] py-28 lg:py-36 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C8A55A]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C8A55A]/30 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#C8A55A]/20 to-transparent" />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle, #C8A55A 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: main differentiator — Lab próprio */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 text-[#C8A55A] text-xs tracking-[0.3em] uppercase font-semibold mb-6"
            >
              <span className="w-8 h-[1px] bg-[#C8A55A]" />
              O Que Nos Distingue
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="font-serif text-4xl lg:text-5xl text-white leading-tight mb-6"
            >
              Laboratório próprio —{" "}
              <span className="text-[#C8A55A] italic">uma vantagem única</span>{" "}
              na região
            </motion.h2>

            <motion.div variants={fadeUp} className="w-16 h-[2px] bg-[#C8A55A] mb-8" />

            <motion.p variants={fadeUp} className="text-white/65 text-lg leading-relaxed mb-6">
              A Clínica Vasco da Gama é uma das poucas clínicas na região centro com laboratório de
              próteses integrado. Esta característica, rara no sector, transforma por completo a
              experiência do paciente — e os resultados clínicos.
            </motion.p>

            <motion.div variants={stagger} className="space-y-4 mt-8">
              {[
                {
                  icon: Clock,
                  title: "Prazos até 40% mais curtos",
                  desc: "Sem dependência de laboratórios externos. As suas próteses ficam prontas em tempo recorde.",
                },
                {
                  icon: Shield,
                  title: "Controlo de qualidade total",
                  desc: "O médico e o técnico de prótese trabalham em sintonia, garantindo ajuste e estética perfeitos.",
                },
                {
                  icon: Heart,
                  title: "Ajustes imediatos",
                  desc: "Qualquer ajuste é feito na hora, sem enviar a prótese de volta ao laboratório e sem esperas.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    className="flex gap-4 p-4 border border-white/8 hover:border-[#C8A55A]/30 transition-colors group"
                  >
                    <div className="w-10 h-10 shrink-0 bg-[#C8A55A]/10 group-hover:bg-[#C8A55A]/20 flex items-center justify-center transition-colors">
                      <Icon size={18} className="text-[#C8A55A]" />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm mb-1">{item.title}</div>
                      <div className="text-white/50 text-sm leading-relaxed">{item.desc}</div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right: other differentiators */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            {[
              {
                icon: FlaskConical,
                number: "01",
                title: "Laboratório de Próteses In-House",
                desc: "Técnico de prótese dedicado a tempo inteiro, equipado com sistema CAD/CAM e fresadora de última geração para coroas de cerâmica e zircónia de precisão micrométrica.",
                highlight: true,
              },
              {
                icon: Sparkles,
                number: "02",
                title: "Medicina Estética Facial",
                desc: "Botox e preenchimentos com ácido hialurónico administrados por médicos dentistas com formação especializada. Um serviço exclusivo que complementa naturalmente os tratamentos dentários.",
                highlight: false,
              },
              {
                icon: ScanLine,
                number: "03",
                title: "Tecnologia Digital de Ponta",
                desc: "Scanner intraoral 3D, radiografia digital de baixa radiação, microscópio operatório para endodontia e sistema de fotografias padronizadas para monitorização de tratamentos.",
                highlight: false,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.number}
                  variants={fadeUp}
                  className={`p-6 lg:p-8 relative overflow-hidden group ${
                    item.highlight
                      ? "bg-[#C8A55A] text-[#0A1628]"
                      : "bg-white/5 border border-white/10 hover:border-[#C8A55A]/30 transition-colors"
                  }`}
                >
                  {/* Number watermark */}
                  <div
                    className={`absolute top-4 right-6 font-serif text-7xl font-bold select-none ${
                      item.highlight ? "text-[#0A1628]/10" : "text-white/5"
                    }`}
                  >
                    {item.number}
                  </div>

                  <div className="relative">
                    <div
                      className={`w-12 h-12 rounded-sm flex items-center justify-center mb-4 ${
                        item.highlight ? "bg-[#0A1628]/15" : "bg-[#C8A55A]/10"
                      }`}
                    >
                      <Icon
                        size={22}
                        className={item.highlight ? "text-[#0A1628]" : "text-[#C8A55A]"}
                      />
                    </div>
                    <h3
                      className={`font-serif text-xl font-bold mb-3 ${
                        item.highlight ? "text-[#0A1628]" : "text-white"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed ${
                        item.highlight ? "text-[#0A1628]/75" : "text-white/55"
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
