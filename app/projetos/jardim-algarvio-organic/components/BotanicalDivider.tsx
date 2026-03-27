"use client";

import { motion } from "framer-motion";

interface BotanicalDividerProps {
  color?: string;
  variant?: "olive" | "leaves" | "flowers";
}

export default function BotanicalDivider({
  color = "#4A5D23",
  variant = "olive",
}: BotanicalDividerProps) {
  const pathProps = {
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 1.5, ease: "easeInOut" as const },
  };

  return (
    <div className="flex items-center justify-center py-6">
      <svg
        viewBox="0 0 600 50"
        fill="none"
        className="w-full max-w-xl"
        style={{ height: "50px" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {variant === "olive" && (
          <>
            {/* Central vine */}
            <motion.path
              d="M50 25 C150 25, 200 20, 300 25 S450 30, 550 25"
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              {...pathProps}
            />
            {/* Left olive branch leaves */}
            <motion.path
              d="M120 25 C115 18, 105 15, 100 20 C95 25, 105 28, 120 25Z"
              fill={color}
              fillOpacity={0.6}
              {...pathProps}
              transition={{ ...pathProps.transition, delay: 0.3 }}
            />
            <motion.path
              d="M130 25 C135 32, 145 35, 150 30 C155 25, 145 22, 130 25Z"
              fill={color}
              fillOpacity={0.6}
              {...pathProps}
              transition={{ ...pathProps.transition, delay: 0.35 }}
            />
            {/* Olive fruit */}
            <motion.ellipse
              cx="160"
              cy="20"
              rx="4"
              ry="5.5"
              fill={color}
              fillOpacity={0.8}
              {...pathProps}
              transition={{ ...pathProps.transition, delay: 0.4 }}
            />
            {/* Center leaves */}
            <motion.path
              d="M270 25 C265 16, 255 12, 250 18 C245 24, 255 28, 270 25Z"
              fill={color}
              fillOpacity={0.5}
              {...pathProps}
              transition={{ ...pathProps.transition, delay: 0.5 }}
            />
            <motion.path
              d="M300 25 C305 16, 315 12, 320 18 C325 24, 315 28, 300 25Z"
              fill={color}
              fillOpacity={0.5}
              {...pathProps}
              transition={{ ...pathProps.transition, delay: 0.55 }}
            />
            <motion.path
              d="M330 25 C325 32, 315 36, 310 30 C305 24, 315 20, 330 25Z"
              fill={color}
              fillOpacity={0.5}
              {...pathProps}
              transition={{ ...pathProps.transition, delay: 0.6 }}
            />
            {/* Center olive fruit */}
            <motion.ellipse
              cx="290"
              cy="30"
              rx="4"
              ry="5.5"
              fill={color}
              fillOpacity={0.8}
              {...pathProps}
              transition={{ ...pathProps.transition, delay: 0.55 }}
            />
            {/* Right olive branch leaves */}
            <motion.path
              d="M430 25 C425 18, 415 15, 410 20 C405 25, 415 28, 430 25Z"
              fill={color}
              fillOpacity={0.6}
              {...pathProps}
              transition={{ ...pathProps.transition, delay: 0.7 }}
            />
            <motion.path
              d="M460 25 C465 32, 475 35, 480 30 C485 25, 475 22, 460 25Z"
              fill={color}
              fillOpacity={0.6}
              {...pathProps}
              transition={{ ...pathProps.transition, delay: 0.75 }}
            />
            <motion.ellipse
              cx="445"
              cy="20"
              rx="4"
              ry="5.5"
              fill={color}
              fillOpacity={0.8}
              {...pathProps}
              transition={{ ...pathProps.transition, delay: 0.8 }}
            />
          </>
        )}

        {variant === "leaves" && (
          <>
            <motion.path
              d="M80 25 C200 25, 250 22, 300 25 S400 28, 520 25"
              stroke={color}
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
              {...pathProps}
            />
            {[140, 220, 300, 380, 460].map((x, i) => (
              <motion.path
                key={i}
                d={
                  i % 2 === 0
                    ? `M${x} 25 Q${x - 8} 14, ${x - 16} 17 Q${x - 8} 20, ${x} 25Z`
                    : `M${x} 25 Q${x + 8} 36, ${x + 16} 33 Q${x + 8} 30, ${x} 25Z`
                }
                fill={color}
                fillOpacity={0.5}
                {...pathProps}
                transition={{ ...pathProps.transition, delay: 0.2 + i * 0.15 }}
              />
            ))}
            {/* Small dots as berries */}
            {[180, 260, 340, 420].map((x, i) => (
              <motion.circle
                key={`dot-${i}`}
                cx={x}
                cy={i % 2 === 0 ? 21 : 29}
                r="2.5"
                fill={color}
                fillOpacity={0.7}
                {...pathProps}
                transition={{ ...pathProps.transition, delay: 0.3 + i * 0.12 }}
              />
            ))}
          </>
        )}

        {variant === "flowers" && (
          <>
            <motion.path
              d="M60 25 C180 25, 220 22, 300 25 S420 28, 540 25"
              stroke={color}
              strokeWidth="1"
              strokeLinecap="round"
              strokeDasharray="4 6"
              fill="none"
              {...pathProps}
            />
            {[150, 300, 450].map((x, i) => {
              // Precomputed offsets for angles [0, 72, 144, 216, 288] at radius 7
              const petalOffsets = [
                { dx: 7, dy: 0, angle: 0 },
                { dx: 2.16, dy: 6.66, angle: 72 },
                { dx: -5.66, dy: 4.11, angle: 144 },
                { dx: -5.66, dy: -4.11, angle: 216 },
                { dx: 2.16, dy: -6.66, angle: 288 },
              ];
              return (
              <g key={i}>
                {/* Petals */}
                {petalOffsets.map((p, j) => (
                    <motion.ellipse
                      key={j}
                      cx={x + p.dx}
                      cy={25 + p.dy}
                      rx="4"
                      ry="2.5"
                      fill={color}
                      fillOpacity={0.4}
                      transform={`rotate(${p.angle} ${x + p.dx} ${25 + p.dy})`}
                      {...pathProps}
                      transition={{
                        ...pathProps.transition,
                        delay: 0.3 + i * 0.2 + j * 0.05,
                      }}
                    />
                  ))}
                {/* Center */}
                <motion.circle
                  cx={x}
                  cy={25}
                  r="3"
                  fill={color}
                  fillOpacity={0.8}
                  {...pathProps}
                  transition={{ ...pathProps.transition, delay: 0.5 + i * 0.2 }}
                />
              </g>
            );
            })}
            {/* Small leaves between flowers */}
            {[220, 375].map((x, i) => (
              <motion.path
                key={`fl-${i}`}
                d={`M${x} 25 C${x - 5} 19, ${x - 12} 18, ${x - 10} 22 C${x - 8} 26, ${x - 3} 27, ${x} 25Z`}
                fill={color}
                fillOpacity={0.5}
                {...pathProps}
                transition={{ ...pathProps.transition, delay: 0.6 + i * 0.15 }}
              />
            ))}
          </>
        )}
      </svg>
    </div>
  );
}
