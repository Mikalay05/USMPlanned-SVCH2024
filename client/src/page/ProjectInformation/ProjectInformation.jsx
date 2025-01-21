import "./ProjectInformation.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // Импортируем useParams
import { getProjectDataById } from '../../store/slices/projectSlice';
import { getCurrentUserData } from '../../store/slices/userSlice';
import { getProjectStatuses } from '../../store/slices/projectStatusSlice';
import { getProjectActions } from '../../store/slices/projectSlice';
import { getChainForSelectionInTheProject } from '../../store/slices/projectSlice';

import Header from "../../component/Header/Header";
import MainProjectInformation from '../../component/MainProjectInformation/MainProjectInformation'
import Footer from "../../component/Footer/Footer";

export default function ProjectInformation() {
    const { projectId } = useParams(); // Получаем projectId из URL
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUserData());
        dispatch(getProjectStatuses());
        
        if (projectId) {
            dispatch(getProjectDataById(projectId));
            dispatch(getChainForSelectionInTheProject(projectId));
            dispatch(getProjectActions(projectId));
        }
    }, [dispatch, projectId]);


    return (
        <>
        <Header/>
        <MainProjectInformation/>
        <Footer/>
        </>
    );
}