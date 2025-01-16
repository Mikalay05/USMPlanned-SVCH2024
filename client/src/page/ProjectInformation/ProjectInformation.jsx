import "./ProjectInformation.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // Импортируем useParams
import { getProjectById } from '../../store/slices/projectSlice';
import { getCurrentUserData } from '../../store/slices/userSlice';

import Header from "../../component/Header/Header";
import MainProjectInformation from '../../component/MainProjectInformation/MainProjectInformation'
import Footer from "../../component/Footer/Footer";

export default function ProjectInformation() {
    const { projectId } = useParams(); // Получаем projectId из URL
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUserData());
        
        if (projectId) {
            dispatch(getProjectById(projectId));
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