import './CustomerInformation.css'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // Импортируем useParams
import { getProjectById } from '../../store/slices/projectSlice';
import { getCurrentUserData } from '../../store/slices/userSlice';
import { getCustomerActions } from '../../store/slices/customerSlice';

import Header from "../../component/Header/Header";
import MainProjectInformation from '../../component/MainProjectInformation/MainProjectInformation'
import Footer from "../../component/Footer/Footer";
import MainCustomerInformation from '../../component/MainCustomerInformation/MainCustomerInformation';

export default function CustomerInformation({

})
{
    const { projectId, customerId } = useParams(); // Получаем projectId из URL
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUserData());
        
        if (customerId) {
            dispatch(getCustomerActions(customerId));
        }
        if(projectId) {
            dispatch(getProjectById(projectId));
        }
    }, [dispatch, projectId, customerId]);
    return (
        <>
        <Header/>
        <MainCustomerInformation/>
        <Footer/>
        </>
    )
}