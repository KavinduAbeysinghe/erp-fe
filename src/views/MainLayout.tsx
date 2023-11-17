import { Route, Routes } from "react-router-dom";
import { Login } from "./auth/Login";
import { Box, CssBaseline, styled, useTheme } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { Dashboard } from "./dashboard/Dashboard";
import { Profile } from "./profile/Profile";
import { EmployeeManagement } from "./employeeManagement/EmployeeManagement";
import { LeaveManagement } from "./leaveManagement/LeaveManagement";
import { AttendanceManagement } from "./attendance/AttendanceManagement";
import { MyCalendar } from "./calendar/MyCalendar";
import { EvaluationManagement } from "./evaluations/EvaluationManagement";
import { MyDrawer } from "../components/drawer/MyDrawer";
import { MyResponsiveDrawer } from "../components/drawer/MyResponsiveDrawer";

export const MainLayout = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Login />} />
      <Route path={"/control/*"} element={<Layout />} />
    </Routes>
  );
};

const Layout = () => {
  const drawerWidth = 240;

  const [open, setOpen] = useState<boolean>(true);

  const handleDrawerOpen = () => {
    setOpen(true);
    localStorage.setItem("drawerOpen", "true");
  };

  const handleDrawerClose = () => {
    setOpen(false);
    localStorage.setItem("drawerOpen", "false");
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  useLayoutEffect(() => {
    const openDrawer = localStorage.getItem("drawerOpen");
    if (openDrawer) setOpen(openDrawer === "true");
  }, []);

  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: theme.palette.mode === "light" ? "#f6f6f6" : "#2c2c2c",
      }}
    >
      <CssBaseline />
      {/* <MyDrawer /> */}
      <MyResponsiveDrawer />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          overflow: "auto",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DrawerHeader />
        <Routes>
          <Route path={"/dashboard"} element={<Dashboard />}></Route>
          <Route path={"/profile"} element={<Profile />}></Route>
          <Route
            path={"/employee-management/*"}
            element={<EmployeeManagement />}
          ></Route>
          <Route
            path={"/leave-management/*"}
            element={<LeaveManagement />}
          ></Route>
          <Route
            path={"/attendance-management/*"}
            element={<AttendanceManagement />}
          ></Route>
          <Route path={"/calendar"} element={<MyCalendar />}></Route>
          <Route
            path={"/evaluation-management/*"}
            element={<EvaluationManagement />}
          ></Route>
        </Routes>
      </Box>
    </Box>
  );
};
