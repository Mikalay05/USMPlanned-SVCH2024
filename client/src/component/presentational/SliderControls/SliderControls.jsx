import "./SliderControls.css";
import ActionIconsForSlider from "../ActionIconsForSlider/ActionIconsForSlider";
import CustomerSlider from "../../CustomerSlider/CustomerSlider";
import ButtonNavigationSlider from "../ButtonNavigationSlider/ButtonNavigationSlider";
import CustomerCard from "../CustomerCard/CustomerCard";
export default function SliderControls({
  children = [],
  currentIndex,
  handleOpenModalForCreationCustomer = () => {},
  handleDecomposition = () => {},
  handleMoveElement = () => {},
  handlePrev = () => {},
  handleNext = () => {},
  onClickOnElement = () => {},
  onClickOnEmptyElement = () => {},
  nameOfSliderIndexFile = "Icon-SliderIndex.svg",
  alphaInactiveOnEmptyElement = 0.1,
  emptyCardComponent = CustomerCard,
}) {
  return (
    <div className="">
      <ActionIconsForSlider
        handleMoveElement={handleMoveElement}
        handleDecomposition={handleDecomposition}
        handleOpenModalForCreationCustomer={handleOpenModalForCreationCustomer}
      />
      <ButtonNavigationSlider
        currentIndex={currentIndex}
        handlePrev={handlePrev}
        handleNext={handleNext}
        onClickOnElement={onClickOnElement}
        onClickOnEmptyElement={onClickOnEmptyElement}
        nameOfSliderIndexFile={nameOfSliderIndexFile}
        alphaInactiveOnEmptyElement={alphaInactiveOnEmptyElement}
        emptyCardComponent={emptyCardComponent}
      >
        {children}
      </ButtonNavigationSlider>
    </div>
  );
}
