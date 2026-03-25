"use client";

import Hero from "./components/Hero";
import About from "./components/About";
import Menu from "./components/Menu";
import Specialties from "./components/Specialties";
import Terrace from "./components/Terrace";
import Reviews from "./components/Reviews";
import Gallery from "./components/Gallery";
import Hours from "./components/Hours";
import Location from "./components/Location";
import Footer from "./components/Footer";

export default function CafePraca18Page() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <About />
      <Menu />
      <Specialties />
      <Terrace />
      <Reviews />
      <Gallery />
      <Hours />
      <Location />
      <Footer />
    </main>
  );
}
