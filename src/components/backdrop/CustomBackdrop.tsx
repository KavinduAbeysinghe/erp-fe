import { Backdrop, CircularProgress } from "@mui/material";

interface CustomBackdropProps {
  showBackdrop: boolean;
}

export const CustomBackdrop = ({ showBackdrop }: CustomBackdropProps) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1000 }}
      open={showBackdrop}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
