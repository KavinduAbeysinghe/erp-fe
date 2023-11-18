import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BadgeIcon from "@mui/icons-material/Badge";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { Avatar, Popover } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb } from "../breadcrumbs/Breadcrumb";
import { CustomButton } from "../buttons/CustomButton";
import { ThemeSwitch } from "../inputs/ThemeSwitch";

const drawerWidth = 240;

export const MyResponsiveDrawer = () => {
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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

  const drawer = (
    <div>
      <Toolbar>
        <img
          style={{
            width: "100%",
            objectFit: "contain",
          }}
          height={25}
          src={require("../../assets/images/logo2.png")}
          alt="side-bar-logo"
          className="logo-img"
        />
      </Toolbar>
      <div className="sidebar-overlay"></div>
      <Divider />
      <List>
        {sideBarOptions?.map((opt: any, index) => (
          <ListItem
            key={opt?.name}
            disablePadding
            className={
              location.pathname === opt?.path ? "list-item-border" : ""
            }
          >
            <ListItemButton onClick={() => handleNavigate(opt?.path)}>
              <ListItemIcon sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                {opt?.icon}
              </ListItemIcon>
              <ListItemText
                sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                primary={opt?.name}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "background.default",
          color: "text.primary",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
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
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};
