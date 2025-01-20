import './StoryInformation.css'

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; 
import { getProjectDataById } from '../../store/slices/projectSlice';
import { getCurrentUserData } from '../../store/slices/userSlice';
import { getStoryActions } from '../../store/slices/storySlice';  

import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
import MainStoryInformation from '../../component/MainStoryInformation/MainStoryInformation';  

export default function StoryInformation({
    
})
{
    const { projectId, customerId,epicId, storyId } = useParams(); 
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUserData());
        
        if (storyId) {
            dispatch(getStoryActions(storyId)); 
        }
        if(projectId) {
            dispatch(getProjectDataById(projectId));
        }
    }, [dispatch, projectId, customerId, epicId,storyId]);  

    return (
        <>
        <Header/>
        <MainStoryInformation/> 
        <Footer/>
        </>
    )
}
