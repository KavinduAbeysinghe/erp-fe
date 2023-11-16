import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Avatar, Popover, Tooltip } from "@mui/material";
import { Breadcrumb } from "../breadcrumbs/Breadcrumb";
import { ThemeSwitch } from "../inputs/ThemeSwitch";
import { CustomButton } from "../buttons/CustomButton";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BadgeIcon from "@mui/icons-material/Badge";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { CustomBackdrop } from "../backdrop/CustomBackdrop";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const MyDrawer = () => {
  const theme = useTheme();

  const location = useLocation();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget.parentNode?.parentNode);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPopper = Boolean(anchorEl);
  const id = openPopper ? "simple-popover" : undefined;

  const sideBarOptions: any[] = [
    {
      name: "Dashboard",
      path: "/control/dashboard",
      icon: <DashboardIcon fontSize="small" />,
    },
    {
      name: "Attendance",
      icon: <CoPresentIcon fontSize="small" />,
      path: "/control/attendance-management",
    },
    {
      name: "Leaves",
      icon: <PersonOffIcon fontSize="small" />,
      path: "/control/leave-management",
    },
    {
      name: "Employees",
      icon: <BadgeIcon fontSize="small" />,
      path: "/control/employee-management",
    },
    {
      name: "Evaluations",
      icon: <FactCheckIcon fontSize="small" />,
      path: "/control/evaluation-management",
    },
    {
      name: "Calendar",
      icon: <CalendarMonthIcon fontSize="small" />,
      path: "/control/calendar",
    },
    {
      name: "Profile",
      icon: <AccountCircleIcon fontSize="small" />,
      path: "/control/profile",
    },
  ];

  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

  const handleLogout = () => {
    setShowBackdrop(true);
    setTimeout(() => {
      sessionStorage.clear();
      localStorage.clear();
      navigate("/");
      setShowBackdrop(false);
    }, 1000);
  };

  return (
    <>
      <CustomBackdrop showBackdrop={showBackdrop} />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ width: "100%" }}
            className={"appbar-inner-container"}
          >
            <Breadcrumb />
            <Box
              aria-describedby={id}
              display={"flex"}
              alignItems={"center"}
              gap={1}
              sx={{ position: "relative !important" }}
              onClick={(event: any) => handleClick(event)}
            >
              <Avatar
                alt="Remy Sharp"
                src={require("../../assets/images/person1.jpg")}
                sx={{ width: 45, height: 45 }}
              />
              <Typography fontWeight={500}>John</Typography>
            </Box>
            <Popover
              id={id}
              open={openPopper}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <Box
                py={2}
                px={3}
                display={"flex"}
                flexDirection={"column"}
                gap={1}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Typography>@JohnHopkins</Typography>
                <ThemeSwitch />
                <CustomButton
                  text={"Logout"}
                  variant="outlined"
                  onClick={handleLogout}
                />
              </Box>
            </Popover>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" variant="permanent" open={open}>
        <div className="sidebar-overlay"></div>
        <DrawerHeader>
          <img
            style={{
              width: "100%",
              objectFit: "contain",
            }}
            height={40}
            src={require("../../assets/images/logo.png")}
            alt="side-bar-logo"
            className="logo-img"
          />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sideBarOptions?.map((opt: any, index) => (
            <ListItem
              key={opt?.name}
              disablePadding
              className={
                location.pathname === opt?.path ? "list-item-border" : ""
              }
              //   sx={{
              //     borderRight:
              //       location.pathname === opt?.path ? "5px solid #1976d2" : "",
              //   }}
            >
              <Tooltip title={!open ? opt?.name : ""} placement={"right"}>
                <ListItemButton onClick={() => handleNavigate(opt?.path)}>
                  <ListItemIcon sx={{ color: "#fff" }}>
                    {opt?.icon}
                  </ListItemIcon>
                  <ListItemText sx={{ color: "#fff" }} primary={opt?.name} />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};
