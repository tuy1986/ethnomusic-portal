export default function Hero() {
  return (
    <>
      <div className="siteVideoBackground" aria-hidden="true">
        <video autoPlay muted loop playsInline poster="/hero-poster.jpg" preload="metadata">
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="siteVideoShade" />
      </div>

      <section className="hero" id="top" aria-label="Лаборатория этномузыковедения">
        <div className="pageWidth heroContent">
          <div className="heroTitle">
            <span className="eyebrow">Исследовательская коллекция</span>
            <h1>Музыкальные традиции народов Сибири</h1>
            <p>
              Фонограммы, музыкальные инструменты, экспедиционные материалы и
              научные публикации в едином цифровом пространстве.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
