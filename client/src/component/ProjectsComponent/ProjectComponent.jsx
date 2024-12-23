import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectStatuses } from "../../store/slices/projectStatusSlice";
import CardProject from "../CardProject/CardProject";
import CustomerModal from "../CustomerModal/CustomerModal";
import CustomerSlider from "../CustomerSlider/CustomerSlider";
import CustomerSelect from "../CustomerSelect/CustomerSelect";
import InputData from "../InputData/InputData";
import "./ProjectComponent.css";

export default function ProjectComponent({
  arrProject = [],
  iconAdd = "IconAdd.svg",
  iconDelete = "IconDelete.svg",
  iconChange = "IconChange.svg",
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectStatuses, setProjectStatuses] = useState([]); // Для хранения статусов проекта
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.projectStatus.isLoading); // Индикатор загрузки

  const emptyCardComponent = CardProject;

  const handleOpenModal = async () => {
    setIsModalOpen(true);
    try {
      // Выполняем запрос и получаем payload из action
      const { payload } = await dispatch(getProjectStatuses());

      setProjectStatuses(payload); // Устанавливаем payload (массив статусов) в state

    } catch (error) {
      console.error("Ошибка при загрузке статусов проекта:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="project-section">
      {isModalOpen && (
        <CustomerModal
          textTitle="Create project"
          clickOnClose={handleCloseModal} // Закрытие по клику на иконку
        >
          <InputData type="text" placeholderValue={"Project name..."} />
          <InputData type="text" placeholderValue={"Project description..."} />
          {isLoading ? ( // Если статусы еще загружаются, показываем загрузку
            <p>Loading statuses...</p>
          ) : (
            <CustomerSelect options={projectStatuses} placeholderValue={"Status of project"} filterKey={"name"}/>
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
