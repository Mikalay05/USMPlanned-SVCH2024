import "./SliderControls.css";
import ActionIconsForSlider from "../ActionIconsForSlider/ActionIconsForSlider";
import CustomerSlider from "../../CustomerSlider/CustomerSlider";
import ButtonNavigationSlider from "../ButtonNavigationSlider/ButtonNavigationSlider";
import CustomerCard from "../CustomerCard/CustomerCard";
import DecisionIcons from "../DecisionIcons/DecisionIcons";
import ButtonMoveSlider from "../ButtonMoveSlider/ButtonMoveSlider";
export default function SliderControls({
  children = [],
  currentIndex,
  isElementDragged = false,
  handleOpenModalForCreationCustomer = () => {},
  handleDecomposition = () => {},
  handleMoveElement = () => {},
  handlePrev = () => {},
  handleNext = () => {},
  onClickOnElement = () => {},
  onClickOnEmptyElement = () => {},
  onClickCurrentElement = () => {},
  onSetIsElementDragged = () => {},
  nameOfSliderIndexFile = "Icon-SliderIndex.svg",
  alphaInactiveOnEmptyElement = 0.1,
  emptyCardComponent = CustomerCard,
  onClickToAgreeMove = () => {},
  onClickToDisagreeMove = () => {},
  handlePrevToDragged = () => {},
  handleNextToDragged = () => {},
  draggedIndex,
}) {
  return (
    <div className="">
      {isElementDragged ? (
        <DecisionIcons
          onAgreeClick={onClickToAgreeMove}
          onDisagreeClick={onClickToDisagreeMove}
        />
      ) : (
        <ActionIconsForSlider
          handleMoveElement={onSetIsElementDragged}
          handleDecomposition={handleDecomposition}
          handleOpenModalForCreationCustomer={
            handleOpenModalForCreationCustomer
          }
        />
      )}
      {isElementDragged ? (
        <ButtonMoveSlider
          handleNext={handleNextToDragged}
          handlePrev={handlePrevToDragged}
          draggedIndex={draggedIndex}
          emptyCardComponent={emptyCardComponent}
        >
          {children}
        </ButtonMoveSlider>
      ) : (
        <ButtonNavigationSlider
          currentIndex={currentIndex}
          handlePrev={handlePrev}
          handleNext={handleNext}
          onClickOnElement={onClickOnElement}
          onClickOnEmptyElement={onClickOnEmptyElement}
          onClickCurrentElement={onClickCurrentElement}
          nameOfSliderIndexFile={nameOfSliderIndexFile}
          alphaInactiveOnEmptyElement={alphaInactiveOnEmptyElement}
          emptyCardComponent={emptyCardComponent}
          isElementDragged={isElementDragged}
          
        >
          {children}
        </ButtonNavigationSlider>
      )}
    </div>
  );
}
