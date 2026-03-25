import Hero from "./components/Hero";
import Story from "./components/Story";
import FreshCatch from "./components/FreshCatch";
import Menu from "./components/Menu";
import SeaView from "./components/SeaView";
import Gallery from "./components/Gallery";
import Reservations from "./components/Reservations";
import Location from "./components/Location";
import Footer from "./components/Footer";

export default function MaregrafoPage() {
  return (
    <main>
      <Hero />
      <Story />
      <FreshCatch />
      <Menu />
      <SeaView />
      <Gallery />
      <Reservations />
      <Location />
      <Footer />
    </main>
  );
}
