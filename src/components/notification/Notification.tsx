import { useTheme } from "@mui/material";
import { Slide, ToastContainer } from "react-toastify";

export const Notification = () => {
  const theme = useTheme();

  return (
    <ToastContainer
      toastStyle={{ fontSize: "0.9em", padding: 12 }}
      autoClose={1500}
      closeButton={false}
      newestOnTop={true}
      closeOnClick={true}
      transition={Slide}
      theme={theme.palette.mode === "light" ? "light" : "dark"}
    />
  );
};
