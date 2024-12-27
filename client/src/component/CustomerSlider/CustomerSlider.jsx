import React, { useState } from "react";
import "./CustomerSlider.css";
import CustomerCard from "../CustomerCard/CustomerCard";
import SliderButton from '../SliderButton/SliderButton'

//TODO сделать если нажатие на карточку - открывается детализация
export default function CustomerSlider({
  children, // Дочерние элементы (массив)
  alphaInactiveOnEmtyElement = "0.1",
  emptyCardComponent = CustomerCard, // Дефолтный компонент пустой карточки
  onClickOnEmptyElementInSlider,
  nameOfSliderIndexFile = "Icon-SliderIndex.svg",
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Функция для переключения на предыдущий элемент
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? children.length - 1 : prevIndex - 1
    );
  };

  // Функция для переключения на следующий элемент
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === children.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Проверка, активна ли кнопка назад
  const isPrevDisabled = currentIndex === 0;

  // Проверка, активна ли кнопка вперед
  const isNextDisabled = currentIndex === children.length - 1;

  // Создание пустого слайда
  const createEmptyCard = () => {
    return React.createElement(emptyCardComponent, {
      alphaInactive: alphaInactiveOnEmtyElement,
      isEmpty: true,
      onClickOnEmptyElement: onClickOnEmptyElementInSlider,
    });
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
      <SliderButton
        direction="prev"
        onClick={handlePrev}
        isDisabled={isPrevDisabled}
        icon={`/${nameOfSliderIndexFile}`}
        rotation={90}
      />

      <div className="slider">
        {getDataByIndex(currentIndex - 1, false)}{" "}
        {getDataByIndex(currentIndex, true)} {/* Активный элемент в центре */}
        {getDataByIndex(currentIndex + 1, false)}{" "}
      </div>

      <SliderButton
        direction="next"
        onClick={handleNext}
        isDisabled={isNextDisabled}
        icon={`/${nameOfSliderIndexFile}`}
        rotation={-90}
      />
    </div>
  );
}
