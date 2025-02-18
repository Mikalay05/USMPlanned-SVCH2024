import "./InformationForEpic.css";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import LoadingDots from "../../presentational/LoadingDots/LoadingDots";
import CustomerSelect from "../../CustomerSelect/CustomerSelect";
import CustomerButton from "../../CustomerButton/CustomerButton";
import CustomerCard from "../../presentational/CustomerCard/CustomerCard";
import EpicCard from "../../presentational/EpicCard/EpicCard";

export default function InformationForEpic({
  filterKeyForCustomers = "name",
  filterKeyForEpics = "name",
}) {
  const {
    projectId: projectIdString,
    customerId: customerIdString,
    epicId: epicIdString,
  } = useParams();

  const projectId = Number(projectIdString);
  const customerId = Number(customerIdString);
  const epicId = Number(epicIdString);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentProject = useSelector((state) => state.project.currentProject);
  const currentCustomer = useSelector(
    (state) => state.customer.currentCustomer
  );
  const currentEpic = useSelector((state) => state.epic.currentEpic);
  const projectData = currentProject.projectData;
  const customerData = currentCustomer.customerData;
  const epicData = currentEpic.epicData;
  const selectedProject = useSelector(
    (state) => state.project.customersForSelectInTheProject
  );
  const selectedCustomer = useSelector(
    (state) => state.customer.epicsForSelectInTheCustomer
  );
  const selectedEpic = useSelector(
    (state) => state.epic.storiesForSelectInTheEpic
  );
  if (
    currentProject.isLoading ||
    selectedProject.isLoading ||
    selectedEpic.isLoading
  ) {
    return (
      <div>
        Loading...
        <LoadingDots />
      </div>
    );
  }

  const handleSelectCustomer = (selectedCustomer) => {
    if (selectedCustomer) {
      navigate(`/information/${projectId}/${selectedCustomer.id}`);
    } else {
      navigate(`/information/${projectId}`);
    }
  };

  const handleSelectEpic = (selectedEpic) => {
    if (selectedEpic) {
      navigate(`/information/${projectId}/${customerId}/${selectedEpic.id}`);
    } else {
      navigate(`/information/${projectId}/${customerId}`);
    }
  };
  const handleSelectStory = (selectedStory) => {
    if (selectedStory) {
      navigate(
        `/information/${projectId}/${customerId}/${epicId}/${selectedStory.id}`
      );
    } else {
      navigate(`/information/${projectId}/${customerId}/${epicId}`);
    }
  };

  const customersArray = Array.isArray(selectedProject?.customersData)
    ? selectedProject.customersData
    : [];

  const epicsArray = Array.isArray(selectedCustomer?.epicsData)
    ? selectedCustomer.epicsData
    : [];
  const storiesArray = Array.isArray(selectedEpic?.storiesData)
    ? selectedEpic.storiesData
    : [];
  const defaultValueOfCustomer = customersArray.find(
    (customer) => customer.id === customerId
  );

  const defaultValueOfEpic = epicsArray.find((epic) => epic.id === epicId);

  return (
    <div className="container-InformationForCustomer">
      <h1>{projectData?.projectName || "Project Name Not Available"}</h1>
      <h3>{projectData?.status?.status_name || "Status Not Available"}</h3>

      <div className="selected-in-InformationForCustomer">
        <CustomerSelect
          defaultValue={defaultValueOfCustomer}
          options={customersArray}
          filterKey={filterKeyForCustomers}
          onSelectItem={handleSelectCustomer}
        />

        <CustomerSelect
          defaultValue={defaultValueOfEpic}
          options={epicsArray}
          filterKey={filterKeyForEpics}
          onSelectItem={handleSelectEpic}
        />
        <CustomerSelect
          options={storiesArray}
          filterKey={filterKeyForEpics}
          onSelectItem={handleSelectStory} // Передаем обработчик выбора эпика
        />
      </div>
      {customerData && (
        <CustomerCard
          key={customerData.id}
          textValue={customerData.name}
          backgroundColor={{ r: 75, g: 245, b: 231 }}
          isActiveElement={true}
        />
      )}

      {epicData && (
        <EpicCard
          key={epicData.id}
          textValue={epicData.name}
          isActiveElement={true}
        />
      )}

      <CustomerButton textValue="Export USM" />
      <CustomerButton textValue="Get Gantt chart" />
    </div>
  );
}
