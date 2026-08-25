import Header from "../components/Header";
import Hero from "../components/Hero";
import EthnicMap from "../components/EthnicMap";
import PortalDirections from "../components/PortalDirections";
import AudioArchive from "../components/AudioArchive";
import Gallery from "../components/Gallery";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <div className="contentSurface">
          <EthnicMap />
          <PortalDirections />
          <AudioArchive />
          <Gallery />
        </div>
      </main>
      <footer className="footer">
        <div className="pageWidth footerInner">
          <span>Лаборатория этномузыковедения им. Ю. И. Шейкина</span>
          <span>Цифровой архив исследовательской коллекции</span>
        </div>
      </footer>
    </>
  );
}
