import React, { useState } from "react";
import PropTypes from "prop-types";
import "./LoginIconMenu.css";

export default function LoginIconMenu({ nameLoginIcon = "LoginIconFull.svg", onEditProfile, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Состояние для отображения меню

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState); // Переключаем состояние меню
  };

  return (
    <div className="login-icon-menu">
      <img
        src={`/${nameLoginIcon}`}
        alt="Login Icon"
        onClick={toggleMenu} // Открываем/закрываем меню по клику
        className="login-icon"
      />
      {isMenuOpen && (
        <div className="menu-dropdown">
          <button onClick={onEditProfile} className="menu-button">Изменить данные</button>
          <button onClick={onLogout} className="menu-button">Выйти</button>
        </div>
      )}
    </div>
  );
}

