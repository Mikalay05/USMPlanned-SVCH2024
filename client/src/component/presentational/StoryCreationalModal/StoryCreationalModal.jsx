import "./StoryCreationalModal.css";
import CustomerModal from "../CustomerModal/CustomerModal";
import InputData from "../../InputData/InputData";

export default function StoryCreationalModal({
  titleName = "Create story",
  storyNameField = "nameOfStory",
  storyDescriptionField = "nameOfDescription",
  placeholderValues = {
    [storyNameField]: "Story name...",
    [storyDescriptionField]: "Story description...",
  },
  dataOfValues = {
    [storyNameField]: "",
    [storyDescriptionField]: "",
  },
  onCloseModal =()=>{},
  onInputChange = () => {},
  onCreateStory = () =>{},
  onClear = () => {},
  isModalOpen,
}) {
  return (
    <>
      {isModalOpen && (
        <CustomerModal
          textTitle={titleName}
          clickOnClose={onCloseModal}
          clickOnButton={onCreateStory}
        >
          <InputData
            type="text"
            value={dataOfValues[storyNameField]}
            placeholderValue={placeholderValues[storyNameField]}
            nameOfInput={storyNameField}
            closeIconPath="CloseIconInInput.svg"
            onInput={(e)=>onInputChange(e.target.name,e.target.value)}
            onClear={(e)=>onClear(storyNameField)}
          />

          <InputData
            type="text"
            value={dataOfValues[storyDescriptionField]}
            placeholderValue={placeholderValues[storyDescriptionField]}
            nameOfInput={storyDescriptionField}
            closeIconPath="CloseIconInInput.svg"
            onInput={(e) => onInputChange(e.target.name, e.target.value)}
            onClear={(e)=>onClear(storyDescriptionField)}
          />

        </CustomerModal>
      )}
    </>
  );
}
