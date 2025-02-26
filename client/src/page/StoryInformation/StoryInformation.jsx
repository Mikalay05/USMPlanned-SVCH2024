import "./StoryInformation.css";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCurrentUserData } from "../../store/slices/userSlice";

import {
  getProjectDataById,
  getChainForSelectionInTheProject,
} from "../../store/slices/projectSlice";
import {
  getCurrentCustomer,
  getChainForSelectionInTheCustomer,
} from "../../store/slices/customerSlice";
import {
  getCurrentEpic,
  getChainForSelectionInTheEpic,
} from "../../store/slices/epicSlice";
import {
  getStoryActions,
  getCurrentStory,
} from "../../store/slices/storySlice";

import Header from "../../component/containers/Header/Header";
import Footer from "../../component/Footer/Footer";
import MainStoryInformation from "../../component/containers/MainStoryInformation/MainStoryInformation";

export default function StoryInformation({}) {
  const { projectId, customerId, epicId, storyId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUserData());
    const paths = { projectId, customerId, epicId, storyId };
    if (storyId) {
      dispatch(getStoryActions(storyId));
      dispatch(getCurrentStory({ paths }));
      //   dispatch(getChainForSelectionInTheEpic({ paths }));
    }
    if (projectId) {
      dispatch(getProjectDataById(projectId));
      dispatch(getChainForSelectionInTheProject(projectId));
    }
    if (customerId) {
      dispatch(getCurrentCustomer(customerId));
      dispatch(getChainForSelectionInTheCustomer(customerId));
    }
    if (epicId) {
      dispatch(getCurrentEpic({ paths }));
      dispatch(getChainForSelectionInTheEpic(epicId));
    }
  }, [dispatch, projectId, customerId, epicId, storyId]);

  return (
    <>
      <Header />
      <MainStoryInformation />
      <Footer />
    </>
  );
}
