import Hero from "./components/Hero";
import Story from "./components/Story";
import Specialties from "./components/Specialties";
import Menu from "./components/Menu";
import SpiceLevel from "./components/SpiceLevel";
import Drinks from "./components/Drinks";
import Gallery from "./components/Gallery";
import Reservations from "./components/Reservations";
import Location from "./components/Location";
import Footer from "./components/Footer";

export default function MesaDosAmigosPage() {
  return (
    <main>
      <Hero />
      <Story />
      <Specialties />
      <Menu />
      <SpiceLevel />
      <Drinks />
      <Gallery />
      <Reservations />
      <Location />
      <Footer />
    </main>
  );
}
