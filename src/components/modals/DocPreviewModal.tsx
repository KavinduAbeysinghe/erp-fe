import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";

interface DocPreviewModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  maxWidth: DialogProps["maxWidth"];
  doc: any;
  docType: any;
  title: string;
}

export const DocPreviewModal = ({
  open,
  setOpen,
  maxWidth,
  doc,
  docType,
  title,
}: DocPreviewModalProps) => {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <embed src={doc} type={docType} width="100%" height="600px" />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
