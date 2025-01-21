import "./InformationForCustomer.css";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import LoadingDots from "../../presentational/LoadingDots/LoadingDots";
import CustomerSelect from "../../CustomerSelect/CustomerSelect";
import CustomerButton from "../../CustomerButton/CustomerButton";
import CustomerCard from "../../presentational/CustomerCard/CustomerCard";

export default function InformationForCustomer({
  filterKeyForCustomers = "name",
  filterKeyForEpics = "name",
}) {
  const { projectId, customerId } = useParams(); // Получение customerId из params
  const dispatch = useDispatch(); // Если нужно будет диспатчить экшены
  const navigate = useNavigate(); // Хук для навигации

  const currentProject = useSelector((state) => state.project.currentProject);
  const currentCustomer = useSelector(
    (state) => state.customer.currentCustomer
  );
  const projectData = currentProject.projectData;
  const customerData = currentCustomer.customerData;
  const selectedProject = useSelector(
    (state) => state.project.customersForSelectInTheProject
  );
  const selectedCustomer = useSelector(
    (state) => state.customer.epicsForSelectInTheCustomer
  );

  if (currentProject.isLoading) {
    return (
      <div>
        Loading current project...
        <LoadingDots />
      </div>
    );
  }

  if (selectedProject.isLoading) {
    return (
      <div>
        Loading selected project...
        <LoadingDots />
      </div>
    );
  }
  console.log(selectedCustomer)
  if (selectedCustomer.isLoading) {
    return (
      <div>
        Loading selected customer...
        <LoadingDots />
      </div>
    );
  }
  // Обработчик выбора клиента
  const handleSelectCustomer = (selectedCustomer) => {
    console.log("Selected Customer:", selectedCustomer);
    // Проверяем, выбран ли клиент
    if (selectedCustomer) {
      navigate(`/information/${projectId}/${selectedCustomer.id}`);
  } else {
      navigate(`/information/${projectId}`); // Переход без customerId
  }  };

  // Обработчик выбора эпика
  const handleSelectEpic = (selectedEpic) => {
    console.log("Selected Epic:", selectedEpic);
    navigate(`/information/${projectId}/${customerId}/${selectedEpic.id}`);
  };
  return (
    <div className="container-InformationForCustomer">
      <h1>{projectData?.projectName || "Project Name Not Available"}</h1>
      <h3>{projectData?.status?.status_name || "Status Not Available"}</h3>
      <div className="selected-in-InformationForCustomer">
        <CustomerSelect
          defaultValue={selectedProject?.customersData[projectId]} // Устанавливаем значение по умолчанию
          options={selectedProject?.customersData || []}
          filterKey={filterKeyForCustomers}
          onSelectItem={handleSelectCustomer} // Передаем обработчик выбора клиента
        />
        <CustomerSelect
          options={selectedCustomer?.epicsData || []}
          filterKey={filterKeyForEpics}
          onSelectItem={handleSelectEpic} // Передаем обработчик выбора эпика
        />
      </div>
      <CustomerCard
        key={customerData.id}
        textValue={customerData.name}
        backgroundColor={{ r: 75, g: 245, b: 231 }}
        isActiveElement={true}
      />
      <CustomerButton textValue="Export USM" />
      <CustomerButton textValue="Get Gantt chart" />
    </div>
  );
}
