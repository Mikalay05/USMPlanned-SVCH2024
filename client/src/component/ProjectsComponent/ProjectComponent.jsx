import { useState } from "react";
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

  const emptyCardComponent = CardProject; 

  const handleOpenModal = () => {
    setIsModalOpen(true); 
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
          <CustomerSelect />
        </CustomerModal>
      )}

      <InputData placeholderValue="Search..." iconName="IconSearch.svg" />

      <div className="icon-container">
        <img
          src={`/${iconAdd}`}
          alt="Add Project"
          onClick={handleOpenModal} // Открытие модального окна по клику
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
