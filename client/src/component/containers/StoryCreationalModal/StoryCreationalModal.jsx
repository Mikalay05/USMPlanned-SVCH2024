import "./StoryCreationalModal.css";
import CustomerModal from "../../presentational/CustomerModal/CustomerModal";
import InputData from "../../InputData/InputData";

export default function StoryCreationalModal({
  titleName = "Create story",
  customerNameField = "nameOfStory",
  customerDescriptionField = "nameOfDescription",
  placeholderValues = {
    [customerNameField]: "Story name...",
    [customerDescriptionField]: "Story description...",
  },
  dataOfValues = {
    [customerNameField]: "",
    [customerDescriptionField]: "",
  },
  onCloseModal =()=>{},
  onInputChange = () => {},
  onCreateCustomer = () =>{},
  onClear = () => {},
  isModalOpen,
}) {
  return (
    <>
      {isModalOpen && (
        <CustomerModal
          textTitle={titleName}
          clickOnClose={onCloseModal}
          clickOnButton={onCreateCustomer}
        >
          <InputData
            type="text"
            value={dataOfValues[customerNameField]}
            placeholderValue={placeholderValues[customerNameField]}
            nameOfInput={customerNameField}
            closeIconPath="CloseIconInInput.svg"
            onInput={(e)=>onInputChange(e.target.name,e.target.value)}
            onClear={(e)=>onClear(customerNameField)}
          />

          <InputData
            type="text"
            value={dataOfValues[customerDescriptionField]}
            placeholderValue={placeholderValues[customerDescriptionField]}
            nameOfInput={customerDescriptionField}
            closeIconPath="CloseIconInInput.svg"
            onInput={(e) => onInputChange(e.target.name, e.target.value)}
            onClear={(e)=>onClear(customerDescriptionField)}
          />

        </CustomerModal>
      )}
    </>
  );
}
