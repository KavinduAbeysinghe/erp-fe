import { Route, Routes } from "react-router-dom";
import { Login } from "./auth/Login";
import { Box, CssBaseline, styled } from "@mui/material";
import { useState } from "react";
import { MyAppBar } from "../components/appBar/MyAppBar";
import { SideBar } from "../components/sideBar/SideBar";

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

  const Main = styled("main", {
    shouldForwardProp: (prop) => prop !== "open",
  })<{
    open?: boolean;
  }>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }));

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  return (
    <Box sx={{ display: "flex" }}>
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
      <Main open={open}>
        <DrawerHeader />
        <Routes>
          <Route path={"/dashboard"} element={<h1>Dashboard</h1>}></Route>
        </Routes>
      </Main>
    </Box>
  );
};
