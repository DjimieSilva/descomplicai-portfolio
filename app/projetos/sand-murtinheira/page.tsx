"use client";

import Hero from "./components/Hero";
import Story from "./components/Story";
import Menu from "./components/Menu";
import Gallery from "./components/Gallery";
import Chef from "./components/Chef";
import Experience from "./components/Experience";
import Location from "./components/Location";
import Reservations from "./components/Reservations";
import Footer from "./components/Footer";
import Nav from "./components/Nav";

export default function SandMurtinheiraPage() {
  return (
    <main className="bg-[#1C1917]">
      <Nav />
      <Hero />
      <Story />
      <Gallery />
      <Menu />
      <Chef />
      <Experience />
      <Location />
      <Reservations />
      <Footer />
    </main>
  );
}
