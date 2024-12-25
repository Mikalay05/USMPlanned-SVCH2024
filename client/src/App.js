
import React, { useState } from "react";
import InputData from "./component/InputData/InputData";
import Header from "./component/Header/Header";
import Notification from "./component/Notification/Notification";
import "./App.css"
import Footer from "./component/Footer/Footer";
import AuthComponent from "./page/Auth/Auth";
import ProjectPage from "./page/ProjectPage/ProjectPage";
import CustomersInformation from "./page/CustomersInformation/CustomersInformation";

export default function App() {
    return (
        <>
        
            {/* <AuthComponent/> */}
            <ProjectPage/>
        </>
        
    )
}