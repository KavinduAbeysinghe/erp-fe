import BasicTabs from "../../components/tabs/BasicTabs";
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
  ];

  return <BasicTabs options={tabOptions} />;
};
