"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Mountain,
  Layers,
  Cloud,
  Grape,
  MapPin,
  Calendar,
  Thermometer,
  TreePine,
  Sun,
  Droplets,
} from "lucide-react";
import Link from "next/link";

/* ═══════════════════════════════════════════════
   INTERSECTION OBSERVER HOOK
   ═══════════════════════════════════════════════ */

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ═══════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════ */

const TIMELINE = [
  {
    year: "1994",
    title: "Aquisição da Quinta",
    desc: "A família Lucas adquire a Quinta do Ribeiro Santo em Carregal do Sal. As vinhas são replantadas de imediato, com foco nas castas nobres do Dão.",
  },
  {
    year: "2000",
    title: "Primeiro Vinho Engarrafado",
    desc: "Nasce o primeiro vinho engarrafado sob a marca Ribeiro Santo — o início de uma nova era para a quinta.",
  },
  {
    year: "2011",
    title: "Magnum — Carlos Lucas Vinhos",
    desc: "Fundação oficial da Magnum — Carlos Lucas Vinhos, consolidando a visão de produzir vinhos de terroir de excelência.",
  },
  {
    year: "2014",
    title: "Agricultor do Ano",
    desc: "Carlos Lucas é nomeado Agricultor do Ano pelo Ministério da Agricultura, reconhecendo o seu contributo para a viticultura portuguesa.",
  },
  {
    year: "Hoje",
    title: "Referência no Dão",
    desc: "Adega moderna, mais de 9 vinhos no portfólio e distribuição internacional. Uma quinta que honra a tradição enquanto abraça o futuro.",
  },
];

const TERROIR = [
  {
    icon: Mountain,
    label: "Altitude",
    value: "400–600m",
    desc: "As nossas vinhas respiram o ar puro das montanhas do Dão, garantindo amplitudes térmicas que preservam a acidez natural.",
  },
  {
    icon: Layers,
    label: "Solo",
    value: "Granito",
    desc: "O granito confere mineralidade e estrutura únicas aos nossos vinhos — a assinatura do terroir do Dão.",
  },
  {
    icon: Cloud,
    label: "Clima",
    value: "Continental / Atlântico",
    desc: "Noites frescas, dias temperados — o equilíbrio perfeito para vinhos elegantes e com frescura notável.",
  },
];

const REGION_FACTS = [
  {
    icon: Calendar,
    title: "Demarcada desde 1908",
    desc: "Uma das regiões vitivinícolas mais antigas de Portugal, com mais de um século de história.",
  },
  {
    icon: Mountain,
    title: "Protegida por 3 Serras",
    desc: "Serra da Estrela (este), Caramulo (oeste) e Buçaco (sul) criam uma barreira natural única.",
  },
  {
    icon: Droplets,
    title: "Entre Dois Rios",
    desc: "Situada entre os rios Mondego e Dão, beneficiando da influência hídrica e dos solos férteis das margens.",
  },
  {
    icon: Thermometer,
    title: "Microclima Único",
    desc: "Mais fresco que a maioria das regiões portuguesas, produzindo vinhos com elegância e mineralidade distintas.",
  },
];

const CASTAS = [
  {
    name: "Encruzado",
    type: "Branca" as const,
    desc: "A maior casta branca de Portugal. Produz vinhos de grande complexidade e longevidade.",
  },
  {
    name: "Touriga Nacional",
    type: "Tinta" as const,
    desc: "A rainha das castas portuguesas. Aromática, intensa, elegante.",
  },
  {
    name: "Tinta Roriz",
    type: "Tinta" as const,
    desc: "Versatilidade e estrutura. Conhecida internacionalmente como Tempranillo.",
  },
  {
    name: "Alfrocheiro",
    type: "Tinta" as const,
    desc: "Casta autóctone do Dão. Frutos vermelhos, floral, frescura.",
  },
  {
    name: "Tinto Cão",
    type: "Tinta" as const,
    desc: "Rara e preciosa. Acidez natural, elegância, longevidade.",
  },
  {
    name: "Malvasia Fina",
    type: "Branca" as const,
    desc: "Delicadeza e finesse. Aromas florais e frutados.",
  },
];

