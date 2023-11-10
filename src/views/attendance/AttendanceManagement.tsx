import BasicTabs from "../../components/tabs/BasicTabs";
import { MyAttendance } from "./MyAttendance";
import { TeamsAttendance } from "./TeamsAttendance";

export const AttendanceManagement = () => {
  const tabOptions = [
    {
      title: "My Attendance",
      body: <MyAttendance />,
    },
    {
      title: "Team Attendance",
      body: <TeamsAttendance />,
    },
  ];

  return <BasicTabs options={tabOptions} />;
};
