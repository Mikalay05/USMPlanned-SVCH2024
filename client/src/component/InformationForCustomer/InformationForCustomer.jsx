import "./InformationForCustomer.css";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { useNavigate } from "react-router-dom";

import LoadingDots from "../LoadingDots/LoadingDots";
import CustomerSelect from "../CustomerSelect/CustomerSelect";
import CustomerButton from "../CustomerButton/CustomerButton";
import CustomerCard from "../CustomerCard/CustomerCard";

export default function InformationForCustomer({
  filterKeyForCustomers = "name",
  filterKeyForEpics = "name",
}) {
  const currentProject = useSelector((state) => state.project.currentProject);
  const projectData = currentProject.projectData;
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

  const handleSelectCustomer = () => {

  }
  const handleSelectEpic = () => {
    
  }
  //TODO классы стилизация
  //TODO маршуртизация через select
  //TODO информация о пользователе
  return (
    <div className="container-InformationForCustomer">
      <h1>{projectData?.projectName || "Project Name Not Available"}</h1>
      <h3>{projectData?.status?.status_name || "Status Not Available"}</h3>
      <div className="selected-in-InformationForCustomer">
        <CustomerSelect
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
        textValue={"qe"}
        />
      <CustomerButton textValue="Export USM" />
      <CustomerButton textValue="Get Gantt chart" />
    </div>
  );
}
