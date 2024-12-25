import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectStatuses } from "../../store/slices/projectStatusSlice";
import CardProject from "../CardProject/CardProject";
import CustomerModal from "../CustomerModal/CustomerModal";
import CustomerSlider from "../CustomerSlider/CustomerSlider";
import CustomerSelect from "../CustomerSelect/CustomerSelect";
import InputData from "../InputData/InputData";
import "./ProjectComponent.css";
import ProjectForCreationDTO from "../../DTOs/ForCreation/ProjectForCreationDTO";
import { createProject } from "../../store/slices/projectSlice";

export default function ProjectComponent({
  arrProject = [],
  iconAdd = "IconAdd.svg",
  iconDelete = "IconDelete.svg",
  iconChange = "IconChange.svg",
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  // Получаем из Redux состояние загрузки и данные статусов
  const { projectStatuses, isLoading } = useSelector(
    (state) => state.projectStatus
  );
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
    console.log("ФОРМА ИЗМЕНЕНА", projectCreationFormData)
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

  // Функция для загрузки статусов при открытии модального окна
  //Статусы проекта является справочной информацией, достатчно загрузить один раз для корректной работы.
  useEffect(() => {
    dispatch(getProjectStatuses());
  }, [dispatch]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <section className="project-section">
      {isModalOpen && !isLoading && projectStatuses.length > 0 && (
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
          {isLoading ? (
            <p>Loading statuses...</p>
          ) : (
            <CustomerSelect
              options={projectStatuses}
              placeholderValue={"Status of project"}
              filterKey={"name"}
            />
          )}
        </CustomerModal>
      )}

      <InputData placeholderValue="Search..." iconName="IconSearch.svg" />

      <div className="icon-container">
        <img src={`/${iconAdd}`} alt="Add Project" onClick={handleOpenModal} />
        <img src={`/${iconDelete}`} alt="Delete Project" />
        <img src={`/${iconChange}`} alt="Change Project" />
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
