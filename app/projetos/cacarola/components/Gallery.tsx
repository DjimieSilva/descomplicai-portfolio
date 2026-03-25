"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const galleryItems = [
  {
    label: "Cozido à Portuguesa",
    sublabel: "O prato dos domingos",
    size: "large",
    gradient: "linear-gradient(135deg, #7C2D12 0%, #C2410C 100%)",
    pattern: "radial",
  },
  {
    label: "Bacalhau à Brás",
    sublabel: "Receita de família",
    size: "small",
    gradient: "linear-gradient(160deg, #92400E 0%, #D97706 100%)",
    pattern: "lines",
  },
  {
    label: "Azulejos Tradicionais",
    sublabel: "A alma do espaço",
    size: "small",
    gradient: "linear-gradient(120deg, #4D7C0F 0%, #365314 100%)",
    pattern: "tile",
  },
  {
    label: "Mesa Preparada",
    sublabel: "Pronto para receber",
    size: "small",
    gradient: "linear-gradient(140deg, #92400E 0%, #78350F 100%)",
    pattern: "dots",
  },
  {
    label: "Feijoada da Casa",
    sublabel: "Feita com alma",
    size: "small",
    gradient: "linear-gradient(135deg, #C2410C 0%, #9A3412 100%)",
    pattern: "cross",
  },
  {
    label: "Caçarola Dois",
    sublabel: "O espaço irmão",
    size: "large",
    gradient: "linear-gradient(160deg, #451A03 0%, #7C2D12 100%)",
    pattern: "radial",
  },
];

function GalleryCard({
  item,
  index,
}: {
  item: (typeof galleryItems)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const patternSvg = () => {
    switch (item.pattern) {
      case "radial":
        return `<circle cx="50%" cy="50%" r="45%" fill="none" stroke="white" stroke-width="1" opacity="0.3"/><circle cx="50%" cy="50%" r="30%" fill="none" stroke="white" stroke-width="0.5" opacity="0.2"/><circle cx="50%" cy="50%" r="15%" fill="none" stroke="white" stroke-width="0.5" opacity="0.15"/>`;
      case "lines":
        return `<line x1="0" y1="0" x2="100%" y2="100%" stroke="white" stroke-width="1" opacity="0.2"/><line x1="0" y1="30%" x2="100%" y2="130%" stroke="white" stroke-width="0.5" opacity="0.15"/>`;
      case "tile":
        return `<rect x="10%" y="10%" width="80%" height="80%" fill="none" stroke="white" stroke-width="1" opacity="0.3"/><rect x="25%" y="25%" width="50%" height="50%" fill="none" stroke="white" stroke-width="0.5" opacity="0.2"/>`;
      case "dots":
        return `<circle cx="25%" cy="25%" r="3" fill="white" opacity="0.3"/><circle cx="75%" cy="25%" r="3" fill="white" opacity="0.3"/><circle cx="50%" cy="50%" r="4" fill="white" opacity="0.25"/><circle cx="25%" cy="75%" r="3" fill="white" opacity="0.3"/><circle cx="75%" cy="75%" r="3" fill="white" opacity="0.3"/>`;
      case "cross":
        return `<line x1="50%" y1="0" x2="50%" y2="100%" stroke="white" stroke-width="0.8" opacity="0.2"/><line x1="0" y1="50%" x2="100%" y2="50%" stroke="white" stroke-width="0.8" opacity="0.2"/>`;
      default:
        return "";
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      className={`relative overflow-hidden group cursor-pointer ${
        item.size === "large" ? "row-span-2" : ""
      }`}
      style={{
        background: item.gradient,
        minHeight: item.size === "large" ? "320px" : "150px",
      }}
    >
      {/* SVG pattern overlay */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        dangerouslySetInnerHTML={{ __html: patternSvg() }}
      />

      {/* Azulejo border decoration */}
      <div className="absolute inset-3 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <rect x="0" y="0" width="100" height="100" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Hover overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{ background: "rgba(0,0,0,0.25)" }}
      />

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p
          className="text-xs tracking-[0.3em] uppercase mb-1 opacity-75"
          style={{ fontFamily: "var(--font-inter)", color: "#FDE68A" }}
        >
          {item.sublabel}
        </p>
        <h4
          className="text-lg font-bold leading-tight"
          style={{ fontFamily: "var(--font-source-serif-4)", color: "#FFFBEB" }}
        >
          {item.label}
        </h4>
      </div>

      {/* Corner ornament */}
      <div className="absolute top-3 right-3 opacity-30">
        <svg width="20" height="20" viewBox="0 0 20 20">
          <rect x="1" y="1" width="18" height="18" fill="none" stroke="white" strokeWidth="1" />
          <rect x="4" y="4" width="12" height="12" fill="none" stroke="white" strokeWidth="0.5" />
        </svg>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="py-24 px-6"
      style={{ background: "#FFFBEB" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p
            className="text-xs tracking-[0.45em] uppercase mb-4"
            style={{ color: "#C2410C", fontFamily: "var(--font-inter)" }}
          >
            Galeria
          </p>
          <h2
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: "var(--font-source-serif-4)", color: "#7C2D12" }}
          >
            Imagens da Casa
          </h2>
          <p
            className="text-base max-w-lg mx-auto"
            style={{ color: "#78350F", fontFamily: "var(--font-inter)" }}
          >
            A cozinha, os pratos, os espaços. Tudo o que faz do Caçarola o lugar que é.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[160px]">
          {galleryItems.map((item, i) => (
            <GalleryCard key={item.label} item={item} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center text-xs mt-8"
          style={{ color: "#92400E", fontFamily: "var(--font-inter)" }}
        >
          Siga-nos nas redes sociais para ver mais do dia-a-dia da nossa cozinha
        </motion.p>
      </div>
    </section>
  );
}
