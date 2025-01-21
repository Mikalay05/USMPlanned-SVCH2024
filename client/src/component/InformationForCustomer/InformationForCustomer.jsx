import "./InformationForCustomer.css";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import LoadingDots from "../LoadingDots/LoadingDots";
import CustomerSelect from "../CustomerSelect/CustomerSelect";
import CustomerButton from "../CustomerButton/CustomerButton";
import CustomerCard from "../CustomerCard/CustomerCard";

export default function InformationForCustomer({
  filterKeyForCustomers = "name",
  filterKeyForEpics = "name",
}) {
  const { projectId,customerId } = useParams(); // Получение customerId из params
  const dispatch = useDispatch(); // Если нужно будет диспатчить экшены
  const currentProject = useSelector((state) => state.project.currentProject);
  const currentCustomer = useSelector((state) => state.customer.currentCustomer);
  const projectData = currentProject.projectData;
  const customerData = currentCustomer.customerData;
  const selectedProject = useSelector(
    (state) => state.project.customersForSelectInTheProject
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

  const handleSelectCustomer = (selectedCustomer) => {
    console.log("Selected Customer:", selectedCustomer);
    // Добавьте логику для обработки выбранного клиента
  };

  const handleSelectEpic = (selectedEpic) => {
    console.log("Selected Epic:", selectedEpic);
    // Добавьте логику для обработки выбранного эпика
  };

  // TODO: классы стилизация
  // TODO: маршрутизация через select

  console.log("TESTED selectedProject[projectId]", selectedProject)
  console.log("TESTED selectedProject[projectId]", projectId)
  console.log("TESTED selectedProject[projectId]", projectData[projectId])
  return (
    <div className="container-InformationForCustomer">
      <h1>{projectData?.projectName || "Project Name Not Available"}</h1>
      <h3>{projectData?.status?.status_name || "Status Not Available"}</h3>
      <div className="selected-in-InformationForCustomer">
        <CustomerSelect
          defaultValue={selectedProject?.customersData[projectId]} 
          options={selectedProject?.customersData || []}
          filterKey={filterKeyForCustomers}
          onSelectItem={handleSelectCustomer}
        />
        <CustomerSelect
          options={selectedProject?.customersData || []}
          filterKey={filterKeyForEpics}
          onSelectItem={handleSelectEpic}
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
