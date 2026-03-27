"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Phone } from "lucide-react";

export default function WhatsAppCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="py-16 sm:py-20"
      style={{
        background: "linear-gradient(135deg, #16A34A 0%, #15803D 100%)",
      }}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2
            className="text-3xl font-bold text-white sm:text-4xl"
            style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
          >
            Orçamento em 5 Minutos
          </h2>
          <p className="mt-4 text-lg text-white/90 max-w-xl mx-auto">
            Envie-nos uma mensagem no WhatsApp e receba o seu orçamento gratuito
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/351912345678?text=Ol%C3%A1%2C%20gostaria%20de%20pedir%20um%20or%C3%A7amento%20de%20jardinagem."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl px-8 py-4 text-base font-semibold transition-transform hover:scale-105"
              style={{ backgroundColor: "#FFFFFF", color: "#16A34A" }}
            >
              <MessageCircle className="h-5 w-5" />
              Enviar Mensagem no WhatsApp
            </a>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-white/80">
            <Phone className="h-4 w-4" />
            <span className="text-sm font-medium">+351 912 345 678</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
