import React from "react";
import {BrowserRouter} from 'react-router-dom'
import RouteComponent from './component/sys_RouteComponent/sys_RouteComponent'
import './App.css'
export default function App() {
  try {
    return (
      <>
      <BrowserRouter>
      <RouteComponent/>
      
      </BrowserRouter>
      </>
    );
  } catch (error) {
    console.error("Error in App:", error);
    return <p>Ошибка загрузки маршрута.</p>;
  }
}
