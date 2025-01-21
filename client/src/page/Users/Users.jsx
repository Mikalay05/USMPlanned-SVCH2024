import Footer from '../../component/Footer/Footer'
import Header from '../../component/containers/Header/Header'
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../store/slices/userSlice';
import { getCurrentUserData } from '../../store/slices/userSlice';
import MainUsersComponent from '../../component/containers/MainUsersComponent/MainUsersComponent'
import './Users.css'
import React, { useEffect } from 'react';


export default function Users({

}) {
    const dispatch  = useDispatch();
    useEffect(() => {
        dispatch(getUsers());
        dispatch(getCurrentUserData());
      }, [dispatch]);
    return (
        <>
        <Header/>
        <MainUsersComponent pathForAddUser='reg'/>
        <Footer/>
        </>
    )
}