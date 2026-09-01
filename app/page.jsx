import Header from "../components/Header";
import Hero from "../components/Hero";
import EthnicMap from "../components/EthnicMap";
import PortalDirections from "../components/PortalDirections";
import AudioArchive from "../components/AudioArchive";
import Sheykin from "../components/Sheykin";
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
          <Sheykin />
          <Gallery />
        </div>
      </main>
      <footer className="footer">
        <div className="pageWidth footerInner">
          <div className="footerIdentity">
            <strong>Лаборатория этномузыковедения им. Ю. И. Шейкина</strong>
            <span>Цифровой архив исследовательской коллекции</span>
          </div>
          <div className="footerContacts" id="contacts">
            <span className="footerLabel">Контакты</span>
            <a href="mailto:info@ethnomusic-lab.ru">info@ethnomusic-lab.ru</a>
            <a href="tel:+74112000000">+7 (4112) 00-00-00</a>
            <span>Якутск, Республика Саха (Якутия)</span>
          </div>
          <div className="footerMeta">
            <span>Информация для прототипа</span>
            <span>© 2026</span>
          </div>
        </div>
      </footer>
    </>
  );
}
