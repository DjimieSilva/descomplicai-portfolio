"use client";

import Hero from "./components/Hero";
import About from "./components/About";
import ForParents from "./components/ForParents";
import Services from "./components/Services";
import FirstVisit from "./components/FirstVisit";
import AgeGroups from "./components/AgeGroups";
import Locations from "./components/Locations";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function DentalkidPage() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <About />
      <ForParents />
      <Services />
      <AgeGroups />
      <FirstVisit />
      <Testimonials />
      <Locations />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
