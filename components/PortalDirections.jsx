const directions = [
  {
    id: "archive",
    href: "#archive-content",
    image: "/portal/archive-card.svg",
    title: "Электронный фонограммархив",
  },
  {
    id: "museum",
    href: "/museum-prototype.html",
    image: "/portal/museum-card.svg",
    title: "Музей музыкальных инструментов",
  },
  {
    id: "science",
    href: "#",
    image: "/portal/science-card.svg",
    title: "Научная деятельность",
  },
];

export default function PortalDirections() {
  return (
    <section className="pageWidth directionGrid" aria-label="Разделы портала">
      {directions.map((item) => (
        <a
          className={`directionCard directionCard-${item.id}`}
          id={item.id}
          href={item.href}
          aria-label={item.title}
          key={item.id}
        >
          <img src={item.image} alt="" width="437" height="295" />
          <span className="directionTitleAccent" aria-hidden="true" />
        </a>
      ))}
    </section>
  );
}
