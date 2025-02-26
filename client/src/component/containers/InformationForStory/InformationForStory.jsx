import "./InformationForStory.css";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PathForStory from "../../presentational/PathForStory/PathForStory";

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
  const currentCustomer = useSelector((state) => state.customer.currentCustomer);
  const currentEpic = useSelector((state) => state.epic.currentEpic);
  const currentStory = useSelector((state) => state.story.currentStory);

  const projectData = currentProject.projectData || {};
  const customerData = currentCustomer.customerData || {};
  const epicData = currentEpic.epicData || {};
  const storyData = currentStory.storyData || {};
  return <div className="container-InformationForStory">
    111
    <PathForStory customerData={customerData} epicData={epicData} storyData={storyData}/>
  </div>;
}
