"use client";

import Hero from "./components/Hero";
import Concept from "./components/Concept";
import Menu from "./components/Menu";
import Drinks from "./components/Drinks";
import Atmosphere from "./components/Atmosphere";
import Gallery from "./components/Gallery";
import Reservations from "./components/Reservations";
import Location from "./components/Location";
import Hours from "./components/Hours";
import Footer from "./components/Footer";

export default function PeNoBairroPage() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Concept />
      <Menu />
      <Drinks />
      <Atmosphere />
      <Gallery />
      <Reservations />
      <Location />
      <Hours />
      <Footer />
    </main>
  );
}
