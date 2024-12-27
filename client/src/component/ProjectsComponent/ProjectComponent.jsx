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
  console.log(arrProjectStatus);
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
    console.log("======================");
    console.log("ОТКРТИЕ МОДАЛЬНОГО ОКНА");
    console.log("======================");
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
  const showNotification = (
    textValue,
    colorStyle = "#F5F24B",
    duration = 3000,
  ) => {
    // Меняем данные для уведомления
    setNotification((prevState) => ({
      ...prevState,
      text: textValue,
      open: true,
      duration: duration,
      colorStyle: colorStyle,
    }));
  };

  //Отправки запросы на создание проекта
  const handleCreateProject = () => {
    try {

      //TODO Валидация формы
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
    } catch (e) {
      
    }
  };
  //Стейт для ввода фильтрации
  const [searchValue, setSearchValue] = useState("");
  //Изменение ввода фильтрации
  const handleSearchValue = (e) => {
    //получает введеное значение
    const { value } = e.target;
    //устананавливаем в стейт
    setSearchValue(value);
  };
  //Обработчик очистки ввода фильтрации
  const handleOnClearSearchValue = () => {
    setSearchValue("");
  };

  //Обработчик при нажатии на пустой элемент
  const handleOnClickEmptyElement = () => {
    console.log("НАЖАТИЕ НА ОБАРБОЧТИК В PROJECT COMPONENT");
    handleOpenModal();
  };
  return (
    <section className="project-section">
      <Notification
        open={notification.open}
        text={notification.text}
        iconName={notification.iconName}
        timeClose={notification.duration}
        bgColor={notification.colorStyle}
        onClose={handleCloseNotification}
      />
      {isModalOpen && !isLoadingProject > 0 && (
        <CustomerModal
          textTitle="Create project"
          clickOnClose={handleCloseModal}
          clickOnButton={handleCreateProject}
        >
          <InputData
            value={projectCreationFormData[projectNameField]}
            type="text"
            placeholderValue={"Project name..."}
            nameOfInput={projectNameField}
            closeIconPath="CloseIconInInput.svg"
            onInput={handleInputData}
            onClear={handleClear}
          />
          <InputData
            value={projectCreationFormData[projectDescriptionField]}
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
      <div className="input-filter-section-projects">
        <InputData
          placeholderValue="Search..."
          iconName="IconSearch.svg"
          value={searchValue}
          onInput={handleSearchValue}
          onClear={handleOnClearSearchValue}
        />

        <div className="icon-container">
          <img
            src={`/${iconAdd}`}
            alt="Add Project"
            onClick={handleOpenModal}
          />
        </div>
      </div>

      <CustomerSlider
        emptyCardComponent={emptyCardComponent}
        onClickOnEmptyElementInSlider={handleOnClickEmptyElement}
      >
        {arrProject.map((project, index) => (
          <CardProject
            key={index}
            projectName={project.name}
            statusName={
              arrProjectStatus.find((status) => status.id === project.status_id)
                ?.name
            }
          />
        ))}
      </CustomerSlider>
    </section>
  );
}
