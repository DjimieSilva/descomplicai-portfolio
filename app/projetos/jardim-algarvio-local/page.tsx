"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";

import Nav from "./components/Nav";
import Hero from "./components/Hero";
import ServicesGrid from "./components/ServicesGrid";
import PricingPlans from "./components/PricingPlans";
import ServiceAreas from "./components/ServiceAreas";
import Reviews from "./components/Reviews";
import FAQ from "./components/FAQ";
import WhatsAppCTA from "./components/WhatsAppCTA";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

/* ------------------------------------------------------------------ */
/*  WhatsApp Floating Button                                           */
/* ------------------------------------------------------------------ */
function WhatsAppFloat() {
  return (
    <motion.a
      href="https://wa.me/351912345678?text=Ol%C3%A1%2C%20gostaria%20de%20pedir%20um%20or%C3%A7amento%20de%20jardinagem."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110"
      style={{ backgroundColor: "#25D366", boxShadow: "0 4px 20px rgba(37, 211, 102, 0.4)" }}
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
/*  Sticky Mobile CTA                                                  */
/* ------------------------------------------------------------------ */
function StickyMobileCTA() {
  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden flex gap-3 border-t px-4 py-3"
      style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.5, duration: 0.5 }}
    >
      <a
        href="tel:+351912345678"
        className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white"
        style={{ backgroundColor: "#16A34A" }}
        aria-label="Ligar agora"
      >
        <Phone className="h-4 w-4" />
        Ligar Agora
      </a>
      <a
        href="https://wa.me/351912345678?text=Ol%C3%A1%2C%20gostaria%20de%20pedir%20um%20or%C3%A7amento."
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 py-3 text-sm font-semibold"
        style={{ borderColor: "#16A34A", color: "#16A34A" }}
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </a>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function JardimAlgarvioLocalPage() {
  return (
    <>
      {/* Skip to main content (accessibility) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#16A34A] focus:text-white focus:px-4 focus:py-2 focus:rounded-xl focus:text-sm focus:font-semibold"
      >
        Saltar para o conteúdo principal
      </a>

      {/* Navigation */}
      <Nav />

      <main id="main-content">
        {/* 1. Hero — above the fold */}
        <Hero />

        {/* 2. Services Grid */}
        <ServicesGrid />

        {/* 3. Pricing Plans */}
        <PricingPlans />

        {/* 4. Service Areas */}
        <ServiceAreas />

        {/* 5. Reviews */}
        <Reviews />

        {/* 6. FAQ */}
        <FAQ />

        {/* 7. WhatsApp CTA Banner */}
        <WhatsAppCTA />

        {/* 8. Contact Form */}
        <ContactForm />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating elements */}
      <WhatsAppFloat />
      <StickyMobileCTA />
    </>
  );
}
