import IllustratedHero from "./components/IllustratedHero";
import OurStory from "./components/OurStory";
import GardenGallery from "./components/GardenGallery";
import SeasonalServices from "./components/SeasonalServices";
import GardenTips from "./components/GardenTips";
import Team from "./components/Team";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function JardimAlgarvioOrganicPage() {
  return (
    <main className="overflow-x-hidden">
      <IllustratedHero />
      <OurStory />
      <GardenGallery />
      <SeasonalServices />
      <GardenTips />
      <Team />
      <Contact />
      <Footer />
    </main>
  );
}
