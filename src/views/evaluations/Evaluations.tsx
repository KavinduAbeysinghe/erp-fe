import BasicTabs from "../../components/tabs/BasicTabs";
import { EvaluationManager } from "./EvaluationManager";
import { MyEvaluations } from "./MyEvaluations";
import { TeamEvaluations } from "./TeamEvaluations";

export const Evaluations = () => {
  const tabOptions = [
    {
      title: "My Evaluations",
      body: <MyEvaluations />,
    },
    {
      title: "Team Evaluations",
      body: <TeamEvaluations />,
    },
    {
      title: "Evaluations Manager",
      body: <EvaluationManager />,
    },
  ];

  return <BasicTabs options={tabOptions} />;
};
