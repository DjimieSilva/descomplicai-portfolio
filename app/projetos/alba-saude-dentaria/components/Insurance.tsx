"use client";

import { motion } from "framer-motion";
import { Shield, CheckCircle, Phone } from "lucide-react";

const mainInsurers = [
  { name: "ADSE", description: "Assistência na Doença aos Servidores do Estado", type: "Subsistema Público" },
  { name: "Multicare", description: "Seguro de Saúde Fidelidade", type: "Seguradora" },
  { name: "Médis", description: "Médis Companhia Portuguesa de Seguros de Saúde", type: "Seguradora" },
  { name: "AdvanceCare", description: "Plataforma de Gestão de Saúde", type: "Gestora" },
  { name: "Allianz", description: "Allianz Care Portugal", type: "Seguradora" },
  { name: "Tranquilidade", description: "Generali Tranquilidade Saúde", type: "Seguradora" },
  { name: "Lusíadas Saúde", description: "Rede Lusíadas — acordos técnicos", type: "Rede" },
  { name: "DKV", description: "DKV Seguros de Saúde", type: "Seguradora" },
  { name: "SAMS", description: "Serviços de Assistência Médico-Social dos Bancários", type: "Subsistema" },
  { name: "IASFA", description: "Instituto de Acção Social das Forças Armadas", type: "Subsistema" },
  { name: "GNS", description: "Grupo Nabeiro Saúde — accordos empresariais", type: "Empresa" },
  { name: "Outros", description: "Consulte-nos para outros acordos ou convenções", type: "Outros" },
];

const benefits = [
  "Sem limite de despesas anuais em tratamentos convencionados",
  "Processamento directo com a seguradora sem adiantamento",
  "Apoio administrativo especializado em subsistemas de saúde",
  "Planos de financiamento para tratamentos não cobertos",
  "Consulta de verificação de cobertura sem custos adicionais",
  "Facilidade de pagamento em prestações sem juros",
];

export function Insurance() {
  return (
    <section id="seguros" className="py-24 bg-[#1E3A5F] relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#94A3B8 1px, transparent 1px), linear-gradient(90deg, #94A3B8 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B8860B]/30 to-transparent" />
      <div className="absolute -right-40 top-0 bottom-0 w-[600px] bg-[#B8860B]/5 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-[#B8860B] text-xs tracking-[0.3em] uppercase font-semibold mb-3">
            Convenções e Seguros
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="text-white font-bold text-4xl lg:text-5xl leading-tight"
              style={{ fontFamily: "Epilogue, sans-serif" }}
            >
              Acordos com os Principais
              <br />
              Subsistemas e Seguradoras
            </h2>
            <p className="text-white/60 text-base leading-relaxed max-w-md">
              Trabalhamos com mais de 12 subsistemas de saúde e seguradoras nacionais para garantir que o acesso a tratamentos de qualidade não seja limitado por constrangimentos financeiros.
            </p>
          </div>
          <div className="mt-8 h-px bg-gradient-to-r from-[#B8860B]/40 via-[#B8860B]/15 to-transparent" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Insurers grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {mainInsurers.map((ins, i) => (
                <motion.div
                  key={ins.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={`p-4 border transition-all duration-300 group ${
                    ins.name === "ADSE" || ins.name === "Multicare" || ins.name === "Médis"
                      ? "border-[#B8860B]/40 bg-[#B8860B]/10 hover:bg-[#B8860B]/15"
                      : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Shield
                      size={14}
                      className={`flex-shrink-0 mt-0.5 ${
                        ins.name === "ADSE" || ins.name === "Multicare" || ins.name === "Médis"
                          ? "text-[#B8860B]"
                          : "text-white/40"
                      }`}
                    />
                    <span className={`text-[10px] tracking-wide px-1.5 py-0.5 font-medium ${
                      ins.name === "ADSE" || ins.name === "Multicare" || ins.name === "Médis"
                        ? "bg-[#B8860B]/20 text-[#B8860B]"
                        : "bg-white/10 text-white/50"
                    }`}>
                      {ins.type}
                    </span>
                  </div>
                  <div
                    className="text-white font-bold text-base mb-1"
                    style={{ fontFamily: "Epilogue, sans-serif" }}
                  >
                    {ins.name}
                  </div>
                  <div className="text-white/45 text-xs leading-tight">{ins.description}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Benefits sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white/5 border border-white/10 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#B8860B]/20 border border-[#B8860B]/40 flex items-center justify-center">
                  <Shield size={18} className="text-[#B8860B]" />
                </div>
                <h3
                  className="text-white font-bold text-lg"
                  style={{ fontFamily: "Epilogue, sans-serif" }}
                >
                  Vantagens para Si
                </h3>
              </div>

              <div className="space-y-3 mb-8">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={14} className="text-[#B8860B] mt-0.5 flex-shrink-0" />
                    <span className="text-white/65 text-sm leading-snug">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-6">
                <p className="text-white/50 text-xs mb-4">
                  Não encontrou o seu subsistema? Contacte-nos — trabalhamos com muitos acordos adicionais.
                </p>
                <a
                  href="tel:+351233403600"
                  className="flex items-center gap-2 bg-[#B8860B] hover:bg-[#a07609] text-white px-5 py-3 font-semibold text-sm tracking-wide transition-all duration-300 w-full justify-center"
                >
                  <Phone size={15} />
                  Verificar Cobertura
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
