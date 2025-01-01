import { Route, Routes, Navigate } from "react-router-dom";
import { ROUTES } from "./sys_ConfigurationRoutes";

export default function sys_RouteComponent() {
  return (
    <Routes>
      {ROUTES.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />} // Используем компонент
        />
      ))}
      {/* <Route path="*" element={<Navigate to="/project" />} /> */}
    </Routes>
  );
}
