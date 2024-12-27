import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./sys_ConfigurationRoutes"; // Путь к файлу с маршрутом

export default function sys_RouteComponent() {
  return (
    <>
      {ROUTES.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.elem />} // Рендерим компонент
        />
      ))}
    </>

  );
}
