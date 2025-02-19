import CustomerModal from "../CustomerModal/CustomerModal";
import "./EpicUpdateModal.css";
import InputData from '../../InputData/InputData'

export default function EpicUpdateModal({
  textTitle = "Change epic",
  buttonTextContent="Update",
  onUpdate = () => {},
  openModal = true,
  epicNameField = "nameOfEpic",
  placeholderValues = {
    [epicNameField]: "Epic name...",
  },
  dataOfValues = {
    [epicNameField]: "",
  },
  onInputChange = () => {},
  onClear = () => {},
  clickOnClose = () => {},
}) {
  return (
    <CustomerModal
      textTitle={textTitle}
      openModal={openModal}
      clickOnClose={clickOnClose}
      buttonTextContent={buttonTextContent}
      clickOnButton={onUpdate}

    >
      <InputData
        type="text"
        value={dataOfValues[epicNameField]}
        placeholderValue={placeholderValues[epicNameField]}
        nameOfInput={epicNameField}
        closeIconPath="CloseIconInInput.svg"
        onInput={(e) => onInputChange(e.target.name, e.target.value)}
        onClear={onClear}
        
      />
    </CustomerModal>
  );
}
