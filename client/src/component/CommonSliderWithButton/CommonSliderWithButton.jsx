import React, { useState } from "react";
import "./CommonSliderWithButton.css";
import SliderButton from "../SliderButton/SliderButton";

export default function CommonSliderWithButton({ children }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? children.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
  };

  const getVisibleCards = () => {
    const totalItems = children.length;

    const firstIndex = currentIndex;
    const secondIndex = (currentIndex + 1) % totalItems;
    const thirdIndex = (currentIndex + 2) % totalItems;

    return [
      React.cloneElement(children[firstIndex], {
        key: firstIndex,
        className: "slider-item-first",
      }),
      React.cloneElement(children[secondIndex], {
        key: secondIndex,
        className: "slider-item-second",
      }),
      React.cloneElement(children[thirdIndex], {
        key: thirdIndex,
        className: "slider-item-third",
      }),
    ];
  };

  if (!children || children.length < 3) {
    return (
      <div className="slider-error">
        <p>Слайдер требует минимум 3 элемента!</p>
      </div>
    );
  }

  return (
    <div className="slider-container-common-slider-with-button">
      <SliderButton direction="prev" onClick={handlePrev} rotation={90} />
      <div className="slider">{getVisibleCards()}</div>
      <SliderButton direction="next" onClick={handleNext} rotation={-90} />
    </div>
  );
}
