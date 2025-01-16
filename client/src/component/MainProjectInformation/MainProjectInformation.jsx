import React, { useState } from "react";
import "./MainProjectInformation.css";
import { useDispatch, useSelector } from "react-redux";

import CustomerSlider from "../CustomerSlider/CustomerSlider";
import CardForCustomers from "../CardForCustomers/CardForCustomers";
import TitleForProjectInformation from "../TitleForProjectInformation/TitleForProjectInformation";
import ProjectDetails from "../ProjectDetails/ProjectDetails";
import CustomerCreationModal from "../CustomerCreationModal/CustomerCreationModal";

export default function MainProjectInformation({  }) {
  const projectData = useSelector((state) => state.project.selectedProject);
  const isLoading = useSelector((state) => state.project.isLoading);

  const [formForCreationCustomer, setFormForCreationCustomer] = useState({
    name: '',
    project_id: projectData.projectId || null,
    next_id: projectData.dataForSelect[0]?.customerId || null,
  });
  const handleNextId = (newNextId) => {
    // Обновляем поле next_id в форме
    setFormForCreationCustomer((prevForm) => ({
      ...prevForm,
      next_id: newNextId, // Записываем next_id
    }));
  };
  const handleClearForm = () => {
    setFormForCreationCustomer(
      (prevForm) => ({
        ...prevForm,
        name: '',
      })
    )
  }
const handleOnCreateCustomer = (customerName) => {
  // Проверяем, что имя клиента не пустое
  if (!customerName || customerName.trim() === "") {
    alert("Customer name is required"); // Покажем сообщение, если имя пустое
    return; // Прерываем выполнение функции, не создавая клиента
  }

  // Создаем локальную переменную для отображения данных
  const newCustomerData = {
    ...formForCreationCustomer,
    name: customerName,
  };

  // Обновляем форму с именем клиента
  setFormForCreationCustomer(newCustomerData);

  // Закрываем модальное окно
  handleCloseModalCreationCustomer();

  // Используем локальные данные, чтобы избежать проблем с асинхронностью
  alert(
    `${newCustomerData.name} ${newCustomerData.project_id} ${newCustomerData.next_id}`
  );

  // Очищаем имя в форме
  handleClearForm();
};


  const [openModalForCreationCustomer, setopenModalForCreationCustomer] = useState(false);
  const handleCloseModalCreationCustomer = () => {
    setopenModalForCreationCustomer(false);
  };
  const handleOpenModalCreationCustomer = () => {
    setopenModalForCreationCustomer(true);
  };

  return (
    <>
      <TitleForProjectInformation
        projectData={projectData}
        onSelectItem={handleOnCreateCustomer} // Передаем обработчик выбора элемента
      />
      <CustomerCreationModal
        isModalOpen={openModalForCreationCustomer}
        handleCloseModal={handleCloseModalCreationCustomer}
        onCreateCustomer={handleOnCreateCustomer}
      />

      <div className="icons-box-TitleForProjectInformation">
        <div className="icons-changed-box-TitleForProjectInformation">
          <img src={`/Icon-MoveElement.svg`} alt="move" />
          <img src={`/Icon-AddElement.svg`} alt="add" onClick={handleOpenModalCreationCustomer} />
        </div>
        <img src={`/Icon-Decomposition.svg`} alt="Decomposition" />
      </div>

      <CustomerSlider
        onHandleNextId={handleNextId} // Передаем callback для обновления next_id
        notFoundMessage="Not found Customers in this project"
      >
        {projectData.dataForSelect.map((item) => (
          <CardForCustomers
            key={item.customerId}
            customerId={item.customerId}
            customerName={item.customerName}
          />
        ))}
      </CustomerSlider>

      <ProjectDetails projectData={projectData} />
    </>
  );
}
