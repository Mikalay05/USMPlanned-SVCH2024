import React, { useState } from "react";
import "./MainProjectInformation.css";
import { useDispatch, useSelector } from "react-redux";

import CustomerSlider from "../CustomerSlider/CustomerSlider";
import CardForCustomers from "../CardForCustomers/CardForCustomers";
import TitleForProjectInformation from "../TitleForProjectInformation/TitleForProjectInformation";
import ProjectDetails from "../ProjectDetails/ProjectDetails";
import CustomerCreationModal from "../CustomerCreationModal/CustomerCreationModal";
import LoadingDots from "../LoadingDots/LoadingDots";

export default function MainProjectInformation() {
  const projectData = useSelector((state) => state.project.selectedProject);
  const isLoading = useSelector((state) => state.project.isLoading);

  const [formForCreationCustomer, setFormForCreationCustomer] = useState(null);

  const handleNextId = (newNextId) => {
    setFormForCreationCustomer((prevForm) => ({
      ...prevForm,
      next_id: newNextId,
    }));
  };

  const handleClearForm = () => {
    setFormForCreationCustomer((prevForm) => ({
      ...prevForm,
      name: "",
    }));
  };

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

  const [openModalForCreationCustomer, setopenModalForCreationCustomer] =
    useState(false);

  const handleCloseModalCreationCustomer = () => {
    setopenModalForCreationCustomer(false);
  };

  const handleOpenModalCreationCustomer = () => {
    setopenModalForCreationCustomer(true);
  };

  if (isLoading) {
    return <LoadingDots />;
  }

  // Добавляем проверку на наличие данных в projectData
  const dataForSelect = projectData?.dataForSelect || [];
  if(!projectData) {
    return <LoadingDots/>
  }
  return (
    <>
      <TitleForProjectInformation
        projectData={projectData}
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
            onClick={handleOpenModalCreationCustomer}
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

      <ProjectDetails projectData={projectData} />
    </>
  );
}
