import "./ProjectDetails.css";
import CustomerButton from "../CustomerButton/CustomerButton";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { useState } from "react";

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

export default function ProjectDetails({ projectData }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOnOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };
  const handleOnCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };
  const handleOnConfirm = () => {
    //TODO Delete project request
    setOpenDeleteModal(false);
  }
  return (
    <div className="project-details-container">
      <div className="project-description">
        <h3 className="project-description-title">Description of Project:</h3>
        <p className="project-description-text">{projectData.description}</p>
      </div>
      <div className="project-actions-buttons">
        <CustomerButton textValue="Change project" />
        <CustomerButton
          textValue="Delete project"
          onClick={handleOnOpenDeleteModal}
        />
      </div>
      <div className="project-actions-section">
        <h3 className="project-actions-title">Actions of Project:</h3>
        <div className="project-actions-list">
          {projectData.actions.length > 0 ? (
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
    </div>
  );
}
