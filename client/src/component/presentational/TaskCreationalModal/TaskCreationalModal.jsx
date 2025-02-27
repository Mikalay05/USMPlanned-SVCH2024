import "./TaskCreationalModal.css";

import CustomerModal from "../CustomerModal/CustomerModal";
import InputData from "../../InputData/InputData";
import CustomerSelect from "../../CustomerSelect/CustomerSelect";

export default function TaskCreationalModal({
  titleName = "Create task",
  nameField = "name",
  descriptionField = "description",
  deadlineField = "deadline",
  statusIdField = "statusId",
  urgencyStatusField = "urgencyStatusId",
  placeholderValues = {
    [nameField]: "Task name...",
    [descriptionField]: "Task description...",
    [deadlineField]: "Task deadline...",
    [statusIdField]: "Task status...",
    [urgencyStatusField]: "Task urgency status...",
  },
  dataOfValues = {
    [nameField]: "",
    [descriptionField]: "",
    [deadlineField]: "",
    [statusIdField]: "",
    [urgencyStatusField]: "",
  },
  onCloseModal = () => {},
  onInputChange = () => {},
  onCreateStory = () => {},
  onClear = () => {},
  isModalOpen,

  isLoadingTaskStatus = false,
  arrTaskStatus = [],
  filterKeyInSelectTaskStatus = "name",

  isLoadingUrgencyStatus = false,
  arrUrgencyStatus = [],
  filterKeyInSelectUrgencyStatus = "name",
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
            value={dataOfValues[nameField]}
            placeholderValue={placeholderValues[nameField]}
            nameOfInput={nameField}
            closeIconPath="CloseIconInInput.svg"
            onInput={(e) => onInputChange(e.target.name, e.target.value)}
            onClear={() => onClear(nameField)}
          />
          <InputData
            type="text"
            value={dataOfValues[descriptionField]}
            placeholderValue={placeholderValues[descriptionField]}
            nameOfInput={descriptionField}
            closeIconPath="CloseIconInInput.svg"
            onInput={(e) => onInputChange(e.target.name, e.target.value)}
            onClear={() => onClear(descriptionField)}
          />
          {isLoadingTaskStatus ? (
            <p>Loading statuses...</p>
          ) : (
            <CustomerSelect
              options={arrTaskStatus}
              placeholderValue={placeholderValues[statusIdField]}
              filterKey={filterKeyInSelectTaskStatus}
              onSelect={(e) => onInputChange(e.target.name, e.target.value)}
            />
          )}
          {isLoadingUrgencyStatus ? (
            <p>Loading urgency statuses...</p>
          ) : (
            <CustomerSelect
              options={arrUrgencyStatus}
              placeholderValue={placeholderValues[urgencyStatusField]}
              filterKey={filterKeyInSelectUrgencyStatus}
              onSelect={(e) => onInputChange(urgencyStatusField, e.target.value)}
            />
          )}
        </CustomerModal>
      )}
    </>
  );
}
