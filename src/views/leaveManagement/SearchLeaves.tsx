import BasicTabs from "../../components/tabs/BasicTabs";
import { SearchMyLeaves } from "./SearchMyLeaves";
import { SearchTeamLeaves } from "./SearchTeamLeaves";

export const SearchLeaves = () => {
  const tabOptions = [
    {
      title: "My Leaves",
      body: <SearchMyLeaves />,
    },
    {
      title: "Team Leaves",
      body: <SearchTeamLeaves />,
    },
  ];

  return <BasicTabs options={tabOptions} />;
};
