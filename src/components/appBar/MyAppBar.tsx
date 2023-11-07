import { Box, IconButton, styled, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { Breadcrumb } from "../breadcrumbs/Breadcrumb";

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
    backgroundColor: "#fff",
    color: "#000",
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

  return (
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};
