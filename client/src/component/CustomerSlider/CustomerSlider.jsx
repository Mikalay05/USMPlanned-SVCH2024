import React, { useState } from "react";
import "./CustomerSlider.css";
import SliderButton from "../SliderButton/SliderButton";
import CustomerCard from "../CustomerCard/CustomerCard";

export default function CustomerSlider({
  children = [], // Массив карточек (дочерние элементы)
  alphaInactiveOnEmptyElement = 0.1, // Прозрачность для пустого элемента
  emptyCardComponent = CustomerCard, // Компонент для пустых карточек
  onClickOnElement = () => {}, // Callback на клик по карточке
  onClickOnEmptyElement = () => {}, // Callback на клик по пустому элементу
  nameOfSliderIndexFile = "Icon-SliderIndex.svg", // Иконка для кнопок
  notFoundMessage = "Not found elements", // Сообщение, если элементов нет
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Переключение на предыдущий слайд
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? children.length - 1 : prevIndex - 1
    );
  };

  // Переключение на следующий слайд
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === children.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Функция для создания пустой карточки
  const createEmptyCard = () => {
    const EmptyCard = emptyCardComponent;
    return (
      <EmptyCard
        alphaInactive={alphaInactiveOnEmptyElement}
        isEmpty={true}
        onClick={onClickOnEmptyElement}
      />
    );
  };

  // Генерация карточки по индексу
  const getCardByIndex = (index, isActive) => {
    if (index < 0 || index >= children.length || !React.isValidElement(children[index])) {
      return createEmptyCard();
    }
    return React.cloneElement(children[index], {
      isActive, // Передаем информацию, что это активный элемент
      onClick: () => onClickOnElement(index), // Передаем callback для обработки клика
    });
  };

  // Проверка, является ли кнопка "Назад" неактивной
  const isPrevDisabled = currentIndex === 0;

  // Проверка, является ли кнопка "Вперед" неактивной
  const isNextDisabled = currentIndex === children.length - 1;
  console.log("children",children)
  // Если массив детей пустой, отображаем сообщение
  if (children.length === 0) {
    return <p className="not-found-message">{notFoundMessage}</p>;
  }

  return (
    <div className="slider-container">
      {/* Кнопка назад */}
      <SliderButton
        direction="prev"
        onClick={handlePrev}
        isDisabled={isPrevDisabled} // Дизейбл кнопки "Назад"
        icon={`/${nameOfSliderIndexFile}`}
        rotation={90}
      />

      {/* Контейнер с карточками */}
      <div className="slider">
        {getCardByIndex(currentIndex - 1, false)} {/* Левая карточка */}
        {getCardByIndex(currentIndex, true)} {/* Активная карточка */}
        {getCardByIndex(currentIndex + 1, false)} {/* Правая карточка */}
      </div>

      {/* Кнопка вперед */}
      <SliderButton
        direction="next"
        onClick={handleNext}
        isDisabled={isNextDisabled} // Дизейбл кнопки "Вперед"
        icon={`/${nameOfSliderIndexFile}`}
        rotation={-90}
      />
    </div>
  );
}