const SEASONS = [
  {
    name: "Inverno",
    desc: "Poda e preparação da vinha. O repouso que alimenta o próximo ciclo.",
    icon: TreePine,
    gradient: "linear-gradient(135deg, #2a3a4a 0%, #1c2a3a 50%, #0f1922 100%)",
    accent: "#7ba3c9",
  },
  {
    name: "Primavera",
    desc: "Rebentação e floração. A vinha desperta com energia renovada.",
    icon: Sun,
    gradient: "linear-gradient(135deg, #3a5a3a 0%, #2a4a2a 50%, #1a3a1a 100%)",
    accent: "#8cc98c",
  },
  {
    name: "Verão",
    desc: "Maturação e vindima em verde. O sol amadurece os frutos com paciência.",
    icon: Thermometer,
    gradient: "linear-gradient(135deg, #5a4a2a 0%, #4a3a1a 50%, #3a2a0a 100%)",
    accent: "#d4b06a",
  },
  {
    name: "Outono",
    desc: "Vindima manual e vinificação. A recompensa de um ano de dedicação.",
    icon: Grape,
    gradient: "linear-gradient(135deg, #4a2a2a 0%, #3a1a1a 50%, #2a0f0f 100%)",
    accent: "#c97a7a",
  },
];

const GALLERY = [
  {
    title: "Vinhas em Fileira",
    gradient: "linear-gradient(160deg, #4a6741 0%, #2d4228 40%, #1a2e15 100%)",
    pattern: "repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(255,255,255,0.04) 18px, rgba(255,255,255,0.04) 20px)",
  },
  {
    title: "Solo Granítico",
    gradient: "linear-gradient(160deg, #8b8178 0%, #6b6158 40%, #4b4138 100%)",
    pattern: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.08) 1px, transparent 1px), radial-gradient(circle at 70% 30%, rgba(255,255,255,0.06) 1px, transparent 1px)",
  },
  {
    title: "Névoa Matinal",
    gradient: "linear-gradient(180deg, #d4cfc7 0%, #a8a196 30%, #7b756d 100%)",
    pattern: "linear-gradient(0deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
  },
  {
    title: "Cachos de Uva",
    gradient: "linear-gradient(160deg, #722f37 0%, #4a1e24 40%, #2a0e14 100%)",
    pattern: "radial-gradient(circle at 40% 40%, rgba(201,169,110,0.12) 3px, transparent 3px), radial-gradient(circle at 55% 55%, rgba(201,169,110,0.08) 4px, transparent 4px), radial-gradient(circle at 45% 60%, rgba(201,169,110,0.1) 3px, transparent 3px)",
  },
  {
    title: "Sala de Barricas",
    gradient: "linear-gradient(160deg, #3a2a1a 0%, #2a1a0a 40%, #1a0f05 100%)",
    pattern: "repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(201,169,110,0.06) 24px, rgba(201,169,110,0.06) 26px)",
  },
  {
    title: "Pôr do Sol nas Vinhas",
    gradient: "linear-gradient(180deg, #c9a96e 0%, #a05a3a 30%, #4a2a1a 70%, #1c1210 100%)",
    pattern: "radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.12) 0%, transparent 60%)",
  },
];

/* ═══════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════ */

