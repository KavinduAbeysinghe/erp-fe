import { Route, Routes } from "react-router-dom";
import { Login } from "./auth/Login";
import { Box, CssBaseline, styled } from "@mui/material";
import { useState } from "react";
import { MyAppBar } from "../components/appBar/MyAppBar";
import { SideBar } from "../components/sideBar/SideBar";
import { Dashboard } from "./dashboard/Dashboard";
import { Profile } from "./profile/Profile";

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
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <MyAppBar
        open={open}
        drawerWidth={drawerWidth}
        handleDrawerOpen={handleDrawerOpen}
      />
      <SideBar
        drawerWidth={drawerWidth}
        handleDrawerClose={handleDrawerClose}
        drawerOpen={open}
      />
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
        </Routes>
      </Box>
    </Box>
  );
};
