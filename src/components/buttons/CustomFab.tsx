import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Fab, Slide } from "@mui/material";

interface CustomFabProps {
  action: any;
  checked: boolean;
}

export const CustomFab = ({ action, checked }: CustomFabProps) => {
  return (
    <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
      <Fab
        size="small"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          color: "rgb(144, 202, 249)",
          backgroundColor: "rgb(75, 94, 113)",
          ":hover": {
            backgroundColor: "rgb(59, 74, 89)",
          },
        }}
        onClick={(e) => action(e)}
      >
        <ArrowUpwardIcon />
      </Fab>
    </Slide>
  );
};
