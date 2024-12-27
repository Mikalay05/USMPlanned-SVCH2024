// SliderButton.jsx
import React from "react";
import PropTypes from "prop-types";
import "./SliderButton.css";
//TODO поворот иконок в зависимости от медиа запроса
export default function SliderButton({
  direction,
  onClick,
  isDisabled,
  icon = "Icon-SliderIndex.svg",
  rotation = 0, // Угол поворота по умолчанию
}) {
  return (
    <button
      className={`slider-button ${direction}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      <img
        className={`${direction}-slider-index`}
        src={icon}
        alt={direction === "prev" ? "Previous" : "Next"}
        style={{ transform: `rotate(${rotation}deg)` }} // Угол поворота для стандартного экрана
      />
    </button>
  );
}

SliderButton.propTypes = {
  direction: PropTypes.oneOf(["prev", "next"]).isRequired, // Направление кнопки
  onClick: PropTypes.func.isRequired, // Обработчик клика
  isDisabled: PropTypes.bool, // Флаг блокировки кнопки
  icon: PropTypes.string.isRequired, // Путь к иконке
  rotation: PropTypes.number, // Угол поворота
};
