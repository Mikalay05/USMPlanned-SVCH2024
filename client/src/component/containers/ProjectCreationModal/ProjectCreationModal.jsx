import "./ProjectCreationModal.css";
import { useState } from "react";

import CustomerModal from "../../presentational/CustomerModal/CustomerModal";
import CustomerSelect from "../../CustomerSelect/CustomerSelect";
import InputData from "../../InputData/InputData";

import ProjectForCreationDTO from "../../../DTOs/ForCreation/ProjectForCreationDTO";

export default function ProjectCreationModal({
  titleName = "Create project",
  handleCloseModal, //Контролирует родитель

  placeholderValueInInputProjectName = "Project name...",
  projectNameField = "projectName",

  placeholderValueInInputProjectDescription = "Project description...",
  projectDescriptionField = "projectDescription",

  placeholderValueInSelectProjectStatus = "Status of project",
  filterKeyInSelect = "name",
  projectStatusIdField = "projectStatusId",

  isLoadingProjectStatus,
  arrProjectStatus,
  showNotification,
  onCreateProject,
  isModalOpen,
}) {
  // Для формы создания проекта
  const [projectCreationFormData, setProjectCreationFormData] = useState({});
  // Изменять стейт для создания формы
  const handleFormData = (fieldName, value) => {
    if (!fieldName) {
      console.error("Field name from input not found.");
      return;
    }
    setProjectCreationFormData((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };
  // Изменяет ввод данных для текстовых полей
  const handleInputData = (e) => {
    const { name, value } = e.target;
    handleFormData(name, value);
  };
  // Очистка значения введенных данных
  const handleClear = (nameOfInput) => {
    handleFormData(nameOfInput, "");
  };
  //Отправки запросы на создание проекта
  const handleCreateProject = () => {
    try {
      if (
        !projectCreationFormData[projectNameField] ||
        !projectCreationFormData[projectDescriptionField] ||
        !projectCreationFormData[projectStatusIdField]
      ) {
        showNotification("Please fill in all the fields.");
        return;
      }
      // Получаем данные с формы
      const projectDtoForCreation = new ProjectForCreationDTO({
        name: projectCreationFormData[projectNameField],
        description: projectCreationFormData[projectDescriptionField],
        status_id: projectCreationFormData[projectStatusIdField],
      });
      onCreateProject(projectDtoForCreation)
        .then(() => {
          showNotification("Project created successfully.", "#00FF26");
          handleCloseModal(); // Закрываем модальное окно при успешном создании
          setProjectCreationFormData({}); // Очищаем форму после успешного создания проекта
        })
        .catch((error) => {
          showNotification(
            "Failed to create project. Please try again.",
            "#FF0004"
          );
        });
    } catch (e) {}
  };
  const handleSelecteStatusProject = (selectedOption) => {
    handleFormData(projectStatusIdField, selectedOption.id);
  };
  return (
    <>
      {isModalOpen > 0 && (
        <CustomerModal
          textTitle={titleName}
          clickOnClose={handleCloseModal}
          clickOnButton={handleCreateProject}
        >
          <InputData
            type="text"
            value={projectCreationFormData[projectNameField]}
            placeholderValue={placeholderValueInInputProjectName}
            nameOfInput={projectNameField}
            closeIconPath="CloseIconInInput.svg"
            onInput={handleInputData}
            onClear={handleClear}
          />
          <InputData
            value={projectCreationFormData[projectDescriptionField]}
            type="text"
            placeholderValue={placeholderValueInInputProjectDescription}
            nameOfInput={projectDescriptionField}
            closeIconPath="CloseIconInInput.svg"
            onInput={handleInputData}
            onClear={handleClear}
          />
          {isLoadingProjectStatus ? (
            <p>Loading statuses...</p>
          ) : (
            <CustomerSelect
              options={arrProjectStatus}
              placeholderValue={placeholderValueInSelectProjectStatus}
              filterKey={filterKeyInSelect}
              onSelect={handleSelecteStatusProject}
            />
          )}
        </CustomerModal>
      )}
    </>
  );
}
