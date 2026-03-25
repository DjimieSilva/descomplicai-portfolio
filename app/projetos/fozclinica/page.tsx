"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Specialties } from "./components/Specialties";
import { DentalServices } from "./components/DentalServices";
import { WellnessServices } from "./components/WellnessServices";
import { Team } from "./components/Team";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

const WHATSAPP_URL =
  "https://wa.me/351918338954?text=Olá%2C%20gostaria%20de%20marcar%20uma%20consulta%20na%20Fozclinica.";

export default function FozclinicaPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* WhatsApp floating button */}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar via WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5C] rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transition-colors"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      >
        <MessageCircle className="w-7 h-7 text-white" fill="white" />
      </motion.a>

      <Hero />
      <About />
      <Specialties />
      <DentalServices />
      <WellnessServices />
      <Team />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
