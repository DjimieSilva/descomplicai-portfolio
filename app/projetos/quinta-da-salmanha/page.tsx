import Hero from "./components/Hero";
import Estate from "./components/Estate";
import Restaurant from "./components/Restaurant";
import Buffet from "./components/Buffet";
import RiverView from "./components/RiverView";
import Events from "./components/Events";
import Menu from "./components/Menu";
import Gallery from "./components/Gallery";
import Reservations from "./components/Reservations";
import Location from "./components/Location";
import Footer from "./components/Footer";

export default function QuintaDaSalmanhaPage() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Estate />
      <Restaurant />
      <Buffet />
      <RiverView />
      <Events />
      <Menu />
      <Gallery />
      <Reservations />
      <Location />
      <Footer />
    </main>
  );
}
