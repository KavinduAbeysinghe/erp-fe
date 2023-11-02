import { Route, Routes } from "react-router-dom";
import { Login } from "./auth/Login";

export const MainLayout = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Login />} />
      <Route path={"/control-desk"} element={<Layout />} />
    </Routes>
  );
};

const Layout = () => {
  return <h1>Control Desk</h1>;
};
