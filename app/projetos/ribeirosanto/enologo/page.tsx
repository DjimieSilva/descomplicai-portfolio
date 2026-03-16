"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Award,
  Grape,
  Thermometer,
  Clock,
  Target,
  Sparkles,
  Wine,
  History,
  Sprout,
  Quote,
  ChevronRight,
  Scissors,
  Droplets,
  FlaskConical,
  Package,
} from "lucide-react";
import Link from "next/link";

/* ═══════════════════════════════════════════════
   ANIMATION HELPERS
   ═══════════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

/* ── Reusable section wrapper with IntersectionObserver ── */
function AnimatedSection({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className={className} id={id}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        }}
      >
        {children}
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   WINEMAKING PROCESS STEPS
   ═══════════════════════════════════════════════ */

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Vindima Manual",
    description:
      "Cada cacho é selecionado à mão, nas manhãs frescas de setembro e outubro",
    icon: Grape,
  },
  {
    num: "02",
    title: "Triagem",
    description:
      "Seleção rigorosa na adega. Apenas os melhores cachos seguem para vinificação",
    icon: Scissors,
  },
  {
    num: "03",
    title: "Maceração a Frio",
    description:
      "24 horas de maceração pré-fermentativa para extração aromática nos tintos",
    icon: Droplets,
  },
  {
    num: "04",
    title: "Fermentação",
    description:
      "Temperatura controlada: 15°C para brancos, preservando aromas delicados",
    icon: Thermometer,
  },
  {
    num: "05",
    title: "Estágio em Carvalho",
    description:
      "Barricas de carvalho francês novo. 12-14 meses para os vinhos premium",
    icon: Clock,
  },
  {
    num: "06",
    title: "Assemblage",
    description:
      "O enólogo compõe o blend final, equilibrando cada componente",
    icon: FlaskConical,
  },
  {
    num: "07",
    title: "Estágio em Garrafa",
    description:
      "Mínimo 6 meses de repouso antes de chegar à sua mesa",
    icon: Package,
  },
];

/* ═══════════════════════════════════════════════
   PHILOSOPHY CARDS
   ═══════════════════════════════════════════════ */

const PHILOSOPHY_CARDS = [
  {
    title: "Terroir",
    description:
      "Cada vinho é filho da sua terra. Não lutamos contra o solo — escutamos o que ele nos diz.",
    icon: Sprout,
  },
  {
    title: "Tradição",
    description:
      "Castas autóctones, vindima manual, respeito pelo ciclo natural. Honramos séculos de conhecimento.",
    icon: History,
  },
  {
    title: "Precisão",
    description:
      "Fermentação controlada a 15°C, maceração a frio, estágio em carvalho francês. Cada detalhe importa.",
    icon: Target,
  },
  {
    title: "Elegância",
    description:
      "Preferimos a elegância à potência. Vinhos com carácter, frescura e longevidade.",
    icon: Sparkles,
  },
];

/* ═══════════════════════════════════════════════
   SIGNATURE WINES
   ═══════════════════════════════════════════════ */

const SIGNATURE_WINES = [
  {
    name: "Encruzado",
    tagline: "A expressão máxima do terroir do Dão num branco",
    detail: "Estágio de 50% em carvalho francês novo",
    color: "from-amber-100 to-yellow-50",
  },
  {
    name: "Vinha da Neve",
    tagline: "O nosso topo de gama. Complexidade e elegância em cada gota",
    detail: "12 meses em carvalho francês",
    color: "from-rose-100 to-red-50",
  },
  {
    name: "E.T. 2014",
    tagline:
      "Um blend ousado de Touriga Nacional com Encruzado. Reconhecido nos Best 30 de Portugal",
    detail: "Blend tinto-branco inovador",
    color: "from-purple-100 to-rose-50",
  },
];

/* ═══════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════ */

