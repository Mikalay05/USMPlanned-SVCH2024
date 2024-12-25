import "./ProjectPage.css";
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
import ProjectComponent from "../../component/ProjectsComponent/ProjectComponent";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects, createProject } from "../../store/slices/projectSlice";
import { getProjectStatuses } from "../../store/slices/projectStatusSlice";

export default function ProjectPage() {
  const dispatch = useDispatch();
  const { projects, isLoadingProject, errorProject } = useSelector(
    (state) => state.project
  );
  const { projectStatuses, isLoadingProjectStatus, errorProjectStatus } =
    useSelector((state) => state.projectStatus);

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getProjectStatuses());

  }, [dispatch]);
  const onCreateProject = (dataDto) => {
    return dispatch(createProject(dataDto));
  }
  return (
    <>
      <Header />
      <ProjectComponent
        arrProject={projects}
        isLoadingProject={isLoadingProject}
        errorProject={errorProject}
        onCreateProject={onCreateProject}

        arrProjectStatus={projectStatuses}
        isLoadingProjectStatus={isLoadingProjectStatus}
        errorProjectStatus={errorProjectStatus}
      />
      <Footer />
    </>
  );
}
