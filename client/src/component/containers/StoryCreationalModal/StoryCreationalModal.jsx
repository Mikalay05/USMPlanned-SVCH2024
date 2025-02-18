import "./StoryCreationalModal.css";
import CustomerModal from "../../presentational/CustomerModal/CustomerModal";
import InputData from "../../InputData/InputData";

export default function StoryCreationalModal({
  titleName = "Create story",
  customerNameField = "nameOfStory",
  placeholderValues = {
    [customerNameField]: "Story name...",
  },
  dataOfValues = {
    [customerNameField]: "",
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
            onClear={onClear}
          />
        </CustomerModal>
      )}
    </>
  );
}