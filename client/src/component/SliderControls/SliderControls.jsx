import "./SliderControls.css";
import ActionIconsForSlider from "../presentational/ActionIconsForSlider/ActionIconsForSlider";
import CustomerSlider from "../CustomerSlider/CustomerSlider";
import ButtonNavigationSlider from "../presentational/ButtonNavigationSlider/ButtonNavigationSlider";

export default function SliderControls({
  children = [],
  currentIndex,
  handleOpenModalForCreationCustomer = () => {},
  handleDecomposition = () => {},
  handleMoveElement = () => {},
}) {
  return (
    <div className="">
      <ActionIconsForSlider
        handleMoveElement={handleMoveElement}
        handleDecomposition={handleDecomposition}
        handleOpenModalForCreationCustomer={handleOpenModalForCreationCustomer}
      />
      <ButtonNavigationSlider/>
          </div>
  );
}
