"use client";

import React, { useRef, useCallback, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
} from "framer-motion";
import { cn } from "@/lib/utils";

type BaseProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  href?: string;
};

type ButtonProps = BaseProps &
  Omit<HTMLMotionProps<"button">, keyof BaseProps> & { href?: undefined };

type AnchorProps = BaseProps &
  Omit<HTMLMotionProps<"a">, keyof BaseProps> & { href: string };

export type MagneticButtonProps = ButtonProps | AnchorProps;

const springConfig = { stiffness: 250, damping: 20, mass: 0.5 };

export function MagneticButton({
  children,
  className,
  strength = 0.3,
  href,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [hasHover, setHasHover] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    setHasHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!hasHover || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * strength);
      y.set((e.clientY - cy) * strength);
    },
    [hasHover, strength, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const sharedProps = {
    ref: ref as React.Ref<never>,
    className: cn(
      "inline-flex items-center justify-center min-h-[44px] min-w-[44px]",
      className
    ),
    style: { x: springX, y: springY },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    ...props,
  };

  if (href) {
    return (
      <motion.a href={href} {...(sharedProps as HTMLMotionProps<"a">)}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button {...(sharedProps as HTMLMotionProps<"button">)}>
      {children}
    </motion.button>
  );
}
