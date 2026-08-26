"use client";

import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

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
          <a href="#map">Этносы</a>
          <a href="#archive-content">Фонограммархив</a>
          <a href="#museum">Музей</a>
          <a href="#science">Исследования</a>
          <a href="#sheykin">Ю. И. Шейкин</a>
        </nav>

        <button
          className={menuOpen ? "menuToggle isOpen" : "menuToggle"}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          className={menuOpen ? "mobileNav isOpen" : "mobileNav"}
          id="mobile-navigation"
          aria-label="Мобильная навигация"
        >
          <a href="#map" onClick={closeMenu}>Этносы</a>
          <a href="#archive-content" onClick={closeMenu}>Фонограммархив</a>
          <a href="#museum" onClick={closeMenu}>Музей</a>
          <a href="#science" onClick={closeMenu}>Исследования</a>
          <a href="#sheykin" onClick={closeMenu}>Ю. И. Шейкин</a>
        </nav>
      </div>
    </header>
  );
}
