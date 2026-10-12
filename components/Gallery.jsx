const items = [
  "Экспедиционные материалы",
  "Полевые исследования",
  "Музыкальные инструменты",
  "Архив лаборатории",
];

export default function Gallery() {
  return (
    <section className="pageWidth contentPanel galleryPanel" id="museum-content">
      <div className="sectionHeading compact">
        <div>
          <span className="eyebrow dark">Коллекция</span>
          <h2>Фотогалерея</h2>
        </div>
        <a className="textLink" href="#">
          Перейти
          <svg className="inlineArrow" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14m-5-5 5 5-5 5" />
          </svg>
        </a>
      </div>
      <div className="galleryRail">
        {items.map((item, index) => (
          <article className={`galleryCard galleryCard${index + 1}`} key={item}>
            <div className="galleryScrim" />
            <span>{item}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
