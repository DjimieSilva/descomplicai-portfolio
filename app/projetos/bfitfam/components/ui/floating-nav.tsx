"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface NavItem {
  label: string;
  href: string;
}

interface FloatingNavProps {
  brand: string;
  items: NavItem[];
  ctaLabel: string;
  ctaHref: string;
  brandColor?: string;
  ctaColor?: string;
}

export function FloatingNav({ brand, items, ctaLabel, ctaHref, brandColor = "#2563eb", ctaColor = "#25D366" }: FloatingNavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="text-xl font-bold" style={{ color: brandColor }}>
          {brand}
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors",
                scrolled ? "text-neutral-600 hover:text-neutral-900" : "text-white hover:text-white/80"
              )}
            >
              {item.label}
            </a>
          ))}
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: ctaColor }}
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
