import { useState } from "react";

import CardProject from "../CardProject/CardProject";
import CustomerModal from "../CustomerModal/CustomerModal";
import CustomerSlider from "../CustomerSlider/CustomerSlider";
import CustomerSelect from "../CustomerSelect/CustomerSelect";
import InputData from "../InputData/InputData";

import "./ProjectComponent.css";


export default function ProjectComponent({
  arrProject = [],
  isLoadingProject,
  errorProject,

  arrProjectStatus = [],
  isLoadingProjectStatus,
  errorProjectStatus,

  iconAdd = "IconAdd.svg",
  iconDelete = "IconDelete.svg",
  iconChange = "IconChange.svg",
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Для формы создание проекта
  const projectNameField = "projectName";
  const projectDescriptionField = "projectDescription";
  const projectStatusIdField = "projectStatusId";
  const [projectCreationFormData, setProjectCreationFormData] = useState({});

  //Изменять стейт для создания формы
  const handleFormData = (fieldName, value) => {
    //Если свойство не указано, возращаю ошибку
    if (!fieldName) {
      console.error("Field name from input not found.");
      return;
    }

    setProjectCreationFormData((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
    console.log("ИЗМЕНЕНИЕ ЗНАЧЕНИЕ ФОРМЫ", projectCreationFormData)
  };

  //Изменяет ввода данных для текстовых полей
  const handleInputData = (e) => {
    //Получаю какое свойство поменялось и какое значение
    const { name, value } = e.target;

    //Устанавливаю новое значение данных
    handleFormData(name, value);
  };
  //Очистка значения введенных данных
  const handleClear = (nameOfInput) => {
    //Устанавливаю новое пустое значние для поля
    handleFormData(nameOfInput, "");
  };
  const emptyCardComponent = CardProject;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleSelecteStatusProject = () => {

  }
  return (
    <section className="project-section">
      {isModalOpen && !isLoadingProject > 0 && (
        <CustomerModal
          textTitle="Create project"
          clickOnClose={handleCloseModal}
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
              onSelect={handleSelecteStatusProject}
            />
          )}
        </CustomerModal>
      )}

      <InputData placeholderValue="Search..." iconName="IconSearch.svg" />

      <div className="icon-container">
        <img src={`/${iconAdd}`} alt="Add Project" onClick={handleOpenModal} />
        {/* <img src={`/${iconDelete}`} alt="Delete Project" />
        <img src={`/${iconChange}`} alt="Change Project" /> */}
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
