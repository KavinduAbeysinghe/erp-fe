import {
  Box,
  IconButton,
  Popover,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { Breadcrumb } from "../breadcrumbs/Breadcrumb";
import { useState } from "react";
import React from "react";
import { ThemeSwitch } from "../inputs/ThemeSwitch";
import { CustomButton } from "../buttons/CustomButton";
import { useNavigate } from "react-router-dom";
import { CustomBackdrop } from "../backdrop/CustomBackdrop";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  drawerWidth: number;
  handleDrawerOpen: () => void;
}

export const MyAppBar = ({
  open,
  drawerWidth,
  handleDrawerOpen,
}: AppBarProps) => {
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
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

  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log(event.currentTarget);

    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPopper = Boolean(anchorEl);
  const id = open ? "simple-popover-1" : undefined;

  const navigate = useNavigate();

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
      <AppBar
        position="fixed"
        open={open}
        drawerWidth={drawerWidth}
        handleDrawerOpen={handleDrawerOpen}
      >
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
          >
            <Breadcrumb />
            <Box
              display={"flex"}
              alignItems={"center"}
              gap={1}
              sx={{ cursor: "pointer" }}
              aria-describedby={id}
              onClick={(event) => handleClick(event)}
            >
              <img
                src={require("../../assets/images/person1.jpg")}
                alt="profile-img"
                height={45}
                width={45}
                style={{ borderRadius: "50%", objectFit: "cover" }}
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
                horizontal: "left",
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
    </>
  );
};
