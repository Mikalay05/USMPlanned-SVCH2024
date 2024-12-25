import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectStatuses } from "../../store/slices/projectStatusSlice";
import CardProject from "../CardProject/CardProject";
import CustomerModal from "../CustomerModal/CustomerModal";
import CustomerSlider from "../CustomerSlider/CustomerSlider";
import CustomerSelect from "../CustomerSelect/CustomerSelect";
import InputData from "../InputData/InputData";
import "./ProjectComponent.css";
import ProjectForCreationDTO from '../../DTOs/ForCreation/ProjectForCreationDTO';
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
  const { projectStatuses, isLoading } = useSelector((state) => state.projectStatus);

  const emptyCardComponent = CardProject;

  // Функция для загрузки статусов при открытии модального окна
  useEffect(() => {
    if (isModalOpen) {
      dispatch(getProjectStatuses());
    }
  }, [isModalOpen, dispatch]);

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
            type="text" 
            placeholderValue={"Project name..."} 
            name="projectName" 
          />
          <InputData 
            type="text" 
            placeholderValue={"Project description..."} 
            name="projectDescription" 
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
        <img
          src={`/${iconAdd}`}
          alt="Add Project"
          onClick={handleOpenModal}
        />
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