export default function EnologoPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* ═══════════════════════════════════════════
          SECTION 1: HERO — Portrait-style opening
          ═══════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          background: "var(--rs-dark)",
          overflow: "hidden",
        }}
      >
        {/* Grain overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.06,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "120px 24px 80px",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "48px",
            alignItems: "center",
          }}
          className="md:grid-cols-2 md:gap-16 md:py-0"
        >
          {/* Left: Quote */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={mounted ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            style={{ padding: "0 8px" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                marginBottom: "24px",
              }}
            >
              <Quote
                size={40}
                style={{ color: "var(--rs-gold)", flexShrink: 0, marginTop: 4 }}
              />
            </div>
            <blockquote
              style={{
                fontFamily: "var(--rs-font-serif)",
                fontSize: "clamp(1.75rem, 4vw, 3rem)",
                lineHeight: 1.3,
                color: "var(--rs-gold)",
                fontWeight: 400,
                fontStyle: "italic",
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              O vinho é a expressão mais pura da terra que o viu nascer
            </blockquote>
            <p
              style={{
                color: "var(--rs-stone-light)",
                fontFamily: "var(--rs-font-sans)",
                fontSize: "0.95rem",
                marginTop: "24px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              — Carlos Lucas
            </p>
          </motion.div>

          {/* Right: Decorative silhouette / gradient art */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={mounted ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "420px",
                aspectRatio: "3 / 4",
                borderRadius: "var(--rs-radius-lg)",
                background:
                  "linear-gradient(160deg, #3d1e14 0%, #722f37 30%, #c9a96e 70%, #8e3a44 100%)",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 40px 80px rgba(0,0,0,0.4)",
              }}
            >
              {/* Vine silhouette overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(ellipse at 50% 85%, rgba(28,18,16,0.7) 0%, transparent 70%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "40%",
                  background:
                    "linear-gradient(to top, rgba(28,18,16,0.85) 0%, transparent 100%)",
                }}
              />
              {/* Decorative elements suggesting vineyard landscape */}
              <div
                style={{
                  position: "absolute",
                  bottom: "15%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    border: "2px solid var(--rs-gold)",
                    margin: "0 auto 12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Wine size={28} style={{ color: "var(--rs-gold)" }} />
                </div>
                <p
                  style={{
                    color: "var(--rs-gold-light)",
                    fontFamily: "var(--rs-font-serif)",
                    fontSize: "0.85rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    opacity: 0.9,
                  }}
                >
                  Carlos Lucas
                </p>
                <p
                  style={{
                    color: "var(--rs-stone-light)",
                    fontFamily: "var(--rs-font-sans)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    marginTop: "4px",
                  }}
                >
                  Enólogo &middot; Viticultor
                </p>
              </div>
              {/* Subtle row pattern suggesting vine rows */}
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    top: `${18 + i * 12}%`,
                    left: "10%",
                    right: "10%",
                    height: "1px",
                    background: `linear-gradient(90deg, transparent, rgba(201,169,110,${0.08 + i * 0.02}), transparent)`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 1 }}
          style={{
            position: "absolute",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              color: "var(--rs-stone)",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Descobrir
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: "1px",
              height: "32px",
              background:
                "linear-gradient(to bottom, var(--rs-gold), transparent)",
            }}
          />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2: BIO — The man behind the wine
          ═══════════════════════════════════════════ */}
      <AnimatedSection
        className=""
        id="bio"
      >
        <div
          style={{
            background: "var(--rs-cream)",
            padding: "100px 24px",
          }}
        >
          <div
            style={{
              maxWidth: "820px",
              margin: "0 auto",
            }}
          >
            <motion.div variants={fadeUp} custom={0}>
              <h1
                style={{
                  fontFamily: "var(--rs-font-serif)",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  fontWeight: 400,
                  color: "var(--rs-dark)",
                  margin: 0,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                Carlos Lucas
              </h1>
            </motion.div>

            <motion.div variants={fadeUp} custom={1}>
              <p
                style={{
                  fontFamily: "var(--rs-font-sans)",
                  fontSize: "0.85rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--rs-burgundy)",
                  marginTop: "16px",
                  fontWeight: 500,
                }}
              >
                Enólogo &middot; Viticultor &middot; Agricultor do Ano 2014
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={2}
              style={{
                width: "60px",
                height: "2px",
                background: "var(--rs-gold)",
                marginTop: "32px",
                marginBottom: "40px",
              }}
            />

            {/* Paragraph 1 */}
            <motion.p
              variants={fadeUp}
              custom={3}
              style={{
                fontFamily: "var(--rs-font-serif)",
                fontSize: "1.15rem",
                lineHeight: 1.85,
                color: "var(--rs-dark-soft)",
                margin: "0 0 28px 0",
              }}
            >
              Carlos Lucas cresceu entre vinhas. Desde jovem, aprendeu a
              respeitar os ritmos da terra e a escutar o que cada parcela de
              terreno tinha para contar. Em 1994, a família Lucas adquiriu a
              Quinta do Ribeiro Santo, em Carregal do Sal — e Carlos viu
              naquelas encostas de granito o potencial para vinhos
              verdadeiramente únicos.
            </motion.p>

            {/* Paragraph 2 */}
            <motion.p
              variants={fadeUp}
              custom={4}
              style={{
                fontFamily: "var(--rs-font-serif)",
                fontSize: "1.15rem",
                lineHeight: 1.85,
                color: "var(--rs-dark-soft)",
                margin: "0 0 28px 0",
              }}
            >
              Os primeiros anos foram de construção paciente. As vinhas foram
              replantadas de raiz, com castas autóctones cuidadosamente
              selecionadas. Em 2000, a primeira garrafa de Ribeiro Santo saiu
              da adega — e desde então, cada colheita tem contado uma nova
              história do Dão.
            </motion.p>

            {/* Paragraph 3 */}
            <motion.p
              variants={fadeUp}
              custom={5}
              style={{
                fontFamily: "var(--rs-font-serif)",
                fontSize: "1.15rem",
                lineHeight: 1.85,
                color: "var(--rs-dark-soft)",
                margin: "0 0 28px 0",
              }}
            >
              Em 2011, nasceu oficialmente a Magnum - Carlos Lucas Vinhos. Em
              2014, o trabalho incansável de Carlos foi reconhecido com o
              título de Agricultor do Ano, atribuído pelo Ministério da
              Agricultura — a mais alta distinção agrícola em Portugal.
            </motion.p>

            {/* Paragraph 4 */}
            <motion.p
              variants={fadeUp}
              custom={6}
              style={{
                fontFamily: "var(--rs-font-serif)",
                fontSize: "1.15rem",
                lineHeight: 1.85,
                color: "var(--rs-dark-soft)",
                margin: 0,
              }}
            >
              Hoje, Carlos continua a vinificar com a mesma paixão e rigor. A
              sua filosofia é simples: deixar o terroir falar. Vinhos elegantes,
              com identidade, que honram a tradição centenária do Dão sem medo
              de inovar.
            </motion.p>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════
          SECTION 3: PHILOSOPHY — Winemaking approach
          ═══════════════════════════════════════════ */}
      <AnimatedSection id="filosofia">
        <div
          style={{
            background: "var(--rs-white)",
            padding: "100px 24px",
          }}
        >
          <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
            <motion.div
              variants={fadeUp}
              custom={0}
              style={{ textAlign: "center", marginBottom: "64px" }}
            >
              <p
                style={{
                  fontFamily: "var(--rs-font-sans)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--rs-stone)",
                  marginBottom: "12px",
                }}
              >
                A nossa abordagem
              </p>
              <h2
                style={{
                  fontFamily: "var(--rs-font-serif)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 400,
                  color: "var(--rs-dark)",
                  margin: 0,
                }}
              >
                Filosofia de Vinificação
              </h2>
              <div
                style={{
                  width: "48px",
                  height: "2px",
                  background: "var(--rs-gold)",
                  margin: "24px auto 0",
                }}
              />
            </motion.div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "24px",
              }}
            >
              {PHILOSOPHY_CARDS.map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    variants={scaleIn}
                    custom={i}
                    style={{
                      background: "var(--rs-cream)",
                      borderRadius: "var(--rs-radius-lg)",
                      padding: "40px 32px",
                      border: "1px solid transparent",
                      transition: "border-color var(--rs-transition), box-shadow var(--rs-transition)",
                      cursor: "default",
                    }}
                    whileHover={{
                      borderColor: "var(--rs-burgundy)",
                      boxShadow: "0 8px 32px rgba(114,47,55,0.08)",
                    }}
                  >
                    <div
                      style={{
                        width: "52px",
                        height: "52px",
                        borderRadius: "50%",
                        background: "var(--rs-dark)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "24px",
                      }}
                    >
                      <Icon size={22} style={{ color: "var(--rs-gold)" }} />
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--rs-font-serif)",
                        fontSize: "1.35rem",
                        fontWeight: 400,
                        color: "var(--rs-dark)",
                        margin: "0 0 12px 0",
                      }}
                    >
                      {card.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--rs-font-sans)",
                        fontSize: "0.95rem",
                        lineHeight: 1.7,
                        color: "var(--rs-stone)",
                        margin: 0,
                      }}
                    >
                      {card.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════
          SECTION 4: WINEMAKING PROCESS
          ═══════════════════════════════════════════ */}
      <AnimatedSection id="processo">
        <div
          style={{
            background: "var(--rs-dark)",
            padding: "100px 24px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Grain overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.04,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              maxWidth: "1120px",
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
            }}
          >
            <motion.div
              variants={fadeUp}
              custom={0}
              style={{ textAlign: "center", marginBottom: "72px" }}
            >
              <p
                style={{
                  fontFamily: "var(--rs-font-sans)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--rs-stone)",
                  marginBottom: "12px",
                }}
              >
                O processo
              </p>
              <h2
                style={{
                  fontFamily: "var(--rs-font-serif)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 400,
                  color: "var(--rs-cream)",
                  margin: 0,
                }}
              >
                Da Vinha à Garrafa
              </h2>
              <div
                style={{
                  width: "48px",
                  height: "2px",
                  background: "var(--rs-gold)",
                  margin: "24px auto 0",
                }}
              />
            </motion.div>

            {/* Process steps — vertical timeline on mobile, grid on desktop */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "32px",
                position: "relative",
              }}
            >
              {PROCESS_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.num}
                    variants={fadeUp}
                    custom={i}
                    style={{
                      position: "relative",
                      padding: "32px 28px",
                      background: "var(--rs-dark-soft)",
                      borderRadius: "var(--rs-radius-lg)",
                      border: "1px solid rgba(201,169,110,0.1)",
                      transition: "border-color var(--rs-transition)",
                    }}
                    whileHover={{
                      borderColor: "rgba(201,169,110,0.3)",
                    }}
                  >
                    {/* Step number */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        marginBottom: "20px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--rs-font-serif)",
                          fontSize: "2rem",
                          fontWeight: 300,
                          color: "var(--rs-gold)",
                          lineHeight: 1,
                          opacity: 0.5,
                        }}
                      >
                        {step.num}
                      </span>
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          border: "1px solid var(--rs-gold)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icon size={18} style={{ color: "var(--rs-gold)" }} />
                      </div>
                    </div>

                    <h3
                      style={{
                        fontFamily: "var(--rs-font-serif)",
                        fontSize: "1.2rem",
                        fontWeight: 400,
                        color: "var(--rs-cream)",
                        margin: "0 0 10px 0",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--rs-font-sans)",
                        fontSize: "0.9rem",
                        lineHeight: 1.7,
                        color: "var(--rs-stone-light)",
                        margin: 0,
                      }}
                    >
                      {step.description}
                    </p>

                    {/* Connector line (hidden on last item and on mobile wrap) */}
                    {i < PROCESS_STEPS.length - 1 && (
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          right: "-17px",
                          width: "2px",
                          height: "24px",
                          background:
                            "linear-gradient(to bottom, var(--rs-gold), transparent)",
                          transform: "rotate(90deg)",
                          opacity: 0.3,
                        }}
                        className="hidden lg:block"
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════
          SECTION 5: AWARDS HIGHLIGHT
          ═══════════════════════════════════════════ */}
      <AnimatedSection id="reconhecimento">
        <div
          style={{
            background:
              "linear-gradient(135deg, var(--rs-cream) 0%, #f5eed9 50%, var(--rs-cream-dark) 100%)",
            padding: "100px 24px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Gold accent circles */}
          <div
            style={{
              position: "absolute",
              top: "-100px",
              right: "-100px",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              border: "1px solid rgba(201,169,110,0.15)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-80px",
              left: "-80px",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              border: "1px solid rgba(201,169,110,0.1)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              maxWidth: "900px",
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
              textAlign: "center",
            }}
          >
            <motion.div variants={fadeUp} custom={0}>
              <p
                style={{
                  fontFamily: "var(--rs-font-sans)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--rs-stone)",
                  marginBottom: "12px",
                }}
              >
                Distinções
              </p>
              <h2
                style={{
                  fontFamily: "var(--rs-font-serif)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 400,
                  color: "var(--rs-dark)",
                  margin: "0 0 48px 0",
                }}
              >
                Reconhecimento
              </h2>
            </motion.div>

            {/* Main award */}
            <motion.div
              variants={scaleIn}
              custom={1}
              style={{
                background: "var(--rs-dark)",
                borderRadius: "var(--rs-radius-lg)",
                padding: "56px 40px",
                marginBottom: "40px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Subtle gold border glow */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "var(--rs-radius-lg)",
                  border: "1px solid rgba(201,169,110,0.25)",
                  pointerEvents: "none",
                }}
              />

              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ marginBottom: "24px" }}
              >
                <Award
                  size={56}
                  style={{ color: "var(--rs-gold)", margin: "0 auto" }}
                />
              </motion.div>

              <h3
                style={{
                  fontFamily: "var(--rs-font-serif)",
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  fontWeight: 400,
                  color: "var(--rs-gold)",
                  margin: "0 0 8px 0",
                }}
              >
                Agricultor do Ano
              </h3>
              <p
                style={{
                  fontFamily: "var(--rs-font-serif)",
                  fontSize: "1.5rem",
                  color: "var(--rs-gold-light)",
                  margin: "0 0 24px 0",
                  fontWeight: 300,
                }}
              >
                2014
              </p>
              <p
                style={{
                  fontFamily: "var(--rs-font-sans)",
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  color: "var(--rs-stone-light)",
                  margin: 0,
                  maxWidth: "600px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                Atribuído pelo Ministério da Agricultura de Portugal — o mais
                alto reconhecimento agrícola do país. Este prémio celebra não
                apenas os vinhos, mas toda a dedicação à terra e à viticultura
                sustentável.
              </p>
            </motion.div>

            {/* Additional recognitions */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "20px",
              }}
            >
              <motion.div
                variants={fadeUp}
                custom={2}
                style={{
                  background: "var(--rs-white)",
                  borderRadius: "var(--rs-radius-lg)",
                  padding: "28px 24px",
                  border: "1px solid rgba(201,169,110,0.2)",
                }}
              >
                <Wine
                  size={28}
                  style={{
                    color: "var(--rs-burgundy)",
                    margin: "0 auto 12px",
                    display: "block",
                  }}
                />
                <h4
                  style={{
                    fontFamily: "var(--rs-font-serif)",
                    fontSize: "1.1rem",
                    fontWeight: 400,
                    color: "var(--rs-dark)",
                    margin: "0 0 8px 0",
                  }}
                >
                  Best 30 Wines of Portugal
                </h4>
                <p
                  style={{
                    fontFamily: "var(--rs-font-sans)",
                    fontSize: "0.85rem",
                    lineHeight: 1.6,
                    color: "var(--rs-stone)",
                    margin: 0,
                  }}
                >
                  Vinhos selecionados entre os 30 melhores de Portugal
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                custom={3}
                style={{
                  background: "var(--rs-white)",
                  borderRadius: "var(--rs-radius-lg)",
                  padding: "28px 24px",
                  border: "1px solid rgba(201,169,110,0.2)",
                }}
              >
                <Sparkles
                  size={28}
                  style={{
                    color: "var(--rs-burgundy)",
                    margin: "0 auto 12px",
                    display: "block",
                  }}
                />
                <h4
                  style={{
                    fontFamily: "var(--rs-font-serif)",
                    fontSize: "1.1rem",
                    fontWeight: 400,
                    color: "var(--rs-dark)",
                    margin: "0 0 8px 0",
                  }}
                >
                  Os Melhores de Portugal
                </h4>
                <p
                  style={{
                    fontFamily: "var(--rs-font-sans)",
                    fontSize: "0.85rem",
                    lineHeight: 1.6,
                    color: "var(--rs-stone)",
                    margin: 0,
                  }}
                >
                  Reconhecimento contínuo nos guias e concursos nacionais
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════
          SECTION 6: SIGNATURE WINES
          ═══════════════════════════════════════════ */}
      <AnimatedSection id="vinhos-assinatura">
        <div
          style={{
            background: "var(--rs-cream)",
            padding: "100px 24px",
          }}
        >
          <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
            <motion.div
              variants={fadeUp}
              custom={0}
              style={{ textAlign: "center", marginBottom: "64px" }}
            >
              <p
                style={{
                  fontFamily: "var(--rs-font-sans)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--rs-stone)",
                  marginBottom: "12px",
                }}
              >
                Seleção do enólogo
              </p>
              <h2
                style={{
                  fontFamily: "var(--rs-font-serif)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 400,
                  color: "var(--rs-dark)",
                  margin: 0,
                }}
              >
                Vinhos de Assinatura
              </h2>
              <div
                style={{
                  width: "48px",
                  height: "2px",
                  background: "var(--rs-gold)",
                  margin: "24px auto 0",
                }}
              />
            </motion.div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "28px",
              }}
            >
              {SIGNATURE_WINES.map((wine, i) => (
                <motion.div
                  key={wine.name}
                  variants={fadeUp}
                  custom={i + 1}
                  style={{
                    background: "var(--rs-white)",
                    borderRadius: "var(--rs-radius-lg)",
                    overflow: "hidden",
                    border: "1px solid rgba(0,0,0,0.05)",
                    transition: "box-shadow var(--rs-transition), transform var(--rs-transition)",
                    cursor: "pointer",
                  }}
                  whileHover={{
                    y: -4,
                    boxShadow: "0 16px 48px rgba(114,47,55,0.1)",
                  }}
                >
                  {/* Color accent bar */}
                  <div
                    style={{
                      height: "6px",
                      background:
                        i === 0
                          ? "linear-gradient(90deg, #c9a96e, #dbc08a)"
                          : i === 1
                            ? "linear-gradient(90deg, #722f37, #8e3a44)"
                            : "linear-gradient(90deg, #5a2d6a, #8e3a44)",
                    }}
                  />

                  <div style={{ padding: "36px 32px" }}>
                    {/* Wine icon placeholder */}
                    <div
                      style={{
                        width: "48px",
                        height: "80px",
                        borderRadius: "4px 4px 2px 2px",
                        background:
                          i === 0
                            ? "linear-gradient(180deg, #f5e6c8, #dbc08a)"
                            : i === 1
                              ? "linear-gradient(180deg, #722f37, #4a1c22)"
                              : "linear-gradient(180deg, #5a2d6a, #3d1e42)",
                        margin: "0 auto 24px",
                        position: "relative",
                      }}
                    >
                      {/* Bottle neck */}
                      <div
                        style={{
                          position: "absolute",
                          top: "-12px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "16px",
                          height: "16px",
                          borderRadius: "2px 2px 0 0",
                          background: "inherit",
                        }}
                      />
                    </div>

                    <h3
                      style={{
                        fontFamily: "var(--rs-font-serif)",
                        fontSize: "1.5rem",
                        fontWeight: 400,
                        color: "var(--rs-dark)",
                        margin: "0 0 8px 0",
                        textAlign: "center",
                      }}
                    >
                      {wine.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--rs-font-sans)",
                        fontSize: "0.8rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--rs-stone)",
                        margin: "0 0 16px 0",
                        textAlign: "center",
                      }}
                    >
                      {wine.detail}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--rs-font-serif)",
                        fontSize: "1rem",
                        lineHeight: 1.7,
                        color: "var(--rs-dark-soft)",
                        margin: 0,
                        textAlign: "center",
                        fontStyle: "italic",
                      }}
                    >
                      {wine.tagline}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA to wines page */}
            <motion.div
              variants={fadeUp}
              custom={5}
              style={{
                textAlign: "center",
                marginTop: "48px",
              }}
            >
              <Link
                href="/projetos/ribeirosanto/vinhos"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "var(--rs-font-sans)",
                  fontSize: "0.85rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--rs-burgundy)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--rs-burgundy)",
                  paddingBottom: "4px",
                  transition: "color var(--rs-transition)",
                }}
              >
                Explorar todos os vinhos
                <ChevronRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════
          SECTION 7: CLOSING QUOTE
          ═══════════════════════════════════════════ */}
      <AnimatedSection id="citacao-final">
        <div
          style={{
            background: "var(--rs-dark)",
            padding: "120px 24px",
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          {/* Grain overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.04,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
            }}
          >
            <motion.div variants={fadeIn} custom={0}>
              <Quote
                size={36}
                style={{
                  color: "var(--rs-gold)",
                  margin: "0 auto 32px",
                  opacity: 0.6,
                }}
              />
            </motion.div>

            <motion.blockquote
              variants={fadeUp}
              custom={1}
              style={{
                fontFamily: "var(--rs-font-serif)",
                fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
                lineHeight: 1.4,
                color: "var(--rs-gold)",
                fontWeight: 400,
                fontStyle: "italic",
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              <motion.span
                animate={{
                  opacity: [0.85, 1, 0.85],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ display: "inline-block" }}
              >
                Não fazemos vinho para impressionar. Fazemos vinho para que cada
                golo conte a história desta terra.
              </motion.span>
            </motion.blockquote>

            <motion.div
              variants={fadeUp}
              custom={2}
              style={{
                width: "48px",
                height: "1px",
                background: "var(--rs-gold)",
                margin: "32px auto",
                opacity: 0.4,
              }}
            />

            <motion.p
              variants={fadeUp}
              custom={3}
              style={{
                fontFamily: "var(--rs-font-sans)",
                fontSize: "0.8rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--rs-stone)",
                margin: 0,
              }}
            >
              Carlos Lucas — Enólogo, Ribeiro Santo
            </motion.p>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════
          RESPONSIVE STYLES (injected via style tag)
          ═══════════════════════════════════════════ */}
      <style jsx global>{`
        /* Hero grid — 2 columns on desktop */
        @media (min-width: 768px) {
          .md\\:grid-cols-2 {
            grid-template-columns: 1fr 1fr !important;
          }
          .md\\:gap-16 {
            gap: 64px !important;
          }
          .md\\:py-0 {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
            min-height: 100vh;
            display: grid !important;
            align-content: center;
          }
        }

        /* Hide connector lines on smaller screens */
        .hidden {
          display: none;
        }
        @media (min-width: 1024px) {
          .lg\\:block {
            display: block !important;
          }
        }

        /* Smooth hover for wine cards */
        [style*="cursor: pointer"]:hover {
          transform: translateY(-4px);
        }

        /* Ensure proper mobile spacing for hero */
        @media (max-width: 767px) {
          .md\\:py-0 {
            padding-top: 120px !important;
            padding-bottom: 80px !important;
          }
        }
      `}</style>
    </div>
  );
}
