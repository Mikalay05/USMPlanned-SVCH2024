
import React, { useState } from "react";
import InputData from "./component/InputData/InputData";
import Notification from "./component/Notification/Notification";
import "./App.css"

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
                <InputData placeholderValue="Login" iconName={"Login-Icon.svg"} />
            <Notification open={notification} text="USer created successful" iconName="close.png" onClose={closeNotification}/>
            <button onClick={openNotification}>Show notification</button>
        </>
        
    )
}