import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { SearchEmployees } from "./SearchEmployees";
import { CreateEmployeePage } from "./CreateEmployeePage";

export const EmployeeManagement = () => {
  return (
    <Routes>
      <Route path={"/"} element={<SearchEmployees />} />
      <Route path={"/create-employee"} element={<CreateEmployeePage />} />
      <Route path={"/view-employee"} element={<CreateEmployeePage />} />
      <Route path={"/edit-employee"} element={<CreateEmployeePage />} />
    </Routes>
  );
};
