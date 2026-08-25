export default function Header() {
  return (
    <header className="siteHeader">
      <div className="pageWidth headerInner">
        <a className="brand" href="#top" aria-label="На главную">
          <span className="brandMark">
            <img src="/logo.png" alt="" />
          </span>
          <span className="brandText">
            <strong>Лаборатория этномузыковедения им. Ю. И. Шейкина</strong>
            <small>Цифровой архив исследовательской коллекции</small>
          </span>
        </a>

        <nav className="desktopNav" aria-label="Основная навигация">
          <a className="isActive" href="#top">Главная</a>
          <a href="#about">О лаборатории</a>
          <a href="#archive">Фонограммархив</a>
          <a href="#museum">Музей</a>
          <a href="#contacts">Контакты</a>
        </nav>
      </div>
    </header>
  );
}
