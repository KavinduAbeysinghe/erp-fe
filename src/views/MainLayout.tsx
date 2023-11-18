import { Box, CssBaseline, styled, useTheme } from "@mui/material";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { MyResponsiveDrawer } from "../components/drawer/MyResponsiveDrawer";
import { AttendanceManagement } from "./attendance/AttendanceManagement";
import { Login } from "./auth/Login";
import { MyCalendar } from "./calendar/MyCalendar";
import { Dashboard } from "./dashboard/Dashboard";
import { EmployeeManagement } from "./employeeManagement/EmployeeManagement";
import { EvaluationManagement } from "./evaluations/EvaluationManagement";
import { LeaveManagement } from "./leaveManagement/LeaveManagement";
import { Profile } from "./profile/Profile";
import { CustomFab } from "../components/buttons/CustomFab";

export const MainLayout = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Login />} />
      <Route path={"/control/*"} element={<Layout />} />
    </Routes>
  );
};

const Layout = () => {
  const [checked, setChecked] = useState<boolean>(false);

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const theme = useTheme();

  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (boxRef.current) {
        const scrollY = boxRef.current.scrollTop;
        setChecked(scrollY > 0);
      }
    };

    boxRef.current?.addEventListener("scroll", handleScroll);

    return () => {
      boxRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const targetElement = useRef<any>();
  const scrollingTop = (event: any) => {
    const elmnt = targetElement;
    if (elmnt) {
      elmnt.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start",
      });
    }
  };

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
        ref={boxRef}
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
        <div ref={targetElement}></div>
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
        <CustomFab action={scrollingTop} checked={checked} />
      </Box>
    </Box>
  );
};
