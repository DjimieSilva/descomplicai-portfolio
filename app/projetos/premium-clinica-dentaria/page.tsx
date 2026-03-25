"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";

import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import Services from "./components/Services";
import PreventionProgram from "./components/PreventionProgram";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

/* ------------------------------------------------------------------ */
/*  WhatsApp Floating Button                                           */
/* ------------------------------------------------------------------ */
function WhatsAppFloat() {
  return (
    <motion.a
      href="https://wa.me/351910000000?text=Ol%C3%A1%2C%20gostaria%20de%20marcar%20uma%20consulta%20na%20Premium%20Cl%C3%ADnica."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/40 transition-transform hover:scale-110"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      aria-label="Contactar via WhatsApp"
    >
      <MessageCircle className="h-7 w-7 text-white" fill="white" />
    </motion.a>
  );
}

/* ------------------------------------------------------------------ */
/*  Phone CTA sticky (mobile)                                          */
/* ------------------------------------------------------------------ */
function StickyPhoneCTA() {
  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-[#D1FAE5] px-4 py-3 flex gap-3"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.5, duration: 0.5 }}
    >
      <a
        href="tel:+351233000000"
        className="flex-1 flex items-center justify-center gap-2 bg-[#064E3B] text-white py-3 rounded-xl text-sm font-semibold"
        aria-label="Ligar para a clínica"
      >
        <Phone className="w-4 h-4" />
        Ligar agora
      </a>
      <a
        href="#contacto"
        className="flex-1 flex items-center justify-center gap-2 border border-[#064E3B] text-[#064E3B] py-3 rounded-xl text-sm font-semibold"
      >
        Marcar consulta
      </a>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function PremiumClinicaPage() {
  // Ensure DM Sans is loaded for headings as fallback to --font-sora
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--font-premium-heading",
      "var(--font-sora), 'DM Sans', sans-serif"
    );
  }, []);

  return (
    <>
      {/* Skip to main content (accessibility) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#064E3B] focus:text-white focus:px-4 focus:py-2 focus:rounded-xl focus:text-sm focus:font-semibold"
      >
        Saltar para o conteúdo principal
      </a>

      <main id="main-content">
        {/* 1. Hero — above the fold */}
        <Hero />

        {/* 2. Philosophy — prevention focus */}
        <Philosophy />

        {/* 3. Services — all 8 areas */}
        <Services />

        {/* 4. Prevention Program — with check-up schedules */}
        <PreventionProgram />

        {/* 5. Team */}
        <Team />

        {/* 6. Testimonials */}
        <Testimonials />

        {/* 7. FAQ */}
        <FAQ />

        {/* 8. Contact */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating elements */}
      <WhatsAppFloat />
      <StickyPhoneCTA />
    </>
  );
}