export default function QuintaPage() {
  /* ── Parallax for hero ─────────────────────── */
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  /* ── Section observers ─────────────────────── */
  const quintaObs = useInView(0.1);
  const terroirObs = useInView(0.1);
  const regiaoObs = useInView(0.1);
  const castasObs = useInView(0.1);
  const cicloObs = useInView(0.1);
  const galleryObs = useInView(0.08);

  return (
    <div style={{ overflow: "hidden" }}>
      {/* ═══════════════════════════════════════════
          SECTION 1 — HERO
          ═══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          minHeight: "85svh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Parallax background */}
        <motion.div
          style={{
            position: "absolute",
            inset: "-20% 0",
            y: heroY,
            background:
              "linear-gradient(180deg, #1c1210 0%, #2a1e1a 25%, #722f37 50%, #2a1e1a 75%, #faf7f2 100%)",
            zIndex: 0,
          }}
        />

        {/* Topographic pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.06,
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(201,169,110,0.3) 60px, rgba(201,169,110,0.3) 61px),
              repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(201,169,110,0.15) 60px, rgba(201,169,110,0.15) 61px)
            `,
            zIndex: 1,
          }}
        />

        {/* Content */}
        <motion.div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            padding: "0 1.5rem",
            opacity: heroOpacity,
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              fontFamily: "var(--rs-font-sans)",
              fontSize: "clamp(0.75rem, 1.2vw, 0.9rem)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--rs-gold)",
              marginBottom: "1.5rem",
            }}
          >
            Carregal do Sal, Dão &mdash; desde 1994
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
            style={{
              fontFamily: "var(--rs-font-serif)",
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              color: "var(--rs-cream)",
              margin: "0 0 1.5rem",
            }}
          >
            Quinta do
            <br />
            <span className="rs-text-gold">Ribeiro Santo</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            style={{
              fontFamily: "var(--rs-font-serif)",
              fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
              fontStyle: "italic",
              color: "var(--rs-stone-light)",
              maxWidth: "38ch",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Onde o granito encontra a vinha, e o tempo revela o carácter.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            style={{
              position: "absolute",
              bottom: "-12vh",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--rs-stone)",
              }}
            >
              Explorar
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: "1px",
                height: "40px",
                background:
                  "linear-gradient(180deg, var(--rs-gold), transparent)",
              }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2 — A QUINTA (Timeline)
          ═══════════════════════════════════════════ */}
      <section
        style={{
          background: "var(--rs-cream)",
          padding: "clamp(4rem, 10vw, 8rem) 0",
        }}
      >
        <div
          ref={quintaObs.ref}
          className="rs-section"
          style={{ paddingTop: 0, paddingBottom: 0 }}
        >
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={quintaObs.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{ textAlign: "center", marginBottom: "4rem" }}
          >
            <p
              style={{
                fontSize: "0.8rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--rs-burgundy)",
                marginBottom: "0.75rem",
              }}
            >
              A Nossa História
            </p>
            <h2
              className="rs-heading"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
                margin: "0 0 1rem",
              }}
            >
              A Quinta
            </h2>
            <div
              style={{
                width: "60px",
                height: "2px",
                background:
                  "linear-gradient(90deg, transparent, var(--rs-gold), transparent)",
                margin: "0 auto",
              }}
            />
          </motion.div>

          {/* Timeline */}
          <div
            style={{
              position: "relative",
              maxWidth: "720px",
              margin: "0 auto",
            }}
          >
            {/* Vertical line */}
            <div
              style={{
                position: "absolute",
                left: "28px",
                top: "8px",
                bottom: "8px",
                width: "2px",
                background:
                  "linear-gradient(180deg, var(--rs-gold), var(--rs-burgundy), var(--rs-gold))",
                opacity: 0.3,
              }}
            />

            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -40 }}
                animate={quintaObs.inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  delay: 0.2 + i * 0.15,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  marginBottom: i < TIMELINE.length - 1 ? "2.5rem" : 0,
                  alignItems: "flex-start",
                }}
              >
                {/* Dot */}
                <div
                  style={{
                    flexShrink: 0,
                    width: "56px",
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: "4px",
                  }}
                >
                  <div
                    style={{
                      width: "14px",
                      height: "14px",
                      borderRadius: "50%",
                      background: "var(--rs-burgundy)",
                      border: "3px solid var(--rs-gold)",
                      boxShadow: "0 0 0 4px rgba(201,169,110,0.15)",
                    }}
                  />
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <span
                    style={{
                      display: "inline-block",
                      fontFamily: "var(--rs-font-serif)",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "var(--rs-burgundy)",
                      letterSpacing: "0.1em",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {item.year}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--rs-font-serif)",
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      color: "var(--rs-dark)",
                      margin: "0 0 0.5rem",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.92rem",
                      lineHeight: 1.7,
                      color: "var(--rs-stone)",
                      margin: 0,
                      maxWidth: "50ch",
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3 — O TERROIR
          ═══════════════════════════════════════════ */}
      <section
        style={{
          background: "var(--rs-dark)",
          padding: "clamp(4rem, 10vw, 8rem) 0",
          position: "relative",
        }}
      >
        {/* Subtle topographic overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.04,
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(201,169,110,0.2) 80px, rgba(201,169,110,0.2) 81px)
            `,
          }}
        />

        <div
          ref={terroirObs.ref}
          className="rs-section"
          style={{
            paddingTop: 0,
            paddingBottom: 0,
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Heading with decorative vine SVG */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={terroirObs.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{ textAlign: "center", marginBottom: "4rem" }}
          >
            {/* Decorative grape vine SVG */}
            <svg
              width="80"
              height="32"
              viewBox="0 0 80 32"
              fill="none"
              style={{ margin: "0 auto 1rem", display: "block", opacity: 0.5 }}
            >
              <path
                d="M0 16 Q20 4 40 16 Q60 28 80 16"
                stroke="var(--rs-gold)"
                strokeWidth="1.5"
                fill="none"
              />
              <circle cx="20" cy="10" r="3" fill="var(--rs-burgundy)" opacity="0.6" />
              <circle cx="24" cy="13" r="2.5" fill="var(--rs-burgundy)" opacity="0.5" />
              <circle cx="56" cy="22" r="3" fill="var(--rs-burgundy)" opacity="0.6" />
              <circle cx="60" cy="19" r="2.5" fill="var(--rs-burgundy)" opacity="0.5" />
            </svg>

            <h2
              className="rs-heading rs-heading--light"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
                margin: "0 0 0.75rem",
              }}
            >
              O Terroir
            </h2>
            <p
              style={{
                fontFamily: "var(--rs-font-serif)",
                fontStyle: "italic",
                color: "var(--rs-stone)",
                fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                maxWidth: "40ch",
                margin: "0 auto",
              }}
            >
              A identidade de cada vinho nasce da terra onde cresce.
            </p>
          </motion.div>

          {/* 3-column grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {TERROIR.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 40 }}
                  animate={terroirObs.inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: 0.2 + i * 0.15,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1] as const,
                  }}
                  style={{
                    background: "var(--rs-cream)",
                    borderRadius: "var(--rs-radius-lg)",
                    padding: "2.5rem 2rem",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Top accent line */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "20%",
                      right: "20%",
                      height: "3px",
                      background:
                        "linear-gradient(90deg, transparent, var(--rs-gold), transparent)",
                    }}
                  />

                  <Icon
                    size={32}
                    style={{
                      color: "var(--rs-burgundy)",
                      marginBottom: "1rem",
                    }}
                  />
                  <p
                    style={{
                      fontSize: "0.75rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--rs-stone)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--rs-font-serif)",
                      fontSize: "1.75rem",
                      fontWeight: 700,
                      color: "var(--rs-dark)",
                      margin: "0 0 1rem",
                      lineHeight: 1.2,
                    }}
                  >
                    {item.value}
                  </p>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      lineHeight: 1.7,
                      color: "var(--rs-stone)",
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4 — A REGIÃO DO DÃO
          ═══════════════════════════════════════════ */}
      <section
        style={{
          background: "var(--rs-cream)",
          padding: "clamp(4rem, 10vw, 8rem) 0",
          position: "relative",
        }}
      >
        {/* Subtle topographic line pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.035,
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 40px, var(--rs-dark) 40px, var(--rs-dark) 41px),
              repeating-linear-gradient(90deg, transparent, transparent 40px, var(--rs-dark) 40px, var(--rs-dark) 41px)
            `,
          }}
        />

        <div
          ref={regiaoObs.ref}
          className="rs-section"
          style={{
            paddingTop: 0,
            paddingBottom: 0,
            position: "relative",
            zIndex: 1,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={regiaoObs.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{ textAlign: "center", marginBottom: "3.5rem" }}
          >
            <p
              style={{
                fontSize: "0.8rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--rs-burgundy)",
                marginBottom: "0.75rem",
              }}
            >
              A Região
            </p>
            <h2
              className="rs-heading"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
                margin: "0 0 1rem",
              }}
            >
              Região do Dão
            </h2>
            <div
              style={{
                width: "60px",
                height: "2px",
                background:
                  "linear-gradient(90deg, transparent, var(--rs-gold), transparent)",
                margin: "0 auto",
              }}
            />
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
              alignItems: "start",
            }}
          >
            {/* Portugal map SVG with Dão highlighted */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={regiaoObs.inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "2rem",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "200px",
                  height: "340px",
                }}
              >
                {/* Simplified Portugal silhouette */}
                <svg
                  viewBox="0 0 200 340"
                  fill="none"
                  style={{ width: "100%", height: "100%" }}
                >
                  {/* Portugal outline (simplified) */}
                  <path
                    d="M100 10 C120 10, 150 30, 155 50 C160 70, 165 90, 158 110 C150 130, 155 150, 150 170 C145 190, 140 210, 135 230 C130 250, 120 270, 110 290 C100 310, 85 325, 80 330 C70 325, 55 310, 50 290 C45 270, 40 250, 42 230 C44 210, 48 190, 50 170 C52 150, 48 130, 50 110 C52 90, 55 70, 60 50 C65 30, 80 10, 100 10Z"
                    fill="var(--rs-cream-dark)"
                    stroke="var(--rs-stone)"
                    strokeWidth="1.5"
                  />
                  {/* Dão region highlight */}
                  <ellipse
                    cx="90"
                    cy="135"
                    rx="28"
                    ry="20"
                    fill="var(--rs-burgundy)"
                    opacity="0.35"
                    stroke="var(--rs-burgundy)"
                    strokeWidth="2"
                  />
                  {/* Dão label */}
                  <text
                    x="90"
                    y="138"
                    textAnchor="middle"
                    fill="var(--rs-burgundy)"
                    fontSize="13"
                    fontWeight="700"
                    fontFamily="var(--rs-font-serif)"
                  >
                    Dão
                  </text>
                  {/* Pin */}
                  <circle
                    cx="90"
                    cy="135"
                    r="4"
                    fill="var(--rs-gold)"
                    stroke="var(--rs-dark)"
                    strokeWidth="1.5"
                  />
                  {/* Mountain labels */}
                  <text
                    x="130"
                    y="125"
                    fill="var(--rs-stone)"
                    fontSize="8"
                    fontFamily="var(--rs-font-sans)"
                    opacity="0.7"
                  >
                    Serra da Estrela
                  </text>
                  <text
                    x="30"
                    y="140"
                    fill="var(--rs-stone)"
                    fontSize="8"
                    fontFamily="var(--rs-font-sans)"
                    opacity="0.7"
                  >
                    Caramulo
                  </text>
                  <text
                    x="65"
                    y="168"
                    fill="var(--rs-stone)"
                    fontSize="8"
                    fontFamily="var(--rs-font-sans)"
                    opacity="0.7"
                  >
                    Buçaco
                  </text>
                </svg>

                {/* MapPin icon */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "1rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    color: "var(--rs-burgundy)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                  }}
                >
                  <MapPin size={14} />
                  <span>Carregal do Sal</span>
                </div>
              </div>
            </motion.div>

            {/* Facts grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {REGION_FACTS.map((fact, i) => {
                const Icon = fact.icon;
                return (
                  <motion.div
                    key={fact.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={regiaoObs.inView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      delay: 0.3 + i * 0.12,
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1] as const,
                    }}
                    style={{
                      background: "var(--rs-white)",
                      borderRadius: "var(--rs-radius-lg)",
                      padding: "1.75rem 1.5rem",
                      border: "1px solid rgba(201,169,110,0.15)",
                      transition: "box-shadow 0.35s ease, transform 0.35s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow =
                        "0 8px 30px rgba(28,18,16,0.08)";
                      (e.currentTarget as HTMLDivElement).style.transform =
                        "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                      (e.currentTarget as HTMLDivElement).style.transform =
                        "translateY(0)";
                    }}
                  >
                    <Icon
                      size={24}
                      style={{
                        color: "var(--rs-burgundy)",
                        marginBottom: "0.75rem",
                      }}
                    />
                    <h3
                      style={{
                        fontFamily: "var(--rs-font-serif)",
                        fontSize: "1.05rem",
                        fontWeight: 700,
                        color: "var(--rs-dark)",
                        margin: "0 0 0.5rem",
                      }}
                    >
                      {fact.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.88rem",
                        lineHeight: 1.65,
                        color: "var(--rs-stone)",
                        margin: 0,
                      }}
                    >
                      {fact.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5 — AS CASTAS
          ═══════════════════════════════════════════ */}
      <section
        style={{
          background:
            "linear-gradient(180deg, var(--rs-dark) 0%, var(--rs-dark-soft) 100%)",
          padding: "clamp(4rem, 10vw, 8rem) 0",
        }}
      >
        <div
          ref={castasObs.ref}
          className="rs-section"
          style={{ paddingTop: 0, paddingBottom: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={castasObs.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{ textAlign: "center", marginBottom: "4rem" }}
          >
            <p
              style={{
                fontSize: "0.8rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--rs-gold)",
                marginBottom: "0.75rem",
              }}
            >
              Castas Nobres
            </p>
            <h2
              className="rs-heading rs-heading--light"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
                margin: "0 0 0.75rem",
              }}
            >
              As Nossas Castas
            </h2>
            <p
              style={{
                fontFamily: "var(--rs-font-serif)",
                fontStyle: "italic",
                color: "var(--rs-stone)",
                fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                maxWidth: "45ch",
                margin: "0 auto",
              }}
            >
              Castas autóctones, cultivadas com respeito pela tradição do Dão.
            </p>
          </motion.div>

          {/* Castas grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {CASTAS.map((casta, i) => {
              const isWhite = casta.type === "Branca";
              return (
                <motion.div
                  key={casta.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={castasObs.inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: 0.15 + i * 0.1,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1] as const,
                  }}
                  style={{
                    background: isWhite
                      ? "var(--rs-cream)"
                      : "rgba(114,47,55,0.15)",
                    borderRadius: "var(--rs-radius-lg)",
                    padding: "2rem 1.75rem",
                    border: `1px solid ${
                      isWhite
                        ? "rgba(201,169,110,0.2)"
                        : "rgba(201,169,110,0.12)"
                    }`,
                    cursor: "default",
                    transition:
                      "transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = "scale(1.02)";
                    el.style.borderColor = isWhite
                      ? "var(--rs-gold)"
                      : "var(--rs-burgundy-light)";
                    el.style.boxShadow = isWhite
                      ? "0 8px 30px rgba(201,169,110,0.15)"
                      : "0 8px 30px rgba(114,47,55,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = "scale(1)";
                    el.style.borderColor = isWhite
                      ? "rgba(201,169,110,0.2)"
                      : "rgba(201,169,110,0.12)";
                    el.style.boxShadow = "none";
                  }}
                >
                  {/* Header row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <Grape
                      size={22}
                      style={{
                        color: isWhite
                          ? "var(--rs-gold)"
                          : "var(--rs-burgundy-light)",
                      }}
                    />
                    <div>
                      <h3
                        style={{
                          fontFamily: "var(--rs-font-serif)",
                          fontSize: "1.2rem",
                          fontWeight: 700,
                          color: isWhite
                            ? "var(--rs-dark)"
                            : "var(--rs-cream)",
                          margin: 0,
                          lineHeight: 1.2,
                        }}
                      >
                        {casta.name}
                      </h3>
                      <span
                        style={{
                          fontSize: "0.72rem",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: isWhite
                            ? "var(--rs-stone)"
                            : "var(--rs-stone-light)",
                        }}
                      >
                        {casta.type}
                      </span>
                    </div>
                  </div>

                  <p
                    style={{
                      fontSize: "0.9rem",
                      lineHeight: 1.7,
                      color: isWhite
                        ? "var(--rs-stone)"
                        : "var(--rs-stone-light)",
                      margin: 0,
                    }}
                  >
                    {casta.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 6 — O CICLO DA VINHA
          ═══════════════════════════════════════════ */}
      <section
        style={{
          background: "var(--rs-cream)",
          padding: "clamp(4rem, 10vw, 8rem) 0",
        }}
      >
        <div
          ref={cicloObs.ref}
          className="rs-section"
          style={{ paddingTop: 0, paddingBottom: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={cicloObs.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{ textAlign: "center", marginBottom: "4rem" }}
          >
            <p
              style={{
                fontSize: "0.8rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--rs-burgundy)",
                marginBottom: "0.75rem",
              }}
            >
              As Estações
            </p>
            <h2
              className="rs-heading"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
                margin: "0 0 0.75rem",
              }}
            >
              O Ciclo da Vinha
            </h2>
            <p
              style={{
                fontFamily: "var(--rs-font-serif)",
                fontStyle: "italic",
                color: "var(--rs-stone)",
                fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                maxWidth: "40ch",
                margin: "0 auto",
              }}
            >
              Da poda à vindima, cada estação tem o seu ritmo.
            </p>
          </motion.div>

          {/* Season cards — horizontal scroll on mobile */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {SEASONS.map((season, i) => {
              const Icon = season.icon;
              return (
                <motion.div
                  key={season.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={cicloObs.inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: 0.2 + i * 0.12,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1] as const,
                  }}
                  style={{
                    background: season.gradient,
                    borderRadius: "var(--rs-radius-lg)",
                    padding: "2.5rem 2rem",
                    position: "relative",
                    overflow: "hidden",
                    minHeight: "220px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                  }}
                >
                  {/* Decorative circle */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-20px",
                      right: "-20px",
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      background: season.accent,
                      opacity: 0.08,
                    }}
                  />

                  <Icon
                    size={28}
                    style={{
                      color: season.accent,
                      marginBottom: "1rem",
                      opacity: 0.8,
                    }}
                  />
                  <h3
                    style={{
                      fontFamily: "var(--rs-font-serif)",
                      fontSize: "1.4rem",
                      fontWeight: 700,
                      color: "#fff",
                      margin: "0 0 0.5rem",
                    }}
                  >
                    {season.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      lineHeight: 1.65,
                      color: "rgba(255,255,255,0.7)",
                      margin: 0,
                    }}
                  >
                    {season.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 7 — GALLERY / ATMOSPHERE
          ═══════════════════════════════════════════ */}
      <section
        style={{
          background: "var(--rs-dark)",
          padding: "clamp(4rem, 10vw, 8rem) 0",
        }}
      >
        <div
          ref={galleryObs.ref}
          className="rs-section"
          style={{ paddingTop: 0, paddingBottom: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={galleryObs.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{ textAlign: "center", marginBottom: "3.5rem" }}
          >
            <h2
              className="rs-heading rs-heading--light"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
                margin: "0 0 0.75rem",
              }}
            >
              Atmosfera
            </h2>
            <p
              style={{
                fontFamily: "var(--rs-font-serif)",
                fontStyle: "italic",
                color: "var(--rs-stone)",
                fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
              }}
            >
              Fragmentos da vida na quinta.
            </p>
          </motion.div>

          {/* Masonry-style grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "auto",
              gap: "1rem",
            }}
          >
            {GALLERY.map((item, i) => {
              /* Masonry effect: alternate heights */
              const isLarge = i === 0 || i === 3 || i === 5;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={galleryObs.inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    delay: 0.1 + i * 0.1,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1] as const,
                  }}
                  style={{
                    position: "relative",
                    borderRadius: "var(--rs-radius-lg)",
                    overflow: "hidden",
                    height: isLarge ? "320px" : "240px",
                    cursor: "pointer",
                    transition: "transform 0.4s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = "scale(1.03)";
                    const caption = el.querySelector(
                      "[data-caption]"
                    ) as HTMLDivElement | null;
                    if (caption) {
                      caption.style.opacity = "1";
                      caption.style.transform = "translateY(0)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = "scale(1)";
                    const caption = el.querySelector(
                      "[data-caption]"
                    ) as HTMLDivElement | null;
                    if (caption) {
                      caption.style.opacity = "0";
                      caption.style.transform = "translateY(8px)";
                    }
                  }}
                >
                  {/* Background gradient */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: item.gradient,
                    }}
                  />
                  {/* Pattern overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: item.pattern,
                      backgroundSize:
                        i === 1 ? "20px 20px" : i === 3 ? "30px 30px" : "auto",
                    }}
                  />

                  {/* Caption */}
                  <div
                    data-caption
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "2rem 1.5rem 1.25rem",
                      background:
                        "linear-gradient(0deg, rgba(28,18,16,0.8) 0%, transparent 100%)",
                      opacity: 0,
                      transform: "translateY(8px)",
                      transition:
                        "opacity 0.4s ease, transform 0.4s ease",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--rs-font-serif)",
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: "var(--rs-cream)",
                        margin: 0,
                      }}
                    >
                      {item.title}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Responsive override for gallery — 2 cols on tablet, 1 on mobile */}
          <style>{`
            @media (max-width: 768px) {
              .rs-section > div:last-child {
                grid-template-columns: repeat(2, 1fr) !important;
              }
            }
            @media (max-width: 480px) {
              .rs-section > div:last-child {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CLOSING CTA
          ═══════════════════════════════════════════ */}
      <section
        style={{
          background:
            "linear-gradient(180deg, var(--rs-dark) 0%, var(--rs-burgundy) 50%, var(--rs-dark) 100%)",
          padding: "clamp(5rem, 12vw, 9rem) 1.5rem",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Decorative pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.04,
            backgroundImage: `radial-gradient(circle at 50% 50%, var(--rs-gold) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rs-heading rs-heading--light"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              margin: "0 0 1.25rem",
            }}
          >
            Descubra os Nossos Vinhos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{
              fontFamily: "var(--rs-font-serif)",
              fontStyle: "italic",
              color: "var(--rs-stone-light)",
              fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)",
              maxWidth: "40ch",
              margin: "0 auto 2.5rem",
              lineHeight: 1.6,
            }}
          >
            Nascidos deste terroir, moldados pelo tempo. Conheça a colecção
            Ribeiro Santo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
          >
            <Link
              href="/projetos/ribeirosanto/vinhos"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.9rem 2rem",
                background: "var(--rs-gold)",
                color: "var(--rs-dark)",
                fontFamily: "var(--rs-font-sans)",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: "var(--rs-radius)",
                transition:
                  "background 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "var(--rs-gold-light)";
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 6px 24px rgba(201,169,110,0.3)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "var(--rs-gold)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              <Grape size={16} />
              Ver Vinhos
            </Link>

            <Link
              href="/projetos/ribeirosanto/enoturismo"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.9rem 2rem",
                background: "transparent",
                color: "var(--rs-cream)",
                fontFamily: "var(--rs-font-sans)",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: "var(--rs-radius)",
                border: "1px solid rgba(201,169,110,0.35)",
                transition:
                  "border-color 0.35s ease, color 0.35s ease, transform 0.35s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "var(--rs-gold)";
                el.style.color = "var(--rs-gold)";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(201,169,110,0.35)";
                el.style.color = "var(--rs-cream)";
                el.style.transform = "translateY(0)";
              }}
            >
              <MapPin size={16} />
              Visitar a Quinta
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
