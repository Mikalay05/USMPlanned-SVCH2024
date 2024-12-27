import React from "react";
import {BrowserRouter,} from 'react-router-dom'
export default function App() {
  try {
    return (
      <>
      <BrowserRouter/>
      </>
    );
  } catch (error) {
    console.error("Error in App:", error);
    return <p>Ошибка загрузки маршрута.</p>;
  }
}
