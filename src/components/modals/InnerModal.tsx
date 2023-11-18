import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Typography } from "@mui/material";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

interface InnerModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  maxWidth: DialogProps["maxWidth"];
  title: string;
  body: ReactJSXElement;
}

export const InnerModal = ({
  open,
  setOpen,
  maxWidth,
  title,
  body,
}: InnerModalProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      sx={{ top: 0 }}
      fullWidth={true}
      maxWidth={maxWidth}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography fontSize={"large"} fontWeight={700}>
            {title}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>{body}</DialogContent>
    </Dialog>
  );
};
