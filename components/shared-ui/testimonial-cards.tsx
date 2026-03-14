"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

interface TestimonialCardsProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
  accentColor?: string;
  className?: string;
}

export function TestimonialCards({ testimonials, title, subtitle, accentColor = "#2563eb", className }: TestimonialCardsProps) {
  return (
    <section className={cn("py-24 px-6", className)}>
      <div className="mx-auto max-w-6xl">
        {title && (
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-neutral-900">{title}</h2>
            {subtitle && <p className="mt-3 text-lg text-neutral-500">{subtitle}</p>}
          </div>
        )}
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4"
                    fill={j < t.rating ? accentColor : "#e5e7eb"}
                    stroke="none"
                  />
                ))}
              </div>
              <p className="mb-4 text-sm leading-relaxed text-neutral-600">
                &ldquo;{t.content}&rdquo;
              </p>
              <div>
                <p className="font-semibold text-neutral-900">{t.name}</p>
                <p className="text-xs text-neutral-400">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
