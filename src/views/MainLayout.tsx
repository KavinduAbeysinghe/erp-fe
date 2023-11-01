import { Route, Routes } from "react-router-dom";
import { Login } from "./auth/Login";

export const MainLayout = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Login />} />
    </Routes>
  );
};
