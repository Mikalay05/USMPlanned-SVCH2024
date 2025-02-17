import './EpicInformation.css'

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // Импортируем useParams
import { getProjectDataById } from '../../store/slices/projectSlice';
import { getCurrentUserData } from '../../store/slices/userSlice';
import { getEpicActions } from '../../store/slices/epicSlice';

import Header from '../../component/containers/Header/Header'
import Footer from "../../component/Footer/Footer";
import MainEpicInformation from '../../component/containers/MainEpicInformation/MainEpicInformation';


export default function EpicInformation({
    
})
{
    const { projectId, customerId, epicId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCurrentUserData());
        
        if (epicId) {
            dispatch(getEpicActions({paths: {projectId, customerId, epicId  }}));
        }
        if(projectId) {
            dispatch(getProjectDataById(projectId));
        }
    }, [dispatch, projectId, customerId, epicId]);
    return (
        <>
        <Header/>
        <MainEpicInformation/>
        <Footer/>
        </>
    )
}