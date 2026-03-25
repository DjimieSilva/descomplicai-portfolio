"use client";

import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import Menu from "./components/Menu";
import Chef from "./components/Chef";
import WineSelection from "./components/WineSelection";
import Ambiance from "./components/Ambiance";
import Testimonials from "./components/Testimonials";
import PrivateDining from "./components/PrivateDining";
import Reservations from "./components/Reservations";
import Location from "./components/Location";
import Footer from "./components/Footer";

export default function OPicadeiroPage() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Philosophy />
      <Menu />
      <Chef />
      <WineSelection />
      <Ambiance />
      <Testimonials />
      <PrivateDining />
      <Reservations />
      <Location />
      <Footer />
    </main>
  );
}
