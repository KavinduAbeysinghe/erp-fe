import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BadgeIcon from "@mui/icons-material/Badge";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import {
  CSSObject,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Theme,
  Tooltip,
  useTheme,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { useLocation, useNavigate } from "react-router-dom";

interface SideBarProps {
  drawerWidth: number;
  handleDrawerClose: () => void;
  drawerOpen: boolean;
}

export const SideBar = ({
  drawerOpen,
  drawerWidth,
  handleDrawerClose,
}: SideBarProps) => {
  const theme = useTheme();

  const location = useLocation();

  const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
    // backgroundColor: theme.palette.background.default,
  });

  const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    // backgroundColor: theme.palette.background.default,
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

  return (
    <Drawer anchor="left" variant="permanent" open={drawerOpen}>
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
            sx={{
              borderRight:
                location.pathname === opt?.path ? "5px solid #1976d2" : "",
            }}
          >
            <Tooltip title={!drawerOpen ? opt?.name : ""} placement={"right"}>
              <ListItemButton onClick={() => handleNavigate(opt?.path)}>
                <ListItemIcon sx={{ color: "#fff" }}>{opt?.icon}</ListItemIcon>
                <ListItemText sx={{ color: "#fff" }} primary={opt?.name} />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
