import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom"; // Импорт useNavigate
import "./MainProjectInformation.css";
import CustomerSlider from "../../CustomerSlider/CustomerSlider";
import CardForCustomers from "../../presentational/CardForCustomers/CardForCustomers";
import CustomerCreationModal from "../../CustomerCreationModal/CustomerCreationModal";
import TitleForProjectInformation from "../TitleForProjectInformation/TitleForProjectInformation";
import ProjectDetails from "../ProjectDetails/ProjectDetails";
import LoadingDots from '../../presentational/LoadingDots/LoadingDots';
export default function MainProjectInformation() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedProject = useSelector(
    (state) => state.project.customersForSelectInTheProject
  );
  const isLoading = useSelector((state) => state.project.isLoading);

  const [formForCreationCustomer, setFormForCreationCustomer] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(1); // Храним текущий индекс
  const handleDecomposition = (customerId) => {
    
    navigate(`/information/${projectId}/${customerId}`);
  };

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

  const [openModalForCreationCustomer, setOpenModalForCreationCustomer] =
    useState(false);

  const handleCloseModalCreationCustomer = () => {
    setOpenModalForCreationCustomer(false);
  };

  const handleOpenModalForCreationCustomer = () => {
    setOpenModalForCreationCustomer(true);
  };

  const dataForSelect = selectedProject?.customersData || [];

  const handleIndexChange = (index) => {
    setCurrentIndex(index); // Обновляем индекс в родительском компоненте
  };

  return (
    <>
      <TitleForProjectInformation onSelectItem={handleOnCreateCustomer} />
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
        <img
          src={`/Icon-Decomposition.svg`}
          alt="Decomposition"
          onClick={() => handleDecomposition(dataForSelect[currentIndex]?.id)} // Используем currentIndex
        />
      </div>

      <CustomerSlider
        localStorageKey="currentCustomerIndex"
        onHandleNextId={handleNextId}
        onIndexChange={handleIndexChange} // Передаем callback для изменения индекса
        notFoundMessage="Not found Customers in this project"
      >
        {Array.isArray(dataForSelect) && dataForSelect.length > 0 ? (
          dataForSelect.map((item) => (
            <CardForCustomers
              key={item.id}
              customerId={item.id}
              customerName={item.name}
            />
          ))
        ) : (
          <p className="not-found-message">
            No customers found in this project.
          </p>
        )}
      </CustomerSlider>
      <ProjectDetails />
    </>
  );
}

