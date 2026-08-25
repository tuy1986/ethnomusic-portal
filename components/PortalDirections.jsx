const directions = [
  {
    id: "archive",
    number: "01",
    kicker: "Аудиоколлекция",
    icon: "archive",
    title: "Электронный фонограммархив",
    description: "Экспедиционные записи, исполнители, жанры и музыкальные традиции.",
  },
  {
    id: "museum",
    number: "02",
    kicker: "3D-экспозиция",
    icon: "museum",
    title: "Музей музыкальных инструментов",
    description: "Каталог инструментов, 3D-модели, изображения и связанные фонограммы.",
  },
  {
    id: "science",
    number: "03",
    kicker: "Исследования",
    icon: "science",
    title: "Научная деятельность",
    description: "Публикации, исследователи, экспедиции и материалы лаборатории.",
  },
];

function DirectionIcon({ type }) {
  if (type === "archive") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M8 32h7l4-12 7 25 7-34 7 42 6-28 4 7h6" />
        <path d="M13 12.5A27 27 0 0 0 13 51.5M51 12.5A27 27 0 0 1 51 51.5" opacity=".48" />
      </svg>
    );
  }

  if (type === "museum") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M12 48h40M17 48V26h30v22M14 26l18-12 18 12M24 26v22M40 26v22" />
        <path d="M28 36c0-3 2-5 4-5s4 2 4 5-2 7-4 10c-2-3-4-7-4-10Z" opacity=".72" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M11 17c8-2 15 0 21 5v30c-6-5-13-7-21-5V17Zm42 0c-8-2-15 0-21 5v30c6-5 13-7 21-5V17Z" />
      <circle cx="32" cy="16" r="4" />
      <path d="M20 12c3-4 7-7 12-7s9 3 12 7" opacity=".55" />
    </svg>
  );
}

export default function PortalDirections() {
  return (
    <section className="pageWidth directionGrid" aria-label="Разделы портала">
      {directions.map((item) => (
        <a
          className={`directionCard directionCard-${item.id}`}
          id={item.id}
          href={`#${item.id}-content`}
          key={item.id}
        >
          <div className="directionCardTop">
            <span className="directionNo">{item.number}</span>
            <span className="directionArrow" aria-hidden="true">↗</span>
          </div>
          <span className="directionIcon">
            <DirectionIcon type={item.icon} />
          </span>
          <div className="directionCopy">
            <span className="directionKicker">{item.kicker}</span>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
          <span className="directionCta">Открыть раздел <span aria-hidden="true">→</span></span>
        </a>
      ))}
    </section>
  );
}
