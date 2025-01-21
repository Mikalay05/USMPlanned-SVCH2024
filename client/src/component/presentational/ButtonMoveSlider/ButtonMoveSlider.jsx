import "./ButtonMoveSlider.css";
import CustomerCard from "../CustomerCard/CustomerCard";
import SliderButton from "../../SliderButton/SliderButton";
import React from "react";

export default function ButtonMoveSlider({
  children = [],
  draggedIndex,
  prevIndex,
  nextIndex, //Index, относительно которо
  handlePrev = () => {},
  handleNext = () => {},
  nameOfSliderIndexFile = "Icon-SliderIndex.svg",
  alphaInactiveOnEmptyElement = 0.1,
  emptyCardComponent = CustomerCard,
}) {
  const isPrevDisabled = prevIndex === -1;
  const isNextDisabled = nextIndex === null;
  const createEmptyCard = () => {
    const EmptyCard = emptyCardComponent;
    return (
      <EmptyCard
        alphaInactive={alphaInactiveOnEmptyElement}
        isEmpty={true}
      />
    );
  };

  const getCardByIndex = (index, isActive) => {
    if (
      index === -1 ||
      index === null ||
      !React.isValidElement(children[index])
    ) {
      return createEmptyCard();
    }
    return React.cloneElement(children[index], {
      isActive,
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
        {getCardByIndex(prevIndex, false)}
        {getCardByIndex(draggedIndex, true)}
        {getCardByIndex(nextIndex, false)}
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
