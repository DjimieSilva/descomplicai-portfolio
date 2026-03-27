"use client";

import { motion } from "framer-motion";
import BotanicalDivider from "./BotanicalDivider";

function FloatingLeaf({
  delay,
  x,
  y,
  size,
  rotation,
  color,
}: {
  delay: number;
  x: string;
  y: string;
  size: number;
  rotation: number;
  color: string;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: [0, 0.7, 0.5, 0.7],
        y: [0, -15, 5, -10, 0],
        rotate: [rotation, rotation + 8, rotation - 5, rotation + 3, rotation],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 4 C28 8, 34 16, 34 24 C34 32, 28 38, 20 36 C12 34, 6 26, 8 18 C10 10, 16 4, 20 4Z"
          fill={color}
          fillOpacity={0.3}
        />
        <path
          d="M20 4 C20 14, 20 24, 20 36"
          stroke={color}
          strokeWidth="0.8"
          strokeOpacity={0.5}
        />
        <path
          d="M20 12 C16 14, 12 18, 10 20"
          stroke={color}
          strokeWidth="0.5"
          strokeOpacity={0.4}
        />
        <path
          d="M20 20 C24 22, 28 26, 30 28"
          stroke={color}
          strokeWidth="0.5"
          strokeOpacity={0.4}
        />
      </svg>
    </motion.div>
  );
}

