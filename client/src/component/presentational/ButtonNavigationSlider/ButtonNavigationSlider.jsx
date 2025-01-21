import "./ButtonNavigationSlider.css";
import SliderButton from "../../SliderButton/SliderButton";
import React, { useState, useEffect } from "react";
export default function ButtonNavigationSlider({
  currentIndex,
  children = [],
  handlePrev = () => {},
  handleNext = () => {},
  onClickOnElement = () => {},
  onClickOnEmptyElement = () => {},
  nameOfSliderIndexFile = "Icon-SliderIndex.svg",
  alphaInactiveOnEmptyElement = 0.1, 
  emptyCardComponent,
}) {
  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex === children.length - 1;
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
