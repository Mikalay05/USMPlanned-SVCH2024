import "./InformationForStory.css";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PathForStory from "../../presentational/PathForStory/PathForStory";
import CustomerButton from "../../CustomerButton/CustomerButton";
import TaskFilterButtons from "../../presentational/TaskFilterButtons/TaskFilterButtons";
//TODO get from server
const urgencyStatuses = [
  { id: 1, name: "Высокая" },
  { id: 2, name: "Средняя" },
  { id: 3, name: "Низкая" },
];
//TODO get from server
const taskStatuses = [
  { id: 1, name: "Новая" },
  { id: 2, name: "В работе" },
  { id: 3, name: "Завершена" },
];
//TODO  activeIndex в store
export default function InformationForStory({
  filterKeyForCustomers = "name",
  filterKeyForEpics = "name",
  filterKeyForStories = "name",
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    projectId: projectIdString,
    customerId: customerIdString,
    epicId: epicIdString,
    storyId: storyIdString,
  } = useParams();

  const projectId = Number(projectIdString);
  const customerId = Number(customerIdString);
  const epicId = Number(epicIdString);
  const storyId = Number(storyIdString);

  const currentProject = useSelector((state) => state.project.currentProject);
  const currentCustomer = useSelector(
    (state) => state.customer.currentCustomer
  );
  const currentEpic = useSelector((state) => state.epic.currentEpic);
  const currentStory = useSelector((state) => state.story.currentStory);

  const projectData = currentProject.projectData || {};
  const customerData = currentCustomer.customerData || {};
  const epicData = currentEpic.epicData || {};
  const storyData = currentStory.storyData || {};

  const [activeIndexTaskStatuses, setActiveIndexTaskStatuses] = useState(-1);
  const [activeIndexUrgencyStatuses, setActiveIndexUrgencyStatuses] =
    useState(-1);

  const handleOnClickFilterButton = (type, newIndex) => {
    if (type === "task") {
      setActiveIndexTaskStatuses((prev) => (prev === newIndex ? -1 : newIndex));
    } else if (type === "urgency") {
      setActiveIndexUrgencyStatuses((prev) =>
        prev === newIndex ? -1 : newIndex
      );
    }
  };

  return (
    <div className="container-InformationForStory">
      <h1>{projectData?.projectName || "Project Name Not Available"}</h1>
      <h3>{projectData?.status?.status_name || "Status Not Available"}</h3>
      <TaskFilterButtons
        arrTaskStatuses={taskStatuses}
        activeIndexTaskStatuses={activeIndexTaskStatuses}
        activeIndexUrgencyStatuses={activeIndexUrgencyStatuses}
        arrUrgencyStatuses={urgencyStatuses}
        onClickElement={handleOnClickFilterButton}
      />
      <PathForStory
        customerData={customerData}
        epicData={epicData}
        storyData={storyData}
      />

      <CustomerButton textValue="Export USM" />
      <CustomerButton textValue="Get Gantt chart" />
    </div>
  );
}
