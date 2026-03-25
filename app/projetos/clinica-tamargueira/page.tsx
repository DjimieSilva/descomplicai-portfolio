"use client";

import Hero from "./components/Hero";
import About from "./components/About";
import ImplantologySection from "./components/ImplantologySection";
import Services from "./components/Services";
import BeforeAfter from "./components/BeforeAfter";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function ClinicaTamargueira() {
  return (
    <main>
      <Hero />
      <About />
      <ImplantologySection />
      <Services />
      <BeforeAfter />
      <Team />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
