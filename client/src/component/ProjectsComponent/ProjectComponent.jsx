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
  const [projectStatuses, setProjectStatuses] = useState([]); // Для хранения статусов проекта
  const [formData, setFormData] = useState({
    projectName: '',
    projectDescription: '',
    projectStatus: ''
  });
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.projectStatus.isLoading); // Индикатор загрузки

  const emptyCardComponent = CardProject;

  useEffect(() => {
    if (isModalOpen) {
      const fetchStatuses = async () => {
        try {
          const { payload } = await dispatch(getProjectStatuses());
          setProjectStatuses(payload); // Устанавливаем статус проекта
        } catch (error) {
          console.error("Ошибка при загрузке статусов проекта:", error);
        }
      };

      fetchStatuses();
    }
  }, [isModalOpen, dispatch]); // Загружаем статусы при открытии модала

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleButtonClick = async (e) => {
    e.preventDefault();

    // Проверка на пустые поля
    if (!formData.projectName || !formData.projectDescription || !formData.projectStatus) {
      console.log("=============")
      console.log(formData)
            console.log("=============")

      alert("Please fill in all fields");
      return;
    }

    // Создаем объект ForCreationDto
    const projectData = new ProjectForCreationDTO({
      name: formData.projectName,
      description: formData.projectDescription,
      status_id: formData.projectStatus
    });

    try {
      // Отправляем данные через экшн createProject
      await dispatch(createProject(projectData));
      handleCloseModal(); // Закрываем модальное окно после отправки
    } catch (error) {
      console.error("Ошибка при создании проекта:", error);
    }
  };

  return (
    <section className="project-section">
      {isModalOpen && (
        <CustomerModal
          textTitle="Create project"
          clickOnClose={handleCloseModal}
          clickOnButton={handleButtonClick}  // Кнопка для создания проекта
        >
          <InputData 
            type="text" 
            placeholderValue={"Project name..."} 
            name="projectName" 
            value={formData.projectName} 
            onChange={handleInputChange} 
          />
          <InputData 
            type="text" 
            placeholderValue={"Project description..."} 
            name="projectDescription" 
            value={formData.projectDescription} 
            onChange={handleInputChange} 
          />
          {isLoading ? (
            <p>Loading statuses...</p> // Показать индикатор загрузки
          ) : (
            <CustomerSelect
              options={projectStatuses}
              placeholderValue={"Status of project"}
              filterKey={"name"}
              name="projectStatus" 
              value={formData.projectStatus} 
              onChange={handleInputChange} 
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
