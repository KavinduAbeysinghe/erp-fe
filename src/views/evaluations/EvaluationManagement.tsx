import { Route, Routes } from "react-router-dom";
import { Evaluations } from "./Evaluations";
import { ViewEvaluation } from "./ViewEvaluation";

export const EvaluationManagement = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Evaluations />} />
      <Route path={"/view-evaluation"} element={<ViewEvaluation />} />
    </Routes>
  );
};
