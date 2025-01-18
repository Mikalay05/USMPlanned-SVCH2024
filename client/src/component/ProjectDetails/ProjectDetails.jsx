import "./ProjectDetails.css";
import CustomerButton from "../CustomerButton/CustomerButton";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject } from "../../store/slices/projectSlice";
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate
import ProjectUpdateModal from "../ProjectUpdateModal/ProjectUpdateModal";

// Функция для форматирования даты
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}`;
};

export default function ProjectDetails() {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate для перенаправления

  // Получаем проект из Redux
  const projectData = useSelector((state) => state.project.selectedProject);

  const handleOnOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };
  const handleOnCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleOnConfirm = async () => {
    setOpenDeleteModal(false);
    try {
      await dispatch(deleteProject(projectData.projectId)).unwrap();
      alert("Project deleted");
      navigate("/project"); // Перенаправляем на /project
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  const handleOnCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };
  const handleOnOpenUpdateModal = () => {
    setOpenUpdateModal(true);
  };

  return (
    <div className="project-details-container">
      <div className="project-description">
        <h3 className="project-description-title">Description of Project:</h3>
        <p className="project-description-text">{projectData?.description}</p>
      </div>
      <div className="project-actions-buttons">
        <CustomerButton textValue="Change project" onClick={handleOnOpenUpdateModal} />
        <CustomerButton
          textValue="Delete project"
          onClick={handleOnOpenDeleteModal}
        />
      </div>
      <div className="project-actions-section">
        <h3 className="project-actions-title">Actions of Project:</h3>
        <div className="project-actions-list">
          {projectData?.actions?.length > 0 ? (
            projectData.actions.map((action) => (
              <p key={action.actionId} className="project-action-item">
                {formatDate(action.createdAt)} | {action.user.login}(
                {action.user.fullName}) did {action.actionName}
              </p>
            ))
          ) : (
            <p className="no-actions-found">Action not found</p>
          )}
        </div>
      </div>
      <ConfirmationModal
        isOpen={openDeleteModal}
        title="Do you want to delete the project?"
        message="All internal objects will be removed!"
        confirmButtonText="Yes, delete it."
        cancelButtonText="No, to go back"
        onConfirm={handleOnConfirm}
        onCancel={handleOnCloseDeleteModal}
      />
      <ProjectUpdateModal openModal={openUpdateModal} clickOnClose={handleOnCloseUpdateModal} />
    </div>
  );
}
