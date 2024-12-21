import React, { useState } from 'react';
import './CustomerSlider.css';
import CustomerCard from '../CustomerCard/CustomerCard';

export default function CustomerSlider({
  children, // Дочерние элементы (массив)
  alphaInactiveOnEmtyElement = "0.1",
  emptyCardComponent = CustomerCard, // Дефолтный компонент пустой карточки
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Функция для переключения на предыдущий элемент
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? children.length - 1 : prevIndex - 1));
  };

  // Функция для переключения на следующий элемент
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === children.length - 1 ? 0 : prevIndex + 1));
  };

  // Проверка, активна ли кнопка назад
  const isPrevDisabled = currentIndex === 0;

  // Проверка, активна ли кнопка вперед
  const isNextDisabled = currentIndex === children.length - 1;

  // Создание пустого слайда
  const createEmptyCard = () => {
    return React.createElement(emptyCardComponent, { alphaInactive: alphaInactiveOnEmtyElement, isEmpty: true });
  };

  // Получение данных слайда по индексу
  const getDataByIndex = (index, active) => {
    if (index < 0 || index >= children.length) {
      return createEmptyCard(); // Возвращаем пустой слайд, если индекс выходит за пределы
    }
    return React.cloneElement(children[index], { isActiveElement: active }); // Передаем active в дочерний элемент
  };

  if (children.length === 0) {
    return <p>Array is empty</p>;
  }

  return (
    <div className="slider-container">
      {/* Кнопка назад (дезактивирована, если currentIndex === 0) */}
      <button
        className="slider-button prev"
        onClick={handlePrev}
        disabled={isPrevDisabled} // Отключаем кнопку, если это первый элемент
      >
        ←
      </button>

      <div className="slider">
        {getDataByIndex(currentIndex - 1, false)} {/* Пассивный элемент слева */}
        {getDataByIndex(currentIndex, true)} {/* Активный элемент в центре */}
        {getDataByIndex(currentIndex + 1, false)} {/* Пассивный элемент справа */}
      </div>

      {/* Кнопка вперед (дезактивирована, если currentIndex === последний элемент) */}
      <button
        className="slider-button next"
        onClick={handleNext}
        disabled={isNextDisabled} // Отключаем кнопку, если это последний элемент
      >
        →
      </button>
    </div>
  );
}
