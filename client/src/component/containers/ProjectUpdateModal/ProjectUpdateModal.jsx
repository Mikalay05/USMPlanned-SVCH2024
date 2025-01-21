import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomerModal from "../../CustomerModal/CustomerModal";
import InputDataWithError from "../../InputDataWithError/InputDataWithError";
import CustomerSelectWithError from "../../CustomerSelectWithError/CustomerSelectWithError"; 
import "./ProjectUpdateModal.css";
import { updateProject } from "../../../store/slices/projectSlice";
import Notification from "../../Notification/Notification"; 
import LoadingDots from '../../presentational/LoadingDots/LoadingDots';

export default function ProjectUpdateModal({
  openModal = false,
  clickOnClose,
}) {
  const dispatch = useDispatch();

  const projectSelector = useSelector((state) => state.project.currentProject);
  const data = projectSelector.projectData;
  const { projectStatuses, isLoading, error } = useSelector(
    (state) => state.projectStatus
  );

  // Статусы проекта из Redux
  const [formData, setFormData] = useState({
    name: data?.projectName || "", 
    description: data?.description || "", 
    status_id: data?.status?.status_id || null, 
  });

  const [formErrors, setFormErrors] = useState({
    projectNameErr: "",
    projectDescriptionErr: "",
    statusIdErr: "",
  });

  const [notificationObject, setNotificationObject] = useState({
    textValue: "",
    color: "#fff",
    openModal: false,
  });

  useEffect(() => {
    if (openModal) {
      setFormData({
        name: data?.projectName || "",
        description: data?.description || "",
        status_id: data?.status?.status_id || null,
      });
      setFormErrors({
        projectNameErr: "",
        descriptionErr: "",
        statusErr: "",
      });
    }
  }, [openModal, data]);

  const changeFormData = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    changeFormData(name, value);
  };

  const handleStatusChange = (option) => {
    if (option && option.id) {
      changeFormData("status_id", option.id); 
    } else {
      changeFormData("status_id", null);
    }
  };

  const handleUpdateClick = async () => {
    try {
      await dispatch(
        updateProject({ projectId: data?.projectId, projectData: formData })
      ).unwrap();
      handleSetNotification("Project updated", "#00FF00");

      clickOnClose();
    } catch (err) {
      handleSetNotification(err.message, "#F00");
      if (err.details) {
        setFormErrors(err.details);
      } else {
        console.error("Ошибка обновления:", err.message);
      }
    }
  };

  const handleSetNotification = (message, color = "#F5F24B") => {
    setNotificationObject({
      textValue: message,
      color: color,
      openModal: true,
    });
  };

  const handleOnCloseNotification = () => {
    setNotificationObject({
      ...notificationObject,
      openModal: false,
    });
  };

  const handleClearInput = (name) => {
    setFormData({
      ...formData,
      [name]: "", 
    });
  };

  // Условие для отображения загрузки или данных
  if (projectSelector.isLoading || isLoading) {
    return (
      <div>
        Loading data...
        <LoadingDots />
      </div>
    );
  }

  return (
    <>
      <Notification
        onClose={handleOnCloseNotification}
        text={notificationObject.textValue}
        open={notificationObject.openModal}
        bgColor={notificationObject.color}
      />
      <CustomerModal
        textTitle="Change project..."
        buttonTextContent="Save"
        openModal={openModal}
        clickOnClose={clickOnClose}
        clickOnButton={handleUpdateClick}
      >
        <InputDataWithError
          onClear={handleClearInput}
          errorMessage={formErrors.projectNameErr}
          iconName="Login-Icon.svg"
          placeholderValue="Name"
          nameOfInput="name"
          value={formData.name}
          onInput={handleInputChange}
        />
        <InputDataWithError
          onClear={handleClearInput}
          errorMessage={formErrors.projectDescriptionErr}
          iconName="Login-Icon.svg"
          placeholderValue="Description"
          nameOfInput="description"
          value={formData.description}
          onInput={handleInputChange}
        />
        {!isLoading && !error && (
          <CustomerSelectWithError
            options={projectStatuses}
            filterKey="name"
            placeholderValue="Choose project status"
            onSelect={handleStatusChange}
            defaultValue={projectStatuses.find(
              (status) => status.id === formData.status_id
            )}
            error={formErrors.statusIdErr}
          />
        )}
      </CustomerModal>
    </>
  );
}
