import "./ActionIconsForSlider.css";
export default function ActionIconsForSlider({
  handleOpenModalForCreationCustomer = () => {},
  handleDecomposition = () => {},
  handleMoveElement = () => {},
}) {
  return (
    <div className="icons-box-ActionIconsForSlider">
      <div className="icons-changed-box-ActionIconsForSlider">
        <img
          src={`/Icon-MoveElement.svg`}
          alt="move"
          onClick={handleMoveElement}
        />
        <img
          src={`/Icon-AddElement.svg`}
          alt="add"
          onClick={handleOpenModalForCreationCustomer}
        />
      </div>
      <img
        src={`/Icon-Decomposition.svg`}
        alt="Decomposition"
        onClick={() => handleDecomposition()} // Используем currentIndex
      />
    </div>
  );
}
