import './CustomerInformation.css'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // Импортируем useParams
import { getProjectDataById } from '../../store/slices/projectSlice';
import { getCurrentUserData } from '../../store/slices/userSlice';
import { getCustomerActions } from '../../store/slices/customerSlice';
import { getCurrentCustomer } from '../../store/slices/customerSlice';
import { getChainForSelectionInTheCustomer } from '../../store/slices/customerSlice';
import { getChainForSelectionInTheProject } from '../../store/slices/projectSlice';

import Header from '../../component/containers/Header/Header'
import Footer from "../../component/Footer/Footer";
import MainCustomerInformation from '../../component/containers/MainCustomerInformation/MainCustomerInformation';

export default function CustomerInformation({

})
{
    const { projectId, customerId } = useParams(); // Получаем projectId из URL
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUserData());
        
        if (customerId) {
            dispatch(getCustomerActions(customerId));
            dispatch(getCurrentCustomer(customerId));
            dispatch(getChainForSelectionInTheCustomer(customerId));
        }
        if(projectId) {
            dispatch(getChainForSelectionInTheProject(projectId));
            dispatch(getProjectDataById(projectId));
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