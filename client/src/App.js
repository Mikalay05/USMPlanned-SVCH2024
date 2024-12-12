
import React, { useState } from "react";
import InputData from "./component/InputData/InputData";
import Header from "./component/Header/Header";
import Notification from "./component/Notification/Notification";
import "./App.css"
import Footer from "./component/Footer/Footer";
import AuthComponent from "./page/Auth/Auth";

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
            <AuthComponent/>
        </>
        
    )
}