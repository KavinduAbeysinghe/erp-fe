import * as React from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

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
      fullWidth={true}
      maxWidth={maxWidth}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{body}</DialogContent>
    </Dialog>
  );
};
