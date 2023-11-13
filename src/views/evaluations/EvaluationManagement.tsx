import { Route, Routes } from "react-router-dom";
import { Evaluations } from "./Evaluations";
import { ViewEvaluation } from "./ViewEvaluation";
import { CreateEvaluation } from "./CreateEvaluation";

export const EvaluationManagement = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Evaluations />} />
      <Route path={"/view-evaluation"} element={<ViewEvaluation />} />
      <Route path={"/create-evaluation"} element={<CreateEvaluation />} />
    </Routes>
  );
};
