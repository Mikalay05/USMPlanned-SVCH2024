import "./ProjectPage.css"
import Header from "../../component/Header/Header"
import Footer from "../../component/Footer/Footer"
import ProjectComponent from "../../component/ProjectsComponent/ProjectComponent"

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../store/slices/projectSlice';

export default function ProjectPage() {
    
    const dispatch = useDispatch();
    const { projects, isLoading, error } = useSelector((state) => state.project);

    useEffect(() => {
        dispatch(getProjects()); // Загрузка проектов
    }, [dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    console.log("PROJECTS in ProjectPage:", projects);
    console.log("Type of projects:", typeof projects);
    console.log("Is projects an array:", Array.isArray(projects));


    return (
        <>
        {/* <Header />
        <ProjectComponent arrProject={projects}/>
        <Footer/> */}
        {projects}
        </>
    )
}