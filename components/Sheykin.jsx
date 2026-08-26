export default function Sheykin() {
  return (
    <section className="pageWidth contentPanel sheykinPanel" id="sheykin">
      <div className="sheykinPhoto">
        <img
          src="/sheykin-archive.jpg"
          alt="Юрий Ильич Шейкин во время работы с архивными материалами"
        />
        <span>Из архива лаборатории</span>
      </div>

      <div className="sheykinCopy">
        <span className="eyebrow dark">Научная школа</span>
        <h2>Юрий Ильич Шейкин</h2>
        <p className="sheykinLead">
          Доктор искусствоведения, профессор, исследователь музыкальных культур
          народов Сибири и Дальнего Востока.
        </p>
        <p>
          Собранные и систематизированные им материалы стали основой уникального
          фольклорного архива и коллекции традиционных музыкальных инструментов.
          Цифровой портал продолжает эту исследовательскую работу и открывает
          коллекцию для новых поколений.
        </p>
        <a
          className="auroraTextLink"
          href="https://old2025.agiki.ru/life/institut-segodnya.php"
          target="_blank"
          rel="noreferrer"
        >
          О научной школе
          <svg className="auroraButtonArrow" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14m-5-5 5 5-5 5" />
          </svg>
        </a>
      </div>
    </section>
  );
}
