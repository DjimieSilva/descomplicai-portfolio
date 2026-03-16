"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right";

type StaggerContainerProps = {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  direction?: Direction;
  once?: boolean;
};

const parentVariants = (staggerDelay: number): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
    },
  },
});

const childVariants: Record<Direction, Variants> = {
  up: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
};

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.08,
  direction = "up",
  once = true,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={cn(className)}
      variants={parentVariants(staggerDelay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={childVariants[direction]}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
