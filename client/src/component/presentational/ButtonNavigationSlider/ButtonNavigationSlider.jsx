import "./ButtonNavigationSlider.css";
import SliderButton from "../../SliderButton/SliderButton";
import React, { useState, useEffect } from "react";
import CustomerCard from "../CustomerCard/CustomerCard";
export default function ButtonNavigationSlider({
  currentIndex,
  children = [],
  handlePrev = () => {},
  handleNext = () => {},
  onClickOnElement = () => {},
  onClickOnEmptyElement = () => {},
  onClickCurrentElement = () => {},
  nameOfSliderIndexFile = "Icon-SliderIndex.svg",
  alphaInactiveOnEmptyElement = 0.1, 
  emptyCardComponent = CustomerCard,
}) {
  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex === children.length - 1;
  const createEmptyCard = () => {
    const EmptyCard = emptyCardComponent;
    return (
      <EmptyCard
        alphaInactive={alphaInactiveOnEmptyElement}
        isEmpty={true}
        onClick={onClickOnEmptyElement} // Передаём индекс
      />
    );
  };
  
  const getCardByIndex = (index, isActive) => {
    if (
      index < 0 ||
      index >= children.length ||
      !React.isValidElement(children[index])
    ) {
      return createEmptyCard();
    }
    return React.cloneElement(children[index], {
      isActive, // Передаём информацию, что это активный элемент
      onClick: isActive
      ? () => onClickCurrentElement(index) // Если элемент активный, используем onClickCurrentElement
      : () => onClickOnElement(index), // Иначе используем стандартный обработчик
  });
  };
  

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
  );
}

