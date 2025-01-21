import React, { useState, useEffect } from "react";
import "./CustomerSlider.css";
import SliderButton from "../SliderButton/SliderButton";
import CustomerCard from "../CustomerCard/CustomerCard";

export default function CustomerSlider({
  children = [],
  alphaInactiveOnEmptyElement = 0.1, // Прозрачность для пустого элемента
  emptyCardComponent = CustomerCard, // Компонент для пустых карточек
  onClickOnElement = () => {}, // Callback на клик по карточке
  onClickOnEmptyElement = () => {}, // Callback на клик по пустому элементу
  nameOfSliderIndexFile = "Icon-SliderIndex.svg", // Иконка для кнопок
  notFoundMessage = "Not found elements", // Сообщение, если элементов нет
  onHandleNextId, // Callback для обновления next_id
  onIndexChange,
  localStorageKey = "customerSliderKey", // Ключ для localStorage
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Загружаем индекс из localStorage при первом рендере
  useEffect(() => {
    const savedIndex = localStorage.getItem(localStorageKey);
    if (savedIndex !== null && !isNaN(savedIndex)) {
      const index = Math.min(
        Math.max(0, parseInt(savedIndex, 10)),
        children.length - 1
      );
      setCurrentIndex(index);
    }
  }, [children.length, localStorageKey]);

  // Функция для обновления индекса и next_id
  const updateIndex = (newIndex) => {
    const nextCustomerId = children[newIndex + 1]?.props.customerId || null;
    setCurrentIndex(newIndex);
    localStorage.setItem(localStorageKey, newIndex); // Сохраняем текущий индекс в localStorage

    onHandleNextId(newIndex); // Передаем next_id в родительский компонент
    onIndexChange(newIndex);
  };

  // Переключение на предыдущий слайд
  const handlePrev = () => {
    const newIndex =
      currentIndex === 0 ? children.length - 1 : currentIndex - 1;
    updateIndex(newIndex); // Обновляем индекс и передаем next_id
  };

  // Переключение на следующий слайд
  const handleNext = () => {
    const newIndex =
      currentIndex === children.length - 1 ? 0 : currentIndex + 1;
    updateIndex(newIndex); // Обновляем индекс и передаем next_id
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
    if (
      index < 0 ||
      index >= children.length ||
      !React.isValidElement(children[index])
    ) {
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

  if (children.length === 0) {
    return <p className="not-found-message">{notFoundMessage}</p>;
  }

  return (
    <>
      <div className="slider-container">
        <SliderButton
          direction="prev"
          onClick={handlePrev}
          isDisabled={isPrevDisabled}
          icon={`/${nameOfSliderIndexFile}`}
          rotation={90}
        />
        <div className="slider">
          {getCardByIndex(currentIndex - 1, false)} {/* Левая карточка */}
          {getCardByIndex(currentIndex, true)} {/* Активная карточка */}
          {getCardByIndex(currentIndex + 1, false)} {/* Правая карточка */}
        </div>
        <SliderButton
          direction="next"
          onClick={handleNext}
          isDisabled={isNextDisabled}
          icon={`/${nameOfSliderIndexFile}`}
          rotation={-90}
        />
      </div>
    </>
  );
}
