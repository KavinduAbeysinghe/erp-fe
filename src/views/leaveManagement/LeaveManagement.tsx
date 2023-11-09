import { Route, Routes } from "react-router-dom";
import { ApplyLeave } from "./ApplyLeave";
import { SearchLeaves } from "./SearchLeaves";
import { TeamLeavePage } from "./TeamLeavePage";

export const LeaveManagement = () => {
  return (
    <Routes>
      <Route element={<SearchLeaves />} path={"/"} />
      <Route element={<ApplyLeave />} path={"/apply-leave"} />
      <Route element={<TeamLeavePage />} path={"/team-leave/*"} />
    </Routes>
  );
};
