const directions = [
  {
    id: "archive",
    number: "01",
    title: "Электронный фонограммархив",
    description: "Экспедиционные записи, исполнители, жанры и музыкальные традиции.",
  },
  {
    id: "museum",
    number: "02",
    title: "Музей музыкальных инструментов",
    description: "Каталог инструментов, 3D-модели, изображения и связанные фонограммы.",
  },
  {
    id: "science",
    number: "03",
    title: "Научная деятельность",
    description: "Публикации, исследователи, экспедиции и материалы лаборатории.",
  },
];

export default function PortalDirections() {
  return (
    <section className="pageWidth directionGrid" aria-label="Разделы портала">
      {directions.map((item) => (
        <a className="directionCard" id={item.id} href={`#${item.id}-content`} key={item.id}>
          <span className="directionNo">{item.number}</span>
          <div>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
          <span className="directionArrow" aria-hidden="true">↗</span>
        </a>
      ))}
    </section>
  );
}
