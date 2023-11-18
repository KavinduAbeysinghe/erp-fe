import { Route, Routes } from "react-router-dom";
import { CreateEmployeePage } from "./CreateEmployeePage";
import { SearchEmployees } from "./SearchEmployees";

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