export default function IllustratedHero() {
  const drawPath = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
  };

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
      style={{ backgroundColor: "#FBF1E0" }}
    >
      {/* Floating leaves */}
      <FloatingLeaf delay={0} x="8%" y="15%" size={45} rotation={-15} color="#2E7D32" />
      <FloatingLeaf delay={1.5} x="85%" y="20%" size={35} rotation={20} color="#4CAF50" />
      <FloatingLeaf delay={0.8} x="12%" y="70%" size={40} rotation={10} color="#43A047" />
      <FloatingLeaf delay={2} x="90%" y="65%" size={50} rotation={-25} color="#2E7D32" />
      <FloatingLeaf delay={1.2} x="50%" y="8%" size={30} rotation={5} color="#4CAF50" />

      {/* Main botanical SVG illustration */}
      <motion.div
        className="relative w-full max-w-2xl mx-auto mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <svg
          viewBox="0 0 800 500"
          fill="none"
          className="w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Olive tree trunk */}
          <motion.path
            d="M400 480 C398 460, 395 420, 390 380 C385 340, 375 300, 380 280 C385 260, 395 250, 400 240 C405 250, 415 260, 420 280 C425 300, 415 340, 410 380 C405 420, 402 460, 400 480Z"
            stroke="#3E2723"
            strokeWidth="2.5"
            fill="none"
            {...drawPath}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          {/* Trunk texture lines */}
          <motion.path
            d="M393 460 C394 440, 392 400, 390 370"
            stroke="#3E2723"
            strokeWidth="0.8"
            strokeOpacity={0.5}
            fill="none"
            {...drawPath}
            transition={{ duration: 1, delay: 0.3 }}
          />
          <motion.path
            d="M407 450 C406 430, 408 390, 410 360"
            stroke="#3E2723"
            strokeWidth="0.8"
            strokeOpacity={0.5}
            fill="none"
            {...drawPath}
            transition={{ duration: 1, delay: 0.35 }}
          />

          {/* Main canopy - large organic shape */}
          <motion.path
            d="M400 250 C350 240, 280 220, 260 200 C240 180, 250 150, 280 140 C310 130, 320 145, 330 150 C325 130, 310 110, 320 95 C330 80, 360 75, 375 90 C380 70, 395 55, 410 60 C425 55, 440 70, 445 90 C460 75, 490 80, 500 95 C510 110, 495 130, 490 150 C500 145, 510 130, 540 140 C570 150, 580 180, 560 200 C540 220, 470 240, 400 250Z"
            stroke="#2E7D32"
            strokeWidth="2"
            fill="none"
            {...drawPath}
            transition={{ duration: 1.8, delay: 0.5, ease: "easeInOut" }}
          />

          {/* Canopy fill - subtle */}
          <motion.path
            d="M400 250 C350 240, 280 220, 260 200 C240 180, 250 150, 280 140 C310 130, 320 145, 330 150 C325 130, 310 110, 320 95 C330 80, 360 75, 375 90 C380 70, 395 55, 410 60 C425 55, 440 70, 445 90 C460 75, 490 80, 500 95 C510 110, 495 130, 490 150 C500 145, 510 130, 540 140 C570 150, 580 180, 560 200 C540 220, 470 240, 400 250Z"
            fill="#2E7D32"
            fillOpacity={0.08}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
          />

          {/* Inner leaf details */}
          <motion.path
            d="M340 180 C330 170, 320 160, 310 165 C300 170, 310 180, 325 185"
            stroke="#2E7D32"
            strokeWidth="1.2"
            fill="none"
            {...drawPath}
            transition={{ duration: 0.8, delay: 1.5 }}
          />
          <motion.path
            d="M370 150 C365 140, 355 130, 345 135 C335 140, 345 150, 360 155"
            stroke="#2E7D32"
            strokeWidth="1.2"
            fill="none"
            {...drawPath}
            transition={{ duration: 0.8, delay: 1.6 }}
          />
          <motion.path
            d="M430 150 C435 140, 445 130, 455 135 C465 140, 455 150, 440 155"
            stroke="#2E7D32"
            strokeWidth="1.2"
            fill="none"
            {...drawPath}
            transition={{ duration: 0.8, delay: 1.7 }}
          />
          <motion.path
            d="M460 180 C470 170, 480 160, 490 165 C500 170, 490 180, 475 185"
            stroke="#2E7D32"
            strokeWidth="1.2"
            fill="none"
            {...drawPath}
            transition={{ duration: 0.8, delay: 1.8 }}
          />

          {/* Olives on tree */}
          {[
            { cx: 310, cy: 175 },
            { cx: 350, cy: 145 },
            { cx: 420, cy: 140 },
            { cx: 470, cy: 170 },
            { cx: 390, cy: 105 },
            { cx: 450, cy: 110 },
          ].map((olive, i) => (
            <motion.ellipse
              key={`olive-${i}`}
              cx={olive.cx}
              cy={olive.cy}
              rx="5"
              ry="6.5"
              fill="#2E7D32"
              fillOpacity={0.6}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 2 + i * 0.1 }}
            />
          ))}

          {/* Left: Lavender cluster */}
          <motion.g
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            {/* Stems */}
            <path d="M150 480 C155 440, 145 400, 140 370" stroke="#43A047" strokeWidth="1.5" fill="none" />
            <path d="M170 480 C172 440, 165 400, 160 365" stroke="#43A047" strokeWidth="1.5" fill="none" />
            <path d="M185 480 C180 445, 185 410, 180 375" stroke="#43A047" strokeWidth="1.5" fill="none" />
            {/* Lavender flowers */}
            {[
              { x: 140, y: 370 },
              { x: 160, y: 365 },
              { x: 180, y: 375 },
            ].map((pos, i) =>
              [0, -8, -16, -24, -32].map((offset, j) => (
                <ellipse
                  key={`lav-${i}-${j}`}
                  cx={pos.x + (j % 2 === 0 ? -1 : 1)}
                  cy={pos.y + offset}
                  rx="4"
                  ry="3"
                  fill="#8B7EC8"
                  fillOpacity={0.6 - j * 0.05}
                />
              ))
            )}
            {/* Lavender leaves */}
            <path d="M150 430 C140 425, 130 428, 135 435" stroke="#43A047" strokeWidth="1" fill="#43A047" fillOpacity={0.3} />
            <path d="M170 440 C180 435, 190 438, 185 445" stroke="#43A047" strokeWidth="1" fill="#43A047" fillOpacity={0.3} />
          </motion.g>

          {/* Right: Rosemary sprigs */}
          <motion.g
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            <path d="M620 480 C625 440, 630 400, 640 360" stroke="#2E7D32" strokeWidth="1.5" fill="none" />
            <path d="M645 480 C643 445, 650 410, 655 370" stroke="#2E7D32" strokeWidth="1.5" fill="none" />
            {/* Rosemary needle-like leaves */}
            {[360, 375, 390, 405, 420, 435, 450].map((y, i) => (
              <g key={`rm-${i}`}>
                <path
                  d={`M${640 + (i % 2 === 0 ? 0 : 2)} ${y} C${635 - i} ${y - 3}, ${630 - i} ${y - 2}, ${632 - i} ${y + 1}`}
                  stroke="#2E7D32"
                  strokeWidth="0.8"
                  fill="#2E7D32"
                  fillOpacity={0.25}
                />
                <path
                  d={`M${640 + (i % 2 === 0 ? 2 : 0)} ${y} C${645 + i} ${y - 3}, ${650 + i} ${y - 2}, ${648 + i} ${y + 1}`}
                  stroke="#2E7D32"
                  strokeWidth="0.8"
                  fill="#2E7D32"
                  fillOpacity={0.25}
                />
              </g>
            ))}
            {/* Right rosemary second stem */}
            {[370, 385, 400, 415, 430, 445].map((y, i) => (
              <g key={`rm2-${i}`}>
                <path
                  d={`M${655} ${y} C${650} ${y - 3}, ${645} ${y - 1}, ${647} ${y + 2}`}
                  stroke="#2E7D32"
                  strokeWidth="0.7"
                  fill="#2E7D32"
                  fillOpacity={0.2}
                />
                <path
                  d={`M${655} ${y} C${660} ${y - 3}, ${665} ${y - 1}, ${663} ${y + 2}`}
                  stroke="#2E7D32"
                  strokeWidth="0.7"
                  fill="#2E7D32"
                  fillOpacity={0.2}
                />
              </g>
            ))}
          </motion.g>

          {/* Far left: Bougainvillea */}
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6 }}
          >
            <path d="M80 480 C90 440, 75 410, 70 380 C65 350, 80 330, 95 310" stroke="#3E2723" strokeWidth="1.8" fill="none" />
            <path d="M95 310 C85 300, 70 295, 60 300" stroke="#3E2723" strokeWidth="1" fill="none" />
            <path d="M95 310 C100 298, 110 290, 120 295" stroke="#3E2723" strokeWidth="1" fill="none" />
            {/* Bougainvillea flower clusters */}
            {[
              { x: 60, y: 295 },
              { x: 95, y: 305 },
              { x: 120, y: 290 },
              { x: 75, y: 320 },
              { x: 105, y: 325 },
            ].map((pos, i) => (
              <g key={`boug-${i}`}>
                <path
                  d={`M${pos.x} ${pos.y} L${pos.x - 6} ${pos.y - 8} L${pos.x + 2} ${pos.y - 10} Z`}
                  fill="#D4552A"
                  fillOpacity={0.7}
                />
                <path
                  d={`M${pos.x} ${pos.y} L${pos.x + 7} ${pos.y - 7} L${pos.x + 9} ${pos.y + 1} Z`}
                  fill="#D4552A"
                  fillOpacity={0.6}
                />
                <path
                  d={`M${pos.x} ${pos.y} L${pos.x - 3} ${pos.y + 8} L${pos.x + 5} ${pos.y + 6} Z`}
                  fill="#D4552A"
                  fillOpacity={0.5}
                />
                <circle cx={pos.x + 1} cy={pos.y - 1} r="1.5" fill="#FBF1E0" fillOpacity={0.8} />
              </g>
            ))}
            {/* Leaves */}
            <path d="M80 370 C70 365, 60 370, 65 378" fill="#2E7D32" fillOpacity={0.3} />
            <path d="M85 350 C95 345, 100 350, 95 358" fill="#2E7D32" fillOpacity={0.3} />
          </motion.g>

          {/* Far right: Mediterranean herbs ground */}
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            {/* Ground herbs */}
            {[680, 700, 720, 740].map((x, i) => (
              <g key={`herb-${i}`}>
                <path
                  d={`M${x} 480 C${x - 3} 465, ${x + 2} 450, ${x - 1} 440`}
                  stroke="#43A047"
                  strokeWidth="1"
                  fill="none"
                />
                <path
                  d={`M${x - 1} 455 C${x - 8} 450, ${x - 10} 455, ${x - 6} 460`}
                  fill="#43A047"
                  fillOpacity={0.3}
                />
                <path
                  d={`M${x + 1} 450 C${x + 8} 445, ${x + 10} 450, ${x + 6} 455`}
                  fill="#43A047"
                  fillOpacity={0.3}
                />
              </g>
            ))}
          </motion.g>

          {/* Ground line */}
          <motion.path
            d="M0 480 C100 478, 200 482, 300 480 S500 478, 600 481 S700 479, 800 480"
            stroke="#3E2723"
            strokeWidth="1"
            strokeOpacity={0.3}
            fill="none"
            {...drawPath}
            transition={{ duration: 2, delay: 0.8 }}
          />
        </svg>
      </motion.div>

      {/* Title */}
      <motion.h1
        className="text-center mb-4 leading-tight"
        style={{
          fontFamily: "var(--font-libre-caslon), serif",
          color: "#2E7D32",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Onde a Natureza Encontra o Design
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-center max-w-xl mx-auto mb-10 text-lg leading-relaxed"
        style={{
          fontFamily: "var(--font-source-sans), sans-serif",
          color: "#3E2723",
          opacity: 0.85,
          fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        Criamos jardins que contam histórias no coração do Algarve
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        className="flex flex-wrap gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.1 }}
      >
        <a
          href="#jardins"
          className="px-8 py-4 text-base font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-[0.98]"
          style={{
            backgroundColor: "#D4552A",
            color: "#FBF1E0",
            fontFamily: "var(--font-source-sans), sans-serif",
            boxShadow: "0 4px 14px rgba(212,85,42,0.25)",
          }}
        >
          Descubra os Nossos Jardins
        </a>
        <a
          href="#historia"
          className="px-8 py-4 text-base font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:bg-[#2E7D32] hover:text-[#FBF1E0] hover:border-[#2E7D32] active:scale-[0.98]"
          style={{
            border: "2px solid #2E7D32",
            color: "#2E7D32",
            fontFamily: "var(--font-source-sans), sans-serif",
            backgroundColor: "transparent",
          }}
        >
          A Nossa História
        </a>
      </motion.div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <BotanicalDivider variant="olive" />
      </div>
    </section>
  );
}
