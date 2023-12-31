import {
  Box,
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
  Typography,
  useTheme,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MuiDrawer from "@mui/material/Drawer";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TaskIcon from "@mui/icons-material/Task";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BadgeIcon from "@mui/icons-material/Badge";
import { useNavigate } from "react-router-dom";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import PersonOffIcon from "@mui/icons-material/PersonOff";

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

  const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
    backgroundColor: "#1e1b4b",
  });

  const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    backgroundColor: "#1e1b4b",
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
    <Drawer variant="permanent" open={drawerOpen}>
      <DrawerHeader>
        <img
          style={{
            width: "100%",
            objectFit: "contain",
          }}
          height={40}
          src={require("../../assets/images/logo.png")}
          alt="side-bar-logo"
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
          <ListItem key={opt?.name} disablePadding>
            <Tooltip title={!drawerOpen ? opt?.name : ""} placement={"right"}>
              <ListItemButton onClick={() => handleNavigate(opt?.path)}>
                <ListItemIcon sx={{ color: "#f3f4f6" }}>
                  {opt?.icon}
                </ListItemIcon>
                <ListItemText sx={{ color: "#f3f4f6" }} primary={opt?.name} />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
