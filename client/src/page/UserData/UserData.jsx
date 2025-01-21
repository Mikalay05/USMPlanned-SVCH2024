import "./UserData.css";
import Header from '../../component/containers/Header/Header'
import Footer from "../../component/Footer/Footer";
import MainUserData from "../../component/MainUserData/MainUserData";
import { useDispatch } from "react-redux";
import { getCurrentUserData } from "../../store/slices/userSlice";
import React, { useEffect } from "react";

export default function UserData({}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUserData());
  }, [dispatch]);
  return (
    <>
      <Header />
      <MainUserData />
      <Footer />
    </>
  );
}
