import React, { useState } from "react";
import "./CommonSliderWithButton.css";
import SliderButton from "../SliderButton/SliderButton";

export default function CommonSliderWithButton({ children }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Преобразуем children в массив
  const childrenArray = React.Children.toArray(children);
  const totalItems = childrenArray.length;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      totalItems > 0 ? (prevIndex === 0 ? totalItems - 1 : prevIndex - 1) : 0
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      totalItems > 0 ? (prevIndex + 1) % totalItems : 0
    );
  };

  const getVisibleCards = () => {
    if (totalItems === 0) return [];
    if (totalItems === 1) {
      return [
        React.cloneElement(childrenArray[0], {
          key: 0,
          className: "slider-item-single",
        }),
      ];
    }
    if (totalItems === 2) {
      const firstIndex = currentIndex;
      const secondIndex = (currentIndex + 1) % totalItems;
      return [
        React.cloneElement(childrenArray[firstIndex], {
          key: firstIndex,
          className: "slider-item-first",
        }),
        React.cloneElement(childrenArray[secondIndex], {
          key: secondIndex,
          className: "slider-item-second",
        }),
      ];
    }
    // Для 3 и более элементов
    const firstIndex = currentIndex;
    const secondIndex = (currentIndex + 1) % totalItems;
    const thirdIndex = (currentIndex + 2) % totalItems;
    return [
      React.cloneElement(childrenArray[firstIndex], {
        key: firstIndex,
        className: "slider-item-first",
      }),
      React.cloneElement(childrenArray[secondIndex], {
        key: secondIndex,
        className: "slider-item-second",
      }),
      React.cloneElement(childrenArray[thirdIndex], {
        key: thirdIndex,
        className: "slider-item-third",
      }),
    ];
  };

  return (
    <div className="slider-container-common-slider-with-button">
      <SliderButton
        direction="prev"
        onClick={handlePrev}
        rotation={90}
        disabled={totalItems <= 1} // Кнопки отключены, если элементов 0 или 1
      />
      <div className="slider">
        {totalItems === 0 ? (
          <p>Нет элементов для отображения</p>
        ) : (
          getVisibleCards()
        )}
      </div>
      <SliderButton
        direction="next"
        onClick={handleNext}
        rotation={-90}
        disabled={totalItems <= 1} // Кнопки отключены, если элементов 0 или 1
      />
    </div>
  );
}
