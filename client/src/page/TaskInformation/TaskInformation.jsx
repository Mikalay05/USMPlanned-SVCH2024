import './TaskInformation.css'

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; 
import { getProjectDataById } from '../../store/slices/projectSlice';
import { getCurrentUserData } from '../../store/slices/userSlice';
import { getTaskActions } from '../../store/slices/taskSlice';  

import Header from '../../component/containers/Header/Header'
import Footer from "../../component/Footer/Footer";
import MainTaskInformation from '../../component/containers/MainTaskInformation/MainTaskInformation';  

export default function TaskInformation({
    
})
{
    const { projectId, customerId,epicId, storyId, taskId } = useParams(); 
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUserData());
        
        if (taskId) {
            dispatch(getTaskActions(taskId)); 
        }
        if(projectId) {
            dispatch(getProjectDataById(projectId));
        }
    }, [dispatch, projectId, customerId, epicId,storyId, taskId]);  

    return (
        <>
        <Header/>
        <MainTaskInformation/> 
        <Footer/>
        </>
    )
}
