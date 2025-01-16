import './ChangeDataForUser.css'
import Footer from '../../component/Footer/Footer'
import Header from '../../component/Header/Header'
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserData } from "../../store/slices/userSlice";
import React, { useEffect } from "react";
import MainChangeDataForUser from '../../component/MainChangeDataForUser/MainChangeDataForUser';
import { getRoles } from '../../store/slices/roleSlice';

export default function ChangeDataForUser({

}) {
    const dispatch  = useDispatch();
    useEffect(() => {
            dispatch(getCurrentUserData());
        dispatch(getRoles());

      }, [dispatch]);
    return (
        <>
        <Header/>
        <MainChangeDataForUser/>
        <Footer/>
        </>
    )
}