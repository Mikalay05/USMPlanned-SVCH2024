import { useState } from "react";

import CardProject from "../CardProject/CardProject";
import CustomerModal from "../CustomerModal/CustomerModal";
import CustomerSlider from "../CustomerSlider/CustomerSlider";
import CustomerSelect from "../CustomerSelect/CustomerSelect";
import InputData from "../InputData/InputData";

import Notification from "../Notification/Notification";

import ProjectForCreationDTO from "../../DTOs/ForCreation/ProjectForCreationDTO";

import "./ProjectComponent.css";

export default function ProjectComponent({
  arrProject = [],
  isLoadingProject,
  errorProject,
  onCreateProject,

  arrProjectStatus = [],
  isLoadingProjectStatus,
  errorProjectStatus,

  iconAdd = "IconAdd.svg",
  iconDelete = "IconDelete.svg",
  iconChange = "IconChange.svg",
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Для формы создания проекта
  const projectNameField = "projectName";
  const projectDescriptionField = "projectDescription";
  const projectStatusIdField = "projectStatusId";
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

  const emptyCardComponent = CardProject;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelecteStatusProject = (selectedOption) => {
    handleFormData(projectStatusIdField, selectedOption.id);
  };
  //Cтейт для хранения данных уведомления
  const [notification, setNotification] = useState({
    open: false, //откртие уведомления
    text: "", //данные уведомления
    duration: 3000,
  });
  //Функция обработки закрытия уведомления
  const handleCloseNotification = () => {
    //Функция изменения стейта, передаем прошлый стейт, меняй open на false
    setNotification((prevState) => ({
      ...prevState,
      open: false,
    }));
  };
  //Открытие уведомления
  const showNotification = (textValue, duration) => {
    //меняй данные для уведомления
    setNotification((prevState) => ({
      ...prevState,
      text: textValue,
      open: true,
    }));
  };

  //Отправки запросы на создание проекта
  const handleCreateProject = () => {
    //TODO Валидация формы
    if (
      !projectCreationFormData[projectNameField] ||
      !projectCreationFormData[projectDescriptionField] ||
      !projectCreationFormData[projectStatusIdField]
    ) {
      showNotification("Please fill in all the fields.");
      return;
    }
    //Получаем данные с формы
    const projectDtoForCreation = new ProjectForCreationDTO({
      name: projectCreationFormData[projectNameField],
      description: projectCreationFormData[projectDescriptionField],
      status_id: projectCreationFormData[projectStatusIdField],
    });

    onCreateProject(projectDtoForCreation)
      .then(() => {
        showNotification("Project created successfully.");
        handleCloseModal(); // Закрываем модальное окно при успешном создании
      })
      .catch((error) => {
        showNotification(
          "Failed to create project. Please try again."
        );
      });
  };

  return (
    <section className="project-section">
      <Notification
        open={notification.open}
        text={notification.text}
        iconName={notification.iconName}
        timeClose={notification.duration}
        onClose={handleCloseNotification}
      />
      {isModalOpen && !isLoadingProject > 0 && (
        <CustomerModal
          textTitle="Create project"
          clickOnClose={handleCloseModal}
          clickOnButton={handleCreateProject}
        >
          <InputData
            textValue={projectCreationFormData[projectNameField]}
            type="text"
            placeholderValue={"Project name..."}
            nameOfInput={projectNameField}
            closeIconPath="CloseIconInInput.svg"
            onInput={handleInputData}
            onClear={handleClear}
          />
          <InputData
            textValue={projectCreationFormData[projectDescriptionField]}
            type="text"
            placeholderValue={"Project description..."}
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
              placeholderValue={"Status of project"}
              filterKey={"name"}
              onSelect={handleSelecteStatusProject} // Подключаем обработчик выбора статуса
            />
          )}
        </CustomerModal>
      )}

      <InputData placeholderValue="Search..." iconName="IconSearch.svg" />

      <div className="icon-container">
        <img src={`/${iconAdd}`} alt="Add Project" onClick={handleOpenModal} />
      </div>

      <CustomerSlider emptyCardComponent={emptyCardComponent}>
        {arrProject.map((project, index) => (
          <CardProject
            key={index}
            projectName={project.name}
            statusName={project.status}
          />
        ))}
      </CustomerSlider>
    </section>
  );
}
