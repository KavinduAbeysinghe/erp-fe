import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import * as React from "react";

interface AlertDialogProps {
  message: string;
  handleYesClick: () => void;
  handleNoClick: () => void;
  openAlert: boolean;
  setOpenAlert: any;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
  message,
  handleYesClick,
  handleNoClick,
  openAlert,
  setOpenAlert,
}: AlertDialogProps) {
  return (
    <Dialog
      open={openAlert}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOpenAlert(false)}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle sx={{ fontWeight: 600, textAlign: "center" }}>
        Warning!
      </DialogTitle>
      <DialogContent>
        <Box display={"flex"} justifyContent={"center"}>
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            fontSize={"80px"}
            textAnchor="center"
            color="#ED6C02"
          />
        </Box>
        <DialogContentText
          id="alert-dialog-slide-description"
          sx={{ textAlign: "center" }}
        >
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleYesClick}>Yes</Button>
        <Button onClick={handleNoClick}>No</Button>
      </DialogActions>
    </Dialog>
  );
}
