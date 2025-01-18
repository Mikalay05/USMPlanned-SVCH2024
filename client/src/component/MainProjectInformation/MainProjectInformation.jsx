import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./MainProjectInformation.css";
import CustomerSlider from "../CustomerSlider/CustomerSlider";
import CardForCustomers from "../CardForCustomers/CardForCustomers";
import CustomerCreationModal from "../CustomerCreationModal/CustomerCreationModal";
import TitleForProjectInformation from "../TitleForProjectInformation/TitleForProjectInformation";
import ProjectDetails from "../ProjectDetails/ProjectDetails";
import LoadingDots from "../LoadingDots/LoadingDots";

export default function MainProjectInformation() {
  const { projectId } = useParams();
  const dispatch = useDispatch();

  // Получаем данные о выбранном проекте из Redux
  const selectedProject = useSelector((state) => state.project.selectedProject);
  const isLoading = useSelector((state) => state.project.isLoading);

  const [formForCreationCustomer, setFormForCreationCustomer] = useState(null);

  // Функция для обновления next_id в форме
  const handleNextId = (newNextId) => {
    setFormForCreationCustomer((prevForm) => ({
      ...prevForm,
      next_id: newNextId,
    }));
  };

  // Функция для очистки формы
  const handleClearForm = () => {
    setFormForCreationCustomer((prevForm) => ({
      ...prevForm,
      name: "",
    }));
  };

  // Функция для создания нового заказчика
  const handleOnCreateCustomer = (customerName) => {
    if (!customerName || customerName.trim() === "") {
      alert("Customer name is required");
      return;
    }

    const newCustomerData = {
      ...formForCreationCustomer,
      name: customerName,
    };

    setFormForCreationCustomer(newCustomerData);
    handleCloseModalCreationCustomer();

    alert(
      `${newCustomerData.name} ${newCustomerData.project_id} ${newCustomerData.next_id}`
    );

    handleClearForm();
  };

  // Модальное окно для создания заказчика
  const [openModalForCreationCustomer, setOpenModalForCreationCustomer] = useState(false);

  const handleCloseModalCreationCustomer = () => {
    setOpenModalForCreationCustomer(false);
  };

  const handleOpenModalForCreationCustomer = () => {
    setOpenModalForCreationCustomer(true);
  };

  // Проверка на загрузку
  if (isLoading) {
    return <LoadingDots />;
  }

  // Проверяем, есть ли данные в selectedProject
  if (!selectedProject || Object.keys(selectedProject).length === 0) {
    return <LoadingDots />;
  }

  // Данные для селекта из выбранного проекта
  const dataForSelect = selectedProject?.dataForSelect || [];

  return (
    <>
          <TitleForProjectInformation
        onSelectItem={handleOnCreateCustomer}
      />
      <CustomerCreationModal
        isModalOpen={openModalForCreationCustomer}
        handleCloseModal={handleCloseModalCreationCustomer}
        onCreateCustomer={handleOnCreateCustomer}
      />

      <div className="icons-box-TitleForProjectInformation">
        <div className="icons-changed-box-TitleForProjectInformation">
          <img src={`/Icon-MoveElement.svg`} alt="move" />
          <img
            src={`/Icon-AddElement.svg`}
            alt="add"
            onClick={handleOpenModalForCreationCustomer}
          />
        </div>
        <img src={`/Icon-Decomposition.svg`} alt="Decomposition" />
      </div>

      <CustomerSlider
        onHandleNextId={handleNextId}
        notFoundMessage="Not found Customers in this project"
      >
        {Array.isArray(dataForSelect) && dataForSelect.length > 0 ? (
          dataForSelect.map((item) => (
            <CardForCustomers
              key={item.customerId}
              customerId={item.customerId}
              customerName={item.customerName}
            />
          ))
        ) : (
          <p className="not-found-message">No customers found in this project.</p>
        )}
      </CustomerSlider>
      <ProjectDetails/>
    </>
  );
}
