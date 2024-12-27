import { useState } from "react";

import CardProject from "../CardProject/CardProject";
import CustomerModal from "../CustomerModal/CustomerModal";
import CommonSliderWithButton from "../CommonSliderWithButton/CommonSliderWithButton";
import CustomerSelect from "../CustomerSelect/CustomerSelect";
import InputData from "../InputData/InputData";
import ProjectCreationModal from "../ProjectCreationModal/ProjectCreationModal";

import Notification from "../Notification/Notification";

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
  const emptyCardComponent = CardProject;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
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
    duration = 3000
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
  //Фильрация массива на основании Search value
  const filteredProjects = arrProject.filter((project) => {
    const projectName = project.name.toLowerCase();
    const searchQuery = searchValue.toLowerCase();
    const result = projectName.includes(searchQuery);
    return result;
  });
  const arrProjectForShow = filteredProjects.map((project, index) => (
    <CardProject
      key={index}
      projectName={project.name}
      statusName={
        arrProjectStatus.find((status) => status.id === project.status_id)?.name
      }
    />
  ));

  //Обработчик при нажатии на пустой элемент
  const handleOnClickEmptyElement = () => {
    console.log("НАЖАТИЕ НА ОБАРБОЧТИК В PROJECT COMPONENT");
    handleOpenModal();
  };
  return (
    <section className="project-section">
      <ProjectCreationModal
        handleCloseModal={handleCloseModal}
        isLoadingProjectStatus={isLoadingProjectStatus}
        arrProjectStatus={arrProjectStatus}
        showNotification={showNotification}
        onCreateProject={onCreateProject}
        isModalOpen={isModalOpen}
      />
      <Notification
        open={notification.open}
        text={notification.text}
        iconName={notification.iconName}
        timeClose={notification.duration}
        bgColor={notification.colorStyle}
        onClose={handleCloseNotification}
      />

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

      <CommonSliderWithButton      >
        {arrProjectForShow}
      </CommonSliderWithButton>
    </section>
  );
}
