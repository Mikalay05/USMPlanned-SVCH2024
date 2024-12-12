
import React, { useState } from "react";
import InputData from "./component/InputData/InputData";
import Header from "./component/Header/Header";
import Notification from "./component/Notification/Notification";
import "./App.css"
import Footer from "./component/Footer/Footer";
import AuthComponent from "./component/AuthComponent/AuthComponent";

export default function App() {
    const [notification, setNotification] = useState(true);
    function closeNotification() {
        setNotification(false);
    }
    function openNotification() {
        setNotification(true);
    }
    return (
        <>
        <Header nameMainIcon="MainIcon.svg" nameLoginIcon="LoginIconFull.svg"/>
                <InputData placeholderValue="Login" iconName={"Login-Icon.svg"} />
            <Notification open={notification} text="USer created successful" iconName="close.png" timeClose={3000} onClose={closeNotification}/>
            <button onClick={openNotification}>Show notification</button>
            <Footer nameMainIcon="MainIcon.svg"/>

            <AuthComponent/>
        </>
        
    )
}