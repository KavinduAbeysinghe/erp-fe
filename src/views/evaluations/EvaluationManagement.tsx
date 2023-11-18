import { Route, Routes } from "react-router-dom";
import { CreateEvaluation } from "./CreateEvaluation";
import { Evaluations } from "./Evaluations";
import { ViewEvaluation } from "./ViewEvaluation";

export const EvaluationManagement = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Evaluations />} />
      <Route path={"/view-my-evaluation"} element={<ViewEvaluation />} />
      <Route path={"/view-team-evaluation"} element={<ViewEvaluation />} />
      <Route path={"/create-evaluation"} element={<CreateEvaluation />} />
      <Route path={"/view-evaluation"} element={<CreateEvaluation />} />
      <Route path={"/edit-evaluation"} element={<CreateEvaluation />} />
    </Routes>
  );
};