import './ChangeDataForUser.css'
import Footer from '../../component/Footer/Footer'
import Header from '../../component/Header/Header'
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserData } from "../../store/slices/userSlice";
import React, { useEffect } from "react";
import MainChangeDataForUser from '../../component/MainChangeDataForUser/MainChangeDataForUser';
import { getRoles } from '../../store/slices/roleSlice';
import { useParams } from 'react-router-dom'; // Импортируем useParams

export default function ChangeDataForUser({

}) {
    const dispatch  = useDispatch();
    const { userId } = useParams(); // Получаем userId из маршрута

    useEffect(() => {

        dispatch(getRoles());
        if (userId) {
            dispatch(getCurrentUserData(userId)); // Получаем данные пользователя по userId
        }
    }, [dispatch, userId]); // Следим за изменением userId
    console.log("userId",userId)
    return (
        <>
        <Header/>
        <MainChangeDataForUser/>
        <Footer/>
        </>
    )
}